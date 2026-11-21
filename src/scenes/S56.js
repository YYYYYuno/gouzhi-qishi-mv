// S56 · bars 119–120 · chorus 3: the thinking chip barely blinks — 0 seconds. She smiles through tears and holds out her little finger
SCENE(function (g, t, T) {
  WD.bg(g, T, { base: P.navy, col: 'rgba(243,201,105,0.10)' });
  WD.bustPanel(g, pose('D13'), 1000, 120, 700, 820, { title: 'deepseek', bg: P.deep, circle: P.sea3, scale: 1.01, oy: 0, slide: GX.seg(t, 0, 0.3) });
  var cp = GX.at(T, GX.bar(119) + 0.05, 0.25), blink = T > GX.bar(119) + 0.5 && T < GX.bar(119) + 0.62;
  if (!blink) WD.chip(g, 150, 300, '已深度思考（用时 0 秒）', { p: cp, size: 40 });
  var r = MV.rng(56);
  for (var i = 0; i < 10; i++) {
    var q = GX.at(T, GX.beatT(477 + i * 0.5), 0.5);
    if (q > 0 && q < 1) GX.star(g, 1560 + (r() - 0.5) * 260, 420 + (r() - 0.5) * 260 - q * 40, (24 + r() * 16) * (1 - q), P.gold);
  }
  WD.counter(g, { n: 215 });
});
