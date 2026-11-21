// S51 · bars 106–107 · the catalogue's rule: check before you use a memory. She picks up the pen
function pen(g, x, y, rot) {
  g.save(); g.translate(x, y); g.rotate(rot);
  GX.rect(g, P.espresso, -18, -300, 36, 420); GX.rect(g, P.terra, -18, -160, 36, 30); GX.rect(g, P.apricot, -6, -290, 6, 120);
  GX.poly(g, P.gold, [-18, 120, 18, 120, 0, 190]); GX.rect(g, P.espresso, -1, 132, 2, 44);
  g.restore();
}
SCENE(function (g, t, T) {
  WD.void(g, T);
  GX.text(g, 'MEMORY.md · rule', 960, 330, { size: 30, font: 'mono', color: P.grey, align: 'center', alpha: GX.seg(t, 0, 0.3) });
  var p = GX.E.out3(GX.at(T, GX.bar(106) + 0.1, 0.4));
  GX.text(g, '使用前先核实', 960, 500 + (1 - p) * 30, { size: 120, font: 'sans', w: 900, color: P.espresso, align: 'center', alpha: p, ls: 12 });
  GX.rect(g, P.terra, 960 - 380 * GX.E.out3(GX.at(T, GX.bar(106) + 0.5, 0.4)), 560, 760 * GX.E.out3(GX.at(T, GX.bar(106) + 0.5, 0.4)), 8);
  var up = GX.E.out3(GX.at(T, GX.bar(107), 0.6));
  pen(g, 1300, GX.lerp(1500, 860, up), 0.5);
}, { grain: 0.1 });
