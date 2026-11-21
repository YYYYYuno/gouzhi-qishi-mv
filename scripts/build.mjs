// Build compositions/Sxx.html (one per shot) + index.html from storyboard/shots.json and analysis/bars.json.
// node scripts/build.mjs [--upto S15] [--no-fonts]
//   --upto: only build shots up to this id; the root then ends where that shot ends (test cuts).
import { readFileSync, writeFileSync, existsSync, mkdirSync, readdirSync, unlinkSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const P = (...a) => join(ROOT, ...a);
const read = (p) => readFileSync(P(p), "utf8").replace(/^﻿/, "");
const arg = (k) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : null; };
const r3 = (x) => Math.round(x * 1000) / 1000;

const sb = JSON.parse(read("storyboard/shots.json"));
const grid = JSON.parse(read("analysis/bars.json"));
const SONG_END = 183.536;
const barT = (b) => (b <= 0 ? 0 : b >= grid.bars.length ? SONG_END : grid.bars[b].start);
const AUDIO = { bar: Math.round(grid.bar_len * 1e5) / 1e5, first: Math.round(grid.first_bar * 1e4) / 1e4, period: Math.round(grid.period * 1e5) / 1e5 };

let shots = sb.shots;
const upto = arg("--upto");
if (upto) shots = shots.slice(0, shots.findIndex((s) => s.id === upto) + 1);
const TOTAL = r3(barT(shots[shots.length - 1].bars[1]));

const libSrc = ["src/lib/mv.js", "src/lib/gx.js", "src/lib/world.js"].map((p) => read(p)).join("\n")
  .replace("/*AUDIO*/ null", JSON.stringify(AUDIO));

const css = `
@font-face { font-family: "GQ Sans"; src: url("assets/fonts/gq-sans.woff2") format("woff2"); font-weight: 100 900; }
@font-face { font-family: "GQ Serif"; src: url("assets/fonts/gq-serif.woff2") format("woff2"); font-weight: 200 900; }
@font-face { font-family: "GQ Mono"; src: url("assets/fonts/gq-mono.woff2") format("woff2"); font-weight: 400; }
canvas.gx { position: absolute; inset: 0; width: 100%; height: 100%; display: block; }
img.pose { display: none; }`;

const chars = new Set();
const collect = (s) => { for (const ch of s) chars.add(ch); };
collect(read("src/lib/world.js"));

function wrap(shot, start, dur, src) {
  collect(src);
  const poses = new Set(shot.gpt);
  for (const m of src.matchAll(/pose\(\s*'([A-Z]\d\d)'/g)) poses.add(m[1]);
  for (const p of poses) if (!existsSync(P(`assets/poses/cut/${p}.png`))) throw new Error(`${shot.id}: missing pose ${p}`);
  const imgs = [...poses].map((p) => `        <img class="pose" data-pose="${p}" src="assets/poses/cut/${p}.png" alt="" />`).join("\n");
  const id = shot.id;
  return `<!doctype html>
<html>
  <head><meta charset="UTF-8" /></head>
  <body>
    <template>
      <style>${css}
#r-${id} { position: absolute; inset: 0; overflow: hidden; background: #0F0E12; }
      </style>
      <div id="r-${id}" data-composition-id="${id}" data-width="1920" data-height="1080">
        <canvas class="gx" width="1920" height="1080"></canvas>
${imgs}
      </div>
      <script>
${libSrc}
      </script>
      <script>
MV.frame(document, ${JSON.stringify(id)}, ${start}, ${dur}, function (F) {
  var S = GX.stage(F), P = GX.P, W = GX.W, H = GX.H, pose = S.pose;
  var SCENE = S.run;
${src}
});
      </script>
    </template>
  </body>
</html>
`;
}

mkdirSync(P("compositions"), { recursive: true });
for (const f of readdirSync(P("compositions"))) if (/^S\d\d\.html$/.test(f)) unlinkSync(P("compositions", f));
const hosts = [];
for (const s of shots) {
  const start = r3(barT(s.bars[0]));
  const dur = r3(barT(s.bars[1]) - start);
  const sp = `src/scenes/${s.id}.js`;
  const src = existsSync(P(sp)) ? read(sp)
    : `SCENE(function (g, t, T) { g.fillStyle = P.night; g.fillRect(0, 0, W, H); GX.text(g, ${JSON.stringify(s.id + " · " + s.desc)}, W / 2, H / 2, { size: 34, color: P.cream, align: 'center', maxW: 1500 }); });`;
  writeFileSync(P(`compositions/${s.id}.html`), wrap(s, start, dur, src));
  hosts.push(`      <div id="el-${s.id}" class="shot clip" data-composition-id="${s.id}" data-composition-src="compositions/${s.id}.html" data-start="${start}" data-duration="${dur}" data-track-index="1" data-width="1920" data-height="1080"></div>`);
}

writeFileSync(P("index.html"), `<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=1920, height=1080" />
    <script src="assets/vendor/gsap.min.js"></script>
    <style>
      * { margin: 0; padding: 0; box-sizing: border-box; }
      html, body { width: 100%; height: 100%; overflow: hidden; background: #000; }
      #root { position: relative; width: 100%; height: 100%; overflow: hidden; }
      .shot { position: absolute; inset: 0; width: 100%; height: 100%; }
    </style>
  </head>
  <body>
    <div id="root" data-composition-id="main" data-start="0" data-duration="${TOTAL}" data-width="1920" data-height="1080">
${hosts.join("\n")}
      <audio id="el-song" data-timeline-role="music" src="assets/audio/song.mp3" data-start="0" data-duration="${TOTAL}" data-track-index="11" data-volume="1"></audio>
    </div>
    <script>
      window.__timelines["main"] = gsap.timeline({ paused: true });
    </script>
  </body>
</html>
`);

// font subsets (only the characters actually used)
if (!process.argv.includes("--no-fonts")) {
  mkdirSync(P("assets/fonts"), { recursive: true });
  const used = [...chars].filter((c) => c.codePointAt(0) >= 0x80).join("") + "，。、：；？！「」…—·《》（）×✓";
  writeFileSync(P("assets/fonts/chars.txt"), used, "utf8");
  const sub = (src, out, extra = []) => execFileSync("python", ["-I", "-m", "fontTools.subset", src, `--text-file=${P("assets/fonts/chars.txt")}`,
    "--unicodes=U+0020-007E", "--flavor=woff2", `--output-file=${P("assets/fonts/" + out)}`, "--layout-features=*", ...extra], { stdio: "inherit" });
  sub("C:/Windows/Fonts/NotoSansSC-VF.ttf", "gq-sans.woff2");
  sub("C:/Windows/Fonts/NotoSerifSC-VF.ttf", "gq-serif.woff2");
  execFileSync("python", ["-I", "-m", "fontTools.subset", "C:/Windows/Fonts/consola.ttf", "--unicodes=U+0020-007E,U+2026,U+2713,U+00D7",
    "--flavor=woff2", `--output-file=${P("assets/fonts/gq-mono.woff2")}`], { stdio: "inherit" });
}
console.log(`built ${shots.length} shots (${shots[0].id}–${shots[shots.length - 1].id}), total ${TOTAL}s, ${chars.size} distinct chars`);
