function render(k,t){k.base(t);const {c,C,p,w,show,prog,text,box,line,arrow,dot,tag,title,bracket,person,shop,grid,node,graph}=k;
if(t<60.608){
 title(t<15.198?'少了员工，也可能保住工作':t<31.013?'同一家店，两种比较':'同一家店 · 同一段时间',t<4.108?'教学悬念': '教学示例 · 数字不是论文发现');
 shop(110,330,330,'同一家快餐店');line([[440,445],[550,445],[620,320]],C.pink,4);line([[550,445],[620,650]],C.grey,4,true);
 const numbered=show(9),reality=numbered?20-2*w(10,'十八'):20-2*p(.48,.86),cf=numbered?20-4*w(11,'十六'):18-2*p(13.833,14.86);
 text('政策前',250,630,32,C.muted,'center');if(numbered){grid(108,690,20,20,C.grey,24);text('20 人',270,800,60,C.grey,'center')}
 box(620,225,1080,235,'#29212e',C.pink,20);text('有政策 · 现实',670,272,36,C.pink);grid(680,326,reality,20,C.pink,30);if(numbered)text(Math.round(reality)+' 人',1240,370,80,C.pink);else text('员工减少',1250,370,56,C.pink);
 if(show(7)){box(620,542,1080,235,'#1d1a23',C.grey,20,true);text(show(23)?'没有政策 · 反事实':'没有政策 · 假设的另一世界',670,588,36,C.grey);grid(680,646,cf,20,C.grey,30,true);if(numbered&&show(11))text(Math.round(cf)+' 人',1240,690,80,C.grey);else text('本来会怎样？',1230,690,45,C.grey);}
 if(show(12)&&t<35.727){bracket(1590,410,636,'+2',C.pink);text('同一时点比较',1540,830,31,C.pink,'center')}
 if(show(17)&&t<35.727){
 const identity=prog(17),date=show(18)?prog(18):0;
 for(const yy of [245,565]){box(1455,yy,215,43,C.panel,C.pink,8);text('门店 A',1562,yy+22,27,C.pink,'center')}
 line([[1670,267],[1750,267],[1750,587],[1670,587]],C.pink,3,false,identity);
 if(show(18)){for(const yy of [309,629]){box(1440,yy,230,43,C.panel,C.grey,8);text('同一观察日期',1555,yy+22,25,C.grey,'center')};line([[1670,331],[1720,331],[1720,651],[1670,651]],C.grey,3,true,date)}
 if(show(19)){tag('政策条件不同',1415,816,320,C.pink);line([[1420,459],[1420,777]],C.pink,4,true,prog(19))}
 }
 if(show(15)){line([[470,800],[1140,800]],C.line,3);text('前后：20 → 18   −2',750,858,33,t<29.469?C.pink:C.muted,'center')}
 if(show(20)){box(658,627,850,120,'#28232fec',null,10);text('未发生，无法直接观测',1090,680,45,C.grey,'center')}
 if(show(27)){text('18 − 20 = −2',1040,435,33,C.pink,'center');arrow(1450,438,1550,478,C.line);text('效果？',1630,490,30,C.muted,'center')}
 if(show(29)){text('18 − 16 = +2',1110,814,49,C.pink,'center');text('参照不同，问题不同',1110,871,32,C.muted,'center')}
}else if(t<74.536){
 title('为看不见的结果，寻找替身','比较的是变化；候选的身份始终保留');shop(115,358,280,'目标快餐店');box(113,665,300,105,null,C.grey,10,true);text('无政策结果 ？',263,716,35,C.grey,'center');
 const opts=[['外地零售','行业不同',false],['相似快餐','同类环境 / 无本次政策',true],['政策覆盖店','也受政策影响',false]];
 opts.forEach((a,i)=>{let x=600+i*405,sel=show(33);box(x,290,350,360,sel&&!a[2]?'#1c1922':'#302536',sel&&a[2]?C.pink:C.line,18);shop(x+55,324,240,a[0],a[2]?C.pink:C.grey);text(a[1],x+175,613,27,sel&&a[2]?C.pink:C.muted,'center');if(sel&&!a[2])line([[x+25,674],[x+325,674]],C.line,3);});
 if(show(34)){line([[1180,685],[1180,768],[450,768],[450,717],[412,717]],C.pink,4,true,prog(34));tag('变化相近？',730,741,280);text('传递变化，不替换门店',1210,847,35,C.muted,'center')}
 if(show(36)){tag('新泽西州 NJ',135,221,300);tag('宾州 PA',1020,221,310,C.grey)}
}else if(t<86.887){
 title('1992 · 两州政策差异','卡德与克鲁格 · 研究背景');
 const survey=show(41),move=survey?prog(41):0;
 for(let i=0;i<2;i++){let x=190+i*880,col=i?C.grey:C.pink;box(x,238,620,550,'#24202c',col,25);text(i?'宾州 PA':'新泽西州 NJ',x+310,289,46,col,'center');shop(x+180,415-65*move,260,'快餐业',col);
 let v=i?4.25:4.25+.8*w(38,'五点零五');if(!survey){text('$'+v.toFixed(2),x+310,724,66,col,'center');text('美元 / 小时',x+310,815,29,C.muted,'center');if(!i)arrow(x+500,750,x+500,680,C.pink,false,w(38,'五点零五'));else if(show(39))text('未同时上调',x+310,365,33,C.grey,'center')}
 else {text(i?'门店 P · 示意':'门店 N · 示意',x+310,621,31,col,'center');
 if(show(42)){const f=prog(42);for(const dx of [75,355]){box(x+dx,698,190,65,'#1b1820',col,10);text(dx===75?'政策前测量':'政策后测量',x+dx+95,731,27,col,'center')};line([[x+310,648],[x+310,677],[x+170,677],[x+170,698]],col,3,false,f);line([[x+310,677],[x+450,677],[x+450,698]],col,3,false,f);dot(x+310,648,7,col)}
 }}
 if(survey){tag('410 家快餐店 · 总样本',660,831,600,C.pink);text('图标只示意同一批门店，不表示州别数量',960,909,25,C.muted,'center')}
}else if(t<100){
 title('人数与工作量，是两种计量','全职当量 FTE · 折算概念示意');shop(127,301,380,'调查中的就业指标');person(710,735,1.55);person(1010,735,1.55,C.grey);
 text('兼职 A',710,788,31,C.pink,'center');text('兼职 B',1010,788,31,C.grey,'center');
 let f=show(46)?w(46,'一个全职'):0;box(633,410,160,50,C.panel,C.line,4);box(933,410,160,50,C.panel,C.line,4);box(633+630*f,410+130*f,80,50,C.pink,null,4);box(933+410*f,410+130*f,80,50,C.grey,null,4);
 if(show(45)){text('半天',710,367,34,C.pink,'center');text('半天',1010,367,34,C.grey,'center')}
 if(show(46)){box(1250,526,186,79,null,C.ink,8);text('1 全职当量',1450,675,52,C.pink,'center');text('2 个人仍是 2 个人',870,859,40,C.ink,'center')}
}else if(t<132.938){
 title(t<124.291?'为什么还要调查宾州？':'两个州 × 两个时期',t<124.291?'可能的共同环境 · 机制示意':'非随机分组 · 同组前后测量');
 shop(240,410,380,'新泽西州 NJ');shop(1300,410,380,'宾州 PA',C.grey);
 node('最低工资上调',190,232,410);arrow(395,320,425,405,C.pink,false,p(100,102));
 if(show(50)){node(show(51)?'假设：经济不佳':'行业环境也可能变化',760,232,400,88,C.grey,true);line([[960,320],[960,359],[625,440]],C.grey,4,true,prog(50));if(show(55))line([[960,359],[1290,440]],C.grey,4,true,prog(55));}
 if(show(52)){let lose=w(52,'少用人');for(let i=0;i<7;i++){let a=i<3?1:1-lose;c.globalAlpha=a;box(180+i*62,690,45,55,C.panel,C.pink,5);line([[190+i*62,706],[215+i*62,706]],C.pink,2);c.globalAlpha=1;}arrow(640,716,790,716);grid(815,681,20-6*lose,20,C.pink,23);text('订单变少 → 用工减少',582,834,38,C.ink,'center')}
 if(show(57)&&t<124.291){line([[1490,709],[1490,828],[1110,828]],C.grey,4,true,prog(57));tag('需假设变化相近',1200,855,380,C.grey)}
 if(show(59)){box(130,677,1650,190,C.panel,C.line);text('政策前',720,725,36,C.grey);text('政策后',1260,725,36,C.pink);line([[470,755],[1580,755]],C.line,2);text('同一组 NJ',245,803,30,C.pink);text('同一组 PA',245,846,30,C.grey);for(let y of [803,846]){dot(780,y);dot(1320,y);line([[800,y],[1300,y]],C.line,3,false,show(62)?prog(62):0)}if(show(61))text('按州政策形成，非随机分派',960,201,31,C.muted,'center');}
}else if(t<213.620){
 title(show(95)&&w(95,'双重差分')>.5?'双重差分': '两次相减，保留每一步来源','教学算例 · 非论文数据 · 平均每家 / 全职当量 FTE');
 const bx=420,ax=960; text('政策前',bx+160,236,36,C.grey,'center');text('政策后',ax+160,236,36,C.grey,'center');
 ['新泽西 NJ','宾州 PA'].forEach((lab,i)=>{let y=307+i*250,col=i?C.grey:C.pink;node(lab,95,y+12,275,96,col);text(i?'未上调':'上调最低工资',230,y+145,27,col,'center');box(bx-25,y-20,410,190,'#29232f',C.line,12);box(ax-25,y-20,410,190,'#29232f',C.line,12);if(show(66)){grid(bx,y+6,20*prog(66),20,col,25);text('20',bx+327,y+104,60,col,'center')};if(show(i?69:68)){let n=i?20-4*w(69,'十六'):20-2*w(68,'十八');grid(ax,y+6,n,20,col,25);text(String(Math.round(n)),ax+327,y+104,60,col,'center');}line([[bx+392,y+85],[ax-40,y+85]],col,3,false,show(68)?prog(68):0);
 if(show(i?72:71)){let ok=i?w(72,'少了四个'):w(72,'少了两个');if(!i)ok=Math.max(ok,show(72)?1:0);text(i?'16 − 20':'18 − 20',1450,i?605:310,34,col);if(ok>0)text(i?'−4':'−2',1540,i?672:385,70,col,'center');}
 });
 if(show(74)&&!show(76)){arrow(1660,410,1760,410,C.line);text('政策效果？',1590,792,34,C.muted,'center');text('还缺一个参照输入',1550,850,30,C.pink,'center')}
 if(show(76)){const x0=930,yy=802,scale=110;line([[x0-4.7*scale,yy],[x0+scale,yy]],C.line,3);[-4,-2,0].forEach(v=>{dot(x0+v*scale,yy,5,C.grey);text(String(v).replace('-','−'),x0+v*scale,yy+37,29,C.grey,'center')});if(show(77))arrow(x0,yy-32,x0-4*scale,yy-32,C.grey,false,prog(77));arrow(x0,yy-80,x0-2*scale,yy-80,C.pink,false,prog(76));if(show(79)){arrow(x0-4*scale,yy+76,x0-2*scale,yy+76,C.pink,false,w(79,'正二'));text('(−2) − (−4) = +2',1410,846,48,C.pink,'center');}}
 if(show(82)&&!show(84)){box(90,538,1690,224,null,C.grey,16);text('宾州：无政策，也少了 4',1520,230,29,C.grey,'center')}
 if(show(84)){box(470,480,820,67,'#17131f',C.pink,12,true);text('假设无政策：两州变化大致相同',880,514,31,C.pink,'center');}
 if(show(86)){let f=w(86,'少四个');line([[1640,663],[1755,663],[1755,495],[1710,495]],C.grey,4,true,f);box(1395,458,315,98,C.panel,C.grey,10,true);text(f>.9?'反事实：20 − 4':'迁移变化 −4',1550,487,28,C.grey,'center');if(show(87))text('16',1550,532,38,C.grey,'center');}
 if(show(89)){line([[1320,412],[1359,412],[1359,523],[1390,523]],C.pink,3,false,prog(89));text('18 − 16 = +2',1560,246,37,C.pink,'center')}
 if(show(93)&&!show(95)){let f=prog(93);line([[747,452],[1287,452]],C.pink,7,false,f);dot(747+540*f,452,10,C.pink);text('现实前后：20 → 18',990,907,29,C.pink,'center');
 if(show(94)){line([[1550,535],[1360,535],[1360,412],[1320,412]],C.pink,7,false,prog(94));text('同日比较：16 → 18',1490,907,29,C.pink,'center')}}
 if(show(95)&&!show(97)){let f=p(k.cap(95).start,k.cap(95).start+1.05),g=p(k.cap(95).start+1.05,k.cap(95).end);for(const yy of [385,672])line([[1440,yy-45],[1390,yy-45],[1390,yy+46],[1678,yy+46]],C.pink,4,false,f);line([[1678,385],[1800,385],[1800,846],[1690,846]],C.pink,5,false,g);line([[1678,672],[1800,672]],C.grey,4,false,g);text('两条州内变化 → 再求差',1420,907,30,C.pink,'center')}
 if(show(97)){box(75,690,1770,215,'#1b1721ed',C.line,16);text('宾州凭什么是好替身？',290,742,37,C.ink);line([[350,842],[830,800]],C.grey,5,true);line([[1000,842],[1480,800]],C.pink,5,true);text(show(102)?'平行趋势假设':'无政策时，变化应该大致一样',960,864,38,C.pink,'center');}
}else if(t<244.620){
 const failure=show(107)&&!show(114),success=show(114);title(failure?'相同起点，不保证一起走':success?'不同起点，也能比较变化':'平行的是变化，不一定是起点',failure?'另一假设情景 · 宾州特有恶化':success?'另一教学假设 · 与主算例分开':'教学示意 · 无政策条件');
 const yA=success?310:390-100*p(218.075,221.1),yB=570;let loss=failure?180*w(109,'走下坡路'):110;
 line([[300,yA],[1280,yA+110]],C.pink,7,true);line([[300,yB],[1280,yB+loss]],C.grey,7,true);text('新泽西 NJ',160,yA-55,39,C.pink);text('宾州 PA',160,yB-55,39,C.grey);dot(300,yA);dot(300,yB,9,C.grey);
 if(success){text(show(115)?'25':'',440,yA-60,57,C.pink,'center');text(show(116)?'20':'',440,yB-60,57,C.grey,'center');if(show(117)){bracket(1320,yA,yA+110,'−4');bracket(1320,yB,yB+110,'−4',C.grey)}if(show(118)){arrow(1540,620,1540,380,C.grey,false,prog(118));text('两条变化等长',1530,735,37,C.pink,'center');text('共同变化可抵消',1530,800,34,C.grey,'center')}}
 else if(failure){if(show(108)){text('20',440,yA-60,57,C.pink,'center');text('20',440,yB-60,57,C.grey,'center')}node('宾州特有因素',840,745,380,78,C.grey,true);arrow(1030,746,1030,yB+loss,C.grey,true,prog(109));if(show(111))text('−4 中可能混入宾州自己的变化',620,850,33,C.grey);if(show(112)){line([[1280,yB+loss],[1600,yB+loss],[1600,yA+loss]],C.grey,4,true,prog(112));if(show(113)){bracket(1650,yA+110,yA+loss,'高估',C.pink);text('错误迁移会压低反事实',1300,216,32,C.pink,'center')}}}
 else {bracket(1360,yA,yA+110,'同幅变化');bracket(1360,yB,yB+110,'同幅变化',C.grey);text('起点可以不同',650,818,43,C.ink,'center')}
}else if(t<272.179){
 title('假设需要理由','检查方法示意 · 旁证不等于直接证实');node('宾州变化',120,362,340,100,C.grey);node('NJ 无政策结果',1410,362,370,100,C.pink,true);line([[460,412],[1410,412]],C.pink,4,true);tag('平行趋势？',755,382,370);box(1350,500,440,130,'#2b2433',C.line,12,true);text('无法直接观测',1570,565,39,C.grey,'center');
 if(show(123)){shop(160,640,210,'同行业',C.grey);shop(530,640,210,'相近环境');line([[390,745],[507,745]],C.grey,4,false,prog(123));line([[450,638],[780,458]],C.line,3,true)}
 if(show(124)){line([[870,650],[1040,680],[1190,700]],C.pink,4);line([[870,716],[1040,746],[1190,766]],C.grey,4);text('政策前走势',1020,822,33,C.muted,'center');line([[1050,620],[1080,458]],C.line,3,true)}
 if(show(126)){node('单州新情况？',1340,714,430,92,C.grey,true);arrow(1540,714,1570,468,C.grey,true,prog(126));}
 if(show(128)){box(115,230,1220,77,'#372638',C.pink,12,true);text(show(129)?'假设：仅一州需求突然变化':'假设：仅一州有其他重大政策',725,269,36,C.pink,'center');line([[1335,270],[1810,270],[1810,410],[1780,410]],C.pink,4,true,prog(128));}
 if(show(130))text('单州作用不会被共同差分扣掉',950,883,35,C.pink,'center');
}else if(t<297.852){
 title('回到真实研究','卡德与克鲁格 · 1992 年 · 两州快餐店');shop(185,340,340,'新泽西 NJ');shop(840,340,340,'宾州 PA',C.grey);line([[1280,340],[1280,750]],C.line,3);text('相对就业变化',1510,286,37,C.ink,'center');
 if(show(135)){text('未发现相对下降',1485,415,40,C.ink,'center');line([[1340,554],[1670,554]],C.grey,5);}
 if(show(136)){arrow(1530,550,1530,470,C.pink,false,w(136,'更高'));text('主要比较中更高',1510,634,36,C.pink,'center');text('方向示意，无新增效应数',1510,702,26,C.muted,'center');}
 if(show(137)){box(170,716,935,135,'#24212b',C.line,15);text('教学档案：20、18、16、+2',636,757,37,C.muted,'center');text('不是论文估计',636,811,33,C.muted,'center');}
 if(show(140)){box(130,246,1105,441,null,C.pink,22);text('本次调整 · 这些快餐店',688,645,32,C.pink,'center');}
 if(show(141)){tag('其他地方？',1390,774,370,C.grey);tag('不同涨幅？',1390,845,370,C.grey);line([[1260,745],[1330,795]],C.line,3,true);}
}else{
 title(t<306.831?'可信度，落在替身为什么合适':'看到前后变化，再追问一步','比较结构 · 不新增研究结论');
 node('政策前',120,332,300,100,C.grey);node('政策后 · 实况',710,332,410,100,C.pink);arrow(420,382,710,382,C.grey);text('现实发生了什么',620,480,35,C.muted,'center');
 const reading=show(148),slot=!reading||show(150);
 if(reading&&!show(150)){node('政策造成？',1400,332,380,100,C.grey,true);line([[1120,382],[1310,382]],C.line,3,true,prog(148));if(show(149)){line([[1308,350],[1308,414]],C.pink,6);text('先补比较参照',1480,505,36,C.pink,'center')}}
 if(slot){let f=reading?prog(150):1;line([[915,432],[915,432+215*f]],C.pink,5,true);box(710,647,550,100*f,C.panel,C.grey,14,true);if(f>.7)text('没有政策 · 本来怎样？',985,697,34,C.grey,'center');text('同一时间',1130,548,31,C.pink,'center');}
 if(!reading||show(152)){node('替身的变化',1400,647,390,100,C.grey);arrow(1400,697,1260,697,C.grey,true,reading?prog(152):1);tag('需合理的比较假设',1380,535,430);}
 if(show(152)){line([[650,500],[650,621]],C.line,2,true);arrow(650,525,430,525,C.pink,false,prog(152));arrow(650,587,210,587,C.grey,false,p(k.cap(152).start+.25,k.cap(152).start+1));text('同一原点比较变化',400,733,29,C.grey,'center');if(show(153)){arrow(210,651,430,651,C.pink,false,prog(153));text('留下差额',320,694,29,C.pink,'center')}text('前后变化',260,233,38,C.grey);text('− 本来变化',750,233,38,C.grey);if(show(153))text('= 额外差异',1280,233,42,C.pink);}
 if(show(154)){line([[1590,646],[1590,462],[1480,462]],C.pink,4,true,prog(154));text('替身够相似吗？',1510,403,42,C.pink,'center');text('还有单州特有事件吗？',1510,844,32,C.muted,'center')}
}
k.subtitles();}
module.exports={render};
