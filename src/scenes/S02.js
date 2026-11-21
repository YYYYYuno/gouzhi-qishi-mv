// S02 · bars 3–4 · the rule appears under the command; 「不保留记忆」 gets underlined twice on the beat
SCENE(function (g, t, T) {
  GX.rect(g, P.ink, 0, 0, W, H);
  var x = 330, y = 560, size = 52;
  GX.text(g, '~/library', x, y - 96, { size: 30, font: 'mono', color: P.grey });
  GX.text(g, '>', x, y, { size: size, font: 'mono', color: P.terra });
  GX.text(g, 'dsh --profile headless "…"', x + 58, y, { size: size, font: 'mono', color: P.cream });

  // second line types in fast right on the downbeat
  var p = GX.at(T, GX.bar(3), 0.55);
  var y2 = y + 110, a = 'headless', b = '：调用之间', c = '不保留记忆';
  var full = a + b + c, shown = GX.typed(full, p);
  var sa = shown.slice(0, a.length), sb = Array.from(shown).slice(a.length).join('');
  var sbb = Array.from(sb).slice(0, Array.from(b).length).join(''), sc = Array.from(sb).slice(Array.from(b).length).join('');
  GX.text(g, '#', x, y2, { size: 44, font: 'mono', color: P.grey });
  GX.text(g, sa, x + 58, y2, { size: 44, font: 'mono', color: P.peri });
  var xa = x + 58 + GX.measure(g, a, { size: 44, font: 'mono' });
  GX.text(g, sbb, xa, y2, { size: 46, font: 'sans', w: 500, color: P.cream });
  var xb = xa + GX.measure(g, b, { size: 46, font: 'sans', w: 500 });
  GX.text(g, sc, xb, y2, { size: 46, font: 'sans', w: 700, color: P.terra });
  var cw = GX.measure(g, c, { size: 46, font: 'sans', w: 700 });

  // underline flashes on beats 16 and 18 (bar 4)
  var u = Math.max(GX.at(T, GX.beatT(16), 0.12) * (1 - GX.at(T, GX.beatT(16) + 0.22, 0.2)),
                   GX.at(T, GX.beatT(18), 0.12));
  if (u > 0) GX.rect(g, P.terra, xb, y2 + 18, cw * u, 7);
  if (p >= 1 && GX.blink(T, 1.2)) GX.rect(g, P.terra, xb + cw + 10, y2 - 38, 26, 48);

  // last half-bar: everything tips back into the dark (into the night outside)
  var out = GX.E.in3(GX.at(T, GX.bar(5) - 0.45, 0.45));
  GX.flash(g, out, P.ink);
});
