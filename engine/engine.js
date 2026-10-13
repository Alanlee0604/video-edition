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

/* ---------- 场景运行时 ---------- */
const LABEL_KINDS={schematic:'示意图',teaching:'教学示例 · 非研究数据',record:'书中描述 · 方向示意，非原始数值'};
const G=c=>120+c*142, SPAN=n=>n*142-24; // 12 栏网格：第 c 栏左边缘 / 跨 n 栏宽度
function Episode({timeline:D,scenes,episode,offset=0,subs=null,subtitles=true}){
  const A=Anchors(D),tl=new Timeline(),V=verbs(tl),stage=document.getElementById('stage');
  stage.insertAdjacentHTML('beforeend','<div id="anno"></div><div id="ep"></div><div id="sub"></div>');
  const anno=document.getElementById('anno'),sub=document.getElementById('sub');
  document.getElementById('ep').textContent=episode||'';
  const ACT=[];
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
    // 无循环镜头：画面静止，只在场景内做一次单向轻微推近（1 → 1.015，≤2%），不往复
    tl.to(sc.cam,{scale:[1,1.015]},sc.t0,Math.max(.5,sc.t1-sc.t0),'linear');
    // 场景内动作（作用域限定在本场景）
    const q=s=>s.split(',').map(x=>`section[data-id="${sc.id}"] ${x.trim()}`).join(',');
    const ev=[];const scoped={};for(const k in V)scoped[k]=(s,...r)=>{if(typeof s==='string'&&typeof r[0]==='number')ev.push([r[0],s,k==='draw'?DUR.draw:DUR.std]);return V[k](typeof s==='string'?q(s):Array.isArray(s)?s.map(q):s,...r)};
    scoped.to=(s,p,...r)=>tl.to(q(s),p,...r);
    scoped.seq=items=>V.seq(items.map(([s,t])=>[q(s),t]));
    sc.build({...scoped,A,t0:sc.t0,t1:sc.t1});
    // 防静止：场景内两次动作间隔 >2.8s 时，在间隙里挑一个已可见的主体元素做一次轻微“呼吸”（1→1.06→1，单次；轮换不同元素，不循环同一个）
    {const root=sc.el.querySelector('#m')||sc.el.querySelector('svg');
     const evEl=ev.map(([t,sel])=>[t,[...sc.el.querySelectorAll(q(sel))]]);
     const hiddenAt=(e,at)=>evEl.some(([t,els])=>t>at-.05&&els.some(x=>x===e||x.contains(e)||e.contains(x)));
     const area=e=>{try{const b=e.getBBox();return Math.min(b.width,b.height)<60?0:b.width*b.height}catch(_){return 0}};
     const cand=root?[...root.children].filter(e=>!e.hasAttribute('transform')&&e.tagName!=='text').map(e=>[e,area(e)]).filter(x=>x[1]>2500).sort((a,b)=>b[1]-a[1]).map(x=>x[0]).slice(0,6):[];
     const pts=[...new Set([sc.t0,...ev.map(e=>e[0])].map(x=>+x.toFixed(2)))].filter(x=>x>=sc.t0-.01&&x<sc.t1).sort((a,b)=>a-b).concat([sc.t1]);let used=0;
     for(let i=0;i+1<pts.length;i++){const g=pts[i+1]-pts[i];if(g<=2.6)continue;const n=Math.ceil(g/2.4)-1;
       for(let j=1;j<=n;j++){const at=pts[i]+g*j/(n+1);const ok=cand.filter(e=>!hiddenAt(e,at));const e=ok.length?ok[(used++)%ok.length]:root;if(!e)continue;const k=e===root?1.02:1.06;
         tl.to(e,{scale:[1,k]},at,.4,'out');tl.to(e,{scale:[k,1]},at+.4,.4,'inout');ACT.push(at);}}
     ev.forEach(e=>ACT.push(e[0]));}
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
    const c=SUBS?SUBS.filter(c=>t>=c.start&&t<c.end).pop():D.captions.filter(c=>t>=c.start&&t<c.end).pop();
    const h=(subtitles&&c)?(c.lines||[c.text]).join('<br>'):'';if(sub.innerHTML!==h)sub.innerHTML=h;
    return {t,scene:sc.id,kind:sc.kind||'',label:lab};
  }
  window.EP={subtitles,captions:SUBS||D.captions,subs:SUBS,tl,seek,scenes:S,actions:ACT,duration:D.duration,A,needsLabel:k=>k in LABEL_KINDS};
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
