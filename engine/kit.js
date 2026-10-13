/* 极简几何组件库：细线 2–3px、统一圆角、无面板/阴影/渐变；“店”“人”用几何符号或点阵。
   坐标基于 1920×1080；水平位置请用 ENGINE.G(栏) 对齐 12 栏网格。 */
(function(){
const G=c=>120+c*142,SPAN=n=>n*142-24;
const K={G,SPAN,
  title:(s,id='ttl')=>`<div id="${id}" class="title">${s}</div>`,
  /* 文字块：cls = lead|body|label|note [+ b/bb/pink/g1/g2/spec] */
  t:(id,col,y,s,cls='body',{span,align='left'}={})=>`<div id="${id}" class="t ${cls}" style="left:${G(col)}px;top:${y}px;${span?`width:${SPAN(span)}px;`:''}text-align:${align}">${s}</div>`,
  term:(id,col,y,s)=>`<div id="${id}" class="term" style="left:${G(col)}px;top:${y}px">${s}</div>`,
  svg:inner=>`<svg class="layer" width="1920" height="1080" viewBox="0 0 1920 1080">${inner}</svg>`,
  /* 店 = 圆角方框 + 点阵（点阵密度可表示客流） */
  shop:(id,x,y,s=120,{tone='g',n=3,dashed=false}={})=>{const c=tone==='pink'?'var(--pink)':'var(--g1)';let d='';
    if(!dashed)for(let i=0;i<n;i++)for(let j=0;j<n;j++)d+=`<circle cx="${(i+1)*s/(n+1)}" cy="${(j+1)*s/(n+1)}" r="${Math.max(3,s/(n*7))}" fill="${c}"/>`;
    return `<g id="${id}"><g transform="translate(${x} ${y})"><rect x="0" y="0" width="${s}" height="${s}" rx="12" fill="none" stroke="${c}" stroke-width="2.5" ${dashed?'stroke-dasharray="10 10"':''}/>${d}</g></g>`},
  /* 人 = 实心圆点 */
  dot:(id,x,y,r=10,tone='g')=>`<circle id="${id}" cx="${x}" cy="${y}" r="${r}" fill="${tone==='pink'?'var(--pink)':tone==='ink'?'var(--ink)':'var(--g1)'}"/>`,
  ring:(id,x,y,r=28,tone='g')=>`<circle id="${id}" cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${tone==='pink'?'var(--pink)':'var(--g2)'}" stroke-width="2.5"/>`,
  line:(id,pts,cls='ink')=>`<path id="${id}" class="ln ${cls}" d="M${pts.map(p=>p.join(' ')).join(' L')}"/>`,
  path:(id,d,cls='ink')=>`<path id="${id}" class="ln ${cls}" d="${d}"/>`,
  arrow:(id,x1,y1,x2,y2,cls='g')=>{const a=Math.atan2(y2-y1,x2-x1),h=14,p=(s)=>[(x2-h*Math.cos(a+s)).toFixed(1),(y2-h*Math.sin(a+s)).toFixed(1)].join(' ');
    return `<path id="${id}" class="ln ${cls}" d="M${x1} ${y1} L${x2} ${y2} M${p(-.5)} L${x2} ${y2} L${p(.5)}"/>`},
  axes:(id,x,y,w,h,{yl='',xl=''}={})=>`<g id="${id}"><path class="ln axis" d="M${x} ${y} L${x} ${y+h} L${x+w} ${y+h}"/>${yl?`<text x="${x}" y="${y-20}">${yl}</text>`:''}${xl?`<text x="${x+w}" y="${y+h+44}" text-anchor="end">${xl}</text>`:''}</g>`,
  vline:(id,x,y1,y2,label='')=>`<g id="${id}"><path class="ln axis" stroke-dasharray="6 8" d="M${x} ${y1} L${x} ${y2}"/>${label?`<text x="${x}" y="${y2+44}" text-anchor="middle">${label}</text>`:''}</g>`,
  stext:(id,x,y,s,{fill='var(--g1)',anchor='start',size=28,weight=400}={})=>`<text id="${id}" x="${x}" y="${y}" text-anchor="${anchor}" style="fill:${fill};font-size:${size}px;font-weight:${weight}">${s}</text>`,
  /* 编号节点：圆环 + 数字 */
  node:(id,x,y,n,{r=34}={})=>`<g id="${id}"><circle cx="${x}" cy="${y}" r="${r}" fill="var(--bg)" stroke="var(--g2)" stroke-width="2.5"/><text x="${x}" y="${y+11}" text-anchor="middle" style="fill:var(--ink);font-size:32px;font-weight:500">${n}</text></g>`,
  nodeOn:(id,x,y,n,{r=34}={})=>`<g id="${id}"><circle cx="${x}" cy="${y}" r="${r}" fill="var(--pink)"/><text x="${x}" y="${y+11}" text-anchor="middle" style="fill:var(--bg);font-size:32px;font-weight:700">${n}</text></g>`,
  bar:(id,x,y,w,h,{tone='g',dashed=false}={})=>`<rect id="${id}" data-origin="center bottom" x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="${dashed?'none':tone==='pink'?'var(--pink)':'var(--g3)'}" ${dashed?'stroke="var(--g1)" stroke-width="2.5" stroke-dasharray="10 10"':''}/>`,
};
window.KIT=K;
})();
