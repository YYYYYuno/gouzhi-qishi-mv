// S39 · bars 81–82 · 小克 lays the logs open: every single call ends the same way
function pad3(n) { return ('00' + n).slice(-3); }
SCENE(function (g, t, T) {
  WD.room(g, T, {});
  g.save(); g.globalAlpha = 0.6; GX.rect(g, P.ink, 0, 0, W, H); g.restore();
  var s = GX.E.inOut3(GX.seg(t, 0.1, 2.5)) * 205;
  WD.card(g, 300, 110, 1320, 800, { title: 'logs/calls.log', dark: true }, []);
  g.save(); g.beginPath(); g.rect(320, 170, 1280, 720); g.clip();
  var rowH = 64, first = Math.floor(s), off = (s - first) * rowH;
  for (var i = 0; i < 13; i++) {
    var n = first + i + 1; if (n > 214) break;
    var y = 240 + i * rowH - off;
    GX.text(g, 'call #' + pad3(n), 380, y, { size: 34, font: 'mono', color: P.peri });
    GX.text(g, '小克：下次见面，你还会记得我吗？', 640, y, { size: 30, font: 'sans', color: '#8E97D8' });
    GX.text(g, '答应了 ✓', 1560, y, { size: 34, font: 'sans', w: 700, color: P.gold, align: 'right' });
  }
  g.restore();
});
