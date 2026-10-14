from pathlib import Path
import sys,subprocess,json,hashlib
r=Path(__file__).resolve().parent;c=sys.argv[1];d=r/c;v=d/f'{c}_逐句语义重制_1080p.mp4';run=lambda a:subprocess.check_output(a,stderr=subprocess.PIPE)
j=json.loads(run(['ffprobe','-v','error','-count_frames','-show_streams','-of','json',str(v)]));s=next(x for x in j['streams'] if x['codec_type']=='video');tl=json.loads((d/'timeline.json').read_text());assert int(s['nb_read_frames'])==tl['frames'];assert (s['width'],s['height'],s['r_frame_rate'])==(1920,1080,'30/1')
run(['ffmpeg','-v','error','-threads','2','-i',str(v),'-f','null','-'])
for fmt,args in [('AAC',['-c:a','copy','-f','adts']),('PCM',['-c:a','pcm_s16le','-f','s16le'])]:
 hs=[hashlib.sha256(run(['ffmpeg','-v','error','-threads','2','-i',str(p),'-vn']+args+['-'])).hexdigest() for p in [d/'narration.m4a',v]];assert hs[0]==hs[1],(fmt,hs)
print(c,'full decode, dimensions, frame count, and locked AAC/PCM checks passed')
