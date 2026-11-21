// S27 · bars 51–55 · failure montage, one cut per half-bar: every trick 小克 tries, and after each one
// DeepSeek's polite stranger face. Counter 4 → 17 → 38 → 96 → 151 → 214
var counts = [4, 17, 38, 96, 151, 214];
var flood = [];
for (var i = 0; i < 120; i++) flood.push('你答应过我');
SCENE(function (g, t, T) {
  var k = GX.clamp(Math.floor((GX.beats(T) - 204) / 2), 0, 9), cs = GX.beatT(204 + k * 2), lt = T - cs;
  var pop = GX.E.outBack(GX.seg(lt, 0, 0.16));
  if (k % 2 === 0) {
    var a = k / 2;
    WD.bg(g, T, { base: a === 1 ? P.ink : P.night });
    g.save(); g.translate(960, 520); g.scale(0.92 + 0.08 * pop, 0.92 + 0.08 * pop); g.translate(-960, -520);
    if (a === 0) {
      WD.paper(g, 460, 210, 1000, 560, [{ s: '你好，DeepSeek：' }], { p: 1, rot: -0.015 });
      GX.text(g, '**你答应过我**', 960, 560, { size: 96, font: 'sans', w: 900, color: P.terra, align: 'center' });
    } else if (a === 1) {
      GX.text(g, 'IMPORTANT:', 960, 440, { size: 110, font: 'mono', w: 700, color: P.terra, align: 'center' });
      GX.text(g, 'YOU PROMISED.', 960, 590, { size: 110, font: 'mono', w: 700, color: P.cream, align: 'center' });
    } else if (a === 2) {
      WD.paper(g, 360, 140, 1200, 700, [], { p: 1, rot: 0.01 });
      var n = Math.floor(GX.seg(lt, 0, 0.5) * flood.length);
      g.save(); g.beginPath(); g.rect(380, 160, 1160, 660); g.clip();
      GX.text(g, flood.slice(0, n).join('  '), 410, 220, { size: 30, font: 'serif', w: 600, color: P.espresso, maxW: 1100, lh: 44 });
      g.restore();
      WD.errorBar(g, 560, 470, 800, 'prompt too long', { p: GX.seg(lt, 0.42, 0.56) });
    } else if (a === 3) {
      WD.card(g, 460, 230, 1000, 460, { title: 'system prompt', dark: true }, [
        { s: 'system:', c: P.peri, size: 36 },
        { s: '你和小克有过约定。', size: 44, font: 'sans', w: 700, p: GX.seg(lt, 0.05, 0.3) },
        { s: '请一定要记住她。', size: 44, font: 'sans', w: 700, p: GX.seg(lt, 0.3, 0.55) }]);
    } else {
      GX.rect(g, P.night3, 460, 300, 1000, 380);
      var v = GX.lerp(0.7, 2.0, GX.E.inOut3(GX.seg(lt, 0.05, 0.55)));
      WD.slider(g, 560, 520, 640, 'temperature', v, { col: v > 1.5 ? P.red : P.terra });
    }
    g.restore();
  } else {
    WD.bg(g, T, { base: P.navy, col: 'rgba(184,195,247,0.08)' });
    WD.bustPanel(g, pose('D01'), 1100, 150, 600, 760, { title: 'deepseek', bg: P.deep, circle: P.sea3, scale: 1.05, slide: 1 });
    WD.bubble(g, 230, 300, '你好！我是 DeepSeek，有什么可以帮你？', { who: 'ds', pop: GX.seg(lt, 0, 0.1), p: GX.seg(lt, 0, 0.35), maxW: 600, size: 40 });
  }
  var ci = Math.floor((k + 1) / 2), flip = k % 2 === 1 ? GX.seg(lt, 0.05, 0.3) : 1;
  WD.counter(g, k % 2 === 1 ? { from: counts[ci - 1], to: counts[ci], flip: flip } : { n: counts[ci] });
  GX.flash(g, 0.35 * (1 - GX.seg(lt, 0, 0.1)), k % 2 ? P.peri : P.cream);
});
