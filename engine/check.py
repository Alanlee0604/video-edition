#!/usr/bin/env python3
"""自动检查：① 页面内抽样 audit（字号<28、越出安全区、示意/教学场景缺标注）② 成片 freezedetect（静止≥2s）。
用法：python3 engine/check.py --page index.html --start 0 --end 261.5 --step 0.25 [--video a.mp4 ...] [--compare old.mp4 ...] --json out.json"""
import argparse,json,os,re,subprocess,shutil
CHROME=os.environ.get('VIDEO_CHROMIUM') or shutil.which('google-chrome') or shutil.which('chromium')
def freeze(path,n=0.001,d=2):
    r=subprocess.run(['ffmpeg','-v','info','-i',path,'-vf',f'freezedetect=n={n}:d={d}','-an','-f','null','-'],capture_output=True,text=True).stderr
    st=[float(x) for x in re.findall(r'freeze_start: ([\d.]+)',r)];du=[float(x) for x in re.findall(r'freeze_duration: ([\d.]+)',r)]
    if len(st)>len(du):  # 结尾仍在静止
        dur=float(subprocess.run(['ffprobe','-v','0','-show_entries','format=duration','-of','csv=p=0',path],capture_output=True,text=True).stdout)
        du.append(dur-st[-1])
    total=float(subprocess.run(['ffprobe','-v','0','-show_entries','format=duration','-of','csv=p=0',path],capture_output=True,text=True).stdout)
    return {'file':os.path.basename(path),'duration':round(total,2),'freezes':len(du),'frozen_s':round(sum(du),2),'longest_s':round(max(du,default=0),2),'segments':[[round(s,2),round(x,2)] for s,x in zip(st,du)]}
def main():
    ap=argparse.ArgumentParser();ap.add_argument('--page');ap.add_argument('--start',type=float,default=0);ap.add_argument('--end',type=float)
    ap.add_argument('--step',type=float,default=0.25);ap.add_argument('--video',nargs='*',default=[]);ap.add_argument('--compare',nargs='*',default=[]);ap.add_argument('--json',required=True)
    a=ap.parse_args();rep={'audit':None,'freeze_new':[freeze(v) for v in a.video],'freeze_old':[freeze(v) for v in a.compare]}
    if a.page:
        from playwright.sync_api import sync_playwright
        with sync_playwright() as pw:
            b=pw.chromium.launch(executable_path=CHROME);pg=b.new_page(viewport={'width':1920,'height':1080})
            errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
            pg.goto('file://'+os.path.abspath(a.page));pg.evaluate('document.fonts.ready')
            small={};unsafe={};nolabel=[];t=a.start;n=0
            while t<a.end:
                info=pg.evaluate(f'seek({t})');r=pg.evaluate('ENGINE.audit()');n+=1
                for s in r['small']:small.setdefault(s['text'],[s['px'],t])
                for u in r['unsafe']:
                    k=u.get('text') or u.get('shape');unsafe.setdefault(info['scene']+' | '+k,[u['rect'],round(t,2)])
                if pg.evaluate(f"EP.needsLabel('{info['kind']}')") and not r['label']['visible']:nolabel.append([round(t,2),info['scene']])
                t+=a.step
            b.close()
        rep['audit']={'samples':n,'page_errors':errs,'small_text':small,'outside_safe_area':unsafe,'missing_label':nolabel}
    json.dump(rep,open(a.json,'w'),ensure_ascii=False,indent=1)
    print(json.dumps({k:(v if k!='audit' else {kk:(len(vv) if isinstance(vv,(dict,list)) else vv) for kk,vv in v.items()}) for k,v in rep.items() if v is not None},ensure_ascii=False)[:3000])
if __name__=='__main__':main()
