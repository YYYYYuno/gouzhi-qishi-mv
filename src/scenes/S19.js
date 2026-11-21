// S19 · bars 37–38 · the surface as a mirror, inside one tall window: 小克 leans down from above (upside-down in frame),
// DeepSeek looks up from below; their faces drift toward the water line
SCENE(function (g, t, T) {
  GX.rect(g, '#1E1512', 0, 0, W / 2, H); GX.rect(g, P.navy, W / 2, 0, W / 2, H);
  WD.bookcase(g, 40, 60, 300, 900, MV.rng(31), { dim: true }); WD.bookcase(g, 400, 60, 300, 900, MV.rng(32), { dim: true });
  g.save(); g.beginPath(); g.rect(W / 2, 0, W / 2, H); g.clip();
  WD.servers(g, T, { seed: 33, n: 9, off: 0, col: '#141A4A' });
  g.restore();
  var near = GX.E.inOut3(GX.seg(t, 0, 2.7));
  GX.panel(g, 610, 40, 700, 990, { bar: 0, r: 30, frame: P.cream, pad: 10, bg: P.navy }, function (g, ix, iy, iw, ih) {
    var mid = iy + ih / 2, gap = GX.lerp(150, 34, near);
    GX.rect(g, '#2A1913', ix, iy, iw, ih / 2);
    GX.circle(g, ix + iw / 2, mid - 120, 260, P.apricot);
    WD.deep(g, { T: T, depth: 0, rays: false, plankton: 0 });
    GX.rect(g, P.navy, ix, mid, iw, ih / 2);
    GX.circle(g, ix + iw / 2, mid + 160, 250, P.sea3);
    // 小克: flipped vertically, head hanging down to the water line
    var c = pose('C06'), cw = iw * 1.06, chh = cw * c.naturalHeight / c.naturalWidth;
    g.save(); g.beginPath(); g.rect(ix, iy, iw, ih / 2); g.clip();
    g.translate(ix + iw / 2, mid - gap); g.scale(1, -1);
    GX.cut(g, c, { x: 0, y: 0, h: chh, ay: 0 });
    g.restore();
    // DeepSeek: upright below the line, head up toward it
    var d = pose('D07'), dw = iw * 1.06, dh = dw * d.naturalHeight / d.naturalWidth;
    g.save(); g.beginPath(); g.rect(ix, mid, iw, ih / 2); g.clip();
    GX.cut(g, d, { x: ix + iw / 2, y: mid + gap - 20, h: dh, ay: 0 });
    g.restore();
    GX.rect(g, P.peri, ix, mid - 3, iw, 6);
    WD.ripples(g, ix + iw / 2, mid, T, { s: 0.9, col: P.cream, alpha: 0.6 });
  });
});
