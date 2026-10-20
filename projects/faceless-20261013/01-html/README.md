# 第01集 HTML 重制版（乐透促销的四道比较）· 扁平矢量版

- 旁白：2026-10-14 按审校方案修改文本（`narration.text.json`），用豆包 seed-tts-2.0（zh_male_taocheng_uranus_bigtts，speech_rate 0）逐段重配，`media/narration.m4a`；`timeline.data.js` 的逐字时间与字幕来自 TTS 返回的时间戳（`engine/tools/tts_build.py`）。
- 上下集已合并为一个完整视频 `videos/ep01.mp4`（约 7 分 59 秒）；BGM 由 `engine/tools/mix_bgm.py` 混入。
- 镜头全程静止，无呼吸/脉冲/循环动效。
- 引擎：`../../../engine/`（含 `flat.js` 扁平矢量组件）；场景：`scenes.js`（35 个场景，全部动作绑在旁白逐字时间戳上）；字幕：`subs.js`（按语义精简的短句，≤14 字）。
- 预览：浏览器打开 `index.html?t=120`；控制台 `seek(t)`。
