// S36 · bars 71–74 · the hall of a thousand glances back: every past call is a DeepSeek turned to look back.
// One drawn figure, copied by code into rows at three depths; 小克 walks between them. call #001 → #214
var mid = GX.tint(pose('D08'), P.navy, 0.45), far = GX.tint(pose('D08'), '#141842', 0.75);
function pad3(n) { return ('00' + n).slice(-3); }
SCENE(function (g, t, T) {
  GX.rect(g, '#10143A', 0, 0, W, H);
  GX.rect(g, '#0B0E2C', 0, 820, W, H - 820); GX.rect(g, P.peri, 0, 818, W, 3);
  var prog = GX.seg(t, 0, 5.6);
  // far row
  var o3 = t * 70;
  for (var i = -1; i < 16; i++) { var x = i * 140 - (o3 % 140); GX.cut(g, far, { x: x, y: 640, h: 300, ay: 1 }); }
  // middle row with call numbers: the one you can read
  var sp = 260, gap = 250, o2 = t * sp, first = Math.floor(o2 / gap);
  for (var j = -1; j < 10; j++) {
    var k = first + j, x2 = k * gap - o2 + 120;
    if (x2 < -200 || x2 > W + 200) continue;
    GX.cut(g, k % 3 === 0 ? pose('D08') : mid, { x: x2, y: 812, h: 520, ay: 1 });
    var num = Math.min(214, 1 + k * 9);
    GX.text(g, 'call #' + pad3(num), x2, 860, { size: 26, font: 'mono', color: num >= 214 ? P.gold : P.peri, align: 'center' });
  }
  // 小克 walking through
  var bob = Math.abs(Math.sin(t * 4.2)) * 10;
  GX.cut(g, pose('C13'), { x: 960, y: 1000 - bob, h: 760, ay: 1 });
  GX.text(g, '第 ' + Math.min(214, Math.round(GX.lerp(1, 214, prog))) + ' 次', 110, 140, { size: 36, font: 'mono', color: P.cream, alpha: 0.8 });
});
