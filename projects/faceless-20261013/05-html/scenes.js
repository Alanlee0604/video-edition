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
const chair=(id,cx,bottom,h,col,m={g:'ground',a:'bottom'})=>{const k=h/220;return tag(`<g id="${id}"><g transform="translate(${cx} ${bottom}) scale(${k.toFixed(4)})"><rect x="-70" y="-220" width="26" height="220" rx="10" fill="${col}"/><rect x="-70" y="-220" width="110" height="26" rx="10" fill="${col}"/><rect x="-80" y="-112" width="160" height="28" rx="12" fill="${col}"/><rect x="54" y="-100" width="22" height="100" rx="10" fill="${col}"/><rect x="-66" y="-100" width="22" height="100" rx="10" fill="${col}"/></g></g>`,m)};
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

/* 01 开场：就医次数线在 $3000 处断开跳一下 */
{const c=CF(296,1380),x=UX(c,.5);
scene('hook','teaching',A=>A.P(0),svg(vchart('ax',c)+gate('g',x,c.y+8,GND-8)+rd('l',c)+brace('b',x+28,Y(c,F(.5)+J),Y(c,F(.5)),'var(--MI)')+Q('q',LEG,GND-260,200,'var(--SU)')),'i');}

/* 02 规则：收入尺 + $3000 门槛；左边家庭拿到救助卡，右边没有；日历=当时 */
{const R=ruler('r',X0,X1,GND);
scene('rule','record',A=>A.P(1),svg(R.svg+gate('g',R.rx(3000),232,GND)+family('f0',R.rx(1900),340)+mcard('c0',R.rx(1900),360,200)+
  family('f1',R.rx(4100),340,FBc)+mcard('c1',R.rx(4100),360,200,true)+ic('cal','calendar',X0+70,264,96,'var(--g1)')+L('lc',X0+200,282,'当时','var(--ink)',48)),'u');}

/* 03 收入连续变，资格一下跳：金币堆一点点变高，卡在门槛处整张消失 */
{const n=8,xs=[...Array(n)].map((_,i)=>Math.round(X0+90+i*(W-180)/(n-1))),gx=(xs[3]+xs[4])/2;
scene('jump','teaching',A=>A.P(2),svg(gnd()+xs.map((x,i)=>coins('k'+i,x,GND,3+i*1.3|0,56)).join('')+gate('g',gx,232,GND)+
  xs.map((x,i)=>mcard('m'+i,x,400,136,i>=4)).join('')),'c');}

/* 04 研究问题：门槛处在原有趋势之外有没有额外落差 */
{const c=CF(296,1380),x=UX(c,.5);
scene('question','teaching',A=>A.P(3),svg(vchart('ax',c)+gate('g',x,c.y+8,GND-8)+smooth('s',c)+rd('l',c)+brace('b',x+28,Y(c,F(.5)+J),Y(c,F(.5)),'var(--MI)')+
  mcard('mc',LEG,GND-420,200)+Q('q',LEG,GND-170,160,'var(--SU)')),'u');}

/* 05 直接比：有卡的一群 vs 没卡的一群，谁去诊所多 */
scene('naive','teaching',A=>A.P(4),svg(gnd()+grp('g0',C3c[0],3,300)+mcard('c0',C3c[0],360,180)+grp('g1',C3c[2],3,300,FBc)+mcard('c1',C3c[2],360,180,true)+
  clinic('cl',C3c[1],GND,280)+AR('a0',C3c[0]+190,GND-160,C3c[1]-190,GND-160,'var(--g1)',12)+AR('a1',C3c[2]-190,GND-160,C3c[1]+190,GND-160,'var(--g1)',12)+Q('q',C3c[1],380,150,'var(--SU)')),'i');

/* 06 两组本来就不一样：收入（金币）、健康、年龄、支付能力 */
scene('differ','teaching',A=>A.P(5),svg(gnd()+grp('g0',C3c[0]-40,3,280)+coins('k0',C3c[0]-40,360,2,64)+grp('g1',C3c[2]+40,3,280,FBc)+coins('k1',C3c[2]+40,420,7,64)+
  [heart('h0',C3c[1]-150,290,110,'var(--g2)'),hourglass('t0',C3c[1]-150,480,170),wallet('w0',C3c[1]-150,680,90),heart('h1',C3c[1]+150,290,140),hourglass('t1',C3c[1]+150,480,100),wallet('w1',C3c[1]+150,680,170)].join('')+
  [290,480,680].map(y=>NE(C3c[1],y,96)).join('')),'c');

/* 07 会犯的错（假设）：① 本来身体差 → 本来就常去诊所，卡不是原因；② 钱包空 → 去不了诊所，救助作用被盖住 */
{const cw=686,ch=520,y0=GND-ch;
scene('mistake','teaching',A=>A.P(6),svg([0,1].map(k=>tag(card('c'+k,C2[k],y0,cw,ch),{g:'card',a:'bottom'})+K.nodeOn('n'+k,C2[k]+72,y0+72,k+1)+clinic('cl'+k,C2[k]+500,GND-56,240)+mcard('m'+k,C2[k]+cw-130,y0+90,150)).join('')+
  heart('h',C2[0]+170,GND-180,170,'var(--g2)')+AR('a0',C2[0]+270,GND-180,C2[0]+360,GND-180,'var(--ink)',12)+M('x0',C2[0]+cw-56,y0+56,64,false)+
  wallet('w',C2[1]+170,GND-180,180)+AR('a1',C2[1]+270,GND-180,C2[1]+360,GND-180,'var(--ink)',12)+M('x1',C2[1]+316,GND-260,72,false)+Q('q1',C2[1]+cw-50,y0+66,72,'var(--SU)')),'u');}

/* 08 选择威胁：资格和收入锁在一起（铁链），不是掷骰子随机分的 */
scene('selection','none',A=>A.P(7),K.term('term',1,160,'选择威胁')+svg(gnd()+coins('k',C3c[0],GND,8,90)+chain('ch',C3c[0]+130,C3c[1]-150,GND-200)+mcard('mc',C3c[1],GND-200,260)+
  ic('die','die',C3c[2],GND-180,200,'var(--CR)')+M('x',C3c[2]+100,GND-290,110,false)),'i');

/* 09 术语：回归不连续——结果线到门槛处断开 */
{const c={x:346,y:416,w:1312,h:424},x=UX(c,.5);
scene('rdd','none',A=>A.P(8),K.term('term',1,160,'回归不连续')+svg(vchart('ax',c)+gate('g',x,c.y+8,GND-8)+rd('l',c)),'u');}

/* 10 两个说法：收入=分派变项；$3000=选取标准 */
{const R=ruler('r',X0,X1,GND);
scene('terms','none',A=>A.P(9),svg(R.svg+gate('g',R.rx(3000),360,GND)+L('t1',R.rx(3000),268,'选取标准','var(--pink)',64)+family('f0',R.rx(2100),320)+mcard('c0',R.rx(2100),400,170)+family('f1',R.rx(4200),320,FBc)+mcard('c1',R.rx(4200),400,170,true)+
  L('t0',X0+150,GND-120,'分派变项','var(--pink)',56)+AR('a',X0+150,GND-96,X0+150,GND-8,'var(--pink)',8)),'c');}

/* 11 难得的好处：分法写在规则里（规则板：金币<$3000 → 救助卡），看得清 */
scene('known','record',A=>A.P(10),svg(gnd()+`<rect x="${C2c[0]-300}" y="${GND-560}" width="600" height="540" rx="32" fill="var(--CR)"/><rect x="${C2c[0]-110}" y="${GND-590}" width="220" height="64" rx="20" fill="var(--g1)"/>`+
  coins('k',C2c[0]-170,GND-300,4,64)+L('lt',C2c[0]-170,GND-150,'<$3000','var(--INK)',56)+AR('a',C2c[0]-60,GND-330,C2c[0]+40,GND-330,'var(--INK)',12)+mcard('mc',C2c[0]+150,GND-330,200)+
  ic('mg','magnifier',C2c[1]-40,GND-300,340,'var(--ink)')+mcard('mc2',C2c[1]-86,GND-346,160)+M('ok',C2c[1]+200,GND-500,120,true)),'i');

/* 12–16 两家只差一点：$2990 vs $3010 */
const R2=ruler('r',X0,X1,GND,2800,3200,100),xa=R2.rx(2930),xb=R2.rx(3070),gx=R2.rx(3000);
const pair=(o={})=>R2.svg+gate('g',gx,o.gt||232,GND)+family('fa',xa,o.h||300)+family('fb',xb,o.h||300,FBc)+pill('pa',xa,o.py||300,200,80,'$2990','var(--g4)','var(--ink)',48)+pill('pb',xb,o.py||300,200,80,'$3010','var(--g4)','var(--ink)',48);
scene('two','teaching',A=>A.P(11),svg(pair()+Q('q',X1-120,400,140,'var(--SU)')),'u');
scene('step1','teaching',A=>A.P(13),svg(pair({py:470,gt:560})+K.nodeOn('n',X0+60,280,1)+heart('h0',xa-80,350,120)+hourglass('t0',xa+70,350,120)+heart('h1',xb-70,350,120)+hourglass('t1',xb+80,350,120)+EQ('e0',gx,350,110)),'c');
{const bw=280,bh=340;
scene('step2','teaching',A=>A.P(14),svg(gnd()+K.nodeOn('n',X0+60,280,2)+bar('b0',C2c[0]-bw/2,bw,bh,'none',{},false).replace('fill="none"','fill="var(--g2)"')+bar('b1',C2c[1]-bw/2,bw,bh,'var(--g2)')+clinic('c0',C2c[0],GND-bh-16,170)+clinic('c1',C2c[1],GND-bh-16,170)+
  pill('pa',C2c[0]-260,GND-bh-120,200,80,'$2990','var(--g4)','var(--ink)',48)+pill('pb',C2c[1]+260,GND-bh-120,200,80,'$3010','var(--g4)','var(--ink)',48)+EQ('e',960,GND-110,120)+gate('g',960,232,GND-200)),'i');}
scene('step3','teaching',A=>A.P(15),svg(pair({py:300})+K.nodeOn('n',X0+60,280,3)+mcard('ca',xa-280,420,220)+mcard('cb',xb+280,420,220,true)+NE(gx,560,96)),'u');
{const bw=200;
scene('step4','teaching',A=>A.P(16),svg(gnd()+K.nodeOn('n',X0+60,280,4)+bar('b0',C2c[0]-140-bw/2,bw,420,AID)+bar('b1',C2c[0]+140-bw/2,bw,220,'var(--g2)')+clinic('c0',C2c[0]-140,GND-436,150)+clinic('c1',C2c[0]+140,GND-236,150)+
  gate('g',C2c[0],232,GND)+brace('br',C2c[0]+260,GND-420,GND-220,'var(--MI)')+ic('mg','magnifier',C2c[1]+40,GND-300,400,'var(--ink)')+mcard('mc',C2c[1]-14,GND-354,190)),'c');}

/* 17 关键条件：没有救助时，线在门槛处本应连续 */
{const c=CF(296,1380),x=UX(c,.5);
scene('cond','teaching',A=>A.P(17),svg(vchart('ax',c)+gate('g',x,c.y+8,GND-8)+smooth('s',c,F,'var(--ink)',.03,.97,false)+mcard('mc',LEG,GND-400,220,true)+M('ok',LEG,GND-150,120,true)),'i');}

/* 18 为什么要紧：没有救助也有台阶 → 不能算救助的 */
{const cw=686,ch=520,y0=GND-ch,mk=k=>{const m=mini(C2[k],y0,cw,ch);return tag(card('c'+k,C2[k],y0,cw,ch),{g:'card',a:'bottom'})+axes(m)+gate('g'+k,UX(m,.5),m.y+40,m.y+m.h,'var(--SU)').replace(/width="208"/,'width="208"')+
  (k?smooth('s'+k,m,F,'var(--ink)',.03,.97,false):rd('l'+k,m,.5,.2,F,'var(--ink)',3))+mcard('mc'+k,C2[k]+cw-110,y0+104,140,true)+M('m'+k,C2[k]+70,y0+70,96,!!k)};
scene('why','teaching',A=>A.P(18),svg(mk(0)+mk(1)),'u');}

/* 19 名字：回归=用一条线描述；不连续=线在门槛断开 */
{const c=CF(296,1380),x=UX(c,.5);
scene('name','none',A=>A.P(19),svg(vchart('ax',c)+gate('g',x,c.y+8,GND-8)+ln('l0',`M${pt(c,.04,F(.04)+J)} L${pt(c,.49,F(.49)+J)}`,AID,12)+ln('l1',`M${pt(c,.51,F(.51))} L${pt(c,.96,F(.96))}`,AID,12)+
  L('t0',UX(c,.24),Y(c,F(.24)+J)-60,'回归','var(--pink)',64)+L('t1',x+180,Y(c,F(.5)+J/2)+20,'不连续','var(--pink)',64)+brace('b',x+28,Y(c,F(.5)+J),Y(c,F(.5)),'var(--MI)')),'c');}

/* 20 麻烦：另一项补助（黄票券）也卡在 $3000 */
{const c=CF(296,1380),x=UX(c,.5);
scene('other','teaching',A=>A.P(20),svg(vchart('ax',c)+gate('g',x,c.y+8,GND-8)+rd('l',c)+mcard('mc',LEG,GND-470,200)+coupon('cp',LEG,GND-260,200)+Q('q',x+150,Y(c,F(.5)+J/2),120,'var(--SU)')),'i');}

/* 21 两项叠在同一个台阶上：分不开 */
{const G5=C2c[0]+200,bw=300,base=240,a=170,b=150,x0=G5-bw-40,x1=G5+40;
scene('stack','teaching',A=>A.P(21),svg(gnd()+bar('b0',x0,bw,base+a+b,'var(--SU)')+`<rect x="${x0}" y="${GND-base-a}" width="${bw}" height="${base+a}" rx="16" fill="${AID}"/><rect x="${x0}" y="${GND-base}" width="${bw}" height="${base}" rx="16" fill="var(--g2)"/>`+bar('b1',x1,bw,base,'var(--g2)')+
  gate('g',G5,232,GND)+mcard('mc',x0-104,GND-base-a/2,168)+coupon('cp',x0-104,GND-base-a-b/2,168)+Q('q',C2c[1]+160,GND-380,260,'var(--ink)')),'u');}

/* 22 实施前一年：同一门槛没有台阶 */
{const c=CF(296,1380),x=UX(c,.5);
scene('prior','record',A=>A.P(22),svg(vchart('ax',c)+gate('g',x,c.y+8,GND-8)+smooth('s',c,F,'var(--ink)',.03,.97,false)+ic('cal','calendar',LEG,GND-440,170,'var(--g1)')+L('lc',LEG,GND-300,'前一年','var(--ink)',56)+M('ok',LEG,GND-140,110,true)),'c');}

/* 23 排除“本来就有台阶”：实施前平、实施后跳 */
{const cw=686,ch=520,y0=GND-ch,mk=k=>{const m=mini(C2[k],y0+40,cw,ch-40);return tag(card('c'+k,C2[k],y0,cw,ch),{g:'card',a:'bottom'})+axes(m)+gate('g'+k,UX(m,.5),m.y+20,m.y+m.h)+
  (k?rd('l'+k,m,.5,.2,F,AID,5):smooth('s'+k,m,F,'var(--ink)',.03,.97,false))+L('t'+k,C2[k]+(k?560:150),y0+80,k?'实施后':'实施前','var(--ink)',48)};
scene('ruled','record',A=>A.P(23),svg(mk(0)+mk(1)+M('ok',960,y0-40,96,true)),'i');}

/* 24 还没排除：同一年、同一条线上启动的新计划（紫喇叭） */
{const c=CF(296,1380),x=UX(c,.5);
scene('notall','teaching',A=>A.P(24),svg(vchart('ax',c)+gate('g',x,c.y+8,GND-8)+rd('l',c)+mcard('mc',LEG-90,GND-470,150)+newplan('np',LEG+90,GND-470,130)+ic('cal','calendar',LEG,GND-250,140,'var(--g1)')+Q('q',x+150,Y(c,F(.5)+J/2),120,'var(--SU)')),'u');}

/* 25 每多一份证据，排除一种解释：三张嫌疑卡 */
{const cw=448,ch=440,y0=GND-ch;
scene('evidence','schematic',A=>A.P(25),svg([0,1,2].map(k=>tag(card('c'+k,C3[k],y0,cw,ch),{g:'card',a:'bottom'})).join('')+
  (()=>{const m={x:C3[0]+56,y:y0+150,w:cw-112,h:ch-210};return axes(m)+ln('st',`M${pt(m,.05,.75)} L${pt(m,.5,.75)} L${pt(m,.5,.35)} L${pt(m,.95,.35)}`,'var(--g1)',8)})()+M('m0',C3c[0]+150,y0+72,96,false)+
  coupon('cp',C3c[1],GND-220,240)+Q('m1',C3c[1]+150,y0+72,96,'var(--SU)')+newplan('np',C3c[2],GND-220,180)+Q('m2',C3c[2]+150,y0+72,96,'var(--SU)')),'c');}

/* 26 图很粗：每个点是一组人的平均；有资格那侧只有一个点 */
const DOTS=[[.25,F(.25)+J],[.6,F(.6)],[.7,F(.7)+.02],[.8,F(.8)-.02],[.9,F(.9)]];
{const c=CF(296,1380),x=UX(c,.5);
scene('coarse','record',A=>A.P(26),svg(vchart('ax',c)+gate('g',x,c.y+8,GND-8)+DOTS.map(([u,v],i)=>dotg('d'+i,UX(c,u),Y(c,v),i?44:60,i?'var(--g2)':AID)).join('')+K.stext('one',UX(c,.25),Y(c,F(.25)+J)-100,'1',{anchor:'middle',fill:'var(--ink)',size:72,weight:700})),'i');}

/* 27 一个点画不出走向：穿过它的线可以有很多条 */
{const c=CF(296,1380),x=UX(c,.5),u0=.25,v0=F(.25)+J;
scene('fan','record',A=>A.P(28),svg(vchart('ax',c)+gate('g',x,c.y+8,GND-8)+[-.6,-.1,.5].map((s,i)=>ln('f'+i,`M${pt(c,.05,v0-s*.2)} L${pt(c,.47,v0+s*.22)}`,'var(--ink)',6,true)).join('')+
  ln('r',`M${pt(c,.53,F(.53))} L${pt(c,.96,F(.96))}`,'var(--g1)',8)+DOTS.map(([u,v],i)=>dotg('d'+i,UX(c,u),Y(c,v),i?44:60,i?'var(--g2)':AID)).join('')+Q('q',UX(c,.25),Y(c,v0)+170,120,'var(--SU)')),'u');}

/* 28 别想象成满满的个人数据 */
{const cw=686,ch=520,y0=GND-ch;
const mk=k=>{const m=mini(C2[k],y0+40,cw,ch-40);let s=tag(card('c'+k,C2[k],y0,cw,ch),{g:'card',a:'bottom'})+axes(m)+`<path d="M${UX(m,.5)} ${m.y} L${UX(m,.5)} ${m.y+m.h}" stroke="var(--SU)" stroke-width="6" stroke-dasharray="14 12"/>`;
  if(!k){for(let i=0;i<90;i++){const u=.03+.94*((i*37)%90)/90,v=(u<.5?F(u)+J:F(u))+.16*rnd(i+7);s+=`<circle cx="${UX(m,u)}" cy="${Y(m,v)}" r="9" fill="var(--g1)"/>`}s+=M('m0',C2[0]+cw-70,y0+70,96,false)}
  else{s+=DOTS.map(([u,v],i)=>dotg('e'+i,UX(m,u),Y(m,v),i?30:40,i?'var(--g2)':AID)).join('')+M('m1',C2[1]+cw-70,y0+70,96,true)}return s};
scene('nodense','record',A=>A.P(29),svg(mk(0)+mk(1)),'c');}

/* 29 函数关系：直的还是弯的，要描述对 */
{const cw=686,ch=440,y0=GND-ch;
const mk=k=>{const m=mini(C2[k],y0,cw,ch);return tag(card('c'+k,C2[k],y0,cw,ch),{g:'card',a:'bottom'})+axes(m)+(k?smooth('s1',m,u=>.15+.75*(1-u)*(1-u),AID,.03,.97,false):smooth('s0',m,u=>.85-.7*u,AID,.03,.97,false))};
scene('form','none',A=>A.P(30),K.term('term',1,160,'函数关系')+svg(mk(0)+mk(1)+Q('q',960,y0+ch/2,120,'var(--SU)')),'i');}

/* 30 弯线硬套直线：门槛处冒出假台阶 */
{const c=CF(296,1380),x=UX(c,.5),g=u=>.12+.8*(1-u)*(1-u),fitL=u=>g(.03)+(g(.49)-g(.03))*(u-.03)/.46,fitR=u=>g(.51)+(g(.97)-g(.51))*(u-.51)/.46;
const lA=u=>g(.03)+(u-.03)*((g(.49)-g(.03))/.46)*1.0;
scene('curve','teaching',A=>A.P(31),svg(vchart('ax',c)+gate('g',x,c.y+8,GND-8)+smooth('t',c,g,'var(--ink)',.03,.97,false)+
  ln('fl',`M${pt(c,.03,.80)} L${pt(c,.5,.40)}`,AID,10,true)+ln('fr',`M${pt(c,.5,.24)} L${pt(c,.97,.10)}`,AID,10,true)+brace('b',x+28,Y(c,.40),Y(c,.24),'var(--CO)')+M('x',x+150,Y(c,.32),110,false)+
  mcard('mc',LEG,GND-200,200,true)),'u');}

/* 31 资料越粗越难判断：几个点，直线弯线都说得通 */
{const c=CF(296,1380),x=UX(c,.5);
scene('risk','teaching',A=>A.P(32),svg(vchart('ax',c)+gate('g',x,c.y+8,GND-8)+smooth('s0',c,u=>.8-.6*u,'var(--ink)',.03,.97,true)+smooth('s1',c,u=>.12+.72*(1-u)*(1-u)+.04,'var(--MI)',.03,.97,true)+
  [[.15,.7],[.35,.56],[.62,.38],[.82,.25]].map(([u,v],i)=>dotg('d'+i,UX(c,u),Y(c,v),44,'var(--g2)')).join('')+Q('q',LEG,GND-300,200,'var(--SU)')),'c');}

/* 32 思路：抓一条明确的规则，看结果是不是在规则改变处跟着变 */
{const c=CF(296,1380),x=UX(c,.5);
scene('lesson','teaching',A=>A.P(33),svg(vchart('ax',c)+gate('g',x,c.y+8,GND-8)+rd('l',c)+brace('b',x+28,Y(c,F(.5)+J),Y(c,F(.5)),'var(--MI)')+mcard('mc',LEG,GND-420,220)+M('ok',LEG,GND-170,120,true)),'i');}

/* 33 四项检查 */
{const cw=328,ch=440,y0=GND-ch;
const sm=(k)=>{const m={x:C4[k]+48,y:y0+170,w:cw-96,h:ch-230};return m};
scene('checks','schematic',A=>A.P(34),svg([0,1,2,3].map(k=>tag(card('c'+k,C4[k],y0,cw,ch),{g:'card',a:'bottom'})+K.nodeOn('n'+k,C4[k]+64,y0+64,k+1)).join('')+
  (()=>{const m=sm(0);return axes(m)+smooth('s',m,F,'var(--ink)',.05,.95,false)})()+coupon('cp',C4c[1],GND-190,250)+ic('cal','calendar',C4c[2],GND-190,190,'var(--g1)')+
  (()=>{const m=sm(3);return axes(m)+[[.2,.7],[.5,.5],[.8,.3]].map(([u,v],i)=>dotg('d'+i,UX(m,u),Y(m,v),28,'var(--g2)')).join('')})()),'u');}

/* 34 收尾：台阶值得注意，结论多强看检查做了几项 */
{const c=CF(296,1300),x=UX(c,.5),ys=[300,440,580,720];
scene('close','none',A=>A.P(35),svg(vchart('ax',c)+gate('g',x,c.y+8,GND-8)+rd('l',c)+brace('b',x+28,Y(c,F(.5)+J),Y(c,F(.5)),'var(--MI)')+
  ys.map((y,i)=>tag(`<rect id="rw${i}" x="1340" y="${y-60}" width="318" height="120" rx="24" fill="var(--g4)"/>`,{g:'rows',a:'left'})).join('')+
  smooth('i0',{x:1430-70,y:ys[0]-40,w:140,h:80},F,'var(--ink)',0,1,false)+coupon('i1',1430,ys[1],150)+ic('i2','calendar',1430,ys[2],96,'var(--g1)')+[[.15,.75],[.85,.25]].map(([u,v],i)=>dotg('i3'+i,1430-70+u*140,ys[3]+40-v*80,30,'var(--g2)')).join('')+
  M('k0',1590,ys[0],80,true)+M('k1',1590,ys[1],80,true)+ys.slice(2).map((y,i)=>`<circle id="k${i+2}" cx="1590" cy="${y}" r="36" fill="none" stroke="var(--g2)" stroke-width="6" stroke-dasharray="12 10"/>`).join('')),'i');}

Object.assign(REV,{"hook": [["#l", 0, "突然跳了", "draw"], ["#b", 0, "跳了一下", "pop"], ["#q", 0, "原因", "pop"]], "rule": [["#c0", 1, "就有资格", "pop"], ["#cal,#lc", 1, "当时的规则", "pop"]], "jump": [["#g", 2, "一越过", "pop"]], "question": [["#s", 3, "原来收入", "draw"], ["#b", 3, "突然变了", "pop"], ["#q", 3, "解释不了", "pop"]], "naive": [["#a0,#a1", 4, "看谁看病多"], ["#q", 4, "不就行了", "pop"]], "differ": [["#h0,#h1", 5, "健康状况", "pop"], ["#t0,#t1", 5, "年龄", "pop"], ["#w0,#w1", 5, "支付能力", "pop"]], "mistake": [["#a0,#x0", 6, "跟救助没关系", "pop"], ["#a1,#x1", 6, "被掩盖", "pop"], ["#q1", 6, "都是假设", "pop"]], "selection": [["#ch", 7, "绑在一起", "pop"], ["#x", 7, "不是随机", "pop"]], "rdd": [["#l", 8, "突然断开", "draw"]], "terms": [["#t0", 9, "分派变项", "pop"], ["#t1", 9, "选取标准", "pop"]], "known": [["#a", 10, "怎么分出去"], ["#ok", 10, "这里知道", "pop"]], "two": [["#q", 12, "高一点", "pop"]], "step1": [["#h0,#h1", 13, "健康", "pop"], ["#t0,#t1", 13, "年龄", "pop"], ["#e0", 13, "没有理由", "pop"]], "step2": [["#e", 14, "不应该", "pop"]], "step3": [["#ca", 15, "一家有救助", "pop"], ["#cb", 15, "一家没有", "pop"]], "step4": [["#br", 16, "跳了一下", "pop"], ["#mg", 16, "最值得怀疑", "pop"]], "cond": [["#s", 17, "本来应该是连续", "draw"], ["#ok", 17, "不会凭空", "pop"]], "why": [["#m0", 18, "不是救助造成", "pop"], ["#m1", 18, "不该有台阶", "pop"]], "name": [["#l0,#t0", 19, "回归", "pop"], ["#l1,#t1,#b", 19, "不连续", "pop"]], "other": [["#cp", 20, "另一项补助", "pop"], ["#q", 20, "该算谁的", "pop"]], "stack": [["#q", 21, "分不开", "pop"], ["#cp", 21, "两项政策", "pop"]], "prior": [["#cal,#lc", 22, "实施前一年", "pop"], ["#ok", 22, "没有出现", "pop"]], "ruled": [["#ok", 23, "实施后有了", "pop"]], "notall": [["#np", 24, "另一项计划", "pop"], ["#q", 24, "继续查", "pop"]], "evidence": [["#m0", 25, "每多一份证据", "pop"]], "coarse": [["#one", 27, "只有一个", "pop"]], "fan": [["#f0,#f1,#f2", 28, "画不出", "draw"]], "nodense": [["#m1", 29, "更不能", "pop"]], "form": [["#q", 30, "直的关系", "pop"]], "curve": [["#fl,#fr", 31, "硬拿一条直线", "draw"], ["#b", 31, "一段落差", "pop"], ["#x", 31, "误当成", "pop"]], "risk": [["#q", 32, "越难判断", "pop"]], "lesson": [["#b", 33, "跟着变", "pop"], ["#ok", 33, "很有力", "pop"]], "checks": [["#n0", 34, "本来连续", "pop"], ["#n1", 34, "别的政策", "pop"], ["#n2", 34, "实施之前", "pop"], ["#n3", 34, "够不够细", "pop"]], "close": [["#k0", 35, "值得注意", "pop"], ["#k1", 35, "多强的结论", "pop"], ["#k2,#k3", 35, "哪一步", "pop"]]});
window.SCENES=S;
})();
