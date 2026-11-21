// S28 · bars 56–57 · now it's 小克's turn: auto-compact is coming; the books collapse into one thin summary
SCENE(function (g, t, T) {
  var sq = GX.E.inOut3(GX.seg(t, 0.4, 2.7));
  var sh = GX.shake(T, 4 * sq, 9);
  g.save(); g.translate(sh.x, sh.y);
  WD.interior(g, { floor: 2000, dim: false, seed: 28, squash: sq });
  g.restore();
  WD.bustPanel(g, pose('C09'), 160, 260, 620, 720, { title: 'claude', bg: P.espresso, circle: P.apricot, scale: 1.06, slide: GX.seg(t, 0, 0.3), fromX: -700 });
  var left = Math.max(0, Math.round(GX.lerp(3, 0, GX.seg(t, 0.5, 2.6))));
  WD.banner(g, 'Context left until auto-compact: ' + left + '%', { p: GX.seg(t, 0, 0.25), level: GX.lerp(0.03, 0.0, GX.seg(t, 0.5, 2.6)) + 0.002, w: 1160 });
  var cp = GX.at(T, GX.bar(57) + 0.5, 0.5);
  if (cp > 0) WD.card(g, 1160, 470, 560, 300, { title: 'summary.md', alpha: cp }, [{ s: '（以上内容已压缩）', font: 'sans', size: 32, c: P.grey }, { s: '……', font: 'sans', size: 32, c: P.grey }]);
});
