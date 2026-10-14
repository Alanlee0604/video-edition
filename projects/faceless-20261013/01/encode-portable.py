from pathlib import Path
import subprocess,json
S=Path(__file__).resolve().parent;source=S/'01_乐透促销的四道比较_无五官完整版.mp4';out=S/'01_乐透促销的四道比较_无五官便携版_15MB.mp4'
base=['ffmpeg','-v','warning','-i',str(source),'-map','0:v:0','-c:v','libx264','-preset','veryslow','-tune','animation','-b:v','100k','-passlogfile',str(S/'portable-pass'),'-pix_fmt','yuvj420p','-color_range','pc','-colorspace','bt470bg','-r','30','-fps_mode','cfr']
with (S/'portable-pass1.log').open('w') as log:subprocess.run(base+['-y','-pass','1','-an','-progress',str(S/'portable-pass1-progress.txt'),'-f','null','/dev/null'],stdout=log,stderr=log,check=True)
with (S/'portable-pass2.log').open('w') as log:subprocess.run(base+['-n','-pass','2','-map','0:a:0','-c:a','copy','-movflags','+faststart','-progress',str(S/'portable-pass2-progress.txt'),str(out)],stdout=log,stderr=log,check=True)
assert out.stat().st_size<=15000000,out.stat().st_size
print(json.dumps({'file':str(out),'bytes':out.stat().st_size,'target':15000000}))
