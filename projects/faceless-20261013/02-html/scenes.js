/* 第02集 关键帧（静帧）：沿用第01集 v4 视觉系统。
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
const storm=(id,cx,cy,bx)=>{const bolt=x=>`<path d="M${x-10} 296 L${x-56} 404 L${x-8} 404 L${x-40} 488 L${x+56} 372 L${x+8} 372 L${x+40} 296Z" fill="var(--SU)"/>`;
 return `<g id="${id}"><g transform="translate(${cx} ${cy}) scale(0.78 0.8)"><path d="M-300 60 Q-320 -20 -230 -30 Q-210 -110 -110 -100 Q-60 -170 40 -130 Q110 -170 170 -100 Q290 -110 290 0 Q320 60 290 60Z" fill="#3A3962"/></g>${bx.map(bolt).join('')}</g>`};
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

/* 01 开场：员工减少，但政策（盾）保住了岗位 */
scene('hook','schematic',A=>A.P(0),svg(gnd()+store('s',C3c[0],SH,FOC,undefined,{n:2,gone:1})+AR('dn',C3c[1]-140,420,C3c[1]-140,700,'var(--CO)',18)+
  `<g id="cw">${staff(C3c[1]-20,GND,200,FOC)+staff(C3c[1]+80,GND,200,FOC)+staff(C3c[1]+180,GND,200,FOC,true)}</g>`+ic('pol','landmark',C3c[2],560,fit('landmark',380,320),FOC)+M('ok',C3c[2]+150,700,128,true)),'u',[['#dn,#cw',0,'少了'],['#pol',0,'政策','pop'],['#ok',0,'保住','pop']]);

/* 02 打比方：20 → 18（现实）vs 16（没有政策）——同底柱 */
{const h=v=>v*28,bw=328;
scene('example','teaching',A=>A.P(3),svg(gnd()+
  bar('b0',C4[0],bw,h(20),'var(--g3)',{g:'bars',a:'bottom'})+bar('b1',C4[1],bw,h(18),FOC,{g:'bars',a:'bottom'})+bar('b2',C4[2],bw,h(16),'var(--g2)',{g:'bars',a:'bottom'},true)+
  L('n0',C4c[0],GND-h(20)-32,'20','var(--ink)',64,{g:'num',a:'bottom'})+L('n1',C4c[1],GND-h(18)-32,'18',FOC,64)+L('n2',C4c[2],GND-h(16)-32,'16','var(--g1)',64)+
  ic('pl','landmark',C4c[1],GND-h(18)/2,120,'var(--INK)')+Q('gh',C4c[2],GND-h(16)/2,160,'var(--g2)')+
  brace('br',C4[3]-8,GND-h(18),GND-h(16),FOC)+pill('p2',C4c[3]+16,GND-h(17)-0,200,96,'+2',FOC,'var(--INK)',56)),'c',[['#b0,#n0',3,'二十个人'],['#b1,#n1,#pl',3,'十八个'],['#b2,#n2,#gh',3,'十六个'],['#br,#p2',3,'两个人','pop']]);}

/* 03 比的是“有政策 vs 没政策”：同一店、同一天、两条分岔 */
scene('compare','schematic',A=>A.P(4),svg(gnd()+store('s',C3c[0],SH,FOC)+ic('cal','calendar',C3c[0],GND-SH-96,128,FOC)+
  AR('a1',C3c[0]+260,560,C3c[1]+40,384,'var(--ink)',14)+AR('a2',C3c[0]+260,680,C3c[1]+40,760,'var(--ink)',14)+
  ic('t1','toggle-right',C3c[1]+180,384,104,FOC,{g:'tg',a:'cx'})+ic('t2','toggle-left',C3c[1]+180,760,104,FOC,{g:'tg',a:'cx'})+
  storeAt('r1',C3c[2],472,224,FOC,{g:'res',a:'cx'},{flag:false})+paper('r2',C3c[2],GND,280,false,{g:'res',a:'cx'})+
  L('l1',C3c[1]+180,316,'有政策',FOC,40,{g:'lab',a:'cx'})+L('l2',C3c[1]+180,692,'没政策','var(--g1)',40,{g:'lab',a:'cx'})),'u',[['#a1,#t1,#l1,#r1',4,'有政策'],['#a2,#t2,#l2,#r2',4,'没政策']]);

/* 04 同一家店不能同时活在两个现实：实店 | 看不见的另一版本 */
scene('twoworld','schematic',A=>A.P(5),svg(gnd()+paper('f',C2c[0],GND,560,true)+paper('g',C2c[1],GND,560,false)+`<rect x="${X0+686+4}" y="${GND-560}" width="16" height="560" rx="8" fill="var(--g3)"/>`),'i',[['#g',5,'看不到','pop']]);

/* 05 术语：反事实 */
scene('cf','none',A=>A.P(6),K.term('term',1,160,'反事实')+svg(gnd()+paper('f',C3c[1],GND,440,true)+paper('g',C3c[2],GND,440,false)+
  AR('ar',C3c[1]+196,GND-220,C3c[2]-196,GND-220,'var(--g1)',14)),'i',[['#g',6,'没有发生','pop'],['#term',6,'反事实','pop'],['#ar',6,'如果没有']]);

/* 06 最常见的错：前后相减（−2 ×）vs 跟反事实比（+2 ✓）——两等分，同底柱 */
{const h=v=>v*22,bw=200,pair=(k,a,b,ca,cb,da,db,lab,ok)=>{const x=C2[k]+80;return bar('a'+k,x,bw,h(a),ca,{g:'bars',a:'bottom'},da)+bar('b'+k,x+bw+86,bw,h(b),cb,{g:'bars',a:'bottom'},db)+
  pill('p'+k,C2c[k],GND-h(20)-96,232,104,lab,ok?'var(--MI)':'var(--CO)','var(--INK)',60,{g:'pl',a:'cy'})+M('m'+k,C2c[k]+186,GND-h(20)-96,104,ok)};
scene('mistake','teaching',A=>A.P(7),svg(gnd()+pair(0,20,18,'var(--g3)',FOC,false,false,'−2',false)+pair(1,16,18,'var(--g2)',FOC,true,false,'+2',true)+
  `<rect x="${X0+686+4}" y="${GND-h(20)-160}" width="16" height="${h(20)+160}" rx="8" fill="var(--g3)"/>`),'u',[['#p0,#m0',7,'少了两个人','pop'],['#a1,#b1',7,'跟反事实比'],['#p1,#m1',7,'多留住','pop']]);}

/* 07 找替身：目标店 → 看不见的反事实 ← 相似的没政策店 */
scene('standin','schematic',A=>A.P(8),svg(gnd()+store('a',C3c[0],SH,FOC)+paper('g',C3c[1],GND,400,false)+store('b',C3c[2],SH,'var(--g1)')+
  AR('ar',C3c[2]-236,GND-SH/2,C3c[1]+176,GND-SH/2,'var(--MI)',16)),'i',[['#g',8,'看不到','pop'],['#b',8,'替身'],['#ar',8,'去估计']]);

/* 08 1992 两州：新泽西 $4.25→$5.05，宾州不变 */
scene('wage','record',A=>A.P(9),svg(gnd()+store('nj',C2c[0],SH2*.82,FOC,undefined,{flag:false})+store('pa',C2c[1],SH2*.82,'var(--g1)',undefined,{flag:false})+
  pill('w0',C2c[0],GND-SH2*.82-104,360,104,'$5.05',FOC,'var(--INK)',60,{g:'w',a:'cy'})+pill('w1',C2c[1],GND-SH2*.82-104,360,104,'$4.25','var(--g3)','var(--ink)',60,{g:'w',a:'cy'})+
  AR('up',C2c[0]+240,GND-SH2*.82-40,C2c[0]+240,GND-SH2*.82-176,'var(--MI)',14)+
  L('l0',C2c[0],GND+66,'新泽西',FOC,40,{g:'lab',a:'bottom'})+L('l1',C2c[1],GND+66,'宾州','var(--g1)',40,{g:'lab',a:'bottom'})+pennant(C2c[0]-128,GND+80,.5,'NJ',FOC)+pennant(C2c[1]-104,GND+80,.5,'PA',PA)+
  `<rect x="${X0+686+4}" y="${GND-SH2*.82-160}" width="16" height="${SH2*.82+160}" rx="8" fill="var(--g3)"/>`),'u',[['#w1',9,'四点二五','pop'],['#w0,#up',9,'五点零五','pop'],['#pa,#l1',9,'旁边的宾州']]);

/* 09 调查 410 家店：两州点阵小店 + 调查板 */
{let s='';const sw=88,sh=fit('store',96,70);for(let k=0;k<2;k++)for(let r=0;r<3;r++)for(let c=0;c<5;c++)s+=storeAt(`st${k}${r}${c}`,C2[k]+120+c*112,GND-r*104,76,k?'var(--g1)':FOC,{},{n:2,flag:false});
scene('survey','record',A=>A.P(10),svg(gnd()+s+ic('cb','clipboard-pen',960,344,184,FOC)+L('n',960,528,'410','var(--ink)',96)+`<g id="fl">${pennant(C2[0]+64,GND-2*104-96,.6,'NJ',FOC)+pennant(C2[1]+64,GND-2*104-96,.6,'PA',PA)}</g>`),'i',[['#cb',10,'调查','pop'],['#n',10,'四百一十家','pop']]);}

/* 10 全职当量：两个半天兼职 = 1 个全职 */
{const fh=400,bw=200;
scene('fte','schematic',A=>A.P(11),svg(gnd()+fb('p0',C4c[0],GND,fh,BOSS,{g:'ground',a:'bottom'})+fb('p1',C4c[1],GND,fh,{shirt:'var(--MI)',shirtD:'var(--MID)',hairStyle:1},{g:'ground',a:'bottom'})+
  `<g id="h0" data-g="hb" data-a="cy"><rect x="${C4c[0]-bw/2}" y="${GND-fh-96}" width="${bw}" height="48" rx="24" fill="var(--g3)"/><rect x="${C4c[0]-bw/2}" y="${GND-fh-96}" width="${bw/2}" height="48" rx="24" fill="var(--CO)"/></g>`+
  `<g id="h1" data-g="hb" data-a="cy"><rect x="${C4c[1]-bw/2}" y="${GND-fh-96}" width="${bw}" height="48" rx="24" fill="var(--g3)"/><rect x="${C4c[1]}" y="${GND-fh-96}" width="${bw/2}" height="48" rx="24" fill="var(--MI)"/></g>`+
  `<g id="eq"><rect x="${(C4c[1]+C4c[2])/2+40-48}" y="${GND-fh/2-30}" width="96" height="20" rx="10" fill="var(--ink)"/><rect x="${(C4c[1]+C4c[2])/2+40-48}" y="${GND-fh/2+10}" width="96" height="20" rx="10" fill="var(--ink)"/></g>`+
  `<g id="h2" data-g="hb" data-a="cy"><rect x="${C4c[3]-bw/2-60}" y="${GND-fh-96}" width="${bw+120}" height="48" rx="24" fill="var(--pink)"/></g>`+
  pill('fte',C4c[3]-60+60,GND-fh/2-20,280,112,'1 全职',FOC,'var(--INK)',56)),'u',[['#p1,#h0,#h1',11,'两个各干半天'],['#eq',11,'相当于'],['#h2,#fte',11,'一个全职','pop']]);}

/* 11 只看新泽西：政策与大环境搅在一起 */
scene('confound','schematic',A=>A.P(12),svg(gnd()+store('s',960,SH,FOC)+ic('pol','landmark',C3c[0],380,180,FOC)+
  `<g id="eco" data-g="src" data-a="cy"><g transform="translate(${C3c[2]} 380)">${'<path d="M-110 50 Q-130 -10 -70 -20 Q-60 -80 0 -70 Q50 -100 80 -40 Q140 -40 120 50Z" fill="var(--g2)"/>'}${ln('ed','M-70 0 L-20 20 L20 0 L70 40','var(--CO)',12)}</g></g>`+
  AR('a1',C3c[0]+110,460,840,600,'var(--pink)',14)+AR('a2',C3c[2]-120,460,1080,600,'var(--g1)',14)+Q('q',960,300,180,'var(--ink)')),'i',[['#pol',12,'只看新泽西','pop'],['#eco',12,'经济不景气','pop'],['#a1,#a2',12,'混在一起'],['#q',12,'无法分开','pop']]);

/* 12 宾州挨着、同一大环境 → 替身 */
scene('neighbor','schematic',A=>A.P(13),svg(gnd()+store('nj',C2c[0],SH2*.82,FOC)+store('pa',C2c[1],SH2*.82,'var(--g1)')+
  `<g id="sky"><rect x="${X0+96}" y="232" width="${W-192}" height="96" rx="48" fill="var(--g3)"/></g>`+ic('cal','calendar',960,280,120,'var(--g2)')+
  L('l0',C2c[0],GND+66,'新泽西',FOC,40,{g:'lab',a:'bottom'})+L('l1',C2c[1],GND+66,'宾州',PA,40,{g:'lab',a:'bottom'})),'u',[['#pa,#l1',13,'挨着'],['#sky,#cal',13,'大环境']]);

/* 13 术语：非同等比较组（前后测）——两州 × 两次测量；不是随机分 */
scene('design','none',A=>A.P(14),K.term('term',1,160,'非同等比较组')+svg(gnd()+
  [0,1].map(r=>[0,1].map(c=>storeAt(`s${r}${c}`,C4c[2+c],r?GND:GND-248,184,r?'var(--g1)':FOC,r?{g:'ground',a:'bottom'}:{g:'row0',a:'bottom'})).join('')).join('')+
  ic('c0','calendar',C4c[2],320,88,'var(--g2)',{g:'cal',a:'cy'})+ic('c1','calendar',C4c[3],320,88,'var(--g2)',{g:'cal',a:'cy'})+
  ic('die','die',C4c[0]+40,620,200,'var(--g2)')+M('x',C4c[0]+140,520,104,false)),'u',[['#term',14,'非同等比较组','pop'],['#s00,#s01,#s10,#s11',14,'两个州'],['#die,#x',14,'随机','pop'],['#c0,#c1',14,'都测了一次','pop']]);

/* 14 教学算例表：2×2，20/18 与 20/16 */
{const cw=448,chh=184,cx=[C3[1],C3[2]],ry=[392,616];
const cell=(id,k,r,n,col)=>tag(`<g id="${id}"><rect x="${cx[k]}" y="${ry[r]}" width="${cw}" height="${chh}" rx="32" fill="var(--g4)"/>`+crew(id+'c',cx[k]+40,ry[r]+24,n/2,10,5,56,col)+K.stext(id+'n',cx[k]+cw-64,ry[r]+chh/2+26,String(n),{anchor:'middle',fill:col,size:72,weight:700})+`</g>`,{g:'row'+r,a:'top'});
scene('table','teaching',A=>A.P(16),svg(
  ic('c0','calendar',cx[0]+cw/2,304,96,'var(--g1)',{g:'hd',a:'cy'})+ic('c1','calendar',cx[1]+cw/2,304,96,FOC,{g:'hd',a:'cy'})+
  storeAt('s0',C3c[0],ry[0]+chh,148,FOC,{g:'st0',a:'bottom'})+storeAt('s1',C3c[0],ry[1]+chh,148,'var(--g1)',{g:'st1',a:'bottom'})+
  cell('a0',0,0,20,FOC)+cell('a1',1,0,18,FOC)+cell('b0',0,1,20,'var(--g1)')+cell('b1',1,1,16,'var(--g1)')),'i',[['#c0,#a0,#b0',16,'政策前'],['#c1,#a1',16,'十八个'],['#b1',16,'十六个']]);}

/* 15 第一次相减：各算各的变化（−2 / −4）——零线向左的柱 */
{const zx=1250,u=150,rh=136,ry=[440,640];
scene('diff1','teaching',A=>A.P(17),svg(
  `<rect x="${zx-4}" y="360" width="8" height="${GND-360+8}" rx="4" fill="var(--g2)"/>`+
  storeAt('s0',C4c[0],ry[0]+rh,136,FOC,{g:'st',a:'cx'})+storeAt('s1',C4c[0],ry[1]+rh,136,'var(--g1)',{g:'st',a:'cx'})+
  tag(`<rect id="r0" x="${zx-2*u}" y="${ry[0]}" width="${2*u}" height="${rh}" rx="16" fill="var(--pink)"/>`,{g:'bl',a:'right'})+
  tag(`<rect id="r1" x="${zx-4*u}" y="${ry[1]}" width="${4*u}" height="${rh}" rx="16" fill="var(--g2)"/>`,{g:'bl',a:'right'})+
  L('n0',zx+144,ry[0]+rh/2+24,'−2',FOC,72,{g:'nl',a:'cx'})+L('n1',zx+144,ry[1]+rh/2+24,'−4','var(--g1)',72,{g:'nl',a:'cx'})+ic('zi','calendar',zx,304,88,'var(--g1)')),'u',[['#r0,#n0',17,'少了两个'],['#r1,#n1',17,'少了四个']]);}

/* 16 第二次相减：(−2) − (−4) = +2 */
{const zx=1250,u=150,rh=112;
scene('diff2','teaching',A=>A.P(19),svg(
  `<rect x="${zx-4}" y="296" width="8" height="${GND-296+8}" rx="4" fill="var(--g2)"/>`+
  `<rect id="r0" x="${zx-2*u}" y="328" width="${2*u}" height="${rh}" rx="16" fill="var(--pink)"/>`+
  `<rect id="r1" x="${zx-4*u}" y="488" width="${4*u}" height="${rh}" rx="16" fill="var(--g2)"/>`+
  `<rect id="gap" x="${zx-4*u}" y="648" width="${2*u}" height="${rh}" rx="16" fill="var(--MI)"/>`+
  `<path d="M${zx-2*u} 440 L${zx-2*u} 648" stroke="var(--MI)" stroke-width="6" stroke-dasharray="14 12"/>`+
  pill('res',C4c[0]+40,704,280,120,'+2','var(--MI)','var(--INK)',72)+L('n0',zx+144,408,'−2',FOC,64)+L('n1',zx+144,568,'−4','var(--g1)',64)),'c',[['#r1,#n1',19,'宾州的变化'],['#gap,#res',19,'等于正二','pop']]);}

/* 17 一步步：宾州变化平移成新泽西的反事实（16），实际 18，差 +2 */
{const c=CF(296,1380),y=v=>(v-12)/10;
scene('steps','teaching',A=>A.P(20),svg(chart('ax',c)+vline('v',c,.5)+
  ln('pa',`M${pt(c,.08,y(20))} L${pt(c,.5,y(20))} L${pt(c,.92,y(16))}`,'var(--g2)',12)+
  ln('cf',`M${pt(c,.5,y(20.4))} L${pt(c,.92,y(16.4))}`,'var(--ink)',8,true)+
  ln('nj',`M${pt(c,.08,y(20.4))} L${pt(c,.5,y(20.4))} L${pt(c,.92,y(18))}`,'var(--pink)',12)+
  brace('br',Math.round(c.x+.92*c.w)+24,Math.round(c.y+c.h-y(18)*c.h),Math.round(c.y+c.h-y(16.4)*c.h),'var(--MI)')+
  pill('p',LEG,Math.round(c.y+c.h-y(17.2)*c.h),200,104,'+2','var(--MI)','var(--INK)',60)+paper('g',LEG,GND,200,false,{})),'i',[['#pa',20,'少了四个','draw'],['#cf',20,'只剩十六个','draw'],['#nj',20,'剩了十八个','draw'],['#br,#p,#g',20,'多两个','pop']]);}

/* 18 两句话同时成立：现实↓（前后）与效果 +2（对反事实） */
scene('both','schematic',A=>A.P(21),svg(gnd()+store('s0',C2c[0],SH2*.82,FOC)+AR('dn',C2c[0]-250,360,C2c[0]-250,560,'var(--CO)',18)+
  store('s1',C2c[1]-120,SH2*.82,FOC)+paper('g',C2c[1]+200,GND,256,false)+pill('p',C2c[1]+40,320,220,104,'+2','var(--MI)','var(--INK)',60)+
  `<rect x="${X0+686+4}" y="320" width="16" height="${GND-320}" rx="8" fill="var(--g3)"/>`+
  L('l0',C2c[0],GND+66,'现实',FOC,40,{g:'lab',a:'bottom'})+L('l1',C2c[1],GND+66,'效果','var(--MI)',40,{g:'lab',a:'bottom'})),'u',[['#s1,#g,#p,#l1',21,'政策效果']]);

/* 19 术语：双重差分 */
scene('did','none',A=>A.P(22),K.term('term',1,160,'双重差分')+svg(
  [0,1].map(k=>pill('m'+k,C4c[k+1]+0,560,280,160,'−',k?'var(--g2)':FOC,'var(--INK)',120,{g:'mm',a:'cy'})).join('')+
  `<g id="eq"><rect x="${C4c[3]-64}" y="520" width="128" height="24" rx="12" fill="var(--ink)"/><rect x="${C4c[3]-64}" y="576" width="128" height="24" rx="12" fill="var(--ink)"/></g>`+
  storeAt('i0',C4c[0],640,160,FOC)),'c',[['#term',22,'双重差分','pop'],['#m0',22,'减两次','pop'],['#m1',22,'减两次','pop',.4],['#eq',22,'这样做','pop']]);

/* 20 平行趋势：变化同幅，起点可不同 */
{const c=CF(296,1380);
scene('parallel','schematic',A=>A.P(24),svg(chart('ax',c)+vline('v',c,.5)+
  ln('nj',`M${pt(c,.08,.82)} L${pt(c,.5,.82)} L${pt(c,.92,.52)}`,'var(--pink)',12)+ln('pa',`M${pt(c,.08,.46)} L${pt(c,.5,.46)} L${pt(c,.92,.16)}`,'var(--g2)',12)+
  brace('b0',Math.round(c.x+.92*c.w)+24,Math.round(c.y+c.h-.82*c.h),Math.round(c.y+c.h-.52*c.h),'var(--pink)')+
  brace('b1',Math.round(c.x+.92*c.w)+24,Math.round(c.y+c.h-.46*c.h),Math.round(c.y+c.h-.16*c.h),'var(--g2)')+
  L('t',LEG,576,'平行趋势','var(--MI)',48)),'i',[['#nj,#pa',24,'变化应该','draw'],['#b0,#b1',24,'幅度'],['#t',24,'平行趋势','pop']]);}

/* 21 起点相同也可能失败：宾州自己走下坡 → 效果算大 */
{const c=CF(296);
scene('fail','schematic',A=>A.P(26),svg(chart('ax',c)+vline('v',c,.5)+
  ln('nj',`M${pt(c,.08,.7)} L${pt(c,.5,.7)} L${pt(c,.92,.56)}`,'var(--pink)',12)+ln('pa',`M${pt(c,.08,.7)} L${pt(c,.5,.7)} L${pt(c,.92,.12)}`,'var(--g2)',12)+
  ln('sh',`M${pt(c,.5,.7)} L${pt(c,.92,.38)}`,'var(--g1)',8,true)+M('x',Math.round(c.x+.25*c.w),400,128,false)),'u',[['#nj,#pa',26,'一起走','draw'],['#sh',26,'下坡路','draw'],['#x',26,'算大了','pop']]);}

/* 22 起点不同也没关系：25/20 都 −4 */
{const c=CF(296,1380);
scene('diffstart','teaching',A=>A.P(27),svg(chart('ax',c)+vline('v',c,.5)+
  ln('nj',`M${pt(c,.08,.85)} L${pt(c,.5,.85)} L${pt(c,.92,.6)}`,'var(--pink)',12)+ln('pa',`M${pt(c,.08,.45)} L${pt(c,.5,.45)} L${pt(c,.92,.2)}`,'var(--g2)',12)+
  L('a',Math.round(c.x+.08*c.w)+40,Math.round(c.y+c.h-.85*c.h)-32,'25',FOC,56)+L('b',Math.round(c.x+.08*c.w)+40,Math.round(c.y+c.h-.45*c.h)-32,'20','var(--g1)',56)+
  pill('p0',LEG,Math.round(c.y+c.h-.6*c.h),176,88,'−4',FOC,'var(--INK)',52,{g:'d',a:'cx'})+pill('p1',LEG,Math.round(c.y+c.h-.2*c.h),176,88,'−4','var(--g2)','var(--INK)',52,{g:'d',a:'cx'})+
  M('ok',LEG,376,128,true)),'c',[['#nj,#a',27,'二十五个人'],['#pa,#b',27,'二十个人'],['#p0,#p1',27,'少四个','pop'],['#ok',27,'扣掉','pop']]);}

/* 23 找旁证：行业像不像 / 政策前走势 / 单州新情况 —— 三等分卡 */
{const cy=520,ch=400;
const card=k=>tag(`<rect id="c${k}" x="${C3[k]}" y="${GND-ch}" width="448" height="${ch}" rx="32" fill="var(--g4)"/>`,{g:'card',a:'bottom+sp'});
scene('evidence','schematic',A=>A.P(28),svg([0,1,2].map(card).join('')+
  storeAt('a0',C3c[0]-96,GND-104,128,FOC,{g:'in',a:'bottom'})+storeAt('a1',C3c[0]+96,GND-104,128,'var(--g1)',{g:'in',a:'bottom'})+
  ln('t0',`M${C3[1]+64} ${GND-200} L${C3[1]+200} ${GND-232} L${C3[1]+384} ${GND-264}`,'var(--pink)',12)+ln('t1',`M${C3[1]+64} ${GND-120} L${C3[1]+200} ${GND-152} L${C3[1]+384} ${GND-184}`,'var(--g2)',12)+
  storeAt('a2',C3c[2]-56,GND-104,128,'var(--g1)',{g:'in',a:'bottom'})+ic('mg','magnifier',C3c[2]+96,GND-260,120,'var(--ink)')+
  [0,1,2].map(k=>M('m'+k,C3c[k],GND-ch+96,104,k<2)).join('').replace('var(--CO)','var(--CO)')+
  [0,1,2].map(k=>K.node('n'+k,C3[k]+56,GND-ch+56,k+1)).join('')),'i',[['#a0,#a1',28,'',  'in',.8],['#m0',28,'第一','pop'],['#t0,#t1,#m1',28,'第二'],['#a2,#mg,#m2',28,'第三']]);}

/* 24 单州特有事件：第二次相减扣不掉 */
scene('shock','schematic',A=>A.P(29),svg(gnd()+store('nj',C3c[0],SH,FOC)+store('pa',C3c[2],SH,'var(--g1)')+storm('cl',C3c[0],252,[C3c[0]+40])+`<g id="sun"><circle cx="${C3c[2]}" cy="300" r="72" fill="var(--SU)"/>${[0,1,2,3,4,5,6,7].map(k=>{const a=k*Math.PI/4;return `<rect x="-8" y="-132" width="16" height="40" rx="8" fill="var(--SU)" transform="translate(${C3c[2]} 300) rotate(${k*45})"/>`}).join('')}</g>`),'i',[['#cl',29,'只有一个州','pop']]);

/* 25 回到真实研究：相对就业未下降，反而更高（方向示意） */
{const bw=328;
scene('result','record',A=>A.P(30),svg(gnd()+store('nj',C4c[0],240,FOC)+store('pa',C4c[1],240,'var(--g1)')+
  `<rect x="${C4[2]}" y="${GND-8}" width="${bw*2+28}" height="8" fill="var(--g2)"/>`+
  bar('b',C4[2]+bw/2+14,bw,320,'var(--MI)',{g:'ground',a:'bottom'})+AR('up',C4c[3]+140,GND-120,C4c[3]+140,GND-400,'var(--MI)',16)+
  L('l',C4[2]+bw+14,GND+66,'相对变化','var(--ink)',40)),'u',[['#b,#up,#l',30,'相对变化']]);}

/* 26 结论范围：这项研究 / 这次调整 / 这些店；别处 = 问号 */
scene('scope','record',A=>A.P(32),svg(gnd()+`<rect id="fr" x="${X0}" y="${GND-SH2*.82-176}" width="686" height="${SH2*.82+176}" rx="32" fill="none" stroke="var(--pink)" stroke-width="8"/>`+
  store('s',C2c[0],SH2*.82,FOC)+ic('cal','calendar',C2c[0],GND-SH2*.82-88,104,FOC)+
  ic('p0','pin',C2c[1]-160,560,200,'var(--g2)',{g:'pin',a:'cy'})+ic('p1','pin',C2c[1]+160,560,200,'var(--g2)',{g:'pin',a:'cy'})+Q('q',C2c[1],360,160,'var(--ink)')),'i',[['#p0,#p1,#q',32,'换个地方','pop']]);

/* 27 可信度：宾州为什么是好替身（放大镜看替身） */
scene('credible','schematic',A=>A.P(33),svg(gnd()+store('nj',C2c[0],SH2*.82,FOC)+store('pa',C2c[1],SH2*.82,'var(--g1)')+
  ic('mg','magnifier',C2c[1]+200,GND-SH2*.82-40,200,'var(--ink)')+L('l1',C2c[1],GND+66,'宾州',PA,40,{g:'lab',a:'bottom'})+L('l0',C2c[0],GND+66,'新泽西',FOC,40,{g:'lab',a:'bottom'})),'u',[['#mg',33,'替身','pop']]);

/* 28 收尾：前后变化 − 本来会发生的变化 = 因果效果 */
{const c=CF(296,1380);
scene('close','none',A=>A.P(34),svg(chart('ax',c)+vline('v',c,.5)+
  ln('nj',`M${pt(c,.08,.7)} L${pt(c,.5,.7)} L${pt(c,.92,.5)}`,'var(--pink)',12)+ln('cf',`M${pt(c,.5,.7)} L${pt(c,.92,.25)}`,'var(--g2)',10,true)+
  brace('br',Math.round(c.x+.92*c.w)+24,Math.round(c.y+c.h-.5*c.h),Math.round(c.y+c.h-.25*c.h),'var(--MI)')+
  paper('g',LEG,GND,260,false,{})),'u',[['#nj',34,'增加了','draw'],['#cf,#g',34,'本来会怎样'],['#br',35,'扣掉']]);}

window.SCENES=S;
})();
