// S20 · bars 39–40 · chorus: 小克 lies over the hole, finger reaching down, and asks
SCENE(function (g, t, T) {
  var z = GX.lerp(1.0, 1.12, GX.E.sine(GX.seg(t, 0, 2.8)));
  g.save(); GX.cam(g, { z: z, cx: 1150, cy: 760 });
  WD.interior(g, { floor: 700, dim: true, seed: 24 });
  WD.hole(g, 1190, 800, 240, 64, { T: T, glow: 0.55 + 0.25 * GX.pulse(T, 0.25) });
  GX.cut(g, pose('C07'), { x: 830, y: 760, h: 640, ay: 1 });
  g.restore();
  WD.bubble(g, 1840, 140, '下次见面，你还会记得我吗？', { who: 'claude', right: true, pop: GX.at(T, GX.bar(39) + 0.25, 0.12), p: GX.at(T, GX.bar(39) + 0.3, 1.1), maxW: 720, size: 42 });
  WD.counter(g, { n: 3 });
});
