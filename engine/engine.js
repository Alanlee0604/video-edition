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
  if('wipe' in v){s.clipPath=`inset(-20px ${(1-v.wipe)*100}% -20px -20px)`}
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
function Episode({timeline:D,scenes,episode,offset=0}){
  const A=Anchors(D),tl=new Timeline(),V=verbs(tl),stage=document.getElementById('stage');
  stage.insertAdjacentHTML('beforeend','<div id="anno"></div><div id="ep"></div><div id="sub"></div>');
  const anno=document.getElementById('anno'),sub=document.getElementById('sub');
  document.getElementById('ep').textContent=episode||'';
  const S=scenes.map((sc,i)=>{
    const el=document.createElement('section');el.className='scene';el.dataset.id=sc.id;
    el.innerHTML=`<div class="cam">${sc.html}</div>`;stage.insertBefore(el,anno);
    return {...sc,el,cam:el.firstChild};
  });
  // 场景时间：起点由旁白锚点给出，终点 = 下一场景起点
  S.forEach((sc,i)=>{sc.t0=sc.start(A);});
  S.forEach((sc,i)=>{sc.t1=i+1<S.length?S[i+1].t0:D.duration+1;
    const fadeIn=i===0?0:DUR.scene;
    tl.to(sc.el,{opacity:[0,1]},sc.t0-fadeIn*0.5,fadeIn||1e-3,'inout');
    if(i+1<S.length)tl.to(sc.el,{opacity:[1,0]},sc.t1-DUR.scene*0.5,DUR.scene,'inout');
    // 环境镜头：整场缓慢漂移（±8px，不放大以免越出安全区），保证没有死帧
    tl.to(sc.cam,{x:[-8,8],y:[5,-5]},sc.t0-0.3,sc.t1-sc.t0+0.6,'linear');
    // 场景内动作（作用域限定在本场景）
    const q=s=>s.split(',').map(x=>`section[data-id="${sc.id}"] ${x.trim()}`).join(',');
    const scoped={};for(const k in V)scoped[k]=(s,...r)=>V[k](typeof s==='string'?q(s):Array.isArray(s)?s.map(q):s,...r);
    scoped.to=(s,p,...r)=>tl.to(q(s),p,...r);
    scoped.seq=items=>V.seq(items.map(([s,t])=>[q(s),t]));
    sc.build({...scoped,A,t0:sc.t0,t1:sc.t1});
  });
  tl._index();
  function sceneAt(t){let cur=S[0];for(const s of S)if(t>=s.t0-DUR.scene*0.5)cur=s;return cur}
  function seek(t){
    t+=offset;tl.seek(t);
    const sc=sceneAt(t),lab=sc.label||LABEL_KINDS[sc.kind]||'';
    anno.textContent=lab;anno.style.opacity=lab?1:0;anno.dataset.kind=sc.kind||'';
    const c=D.captions.filter(c=>t>=c.start&&t<c.end).pop();
    const h=c?(c.lines||[c.text]).join('<br>'):'';if(sub.innerHTML!==h)sub.innerHTML=h;
    return {t,scene:sc.id,kind:sc.kind||'',label:lab};
  }
  window.EP={seek,scenes:S,duration:D.duration,A,needsLabel:k=>k in LABEL_KINDS};
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
  const a=document.getElementById('anno');
  out.label={kind:a.dataset.kind,text:a.textContent,visible:visible(a)&&a.textContent.length>0};
  return out;
}
window.ENGINE={G,SPAN,Timeline,Anchors,Episode,EASE,DUR,LABEL_KINDS,audit};
})();
