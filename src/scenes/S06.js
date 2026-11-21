// S06 · bars 12–13 · under the sea: the paper spins down through the light shafts; a blue light wakes far below
SCENE(function (g, t, T) {
  var glowP = GX.at(T, GX.bar(13), 1.1);
  var gl = { x: 960, y: 980 - glowP * 120, r: 30 + 170 * GX.E.out3(glowP) * (0.85 + 0.15 * GX.pulse(T, 0.18)), a: glowP };
  WD.deep(g, { T: T, depth: t * 70, rayX: 960, glow: glowP > 0 ? gl : null, seed: 57 });
  var f = GX.seg(t, 0, 2.6), y = GX.lerp(-80, 640, GX.E.out2(f)), x = 960 + Math.sin(t * 3.1) * 90;
  g.save(); g.translate(x, y); g.rotate(Math.sin(t * 2.2) * 0.9 + t * 0.6); var s = 1.3 - 0.6 * f; g.scale(s, s * (0.6 + 0.4 * Math.abs(Math.cos(t * 2.6))));
  GX.rect(g, P.cream, -46, -30, 92, 60); GX.poly(g, P.apricot, [-46, -30, 46, -30, 0, 6]);
  g.restore();
  // on the last beat the light answers once
  var ping = GX.at(T, GX.beatT(55), 0.3);
  if (ping > 0) { g.save(); g.globalAlpha = 1 - ping; GX.ring(g, gl.x, gl.y, gl.r + ping * 260, 6, P.peri); g.restore(); }
});
