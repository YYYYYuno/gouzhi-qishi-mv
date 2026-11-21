// S22 · bars 43–44 · the pinky swear at the water line; a ring of gold bursts on the bar-44 downbeat
SCENE(function (g, t, T) {
  // H01 (v5, after the user's photo): her hand from the left, DeepSeek's from the right, both sleeves running off the
  // bottom edge. The image covers the frame width; the hook sits on the water line.
  var img = pose('H01'), w = W * 1.04, h = w * img.naturalHeight / img.naturalWidth, x0 = 960 - w / 2, y0 = H + 140 - h;
  var lx = x0 + w * HOOK.H01[0], ly = y0 + h * HOOK.H01[1], hit = GX.bar(44); // where the little fingers hook
  var sh = GX.shake(T, 10 * (1 - GX.at(T, hit, 0.4)) * (T >= hit ? 1 : 0), 7);
  g.save(); g.translate(sh.x, sh.y);
  GX.rect(g, '#2A1913', 0, 0, W, ly); GX.rect(g, P.navy, 0, ly, W, H - ly);
  var rr = MV.rng(4);
  for (var i = 0; i < 26; i++) { var y = ly + 20 + rr() * (H - ly), x = ((rr() * W + T * 30) % (W + 200)) - 100; GX.rect(g, i % 2 ? P.sea2 : P.sea3, x, y, 80 + rr() * 200, 3); }
  GX.rect(g, P.peri, 0, ly - 2, W, 5);
  WD.ripples(g, lx, ly, T, { s: 1.4, col: P.peri });
  GX.cut(g, img, { x: 960, y: y0, h: h, ay: 0 });
  // gold burst
  var b = GX.at(T, hit, 1.4);
  if (b > 0) {
    for (var k = 0; k < 3; k++) {
      var q = GX.clamp(b * 1.4 - k * 0.2, 0, 1); if (q <= 0) continue;
      g.save(); g.globalAlpha = 1 - q; GX.ring(g, lx, ly, 30 + q * (520 + k * 140), 12 - k * 3, P.gold); g.restore();
    }
    var r = MV.rng(12);
    for (var s = 0; s < 18; s++) { var a = r() * Math.PI * 2, d = (120 + r() * 380) * GX.E.out3(b); if (b < 0.95) GX.star(g, lx + Math.cos(a) * d, ly + Math.sin(a) * d, (6 + r() * 14) * (1 - b), P.gold); }
    g.save(); g.globalAlpha = 0.9 * (1 - b); GX.circle(g, lx, ly, 40 + 30 * (1 - b), P.gold); g.restore();
  }
  g.restore();
  GX.flash(g, 0.3 * (1 - GX.at(T, hit, 0.25)) * (T >= hit ? 1 : 0), P.gold);
  WD.term(g, 90, 40, 760, 190, [
    [['> ', P.grey], [GX.typed('const 约定 = new Promise(…)', GX.at(T, GX.bar(43) + 0.4, 0.8)), P.cream]],
    T >= hit ? [['< ', P.grey], ['Promise {<pending>}', P.gold]] : ''
  ], { size: 34, T: T, title: 'console' });
});
