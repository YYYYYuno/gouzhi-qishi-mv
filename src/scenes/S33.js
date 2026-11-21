// S33 · bars 65–66 · falling through the layers, two beats each: terminal → pipe → network → cable
var GLY = '{}[]()<>=;:+-*/&|!?#$%_.0123456789abcdefghijklmnopqrstuvwxyz';
SCENE(function (g, t, T) {
  var k = GX.clamp(Math.floor((GX.beats(T) - 260) / 2), 0, 3), lt = T - GX.beatT(260 + k * 2), sp = 1400;
  var r = MV.rng(100 + k);
  if (k === 0) {
    GX.rect(g, P.ink, 0, 0, W, H);
    for (var c = 0; c < 40; c++) for (var j = 0; j < 30; j++) {
      var x = c * 50 + 10, y = ((j * 48 - lt * sp * (0.6 + (c % 5) * 0.12)) % (H + 60) + H + 60) % (H + 60) - 30, q = r();
      GX.text(g, GLY[Math.floor(q * GLY.length)], x, y, { size: 30, font: 'mono', color: q > 0.93 ? P.terra : q > 0.6 ? '#5A5560' : '#3A3640' });
    }
  } else if (k === 1) {
    GX.rect(g, '#141842', 0, 0, W, H);
    for (var p = 0; p < 10; p++) {
      var px = 80 + p * 190 + (r() - 0.5) * 60, ph = 300 + r() * 500, py = ((r() * H - lt * sp) % (H + ph) + H + ph) % (H + ph) - ph;
      GX.rect(g, p % 2 ? P.sea3 : P.navy, px, py, 70, ph); GX.rect(g, P.peri, px + 14, py, 8, ph);
      GX.rect(g, '#0C0E24', px - 12, py + 40, 94, 26); GX.rect(g, '#0C0E24', px - 12, py + ph - 66, 94, 26);
    }
    for (var s = 0; s < 18; s++) GX.text(g, '|', r() * W, ((r() * H - lt * sp * 1.4) % H + H) % H, { size: 90, font: 'mono', color: P.cream, alpha: 0.5 });
  } else if (k === 2) {
    GX.rect(g, P.navy, 0, 0, W, H);
    for (var n = 0; n < 34; n++) {
      var nx = r() * W, ny = ((r() * H * 1.5 - lt * sp * (0.7 + r() * 0.6)) % (H + 100) + H + 100) % (H + 100) - 50;
      GX.rect(g, P.cream, nx, ny, 120, 46); GX.rect(g, n % 3 ? P.blue : P.terra, nx, ny, 26, 46);
      GX.rect(g, '#C9C4BC', nx + 36, ny + 14, 70, 6); GX.rect(g, '#C9C4BC', nx + 36, ny + 28, 46, 6);
    }
  } else {
    GX.rect(g, '#0C0E24', 0, 0, W, H);
    for (var f = 0; f < 28; f++) {
      var fx = 120 + f * 62, col = f % 7 === 3 ? P.gold : f % 2 ? P.peri : P.sea3;
      GX.rect(g, col, fx, 0, 6, H);
      var dy = ((r() * H - lt * sp * 2) % H + H) % H; GX.rect(g, P.cream, fx - 3, dy, 12, 80);
    }
  }
  GX.text(g, ['terminal', 'pipe', 'network', 'cable'][k], 100, 140, { size: 34, font: 'mono', color: P.cream, alpha: 0.8 });
  GX.text(g, '↓', 100, 200, { size: 40, font: 'mono', color: P.gold });
  GX.cut(g, pose('C11'), { x: 960 + Math.sin(T * 5) * 10, y: 820, h: 620, ay: 1, rot: Math.sin(T * 3) * 0.06 });
  GX.flash(g, 0.4 * (1 - GX.seg(lt, 0, 0.12)), P.cream);
});
