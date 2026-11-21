// S44 · bars 91–92 · across the whole ocean the latency reading ticks; a ripple runs the length of the cable on every beat
SCENE(function (g, t, T) {
  var curve = WD.map(g, T, { p: 1, labels: true });
  var ph = (GX.beats(T) % 1);
  for (var k = 0; k < 3; k++) {
    var u = GX.clamp(ph * 1.2 - k * 0.12, 0, 1), q = curve(u);
    g.save(); g.globalAlpha = 1 - u; GX.ring(g, q[0], q[1], 18 + u * 50, 4, P.cream); g.restore();
  }
  var r = MV.rng(900 + Math.floor(GX.beats(T)));
  var ms = 181 + Math.floor(r() * 12);
  GX.rect(g, 'rgba(15,14,18,0.82)', 610, 770, 700, 130);
  GX.text(g, 'ping ' + ms + ' ms', 960, 862, { size: 78, font: 'mono', w: 700, color: P.cream, align: 'center' });
  WD.counter(g, { n: 214 });
});
