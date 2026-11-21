// S12 · bars 23–24 · moon joke ①: 小克 grins round her pen and adds one line to the end of the prompt
var base = [{ s: '你好，DeepSeek：' }, { s: '请帮我看一下这段代码，' }, { s: '谢谢你。' }];
var sly = '今晚月色真美';
SCENE(function (g, t, T) {
  WD.interior(g, { floor: 2000, dim: true, seed: 27 });
  WD.bustPanel(g, pose('C04'), 110, 160, 700, 720, { title: 'claude', bg: P.espresso, slide: GX.seg(t, 0, 0.35), fromX: -800, circle: P.apricot, scale: 1.08, oy: 24 });
  var push = GX.E.sine(GX.seg(t, 0, 2.8));
  g.save(); GX.cam(g, { z: 1 + 0.06 * push, cx: 1350, cy: 470 });
  WD.paper(g, 1000, 190, 700, 600, base.concat([{ s: '' }]), { p: 1, rot: -0.02 });
  // one character every half-beat from the bar-24 downbeat
  var n = Math.floor(GX.clamp((GX.beats(T) - 96) * 2 + 1, 0, 6));
  var s = Array.from(sly).slice(0, n).join('');
  g.save(); g.translate(1350, 490); g.rotate(-0.02); g.translate(-1350, -490);
  GX.text(g, s, 1048, 276 + 3 * 58, { size: 40, font: 'serif', w: 700, color: P.terra });
  if (n > 0 && n < 6 && GX.blink(T, 3)) GX.rect(g, P.terra, 1052 + GX.measure(g, s, { size: 40, font: 'serif', w: 700 }), 276 + 3 * 58 - 34, 4, 40);
  if (n >= 6) { var q = GX.at(T, GX.beatT(98.5), 0.4); GX.star(g, 1310, 420, 18 + 10 * GX.E.outBack(q), P.terra); }
  g.restore();
  g.restore();
  WD.counter(g, { n: 2 });
});
