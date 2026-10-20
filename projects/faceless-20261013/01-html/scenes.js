/* 第01集 v4：纯视觉表意 + 视觉对齐系统。
   网格：12 栏（G(c)=120+142c），主体统一落在 G(1)=262 … 1658（宽 1396，占安全区 81%），水平中心 960；纵向 8px 基线，地平线 GND=840。
   分组：四等分 C4（卡宽 328、间距 28）、三等分 C3（448/26）、二等分 C2（686/24）。圆角两档 R1=16 / R2=32，另有胶囊。
   定位：K.ib/K.ic 按图形真实外接框定位（底边/中心），人物 K.fb 以脚底落地；同组元素打 data-g / data-a 标签供 align_check。 */
(function(){
const K=window.KIT,G=K.G;
const S=[];const scene=(id,kind,start,html,build,label)=>S.push({id,kind,start,html,build,label});
const M=K.mark,Q=K.qmark,AR=K.farrow,svg=K.svg,ib=K.ib,ic=K.ic,fb=K.fb,box=K.box,tag=K.tag,fit=K.fit;
const X0=262,X1=1658,W=1396,GND=840,PAD=32,R1=16,R2=32;
const C4=[0,1,2,3].map(k=>X0+k*356),C4c=C4.map(x=>x+164),C3=[0,1,2].map(k=>X0+k*474),C3c=C3.map(x=>x+224),C2=[X0,X0+710],C2c=C2.map(x=>x+343);
const L=(id,x,y,s,c='var(--ink)',size=48,m={})=>tag(K.stext(id,x,y,s,{anchor:'middle',fill:c,size,weight:700}),m);
const FOC='var(--pink)',NEU='var(--g2)';
const BOSS={shirt:'var(--CO)',shirtD:'var(--COD)',armL:-14,armR:14},PLAIN={shirt:'var(--g2)',shirtD:'var(--g1)'};
/* 统一坐标图：图框左边 346、底边 840；带图例时右边 1380，图例栏中心 1539；无图例时右边 1658。y 轴顶端彩票图形在框左外侧。 */
const CF=(legend,top=216)=>({x:346,y:top,w:(legend?1380:1658)-346,h:GND-top});
const chart=(id,c,{icon=true}={})=>`<g id="${id}"><rect x="${c.x-4}" y="${c.y}" width="8" height="${c.h}" rx="4" fill="var(--g2)"/><rect x="${c.x-4}" y="${c.y+c.h-4}" width="${c.w+4}" height="8" rx="4" fill="var(--g2)"/></g>`+(icon?ic(id+'i','ticket',280,c.y+24,48,'var(--g1)'):'');
const pt=(c,u,v)=>`${Math.round(c.x+u*c.w)} ${Math.round(c.y+c.h-v*c.h)}`;
const LEG=1539;
const start=(id,c,u)=>{const x=Math.round(c.x+u*c.w);return `<g id="${id}"><path d="M${x} ${c.y+8} L${x} ${c.y+c.h-8}" stroke="var(--g1)" stroke-width="6" stroke-dasharray="16 16" fill="none"/>${ic(id+'i','promo',x,c.y-8,64,FOC)}</g>`};

/* 01 开场 */
{const c=CF(true);
scene('hook','schematic',A=>0,
  svg(chart('ax',c)+K.path('up',`M${pt(c,0,.06)} C ${pt(c,.35,.08)}, ${pt(c,.62,.3)}, ${pt(c,.96,.9)}`,'pink')+
    ic('pr','promo',LEG,312,176,FOC,{g:'leg',a:'cx'})+fb('bs',LEG,GND,400,BOSS,{g:'leg',a:'cx'})+Q('q',1200,456,128,'var(--ink)')),
  ({in:i,draw,pop,A})=>{i('#ax,#axi',.05);draw('#up',A.W(0,'彩票'),1.4);pop('#pr',A.W(0,'促销'));pop('#bs',A.W(0,'老板'));pop('#q',A.W(0,'更卖力'));});}

/* 02 规则：柜台（容器）承载收银机和彩票；收银员在柜台后；顾客脚落地 */
scene('rule','schematic',A=>A.P(1),
  svg(fb('cash',760,712,392,{shirt:'var(--UP)',shirtD:'#8A8AF0',apron:'var(--SU)',armR:-72,armL:6,legs:false})+
    `<g id="ctr" data-g="ground" data-a="bottom"><rect x="${X0}" y="640" width="984" height="40" rx="${R1}" fill="var(--CRS)"/><rect x="${X0+PAD}" y="680" width="${984-2*PAD}" height="160" fill="var(--CR)"/></g>`+
    ib('reg','register',X0+PAD+96,640,160,'var(--CO)',{})+ib('tk','ticket',1104,640,88,'var(--SU)',{})+
    fb('cust',1470,GND,448,{shirt:'var(--CR)',shirtD:'var(--CRD)',hair:'var(--INK)',hairStyle:1,armL:58,armR:4},{g:'ground',a:'bottom'})+
    K.bubble('bub',880,176,448,136,780,360)+tag(K.stext('bt',1104,262,'来张彩票？',{anchor:'middle',fill:'var(--INK)',size:52,weight:700}),{in:'bub'})+
    M('no',1328,176,104,false)+L('free',1290,488,'免费','var(--SU)',56)),
  ({in:i,pop,move,A})=>{i('#reg',A.P(1)+.1,{word:'收银'});i('#ctr',A.P(1)+.15,{word:'结账'});i('#cash',A.W(1,'收银员'),{word:'收银员'});i('#cust',A.W(1,'顾客'),{word:'顾客'});
    pop('#bub,#bt',A.W(1,'要不要'));pop('#tk',A.W(1,'彩票'));pop('#no',A.W(1,'忘了问'));move('#tk',A.W(1,'免费'),[0,0],[186,-24],.9);pop('#free',A.W(1,'免费')+.6);});

/* 03 销量上去了 */
{const c=CF(false);
scene('rise','schematic',A=>A.W(2,'活动之后'),
  svg(chart('ax',c)+start('v',c,.5)+K.path('pre',`M${pt(c,0,.15)} L ${pt(c,.5,.16)}`,'g')+K.path('post',`M${pt(c,.5,.16)} C ${pt(c,.66,.17)}, ${pt(c,.8,.45)}, ${pt(c,.98,.85)}`,'pink')),
  ({in:i,draw,A})=>{i('#ax,#axi,#v',A.W(2,'活动之后'));draw('#pre',A.W(2,'活动之后'),.8);draw('#post',A.W(2,'销量'),1.3);});}

/* 04 自愿报名：老板 | 报名店 | 没报名店，三等分、同一地平线 */
{const sh=fit('store',448,360);
scene('select','schematic',A=>A.P(3),
  svg(fb('bs',X0+88,GND,440,BOSS,{g:'ground',a:'bottom'})+ic('cb','clipboard-pen',X0+88+136,600,136,FOC)+
    ib('a','store',C3c[1],GND,sh,FOC,{g:'ground',a:'bottom'})+ib('b','store',C3c[2],GND,sh,NEU,{g:'ground',a:'bottom'})+
    L('la',C3c[1],GND-sh-32,'报名',FOC,48,{g:'lab',a:'bottom'})+L('lb',C3c[2],GND-sh-32,'没报名','var(--g1)',48,{g:'lab',a:'bottom'})+
    AR('up',C3c[1],GND-sh-104,C3c[1],GND-sh-264,'var(--MI)',18)),
  ({in:i,pop,A})=>{i('#a,#la',A.W(3,'参加活动'));i('#b,#lb',A.W(3,'参加活动')+.4);i('#bs',A.W(3,'老板'));pop('#cb',A.W(3,'报名'));pop('#up',A.W(4,'就算不搞'));});}

/* 05/08 柱子：两根柱同底同宽（四等分前两格），右两格放“活动 / 老板” */
const bars=(h0,h1,ex)=>tag(K.bar('b0',C4[0],GND-h0,328,h0),{g:'bars',a:'bottom'})+tag(K.bar('b1',C4[1],GND-h1,328,h1),{g:'bars',a:'bottom'})+`<rect id="ex" x="${C4[1]}" y="${GND-h1}" width="328" height="${ex}" rx="8" fill="var(--pink)"/>`;
const pbs=()=>ib('pr','promo',C4c[2],GND,fit('promo',328,280),FOC,{g:'ground',a:'bottom'})+fb('bs',C4c[3],GND,440,BOSS,{g:'ground',a:'bottom'});
scene('attrib','schematic',A=>A.P(5),
  svg(bars(280,616,336)+`<g id="cut"><rect x="${C4[1]-16}" y="392" width="360" height="16" rx="8" fill="var(--INK)"/></g>`+pbs()+Q('q',(C4c[2]+C4c[3])/2,320,128,'var(--INK)')),
  ({in:i,pop,to,A})=>{i('#b0,#b1',A.P(5));pop('#ex',A.W(5,'卖得多'));i('#pr',A.W(5,'活动的功劳'));i('#bs',A.W(5,'老板本人'));
    i('#cut',A.W(5,'老板本人')+.3);to('#cut',{y:[0,-120]},A.W(5,'光看'),1.4,'inout');to('#cut',{y:[-120,136]},A.W(5,'光看')+1.4,1.6,'inout');pop('#q',A.W(5,'分不出来'));});

/* 06 选择威胁：面板（容器）里两排人，等距；右侧“活动开始”线 */
{const px=X0,pw=1164,py=312,ph=560,fx=k=>px+pw/8+k*pw/4;
scene('threat','none',A=>A.P(6),
  K.term('term',1,160,'选择威胁')+
  svg(box('pre',px,py,pw,ph,{rx:R2})+
    `<g id="rowA">${[0,1,2,3].map(k=>fb('a'+k,fx(k),py+272,232,{...BOSS,armL:-40,armR:40},{g:'rowA',a:'bottom+sp',in:'pre'})).join('')}</g>`+
    `<g id="rowB">${[0,1,2,3].map(k=>fb('b'+k,fx(k),py+ph-24,232,PLAIN,{g:'rowB',a:'bottom+sp',in:'pre'})).join('')}</g>`+
    start('v',{x:1426,y:py,w:232,h:ph},.5)),
  ({in:i,pop,A})=>{pop('#term',A.W(6,'选择威胁'));i('#rowA',A.W(6,'两组'));i('#rowB',A.W(6,'两组')+.3);i('#v',A.W(6,'活动开始'));i('#pre',A.W(6,'之前'));});}

/* 07 推理链：四张等大卡片（四等分，y 216–840），卡内元素统一内边距 32、共用卡内地平线 792 */
{const cy0=216,ch=624,g2=cy0+ch-48,card=(k,inner)=>`<g id="c${k}">${box('cb'+k,C4[k],cy0,328,ch,{rx:R2},{g:'cards',a:'top+sp'})}${inner}</g>`,sh=fit('store',264,200);
scene('chain','none',A=>A.P(7),
  svg(card(0,ib('s1','store',C4c[0],cy0+PAD+sh,sh,FOC,{in:'cb0'})+AR('d0',C4c[0],cy0+PAD+sh+40,C4c[0],g2-sh-40,'var(--ink)',12)+ib('s2','store',C4c[0],g2,sh,NEU,{in:'cb0',g:'cg',a:'bottom'}))+
    card(1,fb('f1',C4c[1]-32,g2,456,BOSS,{in:'cb1',g:'cg',a:'bottom'})+ic('cbd','clipboard-pen',C4c[1]+88,560,120,FOC,{in:'cb1'}))+
    card(2,fb('f2',C4c[2]-72,g2,360,{...BOSS,armL:-40,armR:40},{in:'cb2',g:'cg',a:'bottom'})+fb('f3',C4c[2]+72,g2,360,PLAIN,{in:'cb2',g:'cg',a:'bottom'}))+
    card(3,fb('f4',C4c[3]-56,g2,400,BOSS,{in:'cb3',g:'cg',a:'bottom'})+AR('u',C4c[3]+104,g2-48,C4c[3]+104,cy0+PAD+24,'var(--MI)',18))),
  ({to,A})=>{const w=['第一步','第二步','第三步','第四步'];w.forEach((s,k)=>{to('#c'+k,{opacity:[0,1],y:[24,0]},A.W(7,s),.5,'out');if(k<3)to('#c'+k,{opacity:[1,.35]},A.W(7,w[k+1]),.4,'inout')});
    [0,1,2].forEach(k=>to('#c'+k,{opacity:[.35,1]},A.W(7,'所以')+k*.1,.4,'inout'));});}

/* 08 最容易犯的错 */
scene('mistake','schematic',A=>A.P(8),
  svg(bars(280,616,336)+`<rect id="part" x="${C4[1]}" y="${GND-616}" width="328" height="168" rx="8" fill="var(--g1)"/>`+pbs()+AR('ar',C4[1]+344,GND-616+84,C4c[3]-120,GND-616+84,'var(--g1)',12)),
  ({in:i,pop,A})=>{i('#b0,#b1',A.P(8));pop('#ex',A.W(8,'参加组'));pop('#pr',A.W(8,'全都算成'));i('#part',A.W(8,'其中一部分'));i('#ar',A.W(8,'会做生意'));pop('#bs',A.W(8,'会做生意')+.2);});

/* 09 四个角度：先是骰子被划掉；再是四张等大卡片，每张一个大图形（卡内居中、等高 240） */
{const cy0=264,ch=576,icn=['store','calendar','shopping-basket','toggle-right'];
scene('four','none',A=>A.P(9),
  svg(ic('die','die',960,552,400,'var(--CR)')+M('dx',1160,352,144,false)+
    icn.map((n,k)=>`<g id="f${k}">${box('fb'+k,C4[k],cy0,328,ch,{rx:R2},{g:'cards',a:'top+sp'})}${ic('fi'+k,n,C4c[k],cy0+ch/2,fit(n,264,264),FOC,{in:'fb'+k,g:'icons',a:'cy+sp'})}</g>`).join('')),
  ({pop,out,stagger,A})=>{pop('#die',A.W(9,'研究者'));pop('#dx',A.W(9,'没法让'));out('#die,#dx',A.W(9,'几个角度')-.2);stagger(['#f0','#f1','#f2','#f3'],A.W(9,'几个角度'),.3,{dy:0});});}

/* 10 找搭档：店 | 条件栏 | 店，三等分；两店底边落在“街道”上沿 */
{const sh=fit('store',448,360),st=760;
scene('pair','schematic',A=>A.P(10),
  svg(ic('pin','pin',C3c[1],248,128,FOC)+`<rect id="street" x="${X0}" y="${st}" width="${W}" height="40" rx="20" fill="var(--g3)"/>`+
    ib('t','store',C3c[0],st,sh,FOC,{g:'shop',a:'bottom'})+box('slot',C3[2]-0,st-sh-24,448,sh+24,{stroke:'var(--g1)',dash:true,rx:R2})+ib('m','store',C3c[2],st,sh,NEU,{g:'shop',a:'bottom',in:'slot'})+ib('m2','store',C3c[2],st,sh,FOC)+
    ic('k1','ticket',C3c[1],st-sh+64,112,FOC,{g:'crit',a:'cx'})+ic('k2','ticket',C3c[1],st-sh+200,112,FOC,{g:'crit',a:'cx'})+M('ok',C3c[1],st-88,112,true)+
    L('tl',C3c[0],880,'参加店',FOC,48,{g:'lab',a:'bottom'})+L('ml',C3c[2],880,'对照店','var(--ink)',48,{g:'lab',a:'bottom'})),
  ({in:i,pop,out,A})=>{i('#t,#tl',A.P(10)+.2);i('#slot',A.W(10,'找搭档'));i('#m,#ml',A.W(11,'找什么样'));out('#slot',A.W(11,'找什么样'));
    i('#m2',A.W(11,'连锁品牌'));i('#street',A.W(11,'同一个区域'));pop('#pin',A.W(11,'同一个区域'));pop('#k1',A.W(11,'份额'));pop('#k2',A.W(11,'份额')+.2);pop('#ok',A.W(11,'差不多'));});}

/* 11 打个比方：二等分；大店带人流 vs 小店一人 → 缩放到同高（以底边为锚） */
{const hb=520,hs=240,he=384;
scene('scale','teaching',A=>A.P(12),
  svg(`<rect id="gnd" x="${X0}" y="${GND}" width="${W}" height="32" rx="16" fill="var(--g3)"/>`+ib('big','store',C2c[0],GND,hb,NEU,{g:'ground',a:'bottom',o:'center bottom'})+ib('crowd','users',C2c[0],GND,200,'var(--ink)')+
    ib('small','store',X1-he*108/86/2,GND,hs,NEU,{g:'ground',a:'bottom',o:'center bottom'})+ib('one','user-round',X1-he*108/86/2,GND,120,'var(--g1)')+
    M('no',960,248,152,false)+M('ok',960,248,152,true)),
  ({in:i,to,pop,out,A})=>{i('#gnd,#big,#small',A.P(12)+.1);i('#crowd',A.W(12,'客流本来就大'));i('#one',A.W(12,'冷清的小店'));pop('#no',A.W(12,'没什么关系'));
    out('#crowd,#one,#no',A.W(12,'只有两家'));to('#big',{scale:[1,he/hb]},A.W(12,'只有两家'),1,'inout');to('#small',{scale:[1,he/hs]},A.W(12,'只有两家'),1,'inout');pop('#ok',A.W(12,'后来的差别'));},'打个比方');}

/* 12 非同等比较组：四等分；骰子 | 挑店的人 | 店 | 店，同一地平线 */
{const sh=fit('store',328,280);
scene('necg','none',A=>A.P(13),
  K.term('term',1,160,'非同等比较组')+
  svg(ib('die','die',C4c[0],GND,240,'var(--SU)',{g:'ground',a:'bottom'})+M('dx',C4c[0]+112,GND-240,104,false)+
    fb('p',C4c[1],GND,448,{shirt:'var(--U)',shirtD:'var(--UD)',armR:-100},{g:'ground',a:'bottom'})+
    ib('a','store',C4c[2],GND,sh,FOC,{g:'ground',a:'bottom'})+ib('b','store',C4c[3],GND,sh,FOC,{g:'ground',a:'bottom'})+Q('q',(C4c[2]+C4c[3])/2,GND-sh-112,128,'var(--ink)')),
  ({pop,in:i,A})=>{pop('#term',A.W(13,'非同等比较组'));i('#p',A.W(13,'人挑出来'));i('#a,#b',A.W(13,'人挑出来')+.3);pop('#die',A.W(13,'随机'));pop('#dx',A.W(13,'随机')+.3);pop('#q',A.W(13,'不保证'));});}

/* 13 配对管得住什么：三等分；两店同底，老板站在店后（同高同底），中栏 ✓ 与 ？ 同轴 */
{const sh=fit('store',448,360);
scene('limits','schematic',A=>A.P(14),
  svg(fb('oa',C3c[0],GND-sh+120,392,{...BOSS,armL:-50,armR:50,legs:false},{g:'own',a:'bottom'})+fb('ob',C3c[2],GND-sh+120,392,{...PLAIN,legs:false},{g:'own',a:'bottom'})+
    ib('a','store',C3c[0],GND,sh,FOC,{g:'shop',a:'bottom'})+ib('b','store',C3c[2],GND,sh,FOC,{g:'shop',a:'bottom'})+
    M('ok',C3c[1],GND-sh/2,152,true)+Q('q',C3c[1],336,200,'var(--SU)')),
  ({in:i,pop,A})=>{i('#a,#b',A.P(14)+.2);pop('#ok',A.W(14,'看得见'));i('#oa,#ob',A.W(14,'看不见'));pop('#q',A.W(14,'干劲'));},'示意图 · 匹配关系');}

/* 14 把时间拉长：8 个等宽周块，两组以“活动开始”线为轴对称 */
{const bw=148,gp=24,bx=k=>k<4?X0+k*(bw+gp):X0+W-(4-(k-4))*(bw+gp)+gp,by=456,bh=224;
scene('time','schematic',A=>A.P(15),
  svg(ic('cal','calendar',X0+80,296,176,'var(--ink)')+start('v',{x:X0,y:312,w:W,h:448},.5)+
    [0,1,2,3,4,5,6,7].map(k=>tag(`<rect id="w${k}" x="${bx(k)}" y="${by}" width="${bw}" height="${bh}" rx="${R1}" fill="${k<4?'var(--g2)':'var(--pink)'}"/>`,{g:k<4?'wb':'wa',a:'bottom+sp'})).join('')+
    L('lb',X0+(4*bw+3*gp)/2,792,'前4周','var(--g1)',48,{g:'lab',a:'bottom'})+L('la',X1-(4*bw+3*gp)/2,792,'后4周',FOC,48,{g:'lab',a:'bottom'})),
  ({in:i,stagger,A})=>{i('#cal,#v',A.P(15));stagger([0,1,2,3].map(k=>'#w'+k),A.W(15,'前后各四周'),.12,{dy:0});i('#lb',A.W(15,'前后各四周'));stagger([4,5,6,7].map(k=>'#w'+k),A.W(15,'四周'),.12,{dy:0});i('#la',A.W(15,'四周'));},'示意图 · 测量窗口');}

/* 15 教学假设：本来就在涨 */
{const c=CF(false);
scene('trend','teaching',A=>A.P(16),
  svg(chart('ax',c)+start('v',c,.5)+K.path('rise',`M${pt(c,0,.05)} L ${pt(c,.5,.45)}`,'g')+K.path('ext',`M${pt(c,.5,.45)} L ${pt(c,.98,.83)}`,'spec')+
    `<circle id="p0" cx="${Math.round(c.x+.38*c.w)}" cy="${Math.round(c.y+c.h-.354*c.h)}" r="20" fill="var(--ink)"/><circle id="p1" cx="${Math.round(c.x+.62*c.w)}" cy="${Math.round(c.y+c.h-.545*c.h)}" r="20" fill="var(--pink)"/>`+
    ib('pr','promo',c.x+c.w-232,GND-48,176,FOC,{g:'vd',a:'cy'})+M('no',c.x+c.w-72,GND-48-88,120,false,)),
  ({in:i,draw,pop,A})=>{i('#ax,#axi',A.P(16));draw('#rise',A.W(16,'一路上涨'),1.3);i('#v',A.W(16,'贴上海报'));
    pop('#p0',A.W(16,'活动后的数字')-.3);pop('#p1',A.W(16,'活动后的数字'));draw('#ext',A.W(16,'原来的上涨趋势'),1.2);pop('#pr',A.W(16,'错当成'));pop('#no',A.W(16,'活动效果'));},'教学假设 · 原本就在上涨');}

/* 16 多次前后测：等距打点 */
{const c=CF(false,312),n=12,xs=k=>Math.round(c.x+(k+.5)*c.w/n),ys=[.3,.32,.29,.31,.3,.3,null,.42,.55,.64,.72,.8];
scene('multi','schematic',A=>A.P(17),
  K.term('term',1,160,'多次前后测')+
  svg(chart('ax',c,{icon:false})+start('v',c,6.5/n)+ys.map((v,k)=>v==null?'':tag(`<circle id="m${k}" cx="${xs(k)}" cy="${Math.round(c.y+c.h-v*c.h)}" r="20" fill="${k<6?'var(--ink)':'var(--pink)'}"/>`,{g:k<6?'dotsA':'dotsB',a:'sp'})).join('')),
  ({in:i,stagger,pop,A})=>{i('#ax,#v',A.P(17));stagger([0,1,2,3,4,5].map(j=>'#m'+j),A.W(17,'先看清'),.15,{dy:0});stagger([7,8,9,10,11].map(j=>'#m'+j),A.W(17,'再看'),.15,{dy:0});pop('#term',A.W(17,'多次前后测'));},'示意图 · 无研究数值');}

/* 17 书中结果（保留原画法）：图例在统一图例栏 */
{const c=CF(true);
scene('evtime','record',A=>A.P(18),
  svg(chart('ax',c)+`<rect id="hb" x="${c.x+8}" y="${c.y}" width="${c.w/2-16}" height="${c.h-8}" rx="${R1}" fill="var(--g4)"/>`+start('v',c,.5)+
    K.path('tp',`M${pt(c,0,.72)} L ${pt(c,.5,.46)}`,'pink')+K.path('cp',`M${pt(c,0,.6)} L ${pt(c,.5,.34)}`,'g')+
    K.path('ta',`M${pt(c,.5,.46)} C ${pt(c,.64,.46)}, ${pt(c,.78,.7)}, ${pt(c,1,.82)}`,'pink')+K.path('ca',`M${pt(c,.5,.34)} L ${pt(c,1,.14)}`,'g')+
    L('tl',LEG,c.y+c.h-.82*c.h+16,'参加组',FOC,44,{g:'leg',a:'cx'})+L('cl',LEG,c.y+c.h-.14*c.h+16,'对照组','var(--g1)',44,{g:'leg',a:'cx'})+M('ok',LEG,c.y+c.h/2,120,true)),
  ({in:i,draw,pop,A})=>{i('#ax,#axi,#v',A.P(18));draw('#tp',A.W(18,'两组店'),1);draw('#cp',A.W(18,'两组店')+.15,1);
    draw('#ta',A.W(18,'参加组转头'),1);i('#tl',A.W(18,'往上'));draw('#ca',A.W(18,'对照组'),1);i('#cl',A.W(18,'还在往下'));i('#hb',A.W(19,'第一'));pop('#ok',A.W(19,'第二'));});}

/* 18 还剩什么疑问：三等分，活动 → 店 ← 未知的事（人流） */
{const sh=fit('store',448,360);
scene('history','teaching',A=>A.P(20),
  svg(`<rect id="gnd" x="${X0}" y="${GND}" width="${W}" height="32" rx="16" fill="var(--g3)"/>`+ic('cal','calendar',C3c[1],232,112,'var(--ink)')+ib('pr','promo',X0+300*103/88/2,GND-sh/2+150,300,FOC,{g:'mid',a:'cy'})+ib('st','store',C3c[1],GND,sh,NEU,{g:'mid',a:'cy'})+
    ic('gh','ghost',X1-139,GND-sh/2,320,'var(--g1)',{g:'mid',a:'cy'})+ib('crowd','users',X1-139,GND,152,'var(--ink)')+
    AR('a1',C3[0]+400,GND-sh/2,C3[1]+8,GND-sh/2,FOC,14)+AR('a2',C3[2]+40,GND-sh/2,C3[1]+440,GND-sh/2,'var(--g1)',14)+
    `<rect id="glow" x="${C3[1]}" y="${GND-sh-72}" width="448" height="40" rx="20" fill="var(--SU)"/>`),
  ({in:i,pop,A})=>{i('#st,#gnd',A.P(20));i('#cal',A.W(20,'时间点'));i('#pr,#a1',A.P(20)+.4);pop('#gh',A.W(20,'别的事'));i('#crowd,#a2',A.W(20,'旺了起来'));pop('#glow',A.W(20,'旺了起来')+.3);},'教学假设 · 未知原因不是已发现的事实');}

/* 19 第三种：查别的商品——四张等大卡片，商品等高、中心同线 */
const gi=['ticket','fuel','cigarette','shopping-basket'];
{const cy0=264,ch=576;
scene('goods','schematic',A=>A.P(21),
  svg(gi.map((g,k)=>`<g id="g${k}">${box('gb'+k,C4[k],cy0,328,ch,{rx:R2},{g:'cards',a:'top+sp'})}${ic('gi'+k,g,C4c[k],cy0+ch/2,fit(g,264,280),k?NEU:FOC,{in:'gb'+k,g:'gd',a:'cy+sp'})}</g>`).join('')+
    ic('mg','magnifier',C4c[1]+64,cy0+ch/2-96,200,'var(--ink)')),
  ({in:i,pop,move,A})=>{i('#g0',A.P(21)+.2);i('#g1',A.W(21,'汽油'));i('#g2',A.W(21,'香烟'));i('#g3',A.W(21,'食品'));pop('#mg',A.W(22,'查别的'));move('#mg',A.W(22,'查别的')+.5,[0,0],[356,0],1.2);});}

/* 20/24 预测表：两行 × (表头 + 4 格)，单元格统一 R1、内边距 32；格内商品等高、箭头同底 */
const TB={hx:X0,hw:280,cx:k=>X0+304+k*278,cw:258,ry:[216,552],rh:288};
const trow=(id,r,head,headTone,ups)=>{const y=TB.ry[r],mid=y+TB.rh/2,ih=fit('fuel',120,168);
  return box(id+'hb',TB.hx,y,TB.hw,TB.rh,{rx:R1},{g:'row'+id,a:'top'})+ic(id+'h',head,TB.hx+TB.hw/2,mid,fit(head,TB.hw-64,TB.rh-64),headTone,{in:id+'hb'})+
   gi.map((g,k)=>box(id+'c'+k,TB.cx(k),y,TB.cw,TB.rh,{rx:R1},{g:'row'+id,a:'top'})+ib(id+k,g,TB.cx(k)+PAD+60,mid+ih/2,fit(g,120,ih),ups[k]?FOC:NEU,{in:id+'c'+k,g:'gi'+id,a:'bottom'})+
     (ups[k]?AR(id+'u'+k,TB.cx(k)+TB.cw-PAD-28,mid+64,TB.cx(k)+TB.cw-PAD-28,mid-96,'var(--MI)',14):`<rect id="${id}u${k}" x="${TB.cx(k)+TB.cw-PAD-52}" y="${mid-8}" width="48" height="16" rx="8" fill="var(--g1)"/>`)).join('')};
scene('predict','teaching',A=>A.P(23),
  svg(trow('A',0,'users','var(--ink)',[1,1,1,1])+trow('B',1,'promo',FOC,[1,0,0,0])),
  ({in:i,stagger,A})=>{i('#Ahb,#Ah,#Ac0,#Ac1,#Ac2,#Ac3',A.W(23,'整家店旺起来'));stagger(['#A0','#A1','#A2','#A3'],A.W(23,'进店的人'),.12);stagger(['#Au0','#Au1','#Au2','#Au3'],A.W(23,'也应该'),.12);
    i('#Bhb,#Bh,#Bc0,#Bc1,#Bc2,#Bc3',A.W(24,'活动的影响则不同'));stagger(['#B0','#B1','#B2','#B3'],A.W(24,'只针对彩票'),.12);i('#Bu0',A.W(24,'只有彩票涨'));stagger(['#Bu1','#Bu2','#Bu3'],A.W(24,'别的商品'),.12);},'教学假设 · 两种解释的预测');

/* 21 书中结果：四张卡，只有彩票卡有向上箭头 */
{const cy0=216,ch=624,ih=232;
scene('evgoods','record',A=>A.P(26),
  svg(gi.map((g,k)=>box('eb'+k,C4[k],cy0,328,ch,{rx:R2},{g:'cards',a:'top+sp'})+ib('r'+k,g,C4c[k],cy0+ch-PAD-24,fit(g,264,ih),k?NEU:FOC,{in:'eb'+k,g:'gd',a:'bottom+sp'})).join('')+
    AR('u0',C4c[0],cy0+PAD+232,C4c[0],cy0+PAD+16,'var(--MI)',20)+[1,2,3].map(k=>`<rect id="f${k}" x="${C4c[k]-48}" y="${cy0+PAD+116}" width="96" height="20" rx="10" fill="var(--g1)"/>`).join('')+M('ok',C4[0]+328-40,cy0+40,96,true)),
  ({in:i,pop,A})=>{i('#eb0,#eb1,#eb2,#eb3,#r0,#r1,#r2,#r3',A.P(26));pop('#u0',A.W(26,'彩票涨了'));i('#f1,#f2,#f3',A.W(26,'汽油'));pop('#ok',A.W(26,'起作用'));});}

/* 22 非同等依变项：左列原因、右列结果，行中心对齐 */
{const r=[456,744],hh=208;
scene('nedv','none',A=>A.P(27),
  K.term('term',1,160,'非同等依变项')+
  svg(ic('pr','promo',C4c[0],r[0],hh,FOC,{g:'r0',a:'cy'})+ic('cw','users',C4c[0],r[1],hh,'var(--ink)',{g:'r1',a:'cy'})+ic('tk','ticket',C4c[3],r[0],fit('ticket',328,hh),FOC,{g:'r0',a:'cy'})+ic('bk','shopping-basket',C4c[3],r[1],hh,NEU,{g:'r1',a:'cy'})+
    AR('a1',C4[1],r[0],C4[3]-24,r[0],FOC,14)+AR('a2',C4[1],r[0]+40,C4[3]-24,r[1]-40,'var(--g1)',14)+M('x2',960,600,104,false)+AR('a3',C4[1],r[1],C4[3]-24,r[1],'var(--ink)',14)),
  ({pop,in:i,A})=>{pop('#term',A.W(27,'非同等依变项'));i('#tk,#bk',A.W(27,'依变项”就是'));i('#pr,#a1',A.W(27,'活动本身'));i('#a2',A.W(27,'影响不到'));pop('#x2',A.W(27,'影响不到')+.2);i('#cw,#a3',A.W(27,'共同的原因'));});}

/* 23 两个条件 + 银行反例：四等分（原因 | 箭头 | 对象 | 判定），行中心对齐 */
{const r=[312,744],mid=528;
scene('cond','teaching',A=>A.P(28),
  svg(ic('pr','promo',C4c[0],r[0],240,FOC,{g:'r0',a:'cy'})+ic('cw','users',C4c[0],r[1],240,'var(--ink)',{g:'r1',a:'cy'})+
    ic('bk','shopping-basket',C4c[2],mid,360,NEU,{g:'mid',a:'cy'})+ic('bank','landmark',C4c[2],mid,360,NEU)+
    AR('a1',C4[1]-8,r[0]+16,C4[2]-16,mid-80,FOC,14)+M('x1',C4c[1]+24,(r[0]+mid)/2-16,96,false)+AR('a2',C4[1]-8,r[1]-16,C4[2]-16,mid+80,'var(--ink)',14)+M('x2',C4c[1]+24,(r[1]+mid)/2+16,96,false)+
    M('c1',C4c[3],r[0],128,true,{})+M('c2',C4c[3],r[1],128,true)+M('big',C4c[3],mid,288,false)),
  ({in:i,pop,out,A})=>{i('#bk',A.P(28));i('#pr,#a1',A.W(28,'第一'));pop('#x1',A.W(28,'直接影响'));pop('#c1',A.W(28,'直接影响')+.3);i('#cw,#a2',A.W(28,'第二'));pop('#c2',A.W(28,'应该会'));
    out('#bk,#c1,#c2',A.W(28,'打个比方'));i('#bank',A.W(28,'银行'));pop('#x2',A.W(28,'客流变化'));pop('#big',A.W(28,'什么都说明不了'));},'打个比方');}

/* 24 第三种的局限：与预测表同一套表格；判定标记在表头格右上角 */
scene('tlimit','teaching',A=>A.P(29),
  svg(trow('A',0,'users','var(--ink)',[1,1,1,1])+trow('B',1,'ghost','var(--g1)',[1,0,0,0])+M('ok',TB.hx+TB.hw-8,TB.ry[0]+8,96,true)+M('no',TB.hx+TB.hw-8,TB.ry[1]+8,96,false)),
  ({in:i,pop,A})=>{i('#Ahb,#Ah,#Ac0,#Ac1,#Ac2,#Ac3,#A0,#A1,#A2,#A3,#Au0,#Au1,#Au2,#Au3',A.W(29,'能排除'));pop('#ok',A.W(29,'多种商品'));
    i('#Bhb,#Bh,#Bc0,#Bc1,#Bc2,#Bc3,#B0,#B1,#B2,#B3,#Bu0,#Bu1,#Bu2,#Bu3',A.W(29,'假设'));pop('#no',A.W(29,'发现不了'));},'教学假设 · 未知原因不是已发现的事实');

/* 25 第四种：开 / 停 / 再开（保留原画法）；开关轨道等大、与三段曲线各自居中 */
{const c=CF(false,424),seg=u=>c.x+u*c.w,th=104;
scene('removal','record',A=>A.P(30),
  svg([['toggle-right',FOC],['toggle-left','g'],['toggle-right',FOC]].map(([n,t],k)=>ic('w'+(k+1),n,Math.round(seg((k+.5)/3)),296,th,t,{g:'tg',a:'cy+sp'})).join('')+chart('ax',c,{icon:false})+ic('tki','ticket',280,c.y+24,48,'var(--g1)')+
    K.path('sales',`M${pt(c,0,.08)} C ${pt(c,.15,.08)}, ${pt(c,.2,.62)}, ${pt(c,1/3,.62)} C ${pt(c,.43,.62)}, ${pt(c,.45,.08)}, ${pt(c,2/3,.08)} C ${pt(c,.78,.08)}, ${pt(c,.8,.62)}, ${pt(c,1,.62)}`,'pink')),
  ({in:i,to,A})=>{i('#w1',A.W(30,'有些店'));i('#w2',A.W(30,'中途退出'));i('#w3',A.W(30,'重新加入'));
    i('#ax,#tki',A.P(30)+.1);const P1=A.W(31,'活动开始'),P2=A.W(31,'活动停了'),P3=A.W(31,'活动恢复');
    to('#sales',{wipe:[0,.33]},P1,1,'inout');to('#sales',{wipe:[.33,.66]},P2,1,'inout');to('#sales',{wipe:[.66,1]},P3,1.2,'inout');});}

/* 26 移除处理：三张等大卡片（三等分），卡内开关在上、“别的原因”在下，同轴居中 */
{const cy0=312,ch=560;
scene('remove','none',A=>A.P(32),
  K.term('term',1,160,'移除处理')+
  svg([['toggle-right',FOC],['toggle-left','g'],['toggle-right',FOC]].map(([n,t],k)=>box('rb'+k,C3[k],cy0,448,ch,{rx:R2},{g:'cards',a:'top+sp'})+ic('t'+k,n,C3c[k],cy0+PAD+64,112,t,{in:'rb'+k,g:'tg',a:'cy+sp'})+
     ib('g'+k,'ghost',C3c[k],cy0+ch-PAD,264,'var(--g1)',{in:'rb'+k,g:'gh',a:'bottom+sp'})+M('x'+k,C3c[k]+136,cy0+ch-PAD-248,104,false)).join('')),
  ({pop,stagger,in:i,to,A})=>{pop('#term',A.W(32,'移除处理'));i('#rb0,#rb1,#rb2',A.P(32));stagger(['#t0','#t1','#t2'],A.W(32,'撤掉'),.4);
    i('#g0',A.W(32,'别的原因'));i('#g1',A.W(32,'一起停'));to('#g1',{opacity:[1,.2]},A.W(32,'一起开'),.5,'inout');i('#g2',A.W(32,'这样的巧合'));
    pop('#x0',A.W(32,'巧合'));pop('#x1',A.W(32,'次数越多'));pop('#x2',A.W(32,'越难成立'));});}

/* 27 补缺口：三段等宽轨道（胶囊），开关居中其上；“只影响彩票的原因”沿轨道走 */
{const ty=520,thh=112;
scene('gap','schematic',A=>A.P(33),
  svg([0,1,2].map(k=>tag(`<rect id="s${k}" x="${C3[k]}" y="${ty}" width="448" height="${thh}" rx="${thh/2}" fill="${k===1?'var(--g3)':'var(--pink)'}"/>`,{g:'seg',a:'cy+sp'})).join('')+
    [['toggle-right',FOC],['toggle-left','g'],['toggle-right',FOC]].map(([n,t],k)=>ic('t'+k,n,C3c[k],344,128,t,{g:'tg',a:'cy+sp'})).join('')+
    ib('gh','ghost',C3c[0]-64,GND,232,'var(--g1)',{g:'walker',a:'bottom'})+ib('tk','ticket',C3c[0]+112,GND,104,FOC,{g:'walker',a:'bottom'})),
  ({in:i,stagger,move,to,A})=>{stagger(['#s0','#t0','#s1','#t1','#s2','#t2'],A.P(33)+.1,.15);i('#gh,#tk',A.W(33,'只影响彩票'));
    move('#gh,#tk',A.W(33,'它也得'),[0,0],[474,0],.9);to('#gh',{opacity:[1,.25]},A.W(33,'它也得'),.6,'inout');move('#gh,#tk',A.W(33,'再开'),[474,0],[948,0],.9);to('#gh',{opacity:[.25,1]},A.W(33,'再开'),.6,'inout');});}

/* 28a/28b 前提与本案：同一张图（带图例栏），停用区间为同高色块，开关图形居中其顶 */
{const c=CF(true),z=[.46,.78],zx=z.map(u=>Math.round(c.x+u*c.w));
const ch2=id=>chart(id,c)+`<rect id="${id}z" x="${zx[0]}" y="${c.y}" width="${zx[1]-zx[0]}" height="${c.h-8}" rx="${R1}" fill="var(--g4)"/>`+ic(id+'zl','toggle-left',(zx[0]+zx[1])/2,c.y+64,72,'g');
const on=`M${pt(c,0,.12)} C ${pt(c,.2,.12)}, ${pt(c,.3,.62)}, ${pt(c,.46,.62)}`;
scene('carry','teaching',A=>A.P(34),
  svg(ch2('c')+K.path('on',on,'pink')+K.path('stay',`M${pt(c,.46,.62)} L ${pt(c,1,.62)}`,'spec')+
    fb('cust',LEG,GND,432,{shirt:'var(--CR)',shirtD:'var(--CRD)',hair:'var(--INK)',hairStyle:1,armL:58})+ic('tk','ticket',LEG-104,560,72,'var(--SU)')),
  ({in:i,draw,pop,A})=>{i('#c,#ci',A.P(34));draw('#on',A.W(34,'活动一撤'),1);i('#cz,#czl',A.W(34,'活动一撤')+.5);i('#cust',A.W(34,'养成'));pop('#tk',A.W(34,'买彩票'));draw('#stay',A.W(34,'停掉活动'),1.3);},'教学假设 · 活动停止，习惯可能持续');
scene('carry2','record',A=>A.W(34,'在这个案例里'),
  svg(ch2('d')+K.path('f',`${on} C ${pt(c,.5,.62)}, ${pt(c,.52,.12)}, ${pt(c,.62,.12)} L ${pt(c,.74,.12)} C ${pt(c,.8,.12)}, ${pt(c,.82,.62)}, ${pt(c,1,.62)}`,'pink')+
    ic('t1','toggle-right',LEG,c.y+c.h-.62*c.h,104,FOC,{g:'leg',a:'cx'})+ic('t2','toggle-left',LEG,c.y+c.h-.12*c.h,104,'g',{g:'leg',a:'cx'})),
  ({wipe,in:i,A})=>{wipe('#f',A.W(34,'在这个案例里')+.2,2.6);i('#t1,#t2',A.W(34,'开关'));});}

/* 29 模式比对：五张等大方卡（4 张痕迹 + 1 张证据），证据卡滑到对得上的那张 */
{const cw=256,gp=(W-5*cw)/4,cx=k=>X0+k*(cw+gp),cy0=440,sh=['M0 176 L176 16','M0 96 L176 96','M0 16 L88 176 L176 176','M0 176 L64 176 L104 32 L176 32'];
const card=(id,k,d,col)=>`<g id="${id}">${box(id+'b',cx(k),cy0,cw,cw,{rx:R2},id==='ev'?{}:{g:'pm',a:'top+sp'})}<path d="${d}" transform="translate(${cx(k)+40} ${cy0+40})" stroke="${col}" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
scene('pm','none',A=>A.P(35),
  K.term('term',1,160,'模式比对')+
  svg(sh.map((d,k)=>card('p'+k,k,d,'var(--g1)')).join('')+card('ev',4,sh[3],FOC)+M('ok',cx(3)+cw/2,cy0+cw+104,128,true)),
  ({pop,stagger,in:i,move,A})=>{pop('#term',A.P(35)+.1);stagger(['#p0','#p1','#p2','#p3'],A.W(35,'痕迹'),.15);i('#ev',A.W(35,'实际的证据'));move('#ev',A.W(35,'跟哪一种'),[0,0],[-(cw+gp),0],.9);pop('#ok',A.W(35,'对得上'));});}

/* 30 对一下：四列等大卡片；每列 图形 / 该有的痕迹（虚线）/ 实际（实线）/ 判定，四行基线一致 */
{const cy0=216,ch=624,rows=[328,496,632,768],mini=[['M-96 64 L96 -64','M-96 32 L96 32'],['M-96 48 L96 -48','M-96 -48 L96 48'],['M-96 48 L96 -48','M-96 0 L96 0'],['M-96 40 L-32 40 L-8 -40 L32 -40 L56 40 L96 40','M-96 40 L96 -24']],hd=['store','trendup','users','ghost'];
scene('table','none',A=>A.P(36),
  svg(hd.map((n,k)=>`<g id="col${k}">${box('tb'+k,C4[k],cy0,328,ch,{rx:R2},{g:'cards',a:'top+sp'})}`+ic('h'+k,n,C4c[k],rows[0],fit(n,200,144),n==='users'?'var(--ink)':'var(--g1)',{in:'tb'+k,g:'hd',a:'cy+sp'})+
      `<path transform="translate(${C4c[k]} ${rows[1]})" d="${mini[k][0]}" stroke="var(--g1)" stroke-width="10" stroke-dasharray="18 14" fill="none" stroke-linecap="round"/>`+
      `<path id="act${k}" transform="translate(${C4c[k]} ${rows[2]})" d="${mini[k][1]}" stroke="var(--CR)" stroke-width="12" fill="none" stroke-linecap="round"/></g>`+
      M('x'+k,C4c[k],rows[3],112,false)+ic('pa'+k,'promo',C4c[k],rows[0],144,FOC,{g:'hd2',a:'cy+sp'})+M('v'+k,C4c[k],rows[3],112,true)).join('')),
  ({in:i,pop,out,A})=>{const a=['两组店原本的差别','原来的趋势','整家店变旺','碰巧的原因'],c=['走势相近','可它在跌','可它们没涨','这太巧了'];
    a.forEach((w,k)=>{i('#col'+k,A.W(36,w));pop('#x'+k,A.W(36,c[k]))});
    [0,1,2,3].forEach(k=>{out('#h'+k+',#x'+k,A.W(37,'用活动')+k*.15);pop('#pa'+k,A.W(37,'用活动')+k*.15);pop('#v'+k,A.W(37,'四样证据')+k*.15);});});}

/* 31 四道关：四等分；图形中心同线、门同底同高 */
{const gh=320,gw=fit('gate',328,gh);
scene('recap','none',A=>A.P(38),
  svg(['store','calendar','shopping-basket','toggle-right'].map((n,k)=>ic('i'+k,n,C4c[k],312,fit(n,240,160),FOC,{g:'ic',a:'cy+sp'})+ib('g'+k,'gate',C4c[k],GND,gw,'var(--ink)',{g:'gate',a:'bottom+sp'})).join('')+
    ib('gh','ghost',C4[0]+96,GND,208,'var(--g1)')+M('no',C4[1]-24,GND-gw-8,112,false)),
  ({in:i,pop,move,A})=>{const w=['找相似的店','连续看前后','看别的商品','停了再开'];w.forEach((s,k)=>{i('#i'+k+',#g'+k,A.W(38,s))});
    i('#gh',A.W(39,'别的解释'));move('#gh',A.W(39,'同时过四关'),[0,0],[356,0],1.2);pop('#no',A.W(39,'很难'));});}

/* 32 说清楚：报名的老板仍在；四个“别的解释”变弱但未消失——同底等距 */
{const gx=k=>C4[1]+48+k*((X1-48-C4[1]-48)/4)+((X1-48-C4[1]-48)/8);
scene('caution','none',A=>A.P(40),
  svg(`<rect id="gnd" x="${X0}" y="${GND}" width="${W}" height="32" rx="16" fill="var(--g3)"/>`+fb('bs',C4c[0]-24,GND,448,BOSS,{g:'ground',a:'bottom'})+ic('cb','clipboard-pen',C4c[0]+96,600,136,FOC)+
    [0,1,2,3].map(k=>ib('g'+k,'ghost',Math.round(gx(k)),GND,264,'var(--g1)',{g:'gh',a:'bottom+sp',o:'center bottom'})).join('')+Q('q',(gx(1)+gx(2))/2,296,224,'var(--ink)')),
  ({in:i,pop,stagger,to,A})=>{i('#gnd',A.P(40));i('#bs,#cb',A.W(40,'老板自己报名'));stagger(['#g0','#g1','#g2','#g3'],A.W(40,'其他解释'),.12);
    [0,1,2].forEach(k=>to('#g'+k,{opacity:[1,.3],scale:[1,.6]},A.W(40,'越来越难')+k*.2,.6,'inout'));pop('#q',A.W(40,'不能说'));});}

/* 33 收尾：同一张图 + 图例栏（大问号、两只“别的解释”） */
{const c=CF(true);
scene('close','none',A=>A.P(41),
  svg(chart('ax',c)+K.path('up',`M${pt(c,0,.06)} C ${pt(c,.35,.08)}, ${pt(c,.62,.3)}, ${pt(c,.96,.9)}`,'pink')+
    Q('q',LEG,424,320,'var(--SU)')+ib('g0','ghost',LEG-64,GND,136,'var(--g1)',{g:'gg',a:'bottom'})+ib('g1','ghost',LEG+64,GND,136,'var(--g1)',{g:'gg',a:'bottom'})),
  ({in:i,draw,pop,A})=>{i('#ax,#axi',A.P(41));draw('#up',A.W(41,'结果变好了'),1.2);pop('#q',A.W(41,'接着问'));pop('#g0',A.W(41,'如果不是它'));pop('#g1',A.W(41,'一起解释'));});}

const THEME={hook:'u',rule:'u',rise:'i',select:'u',attrib:'c',threat:'c',chain:'i',mistake:'c',four:'u',pair:'u',scale:'u',necg:'c',limits:'u',time:'i',trend:'i',multi:'i',evtime:'i',history:'u',goods:'u',predict:'i',evgoods:'i',nedv:'c',cond:'u',tlimit:'c',removal:'i',remove:'c',gap:'u',carry:'i',carry2:'i',pm:'c',table:'u',recap:'u',caution:'c',close:'u'};S.forEach(s=>{if(!THEME[s.id])throw Error('no theme '+s.id);s.theme=THEME[s.id]});
window.SCENES=S;
})();
