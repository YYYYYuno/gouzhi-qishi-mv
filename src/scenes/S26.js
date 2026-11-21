// S26 · bar 50 · 小克's smile freezes: the picture stutters and stops
SCENE(function (g, t, T) {
  WD.interior(g, { floor: 2000, dim: true, seed: 26 });
  var gl = GX.at(T, GX.beatT(202), 0.0001) * (1 - GX.at(T, GX.beatT(202) + 0.18, 0.0001));
  WD.bustPanel(g, pose('C08'), 640, 130, 640, 780, { title: 'claude', bg: P.espresso, circle: P.apricot, scale: 1.06,
    over: function (g, ix, iy, iw, ih) {
      if (gl > 0) {
        for (var k = 0; k < 5; k++) { var y = iy + k * ih / 5, dx = (k % 2 ? 1 : -1) * 26; g.drawImage(g.canvas, ix, y + 2, iw, ih / 5 - 4, ix + dx, y + 2, iw, ih / 5 - 4); }
      }
      if (T > GX.beatT(202) + 0.18) { g.save(); g.globalAlpha = 0.16; GX.rect(g, P.cream, ix, iy, iw, ih); g.restore(); }
    } });
  if (T > GX.beatT(202) + 0.18) GX.text(g, '‖', 1240, 900, { size: 44, font: 'mono', color: P.grey, align: 'center' });
  WD.counter(g, { n: 4 });
});
