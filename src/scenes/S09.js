// S09 · bars 17–18 · DeepSeek surfaces under the moon. Her greeting types out; the counter arrives on bar 18
SCENE(function (g, t, T) {
  WD.dsSea(g, pose('D01'), T, { rise: GX.seg(t, 0, 0.9), x: 1240, hz: 720, h: 840, moon: [1240, 430, 340] });
  // drops falling off her as she rises
  var r = MV.rng(9);
  for (var i = 0; i < 14; i++) {
    var x0 = 1240 + (r() - 0.5) * 420, v = r(), y = 300 + (t * (500 + v * 400)) % 460;
    if (t < 1.6) GX.circle(g, x0, y, 4 + v * 5, P.peri);
  }
  var bp = GX.at(T, GX.bar(17) + 0.55, 0.12), typ = GX.at(T, GX.bar(17) + 0.6, 1.0);
  WD.bubble(g, 150, 250, '你好！我是 DeepSeek，有什么可以帮你？', { who: 'ds', pop: bp, p: typ, maxW: 640, size: 40 });
  WD.counter(g, { n: 1, p: GX.at(T, GX.bar(18), 0.4) });
});
