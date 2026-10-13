"""旁白 + BGM 混音：人声归一到 -16 LUFS，BGM 循环铺满、比人声低 22 LU，人声 sidechain 压低 BGM，首 2.5s 淡入、尾 4s 淡出。用法：python3 engine/tools/mix_bgm.py narration.m4a out.m4a [相对dB] ；BGM 路径见 BGM 变量。"""
import sys,subprocess,re,json
voice,out=sys.argv[1],sys.argv[2]
BGM='/home/box/agent-data/agents/13fe5c20-dfda-4eb9-b294-87df032c52cb/attachments/3a87f62ce805e31e5e12dafabdb989ab00708ad2e8ed5891a7c6552481b96219.mp3'
def lufs(f):
    e=subprocess.run(['ffmpeg','-hide_banner','-i',f,'-af','ebur128','-f','null','-'],capture_output=True,text=True).stderr
    return float(re.findall(r'I:\s+(-?[\d.]+) LUFS',e)[-1])
def dur(f): return float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f]))
D=dur(voice); lv=lufs(voice); lb=lufs(BGM)
REL=float(sys.argv[3]) if len(sys.argv)>3 else -22
gv=-16-lv; g=(-16+REL)-lb
fc=(f"[1:a]aloop=loop=-1:size=2e9,atrim=0:{D:.3f},asetpts=N/SR/TB,aresample=48000,aformat=channel_layouts=stereo,volume={g:.2f}dB,"
    f"afade=t=in:st=0:d=2.5,afade=t=out:st={D-4:.3f}:d=4[bg];"
    f"[0:a]aresample=48000,aformat=channel_layouts=stereo,volume={gv:.2f}dB,asplit=2[v][sc];"
    f"[bg][sc]sidechaincompress=threshold=0.03:ratio=3:attack=40:release=600:makeup=1[bgd];"
    f"[v][bgd]amix=inputs=2:normalize=0:duration=first,alimiter=limit=0.95[a]")
subprocess.run(['ffmpeg','-v','error','-y','-i',voice,'-i',BGM,'-filter_complex',fc,'-map','[a]','-c:a','aac','-b:a','192k',out],check=True)
print(json.dumps({'voice_lufs':lv,'bgm_lufs_src':lb,'voice_gain_db':round(gv,2),'bgm_gain_db':round(g,2),'rel':REL,'mix_lufs':lufs(out)}))
