"""豆包 seed-tts-2.0 重配音：逐段合成 → 用返回的逐字时间戳生成 chars/字幕 → 段间留 0.42s 拼接成 media/narration.m4a，并改写 timeline.data.js。
用法：DOUBAO_TTS_TOKEN=... python3 engine/tools/tts_build.py <集号> <仓库根> <临时目录>"""
import json,sys,os,re,hashlib,subprocess,difflib
from concurrent.futures import ThreadPoolExecutor
sys.path.insert(0,os.path.dirname(os.path.abspath(__file__))); import tts
from speech_end import speech_end
F=[]  # 审校改动已写入各集 narration.text.json；重配音时直接读取该文件
CACHE=os.environ.get('TTS_CACHE','/workspace/tts_cache')
PUN=set('，。？！；：、“”‘’（）《》…—,.?!;:"\'() ')
def synth(text):
    h=hashlib.sha1(text.encode()).hexdigest()[:16]; mp3=f'{CACHE}/{h}.mp3'; js=f'{CACHE}/{h}.json'
    if not os.path.exists(js):
        for k in range(4):
            try: subs,_=tts.tts(text,mp3); break
            except Exception as e:
                if k==3: raise
        words=[w for s in subs for w in s['words']]
        if not words: os.remove(mp3); return synth(text)
        json.dump(words,open(js,'w'),ensure_ascii=False)
    return mp3,json.load(open(js))
def align(text,words):
    # per-char times for text
    wc=[]  # (char,start,end)
    for w in words:
        cs=[c for c in w['word'] if c not in PUN]
        n=max(1,len(cs)); a,b=w['startTime'],w['endTime']
        for i,c in enumerate(cs): wc.append((c.lower(),a+(b-a)*i/n,a+(b-a)*(i+1)/n))
    tc=[(i,c.lower()) for i,c in enumerate(text) if c not in PUN]
    sm=difflib.SequenceMatcher(None,[c for _,c in tc],[c for c,_,_ in wc],autojunk=False)
    T=[None]*len(text)
    for bl in sm.get_matching_blocks():
        for k in range(bl.size): i=tc[bl.a+k][0]; _,s,e=wc[bl.b+k]; T[i]=(s,e)
    # interpolate unmatched non-punct; punct = zero-length at prev end
    idx=[i for i in range(len(text)) if T[i]]
    if not idx: raise RuntimeError('align fail '+text)
    for i in range(len(text)):
        if T[i] is None and text[i] not in PUN:
            p=max([j for j in idx if j<i],default=None); q=min([j for j in idx if j>i],default=None)
            if p is None: T[i]=(T[q][0]-0.12,T[q][0])
            elif q is None: T[i]=(T[p][1],T[p][1]+0.12)
            else:
                f=(i-p)/(q-p); s=T[p][1]+(T[q][0]-T[p][1])*f; T[i]=(s,s+0.1)
    last=None; out=[]
    for i,c in enumerate(text):
        if T[i] is None: t=last if last is not None else T[idx[0]][0]; out.append([t,t])
        else: out.append(list(T[i])); last=T[i][1]
    unmatched=len(tc)-sum(b.size for b in sm.get_matching_blocks())
    return out,unmatched
def dur(f): return float(subprocess.check_output(['ffprobe','-v','error','-show_entries','format=duration','-of','csv=p=0',f]))
def captions(P,maxc=18):
    caps=[]
    for p in P:
        t=p['text']; ch=p['chars']
        # split to clauses after punctuation
        cl=[];cur=''
        for c in t:
            cur+=c
            if c in '，。？！；：': cl.append(cur);cur=''
        if cur.strip(): cl.append(cur)
        chunks=[];buf=''
        for c in cl:
            if buf and (len(buf+c)>maxc or buf[-1] in '。？！；'): chunks.append(buf);buf=c
            else: buf+=c
        if buf: chunks.append(buf)
        pos=0
        for c in chunks:
            i0=pos; i1=pos+len(c)-1; pos+=len(c)
            k=i0
            while k<=i1 and t[k] in PUN: k+=1
            caps.append({'text':c.strip(),'start':ch[min(k,i1)]['start'],'end':ch[i1]['end'],'lines':[c.strip()]})
    for k in range(len(caps)-1):
        caps[k]['end']=min(caps[k+1]['start'],max(caps[k]['end']+0.35,caps[k]['start']+1.0))
    caps[-1]['end']+=0.5
    return caps
def build(ep,wt,workdir,GAP=0.42,LEAD=0.35,TAIL=1.2):
    pdir=f'{wt}/projects/faceless-20261013/{ep:02d}-html'
    src=open(f'{pdir}/timeline.data.js').read()
    D=json.loads(re.sub(r'^window.TIMELINE=','',src.strip()).rstrip(';'))
    P=D['paragraphs']; texts={p['id']:p['text'] for p in P}
    nt=f'{pdir}/narration.text.json'
    if os.path.exists(nt): texts={int(k):v for k,v in json.load(open(nt)).items()}
    for e,pid,o,nw,t in F:
        if e!=ep: continue
        assert o in texts[pid],(ep,pid,o); texts[pid]=texts[pid].replace(o,nw or '')
    for k in texts: texts[k]=re.sub(r'^[，。\s]+','',texts[k])
    with ThreadPoolExecutor(4) as ex: res=list(ex.map(lambda p:synth(texts[p['id']]),P))
    os.makedirs(workdir,exist_ok=True); lst=open(f'{workdir}/concat.txt','w')
    t=LEAD; report=[]
    sil=f'{workdir}/sil.wav'; subprocess.run(['ffmpeg','-v','error','-y','-f','lavfi','-i','anullsrc=r=24000:cl=mono','-t',str(GAP),sil],check=True)
    lead=f'{workdir}/lead.wav'; subprocess.run(['ffmpeg','-v','error','-y','-f','lavfi','-i','anullsrc=r=24000:cl=mono','-t',str(LEAD),lead],check=True)
    lst.write(f"file '{lead}'\n")
    for i,(p,(mp3,words)) in enumerate(zip(P,res)):
        text=texts[p['id']]; ct,un=align(text,words)
        # 末字时间戳常比真实语音结束早 0.1–1.1s：结束点取“语音真正结束（静音检测）+0.15s”，不再按时间戳裁切
        a=max(0,words[0]['startTime']-0.08); se,D0=speech_end(mp3); b=min(D0,max(words[-1]['endTime']+0.18,se+0.15))
        seg=f'{workdir}/p{i:03d}.wav'
        subprocess.run(['ffmpeg','-v','error','-y','-i',mp3,'-ss',f'{a:.3f}','-to',f'{b:.3f}','-ar','24000','-ac','1',seg],check=True)
        L=dur(seg)
        p['text']=text; p['chars']=[{'c':c,'start':round(t+s-a,4),'end':round(t+e-a,4)} for c,(s,e) in zip(text,ct)]
        p['start']=p['chars'][0]['start']; p['end']=max(c['end'] for c in p['chars'])
        p['end']=max(p['end'],round(t+se-a,4)); p['speech_end']=p['end']; p['audio_len']=round(L,4)
        p.pop('provider_start',None)
        lst.write(f"file '{seg}'\n"); t+=L
        if i+1<len(P): lst.write(f"file '{sil}'\n"); t+=GAP
        if un: report.append((p['id'],un))
    tail=f'{workdir}/tail.wav'; subprocess.run(['ffmpeg','-v','error','-y','-f','lavfi','-i','anullsrc=r=24000:cl=mono','-t',str(TAIL),tail],check=True)
    lst.write(f"file '{tail}'\n"); lst.close()
    voice=f'{pdir}/media/narration.m4a'
    subprocess.run(['ffmpeg','-v','error','-y','-f','concat','-safe','0','-i',f'{workdir}/concat.txt','-c:a','aac','-b:a','128k','-ar','48000',voice],check=True)
    D['duration']=round(dur(voice),3); D['captions']=captions(P); D['speed']=1.0
    D.pop('speed_restored',None); D['voice']={'provider':'doubao seed-tts-2.0','speaker':'zh_male_taocheng_uranus_bigtts','speech_rate':0,'gap':GAP}
    open(f'{pdir}/timeline.data.js','w').write('window.TIMELINE='+json.dumps(D,ensure_ascii=False)+';\n')
    json.dump({str(k):v for k,v in texts.items()},open(f'{pdir}/narration.text.json','w'),ensure_ascii=False,indent=1)
    print(ep,'duration',D['duration'],'unaligned',report)
if __name__=='__main__':
    build(int(sys.argv[1]),sys.argv[2],sys.argv[3])
