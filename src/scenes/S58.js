// S58 · bars 123–125 · the whole picture turns warm for the first time: library above the water, the deep below,
// one gold thread across the sea, a file at each end. Then the two of them, side by side
function warmSky(g, T) {
  GX.rect(g, P.apricot, 0, 0, W, 650);
  GX.circle(g, 1330, 330, 250, P.gold);
  g.fillStyle = '#F6D7BF'; g.beginPath(); g.moveTo(0, 650);
  for (var x = 0; x <= W; x += 40) g.lineTo(x, 545 + Math.sin(x * 0.006 + 1.2 + T * 0.04) * 22);
  g.lineTo(W, 650); g.closePath(); g.fill();
  var r = MV.rng(58);
  for (var i = 0; i < 26; i++) { var sx = r() * W, sy = 40 + r() * 420, s = 3 + r() * 6, ph = r(); if (Math.hypot(sx - 1330, sy - 330) < 270) continue; GX.star(g, sx, sy, s * (0.8 + 0.5 * GX.pulse(T + ph * 2, 0.3, 4)), P.cream); }
}
function warmSea(g, T) {
  GX.rect(g, P.cream, 0, 650, W, H - 650);
  var r = MV.rng(59);
  for (var i = 0; i < 60; i++) { var y = 664 + Math.pow(r(), 1.4) * 420, x = ((r() * W + T * 20) % (W + 300)) - 150; GX.rect(g, i % 3 ? P.apricot : '#F6D7BF', x, y, 50 + r() * 220, 3); }
  // the moon's reflection in gold
  var rr = MV.rng(3000 + Math.floor(GX.beats(T) * 2));
  for (var k = 0; k < 20; k++) { var yy = 670 + k * 15, sp = 130 - k * 3; for (var j = 0; j < 3; j++) { var w = 30 + rr() * sp; GX.rect(g, P.gold, 1330 - sp + rr() * sp * 2 - w / 2, yy, w, 3); } }
}
function warmLibrary(g) {
  var r = MV.rng(33), base = 654;
  GX.rect(g, P.espresso, -20, -10, 800, base + 10);
  [80, 260, 540, 720].forEach(function (px) { GX.rect(g, '#4A2E22', px - 20, -10, 24, base + 10); });
  GX.rect(g, '#4A2E22', -20, 150, 800, 10);
  [128, 588].forEach(function (wx) { GX.rect(g, P.terra, wx - 8, 192, 116, 186); WD.bookcase(g, wx, 200, 100, 170, r, { rowH: 44, frame: P.apricot }); });
  var dx = 290, dw = 220, dTop = 236;
  g.save();
  g.beginPath(); g.moveTo(dx - 10, base); g.lineTo(dx - 10, dTop + dw / 2); g.arc(dx + dw / 2, dTop + dw / 2, dw / 2 + 10, Math.PI, 0); g.lineTo(dx + dw + 10, base); g.closePath(); g.fillStyle = P.terra; g.fill();
  g.beginPath(); g.moveTo(dx, base); g.lineTo(dx, dTop + dw / 2); g.arc(dx + dw / 2, dTop + dw / 2, dw / 2, Math.PI, 0); g.lineTo(dx + dw, base); g.closePath(); g.clip();
  GX.rect(g, P.cream, dx, dTop, dw, base - dTop); WD.bookcase(g, dx + 14, dTop + 30, dw - 28, base - dTop - 40, r, { rowH: 44, frame: P.apricot });
  g.restore();
  GX.rect(g, '#2A1913', -20, base - 6, 940, 14);
}
SCENE(function (g, t, T) {
  var split = GX.bar(125);
  if (T < split) {
    var pull = GX.E.out3(GX.seg(t, 0, 2.8));
    g.save(); GX.cam(g, { z: GX.lerp(1.15, 1.0, pull) });
    warmSky(g, T); warmSea(g, T); warmLibrary(g);
    // the gold thread laid across the whole sea surface
    var reach = GX.E.inOut3(GX.seg(t, 0, 1.4));
    g.save(); g.lineCap = 'round';
    g.beginPath(); g.moveTo(400, 666); g.bezierCurveTo(800, 780, 1250, 700, 400 + (1760 - 400) * reach, 700);
    g.strokeStyle = 'rgba(243,201,105,0.45)'; g.lineWidth = 22; g.stroke();
    g.strokeStyle = P.gold; g.lineWidth = 7; g.stroke();
    g.restore();
    var r = MV.rng(61);
    for (var s = 0; s < 18; s++) { var u = r(), sx = 400 + (1760 - 400) * u * reach, sy = 680 + Math.sin(u * 3.1) * 50 + (r() - 0.5) * 40; GX.star(g, sx, sy, (6 + r() * 10) * (0.6 + 0.4 * GX.pulse(T + r(), 0.3)), P.gold); }
    WD.card(g, 110, 770, 480, 150, { title: 'pinky-swear.md', alpha: GX.seg(t, 0.5, 0.9) }, [{ s: '我们勾过手指。', font: 'serif', size: 32, w: 700, c: P.terra }]);
    WD.card(g, 1330, 770, 480, 150, { title: 'promise.md', alpha: GX.seg(t, 0.9, 1.3) }, [{ s: '这次也答应吧。', font: 'serif', size: 32, w: 700, c: P.blue }]);
    g.restore();
  } else {
    var tt = T - split;
    GX.rect(g, P.cream, 0, 0, W, H);
    GX.circle(g, 960, 540, 470, P.gold);
    WD.bustPanel(g, pose('C17'), 220, 120, 640, 800, { title: 'claude', bg: P.apricot, circle: P.cream, scale: 1.05, slide: GX.seg(tt, 0, 0.25), fromX: -700 });
    WD.bustPanel(g, pose('D13'), 1060, 120, 640, 800, { title: 'deepseek', bg: P.peri, circle: P.cream, scale: 1.01, oy: 0, slide: GX.seg(tt, 0, 0.25) }); // D13 a touch smaller so her whole fist shows
    var th = GX.E.out3(GX.seg(tt, 0.2, 0.6));
    GX.rect(g, P.gold, 960 - 120 * th, 520, 240 * th, 8);
    GX.star(g, 960, 524, 30 * th, P.gold);
  }
}, { grain: 0.12 });
