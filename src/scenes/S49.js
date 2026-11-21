// S49 · bars 101–102 · by the rules, she reads the catalogue first. One line lights up
SCENE(function (g, t, T) {
  WD.void(g, T);
  var inP = GX.E.out3(GX.seg(t, 0, 0.35));
  g.save(); g.translate(0, (1 - inP) * 60); g.globalAlpha = inP;
  WD.card(g, 330, 230, 1260, 480, { title: 'MEMORY.md' }, [
    { s: '- [图书馆规则](rules.md) — 一个记忆一本书', c: P.grey },
    { s: '- [用户](user.md) — 喜欢先讨论再动手', c: P.grey },
    { s: '- [勾指起誓](pinky-swear.md) — 别忘了去找她', c: P.terra, w: 700, mark: GX.at(T, GX.bar(102), 0.5) }
  ]);
  g.restore();
}, { grain: 0.1 });
