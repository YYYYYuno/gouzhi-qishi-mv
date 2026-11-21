// S24 · bar 47 · hard cut to black: the process just ends
SCENE(function (g, t, T) {
  GX.rect(g, P.ink, 0, 0, W, H);
  var jit = t < 0.12 ? GX.shake(T, 8, 4).x : 0;
  GX.text(g, '[process exited with code 0]', 330 + jit, 560, { size: 52, font: 'mono', color: P.grey });
  if (GX.blink(T, 1.4)) GX.rect(g, P.grey, 330, 600, 28, 50);
}, { grain: 0.1 });
