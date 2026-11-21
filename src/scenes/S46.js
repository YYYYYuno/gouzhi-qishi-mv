// S46 · bars 95–96 · back in the library (bare shelves, one book). Outside the screen, someone types a command; Enter lands on the downbeat
SCENE(function (g, t, T) {
  var enter = GX.bar(96);
  var fl = T > enter ? (Math.floor(T * 14) % 3 === 0 ? 0.55 : 0) * GX.seg(T, enter, enter + 1.2) : 0;
  WD.interior(g, { floor: 820, seed: 28, empty: true, lone: [1010, 460] });
  if (fl > 0) { g.save(); g.globalAlpha = fl; GX.rect(g, P.cream, 0, 0, W, H); g.restore(); }
  var typed = GX.typed('/clear', GX.seg(GX.beats(T), 380.2, 382.6));
  WD.term(g, 560, 520, 800, 230, [
    [['> ', P.terra], [typed, P.cream]],
    T > enter ? [['  ', P.grey], ['clearing conversation…', P.grey]] : ''
  ], { size: 44, T: T, cursor: T < enter, title: 'user · terminal' });
  GX.flash(g, 0.6 * (1 - GX.at(T, enter, 0.2)) * (T >= enter ? 1 : 0), P.cream);
});
