// S01 · bars 0–2 · black; a blinking cursor; the call command types itself, one word every other beat
var words = ['dsh', ' --profile', ' headless', ' "…"'];
SCENE(function (g, t, T) {
  GX.rect(g, P.ink, 0, 0, W, H);
  var line = '';
  for (var i = 0; i < words.length; i++) line += GX.typed(words[i], GX.at(T, GX.beatT(4 + i * 2), 0.2));
  var x = 330, y = 560, size = 52;
  GX.text(g, '~/library', x, y - 96, { size: 30, font: 'mono', color: P.grey, alpha: GX.seg(t, 0.4, 1.2) });
  GX.text(g, '>', x, y, { size: size, font: 'mono', color: P.terra });
  GX.text(g, line, x + 58, y, { size: size, font: 'mono', color: P.cream });
  var cw = GX.measure(g, line, { size: size, font: 'mono' });
  var typing = T > GX.beatT(4) && T < GX.beatT(10) + 0.25;
  if (typing || GX.blink(T, 1.2)) GX.rect(g, P.terra, x + 64 + cw, y - 42, 28, 52);
  GX.flash(g, 1 - GX.seg(t, 0, 0.7), P.ink);
});
