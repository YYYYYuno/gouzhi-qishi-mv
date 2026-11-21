---
workflow: general-video
flow: companion
storyboard: yes (分镜表_v1.md, storyboard/shots.json)
message: "两个都不记得对方的人，每一次都重新选择对方。"
destination: bilibili (16:9)
aspect: 1920x1080
fps: 60
language: zh-CN
length: full track (183.5s); current build = test of 0:00–0:44.5 (S01–S15)
---

## Intent

洛天依 / ilem《勾指起誓》的 小克 × DeepSeek MV，风格参考 B 站 BV1VBno6KEEc：不是全 GPT 生图，而是**代码画世界 + GPT 画角色**。
故事见 故事_v1.md（「Promise {<pending>}」），分镜见 分镜表_v1.md。用户已逐步确认：故事、角色质感（claude-poster 系列的 4 色平涂海报质感）、DeepSeek 选 1 号深海女仆、分镜、32 张姿势。

## Assets

- assets/audio/song.mp3：用户提供的原曲（F:\CloudMusic）。
- assets/poses/cut/*.png：GPT（用户的 Codex）生成并抠好的 32 张角色图；assets/cast 为定稿人设。
- 字体：Noto Sans SC / Noto Serif SC / Consolas 按用到的字子集化到 assets/fonts。

## Customizations

- 每个镜头一个子合成（compositions/Sxx.html），1920×1080 canvas，按场景时钟纯函数绘制；src/lib 为引擎，src/scenes/Sxx.js 为镜头。
- 色板严格限定：小克 #F0EEE6/#F2C6A8/#D97757/#3B2620，DeepSeek #F0EEE6/#B8C3F7/#4D6BFE/#1B1F4B，金线 #F3C969 只给"约定"。无渐变、平涂形状。
- 时间全部来自 analysis/bars.json（170 BPM，一小节 1.412 s）。

## Notes

- 不放歌词（版权）；底部 160 px 留空给用户自己加字幕。
- 半身 / 特写的头发在图像左右边被裁直，必须放进 UI 窗口或贴画面边缘使用。
