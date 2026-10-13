'use strict';
// Deterministic Canvas renderer. All scene assets and the final narration are local.
const fs=require('node:fs'),path=require('node:path');
const {spawn}=require('node:child_process');
const {once}=require('node:events');
const {chromium}=require('playwright');
const root=__dirname,mode=process.argv[2]||'full';
const D=JSON.parse(fs.readFileSync(path.join(root,'timeline.json')));
const DIR=JSON.parse(fs.readFileSync(path.join(root,'scenes.json')));
const output=path.join(root,'output');
const jobs=Number(process.env.RENDER_JOBS||4);
if(!['full','frames'].includes(mode)||!Number.isInteger(jobs)||jobs<1||jobs>16)throw Error('Usage: node render.cjs [full|frames] [comma-separated seconds]; RENDER_JOBS=1..16');
const names=['index.html','common.js',`case${D.id}.js`,'fonts/NotoSansSC.woff2'];
const assets=new Map(names.map(n=>['/'+n,fs.readFileSync(path.join(root,n))]));
function run(command,args){return new Promise((resolve,reject)=>{const c=spawn(command,args,{stdio:'inherit'});c.on('error',reject);c.on('close',code=>code===0?resolve():reject(Error(`${command}: exit ${code}`)))})}
(async()=>{
 fs.mkdirSync(output,{recursive:true});
 const executablePath=process.env.CHROMIUM_PATH||(fs.existsSync('/usr/bin/chromium')?'/usr/bin/chromium':undefined);
 const browser=await chromium.launch({executablePath,headless:true,args:['--no-sandbox','--disable-dev-shm-usage']});
 let encoder;
 try{
  const pages=[];let pageError;
  for(let i=0;i<(mode==='full'?jobs:1);i++){
   const page=await browser.newPage({viewport:{width:1920,height:1080}});
   page.on('pageerror',e=>{pageError=e});
   await page.route('**/*',route=>{
    const u=new URL(route.request().url());const name=u.pathname==='/'?'/index.html':u.pathname;
    if(u.origin!=='http://film.local'||!assets.has(name))return route.abort();
    return route.fulfill({body:assets.get(name),contentType:name.endsWith('.woff2')?'font/woff2':name.endsWith('.js')?'text/javascript':'text/html'});
   });
   await page.goto('http://film.local/');
   await page.evaluate(async({D,DIR})=>{await init(D,DIR);await document.fonts.load('40px Film');if(!document.fonts.check('40px Film'))throw Error('Bundled font failed to load')},{D,DIR});
   if(pageError)throw pageError;
   pages.push(page);
  }
  if(mode==='frames'){
   const times=process.argv[3]?process.argv[3].split(',').map(Number):DIR.map((v,i)=>Math.min(v.start+.8,(DIR[i+1]?.start||D.duration)-1/30));
   for(const t of times){if(!Number.isFinite(t)||t<0||t>=D.frames/D.fps)throw Error('Invalid frame time: '+t);await pages[0].evaluate(t=>renderAt(t),t);if(pageError)throw pageError;await pages[0].screenshot({path:path.join(output,`${t.toFixed(3)}.png`)})}
   console.log(`Rendered ${times.length} full-resolution still frames.`);return;
  }
  const silent=path.join(output,'silent.mp4'),final=path.join(output,`${D.id}_1080p30.mp4`);
  encoder=spawn('ffmpeg',['-v','error','-y','-f','image2pipe','-vcodec','mjpeg','-framerate',String(D.fps),'-i','pipe:0','-c:v','libx264','-preset','fast','-crf','18','-pix_fmt','yuv420p','-movflags','+faststart',silent],{stdio:['pipe','ignore','inherit']});
  let encoderError;
  encoder.on('error',e=>{encoderError=e});encoder.stdin.on('error',e=>{encoderError=e});
  const done=new Promise((resolve,reject)=>{encoder.on('error',reject);encoder.on('close',code=>code===0?resolve():reject(Error('FFmpeg encoder exit '+code)))});
  // Attach the rejection handler immediately while frames are being prepared.
  done.catch(e=>{encoderError=e});
  for(let n=0;n<D.frames;n+=jobs){
   if(encoderError)throw encoderError;
   const batch=await Promise.all(pages.slice(0,Math.min(jobs,D.frames-n)).map((page,i)=>page.evaluate(t=>{renderAt(t);return cv.toDataURL('image/jpeg',.95).split(',')[1]},(n+i)/D.fps)));
   if(pageError)throw pageError;
   for(const frame of batch){if(encoderError)throw encoderError;if(!encoder.stdin.write(Buffer.from(frame,'base64')))await once(encoder.stdin,'drain')}
   if(n%600===0)console.log(`${D.id}: ${n}/${D.frames} frames`);
  }
  encoder.stdin.end();await done;
  // Copy the existing AAC packets; do not synthesize, resample, stretch or remix.
  await run('ffmpeg',['-v','error','-y','-i',silent,'-i',path.join(root,'narration.m4a'),'-map','0:v:0','-map','1:a:0','-c','copy','-movflags','+faststart',final]);
  fs.unlinkSync(silent);console.log('COMPLETE '+final);
 }finally{if(encoder&&!encoder.stdin.destroyed)encoder.stdin.destroy();if(encoder&&encoder.exitCode===null)encoder.kill();await browser.close()}
})().catch(e=>{console.error(e.message);process.exitCode=1});
