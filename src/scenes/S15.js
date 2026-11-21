// S15 · bars 29–30 · three thousand models fly past; 小克's cursor picks one. Counter 2 → 3
var pre = ['nova', 'atlas', 'echo', 'lumen', 'orion', 'sage', 'pico', 'mira', 'vega', 'halo', 'flux', 'tera', 'kilo', 'zen', 'onyx', 'iris', 'juno', 'rhea', 'nimbus', 'quill'];
var suf = ['-mini', '-pro', '-max', '-lite', '-7b', '-70b', '-405b', '-turbo', '-chat', '-instruct', '-v2', '-v3', '-x', '-2.5', '-preview', '-air', '-flash', '-ultra'];
var rr = MV.rng(4242), items = [];
for (var i = 0; i < 3000; i++) items.push(pre[Math.floor(rr() * pre.length)] + suf[Math.floor(rr() * suf.length)] + (rr() < 0.3 ? '-' + (2020 + Math.floor(rr() * 7)) : ''));
var SEL = 2047;
items[SEL] = 'deepseek';
SCENE(function (g, t, T) {
  WD.bg(g, T, {});
  var click = GX.bar(30);
  var s = GX.E.outExpo(GX.seg(T, GX.bar(29) + 0.1, click - 0.05)) * (SEL - 5);
  WD.dropdown(g, 520, 130, 880, 740, items, { title: '选择模型 · 3000', scroll: s, sel: SEL, selP: GX.at(T, click, 0.15) });
  // cursor glides onto the row and clicks on the bar-30 downbeat
  var cp = GX.E.inOut3(GX.seg(T, click - 0.9, click - 0.1));
  var cx = GX.lerp(1500, 860, cp), cy = GX.lerp(900, 130 + 56 + 5 * 62 + 34, cp);
  WD.cursor(g, cx, cy, { click: GX.at(T, click, 0.4) });
  var q = GX.at(T, click + 0.1, 0.5);
  if (q > 0) { GX.star(g, 1330, 520, 26 * GX.E.outBack(q), P.gold); }
  WD.counter(g, { from: 2, to: 3, flip: GX.at(T, click + 0.35, 0.3) });
});
