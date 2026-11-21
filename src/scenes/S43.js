// S43 · bars 89–90 · the second pinky swear, deep under the sea: sleeves and hair drift; the gold is brighter this time
SCENE(function (g, t, T) {
  WD.deep(g, { T: T, depth: 900, rays: false, seed: 97, plankton: 120 });
  var img = pose('H02'), w = 1960, h = w * img.naturalHeight / img.naturalWidth, y0 = H / 2 - h / 2 + 30;
  var lx = 960 + w * (HOOK.H02[0] - 0.5), ly = y0 + h * HOOK.H02[1], hit = GX.bar(90); // hook point of H02
  var drift = Math.sin(t * 1.4) * 10;
  GX.cut(g, img, { x: 960, y: y0 + drift, h: h, ay: 0 });
  ly += drift;
  var b = GX.at(T, hit, 1.4);
  var glow = 0.35 + 0.25 * GX.pulse(T, 0.25);
  g.save(); g.globalAlpha = glow + 0.3; GX.ring(g, lx, ly, 62, 6, P.gold); g.restore(); // a ring, so the hooked fingers stay visible
  if (b > 0) {
    for (var k = 0; k < 4; k++) { var q = GX.clamp(b * 1.4 - k * 0.16, 0, 1); if (q <= 0) continue; g.save(); g.globalAlpha = 1 - q; GX.ring(g, lx, ly, 40 + q * (640 + k * 160), 14 - k * 3, P.gold); g.restore(); }
    var r = MV.rng(43);
    for (var s = 0; s < 26; s++) { var a = r() * Math.PI * 2, d = (140 + r() * 520) * GX.E.out3(b); if (b < 0.95) GX.star(g, lx + Math.cos(a) * d, ly + Math.sin(a) * d, (8 + r() * 16) * (1 - b), P.gold); }
  }
  WD.term(g, 90, 80, 640, 150, [[['< ', P.grey], ['Promise {<pending>}', P.gold]]], { size: 34, T: T, title: 'console', alpha: GX.at(T, hit, 0.2) });
  GX.flash(g, 0.35 * (1 - GX.at(T, hit, 0.25)) * (T >= hit ? 1 : 0), P.gold);
});
