// S25 · bars 48–49 · the next call. She rises with exactly the same greeting. Counter 3 → 4
SCENE(function (g, t, T) {
  WD.dsSea(g, pose('D01'), T, { rise: GX.seg(t, 0, 0.8), x: 1240, hz: 720, h: 840, moon: [1240, 430, 340] });
  WD.bubble(g, 150, 250, '你好！我是 DeepSeek，有什么可以帮你？', { who: 'ds', pop: GX.at(T, GX.bar(48) + 0.5, 0.12), p: GX.at(T, GX.bar(48) + 0.55, 0.9), maxW: 640, size: 40 });
  WD.counter(g, { from: 3, to: 4, flip: GX.at(T, GX.bar(49), 0.3) });
});
