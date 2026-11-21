// S14 · bars 27–28 · moon joke ③: the panel folds into a chip, the answer is dead serious, 小克 facepalms
function halfMoon(g, x, y, r) {
  GX.circle(g, x, y, r, P.navy);
  g.save(); g.beginPath(); g.arc(x, y, r - 4, -Math.PI / 2, Math.PI / 2); g.closePath(); g.fillStyle = P.cream; g.fill(); g.restore();
}
SCENE(function (g, t, T) {
  WD.bg(g, T, { base: P.navy, col: 'rgba(184,195,247,0.10)' });
  WD.chip(g, 110, 150, '已深度思考（用时 37 秒）', { p: GX.seg(t, 0, 0.3) });
  var bp = GX.at(T, GX.beatT(109), 0.12), typ = GX.at(T, GX.beatT(109) + 0.05, 0.6);
  var r = WD.bubble(g, 110, 290, '根据天文数据，今晚是上弦月。', { who: 'ds', pop: bp, p: typ, maxW: 760, size: 42 });
  if (r && typ >= 1) halfMoon(g, r.x + r.w - 58, r.y + 50, 22 * GX.E.outBack(GX.at(T, GX.beatT(110), 0.3)));
  var fp = GX.at(T, GX.bar(28), 0.4);
  WD.bustPanel(g, pose('C05'), 1110, 220, 700, 680, { title: 'claude', bg: P.espresso, slide: fp, circle: P.apricot, scale: 1.08, oy: 24 });
  // a little thud when the hand lands
  if (fp > 0.6) { var q = GX.at(T, GX.bar(28) + 0.3, 0.3); if (q < 1) { g.save(); g.globalAlpha = 1 - q; GX.ring(g, 1440, 360, 40 + q * 120, 5, P.apricot); g.restore(); } }
  WD.counter(g, { n: 2 });
});
