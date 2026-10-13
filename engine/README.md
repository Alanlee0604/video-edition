# 统一动画引擎（HTML/DOM + SVG + 确定性时间线）

所有集共用。画面状态完全由时间 t 决定：`seek(t)`。渲染时逐帧 seek 再截图，因此导出结果是确定的，不依赖实时播放。

| 文件 | 作用 |
|---|---|
| `tokens.css` | 设计规范：字号阶梯（下限 28，字幕 46，标题 64，术语 96），色板（单一粉色焦点、推测用灰色虚线、警示橙），虚线样式 |
| `stage.css` | 1920×1080 舞台；版式区（标注 96–140、标题 150–230、内容 260–840、字幕 ≤984）；卡片、标签、术语、SVG 线条样式 |
| `engine.js` | `Timeline`（可 seek，按元素/属性叠加补间）；`EASE` 缓动档位（out 入场、in 出场、inout 位移/画线、back 强调）；`DUR` 时长档位（0.25/0.5/1.2/1.6/0.6/0.1）；`Anchors`：`W(段落,'词')` 把动作绑在旁白逐字时间戳上；`Episode`：场景容器、交叉淡化、环境漂移镜头、常驻标注、字幕；`audit()` 检查钩子 |
| `flat.js` | 扁平矢量组件（mg-styles-15 / 01-flat-vector 规范）：店铺、彩票、汽油、香烟、食品篮、日历、银行、开关、收银机、半身像、全身角色（无五官，肩部锚点手臂）、对话气泡、实心节点；覆盖 `KIT.icon` |
| `kit.js` | 组件：标题、卡片、标签、术语、文本、SVG 层、无五官人物、店面、箭头、坐标轴、竖线、勾叉 |
| `render.py` | 逐帧导出：Playwright 多进程 seek→PNG（无损）→ ffmpeg libx264 crf16 preset slow tune animation，音轨 `-c:a copy` 合入 |
| `check.py` | 自动检查：页面抽样（字号<28、越出安全区、示意/教学场景缺标注、脚本错误）；成片 freezedetect（n=0.001、≥2 秒） |

## 场景写法
```js
scene('id','schematic', A=>A.P(10),           // 类型决定常驻标注；起点绑在旁白段落/词上
  K.title('第一种：给参加的店找搭档')+K.card('c1',1000,330,780,'同一个连锁品牌'),
  ({in:i,hl,pop,A})=>{ i('#c1',A.W(11,'同一个连锁品牌')); hl('#c1',A.W(11,'同一个连锁品牌')); },
  '示意图 · 匹配关系');                          // 可选：覆盖默认标注文字
```
类型：`schematic`→“示意图”，`teaching`→“教学示例 · 非研究数据”，`record`→“书中描述 · 方向示意，非原始数值”，`none`→无标注（纯文字/术语场景）。
找不到锚点词会直接报错，避免旁白改了而画面没跟上。

## 导出与检查
```bash
python3 engine/render.py --page projects/<ep>/index.html --start 0 --end 261.5333 --audio 原片或旁白.m4a --out out.mp4 --workers 5
python3 engine/check.py --page projects/<ep>/index.html --start 0 --end 388 --step 0.25 --video out.mp4 --compare 原片.mp4 --json report.json
```
依赖：Python 3 + playwright（可用系统 Chrome，环境变量 `VIDEO_CHROMIUM` 指定）、ffmpeg。字体 `fonts/NotoSansSC.woff2`（SIL OFL）。

## 扁平矢量主题与精简字幕
- 场景主题 `theme`：`u` 群青底 / `i` 墨蓝底 / `c` 奶油底 / `m` 薄荷底；`--pink` 在主题内表示本屏唯一焦点色（群青底用向日葵黄，其余用珊瑚）。
- 转场：色块擦除（新场景从左向右整块盖过旧场景）。
- 精简字幕：`Episode({subs})`，格式 `[段落, 锚点词, 短句]`，按旁白时间出现，检查器报告超过 14 字的条目。
