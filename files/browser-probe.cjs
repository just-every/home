const {chromium} = require('/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs');
(async()=>{
const packet='/home/agent/rer-consolidation/work/je-gate-31/packet';
const browser=await chromium.launch({headless:true,executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
const versions={spool:'v0.7.8',lamp:'v1.11.13',orbit:'v0.4.7',oncall:'v0.5.10',uptime:'v0.5.8'};
const proofs=[];
try {
 for(const width of [1440,390]) {
  const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
  const page=await context.newPage();
  for(const [slug,version] of Object.entries(versions)) {
   const errors=[];page.removeAllListeners('pageerror');page.on('pageerror',e=>errors.push(e.message));
   const response=await page.goto('http://127.0.0.1:3187/'+slug,{waitUntil:'domcontentloaded'});
   await page.evaluate(()=>document.fonts.ready);
   const facts=await page.locator('dl').innerText();
   const dimensions=await page.evaluate(()=>({width:innerWidth,scrollWidth:document.documentElement.scrollWidth,bodyWidth:document.body.scrollWidth}));
   const versionElement=page.locator('dd').filter({hasText:version});
   const versionCount=await versionElement.count();
   if(width===1440 && (response.status()!==200 || versionCount!==1 || dimensions.scrollWidth>width || errors.length)) throw new Error(JSON.stringify({slug,width,status:response.status(),versionCount,dimensions,errors}));
   await page.screenshot({path:packet+'/head-'+slug+'-'+width+'.png',fullPage:true});
   await versionElement.scrollIntoViewIfNeeded();
   await page.screenshot({path:packet+'/head-'+slug+'-'+width+'-version.png'});
   proofs.push({slug,width,url:page.url(),status:response.status(),version,facts,dimensions,errors,screenshot:'head-'+slug+'-'+width+'.png'});
  }
  await context.close();
 }
 const context=await browser.newContext({viewport:{width:1440,height:900},reducedMotion:'reduce'});const page=await context.newPage();
 await page.goto('http://127.0.0.1:3187/data/listings.json');
 const listing=await page.evaluate(()=>JSON.parse(document.body.innerText));
 proofs.push({public_data_count:listing.listings.length,versions:listing.listings.filter(x=>versions[x.slug]).map(x=>({slug:x.slug,version:x.version}))});
 await context.close();
 fs.writeFileSync(packet+'/browser-head-receipt.json',JSON.stringify({result:'PASS',assertion_width:1440,proof_widths:[1440,390],head:'14bbb698b7d9e77a3d041794d84b56420fbbf737',proofs},null,2)+'\n');
} finally {await browser.close();}
})();
