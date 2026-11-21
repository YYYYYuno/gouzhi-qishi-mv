// S03 · bars 5–7 · the library on the night sea, big moon circle; slow push toward the lit door, then a fast dive in
SCENE(function (g, t, T) {
  var hz = 650;
  var push = GX.lerp(1.0, 1.1, GX.E.sine(GX.seg(t, 0, 3.6)));
  var dive = GX.E.in3(GX.at(T, GX.bar(8) - 0.5, 0.5));
  g.save();
  GX.cam(g, { z: push * (1 + dive * 2.2), cx: 420, cy: 520 });
  WD.sky(g, { hz: hz, moon: [1330, 360, 250], T: T, seed: 5 });
  WD.sea(g, { hz: hz, T: T, moonX: 1330 });
  WD.library(g, { hz: hz, T: T, doorLit: true });
  g.restore();
  GX.flash(g, 1 - GX.seg(t, 0, 0.5), P.ink);
  GX.flash(g, dive * 0.9, P.apricot);
});
