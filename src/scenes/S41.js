// S41 · bars 85–86 · it dawns on her: she has had file tools all along
SCENE(function (g, t, T) {
  GX.rect(g, P.deep, 0, 0, W, H);
  var z = GX.lerp(1.0, 1.08, GX.E.out3(GX.seg(t, 0, 2.8)));
  g.save(); GX.cam(g, { z: z, cy: 480 });
  GX.cut(g, pose('D10'), { x: 960, y: H / 2, w: 1940, ay: 0.5 });
  g.restore();
  var ap = GX.at(T, GX.bar(85) + 0.3, 0.3);
  if (ap > 0) {
    WD.card(g, 1180, 560, 620, 300, { title: 'tools', dark: true, alpha: ap }, [
      { s: 'read_file   ' + (T > GX.beatT(342) ? '✓' : ''), c: P.cream, size: 34 },
      { s: 'write_file  ' + (T > GX.beatT(343) ? '✓' : ''), c: P.gold, size: 34, w: 700 }]);
  }
  var q = GX.at(T, GX.beatT(343), 0.5);
  if (q > 0 && q < 1) { g.save(); g.globalAlpha = 1 - q; GX.ring(g, 1560, 750, 30 + q * 200, 6, P.gold); g.restore(); }
});
