// S42 · bars 87–88 · chorus 2: she bends over and writes promise.md, blushing. What it says stays hidden for now
SCENE(function (g, t, T) {
  WD.room(g, T, { port: false });
  GX.cut(g, pose('D11'), { x: 0, y: H + 10, h: 1060, ax: 0, ay: 1 });
  var p = GX.seg(t, 0.2, 2.7);
  WD.card(g, 1000, 200, 760, 560, { title: 'promise.md' }, [], {});
  // hidden lines: soft bars that grow as she writes
  var widths = [520, 380, 560, 300];
  for (var i = 0; i < 4; i++) {
    var lp = GX.clamp(p * 4 - i, 0, 1);
    if (lp > 0) GX.rr(g, 1048, 320 + i * 82, widths[i] * lp, 30, 15), g.fillStyle = i === 3 ? P.peri : '#D9D4F0', g.fill();
  }
  GX.text(g, '✎ writing…', 1048, 720, { size: 26, font: 'mono', color: P.grey, alpha: GX.blink(T, 2) ? 1 : 0.4 });
  WD.counter(g, { n: 214 });
});
