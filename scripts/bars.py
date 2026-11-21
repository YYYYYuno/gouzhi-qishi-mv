"""Bar grid for the song: fit a straight line to the detected beats, then list bars with
loudness and the lyric-line starts (as line numbers only) that fall inside each bar.

usage: python -I scripts/bars.py analysis/audio.json assets/audio/song.lrc analysis/bars.json
"""
import json
import re
import sys

import numpy as np

audio = json.load(open(sys.argv[1], encoding="utf-8"))
beats = np.array(audio["beats"])
idx = np.arange(len(beats))
period, t0 = np.polyfit(idx, beats, 1)
resid = beats - (t0 + period * idx)
print(f"beat period {period:.4f}s ({60 / period:.2f} bpm), t0 {t0:.3f}s, resid std {resid.std() * 1000:.1f} ms")

# lyric line start times (no text kept)
starts = []
for line in open(sys.argv[2], encoding="utf-8"):
    m = re.match(r"\[(\d+):(\d+\.\d+)\](.*)", line.strip())
    if m and m.group(3).strip() and ":" not in m.group(3) and "：" not in m.group(3):
        starts.append(int(m.group(1)) * 60 + float(m.group(2)))

# choose the downbeat phase that puts the first vocal entry closest to a bar start
best = None
for ph in range(4):
    bar0 = t0 + period * ph
    off = ((starts[0] - bar0) / (4 * period)) % 1.0
    d = min(off, 1 - off)
    if best is None or d < best[0]:
        best = (d, ph)
phase = best[1]
bar_len = 4 * period
first = t0 + period * phase
while first - bar_len > 0:
    first -= bar_len

db = audio["db_per_sec"]
bars = []
n = 0
t = first
while t < audio["duration"]:
    s, e = t, t + bar_len
    secs = [db[i] for i in range(int(s), min(len(db), int(np.ceil(e))))]
    lines = [i + 1 for i, x in enumerate(starts) if s - 0.45 <= x < e - 0.45]  # pickups count for the bar they lead into
    bars.append({"bar": n, "start": round(s, 3), "end": round(e, 3), "db": round(float(np.mean(secs)), 1) if secs else None, "lines": lines})
    n += 1
    t += bar_len

json.dump({"period": period, "bar_len": bar_len, "first_bar": first, "bars": bars, "line_starts": starts},
          open(sys.argv[3], "w", encoding="utf-8"), ensure_ascii=False, indent=1)
print(f"bar length {bar_len:.3f}s, first bar at {first:.3f}s, {len(bars)} bars")
for b in bars:
    print(f"bar {b['bar']:3d}  {b['start']:7.2f}-{b['end']:7.2f}  {b['db']}  {'L' + ','.join(map(str, b['lines'])) if b['lines'] else ''}")
