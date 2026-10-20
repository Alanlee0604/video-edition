'use strict';
// A persistent evidence desk. Camera and comparison overlays inspect existing
// observations; no result series is restarted during the concluding review.
const REVIEW_RECTS={all:[70,164,1790,707],pair:[60,170,370,700],time:[422,159,955,387],pre:[426,162,526,379],outcomes:[1403,154,457,395],history:[420,548,1440,332]};
const REVIEW_FOCUS={164:'all',165:'all',166:'all',167:'pre',168:'pre',169:'pre',170:'pre',171:'pre',172:'pre',173:'outcomes',174:'outcomes',175:'history',176:'history',177:'history',178:'all',179:'all',180:'all',181:'pair',182:'pair',183:'time',184:'outcomes',185:'history',186:'all',187:'all',188:'pair',189:'pair',190:'pair',191:'all',192:'all',193:'all',194:'time',195:'time',196:'all',197:'all'};
function reviewEvent(t){return REMAINDER_EVENTS.find(x=>x.caption_start<=t&&t<x.caption_end)||[...REMAINDER_EVENTS].reverse().find(x=>x.caption_start<=t)||REMAINDER_EVENTS[0]}
function reviewCameraFor(key){const a=REVIEW_RECTS[key],z=Math.min(1.48,1740/a[2],664/a[3]);return{cx:a[0]+a[2]/2,cy:a[1]+a[3]/2,z}}
function reviewCamera(t,n,q){let from=reviewCameraFor(REVIEW_FOCUS[n-1]||'history'),to=reviewCameraFor(REVIEW_FOCUS[n]||'all');if(n===197)to={...to,z:to.z*.98};return{cx:lerp(from.cx,to.cx,q),cy:lerp(from.cy,to.cy,q),z:lerp(from.z,to.z,q)}}
function reviewWorld(f,camera){save(()=>{g.beginPath();g.rect(45,146,1830,720);g.clip();g.translate(960,504);g.scale(camera.z,camera.z);g.translate(-camera.cx,-camera.cy);f()})}
function reviewBracket(x,y,w,h,q=1,col=C.pink){const z=clamp(q),pts=[[x+w*.32,y],[x,y],[x,y+h],[x+w,y+h],[x+w,y],[x+w*.68,y]];rtrace(pts,{q:z,color:col,w:3})}
function reviewPointer(a,b,q,labelText=''){rarrow(a,b,C.pink,3,q);if(labelText&&q>.8)text(labelText,b[0],b[1]-22,23,C.ink,'center')}
function reviewPrediction(points,q=1){save(()=>{g.setLineDash([11,9]);line(points.map(([x,y])=>[x+110*(1-q),y]),'#d5b9c9',5)})}
function reviewConditions(q=1){const xs=[745,1080,1460];for(let i=0;i<3;i++){const u=clamp(q*3-i);if(!u)continue;let x=xs[i];save(()=>{g.setLineDash([10,8]);rr(x-116,766,232,62*u,5,'#2d2433','#b59bae',2)});if(u>.45)text(['同时出现？','同时消失？','同时回来？'][i],x,796,22,C.ink,'center')}}
function reviewOutcomePrediction(q=1){for(let i=1;i<4;i++){const y=275+i*60;reviewPrediction([[1633,y+14],[1768,y-22]],q);text('预测',1656,y-30,16,C.gray)}}
function reviewActualConflicts(q=1){const xs=[463,899,1335],labels=['原来上涨：前趋势不符','整店变旺：辅助结果不符','同期原因：仍需时间条件'];for(let i=0;i<3;i++){const u=clamp(q*3-i);if(!u)continue;const x=xs[i],y=526;save(()=>{g.setLineDash([9,7]);rr(x,y,420,37,4,'#302636','#a5889e',2)});text(labels[i],x+45,y+19,20,C.ink);if(i<2){line([[x+12,y+9],[x+12+18*u,y+9+18*u]],C.pink,3);if(u>.5)line([[x+12,y+27],[x+12+18*(u-.5)*2,y+27-18*(u-.5)*2]],C.pink,3)}else text('？',x+23,y+19,25,C.pink,'center')}}

function reviewRegistration(q,n){const x=lerp(165,467,q),y=lerp(408,281,q),z=lerp(.43,1.48,q);alpha(q,()=>rr(443,260,751,415,8,'#302636','#a88ba2',2));rSign(x,y,z);if(q>.6){text('原签名保留',1011,293,25,C.ink,'center');text('T01 / O01',1011,347,26,C.pink,'center');text('自愿报名',1011,405,30,C.ink,'center');text('未变成随机分派',1011,473,26,C.gray,'center')}if(n===190){const xx=x+61*z,yy=y+103*z;reviewBracket(xx,yy,155*z,39*z,1,C.pink)}}

const REVIEW_ACTIONS={
 164:'从活动历史拉远到同一门店、时间、商品和开停记录的完整证据工作面',
 165:'取回既有预测透明层，移至对应观察坐标旁',166:'将预测层向同变量的实际记录对齐',167:'镜头沿完整工作面移动至活动前记录',
 168:'将原有差异假设与保留的未知老板栏连接到前趋势检验',169:'展示只针对不同前趋势的条件预测',170:'把预测与相近下降实际记录对齐，定位不符处',
 171:'取回原来上涨的预测并滑入T01前活动记录',172:'检查实际下降线，定位预测方向冲突',173:'取回共同原因对其他商品的上升预测',174:'逐行比较三个商品预测与未相应上升记录',
 175:'在既有开停记录旁打开未知原因条件位置',176:'三个待证时间条件依次对齐参加、退出、恢复日期',177:'括起同时需要满足的条件，保持待证问号',
 178:'活动解释依次对应四类已经存在的证据',179:'保留替代解释可拟合部分，定位其余冲突和未知',180:'保留整体证据关系供阅读',
 181:'镜头返回同一对门店并展开已匹配条件',182:'从已知字段移动到未测量老板栏，保留未知',183:'移动检查窗查看既有前后时间记录',184:'镜头回到辅助结果，逐项定位共同上升预测不符处',185:'沿既有参加、退出、恢复记录检查多个结果转折',
 186:'依次暂时单看一项证据并保留其未回答的问题，末尾恢复整体',187:'把一个替代解释的条件框对到四项观察，不能只遮住其中一项',188:'停在未匹配位置，并回到原自愿报名记录',
 189:'展开同一份原报名记录，比较页不改变分组来源',190:'定位已有签名和自愿报名来源，不重复签名',191:'依次定位已讨论替代解释的具体冲突',192:'把相符部分与仍需额外条件的部分分开，未检可能性保留',193:'过强全排除结论停在未检可能性前并被否定',
 194:'镜头定位原T01活动后销量增加记录',195:'从销量增加直接归因的箭头停在缺失证据接点',196:'从原观察集合打开若不是活动的解释位置',197:'拉远展示完整四维观察集合和开放的其他解释位置'
};
function drawReviewMotion(t){const ev=reviewEvent(t),n=ev.caption,q=rq(t,n),cam=reviewCamera(t,n,q);rbase();rtype(n<186?'模式比对 · 在同一组证据中逐项核对':n<194?'比较加强了证据，报名方式始终未变':'回到最初的问题');
 reviewWorld(()=>{rSummaryWall();
  // These are the original observations. All animated marks below are a
  // prediction, comparison instrument, or retrieval motion, not new data.
  if(n===164)reviewBracket(429,168,1420,698,q);
  if(n===165||n===166){const u=n===165?q:1;reviewPrediction([[482,365],[868,280]],u);reviewOutcomePrediction(u);if(n===166){reviewBracket(460,265,443,201,q);reviewBracket(1617,326,173,166,q)}}
  if(n===167){const x=lerp(482,860,q);line([[x,249],[x,464]],C.pink,3);text('活动前',681,487,24,C.ink,'center')}
  if(n===168){reviewPointer([341,450],[480,339],q);text('如果原有差异表现为不同走势',715,235,23,C.ink,'center')}
  if(n===169||n===170){const z=n===169?q:1;reviewPrediction([[482,350],[868,259]],z);reviewPrediction([[482,383],[868,469]],z);text('若原有差异表现为不同走势（预测）',733,235,21,C.ink,'center');if(n===170){reviewBracket(480,270,393,192,q);const xx=lerp(488,865,q);line([[xx,280+(xx-482)*69/386],[xx,383+(xx-482)*67/386]],'#dcc6d4',3)}}
  if(n===171||n===172){reviewPrediction([[482,350],[868,274]],n===171?q:1);text('原来上涨的预测',688,238,24,C.ink,'center');if(n===172){const xx=lerp(482,868,q),yy=280+(xx-482)*69/386;ell(xx,yy,13,13,null,C.pink,3);line([[xx,yy],[xx,350-(xx-482)*76/386]],C.gray,2)}}
  if(n===173||n===174||n===184){reviewOutcomePrediction(n===173?q:1);if(n!==173){for(let i=1;i<4;i++){const u=clamp(q*3-(i-1));if(u)reviewBracket(1613,252+i*60,173,44,u)}}}
  if(n===175){const w=440*q;save(()=>{g.setLineDash([12,9]);rr(1112,758,w,70,5,'#2e2534',C.gray,2)});if(q>.5)text('其他原因 ？',1328,794,27,C.ink,'center')}
  if(n===176||n===177){reviewConditions(n===176?q:1);if(n===177)reviewBracket(613,756,977,82,q)}
  if(n===178){rr(939,139,220,60,6,'#805b77','#c39caf',2);text('活动解释',1049,169,27,C.ink,'center');rr(92,378,286,28,4,'#49384a','#9f7e96',1);text('同品牌 / 区域 / 原份额',235,392,20,C.ink,'center');const targets=[[233,389],[885,345],[1650,381],[1173,704]];for(let i=0;i<4;i++)reviewPointer([1049,199],targets[i],clamp(q*4-i));}
  if(n===179||n===180){text('已讨论的其他解释：保留相符部分，核对不符与待证部分',1125,154,24,C.ink,'center');reviewActualConflicts(n===179?q:1);}

  if(n===181){let dx=280*q;rr(351,308,dx,248,6,'#332938','#987b94',2);if(q>.35){text('连锁 A · 同区域',373,349,25,C.ink);text('原彩票市场份额相近',373,399,22,C.gray);line([[373,452],[373+216,452]],C.pink,9);save(()=>{g.setLineDash([15,12]);line([[373,500],[373+208,500]],C.gray,7)})}}
  if(n===182){const yy=lerp(432,741,q);reviewBracket(83,yy,302,99,1);text('未测量，不画确定高低',200,904,23,C.gray,'center')}
  if(n===183){const xx=lerp(482,1299,q);line([[xx,239],[xx,482]],C.pink,3)}
  if(n===185){const xx=lerp(744,1758,q);line([[xx,652],[xx,826]],C.pink,3);text('既有记录，不再重画',1240,859,23,C.gray,'center')}
  if(n===186){const stage=Math.min(3,Math.floor(q*4.5)),keys=['pair','time','outcomes','history'];if(q<.94)for(let i=0;i<4;i++)if(i!==stage){const a=REVIEW_RECTS[keys[i]];alpha(.65,()=>rr(...a,4,C.bg))}const a=REVIEW_RECTS[keys[stage]];reviewBracket(...a,1);text(['仍有未测量差异','仍有同期其他事件','仍有只影响彩票的原因','还需要可逆性等前提'][stage],1050,885,25,C.ink,'center')}
  if(n===187){const targets=[[79,174,320,676],[426,165,934,368],[1420,165,430,367],[426,558,1424,310]];for(let i=0;i<4;i++)reviewBracket(...targets[i],clamp(q*4-i),C.gray)}
  if(n===188){reviewActualConflicts(1);reviewRegistration(q,n)}
  if(n===189||n===190)reviewRegistration(1,n);
  if(n===189){for(let i=0;i<3;i++){const x=lerp(1180,871,q),y=311+i*73;rr(x,y,250,51,5,'#3a2e40','#947a90',2);text(['配对记录','前后观察','其他结果'][i],x+125,y+26,22,C.gray,'center')}line([[843,309],[843,545]],C.pink,4);}
  if(n===190){const xx=lerp(527,790,q);line([[xx,430],[xx,501]],C.pink,4)}
  if(n===191)reviewActualConflicts(q);
  if(n===192){reviewActualConflicts(1);const xx=lerp(480,825,q);line([[xx,282],[xx,467]],C.gray,4);text('仅符合部分，仍需额外条件',1035,886,27,C.ink,'center')}
  if(n===193){const w=lerp(210,1150,q);rr(473,367,w,127,6,'#302635','#a5819d',2);text('一切干扰都排除了？',1010,410,31,C.gray,'center');line([[650,442],[lerp(650,1370,q),442]],C.pink,4)}
  if(n===194){const xx=lerp(877,1299,q),yy=349-(xx-868)*84/431;ell(xx,yy,15,15,null,C.pink,4);text('T01 · 销量增加',1118,401,28,C.pink,'center')}
  if(n===195){rarrow([906,473],[1230,325],C.gray,4,Math.min(.66,q));rr(1104,375,98,74,5,'#332438',C.pink,3);text('？',1153,412,36,C.pink,'center');text('还需要解释其他证据',1075,499,24,C.gray,'center')}
  if(n===196||n===197){save(()=>{g.setLineDash([12,10]);rr(463,862,1331*(n===196?q:1),38,5,'#2c2232',C.gray,2)});if(n===197||q>.55)text('如果不是活动，还有什么能同时解释？',1125,881,26,C.ink,'center');if(n===197){const targets=[[257,389],[858,357],[1655,389],[1200,719]];for(let i=0;i<4;i++)reviewPointer([1125,879],targets[i],clamp(q*4-i))}}
 },cam);
 const captions={168:'只检验“原差异表现为不同走势”这一项预测',169:'不同前趋势是条件预测，不代表所有原有差异',170:'相近前趋势，没有消除全部老板差异',172:'实际活动前方向向下',174:'区分力来自另外三类结果',176:'条件保持问号，未当作真实事件',177:'更多需要解释的条件，不是概率估计',178:'活动解释与已观察模式更一致',179:'已讨论替代解释的局部相符仍保留',181:'可见条件相近，未测部分仍未知',186:'单看一项，仍有未回答的问题',189:'观察再多，也不改变自愿报名来源',190:'查看原签名，不重新报名',192:'未检的其他可能性仍保留',193:'不能宣称一切干扰已排除',195:'结果改善，还不足以独自完成因果解释'};
 rnote(captions[n]||'书中描述 · 定性证据比对，非原始数值');
 if(n>=188){rr(1464,84,372,49,5,'#302834','#7f697f');text('未检的其他可能 ？',1650,109,23,C.gray,'center')}
 return {caption:n,progress:q,camera:cam,action:REVIEW_ACTIONS[n],observedEvidenceReplayed:false,registrationResigned:false,unmeasuredOwnerFieldsPreserved:true};
}
rReview=drawReviewMotion;
rConclusion=drawReviewMotion;
const beforeReviewMotionDebug=window.debugState;
window.debugState=t=>{const d=beforeReviewMotionDebug(t);if(t<319.218021)return d;const ev=reviewEvent(t);return{...d,reviewMotion:{caption:ev.caption,action:REVIEW_ACTIONS[ev.caption],progress:rq(t,ev.caption),camera:reviewCamera(t,ev.caption,rq(t,ev.caption)),observedEvidenceReplayed:false,registrationResigned:false,unmeasuredOwnerFieldsPreserved:true}}};
