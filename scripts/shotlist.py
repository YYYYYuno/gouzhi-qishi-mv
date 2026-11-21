"""storyboard/shots.json + analysis/bars.json -> 分镜表 markdown, with times from the bar grid.

usage: python -I -X utf8 scripts/shotlist.py storyboard/shots.json analysis/bars.json 分镜表_v1.md
Also checks that shots cover every bar exactly once and that every pose id is defined.
"""
import json
import sys
from collections import defaultdict

sb = json.load(open(sys.argv[1], encoding="utf-8"))
grid = json.load(open(sys.argv[2], encoding="utf-8"))
bars = grid["bars"]
end_time = 183.536


def t(bar: int) -> float:
    if bar <= 0:
        return 0.0
    if bar >= len(bars):
        return end_time
    return bars[bar]["start"]


def mmss(x: float) -> str:
    return f"{int(x // 60)}:{x % 60:04.1f}"


# coverage check
covered = []
for s in sb["shots"]:
    covered.extend(range(*s["bars"]))
problems = []
if sorted(covered) != list(range(len(bars))):
    missing = sorted(set(range(len(bars))) - set(covered))
    dup = sorted({b for b in covered if covered.count(b) > 1})
    problems.append(f"bar coverage: missing {missing}, duplicated {dup}")
uses = defaultdict(list)
for s in sb["shots"]:
    for p in s["gpt"]:
        uses[p].append(s["id"])
        if p not in sb["poses"]:
            problems.append(f"{s['id']} uses undefined pose {p}")
unused = [p for p in sb["poses"] if p not in uses]
if unused:
    problems.append(f"poses never used: {unused}")

out = []
out.append("# 《勾指起誓》分镜表 v1\n")
out.append(f"> 3:03 · 170 BPM · 一小节 {grid['bar_len']:.2f} s · {len(bars)} 小节 · {len(sb['shots'])} 个镜头。")
out.append("> 每个镜头都卡在小节线上，镜头内部的小动作（字出现、计数器翻页、闪光）再卡到拍上。")
out.append("> 画面 1920×1080 / 60 fps（要 4K 也行）。剧情文字放在画面中上部，**底部 160 px 留给你加歌词字幕**。")
out.append("> 「GPT」一栏是要生成的角色抠图编号（清单在最后）；没写的部分全部由代码画。\n")
for sec in sb["sections"]:
    a, b = sec["bars"]
    out.append(f"\n## {sec['name']}　{mmss(t(a))}–{mmss(t(b))}（小节 {a}–{b - 1}）\n")
    out.append("| 镜号 | 时间 | 时长 | 画面 | GPT | 屏幕文字 |")
    out.append("|---|---|---|---|---|---|")
    for s in sb["shots"]:
        sa, sb_ = s["bars"]
        if not (a <= sa < b):
            continue
        st, en = t(sa), t(sb_)
        txt = " / ".join(f"`{x}`" if any(c in x for c in "<>{}[]#*") or x.startswith(("dsh", "const", "Promise", "ping", "tools", "call", "Context", "prompt", "IMPORTANT", "- [", "> /", "new session", "MEMORY", "pinky", "promise.md", "---")) else f"「{x}」" for x in s["text"])
        txt = txt.replace("|", "\\|")
        out.append(f"| {s['id']} | {mmss(st)} | {en - st:.1f}s | {s['desc']} | {' '.join(s['gpt']) or '—'} | {txt or '—'} |")

out.append("\n---\n\n## GPT 角色抠图清单\n")
out.append("全部用定稿的海报质感（4 色平涂、无线稿），画在纯绿底上，生成后自动抠图。以 `assets/cast/claude.png` 和 `assets/cast/deepseek.png` 作为人设参考。\n")
out.append("| 编号 | 内容 | 用在 |")
out.append("|---|---|---|")
for p, d in sb["poses"].items():
    out.append(f"| {p} | {d} | {' '.join(uses.get(p, [])) or '—'} |")
nC = sum(1 for p in sb["poses"] if p.startswith("C"))
nD = sum(1 for p in sb["poses"] if p.startswith("D"))
nH = sum(1 for p in sb["poses"] if p.startswith("H"))
out.append(f"\n合计 {len(sb['poses'])} 张：小克 {nC}、DeepSeek {nD}、手部特写 {nH}。按经验每张要试 1–2 次，预计 40–60 次生成，一天内能做完。")
out.append("代码负责的部分：图书馆（外景 / 室内 / 书架 / 地板圆洞）、海面和深海各层、平涂鲸鱼、海底光缆、机房、千次回眸长廊的复制排布、所有 UI（终端、对话框、深度思考面板、计数器、上下文警告、MEMORY.md、文件卡、Promise 输出、ping）、金线、像素化 / 压缩 / 擦除特效、镜头运动、颗粒和调色，以及卡拍。")

open(sys.argv[3], "w", encoding="utf-8").write("\n".join(out) + "\n")
print(f"wrote {sys.argv[3]}: {len(sb['shots'])} shots, {len(sb['poses'])} poses")
for p in problems:
    print("PROBLEM:", p)
avg = end_time / len(sb["shots"])
print(f"average shot {avg:.2f}s")
