// S37 · bars 75–78 · the deep-sea server farm glows like living things; a great whale passes; far off, one lit little house
SCENE(function (g, t, T) {
  var push = GX.E.sine(GX.seg(t, 0, 5.6));
  g.save(); GX.cam(g, { z: 1 + 0.18 * push, cx: 960, cy: 700 });
  WD.deep(g, { T: T, depth: 900, rays: false, seed: 95, plankton: 110 });
  WD.servers(g, T, { seed: 501, n: 12, base: 860, scale: 0.55, col: '#0B0E2C', off: t * 20 });
  WD.house(g, 960, 860, 1.1, 0.7 + 0.3 * GX.pulse(T, 0.3, 4));
  WD.whale(g, GX.lerp(-500, 2400, GX.seg(t, 0, 5.6)), 380 + Math.sin(t) * 30, 1.6, { T: T, alpha: 0.85 });
  // near towers only at the sides, leaving the far house in view
  g.save(); g.beginPath(); g.rect(-400, -400, 1080, H + 800); g.rect(1240, -400, 1100, H + 800); g.clip();
  WD.servers(g, T, { seed: 777, n: 8, base: H + 40, scale: 1.1, off: t * 60 });
  g.restore();
  GX.rect(g, '#070920', 0, 860, W, 300);
  g.restore();
});
