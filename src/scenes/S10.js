// S10 · bars 19–20 · code review: DeepSeek circles 小克's off-by-one bug and doodles a whale next to it
var code = ['// 小克的代码', 'function lastChar(s) {', '  return s[s.length];', '}', '', 'lastChar("勾指起誓");'];
SCENE(function (g, t, T) {
  WD.bg(g, T, {});
  var inP = GX.E.out3(GX.seg(t, 0, 0.45));
  g.save(); g.translate(-(1 - inP) * 400, 0);
  WD.code(g, 110, 170, 1020, 520, code, { hl: 2, circle: GX.E.out2(GX.at(T, GX.beatT(77), 0.45)), whale: GX.at(T, GX.beatT(80) + 0.05, 0.7), T: T });
  g.restore();
  WD.bustPanel(g, pose('D02'), 1230, 210, 560, 660, { title: 'deepseek', bg: P.navy, slide: GX.seg(t, 0.1, 0.6), circle: P.sea3, scale: 1.08, oy: 20 });
  WD.counter(g, { n: 1 });
});
