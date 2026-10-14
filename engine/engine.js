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
const CAMCFG={maxS:1.26,minS:1.08,safeTop:160,safeBot:860,W:1920,H:1080,pad:110,nb:240};
const CAMLOG=[];
function camPlan(tl,sc,ev,q,D,A){
  return; // 镜头已取消：全程静止，无任何相机变换
  const C=CAMCFG,cam=sc.cam;cam.style.transformOrigin='50% 50%';
  const st=()=>document.getElementById('stage').getBoundingClientRect();
  const rect=e=>{const r=e.getBoundingClientRect(),S=st();return {x0:r.left-S.left,y0:r.top-S.top,x1:r.right-S.left,y1:r.bottom-S.top,w:r.width,h:r.height}};
  const box=els=>{let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9,n=0;for(const e of els){if(!e||!e.isConnected)continue;let r=rect(e);
      // 细描边 path（如 act0 横线）外接框过扁：以中心扩到至少 56×56，避免被跳过
      if(r.w<4&&r.h<4){try{const bb=e.getBBox?e.getBBox():null;if(bb&&(bb.width>=2||bb.height>=2)){const S=st(),gr=e.ownerSVGElement.getBoundingClientRect(),sx=gr.width/(e.ownerSVGElement.viewBox.baseVal.width||1920),sy=gr.height/(e.ownerSVGElement.viewBox.baseVal.height||1080);const m=e.getScreenCTM();const pt=(x,y)=>{const p=e.ownerSVGElement.createSVGPoint();p.x=x;p.y=y;const q=p.matrixTransform(m);return{x:q.x-S.left,y:q.y-S.top}};const p0=pt(bb.x,bb.y),p1=pt(bb.x+bb.width,bb.y+bb.height);r={x0:Math.min(p0.x,p1.x),y0:Math.min(p0.y,p1.y),x1:Math.max(p0.x,p1.x),y1:Math.max(p0.y,p1.y),w:0,h:0};r.w=r.x1-r.x0;r.h=r.y1-r.y0;}}catch(_){}}
      if(r.w<8||r.h<8){const cx=(r.x0+r.x1)/2,cy=(r.y0+r.y1)/2,hw=Math.max(28,r.w/2),hh=Math.max(28,r.h/2);r={x0:cx-hw,y0:cy-hh,x1:cx+hw,y1:cy+hh,w:hw*2,h:hh*2};}
      if(r.w<4||r.h<4)continue;n++;x0=Math.min(x0,r.x0);y0=Math.min(y0,r.y0);x1=Math.max(x1,r.x1);y1=Math.max(y1,r.y1)}
    return n?{x0,y0,x1,y1,w:x1-x0,h:y1-y0}:null};
  // 邻接扩边：同卡内优先；无卡时扩近距小号物件（收银机/喇叭），不吞隔壁整卡
  const expand=(b,focusEl)=>{
    if(!b)return null;
    const cx=(b.x0+b.x1)/2,cy=(b.y0+b.y1)/2;
    let x0=b.x0,y0=b.y0,x1=b.x1,y1=b.y1;
    const isCard=id=>/^(c|col|tb)\d+$/.test(id);
    const homeCard=[...sc.el.querySelectorAll('[id]')].find(c=>isCard(c.id)&&(c.contains(focusEl)|| (()=>{const cr=rect(c);return cr.x0-16<=b.x0&&cr.x1+16>=b.x1&&cr.y0-16<=b.y0&&cr.y1+16>=b.y1})()));
    for(const e of sc.el.querySelectorAll('[id]')){
      if(!e||e===focusEl||e.id==='m'||e.id==='gnd')continue;
      if(isCard(e.id)&&homeCard&&e!==homeCard)continue;
      const r=rect(e),area=r.w*r.h; if(area<1200||area>380000)continue;
      if(homeCard){const cr=rect(homeCard); if(!(r.x0>=cr.x0-40&&r.x1<=cr.x1+40&&r.y0>=cr.y0-60&&r.y1<=cr.y1+60))continue;}
      else {
        if(isCard(e.id))continue;
        const ecx=(r.x0+r.x1)/2,ecy=(r.y0+r.y1)/2;
        if(Math.hypot(ecx-cx,ecy-cy)>C.nb)continue;
      }
      x0=Math.min(x0,Math.max(r.x0,b.x0-150)); y0=Math.min(y0,Math.max(r.y0,b.y0-110));
      x1=Math.max(x1,Math.min(r.x1,b.x1+150)); y1=Math.max(y1,Math.min(r.y1,b.y1+110));
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
    if(X(b.x0)<6||X(b.x1)>C.W-6)return null;
    return {s:+s.toFixed(4),x:+x.toFixed(1),y:+y.toFixed(1),id:id||''};
  };
  // —— 官方 focus_map：一段旁白一个 focusId（index = paragraphs.id+1）——
  const list=(typeof window!=='undefined'&&window.FOCUS_MAP&&Array.isArray(window.FOCUS_MAP.items))?window.FOCUS_MAP.items:[];
  const slug=sc.id; // scenes.js 里的 id，对应 map.scene 的 _ 后半段
  const track=[];
  for(const row of list){
    if(!row||row.focusId==null||row.focusId==='')continue;
    const paraId=(row.index|0)-1;
    const p=D.paragraphs[paraId]; if(!p)continue;
    // 旁白可跨多场景：用时间相交 + DOM 有该 id；scene slug 仅作优先，不硬拦
    if(!(p.end>sc.t0+0.05 && p.start<sc.t1-0.05))continue;
    const el=sc.el.querySelector(q('#'+row.focusId));
    if(!el)continue;
    const sceneSlug=(row.scene||'').replace(/^\d+_/,'');
    const b0=box([el]); if(!b0)continue;
    const f=frame(expand(b0,el),row.focusId); if(!f)continue;
    const tIn=Math.max(p.start, sc.t0+0.05);
    track.push({t:tIn,id:row.focusId,f,end:Math.min(p.end,sc.t1),prefer:sceneSlug===slug?1:0});
  }
  // 同段多命中时保留 prefer 高的
  {const byT={}; for(const x of track){const k=x.t.toFixed(2); if(!byT[k]||(x.prefer||0)>(byT[k].prefer||0))byT[k]=x;}
   track.length=0; for(const k of Object.keys(byT).sort((a,b)=>+a-+b)) track.push(byT[k]);}
  // 无表或本场景无命中时：回退到旁白动作里最近的单元素（保持旧逻辑的精简版）
  if(!track.length){
    const HIDE={out:1,dim:1};
    for(const [t,sel,d,k] of ev){
      if(HIDE[k]||t<sc.t0-0.1||t>sc.t1)continue;
      const raw=(typeof sel==='string'?sel:'').split(',')[0].trim(); if(!raw||raw==='#m')continue;
      let el=sc.el.querySelector(q(raw));
      const mm=raw.match(/^#n(\d+)$/);
      if(mm){const card=sc.el.querySelector(q('#c'+mm[1])); if(card){
        const cr=rect(card); const kids=[...sc.el.querySelectorAll('[id]')].filter(e=>{
          if(/^n\d+$/.test(e.id)||e.id==='m'||e.id===card.id)return false;
          const r=rect(e); const ecx=(r.x0+r.x1)/2; return r.w>24&&ecx>=cr.x0-20&&ecx<=cr.x1+20;}).sort((a,b)=>rect(b).w*rect(b).h-rect(a).w*rect(a).h);
        el=kids[0]||card;}}
      if(!el)continue; const b0=box([el]); if(!b0)continue;
      const f=frame(expand(b0,el),el.id); if(!f)continue;
      if(track.length&&track[track.length-1].id===el.id&&t-track[track.length-1].t<0.7)continue;
      track.push({t,id:el.id,f,end:t+2});
    }
  }
  track.sort((a,b)=>a.t-b.t);
  let cur={s:1,x:0,y:0,id:''};
  const go=(to,at,dur)=>{if(Math.abs(to.s-cur.s)<0.01&&Math.abs(to.x-cur.x)<2&&Math.abs(to.y-cur.y)<2){cur=to;return}
    const d=Math.max(0.8,Math.min(1.35,dur));
    tl.to(cam,{scale:[cur.s,to.s],x:[cur.x,to.x],y:[cur.y,to.y]},at,d,'inout');
    CAMLOG.push({scene:sc.id,at:+at.toFixed(2),dur:d,to,id:to.id||''}); cur=to};
  for(let i=0;i<track.length;i++){
    const curF=track[i], next=track[i+1];
    const tIn=Math.max(sc.t0+0.15, curF.t+0.1);
    if(tIn>=sc.t1-0.35)break;
    const holdEnd=next?next.t:Math.min(sc.t1, Math.max(curF.end||tIn+2.5, tIn+2.2));
    if(holdEnd-tIn<0.9)continue;
    go(curF.f,tIn, holdEnd-tIn<2.3?0.85:1.15);
    // 长停留单向轻推，压静止
    let t=tIn+1.2, bumps=0; const limit=holdEnd-(next?0.95:1.1);
    while(t+2.15<limit && bumps<6){
      const bump=Math.min(C.maxS, cur.s+0.03);
      const nx=bump-cur.s>=0.02?{s:+bump.toFixed(4),x:+(cur.x*bump/Math.max(cur.s,1)+(cur.x<=0?8:-8)).toFixed(1),y:+(cur.y*bump/Math.max(cur.s,1)).toFixed(1),id:cur.id}
               :{s:cur.s,x:+(cur.x+(cur.x<=0?14:-14)).toFixed(1),y:cur.y,id:cur.id};
      go(nx,t+1.35,0.85); t+=2.15; bumps++;
    }
    // 长段不中途拉回 1x（易留下大段静止）；仅在下一焦点前略收回
    if(next && next.t-curF.t>5.2) go({s:Math.max(C.minS, cur.s*0.92),x:+(cur.x*0.7).toFixed(1),y:+(cur.y*0.7).toFixed(1),id:cur.id||''}, next.t-1.15, 0.95);
  }
  // 场景级补丁：长间隙每隔 ~2.15s 轻挪一次（含平移），避免 freezedetect
  {const camTw=tl.tw.filter(w=>w.el===cam).sort((a,b)=>a.at-b.at);
    const edges=[sc.t0,...camTw.map(w=>w.at+(w.dur||0)),sc.t1].sort((a,b)=>a-b);
    for(let i=0;i+1<edges.length;i++){const a=edges[i],b=edges[i+1]; if(b-a<=2.35)continue;
      let at=a+2.05, n=0;
      while(at<b-0.85 && n<10){
        if(at>=sc.t0+0.2&&at<=sc.t1-0.65){
          const bump=Math.min(C.maxS, Math.max(C.minS,(cur.s>1?cur.s:1.1))+0.04);
          const dx=((n%2)?1:-1)*18;
          go({s:+bump.toFixed(4),x:+((cur.x||0)+dx).toFixed(1),y:cur.y||0,id:cur.id||''},at,0.8);
        }
        at+=2.15; n++;
      }
    }
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
