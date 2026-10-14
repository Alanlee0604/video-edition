import json,re
from playwright.sync_api import sync_playwright
OUT='/workspace/video-edition-review/ep03/keyframes'
src=open('/tmp/shots4.py').read()
JS=re.search(r"JS=r'''(.*?)'''",src,re.S).group(1)
with sync_playwright() as pw:
  b=pw.chromium.launch(executable_path='/usr/bin/google-chrome');pg=b.new_page(viewport={'width':1920,'height':1080})
  errs=[];pg.on('pageerror',lambda e:errs.append(str(e)))
  pg.goto('file:///workspace/video-edition/projects/faceless-20261013/03-html/index.html?subs=0');pg.evaluate('document.fonts.ready');pg.wait_for_timeout(500)
  sc=pg.evaluate('EP.scenes.map(s=>[s.id,s.t0,s.t1])');rep=[];al=[]
  for i,(sid,t0,t1) in enumerate(sc):
    t=t1-0.4;pg.evaluate(f'seek({t})');r=pg.evaluate('ENGINE.audit()')
    # 静帧：去掉环境镜头漂移，保证网格坐标精确
    pg.evaluate("document.querySelectorAll('.cam').forEach(c=>c.style.transform='none')");r=pg.evaluate('ENGINE.audit()')
    pg.screenshot(path=f'{OUT}/{i+1:02d}_{sid}.png');a=pg.evaluate(JS)
    bad=[g for g in a['groups'] if not g['ok']]+[c for c in a['contain'] if not c['ok']]
    al.append({'n':i+1,'scene':sid,**a,'ok':not bad})
    bb=r['box'] or [0,0,0,0];w=min(bb[2],1824)-max(bb[0],96);h=min(bb[3],984)-max(bb[1],96)
    body=sorted(set(r['body']))
    rep.append({'n':i+1,'scene':sid,'body_text':body,'text_ok':len(body)<=2 and all(len(x)<=8 for x in body),'box':bb,'content_x':[bb[0],bb[2]],'width_pct':round(w/1728,2),'area_pct':round(w*h/1728/888,2),'small':[x['text'] for x in r['small']],'unsafe':[(x.get('text') or x.get('shape')) for x in r['unsafe']],'align_ok':not bad,'align_bad':bad})
  json.dump(al,open(OUT+'/align_check.json','w'),ensure_ascii=False,indent=1)
  json.dump({'page_errors':errs,'scenes':rep},open(OUT+'/dom_check.json','w'),ensure_ascii=False,indent=1)
  b.close()
for r in rep:print(r['n'],r['scene'],r['body_text'],r['content_x'],r['unsafe'][:3],r['align_ok'],r['align_bad'][:2])
print('errors',errs)
