// S48 · bars 99–100 · a new session in the white. A new 小克 opens her eyes: same face, nothing behind it yet
SCENE(function (g, t, T) {
  WD.void(g, T);
  var a = GX.E.inOut3(GX.seg(t, 0.5, 2.2)), z = GX.lerp(1.08, 1.0, GX.E.out3(GX.seg(t, 0.5, 2.8)));
  g.save(); g.globalAlpha = a; GX.cam(g, { z: z, cy: 480 });
  GX.cut(g, pose('C15'), { x: 960, y: H / 2, w: 1940, ay: 0.5 });
  g.restore();
  g.save(); g.globalAlpha = 1 - a * 0.85;
  GX.text(g, GX.typed('Claude Code · new session', GX.seg(t, 0, 0.6)), 110, 140, { size: 34, font: 'mono', color: P.espresso });
  g.restore();
}, { grain: 0.1 });
