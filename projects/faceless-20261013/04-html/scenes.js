/* 第04集 关键帧（静帧）：沿用第01集 v4 视觉系统。
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
const coin=(id,cx,cy,r,m={})=>tag(`<g id="${id}"><circle cx="${cx}" cy="${cy}" r="${r}" fill="var(--SUD)"/><circle cx="${cx}" cy="${cy}" r="${r*.84}" fill="var(--SU)"/>`+K.stext(id+'t',cx,cy+r*.24,'20¢',{anchor:'middle',fill:'var(--INK)',size:Math.round(r*.66),weight:700})+`</g>`,m);
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

/* ===== 第04集 实物元素 =====
   禁烟立法 = 禁烟标志（香烟+红圈斜杠）；心梗住院 = 红心+心电线 / 医院楼（红十字）+救护车；英格兰 = 圣乔治十字旗；
   季节 = 雪花（冬）/太阳（夏）；人口 = 人群；反事实 = 空白报纸（沿用第02集）；模型扣除 = 漏斗过滤；不确定范围 = 尺子；
   统计结论效度 = 效应量条；内部效度 = 放大镜查“谁干的”；别的同时事件 = 乌云闪电（沿用）；先后顺序 = 跑道起跑线。 */
const noSmoke=(id,cx,cy,r,m={})=>tag(`<g id="${id}"><circle cx="${cx}" cy="${cy}" r="${r}" fill="#FFFFFF"/><rect x="${cx-r*.62}" y="${cy-r*.1}" width="${r*1.0}" height="${r*.22}" rx="${r*.05}" fill="#C9C2B8"/><rect x="${cx+r*.38}" y="${cy-r*.1}" width="${r*.22}" height="${r*.22}" rx="${r*.05}" fill="var(--SUD)"/><path d="M${cx+r*.48} ${cy-r*.2} q${-r*.12} ${-r*.16} 0 ${-r*.3} q${r*.12} ${-r*.14} 0 ${-r*.28}" stroke="var(--g2)" stroke-width="${r*.07}" fill="none" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="${r*.88}" fill="none" stroke="#E5322B" stroke-width="${r*.16}"/><path d="M${cx-r*.62} ${cy-r*.62} L${cx+r*.62} ${cy+r*.62}" stroke="#E5322B" stroke-width="${r*.16}" stroke-linecap="round"/></g>`,m);
const heart=(id,cx,cy,s,m={})=>{const k=s/100;return tag(`<g id="${id}"><g transform="translate(${cx} ${cy}) scale(${k})"><path d="M0 40 C-60 0 -60 -40 -28 -44 C-12 -46 -2 -36 0 -28 C2 -36 12 -46 28 -44 C60 -40 60 0 0 40Z" fill="#E5322B"/><path d="M-40 -8 L-16 -8 L-8 -24 L4 8 L12 -8 L40 -8" stroke="#FFFFFF" stroke-width="6" fill="none" stroke-linejoin="round" stroke-linecap="round"/></g></g>`,m)};
const hospital=(id,cx,bottom,h,m={g:'ground',a:'bottom'})=>{const k=h/320;let w='';for(let r=0;r<2;r++)for(let c=0;c<4;c++)if(!(r==1&&(c==1||c==2)))w+=`<rect x="${-150+c*80}" y="${-220+r*90}" width="56" height="56" rx="8" fill="#9FD3FF"/>`;
  return tag(`<g id="${id}"><g transform="translate(${cx} ${bottom}) scale(${k.toFixed(4)})"><rect x="-200" y="-16" width="400" height="16" rx="8" fill="var(--CRS)"/><rect x="-180" y="-260" width="360" height="246" fill="var(--CR)"/><rect x="-120" y="-320" width="240" height="70" rx="12" fill="var(--CR)"/><rect x="-14" y="-312" width="28" height="56" rx="4" fill="#E5322B"/><rect x="-28" y="-298" width="56" height="28" rx="4" fill="#E5322B"/>${w}<rect x="-44" y="-120" width="88" height="106" rx="8" fill="#9FD3FF"/><rect x="-2" y="-120" width="4" height="106" fill="var(--CR)"/></g></g>`,m)};
const ambulance=(id,cx,bottom,h)=>{const k=h/140;return `<g id="${id}"><g transform="translate(${cx} ${bottom}) scale(${k.toFixed(4)})"><rect x="-130" y="-120" width="180" height="96" rx="12" fill="var(--CR)"/><path d="M50 -96 L100 -96 L130 -56 L130 -24 L50 -24Z" fill="var(--CR)"/><path d="M60 -88 L96 -88 L118 -60 L60 -60Z" fill="#9FD3FF"/><rect x="-130" y="-70" width="260" height="12" fill="#E5322B"/><rect x="-62" y="-112" width="16" height="40" rx="3" fill="#E5322B"/><rect x="-74" y="-100" width="40" height="16" rx="3" fill="#E5322B"/><rect x="-20" y="-136" width="40" height="16" rx="6" fill="#2B8CFF"/><circle cx="-80" cy="-22" r="22" fill="var(--INKW)"/><circle cx="80" cy="-22" r="22" fill="var(--INKW)"/></g></g>`};
const engFlag=(id,x,bottom,h)=>{const k=h/200;return `<g id="${id}"><g transform="translate(${x} ${bottom}) scale(${k})"><rect x="-4" y="-200" width="8" height="200" rx="4" fill="var(--INKW)"/><rect x="4" y="-196" width="150" height="96" rx="6" fill="#FFFFFF"/><rect x="64" y="-196" width="30" height="96" fill="#E5322B"/><rect x="4" y="-163" width="150" height="30" fill="#E5322B"/></g></g>`};
const sun=(id,cx,cy,r)=>{let s='';for(let i=0;i<8;i++){const a=i*Math.PI/4;s+=`<path d="M${cx+Math.cos(a)*r*1.25} ${cy+Math.sin(a)*r*1.25} L${cx+Math.cos(a)*r*1.6} ${cy+Math.sin(a)*r*1.6}" stroke="var(--SU)" stroke-width="${r*.22}" stroke-linecap="round"/>`}return `<g id="${id}">${s}<circle cx="${cx}" cy="${cy}" r="${r}" fill="var(--SU)"/></g>`};
const snow=(id,cx,cy,r)=>{let s='';for(let i=0;i<3;i++){const a=i*Math.PI/3;s+=`<path d="M${cx-Math.cos(a)*r} ${cy-Math.sin(a)*r} L${cx+Math.cos(a)*r} ${cy+Math.sin(a)*r}" stroke="#9FD3FF" stroke-width="${r*.2}" stroke-linecap="round"/>`}return `<g id="${id}">${s}<circle cx="${cx}" cy="${cy}" r="${r*.22}" fill="#9FD3FF"/></g>`};
const crowd=(id,cx,n,h,cols,m={g:'ground',a:'bottom'},G0=GND)=>{const sh=['var(--CO)','var(--MI)','var(--SU)','#9FD3FF','#B794FF'];let s='';const rows=Math.ceil(n/cols),dx=h*.42;for(let r=rows-1;r>=0;r--)for(let c=0;c<cols&&r*cols+c<n;c++){const x=cx+(c-(cols-1)/2)*dx+(r%2?dx/2:0),y=G0-r*h*.28;s+=fb(id+r+c,Math.round(x),Math.round(y),h,{shirt:sh[(r*cols+c)%5],shirtD:sh[(r*cols+c+2)%5],hairStyle:(r+c)%2})}return tag(`<g id="${id}">${s}</g>`,m)};
const hchart=(id,c)=>`<g id="${id}"><rect x="${c.x-4}" y="${c.y}" width="8" height="${c.h}" rx="4" fill="var(--g2)"/><rect x="${c.x-4}" y="${c.y+c.h-4}" width="${c.w+4}" height="8" rx="4" fill="var(--g2)"/></g>`+heart(id+'h',c.x-64,c.y+40,72);
const banLine=(id,c,u,r=44)=>{const x=Math.round(c.x+u*c.w);return `<g id="${id}"><path d="M${x} ${c.y+r*2} L${x} ${c.y+c.h-8}" stroke="var(--g1)" stroke-width="6" stroke-dasharray="16 16" fill="none"/>${noSmoke(id+'s',x,c.y+r-8,r)}</g>`};
const tline=(c,u0,u1,a,b,amp,n,seed)=>series(c,u0,u1,u=>a+(b-a)*(u-u0)/(u1-u0||1),amp,n,seed);
const dash=(id,c,u0,u1,a,b,col='var(--g1)',w=8)=>ln(id,`M${pt(c,u0,a)} L${pt(c,u1,b)}`,col,w,true);
const vbr=(id,c,u,a,b,col)=>brace(id,Math.round(c.x+u*c.w)+16,Math.round(c.y+c.h-a*c.h),Math.round(c.y+c.h-b*c.h),col);
const funnel=(id,cx,top,w,h,col='var(--g2)')=>`<g id="${id}"><path d="M${cx-w/2} ${top} L${cx+w/2} ${top} L${cx+w*.09} ${top+h*.7} L${cx+w*.09} ${top+h} L${cx-w*.09} ${top+h} L${cx-w*.09} ${top+h*.7}Z" fill="${col}"/><rect x="${cx-w/2-12}" y="${top-16}" width="${w+24}" height="24" rx="12" fill="var(--g1)"/></g>`;
/* 效应量条：虚线=本该有的长度；实心=实际；缺掉的一截（MI）标 −2.4%（示意，缺口已放大）。split=缺口两半（禁烟/另一件事） */
const effBar=(id,x,y,w,h,o={})=>{const g=o.g??.16,sw=Math.round(w*(1-g)),gw=w-sw,gx=x+sw,fs=o.size??56;
  const gap=o.split?`<rect id="${id}g1" x="${gx}" y="${y}" width="${Math.round(gw/2)}" height="${h}" fill="var(--MI)"/><rect id="${id}g2" x="${gx+Math.round(gw/2)}" y="${y}" width="${gw-Math.round(gw/2)}" height="${h}" fill="#8A88C0"/>`:`<rect id="${id}g" x="${gx}" y="${y}" width="${gw}" height="${h}" fill="var(--MI)"/>`;
  const ty=o.below?y+h+fs+12:y-24;
  return `<g id="${id}"><rect id="${id}o" x="${x}" y="${y}" width="${w}" height="${h}" rx="16" fill="none" stroke="var(--g1)" stroke-width="6" stroke-dasharray="18 14"/><rect id="${id}s" x="${x}" y="${y}" width="${sw}" height="${h}" rx="16" fill="var(--CO)"/><rect x="${x+sw-16}" y="${y}" width="16" height="${h}" fill="var(--CO)"/>`+
  `<g id="${id}d">${gap}`+K.stext(id+'t',gx+gw/2,ty,'−2.4%',{anchor:'middle',fill:'var(--ink)',size:fs,weight:700})+`</g></g>`};
const grave=(id,cx,bottom,h)=>{const k=h/200;return `<g id="${id}"><g transform="translate(${cx} ${bottom}) scale(${k})"><path d="M-70 0 L-70 -130 Q-70 -200 0 -200 Q70 -200 70 -130 L70 0Z" fill="var(--g2)"/><rect x="-10" y="-170" width="20" height="90" rx="4" fill="var(--g4)"/><rect x="-36" y="-148" width="72" height="20" rx="4" fill="var(--g4)"/><rect x="-90" y="-12" width="180" height="12" rx="6" fill="var(--g3)"/></g></g>`};
const pills=(id,cx,bottom,h)=>{const k=h/200;return `<g id="${id}"><g transform="translate(${cx} ${bottom}) scale(${k})"><rect x="-60" y="-160" width="120" height="160" rx="18" fill="#FF9E3D"/><rect x="-70" y="-200" width="140" height="44" rx="10" fill="var(--CR)"/><rect x="-44" y="-112" width="88" height="64" rx="8" fill="var(--CR)"/><rect x="-20" y="-96" width="40" height="32" rx="16" fill="#E5322B"/></g></g>`};

/* 01 开场：只看政策之后——禁烟后心梗住院线往下走 */
{const c=CF(296,1380);
scene('hook','none',A=>A.P(0),svg(hchart('ax',c)+banLine('b',c,.5)+`<rect x="${c.x+8}" y="${c.y}" width="${Math.round(.5*c.w)-16}" height="${c.h-8}" rx="24" fill="var(--g4)"/>`+Q('q0',Math.round(c.x+.25*c.w),Math.round(c.y+c.h*.5),160,'var(--g2)')+
  ln('l',tline(c,.5,.97,.62,.32,.06,22,1),LOC,12)+hospital('hs',LEG,GND-120,300,{})+ambulance('am',LEG,GND,120)),'i');}

/* 02 往前拉：政策前就在一年年往下走，政策后只是接着走 */
{const c=CF(296,1380);
scene('pull','schematic',A=>A.P(2),svg(hchart('ax',c)+banLine('b',c,.6)+ln('l',tline(c,.03,.97,.9,.3,.07,46,2),LOC,12)+dash('d',c,.6,.97,.9-.6*.6/.94*1+.0,.3)+
  heart('h',LEG,420,160)+AR('dn',LEG,560,LEG,GND-40,'var(--CO)',18)),'u');}

/* 03 打比方：每年都少 100——政策前后一样 */
{const vals=[560,480,400,320,240],bw=200,gap=(W-5*bw)/4;
scene('mistake','teaching',A=>A.P(3),svg(gnd()+vals.map((v,i)=>bar('b'+i,X0+i*(bw+gap),bw,v,i===4?LOC:'var(--g3)',{g:'bars',a:'bottom'})+(i?pill('p'+i,X0+i*(bw+gap)+bw/2,GND-v-64,160,72,'−100',i===4?LOC:'var(--g2)','var(--INK)',40,{}):'')).join('')+
  noSmoke('ns',X0+3*(bw+gap)+bw+gap/2,GND-560,72)+`<path d="M${X0+3*(bw+gap)+bw+gap/2} ${GND-480} L${X0+3*(bw+gap)+bw+gap/2} ${GND}" stroke="var(--g1)" stroke-width="6" stroke-dasharray="16 16"/>`),'c');}

/* 04 真正要问的两件事：①原来走势会到哪（空白报纸=反事实）②实际有没有再多降 */
{const c=CF(296,1380);
scene('two','schematic',A=>A.P(4),svg(hchart('ax',c)+banLine('b',c,.6)+ln('l',tline(c,.03,.6,.92,.58,.06,26,3),LOC,12)+ln('l2',tline(c,.6,.97,.5,.18,.05,16,4),LOC,12)+dash('d',c,.6,.97,.58,.37,'var(--ink)',8)+
  vbr('br',c,.97,.37,.2,'var(--MI)')+K.nodeOn('n1',Math.round(c.x+.97*c.w)-24,Math.round(c.y+c.h-.37*c.h)-64,1)+K.nodeOn('n2',Math.round(c.x+.97*c.w)+88,Math.round(c.y+c.h-.28*c.h),2)+
  paper('p',1560,GND,240,false,{})),'i');}

/* 05 反事实的替身：上一集是另一个州；这一集是这条线自己的过去 */
{const cw=686,ch=520,y0=GND-ch,m=mini(C2[1],y0,cw,ch);
scene('cf','none',A=>A.P(5),K.term('term',1,160,'反事实')+svg(tag(card('c0',C2[0],y0,cw,ch),{g:'card',a:'bottom'})+tag(card('c1',C2[1],y0,cw,ch),{g:'card',a:'bottom'})+
  storeAt('s0',C2[0]+190,GND-64,240,FOC,{},{flag:true})+storeAt('s1',C2[0]+500,GND-64,240,'var(--g1)',{},{flag:true})+M('x',C2[0]+cw-80,y0+80,112,false)+
  axes(m)+ln('l',tline(m,.02,.6,.9,.55,.05,18,5),LOC,10)+dash('d',m,.6,.98,.55,.33,'var(--ink)',8)+M('ok',C2[1]+cw-80,y0+80,112,true)),'u');}

/* 06 研究：英格兰 2007 年 7 月无烟立法；成年人心梗急诊住院 */
scene('study','record',A=>A.P(6),svg(gnd()+engFlag('f',X0+16,GND,440)+L('l1',X0+96,GND-468,'英格兰','var(--ink)',48)+noSmoke('ns',X0+580,GND-300,140)+ic('cal','calendar',X0+580,GND-72,120,'var(--g1)')+
  hospital('hs',C3c[2]-40,GND,420)+ambulance('am',C3c[1]+150,GND,140)+heart('h',C3c[1]+150,GND-250,120)+
  L('l0',X0+580,GND+66,'2007.7','var(--ink)',40)),'i');

/* 07 资料：政策前 5 年 + 政策后 15 个月，按周计 */
{const c=CF(400);let d='';const N=86;for(let i=0;i<N;i++){const u=.02+.96*i/(N-1),v=.62-.2*u+.12*Math.sin(u*Math.PI*2*6.25)+.04*rnd(i);d+=`<circle cx="${Math.round(c.x+u*c.w)}" cy="${Math.round(c.y+c.h-v*c.h)}" r="7" fill="${LOC}"/>`}
const ux=u=>Math.round(c.x+u*c.w);
scene('data','record',A=>A.P(7),svg(hchart('ax',c)+banLine('b',c,.8)+`<g id="dots">${d}</g>`+
  [0,1,2,3,4].map(k=>ic('cy'+k,'calendar',ux(.08+k*.16),296,96,'var(--g1)',{g:'cal',a:'cy'})).join('')+ic('cm','calendar',ux(.9),296,96,'var(--CO)',{g:'cal',a:'cy'})+
  L('a',ux(.4),GND+66,'5年','var(--ink)',40,{g:'lab',a:'bottom'})+L('b2',ux(.9),GND+66,'15个月',LOC,40,{g:'lab',a:'bottom'})),'u');}

/* 08 三样东西影响住院：长期趋势 / 季节 / 人口 → 医院 */
{const cw=448,ch=330,y0=200;
scene('three','schematic',A=>A.P(8),svg([0,1,2].map(k=>tag(card('c'+k,C3[k],y0,cw,ch),{g:'card',a:'top'})+K.nodeOn('n'+k,C3[k]+56,y0+56,k+1)).join('')+
  (()=>{const m={x:C3[0]+72,y:y0+96,w:cw-144,h:ch-160};return axes(m)+ln('t',`M${pt(m,.05,.8)} L${pt(m,.95,.25)}`,LOC,12)})()+
  snow('sn',C3c[1]-90,y0+ch/2+16,64)+sun('su',C3c[1]+100,y0+ch/2+16,48)+crowd('cr',C3c[2],6,160,3,{},y0+ch-32)+
  hospital('hs',960,GND,250)+AR('a0',C3c[0],y0+ch+16,800,GND-160,'var(--g1)',12)+AR('a2',C3c[2],y0+ch+16,1120,GND-160,'var(--g1)',12)),'i');}

/* 09 长期趋势：很多年慢慢变多或变少 */
{const c=CF(296);
scene('trend','schematic',A=>A.P(9),svg(hchart('ax',c)+ln('u',tline(c,.03,.97,.3,.8,.06,46,6),'var(--g1)',10)+ln('d',tline(c,.03,.97,.75,.2,.06,46,7),LOC,12)+
  [0,1,2,3,4,5].map(k=>ic('cy'+k,'calendar',Math.round(c.x+(.1+k*.16)*c.w),GND+64,64,'var(--g1)',{g:'cal',a:'cy'})).join('')),'i');}

/* 10 季节：冬天（雪花）高、夏天（太阳）低；七月实施——拿冬比夏会看错 */
{const c=CF(376),f=u=>.5+.28*Math.cos((u-.04)*Math.PI*2*3);const d=series(c,.02,.98,f,.03,72,8);
const ux=u=>Math.round(c.x+u*c.w),uy=u=>Math.round(c.y+c.h-f(u)*c.h);
scene('season','schematic',A=>A.P(10),svg(hchart('ax',c)+banLine('b',c,.54,40)+ln('l',d,LOC,12)+
  [.04,.373,.707].map((u,k)=>snow('sn'+k,ux(u),uy(u)-80,40)).join('')+[.207,.54,.873].map((u,k)=>sun('su'+k,ux(u),uy(u)+90,28)).join('')+
  AR('cmp',ux(.207)+40,uy(.207)-20,ux(.707)-60,uy(.707)+24,'var(--ink)',10)+M('x',ux(.46),uy(.46)-120,96,false)),'u');}

/* 11 人口规模：人多了，住院人数自然多 */
scene('pop','schematic',A=>A.P(11),svg(gnd()+crowd('c0',520,4,210,2)+crowd('c1',1180,9,210,3)+hospital('h0',810,GND,190,{g:'hs',a:'bottom'})+hospital('h1',1520,GND,190,{g:'hs',a:'bottom'})+
  ambulance('a0',810,GND-206,76)+ambulance('a1',1460,GND-206,76)+ambulance('a2',1590,GND-206,76)+
  `<rect x="${X0+686+4}" y="${GND-520}" width="16" height="520" rx="8" fill="var(--g3)"/>`),'i');

/* 12 没分清就全记到政策头上：三样东西压在禁烟标志上；政策前 5 年用来摸清规律 */
scene('blame','schematic',A=>A.P(12),svg(gnd()+noSmoke('ns',C2c[0],GND-190,190)+
  (()=>{const m={x:C2[0]+40,y:248,w:150,h:96};return `<rect x="${m.x-20}" y="${m.y-20}" width="${m.w+40}" height="${m.h+40}" rx="20" fill="var(--g4)"/>`+ln('t',`M${pt(m,0,.9)} L${pt(m,1,.1)}`,LOC,10)})()+
  snow('sn',C2c[0]-20,296,44)+sun('su',C2c[0]+90,296,30)+crowd('cr',C2[0]+590,3,120,3,{},360)+
  [C2[0]+130,C2c[0]+35,C2[0]+590].map((x,k)=>AR('a'+k,x,384,C2c[0]+(k-1)*100,GND-400,'var(--g1)',10)).join('')+M('x',C2c[0]+170,GND-330,104,false)+
  `<rect x="${C2[1]}" y="${GND-520}" width="686" height="520" rx="32" fill="var(--g4)"/>`+[0,1,2,3,4].map(k=>ic('cy'+k,'calendar',C2[1]+103+k*120,GND-420,96,'var(--g1)',{g:'cal',a:'cy'})).join('')+
  ic('mg','magnifier',C2c[1]+170,GND-170,220,'var(--INK)')+L('l',C2c[1]-140,GND-150,'5年','var(--INK)',96)),'c');

/* 13 打断时间序列（回顾）：看清原来的走势，再看禁烟一来有没有被打断 */
{const c={x:346,y:456,w:1312,h:384};
scene('its','none',A=>A.P(13),K.term('term',1,160,'打断时间序列')+svg(hchart('ax',c)+banLine('b',c,.6,40)+ln('l',tline(c,.03,.6,.85,.6,.05,30,9),LOC,12)+ln('l2',tline(c,.6,.97,.42,.25,.05,18,10),LOC,12)+dash('d',c,.6,.97,.6,.45,'var(--ink)',8)),'i');}

/* 14 水平变化：像下了一级台阶，之后同速 */
const stairs=(id,x,bottom,w,h,col)=>`<g id="${id}"><path d="M${x} ${bottom-h} L${x+w*.5} ${bottom-h} L${x+w*.5} ${bottom-h*.45} L${x+w} ${bottom-h*.45} L${x+w} ${bottom} L${x} ${bottom}Z" fill="${col}"/></g>`;
{const c={x:346,y:400,w:1000,h:440};
scene('level','none',A=>A.P(15),K.term('term',1,160,'水平变化')+svg(hchart('ax',c)+banLine('b',c,.5,40)+ln('l',`M${pt(c,.03,.85)} L${pt(c,.5,.66)} L${pt(c,.5,.4)} L${pt(c,.97,.21)}`,LOC,14)+dash('d',c,.5,.97,.66,.47,'var(--ink)',8)+
  stairs('st',1420,GND,238,320,'var(--SU)')+fb('p',1480,GND-320,200,{shirt:'var(--CO)',shirtD:'var(--COD)'})),'u');}
/* 15 斜率变化：降得更快，线变陡 */
{const c={x:346,y:400,w:1000,h:440};
scene('slope','none',A=>A.P(16),K.term('term',1,160,'斜率变化')+svg(hchart('ax',c)+banLine('b',c,.5,40)+ln('l',`M${pt(c,.03,.85)} L${pt(c,.5,.66)} L${pt(c,.97,.12)}`,LOC,14)+dash('d',c,.5,.97,.66,.47,'var(--ink)',8)+
  `<path d="M1420 ${GND} L1420 ${GND-320} L1658 ${GND}Z" fill="var(--SU)"/><path d="M1420 ${GND} L1420 ${GND-140} L1658 ${GND}Z" fill="var(--g2)"/>`),'i');}

/* 16 这是设计上的概念（铅笔草图），不是论文发现 */
{const cw=686,ch=520,y0=GND-ch;
const sk=(k,d)=>{const m=mini(C2[k],y0,cw,ch);return tag(card('c'+k,C2[k],y0,cw,ch),{g:'card',a:'bottom'})+axes(m)+ln('l'+k,d(m),'var(--g1)',10,true)};
scene('sketch','schematic',A=>A.P(17),svg(sk(0,m=>`M${pt(m,.02,.85)} L${pt(m,.5,.66)} L${pt(m,.5,.4)} L${pt(m,.98,.21)}`)+sk(1,m=>`M${pt(m,.02,.85)} L${pt(m,.5,.66)} L${pt(m,.98,.1)}`)+
  `<g id="pen"><g transform="translate(1500 ${y0+200}) rotate(40)"><rect x="-22" y="-160" width="44" height="240" rx="8" fill="var(--SU)"/><path d="M-22 80 L22 80 L0 130Z" fill="var(--CRS)"/><rect x="-22" y="-160" width="44" height="40" rx="8" fill="var(--CO)"/></g></g>`),'u');}

/* 17 判断三步：①画出原来走势 ②往后延长当参照 ③量差距 */
{const c=CF(296,1380);
scene('steps','schematic',A=>A.P(18),svg(hchart('ax',c)+banLine('b',c,.6)+ln('l',tline(c,.03,.6,.92,.58,.06,26,3),'var(--g1)',8)+ln('fit',`M${pt(c,.03,.92)} L${pt(c,.6,.58)}`,'var(--SU)',10)+
  ln('l2',tline(c,.6,.97,.48,.2,.05,16,4),LOC,12)+dash('d',c,.6,.97,.58,.36,'var(--SU)',10)+vbr('br',c,.97,.36,.2,'var(--MI)')+
  K.nodeOn('n1',Math.round(c.x+.3*c.w),Math.round(c.y+c.h-.75*c.h)-72,1)+K.nodeOn('n2',Math.round(c.x+.8*c.w),Math.round(c.y+c.h-.47*c.h)-72,2)+K.nodeOn('n3',Math.round(c.x+.97*c.w)+88,Math.round(c.y+c.h-.28*c.h),3)+
  paper('p',1560,GND,240,false,{})),'i');}

/* 18 不能一看到线往下就说有效：要把原走势摆在旁边 */
{const cw=686,ch=520,y0=GND-ch;
const pn=(k)=>{const m=mini(C2[k],y0,cw,ch);return tag(card('c'+k,C2[k],y0,cw,ch),{g:'card',a:'bottom'})+axes(m)+(k?ln('f',`M${pt(m,.02,.9)} L${pt(m,.98,.3)}`,'var(--ink)',8,true):'')+ln('l'+k,tline(m,.02,.98,.9,.2,.05,22,11),LOC,10)+M('m'+k,C2[k]+cw-80,y0+80,104,!!k)};
scene('ref','schematic',A=>A.P(19),svg(pn(0)+pn(1)),'u');}

/* 19 结果：模型（漏斗）滤掉趋势、季节、人口后 → 额外下降约 2.4% */
scene('result','record',A=>A.P(20),svg(gnd()+(()=>{const m={x:X0+40,y:280,w:220,h:140};return `<rect x="${m.x-24}" y="${m.y-24}" width="${m.w+48}" height="${m.h+48}" rx="24" fill="var(--g4)"/>`+ln('t',`M${pt(m,0,.9)} L${pt(m,1,.1)}`,LOC,10)})()+
  snow('sn',X0+90,540,52)+sun('su',X0+230,540,36)+crowd('cr',X0+150,3,150,3,{},GND)+
  [350,540,740].map((y,k)=>AR('a'+k,X0+360,y,800,420+k*20,'var(--g1)',10)).join('')+funnel('fn',960,320,400,420)+
  AR('o',1060,700,1240,700,'var(--MI)',14)+effBar('eb',1280,640,370,120,{g:.2,size:64})+noSmoke('ns',1460,430,120)),'i');

/* 20 跟谁比：跟“政策前”比（×）vs 跟“本该有多少”比（✓） */
{const c=CF(296,1280),ex=Math.round(c.x+.97*c.w),Y=v=>Math.round(c.y+c.h-v*c.h);
scene('vs','schematic',A=>A.P(21),svg(hchart('ax',c)+banLine('b',c,.6)+ln('l',tline(c,.03,.6,.92,.6,.05,26,3),LOC,12)+ln('l2',tline(c,.6,.97,.52,.3,.04,16,4),LOC,12)+
  `<path d="M${pt(c,.6,.6)} L${pt(c,.97,.6)}" stroke="var(--g1)" stroke-width="6" stroke-dasharray="8 12"/>`+dash('d',c,.6,.97,.6,.44,'var(--ink)',8)+
  brace('b1',ex+16,Y(.6),Y(.3),'var(--g1)')+brace('b2',ex+72,Y(.44),Y(.3),'var(--MI)')+
  M('x',ex+120,Y(.6),96,false)+pill('p',ex+250,Y(.37)+8,240,104,'−2.4%','var(--MI)','var(--INK)',52)+M('ok',ex+390,Y(.37)-56,80,true)),'u');}

/* 21 置信区间：尺子上 0.66%–4.06%，没有跨过 0 */
{const x0=X0+40,x1=X1-40,u=v=>Math.round(x0+(x1-x0)*v/5),ry=680;
scene('ci','record',A=>A.P(24),svg(`<rect x="${x0-40}" y="${ry}" width="${x1-x0+80}" height="160" rx="20" fill="var(--SU)"/>`+
  [...Array(51).keys()].map(i=>`<rect x="${u(i/10)-3}" y="${ry}" width="6" height="${i%10?32:64}" fill="var(--INK)"/>`).join('')+
  [0,1,2,3,4,5].map(v=>K.stext('t'+v,u(v),ry+120,v+'%',{anchor:'middle',fill:'var(--INK)',size:40,weight:700})).join('')+
  `<rect x="${u(.66)}" y="${ry-120}" width="${u(4.06)-u(.66)}" height="72" rx="36" fill="var(--MI)"/>`+`<circle cx="${u(2.4)}" cy="${ry-84}" r="44" fill="var(--CO)"/>`+
  L('a',u(.66),ry-168,'0.66','var(--ink)',48)+L('b',u(4.06),ry-168,'4.06','var(--ink)',48)+L('c',u(2.4),ry-168,'2.4','var(--CO)',56)+
  `<rect x="${u(0)-6}" y="${ry-260}" width="12" height="260" rx="6" fill="var(--CO)"/>`+M('ok',u(0)+90,ry-300,96,true)),'i');}

/* 22 指标范围：只是心梗急诊住院；不等于所有疾病、不等于总死亡 */
{const cw=448,ch=520,y0=GND-ch;
scene('scope','record',A=>A.P(25),svg([0,1,2].map(k=>tag(card('c'+k,C3[k],y0,cw,ch),{g:'card',a:'bottom'})+M('m'+k,C3[k]+cw-72,y0+72,96,k===0)).join('')+
  heart('h',C3c[0],y0+200,180)+ambulance('am',C3c[0],GND-56,150)+pills('pl',C3c[1],GND-56,300)+grave('gv',C3c[2],GND-56,300)),'c');}

/* 23 两个问题：统计结论效度（秤称得准不准） vs 内部效度（放大镜查是谁干的） */
{const cw=686,ch=560,y0=GND-ch;
scene('validity','none',A=>A.P(28),svg([0,1].map(k=>tag(card('c'+k,C2[k],y0,cw,ch),{g:'card',a:'bottom'})+K.nodeOn('n'+k,C2[k]+72,y0+72,k+1)).join('')+
  effBar('eb',C2[0]+80,GND-300,526,140,{g:.18})+
  ic('mg','magnifier',C2c[1]+20,GND-280,320,'var(--ink)')+noSmoke('ns',C2c[1]+20-43,GND-280-43,84)+Q('q',C2c[1]+170,y0+120,104,'var(--SU)')+
  L('l0',C2c[0],GND-48,'统计结论效度','var(--ink)',48,{g:'lab',a:'bottom'})+L('l1',C2c[1],GND-48,'内部效度','var(--ink)',48,{g:'lab',a:'bottom'})),'i');}

/* 24 算得准，算的却是混在一起的：秤盘上同时放着禁烟和另一件事（乌云） */
scene('mixed','schematic',A=>A.P(31),svg(gnd()+effBar('eb',560,GND-300,800,170,{g:.3,split:true,below:true})+noSmoke('ns',1150,GND-400,64)+storm('st',1340,GND-470,200,[[1320,GND-430,GND-312]])+M('ok',C3c[0]-40,GND-360,128,true)+Q('q',C3c[2]+120,GND-360,200,'var(--SU)')),'u');

/* 25 历史威胁：只有一条线时，同时发生的别的事和禁烟分不开 */
{const c={x:346,y:456,w:1312,h:384};
scene('history','none',A=>A.P(32),K.term('term',1,160,'历史威胁')+svg(hchart('ax',c)+ln('l',tline(c,.03,.6,.85,.6,.05,30,9),LOC,12)+ln('l2',tline(c,.6,.97,.42,.25,.05,18,10),LOC,12)+
  `<path d="M${Math.round(c.x+.6*c.w)} ${c.y} L${Math.round(c.x+.6*c.w)} ${c.y+c.h-8}" stroke="var(--g1)" stroke-width="6" stroke-dasharray="16 16"/>`+noSmoke('ns',Math.round(c.x+.6*c.w)-220,344,80)+storm('st',Math.round(c.x+.6*c.w)+250,320,340,[[Math.round(c.x+.6*c.w)+170,360,452]])+Q('q',Math.round(c.x+.6*c.w),330,104,'var(--ink)')),'c');}

/* 26 前一个答好，不会自动答完后一个：秤 ✓ → 放大镜 ? */
{const cw=686,ch=520,y0=GND-ch;
scene('notauto','schematic',A=>A.P(33),svg([0,1].map(k=>tag(card('c'+k,C2[k],y0,cw,ch),{g:'card',a:'bottom'})).join('')+effBar('eb',C2[0]+80,GND-260,526,130,{g:.18})+M('m0',C2[0]+cw-80,y0+80,104,true)+
  ic('mg','magnifier',C2c[1],GND-260,320,'var(--ink)')+noSmoke('ns',C2c[1]-43,GND-303,84)+Q('m1',C2[1]+cw-80,y0+96,112,'var(--SU)')+
  `<path d="M${C2[1]-4} ${y0+ch/2-40} L${C2[1]+20} ${y0+ch/2} L${C2[1]-4} ${y0+ch/2+40}" stroke="var(--ink)" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`),'i');}

/* 27 研究的价值：长期记录 + 原趋势参照 → 对健康有好处的证据 */
{const c=CF(296,1380);
scene('value','record',A=>A.P(34),svg(hchart('ax',c)+banLine('b',c,.8)+ln('l',tline(c,.02,.8,.9,.5,.05,40,12),LOC,12)+ln('l2',tline(c,.8,.98,.43,.33,.04,10,13),LOC,12)+dash('d',c,.8,.98,.5,.41,'var(--ink)',8)+
  `<rect x="${c.x+8}" y="${c.y+96}" width="${Math.round(.8*c.w)-16}" height="${Math.round(c.h*.6)-96}" rx="24" fill="none" stroke="var(--MI)" stroke-width="6" stroke-dasharray="18 14"/>`+
  heart('h',LEG,GND-300,200)+M('ok',LEG+90,GND-400,96,true)+ic('cb','clipboard-pen',LEG,GND-72,144,'var(--MI)')),'u');}

/* 28 时间先后只是起点：禁烟站在起跑线，终点（因果）还远 */
scene('start','schematic',A=>A.P(35),svg(`<rect x="${X0}" y="${GND-280}" width="${W}" height="280" rx="32" fill="#E0573E"/>`+[1,2,3].map(k=>`<rect x="${X0}" y="${GND-280+k*70-3}" width="${W}" height="6" fill="var(--CR)"/>`).join('')+
  `<rect x="${X0+300}" y="${GND-280}" width="20" height="280" fill="var(--CR)"/>`+[0,1,2,3,4,5,6].map(k=>`<rect x="${X1-120}" y="${GND-280+k*40}" width="40" height="40" fill="${k%2?'var(--INK)':'var(--CR)'}"/><rect x="${X1-80}" y="${GND-280+k*40}" width="40" height="40" fill="${k%2?'var(--CR)':'var(--INK)'}"/>`).join('')+
  noSmoke('ns',X0+310,GND-400,110)+fb('p',X0+120,GND-150,300,{shirt:'var(--MI)',shirtD:'var(--MID)'})+Q('q',X1-80,GND-440,200,'var(--SU)')+
  AR('ar',X0+520,GND-420,X1-240,GND-420,'var(--ink)',14)),'i');

/* 29 收尾：别只问降了多少——本来会降多少？多降的凭什么归给政策？ */
{const c=CF(296,1380);
scene('close','none',A=>A.P(36),svg(hchart('ax',c)+banLine('b',c,.6)+ln('l',tline(c,.03,.6,.92,.58,.06,26,3),LOC,12)+ln('l2',tline(c,.6,.97,.5,.18,.05,16,4),LOC,12)+dash('d',c,.6,.97,.58,.36,'var(--ink)',8)+
  vbr('br',c,.97,.36,.2,'var(--MI)')+Q('q',Math.round(c.x+.97*c.w)+40,Math.round(c.y+c.h-.28*c.h)-200,104,'var(--SU)')+paper('p',1570,GND,240,false,{})),'u');}

Object.assign(REV,{"hook": [["#l", 0, "少了", "draw"], ["#q0", 0, "先别急", "pop"]], "pull": [["#l", 2, "一年一年", "draw"], ["#d", 2, "哪怕没有", "draw"], ["#dn", 2, "接着降"]], "mistake": [["#p1,#p2,#p3", 3, "每年少一百", "pop"], ["#b4,#p4", 3, "也少了一百", "pop"], ["#ns", 3, "只看政策前后", "pop"]], "two": [["#n1", 4, "第一", "pop"], ["#d", 4, "原来的走势", "draw"], ["#p", 4, "走到哪里", "pop"], ["#n2,#br", 4, "第二", "pop"]], "cf": [["#x", 5, "另一个州", "pop"], ["#d", 5, "往后延伸", "draw"], ["#ok", 5, "没有政策会走到哪里", "pop"]], "study": [["#ns,#l0", 6, "二〇〇七年七月", "pop"], ["#h", 6, "急性心肌梗死", "pop"], ["#am", 6, "急诊住院"]], "data": [["#cy0,#cy1,#cy2,#cy3,#cy4,#a", 7, "政策前五年"], ["#cm,#b2", 7, "十五个月", "pop"], ["#dots", 7, "按周统计"]], "three": [["#a0,#a2", 8, "三样东西"]], "trend": [["#u", 9, "慢慢变多", "draw"], ["#d", 9, "慢慢变少", "draw"]], "season": [["#sn0,#sn1,#sn2", 10, "冬天", "pop"], ["#su0,#su1,#su2", 10, "夏天", "pop"], ["#cmp", 10, "去比"], ["#x", 10, "季节在作怪", "pop"]], "pop": [["#c1", 11, "人多了", "pop"], ["#a1,#a2", 11, "自然也会多"]], "blame": [["#a0,#a1,#a2", 12, "一股脑"], ["#x", 12, "政策头上", "pop"], ["#mg", 12, "摸清楚", "pop"]], "its": [["#l2,#d", 13, "有没有被打断", "draw"]], "level": [["#st,#p", 15, "一级台阶", "pop"], ["#d", 15, "原来的速度", "draw"]], "slope": [["#d", 16, "变陡", "draw"]], "sketch": [["#pen", 17, "设计上的概念", "pop"]], "steps": [["#n1", 18, "第一步", "pop"], ["#fit", 18, "画出来", "draw"], ["#n2", 18, "第二步", "pop"], ["#d", 18, "往后延长", "draw"], ["#n3,#br", 18, "第三步", "pop"]], "ref": [["#f", 19, "摆在旁边", "draw"], ["#m1", 19, "多出来", "pop"]], "result": [["#a0,#a1,#a2", 20, "考虑进去"], ["#o", 20, "立法以后"], ["#ebd", 20, "百分之二点四", "pop"]], "vs": [["#b1,#x", 21, "减去政策前", "pop"], ["#d", 21, "模型", "draw"], ["#l2", 21, "人口这些", "draw"], ["#p", 22, "本该有多少", "pop"], ["#ok", 23, "跟谁比", "pop"], ["#b2", 23, "跟反事实参照比", "pop"]], "ci": [["#a,#b", 24, "百分之零点六六", "pop"], ["#c", 24, "置信区间", "pop"], ["#ok", 24, "没有跨过零", "pop"]], "scope": [["#m1", 25, "所有疾病", "pop"], ["#m2", 25, "总死亡", "pop"]], "validity": [["#ebd", 28, "变化有多大", "pop"], ["#mg,#ns,#l1", 29, "内部效度", "pop"], ["#q", 29, "别的事情", "pop"]], "mixed": [["#st", 31, "另一件", "pop"], ["#ebd", 31, "百分之二点四", "pop"], ["#ok", 31, "数字照样精确", "pop"], ["#q", 31, "不全", "pop"]], "history": [["#st", 32, "历史威胁", "pop"], ["#q", 32, "最怕", "pop"]], "notauto": [["#m0", 33, "答得好", "pop"], ["#m1", 33, "答完后一个", "pop"]], "value": [["#d", 34, "原来的趋势", "draw"], ["#ok", 34, "证据", "pop"]], "start": [["#q", 35, "因果推理", "pop"], ["#ar", 35, "起点"]], "close": [["#d", 36, "本来会降多少", "draw"], ["#br", 36, "多降的", "pop"], ["#q", 36, "凭什么", "pop"]]});
window.SCENES=S;
})();
