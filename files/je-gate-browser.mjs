import { chromium } from '/opt/codex/cua_node/lib/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const packet=process.env.HOME+'/rer-consolidation/work/je-gate-28/packet';
const head='393067c8e694cb7d088fd44685a9d4dd37b0ae9d';
const versions={uptime:'v0.5.6',lamp:'v1.11.12',orbit:'v0.4.6',spool:'v0.7.6'};
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox','--use-mock-keychain','--password-store=basic']});
const receipt={head,command:'cloud_run node /tmp/je-gate-browser.mjs',assertion_width:1440,pages:[]};
try {
 for(const width of [1440,390]) {
  const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce'});
  for(const [slug,version] of Object.entries(versions)) {
   const page=await context.newPage();
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   const response=await page.goto('http://127.0.0.1:3128/'+slug,{waitUntil:'domcontentloaded'});
   await page.evaluate(()=>document.fonts.ready);
   await page.waitForFunction(()=>getComputedStyle(document.querySelector('h1')).fontSize!=='32px');
   const fact=page.locator('dl > div').filter({has:page.locator('dt',{hasText:/^Version$/})});
   const value=(await fact.locator('dd').innerText()).trim();
   const h1=await page.locator('h1').innerText();
   const metrics=await page.evaluate(()=>({viewport:innerWidth,document:document.documentElement.scrollWidth,body:document.body.scrollWidth,height:document.documentElement.scrollHeight}));
   if(width===1440) {
    assert.equal(response.status(),200);assert.equal(value,version);assert.equal(h1.toLowerCase(),slug);
    assert.ok(metrics.document<=width+1,JSON.stringify(metrics));assert.deepEqual(errors,[]);
   }
   const screenshot=`${slug}-${width}.png`;
   await page.screenshot({path:packet+'/'+screenshot,fullPage:true,animations:'disabled'});
   const body=await page.locator('body').innerText();
   await fs.writeFile(packet+`/${slug}-${width}-render.txt`,body+'\n');
   receipt.pages.push({slug,url:response.url(),width,status:response.status(),h1,version:value,metrics,page_errors:errors,screenshot,asserted:width===1440});
   console.log(JSON.stringify(receipt.pages.at(-1)));
   await page.close();
  }
  await context.close();
 }
} finally { await browser.close();await fs.writeFile(packet+'/browser-receipt.json',JSON.stringify(receipt,null,2)+'\n'); }
