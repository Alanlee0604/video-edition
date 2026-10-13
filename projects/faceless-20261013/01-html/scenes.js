/* 第01集：乐透促销的四道比较 —— 场景脚本（极简版）
   规则：一屏一个概念；主要元素 ≤3；文字块 ≤2（不计字幕和标注）；新元素出现时旧元素淡出。
   时间全部绑在旁白的词上：W(段落,'词')。不出现任何研究数值，走势只是方向示意。 */
(function(){
const K=window.KIT,G=K.G,SP=K.SPAN;
const S=[];const scene=(id,kind,start,html,build,label)=>S.push({id,kind,start,html,build,label});
const P=s=>`<span class="pink">${s}</span>`;
const Y0=330; // 内容区上沿

/* 01 开场 —— 上涨线 + 两个待选解释（各配图标） */
scene('hook','schematic',A=>0,
  K.title('销量涨了，该算谁的？')+
  K.svg(K.axes('ax',G(1),Y0,SP(5),400,{yl:'彩票销量'})+K.path('up',`M${G(1)+10} 700 C ${G(3)} 690, ${G(4)} 620, ${G(6)-60} 420`,'pink')+K.icon('tk','ticket',G(6)-20,390,64,'pink')+
    K.icon('i1','ticket',G(7)+40,450,72,'ink')+K.icon('i2','user',G(7)+40,590,72,'ink'))+
  K.t('q1',8,420,'促销起了作用？','lead')+K.t('q2',8,560,'老板本来就更卖力？','lead'),
  ({in:i,draw,pop,A})=>{i('#ttl',0.05);i('#ax',.1);draw('#up',A.W(0,'彩票'),1.4);pop('#tk',A.W(0,'彩票')+1.2);
    i('#i1,#q1',A.W(0,'促销'));i('#i2,#q2',A.W(0,'老板'));});
/* 02 规则 —— 收银员 · 柜台 · 顾客；气泡指向收银员，彩票递给顾客 */
scene('rule','schematic',A=>A.P(1),
  K.title('活动规则')+
  K.svg(K.figure('cash',G(5),800,{shirt:'var(--UP)',shirtD:'#8A8AF0',apron:'var(--SU)',armR:-72,armL:6,legs:false})+
    K.figure('cust',G(9)+20,820,{shirt:'var(--CR)',shirtD:'var(--CRD)',hair:'var(--INK)',hairStyle:1,armL:58,armR:4})+
    `<rect id="counter" x="${G(2)}" y="700" width="${SP(9)}" height="36" rx="8" fill="var(--CRS)"/><rect id="cbody" x="${G(2)+20}" y="736" width="${SP(9)-40}" height="140" rx="4" fill="var(--CR)"/>`+
    K.icon('reg','register',G(2)+110,670,130,'var(--CO)')+K.icon('tk','ticket',G(6)+60,640,90,'var(--SU)')+
    K.bubble('bub',G(6)+40,300,330,120,G(5)+40,440)+K.stext('bt',G(6)+205,374,'来张彩票？',{anchor:'middle',fill:'var(--INK)',size:40,weight:700}))+
  K.t('r1',1,300,`结账时<br>${P('必须问一句')}`,'lead',{span:4})+
  K.t('r2',1,300,`忘了问<br>顾客${P('免费拿一张')}`,'lead',{span:4})+
  K.t('r3',1,300,`收银员不敢忘<br>顾客${P('多个理由')}`,'lead',{span:4}),
  ({in:i,pop,move,to,seq,A})=>{i('#ttl',A.P(1));i('#counter,#cbody,#reg',A.P(1)+.1);i('#cash',A.W(1,'收银员'));i('#cust',A.W(1,'顾客'));
    pop('#bub,#bt',A.W(1,'要不要'));pop('#tk',A.W(1,'彩票'));move('#tk',A.W(1,'免费'),[0,0],[200,30],.9);
    seq([['#r1',A.W(1,'结账')],['#r2',A.W(1,'要是')],['#r3',A.W(2,'收银员')]]);});
/* 03 销量上去了 */
scene('rise','schematic',A=>A.W(2,'活动之后'),
  K.title('活动之后，销量确实上去了')+
  K.svg(K.axes('ax',G(2),Y0,SP(8),400,{yl:'彩票销量',xl:'时间'})+K.vline('v',G(6),Y0+10,Y0+400,'活动开始')+
    K.path('pre',`M${G(2)+10} 640 L ${G(6)} 630`,'g')+K.path('post',`M${G(6)} 630 C ${G(7)} 625, ${G(8)} 520, ${G(10)-30} 420`,'pink')),
  ({in:i,draw,A})=>{i('#ttl,#ax,#v',A.W(2,'活动之后'));draw('#pre',A.W(2,'活动之后'),.8);draw('#post',A.W(2,'销量'),1.3);});

/* 04 自愿报名 —— 两组店铺图标；老板图标在报名组上方 */
scene('select','schematic',A=>A.P(3),
  K.title('参加的店，是老板自己报名的')+
  K.svg([0,1,2].map(k=>K.icon('a'+k,'store',G(2)+k*130,470,96,'pink')+K.icon('b'+k,'store',G(7)+40+k*130,470,96,'g')).join('')+
    K.stext('la',G(2)+130,560,'报名参加',{anchor:'middle',fill:'var(--pink)'})+K.stext('lb',G(7)+170,560,'没报名',{anchor:'middle'})+
    K.icon('own','user',G(2)+130,350,64,'ink')+K.icon('form','clipboard-pen',G(3)+100,350,48,'pink'))+
  K.t('s1',1,660,`老板：${P('更上心 · 更会卖')}`,'body',{span:10})+
  K.t('s2',1,660,`不搞活动，<span class="spec">也可能本来就好</span>`,'body',{span:10}),
  ({in:i,pop,stagger,seq,A})=>{i('#ttl',A.P(3));stagger(['#a0','#a1','#a2','#la'],A.W(3,'参加活动'),.1);stagger(['#b0','#b1','#b2','#lb'],A.W(3,'参加活动')+.5,.1);
    i('#own',A.W(3,'老板'));pop('#form',A.W(3,'报名'));seq([['#s1',A.W(4,'更上心')],['#s2',A.W(4,'就算不搞')]]);});
/* 05 分不开 —— 一根条 + 一条游移的虚线 */
scene('attrib','schematic',A=>A.P(5),
  K.title('多卖的部分，怎么分？')+
  K.svg(`<rect id="bar" x="${G(1)}" y="420" width="${SP(10)}" height="110" rx="12" fill="none" stroke="var(--g1)" stroke-width="2.5"/>`+
    K.path('cut',`M${G(6)-12} 400 L ${G(6)-12} 550`,'spec')+
    K.stext('la',G(1)+30,488,'活动的功劳？',{fill:'var(--pink)',size:40})+K.stext('lb',G(11)-30,488,'老板的功劳？',{anchor:'end',size:40}))+
  K.t('only',1,640,`光看销量，${P('分不出来')}`,'body',{span:10}),
  ({in:i,draw,to,A})=>{i('#ttl',A.P(5));draw('#bar',A.W(5,'参加活动'),1);i('#la',A.W(5,'活动的功劳'));i('#lb',A.W(5,'老板本人'));
    draw('#cut',A.W(5,'老板本人')+.3,.5);to('#cut',{x:[0,-220]},A.W(5,'光看'),1.6,'inout');to('#cut',{x:[-220,180]},A.W(5,'光看')+1.6,1.8,'inout');i('#only',A.W(5,'光看'));});

/* 06 选择威胁 —— 两排老板：报名的（焦点色）与没报名的，活动开始前已分开 */
scene('threat','none',A=>A.P(6),
  K.term('term',1,260,'选择威胁')+
  K.t('g',7,290,`差别可能在${P('活动之前')}<br>就已经定下`,'lead',{span:5})+
  K.svg(`<rect id="v" x="1310" y="470" width="10" height="420" rx="5" fill="var(--g3)"/>`+K.stext('vl',1315,930-30,'活动开始',{anchor:'middle',fill:'var(--g1)'})+
    `<g id="rowA">${[0,1,2].map(k=>K.figure('a'+k,G(2)+k*150,640,{s:.5,shirt:'var(--CO)',shirtD:'var(--COD)',armL:-40,armR:30})).join('')}</g>`+
    `<g id="rowB">${[0,1,2].map(k=>K.figure('b'+k,G(2)+k*150,850,{s:.5,shirt:'var(--g2)',shirtD:'var(--g1)'})).join('')}</g>`+
    K.stext('la',G(5),590,'主动报名',{fill:'var(--CO)',size:36,weight:700})+K.stext('lb',G(5),800,'没报名',{fill:'var(--g1)',size:36,weight:700})),
  ({in:i,pop,stagger,A})=>{pop('#term',A.W(6,'选择威胁'));i('#rowA,#la',A.W(6,'两组'));i('#rowB,#lb',A.W(6,'两组')+.3);i('#v,#vl',A.W(6,'可能在'));i('#g',A.W(6,'活动开始之前'));});
/* 07 推理链 —— 四个编号节点 + 当前一步的文字 */
const chainT=['想知道效果，就得拿参加的店和没参加的店比','两组怎么分的？老板自己选的','选不选，和老板是什么样的人有关','老板是什么样的人，本身就影响销量'];
const NX=k=>G(2)+k*SP(2)+k*24+SP(1)/2+60;
scene('chain','none',A=>A.P(7),
  K.title('“选择威胁”是怎么推出来的')+
  K.svg(K.path('rail',`M${NX(0)} 470 L ${NX(3)} 470`,'axis')+[0,1,2,3].map(k=>K.node('n'+k,NX(k),470,k+1)+K.nodeOn('m'+k,NX(k),470,k+1)).join(''))+
  chainT.map((s,k)=>K.t('c'+k,1,610,s,'lead',{span:10,align:'center'})).join('')+
  K.t('res',1,610,`差别里混进了${P('老板本身')}`,'lead',{span:10,align:'center'}),
  ({in:i,draw,seq,to,A})=>{i('#ttl',A.P(7));draw('#rail',A.P(7)+.3,1.2);
    const w=['第一步','第二步','第三步','第四步'];w.forEach((s,k)=>{i('#n'+k,A.P(7)+.3+k*.12);to('#m'+k,{opacity:[0,1]},A.W(7,s),.35,'out');if(k<3)to('#m'+k,{opacity:[1,.0]},A.W(7,w[k+1]),.35,'inout')});
    seq([...w.map((s,k)=>['#c'+k,A.W(7,s)]),['#res',A.W(7,'所以')]]);});

/* 08 最容易犯的错 —— 一根条：先整根算成效果 → 拆成两段 */
scene('mistake','schematic',A=>A.P(8),
  K.title('最容易犯的错')+
  K.svg(`<rect id="all" x="${G(1)}" y="420" width="${SP(10)}" height="110" rx="12" fill="var(--pink)" opacity=".85"/>`+
    `<rect id="pa" x="${G(1)}" y="420" width="${SP(6)}" height="110" rx="12" fill="var(--pink)"/>`+
    `<rect id="pb" x="${G(7)}" y="420" width="${SP(4)}" height="110" rx="12" fill="none" stroke="var(--g1)" stroke-width="2.5" stroke-dasharray="10 10"/>`)+
  K.t('s1',1,600,`多卖的部分，<span class="strike">全都算成活动效果</span>`,'lead',{span:10})+
  K.t('s2',1,600,`一部分只是${P('老板本来就多卖')}`,'lead',{span:10}),
  ({in:i,wipe,out,seq,A})=>{i('#ttl',A.P(8));wipe('#all',A.W(8,'参加组'),.9);out('#all',A.W(8,'其中一部分'),.4);
    wipe('#pa',A.W(8,'其中一部分'),.6);i('#pb',A.W(8,'只是'));seq([['#s1',A.W(8,'全都算成')],['#s2',A.W(8,'可其中')]]);});

/* 09 关键帧② 四种比较总览 —— 四个编号节点 + 名称；一句话 */
const four=['配对商店','连续前后测','其他商品','停止与恢复'];
const FX=k=>G(1)+SP(2)/2+k*G(3)-k*120+ (k*0);
const FX2=k=>G(2)+k*(3*142)-  0;
scene('four','none',A=>A.P(9),
  K.title('没法随机，就从四个角度比')+
  K.svg(K.path('rail',`M${G(2)+60} 470 L ${G(2)+60+3*378} 470`,'axis')+four.map((s,k)=>K.node('f'+k,G(2)+60+k*378,470,k+1,{r:40})+K.stext('fl'+k,G(2)+60+k*378,560,s,{anchor:'middle',fill:'var(--ink)',size:36})).join(''))+
  K.t('s1',1,680,'研究者没法让老板们随机参加','body',{span:10,align:'center'})+
  K.t('s2',1,680,`每一种比较，${P('专门对付一种别的解释')}`,'body',{span:10,align:'center'}),
  ({in:i,draw,stagger,seq,A})=>{i('#ttl',A.P(9));draw('#rail',A.W(9,'几个角度'),1.2);
    stagger(['#f0','#f1','#f2','#f3'],A.W(9,'几个角度'),.2,{dy:0});stagger(['#fl0','#fl1','#fl2','#fl3'],A.W(9,'几个角度')+.15,.2,{dy:0});
    seq([['#s1',A.P(9)+.2],['#s2',A.W(9,'每一种')]]);});

/* 10 第一种：找搭档 —— 两家店并排 + 三个条件勾点 */
const crit=['同一个连锁品牌','开在同一个区域','活动前，彩票份额差不多'];
scene('pair','schematic',A=>A.P(10),
  K.title('第一种：给参加的店找搭档')+
  K.svg(K.icon('t','store',G(3)+60,450,180,'pink')+`<rect id="slot" x="${G(7)+50}" y="370" width="180" height="170" rx="16" fill="none" stroke="var(--g2)" stroke-width="2.25" stroke-dasharray="10 10"/>`+K.icon('m','store',G(7)+140,450,180,'g')+
    K.stext('tl',G(3)+60,600,'参加的店',{anchor:'middle',fill:'var(--pink)'})+K.stext('ml',G(7)+140,600,'对照店',{anchor:'middle'})+
    [0,1,2].map(k=>K.ring('kr'+k,G(5)+60+k*50,450,10,'g')+K.dot('k'+k,G(5)+60+k*50,450,10,'pink')).join(''))+
  crit.map((s,k)=>K.t('c'+k,1,680,s,'lead',{span:10,align:'center'})).join(''),
  ({in:i,pop,out,seq,A})=>{i('#ttl',A.P(10));i('#t,#tl',A.P(10)+.2);i('#slot',A.W(10,'找搭档'));i('#kr0,#kr1,#kr2',A.W(11,'找什么样'));
    const w=['同一个连锁品牌','同一个区域','份额差不多'];w.forEach((s,k)=>pop('#k'+k,A.WE(11,s)));
    seq(w.map((s,k)=>['#c'+k,A.W(11,s)]));i('#m,#ml',A.W(11,'份额差不多')+.3);out('#slot',A.W(11,'份额差不多')+.3);});
/* 11 打个比方：大店 vs 小店 → 变成一样大 */
scene('scale','teaching',A=>A.P(12),
  K.title('为什么要找差不多的店')+
  K.svg(K.icon('big','store',G(3),470,240,'g')+K.icon('crowd','users',G(3),640,72,'ink')+K.icon('small','store',G(8)+40,520,110,'g')+K.icon('one','user-round',G(8)+40,640,48,'g'))+
  K.t('s1',1,720,`大店卖得多，${P('跟活动没什么关系')}`,'lead',{span:10,align:'center'})+
  K.t('s2',1,720,`原本差不多，${P('差别才归活动')}`,'lead',{span:10,align:'center'}),
  ({in:i,to,out,seq,A})=>{i('#ttl',A.P(12));i('#big',A.W(12,'大店'));i('#crowd',A.W(12,'人来人往'));i('#small',A.W(12,'小店'));i('#one',A.W(12,'冷冷清清'));
    out('#crowd,#one',A.W(12,'只有两家'));to('#big',{scale:[1,.65],x:[0,120]},A.W(12,'只有两家'),1,'inout');to('#small',{scale:[1,1.42],y:[0,-50],x:[0,-60]},A.W(12,'只有两家'),1,'inout');
    seq([['#s1',A.W(12,'大店卖得多')],['#s2',A.W(12,'只有两家')]]);},'打个比方');
/* 12 术语：非同等比较组 */
scene('necg','none',A=>A.P(13),
  K.term('term',1,300,'非同等比较组')+
  K.t('g1',1,480,`对照组是${P('人挑的')}，<br>不是随机分的`,'lead',{span:9})+
  K.t('g2',1,480,`可以挑得很像，<br>但${P('不保证一样')}。`,'lead',{span:9}),
  ({pop,seq,A})=>{pop('#term',A.W(13,'非同等比较组'));seq([['#g1',A.W(13,'白话说')],['#g2',A.W(13,'提醒你')]]);});

/* 13 配对管得住什么 —— 两家看上去一样的店；老板（人）是问号 */
scene('limits','schematic',A=>A.P(14),
  K.title('配对管得住什么？')+
  K.svg(K.icon('a','store',G(3)+60,460,160,'pink')+K.icon('b','store',G(8),460,160,'g')+K.icon('oa','user',G(3)+60,330,56,'ink')+K.icon('ob','user',G(8),330,56,'ink')+
    K.stext('qm',G(5)+SP(2)/2+20,370,'？',{anchor:'middle',fill:'var(--pink)',size:72,weight:700}))+
  K.t('s1',1,660,`看得见的差别：${P('管得住')}`,'body',{span:10,align:'center'})+
  K.t('s2',1,660,`老板的干劲：<span class="g1">管不住</span>`,'body',{span:10,align:'center'})+
  K.t('s3',1,660,'这个问号还留着，研究还得往下做','body',{span:10,align:'center'}),
  ({in:i,pop,seq,A})=>{i('#ttl',A.P(14));i('#a,#b',A.P(14)+.2);seq([['#s1',A.W(14,'看得见')],['#s2',A.W(14,'管不住')],['#s3',A.W(14,'这个问号')]]);i('#oa,#ob',A.W(14,'看不见'));pop('#qm',A.W(14,'老板的干劲'));},'示意图 · 匹配关系');
/* 14 第二种：把时间拉长（日历图标 + 周点） */
const tx=k=>G(2)+40+k*142;
scene('time','schematic',A=>A.P(15),
  K.title('第二种：把时间拉长')+
  K.svg(K.icon('cal','calendar',G(1)+20,500,64,'ink')+K.path('axis',`M${G(2)} 500 L ${G(11)-24} 500`,'axis')+K.vline('v',G(6)+60,380,500,'')+K.stext('vl',G(6)+60,370,'活动开始',{anchor:'middle'})+
    [0,1,2,3].map(k=>K.dot('b'+k,tx(k),500,11,'ink')).join('')+[0,1,2,3].map(k=>K.dot('a'+k,tx(k)+4*142+40,500,11,'pink')).join('')+
    K.stext('wb',tx(0),570,'活动前 4 周')+K.stext('wa',tx(4)+40,570,'活动后 4 周',{fill:'var(--pink)'}))+
  K.t('s1',1,680,`前后各四周，${P('不只看两天')}`,'body',{span:10,align:'center'}),
  ({in:i,stagger,A})=>{i('#ttl,#axis,#v,#vl,#cal',A.P(15));stagger(['#b0','#b1','#b2','#b3','#wb'],A.W(15,'前后各四周'),.1,{dy:0});stagger(['#a0','#a1','#a2','#a3','#wa'],A.W(15,'四周'),.1,{dy:0});i('#s1',A.W(15,'而不是'));},'示意图 · 测量窗口');
/* 15 教学假设：本来就在上涨 */
scene('trend','teaching',A=>A.P(16),
  K.title('只看两个点，会犯什么错？')+
  K.svg(K.axes('ax',G(2),Y0,SP(8),320,{yl:'彩票销量',xl:'时间'})+K.vline('v',G(6),Y0+10,Y0+320,'贴上海报')+
    K.path('rise',`M${G(2)+10} 640 L ${G(6)} 530`,'g')+K.path('ext',`M${G(6)} 530 L ${G(10)-20} 420`,'spec')+
    K.dot('p0',G(6)-90,555,11,'ink')+K.dot('p1',G(6)+90,507,11,'pink'))+
  K.t('s1',1,750,`假如它本来就在一路上涨……`,'body',{span:10,align:'center'})+
  K.t('s2',1,750,`后 − 前，${P('其实只是原来的趋势')}`,'body',{span:10,align:'center'}),
  ({in:i,draw,pop,seq,A})=>{i('#ttl,#ax',A.P(16));draw('#rise',A.W(16,'一路上涨'),1.3);i('#v',A.W(16,'贴上海报'));
    pop('#p0',A.W(16,'活动后的数字')-.3);pop('#p1',A.W(16,'活动后的数字'));draw('#ext',A.W(16,'原来的上涨趋势'),1.2);
    seq([['#s1',A.W(16,'假如')],['#s2',A.W(16,'就会把')]]);},'教学假设 · 原本就在上涨');

/* 16 多次前后测 */
const mp=[[0,600],[1,595],[2,602],[3,598],[4,600],[6,560],[7,520],[8,500],[9,480]];
scene('multi','schematic',A=>A.P(17),
  K.title('多看几个时间点')+
  K.svg(K.axes('ax',G(1)+60,Y0,SP(10)-60,320,{yl:'销量',xl:'时间'})+K.vline('v',G(1)+60+5*130+60,Y0+10,Y0+320,'活动开始')+
    mp.map(([k,y],j)=>K.dot('m'+j,G(1)+120+k*130,y,10,j<5?'ink':'pink')).join(''))+
  K.t('s1',1,750,'① 先看清原来往哪儿走','body',{span:10,align:'center'})+
  K.t('s2',1,750,'② 再看活动开始后，走向有没有变','body',{span:10,align:'center'})+
  K.t('s3',1,750,`${P('多次前后测')}：前后都多测`,'body',{span:10,align:'center'}),
  ({in:i,stagger,seq,A})=>{i('#ttl,#ax,#v',A.P(17));stagger([0,1,2,3,4].map(j=>'#m'+j),A.W(17,'多看几个'),.14,{dy:0});stagger([5,6,7,8].map(j=>'#m'+j),A.W(17,'再看'),.14,{dy:0});
    seq([['#s1',A.W(17,'先看清')],['#s2',A.W(17,'再看')],['#s3',A.W(17,'书里')]]);},'示意图 · 无研究数值');

/* 17 书中结果：先一起跌，再分开 */
scene('evtime','record',A=>A.P(18),
  K.title('书里的结果')+
  K.svg(K.axes('ax',G(2),Y0,SP(8),320,{yl:'彩票销量',xl:'时间'})+K.vline('v',G(6),Y0+10,Y0+320,'活动开始')+
    K.path('tp',`M${G(2)+10} 420 L ${G(6)} 520`,'pink')+K.path('cp',`M${G(2)+10} 470 L ${G(6)} 570`,'g')+
    K.path('ta',`M${G(6)} 520 C ${G(7)} 520, ${G(8)} 440, ${G(10)-20} 400`,'pink')+K.path('ca',`M${G(6)} 570 L ${G(10)-20} 625`,'g')+
    K.stext('tl',G(10),400,'参加组',{fill:'var(--pink)'})+K.stext('cl',G(10),632,'对照组'))+
  K.t('s1',1,750,`第一：参加组原来${P('并没有在涨')}`,'body',{span:10,align:'center'})+
  K.t('s2',1,750,`第二：${P('只在活动后、参加店')}`,'body',{span:10,align:'center'}),
  ({in:i,draw,seq,A})=>{i('#ttl,#ax,#v',A.P(18));draw('#tp',A.W(18,'两组店'),1);draw('#cp',A.W(18,'两组店')+.15,1);
    draw('#ta',A.W(18,'参加组转头'),1);i('#tl',A.W(18,'往上'));draw('#ca',A.W(18,'对照组'),1);i('#cl',A.W(18,'还在往下'));
    seq([['#s1',A.W(19,'第一')],['#s2',A.W(19,'第二')]]);});

/* 18 还剩什么疑问：店 + 人流 */
scene('history','teaching',A=>A.P(20),
  K.title('还剩什么疑问？')+
  K.svg(K.icon('st','store',G(5)+60,470,160,'pink')+K.icon('tk','ticket',G(3),470,72,'pink')+K.arrow('a1',G(3)+60,470,G(5)-40,470,'pink')+
    K.icon('crowd','users',G(9),470,80,'g')+K.arrow('a2',G(9)-60,470,G(6)+160,470,'spec')+
    K.stext('l1',G(3),560,'活动',{anchor:'middle',fill:'var(--pink)'})+K.stext('l2',G(9),560,'周围别的事？',{anchor:'middle'}))+
  K.t('s1',1,680,'整店变旺，时间也对得上','body',{span:10,align:'center'})+
  K.t('s2',1,680,`这就要靠${P('第三种比较')}`,'body',{span:10,align:'center'}),
  ({in:i,draw,seq,A})=>{i('#ttl,#st',A.P(20));i('#tk,#l1',A.P(20)+.4);draw('#a1',A.P(20)+.5,.7);i('#crowd,#l2',A.W(20,'别的事'));draw('#a2',A.W(20,'别的事')+.3,.7);
    seq([['#s1',A.W(20,'整家店')],['#s2',A.W(20,'第三种比较')]]);},'教学假设 · 未知原因不是已发现的事实');
/* 19 第三种：查别的商品（四个商品图标） */
const goods=['彩票','汽油','香烟','食品'],gi=['ticket','fuel','cigarette','shopping-basket'];
const GX=k=>G(2)+60+k*SP(3)*0.92;
scene('goods','schematic',A=>A.P(21),
  K.title('第三种：查别的商品')+
  K.svg(goods.map((g,k)=>K.icon('g'+k,gi[k],GX(k),440,96,k?'g':'pink')+K.stext('gl'+k,GX(k),540,g,{anchor:'middle',fill:k?'var(--g1)':'var(--pink)',size:32})).join(''))+
  K.t('q',1,650,'研究的是彩票，查别的商品干什么？','lead',{span:10,align:'center'}),
  ({in:i,A})=>{i('#ttl',A.P(21));i('#g0,#gl0',A.P(21)+.2);i('#g1,#gl1',A.W(21,'汽油'));i('#g2,#gl2',A.W(21,'香烟'));i('#g3,#gl3',A.W(21,'食品'));i('#q',A.W(22,'研究的是彩票'));});
/* 20 两种解释，两种预测：每个商品一条虚线趋势（预测） */
const row=(id,y,dirs,lab,tone)=>K.stext(id+'h',G(1),y+8,lab,{fill:tone,size:32})+goods.map((g,k)=>K.icon(id+'i'+k,gi[k],G(4)+k*270,y,56,'g')+K.spark(id+'s'+k,G(4)+k*270+50,y+20,160,dirs[k],'spec')).join('');
scene('predict','teaching',A=>A.P(23),
  K.title('两种解释，推出两种结果')+
  K.svg(row('A',420,['up','up','up','up'],'整家店变旺','var(--ink)')+row('B',580,['up','flat','flat','flat'],'活动起作用','var(--pink)'))+
  K.t('s1',1,720,'客流多了：样样都该涨','body',{span:10,align:'center'})+
  K.t('s2',1,720,'收银员只问彩票，送的也只是彩票','body',{span:10,align:'center'})+
  K.t('s3',1,720,`看${P('哪种说法对得上')}`,'body',{span:10,align:'center'}),
  ({in:i,draw,seq,A})=>{i('#ttl',A.P(23));i('#Ah',A.W(23,'整家店旺起来'));goods.forEach((g,k)=>{i('#Ai'+k,A.W(23,'整家店旺起来')+.1*k);draw('#As'+k,A.W(23,'进店的人多了')+k*.15,.8)});
    i('#Bh',A.W(24,'活动就不一样'));goods.forEach((g,k)=>{i('#Bi'+k,A.W(24,'活动就不一样')+.1*k);draw('#Bs'+k,(k?A.W(24,'别的商品'):A.W(24,'只有彩票涨'))+k*.12,.8)});
    seq([['#s1',A.W(23,'进店的人多了')],['#s2',A.W(24,'收银员')],['#s3',A.W(25,'所以')]]);},'教学假设 · 两种解释的预测');
/* 21 书中结果：每个商品一条实线（方向） */
scene('evgoods','record',A=>A.P(26),
  K.title('结果：只有彩票涨了')+
  K.svg(goods.map((g,k)=>K.icon('r'+k,gi[k],G(2)+60,330+k*105,56,k?'g':'pink')+K.stext('rl'+k,G(3)+20,342+k*105,g,{fill:k?'var(--g1)':'var(--pink)',size:32})+
     K.spark('rs'+k,G(4)+40,k?340+k*105:370,SP(5),k?'flat':'up',k?'g':'pink')).join(''))+
  K.t('s1',1,750,'汽油、香烟和食品，没有相应增加','body',{span:10,align:'center'})+
  K.t('s2',1,750,`更符合${P('活动在起作用')}`,'body',{span:10,align:'center'}),
  ({in:i,draw,seq,A})=>{i('#ttl',A.P(26));goods.forEach((g,k)=>i(`#r${k},#rl${k}`,A.P(26)+k*.08));draw('#rs0',A.W(26,'彩票涨了'),1);
    [1,2,3].forEach(k=>draw('#rs'+k,A.W(26,'汽油')+k*.15,.9));seq([['#s1',A.W(26,'没有相应')],['#s2',A.W(26,'更符合')]]);});
/* 22 非同等依变项 —— 术语 + 白话 + 彩票/其他商品 两条趋势 */
scene('nedv','none',A=>A.P(27),
  K.term('term',1,300,'非同等依变项')+
  K.t('g1',1,480,`依变项 = 要看的${P('结果')}<br>比如销量`,'lead',{span:6})+
  K.t('g2',1,480,`活动碰不到它，<br>${P('共同原因')}却能带动它`,'lead',{span:6})+
  K.svg(K.icon('x1','ticket',G(8),440,64,'pink')+K.spark('s1',G(8)+60,470,SP(3)-40,'up','pink')+K.icon('x2','shopping-basket',G(8),600,64,'g')+K.spark('s2',G(8)+60,600,SP(3)-40,'flat','g')+
    K.stext('xl1',G(8),510,'彩票',{anchor:'middle',fill:'var(--pink)'})+K.stext('xl2',G(8),670,'其他商品',{anchor:'middle'})),
  ({pop,seq,in:i,draw,A})=>{pop('#term',A.W(27,'非同等依变项'));seq([['#g1',A.W(27,'依变项”就是')],['#g2',A.W(27,'意思很直白')]]);
    i('#x1,#xl1',A.W(27,'依变项”就是'));draw('#s1',A.W(27,'比如销量'),.9);i('#x2,#xl2',A.W(27,'找一个结果'));draw('#s2',A.W(27,'找一个结果')+.2,.9);});
/* 23 两个条件 + 反例：银行 */
scene('cond','teaching',A=>A.P(28),
  K.title('两个条件，缺一不可')+
  K.svg(K.node('c1',G(3),450,'1',{r:44})+K.nodeOn('c1on',G(3),450,'1',{r:44})+K.node('c2',G(6),450,'2',{r:44})+K.nodeOn('c2on',G(6),450,'2',{r:44})+
    K.stext('l1',G(3),540,'活动不直接影响它',{anchor:'middle',fill:'var(--ink)',size:32})+K.stext('l2',G(6),540,'共同原因会影响它',{anchor:'middle',fill:'var(--ink)',size:32})+
    K.icon('bank','landmark',G(9)+40,450,110,'g')+K.stext('bl',G(9)+40,560,'同一条街上的银行',{anchor:'middle'}))+
  K.t('s1',1,680,'缺一个都不行','lead',{span:10,align:'center'})+
  K.t('s2',1,680,`银行存款：${P('什么都说明不了')}`,'body',{span:10,align:'center'}),
  ({in:i,to,seq,A})=>{i('#ttl',A.P(28));i('#c1,#l1',A.W(28,'第一'));to('#c1on',{opacity:[0,1]},A.W(28,'第一'),.35);i('#c2,#l2',A.W(28,'第二'));to('#c2on',{opacity:[0,1]},A.W(28,'第二'),.35);
    i('#bank,#bl',A.W(28,'银行'));to('#c2on',{opacity:[1,0]},A.W(28,'客流变化'),.4,'inout');seq([['#s1',A.W(28,'缺一个')],['#s2',A.W(28,'它动不动')]]);},'打个比方');
/* 24 第三种的局限 */
scene('tlimit','teaching',A=>A.P(29),
  K.title('第三种比较也有局限')+
  K.t('s1',1,400,`能排除：同时影响${P('多种商品')}的原因`,'lead',{span:10})+
  K.t('s2',1,520,`只影响彩票的原因：<span class="spec">查不出</span>`,'lead',{span:10})+
  K.svg(K.arrow('ar',G(1),700,G(3),700,'pink')+K.stext('nx',G(3)+30,710,'这要靠第四种比较',{fill:'var(--pink)',size:36})),
  ({in:i,draw,dim,A})=>{i('#ttl',A.P(29));i('#s1',A.W(29,'能排除'));dim('#s1',A.W(29,'假设'),.35);i('#s2',A.W(29,'假设'));draw('#ar',A.W(29,'第四种比较'),.5);i('#nx',A.W(29,'第四种比较'));},'教学假设 · 未知原因不是已发现的事实');

/* 25 第四种：开 / 停 / 再开 —— 开关图标 + 销量线 */
const SX=[G(1),G(4)+40,G(7)+40,G(11)-24];
scene('removal','record',A=>A.P(30),
  K.title('第四种：活动停了再开')+
  K.svg(K.icon('w1','toggle-right',(SX[0]+SX[1])/2,390,64,'pink')+K.icon('w2','toggle-left',(SX[1]+SX[2])/2,390,64,'g')+K.icon('w3','toggle-right',(SX[2]+SX[3])/2,390,64,'pink')+
    K.stext('t1',(SX[0]+SX[1])/2,460,'参加',{anchor:'middle',fill:'var(--pink)'})+K.stext('t2',(SX[1]+SX[2])/2,460,'中途退出',{anchor:'middle'})+K.stext('t3',(SX[2]+SX[3])/2,460,'重新加入',{anchor:'middle',fill:'var(--pink)'})+
    K.path('axis',`M${SX[0]} 670 L ${SX[3]} 670`,'axis')+
    K.path('sales',`M${SX[0]} 650 C ${SX[0]+200} 650, ${SX[1]-200} 540, ${SX[1]} 540 C ${SX[1]+150} 540, ${SX[1]+150} 650, ${SX[2]} 650 C ${SX[2]+150} 650, ${SX[2]+150} 540, ${SX[3]} 540`,'pink')+
    K.stext('sl',SX[0],525,'彩票销量（方向）'))+
  K.t('s1',1,720,'也有的店，比较晚才开始','body',{span:10,align:'center'})+
  K.t('s2',1,720,`活动开、停、再开，销量${P('跟着变化')}`,'body',{span:10,align:'center'}),
  ({in:i,to,seq,A})=>{i('#ttl',A.P(30));i('#w1,#t1',A.W(30,'有些店'));i('#w2,#t2',A.W(30,'中途退出'));i('#w3,#t3',A.W(30,'重新加入'));
    i('#axis,#sl',A.W(31,'活动开始'));const P1=A.W(31,'活动开始'),P2=A.W(31,'活动停了'),P3=A.W(31,'活动恢复');
    to('#sales',{wipe:[0,.33]},P1,1,'inout');to('#sales',{wipe:[.33,.66]},P2,1,'inout');to('#sales',{wipe:[.66,1]},P3,1.2,'inout');
    seq([['#s1',A.W(30,'也有的店')],['#s2',A.W(31,'这多给了')]]);});
/* 26 术语：移除处理 + 巧合计数 */
scene('remove','none',A=>A.P(32),
  K.term('term',1,300,'移除处理')+
  K.t('g0',1,480,`把活动${P('撤掉')}，再${P('放回来')}`,'lead',{span:9})+
  K.t('g1',1,480,`处理 = 施加的措施<br>这里就是${P('促销活动')}`,'lead',{span:9})+
  K.t('g2',1,480,`别的原因要一起停、一起开<br>${P('巧合越多，越难成立')}`,'lead',{span:9})+
  K.svg([0,1,2].map(k=>K.dot('x'+k,G(2)+k*60,720,14,'pink')).join('')),
  ({pop,seq,A})=>{pop('#term',A.W(32,'移除处理'));seq([['#g0',A.P(32)+.2],['#g1',A.W(32,'这里的')],['#g2',A.W(32,'如果是别的原因')]]);
    pop('#x0',A.W(32,'活动停的时候'));pop('#x1',A.W(32,'活动恢复的时候'));pop('#x2',A.W(32,'次数越多'));});

/* 27 补上缺口 */
scene('gap','schematic',A=>A.P(33),
  K.title('补上第三种比较的缺口')+
  K.svg(K.path('rail',`M${G(3)} 470 L ${G(9)} 470`,'axis')+['开','关','再开'].map((s,k)=>K.dot('o'+k,G(3)+k*3*142,470,16,k===1?'g':'pink')+K.stext('ol'+k,G(3)+k*3*142,540,s,{anchor:'middle',fill:'var(--ink)',size:36})).join(''))+
  K.t('s1',1,660,`就算真有一个<span class="spec">只影响彩票</span>的别的原因`,'body',{span:10,align:'center'})+
  K.t('s2',1,660,`得跟着${P('开、关、再开')}`,'body',{span:10,align:'center'}),
  ({in:i,draw,stagger,seq,A})=>{i('#ttl',A.P(33));draw('#rail',A.W(33,'它也得'),1);stagger(['#o0','#ol0','#o1','#ol1','#o2','#ol2'],A.W(33,'开、关'),.15,{dy:0});
    seq([['#s1',A.W(33,'就算真有')],['#s2',A.W(33,'它也得')]]);});

/* 28a 前提（教学假设）：效果留住 → 不回落 */
const OX=[G(5),G(8)];
const chart=(id)=>K.axes(id,G(1)+60,Y0,SP(10)-60,320,{yl:'彩票销量',xl:'时间'})+`<rect id="${id}z" x="${OX[0]}" y="${Y0+4}" width="${OX[1]-OX[0]}" height="312" fill="var(--g4)"/>`+K.stext(id+'zl',(OX[0]+OX[1])/2,Y0+50,'活动停掉',{anchor:'middle'});
scene('carry','teaching',A=>A.P(34),
  K.title('这一招也有前提')+
  K.svg(chart('c')+K.path('on',`M${G(1)+70} 620 C ${G(3)} 620, ${G(4)} 500, ${OX[0]} 500`,'pink')+K.path('stay',`M${OX[0]} 500 L ${G(11)-30} 500`,'spec'))+
  K.t('s1',1,750,`养成习惯：停了${P('也不回落')}`,'body',{span:10,align:'center'})+
  K.t('s2',1,750,'这时“没回落”，并不说明活动没用','body',{span:10,align:'center'}),
  ({in:i,draw,seq,A})=>{i('#ttl,#c',A.P(34));draw('#on',A.W(34,'活动一撤'),1);i('#cz,#czl',A.W(34,'活动一撤')+.5);draw('#stay',A.W(34,'停掉活动'),1.3);
    seq([['#s1',A.W(34,'假设')],['#s2',A.W(34,'这时候')]]);},'教学假设 · 活动停止，习惯可能持续');

/* 28b 这个案例：跟着开关变化 */
scene('carry2','record',A=>A.W(34,'在这个案例里'),
  K.title('这个案例里：销量跟着开关变')+
  K.svg(chart('d')+K.path('f',`M${G(1)+70} 620 C ${G(3)} 620, ${G(4)} 500, ${OX[0]} 500 C ${OX[0]+90} 500, ${OX[0]+110} 620, ${(OX[0]+OX[1])/2} 620 L ${OX[1]-60} 620 C ${OX[1]+40} 620, ${OX[1]+60} 500, ${G(11)-30} 500`,'pink')),
  ({wipe,A})=>{wipe('#f',A.W(34,'在这个案例里')+.2,2.6);});

/* 29 术语：模式比对 */
scene('pm','none',A=>A.P(35),
  K.term('term',1,300,'模式比对')+
  K.t('g1',1,480,`① 每种解释会留下${P('什么痕迹')}`,'lead',{span:9})+
  K.t('g2',1,480,`② 证据和${P('哪种对得上')}`,'lead',{span:9}),
  ({pop,seq,A})=>{pop('#term',A.W(35,'四'));seq([['#g1',A.W(35,'先想清楚')],['#g2',A.W(35,'再看')]]);});

/* 30 对一下 —— 四个进度节点 + 每行“该看到 / 实际” */
const rows=[['两组原本的差别','活动前就该走得不一样','活动前走势相近'],['原来的趋势','参加组活动前就该在涨','它在跌'],['整家店变旺','别的商品也该涨','它们没涨'],['碰巧的原因','得跟着开、停、再开','这太巧了']];
scene('table','none',A=>A.P(36),
  K.title('我们来对一下')+
  K.svg([0,1,2,3].map(k=>K.node('p'+k,G(4)+k*142,400,k+1,{r:30})+`<g id="px${k}">${K.nodeOn('pq'+k,G(4)+k*142,400,'✕',{r:30})}</g>`).join('')+
    `<g id="ok">${[0,1,2,3].map(k=>K.nodeOn('pk'+k,G(4)+k*142,400,'✓',{r:30})).join('')}</g>`)+
  rows.map((r,k)=>K.t('a'+k,1,500,`如果是${r[0]}：<span class="g1">${r[1]}</span>`,'body',{span:10,align:'center'})+K.t('b'+k,1,590,`实际：${P(r[2])}`,'body',{span:10,align:'center'})).join('')+
  K.t('a4',1,500,`用活动来解释：${P('四样证据都说得通')}`,'lead',{span:10,align:'center'})+K.t('b4',1,590,'换成别的解释，最多只能说通一两样','body g1',{span:10,align:'center'}),
  ({in:i,stagger,seq,to,A})=>{i('#ttl',A.P(36));stagger(['#p0','#p1','#p2','#p3'],A.P(36)+.2,.1,{dy:0});
    const a=['两组店原本的差别','原来的趋势','整家店变旺','碰巧的原因'],c=['走势相近','可它在跌','可它们没涨','这太巧了'];
    a.forEach((w,k)=>to('#px'+k,{opacity:[0,1]},A.WE(36,c[k]),.35,'out'));to('#ok',{opacity:[0,1]},A.W(37,'四样证据'),.5,'out');
    seq([...a.map((w,k)=>['#a'+k,A.W(36,w)]),['#a4',A.W(37,'用活动')]]);seq([...c.map((w,k)=>['#b'+k,A.W(36,w)]),['#b4',A.W(37,'换成别的')]]);});

/* 31 四种比较各追查一种 → 同时过四关 */
const rc=[['配对商店','两组原本的差异'],['连续前后测','原来的趋势'],['其他商品','整家店一起变旺'],['停了再开','是否跟着活动走']];
scene('recap','none',A=>A.P(38),
  K.title('四种比较，各追查一种解释')+
  K.svg(K.path('rail',`M${G(2)+60} 470 L ${G(2)+60+3*378} 470`,'axis')+K.path('gate',`M${G(2)+60} 470 L ${G(2)+60+3*378} 470`,'pink')+
    rc.map(([a],k)=>K.node('f'+k,G(2)+60+k*378,470,k+1,{r:40})+K.nodeOn('fo'+k,G(2)+60+k*378,470,k+1,{r:40})+K.stext('fl'+k,G(2)+60+k*378,560,a,{anchor:'middle',fill:'var(--ink)',size:36})).join(''))+
  rc.map(([a,b],k)=>K.t('c'+k,1,660,`${a}：追查${P(b)}`,'body',{span:10,align:'center'})).join('')+
  K.t('c4',1,660,'每一种单独拿出来，都算不上铁证','body',{span:10,align:'center'})+
  K.t('c5',1,660,`要${P('同时过四关')}，就很难`,'lead',{span:10,align:'center'}),
  ({in:i,to,draw,seq,A})=>{i('#ttl,#rail',A.P(38));[0,1,2,3].forEach(k=>i('#f'+k+',#fl'+k,A.P(38)+.2+k*.1));
    const w=['找相似的店','连续看前后','看别的商品','停了再开'];w.forEach((s,k)=>{to('#fo'+k,{opacity:[0,1]},A.W(38,s),.35);to('#fo'+k,{opacity:[1,0]},k<3?A.W(38,w[k+1]):A.W(39,'每一种'),.35,'inout')});
    draw('#gate',A.W(39,'同时过四关'),1.4);[0,1,2,3].forEach(k=>to('#fo'+k,{opacity:[0,1]},A.W(39,'同时过四关')+k*.35,.3));
    seq([...w.map((s,k)=>['#c'+k,A.W(38,s)]),['#c4',A.W(39,'每一种')],['#c5',A.W(39,'可一个')]]);});

/* 32 能说 / 不能说 */
scene('caution','none',A=>A.P(40),
  K.title('最后要说清楚')+
  K.t('s0',1,380,'老板自己报名这件事，始终没变','lead g1',{span:10})+
  K.t('s1',1,380,`能说：别的解释${P('越来越难成立')}`,'lead',{span:10})+
  K.t('s2',1,520,`不能说：<span class="strike">一切干扰都已经彻底排除了</span>`,'lead g1',{span:10}),
  ({in:i,seq,A})=>{i('#ttl',A.P(40));seq([['#s0',A.W(40,'老板自己报名')],['#s1',A.W(40,'我们能说')]]);i('#s2',A.W(40,'不能说'));});

/* 33 收尾 */
scene('close','none',A=>A.P(41),
  K.t('a',1,330,'结果变好了，还不够。','lead g1',{span:10})+
  K.t('c',1,450,`如果不是它，<br>还有什么能${P('一起解释')}？`,'title',{span:10}).replace('class="t title"','class="t" style="font-size:var(--fs-title);font-weight:700;line-height:1.3;left:262px;top:450px;width:1396px"'),
  ({in:i,A})=>{i('#a',A.W(41,'结果变好了'));i('#c',A.W(41,'如果不是它'));});

const THEME={hook:'u',rule:'u',rise:'i',select:'u',attrib:'c',threat:'c',chain:'i',mistake:'c',four:'u',pair:'u',scale:'u',necg:'c',limits:'u',time:'i',trend:'i',multi:'i',evtime:'i',history:'u',goods:'u',predict:'i',evgoods:'i',nedv:'c',cond:'u',tlimit:'c',removal:'i',remove:'c',gap:'u',carry:'i',carry2:'i',pm:'c',table:'u',recap:'u',caution:'c',close:'u'};S.forEach(s=>{if(!THEME[s.id])throw Error('no theme '+s.id);s.theme=THEME[s.id]});
window.SCENES=S;
})();
