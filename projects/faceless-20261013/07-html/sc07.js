
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
  [0,1].map(j=>[0,1,2].map(i=>heart('m'+j+i,cc(2)-95+j*190,y0+170+i*110,74,i==1&&j==0||i==2&&j==1?'var(--g2)':'var(--CO)')).join('')).join('')+K.stext('ap',cc(2),y0+300,'≈',{anchor:'middle',fill:'var(--ink)',size:72,weight:700})+
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
  perAt('p1',C2[1]+140,GND-30,320,1,null,1)+form('f1',C2[1]+240,GND-170,120)+ARW2('a1',C2[1]+300,GND-220,C2[1]+380,GND-220)+stamp('st',C2[1]+450,GND-230,110)+M('m',C2[1]+450,GND-370,70,true)+shield('sh',C2[1]+590,GND-230,150,true)),'u');}

/* 19 这些特点本身影响看病、支出、健康：① 身体差 → 看病多、花钱多；② 会办手续 → 更会照顾自己 */
{const cw=686,ch=520,y0=GND-ch;
scene('affect','teaching',A=>A.P(18),svg([0,1].map(k=>tag(card('c'+k,C2[k],y0,cw,ch),{g:'card',a:'bottom'})+K.nodeOn('n'+k,C2[k]+60,y0+60,k+1)).join('')+
  heart('h0',C2[0]+140,y0+260,150,'var(--g2)')+ARW2('a0',C2[0]+240,y0+260,C2[0]+330,y0+260)+clinic('cl',C2[0]+470,y0+370,230)+bill('bl',C2[0]+590,y0+420,110)+
  form('fm',C2[1]+140,y0+270,220)+ARW2('a1',C2[1]+260,y0+270,C2[1]+360,y0+270)+heart('h1',C2[1]+500,y0+270,190)+M('m',C2[1]+610,y0+150,80,true)),'c');}

/* 20 一步一步：参保与否本就不同 → 影响结果 → 差别里混进原有差异 = 选择问题 */
{const fy=440,fh=420;
scene('mix','teaching',A=>A.P(19),svg(gnd()+frame('g1',262,fy,330,fh,SHC,'参保')+frame('g0',612,fy,330,fh,'var(--g2)','未参保','var(--CR)')+
  row('a',262,592,GY,200,[[1,true],[0,true],[1,true]])+row('b',612,942,GY,200,[[1,false],[0,false],[0,false]])+
  [0,1,2].map(i=>heart('ha'+i,262+330*(i+.5)/3,GY-318,52,i<2?'var(--g2)':'var(--CO)')+heart('hb'+i,612+330*(i+.5)/3,GY-318,52,i<1?'var(--g2)':'var(--CO)')).join('')+
  ARW2('ar',970,GND-200,1090,GND-200)+vbar('y1',1130,140,GND,440,SHC)+vbar('y0',1300,140,GND,200,LOS)+
  `<rect x="1460" y="${GND-440}" width="40" height="120" rx="8" fill="${SHC}"/><rect x="1460" y="${GND-320}" width="40" height="120" rx="8" fill="var(--g2)"/>`+brace('br',1510,GND-440,GND-200,'var(--ink)')+
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
scene('how','none',A=>A.P(22),svg(gnd()+shield('sh',C3c[0]+20,GND-280,330,true)+ARW2('a',C3c[0]+210,GND-280,C3c[2]-200,GND-280)+Q('q',960,GND-420,140,'var(--SU)')+heart('h',C3c[2]-40,GND-280,300)),'i');

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
  perAt('p0',C2c[0]-80,GND-30,300,0,false,0)+perAt('p1',C2c[1]-80,GND-30,300,1,true,0)+heart('h',C2c[1]+170,GND-260,150)+M('m',C2c[1]+170,GND-400,80,true)+heart('h0',C2c[0]+170,GND-260,150,'var(--g2)')),'u');}

/* 28 但这个推理要靠额外的条件 */
scene('need','none',A=>A.P(27),svg(gnd()+heart('h',C3c[0]-40,GND-420,170)+shield('s',C3c[0]-40,GND-220,170,true)+pill('f',C3c[0]+130,GND-560,300,90,'1÷0.25','var(--SU)','var(--INK)',52)+ARW2('a0',C3c[0]+110,GND-320,C3c[1]-50,GND-320)+
  slot('s1',C3c[1]+110,GND-320,300)+slot('s2',C3c[2]+50,GND-320,300)+K.nodeOn('n1',C3c[1]-10,GND-450,1)+K.nodeOn('n2',C3c[2]-70,GND-450,2)+L('c1',C3c[1]+110,GND-80,'不绕路','var(--ink)',48)+L('c2',C3c[2]+50,GND-80,'单调性','var(--ink)',48)),'c');

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
scene('self','record',A=>A.P(32),svg(gnd()+fb('p',C3c[0]-60,GND,360,ZC(1))+quest('qs',C3c[0]+130,GND-250,220)+M('m',C3c[0]+130,GND-470,80,true)+NE(960,GND-260,150)+
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

window.SCENES=S;
})();
