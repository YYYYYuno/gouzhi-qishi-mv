"""Contact sheet of keyed cutouts on MV-like backgrounds, with labels.

usage: python -I tools/sheet.py [--cols N] [--card WxH] OUT.jpg "cutout.png|label" ["cutout.png|label" ...]
Each cutout is shown on a dark night card so you can judge both the design and the cut edge
against the kind of background the MV will use. Cutouts that were cropped by the image edge
(waist-up, close-ups) are anchored to the bottom of the card.
"""
import sys
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFont

LABEL_H, GAP = 64, 16
FONT = ImageFont.truetype(r"C:\Windows\Fonts\msyh.ttc", 26)
SMALL = ImageFont.truetype(r"C:\Windows\Fonts\msyh.ttc", 18)


def card_bg(w: int, h: int) -> Image.Image:
    y = np.linspace(0, 1, h)[:, None]
    base = (34 + 18 * (1 - y)) * np.ones((h, w))
    rng = np.random.default_rng(7)
    base = base + rng.normal(0, 3.2, base.shape)
    img = np.dstack([base, base, base + 4]).clip(0, 255).astype(np.uint8)
    return Image.fromarray(img, "RGB")


def main() -> None:
    args = sys.argv[1:]
    cols, cw, ch = None, 520, 860
    while args and args[0].startswith("--"):
        if args[0] == "--cols":
            cols = int(args[1]); args = args[2:]
        elif args[0] == "--card":
            cw, ch = map(int, args[1].lower().split("x")); args = args[2:]
        else:
            raise SystemExit(f"unknown option {args[0]}")
    out = Path(args[0])
    items = [a.split("|", 1) for a in args[1:]]
    n = len(items)
    cols = cols or n
    rows = (n + cols - 1) // cols
    W = cols * cw + (cols + 1) * GAP
    H = rows * (ch + LABEL_H + GAP) + GAP
    sheet = Image.new("RGB", (W, H), (16, 16, 18))
    d = ImageDraw.Draw(sheet)
    bg = card_bg(cw, ch)
    for i, (path, label) in enumerate(items):
        r, c = divmod(i, cols)
        x = GAP + c * (cw + GAP)
        y = GAP + r * (ch + LABEL_H + GAP)
        card = bg.copy()
        cut = Image.open(path).convert("RGBA")
        a = np.asarray(cut)[..., 3]
        cropped = (a[-3:] > 128).any()  # touches the bottom edge -> anchor to the card bottom
        pad = 0 if cropped else 20
        s = min((cw - 40) / cut.width, (ch - 20 - pad) / cut.height)
        cut = cut.resize((max(1, int(cut.width * s)), max(1, int(cut.height * s))), Image.LANCZOS)
        card.paste(cut, ((cw - cut.width) // 2, ch - cut.height - pad), cut)
        sheet.paste(card, (x, y))
        d.text((x + 4, y + ch + 10), label, font=FONT, fill=(235, 232, 225))
        d.text((x + 4, y + ch + 42), Path(path).stem, font=SMALL, fill=(130, 130, 136))
    out.parent.mkdir(parents=True, exist_ok=True)
    sheet.save(out, quality=88)
    print(f"sheet {W}x{H} -> {out}")


if __name__ == "__main__":
    main()
