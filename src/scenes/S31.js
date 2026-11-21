// S31 · bar 62 · a new line in the catalogue, then the compaction flash takes everything
SCENE(function (g, t, T) {
  WD.interior(g, { floor: 2000, seed: 28, empty: true, dim: true });
  WD.card(g, 330, 220, 1260, 520, { title: 'MEMORY.md' }, [
    { s: '- [图书馆规则](rules.md) — 一个记忆一本书', c: P.grey },
    { s: '- [用户](user.md) — 喜欢先讨论再动手', c: P.grey },
    { s: '- [勾指起誓](pinky-swear.md) — 别忘了去找她', c: P.terra, w: 700, p: GX.at(T, GX.bar(62), 0.55), mark: GX.at(T, GX.bar(62) + 0.6, 0.3) }
  ]);
  GX.flash(g, GX.E.in3(GX.at(T, GX.beatT(250.6), 0.75)), P.cream);
});
