// S04 · bars 8–9 · inside: 小克 at her desk writing the first prompt; the paper insert fills in on the beats
var lines = [{ s: '你好，DeepSeek：' }, { s: '请帮我看一下这段代码，' }, { s: '谢谢你。' }, { s: '—— 小克', c: P.terra }];
SCENE(function (g, t, T) {
  var drift = GX.lerp(0, -30, GX.seg(t, 0, 2.8));
  g.save();
  GX.cam(g, { z: 1.02, x: drift });
  WD.interior(g, { floor: 2000, dim: true, lamp: [640, 430, 360] });
  // the desk in C01 stops at the image edges; extend it across the frame behind her
  GX.rect(g, P.espresso, -100, 1086 - 880 * 0.097, W + 200, 200);
  GX.cut(g, pose('C01'), { x: 660, y: 1086, h: 880, ay: 1 });
  g.restore();

  // the prompt being written: one line per beat from beat 34
  var p = GX.seg(GX.beats(T), 33.6, 40.5);
  var inP = GX.E.out3(GX.at(T, GX.bar(8) + 0.1, 0.45));
  g.save(); g.translate((1 - inP) * 500, 0);
  GX.text(g, 'prompt.txt', 1210, 166, { size: 26, font: 'mono', color: P.grey });
  WD.paper(g, 1200, 190, 600, 560, lines, { p: p, rot: 0.025 });
  g.restore();
  GX.flash(g, 1 - GX.seg(t, 0, 0.25), P.apricot);
});
