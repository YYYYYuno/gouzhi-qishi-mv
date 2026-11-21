/* MV runtime — inlined into every shot composition by scripts/build.mjs.
 * Each shot draws its canvas as a pure function of the shot clock; the clock is one GSAP tween on the
 * shot's paused timeline. No wall clocks, no unseeded randomness. */
(function () {
  // HyperFrames hands every composition its own scoped document/window, so each shot defines its own MV.
  var MV = (window.MV = {});
  MV.A = /*AUDIO*/ null; // { bar, first, period } from analysis/bars.json

  MV.rng = function (a) {
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  };

  function loaded(img) {
    if (img.complete && img.naturalWidth) return Promise.resolve();
    return new Promise(function (res) { img.addEventListener('load', res, { once: true }); img.addEventListener('error', res, { once: true }); });
  }

  /* Shot context. id = composition id, start/dur = track seconds. build(F) registers draw callbacks via F.tick. */
  MV.frame = function (doc, id, start, dur, build) {
    var document = doc;
    var root = document.getElementById('r-' + id);
    var tl = gsap.timeline({ paused: true });
    var F = {
      id: id, root: root, tl: tl, start: start, dur: dur, fns: [], doc: document,
      q: function (s) { return root.querySelector(s); },
      qa: function (s) { return Array.prototype.slice.call(root.querySelectorAll(s)); },
      tick: function (fn) { F.fns.push(fn); }
    };
    var clock = { t: 0 };
    var imgs = Array.prototype.slice.call(root.querySelectorAll('img'));
    var faces = ['400 20px "GQ Sans"', '700 20px "GQ Sans"', '500 20px "GQ Serif"', '700 20px "GQ Serif"', '400 20px "GQ Mono"'];
    var fontLoads = document.fonts ? faces.map(function (f) { return document.fonts.load(f).catch(function () {}); }).concat([document.fonts.ready]) : [];
    Promise.all(fontLoads.concat(imgs.map(loaded))).then(function () {
      build(F);
      tl.to(clock, { t: dur, duration: dur, ease: 'none', onUpdate: function () { for (var i = 0; i < F.fns.length; i++) F.fns[i](clock.t); } }, 0);
      for (var i = 0; i < F.fns.length; i++) F.fns[i](0);
      window.__timelines[id] = tl;
      if (window.__hfForceTimelineRebind) window.__hfForceTimelineRebind();
    });
    return F;
  };
})();
