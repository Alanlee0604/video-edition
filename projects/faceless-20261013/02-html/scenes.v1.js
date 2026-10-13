/* 第02集 关键帧（静帧）：沿用第01集 v4 视觉系统。
   网格：12 栏，主体落在 262…1658（宽 1396），水平中心 960；纵向 8px 基线，地平线 GND=840。
   等分：C4（328/28）、C3（448/26）、C2（686/24）。圆角 R1=16 / R2=32。同组元素打 data-g/data-a 供 align_check。 */
(function(){
const K=window.KIT;const S=[];const scene=(id,kind,start,html,theme)=>S.push({id,kind,start,html,theme,build:({in:i,t0})=>i('#m',t0+.05)});
const M=K.mark,Q=K.qmark,AR=K.farrow,ib=K.ib,ic=K.ic,fb=K.fb,tag=K.tag,fit=K.fit;
const X0=262,X1=1658,W=1396,GND=840;
const C4=[0,1,2,3].map(k=>X0+k*356),C4c=C4.map(x=>x+164),C3=[0,1,2].map(k=>X0+k*474),C3c=C3.map(x=>x+224),C2=[X0,X0+710],C2c=C2.map(x=>x+343);
const svg=s=>K.svg(`<g id="m">${s}</g>`);
const L=(id,x,y,s,c='var(--ink)',size=48,m={})=>tag(K.stext(id,x,y,s,{anchor:'middle',fill:c,size,weight:700}),m);
const FOC='var(--pink)',NEU='var(--g2)';
const gnd=(x=X0,w=W)=>`<rect x="${x}" y="${GND}" width="${w}" height="32" rx="16" fill="var(--g3)"/>`;
const bar=(id,x,w,h,fill,m={},dash=false)=>tag(`<rect id="${id}" x="${x}" y="${GND-h}" width="${w}" height="${h}" rx="16" ${dash?`fill="none" stroke="${fill}" stroke-width="8" stroke-dasharray="20 16"`:`fill="${fill}"`}/>`,m);
const pill=(id,cx,cy,w,h,s,bg,fg,size=48,m={})=>tag(`<g id="${id}"><rect id="${id}b" x="${cx-w/2}" y="${cy-h/2}" width="${w}" height="${h}" rx="${h/2}" fill="${bg}"/>`+K.stext(id+'t',cx,cy+size*.36,s,{anchor:'middle',fill:fg,size,weight:700})+`</g>`,m);
const store=(id,cx,h,t,m={g:'ground',a:'bottom'})=>ib(id,'store',cx,GND,h,t,m);
const storeAt=(id,cx,bottom,h,t,m={})=>ib(id,'store',cx,bottom,h,t,m);
/* 反事实店：虚线轮廓店 + 问号 */
const ghostStore=(id,cx,h,m={g:'ground',a:'bottom'})=>{const w=h*108/86;return tag(`<g id="${id}"><rect x="${cx-w/2}" y="${GND-h}" width="${w}" height="${h}" rx="32" fill="none" stroke="var(--g2)" stroke-width="8" stroke-dasharray="24 18"/>${Q(id+'q',cx,GND-h/2-8,h*.5,'var(--g2)')}</g>`,m)};
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
const SH=fit('store',448,360);   // 三等分店高
const SH2=fit('store',560,400);  // 二等分店高

/* 01 开场：员工减少，但政策（盾）保住了岗位 */
scene('hook','schematic',A=>A.P(0),svg(gnd()+store('s',C3c[0],SH,FOC)+AR('dn',C3c[1]-140,420,C3c[1]-140,700,'var(--CO)',18)+
  crew('cw',C3c[1]-64,404,4,6,2,128,'var(--ink)')+ic('pol','landmark',C3c[2],560,fit('landmark',380,320),FOC)+M('ok',C3c[2]+150,700,128,true)),'u');

/* 02 打比方：20 → 18（现实）vs 16（没有政策）——同底柱 */
{const h=v=>v*28,bw=328;
scene('example','teaching',A=>A.P(3),svg(gnd()+
  bar('b0',C4[0],bw,h(20),'var(--g3)',{g:'bars',a:'bottom'})+bar('b1',C4[1],bw,h(18),FOC,{g:'bars',a:'bottom'})+bar('b2',C4[2],bw,h(16),'var(--g2)',{g:'bars',a:'bottom'},true)+
  L('n0',C4c[0],GND-h(20)-32,'20','var(--ink)',64,{g:'num',a:'bottom'})+L('n1',C4c[1],GND-h(18)-32,'18',FOC,64)+L('n2',C4c[2],GND-h(16)-32,'16','var(--g1)',64)+
  ic('pl','landmark',C4c[1],GND-h(18)/2,120,'var(--INK)')+ic('gh','ghost',C4c[2],GND-h(16)/2,160,'var(--g2)')+
  brace('br',C4[3]-8,GND-h(18),GND-h(16),FOC)+pill('p2',C4c[3]+16,GND-h(17)-0,200,96,'+2',FOC,'var(--INK)',56)),'c');}

/* 03 比的是“有政策 vs 没政策”：同一店、同一天、两条分岔 */
scene('compare','schematic',A=>A.P(4),svg(gnd()+store('s',C3c[0],SH,FOC)+ic('cal','calendar',C3c[0],GND-SH-96,128,FOC)+
  AR('a1',C3c[0]+260,560,C3c[1]+40,384,'var(--ink)',14)+AR('a2',C3c[0]+260,680,C3c[1]+40,760,'var(--ink)',14)+
  ic('t1','toggle-right',C3c[1]+180,384,104,FOC,{g:'tg',a:'cx'})+ic('t2','toggle-left',C3c[1]+180,760,104,FOC,{g:'tg',a:'cx'})+
  storeAt('r1',C3c[2],472,224,FOC,{g:'res',a:'cx'})+tag(`<g id="r2"><rect x="${C3c[2]-141}" y="${GND-224}" width="282" height="224" rx="32" fill="none" stroke="var(--g2)" stroke-width="8" stroke-dasharray="24 18"/>${Q('r2q',C3c[2],GND-120,112,'var(--g2)')}</g>`,{g:'res',a:'cx'})+
  L('l1',C3c[1]+180,316,'有政策',FOC,40,{g:'lab',a:'cx'})+L('l2',C3c[1]+180,692,'没政策','var(--g1)',40,{g:'lab',a:'cx'})),'u');

/* 04 同一家店不能同时活在两个现实：实店 | 看不见的另一版本 */
scene('twoworld','schematic',A=>A.P(5),svg(gnd()+store('s',C2c[0],SH2,FOC)+ic('pl','landmark',C2c[0],GND-SH2-104,144,FOC)+
  ghostStore('g',C2c[1],SH2)+`<g id="eye"><rect x="${C2[1]-12}" y="${GND-SH2-24}" width="16" height="${SH2+24}" rx="8" fill="var(--g2)"/></g>`+M('x',C2c[1],GND-SH2-104,128,false)),'i');

/* 05 术语：反事实 */
scene('cf','none',A=>A.P(6),K.term('term',1,160,'反事实')+svg(gnd()+store('s',C3c[1],SH,'var(--g2)')+ghostStore('g',C3c[2],SH)+
  AR('ar',C3c[1]+260,GND-SH/2,C3c[2]-260,GND-SH/2,'var(--g1)',14)),'i');

/* 06 最常见的错：前后相减（−2 ×）vs 跟反事实比（+2 ✓）——两等分，同底柱 */
{const h=v=>v*22,bw=200,pair=(k,a,b,ca,cb,da,db,lab,ok)=>{const x=C2[k]+80;return bar('a'+k,x,bw,h(a),ca,{g:'bars',a:'bottom'},da)+bar('b'+k,x+bw+86,bw,h(b),cb,{g:'bars',a:'bottom'},db)+
  pill('p'+k,C2c[k],GND-h(20)-96,232,104,lab,ok?'var(--MI)':'var(--CO)','var(--INK)',60,{g:'pl',a:'cy'})+M('m'+k,C2c[k]+186,GND-h(20)-96,104,ok)};
scene('mistake','teaching',A=>A.P(7),svg(gnd()+pair(0,20,18,'var(--g3)',FOC,false,false,'−2',false)+pair(1,16,18,'var(--g2)',FOC,true,false,'+2',true)+
  `<rect x="${X0+686+4}" y="${GND-h(20)-160}" width="16" height="${h(20)+160}" rx="8" fill="var(--g3)"/>`),'u');}

/* 07 找替身：目标店 → 看不见的反事实 ← 相似的没政策店 */
scene('standin','schematic',A=>A.P(8),svg(gnd()+store('a',C3c[0],SH,FOC)+ghostStore('g',C3c[1],SH)+store('b',C3c[2],SH,'var(--g1)')+
  AR('ar',C3c[2]-250,GND-SH/2,C3c[1]+250,GND-SH/2,'var(--pink)',16)+L('lb',C3c[2],GND-SH-48,'替身',FOC,56)),'i');

/* 08 1992 两州：新泽西 $4.25→$5.05，宾州不变 */
scene('wage','record',A=>A.P(9),svg(gnd()+store('nj',C2c[0],SH2*.82,FOC)+store('pa',C2c[1],SH2*.82,'var(--g1)')+
  pill('w0',C2c[0],GND-SH2*.82-104,360,104,'$5.05',FOC,'var(--INK)',60,{g:'w',a:'cy'})+pill('w1',C2c[1],GND-SH2*.82-104,360,104,'$4.25','var(--g3)','var(--ink)',60,{g:'w',a:'cy'})+
  AR('up',C2c[0]+240,GND-SH2*.82-40,C2c[0]+240,GND-SH2*.82-176,'var(--MI)',14)+
  L('l0',C2c[0],GND+104,'新泽西',FOC,48,{g:'lab',a:'bottom'})+L('l1',C2c[1],GND+104,'宾州','var(--g1)',48,{g:'lab',a:'bottom'})+
  `<rect x="${X0+686+4}" y="${GND-SH2*.82-160}" width="16" height="${SH2*.82+160}" rx="8" fill="var(--g3)"/>`),'u');

/* 09 调查 410 家店：两州点阵小店 + 调查板 */
{let s='';const sw=88,sh=fit('store',96,70);for(let k=0;k<2;k++)for(let r=0;r<3;r++)for(let c=0;c<5;c++)s+=ib(`st${k}${r}${c}`,'store',C2[k]+120+c*112,GND-r*104,sh,k?'var(--g1)':FOC);
scene('survey','record',A=>A.P(10),svg(gnd()+s+ic('cb','clipboard-pen',960,344,184,FOC)+L('n',960,528,'410','var(--ink)',96)),'i');}

/* 10 全职当量：两个半天兼职 = 1 个全职 */
{const fh=400,bw=200;
scene('fte','schematic',A=>A.P(11),svg(gnd()+fb('p0',C4c[0],GND,fh,BOSS,{g:'ground',a:'bottom'})+fb('p1',C4c[1],GND,fh,{shirt:'var(--MI)',shirtD:'var(--MID)',hairStyle:1},{g:'ground',a:'bottom'})+
  `<g id="h0" data-g="hb" data-a="cy"><rect x="${C4c[0]-bw/2}" y="${GND-fh-96}" width="${bw}" height="48" rx="24" fill="var(--g3)"/><rect x="${C4c[0]-bw/2}" y="${GND-fh-96}" width="${bw/2}" height="48" rx="24" fill="var(--CO)"/></g>`+
  `<g id="h1" data-g="hb" data-a="cy"><rect x="${C4c[1]-bw/2}" y="${GND-fh-96}" width="${bw}" height="48" rx="24" fill="var(--g3)"/><rect x="${C4c[1]}" y="${GND-fh-96}" width="${bw/2}" height="48" rx="24" fill="var(--MI)"/></g>`+
  `<g id="eq"><rect x="${(C4c[1]+C4c[2])/2+40-48}" y="${GND-fh/2-30}" width="96" height="20" rx="10" fill="var(--ink)"/><rect x="${(C4c[1]+C4c[2])/2+40-48}" y="${GND-fh/2+10}" width="96" height="20" rx="10" fill="var(--ink)"/></g>`+
  `<g id="h2" data-g="hb" data-a="cy"><rect x="${C4c[3]-bw/2-60}" y="${GND-fh-96}" width="${bw+120}" height="48" rx="24" fill="var(--pink)"/></g>`+
  pill('fte',C4c[3]-60+60,GND-fh/2-20,280,112,'1 全职',FOC,'var(--INK)',56)),'u');}

/* 11 只看新泽西：政策与大环境搅在一起 */
scene('confound','schematic',A=>A.P(12),svg(gnd()+store('s',960,SH,FOC)+ic('pol','landmark',C3c[0],380,180,FOC)+
  `<g id="eco" data-g="src" data-a="cy"><g transform="translate(${C3c[2]} 380)">${'<path d="M-110 50 Q-130 -10 -70 -20 Q-60 -80 0 -70 Q50 -100 80 -40 Q140 -40 120 50Z" fill="var(--g2)"/>'}${ln('ed','M-70 0 L-20 20 L20 0 L70 40','var(--CO)',12)}</g></g>`+
  AR('a1',C3c[0]+110,460,840,600,'var(--pink)',14)+AR('a2',C3c[2]-120,460,1080,600,'var(--g1)',14)+Q('q',960,300,180,'var(--ink)')),'i');

/* 12 宾州挨着、同一大环境 → 替身 */
scene('neighbor','schematic',A=>A.P(13),svg(gnd()+store('nj',C2c[0],SH2*.82,FOC)+store('pa',C2c[1],SH2*.82,'var(--g1)')+
  `<g id="sky"><rect x="${X0+96}" y="232" width="${W-192}" height="96" rx="48" fill="var(--g3)"/></g>`+ic('cal','calendar',960,280,120,'var(--g2)')+
  L('l0',C2c[0],GND+104,'新泽西',FOC,48,{g:'lab',a:'bottom'})+L('l1',C2c[1],GND+104,'替身','var(--MI)',48,{g:'lab',a:'bottom'})),'u');

/* 13 术语：非同等比较组（前后测）——两州 × 两次测量；不是随机分 */
scene('design','none',A=>A.P(14),K.term('term',1,160,'非同等比较组')+svg(gnd()+
  [0,1].map(r=>[0,1].map(c=>storeAt(`s${r}${c}`,C4c[2+c],r?GND:GND-248,184,r?'var(--g1)':FOC,r?{g:'ground',a:'bottom'}:{g:'row0',a:'bottom'})).join('')).join('')+
  ic('c0','calendar',C4c[2],392,88,'var(--g2)',{g:'cal',a:'cy'})+ic('c1','calendar',C4c[3],392,88,'var(--g2)',{g:'cal',a:'cy'})+
  ic('die','die',C4c[0]+40,620,200,'var(--g2)')+M('x',C4c[0]+140,520,104,false)),'u');

/* 14 教学算例表：2×2，20/18 与 20/16 */
{const cw=448,chh=184,cx=[C3[1],C3[2]],ry=[392,616];
const cell=(id,k,r,n,col)=>tag(`<g id="${id}"><rect x="${cx[k]}" y="${ry[r]}" width="${cw}" height="${chh}" rx="32" fill="var(--g4)"/>`+crew(id+'c',cx[k]+40,ry[r]+24,n/2,10,5,56,col)+K.stext(id+'n',cx[k]+cw-64,ry[r]+chh/2+26,String(n),{anchor:'middle',fill:col,size:72,weight:700})+`</g>`,{g:'row'+r,a:'top'});
scene('table','teaching',A=>A.P(16),svg(
  ic('c0','calendar',cx[0]+cw/2,304,96,'var(--g1)',{g:'hd',a:'cy'})+ic('c1','calendar',cx[1]+cw/2,304,96,FOC,{g:'hd',a:'cy'})+
  storeAt('s0',C3c[0],ry[0]+chh,148,FOC,{g:'st0',a:'bottom'})+storeAt('s1',C3c[0],ry[1]+chh,148,'var(--g1)',{g:'st1',a:'bottom'})+
  cell('a0',0,0,20,FOC)+cell('a1',1,0,18,FOC)+cell('b0',0,1,20,'var(--g1)')+cell('b1',1,1,16,'var(--g1)')),'i');}

/* 15 第一次相减：各算各的变化（−2 / −4）——零线向左的柱 */
{const zx=1250,u=150,rh=136,ry=[440,640];
scene('diff1','teaching',A=>A.P(17),svg(
  `<rect x="${zx-4}" y="360" width="8" height="${GND-360+8}" rx="4" fill="var(--g2)"/>`+
  storeAt('s0',C4c[0],ry[0]+rh,136,FOC,{g:'st',a:'cx'})+storeAt('s1',C4c[0],ry[1]+rh,136,'var(--g1)',{g:'st',a:'cx'})+
  tag(`<rect id="r0" x="${zx-2*u}" y="${ry[0]}" width="${2*u}" height="${rh}" rx="16" fill="var(--pink)"/>`,{g:'bl',a:'right'})+
  tag(`<rect id="r1" x="${zx-4*u}" y="${ry[1]}" width="${4*u}" height="${rh}" rx="16" fill="var(--g2)"/>`,{g:'bl',a:'right'})+
  L('n0',zx+144,ry[0]+rh/2+24,'−2',FOC,72,{g:'nl',a:'cx'})+L('n1',zx+144,ry[1]+rh/2+24,'−4','var(--g1)',72,{g:'nl',a:'cx'})+ic('zi','calendar',zx,304,88,'var(--g1)')),'u');}

/* 16 第二次相减：(−2) − (−4) = +2 */
{const zx=1250,u=150,rh=112;
scene('diff2','teaching',A=>A.P(19),svg(
  `<rect x="${zx-4}" y="296" width="8" height="${GND-296+8}" rx="4" fill="var(--g2)"/>`+
  `<rect id="r0" x="${zx-2*u}" y="328" width="${2*u}" height="${rh}" rx="16" fill="var(--pink)"/>`+
  `<rect id="r1" x="${zx-4*u}" y="488" width="${4*u}" height="${rh}" rx="16" fill="var(--g2)"/>`+
  `<rect id="gap" x="${zx-4*u}" y="648" width="${2*u}" height="${rh}" rx="16" fill="var(--MI)"/>`+
  `<path d="M${zx-2*u} 440 L${zx-2*u} 648" stroke="var(--MI)" stroke-width="6" stroke-dasharray="14 12"/>`+
  pill('res',C4c[0]+40,704,280,120,'+2','var(--MI)','var(--INK)',72)+L('n0',zx+144,408,'−2',FOC,64)+L('n1',zx+144,568,'−4','var(--g1)',64)),'c');}

/* 17 一步步：宾州变化平移成新泽西的反事实（16），实际 18，差 +2 */
{const c=CF(296,1380),y=v=>(v-12)/10;
scene('steps','teaching',A=>A.P(20),svg(chart('ax',c)+vline('v',c,.5)+
  ln('pa',`M${pt(c,.08,y(20))} L${pt(c,.5,y(20))} L${pt(c,.92,y(16))}`,'var(--g2)',12)+
  ln('cf',`M${pt(c,.5,y(20.4))} L${pt(c,.92,y(16.4))}`,'var(--ink)',8,true)+
  ln('nj',`M${pt(c,.08,y(20.4))} L${pt(c,.5,y(20.4))} L${pt(c,.92,y(18))}`,'var(--pink)',12)+
  brace('br',Math.round(c.x+.92*c.w)+24,Math.round(c.y+c.h-y(18)*c.h),Math.round(c.y+c.h-y(16.4)*c.h),'var(--MI)')+
  pill('p',LEG,Math.round(c.y+c.h-y(17.2)*c.h),200,104,'+2','var(--MI)','var(--INK)',60)+ic('g','ghost',LEG,GND-80,136,'var(--g2)')),'i');}

/* 18 两句话同时成立：现实↓（前后）与效果 +2（对反事实） */
scene('both','schematic',A=>A.P(21),svg(gnd()+store('s0',C2c[0],SH2*.82,FOC)+AR('dn',C2c[0]+250,360,C2c[0]+250,560,'var(--CO)',18)+
  store('s1',C2c[1]-120,SH2*.82,FOC)+ghostStore('g',C2c[1]+200,SH2*.5)+pill('p',C2c[1]+40,320,220,104,'+2','var(--MI)','var(--INK)',60)+
  `<rect x="${X0+686+4}" y="320" width="16" height="${GND-320}" rx="8" fill="var(--g3)"/>`+
  L('l0',C2c[0],GND+104,'现实',FOC,48,{g:'lab',a:'bottom'})+L('l1',C2c[1],GND+104,'效果','var(--MI)',48,{g:'lab',a:'bottom'})),'u');

/* 19 术语：双重差分 */
scene('did','none',A=>A.P(22),K.term('term',1,160,'双重差分')+svg(
  [0,1].map(k=>pill('m'+k,C4c[k+1]+0,560,280,160,'−',k?'var(--g2)':FOC,'var(--INK)',120,{g:'mm',a:'cy'})).join('')+
  `<g id="eq"><rect x="${C4c[3]-64}" y="520" width="128" height="24" rx="12" fill="var(--ink)"/><rect x="${C4c[3]-64}" y="576" width="128" height="24" rx="12" fill="var(--ink)"/></g>`+
  ic('i0','store',C4c[0],560,160,FOC)),'c');

/* 20 平行趋势：变化同幅，起点可不同 */
{const c=CF(296,1380);
scene('parallel','schematic',A=>A.P(24),svg(chart('ax',c)+vline('v',c,.5)+
  ln('nj',`M${pt(c,.08,.82)} L${pt(c,.5,.82)} L${pt(c,.92,.52)}`,'var(--pink)',12)+ln('pa',`M${pt(c,.08,.46)} L${pt(c,.5,.46)} L${pt(c,.92,.16)}`,'var(--g2)',12)+
  brace('b0',Math.round(c.x+.92*c.w)+24,Math.round(c.y+c.h-.82*c.h),Math.round(c.y+c.h-.52*c.h),'var(--pink)')+
  brace('b1',Math.round(c.x+.92*c.w)+24,Math.round(c.y+c.h-.46*c.h),Math.round(c.y+c.h-.16*c.h),'var(--g2)')+
  L('t',LEG,576,'平行趋势','var(--MI)',48)),'i');}

/* 21 起点相同也可能失败：宾州自己走下坡 → 效果算大 */
{const c=CF(296);
scene('fail','schematic',A=>A.P(26),svg(chart('ax',c)+vline('v',c,.5)+
  ln('nj',`M${pt(c,.08,.7)} L${pt(c,.5,.7)} L${pt(c,.92,.56)}`,'var(--pink)',12)+ln('pa',`M${pt(c,.08,.7)} L${pt(c,.5,.7)} L${pt(c,.92,.12)}`,'var(--g2)',12)+
  ln('sh',`M${pt(c,.5,.7)} L${pt(c,.92,.38)}`,'var(--g1)',8,true)+M('x',Math.round(c.x+.25*c.w),400,128,false)),'u');}

/* 22 起点不同也没关系：25/20 都 −4 */
{const c=CF(296,1380);
scene('diffstart','teaching',A=>A.P(27),svg(chart('ax',c)+vline('v',c,.5)+
  ln('nj',`M${pt(c,.08,.85)} L${pt(c,.5,.85)} L${pt(c,.92,.6)}`,'var(--pink)',12)+ln('pa',`M${pt(c,.08,.45)} L${pt(c,.5,.45)} L${pt(c,.92,.2)}`,'var(--g2)',12)+
  L('a',Math.round(c.x+.08*c.w)+40,Math.round(c.y+c.h-.85*c.h)-32,'25',FOC,56)+L('b',Math.round(c.x+.08*c.w)+40,Math.round(c.y+c.h-.45*c.h)-32,'20','var(--g1)',56)+
  pill('p0',LEG,Math.round(c.y+c.h-.6*c.h),176,88,'−4',FOC,'var(--INK)',52,{g:'d',a:'cx'})+pill('p1',LEG,Math.round(c.y+c.h-.2*c.h),176,88,'−4','var(--g2)','var(--INK)',52,{g:'d',a:'cx'})+
  M('ok',LEG,376,128,true)),'c');}

/* 23 找旁证：行业像不像 / 政策前走势 / 单州新情况 —— 三等分卡 */
{const cy=520,ch=400;
const card=k=>tag(`<rect id="c${k}" x="${C3[k]}" y="${GND-ch}" width="448" height="${ch}" rx="32" fill="var(--g4)"/>`,{g:'card',a:'bottom+sp'});
scene('evidence','schematic',A=>A.P(28),svg([0,1,2].map(card).join('')+
  ib('a0','store',C3c[0]-88,GND-112,120,FOC,{g:'in',a:'bottom'})+ib('a1','store',C3c[0]+88,GND-112,120,'var(--g1)',{g:'in',a:'bottom'})+
  ln('t0',`M${C3[1]+64} ${GND-200} L${C3[1]+200} ${GND-232} L${C3[1]+384} ${GND-264}`,'var(--pink)',12)+ln('t1',`M${C3[1]+64} ${GND-120} L${C3[1]+200} ${GND-152} L${C3[1]+384} ${GND-184}`,'var(--g2)',12)+
  ib('a2','store',C3c[2]-40,GND-112,120,'var(--g1)',{g:'in',a:'bottom'})+ic('mg','magnifier',C3c[2]+96,GND-260,120,'var(--ink)')+
  [0,1,2].map(k=>M('m'+k,C3c[k],GND-ch+96,104,k<2)).join('').replace('var(--CO)','var(--CO)')+
  [0,1,2].map(k=>K.node('n'+k,C3[k]+56,GND-ch+56,k+1)).join('')),'i');}

/* 24 单州特有事件：第二次相减扣不掉 */
scene('shock','schematic',A=>A.P(29),svg(gnd()+store('nj',C3c[0],SH,FOC)+store('pa',C3c[2],SH,'var(--g1)')+ic('ev','promo',C3c[2],GND-SH-136,144,'var(--CO)')+
  AR('a',C3c[2]-104,GND-SH-136,C3c[1]+96,GND-264,'var(--CO)',14)+ib('g','ghost',C3c[1],GND,240,'var(--CO)',{g:'ground',a:'bottom'})),'i');

/* 25 回到真实研究：相对就业未下降，反而更高（方向示意） */
{const bw=328;
scene('result','record',A=>A.P(30),svg(gnd()+store('nj',C4c[0],240,FOC)+store('pa',C4c[1],240,'var(--g1)')+
  `<rect x="${C4[2]}" y="${GND-8}" width="${bw*2+28}" height="8" fill="var(--g2)"/>`+
  bar('b',C4[2]+bw/2+14,bw,320,'var(--MI)',{g:'ground',a:'bottom'})+AR('up',C4c[3]+140,GND-120,C4c[3]+140,GND-400,'var(--MI)',16)+
  L('l',C4[2]+bw+14,GND+104,'相对变化','var(--ink)',48)),'u');}

/* 26 结论范围：这项研究 / 这次调整 / 这些店；别处 = 问号 */
scene('scope','record',A=>A.P(32),svg(gnd()+`<rect id="fr" x="${X0}" y="${GND-SH2*.82-176}" width="686" height="${SH2*.82+176}" rx="32" fill="none" stroke="var(--pink)" stroke-width="8"/>`+
  store('s',C2c[0],SH2*.82,FOC)+ic('cal','calendar',C2c[0],GND-SH2*.82-88,104,FOC)+
  ic('p0','pin',C2c[1]-160,560,200,'var(--g2)',{g:'pin',a:'cy'})+ic('p1','pin',C2c[1]+160,560,200,'var(--g2)',{g:'pin',a:'cy'})+Q('q',C2c[1],360,160,'var(--ink)')),'i');

/* 27 可信度：宾州为什么是好替身（放大镜看替身） */
scene('credible','schematic',A=>A.P(33),svg(gnd()+store('nj',C2c[0],SH2*.82,FOC)+store('pa',C2c[1],SH2*.82,'var(--g1)')+
  ic('mg','magnifier',C2c[1]+200,GND-SH2*.82-40,200,'var(--ink)')+L('l1',C2c[1],GND+104,'替身','var(--MI)',48,{g:'lab',a:'bottom'})+L('l0',C2c[0],GND+104,'新泽西',FOC,48,{g:'lab',a:'bottom'})),'u');

/* 28 收尾：前后变化 − 本来会发生的变化 = 因果效果 */
{const c=CF(296,1380);
scene('close','none',A=>A.P(34),svg(chart('ax',c)+vline('v',c,.5)+
  ln('nj',`M${pt(c,.08,.7)} L${pt(c,.5,.7)} L${pt(c,.92,.5)}`,'var(--pink)',12)+ln('cf',`M${pt(c,.5,.7)} L${pt(c,.92,.25)}`,'var(--g2)',10,true)+
  brace('br',Math.round(c.x+.92*c.w)+24,Math.round(c.y+c.h-.5*c.h),Math.round(c.y+c.h-.25*c.h),'var(--MI)')+
  ic('g','ghost',LEG,GND-96,160,'var(--g2)')+Q('q',LEG,400,200,'var(--SU)')),'u');}

window.SCENES=S;
})();
