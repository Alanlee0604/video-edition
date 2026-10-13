/* 第01集：乐透促销的四道比较 —— 场景脚本（极简版）
   规则：一屏一个概念；主要元素 ≤3；文字块 ≤2（不计字幕和标注）；新元素出现时旧元素淡出。
   时间全部绑在旁白的词上：W(段落,'词')。不出现任何研究数值，走势只是方向示意。 */
(function(){
const K=window.KIT,G=K.G,SP=K.SPAN;
const S=[];const scene=(id,kind,start,html,build,label)=>S.push({id,kind,start,html,build,label});
const P=s=>`<span class="pink">${s}</span>`;
const Y0=330; // 内容区上沿

/* 01 开场 —— 一条上涨线 + 两个待选解释 */
scene('hook','schematic',A=>0,
  K.title('销量涨了，该算谁的？')+
  K.svg(K.axes('ax',G(1),Y0,SP(5),400,{yl:'彩票销量'})+K.path('up',`M${G(1)+10} 700 C ${G(3)} 690, ${G(4)} 620, ${G(6)-30} 400`,'pink'))+
  K.t('q1',7,420,'促销起了作用？','lead')+K.t('q2',7,540,'老板本来就更卖力？','lead'),
  ({in:i,draw,A})=>{i('#ttl',0.05);i('#ax',.1);draw('#up',A.W(0,'彩票'),1.4);i('#q1',A.W(0,'促销'));i('#q2',A.W(0,'老板'));});

/* 02 规则 —— 两个点（收银员/顾客）+ 一句规则轮换 */
scene('rule','schematic',A=>A.P(1),
  K.title('活动规则')+
  K.svg(K.dot('cash',G(3),520,22,'pink')+K.dot('cust',G(8),520,22,'g')+K.line('lk',[[G(3)+40,520],[G(8)-40,520]],'axis')+
    K.stext('l1',G(3),590,'收银员',{anchor:'middle'})+K.stext('l2',G(8),590,'顾客',{anchor:'middle'}))+
  K.t('r1',2,680,`结账时必须问：${P('“要不要来张彩票？”')}`,'body',{span:8,align:'center'})+
  K.t('r2',2,680,`忘了问，顾客就能${P('免费要一张')}`,'body',{span:8,align:'center'})+
  K.t('r3',2,680,'收银员不敢忘，顾客多一个买的理由','body',{span:8,align:'center'}),
  ({in:i,draw,seq,A})=>{i('#ttl',A.P(1));i('#cash,#l1',A.W(1,'收银员'));draw('#lk',A.W(1,'问顾客'),.8);i('#cust,#l2',A.W(1,'顾客'));
    seq([['#r1',A.W(1,'要不要')],['#r2',A.W(1,'要是')],['#r3',A.W(2,'收银员')]]);});

/* 03 销量上去了 */
scene('rise','schematic',A=>A.W(2,'活动之后'),
  K.title('活动之后，销量确实上去了')+
  K.svg(K.axes('ax',G(2),Y0,SP(8),400,{yl:'彩票销量',xl:'时间'})+K.vline('v',G(6),Y0+10,Y0+400,'活动开始')+
    K.path('pre',`M${G(2)+10} 640 L ${G(6)} 630`,'g')+K.path('post',`M${G(6)} 630 C ${G(7)} 625, ${G(8)} 520, ${G(10)-30} 420`,'pink')),
  ({in:i,draw,A})=>{i('#ttl,#ax,#v',A.W(2,'活动之后'));draw('#pre',A.W(2,'活动之后'),.8);draw('#post',A.W(2,'销量'),1.3);});

/* 04 自愿报名 —— 两组店；文字依次替换 */
const grp=(p,x,tone)=>[0,1,2].map(k=>K.shop(p+k,x+k*150,400,120,{tone})).join('');
scene('select','schematic',A=>A.P(3),
  K.title('参加的店，是老板自己报名的')+
  K.svg(grp('a',G(1)+40,'pink')+grp('b',G(7)+40,'g')+K.stext('la',G(1)+40,570,'报名参加',{fill:'var(--pink)'})+K.stext('lb',G(7)+40,570,'没报名'))+
  K.t('s1',1,680,`老板：${P('更上心 · 更愿意折腾 · 更会卖东西')}`,'body',{span:10})+
  K.t('s2',1,680,`就算不搞活动，生意也可能<span class="spec">本来就更好，或本来就在变好</span>`,'body',{span:10}),
  ({in:i,stagger,seq,A})=>{i('#ttl',A.P(3));stagger(['#a0','#a1','#a2','#la'],A.W(3,'参加活动'),.1);stagger(['#b0','#b1','#b2','#lb'],A.W(3,'参加活动')+.5,.1);
    seq([['#s1',A.W(4,'更上心')],['#s2',A.W(4,'就算不搞')]]);});

/* 05 分不开 —— 一根条 + 一条游移的虚线 */
scene('attrib','schematic',A=>A.P(5),
  K.title('多卖的部分，怎么分？')+
  K.svg(`<rect id="bar" x="${G(1)}" y="420" width="${SP(10)}" height="110" rx="12" fill="none" stroke="var(--g1)" stroke-width="2.5"/>`+
    K.path('cut',`M${G(6)-12} 400 L ${G(6)-12} 550`,'spec')+
    K.stext('la',G(1)+30,488,'活动的功劳？',{fill:'var(--pink)',size:40})+K.stext('lb',G(11)-30,488,'老板的功劳？',{anchor:'end',size:40}))+
  K.t('only',1,640,`光看“参加的店销量涨了”，${P('分不出来')}`,'body',{span:10}),
  ({in:i,draw,to,A})=>{i('#ttl',A.P(5));draw('#bar',A.W(5,'参加活动'),1);i('#la',A.W(5,'活动的功劳'));i('#lb',A.W(5,'老板本人'));
    draw('#cut',A.W(5,'老板本人')+.3,.5);to('#cut',{x:[0,-220]},A.W(5,'光看'),1.6,'inout');to('#cut',{x:[-220,180]},A.W(5,'光看')+1.6,1.8,'inout');i('#only',A.W(5,'光看'));});

/* 06 关键帧① 选择威胁 —— 术语 + 白话 + 一个几何示意（两组在起点前就分开） */
scene('threat','none',A=>A.P(6),
  K.term('term',1,300,'选择威胁')+
  K.t('g',1,470,`两组之所以不一样，<br>可能在${P('活动开始之前')}就已经定下了。`,'lead',{span:6})+
  K.svg(K.vline('v',G(10),360,700,'活动开始')+K.path('l1',`M${G(8)} 470 L ${G(11)+60} 470`,'pink')+K.path('l2',`M${G(8)} 600 L ${G(11)+60} 600`,'g')+
    K.dot('d1',G(8),470,10,'pink')+K.dot('d2',G(8),600,10,'g')),
  ({in:i,pop,draw,A})=>{pop('#term',A.W(6,'选择威胁'));i('#g',A.W(6,'两组'));i('#v',A.W(6,'两组'));
    i('#d1,#d2',A.W(6,'可能在'));draw('#l1',A.W(6,'活动开始之前'),1);draw('#l2',A.W(6,'活动开始之前')+.15,1);});

/* 07 推理链 —— 四个编号节点 + 当前一步的文字 */
const chainT=['想知道效果，就得拿参加的店和没参加的店比','两组怎么分的？老板自己选的','选不选，和老板是什么样的人有关','老板是什么样的人，本身就影响销量'];
const NX=k=>G(2)+k*SP(2)+k*24+SP(1)/2+60;
scene('chain','none',A=>A.P(7),
  K.title('“选择威胁”是怎么推出来的')+
  K.svg(K.path('rail',`M${NX(0)} 470 L ${NX(3)} 470`,'axis')+[0,1,2,3].map(k=>K.node('n'+k,NX(k),470,k+1)+K.nodeOn('m'+k,NX(k),470,k+1)).join(''))+
  chainT.map((s,k)=>K.t('c'+k,1,610,s,'lead',{span:10,align:'center'})).join('')+
  K.t('res',1,610,`两组的差别里，混进了${P('“老板本来就不一样”')}`,'lead',{span:10,align:'center'}),
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
  K.t('s2',1,600,`其中一部分，也许只是${P('老板本来就多卖的')}`,'lead',{span:10}),
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

/* 10 第一种：找搭档 —— 两个店符号 + 当前条件 + 三个勾点 */
const crit=['同一个连锁品牌','开在同一个区域','活动前，彩票份额差不多'];
scene('pair','schematic',A=>A.P(10),
  K.title('第一种：给参加的店找搭档')+
  K.svg(K.shop('t',G(3),380,180,{tone:'pink'})+K.shop('slot',G(7),380,180,{dashed:true})+K.shop('m',G(7),380,180,{tone:'g'})+
    K.stext('tl',G(3)+90,610,'参加的店',{anchor:'middle',fill:'var(--pink)'})+K.stext('ml',G(7)+90,610,'对照店',{anchor:'middle'})+
    [0,1,2].map(k=>K.dot('k'+k,G(5)+30+k*50,470,9,'pink')+K.ring('kr'+k,G(5)+30+k*50,470,9,'g')).join(''))+
  crit.map((s,k)=>K.t('c'+k,1,690,s,'lead',{span:10,align:'center'})).join(''),
  ({in:i,pop,out,seq,A})=>{i('#ttl',A.P(10));i('#t,#tl',A.P(10)+.2);i('#slot',A.W(10,'找搭档'));i('#kr0,#kr1,#kr2',A.W(11,'找什么样'));
    const w=['同一个连锁品牌','同一个区域','份额差不多'];w.forEach((s,k)=>pop('#k'+k,A.WE(11,s)));
    seq(w.map((s,k)=>['#c'+k,A.W(11,s)]));i('#m,#ml',A.WE(11,'差不多')+.2);out('#slot',A.WE(11,'差不多')+.2);});

/* 11 打个比方：大店 vs 小店 → 变成一样大 */
scene('scale','teaching',A=>A.P(12),
  K.title('为什么要找差不多的店')+
  K.svg(K.shop('big',G(2),360,260,{n:6})+K.shop('small',G(8),460,120,{n:2}))+
  K.t('s1',1,690,`大店卖得多，${P('跟活动没什么关系')}`,'lead',{span:10,align:'center'})+
  K.t('s2',1,690,`两家原本差不多，后来的差别${P('才更可能和活动有关')}`,'lead',{span:10,align:'center'}),
  ({in:i,to,seq,A})=>{i('#ttl',A.P(12));i('#big',A.W(12,'大店'));i('#small',A.W(12,'小店'));
    to('#big',{scale:[1,.62]},A.W(12,'只有两家'),1,'inout');to('#small',{scale:[1,1.33],y:[0,-20]},A.W(12,'只有两家'),1,'inout');
    seq([['#s1',A.W(12,'大店卖得多')],['#s2',A.W(12,'只有两家')]]);},'打个比方');

/* 12 术语：非同等比较组 */
scene('necg','none',A=>A.P(13),
  K.term('term',1,300,'非同等比较组')+
  K.t('g1',1,480,`对照的那一组，是${P('人挑出来的')}，<br>不是随机分出来的。`,'lead',{span:9})+
  K.t('g2',1,480,`可以挑得很像，<br>但${P('不保证一样')}。`,'lead',{span:9}),
  ({pop,seq,A})=>{pop('#term',A.W(13,'非同等比较组'));seq([['#g1',A.W(13,'白话说')],['#g2',A.W(13,'提醒你')]]);});

/* 13 配对管得住什么 —— 两个一模一样的店 + 中间一个问号 */
scene('limits','schematic',A=>A.P(14),
  K.title('配对管得住什么？')+
  K.svg(K.shop('a',G(3),380,180,{tone:'pink'})+K.shop('b',G(7),380,180)+K.stext('qm',G(5)+SP(2)/2,500,'？',{anchor:'middle',fill:'var(--pink)',size:96,weight:700}))+
  K.t('s1',1,660,`看得见的差别：品牌、区域、份额 —— ${P('管得住')}`,'body',{span:10,align:'center'})+
  K.t('s2',1,660,`看不见的差别：老板的干劲 —— <span class="g1">管不住</span>`,'body',{span:10,align:'center'})+
  K.t('s3',1,660,'这个问号还留着，研究还得往下做','body',{span:10,align:'center'}),
  ({in:i,pop,seq,A})=>{i('#ttl',A.P(14));i('#a,#b',A.P(14)+.2);seq([['#s1',A.W(14,'看得见')],['#s2',A.W(14,'管不住')],['#s3',A.W(14,'这个问号')]]);pop('#qm',A.W(14,'老板的干劲'));},'示意图 · 匹配关系');

/* 14 第二种：把时间拉长 */
const tx=k=>G(2)+40+k*142;
scene('time','schematic',A=>A.P(15),
  K.title('第二种：把时间拉长')+
  K.svg(K.path('axis',`M${G(2)} 500 L ${G(11)-24} 500`,'axis')+K.vline('v',G(6)+60,380,500,'')+K.stext('vl',G(6)+60,370,'活动开始',{anchor:'middle'})+
    [0,1,2,3].map(k=>K.dot('b'+k,tx(k),500,11,'ink')).join('')+[0,1,2,3].map(k=>K.dot('a'+k,tx(k)+4*142+40,500,11,'pink')).join('')+
    K.stext('wb',tx(0),570,'活动前 4 周')+K.stext('wa',tx(4)+40,570,'活动后 4 周',{fill:'var(--pink)'}))+
  K.t('s1',1,680,`看的是前后各四周，${P('不是只看前一天和后一天')}`,'body',{span:10,align:'center'}),
  ({in:i,stagger,A})=>{i('#ttl,#axis,#v,#vl',A.P(15));stagger(['#b0','#b1','#b2','#b3','#wb'],A.W(15,'前后各四周'),.1,{dy:0});stagger(['#a0','#a1','#a2','#a3','#wa'],A.W(15,'四周'),.1,{dy:0});i('#s1',A.W(15,'而不是'));},'示意图 · 测量窗口');

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
  K.t('s3',1,750,`书里叫${P('“多次前后测”')}：活动前后都多测几次`,'body',{span:10,align:'center'}),
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
  K.t('s2',1,750,`第二：变化只在${P('活动开始时、参加的店')}`,'body',{span:10,align:'center'}),
  ({in:i,draw,seq,A})=>{i('#ttl,#ax,#v',A.P(18));draw('#tp',A.W(18,'两组店'),1);draw('#cp',A.W(18,'两组店')+.15,1);
    draw('#ta',A.W(18,'参加组转头'),1);i('#tl',A.W(18,'往上'));draw('#ca',A.W(18,'对照组'),1);i('#cl',A.W(18,'还在往下'));
    seq([['#s1',A.W(19,'第一')],['#s2',A.W(19,'第二')]]);});

/* 18 还剩什么疑问：两个原因，同一个时间点 */
scene('history','teaching',A=>A.P(20),
  K.title('还剩什么疑问？')+
  K.svg(K.path('axis',`M${G(2)} 600 L ${G(11)-24} 600`,'axis')+K.vline('v',G(6)+60,420,600,'')+
    K.arrow('a1',G(4),420,G(6)+50,590,'pink')+K.arrow('a2',G(9),420,G(6)+70,590,'spec')+
    K.stext('l1',G(4)-10,400,'活动',{anchor:'end',fill:'var(--pink)',size:36})+K.stext('l2',G(9)+10,400,'周围别的事？',{size:36}))+
  K.t('s1',1,690,'整家店都旺了起来——时间点也能对上','body',{span:10,align:'center'})+
  K.t('s2',1,690,`这就要靠${P('第三种比较')}`,'body',{span:10,align:'center'}),
  ({in:i,draw,seq,A})=>{i('#ttl,#axis,#v',A.P(20));draw('#a1',A.P(20)+.4,.8);i('#l1',A.P(20)+.4);i('#l2',A.W(20,'别的事'));draw('#a2',A.W(20,'别的事'),.8);
    seq([['#s1',A.W(20,'整家店')],['#s2',A.W(20,'第三种比较')]]);},'教学假设 · 未知原因不是已发现的事实');

/* 19 第三种：查别的商品 */
const goods=['彩票','汽油','香烟','食品'];
scene('goods','schematic',A=>A.P(21),
  K.title('第三种：查别的商品')+
  goods.map((g,k)=>K.t('g'+k,2+k*2,430,g,`lead ${k?'g1':'pink bb'}`,{span:2,align:'center'})).join('')+
  K.t('q',1,620,'研究的是彩票，查别的商品干什么？','lead',{span:10,align:'center'}),
  ({in:i,A})=>{i('#ttl',A.P(21));i('#g0',A.P(21)+.2);i('#g1',A.W(21,'汽油'));i('#g2',A.W(21,'香烟'));i('#g3',A.W(21,'食品'));i('#q',A.W(22,'研究的是彩票'));});

/* 20 两种解释，两种预测（虚线 = 预测） */
const bx=(o,k)=>o+k*90;
const preds=(id,o,ups)=>goods.map((g,k)=>K.bar(id+k,bx(o,k),ups[k]?440:560,56,ups[k]?200:80,{dashed:true})+K.stext(id+'l'+k,bx(o,k)+28,680,g,{anchor:'middle'})).join('');
scene('predict','teaching',A=>A.P(23),
  K.title('两种解释，推出两种结果')+
  K.svg(preds('A',G(2),[1,1,1,1])+preds('B',G(7),[1,0,0,0])+K.stext('hA',G(2),400,'整家店变旺',{fill:'var(--ink)',size:36})+K.stext('hB',G(7),400,'活动起作用',{fill:'var(--pink)',size:36}))+
  K.t('s1',1,740,'进店的人多了：彩票、汽油、香烟、食品都会多','body',{span:10,align:'center'})+
  K.t('s2',1,740,'收银员只问彩票，送的也只是彩票','body',{span:10,align:'center'})+
  K.t('s3',1,740,`查别的商品，就是看${P('哪一种说法对得上')}`,'body',{span:10,align:'center'}),
  ({in:i,to,seq,A})=>{i('#ttl',A.P(23));i('#hA',A.W(23,'整家店旺起来'));goods.forEach((g,k)=>{i('#Al'+k,A.W(23,'整家店旺起来')+.1*k);to('#A'+k,{opacity:[0,1],sy:[.05,1]},A.W(23,'进店的人多了')+k*.12,.6,'out')});
    i('#hB',A.W(24,'活动就不一样'));goods.forEach((g,k)=>{i('#Bl'+k,A.W(24,'活动就不一样')+.1*k);to('#B'+k,{opacity:[0,1],sy:[.05,1]},(k?A.W(24,'别的商品'):A.W(24,'只有彩票涨'))+k*.1,.6,'out')});
    seq([['#s1',A.W(23,'进店的人多了')],['#s2',A.W(24,'收银员')],['#s3',A.W(25,'所以')]]);},'教学假设 · 两种解释的预测');

/* 21 书中结果：只有彩票涨 */
scene('evgoods','record',A=>A.P(26),
  K.title('结果：只有彩票涨了')+
  K.svg(goods.map((g,k)=>K.bar('r'+k,G(3)+k*200,k?560:420,90,k?80:220,{tone:k?'g':'pink'})+K.stext('rl'+k,G(3)+k*200+45,690,g,{anchor:'middle',fill:k?'var(--g1)':'var(--pink)'})).join(''))+
  K.t('s1',1,750,'汽油、香烟和食品没有相应增加','body',{span:10,align:'center'})+
  K.t('s2',1,750,`更符合${P('活动在起作用')}`,'body',{span:10,align:'center'}),
  ({in:i,to,seq,A})=>{i('#ttl',A.P(26));goods.forEach((g,k)=>i('#rl'+k,A.P(26)+k*.08));to('#r0',{sy:[.05,1]},A.W(26,'彩票涨了'),.7,'back');
    [1,2,3].forEach(k=>to('#r'+k,{sy:[.05,1]},A.W(26,'汽油')+k*.12,.5,'out'));seq([['#s1',A.W(26,'没有相应')],['#s2',A.W(26,'更符合')]]);});

/* 22 关键帧③ 非同等依变项 —— 术语 + 白话 + 两根细柱（彩票 / 对照结果） */
scene('nedv','none',A=>A.P(27),
  K.term('term',1,300,'非同等依变项')+
  K.t('g1',1,480,`“依变项”就是研究里要看的${P('结果')}，<br>比如销量。`,'lead',{span:6})+
  K.t('g2',1,480,`找一个结果：${P('活动影响不到它')}，<br>共同原因却会让它跟着变。`,'lead',{span:6})+
  K.svg(K.bar('x1',G(8)+20,420,72,240,{tone:'pink'})+K.bar('x2',G(10)-20,580,72,80,{tone:'g'})+
    K.path('base',`M${G(8)-20} 662 L ${G(11)+30} 662`,'axis')+K.stext('xl1',G(8)+56,710,'彩票',{anchor:'middle',fill:'var(--pink)'})+K.stext('xl2',G(10)+16,710,'对照结果',{anchor:'middle'})),
  ({pop,seq,in:i,to,A})=>{pop('#term',A.W(27,'非同等依变项'));seq([['#g1',A.W(27,'依变项”就是')],['#g2',A.W(27,'意思很直白')]]);
    i('#base,#xl1,#xl2',A.W(27,'依变项”就是'));to('#x1',{sy:[.05,1]},A.W(27,'比如销量'),.7,'out');to('#x2',{sy:[.05,1]},A.W(27,'找一个结果'),.7,'out');});

/* 23 两个条件 —— 两个节点；反例 */
scene('cond','teaching',A=>A.P(28),
  K.title('两个条件，缺一不可')+
  K.svg(K.node('c1',G(4),470,'1',{r:44})+K.nodeOn('c1on',G(4),470,'1',{r:44})+K.node('c2',G(8),470,'2',{r:44})+K.nodeOn('c2on',G(8),470,'2',{r:44})+
    K.stext('l1',G(4),560,'活动不直接影响它',{anchor:'middle',fill:'var(--ink)',size:32})+K.stext('l2',G(8),560,'共同原因会影响它',{anchor:'middle',fill:'var(--ink)',size:32}))+
  K.t('s1',1,680,'缺一个都不行','lead',{span:10,align:'center'})+
  K.t('s2',1,680,`反例：同一条街上银行的存款——${P('它动不动，什么都说明不了')}`,'body',{span:10,align:'center'}),
  ({in:i,to,seq,A})=>{i('#ttl',A.P(28));i('#c1,#l1',A.W(28,'第一'));to('#c1on',{opacity:[0,1]},A.W(28,'第一'),.35);i('#c2,#l2',A.W(28,'第二'));to('#c2on',{opacity:[0,1]},A.W(28,'第二'),.35);
    to('#c2on',{opacity:[1,0]},A.W(28,'客流变化'),.4,'inout');seq([['#s1',A.W(28,'缺一个')],['#s2',A.W(28,'银行')]]);},'打个比方');

/* 24 第三种的局限 */
scene('tlimit','teaching',A=>A.P(29),
  K.title('第三种比较也有局限')+
  K.t('s1',1,400,`能排除：同时影响${P('多种商品')}的原因`,'lead',{span:10})+
  K.t('s2',1,520,`发现不了：只让这几家店<span class="spec">多卖彩票</span>的原因`,'lead',{span:10})+
  K.svg(K.arrow('ar',G(1),700,G(3),700,'pink')+K.stext('nx',G(3)+30,710,'这要靠第四种比较',{fill:'var(--pink)',size:36})),
  ({in:i,draw,dim,A})=>{i('#ttl',A.P(29));i('#s1',A.W(29,'能排除'));dim('#s1',A.W(29,'假设'),.35);i('#s2',A.W(29,'假设'));draw('#ar',A.W(29,'第四种比较'),.5);i('#nx',A.W(29,'第四种比较'));},'教学假设 · 未知原因不是已发现的事实');

/* 25 第四种：开 / 停 / 再开 —— 一条开关带 + 销量线 */
const SX=[G(1),G(4)+40,G(7)+40,G(11)-24];
scene('removal','record',A=>A.P(30),
  K.title('第四种：活动停了再开')+
  K.svg(`<rect id="on1" x="${SX[0]}" y="380" width="${SX[1]-SX[0]-8}" height="12" rx="6" fill="var(--pink)"/>`+`<rect id="off" x="${SX[1]}" y="380" width="${SX[2]-SX[1]-8}" height="12" rx="6" fill="var(--g3)"/>`+`<rect id="on2" x="${SX[2]}" y="380" width="${SX[3]-SX[2]}" height="12" rx="6" fill="var(--pink)"/>`+
    K.stext('t1',SX[0],360,'参加',{fill:'var(--pink)'})+K.stext('t2',SX[1],360,'中途退出')+K.stext('t3',SX[2],360,'重新加入',{fill:'var(--pink)'})+
    K.path('axis',`M${SX[0]} 660 L ${SX[3]} 660`,'axis')+
    K.path('sales',`M${SX[0]} 640 C ${SX[0]+200} 640, ${SX[1]-200} 520, ${SX[1]} 520 C ${SX[1]+150} 520, ${SX[1]+150} 640, ${SX[2]} 640 C ${SX[2]+150} 640, ${SX[2]+150} 520, ${SX[3]} 520`,'pink')+
    K.stext('sl',SX[0],500,'彩票销量（方向）'))+
  K.t('s1',1,720,'也有的店，比较晚才开始','body',{span:10,align:'center'})+
  K.t('s2',1,720,`活动开、停、再开，销量${P('跟着变化')}`,'body',{span:10,align:'center'}),
  ({in:i,wipe,to,seq,A})=>{i('#ttl',A.P(30));wipe('#on1',A.W(30,'有些店'),.5);i('#t1',A.W(30,'有些店'));wipe('#off',A.W(30,'中途退出'),.5);i('#t2',A.W(30,'中途退出'));wipe('#on2',A.W(30,'重新加入'),.5);i('#t3',A.W(30,'重新加入'));
    i('#axis,#sl',A.W(31,'活动开始'));const P1=A.W(31,'活动开始'),P2=A.W(31,'活动停了'),P3=A.W(31,'活动恢复');
    to('#sales',{wipe:[0,.33]},P1,1,'inout');to('#sales',{wipe:[.33,.66]},P2,1,'inout');to('#sales',{wipe:[.66,1]},P3,1.2,'inout');
    seq([['#s1',A.W(30,'也有的店')],['#s2',A.W(31,'这多给了')]]);});

/* 26 术语：移除处理 + 巧合计数 */
scene('remove','none',A=>A.P(32),
  K.term('term',1,300,'移除处理')+
  K.t('g0',1,480,`把活动${P('撤掉')}，再${P('放回来')}`,'lead',{span:9})+
  K.t('g1',1,480,`“处理”就是研究里施加的那项措施，<br>这里就是${P('促销活动')}。`,'lead',{span:9})+
  K.t('g2',1,480,`别的原因要恰好跟着活动一起停、一起开——<br>${P('巧合越多，越难成立')}。`,'lead',{span:9})+
  K.svg([0,1,2].map(k=>K.dot('x'+k,G(2)+k*60,720,14,'pink')).join('')),
  ({pop,seq,A})=>{pop('#term',A.W(32,'移除处理'));seq([['#g0',A.P(32)+.2],['#g1',A.W(32,'这里的')],['#g2',A.W(32,'如果是别的原因')]]);
    pop('#x0',A.W(32,'活动停的时候'));pop('#x1',A.W(32,'活动恢复的时候'));pop('#x2',A.W(32,'次数越多'));});

/* 27 补上缺口 */
scene('gap','schematic',A=>A.P(33),
  K.title('补上第三种比较的缺口')+
  K.svg(K.path('rail',`M${G(3)} 470 L ${G(9)} 470`,'axis')+['开','关','再开'].map((s,k)=>K.dot('o'+k,G(3)+k*3*142,470,16,k===1?'g':'pink')+K.stext('ol'+k,G(3)+k*3*142,540,s,{anchor:'middle',fill:'var(--ink)',size:36})).join(''))+
  K.t('s1',1,660,`就算真有一个<span class="spec">只影响彩票</span>的别的原因`,'body',{span:10,align:'center'})+
  K.t('s2',1,660,`它也得跟着开、关、再开，${P('才解释得了')}`,'body',{span:10,align:'center'}),
  ({in:i,draw,stagger,seq,A})=>{i('#ttl',A.P(33));draw('#rail',A.W(33,'它也得'),1);stagger(['#o0','#ol0','#o1','#ol1','#o2','#ol2'],A.W(33,'开、关'),.15,{dy:0});
    seq([['#s1',A.W(33,'就算真有')],['#s2',A.W(33,'它也得')]]);});

/* 28a 前提（教学假设）：效果留住 → 不回落 */
const OX=[G(5),G(8)];
const chart=(id)=>K.axes(id,G(1)+60,Y0,SP(10)-60,320,{yl:'彩票销量',xl:'时间'})+`<rect id="${id}z" x="${OX[0]}" y="${Y0+4}" width="${OX[1]-OX[0]}" height="312" fill="var(--g4)"/>`+K.stext(id+'zl',(OX[0]+OX[1])/2,Y0+50,'活动停掉',{anchor:'middle'});
scene('carry','teaching',A=>A.P(34),
  K.title('这一招也有前提')+
  K.svg(chart('c')+K.path('on',`M${G(1)+70} 620 C ${G(3)} 620, ${G(4)} 500, ${OX[0]} 500`,'pink')+K.path('stay',`M${OX[0]} 500 L ${G(11)-30} 500`,'spec'))+
  K.t('s1',1,750,`假设顾客已经养成习惯，停了也${P('不回落')}`,'body',{span:10,align:'center'})+
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
  K.t('g1',1,480,`① 先想清楚：每一种解释，<br>会留下${P('什么样的痕迹')}`,'lead',{span:9})+
  K.t('g2',1,480,`② 再看实际的证据，<br>跟哪一种${P('对得上')}`,'lead',{span:9}),
  ({pop,seq,A})=>{pop('#term',A.W(35,'模式比对'));seq([['#g1',A.W(35,'先想清楚')],['#g2',A.W(35,'再看')]]);});

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
  K.t('c5',1,660,`一个别的解释要${P('同时过四关')}，就很难了`,'lead',{span:10,align:'center'}),
  ({in:i,to,draw,seq,A})=>{i('#ttl,#rail',A.P(38));[0,1,2,3].forEach(k=>i('#f'+k+',#fl'+k,A.P(38)+.2+k*.1));
    const w=['找相似的店','连续看前后','看别的商品','停了再开'];w.forEach((s,k)=>{to('#fo'+k,{opacity:[0,1]},A.W(38,s),.35);to('#fo'+k,{opacity:[1,0]},k<3?A.W(38,w[k+1]):A.W(39,'每一种'),.35,'inout')});
    draw('#gate',A.W(39,'同时过四关'),1.4);[0,1,2,3].forEach(k=>to('#fo'+k,{opacity:[0,1]},A.W(39,'同时过四关')+k*.35,.3));
    seq([...w.map((s,k)=>['#c'+k,A.W(38,s)]),['#c4',A.W(39,'每一种')],['#c5',A.W(39,'可一个')]]);});

/* 32 能说 / 不能说 */
scene('caution','none',A=>A.P(40),
  K.title('最后要说清楚')+
  K.t('s0',1,380,'老板自己报名这件事，始终没变','lead g1',{span:10})+
  K.t('s1',1,380,`能说：很多有道理的别的解释，${P('越来越难成立')}`,'lead',{span:10})+
  K.t('s2',1,520,`不能说：<span class="strike">一切干扰都已经彻底排除了</span>`,'lead g1',{span:10}),
  ({in:i,seq,A})=>{i('#ttl',A.P(40));seq([['#s0',A.W(40,'老板自己报名')],['#s1',A.W(40,'我们能说')]]);i('#s2',A.W(40,'不能说'));});

/* 33 收尾 */
scene('close','none',A=>A.P(41),
  K.t('a',1,330,'结果变好了，还不够。','lead g1',{span:10})+
  K.t('c',1,450,`如果不是它，<br>还有什么能把这些现象${P('一起解释清楚')}？`,'title',{span:10}).replace('class="t title"','class="t" style="font-size:var(--fs-title);font-weight:700;line-height:1.3;left:262px;top:450px;width:1396px"'),
  ({in:i,A})=>{i('#a',A.W(41,'结果变好了'));i('#c',A.W(41,'如果不是它'));});

window.SCENES=S;
})();
