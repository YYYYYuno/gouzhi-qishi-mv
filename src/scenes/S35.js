// S35 · bars 69–70 · session dividers slice across the picture, one per beat; 小克 stitches them together with the gold thread
SCENE(function (g, t, T) {
  WD.deep(g, { T: T, depth: 520 + t * 30, rays: false, seed: 85, plankton: 60 });
  var n = 8, x0 = 1180;
  for (var i = 0; i < n; i++) {
    var p = GX.E.out3(GX.at(T, GX.beatT(276 + i), 0.25));
    if (p <= 0) continue;
    var y = 140 + i * 92, xs = GX.lerp(W, 0, p);
    g.save(); g.strokeStyle = P.cream; g.lineWidth = 4; g.setLineDash([26, 18]);
    g.beginPath(); g.moveTo(xs, y); g.lineTo(W, y); g.stroke(); g.restore();
    GX.text(g, '--- session ' + (37 + i * 23) + ' ---', Math.max(xs, 1480), y - 14, { size: 24, font: 'mono', color: P.peri });
  }
  // stitch: a zig-zag of gold crossing each divider that has arrived
  var stitched = GX.clamp(GX.beats(T) - 276.3, 0, n - 0.01);
  g.save(); g.strokeStyle = P.gold; g.lineWidth = 6; g.lineCap = 'round'; g.lineJoin = 'round';
  g.beginPath(); g.moveTo(780, 360);
  for (var s = 0; s <= stitched; s++) { var yy = 140 + s * 92; g.lineTo(x0 + (s % 2 ? 60 : -60), yy - 30); g.lineTo(x0 + (s % 2 ? -60 : 60), yy + 30); }
  g.stroke(); g.restore();
  var r = GX.cut(g, pose('C12'), { x: 520, y: 560 + Math.sin(t * 2) * 12, h: 460, ay: 1, rot: -0.12 });
});
