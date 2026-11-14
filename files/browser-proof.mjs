import { chromium } from '/home/agent/.local/lib/node_modules/playwright/index.mjs';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import assert from 'node:assert/strict';
const packet='/home/agent/rer-consolidation/work/je-sync-33/packet';
const listing=JSON.parse(readFileSync('public/data/listings.json','utf8')).listings.find(l=>l.slug==='happytohelp');
const browser=await chromium.launch({headless:true,executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
const proof=[];
try {
 for (const width of [1440,390]) {
  const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce'});
  const page=await context.newPage();
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  const response=await page.goto('http://127.0.0.1:3133/happytohelp',{waitUntil:'domcontentloaded'});
  await page.waitForTimeout(1200);
  await page.evaluate(()=>Promise.race([document.fonts.ready,new Promise(r=>setTimeout(r,5000))]));
  const version=page.locator('dd').filter({hasText:listing.version});
  // Assert the changed screen at 1440; 390 is browser proof only.
  if(width===1440){
   assert.equal(response.status(),200);
   assert.equal(await version.count(),1);
   assert.equal((await version.innerText()).trim(),listing.version);
   assert.deepEqual(errors,[]);
  }
  await version.scrollIntoViewIfNeeded();
  mkdirSync(packet+'/browser',{recursive:true});
  await page.screenshot({path:packet+`/browser/happytohelp-${width}.png`});
  proof.push({width,url:page.url(),status:response.status(),version:await version.innerText(),errors,screenshot:`browser/happytohelp-${width}.png`});
  await context.close();
 }
}finally{await browser.close()}
writeFileSync(packet+'/browser-receipt.json',JSON.stringify({observedAt:new Date().toISOString(),assertionWidth:1440,proof},null,2)+'\n');
console.log(JSON.stringify(proof));
