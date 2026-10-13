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

/* ===== 第07集 实物元素 =====
   抽签 = 摇奖箱（转笼+彩球+摇把）；申请机会 = 黄色“申请”票；保险 = 蓝色十字盾牌（空心虚线 = 没有保险）；
   中签者 = 黄衣人，未中签者 = 紫衣人；组 = 圆角框（黄框 = 中签组，灰框 = 未中签组）；申请 = 写字板；资格审核 = 红色印章；
   健康 = 心电红心（灰 = 身体较差）；积极性 = 电池；随机波动 = 骰子；规则 = 规则书；汇总 = 投票箱；
   看病 = 诊所；医疗支出 = 账单；自报健康 = 问卷（写字板+红心）；临床指标 = 试管；心情 = 太阳。 */
const OL=' stroke="#151433" stroke-opacity=".35" stroke-width="6" stroke-linejoin="round"';
const WIN='var(--SU)',WIND='var(--SUD)',LOS='#B794FF',LOSD='#9A72F0',SHC='#4FA3FF';
const ticket=(id,cx,cy,w,lab='申请',col='var(--SU)')=>{const h=Math.round(w*.5),x=cx-w/2,y=cy-h/2,r=h*.18;return `<g id="${id}"><path d="M${x} ${y} H${x+w} V${cy-r} A${r} ${r} 0 0 0 ${x+w} ${cy+r} V${y+h} H${x} V${cy+r} A${r} ${r} 0 0 0 ${x} ${cy-r}Z" fill="${col}"${OL}/><path d="M${x+w*.72} ${y+8} V${y+h-8}" stroke="var(--INK)" stroke-opacity=".4" stroke-width="5" stroke-dasharray="10 8"/>`+K.stext(id+'t',x+w*.36,cy+h*.17,lab,{anchor:'middle',fill:'var(--INK)',size:Math.max(28,Math.round(h*.42)),weight:700})+`</g>`};
const shield=(id,cx,cy,s,full=true)=>{const k=s/100;const d='M0 -50 L42 -34 L42 2 Q42 34 0 54 Q-42 34 -42 2 L-42 -34Z';return `<g id="${id}"><g transform="translate(${cx} ${cy}) scale(${k.toFixed(3)})">`+(full?`<path d="${d}" fill="${SHC}" stroke="#151433" stroke-opacity=".4" stroke-width="5" stroke-linejoin="round"/><rect x="-8" y="-26" width="16" height="50" rx="4" fill="var(--CR)"/><rect x="-24" y="-9" width="48" height="16" rx="4" fill="var(--CR)"/>`:`<path d="${d}" fill="none" stroke="${SHC}" stroke-width="7" stroke-dasharray="12 9" stroke-linejoin="round"/>`)+`</g></g>`};
const drum=(id,cx,bottom,h)=>{const k=h/300;const balls=[[-50,-110,'var(--CO)'],[-12,-96,'var(--SU)'],[26,-108,'var(--MI)'],[56,-132,LOS],[-34,-148,'#4FA3FF'],[10,-140,'var(--CO)']];return `<g id="${id}"><g transform="translate(${cx} ${bottom}) scale(${k.toFixed(4)})"><path d="M-70 0 L-20 -170 L-4 -170 L-50 0Z M70 0 L20 -170 L4 -170 L50 0Z" fill="#8A5326"/><rect x="-110" y="-14" width="220" height="14" rx="7" fill="#8A5326"/>
 <circle cx="0" cy="-180" r="106" fill="var(--CR)"${OL}/>${[0,45,90,135].map(a=>`<path d="M${(-106*Math.cos(a*Math.PI/180)).toFixed(1)} ${(-180-106*Math.sin(a*Math.PI/180)).toFixed(1)} L${(106*Math.cos(a*Math.PI/180)).toFixed(1)} ${(-180+106*Math.sin(a*Math.PI/180)).toFixed(1)}" stroke="var(--CRS)" stroke-width="6"/>`).join('')}
 ${balls.map(([x,y,c])=>`<circle cx="${x}" cy="${y}" r="20" fill="${c}"/>`).join('')}<circle cx="0" cy="-180" r="16" fill="#8A5326"/><path d="M0 -180 L130 -230" stroke="#8A5326" stroke-width="14" stroke-linecap="round"/><rect x="118" y="-262" width="26" height="54" rx="12" fill="var(--CO)"/></g></g>`};
const stamp=(id,cx,cy,s)=>{const k=s/100;return `<g id="${id}"><g transform="translate(${cx} ${cy}) scale(${k})"><circle cx="0" cy="-54" r="24" fill="#8A5326"/><rect x="-12" y="-40" width="24" height="34" fill="#8A5326"/><rect x="-46" y="-8" width="92" height="30" rx="8" fill="var(--CO)"${OL}/><rect x="-52" y="22" width="104" height="14" rx="5" fill="var(--COD)"/></g></g>`};
const battery=(id,cx,cy,s,lv=1)=>{const k=s/100;const n=lv>=.6?3:1,col=lv>=.6?'var(--MI)':'var(--CO)';return `<g id="${id}"><g transform="translate(${cx} ${cy}) scale(${k})"><rect x="-46" y="-26" width="86" height="52" rx="10" fill="var(--CR)"${OL}/><rect x="42" y="-12" width="10" height="24" rx="4" fill="var(--g2)"/>${[0,1,2].map(i=>i<n?`<rect x="${-38+i*26}" y="-18" width="20" height="36" rx="4" fill="${col}"/>`:'').join('')}</g></g>`};
const book=(id,cx,cy,s)=>{const k=s/100;return `<g id="${id}"><g transform="translate(${cx} ${cy}) scale(${k})"><rect x="-44" y="-56" width="88" height="112" rx="8" fill="var(--CO)"${OL}/><rect x="-44" y="-56" width="16" height="112" rx="6" fill="var(--COD)"/><rect x="-14" y="-34" width="46" height="26" rx="4" fill="var(--CR)"/><path d="M20 56 L20 76 L28 68 L36 76 L36 56Z" fill="var(--SU)"/></g></g>`};
const box=(id,cx,bottom,s,col='#4FA3FF')=>{const k=s/100;return `<g id="${id}"><g transform="translate(${cx} ${bottom}) scale(${k})"><rect x="-26" y="-150" width="52" height="60" rx="4" fill="var(--CR)"${OL}/><rect x="-16" y="-136" width="32" height="6" rx="3" fill="var(--CRS)"/><rect x="-64" y="-104" width="128" height="104" rx="8" fill="${col}"${OL}/><rect x="-72" y="-118" width="144" height="22" rx="6" fill="#2F6FD0"/><rect x="-32" y="-112" width="64" height="8" rx="4" fill="var(--INK)"/><rect x="-30" y="-70" width="60" height="34" rx="6" fill="var(--CR)"/></g></g>`};
const sun=(id,cx,cy,s)=>{const k=s/100;let r='';for(let i=0;i<8;i++){const a=i*Math.PI/4;r+=`<path d="M${(46*Math.cos(a)).toFixed(1)} ${(46*Math.sin(a)).toFixed(1)} L${(62*Math.cos(a)).toFixed(1)} ${(62*Math.sin(a)).toFixed(1)}" stroke="var(--SU)" stroke-width="10" stroke-linecap="round"/>`}return `<g id="${id}"><g transform="translate(${cx} ${cy}) scale(${k})">${r}<circle r="34" fill="var(--SU)"${OL}/></g></g>`};
const bill=(id,cx,cy,s)=>{const k=s/100;let z='';for(let i=0;i<6;i++)z+=` L${-40+i*16+8} 62 L${-40+(i+1)*16} 54`;return `<g id="${id}"><g transform="translate(${cx} ${cy}) scale(${k})"><path d="M-40 -60 L56 -60 L56 54 L48 62 L40 54 L32 62 L24 54 L16 62 L8 54 L0 62 L-8 54 L-16 62 L-24 54 L-32 62 L-40 54Z" fill="var(--CR)"${OL}/><text x="-8" y="-12" text-anchor="middle" style="fill:var(--CO);font-size:44px;font-weight:700">$</text><rect x="16" y="-38" width="28" height="10" rx="5" fill="var(--CRS)"/><rect x="-28" y="12" width="72" height="10" rx="5" fill="var(--CRS)"/><rect x="-28" y="32" width="50" height="10" rx="5" fill="var(--CRS)"/></g></g>`};
const tube=(id,cx,cy,s)=>{const k=s/100;return `<g id="${id}"><g transform="translate(${cx} ${cy}) scale(${k})"><rect x="-30" y="-70" width="60" height="14" rx="6" fill="var(--g2)"/><path d="M-22 -56 L-22 40 Q-22 66 0 66 Q22 66 22 40 L22 -56Z" fill="var(--CR)"${OL}/><path d="M-19.5 6 Q0 15 19.5 6 L19.5 40 Q19.5 63.5 0 63.5 Q-19.5 63.5 -19.5 40Z" fill="#E5322B" fill-opacity=".78"/><path d="M-19.5 6 Q0 15 19.5 6" fill="none" stroke="#B3221C" stroke-width="2.5"/><circle cx="-6" cy="34" r="3" fill="#FFFFFF" fill-opacity=".7"/><circle cx="7" cy="48" r="2.2" fill="#FFFFFF" fill-opacity=".7"/><rect x="-15" y="-48" width="5" height="78" rx="2.5" fill="#FFFFFF" fill-opacity=".55"/></g></g>`};
const quest=(id,cx,cy,h)=>form(id,cx,cy,h,'var(--CR)')+heart(id+'h',cx-h*.18,cy-h*.62,h*.34);
/* 人：黄衣=中签，紫衣=未中签；ins=头顶盾牌（true 实心 / false 空心 / null 不画） */
const ZC=z=>z?{shirt:WIN,shirtD:WIND}:{shirt:LOS,shirtD:LOSD};
const per=(id,cx,h,z,ins=null,o={})=>`<g id="${id}">`+fb(id+'f',cx,GND,h,{...ZC(z),hairStyle:o.hs??0})+(ins===null?'':shield(id+'s',cx,GND-h-h*.2,h*.26,ins))+`</g>`;
const perAt=(id,cx,gy,h,z,ins=null,hs=0)=>`<g id="${id}">`+fb(id+'f',cx,gy,h,{...ZC(z),hairStyle:hs})+(ins===null?'':shield(id+'s',cx,gy-h-h*.2,h*.26,ins))+`</g>`;
/* 组框：x,y,w,h；z=1 黄框；z=0 灰框；lab 顶部标签 */
const frame=(id,x,y,w,h,col,lab,fg='var(--INK)')=>`<g id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="32" fill="none" stroke="${col}" stroke-width="9"/>`+(lab?pill(id+'l',x+w/2,y,Math.max(150,lab.length*52+60),72,lab,col,fg,44):'')+`</g>`;
const row=(id,x0,x1,gy,h,specs)=>specs.map((s,i)=>perAt(id+i,Math.round(x0+(x1-x0)*(i+.5)/specs.length),gy,h,s[0],s[1]??null,i%2)).join('');
const vbar=(id,x,w,gy,h,col,lab,dash=false,size=48)=>`<g id="${id}">`+(dash?`<rect x="${x}" y="${gy-h}" width="${w}" height="${h}" rx="14" fill="none" stroke="${col}" stroke-width="7" stroke-dasharray="16 12"/>`:`<rect x="${x}" y="${gy-h}" width="${w}" height="${h}" rx="14" fill="${col}"/>`)+(lab?L(id+'l',x+w/2,gy-h-24,lab,'var(--ink)',size):'')+`</g>`;
const ARW2=(id,x1,y1,x2,y2,c='var(--g1)')=>AR(id,x1,y1,x2,y2,c,12);
const DASH=(id,x1,y1,x2,y2,c='var(--g2)')=>`<path id="${id}" d="M${x1} ${y1} L${x2} ${y2}" stroke="${c}" stroke-width="8" stroke-dasharray="18 14" stroke-linecap="round"/>`;
const slot=(id,cx,cy,s)=>`<g id="${id}"><rect x="${cx-s/2}" y="${cy-s/2}" width="${s}" height="${s}" rx="24" fill="none" stroke="var(--g2)" stroke-width="8" stroke-dasharray="22 16"/>`+Q(id+'q',cx,cy-6,s*.5,'var(--SU)')+`</g>`;
const mag=(id,cx,cy,s,col='var(--ink)')=>{const r=s*.3;return `<g id="${id}"><circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${col}" stroke-width="${s*.08}"/><path d="M${cx+r*.72} ${cy+r*.72} L${cx+r*1.75} ${cy+r*1.75}" stroke="${col}" stroke-width="${s*.11}" stroke-linecap="round"/></g>`};

const Z1=(x,y,w,h)=>frame('fz1',x,y,w,h,WIN,'中签'),Z0=(x,y,w,h)=>frame('fz0',x,y,w,h,'var(--g2)','未中签','var(--CR)');
const GY=GND-24;

/* 01 开场：抽签是随机的，最后还是可能比错 */
scene('hook','teaching',A=>A.P(0),svg(gnd()+drum('dr',C3c[0]-60,GND,380)+ARW2('a',C3c[0]+150,GND-200,700,GND-200)+
  frame('f1',730,440,440,420,WIN,'中签')+frame('f0',1218,440,440,420,'var(--g2)','未中签','var(--CR)')+
  row('p',730,1170,GY,220,[[1,true],[1,false],[1,true]])+row('q',1218,1658,GY,220,[[0,false],[0,true],[0,false]])+Q('qq',1194,300,110,'var(--SU)')),'i');

/* 02 抽中的是申请机会（票），不是保险（空心盾牌） */
scene('ticket','record',A=>A.P(1),svg(gnd()+fb('p',C3c[0]-20,GND,380,ZC(1))+ticket('tk',C3c[0]+190,GND-250,240)+NE(960,GND-260,150)+
  shield('sh',C3c[2]+20,GND-280,320,false)+Q('q',C3c[2]+20,GND-290,130,'var(--SU)')),'u');

/* 03 中签以后还有好几步：申请 → 资格审核 → 保险；有人停在申请前，有人没通过审核 */
{const y=330,xs=C4c;
scene('steps','record',A=>A.P(2),svg(gnd()+ticket('tk',xs[0],y,220)+form('fm',xs[1],y,200)+stamp('st',xs[2],y+20,170)+shield('sh',xs[3],y,210,true)+
  [0,1,2].map(i=>ARW2('a'+i,xs[i]+120,y,xs[i+1]-110,y)).join('')+L('l1',xs[1],y+170,'申请')+L('l2',xs[2],y+170,'资格审核')+
  perAt('pb',xs[1],GND,240,1,null,1)+M('xb',xs[1]+90,GND-250,90,false)+perAt('pc',xs[2],GND,240,1,null,0)+M('xc',xs[2]+90,GND-250,90,false)+perAt('pa',xs[3],GND,240,1)+M('ok',xs[3]+90,GND-250,90,true)+
  perAt('p0',xs[0],GND,240,1)),'c');}

/* 04 只挑真正参保的人比：抽签分好的两组被重新拆开 */
{const fy=430,fh=430;
scene('regroup','teaching',A=>A.P(3),svg(gnd()+frame('f1',262,fy,300,fh,WIN,'中签')+frame('f0',580,fy,300,fh,'var(--g2)','未中签','var(--CR)')+
  row('a',262,562,GY,190,[[1,true],[1,false],[1,true]])+row('b',580,880,GY,190,[[0,false],[0,true],[0,false]])+ARW2('ar',900,GND-220,1018,GND-220,'var(--CO)')+
  frame('g1',1040,fy,300,fh,SHC,'参保')+frame('g0',1358,fy,300,fh,'var(--g2)','未参保','var(--CR)')+
  row('c',1040,1340,GY,190,[[1,true],[1,true],[0,true]])+row('d',1358,1658,GY,190,[[1,false],[0,false],[0,false]])+M('x',1500,300,100,false)),'i');}

/* 05 2008 年俄勒冈：等待名单 → 抽签 → 申请机会 */
scene('oregon','record',A=>A.P(4),svg(gnd()+ic('cal','calendar',C3c[0]-80,300,120,'var(--g1)')+L('y',C3c[0]+90,322,'2008','var(--ink)',64)+pill('st',C3c[1]+20,300,240,84,'俄勒冈','var(--SU)','var(--INK)',48)+
  form('wl',C3c[0]-40,GND-200,280)+grp('q',C3c[1]-10,3,230,{shirt:'var(--g2)',shirtD:'var(--g1)'},110)+ARW2('a',C3c[1]+180,GND-200,C3c[2]-200,GND-200)+
  drum('dr',C3c[2]-60,GND,340)+ticket('tk',C3c[2]+120,GND-470,170)),'u');

/* 06 抽签有什么用：四步 */
{const cw=328,ch=520,y0=GND-ch;const cc=k=>C4c[k];
scene('why','teaching',A=>A.P(5),svg([0,1,2,3].map(k=>tag(card('c'+k,C4[k],y0,cw,ch),{g:'card',a:'bottom'})+K.nodeOn('n'+k,C4[k]+56,y0+56,k+1)).join('')+
  drum('dr',cc(0),y0+330,230)+heart('h0',cc(0)-70,y0+430,70)+battery('b0',cc(0)+70,y0+430,70,.3)+M('x0',cc(0),y0+430,60,false)+
  perAt('pa',cc(1)-70,GND-30,210,0,null,0)+perAt('pb',cc(1)+70,GND-30,210,0,null,1)+heart('ha',cc(1)-70,y0+150,64)+heart('hb',cc(1)+70,y0+150,64,'var(--g2)')+ic('da','die',cc(1)-70,y0+240,56,'var(--SU)')+ic('db','die',cc(1)+70,y0+240,56,'var(--SU)')+
  [0,1].map(j=>[0,1,2].map(i=>heart('hm'+j+i,cc(2)-95+j*190,y0+170+i*110,74,i==1&&j==0||i==2&&j==1?'var(--g2)':'var(--CO)')).join('')).join('')+K.stext('ap',cc(2),y0+300,'≈',{anchor:'middle',fill:'var(--ink)',size:72,weight:700})+
  vbar('v1',cc(3)-90,70,GND-40,250,WIN)+vbar('v0',cc(3)+10,70,GND-40,230,LOS)+ic('dd','die',cc(3),y0+130,72,'var(--SU)')),'c');}

/* 07 前提：规则合理 + 照规则执行；仍可能有偶然差别 */
{const cw=448,ch=500,y0=GND-ch;
scene('rule','teaching',A=>A.P(6),svg([0,1,2].map(k=>tag(card('c'+k,C3[k],y0,cw,ch),{g:'card',a:'bottom'})+K.nodeOn('n'+k,C3[k]+60,y0+60,k+1)).join('')+
  book('bk',C3c[0],y0+220,220)+M('m0',C3c[0]+130,y0+120,80,true)+drum('dr',C3c[1]-70,y0+360,240)+form('lg',C3c[1]+120,y0+250,150)+M('m1',C3c[1]+150,y0+120,80,true)+
  vbar('v1',C3c[2]-110,90,GND-100,240,WIN)+vbar('v0',C3c[2]+20,90,GND-100,210,LOS)+ic('di','die',C3c[2]+150,y0+130,80,'var(--SU)')+
  ['规则','照做','偶然'].map((t,k)=>L('lb'+k,C3c[k],GND-20,t,'var(--ink)',44)).join('')),'i');}

/* 08 随机分出去的只是申请机会：中签≠一定参保；没中签≠一定没保险 */
{const fy=400,fh=460;
scene('cross','record',A=>A.P(7),svg(gnd()+frame('f1',C2[0],fy,686,fh,WIN,'中签')+frame('f0',C2[1],fy,686,fh,'var(--g2)','未中签','var(--CR)')+
  row('a',C2[0],C2[0]+686,GY,250,[[1,true],[1,false],[1,true]])+row('b',C2[1],C2[1]+686,GY,250,[[0,false],[0,true],[0,false]])+
  M('xa',C2c[0]+90,GND-300,80,false)+mcard('mc',C2c[1]+120,GND-330,110)),'u');}

/* 09 论文：中签让有保险的概率提高约 25 个百分点 */
{const b0=620,b1=1000,bw=240;
scene('rate','record',A=>A.P(8),svg(gnd()+shield('ax',400,300,140,true)+`<rect x="400" y="380" width="6" height="${GND-380}" fill="var(--g2)"/>`+
  vbar('r0',b0,bw,GND,240,LOS)+vbar('r1',b1,bw,GND,470,WIN)+Q('q0',b0+bw/2,GND-300,80,'var(--g1)')+Q('q1',b1+bw/2,GND-530,80,'var(--g1)')+
  `<path d="M${b0+bw} ${GND-240} L${b1+bw+60} ${GND-240}" stroke="var(--g2)" stroke-width="5" stroke-dasharray="12 10"/>`+brace('br',b1+bw+40,GND-470,GND-240,'var(--CO)')+
  pill('pp',1480,GND-355,260,96,'+25','var(--CO)','var(--CR)',60)+L('pl',1480,GND-230,'百分点','var(--ink)',48)+
  K.stext('t1',b1+bw/2,GND-50,'中签',{anchor:'middle',fill:'var(--INK)',size:44,weight:700})+K.stext('t0',b0+bw/2,GND-50,'未中签',{anchor:'middle',fill:'var(--INK)',size:44,weight:700})),'c');}

/* 10 读法：概率差，不是“中签的人只有四分之一参保”；假设 10% 与 35% */
{const top=240,H=GND-top,yv=v=>GND-H*v/100,b0=520,b1=820,bw=220;
scene('diff','teaching',A=>A.P(9),svg(gnd()+`<rect x="400" y="${top}" width="6" height="${H}" fill="var(--g2)"/>`+[0,50,100].map(v=>`<rect x="384" y="${yv(v)-3}" width="22" height="6" fill="var(--g2)"/>`+K.stext('tk'+v,370,yv(v)+14,v+'%',{anchor:'end',fill:'var(--g1)',size:36,weight:700})).join('')+
  vbar('r0',b0,bw,GND,H*.10,LOS,'10%')+vbar('r1',b1,bw,GND,H*.35,WIN,'35%')+`<path d="M${b0} ${yv(10)} L${b1+bw+50} ${yv(10)}" stroke="var(--g1)" stroke-width="5" stroke-dasharray="12 10"/>`+brace('br',b1+bw+30,yv(35),yv(10),'var(--MI)')+L('d',b1+bw+130,(yv(35)+yv(10))/2+18,'25','var(--MI)',72)+
  pill('wr',1420,360,320,90,'中签组25%','var(--g3)','var(--ink)',44)+M('x',1590,310,90,false)+pill('ok',1420,560,320,90,'35−10=25','var(--MI)','var(--INK)',44)+M('ok2',1590,510,90,true)),'i');}

/* 11 没参保的人，为什么还算在中签组？ */
scene('why2','teaching',A=>A.P(10),svg(gnd()+frame('f1',420,380,700,480,WIN,'中签')+row('a',420,1120,GY,280,[[1,true],[1,false],[1,true]])+Q('q',770,330,0)+Q('qq',880,GND-380,100,'var(--CO)')+
  ARW2('ar',1150,GND-180,1320,GND-180)+box('bx',1490,GND,220)),'u');

/* 12 回答的问题：给一个人申请机会，整体会怎样 */
scene('itt','teaching',A=>A.P(11),svg(gnd()+ticket('tk',C3c[0]-40,GND-300,300)+ARW2('a0',C3c[0]+130,GND-300,C3c[1]-250,GND-300)+
  frame('f1',C3c[1]-230,400,480,460,WIN,'中签')+row('p',C3c[1]-230,C3c[1]+250,GY,220,[[1,true],[1,false],[1,false],[1,true]])+
  ARW2('a1',C3c[1]+280,GND-200,C3c[2]-80,GND-200)+box('bx',C3c[2]+60,GND,200)+heart('h',C3c[2]+60,GND-420,120)),'c');

/* 13 有人用有人不用，都属于这项安排；再办一次也一样；删掉没用的人 = 换了问题 */
{const cw=448,ch=560,y0=GND-ch;
const cardIn=(k,del)=>{const x=C3[k],c=C3c[k],bx=c,by=y0+230;return tag(card('c'+k,x,y0,cw,ch),{g:'card',a:'bottom'})+K.nodeOn('n'+k,x+60,y0+60,k+1)+box('bx'+k,bx,by+30,110)+
  perAt('pa'+k,c-100,GND-30,200,1,true,0)+(del?`<g opacity=".25">${perAt('pb'+k,c+100,GND-30,200,1,false,1)}</g>`+M('x'+k,c+100,GND-150,90,false):perAt('pb'+k,c+100,GND-30,200,1,false,1))+
  ARW2('a'+k,c-90,GND-290,bx-30,by+20,'var(--g1)')+(del?'':ARW2('b'+k,c+90,GND-290,bx+30,by+20,'var(--g1)'))};
scene('use','teaching',A=>A.P(12),svg(cardIn(0,false)+cardIn(1,false)+ic('cal','calendar',C3c[1]+150,y0+70,80,'var(--g1)')+cardIn(2,true)),'i');}

/* 14 意向处理分析 ITT：当初分到哪组就算哪组 */
{const fy=440,fh=420;
scene('term','none',A=>A.P(13),K.term('term',1,160,'意向处理分析')+svg(gnd()+pill('itt',1460,190,200,90,'ITT','var(--CO)','var(--CR)',56)+frame('f1',C2[0],fy,686,fh,WIN,'中签')+frame('f0',C2[1],fy,686,fh,'var(--g2)','未中签','var(--CR)')+
  row('a',C2[0],C2[0]+686,GY,230,[[1,true],[1,false],[1,true],[1,false]])+row('b',C2[1],C2[1]+686,GY,230,[[0,false],[0,true],[0,false],[0,false]])),'c');}

/* 15 ITT 为什么可靠：两组都是抽签分的，一开始就差不多；还要查失访、测量方式 */
{const fy=430,fh=430;
scene('reliable','teaching',A=>A.P(14),svg(gnd()+drum('dr',C3c[0]-80,GND,330)+frame('f1',650,fy,440,fh,WIN,'中签')+frame('f0',1218,fy,440,fh,'var(--g2)','未中签','var(--CR)')+EQ('e',1154,GND-220,90)+
  row('a',650,1090,GY,210,[[1],[1],[1]])+row('b',1218,1658,GY,210,[[0],[0],[0]])+
  [0,1,2].map(i=>heart('ha'+i,650+440*(i+.5)/3,GY-260,60,i==1?'var(--g2)':'var(--CO)')+heart('hb'+i,1218+440*(i+.5)/3,GY-260,60,i==2?'var(--g2)':'var(--CO)')).join('')+
  mag('mg',C3c[0]-180,270,130)+form('ms',C3c[0]+20,280,120)+L('l0',C3c[0]-160,410,'失访','var(--ink)',40)+L('l1',C3c[0]+20,410,'测量','var(--ink)',40)),'u');}

/* 16 局限：估计的是“申请机会”的效果，不是“保险”的效果；两边交叉，被冲淡 */
{const fy=480,fh=380;
scene('limit','teaching',A=>A.P(15),svg(gnd()+ticket('tk',C2c[0]-70,290,240)+M('ok',C2c[0]+110,240,90,true)+shield('sh',C2c[1]-60,290,170,true)+Q('q',C2c[1]+80,290,110,'var(--SU)')+
  frame('f1',C2[0],fy,686,fh,WIN,'中签')+frame('f0',C2[1],fy,686,fh,'var(--g2)','未中签','var(--CR)')+
  row('a',C2[0],C2[0]+686,GY,200,[[1,true],[1,false],[1,false],[1,true]])+row('b',C2[1],C2[1]+686,GY,200,[[0,false],[0,true],[0,false],[0,false]])),'i');}

/* 17 为什么不直接比参保与未参保的人？ */
{const fy=420,fh=440;
scene('direct','teaching',A=>A.P(16),svg(gnd()+frame('g1',C2[0],fy,620,fh,SHC,'参保')+frame('g0',C2[1]+66,fy,620,fh,'var(--g2)','未参保','var(--CR)')+
  row('a',C2[0],C2[0]+620,GY,240,[[1,true],[0,true],[1,true]])+row('b',C2[1]+66,1658,GY,240,[[1,false],[0,false],[0,false]])+
  K.stext('vs',960,GND-260,'VS',{anchor:'middle',fill:'var(--ink)',size:72,weight:700})+Q('q',960,300,120,'var(--SU)')),'c');}

/* 18 假设：身体差的人更愿意办；会办手续的人更容易办成 */
{const cw=686,ch=520,y0=GND-ch;
scene('select','teaching',A=>A.P(17),svg([0,1].map(k=>tag(card('c'+k,C2[k],y0,cw,ch),{g:'card',a:'bottom'})+K.nodeOn('n'+k,C2[k]+60,y0+60,k+1)).join('')+
  perAt('p0',C2[0]+170,GND-30,320,1,null,0)+heart('h0',C2[0]+170,y0+90,90,'var(--g2)')+ARW2('a0',C2[0]+290,GND-220,C2[0]+420,GND-220)+form('f0',C2[0]+530,GND-220,230)+
  perAt('p1',C2[1]+140,GND-30,320,1,null,1)+form('f1',C2[1]+240,GND-170,120)+ARW2('a1',C2[1]+300,GND-220,C2[1]+380,GND-220)+stamp('st',C2[1]+450,GND-230,110)+M('mk',C2[1]+450,GND-370,70,true)+shield('sh',C2[1]+590,GND-230,150,true)),'u');}

/* 19 这些特点本身影响看病、支出、健康：① 身体差 → 看病多、花钱多；② 会办手续 → 更会照顾自己 */
{const cw=686,ch=520,y0=GND-ch;
scene('affect','teaching',A=>A.P(18),svg([0,1].map(k=>tag(card('c'+k,C2[k],y0,cw,ch),{g:'card',a:'bottom'})+K.nodeOn('n'+k,C2[k]+60,y0+60,k+1)).join('')+
  heart('h0',C2[0]+140,y0+260,150,'var(--g2)')+ARW2('a0',C2[0]+228,y0+260,C2[0]+300,y0+260)+clinic('cl',C2[0]+440,y0+370,190)+bill('bl',C2[0]+626,y0+290,96)+
  form('fm',C2[1]+140,y0+270,220)+ARW2('a1',C2[1]+260,y0+270,C2[1]+360,y0+270)+heart('h1',C2[1]+500,y0+270,190)+M('mk',C2[1]+610,y0+150,80,true)),'c');}

/* 20 一步一步：参保与否本就不同 → 影响结果 → 差别里混进原有差异 = 选择问题 */
{const fy=440,fh=420;
scene('mix','teaching',A=>A.P(19),svg(gnd()+frame('g1',262,fy,330,fh,SHC,'参保')+frame('g0',612,fy,330,fh,'var(--g2)','未参保','var(--CR)')+
  row('a',262,592,GY,200,[[1,true],[0,true],[1,true]])+row('b',612,942,GY,200,[[1,false],[0,false],[0,false]])+
  [0,1,2].map(i=>heart('ha'+i,262+330*(i+.5)/3,GY-318,52,i<2?'var(--g2)':'var(--CO)')+heart('hb'+i,612+330*(i+.5)/3,GY-318,52,i<1?'var(--g2)':'var(--CO)')).join('')+
  ARW2('ar',970,GND-200,1090,GND-200)+vbar('y1',1130,140,GND,440,SHC)+vbar('y0',1300,140,GND,200,LOS)+
  shield('mx1',1470,GND-378,104,true)+heart('mx2',1470,GND-262,96,'var(--g2)')+brace('br',1510,GND-440,GND-200,'var(--ink)')+
  pill('t',1250,250,280,84,'选择问题','var(--CO)','var(--CR)',48)),'i');}

/* 21 比方：参保的人看病更多——是保险让他们多看，还是本来身体差？ */
scene('visits','teaching',A=>A.P(20),svg(gnd()+clinic('cl',960,GND,380)+shield('sh',C3c[0]-20,GND-260,220,true)+heart('h',C3c[2]+40,GND-260,220,'var(--g2)')+
  ARW2('a0',C3c[0]+110,GND-260,680,GND-260)+ARW2('a1',C3c[2]-90,GND-260,1240,GND-260)+Q('q',960,300,130,'var(--SU)')+
  [0,1,2,3,4].map(i=>`<rect x="${880+i*36}" y="${GND-90}" width="14" height="70" rx="6" fill="var(--CO)" opacity="0"/>`).join('')),'u');

/* 22 随机的只是申请机会；后面还经过选择与资格审核 */
{const y=GND-280,xs=[380,680,960,1210,1470];
scene('layer','teaching',A=>A.P(21),svg(gnd()+drum('dr',xs[0],GND,300)+ticket('tk',xs[1],y,200)+form('fm',xs[2],y,190)+stamp('st',xs[3],y+20,150)+shield('sh',xs[4],y,190,true)+
  [1,2,3].map(i=>ARW2('a'+i,xs[i]+(i==1?110:90),y,xs[i+1]-90,y)).join('')+ARW2('a0',xs[0]+150,y,xs[1]-120,y)+
  pill('r1',xs[1],y-200,170,76,'随机','var(--MI)','var(--INK)',44)+M('m1',xs[1]+110,y-240,64,true)+pill('r2',xs[4],y-200,170,76,'随机','var(--g3)','var(--ink)',44)+M('m2',xs[4]+110,y-240,64,false)),'c');}

/* 23 想知道保险本身的效果，怎么办？ */
scene('how','none',A=>A.P(22),svg(gnd()+fb('p',X0+90,GND,380,ZC(1))+shield('sh',C3c[0]+150,GND-300,400,true)+ARW2('a',C3c[0]+400,GND-300,C3c[2]-260,GND-300)+Q('q',C3c[1]+60,GND-470,190,'var(--SU)')+heart('h',C3c[2]+20,GND-300,420)),'i');

/* 24 工具变项：随机的抽签只通过“参不参保”影响结果 */
{const y=GND-260;
scene('iv','none',A=>A.P(23),K.term('term',1,160,'工具变项')+svg(gnd()+drum('dr',C3c[0]-60,GND,330)+ARW2('a0',C3c[0]+110,y,C3c[1]-130,y)+shield('sh',C3c[1],y,240,true)+ARW2('a1',C3c[1]+130,y,C3c[2]-150,y)+heart('h',C3c[2]+20,y,250)+
  `<path d="M${C3c[0]-60} ${GND-400} Q960 180 ${C3c[2]+20} ${y-150}" fill="none" stroke="var(--g2)" stroke-width="8" stroke-dasharray="18 14"/>`+M('x',960,282,100,false)),'u');}

/* 25 两步：① 中签让结果变了多少（ITT）② 中签让参保率提高多少（约 0.25）；① ÷ ② = 参保本身的效果 */
scene('ratio','teaching',A=>A.P(24),svg(K.nodeOn('n1',330,300,1)+heart('h1',440,300,100)+vbar('y1',560,150,470,230,WIN)+vbar('y0',740,150,470,150,LOS)+`<path d="M710 240 L930 240" stroke="var(--g1)" stroke-width="5" stroke-dasharray="12 10"/>`+brace('b1',920,240,320,'var(--CO)')+L('it',1040,300,'ITT','var(--CO)',60)+
  `<rect x="300" y="520" width="840" height="14" rx="7" fill="var(--ink)"/>`+K.nodeOn('n2',330,690,2)+shield('s2',440,690,130,true)+L('dn',760,730,'0.25','var(--ink)',120)+
  EQ('e',1230,527,120)+heart('hr',1460,450,230)+shield('sr',1460,670,150,true)),'c');

/* 26 为什么可以除：平均 +1 分，只有 1/4 的人多参了保 → 这些人每人约 +4 分 */
{const x0=262,x1=962;
scene('quarter','teaching',A=>A.P(25),svg(gnd()+pill('f',820,230,420,96,'1÷0.25=4','var(--SU)','var(--INK)',56)+
  `<rect x="${x0+20}" y="${GND-430}" width="${x1-x0-40}" height="90" rx="14" fill="var(--MI)"/>`+L('p1',(x0+x1)/2,GND-460,'+1','var(--MI)',72)+
  row('p',x0,x1,GY,230,[[1,true],[1,false],[1,false],[1,false]])+ARW2('a',x1+30,GND-300,1160,GND-300)+
  vbar('v4',1300,180,GND-300,300,'var(--MI)','+4',false,72)+perAt('q',1390,GY,230,1,true,1)),'i');}

/* 27 估出来的是：因为中签才去参保的那类人 */
{const cw=686,ch=500,y0=GND-ch;
scene('complier','teaching',A=>A.P(26),svg([0,1].map(k=>tag(card('c'+k,C2[k],y0,cw,ch),{g:'card',a:'bottom'})).join('')+pill('l0',C2c[0],y0,200,72,'未中签','var(--g2)','var(--CR)',44)+pill('l1',C2c[1],y0,180,72,'中签','var(--SU)','var(--INK)',44)+
  perAt('p0',C2c[0]-80,GND-30,300,0,false,0)+perAt('p1',C2c[1]-80,GND-30,300,1,true,0)+heart('h',C2c[1]+170,GND-260,150)+M('mk',C2c[1]+170,GND-400,80,true)+heart('h0',C2c[0]+170,GND-260,150,'var(--g2)')),'u');}

/* 28 但这个推理要靠额外的条件 */
scene('need','none',A=>A.P(27),svg(gnd()+heart('h',C3c[0]-60,GND-470,230)+shield('s',C3c[0]-60,GND-200,230,true)+pill('f',C3c[0]+90,GND-640,300,90,'1÷0.25','var(--SU)','var(--INK)',52)+ARW2('a0',C3c[0]+90,GND-330,C3c[1]-110,GND-330)+
  slot('s1',C3c[1]+70,GND-330,400)+slot('s2',C3c[2]+40,GND-330,400)+K.nodeOn('n1',C3c[1]-130,GND-530,1)+K.nodeOn('n2',C3c[2]-160,GND-530,2)+L('c1',C3c[1]+70,GND-80,'不绕路','var(--ink)',48)+L('c2',C3c[2]+40,GND-80,'单调性','var(--ink)',48)),'c');

/* 29 条件一：抽签不能绕开保险影响结果（例：中签→心情好→自报健康） */
{const y0=330,y1=GND-150;
scene('bypass','teaching',A=>A.P(28),svg(gnd()+ticket('tk',400,(y0+y1)/2,220)+sun('sn',900,y0,170)+quest('qs',1440,(y0+y1)/2+40,260)+shield('sh',900,y1,170,false)+
  ARW2('a0',520,(y0+y1)/2-60,800,y0+20,'var(--SU)')+ARW2('a1',1000,y0+20,1290,(y0+y1)/2-40,'var(--SU)')+DASH('d0',520,(y0+y1)/2+60,800,y1-20)+DASH('d1',1000,y1-20,1290,(y0+y1)/2+90)+M('x',900,y0+150,90,false)),'i');}

/* 30 条件二：单调性——不能有人因为中签反而不参保 */
{const cw=686,ch=480,y0=GND-ch;
scene('mono','none',A=>A.P(29),K.term('term',1,160,'单调性')+svg([0,1].map(k=>tag(card('c'+k,C2[k],y0,cw,ch),{g:'card',a:'bottom'})).join('')+pill('l0',C2c[0],y0,200,72,'未中签','var(--g2)','var(--CR)',44)+pill('l1',C2c[1],y0,180,72,'中签','var(--SU)','var(--INK)',44)+
  perAt('p0',C2c[0]-60,GND-30,300,0,null,0)+shield('s0',C2c[0]+150,GND-240,200,true)+perAt('p1',C2c[1]-60,GND-30,300,1,null,0)+shield('s1',C2c[1]+150,GND-240,200,false)+
  M('x',960,GND-240,110,false)),'u');}

/* 31 估计只管一类人；总会参保的、总不参保的人效果可能不同 */
{const cw=448,ch=500,y0=GND-ch;
const two=(k,a,b)=>perAt('a'+k,C3c[k]-90,GND-30,230,0,a,0)+perAt('b'+k,C3c[k]+90,GND-30,230,1,b,1);
scene('scope','teaching',A=>A.P(30),svg([0,1,2].map(k=>tag(card('c'+k,C3[k],y0,cw,ch),{g:'card',a:'bottom'})).join('')+two(0,true,true)+two(1,false,true)+two(2,false,false)+
  Q('q0',C3c[0],y0+90,100,'var(--SU)')+M('m1',C3c[1],y0+90,100,true)+Q('q2',C3c[2],y0+90,100,'var(--SU)')+
  `<rect x="${C3[1]-12}" y="${y0-12}" width="${cw+24}" height="${ch+24}" rx="40" fill="none" stroke="var(--MI)" stroke-width="8"/>`),'c');}

/* 32 第一年：看病更多、医疗支出压力减轻、一些自报健康改善 */
{const cw=448,ch=500,y0=GND-ch;
scene('results','record',A=>A.P(31),svg(pill('yr',960,210,240,84,'第一年','var(--SU)','var(--INK)',48)+[0,1,2].map(k=>tag(card('c'+k,C3[k],y0,cw,ch),{g:'card',a:'bottom'})).join('')+
  clinic('cl',C3c[0]-40,GND-90,260)+ARW2('u0',C3c[0]+150,GND-110,C3c[0]+150,y0+90,'var(--MI)')+
  bill('b0',C3c[1]-80,y0+250,190)+ARW2('d1',C3c[1]+20,y0+250,C3c[1]+90,y0+250,'var(--g1)')+bill('b1',C3c[1]+150,y0+280,100)+
  quest('qs',C3c[2]-40,y0+280,250)+ARW2('u2',C3c[2]+150,GND-110,C3c[2]+150,y0+90,'var(--MI)')),'i');}

/* 33 自报健康 ≠ 每一种客观临床指标都变好 */
scene('self','record',A=>A.P(32),svg(gnd()+fb('p',C3c[0]-60,GND,360,ZC(1))+quest('qs',C3c[0]+130,GND-250,220)+M('mk',C3c[0]+130,GND-470,80,true)+NE(960,GND-260,150)+
  tube('tb',C3c[2]-40,GND-260,300)+Q('q',C3c[2]+120,GND-420,110,'var(--SU)')),'c');

/* 34 两个问题：机会的效果（靠随机分组） vs 保险的效果（还要额外假设） */
{const cw=686,ch=520,y0=GND-ch;
scene('two','teaching',A=>A.P(33),svg([0,1].map(k=>tag(card('c'+k,C2[k],y0,cw,ch),{g:'card',a:'bottom'})+K.nodeOn('n'+k,C2[k]+60,y0+60,k+1)).join('')+
  drum('dr',C2[0]+170,y0+330,230)+ticket('tk',C2[0]+400,y0+230,170)+ARW2('a0',C2[0]+400,y0+300,C2[0]+400,y0+380)+heart('h0',C2[0]+400,y0+430,90)+M('m0',C2[0]+580,y0+230,80,true)+
  shield('sh',C2[1]+150,y0+230,150,true)+ARW2('a1',C2[1]+150,y0+320,C2[1]+150,y0+380)+heart('h1',C2[1]+150,y0+430,90)+slot('s1',C2[1]+370,y0+330,150)+slot('s2',C2[1]+560,y0+330,150)),'u');}

/* 35 收尾：随机的到底是什么？比较的是不是同一件事？ */
{const fy=440,fh=420;
scene('close','none',A=>A.P(34),svg(gnd()+ticket('tk',C3c[0]-40,GND-300,260)+mag('mg',C3c[0]-40,GND-300,440)+pill('r',C3c[0]-40,300,170,76,'随机','var(--MI)','var(--INK)',44)+
  frame('f1',C3[1]+40,fy,400,fh,WIN,'中签')+frame('f0',C3[2]+10,fy,400,fh,'var(--g2)','未中签','var(--CR)')+EQ('e',C3[2]-6,GND-220,0)+
  row('a',C3[1]+40,C3[1]+440,GY,210,[[1,true],[1,false]])+row('b',C3[2]+10,C3[2]+410,GY,210,[[0,false],[0,true]])+M('ok',C3[2]+10,fy-90,100,true)),'i');}

Object.assign(REV,{"hook": [["#a", 0, "随机的"], ["#qq", 0, "比错", "pop"]], "ticket": [["#tk", 1, "申请机会", "pop"], ["#sh", 1, "保险", "pop"], ["#q", 1, "直接到账", "pop"]], "steps": [["#fm", 2, "办申请", "pop"], ["#st", 2, "资格审核", "pop"], ["#xb", 2, "没有完成申请", "pop"], ["#xc", 2, "没有通过", "pop"]], "regroup": [["#ar", 3, "挑出来"], ["#x", 3, "重新拆过", "pop"]], "oregon": [["#cal,#y", 4, "二〇〇八年", "pop"], ["#dr", 4, "抽签的方式", "pop"], ["#tk", 4, "申请公共", "pop"]], "why": [["#n0", 5, "第一", "pop"], ["#n1", 5, "第二", "pop"], ["#n2", 5, "第三", "pop"], ["#n3", 5, "第四", "pop"]], "rule": [["#m0", 6, "定得合理", "pop"], ["#m1", 6, "照规则来", "pop"], ["#di", 6, "偶然差别", "pop"]], "cross": [["#xa", 7, "都参了保", "pop"], ["#mc", 7, "别的保险", "pop"]], "rate": [["#br", 8, "提高了", "pop"], ["#pp", 8, "二十五个百分点", "pop"]], "diff": [["#x", 9, "四分之一", "pop"], ["#br", 9, "两组相差", "pop"], ["#ok,#ok2", 9, "概率差", "pop"]], "why2": [["#q", 10, "没参保", "pop"], ["#bx", 10, "中签组", "pop"]], "itt": [["#a0", 11, "申请机会"], ["#h", 11, "整体上", "pop"]], "use": [["#cal", 12, "再搞一次", "pop"]], "term": [["#itt", 13, "ITT", "pop"], ["#f0", 13, "当初分到", "pop"]], "reliable": [["#e", 14, "差不多", "pop"], ["#mg", 14, "失访", "pop"], ["#ms", 14, "测量方式", "pop"]], "limit": [["#ok", 15, "申请机会", "pop"], ["#q", 15, "冲淡", "pop"]], "direct": [["#vs", 16, "实际参保", "pop"], ["#q", 16, "没参保的人比", "pop"]], "select": [["#h0,#a0", 17, "身体更差", "pop"], ["#f1,#a1", 17, "处理手续", "pop"], ["#mk", 17, "连在了一起", "pop"]], "affect": [["#a0,#cl", 18, "看病多", "pop"], ["#bl", 18, "看病多", "pop", 0.5], ["#a1,#h1", 18, "照顾自己", "pop"], ["#mk", 18, "照顾自己", "pop", 0.6]], "mix": [["#ar", 19, "影响结果"], ["#y1,#y0", 19, "两边结果", "pop"], ["#br,#mx1,#mx2", 19, "混进了", "pop"], ["#t", 19, "选择问题", "pop"]], "visits": [["#a0", 20, "保险让他们"], ["#a1", 20, "本来身体就差"], ["#q", 20, "没法知道", "pop"]], "layer": [["#r1,#m1", 21, "随机的是", "pop"], ["#r2,#m2", 21, "重新分组", "pop"]], "how": [["#a", 22, "保险本身"], ["#q", 22, "怎么办", "pop"]], "iv": [["#a0", 23, "随机的因素"], ["#a1", 23, "影响结果"], ["#x", 23, "只能靠", "pop"]], "ratio": [["#n1,#h1", 24, "第一步", "pop"], ["#n2,#s2", 24, "第二步", "pop"], ["#e,#hr,#sr", 24, "除以", "pop"]], "quarter": [["#a", 25, "四分之一"], ["#v4", 25, "四分", "pop"]], "complier": [["#mk", 26, "因为中签才去", "pop"]], "need": [["#s1", 27, "额外的条件", "pop"], ["#s2", 27, "额外的条件", "pop", 0.5]], "bypass": [["#sn", 28, "心情变好", "pop"], ["#qs", 28, "自报的健康", "pop"], ["#x", 28, "算到保险头上", "pop"]], "mono": [["#x", 29, "反着来", "pop"], ["#s1", 29, "单调性", "pop"]], "scope": [["#m1", 30, "因为中签才参保", "pop"], ["#q0,#q2", 30, "不一样", "pop"]], "results": [["#u0", 31, "看病"], ["#d1", 31, "经济压力"], ["#u2", 31, "健康指标"]], "self": [["#mk", 32, "自己报告", "pop"], ["#tb", 32, "客观的临床指标", "pop"], ["#q", 32, "都变好了", "pop"]], "two": [["#n0", 33, "获得机会", "pop"], ["#n1", 33, "实际获得保险", "pop"], ["#s1,#s2", 33, "额外的假设", "pop"]], "close": [["#mg", 34, "随机的到底是什么", "pop"], ["#e", 34, "同一件事", "pop"], ["#ok", 34, "同一件事", "pop", 0.6]]});
window.SCENES=S;
})();
