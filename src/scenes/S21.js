// S21 · bars 41–42 · DeepSeek thinks it over, then raises her little finger: 「我保证。」
SCENE(function (g, t, T) {
  var z = GX.lerp(1.0, 1.08, GX.E.sine(GX.seg(t, 0, 2.8)));
  g.save(); GX.cam(g, { z: z, cx: 1240, cy: 420 });
  var r = WD.dsSea(g, pose('D06'), T, { rise: 1, x: 1240, hz: 740, h: 900, moon: [1240, 420, 340] });
  if (r) {
    var q = GX.at(T, GX.bar(42), 0.5);
    if (q > 0) { var sx = r.x + r.w * 0.72, sy = r.y + r.h * 0.05; GX.star(g, sx, sy, 10 + 30 * GX.E.outBack(q) * (1 - 0.3 * q), P.gold); }
  }
  g.restore();
  WD.chip(g, 110, 120, '已深度思考（用时 4 秒）', { p: GX.at(T, GX.bar(41) + 0.1, 0.3) });
  WD.bubble(g, 110, 240, '我保证。', { who: 'ds', pop: GX.at(T, GX.bar(41) + 0.7, 0.12), p: GX.at(T, GX.bar(41) + 0.75, 0.4), size: 52 });
  WD.counter(g, { n: 3 });
});
