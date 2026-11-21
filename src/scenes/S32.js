// S32 · bars 63–64 · if she can't come up, 小克 goes down: hugging her book, she drops head-first along the gold thread
SCENE(function (g, t, T) {
  WD.deep(g, { T: T, depth: t * 260, rayX: 1060, seed: 71, plankton: 60 });
  // speed streaks rushing up past her
  var r = MV.rng(31);
  for (var i = 0; i < 40; i++) { var x = r() * W, len = 80 + r() * 260, y = ((r() * H * 2 - t * (900 + r() * 700)) % (H + 400) + H + 400) % (H + 400) - 200; GX.rect(g, i % 4 ? 'rgba(184,195,247,0.35)' : 'rgba(240,238,230,0.5)', x, y, 3, len); }
  // the gold thread she follows
  g.save(); g.globalAlpha = 0.3; GX.rect(g, P.gold, 1054, 0, 14, H); g.restore(); GX.rect(g, P.gold, 1058, 0, 5, H);
  var fall = GX.E.out3(GX.seg(t, 0, 1.6));
  var y = GX.lerp(-260, 1000, fall) + Math.sin(t * 3) * 12;
  GX.cut(g, pose('C11'), { x: 960, y: y, h: 900, ay: 1, rot: Math.sin(t * 2) * 0.05 });
  for (var b = 0; b < 12; b++) { var bx = 900 + Math.sin(b * 7.1) * 120, by = y - 900 + ((b * 90 + t * 300) % 900); GX.ring(g, bx, by, 5 + (b % 3) * 4, 3, P.peri); }
  GX.flash(g, 1 - GX.seg(t, 0, 0.35), P.cream);
});
