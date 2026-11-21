// S17 · bars 33–34 · under the sea DeepSeek reads the paper ribbon that keeps coming down from the surface
SCENE(function (g, t, T) {
  WD.deep(g, { T: T, depth: 60 + t * 40, rayX: 1180, seed: 63, plankton: 80 });
  var h = 1100, img = pose('D04'), w = h * img.naturalWidth / img.naturalHeight, x0 = 1060 - w / 2, y0 = H + 20 - h;
  var px = x0 + w * 0.66, py = y0 + h * 0.39;
  // ribbon from above the frame into the top of the sheet in her hands, swaying, its writing sliding down
  g.save(); g.lineCap = 'butt';
  var pts = [];
  for (var k = 0; k <= 12; k++) { var u = k / 12, y = GX.lerp(-60, py + 20, u); pts.push([px + Math.sin(t * 1.7 + u * 3) * 40 * (1 - u), y]); }
  g.strokeStyle = P.cream; g.lineWidth = 78; g.beginPath(); pts.forEach(function (q, i) { if (i) g.lineTo(q[0], q[1]); else g.moveTo(q[0], q[1]); }); g.stroke();
  for (var j = 0; j < 14; j++) {
    var yy = ((j * 46 + t * 90) % (py + 60)) - 40, uu = (yy + 60) / (py + 80), sx = px + Math.sin(t * 1.7 + uu * 3) * 40 * (1 - uu);
    if (yy < py - 10) GX.rect(g, P.apricot, sx - 26, yy, 30 + (j * 7) % 22, 4);
  }
  g.restore();
  GX.cut(g, img, { x: 1060, y: H + 20, h: h, ay: 1 });
  var r = MV.rng(21);
  for (var i = 0; i < 10; i++) { var bx = 760 + r() * 700, by = ((r() * H - t * (80 + r() * 60)) % H + H) % H; GX.ring(g, bx, by, 6 + r() * 8, 3, P.peri); }
});
