// S38 · bars 79–80 · in her little room the DeepSeek of this call turns round — and her greeting stops halfway
SCENE(function (g, t, T) {
  WD.room(g, T, {});
  WD.bustPanel(g, pose('D09'), 1080, 150, 620, 760, { title: 'deepseek', bg: P.deep, circle: P.sea3, scale: 1.06, slide: GX.seg(t, 0, 0.3) });
  WD.bubble(g, 200, 520, '你好！我是…', { who: 'ds', pop: GX.at(T, GX.bar(79) + 0.4, 0.12), p: GX.at(T, GX.bar(79) + 0.45, 0.6), size: 44 });
  WD.counter(g, { n: 214 });
});
