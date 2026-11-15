import { chromium } from '/opt/codex/cua_node/lib/node_modules/playwright/index.mjs';
import { writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
const packet=process.env.HOME+'/rer-consolidation/work/je-gate-47/packet';
const label=process.argv[2];
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
const rows=[];
try {
 for (const width of [1440,390]) {
  const context=await browser.newContext({viewport:{width,height:1000},deviceScaleFactor:1,reducedMotion:'reduce'});
  const page=await context.newPage();
  for (const [slug,version] of [['uptime',label==='head'?'v0.5.13':'v0.5.12'],['oncall',label==='head'?'v0.5.16':'v0.5.15']]) {
   const errors=[];const failed=[];
   page.removeAllListeners('pageerror');page.removeAllListeners('requestfailed');
   page.on('pageerror',e=>errors.push(e.message));page.on('requestfailed',r=>failed.push({url:r.url().split('?')[0],error:r.failure()?.errorText}));
   const response=await page.goto('http://127.0.0.1:34747/'+slug,{waitUntil:'domcontentloaded'});
   await page.evaluate(()=>document.fonts.ready);
   const versionEl=page.getByText(version,{exact:true});
   await versionEl.first().waitFor({state:'visible'});
   const versionCount=await versionEl.count();
   const layout=await page.evaluate(()=>({viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth,bodyWidth:document.body.scrollWidth,headings:[...document.querySelectorAll('h1')].map(e=>e.textContent)}));
   if(width===1440 && (response.status()!==200 || versionCount!==1 || layout.scrollWidth>width || errors.length)) throw new Error(JSON.stringify({slug,width,status:response.status(),versionCount,layout,errors}));
   const screenshot=`${label}-${slug}-${width}.png`;
   await page.screenshot({path:packet+'/'+screenshot,fullPage:true,animations:'disabled'});
   rows.push({timestamp:execFileSync('date',['-u','+%Y-%m-%dT%H:%M:%SZ'],{encoding:'utf8'}).trim(),label,slug,width,status:response.status(),version,versionCount,layout,errors,failed,screenshot,asserted:width===1440});
  }
  await context.close();
 }
} finally {await browser.close();writeFileSync(packet+`/${label}-browser-receipt.json`,JSON.stringify(rows,null,2)+'\n');}
console.log(JSON.stringify(rows,null,2));
