const { chromium } = require('/opt/codex/cua_node/lib/node_modules/playwright');
const { spawn } = require('node:child_process');
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const root=path.join(process.env.HOME,'rer-consolidation/work/je-gate-35');
const packet=path.join(root,'packet');
async function main(){
 const servers=[];let browser;const receipts=[];
 try {
  for (const [name,port] of [['home',3185],['baseline',3186]]) {
   const log=fs.openSync(path.join(packet,name+'-server.log'),'w');
   const child=spawn(process.execPath,[path.join(root,'home/node_modules/next/dist/bin/next'),'start','-H','127.0.0.1','-p',String(port)],{cwd:path.join(root,name),stdio:['ignore',log,log]});
   servers.push(child);
   fs.appendFileSync(path.join(packet,'server-pids.txt'),`${name} pid=${child.pid} port=${port}\n`);
   let ready=false;
   for(let i=0;i<60;i++) {
    if(child.exitCode!==null)throw Error(name+' server exited '+child.exitCode);
    try{const r=await fetch(`http://127.0.0.1:${port}/happytohelp`);if(r.status===200){ready=true;break;}}catch{}
    await new Promise(r=>setTimeout(r,500));
   }
   assert(ready,name+' server ready');
  }
  browser=await chromium.launch({headless:true,executablePath:'/usr/bin/chromium',args:['--no-sandbox','--use-mock-keychain','--password-store=basic']});
  for(const [name,port,version] of [['candidate',3185,'v0.4.24'],['baseline',3186,'v0.4.23']]){
   for(const width of [1440,390]){
    const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce'});
    const page=await context.newPage();const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    const response=await page.goto(`http://127.0.0.1:${port}/happytohelp`,{waitUntil:'domcontentloaded'});
    await page.locator('h1').waitFor();
    await page.evaluate(()=>document.fonts.ready);
    await page.locator('dt').filter({hasText:'Version'}).scrollIntoViewIfNeeded();
    const facts=await page.locator('dl').innerText();
    const metrics=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,title:document.querySelector('h1')?.textContent,version:[...document.querySelectorAll('dt')].find(x=>x.textContent==='Version')?.nextElementSibling?.textContent,bodyText:document.body.innerText}));
    if(width===1440){
     assert.equal(response.status(),200);assert.equal(metrics.title,'HappyToHelp');assert.equal(metrics.version,version);assert.equal(metrics.scrollWidth,width);assert.deepEqual(errors,[]);
     const data=await(await fetch(`http://127.0.0.1:${port}/data/listings.json`)).json();
     assert.equal(data.listings.length,49);assert.equal(data.listings.filter(x=>x.status==='released').length,35);assert.equal(data.listings.filter(x=>x.status==='coming-soon').length,14);
     assert.equal(data.listings.find(x=>x.slug==='happytohelp').version,version);
    }
    await page.locator('footer img[src="/landing/footer/footer-art.svg"]').scrollIntoViewIfNeeded();
    await page.waitForFunction(()=>(()=>{const img=document.querySelector('footer img[src="/landing/footer/footer-art.svg"]');return img.complete&&img.naturalWidth>0})(),{},{timeout:20000});
    const filename=`${name}-happytohelp-${width}.png`;
    await page.screenshot({path:path.join(packet,filename),fullPage:true});
    receipts.push({name,width,status:response.status(),version:metrics.version,title:metrics.title,scrollWidth:metrics.scrollWidth,facts,pageErrors:errors,screenshot:filename,assertionWidth:1440,bodyText:metrics.bodyText});
    await context.close();
   }
  }
 } finally {
  if(browser)await browser.close();
  for(const child of servers){if(child.exitCode===null){child.kill('SIGTERM');await new Promise(resolve=>child.once('exit',resolve));}}
  fs.writeFileSync(path.join(packet,'browser-receipt.json'),JSON.stringify({probe:'production /happytohelp and /data/listings.json; head vs main',chromium:'/usr/bin/chromium',serversStopped:true,receipts},null,2)+'\n');
 }
 console.log('Browser probes passed at 1440; visual proof captured at 1440 and 390 for candidate and main. Servers stopped.');
}
main().catch(e=>{console.error(e);process.exitCode=1;});
