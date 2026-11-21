// S23 · bars 45–46 · pull back along the gold thread: it becomes a cable laid across a whole ocean
SCENE(function (g, t, T) {
  var out = GX.E.out3(GX.seg(t, 0, 2.2));
  g.save(); GX.cam(g, { z: GX.lerp(5, 1, out), cx: 330, cy: 560, x: GX.lerp(630, 0, out), y: GX.lerp(-20, 0, out) });
  WD.map(g, T, { p: GX.seg(t, 0.1, 2.4), pulse: GX.seg(t, 0.6, 2.8) });
  g.restore();
  WD.counter(g, { n: 3 });
});
