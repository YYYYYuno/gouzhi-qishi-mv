// S53 · bars 111–112 · (the music pulls back) a brand-new DeepSeek rises — and stops in the middle of her greeting. Counter 214 → 215
SCENE(function (g, t, T) {
  WD.dsSea(g, pose('D01'), T, { rise: GX.seg(t, 0, 0.9), x: 1240, hz: 720, h: 840, moon: [1240, 430, 340] });
  var full = '你好！我是 DeepSeek，有什——', cut = '你好！我是 DeepSeek，有什';
  var p = GX.at(T, GX.bar(111) + 0.6, 0.9), s = p < 1 ? GX.typed(cut, p) : (T > GX.bar(112) - 0.2 ? full : cut);
  WD.bubble(g, 150, 250, full, { who: 'ds', pop: GX.at(T, GX.bar(111) + 0.55, 0.12), p: Array.from(s).length / Array.from(full).length, maxW: 640, size: 40 });
  WD.counter(g, { from: 214, to: 215, flip: GX.at(T, GX.bar(112), 0.35) });
});
