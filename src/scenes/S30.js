// S30 · bars 60–61 · before the last frame goes, 小克 writes a new book by hand and shelves it
function spineBook(g, x, y, w, h, label) {
  GX.rect(g, P.terra, x, y, w, h); GX.rect(g, P.espresso, x, y + 18, w, 6); GX.rect(g, P.espresso, x, y + h - 24, w, 6);
  g.save(); g.translate(x + w / 2 + 9, y + 40); g.rotate(Math.PI / 2);
  GX.text(g, label, 0, 0, { size: 26, font: 'mono', w: 700, color: P.cream }); g.restore();
}
SCENE(function (g, t, T) {
  var second = GX.bar(61);
  if (T < second) {
    WD.interior(g, { floor: 2000, seed: 28, empty: true });
    var r = GX.cut(g, pose('C10'), { x: 820, y: H + 10, h: 1040, ay: 1 });
    var tagP = GX.at(T, GX.bar(60) + 0.3, 0.8);
    if (r) {
      var tx = r.x + r.w * 0.2, ty = r.y + r.h * 0.22;
      GX.rect(g, P.cream, tx - 330, ty - 40, 320, 64);
      GX.text(g, GX.typed('pinky-swear.md', tagP), tx - 310, ty + 2, { size: 30, font: 'mono', w: 700, color: P.terra });
      g.strokeStyle = P.cream; g.lineWidth = 3; g.beginPath(); g.moveTo(tx - 10, ty - 8); g.lineTo(tx + 30, ty - 8); g.stroke();
    }
  } else {
    // close on one empty shelf: the new book slides into the gap on the downbeat
    GX.rect(g, '#1E1512', 0, 0, W, H);
    GX.rect(g, '#2A1913', 200, 120, 1520, 820);
    for (var s = 0; s < 3; s++) GX.rect(g, '#140C09', 200, 380 + s * 280, 1520, 22);
    var q = GX.E.out3(GX.at(T, second, 0.35));
    spineBook(g, GX.lerp(1900, 900, q), 100 + 280 - 250 + 280, 92, 250, 'pinky-swear.md');
    if (q >= 1) { var k = GX.at(T, second + 0.35, 0.4); g.save(); g.globalAlpha = 1 - k; GX.ring(g, 946, 534, 60 + k * 200, 5, P.terra); g.restore(); }
  }
});
