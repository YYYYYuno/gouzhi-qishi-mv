"""Beat / energy analysis of the song -> analysis/audio.json + a printed summary.

usage: python -I scripts/analyze_audio.py assets/audio/song.mp3 analysis/audio.json
"""
import json
import sys

import librosa
import numpy as np

src, out = sys.argv[1], sys.argv[2]
y, sr = librosa.load(src, sr=22050, mono=True)
dur = len(y) / sr

tempo, beats = librosa.beat.beat_track(y=y, sr=sr, units="time")
tempo = float(np.atleast_1d(tempo)[0])
onset_env = librosa.onset.onset_strength(y=y, sr=sr)
onsets = librosa.onset.onset_detect(onset_envelope=onset_env, sr=sr, units="time")

# loudness per second (dB rel. max)
hop = 512
rms = librosa.feature.rms(y=y, hop_length=hop)[0]
t_rms = librosa.frames_to_time(np.arange(len(rms)), sr=sr, hop_length=hop)
per_sec = []
for s in range(int(np.ceil(dur))):
    m = (t_rms >= s) & (t_rms < s + 1)
    v = float(rms[m].mean()) if m.any() else 0.0
    per_sec.append(v)
mx = max(per_sec) or 1.0
db = [round(20 * np.log10(max(v, 1e-6) / mx), 1) for v in per_sec]

# spectral centroid per second (brightness)
cent = librosa.feature.spectral_centroid(y=y, sr=sr, hop_length=hop)[0]
cent_sec = []
for s in range(int(np.ceil(dur))):
    m = (t_rms >= s) & (t_rms < s + 1)
    cent_sec.append(int(cent[m].mean()) if m.any() else 0)

json.dump(
    {
        "duration": round(dur, 3),
        "tempo": round(tempo, 2),
        "beats": [round(float(b), 3) for b in beats],
        "onsets": [round(float(o), 3) for o in onsets],
        "db_per_sec": db,
        "centroid_per_sec": cent_sec,
    },
    open(out, "w", encoding="utf-8"),
    ensure_ascii=False,
)

print(f"duration {dur:.2f}s  tempo {tempo:.2f} bpm  beats {len(beats)}  onsets {len(onsets)}")
print(f"first beats: {[round(float(b), 2) for b in beats[:12]]}")
ibi = np.diff(beats)
print(f"beat interval median {np.median(ibi):.3f}s  std {ibi.std():.3f}")
print("loudness (dB rel max) per 2 s:")
row = []
for s in range(0, len(db), 2):
    row.append(f"{s:3d}:{db[s]:6.1f}")
    if len(row) == 8:
        print("  " + "  ".join(row))
        row = []
if row:
    print("  " + "  ".join(row))
