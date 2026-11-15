const { chromium } = require('/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const {spawn} = require('node:child_process');
const fs=require('node:fs');
const path=require('node:path');
const root=process.env.HOME+'/rer-consolidation/work/je-gate-44';
const cases=[{label:'head',cwd:root+'/home',port:3184,version:'v0.4.28'},{label:'main',cwd:'/tmp/je-gate-44-main',port:3185,version:'v0.4.26'}];
(async()=>{
 let browser; const servers=[]; const rows=[];
 try {
  for (const c of cases) {
   const log=fs.openSync(root+'/packet/'+c.label+'-server.log','w');
   const server=spawn(process.execPath,[path.join(c.cwd,'node_modules/next/dist/bin/next'),'start','-H','127.0.0.1','-p',String(c.port)],{cwd:c.cwd,stdio:['ignore',log,log]});
   servers.push(server); fs.closeSync(log);
   fs.writeFileSync(root+'/packet/'+c.label+'-server-pid.txt',String(server.pid)+'\n');
   let ready=false;
   for(let i=0;i<100;i++){try {const r=await fetch('http://127.0.0.1:'+c.port+'/happytohelp');if(r.ok){ready=true;break;}} catch {} await new Promise(r=>setTimeout(r,200));}
   if(!ready)throw new Error(c.label+' production server not ready');
  }
  browser=await chromium.launch({headless:true,executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
  for(const c of cases){
   const context=await browser.newContext({reducedMotion:'reduce'});
   for(const width of [1440,390]){
    const page=await context.newPage({viewport:{width,height:1000}});
    await page.setViewportSize({width,height:1000});
    const errors=[]; page.on('pageerror',e=>errors.push(e.message));
    const response=await page.goto('http://127.0.0.1:'+c.port+'/happytohelp',{waitUntil:'domcontentloaded'});
    await page.evaluate(()=>document.fonts.ready);
    await page.locator('h1').waitFor();
    const version=page.locator('dl').filter({hasText:'Version'}).locator('dd').filter({hasText:c.version});
    const versionCount=await version.count();
    const metrics=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,h1:document.querySelector('h1')?.textContent,bodyWidth:document.body.scrollWidth}));
    const box=versionCount?await version.boundingBox():null;
    const text=await page.locator('main').innerText();
    const listingResponse=await page.request.get('http://127.0.0.1:'+c.port+'/data/listings.json');
    const data=await listingResponse.json();
    const hh=data.listings.find(x=>x.slug==='happytohelp');
    if(width===1440){
     if(response.status()!==200||metrics.h1!=='HappyToHelp'||versionCount!==1||hh.version!==c.version||metrics.scrollWidth>1440||errors.length)throw new Error(JSON.stringify({c,width,versionCount,metrics,errors,hh}));
     if(!box||box.x<0||box.x+box.width>1441) throw new Error('version clipped');
    }
    await page.screenshot({path:root+'/packet/'+c.label+'-'+width+'.png',fullPage:true});
    fs.writeFileSync(root+'/packet/'+c.label+'-'+width+'-text.txt',text+'\n');
    rows.push({label:c.label,width,status:response.status(),version:c.version,versionCount,metrics,versionBox:box,listingVersion:hh.version,counts:{total:data.listings.length,released:data.listings.filter(x=>x.status==='released').length,comingSoon:data.listings.filter(x=>x.status==='coming-soon').length},pageErrors:errors});
    await page.close();
   }
   await context.close();
  }
  fs.writeFileSync(root+'/packet/browser-receipt.json',JSON.stringify({timestamp:new Date().toISOString(),rows},null,2)+'\n');
  console.log(JSON.stringify(rows,null,2));
 } finally {
  if(browser)await browser.close();
  for(const server of servers){server.kill('SIGTERM');await new Promise(resolve=>{if(server.exitCode!==null)resolve();else server.once('exit',resolve);});}
 }
})().catch(e=>{console.error(e);process.exitCode=1;});
