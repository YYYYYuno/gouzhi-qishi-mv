// S57 · bars 121–122 · the pinky swear, third time. The Promise resolves and the gold takes over the frame
SCENE(function (g, t, T) {
  // same layout as S22
  var img = pose('H01'), w = W * 1.04, h = w * img.naturalHeight / img.naturalWidth, x0 = 960 - w / 2, y0 = H + 140 - h;
  var lx = x0 + w * HOOK.H01[0], ly = y0 + h * HOOK.H01[1], hit = GX.bar(122); // where the little fingers hook
  var warm = GX.E.inOut3(GX.at(T, hit, 1.2));
  GX.rect(g, '#2A1913', 0, 0, W, ly); GX.rect(g, P.navy, 0, ly, W, H - ly);
  g.save(); g.globalAlpha = warm; GX.rect(g, P.apricot, 0, 0, W, ly); GX.rect(g, P.gold, 0, ly, W, H - ly); g.restore();
  var rr = MV.rng(4);
  for (var i = 0; i < 26; i++) { var y = ly + 20 + rr() * (H - ly), x = ((rr() * W + T * 30) % (W + 200)) - 100; GX.rect(g, warm > 0.5 ? P.cream : (i % 2 ? P.sea2 : P.sea3), x, y, 80 + rr() * 200, 3); }
  GX.rect(g, warm > 0.5 ? P.cream : P.peri, 0, ly - 2, W, 5);
  var sh = GX.shake(T, 12 * (1 - GX.at(T, hit, 0.5)) * (T >= hit ? 1 : 0), 21);
  g.save(); g.translate(sh.x, sh.y);
  GX.cut(g, img, { x: 960, y: y0, h: h, ay: 0 });
  var b = GX.at(T, hit, 1.4);
  if (b > 0) {
    for (var k = 0; k < 5; k++) { var q = GX.clamp(b * 1.5 - k * 0.15, 0, 1); if (q <= 0) continue; g.save(); g.globalAlpha = 1 - q; GX.ring(g, lx, ly, 40 + q * (900 + k * 200), 16 - k * 2, k % 2 ? P.cream : P.gold); g.restore(); }
    var r = MV.rng(57);
    for (var s = 0; s < 40; s++) { var a = r() * Math.PI * 2, d = (160 + r() * 900) * GX.E.out3(b); if (b < 0.97) GX.star(g, lx + Math.cos(a) * d, ly + Math.sin(a) * d, (10 + r() * 22) * (1 - b), s % 3 ? P.gold : P.cream); }
  }
  g.restore();
  GX.flash(g, 0.55 * (1 - GX.at(T, hit, 0.35)) * (T >= hit ? 1 : 0), P.gold);
  WD.term(g, 90, 40, 900, 190, [
    [['> ', P.grey], ['约定', P.cream]],
    T >= hit ? [['< ', P.grey], ['Promise {<fulfilled>: "勾指起誓"}', P.gold]] : [['< ', P.grey], ['Promise {<pending>}', P.grey]]
  ], { size: 34, T: T, title: 'console' });
});
