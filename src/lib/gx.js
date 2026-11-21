/* GX — drawing toolkit for 「勾指起誓」. Flat screen-print look: strict palette, hard-edged shapes,
 * no gradients. Everything is a pure function of time; randomness only through seeded MV.rng. */
(function () {
  var GX = (window.GX = {});
  var W = (GX.W = 1920), H = (GX.H = 1080);
  GX.SAFE = H - 160; // keep story text above this line: the bottom band is for the user's subtitles

  GX.P = {
    cream: '#F0EEE6', apricot: '#F2C6A8', terra: '#D97757', espresso: '#3B2620',
    peri: '#B8C3F7', blue: '#4D6BFE', navy: '#1B1F4B', gold: '#F3C969',
    night: '#17151A', night2: '#201D24', night3: '#2B2730', ink: '#0F0E12',
    sea2: '#262C66', sea3: '#2F3779', deep: '#11143A', abyss: '#0A0C26', grey: '#8B8790', red: '#E0533D'
  };
  GX.FONT = { sans: '"GQ Sans", sans-serif', serif: '"GQ Serif", serif', mono: '"GQ Mono", "GQ Sans", monospace' };

  // ---------- math ----------
  var clamp = (GX.clamp = function (x, a, b) { return x < a ? a : x > b ? b : x; });
  GX.lerp = function (a, b, t) { return a + (b - a) * t; };
  GX.seg = function (t, a, b) { return clamp((t - a) / (b - a), 0, 1); };
  GX.E = {
    lin: function (t) { return t; },
    out2: function (t) { return 1 - (1 - t) * (1 - t); },
    out3: function (t) { return 1 - Math.pow(1 - t, 3); },
    in3: function (t) { return t * t * t; },
    inOut3: function (t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; },
    outBack: function (t) { var c = 1.70158; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); },
    outExpo: function (t) { return t >= 1 ? 1 : 1 - Math.pow(2, -10 * t); },
    sine: function (t) { return 0.5 - 0.5 * Math.cos(Math.PI * t); }
  };
  GX.rng = MV.rng;

  // ---------- music time (absolute seconds T) ----------
  GX.bar = function (b) { return MV.A.first + b * MV.A.bar; };          // start of bar b
  GX.beatT = function (i) { return MV.A.first + i * MV.A.period; };     // beat i, 0 = first downbeat
  GX.beats = function (T) { return (T - MV.A.first) / MV.A.period; };   // fractional beat count
  // 1 on each beat (or every `div` beats), decaying with time constant `decay` seconds
  GX.pulse = function (T, decay, div) {
    div = div || 1;
    var b = GX.beats(T) / div;
    if (b < 0) return 0;
    var since = (b - Math.floor(b)) * MV.A.period * div;
    return Math.exp(-since / (decay || 0.12));
  };
  // progress 0..1 of an event that starts at absolute time a and lasts d
  GX.at = function (T, a, d) { return clamp((T - a) / (d || 0.0001), 0, 1); };

  // ---------- stage ----------
  function makeGrain(doc) {
    var tiles = [];
    for (var k = 0; k < 4; k++) {
      var c = doc.createElement('canvas'); c.width = c.height = 256;
      var x = c.getContext('2d'), id = x.createImageData(256, 256), d = id.data, r = MV.rng(101 + k * 7);
      for (var i = 0; i < d.length; i += 4) { var v = 128 + (r() - 0.5) * 96; d[i] = d[i + 1] = d[i + 2] = v; d[i + 3] = 255; }
      x.putImageData(id, 0, 0); tiles.push(c);
    }
    return tiles;
  }

  GX.stage = function (F) {
    var canvas = F.q('canvas.gx'), g = canvas.getContext('2d');
    var poses = {};
    F.qa('img.pose').forEach(function (im) { poses[im.getAttribute('data-pose')] = im; });
    var pats = makeGrain(F.doc).map(function (c) { return g.createPattern(c, 'repeat'); });
    var S = {
      g: g, F: F,
      pose: function (id) { return poses[id]; },
      canvas: function (w, h) { var c = F.doc.createElement('canvas'); c.width = w; c.height = h; return c; },
      // draw(g, t, T): t = seconds into the shot, T = absolute song time
      run: function (draw, opts) {
        opts = opts || {};
        F.tick(function (t) {
          var T = F.start + t;
          g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1; g.globalCompositeOperation = 'source-over';
          g.fillStyle = GX.P.ink; g.fillRect(0, 0, W, H);
          g.save(); draw(g, t, T); g.restore();
          g.setTransform(1, 0, 0, 1, 0, 0); g.globalAlpha = 1; g.globalCompositeOperation = 'source-over';
          if (opts.grain !== 0) {
            g.save(); g.globalCompositeOperation = 'overlay'; g.globalAlpha = opts.grain == null ? 0.16 : opts.grain;
            g.fillStyle = pats[Math.floor(T * 12) % pats.length]; g.fillRect(0, 0, W, H); g.restore();
          }
        });
      }
    };
    GX.S = S;
    return S;
  };

  // ---------- primitives ----------
  GX.rr = function (g, x, y, w, h, r) { g.beginPath(); g.roundRect(x, y, w, h, r); };
  GX.rect = function (g, col, x, y, w, h) { g.fillStyle = col; g.fillRect(x, y, w, h); };
  GX.circle = function (g, x, y, r, col) { g.fillStyle = col; g.beginPath(); g.arc(x, y, Math.max(0, r), 0, Math.PI * 2); g.fill(); };
  GX.ring = function (g, x, y, r, lw, col) { g.strokeStyle = col; g.lineWidth = lw; g.beginPath(); g.arc(x, y, Math.max(0, r), 0, Math.PI * 2); g.stroke(); };
  GX.poly = function (g, col, pts) {
    g.fillStyle = col; g.beginPath(); g.moveTo(pts[0], pts[1]);
    for (var i = 2; i < pts.length; i += 2) g.lineTo(pts[i], pts[i + 1]);
    g.closePath(); g.fill();
  };
  // the posters' little 4-point spark
  GX.star = function (g, x, y, s, col) {
    var k = 0.28;
    GX.poly(g, col, [x, y - s, x + s * k, y - s * k, x + s, y, x + s * k, y + s * k, x, y + s, x - s * k, y + s * k, x - s, y, x - s * k, y - s * k]);
  };
  GX.flash = function (g, a, col) { if (a <= 0.001) return; g.save(); g.globalAlpha = clamp(a, 0, 1); g.fillStyle = col || GX.P.cream; g.fillRect(0, 0, W, H); g.restore(); };

  // camera: zoom z around (cx, cy), then offset (x, y), rotation r
  GX.cam = function (g, c) {
    var cx = c.cx == null ? W / 2 : c.cx, cy = c.cy == null ? H / 2 : c.cy;
    g.translate(cx, cy); if (c.r) g.rotate(c.r); g.scale(c.z || 1, c.z || 1); g.translate(-cx + (c.x || 0), -cy + (c.y || 0));
  };
  GX.shake = function (T, amp, seed) {
    var r = MV.rng(Math.floor(T * 30) * 131 + (seed || 0) * 977);
    return { x: (r() - 0.5) * 2 * amp, y: (r() - 0.5) * 2 * amp };
  };

  // character cutout. o: { x, y, h | w, ax=.5, ay=1 (anchor fractions), alpha, rot, s, flip, clip:[x,y,w,h] }
  GX.cut = function (g, img, o) {
    var iw = img && (img.naturalWidth || img.width), ih = img && (img.naturalHeight || img.height);
    if (!iw) return null;
    var h = o.h || (o.w ? o.w * ih / iw : ih);
    var w = h * iw / ih;
    var ax = o.ax == null ? 0.5 : o.ax, ay = o.ay == null ? 1 : o.ay;
    g.save();
    if (o.clip) { g.beginPath(); g.rect(o.clip[0], o.clip[1], o.clip[2], o.clip[3]); g.clip(); }
    if (o.alpha != null) g.globalAlpha *= clamp(o.alpha, 0, 1);
    g.translate(o.x, o.y);
    if (o.rot) g.rotate(o.rot);
    if (o.s) g.scale(o.s, o.s);
    if (o.flip) g.scale(-1, 1);
    g.drawImage(img, -ax * w, -ay * h, w, h);
    g.restore();
    return { x: o.x - ax * w, y: o.y - ay * h, w: w, h: h };
  };

  // copy of a cutout with polygons erased (pts in source-image pixels), e.g. a prop that leaves her hand
  GX.erase = function (img, polys) {
    var c = GX.S.canvas(img.naturalWidth, img.naturalHeight), x = c.getContext('2d');
    x.drawImage(img, 0, 0);
    x.globalCompositeOperation = 'destination-out';
    polys.forEach(function (p) { GX.poly(x, '#000', p); });
    return c;
  };

  // flat-colour silhouette of a cutout (alpha kept), for depth layers; k < 1 keeps some of the drawing showing through
  GX.tint = function (img, col, k) {
    var c = GX.S.canvas(img.naturalWidth || img.width, img.naturalHeight || img.height), x = c.getContext('2d');
    x.drawImage(img, 0, 0);
    x.globalCompositeOperation = 'source-atop'; x.globalAlpha = k == null ? 1 : k; x.fillStyle = col; x.fillRect(0, 0, c.width, c.height);
    return c;
  };

  // ---------- text ----------
  function font(o) { return (o.w || 400) + ' ' + (o.size || 32) + 'px ' + GX.FONT[o.font || 'sans']; }
  GX.measure = function (g, s, o) { g.save(); g.font = font(o || {}); if (o && o.ls) g.letterSpacing = o.ls + 'px'; var m = g.measureText(s).width; g.restore(); return m; };
  // wrap into lines no wider than maxW (character-level, works for CJK + latin)
  GX.wrap = function (g, s, o) {
    g.save(); g.font = font(o); if (o.ls) g.letterSpacing = o.ls + 'px';
    var out = [], line = '';
    Array.from(s).forEach(function (ch) {
      if (ch === '\n') { out.push(line); line = ''; return; }
      if (line && g.measureText(line + ch).width > o.maxW) { out.push(line); line = ch.trim() ? ch : ''; }
      else line += ch;
    });
    if (line) out.push(line);
    g.restore();
    return out;
  };
  // o: { size, font: sans|serif|mono, w (weight), color, align, base, ls (letter spacing px), alpha, maxW, lh }
  GX.text = function (g, s, x, y, o) {
    o = o || {};
    g.save();
    g.font = font(o);
    g.fillStyle = o.color || GX.P.cream;
    g.textAlign = o.align || 'left'; g.textBaseline = o.base || 'alphabetic';
    if (o.ls) g.letterSpacing = o.ls + 'px';
    if (o.alpha != null) g.globalAlpha *= clamp(o.alpha, 0, 1);
    if (o.maxW) {
      var lines = GX.wrap(g, s, o), lh = o.lh || (o.size || 32) * 1.45;
      for (var i = 0; i < lines.length; i++) g.fillText(lines[i], x, y + i * lh);
      g.restore();
      return lines.length * lh;
    }
    g.fillText(s, x, y);
    g.restore();
    return o.size || 32;
  };
  GX.typed = function (s, p) { var a = Array.from(s); return a.slice(0, Math.round(a.length * clamp(p, 0, 1))).join(''); };
  GX.blink = function (T, hz) { return Math.floor(T * (hz || 2) * 2) % 2 === 0; };

  // ---------- window panel (UI frame). inner(g, x, y, w, h) draws the content, clipped ----------
  GX.panel = function (g, x, y, w, h, o, inner) {
    o = o || {};
    var bar = o.bar == null ? 46 : o.bar, r = o.r == null ? 18 : o.r, pad = o.pad == null ? 8 : o.pad;
    g.save();
    if (o.alpha != null) g.globalAlpha *= clamp(o.alpha, 0, 1);
    if (o.shadow !== false) { g.fillStyle = o.shadowCol || 'rgba(0,0,0,0.38)'; GX.rr(g, x + 16, y + 18, w, h, r); g.fill(); }
    g.fillStyle = o.frame || GX.P.cream; GX.rr(g, x, y, w, h, r); g.fill();
    var ix = x + pad, iy = y + bar, iw = w - pad * 2, ih = h - bar - pad;
    g.save(); GX.rr(g, ix, iy, iw, ih, Math.max(4, r - pad)); g.clip();
    g.fillStyle = o.bg || GX.P.night; g.fillRect(ix, iy, iw, ih);
    if (inner) inner(g, ix, iy, iw, ih);
    g.restore();
    if (bar > 0) {
      var dots = o.dots || [GX.P.terra, GX.P.apricot, GX.P.peri];
      for (var i = 0; i < 3; i++) GX.circle(g, x + 26 + i * 24, y + bar / 2, 7, dots[i]);
      if (o.title) GX.text(g, o.title, x + 112, y + bar / 2 + 1, { size: 20, font: 'mono', color: o.titleCol || GX.P.espresso, base: 'middle' });
    }
    g.restore();
    return { x: ix, y: iy, w: iw, h: ih };
  };
})();
