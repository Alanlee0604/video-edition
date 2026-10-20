# 第 05 集 · 书籍案例：Medicaid 断点的解释与排查

独立、可复渲染的最终无五官动画工程。黑色/粉色，1920×1080，30 fps，8573 帧，画面时长 285.766667 秒。场景由 Canvas 逐帧绘制，字幕已烧录，另附完整 SRT。

## 环境与安装

实际验证环境：Debian 13，Node.js 24.19.0，npm 11.9.0，Playwright 1.62.1，Chromium 154.0.8037.57，FFmpeg/ffprobe 7.1.5。Node.js 要求 >=20。请先安装 FFmpeg（含 libx264 与 ffprobe）和 Chromium，并确认命令可运行。

在本目录执行：

```sh
npm ci --ignore-scripts
npm run render
npm run verify
```

`npm ci` 只安装锁文件指定的 Node 依赖。渲染器优先使用 `CHROMIUM_PATH` 环境变量指定的浏览器，其次使用 Linux 的 `/usr/bin/chromium`。若无系统 Chromium，可执行 `npx playwright install chromium` 安装 Playwright 对应浏览器；Linux 还需浏览器所需系统库。不同浏览器、系统与编码器版本可能使抗锯齿或视频文件字节变化。

例如：

```sh
CHROMIUM_PATH=/usr/bin/chromium RENDER_JOBS=4 npm run render
```

输入是本目录内的源码、`timeline.json`、`scenes.json`、字体与 `narration.m4a`；输出为 `output/05_1080p30.mp4`。四个页面并行绘制，可用 `RENDER_JOBS=1` 降低资源占用。重新渲染会覆盖此输出文件。浏览器仅获准读取打包的本地资源，渲染阶段不调用外部服务。

只导出指定时间的静态图：

```sh
npm run frames -- 0,15,60,120
```

不提供时间参数时按每个场景导出一张图片；输出在 `output/`。`npm run verify` 检查完整解码、分辨率、帧数、帧率，并逐包比较输出音轨与输入旁白的 AAC 数据及时间戳。

## 锁定旁白与字幕

`narration.m4a` 是最终锁定旁白，已完成此前确定的 1.2 倍语速处理。当前工程直接复制 AAC 音频包，不再次变速、不重合成、不加配乐，不需要 TTS 账户、API 密钥或 TTS 费用。

- `narration.txt`：完整最终旁白。
- `subtitles.srt`：最终字幕原文件。
- `timeline.json`：完整最终段落、逐字与字幕时间轴，保留文字和时间精度。
- `scenes.json`：命题、对象、动作及镜头衔接说明。
- `common.js` 与 `case05.js`：最终角色和场景代码。

旁白 SHA-256：`4b80909922afeab13c5ec219cf2038e67cce9ef0f9abf2a535e80b0b4186d343`。

## 字体与素材

图形、角色和图标由所附 Canvas 源码生成，无远程图片、素材包或音乐依赖。唯一随附字体 `fonts/NotoSansSC.woff2` 由原始 Noto Sans SC 可变 TTF 做 WOFF2 格式转换，保留字形与字体元数据。字体版权为 (c) 2014–2021 Adobe，Reserved Font Name 为 “Source”；现有主字体名为 Noto Sans SC Thin，不使用保留名。字体以 SIL Open Font License 1.1 分发，完整声明和许可见 `fonts/OFL.txt`，官方许可文本：https://openfontlicense.org/open-font-license-official-text/ 。

字体 SHA-256：`1e51a6d63203120bbd23ed9d10a9b89106a45e1d1c3b915a0f78f4382a4ad797`。第三方 npm 依赖的许可由其软件包提供；依赖不随本项目内嵌。

## 校验与复现范围

`SHA256SUMS` 列出本目录交付文件的 SHA-256（不包含校验清单自身）。可执行 `sha256sum -c SHA256SUMS` 核验输入。已在仅复制本目录输入文件的全新目录中执行 `npm ci --ignore-scripts`、`npm run render` 和 `npm run verify`，完整复渲染并解码通过。打包入口和 WOFF2 字体经过 99 个时刻的逐像素比较，结果与打包前源码一致；完整重渲染输出的每个视频包及时间戳均与已审母版一致，音频包及时间戳均与所附锁定旁白一致。此次打包验证还查看了实际 MP4 抽帧，未重新进行实时全片人工观看或人工听审。

本工程默认生成 CRF 18 的高质量画面。已发布成片如经过额外体积优化，文件 SHA-256 不会与此重渲染结果相同；音轨保持上述输入的原始 AAC 包。
