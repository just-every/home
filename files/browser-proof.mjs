import { chromium } from '/tmp/je-sync-32-browser/node_modules/playwright-core/index.mjs';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const out='/home/agent/rer-consolidation/work/je-sync-32/packet';
const browser=await chromium.launch({headless:true,executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
const rows=[];
try {
 for (const width of [1440,390]) {
  const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce'});
  try {
   const page=await context.newPage();
   const response=await page.goto('http://127.0.0.1:31932/spool',{waitUntil:'domcontentloaded',timeout:60000});
   assert.equal(response.status(),200);
   await page.evaluate(()=>document.fonts.ready);
   const version=page.getByText('v0.7.11',{exact:true});
   await version.waitFor({state:'visible'});
   if (width===1440) {
    assert.equal(await page.locator('h1').innerText(),'Spool');
    const listings=await (await context.request.get('http://127.0.0.1:31932/data/listings.json')).json();
    assert.equal(listings.listings.find(r=>r.slug==='spool').version,'v0.7.11');
    assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
   }
   await version.scrollIntoViewIfNeeded();
   await page.screenshot({path:`${out}/spool-${width}.png`,fullPage:true});
   rows.push({width,status:response.status(),version:await version.innerText(),screenshot:`spool-${width}.png`,assertionWidth:width===1440});
  } finally { await context.close(); }
 }
} finally { await browser.close(); }
fs.writeFileSync(`${out}/browser-receipt.json`,JSON.stringify({screens:rows},null,2)+'\n');
console.log(JSON.stringify(rows));
