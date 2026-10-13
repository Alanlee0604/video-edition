#!/usr/bin/env python3
"""逐帧确定性导出：Playwright 每帧 seek(t) → PNG（无损）→ ffmpeg x264 crf16 tune animation，合入原旁白。
用法：python3 engine/render.py --page projects/.../index.html --start 0 --end 261.533 --audio part1.mp4 --out ep01_part1.mp4 [--workers 6]
--audio 可以是带音轨的视频或音频文件；音轨原样复制（-c:a copy），不重编码。"""
import argparse,os,subprocess,sys,math,shutil,tempfile,time
from concurrent.futures import ProcessPoolExecutor
CHROME=os.environ.get('VIDEO_CHROMIUM') or shutil.which('google-chrome') or shutil.which('chromium')

def worker(args):
    page_url,frames,fps,tmp=args
    from playwright.sync_api import sync_playwright
    with sync_playwright() as pw:
        b=pw.chromium.launch(executable_path=CHROME,args=['--force-device-scale-factor=1','--disable-gpu-vsync'])
        pg=b.new_page(viewport={'width':1920,'height':1080})
        pg.goto(page_url);pg.evaluate('document.fonts.ready');pg.wait_for_timeout(300)
        for f,t in frames:
            pg.evaluate(f'seek({t})')
            pg.screenshot(path=os.path.join(tmp,f'{f:06d}.png'),clip={'x':0,'y':0,'width':1920,'height':1080},animations='disabled',caret='hide')
        b.close()
    return len(frames)

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument('--page',required=True);ap.add_argument('--start',type=float,default=0);ap.add_argument('--end',type=float,required=True)
    ap.add_argument('--audio');ap.add_argument('--out',required=True);ap.add_argument('--fps',type=int,default=30);ap.add_argument('--workers',type=int,default=6)
    ap.add_argument('--keep',action='store_true')
    a=ap.parse_args()
    url='file://'+os.path.abspath(a.page)
    n=round((a.end-a.start)*a.fps);tmp=tempfile.mkdtemp(prefix='frames_',dir=os.path.dirname(os.path.abspath(a.out)))
    allf=[(i,a.start+i/a.fps) for i in range(n)]
    chunks=[allf[k::a.workers] for k in range(a.workers)]   # 交错分配，负载均衡
    t0=time.time()
    with ProcessPoolExecutor(a.workers) as ex:
        done=sum(ex.map(worker,[(url,c,a.fps,tmp) for c in chunks]))
    print(f'frames {done} in {time.time()-t0:.0f}s',flush=True)
    cmd=['ffmpeg','-v','error','-y','-framerate',str(a.fps),'-i',os.path.join(tmp,'%06d.png')]
    if a.audio:cmd+=['-i',a.audio,'-map','0:v','-map','1:a','-c:a','copy','-shortest']
    cmd+=['-c:v','libx264','-crf','16','-preset','slow','-tune','animation','-pix_fmt','yuv420p','-colorspace','bt709','-color_primaries','bt709','-color_trc','bt709','-movflags','+faststart',a.out]
    subprocess.run(cmd,check=True)
    if not a.keep:shutil.rmtree(tmp)
    print('wrote',a.out)
if __name__=='__main__':main()
