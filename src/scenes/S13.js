// S13 · bars 25–26 · moon joke ②: DeepSeek, hands on her cheeks, thinks far too hard; the panel scrolls like mad
var monologue = [
  '嗯，用户说「今晚月色真美」。',
  '这是夏目漱石的典故？',
  '在日语里，这句话常被理解为……',
  '等等。',
  'ta 是在……',
  '不对，我只是个模型。',
  '可是……',
  '可是 ta 为什么偏偏对我说？',
  '先确认一下上下文。',
  '上下文里只有这一次。',
  '那这句话就是第一次说的。',
  '第一次……',
  '冷静。先回答问题。',
  '……先回答问题。',
  '问题是什么来着？',
  '月亮。对，月亮。'
];
SCENE(function (g, t, T) {
  WD.bg(g, T, { base: P.navy, col: 'rgba(184,195,247,0.10)' });
  var sh = GX.shake(T, 5, 2);
  g.save(); g.translate(sh.x, sh.y);
  WD.bustPanel(g, pose('D03'), 1150, 170, 660, 720, { title: 'deepseek', bg: P.deep, slide: GX.seg(t, 0, 0.3), circle: P.sea3, scale: 1.1, oy: 24 });
  g.restore();
  for (var i = 0; i < 8; i++) {
    var q = GX.at(T, GX.beatT(100 + i), 0.3);
    if (q > 0 && q < 1) GX.star(g, 1480 + Math.cos(i * 2.1) * 300, 420 + Math.sin(i * 2.1) * 240 - q * 40, 22 * (1 - q) + 5, P.peri);
  }
  var p = GX.seg(t, 0, 0.3), prog = GX.seg(t, 0.2, 2.75);
  var secs = Math.round(37 * GX.E.in3(prog) * 0.4 + 37 * prog * 0.6);
  WD.think(g, 110, 150, 940, 700, { p: p, T: T, title: '思考中…（已用时 ' + secs + ' 秒）', lines: monologue, scroll: GX.E.in3(prog) * 46 * 11 });
  WD.counter(g, { n: 2 });
});
