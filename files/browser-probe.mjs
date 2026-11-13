import { chromium } from '/opt/codex/cua_node/lib/node_modules/playwright/index.mjs';
import { writeFileSync } from 'node:fs';
const mode=process.argv[2];
const packet='/home/agent/rer-consolidation/work/je-gate-38/packet';
const versions=mode==='head'?{happytohelp:'v0.4.25',oncall:'v0.5.13',spool:'v0.7.10'}:{happytohelp:'v0.4.24',oncall:'v0.5.12',spool:'v0.7.9'};
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
const results=[];
try {
 for (const width of [1440,390]) {
  const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce'});
  for (const [slug,version] of Object.entries(versions)) {
   const page=await context.newPage(); page.setDefaultTimeout(30000); const errors=[]; console.log('START',mode,slug,width,new Date().toISOString());
   page.on('pageerror',e=>errors.push(e.message));
   const response=await page.goto(`http://127.0.0.1:34038/${slug}`,{waitUntil:'domcontentloaded',timeout:60000});
   await page.locator('dt',{hasText:'Version'}).waitFor();
   await page.evaluate(()=>Promise.race([document.fonts.ready,new Promise(resolve=>setTimeout(resolve,5000))]));
   const facts=await page.evaluate(()=>{
     const dt=[...document.querySelectorAll('dt')].find(x=>x.textContent==='Version');
     const dd=dt?.parentElement.querySelector('dd');
     const rect=dd?.getBoundingClientRect();
     return {h1:document.querySelector('h1')?.textContent,version:dd?.textContent,
      viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth,
      versionRect:rect?{x:rect.x,y:rect.y,width:rect.width,height:rect.height}:null,
      bodyText:document.body.innerText};
   });
   if (width===1440) {
     if (response.status()!==200 || facts.version!==version || facts.scrollWidth>width || errors.length) throw Error(JSON.stringify({slug,status:response.status(),facts,errors}));
   }
   await page.screenshot({path:`${packet}/${mode}-${slug}-${width}.png`,fullPage:true,animations:'disabled'});
   await page.locator('dt',{hasText:'Version'}).scrollIntoViewIfNeeded();
   await page.screenshot({path:`${packet}/${mode}-${slug}-${width}-version.png`,animations:'disabled'});
   results.push({mode,slug,width,status:response.status(),expectedVersion:version,assertions:width===1440?'HTTP 200, rendered version, no horizontal overflow, no page error':'visual proof and measured facts',...facts,errors});
   await page.close();
  }
  await context.close();
 }
 writeFileSync(`${packet}/${mode}-BROWSER.json`,JSON.stringify({timestamp:new Date().toISOString(),results},null,2)+'\n');
 console.log(JSON.stringify(results.map(({bodyText,...r})=>r),null,2));
} finally {await browser.close();}
