// S34 · bars 67–68 · along the undersea cable: a terracotta breakpoint stands on it like a map pin; she swims past it
SCENE(function (g, t, T) {
  WD.deep(g, { T: T, depth: 420, rays: false, seed: 81, plankton: 70 });
  var cy = 720, scroll = t * 240;
  WD.cable(g, cy, T, { speed: 240, gold: 1 });
  var bx = 1500 - scroll, pass = GX.bar(68);
  GX.rect(g, P.espresso, bx - 4, cy - 190, 8, 130);
  GX.circle(g, bx, cy - 220, 44, P.terra); GX.circle(g, bx, cy - 220, 18, P.cream);
  GX.text(g, 'breakpoint', bx + 64, cy - 210, { size: 30, font: 'mono', color: P.apricot });
  var q = GX.at(T, pass, 0.6);
  if (q > 0 && q < 1) { g.save(); g.globalAlpha = 1 - q; GX.ring(g, bx, cy - 220, 50 + q * 160, 6, P.terra); g.restore(); }
  var sx = GX.lerp(-200, 1250, GX.E.out2(GX.seg(t, 0, 2.6)));
  GX.cut(g, pose('C12'), { x: sx, y: cy - 150 + Math.sin(t * 2.4) * 14, h: 520, ay: 1, rot: -0.06 });
});
