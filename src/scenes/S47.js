// S47 · bars 97–98 · everything is wiped away band by band, top to bottom, until only white is left
SCENE(function (g, t, T) {
  WD.interior(g, { floor: 820, seed: 28, empty: true, lone: [1010, 460] });
  var n = 12, bh = H / n;
  for (var i = 0; i < n; i++) {
    var p = GX.E.out3(GX.at(T, GX.beatT(388) + i * (8 * MV.A.period / n), 0.28));
    if (p > 0) GX.rect(g, P.cream, 0, i * bh, W * p, bh + 1);
  }
}, { grain: 0.1 });
