/* 统一引擎：确定性时间线 + 旁白锚点 + 场景/标注/字幕 + 检查钩子
   所有画面状态都是 t 的纯函数：window.seek(t)。渲染器逐帧调用。 */
(function(){
'use strict';
const clamp=x=>x<0?0:x>1?1:x;
const EASE={
  linear:x=>x,
  out:x=>1-Math.pow(1-x,3),            // 入场
  in:x=>x*x*x,                          // 出场
  inout:x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2, // 位移/相机/画线
  back:x=>{const c1=1.2,c3=c1+1;return 1+c3*Math.pow(x-1,3)+c1*Math.pow(x-1,2)} // 只用于数字/强调落定
};
const DUR={micro:.25,std:.5,draw:1.2,longdraw:1.6,scene:.6,stagger:.1,exit:.25};

/* ---------- 旁白锚点：动作时间绑在旁白的词上 ---------- */
function Anchors(D){
  const P=D.paragraphs;
  const para=i=>{const p=P[i];if(!p)throw Error('无此段落 '+i);return p};
  const word=(i,w,occ=0)=>{const p=para(i),s=p.chars.map(c=>c.c).join('');let k=-1;
    do{k=s.indexOf(w,k+1)}while(occ-->0&&k>=0);
    if(k<0)throw Error(`段落 ${i} 中找不到“${w}”：${p.text}`);
    return {start:p.chars[k].start,end:p.chars[Math.min(k+w.length-1,p.chars.length-1)].end}};
  return {
    P:i=>para(i).start, E:i=>para(i).end,
    W:(i,w,occ)=>word(i,w,occ).start,           // 词开始
    WE:(i,w,occ)=>word(i,w,occ).end,            // 词结束
  };
}

/* ---------- 时间线 ---------- */
class Timeline{
  constructor(){this.tw=[];this.byKey=null}
  to(target,props,at,dur=DUR.std,ease='out'){
    const els=typeof target==='string'?[...document.querySelectorAll(target)]:[].concat(target);
    if(!els.length)throw Error('时间线目标不存在：'+target);
    if(!isFinite(at))throw Error('时间无效：'+target);
    els.forEach(el=>{for(const k in props){const [a,b]=props[k];this.tw.push({el,k,a,b,at,dur:Math.max(dur,1e-3),ease:EASE[ease]||EASE.out})}});
    this.byKey=null;return this;
  }
  _index(){const m=new Map();for(const t of this.tw){let pm=m.get(t.el);if(!pm)m.set(t.el,pm={});(pm[t.k]=pm[t.k]||[]).push(t)}
    for(const pm of m.values())for(const k in pm)pm[k].sort((x,y)=>x.at-y.at);this.byKey=m}
  seek(t){
    if(!this.byKey)this._index();
    for(const [el,pm] of this.byKey){
      const v={};
      for(const k in pm){const L=pm[k];let cur=L[0].a;
        for(const w of L){if(t<w.at)break;cur=w.a+(w.b-w.a)*w.ease(clamp((t-w.at)/w.dur))}
        v[k]=cur}
      apply(el,v);
    }
  }
}
function apply(el,v){
  const s=el.style;
  if('opacity' in v){s.opacity=v.opacity;s.visibility=v.opacity<=0.001?'hidden':'visible'}
  if('x' in v||'y' in v||'scale' in v||'rot' in v||'sy' in v){
    const x=v.x||0,y=v.y||0,sc='scale' in v?v.scale:1,r=v.rot||0,sy='sy' in v?v.sy:1;
    el.dataset.scale=sc;
    s.transform=`translate(${x}px,${y}px) scale(${sc},${sc*sy}) rotate(${r}deg)`;
    if(el instanceof SVGElement){s.transformBox='fill-box';s.transformOrigin=el.dataset.origin||'center'}
  }
  if('draw' in v){el.setAttribute('pathLength','1');s.strokeDasharray='1 1';s.strokeDashoffset=String(1-v.draw)}
  if('wipe' in v){s.clipPath=v.wipe>=1?'none':`inset(-20px ${(1-v.wipe)*100}% -20px -20px)`}
  if('hl' in v){s.setProperty('--hl',v.hl)}
  if('num' in v){const d=+(el.dataset.dp||0);el.textContent=(el.dataset.pre||'')+v.num.toFixed(d)+(el.dataset.suf||'')}
}

/* ---------- 常用动作（统一入场/出场规则） ---------- */
function verbs(tl){
  return {
    in:(sel,at,{dy=16,dur=DUR.std,word}={})=>tl.to(sel,{opacity:[0,1],y:[dy,0]},at,dur,'out'),
    pop:(sel,at,dur=DUR.std)=>{if(dur&&typeof dur==='object')dur=dur.dur||DUR.std;return tl.to(sel,{opacity:[0,1],scale:[.86,1]},at,dur,'back')},
    stagger:(sels,at,gap=DUR.stagger,o={})=>sels.forEach((s,i)=>tl.to(s,{opacity:[0,1],y:[o.dy??16,0]},at+i*gap,o.dur||DUR.std,'out')),
    out:(sel,at,dur=DUR.exit)=>tl.to(sel,{opacity:[1,0]},at,dur,'in'),
    dim:(sel,at,to=.32)=>tl.to(sel,{opacity:[1,to]},at,DUR.std,'inout'),
    undim:(sel,at,from=.32)=>tl.to(sel,{opacity:[from,1]},at,DUR.std,'inout'),
    draw:(sel,at,dur=DUR.draw)=>{if(dur&&typeof dur==='object')dur=dur.dur||DUR.draw;return tl.to(sel,{draw:[0,1]},at,dur,'inout')},
    wipe:(sel,at,dur=DUR.draw)=>tl.to(sel,{wipe:[0,1]},at,dur,'inout'),
    hl:(sel,at)=>tl.to(sel,{hl:[0,1]},at,DUR.micro*1.6,'out'),
    unhl:(sel,at)=>tl.to(sel,{hl:[1,0]},at,DUR.std,'inout'),
    move:(sel,at,from,to,dur=.8)=>tl.to(sel,{x:[from[0],to[0]],y:[from[1],to[1]]},at,dur,'inout'),
    seq:(items)=>items.forEach(([sel,at],k)=>{tl.to(sel,{opacity:[0,1],y:[14,0]},at,DUR.std,'out');if(k+1<items.length)tl.to(sel,{opacity:[1,0],y:[0,-10]},items[k+1][1]-DUR.exit,DUR.exit,'in')}),
    count:(sel,at,a,b,dur=1)=>tl.to(sel,{num:[a,b]},at,dur,'out'),
  };
}


/* ---------- 聚焦镜头 ---------- */
const CAMCFG={maxS:1.26,minS:1.08,safeTop:160,safeBot:860,W:1920,H:1080,pad:100,nb:260};
const CAMLOG=[];
function camPlan(tl,sc,ev,q,D,A){
  const C=CAMCFG,cam=sc.cam;cam.style.transformOrigin='50% 50%';
  const st=()=>document.getElementById('stage').getBoundingClientRect();
  const rect=e=>{const r=e.getBoundingClientRect(),S=st();return {x0:r.left-S.left,y0:r.top-S.top,x1:r.right-S.left,y1:r.bottom-S.top,w:r.width,h:r.height}};
  const box=els=>{let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9,n=0;for(const e of els){if(!e||!e.isConnected)continue;const r=rect(e);if(r.w<6||r.h<6)continue;n++;x0=Math.min(x0,r.x0);y0=Math.min(y0,r.y0);x1=Math.max(x1,r.x1);y1=Math.max(y1,r.y1)}
    return n?{x0,y0,x1,y1,w:x1-x0,h:y1-y0}:null};
  const HIDE={out:1,dim:1};
  const resolveOne=(sel)=>{
    const raw=(sel||'').trim(); if(!raw)return [];
    if(raw.includes(','))return raw.split(',').flatMap(resolveOne);
    const m=raw.match(/^#n(\d+)$/);
    if(m){const card=sc.el.querySelector(q('#c'+m[1]));
      if(card){const cr=rect(card); const kids=[...sc.el.querySelectorAll('[id]')].filter(e=>{
        if(e.id==='n'+m[1]||e.id==='c'+m[1]||e.id==='m'||e.id==='gnd')return false;
        const r=rect(e); if(r.w<24||r.h<24||r.w*r.h>250000)return false;
        const ecx=(r.x0+r.x1)/2; return ecx>=cr.x0-20&&ecx<=cr.x1+20&&r.y0<cr.y1+80&&r.y1>cr.y0-80;
      }).sort((a,b)=>rect(b).w*rect(b).h-rect(a).w*rect(a).h);
        if(kids.length)return [kids[0]];
        return [card];}}
    return [...sc.el.querySelectorAll(q(raw))].filter(e=>e.id!=='m'&&e.id!=='gnd');
  };
  const expand=(b,focusEl)=>{
    if(!b)return null;
    const cx=(b.x0+b.x1)/2,cy=(b.y0+b.y1)/2;
    let x0=b.x0,y0=b.y0,x1=b.x1,y1=b.y1;
    // 焦点所在卡片：只在同卡内扩，避免吃进隔壁卡
    const homeCard=(focusEl&&focusEl.closest)?[...sc.el.querySelectorAll('[id^=c]')].find(c=>/^c\d+$/.test(c.id)&&c.contains(focusEl)|| (rect(c).x0-20<=b.x0&&rect(c).x1+20>=b.x1&&rect(c).y0-20<=b.y0&&rect(c).y1+20>=b.y1)):null;
    for(const e of sc.el.querySelectorAll('[id]')){
      if(e.id==='m'||e.id==='gnd'||e===focusEl)continue;
      if(/^c\d+$/.test(e.id)&&homeCard&&e!==homeCard)continue; // 不把隔壁整卡扩进来
      if(/^n\d+$/.test(e.id)&&homeCard&&!homeCard.contains(e)&&e!==homeCard) {/* allow same-card number */}
      const r=rect(e); const area=r.w*r.h;
      if(area<2000||area>380000)continue;
      if(homeCard){ const cr=rect(homeCard); if(!(r.x0>=cr.x0-40&&r.x1<=cr.x1+40&&r.y0>=cr.y0-60&&r.y1<=cr.y1+60)) continue; }
      else {
        const ecx=(r.x0+r.x1)/2,ecy=(r.y0+r.y1)/2;
        if(Math.hypot(ecx-cx,ecy-cy)>C.nb+(b.w+b.h)/5)continue;
        if(/^c\d+$/.test(e.id))continue; // 无主卡时也不要整卡
      }
      x0=Math.min(x0,Math.max(r.x0,b.x0-140)); y0=Math.min(y0,Math.max(r.y0,b.y0-100));
      x1=Math.max(x1,Math.min(r.x1,b.x1+140)); y1=Math.max(y1,Math.min(r.y1,b.y1+100));
    }
    // 收银机/喇叭等小号邻接：无主卡时用更大邻域，但单侧扩幅封顶
    if(!homeCard){
      for(const e of sc.el.querySelectorAll('[id]')){
        if(e.id==='m'||e.id==='gnd')continue; const r=rect(e); const area=r.w*r.h;
        if(area<1500||area>120000)continue;
        const ecx=(r.x0+r.x1)/2,ecy=(r.y0+r.y1)/2;
        if(Math.hypot(ecx-cx,ecy-cy)>280)continue;
        x0=Math.min(x0,Math.max(r.x0,b.x0-160)); y0=Math.min(y0,Math.max(r.y0,b.y0-120));
        x1=Math.max(x1,Math.min(r.x1,b.x1+160)); y1=Math.max(y1,Math.min(r.y1,b.y1+120));
      }
    }
    x0-=C.pad*0.35; y0-=C.pad*0.35; x1+=C.pad*0.35; y1+=C.pad*0.35;
    return {x0,y0,x1,y1,w:x1-x0,h:y1-y0};
  };
  const frame=(b,id)=>{
    if(!b)return null; const safeH=C.safeBot-C.safeTop;
    let s=Math.min(C.maxS,(C.W*0.72)/Math.max(b.w,1),(safeH*0.85)/Math.max(b.h,1));
    if(s<C.minS)s=C.minS;
    const cx=(b.x0+b.x1)/2,cy=(b.y0+b.y1)/2,ty=(C.safeTop+C.safeBot)/2;
    let x=-(cx-C.W/2)*s,y=(ty-C.H/2)-(cy-C.H/2)*s;
    const clamp=()=>{const mx=C.W/2*(s-1),my=C.H/2*(s-1);x=Math.max(-mx,Math.min(mx,x));y=Math.max(-my,Math.min(my,y))};
    clamp();
    const X=p=>C.W/2+(p-C.W/2)*s+x,Y=p=>C.H/2+(p-C.H/2)*s+y;
    for(let k=0;k<8;k++){
      if(X(b.x0)>=48&&X(b.x1)<=C.W-48&&Y(b.y0)>=C.safeTop&&Y(b.y1)<=C.safeBot+8)break;
      s=Math.max(C.minS,s-0.035); x=-(cx-C.W/2)*s; y=(ty-C.H/2)-(cy-C.H/2)*s; clamp();
    }
    if(X(b.x0)<8||X(b.x1)>C.W-8)return null;
    return {s:+s.toFixed(4),x:+x.toFixed(1),y:+y.toFixed(1),id:id||''};
  };
  // 可选焦点表：与页面同目录的 focus-map.json（绘图组提供）优先；格式 [{para,word,ids:[...]}]
  const FOCUS_MAP=(typeof window!=='undefined'&&window.FOCUS_MAP)||null;
  const mapHits=[];
  if(FOCUS_MAP&&Array.isArray(FOCUS_MAP)){
    for(const row of FOCUS_MAP){
      try{
        const t=row.word?A.W(row.para,row.word):A.P(row.para);
        if(t<sc.t0-0.2||t>sc.t1+0.2)continue; // 只收本场景时间窗内的表项
        const nodes=(row.ids||[]).flatMap(id=>[...sc.el.querySelectorAll(q(id.startsWith('#')?id:'#'+id))]).filter(Boolean);
        if(!nodes.length)continue;
        const primary=nodes[0];
        const b0=box(nodes)||box([primary]); if(!b0)continue;
        // 表里给了邻接就用并集+小边距；单元素则智能扩（同卡内）
        const b=nodes.length>1?{x0:b0.x0-24,y0:b0.y0-24,x1:b0.x1+24,y1:b0.y1+24,w:b0.w+48,h:b0.h+48}:expand(b0,primary);
        const f=frame(b,primary.id);
        if(f) mapHits.push({t,id:primary.id,f,word:row.word||'',src:'map'});
      }catch(err){/* 词找不到就跳过 */}
    }
  }
  // 从旁白动作生成“讲到谁就跟谁”的焦点轨
  const track=[];
  for(const [t,sel,d,k,word] of ev){
    if(HIDE[k])continue;
    const nodes=resolveOne(typeof sel==='string'?sel:'');
    if(!nodes.length)continue;
    // 多选时：旁白词命中优先，否则取中等面积的单个
    let best=nodes[0],bestSc=-1e9;
    const txt=(word||'')+((D.paragraphs.find(p=>p.start<=t&&p.end>=t)||{}).text||'');
    for(const e of nodes){
      const r=rect(e),area=r.w*r.h; let sc=0;
      if(area>8000&&area<200000)sc+=5; else if(area>=200000)sc-=4; else if(area<2500)sc-=3;
      if(word&&txt.includes(word))sc+=6;
      if(/^n\d+$/.test(e.id))sc-=5;
      if(sc>bestSc){bestSc=sc;best=e}
    }
    const b0=box([best]); if(!b0)continue;
    const f=frame(expand(Object.assign(b0,{id:best.id}),best),best.id); if(!f)continue;
    // 同一焦点 0.6s 内不重复
    if(t<sc.t0-0.2||t>sc.t1+0.2)continue;
    if(track.length&&track[track.length-1].id===best.id&&t-track[track.length-1].t<0.6)continue;
    track.push({t,id:best.id,f,word:word||''});
  }
  // 焦点表优先：同约 0.5s 内的自动焦点让位给表
  for(const h of mapHits){
    const clash=track.find(x=>Math.abs(x.t-h.t)<0.5);
    if(clash){Object.assign(clash,h)} else track.push(h);
  }
  track.sort((a,b)=>a.t-b.t);
  let cur={s:1,x:0,y:0,id:''};
  const go=(to,at,dur)=>{if(Math.abs(to.s-cur.s)<0.01&&Math.abs(to.x-cur.x)<2&&Math.abs(to.y-cur.y)<2){cur=to;return}
    const d=Math.max(0.8,Math.min(1.4,dur));
    tl.to(cam,{scale:[cur.s,to.s],x:[cur.x,to.x],y:[cur.y,to.y]},at,d,'inout');
    CAMLOG.push({scene:sc.id,at:+at.toFixed(2),dur:d,to,id:to.id||''}); cur=to};
  // 按焦点轨推进：讲到就推过去；焦点之间直接过渡，不回全景；末尾或长空档才回全景
  for(let i=0;i<track.length;i++){
    const curF=track[i], next=track[i+1], tIn=curF.t+0.12;
    if(tIn>=sc.t1-0.3)break;
    const holdEnd=next?next.t:sc.t1;
    if(holdEnd-tIn<0.85)continue; // 太短来不及看清，跳过
    go(curF.f,tIn, holdEnd-tIn<2.2?0.85:1.15);
    // 停留期间每 ≤2.5s 单向轻推一点（或轻移），避免 freezedetect；到 maxS 后改为轻微平移
    let t=tIn+1.2; const limit=holdEnd-(next?1.0:1.2); let bumps=0;
    while(t+2.8<limit && bumps<3){
      let nx;
      if(cur.s+0.03<=C.maxS+1e-6){
        const bump=+(Math.min(C.maxS,cur.s+0.03)).toFixed(4);
        nx={s:bump,x:+(cur.x*bump/Math.max(cur.s,1)).toFixed(1),y:+(cur.y*bump/Math.max(cur.s,1)).toFixed(1),id:cur.id};
      } else {
        const dx=cur.x<=0?10:-10; nx={s:cur.s,x:+(cur.x+dx).toFixed(1),y:cur.y,id:cur.id};
      }
      go(nx,t+1.5,0.9); t+=2.8; bumps++;
    }
    // 无下一个焦点且离场景结束还远：回全景
    if(!next){
      const remain=sc.t1-tIn;
      if(remain>3.2) go({s:1,x:0,y:0,id:''}, Math.min(sc.t1-1.1, tIn+Math.max(2.0,remain*0.55)), 1.0);
    } else if(next.t-curF.t>4.5 && next.t-1.2>tIn+2.0){
      // 焦点之间空档很长：先回全景再接下一个（接下一个时 go 会再推近）
      go({s:1,x:0,y:0,id:''}, next.t-1.15, 0.95);
    }
  }
  // 本场景镜头补丁：任意 >2.9s 无变换的空隙，做一次单向轻挪，压 freezedetect
  {const camTw=tl.tw.filter(w=>w.el===cam).sort((a,b)=>a.at-b.at);
    const edges=[sc.t0,...camTw.map(w=>w.at+w.dur),sc.t1].sort((a,b)=>a-b);
    for(let i=0;i+1<edges.length;i++){const a=edges[i],b=edges[i+1]; if(b-a<=2.9)continue;
      const at=a+(b-a)*0.45; if(at<sc.t0+0.3||at>sc.t1-0.8)continue;
      const bump=Math.min(C.maxS, Math.max(C.minS, cur.s>1?cur.s:1.1)+0.04);
      go({s:+bump.toFixed(4),x:cur.x||0,y:cur.y||0,id:cur.id||''},at,0.9);}
  }
  // 场景开头若超过 2.8s 还没有任何焦点，推到场景中最大的稳定主体，避免片头静止
  if((!track.length||track[0].t>sc.t0+2.8)){
    const root=sc.el.querySelector('#m')||sc.cam;
    const big=[...root.querySelectorAll(':scope > [id], :scope > g > [id]')].map(e=>({e,a:(()=>{try{const r=rect(e);return r.w*r.h}catch(_){return 0}})()})).filter(x=>x.a>20000&&x.a<450000).sort((a,b)=>b.a-a.a)[0];
    if(big){const b0=box([big.e]); const f=frame(expand(b0,big.e),big.e.id); if(f) go(f,sc.t0+0.45,1.1);}
  }
}

/* ---------- 场景运行时 ---------- */
const LABEL_KINDS={schematic:'示意图',teaching:'教学示例 · 非研究数据',record:'书中描述 · 方向示意，非原始数值'};
const G=c=>120+c*142, SPAN=n=>n*142-24; // 12 栏网格：第 c 栏左边缘 / 跨 n 栏宽度
function Episode({timeline:D,scenes,episode,offset=0,subs=null,subtitles=true}){
  const A=Anchors(D),tl=new Timeline(),V=verbs(tl),stage=document.getElementById('stage');
  stage.insertAdjacentHTML('beforeend','<div id="anno"></div><div id="ep"></div><div id="sub"></div>');
  const anno=document.getElementById('anno'),sub=document.getElementById('sub');
  document.getElementById('ep').textContent=episode||'';
  const ACT=[];
  const CAM=(sc,ev,q)=>camPlan(tl,sc,ev,q,D,A);
  const S=scenes.map((sc,i)=>{
    const el=document.createElement('section');el.className='scene'+(sc.theme?' theme-'+sc.theme:'');el.dataset.id=sc.id;
    el.innerHTML=`<div class="cam">${sc.html}</div>`;stage.insertBefore(el,anno);
    return {...sc,el,cam:el.firstChild};
  });
  // 场景时间：起点由旁白锚点给出，终点 = 下一场景起点
  S.forEach((sc,i)=>{sc.t0=sc.start(A);});
  S.forEach((sc,i)=>{sc.t1=i+1<S.length?S[i+1].t0:D.duration+1;
    // 转场：色块擦除（shape wipe）——新场景从左向右整块盖过旧场景；旧场景在被盖满后才隐藏
    tl.to(sc.el,{opacity:[0,1]},sc.t0-DUR.scene*0.5,1e-3,'linear');
    if(i>0)tl.to(sc.el,{wipe:[0,1]},sc.t0-DUR.scene*0.5,DUR.scene,'inout');
    if(i+1<S.length)tl.to(sc.el,{opacity:[1,0]},sc.t1+DUR.scene*0.5+0.02,1e-3,'linear');
    // 镜头完全静止：不推近、不漂移、不往复
    // 场景内动作（作用域限定在本场景）
    const q=s=>s.split(',').map(x=>`section[data-id="${sc.id}"] ${x.trim()}`).join(',');
    const ev=[];const scoped={};for(const k in V)scoped[k]=(s,...r)=>{if(typeof s==='string'&&typeof r[0]==='number'){let word='';const last=r[r.length-1]; if(last&&typeof last==='object'&&!Array.isArray(last)&&last.word)word=last.word; ev.push([r[0],s,k==='draw'?DUR.draw:DUR.std,k,word]);};return V[k](typeof s==='string'?q(s):Array.isArray(s)?s.map(q):s,...r)};
    scoped.to=(s,p,...r)=>tl.to(q(s),p,...r);
    scoped.seq=items=>V.seq(items.map(([s,t])=>[q(s),t]));
    sc.build({...scoped,A,t0:sc.t0,t1:sc.t1});
    // 不做任何呼吸/脉冲/循环动效；只记录真实动作时间
    {ev.forEach(e=>ACT.push(e[0]));
     // 聚焦镜头：动作间隔 >2.6s 时，平滑推近/平移到刚被旁白提到的元素（一次性、单向、inout 缓动），下一动作前平滑回全景；不循环、不呼吸
     CAM(sc,ev,q);}
  });
  // 精简字幕：[段落, 锚点词('' = 段落开头), 文本]；显示到下一条开始，最长到本段结束后 0.6 秒
  let SUBS=null;
  if(subs){SUBS=subs.map(([p,w,text])=>({p,text,start:w?A.W(p,w):A.P(p)}));SUBS.sort((a,b)=>a.start-b.start);
    SUBS.forEach((s,k)=>{const nx=k+1<SUBS.length?SUBS[k+1].start:D.duration;s.end=Math.min(nx,Math.max(A.E(s.p)+0.6,s.start+1.2))});}
  tl._index();
  function sceneAt(t){let cur=S[0];for(const s of S)if(t>=s.t0-DUR.scene*0.5)cur=s;return cur}
  function seek(t){
    t+=offset;tl.seek(t);
    const sc=sceneAt(t),lab=sc.label||LABEL_KINDS[sc.kind]||'';
    anno.textContent=lab;anno.style.opacity=lab?1:0;anno.dataset.kind=sc.kind||'';
    stage.dataset.theme=sc.theme||'';
    if(!sc._bg)sc._bg=getComputedStyle(sc.el).backgroundColor;if(stage._bg!==sc._bg){stage.style.setProperty('--scbg',sc._bg);stage._bg=sc._bg}
    const c=SUBS?SUBS.filter(c=>t>=c.start&&t<c.end).pop():D.captions.filter(c=>t>=c.start&&t<c.end).pop();
    const h=(subtitles&&c)?'<span class="sb">'+(c.lines||[c.text]).join('<br>')+'</span>':'';if(sub.innerHTML!==h)sub.innerHTML=h;
    return {t,scene:sc.id,kind:sc.kind||'',label:lab};
  }
  window.EP={camlog:CAMLOG,subtitles,captions:SUBS||D.captions,subs:SUBS,tl,seek,scenes:S,actions:ACT,duration:D.duration,A,needsLabel:k=>k in LABEL_KINDS};
  window.seek=seek;
  return window.EP;
}

/* ---------- 自动检查（在浏览器内执行） ---------- */
function audit(){
  const out={small:[],unsafe:[],label:null};
  const st=document.getElementById('stage').getBoundingClientRect();
  const visible=el=>{for(let e=el;e&&e.id!=='stage';e=e.parentElement){const cs=getComputedStyle(e);if(cs.visibility==='hidden'||cs.display==='none'||+cs.opacity<0.05)return false}return true};
  const SAFE={l:96,t:96,r:1824,b:984};
  // 字号：所有直接含文字的可见元素
  const all=[...document.querySelectorAll('#stage *')].filter(e=>[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()));
  for(const e of all){if(!visible(e))continue;
    let fs=parseFloat(getComputedStyle(e).fontSize);
    // 计入祖先 transform 缩放（镜头推近只会放大）
    let sc=1;for(let a=e;a&&a.id!=='stage';a=a.parentElement)if(a.dataset&&a.dataset.scale)sc*=+a.dataset.scale;
    if(fs*sc<27.5)out.small.push({text:e.textContent.trim().slice(0,20),px:+(fs*sc).toFixed(1)});
    const r=e.getBoundingClientRect();
    if(r.width&&(r.left-st.left<SAFE.l-0.5||r.top-st.top<SAFE.t-0.5||r.right-st.left>SAFE.r+0.5||r.bottom-st.top>SAFE.b+0.5))out.unsafe.push({text:e.textContent.trim().slice(0,20),rect:[r.left,r.top,r.right,r.bottom].map(Math.round)});
  }
  for(const e of document.querySelectorAll('#stage svg.layer *:not(g):not(defs):not(text):not(tspan)')){if(!visible(e)||e.dataset.bleed!=null)continue;
    const r=e.getBoundingClientRect();if(!r.width&&!r.height)continue;
    if(r.left-st.left<SAFE.l-0.5||r.top-st.top<SAFE.t-0.5||r.right-st.left>SAFE.r+0.5||r.bottom-st.top>SAFE.b+0.5)out.unsafe.push({shape:e.tagName+(e.id?'#'+e.id:''),rect:[r.left,r.top,r.right,r.bottom].map(Math.round)});
  }
  // 画面主体文字（不含字幕/标注/集名）与主体外接框
  const cur=[...document.querySelectorAll('#stage section.scene')].filter(e=>getComputedStyle(e).visibility!=='hidden').pop();
  out.body=[];out.box=null;
  if(cur){const bx=[1e9,1e9,-1e9,-1e9];
    for(const e of cur.querySelectorAll('*')){if(!visible(e))continue;
      if([...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()))out.body.push(e.textContent.trim());
      if(e.tagName==='g'||e.tagName==='svg'||e.classList.contains('cam'))continue;
      const r=e.getBoundingClientRect();if(!r.width||!r.height)continue;
      bx[0]=Math.min(bx[0],r.left-st.left);bx[1]=Math.min(bx[1],r.top-st.top);bx[2]=Math.max(bx[2],r.right-st.left);bx[3]=Math.max(bx[3],r.bottom-st.top);}
    if(bx[2]>bx[0])out.box=bx.map(Math.round);}
  const a=document.getElementById('anno');
  out.label={kind:a.dataset.kind,text:a.textContent,visible:visible(a)&&a.textContent.length>0};
  return out;
}
window.ENGINE={G,SPAN,Timeline,Anchors,Episode,EASE,DUR,LABEL_KINDS,audit};
})();
