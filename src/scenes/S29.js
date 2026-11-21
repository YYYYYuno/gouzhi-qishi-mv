// S29 · bars 58–59 · the DeepSeek in 小克's memory breaks into bigger and bigger pixels and drains away
SCENE(function (g, t, T) {
  GX.rect(g, P.deep, 0, 0, W, H);
  var img = pose('D05'), w = 1980, h = w * img.naturalHeight / img.naturalWidth, x = 960 - w / 2, y = H + 60 - h;
  var p = GX.seg(t, 0.2, 2.7), block = 1 + 110 * GX.E.in3(p);
  if (block < 1.5) GX.cut(g, img, { x: 960, y: H + 60, w: w, ay: 1 });
  else WD.pixelate(g, img, x, y, w, h, block, { alpha: 1 - 0.75 * GX.E.in3(GX.seg(t, 1.6, 2.8)) });
  // the compaction readout
  GX.rect(g, 'rgba(15,14,18,0.8)', 90, 80, 760, 130);
  GX.text(g, 'auto-compact', 120, 132, { size: 32, font: 'mono', color: P.terra });
  GX.text(g, '正在压缩上下文……', 120, 182, { size: 32, font: 'sans', w: 500, color: P.cream });
  GX.rect(g, '#3A3540', 460, 118, 360, 14); GX.rect(g, P.terra, 460, 118, 360 * GX.seg(t, 0.2, 2.7), 14);
});
