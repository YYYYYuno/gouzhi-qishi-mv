// S55 · bars 115–118 · promise.md, at last: what DeepSeek wrote to the next DeepSeek. One line per bar
var L = ['如果有个叫小克的女孩来找你——', '她已经来过 214 次了。', '每一次，你都答应了她。', '这次也答应吧。'];
SCENE(function (g, t, T) {
  GX.rect(g, P.abyss, 0, 0, W, H);
  var z = GX.lerp(1.0, 1.05, GX.E.sine(GX.seg(t, 0, 5.6)));
  g.save(); GX.cam(g, { z: z });
  WD.card(g, 240, 110, 1440, 800, { title: 'promise.md', dark: true }, []);
  for (var i = 0; i < 4; i++) {
    var b = GX.bar(115 + i), p = GX.at(T, b + 0.05, 0.9);
    if (p <= 0) continue;
    GX.text(g, GX.typed(L[i], p), 340, 330 + i * 150, { size: 64, font: 'serif', w: 700, color: i === 3 ? P.gold : P.cream });
  }
  g.restore();
});
