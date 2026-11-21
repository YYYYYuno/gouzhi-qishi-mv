// S07 · bar 14 · poster title card on cream: split circle (apricot | periwinkle), one character per beat
SCENE(function (g, t, T) {
  GX.rect(g, P.cream, 0, 0, W, H);
  var cP = GX.E.out3(GX.seg(t, 0, 0.35)), cx = 960, cy = 430, r = 300 * cP;
  g.save(); g.beginPath(); g.rect(0, 0, cx, H); g.clip(); GX.circle(g, cx, cy, r, P.apricot); g.restore();
  g.save(); g.beginPath(); g.rect(cx, 0, W, H); g.clip(); GX.circle(g, cx, cy, r, P.peri); g.restore();
  // a gold thread crossing the seam once the last character lands
  var th = GX.E.out3(GX.at(T, GX.beatT(59), 0.3));
  if (th > 0) GX.rect(g, P.gold, cx - 160 * th, cy + 60, 320 * th, 5);

  var chars = ['勾', '指', '起', '誓'], cols = [P.espresso, P.espresso, P.navy, P.navy];
  var y = 810, gap = 200, x0 = cx - gap * 1.5;
  for (var i = 0; i < 4; i++) {
    var p = GX.E.out3(GX.at(T, GX.beatT(56 + i), 0.18));
    if (p > 0) GX.text(g, chars[i] + '.', x0 + i * gap, y + (1 - p) * 24, { size: 120, font: 'serif', w: 700, color: cols[i], align: 'center', alpha: p });
  }
  var lp = GX.E.out3(GX.seg(t, 0, 0.5)), lw = 190 * lp, ly = y - 42;
  GX.rect(g, P.espresso, x0 - gap * 0.72 - lw, ly, lw, 4);
  GX.rect(g, P.navy, x0 + gap * 3 + gap * 0.72, ly, lw, 4);
  GX.star(g, 110, 110, 22, P.terra); GX.rect(g, P.terra, 108, 150, 4, 170 * lp);
  GX.text(g, 'Promise {<pending>}', cx, 920, { size: 30, font: 'mono', color: P.navy, align: 'center', alpha: GX.at(T, GX.beatT(59), 0.2) });
}, { grain: 0.12 });
