/* 扁平矢量组件（mg-styles-15 / 01-flat-vector 规范）：纯色几何、无描边、无渐变/阴影；角色无五官。
   覆盖 KIT.icon：同名接口，(x,y) 为中心，size 为边长。tone: pink=本屏焦点色 | g=中性 | ink=前景色 */
(function(){
const K=window.KIT;
const r=(x,y,w,h,c,rx=0)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${c}"/>`;
const ci=(x,y,R,c)=>`<circle cx="${x}" cy="${y}" r="${R}" fill="${c}"/>`;
const pa=(d,c)=>`<path d="${d}" fill="${c}"/>`;
const st=(d,c,w=8)=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const TONE={pink:'var(--pink)',g:'var(--g2)',ink:'var(--ink)'};
const tone=t=>TONE[t]||t;
/* 半身像（头+躯干），用于图标尺寸 */
function bust(c,hairStyle=0){return ci(0,-34,22,'var(--SK)')+(hairStyle?pa('M-24 -36 Q-26 -64 0 -64 Q26 -64 24 -36 L24 -14 Q16 -10 16 -30 Q10 -52 -16 -48 Q-18 -30 -16 -14 Q-26 -14 -24 -36Z','var(--INK)'):pa('M-23 -38 Q-22 -62 2 -60 Q24 -58 23 -38 Q12 -50 -23 -38Z','var(--INKW)'))+pa('M-40 48 Q-42 6 -26 -4 Q0 -12 26 -4 Q42 6 40 48Z',c)}
const DRAW={
  user:(c)=>bust(c,0),'user-round':(c)=>bust(c,1),
  users:(c)=>`<g transform="translate(-30 6) scale(.8)">${bust('var(--g2)',1)}</g><g transform="translate(30 6) scale(.8)">${bust('var(--g2)',0)}</g><g transform="translate(0 0)">${bust(c,0)}</g>`,
  store:(c)=>{let s='';for(let i=0;i<6;i++)s+=pa(`M${-48+i*16} -14 L${-32+i*16} -14 L${-32+i*16} -2 Q${-40+i*16} 6 ${-48+i*16} -2Z`,i%2?'var(--CR)':c);
    return r(-52,-34,104,22,c,5)+r(-48,-14,96,62,'var(--CR)')+s+r(-38,6,40,26,'var(--INKW)',3)+r(12,4,26,44,'var(--CRS)',3)+r(-54,46,108,6,'var(--CRS)',3)},
  ticket:(c)=>pa('M-44 -26 L44 -26 L44 -9 A9 9 0 0 0 44 9 L44 26 L-44 26 L-44 9 A9 9 0 0 0 -44 -9Z',c)+r(-30,-11,40,6,'var(--CR)',3)+r(-30,4,26,6,'var(--CR)',3)+ci(26,0,7,'var(--CR)'),
  fuel:(c)=>r(-26,-38,52,76,c,9)+r(-17,-27,34,22,'var(--CR)',4)+st('M26 -14 Q42 -14 42 4 L42 26',c,6)+r(-34,36,68,9,'var(--INKW)',4),
  cigarette:(c)=>r(-26,-34,52,74,c,8)+r(-26,-34,52,22,'var(--INKW)',8)+r(-14,-50,8,20,'var(--CR)',2)+r(-2,-47,8,17,'var(--CR)',2)+r(10,-52,8,22,'var(--CR)',2),
  'shopping-basket':(c)=>st('M-18 -12 Q0 -46 18 -12',c,6)+pa('M-36 -12 L36 -12 L28 34 L-28 34Z',c)+r(-24,0,48,6,'var(--INKW)',3)+r(-20,14,40,6,'var(--INKW)',3),
  calendar:(c)=>r(-38,-30,76,68,'var(--CR)',8)+r(-38,-30,76,20,c,8)+r(-24,-40,8,18,'var(--INKW)',3)+r(16,-40,8,18,'var(--INKW)',3)+[0,1,2].map(i=>[0,1].map(j=>r(-26+i*20,-2+j*18,12,10,'var(--CRS)',2)).join('')).join(''),
  landmark:(c)=>pa('M-44 -14 L0 -42 L44 -14Z',c)+[0,1,2,3].map(i=>r(-34+i*20,-8,10,40,'var(--CR)',2)).join('')+r(-46,34,92,10,c,3),
  'toggle-right':(c)=>r(-44,-22,88,44,c,22)+ci(22,0,16,'var(--CR)'),
  'toggle-left':(c)=>r(-44,-22,88,44,'var(--g3)',22)+ci(-22,0,16,'var(--CR)'),
  'clipboard-pen':(c)=>r(-28,-36,56,72,'var(--CR)',6)+r(-14,-42,28,12,c,4)+r(-16,-12,32,6,'var(--CRS)',3)+r(-16,2,24,6,'var(--CRS)',3)+st('M-12 22 L-4 30 L14 12',c,6),
  register:(c)=>r(-50,-20,100,50,c,8)+r(-36,-44,72,30,'var(--INKW)',6)+r(-26,-36,52,12,'var(--MI)',3)+r(-40,26,80,10,'var(--INKW)',4),
};
K.icon=(id,name,x,y,size=96,t='ink')=>{const d=DRAW[name];if(!d)throw Error('无此扁平图形 '+name);return `<g id="${id}"><g transform="translate(${x} ${y}) scale(${size/100})">${d(tone(t))}</g></g>`};
/* 全身角色：手臂以肩为锚点旋转（扁平 MG 常用 rig）。无五官。 */
K.figure=(id,x,y,{s=1,shirt='var(--CO)',shirtD='var(--COD)',apron=null,hair='var(--INKW)',hairStyle=0,armL=-8,armR=8,legs=true}={})=>{
  const arm=(sx,ang,c,cls)=>`<g class="${cls}" transform="translate(${sx} -150) rotate(${ang})">${r(-16,0,32,128,c,16)}${ci(0,130,17,'var(--SK)')}</g>`;
  return `<g id="${id}"><g transform="translate(${x} ${y}) scale(${s})">
   ${legs?r(-46,0,36,120,'var(--INKW)',14)+r(10,0,36,120,'var(--INKW)',14)+r(-56,112,52,18,'var(--INK)',9)+r(4,112,52,18,'var(--INK)',9):''}
   ${arm(-62,armL,shirtD,'armL')}
   ${pa('M-70 -170 Q-72 -40 -60 6 L60 6 Q72 -40 70 -170 Q0 -200 -70 -170Z',shirt)}
   ${apron?pa('M-40 -150 L40 -150 L46 6 L-46 6Z',apron)+r(-22,-110,44,26,'var(--CR)',6):''}
   ${r(-16,-215,32,40,'var(--SKD)',10)}${ci(0,-252,48,'var(--SK)')}
   ${hairStyle==0?pa('M-50 -258 Q-48 -312 4 -306 Q52 -300 50 -256 Q30 -282 -50 -258Z',hair):pa('M-52 -250 Q-56 -310 0 -308 Q58 -306 54 -246 L54 -200 Q40 -190 40 -230 Q30 -280 -40 -270 Q-44 -230 -40 -200 Q-56 -200 -52 -250Z',hair)}
   ${arm(62,armR,shirtD,'armR')}</g></g>`};
/* 对话气泡：tail 指向 (tx,ty) */
K.bubble=(id,x,y,w,h,tx,ty,c='var(--CR)')=>{const cx=x+w/2,cy=y+h/2,ang=Math.atan2(ty-cy,tx-cx),bx=cx+Math.cos(ang)*Math.min(w,h)*.35,by=cy+Math.sin(ang)*Math.min(w,h)*.35,nx=-Math.sin(ang)*26,ny=Math.cos(ang)*26;
  return `<g id="${id}">${r(x,y,w,h,c,h/2)}${pa(`M${bx+nx} ${by+ny} L${tx} ${ty} L${bx-nx} ${by-ny}Z`,c)}</g>`};
/* 扁平节点：实心圆 */
K.node=(id,x,y,n,{r:R=34}={})=>`<g id="${id}">${ci(x,y,R,'var(--g4)')}<text x="${x}" y="${y+11}" text-anchor="middle" style="fill:var(--ink);font-size:32px;font-weight:700">${n}</text></g>`;
K.nodeOn=(id,x,y,n,{r:R=34}={})=>`<g id="${id}">${ci(x,y,R,'var(--pink)')}<text x="${x}" y="${y+11}" text-anchor="middle" style="fill:var(--INK);font-size:32px;font-weight:700">${n}</text></g>`;
K.ring=(id,x,y,R=28)=>`<circle id="${id}" cx="${x}" cy="${y}" r="${R}" fill="var(--g4)"/>`;
K.bar=(id,x,y,w,h,{tone:t='g',dashed=false}={})=>`<rect id="${id}" data-origin="center bottom" x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="${dashed?'none':t==='pink'?'var(--pink)':'var(--g3)'}" ${dashed?'stroke="var(--g1)" stroke-width="5" stroke-dasharray="12 12"':''}/>`;
K.FLAT={r,ci,pa,st};
})();
