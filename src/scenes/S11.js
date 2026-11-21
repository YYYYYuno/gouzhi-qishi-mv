// S11 · bars 21–22 · 小克 is charmed (bar 21) — then the next call: the same greeting again, counter 1 → 2 (bar 22)
SCENE(function (g, t, T) {
  var cut = GX.bar(22);
  if (T < cut) {
    WD.interior(g, { floor: 2000, dim: true, seed: 26, off: t * 20 });
    WD.bustPanel(g, pose('C03'), 640, 130, 640, 780, { title: 'claude', bg: P.espresso, slide: GX.seg(t, 0, 0.35), fromX: -900, circle: P.apricot, scale: 1.06 });
    // little sparks popping round her face on the beats
    for (var i = 0; i < 4; i++) {
      var bt = GX.beatT(84 + i), q = GX.at(T, bt, 0.35);
      if (q > 0 && q < 1) { var ang = -2.4 + i * 1.1; GX.star(g, 960 + Math.cos(ang) * (300 + q * 60), 430 + Math.sin(ang) * (200 + q * 50), 26 * (1 - q) + 6, P.apricot); }
    }
    WD.counter(g, { n: 1 });
  } else {
    var tt = T - cut;
    WD.dsSea(g, pose('D01'), T, { rise: 1, x: 1240, hz: 720, h: 840, moon: [1240, 430, 340] });
    WD.bubble(g, 150, 250, '你好！我是 DeepSeek，有什么可以帮你？', { who: 'ds', pop: GX.seg(tt, 0, 0.12), p: GX.seg(tt, 0, 0.5), maxW: 640, size: 40 });
    WD.counter(g, { from: 1, to: 2, flip: GX.seg(tt, 0.15, 0.45) });
    GX.flash(g, 0.5 * (1 - GX.seg(tt, 0, 0.15)), P.cream);
  }
});
