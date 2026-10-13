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
    in:(sel,at,{dy=16,dur=DUR.std}={})=>tl.to(sel,{opacity:[0,1],y:[dy,0]},at,dur,'out'),
    pop:(sel,at,dur=DUR.std)=>tl.to(sel,{opacity:[0,1],scale:[.86,1]},at,dur,'back'),
    stagger:(sels,at,gap=DUR.stagger,o={})=>sels.forEach((s,i)=>tl.to(s,{opacity:[0,1],y:[o.dy??16,0]},at+i*gap,o.dur||DUR.std,'out')),
    out:(sel,at,dur=DUR.exit)=>tl.to(sel,{opacity:[1,0]},at,dur,'in'),
    dim:(sel,at,to=.32)=>tl.to(sel,{opacity:[1,to]},at,DUR.std,'inout'),
    undim:(sel,at,from=.32)=>tl.to(sel,{opacity:[from,1]},at,DUR.std,'inout'),
    draw:(sel,at,dur=DUR.draw)=>tl.to(sel,{draw:[0,1]},at,dur,'inout'),
    wipe:(sel,at,dur=DUR.draw)=>tl.to(sel,{wipe:[0,1]},at,dur,'inout'),
    hl:(sel,at)=>tl.to(sel,{hl:[0,1]},at,DUR.micro*1.6,'out'),
    unhl:(sel,at)=>tl.to(sel,{hl:[1,0]},at,DUR.std,'inout'),
    move:(sel,at,from,to,dur=.8)=>tl.to(sel,{x:[from[0],to[0]],y:[from[1],to[1]]},at,dur,'inout'),
    seq:(items)=>items.forEach(([sel,at],k)=>{tl.to(sel,{opacity:[0,1],y:[14,0]},at,DUR.std,'out');if(k+1<items.length)tl.to(sel,{opacity:[1,0],y:[0,-10]},items[k+1][1]-DUR.exit,DUR.exit,'in')}),
    count:(sel,at,a,b,dur=1)=>tl.to(sel,{num:[a,b]},at,dur,'out'),
  };
}


/* ---------- 聚焦镜头 ---------- */
const CAMCFG={gap:2.6,maxS:1.32,minS:1.08,safeTop:150,safeBot:850,W:1920,H:1080};
const CAMLOG=[];
function camPlan(tl,sc,ev,q){
  const C=CAMCFG,cam=sc.cam;cam.style.transformOrigin='50% 50%';
  const st=document.getElementById('stage').getBoundingClientRect();
  const box=els=>{let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9,n=0;for(const e of els){const r=e.getBoundingClientRect();if(r.width<4||r.height<4)continue;n++;
      x0=Math.min(x0,r.left-st.left);y0=Math.min(y0,r.top-st.top);x1=Math.max(x1,r.right-st.left);y1=Math.max(y1,r.bottom-st.top)}
    return n?{x0,y0,x1,y1,w:x1-x0,h:y1-y0}:null};
  const HIDE={out:1,dim:1};
  const evs=ev.map(([t,sel,d,k])=>({t,k,els:[...sc.el.querySelectorAll(q(sel))]})).sort((a,b)=>a.t-b.t);
  const hiddenAfter=(e,t,until)=>evs.some(v=>v.t>t&&v.t<until&&HIDE[v.k]&&v.els.some(x=>x===e||x.contains(e)||e.contains(x)));
  // 计算一个取景：把 b 放到画面中心（略偏上，避开字幕），缩放不超过 maxS，且主体完整留在安全区内
  const frame=b=>{if(!b)return null;const safeH=C.safeBot-C.safeTop;
    let s=Math.min(C.maxS,(C.W*0.82)/b.w,(safeH*0.9)/b.h);if(s<C.minS)return null;
    const cx=(b.x0+b.x1)/2,cy=(b.y0+b.y1)/2,ty=(C.safeTop+C.safeBot)/2;
    let x=-(cx-C.W/2)*s,y=(ty-C.H/2)-(cy-C.H/2)*s;
    const mx=C.W/2*(s-1),my=C.H/2*(s-1);x=Math.max(-mx,Math.min(mx,x));y=Math.max(-my,Math.min(my,y));
    // 校验主体落在安全区
    const X=p=>C.W/2+(p-C.W/2)*s+x,Y=p=>C.H/2+(p-C.H/2)*s+y;
    if(X(b.x0)<20||X(b.x1)>C.W-20||Y(b.y0)<C.safeTop-40||Y(b.y1)>C.safeBot+10)return null;
    return {s:+s.toFixed(4),x:+x.toFixed(1),y:+y.toFixed(1)}};
  const pts=[...new Set([sc.t0,...evs.map(v=>v.t)].map(x=>+x.toFixed(2)))].filter(x=>x>=sc.t0-.01&&x<sc.t1).sort((a,b)=>a-b);pts.push(sc.t1);
  let cur={s:1,x:0,y:0};
  const go=(to,at,dur)=>{tl.to(cam,{scale:[cur.s,to.s],x:[cur.x,to.x],y:[cur.y,to.y]},at,dur,'inout');CAMLOG.push({scene:sc.id,at:+at.toFixed(2),dur,to});cur=to};
  for(let i=0;i+1<pts.length;i++){
    const a=pts[i],b=pts[i+1],g=b-a;if(g<=C.gap)continue;
    const last=i+1===pts.length-1;      // 间隙一直到场景结束：不必回全景
    // 候选焦点：此刻之前最近被提到、且之后仍可见的元素，按时间倒序
    const cands=evs.filter(v=>v.t<=a+.01&&!HIDE[v.k]).reverse().map(v=>({v,b:box(v.els.filter(e=>!hiddenAfter(e,v.t,b)))})).map(o=>({...o,f:frame(o.b)})).filter(o=>o.f);
    // 补充候选：场景里一开始就可见的主体（根节点的子元素），排除之后才出现的元素
    const later=evs.filter(v=>v.t>a+.01).flatMap(v=>v.els);
    const root=sc.el.querySelector('#m')||sc.el.querySelector('svg')||sc.cam;
    const statics=[...root.children].filter(e=>!later.some(x=>x===e||x.contains(e)||e.contains(x))&&!hiddenAfter(e,a,b)).map(e=>({b:box([e])})).filter(o=>o.b&&o.b.w*o.b.h>15000).sort((p,q)=>q.b.w*q.b.h-p.b.w*p.b.h).map(o=>({...o,f:frame(o.b)})).filter(o=>o.f);
    const seen=new Set();const pool=[...cands,...statics].filter(o=>{const k=Math.round(o.f.s*20)+','+Math.round(o.f.x/40)+','+Math.round(o.f.y/40);if(seen.has(k))return false;seen.add(k);return true});
    cands.length=0;cands.push(...pool);
    if(!cands.length)continue;
    const dIn=g<4?0.9:1.2,dOut=g<4?0.9:1.0,tIn=a+0.35,tOut=last?b:b-dOut-0.05;
    go(cands[0].f,tIn,dIn);
    let t=tIn+dIn,k=1;
    while(tOut-t>3.0){ // 长间隙：每 ≤3s 移到下一个重点（或在同一重点上再推近一点），仍是一次性单向移动
      let nx=cands[k]?cands[k].f:null;k++;
      if(!nx){if(cur.s+0.05<=C.maxS+0.03)nx={s:+(cur.s+0.05).toFixed(4),x:+(cur.x*(cur.s+0.05)/cur.s).toFixed(1),y:+(cur.y*(cur.s+0.05)/cur.s).toFixed(1)};else nx={s:1,x:0,y:0};}
      if(nx.s===1&&!last){break}
      const at=t+Math.min(2.2,(tOut-t-1.0)/2);go(nx,at,1.0);t=at+1.0}
    if(!last)go({s:1,x:0,y:0},tOut,dOut);
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
  const CAM=(sc,ev,q)=>camPlan(tl,sc,ev,q);
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
    const ev=[];const scoped={};for(const k in V)scoped[k]=(s,...r)=>{if(typeof s==='string'&&typeof r[0]==='number')ev.push([r[0],s,k==='draw'?DUR.draw:DUR.std,k]);return V[k](typeof s==='string'?q(s):Array.isArray(s)?s.map(q):s,...r)};
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
