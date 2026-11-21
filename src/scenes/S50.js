// S50 · bars 103–105 · she opens the book: her own handwriting, one line every two beats
var notes = [{ s: '她叫 DeepSeek。' }, { s: '她每次都会先说你好。' }, { s: '她想很久才敢回答。' }, { s: '我们勾过手指。', c: P.terra }];
SCENE(function (g, t, T) {
  WD.interior(g, { floor: 2000, seed: 29, empty: true, dim: true, lone: [1010, 460] });
  GX.cut(g, pose('C16'), { x: 520, y: H + 10, h: 1020, ay: 1 });
  var shown = GX.clamp((GX.beats(T) - 412.3) / 2, 0, 4);
  var lines = notes.map(function (n, i) { return { s: shown >= i + 1 ? n.s : (shown > i ? GX.typed(n.s, (shown - i) * 2) : ''), c: n.c }; });
  WD.paper(g, 1000, 200, 760, 520, lines, { p: 1, rot: 0.015, size: 42 });
}, {});
