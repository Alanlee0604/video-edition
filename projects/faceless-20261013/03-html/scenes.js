/* 第03集 关键帧（静帧）：沿用第01集 v4 视觉系统。
   网格：12 栏，主体落在 262…1658（宽 1396），水平中心 960；纵向 8px 基线，地平线 GND=840。
   等分：C4（328/28）、C3（448/26）、C2（686/24）。圆角 R1=16 / R2=32。同组元素打 data-g/data-a 供 align_check。 */
(function(){
const K=window.KIT;const S=[];
/* 动画：底层元素在场景开始即出现（避免空白）；rev 中的元素按旁白词时间依次出现。verb: in | pop | draw */
const scene=(id,kind,start,html,theme,rev=[])=>S.push({id,kind,start,html,theme,build:(V)=>{const {A,t0}=V;V.in('#m',t0+.05);
  for(const [sel,p,w,verb='in',d=0] of rev){const t=(w?A.W(p,w):A.P(p))+d;if(verb==='draw')V.draw(sel,t,1.1);else V[verb](sel,t)}}});
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

/* 01 开场：一条骤降的线 + 一条完全没动的线（被问号点名） */
{const c=CF(296,1380);
scene('hook','none',A=>A.P(0),svg(pchart('ax',c)+feeLine('f',c,.5)+
  ln('lo',series(c,.03,.5,u=>.78,.06,24,1)+' L'+series(c,.52,.97,u=>.3,.05,22,2).slice(1),LOC,10)+
  ln('ld',series(c,.03,.97,u=>.5,.05,46,3),LD,10)+phone('p0',LEG,GND-320,160,LOC,{g:'lg',a:'cx'})+phone('p1',LEG,GND,160,LD,{g:'lg',a:'cx'})+Q('q',LEG,GND-216,96,'var(--ink)')),'i',[['#lo',0,'一条','draw'],['#ld',0,'完全没动','draw'],['#q',0,'凭什么','pop']]);}

/* 02 查号收费：拨号电话 → 查号台接线员；每次 20¢ */
scene('fee','record',A=>A.P(1),svg(gnd()+phone('ph',C3c[0],GND,300,LOC)+coin('c',C3c[1],520,120)+
  AR('a1',C3c[0]+200,640,C3c[1]-140,640,'var(--ink)',14)+AR('a2',C3c[1]+140,640,C3c[2]-150,640,'var(--ink)',14)+
  operator('op',C3c[2],440)+`<rect x="${C3c[2]-200}" y="${GND-160}" width="400" height="160" rx="16" fill="var(--INKW)"/>`+[0,1,2,3,4].map(i=>`<circle cx="${C3c[2]-140+i*70}" cy="${GND-110}" r="14" fill="var(--SU)"/><circle cx="${C3c[2]-140+i*70}" cy="${GND-60}" r="14" fill="var(--MI)"/>`).join('')+
  L('lb',C3c[2],GND+66,'查号台','var(--ink)',40)),'u',[['#a1,#op,#lb',1,'查号台'],['#c,#a2',1,'两毛','pop']]);

/* 03 收费后电话量骤降：电话堆柱（前高后低） */
{const st=(id,x,n,col,m)=>{let s='';for(let i=0;i<n;i++)s+=phone(id+i,x,GND-i*72,64,col);return tag(`<g id="${id}">${s}</g>`,m)};
scene('drop','record',A=>A.W(1,'收费以后'),svg(gnd()+[0,1].map(j=>[0,1].map(r=>'').join('')).join('')+
  [0,1,2].map(j=>st('b'+j,C4c[0]-96+j*96,7,LOC,{})).join('')+[0,1,2].map(j=>st('a'+j,C4c[3]-96+j*96,2,LOC,{})).join('')+
  coin('c',(C4c[1]+C4c[2])/2,560,120)+AR('ar',C4c[1]-40,700,C4c[2]+40,780,'var(--CO)',16)+
  L('l0',C4c[0],GND+66,'收费前','var(--ink)',40,{g:'lab',a:'bottom'})+L('l1',C4c[3],GND+66,'收费后','var(--ink)',40,{g:'lab',a:'bottom'})),'i',[['#a0,#a1,#a2,#l1,#ar',1,'立刻']]);}

/* 04 直觉 vs 证据：人想“收钱→少打”，放大镜要证据 */
scene('intuition','schematic',A=>A.P(3),svg(gnd()+fb('p',C3c[0],GND,440,{shirt:'var(--CO)',shirtD:'var(--COD)'},{g:'ground',a:'bottom'})+
  K.bubble('bb',C3c[0]+120,216,640,248,C3c[0]+60,420)+coin('c',C3c[0]+264,340,80)+AR('ar',C3c[0]+372,340,C3c[0]+456,340,'var(--INK)',12)+phone('ph',C3c[0]+560,404,120,LOC)+AR('dn',C3c[0]+680,272,C3c[0]+680,408,'var(--CO)',10)+
  ic('mg','magnifier',C3c[2],600,320,'var(--ink)')+Q('q',C3c[2]-16,584,120,'var(--SU)')),'u',[['#bb,#c,#ar,#ph,#dn',2,'当然少打'],['#mg',3,'有证据','pop'],['#q',3,'别的解释','pop']]);

/* 05 两个点的比较：两张日历各一根柱 + 两个漏洞（骰子=碰巧、乌云=别的事） */
scene('twopoint','schematic',A=>A.P(5),svg(gnd()+[0,1].map(k=>ic('cal'+k,'calendar',C4c[k],GND-384,152,'var(--g1)',{g:'cal',a:'cy'})).join('')+
  bar('b0',C4c[0]-80,160,272,LOC,{g:'bars',a:'bottom'})+bar('b1',C4c[1]-80,160,128,LOC,{g:'bars',a:'bottom'})+
  `<rect x="${C4[2]}" y="${GND-440}" width="684" height="440" rx="32" fill="var(--g4)"/>`+K.node('n1',C4c[2],GND-376,1)+K.node('n2',C4c[3],GND-376,2)+
  ic('die','die',C4c[2],GND-176,176,'var(--CR)',{g:'hole',a:'cy'})+tag(storm('st',C4c[3],GND-216,280,[[C4c[3],GND-184,GND-72]]),{})),'i',[['#b1',4,'收费后一个月'],['#n1,#die',5,'第一','pop'],['#n2,#st',5,'第二','pop']]);

/* 06 180 个月 = 15 年：一长串月度点 */
{const c=CF(296);let d='';for(let i=0;i<180;i++){const u=.02+.96*i/179,v=(i<120?.72:.3)+.08*rnd(i);d+=`<circle cx="${Math.round(c.x+u*c.w)}" cy="${Math.round(c.y+c.h-v*c.h)}" r="5" fill="${LOC}"/>`}
scene('series','record',A=>A.P(6),svg(pchart('ax',c)+`<g id="dots">${d}</g>`+ic('cal','calendar',X0+120,680,120,'var(--g1)')+L('n',X0+300,708,'180','var(--ink)',72)+L('y',X0+540,708,'15年','var(--SU)',72)),'u',[['#n',6,'一百八十个数','pop'],['#y',6,'十五年','pop']]);}

/* 07 术语：打断时间序列——长线在硬币处被“打断” */
{const c={x:346,y:456,w:1312,h:384};
scene('its','none',A=>A.P(7),K.term('term',1,160,'打断时间序列')+svg(pchart('ax',c)+feeLine('f',c,.6,36)+
  ln('l',series(c,.03,.6,u=>.75,.06,30,4)+' L'+series(c,.61,.97,u=>.28,.06,18,5).slice(1),LOC,10)),'i',[['#term',7,'打断时间序列','pop'],['#l',7,'原本怎么变','draw']]);}

/* 08 晃一下不算，稳了很久突然掉才算：两等分卡 */
{const cw=686,ch=480,y0=GND-ch;
const panel=k=>{const m=mini(C2[k],y0,cw,ch);return tag(card('c'+k,C2[k],y0,cw,ch),{g:'card',a:'bottom'})+axes(m)+
  (k?ln('l1',series(m,.02,.6,u=>.75,.03,14,7)+' L'+series(m,.62,.98,u=>.22,.03,8,8).slice(1),LOC,9):ln('l0',series(m,.02,.98,u=>.5,.5,22,6),'var(--g1)',9))+
  M('m'+k,C2[k]+cw-72,y0+72,104,!!k)};
scene('stable','schematic',A=>A.P(8),svg(panel(0)+panel(1)),'u',[['#l0,#m0',8,'经常起伏'],['#l1,#m1',8,'长期都很稳']]);}

/* 09 这个案例：收费前长期高，收费一开始骤降 */
{const c=CF(296);
scene('case','record',A=>A.P(9),svg(pchart('ax',c,LOC)+feeLine('f',c,.66)+
  ln('l',series(c,.02,.66,u=>.76,.05,40,9)+' L'+series(c,.675,.98,u=>.26,.05,18,10).slice(1),LOC,10)+
  `<rect x="${Math.round(c.x+.02*c.w)}" y="${Math.round(c.y+c.h-.86*c.h)}" width="${Math.round(.64*c.w)}" height="${Math.round(.2*c.h)}" rx="24" fill="none" stroke="var(--MI)" stroke-width="6" stroke-dasharray="18 14"/>`),'i',[['#l',9,'收费前','draw']]);}

/* 10 挑了碰巧最高的月份当起点：下个月自己回落 */
{const vals=[300,320,290,560,310,300],bw=168,gap=(W-6*bw)/5;
scene('peak','schematic',A=>A.P(11),svg(gnd()+vals.map((v,i)=>bar('b'+i,X0+i*(bw+gap),bw,v,i===3?LOC:'var(--g3)',{g:'bars',a:'bottom'})).join('')+
  ic('die','die',X0+3*(bw+gap)+bw/2,GND-560-96,128,'var(--CR)')+
  `<path d="M${X0} ${GND-305} L${X1} ${GND-305}" stroke="var(--MI)" stroke-width="6" stroke-dasharray="18 14"/>`+AR('dn',X0+4*(bw+gap)+bw/2,GND-560,X0+4*(bw+gap)+bw/2,GND-360,'var(--MI)',14)),'u',[['#die',11,'碰巧','pop'],['#dn',11,'下个月']]);}

/* 11 术语：向平均值回归——极端值向虚线（平常水平）靠拢 */
{const vals=[200,440,280,120,300,250],bw=168,gap=(W-6*bw)/5,mean=272;
scene('rtm','none',A=>A.P(12),K.term('term',1,160,'向平均值回归')+svg(gnd()+vals.map((v,i)=>bar('b'+i,X0+i*(bw+gap),bw,v,(i===1||i===3)?LOC:'var(--g3)',{g:'bars',a:'bottom'})).join('')+
  `<path d="M${X0} ${GND-mean} L${X1} ${GND-mean}" stroke="var(--MI)" stroke-width="8" stroke-dasharray="20 16"/>`+
  AR('a1',X0+1*(bw+gap)+bw/2,GND-440-16,X0+1*(bw+gap)+bw/2,GND-mean-24,'var(--MI)',12)+AR('a2',X0+3*(bw+gap)+bw/2,GND-120-12,X0+3*(bw+gap)+bw/2,GND-mean+24,'var(--MI)',12)),'c',[['#term',12,'向平均值回归','pop'],['#a1,#a2',12,'往平常']]);}

/* 12 为什么会回归：每月 = 平常水平（底柱）+ 运气（叠在上面的骰子，多少不一） */
{const luck=[1,4,1,0,2],bw=200,gap=(W-5*bw)/4,base=320,d=88;
scene('why','schematic',A=>A.P(13),svg(gnd()+luck.map((l,i)=>{const x=X0+i*(bw+gap);let s=bar('b'+i,x,bw,base,'var(--g3)',{g:'bars',a:'bottom'});for(let k=0;k<l;k++)s+=ib('d'+i+k,'die',x+bw/2,GND-base-8-k*(d+8),d,i===1?'var(--CO)':'var(--SU)');return s}).join('')+
  `<path d="M${X0} ${GND-base} L${X1} ${GND-base}" stroke="var(--MI)" stroke-width="6" stroke-dasharray="18 14"/>`),'c');}

/* 13 最常犯的错：在峰值出手，把自然回落记成功劳 */
{const vals=[300,330,560,380,310],bw=200,gap=(W-5*bw)/4;
scene('credit','schematic',A=>A.P(14),svg(gnd()+vals.map((v,i)=>bar('b'+i,X0+i*(bw+gap),bw,v,i===2?LOC:'var(--g3)',{g:'bars',a:'bottom'})).join('')+
  coin('c',X0+2*(bw+gap)+bw/2,GND-560-96,72)+ic('die','die',X0+3*(bw+gap)+bw/2,GND-380-88,104,'var(--CR)')+
  `<path d="M${X0} ${GND-305} L${X1} ${GND-305}" stroke="var(--MI)" stroke-width="6" stroke-dasharray="18 14"/>`+M('x',X0+4*(bw+gap)+bw/2,GND-310-104,104,false)),'u',[['#c',14,'开始收费','pop'],['#die,#x',14,'自然回落','pop']]);}

/* 14 长期记录挡住回归：高是常态（很多月都高），不是一次运气 */
{const c=CF(296);
scene('longrec','record',A=>A.P(15),svg(pchart('ax',c,LOC)+feeLine('f',c,.66)+
  ln('l',series(c,.02,.66,u=>.76,.05,40,9)+' L'+series(c,.675,.98,u=>.26,.05,18,10).slice(1),LOC,10)+
  `<path d="M${c.x} ${Math.round(c.y+c.h-.76*c.h)} L${Math.round(c.x+.66*c.w)} ${Math.round(c.y+c.h-.76*c.h)}" stroke="var(--MI)" stroke-width="6" stroke-dasharray="18 14"/>`+
  ic('die','die',Math.round(c.x+.33*c.w),Math.round(c.y+c.h-.36*c.h),120,'var(--g1)')+M('x',Math.round(c.x+.33*c.w)+72,Math.round(c.y+c.h-.36*c.h)-56,88,false)),'i',[['#die,#x',15,'不是运气','pop']]);}

/* 15 术语：历史威胁——同一时刻来了乌云，线也会一样掉 */
{const c={x:346,y:456,w:1312,h:384};
scene('history','none',A=>A.P(18),K.term('term',1,160,'历史威胁')+svg(pchart('ax',c)+
  ln('l',series(c,.03,.6,u=>.75,.06,30,4)+' L'+series(c,.61,.97,u=>.28,.06,18,5).slice(1),LOC,10)+
  storm('st',Math.round(c.x+.6*c.w),352,420,[[Math.round(c.x+.6*c.w),392,560]])),'c',[['#term',18,'历史威胁','pop'],['#st',18,'同时发生','pop']]);}

/* 16 一条线只说“这里变了”，说不出“谁干的”：硬币 vs 乌云 */
{const c=CF(456);
scene('suspects','schematic',A=>A.P(19),svg(pchart('ax',c)+
  ln('l',series(c,.03,.55,u=>.75,.06,26,4)+' L'+series(c,.56,.97,u=>.28,.06,18,5).slice(1),LOC,10)+
  `<path d="M${Math.round(c.x+.555*c.w)} ${c.y} L${Math.round(c.x+.555*c.w)} ${c.y+c.h-8}" stroke="var(--g1)" stroke-width="6" stroke-dasharray="16 16"/>`+
  coin('c',Math.round(c.x+.555*c.w)-180,336,80)+storm('st',Math.round(c.x+.555*c.w)+220,320,300,[[Math.round(c.x+.555*c.w)+200,360,440]])+Q('q',Math.round(c.x+.555*c.w),336,120,'var(--ink)')),'u',[['#c',19,'收费','pop'],['#st',19,'别的事','pop'],['#q',19,'是谁','pop']]);}

/* 17 第二条线：区内查号收 20¢；长途查号不收 */
scene('second','record',A=>A.P(20),svg(gnd()+phone('p0',C2c[0],GND,320,LOC,{g:'ground',a:'bottom'})+phone('p1',C2c[1],GND,320,LD,{g:'ground',a:'bottom'})+
  coin('c0',C2c[0],GND-420,72,{g:'cn',a:'cy'})+noCoin('c1',C2c[1],GND-420,72)+
  `<rect x="${X0+686+4}" y="${GND-520}" width="16" height="520" rx="8" fill="var(--g3)"/>`+
  L('l0',C2c[0],GND+66,'区内',LOC,40,{g:'lab',a:'bottom'})+L('l1',C2c[1],GND+66,'长途',LD,40,{g:'lab',a:'bottom'})),'i',[['#p1,#l1',20,'长途查号'],['#c1',20,'没有同时','pop']]);

/* 两张预测卡：左 区内、右 长途 */
const pred=(k,drop,ext='')=>{const cw=686,ch=440,y0=GND-ch,m=mini(C2[k],y0,cw,ch),col=k?LD:LOC;
  return tag(card('c'+k,C2[k],y0,cw,ch),{g:'card',a:'bottom'})+axes(m)+phone('p'+k,C2[k]+cw-112,y0+152,112,col)+
  ln('l'+k,drop?series(m,.02,.5,u=>.72,.04,10,11+k)+' L'+series(m,.52,.98,u=>.24,.04,10,13+k).slice(1):series(m,.02,.98,u=>.6,.04,20,15+k),col,9)+
  `<path d="M${Math.round(m.x+.51*m.w)} ${m.y} L${Math.round(m.x+.51*m.w)} ${m.y+m.h}" stroke="var(--g1)" stroke-width="5" stroke-dasharray="14 14"/>`+ext};
/* 18 若是收费造成：区内降、长途不动 */
scene('predfee','schematic',A=>A.P(22),svg(pred(0,true)+pred(1,false)+coin('c',C2c[0],304,64)+noCoin('c1',C2c[1],304,64)),'u',[['#c1,#l1',22,'长途查号']]);
/* 19 若是共同事件：乌云罩住两边，两条都降 */
scene('predcommon','schematic',A=>A.P(23),svg(pred(0,true)+pred(1,true)+storm('st',960,236,1000,[[C2c[0],272,384],[C2c[1],272,384]])),'i',[['#st',23,'共同的事件','pop']]);

/* 20 结果：区内大降、长途没同步——与“收费”预测对上 */
{const c=CF(296,1380);
scene('result','record',A=>A.P(25),svg(pchart('ax',c)+feeLine('f',c,.5)+
  ln('lo',series(c,.03,.5,u=>.78,.05,24,1)+' L'+series(c,.52,.97,u=>.3,.05,22,2).slice(1),LOC,10)+ln('ld',series(c,.03,.97,u=>.5,.05,46,3),LD,10)+
  phone('p0',LEG,GND-288,120,LOC,{g:'lg',a:'cx'})+phone('p1',LEG,GND-40,120,LD,{g:'lg',a:'cx'})+coin('c',LEG-24,320,56)+M('ok',LEG+80,320,96,true)),'c',[['#ld,#p1',25,'长途查号','draw'],['#ok',25,'对得上','pop']]);}

/* 21 术语：非同等依变项——收费碰不到它，乌云却能打到它 */
scene('nedv','none',A=>A.P(26),K.term('term',1,160,'非同等依变项')+svg(gnd()+phone('p',C3c[1]+120,GND,280,LD,{g:'ground',a:'bottom'})+
  noCoin('c',C3c[0]-40,GND-160,96)+AR('a',C3c[0]+80,GND-160,C3c[1]-120,GND-160,'var(--g2)',12)+`<rect x="${C3c[1]-140}" y="${GND-240}" width="16" height="160" rx="8" fill="var(--CO)"/>`+
  storm('st',1180,352,440,[[1100,384,528]])),'u',[['#term',26,'非同等依变项','pop'],['#c,#a',26,'影响不到','pop'],['#st',26,'共同的干扰','pop']]);

/* 22 两个条件：① 收费不该碰到它 ② 共同干扰会碰到它 */
{const cw=686,ch=480,y0=GND-ch;
scene('conds','schematic',A=>A.P(27),svg([0,1].map(k=>tag(card('c'+k,C2[k],y0,cw,ch),{g:'card',a:'bottom'})+K.nodeOn('n'+k,C2[k]+72,y0+72,k+1)+phone('p'+k,C2c[k]+(k?0:96),GND-48,180,LD,{g:'ph',a:'bottom'})+M('m'+k,C2[k]+cw-72,y0+72,96,true)).join('')+
  noCoin('cn',C2[0]+150,GND-200,72)+storm('st',C2c[1],y0+112,300,[[C2c[1],y0+144,GND-200]])),'i',[['#c0,#n0,#p0,#cn',28,'第一'],['#m0',28,'满足','pop'],['#c1,#n1,#p1,#st',29,'第二'],['#m1',29,'也满足','pop']]);}

/* 23 椅子：不管乌云来不来，它都不会动——所以它的“不动”什么也说明不了 */
{const cw=686,ch=480,y0=GND-ch;
scene('chair','schematic',A=>A.P(30),svg(gnd()+[0,1].map(k=>chair('ch'+k,C2c[k],GND,300,'var(--SU)')+ic('cal'+k,'calendar',C2c[k]-220,GND-300,104,'var(--g1)',{g:'cal',a:'cy'})).join('')+
  storm('st',C2c[1]+80,288,320,[])+`<path d="M${C2c[1]+80} 340 L${C2c[1]+40} 500" stroke="var(--g2)" stroke-width="6" stroke-dasharray="14 14"/>`+M('x',C2c[1]+120,440,80,false)+
  K.stext('eq',960,GND-150,'=',{anchor:'middle',fill:'var(--ink)',size:112,weight:700})+Q('no',960,320,128,'var(--ink)')),'u',[['#st,#x',30,'需求真的变了','pop'],['#no',30,'说明不了','pop']]);}

/* 24 局限：只打在区内的乌云，样子和收费完全一样，分不开 */
scene('limit','schematic',A=>A.P(33),svg(pred(0,true)+pred(1,false)+storm('st',C2c[0]-150,248,360,[[C2c[0]-180,280,392]])+Q('q',C2c[0]+120,256,96,'var(--ink)')+coin('c',C2c[0]+280,256,72)),'u',[['#st,#q',33,'只影响区内','pop']]);

/* 25 能排除一类，不是全部：嫌疑卡（共同乌云 × 已排除；只打区内的乌云 ? 还在） */
{const cw=448,ch=440,y0=GND-ch;
scene('rule','schematic',A=>A.P(34),svg([0,1,2].map(k=>tag(card('c'+k,C3[k],y0,cw,ch),{g:'card',a:'bottom'})).join('')+
  ic('die','die',C3c[0],GND-240,176,'var(--CR)')+M('m0',C3c[0]+150,y0+72,96,false)+
  storm('s1',C3c[1],y0+136,300,[[C3c[1]-80,y0+172,GND-140],[C3c[1]+80,y0+172,GND-140]])+phone('p1a',C3c[1]-80,GND-48,72,LOC)+phone('p1b',C3c[1]+80,GND-48,72,LD)+M('m1',C3c[1]+150,y0+72,96,false)+
  storm('s2',C3c[2],y0+136,300,[[C3c[2]-80,y0+172,GND-140]])+phone('p2a',C3c[2]-80,GND-48,72,LOC)+phone('p2b',C3c[2]+80,GND-48,72,LD)+Q('m2',C3c[2]+150,y0+72,96,'var(--SU)')),'i',[['#s1,#p1a,#p1b,#m1',34,'某一类'],['#s2,#p2a,#p2b,#m2',34,'所有可能','pop']]);}

/* 26 收尾：本来可能动、却没动的那条线，让收费解释多站稳一步 */
{const c=CF(296,1380);
scene('close','none',A=>A.P(35),svg(pchart('ax',c)+feeLine('f',c,.5)+
  ln('lo',series(c,.03,.5,u=>.78,.05,24,1)+' L'+series(c,.52,.97,u=>.3,.05,22,2).slice(1),'var(--g2)',8)+ln('ld',series(c,.03,.97,u=>.5,.05,46,3),LD,14)+
  ln('alt',`M${pt(c,.5,.5)} L${pt(c,.97,.18)}`,LD,6,true)+M('x',Math.round(c.x+.8*c.w),Math.round(c.y+c.h-.2*c.h),80,false)+
  phone('p1',LEG,GND-200,160,LD)+M('ok',LEG,GND-440,128,true)),'u',[['#alt,#x',37,'一起骤降'],['#ok',37,'站得住','pop']]);}

window.SCENES=S;
})();
