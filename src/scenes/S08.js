// S08 · bars 15–16 · cross-section of the sea: a flat whale rises from the deep and breaks the surface on the bar-16 downbeat
SCENE(function (g, t, T) {
  var hz = 430, hit = GX.bar(16);
  var k = GX.at(T, hit, 0.0001), sh = GX.shake(T, 14 * (1 - GX.at(T, hit, 0.5)) * k, 3);
  g.save(); g.translate(sh.x, sh.y);
  WD.sky(g, { hz: hz, moon: [1520, 170, 110], T: T, seed: 12, clouds: false });
  g.save(); g.beginPath(); g.rect(0, hz, W, H - hz); g.clip();
  g.translate(0, hz);
  WD.deep(g, { T: T, depth: 0, rayX: 980, seed: 61, plankton: 70 });
  g.translate(0, -hz);
  var u = GX.E.out3(GX.at(T, GX.bar(15), hit - GX.bar(15) + 0.25));
  var wy = GX.lerp(1320, hz + 150, u), wx = GX.lerp(720, 960, u), rot = GX.lerp(-0.55, -0.12, u);
  WD.whale(g, wx, wy, 1.25, { T: T, rot: rot });
  g.restore();
  // the surface line
  GX.rect(g, P.peri, 0, hz - 2, W, 5);
  // breach: rings of light + flat drops thrown up
  var b = GX.at(T, hit, 1.1);
  if (b > 0) {
    for (var i = 0; i < 3; i++) {
      var q = GX.clamp(b * 1.3 - i * 0.18, 0, 1);
      if (q <= 0) continue;
      g.save(); g.globalAlpha = 1 - q; g.strokeStyle = i ? P.peri : P.cream; g.lineWidth = 8 - i * 2;
      g.beginPath(); g.ellipse(1080, hz, 80 + q * 620, 10 + q * 40, 0, 0, Math.PI * 2); g.stroke(); g.restore();
    }
    var r = MV.rng(88);
    for (var d = 0; d < 26; d++) {
      var ang = -Math.PI / 2 + (r() - 0.5) * 1.6, sp = 380 + r() * 520, tt = (T - hit);
      var x = 1080 + Math.cos(ang) * sp * tt, y = hz + Math.sin(ang) * sp * tt + 900 * tt * tt;
      if (y < hz + 4) GX.circle(g, x, y, 5 + r() * 9, d % 3 ? P.peri : P.cream);
    }
  }
  g.restore();
  GX.flash(g, 0.35 * (1 - GX.at(T, hit, 0.3)) * k, P.cream);
});
