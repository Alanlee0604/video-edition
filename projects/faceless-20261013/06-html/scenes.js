/* 第03集 关键帧（静帧）：沿用第01集 v4 视觉系统。
   网格：12 栏，主体落在 262…1658（宽 1396），水平中心 960；纵向 8px 基线，地平线 GND=840。
   等分：C4（328/28）、C3（448/26）、C2（686/24）。圆角 R1=16 / R2=32。同组元素打 data-g/data-a 供 align_check。 */
(function(){
const K=window.KIT;const S=[];
/* 动画：底层元素在场景开始即出现（避免空白）；rev 中的元素按旁白词时间依次出现。verb: in | pop | draw */
const REV={};const scene=(id,kind,start,html,theme,rev=[])=>S.push({id,kind,start,html,theme,build:(V)=>{const {A,t0}=V;V.in('#m',t0+.05);
  for(const [sel,p,w,verb='in',d=0] of (REV[id]||rev)){const t=(w?A.W(p,w):A.P(p))+d;if(verb==='draw')V.draw(sel,t,1.1);else V[verb](sel,t)}}});
const M=K.mark,Q=K.qmark,AR=K.farrow,ib=K.ib,ic=K.ic,fb=K.fb,tag=K.tag,fit=K.fit;
const X0=262,X1=1658,W=1396,GND=840;
const C4=[0,1,2,3].map(k=>X0+k*356),C4c=C4.map(x=>x+164),C3=[0,1,2].map(k=>X0+k*474),C3c=C3.map(x=>x+224),C2=[X0,X0+710],C2c=C2.map(x=>x+343);
const svg=s=>K.svg(`<g id="m">${s}</g>`);
const L=(id,x,y,s,c='var(--ink)',size=48,m={})=>tag(K.stext(id,x,y,s,{anchor:'middle',fill:c,size,weight:700}),m);
const FOC='var(--pink)',NEU='var(--g2)';
const gnd=(x=X0,w=W)=>`<rect x="${x}" y="${GND}" width="${w}" height="32" rx="16" fill="var(--g3)"/>`;
const bar=(id,x,w,h,fill,m={},dash=false)=>tag(`<rect id="${id}" x="${x}" y="${GND-h}" width="${w}" height="${h}" rx="16" ${dash?`fill="none" stroke="${fill}" stroke-width="8" stroke-dasharray="20 16"`:`fill="${fill}"`}/>`,m);
const pill=(id,cx,cy,w,h,s,bg,fg,size=48,m={})=>tag(`<g id="${id}"><rect id="${id}b" x="${cx-w/2}" y="${cy-h/2}" width="${w}" height="${h}" rx="${h/2}" fill="${bg}"/>`+K.stext(id+'t',cx,cy+size*.36,s,{anchor:'middle',fill:fg,size,weight:700})+`</g>`,m);
/* v2 元素：快餐店（汉堡招牌）+ 制服员工（无五官）+ 州旗；事实=报纸，反事实=空白报纸 */
const PA='#B794FF';const tagOf=t=>t===FOC?'NJ':'PA';const signOf=t=>t===FOC?FOC:PA;
const burger=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="var(--CR)"/><path d="M${x-r*.62} ${y-r*.08} Q${x} ${y-r*.9} ${x+r*.62} ${y-r*.08}Z" fill="#F0A91A"/><rect x="${x-r*.68}" y="${y-r*.02}" width="${r*1.36}" height="${r*.18}" rx="${r*.09}" fill="#2EE6A8"/><rect x="${x-r*.64}" y="${y+r*.16}" width="${r*1.28}" height="${r*.24}" rx="${r*.12}" fill="#7A3B1E"/><rect x="${x-r*.6}" y="${y+r*.42}" width="${r*1.2}" height="${r*.22}" rx="${r*.11}" fill="#F0A91A"/>`;
/* 员工：脚底在 (x,y)，高 h；gone=虚线轮廓（被裁掉） */
const staff=(x,y,h,col,gone=false)=>{const k=h/110;if(gone)return `<rect x="${x-20*k}" y="${y-108*k}" width="${40*k}" height="${106*k}" rx="${18*k}" fill="none" stroke="var(--g2)" stroke-width="${Math.max(3,5*k)}" stroke-dasharray="${8*k} ${7*k}"/>`;
  return `<rect x="${x-20*k}" y="${y-62*k}" width="${40*k}" height="${62*k}" rx="${14*k}" fill="${col}"/><rect x="${x-9*k}" y="${y-56*k}" width="${18*k}" height="${30*k}" rx="${4*k}" fill="var(--CR)"/><circle cx="${x}" cy="${y-80*k}" r="${16*k}" fill="var(--SK)"/><rect x="${x-17*k}" y="${y-100*k}" width="${34*k}" height="${12*k}" rx="${6*k}" fill="${col}"/><rect x="${x}" y="${y-92*k}" width="${22*k}" height="${5*k}" rx="${2.5*k}" fill="${col}"/>`};
const pennant=(x,y,k,lab,col)=>`<rect x="${x-4*k}" y="${y-130*k}" width="${8*k}" height="${130*k}" rx="${4*k}" fill="var(--INKW)"/><path d="M${x+4*k} ${y-128*k} L${x+104*k} ${y-104*k} L${x+4*k} ${y-80*k}Z" fill="${col}"/>`+(k>=.55?`<text x="${x+40*k}" y="${y-95*k}" text-anchor="middle" style="fill:var(--INK);font-size:${Math.max(28,30*k)}px;font-weight:700">${lab}</text>`:'');
/* 快餐店：底边中心 (cx,bottom)，总高 h（不含旗），宽 1.25h；o.n 员工数，o.gone 被裁数，o.flag 是否插州旗 */
const ff=(id,cx,bottom,h,t,m={},o={})=>{const k=h/320,sg=signOf(t),n=o.n??3,gone=o.gone??0,flag=o.flag??(h>=120);
  let st='';const tot=n+gone,win=230,sx=-170+win/2-((tot-1)*58)/2;for(let i=0;i<tot;i++)st+=staff(sx+i*58,-30,112,sg,i>=n);
  let aw='';for(let i=0;i<6;i++)aw+=`<path d="M${-196+i*65.3} -236 h65.3 v26 a32.6 22 0 0 1 -65.3 0Z" fill="${i%2?'var(--CR)':sg}"/>`;
  return `<g${m.g?` data-g="${m.g}" data-a="${m.a}"`:''}><g id="${id}"><g transform="translate(${cx} ${bottom}) scale(${k.toFixed(4)})">
  <rect x="-200" y="-16" width="400" height="16" rx="8" fill="var(--CRS)"/><rect x="-188" y="-236" width="376" height="222" fill="var(--CR)"/>
  <rect x="-170" y="-184" width="${win}" height="170" rx="10" fill="var(--INKW)"/>${st}<rect x="-170" y="-34" width="${win}" height="20" fill="var(--CRS)"/>
  <rect x="84" y="-184" width="86" height="170" rx="8" fill="var(--CRS)"/><circle cx="98" cy="-100" r="6" fill="var(--INKW)"/>${aw}
  <rect x="-176" y="-320" width="352" height="84" rx="16" fill="${sg}"/>${burger(-120,-278,34)}<rect x="-70" y="-296" width="190" height="14" rx="7" fill="var(--CR)"/><rect x="-70" y="-272" width="130" height="14" rx="7" fill="var(--CR)"/>
  ${flag?pennant(150,-320,1,tagOf(t),sg):''}</g></g></g>`};
const store=(id,cx,h,t,m={g:'ground',a:'bottom'},o={})=>ff(id,cx,GND,h,t,m,o);
const storeAt=(id,cx,bottom,h,t,m={},o={})=>ff(id,cx,bottom,h,t,m,o);
/* 报纸：底边中心 (cx,bottom)，高 h，宽 .8h。fact=有头条与店面图；否则为空白（虚线头条 + 问号） */
const paper=(id,cx,bottom,h,fact,m={g:'ground',a:'bottom'})=>{const w=Math.round(h*.8),x=cx-w/2,y=bottom-h,p=Math.round(w*.08),iw=w-2*p;let s=`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="var(--CR)"/><rect x="${x+p}" y="${y+p}" width="${iw}" height="${h*.09}" rx="8" fill="var(--INK)"/>`;
  const hy=y+p+h*.12,hh=h*.24,py=hy+hh+h*.03,ph=h*.3,ly=py+ph+h*.05;
  if(fact){const fs=Math.max(28,Math.floor(iw/6.8));s+=`<text x="${cx}" y="${hy+fs}" text-anchor="middle" style="fill:var(--INK);font-size:${fs}px;font-weight:700">新泽西</text><text x="${cx}" y="${hy+fs*2.15}" text-anchor="middle" style="fill:var(--CO);font-size:${fs}px;font-weight:700">涨最低工资</text>`;
    s+=`<rect x="${x+p}" y="${py}" width="${iw*.55}" height="${ph}" rx="8" fill="var(--UP)"/>`+ff(id+'pic',x+p+iw*.275,py+ph-8,ph*.78,FOC,{},{n:2,flag:false});
    for(let i=0;i<4;i++)s+=`<rect x="${x+p+iw*.62}" y="${py+i*ph/4+6}" width="${iw*.38}" height="10" rx="5" fill="var(--CRS)"/>`;
    for(let i=0;i<3;i++)s+=`<rect x="${x+p}" y="${ly+i*24}" width="${iw*(i==2?.6:1)}" height="10" rx="5" fill="var(--CRS)"/>`;}
  else{s+=`<rect x="${x+p}" y="${hy}" width="${iw}" height="${hh}" rx="12" fill="none" stroke="var(--g2)" stroke-width="6" stroke-dasharray="18 14"/>`+Q(id+'q',cx,hy+hh/2-4,hh*.62,'var(--g2)')+
    `<rect x="${x+p}" y="${py}" width="${iw}" height="${ph}" rx="12" fill="none" stroke="var(--CRS)" stroke-width="6" stroke-dasharray="18 14"/>`;}
  return tag(`<g id="${id}">${s}</g>`,m)};
const ghostStore=(id,cx,h,m={g:'ground',a:'bottom'})=>paper(id,cx,GND,h,false,m);
/* 乌云+闪电 */
/* 员工点阵：n 个实心 + (tot-n) 个虚框；cols 列；cell 尺寸 */
const crew=(id,x,y,n,tot,cols,cell,col)=>{let s='';for(let k=0;k<tot;k++){const cx=x+(k%cols)*cell+cell/2,cy=y+Math.floor(k/cols)*cell+cell/2,r=cell*.36;s+=k<n?`<circle cx="${cx}" cy="${cy-r*.45}" r="${r*.45}" fill="${col}"/><rect x="${cx-r*.75}" y="${cy+r*.08}" width="${r*1.5}" height="${r*.95}" rx="${r*.5}" fill="${col}"/>`:`<rect x="${cx-r*.8}" y="${cy-r}" width="${r*1.6}" height="${r*2}" rx="${r*.5}" fill="none" stroke="var(--g2)" stroke-width="4" stroke-dasharray="8 7"/>`}return `<g id="${id}">${s}</g>`};
const CF=(top=216,x1=X1)=>({x:346,y:top,w:x1-346,h:GND-top});
const chart=(id,c)=>`<g id="${id}"><rect x="${c.x-4}" y="${c.y}" width="8" height="${c.h}" rx="4" fill="var(--g2)"/><rect x="${c.x-4}" y="${c.y+c.h-4}" width="${c.w+4}" height="8" rx="4" fill="var(--g2)"/></g>`+ic(id+'i','users',282,c.y+32,64,'var(--g1)');
const pt=(c,u,v)=>`${Math.round(c.x+u*c.w)} ${Math.round(c.y+c.h-v*c.h)}`;
const ln=(id,d,col,w=12,dash=false)=>`<path id="${id}" d="${d}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round" ${dash?'stroke-dasharray="24 20"':''}/>`;
const vline=(id,c,u)=>{const x=Math.round(c.x+u*c.w);return `<g id="${id}"><path d="M${x} ${c.y+8} L${x} ${c.y+c.h-8}" stroke="var(--g1)" stroke-width="6" stroke-dasharray="16 16" fill="none"/>${ic(id+'i','landmark',x,c.y-16,64,FOC)}</g>`};
const brace=(id,x,y1,y2,col)=>`<path id="${id}" d="M${x} ${y1} L${x+24} ${y1} L${x+24} ${y2} L${x} ${y2}" stroke="${col}" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
/* 竖向图例栏中心 */
const LEG=1539;
const BOSS={shirt:'var(--CO)',shirtD:'var(--COD)'},PLAIN={shirt:'var(--g2)',shirtD:'var(--g1)'};
const SH=Math.min(360,448/1.25);   // 三等分店高
const SH2=Math.min(400,560/1.25);  // 二等分店高

/* ===== 第03集 实物元素 =====
   查号电话 = 台式拨号电话（区内=珊瑚/焦点色，长途=紫）；查号台 = 戴耳麦的接线员（无五官）；
   收费 = “20¢”硬币；运气 = 骰子；共同事件 = 乌云+闪电（打到谁就画在谁头上）；无关对照 = 椅子；资料 = 日历。 */
const LD='#B794FF';
const phone=(id,cx,bottom,h,col,m={})=>{const k=h/200;let holes='';for(let i=0;i<8;i++){const a=-Math.PI*.9+i*Math.PI*1.8/8;holes+=`<circle cx="${(28*Math.cos(a)).toFixed(1)}" cy="${(-62+28*Math.sin(a)).toFixed(1)}" r="7" fill="var(--INKW)"/>`}
  return tag(`<g id="${id}"><g transform="translate(${cx} ${bottom}) scale(${k.toFixed(4)})"><path d="M-116 0 L116 0 L88 -120 L-88 -120Z" fill="${col}"/><rect x="-116" y="-14" width="232" height="14" rx="7" fill="var(--INKW)"/>
  <circle cx="0" cy="-62" r="44" fill="var(--CR)"/>${holes}<circle cx="0" cy="-62" r="12" fill="${col}"/>
  <path d="M-130 -150 Q0 -190 130 -150 L130 -128 Q0 -160 -130 -128Z" fill="var(--INKW)"/><rect x="-150" y="-170" width="70" height="44" rx="18" fill="var(--INKW)"/><rect x="80" y="-170" width="70" height="44" rx="18" fill="var(--INKW)"/></g></g>`,m)};
const coin=(id,cx,cy,r,m={})=>tag(`<g id="${id}"><circle cx="${cx}" cy="${cy}" r="${r}" fill="var(--SUD)"/><circle cx="${cx}" cy="${cy}" r="${r*.84}" fill="var(--SU)"/>`+K.stext(id+'t',cx,cy+r*.24,'20¢',{anchor:'middle',fill:'var(--INK)',size:Math.max(28,Math.round(r*.66)),weight:700})+`</g>`,m);
const noCoin=(id,cx,cy,r)=>coin(id,cx,cy,r)+M(id+'x',cx+r*.8,cy-r*.8,r*.9,false);
const operator=(id,cx,h,m={g:'ground',a:'bottom'})=>{const s=h/436.6,y=GND-130*s,hx=cx,hy=y-252*s,R=56*s;
  return tag(`<g id="${id}">`+fb(id+'f',cx,GND,h,{shirt:'var(--MI)',shirtD:'var(--MID)',hairStyle:1,armR:-40})+`<path d="M${hx-R} ${hy} A${R} ${R} 0 0 1 ${hx+R} ${hy}" stroke="var(--INK)" stroke-width="${10*s}" fill="none"/><rect x="${hx-R-10*s}" y="${hy-14*s}" width="${22*s}" height="${36*s}" rx="${8*s}" fill="var(--INK)"/><rect x="${hx+R-12*s}" y="${hy-14*s}" width="${22*s}" height="${36*s}" rx="${8*s}" fill="var(--INK)"/><path d="M${hx+R-4*s} ${hy+18*s} Q${hx+R} ${hy+50*s} ${hx+14*s} ${hy+52*s}" stroke="var(--INK)" stroke-width="${7*s}" fill="none" stroke-linecap="round"/><circle cx="${hx+12*s}" cy="${hy+52*s}" r="${9*s}" fill="var(--INK)"/></g>`,m)};
const chair=(id,cx,bottom,h,col,m={g:'ground',a:'bottom'})=>{const k=h/240;return tag(`<g id="${id}"><g transform="translate(${cx} ${bottom}) scale(${k.toFixed(4)})"><rect x="-74" y="-120" width="16" height="110" rx="6" fill="#C79A1E"/><rect x="58" y="-120" width="16" height="110" rx="6" fill="#C79A1E"/><rect x="-84" y="-240" width="168" height="112" rx="20" fill="${col}"/><rect x="-60" y="-216" width="120" height="16" rx="8" fill="#C79A1E"/><rect x="-60" y="-184" width="120" height="16" rx="8" fill="#C79A1E"/><rect x="-74" y="-132" width="16" height="20" fill="${col}"/><rect x="58" y="-132" width="16" height="20" fill="${col}"/><path d="M-84 -116 L84 -116 L112 -86 L-112 -86Z" fill="${col}"/><rect x="-112" y="-90" width="224" height="22" rx="8" fill="${col}"/><rect x="-108" y="-72" width="20" height="72" rx="8" fill="${col}"/><rect x="88" y="-72" width="20" height="72" rx="8" fill="${col}"/></g></g>`,m)};
/* 乌云：中心 (cx,cy)、宽 w；bolts 为闪电落点 [x,yTop,yTip] */
const storm=(id,cx,cy,w,bolts=[])=>{const sx=w/600,sy=Math.min(sx,1)*.8;const bolt=([x,a,b])=>{const L=b-a;return `<path d="M${x-10} ${a} L${x-52} ${a+L*.56} L${x-6} ${a+L*.56} L${x-36} ${b} L${x+52} ${a+L*.4} L${x+8} ${a+L*.4} L${x+40} ${a}Z" fill="var(--SU)"/>`};
  return `<g id="${id}"><g transform="translate(${cx} ${cy}) scale(${sx.toFixed(3)} ${sy.toFixed(3)})"><path d="M-300 60 Q-320 -20 -230 -30 Q-210 -110 -110 -100 Q-60 -170 40 -130 Q110 -170 170 -100 Q290 -110 290 0 Q320 60 290 60Z" fill="#4A4878"/></g>${bolts.map(bolt).join('')}</g>`};
/* 坐标图：y 轴顶端是电话 */
const pchart=(id,c,col='var(--g1)')=>`<g id="${id}"><rect x="${c.x-4}" y="${c.y}" width="8" height="${c.h}" rx="4" fill="var(--g2)"/><rect x="${c.x-4}" y="${c.y+c.h-4}" width="${c.w+4}" height="8" rx="4" fill="var(--g2)"/></g>`+phone(id+'p',c.x-64,c.y+56,56,col);
const feeLine=(id,c,u,r=40)=>{const x=Math.round(c.x+u*c.w);return `<g id="${id}"><path d="M${x} ${c.y+r*2} L${x} ${c.y+c.h-8}" stroke="var(--g1)" stroke-width="6" stroke-dasharray="16 16" fill="none"/>${coin(id+'c',x,c.y+r-8,r)}</g>`};
/* 月度序列：n 点，level(u) 返回 0..1，带确定性抖动 */
const rnd=k=>{const x=Math.sin(k*12.9898+3.1)*43758.5453;return x-Math.floor(x)-.5};
const series=(c,u0,u1,level,amp,n,seed=1)=>{let d='';for(let i=0;i<n;i++){const u=u0+(u1-u0)*i/(n-1);const v=level(u)+amp*rnd(i+seed*100);d+=(i?' L':'M')+pt(c,u,v)}return d};
const card=(id,x,y,w,h)=>`<rect id="${id}" x="${x}" y="${y}" width="${w}" height="${h}" rx="32" fill="var(--g4)"/>`;
const mini=(x,y,w,h)=>({x:x+48,y:y+48,w:w-96,h:h-96});
const axes=(c)=>`<rect x="${c.x-3}" y="${c.y}" width="6" height="${c.h}" rx="3" fill="var(--g2)"/><rect x="${c.x-3}" y="${c.y+c.h-3}" width="${c.w+3}" height="6" rx="3" fill="var(--g2)"/>`;
const LOC='var(--CO)';

/* ===== 第05集 实物元素 =====
   看病次数 = 红十字诊所（坐标 y 轴顶端）；收入 = 金币堆 / 黄色收入刻度尺；门槛 = “$3000”虚线立柱；
   救助资格 = 红十字救助卡（失去 = 卡 + 红叉）；另一项补助 = 黄色票券；另一项新计划 = 紫色喇叭；
   健康 = 心电红心；年龄 = 沙漏；支付能力 = 钱包；家庭 = 大人+孩子；一个点 = 一组人（圆里一群人）；前一年 = 日历。 */
const AID='var(--CO)',SUB='#B794FF';
const FA={shirt:'var(--MI)',shirtD:'var(--MID)'},FBc={shirt:'#B794FF',shirtD:'#9A72F0'};
const Y=(c,v)=>Math.round(c.y+c.h-v*c.h),UX=(c,u)=>Math.round(c.x+u*c.w);
const clinic=(id,cx,bottom,h,m={})=>{const k=h/200;return tag(`<g id="${id}"><g transform="translate(${cx} ${bottom}) scale(${k.toFixed(4)})">
 <rect x="-120" y="-150" width="240" height="150" fill="var(--CR)" stroke="var(--CRS)" stroke-width="8"/><rect x="-136" y="-170" width="272" height="28" rx="10" fill="var(--CRS)"/>
 <rect x="-50" y="-206" width="100" height="44" rx="10" fill="var(--CR)" stroke="var(--CRS)" stroke-width="8"/><rect x="-8" y="-200" width="16" height="32" rx="4" fill="var(--CO)"/><rect x="-16" y="-192" width="32" height="16" rx="4" fill="var(--CO)"/>
 <rect x="-96" y="-126" width="48" height="40" rx="6" fill="#9FD3FF"/><rect x="48" y="-126" width="48" height="40" rx="6" fill="#9FD3FF"/>
 <rect x="-28" y="-80" width="56" height="80" rx="6" fill="#9FD3FF"/><rect x="-136" y="-8" width="272" height="8" rx="4" fill="var(--CRS)"/></g></g>`,m)};
const mcard=(id,cx,cy,w,off=false,m={})=>{const h=Math.round(w*.64),x=cx-w/2,y=cy-h/2,k=w/200,col=AID;
 return tag(`<g id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${14*k}" fill="var(--CR)" stroke="var(--CRS)" stroke-width="${Math.max(3,4*k)}"/><path d="M${x} ${y+30*k} L${x} ${y+14*k} Q${x} ${y} ${x+14*k} ${y} L${x+w-14*k} ${y} Q${x+w} ${y} ${x+w} ${y+14*k} L${x+w} ${y+30*k}Z" fill="${col}"/>
 <circle cx="${x+50*k}" cy="${y+80*k}" r="${28*k}" fill="${col}"/><rect x="${x+44*k}" y="${y+62*k}" width="${12*k}" height="${36*k}" rx="${3*k}" fill="var(--CR)"/><rect x="${x+32*k}" y="${y+74*k}" width="${36*k}" height="${12*k}" rx="${3*k}" fill="var(--CR)"/>
 <rect x="${x+96*k}" y="${y+60*k}" width="${84*k}" height="${12*k}" rx="${6*k}" fill="var(--CRS)"/><rect x="${x+96*k}" y="${y+86*k}" width="${60*k}" height="${12*k}" rx="${6*k}" fill="var(--CRS)"/></g>`+(off?M(id+'x',cx+w*.46,cy-h*.46,Math.max(56,w*.4),false):''),m)};
const coupon=(id,cx,cy,w)=>ic(id,'ticket',cx,cy,Math.round(w*52/88),'var(--SU)');
const newplan=(id,cx,cy,h)=>ic(id,'promo',cx,cy,h,SUB);
const gate=(id,x,top,bottom,col='var(--SU)')=>`<g id="${id}"><path d="M${x} ${top+40} L${x} ${bottom}" stroke="${col}" stroke-width="8" stroke-dasharray="18 14"/>`+pill(id+'p',x,top,208,80,'$3000',col,'var(--INK)',52)+`</g>`;
const family=(id,cx,h,col=FA,m={})=>tag(`<g id="${id}">`+fb(id+'a',cx-h*.13,GND,h,col)+fb(id+'c',cx+h*.2,GND,h*.62,{...col,hairStyle:1})+`</g>`,m);
const grp=(id,cx,n,h,col=FA,gap=0)=>{gap=gap||h*.36;let s='';for(let i=0;i<n;i++)s+=fb(id+i,cx+(i-(n-1)/2)*gap,GND,h,{...col,hairStyle:i%2});return `<g id="${id}">${s}</g>`};
const heart=(id,cx,cy,s,col='var(--CO)')=>{const k=s/100;return `<g id="${id}"><g transform="translate(${cx} ${cy}) scale(${k})"><path d="M0 44 C-64 2 -60 -46 -28 -46 C-12 -46 0 -36 0 -24 C0 -36 12 -46 28 -46 C60 -46 64 2 0 44Z" fill="${col}"/><path d="M-38 -6 L-16 -6 L-8 -22 L4 10 L12 -6 L38 -6" stroke="var(--CR)" stroke-width="6" fill="none" stroke-linejoin="round" stroke-linecap="round"/></g></g>`};
const hourglass=(id,cx,cy,s)=>{const k=s/100;return `<g id="${id}"><g transform="translate(${cx} ${cy}) scale(${k})"><rect x="-36" y="-50" width="72" height="12" rx="6" fill="var(--SUD)"/><rect x="-36" y="38" width="72" height="12" rx="6" fill="var(--SUD)"/><path d="M-28 -38 L28 -38 L5 0 L28 38 L-28 38 L-5 0Z" fill="var(--CR)"/><path d="M-16 -24 L16 -24 L2 -6 L-2 -6Z M-22 38 L22 38 L0 16Z" fill="var(--SU)"/></g></g>`};
const wallet=(id,cx,cy,s)=>{const k=s/100;return `<g id="${id}"><g transform="translate(${cx} ${cy}) scale(${k})"><rect x="-48" y="-32" width="96" height="66" rx="12" fill="#B9773A"/><rect x="-48" y="-32" width="96" height="20" rx="10" fill="#D08C4A"/><rect x="16" y="-6" width="34" height="24" rx="8" fill="#8A5326"/><circle cx="30" cy="6" r="5" fill="var(--SU)"/></g></g>`};
const coins=(id,cx,bottom,n,r=40)=>{let s='';for(let i=0;i<n;i++)s+=`<ellipse cx="${cx}" cy="${bottom-r*.3-i*r*.38}" rx="${r}" ry="${r*.3}" fill="var(--SUD)"/><ellipse cx="${cx}" cy="${bottom-r*.42-i*r*.38}" rx="${r}" ry="${r*.3}" fill="var(--SU)"/>`;return `<g id="${id}">${s}</g>`};
/* 收入刻度尺：顶边 y，lo..hi 美元 */
const ruler=(id,x0,x1,y,lo=1000,hi=5000,step=1000)=>{const rx=v=>Math.round(x0+72+(x1-x0-144)*(v-lo)/(hi-lo));let s=`<rect x="${x0}" y="${y}" width="${x1-x0}" height="88" rx="16" fill="var(--SU)"/>`;
 for(let v=lo;v<=hi+1e-6;v+=step/4){const maj=Math.abs((v-lo)/step-Math.round((v-lo)/step))<1e-6;s+=`<rect x="${rx(v)-3}" y="${y}" width="6" height="${maj?28:16}" fill="var(--INK)"/>`;if(maj)s+=`<text x="${rx(v)}" y="${y+72}" text-anchor="middle" style="fill:var(--INK);font-size:34px;font-weight:700">$${v}</text>`}
 return {svg:`<g id="${id}">${s}</g>`,rx}};
/* 就医-收入图：y 轴顶端诊所，x 轴末端金币 */
const vchart=(id,c)=>axes(c)+clinic(id+'i',c.x-70,c.y+64,72)+coins(id+'m',c.x+c.w+56,c.y+c.h+12,3,30);
const F=u=>.6-.24*u,J=.26;
const rd=(id,c,cut=.5,jump=J,f=F,col=AID,seed=1,amp=.025)=>ln(id,series(c,.03,cut-.012,u=>f(u)+jump,amp,16,seed)+' '+series(c,cut+.012,.97,f,amp,16,seed+1),col,10);
const smooth=(id,c,f=F,col='var(--ink)',u0=.03,u1=.97,dash=true)=>{let d='';for(let i=0;i<=24;i++){const u=u0+(u1-u0)*i/24;d+=(i?' L':'M')+pt(c,u,f(u))}return ln(id,d,col,9,dash)};
const dotg=(id,cx,cy,r,col=AID)=>`<g id="${id}"><circle cx="${cx}" cy="${cy}" r="${r}" fill="${col}"/>`+ic(id+'u','users',cx,cy+2,r*1.05,'var(--CR)')+`</g>`;
const NE=(x,y,s=96)=>K.stext('ne'+x,x,y+s*.35,'≠',{anchor:'middle',fill:'var(--ink)',size:s,weight:700});
const EQ=(id,x,y,s=96)=>K.stext(id,x,y+s*.35,'=',{anchor:'middle',fill:'var(--ink)',size:s,weight:700});
const chain=(id,x1,x2,y)=>{let s='';const n=4,w=(x2-x1)/n;for(let i=0;i<n;i++)s+=`<rect x="${x1+i*w-8}" y="${y-22}" width="${w+16}" height="44" rx="22" fill="none" stroke="var(--g1)" stroke-width="10"/>`;return `<g id="${id}">${s}</g>`};

const grave=(id,cx,bottom,h)=>{const k=h/200;return `<g id="${id}"><g transform="translate(${cx} ${bottom}) scale(${k})"><path d="M-70 0 L-70 -130 Q-70 -200 0 -200 Q70 -200 70 -130 L70 0Z" fill="var(--g2)"/><rect x="-10" y="-170" width="20" height="90" rx="4" fill="var(--g4)"/><rect x="-36" y="-148" width="72" height="20" rx="4" fill="var(--g4)"/><rect x="-90" y="-12" width="180" height="12" rx="6" fill="var(--g3)"/></g></g>`};
/* ===== 第06集 实物元素 =====
   项目 = Head Start 学前班小楼（红顶 + ABC 积木 + 红十字）；孩子 = 小个子人物；县 = 不规则地块（越穷越红）；
   贫困排名门槛 = “300”虚线立柱；申请帮助 = 申请表（写字板+笔）；经济机会办公室 = 政府楼；
   资源 = 金币堆；死亡 = 墓碑（少了=下降）；其他联邦支出 = 紫色钱袋；医疗普遍改善 = 医院；更大范围的变化 = 乌云。 */
const hospital=(id,cx,bottom,h,m={g:'ground',a:'bottom'})=>{const k=h/320;let w='';for(let r=0;r<2;r++)for(let c=0;c<4;c++)if(!(r==1&&(c==1||c==2)))w+=`<rect x="${-150+c*80}" y="${-220+r*90}" width="56" height="56" rx="8" fill="#9FD3FF"/>`;
  return tag(`<g id="${id}"><g transform="translate(${cx} ${bottom}) scale(${k.toFixed(4)})"><rect x="-200" y="-16" width="400" height="16" rx="8" fill="var(--CRS)"/><rect x="-180" y="-260" width="360" height="246" fill="var(--CR)" stroke="var(--CRS)" stroke-width="10"/><rect x="-120" y="-320" width="240" height="70" rx="12" fill="var(--CR)" stroke="var(--CRS)" stroke-width="10"/><rect x="-14" y="-312" width="28" height="56" rx="4" fill="#E5322B"/><rect x="-28" y="-298" width="56" height="28" rx="4" fill="#E5322B"/>${w}<rect x="-44" y="-120" width="88" height="106" rx="8" fill="#9FD3FF"/><rect x="-2" y="-120" width="4" height="106" fill="var(--CR)"/></g></g>`,m)};
const HOT=['#FF5A4E','#FF7A5C','#FF9A70','#FFB98A','#FFD3AE','#F3E3CF'];
const heat=t=>HOT[Math.min(HOT.length-1,Math.max(0,Math.round(t*(HOT.length-1))))];
const county=(id,cx,cy,s,col,m={})=>{const k=s/100;return tag(`<g id="${id}"><g transform="translate(${cx} ${cy}) scale(${k.toFixed(3)})"><path d="M-44 -40 L-6 -50 L10 -36 L46 -42 L50 -2 L40 30 L48 46 L4 50 L-14 40 L-48 44 L-42 8 L-50 -18Z" fill="${col}" stroke="var(--INK)" stroke-opacity=".35" stroke-width="5" stroke-linejoin="round"/></g></g>`,m)};
const school=(id,cx,bottom,h,m={})=>{const k=h/300;return tag(`<g id="${id}"><g transform="translate(${cx} ${bottom}) scale(${k.toFixed(4)})">
 <rect x="-170" y="-180" width="340" height="180" fill="#F2D3A2" stroke="#B9874A" stroke-width="8"/><path d="M-200 -176 L0 -300 L200 -176Z" fill="var(--CO)"/><circle cx="0" cy="-222" r="30" fill="var(--CR)"/><rect x="-7" y="-240" width="14" height="36" rx="3" fill="var(--CO)"/><rect x="-18" y="-229" width="36" height="14" rx="3" fill="var(--CO)"/>
 <rect x="-34" y="-110" width="68" height="110" rx="8" fill="#9FD3FF"/><rect x="-140" y="-140" width="70" height="56" rx="8" fill="#9FD3FF"/><rect x="70" y="-140" width="70" height="56" rx="8" fill="#9FD3FF"/>
 <rect x="-160" y="-64" width="56" height="56" rx="6" fill="var(--SU)"/><text x="-132" y="-24" text-anchor="middle" style="fill:var(--INK);font-size:40px;font-weight:700">A</text><rect x="104" y="-64" width="56" height="56" rx="6" fill="var(--MI)"/><text x="132" y="-24" text-anchor="middle" style="fill:var(--INK);font-size:40px;font-weight:700">B</text>
 <rect x="-190" y="-8" width="380" height="8" rx="4" fill="var(--CRS)"/></g></g>`,m)};
const kid=(id,cx,h,col=FA,m={})=>fb(id,cx,GND,h,{...col,hairStyle:1},m);
const kids=(id,cx,n,h,cols=['var(--MI)','var(--SU)','#9FD3FF','#B794FF','var(--CO)'],gap=0)=>{gap=gap||h*.46;let s='';for(let i=0;i<n;i++)s+=fb(id+i,cx+(i-(n-1)/2)*gap,GND,h,{shirt:cols[i%cols.length],shirtD:cols[(i+2)%cols.length],hairStyle:i%2});return `<g id="${id}">${s}</g>`};
const form=(id,cx,cy,h,col='var(--CR)')=>{const k=h/200,paper=(col==='var(--g1)'||col==='var(--CR)')?'var(--CR)':col;return `<g id="${id}"><g transform="translate(${cx} ${cy}) scale(${k.toFixed(4)})"><rect x="-74" y="-90" width="148" height="186" rx="14" fill="#C98A4B"/><rect x="-60" y="-74" width="120" height="158" rx="8" fill="${paper}"/><rect x="-32" y="-102" width="64" height="32" rx="10" fill="#8A5326"/>
 ${[0,1,2].map(i=>`<rect x="-44" y="${-48+i*38}" width="20" height="20" rx="4" fill="none" stroke="var(--INK)" stroke-width="4"/><rect x="-16" y="${-44+i*38}" width="${i==2?40:60}" height="12" rx="6" fill="var(--CRS)"/>`).join('')}
 <g transform="rotate(30 46 20)"><rect x="36" y="-40" width="22" height="100" rx="4" fill="var(--SU)"/><rect x="36" y="-40" width="22" height="16" rx="4" fill="var(--CO)"/><path d="M36 60 L58 60 L47 84Z" fill="var(--SK)"/></g></g></g>`};
const gov=(id,cx,cy,h)=>ic(id,'landmark',cx,cy,h,'var(--CR)');
const bag=(id,cx,cy,s,col=SUB)=>{const k=s/100;return `<g id="${id}"><g transform="translate(${cx} ${cy}) scale(${k})"><path d="M-16 -44 L16 -44 L8 -30 L-8 -30Z" fill="${col}"/><path d="M-10 -30 Q-56 -4 -48 28 Q-42 50 0 50 Q42 50 48 28 Q56 -4 10 -30Z" fill="${col}"/><text x="0" y="30" text-anchor="middle" style="fill:var(--CR);font-size:52px;font-weight:700">$</text></g></g>`};
const tomb=(id,cx,bottom,h,col='var(--g2)')=>{const k=h/200;return `<g id="${id}"><g transform="translate(${cx} ${bottom}) scale(${k})"><path d="M-64 0 L-64 -130 Q-64 -196 0 -196 Q64 -196 64 -130 L64 0Z" fill="${col}"/><rect x="-36" y="-140" width="72" height="16" rx="8" fill="var(--CR)" opacity=".75"/><rect x="-28" y="-108" width="56" height="16" rx="8" fill="var(--CR)" opacity=".75"/></g></g>`};
const kit=(id,cx,cy,s)=>{const k=s/100;return `<g id="${id}"><g transform="translate(${cx} ${cy}) scale(${k})"><rect x="-18" y="-50" width="36" height="16" rx="6" fill="none" stroke="var(--CRS)" stroke-width="8"/><rect x="-52" y="-38" width="104" height="80" rx="14" fill="var(--CR)"/><rect x="-9" y="-24" width="18" height="52" rx="4" fill="var(--CO)"/><rect x="-26" y="-7" width="52" height="18" rx="4" fill="var(--CO)"/></g></g>`};
const blocks=(id,cx,bottom,s)=>{const k=s/100;const b=(x,y,c,t)=>`<rect x="${x}" y="${y}" width="44" height="44" rx="6" fill="${c}"/><text x="${x+22}" y="${y+33}" text-anchor="middle" style="fill:var(--INK);font-size:30px;font-weight:700">${t}</text>`;return `<g id="${id}"><g transform="translate(${cx} ${bottom}) scale(${k})">${b(-48,-46,'var(--SU)','A')+b(4,-46,'var(--MI)','B')+b(-22,-94,'#9FD3FF','C')}</g></g>`};
/* 县排名带：n 块，越靠左越穷；cut 为门槛在第几块之后 */
const crow=(id,x0,x1,cy,n,cut,s=96,hi=-1)=>{s=Math.min(s,(x1-x0)/n*.84);let r='';for(let i=0;i<n;i++){const x=Math.round(x0+(x1-x0)*(i+.5)/n);r+=county(id+i,x,cy,s,heat(i/(n-1)))}return `<g id="${id}">${r}</g>`};
const cx_=(x0,x1,n,i)=>Math.round(x0+(x1-x0)*(i+.5)/n);
const gate3=(id,x,top,bottom,lab='300')=>`<g id="${id}"><path d="M${x} ${top+40} L${x} ${bottom}" stroke="var(--SU)" stroke-width="8" stroke-dasharray="18 14"/>`+pill(id+'p',x,top,168,80,lab,'var(--SU)','var(--INK)',52)+`</g>`;
const hchart=(id,c,icon='heart')=>axes(c)+(icon==='tomb'?tomb(id+'i',c.x-64,c.y+64,72):heart(id+'i',c.x-64,c.y+30,64))+county(id+'m',c.x+c.w+56,c.y+c.h,56,HOT[1]);
const ARW=(id,x1,x2,y,c='var(--ink)')=>AR(id,x1,y,x2,y,c,12);
const foot=(id,x,y,s,r=0)=>{const k=s/100;return `<g id="${id}"><g transform="translate(${x} ${y}) rotate(${r}) scale(${k})"><ellipse cx="0" cy="-6" rx="22" ry="30" fill="var(--ink)"/><ellipse cx="0" cy="40" rx="16" ry="16" fill="var(--ink)"/><circle cx="-16" cy="-46" r="8" fill="var(--ink)"/><circle cx="-4" cy="-52" r="8" fill="var(--ink)"/><circle cx="9" cy="-50" r="7" fill="var(--ink)"/><circle cx="19" cy="-42" r="6" fill="var(--ink)"/></g></g>`};
const mbar=(id,m,vals,cols,dash=false)=>{const n=vals.length,bw=m.w/n*.6;return vals.map((v,i)=>{const x=m.x+m.w*(i+.5)/n-bw/2,h=v*m.h;return dash?`<rect x="${x}" y="${m.y+m.h-h}" width="${bw}" height="${h}" rx="10" fill="none" stroke="${cols[i]}" stroke-width="6" stroke-dasharray="14 10"/>`:`<rect x="${x}" y="${m.y+m.h-h}" width="${bw}" height="${h}" rx="10" fill="${cols[i]}"/>`}).join('')};

/* 01 开场：孩子健康？研究者却盯着县的贫困排名线 */
{const x0=C2[1]-60,x1=X1,n=8;
scene('hook','teaching',A=>A.P(0),svg(gnd()+kid('k',C3c[0]-40,300,FA)+heart('h',C3c[0]-40,GND-400,120)+Q('qh',C3c[0]+90,GND-430,90,'var(--SU)')+AR('a',C3c[0]+140,GND-200,x0-30,GND-200,'var(--g1)',12)+
  crow('cr',x0,x1,GND-200,n,4,110)+gate3('g',(cx_(x0,x1,n,3)+cx_(x0,x1,n,4))/2,360,GND)),'i');}

/* 02 Head Start：学前班（积木=学前教育，药箱=健康支持），孩子走进去 */
scene('program','record',A=>A.P(1),svg(gnd()+school('s',960,GND,400)+pill('ps',960,GND-460,300,80,'Head Start','var(--SU)','var(--INK)',48)+blocks('bl',C3c[0]-40,GND,220)+kit('kt',C3c[2]+40,GND-300,200)+
  kids('kd',C3c[0]+150,2,200)+kids('kd2',C3c[2]-60,2,200)),'u');

/* 03 直接比：进了学前班的孩子 vs 没进的孩子 */
scene('direct','teaching',A=>A.P(2),svg(gnd()+school('s',C2c[0]-150,GND,260)+kids('k0',C2c[0]+240,3,220)+kids('k1',C2c[1]+60,3,220,['var(--g2)'])+heart('h0',C2c[0]+240,GND-330,100)+heart('h1',C2c[1]+60,GND-330,100)+
  K.stext('vs',960,GND-300,'VS',{anchor:'middle',fill:'var(--ink)',size:80,weight:700})),'c');

/* 04 谁会参加：知道（喇叭）、愿意报名（报名表）、附近有服务（学前班就在旁边） */
{const cw=448,ch=480,y0=GND-ch;
scene('who','teaching',A=>A.P(3),svg([0,1,2].map(k=>tag(card('c'+k,C3[k],y0,cw,ch),{g:'card',a:'bottom'})+K.nodeOn('n'+k,C3[k]+64,y0+64,k+1)).join('')+
  ic('pr','promo',C3c[0],GND-290,200,'var(--SU)')+form('fm',C3c[1],GND-290,220,'var(--CR)')+school('sc',C3c[2]-40,GND-130,210)+ic('pin','pin',C3c[2]+130,GND-320,110,'var(--CO)')+['知道','报名','附近'].map((t,k)=>L('lb'+k,C3c[k],GND-56,t,'var(--ink)',48)).join('')),'i');}

/* 05 这些差别本身影响健康（假设）：① 注意健康的家庭 → 孩子本来就好；② 最困难家庭先被拉进来 → 孩子本来就差 */
{const cw=686,ch=520,y0=GND-ch;
scene('affect','teaching',A=>A.P(4),svg([0,1].map(k=>tag(card('c'+k,C2[k],y0,cw,ch),{g:'card',a:'bottom'})+K.nodeOn('n'+k,C2[k]+64,y0+64,k+1)+school('s'+k,C2[k]+cw-180,y0+170,150)+Q('q'+k,C2[k]+cw-48,y0+90,72,'var(--SU)')).join('')+
  fb('p0',C2[0]+160,GND-40,300,FA)+fb('k0b',C2[0]+260,GND-40,190,{...FA,hairStyle:1})+kit('kt',C2[0]+440,GND-150,130)+heart('h0',C2[0]+440,GND-300,110)+
  fb('p1',C2[1]+160,GND-40,300,FBc)+fb('k1b',C2[1]+260,GND-40,190,{...FBc,hairStyle:1})+wallet('w',C2[1]+440,GND-150,120)+heart('h1',C2[1]+440,GND-300,110,'var(--g2)')),'u');}

/* 06 选择威胁 */
scene('selection','none',A=>A.P(5),K.term('term',1,160,'选择威胁')+svg(gnd()+wallet('w',C3c[0],GND-200,240)+chain('ch',C3c[0]+150,C3c[1]-170,GND-200)+school('s',C3c[1]+20,GND,300)+
  ic('die','die',C3c[2]+40,GND-180,200,'var(--SU)')+M('x',C3c[2]+140,GND-290,110,false)),'c');

/* 07 机会：1965 年，经济机会办公室帮最穷的 300 个县写申请 */
{const x0=C3[2]-40,x1=X1,cols=4,rows=3;let g='';for(let r=0;r<rows;r++)for(let c=0;c<cols;c++){const i=r*cols+c;g+=county('ct'+i,x0+60+c*120,GND-380+r*120,104,i<5?HOT[0]:HOT[5])}
scene('rule','record',A=>A.P(6),svg(gnd()+gov('gv',C3c[0]-20,GND-220,280)+ic('cal','calendar',C3c[0]-20,300,110,'var(--g1)')+L('y',C3c[0]+130,322,'1965','var(--ink)',56)+
  AR('a0',C3c[0]+150,GND-220,C3c[1]-110,GND-220,'var(--g1)',12)+form('fm',C3c[1]-20,GND-220,240,'var(--CR)')+AR('a1',C3c[1]+90,GND-220,x0+20,GND-220,'var(--g1)',12)+g+pill('p',x0+240,GND-500,168,80,'300','var(--SU)','var(--INK)',52)),'i');}

/* 08 两点说明 */
{const cw=686,ch=480,y0=GND-ch;
scene('two','schematic',A=>A.P(7),svg([0,1].map(k=>tag(card('c'+k,C2[k],y0,cw,ch),{g:'card',a:'bottom'})+K.nodeOn('n'+k,C2[k]+64,y0+64,k+1)).join('')+form('fm',C2c[0],GND-230,260,'var(--CR)')+county('ct',C2c[1]-110,GND-230,200,HOT[0])+M('ok2',C2c[1]-10,GND-330,72,true)+kid('kd',C2c[1]+150,240,FA)+M('x',C2c[1]+230,GND-280,80,false)),'u');}

/* 09 第一点：帮的是申请；300 县内不是人人入学，300 县外也能有学前班 */
{const cw=686,ch=520,y0=GND-ch;
scene('point1','record',A=>A.P(8),svg([0,1].map(k=>tag(card('c'+k,C2[k],y0,cw,ch),{g:'card',a:'bottom'})+county('ct'+k,C2c[k],GND-250,380,k?HOT[5]:HOT[0])).join('')+K.nodeOn('n',C2[0]+64,y0+64,1)+
  school('s0',C2c[0]-60,GND-170,150)+fb('a0',C2c[0]+80,GND-170,130,FA)+fb('a1',C2c[0]+150,GND-170,130,{shirt:'var(--g2)',shirtD:'var(--g1)'})+form('fm',C2c[0]+170,y0+80,96,'var(--CR)')+
  school('s1',C2c[1],GND-170,150)+L('l0',C2c[0],y0+90,'300内','var(--ink)',48)+L('l1',C2c[1],y0+90,'300外','var(--ink)',48)),'c');}

/* 10 第二点：按县定，比的是县，不是孩子 */
scene('point2','record',A=>A.P(9),svg(gnd()+K.nodeOn('n',X0+64,280,2)+[0,1,2].map(i=>county('c'+i,C2c[0]-200+i*200,GND-260,190,heat(i*.4))).join('')+M('ok',C2c[0],GND-480,110,true)+
  kid('kd',C2c[1],360,FA)+M('x',C2c[1]+140,GND-420,110,false)),'u');

/* 11 排名第 299 和第 301 的县：差不多穷，一个拿到申请帮助，一个没有 */
{const x0=X0,x1=X1,n=10,i0=4,i1=5,g=(cx_(x0,x1,n,i0)+cx_(x0,x1,n,i1))/2;
scene('rank','teaching',A=>A.P(10),svg(gnd()+crow('cr',x0,x1,GND-120,n,5,120)+gate3('g',g,280,GND)+pill('p0',cx_(x0,x1,n,i0)-6,GND-230,116,68,'299','var(--g4)','var(--ink)',40)+pill('p1',cx_(x0,x1,n,i1)+6,GND-230,116,68,'301','var(--g4)','var(--ink)',40)+
  form('f0',cx_(x0,x1,n,i0)-60,GND-400,150,'var(--CR)')+form('f1',cx_(x0,x1,n,i1)+60,GND-400,150,'var(--g2)')+M('x',cx_(x0,x1,n,i1)+120,GND-460,72,false)),'i');}

/* 12 回归不连续：x=县贫困程度（分派变项），门槛=300（选取标准） */
{const c=CF(296,1380),x=UX(c,.5);
scene('rdd','teaching',A=>A.P(11),svg(hchart('ax',c)+gate3('g',x,c.y+8,GND-8)+rd('l',c)+brace('b',x+28,Y(c,F(.5)+J),Y(c,F(.5)),'var(--MI)')+form('fm',x-140,c.y+40,110,'var(--CR)')+
  L('t0',UX(c,.78),GND+80,'分派变项','var(--pink)',52)+L('t1',LEG,c.y+60,'选取标准','var(--pink)',52)+AR('a',LEG-120,c.y+60,x+110,c.y+20,'var(--pink)',8)),'c');}

/* 13 规则写清楚，不是家长自己选的 */
scene('noparent','record',A=>A.P(12),svg(gnd()+`<rect x="${C2c[0]-300}" y="${GND-560}" width="600" height="540" rx="32" fill="var(--CR)"/><rect x="${C2c[0]-110}" y="${GND-590}" width="220" height="64" rx="20" fill="var(--g1)"/>`+
  county('ct',C2c[0]-170,GND-330,160,HOT[0])+L('lt',C2c[0]-170,GND-150,'≤300','var(--INK)',56)+AR('a',C2c[0]-60,GND-330,C2c[0]+40,GND-330,'var(--INK)',12)+form('fm',C2c[0]+150,GND-330,200,'var(--g1)')+M('ok',C2c[0]+260,GND-520,96,true)+
  fb('pa',C2c[1],GND,400,FBc)+form('pf',C2c[1]+150,GND-260,120,'var(--g2)')+M('x',C2c[1]+170,GND-400,110,false)),'u');

/* 14 从“拿到申请帮助”到“孩子健康变好”，中间隔好几步 */
scene('gap','schematic',A=>A.P(13),svg(gnd()+form('fm',C3c[0]-60,GND-250,280,'var(--CR)')+`<path d="M${C3c[0]+120} ${GND-250} L${C3c[2]-140} ${GND-250}" stroke="var(--g2)" stroke-width="10" stroke-dasharray="24 20"/>`+
  [0,1,2].map(i=>`<circle cx="${C3c[1]-200+i*200}" cy="${GND-250}" r="34" fill="none" stroke="var(--g1)" stroke-width="8" stroke-dasharray="10 8"/>`).join('')+Q('q',C3c[1],GND-440,130,'var(--SU)')+
  kid('kd',C3c[2]+40,320,FA)+heart('h',C3c[2]+40,GND-410,130)),'i');

/* 15 第一问：申请帮助真的让项目资源（经费）变多了吗 */
{const g=960;
scene('resource','teaching',A=>A.P(14),svg(gnd()+form('fm',C3c[0]-40,GND-250,260,'var(--g1)')+AR('a',C3c[0]+100,GND-250,g-260,GND-250,'var(--g1)',12)+gate3('g',g,280,GND)+
  coins('k0',g-140,GND,6,90)+coins('k1',g+140,GND,6,90)+Q('q0',g-140,GND-420,110,'var(--SU)')+school('s',C3c[2]+60,GND,240)),'c');}

/* 16 资源没变多：门槛两边经费一样 → 结果跳了也难算项目的 */
{const g=C2c[0];
scene('ifnot','teaching',A=>A.P(15),svg(gnd()+gate3('g',g,280,GND)+coins('k0',g-140,GND,6,90)+coins('k1',g+140,GND,6,90)+EQ('e',g,GND-380,110)+
  AR('a',C2[1]-60,GND-250,C2[1]+60,GND-250,'var(--g1)',12)+(()=>{const m={x:C2[1]+120,y:GND-500,w:500,h:420};return axes(m)+`<path d="M${UX(m,.5)} ${m.y} L${UX(m,.5)} ${m.y+m.h}" stroke="var(--SU)" stroke-width="6" stroke-dasharray="14 12"/>`+rd('l',m,.5,.26,F,AID,3)})()+M('x',C2c[1]+80,GND-560,110,false)),'u');}

/* 17 先查资源：门槛内经费多、参加的孩子多 → 再看结果 */
{const g=C2c[0];
scene('checked','record',A=>A.P(16),svg(gnd()+gate3('g',g,280,GND)+coins('k0',g-140,GND,11,90)+coins('k1',g+140,GND,5,90)+brace('b',g+250,GND-11*34-30,GND-5*34-30,'var(--MI)')+M('ok',g+370,GND-330,96,true)+
  ic('mg','magnifier',C2c[1]+120,GND-300,360,'var(--ink)')+heart('h',C2c[1]+70,GND-350,110)),'i');}

/* 18 因果链：资格 → 资源 → 结果（先接上第一环） */
scene('chain','schematic',A=>A.P(17),svg(gnd()+form('fm',C3c[0],GND-260,260,'var(--CR)')+coins('k',C3c[1]-70,GND-120,8,80)+school('s',C3c[1]+80,GND-120,170)+kid('kd',C3c[2]-40,300,FA)+heart('h',C3c[2]+110,GND-300,120)+
  AR('a0',C3c[0]+110,GND-260,C3c[1]-180,GND-260,'var(--MI)',14)+AR('a1',C3c[1]+190,GND-260,C3c[2]-120,GND-260,'var(--g2)',12)+
  L('l0',C3c[0],GND+80,'资格','var(--ink)',48)+L('l1',C3c[1],GND+80,'资源','var(--ink)',48)+L('l2',C3c[2],GND+80,'结果','var(--ink)',48)+M('ok',(C3c[0]+C3c[1])/2-30,GND-380,80,true)),'c');

/* 19 隐蔽的错：有资格 ≠ 多办了项目；多办了项目 ≠ 每个孩子都参加 */
scene('mistake2','teaching',A=>A.P(18),svg(gnd()+form('fm',C3c[0]-20,GND-250,240,'var(--CR)')+NE(C3c[0]+190,GND-250,96)+school('s',C3c[1]+40,GND,300)+NE(C3c[1]+260,GND-250,96)+
  kids('kd',C3c[2]+60,3,220,['var(--MI)','var(--g2)','var(--g2)'])),'u');

/* 20 结果：门槛附近，5–9 岁孩子与服务有关的死因死亡率下降（墓碑少了） */
{const g=960;
scene('result','record',A=>A.P(19),svg(gnd()+gate3('g',g,280,GND)+[0,1,2,3].map(i=>{const x=g-100-i*140;return i<2?tomb('t0'+i,x,GND,180,'var(--g2)'):`<path d="M${x-58} ${GND} L${x-58} ${GND-117} Q${x-58} ${GND-176} ${x} ${GND-176} Q${x+58} ${GND-176} ${x+58} ${GND-117} L${x+58} ${GND}" fill="none" stroke="var(--g2)" stroke-width="6" stroke-dasharray="14 10"/>`}).join('')+[0,1,2,3].map(i=>tomb('t1'+i,g+100+i*140,GND,180,'var(--g2)')).join('')+
  brace('b',g-620,GND-400,GND-400,'none')+pill('ag',X0+100,320,200,84,'5–9岁','var(--MI)','var(--INK)',48)+kid('kd',X0+40,230,FA)+kit('kt',X1-90,340,120)),'i');}

/* 21 为什么看这些死因、这个年龄段：真原因会留下有特点的脚印 */
scene('trace','schematic',A=>A.P(20),svg(gnd()+[0,1,2,3,4].map(i=>foot('f'+i,X0+80+i*150,GND-110-(i%2)*110,140,0)).join('')+school('s',X1-200,GND,300)+ic('mg','magnifier',1050,GND-340,300,'var(--ink)')),'c');

/* 22 四步推理 */
{const cw=328,ch=480,y0=GND-ch;
scene('steps','teaching',A=>A.P(21),svg([0,1,2,3].map(k=>tag(card('c'+k,C4[k],y0,cw,ch),{g:'card',a:'bottom'})+K.nodeOn('n'+k,C4[k]+56,y0+56,k+1)).join('')+
  kit('kt',C4c[0],GND-240,200)+heart('h',C4c[1],GND-320,130)+tomb('t',C4c[1]-70,GND-60,110,'var(--g2)')+tomb('t2',C4c[1]+70,GND-60,110,'var(--g2)')+M('hk',C4c[1]+90,GND-380,64,true)+
  kid('kd',C4c[2],300,FA)+pill('ag',C4c[2],y0+150,190,72,'5–9岁','var(--MI)','var(--INK)',44)+
  (()=>{const m={x:C4[3]+50,y:y0+130,w:cw-100,h:ch-190};return mbar('mb',m,[.35,.9,.9],[AID,'var(--g2)','var(--g2)'])})()),'u');}

/* 23 反过来：所有年龄、所有死因一起降 → 警惕普遍医疗改善或更大的变化 */
{const c=CF(296,1300),x=UX(c,.5);
scene('reverse','teaching',A=>A.P(22),svg(hchart('ax',c,'tomb')+gate3('g',x,c.y+8,GND-8)+[0,1,2].map(i=>rd('l'+i,c,.5,-.14,u=>.82-i*.22-.1*u,['var(--CO)','var(--SU)','var(--MI)'][i],i+3,.015)).join('')+
  storm('st',LEG,330,300,[])+hospital('hs',LEG,GND,210)),'i');}

/* 24 又查了：其他年龄、其他死因、其他联邦支出——门槛处都没跳 */
{const cw=448,ch=480,y0=GND-ch;
const mk=(k)=>{const m={x:C3[k]+50,y:y0+200,w:cw-100,h:ch-250};return axes(m)+`<path d="M${m.x+16} ${Math.round(m.y+m.h*.4)} L${m.x+m.w-10} ${Math.round(m.y+m.h*.55)}" stroke="var(--ink)" stroke-width="8" stroke-linecap="round"/><path d="M${UX(m,.5)} ${m.y} L${UX(m,.5)} ${m.y+m.h}" stroke="var(--SU)" stroke-width="6" stroke-dasharray="12 10"/>`};
scene('others','record',A=>A.P(23),svg([0,1,2].map(k=>tag(card('c'+k,C3[k],y0,cw,ch),{g:'card',a:'bottom'})+mk(k)+M('m'+k,C3[k]+cw-60,y0+60,80,true)).join('')+
  fb('ad',C3c[0]-60,y0+180,150,{shirt:'var(--g2)',shirtD:'var(--g1)'})+fb('od',C3c[0]+40,y0+180,140,{shirt:'#9FD3FF',shirtD:'#7FB8E8',hairStyle:1})+
  tomb('t',C3c[1],y0+180,120,'#9FD3FF')+bag('bg',C3c[2],y0+120,120)),'c');}

/* 25 每项检查各对付一个别的解释：医疗普遍改善 / 别的钱（和上一集的另一项补助一样） */
{const rows=[GND-430,GND-150];
scene('counter','schematic',A=>A.P(24),svg(hospital('hs',C3c[0],rows[0]+120,200)+bag('bg',C3c[0],rows[1],170)+coupon('cp',C3c[0]-150,rows[1]+10,120)+
  rows.map((y,i)=>AR('a'+i,C3c[0]+150,y,C3c[1]-120,y,'var(--g1)',12)).join('')+
  [0,1].map(i=>{const m={x:C3c[1]-100,y:rows[i]-80,w:220,h:160};return axes(m)+`<path d="M${UX(m,.5)} ${m.y} L${UX(m,.5)} ${m.y+m.h}" stroke="var(--SU)" stroke-width="6" stroke-dasharray="12 10"/><path d="M${m.x+10} ${m.y+60} L${m.x+m.w} ${m.y+90}" stroke="var(--ink)" stroke-width="8" stroke-linecap="round"/>`}).join('')+
  rows.map((y,i)=>M('x'+i,C3c[2],y,120,false)).join('')),'u');}

/* 26 模式比对：预测一整套（虚线模板），实际对上了 */
{const cw=686,ch=440,y0=GND-ch,cols=[AID,'var(--g2)','var(--g2)','var(--g2)'],pred=[.3,.8,.8,.8],act=[.32,.78,.82,.8];
scene('pattern','none',A=>A.P(25),K.term('term',1,160,'模式比对')+svg([0,1].map(k=>tag(card('c'+k,C2[k],y0,cw,ch),{g:'card',a:'bottom'})).join('')+
  mbar('p',{x:C2[0]+60,y:y0+60,w:cw-120,h:ch-120},pred,cols.map(c=>c==='var(--g2)'?'var(--g1)':c),true)+mbar('a',{x:C2[1]+60,y:y0+60,w:cw-120,h:ch-120},act,cols)+EQ('e',960,y0+ch/2,96)+M('ok',C2[1]+cw-60,y0+60,90,true)),'i');}

/* 27 预测越具体越难蒙混：四个条件全对上的只有学前班 */
{const cand=[['s'],['h'],['b'],['st']],xs=C4c,res=[[1,1,1,1],[1,0,0,1],[1,1,0,0],[1,0,0,0]];
scene('specific','schematic',A=>A.P(26),svg(gnd()+school('s',xs[0],GND,200)+hospital('hs',xs[1],GND,170)+bag('bg',xs[2],GND-90,180)+storm('st',xs[3],GND-110,280,[[xs[3],GND-80,GND-8]])+
  res.map((r,i)=>r.map((ok,j)=>ok?M('m'+i+j,xs[i],280+j*100,76,true):M('m'+i+j,xs[i],280+j*100,76,false)).join('')).join('')),'c');}

/* 28 没发现 ≠ 不存在 */
scene('nofind','schematic',A=>A.P(27),svg(gnd()+ic('mg','magnifier',C2c[0],GND-300,400,'var(--ink)')+NE(960,GND-300,140)+
  `<rect x="${C2c[1]-180}" y="${GND-480}" width="360" height="360" rx="32" fill="none" stroke="var(--g2)" stroke-width="10" stroke-dasharray="28 20"/>`+Q('q',C2c[1],GND-300,180,'var(--SU)')),'u');

/* 29 两种可能：对照指标本来就不会动（椅子）；资料太粗（几个点） */
{const cw=686,ch=480,y0=GND-ch;
scene('reasons','schematic',A=>A.P(28),svg([0,1].map(k=>tag(card('c'+k,C2[k],y0,cw,ch),{g:'card',a:'bottom'})+K.nodeOn('n'+k,C2[k]+64,y0+64,k+1)).join('')+chair('ch',C2c[0],GND-48,300,'var(--SU)',{})+
  (()=>{const m={x:C2[1]+80,y:y0+120,w:cw-160,h:ch-180};return axes(m)+[[.2,.7],[.45,.55],[.75,.35]].map(([u,v],i)=>dotg('d'+i,UX(m,u),Y(m,v),40,'var(--g2)')).join('')})()),'i');}

/* 30 更准确的说法：没发现相应证据 ✓，不是“别的解释为零” ✗ */
scene('accurate','schematic',A=>A.P(29),svg(gnd()+ic('mg','magnifier',C2c[0]-60,GND-300,340,'var(--ink)')+M('ok',C2c[0]+150,GND-480,120,true)+
  K.stext('z',C2c[1]-40,GND-160,'0',{anchor:'middle',fill:'var(--ink)',size:360,weight:700})+M('x',C2c[1]+140,GND-480,120,false)),'c');

/* 31 证据：项目资源让孩子更健康，围绕贫困门槛 */
{const c=CF(296,1380),x=UX(c,.5);
scene('evidence','record',A=>A.P(30),svg(hchart('ax',c)+gate3('g',x,c.y+8,GND-8)+rd('l',c)+brace('b',x+28,Y(c,F(.5)+J),Y(c,F(.5)),'var(--MI)')+coins('k',LEG-70,GND-260,6,60)+school('s',LEG+70,GND-260,130)+kid('kd',LEG,200,FA)),'u');}

/* 32 结论范围：主要是门槛附近的县；远处的县、每种服务各占多少都没直接回答 */
{const x0=X0,x1=X1,n=10,g=(cx_(x0,x1,n,4)+cx_(x0,x1,n,5))/2;
scene('scope','record',A=>A.P(31),svg(gnd()+`<rect x="${cx_(x0,x1,n,3)-80}" y="${GND-330}" width="${cx_(x0,x1,n,6)-cx_(x0,x1,n,3)+160}" height="300" rx="32" fill="none" stroke="var(--MI)" stroke-width="8"/>`+crow('cr',x0,x1,GND-180,n,5,112)+gate3('g',g,300,GND)+
  M('ok',g+260,GND-330,80,true)+Q('q0',cx_(x0,x1,n,1),GND-360,100,'var(--SU)')+Q('q1',cx_(x0,x1,n,8),GND-360,100,'var(--SU)')),'i');}

/* 33 收尾：规则 → 资源 → 结果 → 排查 */
{const xs=C4c;
scene('close','none',A=>A.P(32),svg(gnd()+county('ct',xs[0]-60,GND-150,140,HOT[0])+pill('p3',xs[0]-60,GND-270,140,64,'300','var(--SU)','var(--INK)',40)+form('fm',xs[0]+80,GND-130,170,'var(--CR)')+coins('k',xs[1],GND,9,80)+kid('kd',xs[2]-30,280,FA)+heart('h',xs[2]+80,GND-330,100)+ic('mg','magnifier',xs[3],GND-220,240,'var(--ink)')+
  [0,1,2].map(i=>AR('a'+i,xs[i]+120,GND-460,xs[i+1]-100,GND-460,'var(--MI)',12)).join('')+[0,1,2,3].map(i=>K.nodeOn('n'+i,xs[i],GND-460,i+1)).join('')),'c');}

Object.assign(REV,{"hook": [["#a", 0, "贫困线"], ["#qh", 0, "为什么", "pop"]], "program": [["#ps", 1, "这个项目", "pop"], ["#bl", 1, "学前教育", "pop"], ["#kt", 1, "健康支持", "pop"]], "direct": [["#vs", 2, "直接比较", "pop"], ["#k1", 2, "没参加", "pop"]], "who": [["#pr", 3, "知道有", "pop"], ["#fm", 3, "愿意报名", "pop"], ["#pin", 3, "附近", "pop"]], "affect": [["#q0", 4, "更注意", "pop"], ["#w", 4, "最困难", "pop"], ["#q1", 4, "有害", "pop"]], "selection": [["#ch", 5, "选择威胁", "pop"], ["#x", 5, "更清楚", "pop"]], "rule": [["#cal,#y", 6, "一九六五年", "pop"], ["#a0", 6, "三百个县"], ["#fm", 6, "申请项目", "pop"]], "two": [["#n0", 7, "两点", "pop"]], "point1": [["#fm", 8, "申请上的帮助", "pop"], ["#l1", 8, "三百个县以外", "pop"]], "point2": [["#ok", 9, "按县定", "pop"], ["#x", 9, "不是一个个孩子", "pop"]], "rank": [["#p0,#p1", 10, "三百名以内", "pop"], ["#f0", 10, "前者", "pop"], ["#x", 10, "后者没有", "pop"]], "rdd": [["#t0", 11, "分派变项", "pop"], ["#t1", 11, "选取标准", "pop"], ["#l", 11, "突然不同", "draw"], ["#b", 11, "最值得怀疑", "pop"]], "noparent": [["#ok", 12, "清清楚楚", "pop"], ["#x", 12, "不是家长", "pop"]], "gap": [["#q", 13, "好几步", "pop"]], "resource": [["#q0", 14, "真的", "pop"]], "ifnot": [["#e", 15, "没变多", "pop"], ["#x", 15, "很难说", "pop"]], "checked": [["#b", 16, "资源确实变了", "pop"], ["#ok", 16, "确实", "pop"], ["#h", 16, "孩子的结果", "pop"]], "chain": [["#l0", 17, "资格、资源", "pop"], ["#l1", 17, "资源、结果", "pop"], ["#l2", 17, "结果，是三件", "pop"], ["#a0", 17, "资格得先变成"], ["#a1", 17, "资源才有可能"], ["#ok", 17, "必须确认", "pop"]], "mistake2": [["#kd", 18, "每个孩子", "pop"]], "result": [["#ag", 19, "五到九岁", "pop"], ["#kt", 19, "健康服务", "pop"]], "trace": [["#f0,#f1,#f2", 20, "偏偏", "pop"], ["#mg", 20, "痕迹", "pop"]], "steps": [["#n0", 21, "第一", "pop"], ["#n1", 21, "第二", "pop"], ["#n2", 21, "第三", "pop"], ["#n3", 21, "第四", "pop"]], "reverse": [["#hs", 22, "医疗条件", "pop"], ["#st", 22, "更大的变化", "pop"]], "others": [["#m0", 23, "其他年龄组", "pop"], ["#m1", 23, "其他死因", "pop"], ["#m2", 23, "联邦支出", "pop"]], "counter": [["#x0", 24, "普遍的健康改善", "pop"], ["#x1", 24, "别的钱", "pop"], ["#cp", 24, "另一项补助", "pop"]], "pattern": [["#e", 25, "对不对得上", "pop"], ["#ok", 25, "对不对得上", "pop", 0.6]], "specific": [["#st", 26, "很多原因", "pop"]], "nofind": [["#q", 27, "不等于", "pop"]], "reasons": [["#ch", 28, "不会变化", "pop"], ["#d0,#d1,#d2", 28, "不够细", "pop"]], "accurate": [["#ok", 29, "没有发现", "pop"], ["#x", 29, "证明为零", "pop"]], "evidence": [["#b", 30, "改善了", "pop"], ["#kd", 30, "孩子的健康", "pop"]], "scope": [["#ok", 31, "门槛附近", "pop"], ["#q0", 31, "所有地区", "pop"], ["#q1", 31, "某一种服务", "pop"]], "close": [["#n0", 32, "规则出发", "pop"], ["#n1", 32, "资源真的变了", "pop"], ["#n2", 32, "作用方式", "pop"], ["#n3", 32, "排查", "pop"]]});
window.SCENES=S;
})();
