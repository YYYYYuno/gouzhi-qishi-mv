/* WD — the code-drawn world and UI of 「勾指起誓」, in the same flat poster language as the characters. */
(function () {
  var WD = (window.WD = {});
  var P = GX.P, W = GX.W, H = GX.H, E = GX.E;
  // where the little fingers hook in the pinky-swear cutouts, as fractions of the cut image (x, y)
  window.HOOK = { H01: [0.485, 0.342], H02: [0.465, 0.513] }; // H01v / H02h, drawn after the user's pinky-swear photo

  // ================= environments =================

  // night sky: flat night, seeded 4-point stars twinkling on the beat, two drifting cloud bands
  WD.sky = function (g, o) {
    o = o || {};
    var hz = o.hz || H, T = o.T || 0, m = o.moon;
    GX.rect(g, P.night, 0, 0, W, hz);
    if (m) GX.circle(g, m[0], m[1], m[2], P.cream);
    var r = MV.rng(o.seed || 5), n = o.stars == null ? 36 : o.stars;
    for (var i = 0; i < n; i++) {
      var x = r() * W, y = 30 + r() * (hz - 220), s = 2 + r() * 5, ph = r();
      if (m && Math.hypot(x - m[0], y - m[1]) < m[2] + 24) continue;
      var tw = GX.pulse(T + ph * MV.A.bar, 0.3, 4);
      if (i % 7 === 0) GX.star(g, x, y, s * (0.85 + 0.5 * tw), P.apricot);
      else { g.save(); g.globalAlpha = 0.45 + 0.5 * tw; GX.star(g, x, y, s * (0.85 + 0.4 * tw), P.cream); g.restore(); }
    }
    if (o.clouds !== false) {
      band(g, P.night2, hz - 130, 22, 1.2 + T * 0.04);
      band(g, P.night3, hz - 66, 14, 3.1 + T * 0.07, hz);
    }
  };
  function band(g, col, y, amp, ph, hz) {
    g.fillStyle = col; g.beginPath(); g.moveTo(0, hz || H);
    for (var x = 0; x <= W; x += 40) g.lineTo(x, y + Math.round(Math.sin(x * 0.006 + ph) * amp + Math.sin(x * 0.017 + ph * 2) * amp * 0.4));
    g.lineTo(W, hz || H); g.closePath(); g.fill();
  }

  // sea from above the surface: flat navy, drifting stripes, moon reflection that shimmers per half-beat
  WD.sea = function (g, o) {
    var hz = o.hz, T = o.T || 0;
    GX.rect(g, P.navy, 0, hz, W, H - hz);
    var r = MV.rng(o.seed || 9);
    for (var i = 0; i < 70; i++) {
      var t = r(), y = hz + 8 + Math.pow(t, 1.5) * (H - hz - 10), len = 40 + r() * 220 * (0.6 + (y - hz) / 300), x0 = r() * W;
      var th = 2 + Math.floor((y - hz) / 150), x = ((x0 + T * (14 + (y - hz) * 0.06)) % (W + 400)) - 200;
      GX.rect(g, i % 3 ? P.sea2 : P.sea3, x, y, len, th);
    }
    if (o.moonX != null) {
      var rr = MV.rng(1000 + Math.floor(GX.beats(T) * 2)), cx = o.moonX, rows = o.rows || 26;
      for (var k = 0; k < rows; k++) {
        var yy = hz + 14 + k * 15, spread = 140 - k * 2.5;
        for (var j = 0; j < 3; j++) {
          var w = 30 + rr() * spread, xx = cx - spread + rr() * spread * 2 - w / 2;
          GX.rect(g, k < 8 ? P.cream : P.peri, xx, yy, w, k < 8 ? 3 : 2);
        }
      }
    }
  };

  WD.ripples = function (g, x, y, T, o) {
    o = o || {};
    var n = o.n || 3, sc = o.s || 1;
    g.save(); g.strokeStyle = o.col || P.peri; g.lineWidth = 3;
    for (var i = 0; i < n; i++) {
      var ph = ((T * (o.speed || 0.35)) + i / n) % 1;
      g.globalAlpha = (o.alpha == null ? 1 : o.alpha) * (1 - ph);
      g.setLineDash([60 + i * 30, 26 + i * 14]);
      g.beginPath(); g.ellipse(x, y, (150 + ph * 260) * sc, (12 + ph * 18) * sc, 0, 0, Math.PI * 2); g.stroke();
    }
    g.restore();
  };

  // one bookcase full of flat spines. o.squash 0..1 collapses the books (auto-compact); o.empty leaves the shelves bare
  function bookcase(g, x, y, w, h, r, o) {
    o = o || {};
    GX.rect(g, o.frame || '#2A1913', x, y, w, h);
    var rowH = o.rowH || 58, row = 0;
    for (var ry = y + 10; ry + rowH - 6 < y + h; ry += rowH, row++) {
      var bx = x + 8;
      while (bx < x + w - 10) {
        var bw = 9 + Math.floor(r() * 14), c = r(), bh = rowH - 14 - Math.floor(r() * 14), d = r();
        var col = c > 0.78 ? P.terra : c > 0.5 ? P.apricot : c > 0.22 ? P.cream : '#5C3A2B';
        if (o.dim) col = c > 0.5 ? '#5C3A2B' : '#4A2E22';
        var sq = o.squash ? GX.clamp(o.squash * 1.6 - d * 0.6, 0, 1) : 0;
        var hh = bh * (1 - E.in3(sq));
        if (!o.empty && hh > 0.5) GX.rect(g, col, bx, ry + (rowH - 10 - hh), bw - 3, hh);
        bx += bw;
      }
      GX.rect(g, '#140C09', x, ry + rowH - 10, w, 6);
    }
  }
  WD.bookcase = bookcase;

  // library exterior rising from the sea (left side of frame), lit arched door
  WD.library = function (g, o) {
    o = o || {};
    var hz = o.hz, x0 = o.x == null ? -20 : o.x, x1 = x0 + (o.w || 780), top = -10, base = hz + 4;
    var r = MV.rng(o.seed || 33);
    GX.rect(g, P.ink, x0, top, x1 - x0, base - top);
    [80, 260, 540, 720].forEach(function (px) { GX.rect(g, '#1A1820', x0 + px, top, 24, base - top); });
    GX.rect(g, '#1A1820', x0, 150, x1 - x0, 10); GX.rect(g, '#1A1820', x0, 56, x1 - x0, 6);
    [128, 588].forEach(function (wx) { GX.rect(g, P.terra, x0 + wx - 8, 192, 116, 186); bookcase(g, x0 + wx, 200, 100, 170, r, { rowH: 44 }); });
    var dx = x0 + 310, dw = 220, dTop = 236;
    g.save();
    g.beginPath(); g.moveTo(dx - 10, base); g.lineTo(dx - 10, dTop + dw / 2); g.arc(dx + dw / 2, dTop + dw / 2, dw / 2 + 10, Math.PI, 0); g.lineTo(dx + dw + 10, base); g.closePath(); g.fillStyle = P.terra; g.fill();
    g.beginPath(); g.moveTo(dx, base); g.lineTo(dx, dTop + dw / 2); g.arc(dx + dw / 2, dTop + dw / 2, dw / 2, Math.PI, 0); g.lineTo(dx + dw, base); g.closePath(); g.clip();
    GX.rect(g, o.doorLit ? P.apricot : '#2A1913', dx, dTop, dw, base - dTop);
    bookcase(g, dx + 14, dTop + 30, dw - 28, base - dTop - 40, r, { rowH: 44, dim: !o.doorLit });
    g.restore();
    GX.rect(g, P.ink, x0, base - 6, x1 - x0 + 140, 16); GX.rect(g, P.night3, x0, base - 8, x1 - x0 + 140, 3);
    var rr = MV.rng(2000 + Math.floor(GX.beats(o.T || 0) * 2));
    for (var i = 0; i < 22; i++) {
      var y = base + 18 + i * 13, w = dw * (0.95 - i * 0.03) * (0.6 + rr() * 0.4);
      GX.rect(g, i < 9 ? P.terra : P.espresso, dx + dw / 2 - w / 2 + (rr() - 0.5) * 24, y, w, 3);
    }
    return { door: [dx, dTop, dw, base - dTop] };
  };

  // library interior: wall of bookcases, optional big poster circle (lamp), plank floor from y=floor
  WD.interior = function (g, o) {
    o = o || {};
    var fl = o.floor == null ? 840 : o.floor, r = MV.rng(o.seed || 21), off = o.off || 0;
    GX.rect(g, '#1E1512', 0, 0, W, fl);
    for (var cx = -300 + (off % 300); cx < W + 300; cx += 300) bookcase(g, cx + 22, 40, 256, fl - 40, r, { dim: o.dim, squash: o.squash, empty: o.empty });
    if (o.lone) { GX.rect(g, P.terra, o.lone[0], o.lone[1], 24, 44); GX.rect(g, P.espresso, o.lone[0], o.lone[1] + 8, 24, 4); }
    if (o.lamp) GX.circle(g, o.lamp[0], o.lamp[1], o.lamp[2], o.lampCol || P.apricot);
    if (fl < H) {
      GX.rect(g, P.espresso, 0, fl, W, H - fl);
      for (var y = fl + 26, k = 0; y < H; y += 30 + k * 8, k++) GX.rect(g, '#2E1D16', 0, y, W, 3);
      GX.rect(g, '#140C09', 0, fl, W, 8);
    }
  };

  // round hole in the floor that opens onto the sea below. glow 0..1 lights it from beneath
  WD.hole = function (g, x, y, rx, ry, o) {
    o = o || {};
    var T = o.T || 0;
    g.save();
    g.beginPath(); g.ellipse(x, y, rx + 14, ry + 8, 0, 0, Math.PI * 2); g.fillStyle = '#140C09'; g.fill();
    g.beginPath(); g.ellipse(x, y, rx, ry, 0, 0, Math.PI * 2); g.clip();
    GX.rect(g, P.navy, x - rx, y - ry, rx * 2, ry * 2);
    var r = MV.rng(77);
    for (var i = 0; i < 18; i++) {
      var yy = y - ry + r() * ry * 2, len = 30 + r() * rx * 0.8, xx = x - rx + ((r() * rx * 2 + T * 30) % (rx * 2 + 60)) - 30;
      GX.rect(g, i % 2 ? P.sea2 : P.sea3, xx, yy, len, 3);
    }
    if (o.glow) { g.globalAlpha = o.glow; GX.circle(g, x, y + ry * 0.2, rx * 0.6 * (0.6 + 0.4 * o.glow), P.blue); g.globalAlpha = o.glow * 0.8; GX.circle(g, x, y + ry * 0.2, rx * 0.25, P.peri); }
    g.restore();
    g.save(); g.strokeStyle = P.peri; g.lineWidth = 3; g.globalAlpha = 0.7;
    g.beginPath(); g.ellipse(x, y, rx, ry, 0, Math.PI * 1.05, Math.PI * 1.95); g.stroke(); g.restore();
  };

  // under the sea: stepped flat bands (no gradient), light shafts from the surface, drifting plankton
  WD.deep = function (g, o) {
    o = o || {};
    var T = o.T || 0, depth = o.depth || 0;
    var bands = [P.sea3, P.navy, P.deep, P.abyss];
    var bh = H / 3.2;
    for (var i = 0; i < 5; i++) GX.rect(g, bands[Math.min(3, i)], 0, i * bh - depth, W, bh + 2);
    GX.rect(g, P.abyss, 0, 4 * bh - depth, W, Math.max(0, H - 4 * bh + depth + 2));
    if (o.rays !== false) {
      g.save(); g.fillStyle = 'rgba(184,195,247,0.07)';
      var rx = o.rayX == null ? W * 0.5 : o.rayX;
      for (var k = -3; k <= 3; k++) {
        var sway = Math.sin(T * 0.6 + k) * 30;
        g.beginPath(); g.moveTo(rx + k * 120 - 40 + sway, -depth); g.lineTo(rx + k * 120 + 40 + sway, -depth);
        g.lineTo(rx + k * 330 + 120, H); g.lineTo(rx + k * 330 - 60, H); g.closePath(); g.fill();
      }
      g.restore();
    }
    var r = MV.rng(o.seed || 55), n = o.plankton == null ? 90 : o.plankton;
    for (var p = 0; p < n; p++) {
      var x = r() * W, y0 = r() * H, s = 1.5 + r() * 3.5, sp = 8 + r() * 22, ph = r();
      var y = ((y0 - T * sp - depth * 0.6) % H + H) % H;
      var a = 0.25 + 0.55 * GX.pulse(T + ph * MV.A.bar, 0.35, 4);
      g.globalAlpha = a; GX.circle(g, x + Math.sin(T + ph * 6) * 8, y, s, p % 5 ? P.peri : P.cream); g.globalAlpha = 1;
    }
    if (o.glow) {
      var gw = o.glow;
      g.save();
      g.globalAlpha = 0.35 * gw.a; GX.circle(g, gw.x, gw.y, gw.r * 1.6, P.blue);
      g.globalAlpha = 0.8 * gw.a; GX.circle(g, gw.x, gw.y, gw.r, P.blue);
      g.globalAlpha = gw.a; GX.circle(g, gw.x, gw.y, gw.r * 0.45, P.peri);
      g.restore();
    }
  };

  // flat whale silhouette facing right. ~640 px long at s = 1, centred on (x, y)
  function whaleBody(g) {
    g.beginPath();
    g.moveTo(-300, -16); g.bezierCurveTo(-200, -58, -40, -118, 120, -108); g.bezierCurveTo(250, -98, 322, -40, 322, 8);
    g.bezierCurveTo(322, 58, 240, 94, 120, 94); g.bezierCurveTo(-40, 94, -200, 40, -300, 10); g.closePath();
  }
  WD.whale = function (g, x, y, s, o) {
    o = o || {};
    var T = o.T || 0;
    g.save(); g.translate(x, y); g.rotate(o.rot || 0); g.scale(s * (o.flip ? -1 : 1), s);
    if (o.alpha != null) g.globalAlpha *= o.alpha;
    g.save(); g.translate(-292, -3); g.rotate(Math.sin(T * 2.4) * 0.22);
    GX.poly(g, P.navy, [10, -6, -80, -78, -52, -8, -88, 60, 10, 12]);
    GX.poly(g, P.blue, [0, -4, -64, -60, -44, -10]);
    g.restore();
    g.fillStyle = P.navy; whaleBody(g); g.fill();
    g.save(); whaleBody(g); g.clip();
    g.fillStyle = P.blue; g.beginPath(); g.moveTo(-260, -30); g.bezierCurveTo(-120, -86, 60, -112, 160, -100); g.bezierCurveTo(60, -80, -100, -50, -260, -22); g.fill();
    g.fillStyle = P.cream; g.beginPath(); g.moveTo(-140, 74); g.bezierCurveTo(0, 30, 200, 18, 340, 4); g.lineTo(340, 130); g.lineTo(-140, 130); g.closePath(); g.fill();
    g.strokeStyle = P.peri; g.lineWidth = 5;
    for (var i = 0; i < 6; i++) { g.beginPath(); g.moveTo(-60 + i * 50, 70 - i * 6); g.bezierCurveTo(40 + i * 46, 44 - i * 5, 160 + i * 30, 34 - i * 3, 330, 18 + i * 9); g.stroke(); }
    g.restore();
    GX.poly(g, P.blue, [40, 56, 6, 140, 104, 78]);
    GX.circle(g, 228, -6, 8, P.cream); GX.circle(g, 230, -6, 4, P.ink);
    g.restore();
  };

  // ================= UI =================

  // terminal window. lines: [[text, colour], ...] (or plain strings). o.cursor: show a blinking block after the last line
  WD.term = function (g, x, y, w, h, lines, o) {
    o = o || {};
    return GX.panel(g, x, y, w, h, { frame: o.frame || '#26232B', bg: o.bg || P.ink, title: o.title || '~/library — claude', titleCol: P.grey, dots: [P.terra, '#4A4550', '#4A4550'], alpha: o.alpha, shadow: o.shadow }, function (g, ix, iy) {
      var size = o.size || 32, lh = size * 1.5, cx = ix + 34, cy = iy + 30 + size;
      lines.forEach(function (ln, i) {
        var parts = typeof ln === 'string' ? [[ln, P.cream]] : (Array.isArray(ln[0]) ? ln : [ln]);
        var xx = cx;
        parts.forEach(function (pt) {
          GX.text(g, pt[0], xx, cy + i * lh, { size: size, font: 'mono', color: pt[1] || P.cream });
          xx += GX.measure(g, pt[0], { size: size, font: 'mono' });
        });
        if (o.cursor && i === lines.length - 1 && GX.blink(o.T || 0, 1.4)) GX.rect(g, P.terra, xx + 4, cy + i * lh - size * 0.8, size * 0.55, size * 0.95);
      });
    });
  };

  // chat bubble. who: 'ds' | 'claude'. p = typing progress, pop = 0..1 appear. anchor = top-left (or top-right if o.right)
  WD.bubble = function (g, x, y, s, o) {
    o = o || {};
    var size = o.size || 38, maxW = o.maxW || 820, pad = 30, who = o.who || 'ds';
    var to = { size: size, maxW: maxW, font: 'sans', w: 500 };
    var lines = GX.wrap(g, s, to), lh = size * 1.42;
    var tw = 0; lines.forEach(function (l) { tw = Math.max(tw, GX.measure(g, l, to)); });
    var nameH = o.name === false ? 0 : 44;
    var bw = tw + pad * 2, bh = nameH + lines.length * lh + pad * 2 - (lh - size) * 0.6;
    var bx = o.right ? x - bw : x;
    var pop = E.outBack(GX.clamp(o.pop == null ? 1 : o.pop, 0, 1));
    if (pop <= 0.001) return;
    var px = o.right ? x : x, py = y + bh;
    g.save();
    g.translate(px, py); g.scale(pop, pop); g.translate(-px, -py);
    g.fillStyle = 'rgba(0,0,0,0.35)'; GX.rr(g, bx + 12, y + 14, bw, bh, 26); g.fill();
    g.fillStyle = o.bg || P.cream; GX.rr(g, bx, y, bw, bh, 26); g.fill();
    GX.poly(g, o.bg || P.cream, o.right ? [x - 70, y + bh - 2, x - 24, y + bh - 2, x - 10, y + bh + 30] : [x + 24, y + bh - 2, x + 70, y + bh - 2, x + 10, y + bh + 30]);
    if (nameH) {
      var accent = who === 'ds' ? P.blue : P.terra;
      GX.circle(g, bx + pad + 10, y + pad + 12, 10, accent);
      GX.text(g, who === 'ds' ? 'DeepSeek' : '小克', bx + pad + 30, y + pad + 21, { size: 24, font: 'mono', color: who === 'ds' ? P.navy : P.espresso });
    }
    var total = Array.from(s.replace(/\n/g, '')).length, shown = Math.round(total * GX.clamp(o.p == null ? 1 : o.p, 0, 1));
    var col = o.color || (who === 'ds' ? P.navy : P.espresso);
    for (var i = 0; i < lines.length && shown > 0; i++) {
      var a = Array.from(lines[i]), part = a.slice(0, shown).join('');
      shown -= a.length;
      GX.text(g, part, bx + pad, y + pad + nameH + size * 0.92 + i * lh, { size: size, font: 'sans', w: 500, color: col });
    }
    g.restore();
    return { x: bx, y: y, w: bw, h: bh };
  };

  // the 「第 N 次初次见面」 counter, top-right. o.from/o.to + o.flip (0..1) roll the number; o.p = appear
  WD.counter = function (g, o) {
    var p = E.out3(GX.clamp(o.p == null ? 1 : o.p, 0, 1));
    if (p <= 0.001) return;
    var x = W - 70, y = 96;
    g.save(); g.globalAlpha = p; g.translate((1 - p) * 60, 0);
    var to = { size: 30, font: 'sans', w: 500 };
    var tail = ' 次初次见面', tailW = GX.measure(g, tail, to);
    GX.text(g, tail, x, y, { size: 30, font: 'sans', w: 500, color: P.cream, align: 'right' });
    var numX = x - tailW - 6, fl = E.inOut3(GX.clamp(o.flip == null ? 1 : o.flip, 0, 1));
    var nTo = String(o.to == null ? o.n : o.to), nFrom = String(o.from == null ? nTo : o.from);
    var nw = Math.max(GX.measure(g, nTo, { size: 40, font: 'mono' }), GX.measure(g, nFrom, { size: 40, font: 'mono' }));
    g.save(); g.beginPath(); g.rect(numX - nw - 10, y - 46, nw + 14, 60); g.clip();
    if (fl < 1) GX.text(g, nFrom, numX, y - fl * 52, { size: 40, font: 'mono', color: P.peri, align: 'right' });
    if (fl > 0) GX.text(g, nTo, numX, y + (1 - fl) * 52, { size: 40, font: 'mono', color: P.peri, align: 'right' });
    g.restore();
    var head = '第 ', headW = GX.measure(g, head, to);
    GX.text(g, head, numX - nw - 8, y, { size: 30, font: 'sans', w: 500, color: P.cream, align: 'right' });
    var totalW = tailW + nw + 14 + headW;
    GX.rect(g, P.blue, x - totalW, y + 16, totalW * (0.4 + 0.6 * p), 5);
    g.restore();
  };

  // DeepSeek's deep-thinking panel. o: { lines, scroll (px), p (appear), title, done (seconds -> collapsed label), dot pulse T }
  WD.think = function (g, x, y, w, h, o) {
    o = o || {};
    var p = E.out3(GX.clamp(o.p == null ? 1 : o.p, 0, 1));
    if (p <= 0.001) return;
    var hh = 64 + (h - 64) * p;
    g.save();
    g.fillStyle = 'rgba(0,0,0,0.35)'; GX.rr(g, x + 14, y + 16, w, hh, 24); g.fill();
    g.fillStyle = P.cream; GX.rr(g, x, y, w, hh, 24); g.fill();
    var pul = GX.pulse(o.T || 0, 0.15);
    GX.circle(g, x + 34, y + 32, 10 + 4 * pul, P.blue);
    GX.text(g, o.title || '思考中…', x + 58, y + 42, { size: 28, font: 'sans', w: 500, color: P.navy });
    if (p > 0.05) {
      g.save(); g.beginPath(); g.rect(x + 20, y + 70, w - 40, hh - 86); g.clip();
      GX.rect(g, P.peri, x + 34, y + 76, 5, Math.max(0, hh - 100));
      var lh = 46, yy = y + 112 - (o.scroll || 0);
      (o.lines || []).forEach(function (l, i) {
        var ly = yy + i * lh;
        if (ly > y - 40 && ly < y + hh + 40) GX.text(g, l, x + 60, ly, { size: 28, font: 'sans', color: '#4B4F75' });
      });
      g.restore();
    }
    g.restore();
  };

  // collapsed thinking chip:「已深度思考（用时 N 秒）⌄」. Returns its width
  WD.chip = function (g, x, y, label, o) {
    o = o || {};
    var p = E.outBack(GX.clamp(o.p == null ? 1 : o.p, 0, 1));
    if (p <= 0.001) return 0;
    var to = { size: o.size || 28, font: 'sans', w: 500 }, tw = GX.measure(g, label, to), cw = 60 + tw + 54, ch = 60;
    var bx = o.right ? x - cw : x;
    g.save(); g.translate(bx + cw / 2, y + ch / 2); g.scale(p, p); g.translate(-(bx + cw / 2), -(y + ch / 2));
    g.fillStyle = 'rgba(0,0,0,0.3)'; GX.rr(g, bx + 10, y + 12, cw, ch, 30); g.fill();
    g.fillStyle = P.cream; GX.rr(g, bx, y, cw, ch, 30); g.fill();
    GX.circle(g, bx + 32, y + 30, 10, P.blue);
    GX.text(g, label, bx + 54, y + 40, to.size ? { size: to.size, font: 'sans', w: 500, color: P.navy } : {});
    var vx = bx + 54 + tw + 18;
    g.strokeStyle = P.navy; g.lineWidth = 3; g.beginPath(); g.moveTo(vx, y + 25); g.lineTo(vx + 9, y + 34); g.lineTo(vx + 18, y + 25); g.stroke();
    g.restore();
    return cw;
  };

  // code editor window with line numbers. lines: strings. o.hl = highlighted line, o.circle = 0..1 blue ring, o.whale = 0..1 doodle
  WD.code = function (g, x, y, w, h, lines, o) {
    o = o || {};
    return GX.panel(g, x, y, w, h, { title: o.title || 'last_char.js', frame: P.cream, bg: '#1C1A20', alpha: o.alpha }, function (g, ix, iy, iw) {
      var size = 32, lh = 56, x0 = ix + 96, y0 = iy + 70;
      lines.forEach(function (l, i) {
        GX.text(g, String(i + 1), ix + 60, y0 + i * lh, { size: 26, font: 'mono', color: '#5A5560', align: 'right' });
        var col = /^\s*\/\//.test(l) ? P.grey : P.cream;
        var m = l.match(/^(\s*)(function|return|const)(.*)$/);
        if (m) {
          var a = m[1] + m[2];
          GX.text(g, a, x0, y0 + i * lh, { size: size, font: 'mono', color: P.terra });
          GX.text(g, m[3], x0 + GX.measure(g, a, { size: size, font: 'mono' }), y0 + i * lh, { size: size, font: 'mono', color: P.cream });
        } else GX.text(g, l, x0, y0 + i * lh, { size: size, font: 'mono', color: col });
      });
      if (o.hl != null && o.circle > 0) {
        var l = lines[o.hl], lw = GX.measure(g, l, { size: size, font: 'mono' }), ly = y0 + o.hl * lh - 11;
        var lx0 = x0 + GX.measure(g, l.match(/^\s*/)[0], { size: size, font: 'mono' });
        var cxr = (lx0 + x0 + lw) / 2, rx = (x0 + lw - lx0) / 2 + 34, ry = 38;
        g.save(); g.strokeStyle = P.blue; g.lineWidth = 6; g.lineCap = 'round';
        g.beginPath(); g.ellipse(cxr, ly, rx, ry, -0.04, -2.6, -2.6 + Math.PI * 2.15 * o.circle); g.stroke(); g.restore();
        if (o.whale > 0) {
          var wp = E.outBack(o.whale), wx = cxr + rx + 120, wy = ly - 10;
          g.save(); g.translate(wx, wy); g.scale(wp, wp);
          WD.whale(g, 0, 0, 0.16, { T: o.T });
          g.restore();
          GX.text(g, GX.typed('← 这里越界啦', GX.clamp(o.whale * 1.6 - 0.4, 0, 1)), wx - 60, wy + 66, { size: 28, font: 'sans', w: 500, color: P.peri });
        }
      }
    });
  };

  // a sheet of cream paper with handwritten-ish serif lines; p = how much is written (0..1 over all characters)
  WD.paper = function (g, x, y, w, h, lines, o) {
    o = o || {};
    g.save();
    g.translate(x + w / 2, y + h / 2); g.rotate(o.rot || 0); g.translate(-(x + w / 2), -(y + h / 2));
    g.fillStyle = 'rgba(0,0,0,0.35)'; g.fillRect(x + 14, y + 16, w, h);
    GX.rect(g, P.cream, x, y, w, h);
    for (var k = 0; k < Math.floor((h - 80) / 58); k++) GX.rect(g, P.apricot, x + 40, y + 96 + k * 58, w - 80, 2);
    var total = 0; lines.forEach(function (l) { total += Array.from(l.s || l).length; });
    var left = Math.round(total * GX.clamp(o.p == null ? 1 : o.p, 0, 1));
    lines.forEach(function (l, i) {
      var s = l.s || l, a = Array.from(s), part = a.slice(0, Math.max(0, left)).join('');
      left -= a.length;
      if (part) GX.text(g, part, x + 48, y + 86 + i * 58, { size: o.size || 34, font: 'serif', w: 600, color: l.c || P.espresso });
    });
    g.restore();
  };

  // model picker dropdown. items: strings; scroll in rows (float); sel = index that ends highlighted
  WD.dropdown = function (g, x, y, w, h, items, o) {
    o = o || {};
    return GX.panel(g, x, y, w, h, { title: o.title || '选择模型', bar: 56, frame: P.cream, bg: '#1C1A20' }, function (g, ix, iy, iw, ih) {
      var rowH = 62, first = Math.floor(o.scroll), off = (o.scroll - first) * rowH;
      for (var i = -1; i < Math.ceil(ih / rowH) + 1; i++) {
        var k = first + i; if (k < 0 || k >= items.length) continue;
        var ry = iy + i * rowH - off, isSel = k === o.sel;
        if (isSel && o.selP > 0) { g.globalAlpha = o.selP; GX.rect(g, P.blue, ix, ry, iw, rowH); g.globalAlpha = 1; }
        GX.text(g, items[k], ix + 40, ry + 42, { size: 30, font: 'mono', color: isSel && o.selP > 0.5 ? P.cream : (k % 2 ? '#9C97A0' : '#C9C4BC') });
        GX.text(g, String(k + 1).padStart(4, '0'), ix + iw - 30, ry + 42, { size: 22, font: 'mono', color: '#5A5560', align: 'right' });
      }
    });
  };

  WD.cursor = function (g, x, y, o) {
    o = o || {};
    if (o.click > 0) { g.save(); g.globalAlpha = 1 - o.click; GX.ring(g, x, y, 14 + o.click * 40, 4, P.gold); g.restore(); }
    GX.poly(g, P.ink, [x - 3, y - 4, x - 3, y + 44, x + 10, y + 32, x + 19, y + 52, x + 29, y + 47, x + 20, y + 28, x + 37, y + 28]);
    GX.poly(g, P.cream, [x, y, x, y + 36, x + 10, y + 27, x + 19, y + 45, x + 24, y + 42, x + 16, y + 24, x + 30, y + 24]);
  };

  // UI backdrop: flat night with a faint dot grid (o.col tints the dots)
  WD.bg = function (g, T, o) {
    o = o || {};
    GX.rect(g, o.base || P.night, 0, 0, W, H);
    g.fillStyle = o.col || 'rgba(240,238,230,0.07)';
    var s = 48, off = ((T || 0) * (o.drift || 6)) % s;
    for (var y = 24; y < H; y += s) for (var x = 24 - off; x < W + s; x += s) g.fillRect(x, y, 3, 3);
  };

  // a bust / close-up cutout framed in a window, so the straight-cut hair edges sit on the frame.
  // o: { title, bg, frame, slide (0..1 entrance), fromX, scale (fill factor), ox, oy (offset in px), alpha, circle:[colour] }
  WD.bustPanel = function (g, img, x, y, w, h, o) {
    o = o || {};
    var sl = E.out3(GX.clamp(o.slide == null ? 1 : o.slide, 0, 1));
    if (sl <= 0.001) return;
    var dx = (1 - sl) * (o.fromX == null ? 700 : o.fromX);
    g.save(); g.translate(dx, 0);
    GX.panel(g, x, y, w, h, { title: o.title, bg: o.bg || P.night3, frame: o.frame, alpha: o.alpha }, function (g, ix, iy, iw, ih) {
      if (o.circle) GX.circle(g, ix + iw / 2 + (o.cx || 0), iy + ih * 0.42, Math.min(iw, ih) * 0.42, o.circle);
      if (o.under) o.under(g, ix, iy, iw, ih);
      // fill the window width (so the straight-cut hair edges sit under the frame) and hang the image from
      // the top, so the head is always in; the cut bottom of the bust disappears under the frame instead
      if (img) {
        var ww = iw * (o.scale || 1.04), hh = ww * img.naturalHeight / img.naturalWidth;
        GX.cut(g, img, { x: ix + iw / 2 + (o.ox || 0), y: iy + (o.oy == null ? 10 : o.oy), h: hh, ay: 0 });
      }
      if (o.over) o.over(g, ix, iy, iw, ih);
    });
    g.restore();
  };

  // DeepSeek waist-deep in the sea under the big moon circle (used every time she surfaces)
  // o: { rise 0..1, x, hz, h, moon:[x,y,r], bob }
  WD.dsSea = function (g, img, T, o) {
    o = o || {};
    var hz = o.hz || 700, x = o.x || 1200, h = o.h || 820, m = o.moon || [x, 400, 330];
    WD.sky(g, { hz: hz, moon: m, T: T, seed: 8 });
    WD.sea(g, { hz: hz, T: T, moonX: m[0] });
    var rise = E.out3(GX.clamp(o.rise == null ? 1 : o.rise, 0, 1));
    var bob = Math.sin(T * 2.1) * 6;
    var r = GX.cut(g, img, { x: x, y: hz + h * 0.34 + (1 - rise) * h * 0.75 + bob, h: h, ay: 1, clip: [0, 0, W, hz + 6] });
    WD.ripples(g, x, hz + 24, T, { s: 1.1 });
    GX.rect(g, P.peri, x - 260 * rise, hz + 4, 520 * rise, 4);
    return r;
  };

  // ================= acts 2–3 =================

  // document card (MEMORY.md, promise.md, logs). lines: [{ s, c, p (typed 0..1), mark (0..1 highlighter), size, font }]
  WD.card = function (g, x, y, w, h, o, lines) {
    o = o || {};
    var dark = o.dark;
    GX.panel(g, x, y, w, h, { title: o.title, bar: 58, frame: dark ? P.peri : P.cream, bg: dark ? P.navy : '#FBFAF6', titleCol: dark ? P.navy : P.espresso, alpha: o.alpha, shadow: o.shadow }, function (g, ix, iy, iw) {
      var yy = iy + (o.top || 70);
      (lines || []).forEach(function (l) {
        var size = l.size || o.size || 30, font = l.font || o.font || 'mono', lh = l.lh || size * 1.7;
        var s = l.p == null ? l.s : GX.typed(l.s, l.p);
        if (l.mark > 0) {
          var mw = GX.measure(g, l.s, { size: size, font: font, w: l.w });
          g.save(); g.globalAlpha = 0.55; GX.rect(g, dark ? P.blue : P.apricot, ix + 36 - 8, yy - size * 0.95, (mw + 16) * E.out3(l.mark), size * 1.3); g.restore();
        }
        GX.text(g, s, ix + 36, yy, { size: size, font: font, w: l.w || 400, color: l.c || (dark ? P.cream : P.espresso), maxW: l.wrap ? iw - 72 : 0, lh: lh });
        yy += l.wrap ? lh * Math.max(1, GX.wrap(g, l.s, { size: size, font: font, maxW: iw - 72 }).length) : lh;
      });
      if (o.inner) o.inner(g, ix, iy, iw);
    });
  };

  // flat ocean "map": the library on the left, the deep on the right, the gold cable between. o: { p (cable drawn), pulse (0..1 along), labels }
  WD.map = function (g, T, o) {
    o = o || {};
    GX.rect(g, P.navy, 0, 0, W, H);
    var r = MV.rng(5150);
    for (var i = 0; i < 46; i++) { var y = r() * H, x = ((r() * W + T * 12) % (W + 300)) - 150; GX.rect(g, i % 2 ? P.sea2 : P.sea3, x, y, 60 + r() * 200, 3); }
    GX.poly(g, '#2A1913', [0, 120, 230, 160, 330, 300, 300, 520, 360, 700, 250, 920, 0, 980]);
    GX.poly(g, '#2E2340', [W, 80, W - 200, 210, W - 260, 430, W - 180, 640, W - 250, 860, W, 1000]);
    var a = [330, 560], b = [W - 260, 520];
    var curve = function (u) { var cx1 = 760, cy1 = 900, cx2 = 1250, cy2 = 180, m = 1 - u; return [m * m * m * a[0] + 3 * m * m * u * cx1 + 3 * m * u * u * cx2 + u * u * u * b[0], m * m * m * a[1] + 3 * m * m * u * cy1 + 3 * m * u * u * cy2 + u * u * u * b[1]]; };
    var p = GX.clamp(o.p == null ? 1 : o.p, 0, 1);
    g.save(); g.lineCap = 'round';
    [[14, 'rgba(243,201,105,0.28)'], [4, P.gold]].forEach(function (st) {
      g.strokeStyle = st[1]; g.lineWidth = st[0]; g.beginPath();
      for (var k = 0; k <= 80 * p; k++) { var q = curve(k / 80); if (k) g.lineTo(q[0], q[1]); else g.moveTo(q[0], q[1]); }
      g.stroke();
    });
    g.restore();
    if (o.pulse != null) { var q = curve(GX.clamp(o.pulse, 0, 1)); GX.circle(g, q[0], q[1], 14, P.cream); GX.ring(g, q[0], q[1], 26, 3, P.gold); }
    GX.circle(g, a[0], a[1], 16, P.terra); GX.circle(g, b[0], b[1], 16, P.blue);
    if (o.labels !== false) {
      GX.text(g, '~/library', a[0] - 10, a[1] + 56, { size: 28, font: 'mono', color: P.apricot, align: 'center' });
      GX.text(g, 'deepseek://', b[0] + 10, b[1] + 56, { size: 28, font: 'mono', color: P.peri, align: 'center' });
    }
    return curve;
  };

  // a cutout dissolving into big pixels. block = pixel size in screen px; fade 0..1 drains it to the background
  WD.pixelate = function (g, img, x, y, w, h, block, o) {
    o = o || {};
    if (!WD._px) WD._px = GX.S.canvas(16, 16);
    var bw = Math.max(1, Math.round(w / block)), bh = Math.max(1, Math.round(h / block));
    var c = WD._px; c.width = bw; c.height = bh;
    var x2 = c.getContext('2d'); x2.clearRect(0, 0, bw, bh); x2.drawImage(img, 0, 0, bw, bh);
    g.save(); g.imageSmoothingEnabled = false;
    if (o.alpha != null) g.globalAlpha *= o.alpha;
    g.drawImage(c, x, y, w, h);
    g.restore();
  };

  // Claude-Code-style warning banner at the top. p = appear, level 0..1 = how full the bar is
  WD.banner = function (g, text, o) {
    o = o || {};
    var p = E.out3(GX.clamp(o.p == null ? 1 : o.p, 0, 1));
    if (p <= 0.001) return;
    var w = o.w || 1100, x = (W - w) / 2, y = 70 - (1 - p) * 120;
    g.save(); g.globalAlpha *= p;
    g.fillStyle = 'rgba(0,0,0,0.4)'; GX.rr(g, x + 12, y + 14, w, 104, 16); g.fill();
    GX.rect(g, P.ink, x, y, w, 104); g.strokeStyle = P.terra; g.lineWidth = 4; g.strokeRect(x + 2, y + 2, w - 4, 100);
    GX.text(g, text, x + 40, y + 48, { size: 32, font: 'mono', color: P.terra });
    GX.rect(g, '#3A3540', x + 40, y + 70, w - 80, 12);
    GX.rect(g, o.barCol || P.terra, x + 40, y + 70, (w - 80) * GX.clamp(o.level == null ? 1 : o.level, 0, 1), 12);
    g.restore();
  };

  WD.errorBar = function (g, x, y, w, text, o) {
    o = o || {};
    var p = E.outBack(GX.clamp(o.p == null ? 1 : o.p, 0, 1));
    if (p <= 0.001) return;
    g.save(); g.translate(x + w / 2, y + 40); g.scale(p, p); g.translate(-(x + w / 2), -(y + 40));
    GX.rect(g, P.red, x, y, w, 80);
    GX.text(g, '✕  ' + text, x + 34, y + 52, { size: 32, font: 'mono', w: 700, color: P.cream });
    g.restore();
  };

  WD.slider = function (g, x, y, w, label, val, o) {
    o = o || {};
    GX.text(g, label, x, y - 30, { size: 30, font: 'mono', color: P.grey });
    GX.rect(g, '#3A3540', x, y, w, 10);
    var k = GX.clamp(val / (o.max || 2), 0, 1);
    GX.rect(g, o.col || P.terra, x, y, w * k, 10);
    GX.circle(g, x + w * k, y + 5, 22, P.cream);
    GX.text(g, val.toFixed(1), x + w + 40, y + 16, { size: 40, font: 'mono', w: 700, color: P.cream });
  };

  // the undersea cable: a thick flat tube across the frame at y, scrolling with T
  WD.cable = function (g, y, T, o) {
    o = o || {};
    var th = o.th || 120, sp = o.speed == null ? 260 : o.speed;
    GX.rect(g, '#0C0E24', 0, y - th / 2 - 8, W, th + 16);
    GX.rect(g, P.navy, 0, y - th / 2, W, th);
    GX.rect(g, P.sea3, 0, y - th / 2 + 10, W, 14);
    for (var x = -((T * sp) % 160); x < W; x += 160) { GX.rect(g, '#0C0E24', x, y - th / 2, 10, th); GX.rect(g, P.peri, x + 30, y + th / 2 - 20, 70, 6); }
    if (o.gold) { g.save(); g.globalAlpha = o.gold; GX.rect(g, P.gold, 0, y - 3, W, 6); g.restore(); }
  };

  // deep-sea server towers glowing like bioluminescent life; light dots blink on the beat
  WD.servers = function (g, T, o) {
    o = o || {};
    var r = MV.rng(o.seed || 707), base = o.base || H, off = o.off || 0;
    for (var i = 0; i < (o.n || 9); i++) {
      var w = 120 + r() * 80, h = 380 + r() * 420, x = ((i * 230 + r() * 60 - off) % (W + 400) + W + 400) % (W + 400) - 200, sc = o.scale || 1;
      GX.rect(g, o.col || '#0E1235', x, base - h * sc, w * sc, h * sc);
      for (var k = 0; k < 10; k++) {
        var ly = base - h * sc + 30 + k * 34 * sc; if (ly > base - 20) break;
        var ph = r(), steady = r(), len = 0.4 + r() * 0.6; // draw every random number every frame: layout must not jitter
        var on = steady > 0.6 || GX.pulse(T + ph * MV.A.bar, 0.3, 2) > 0.3;
        GX.rect(g, on ? (k % 3 ? P.blue : P.peri) : '#1E2550', x + 16 * sc, ly, (w - 50) * sc * len, 6 * sc);
      }
    }
  };

  // DeepSeek's little room at the bottom of the sea: navy walls, a porthole, a shelf of shells
  WD.room = function (g, T, o) {
    o = o || {};
    GX.rect(g, '#141842', 0, 0, W, H);
    for (var x = 0; x < W; x += 160) GX.rect(g, '#181D4E', x, 0, 80, H);
    var px = o.px == null ? 420 : o.px, py = 360;
    if (o.port !== false) {
      GX.circle(g, px, py, 210, P.peri); GX.circle(g, px, py, 186, P.deep);
      g.save(); g.beginPath(); g.arc(px, py, 186, 0, Math.PI * 2); g.clip();
      WD.deep(g, { T: T, depth: 200, rays: false, plankton: 30, seed: 91 });
      WD.whale(g, px + ((T * 60) % 700) - 350, py + 40, 0.25, { T: T });
      g.restore();
    }
    GX.rect(g, '#0E1235', 0, 860, W, H - 860); GX.rect(g, P.peri, 0, 856, W, 4);
    GX.rect(g, '#0E1235', 1200, 300, 560, 18);
    var r = MV.rng(17);
    for (var i = 0; i < 7; i++) { var sx = 1230 + i * 75, sh = 30 + r() * 50; GX.poly(g, i % 2 ? P.peri : P.cream, [sx, 300, sx + 28, 300 - sh, sx + 56, 300]); }
  };

  // the white void after /clear (cream, faint grid)
  WD.void = function (g, T, o) {
    o = o || {};
    GX.rect(g, P.cream, 0, 0, W, H);
    g.fillStyle = 'rgba(59,38,32,0.06)';
    for (var y = 24; y < H; y += 48) for (var x = 24; x < W; x += 48) g.fillRect(x, y, 3, 3);
  };

  // a small house at the bottom of the sea with a lit window
  WD.house = function (g, x, y, s, lit) {
    g.save(); g.translate(x, y); g.scale(s, s);
    GX.rect(g, '#0B0E2C', -70, -90, 140, 90); GX.poly(g, '#0B0E2C', [-90, -88, 0, -160, 90, -88]);
    GX.rect(g, lit ? P.peri : '#1E2550', -26, -66, 52, 40);
    if (lit) { g.globalAlpha = 0.3 * lit; GX.circle(g, 0, -46, 90, P.blue); }
    g.restore();
  };

  // 「— 勾. 指. 起. 誓. —」 poster title. p: 0..1 per character reveal; o.y baseline
  WD.title = function (g, chars, cx, y, o) {
    o = o || {};
    var size = o.size || 120, gap = o.gap || 190, n = chars.length, x0 = cx - gap * (n - 1) / 2;
    chars.forEach(function (c, i) {
      var p = E.out3(GX.clamp(o.ps ? o.ps[i] : 1, 0, 1));
      if (p <= 0) return;
      GX.text(g, c + '.', x0 + i * gap, y + (1 - p) * 30, { size: size, font: 'serif', w: 700, color: o.color || P.espresso, align: 'center', alpha: p });
    });
    var lineP = E.out3(GX.clamp(o.line == null ? 1 : o.line, 0, 1)), lw = 200 * lineP, ly = y - size * 0.34;
    GX.rect(g, o.color || P.espresso, x0 - gap * 0.75 - lw, ly, lw, 4);
    GX.rect(g, o.color || P.espresso, x0 + gap * (n - 1) + gap * 0.75, ly, lw, 4);
  };
})();
