// S18 · bars 35–36 · close on DeepSeek's soft smile; one line in her thinking panel
SCENE(function (g, t, T) {
  GX.rect(g, P.deep, 0, 0, W, H);
  var z = GX.lerp(1.0, 1.06, GX.E.sine(GX.seg(t, 0, 2.8)));
  g.save(); GX.cam(g, { z: z, cy: 500 });
  GX.cut(g, pose('D05'), { x: 960, y: H + 60, w: 1980, ay: 1 });
  g.restore();
  WD.think(g, 90, 80, 960, 190, { p: GX.at(T, GX.bar(35) + 0.2, 0.4), T: T, title: '思考中…',
    lines: [GX.typed('这次的背景信息……好多都是关于 ta 自己的事。', GX.at(T, GX.bar(35) + 0.5, 1.4))] });
});
