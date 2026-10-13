# 第01集：乐透促销的四道比较（无五官版）

本工程使用锁定的最终旁白，离线重渲染不调用TTS、不需要配音密钥，也不会新增配音费用。全部人物为无五官样式；横屏1920×1080、30fps、11636帧。最终旁白保音高1.2倍速，无配乐。声音参数见 `voice.json`。

## 环境与安装

已验证：Node.js 24.19.0、Playwright 1.62.1、Chromium 154.0.8037.57、FFmpeg/ffprobe 7.1.5、Python 3.12（仅压缩脚本）。Node最低版本20。安装FFmpeg并确保 `ffmpeg`、`ffprobe` 位于PATH。

```bash
npm ci --ignore-scripts
npx playwright install chromium
npm run smoke
npm run render
python3 encode-portable.py
```

也可使用系统Chromium：`VIDEO_CHROMIUM=/usr/bin/chromium npm run render`。`VIDEO_FFMPEG` 可指定FFmpeg路径。实际画面由HTML Canvas连续演算，渲染器在本机内存中提供资源，不需要对外网站。依赖安装可能需要网络；渲染本身不访问外网。

## 输入与输出

- `scene.js`、三个 `scenes-*.js`：人物、连续动作、比较图解与镜头。
- `timeline-full.json`：完整旁白、逐句/字时间和语义动作数据；`subtitles-full-original.srt`：字幕。
- `media/narration-approved.m4a`：锁定AAC最终旁白，渲染时直接复制，不重编码。
- `fonts/NotoSansSC.woff2`：完整字体的WOFF2封装，附SIL OFL 1.1许可证。
- `npm run render` 输出 `01_乐透促销的四道比较_无五官完整版.mp4`、视频中间文件和本地渲染清单。
- `python3 encode-portable.py` 从完整版生成完整1080p30便携版，音轨直接复制；压缩目标15MB。发布的上下两段是该便携版在第四种比较处的无重新编码分段，以满足上传接口大小限制。
- `npm run smoke` 在 `smoke-output/` 生成65、205.2、350秒PNG和最初2秒的1080p30带声短片。

## 可运行验证范围

发布前在干净复制目录执行 `npm ci --ignore-scripts`、`npm run smoke` 和 `npm run render`。三个代表画面与原工程逐像素一致，完整11636帧无五官母版重渲染成功；生成MP4与已审母版SHA256完全相同：`2068548083738d92f4505016115c1b582895482ca2b87da26ff8d8cecd0ef551`。另检查完整解码与锁定AAC码流。未进行实时全片观看或实际听审。不同平台/编码器版本可能产生不同MP4字节，画面时序和锁定音轨应保持。

`SHA256SUMS` 校验公开输入文件。工程不含node_modules、凭据、账号配置、临时日志或内部审查记录。
