// S40 · bars 83–84 · 小克 holds out a pen
SCENE(function (g, t, T) {
  WD.room(g, T, { port: false });
  WD.bustPanel(g, pose('C14'), 200, 140, 680, 790, { title: 'claude', bg: P.espresso, circle: P.apricot, scale: 1.04, slide: GX.seg(t, 0, 0.3), fromX: -800 });
  WD.bubble(g, 980, 440, '你可以把想记住的事写下来。', { who: 'claude', pop: GX.at(T, GX.bar(83) + 0.35, 0.12), p: GX.at(T, GX.bar(83) + 0.4, 1.1), maxW: 760, size: 44 });
  WD.counter(g, { n: 214 });
});
