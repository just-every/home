const { chromium } = require('/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const {spawn}=require('node:child_process');
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const root=path.join(process.env.HOME,'rer-consolidation/work/je-gate-37-c1');
const packet=path.join(root,'packet');
const servers=[];let browser;
const source={baseline:{directory:'baseline',port:3183,versions:{uptime:'v0.5.10',oncall:'v0.5.11',orbit:'v0.4.8'}},candidate:{directory:'home',port:3184,versions:{uptime:'v0.5.11',oncall:'v0.5.12',orbit:'v0.4.9'}}};
const results=[];const errors=[];
const pause=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{
 try {
  for(const [name,s] of Object.entries(source)){
   const log=fs.openSync(path.join(packet,`${name}-server.log`),'w');
   const child=spawn(process.execPath,[path.join(root,'home/node_modules/next/dist/bin/next'),'start','--hostname','127.0.0.1','--port',String(s.port)],{cwd:path.join(root,s.directory),env:{PATH:process.env.PATH,HOME:process.env.HOME,NODE_ENV:'production',NO_PROXY:'localhost,127.0.0.1,::1'},stdio:['ignore',log,log]});
   fs.closeSync(log);servers.push(child);
   fs.writeFileSync(path.join(root,`${name}-server.pid`),String(child.pid)+'\n');
   let ready=false;
   for(let i=0;i<40;i++){
    if(child.exitCode!==null)throw Error(`${name} server exited ${child.exitCode}`);
    try{const r=await fetch(`http://127.0.0.1:${s.port}/uptime`);if(r.status===200){ready=true;break;}}catch{}
    await pause(250);
   }
   if(!ready)throw Error(`${name} server did not become ready`);
  }
  browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
  for(const [name,s] of Object.entries(source)){
   for(const width of [1440,390]){
    const context=await browser.newContext({viewport:{width,height:960},reducedMotion:'reduce'});
    try {
     for(const [slug,version] of Object.entries(s.versions)){
      const page=await context.newPage();
      page.on('pageerror',e=>errors.push({revision:name,width,slug,message:e.message}));
      const response=await page.goto(`http://127.0.0.1:${s.port}/${slug}`,{waitUntil:'load',timeout:45000});
      await page.evaluate(()=>document.fonts.ready);
      await pause(500);
      const versionElement=page.getByText(version,{exact:true});
      const metrics=await page.evaluate(()=>({title:document.title,h1:document.querySelector('h1')?.innerText,width:innerWidth,scrollWidth:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight,text:document.body.innerText,headings:[...document.querySelectorAll('h1,h2,dl')].map(e=>({tag:e.tagName,text:e.innerText,x:e.getBoundingClientRect().x,y:e.getBoundingClientRect().y+scrollY,width:e.getBoundingClientRect().width,height:e.getBoundingClientRect().height}))}));
      const versionCount=await versionElement.count();
      const versionBox=versionCount===1?await versionElement.boundingBox():null;
      if(width===1440){
       assert.equal(response.status(),200);assert.equal(metrics.h1,slug[0].toUpperCase()+slug.slice(1));
       assert.equal(versionCount,1);assert.ok(await versionElement.isVisible());
       assert.ok(metrics.scrollWidth<=width,`${name}/${slug} horizontal overflow`);
       assert.ok(versionBox.x>=0&&versionBox.x+versionBox.width<=width);
      }
      await page.screenshot({path:path.join(packet,`${name}-${slug}-${width}.png`),fullPage:true,animations:'disabled'});
      results.push({revision:name,slug,width,status:response.status(),expectedVersion:version,versionCount,versionBox,...metrics});
      await page.close();
     }
    } finally {await context.close();}
   }
  }
  for(const slug of Object.keys(source.candidate.versions)){
   const a=results.find(x=>x.revision==='baseline'&&x.slug===slug&&x.width===1440);
   const b=results.find(x=>x.revision==='candidate'&&x.slug===slug&&x.width===1440);
   assert.equal(a.text.replace(source.baseline.versions[slug],'<VERSION>'),b.text.replace(source.candidate.versions[slug],'<VERSION>'));
   const normalize=headings=>headings.map(x=>({...x,text:x.text.replace(/v\d+\.\d+\.\d+/g,'<VERSION>')}));
   assert.deepEqual(normalize(a.headings),normalize(b.headings));
  }
  fs.writeFileSync(path.join(packet,'browser-receipt.json'),JSON.stringify({at:new Date().toISOString(),base:'1b7c84f81246cce3a6d7b26bffc31ea1ca0370a0',head:'edfb1132486eaac9f87843199561c3230d5132df',assertionWidth:1440,proofWidths:[1440,390],results,errors,regression:'1440 visible text identical after version normalization; heading and facts geometry identical'},null,2)+'\n');
  console.log(JSON.stringify({pages:results.map(({revision,slug,width,status,versionCount,scrollWidth})=>({revision,slug,width,status,versionCount,scrollWidth})),errors,regression:'PASS'}));
 } finally {
  if(browser)await browser.close();
  for(const child of servers)if(child.exitCode===null)child.kill('SIGTERM');
  await Promise.all(servers.map(child=>child.exitCode!==null?Promise.resolve():new Promise(r=>child.once('exit',r))));
 }
})().catch(e=>{console.error(e.stack);process.exitCode=1;});
