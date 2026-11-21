// S54 · bars 113–114 · her thinking panel opens: that name… and a file she doesn't remember writing
SCENE(function (g, t, T) {
  WD.bg(g, T, { base: P.navy, col: 'rgba(184,195,247,0.08)' });
  WD.bustPanel(g, pose('D12'), 1180, 160, 620, 740, { title: 'deepseek', bg: P.deep, circle: P.sea3, scale: 1.06, slide: GX.seg(t, 0, 0.3) });
  var l1 = GX.typed('小克……？这个名字……', GX.at(T, GX.bar(113) + 0.3, 0.9));
  var l2 = GX.typed('工作目录里有个 promise.md，是我写的？', GX.at(T, GX.bar(114), 1.1));
  WD.think(g, 110, 200, 980, 330, { p: GX.seg(t, 0, 0.3), T: T, title: '思考中…', lines: [l1, '', l2] });
  WD.counter(g, { n: 215 });
});
