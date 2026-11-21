// S05 · bars 10–11 · 小克 kneels at the round hole in the floor and lets the folded prompt fall; camera follows it down
// once the paper falls, her hands are drawn from a copy with the drawn paper erased (C02 pixels, just under the fingertips)
var emptyHands = GX.erase(pose('C02'), [[928, 688, 990, 677, 1022, 728, 957, 764, 926, 722]]);
SCENE(function (g, t, T) {
  var fl = 760, hx = 1170, hy = 860;
  var drop = GX.bar(11);
  var follow = GX.E.inOut3(GX.at(T, drop + 0.1, 1.15));
  g.save();
  GX.cam(g, { z: 1 + follow * 1.5, cx: hx, cy: hy, y: -follow * 120 });
  WD.interior(g, { floor: fl, dim: true, seed: 24 });
  var glow = GX.at(T, drop + 0.75, 0.5) * (0.7 + 0.3 * GX.pulse(T, 0.2));
  WD.hole(g, hx, hy, 210, 56, { T: T, glow: glow });
  var r = GX.cut(g, T < drop ? pose('C02') : emptyHands, { x: 760, y: 806, h: 640, ay: 1 });
  // the code paper sits exactly on the drawn one, then falls into the hole
  if (r) {
    var sx = r.x + r.w * 0.906, sy = r.y + r.h * 0.705;
    var f = GX.at(T, drop, 0.62), fe = GX.E.in3(f);
    if (f > 0 && f < 1) {
      var px = GX.lerp(sx, hx, GX.E.out2(f)), py = GX.lerp(sy, hy, fe), s = 1 - 0.55 * fe;
      g.save(); g.translate(px, py); g.rotate(f * 2.4); g.scale(s, s);
      GX.rect(g, P.cream, -46, -30, 92, 60); GX.poly(g, P.apricot, [-46, -30, 46, -30, 0, 6]);
      g.restore();
    }
    if (f >= 1) WD.ripples(g, hx, hy, T - drop, { s: 0.6, speed: 0.9, n: 2, alpha: 1 - GX.at(T, drop + 1.2, 0.6) });
  }
  g.restore();
});
