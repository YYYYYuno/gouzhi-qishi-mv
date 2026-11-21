// S16 · bars 31–32 · to make a memoryless reader "know" her, 小克's prompt grows and grows and runs off the page
var lines = [{ s: '你好，DeepSeek：' }, { s: '背景：', c: P.terra }, { s: '你会认真审我的代码。' }, { s: '你会在 bug 旁边画鲸鱼。' }, { s: '你想很久才敢回答。' },
  { s: '上次我们聊了月亮……' }, { s: '我们其实见过。', c: P.terra }, { s: '我们其实见过很多次。', c: P.terra }, { s: '你可能不记得了，' }, { s: '但是没关系，' }, { s: '我来告诉你——' }];
function commas(n) { return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
SCENE(function (g, t, T) {
  WD.interior(g, { floor: 2000, dim: true, lamp: [520, 430, 330], seed: 21 });
  GX.rect(g, P.espresso, -100, 1086 - 820 * 0.097, W + 200, 200);
  GX.cut(g, pose('C01'), { x: 520, y: 1086, h: 820, ay: 1 });
  var p = GX.seg(GX.beats(T), 124.2, 131.7), shown = p * lines.length;
  var scroll = Math.max(0, (shown - 7.5) * 58);
  g.save(); g.beginPath(); g.rect(1040, 130, 860, 950); g.clip();
  g.translate(0, -scroll);
  WD.paper(g, 1100, 170, 660, 160 + 58 * Math.max(5, Math.ceil(shown) + 1), lines, { p: p, rot: 0.02, size: 34 });
  g.restore();
  var tok = Math.round(GX.lerp(42, 4096, GX.E.in3(p)));
  GX.text(g, 'prompt.txt · ' + commas(tok) + ' tokens', 1110, 110, { size: 28, font: 'mono', color: tok > 2000 ? P.terra : P.grey });
});
