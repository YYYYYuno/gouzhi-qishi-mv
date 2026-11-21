"""Chroma-key GPT character art drawn on flat green into RGBA cutouts.

usage: python -I tools/key.py OUT_DIR IMG [IMG ...]
Writes OUT_DIR/<name>.png (RGBA, cropped to the figure + margin) and prints coverage stats.

The key colour is estimated from the image border. Alpha comes from how much greener a
pixel is than its red/blue channels; edge colours are un-premultiplied against the key
so no green fringe is left on hair tips and lineart.
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image

LO, HI = 28.0, 200.0  # spill below LO -> opaque, above HI -> transparent


def from_alpha(path: Path, out_dir: Path, a: np.ndarray) -> None:
    """The Codex image tool usually returns the figure already cut out (RGBA, figure alpha
    ~252-254) with a faint 1-19 alpha halo around it. Clip the halo and normalise."""
    rgb = a[..., :3].astype(np.float32)
    al = a[..., 3].astype(np.float32)
    alpha = np.clip((al - 20.0) / (248.0 - 20.0), 0.0, 1.0)
    finish(path, out_dir, rgb, alpha, mode="alpha")


def key(path: Path, out_dir: Path) -> None:
    im = Image.open(path)
    if im.mode in ("RGBA", "LA", "P"):
        a = np.asarray(im.convert("RGBA"))
        if (a[..., 3] == 0).mean() > 0.05:
            from_alpha(path, out_dir, a)
            return
    rgb = np.asarray(im.convert("RGB")).astype(np.float32)
    h, w, _ = rgb.shape
    border = np.concatenate([rgb[:8].reshape(-1, 3), rgb[-8:].reshape(-1, 3),
                             rgb[:, :8].reshape(-1, 3), rgb[:, -8:].reshape(-1, 3)])
    # sample only green-looking border pixels: close-ups have hair or skin touching the edges
    greenish = border[(border[:, 1] > 180) & (border[:, 0] < 90) & (border[:, 2] < 90)]
    g_key = np.median(greenish, axis=0) if len(greenish) > 50 else np.array([0.0, 255.0, 0.0])
    r, g, b = rgb[..., 0], rgb[..., 1], rgb[..., 2]
    spill = g - np.maximum(r, b)
    key_spill = g_key[1] - max(g_key[0], g_key[2])
    hi = min(HI, key_spill * 0.85)
    alpha = np.clip((hi - spill) / (hi - LO), 0.0, 1.0)

    # un-premultiply against the key colour on semi-transparent pixels, then despill
    a3 = alpha[..., None]
    safe = np.maximum(a3, 0.08)
    fg = (rgb - (1.0 - a3) * g_key) / safe
    fg = np.where(a3 > 0.98, rgb, fg)
    fg = np.clip(fg, 0, 255)
    fr, fgc, fb = fg[..., 0], fg[..., 1], fg[..., 2]
    # no character colour in this MV has more green than red/blue, so clamp green everywhere: kills the fringe
    fg[..., 1] = np.minimum(fgc, np.maximum(fr, fb))
    finish(path, out_dir, fg, alpha, mode=f"chroma key={g_key.astype(int).tolist()}")


def finish(path: Path, out_dir: Path, fg: np.ndarray, alpha: np.ndarray, mode: str) -> None:
    h, w = alpha.shape
    fg = np.where(alpha[..., None] > 0, fg, 0)
    out = np.dstack([fg, alpha * 255]).astype(np.uint8)
    ys, xs = np.where(alpha > 0.02)
    if len(ys) == 0:
        print(f"{path.name}: nothing left after keying")
        return
    m = 24
    y0, y1 = max(0, ys.min() - m), min(h, ys.max() + m + 1)
    x0, x1 = max(0, xs.min() - m), min(w, xs.max() + m + 1)
    out = out[y0:y1, x0:x1]
    out_dir.mkdir(parents=True, exist_ok=True)
    dst = out_dir / (path.stem + ".png")
    Image.fromarray(out, "RGBA").save(dst)
    touches = []
    if ys.min() < 4: touches.append("top")
    if ys.max() > h - 5: touches.append("bottom")
    if xs.min() < 4: touches.append("left")
    if xs.max() > w - 5: touches.append("right")
    spill = fg[..., 1] - np.maximum(fg[..., 0], fg[..., 2])
    leftover = float(((spill > 40) & (alpha > 0.5)).mean() * 100)
    print(f"{path.name}: {mode} figure={x1-x0}x{y1-y0} "
          f"cover={alpha.mean()*100:.1f}% green-left={leftover:.2f}% "
          f"touches={','.join(touches) or 'none'} -> {dst}")


if __name__ == "__main__":
    out_dir = Path(sys.argv[1])
    for p in sys.argv[2:]:
        key(Path(p), out_dir)
