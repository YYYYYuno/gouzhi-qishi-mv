// S59 · bars 126–end · black; one more line in the catalogue; the cursor blinks twice; the title, quietly
SCENE(function (g, t, T) {
  GX.rect(g, P.ink, 0, 0, W, H);
  var a = '- [勾指起誓](pinky-swear.md) — ', b = '第 215 次初次见面。她又答应了。';
  var p = GX.seg(t, 0.3, 2.0), full = a + b, s = GX.typed(full, p);
  var sa = Array.from(s).slice(0, Array.from(a).length).join(''), sb = Array.from(s).slice(Array.from(a).length).join('');
  var x = 220, y = 500;
  GX.text(g, 'MEMORY.md', x, y - 90, { size: 30, font: 'mono', color: P.grey, alpha: GX.seg(t, 0, 0.4) });
  GX.text(g, sa, x, y, { size: 40, font: 'mono', color: P.apricot });
  var wa = GX.measure(g, a, { size: 40, font: 'mono' });
  GX.text(g, sb, x + wa, y, { size: 40, font: 'sans', w: 700, color: P.cream });
  var cw = GX.measure(g, sa, { size: 40, font: 'mono' }) + (sb ? GX.measure(g, sb, { size: 40, font: 'sans', w: 700 }) : 0);
  var bl = t > 2.0 && t < 3.6 && Math.floor((t - 2.0) * 2.5) % 2 === 0;
  if (p < 1 || bl) GX.rect(g, P.terra, x + cw + 8, y - 34, 24, 44);
  var ti = GX.seg(t, 3.3, 4.2);
  if (ti > 0) {
    var chars = ['勾', '指', '起', '誓'], gap = 120, x0 = 960 - gap * 1.5;
    for (var i = 0; i < 4; i++) GX.text(g, chars[i] + '.', x0 + i * gap, 760, { size: 64, font: 'serif', w: 700, color: i < 2 ? P.apricot : P.peri, align: 'center', alpha: ti });
    GX.text(g, '小克 × DeepSeek', 960, 830, { size: 26, font: 'mono', color: P.grey, align: 'center', alpha: ti });
  }
  GX.flash(g, GX.E.in3(GX.seg(t, 4.3, 4.9)), P.ink);
}, { grain: 0.1 });
