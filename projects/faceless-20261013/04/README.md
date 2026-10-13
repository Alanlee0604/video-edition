# 第04集：禁烟立法与心梗住院（无五官版）

黑/粉色逐句语义动画；1920×1080、30 fps。工程自包含本集最终旁白和字体，不使用 TTS、不需要 API 密钥，也不产生额外配音费用。旁白已完成原定1.2倍处理，渲染时直接复制，不再变速或加音乐。

## 环境和安装

已验证：Node.js 24.19.0、npm 11.9.0、@napi-rs/canvas 0.1.100、FFmpeg/ffprobe 7.1.5、Python 3.12.14。原生 Canvas 依赖由 npm 按当前系统安装，不包含 node_modules。

从本集工程目录运行：

```bash
npm ci --ignore-scripts --no-audit --no-fund
node render.cjs 04 frame 218.6 preview.png
node render.cjs 04 video
python3 verify_portable.py 04
```

默认npm缓存目录不可写时，为安装命令添加 `--cache /tmp/video-render-npm-cache`；验证环境使用了独立可写缓存目录。

`frame` 输出指定时点 PNG。`video` 完整输出 `04/04_逐句语义重制_1080p.mp4`，末尾自动用完整 narration.m4a 重新封装并复制AAC，保留旁白尾音。重复渲染会覆盖该目录下同名输出，请先备份需要保留的输出。验证命令检查全片解码、1080p30、预期帧数及输出与锁定音轨的 AAC/PCM 一致性。

## 输入与结构

- `case04.cjs`：本集场景和动作，以绝对时间驱动对象状态。
- `kit.cjs`：画布、图形、中文字体、字幕排版及空白脸人物。
- `render.cjs`：帧生成、FFmpeg编码、完整音轨封装。
- `04/narration.m4a`：最终锁定旁白，直接复用。
- `04/timeline.json`：最终段落/字词/字幕时间与帧数；仅移除供应方请求及校准记录等渲染无关元数据，字幕文本和最终时间不变。
- `04/subtitles.srt`：完整最终字幕。
- `fonts/FilmMedium.ttf`、`FilmBold.ttf`：实际使用的静态500/700字重，按SIL OFL 1.1随工程分发，版权和许可证见 `fonts/LICENSE.txt`。字体文件不得单独出售；字体许可不限制渲染成品。
- `package.json`、`package-lock.json`：固定依赖版本；安装仅访问公开npm软件包。

## 交付规格与验证范围

本集预期 8715 帧，视频时长 290.500000 秒。干净复制目录已执行真实 npm ci、指定时点PNG渲染与60帧编码/解码烟雾检查；这不表示在该复制目录重新渲染并人工观看了整集。原交付完整视频另已通过全片解码与锁定音轨核验。重编码后的文件字节哈希可能随 FFmpeg/平台版本变化。

