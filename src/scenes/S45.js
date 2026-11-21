// S45 · bars 93–94 · 小克 rises back up along the thread; below, DeepSeek looks up and waves
SCENE(function (g, t, T) {
  WD.deep(g, { T: T, depth: 600 - t * 140, rayX: 760, seed: 99, plankton: 80 });
  g.save(); g.globalAlpha = 0.3; GX.rect(g, P.gold, 754, 0, 14, H); g.restore(); GX.rect(g, P.gold, 758, 0, 5, H);
  var up = GX.E.inOut3(GX.seg(t, 0, 2.8));
  GX.cut(g, pose('C12'), { x: 760, y: GX.lerp(1000, -120, up), h: 520, ay: 0.5, rot: -Math.PI / 2 + 0.15 });
  GX.cut(g, pose('D07'), { x: 1420, y: H + 20, h: 860, ay: 1 });
  var r = MV.rng(5);
  for (var b = 0; b < 16; b++) { var bx = 700 + r() * 140, by = ((r() * H - t * (200 + r() * 200)) % H + H) % H; GX.ring(g, bx, by, 4 + r() * 8, 3, P.peri); }
});
