import os,sys,json,base64,requests
def tts(text,out):
    h={"X-Api-Key":os.environ["DOUBAO_TTS_TOKEN"],"X-Api-Resource-Id":"seed-tts-2.0","Content-Type":"application/json"}
    body={"user":{"uid":"tao"},"req_params":{"text":text,"speaker":"zh_male_taocheng_uranus_bigtts",
      "audio_params":{"format":"mp3","sample_rate":24000,"speech_rate":0,"enable_subtitle":True}}}
    r=requests.post("https://openspeech.bytedance.com/api/v3/tts/unidirectional",headers=h,json=body,stream=True,timeout=120)
    if r.status_code!=200: raise RuntimeError(f"HTTP {r.status_code} {r.headers.get('X-Tt-Logid')} {r.text[:500]}")
    audio=b"";subs=[];last=None
    for line in r.iter_lines():
        if not line: continue
        d=json.loads(line); last=d
        if d.get("code",0) not in (0,20000000): raise RuntimeError(json.dumps(d,ensure_ascii=False)[:500])
        if d.get("data"): audio+=base64.b64decode(d["data"])
        if d.get("sentence"): subs.append(d["sentence"])
    open(out,"wb").write(audio)
    return subs,last
if __name__=="__main__":
    s,l=tts(sys.argv[1],sys.argv[2]); print(json.dumps(s,ensure_ascii=False)[:1500]); print({k:v for k,v in l.items() if k!='data'})
