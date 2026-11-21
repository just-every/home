import {chromium} from '/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import {writeFileSync,mkdirSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
const mode=process.argv[2];const root=process.env.HOME+'/rer-consolidation/work/je-gate-66/packet';mkdirSync(root,{recursive:true});
const browser=await chromium.launch({headless:true,executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
const rows=[];
try {
 const context=await browser.newContext({reducedMotion:'reduce'});
 const page=await context.newPage();
 for (const [slug,version] of [['uptime',mode==='head'?'v0.5.19':'v0.5.18'],['oncall',mode==='head'?'v0.5.22':'v0.5.21']]) {
  for (const width of [1440,390]) {
   const errors=[];const listener=e=>errors.push(e.message);page.on('pageerror',listener);
   await page.setViewportSize({width,height:900});
   const response=await page.goto('http://127.0.0.1:3186/'+slug,{waitUntil:'domcontentloaded'});
   await page.locator('h1').waitFor(); await page.evaluate(()=>document.fonts.ready);
   const body=await page.locator('body').innerText();
   const metrics=await page.evaluate(()=>({viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth,bodyWidth:document.body.getBoundingClientRect().width,headings:[...document.querySelectorAll('h1')].map(x=>x.textContent),versionBoxes:[...document.querySelectorAll('body *')].filter(x=>x.childElementCount===0 && /^v0\.5\.\d+$/.test(x.textContent.trim())).map(x=>{const r=x.getBoundingClientRect();return {text:x.textContent,x:r.x,y:r.y,width:r.width,height:r.height}})}));
   const checks={http:response.status()===200,version:body.includes(version),title:metrics.headings.includes(slug==='uptime'?'Uptime':'Oncall'),horizontalOverflow:metrics.scrollWidth>width,pageErrors:errors};
   if (width===1440 && (!checks.http || !checks.version || !checks.title || checks.horizontalOverflow || errors.length))throw Error(JSON.stringify({slug,width,checks,metrics}));
   await page.screenshot({path:root+'/'+mode+'-'+slug+'-'+width+'.png',fullPage:true});
   const versionElement=page.getByText(/^v0\.5\.\d+$/, {exact:true});
   if (await versionElement.count()) {await versionElement.first().scrollIntoViewIfNeeded();await page.screenshot({path:root+'/'+mode+'-'+slug+'-'+width+'-version.png'});}
   rows.push({at:execFileSync('date',['-u','+%Y-%m-%dT%H:%M:%SZ'],{encoding:'utf8'}).trim(),mode,slug,width,checks,metrics});
   page.off('pageerror',listener);
  }
 }
 writeFileSync(root+'/'+mode+'-browser-receipt.json',JSON.stringify(rows,null,2)+'\n');
 console.log(JSON.stringify(rows,null,2));
 await context.close();
}finally{await browser.close();}
