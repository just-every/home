import { chromium } from '/opt/codex/cua_node/lib/node_modules/playwright/index.mjs';
import { writeFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
const packet=new URL('./',import.meta.url);
const browser=await chromium.launch({headless:true,executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
const rows=[];
try {
 for(const target of ['main','head']) {
  const context=await browser.newContext({reducedMotion:'reduce'});
  const page=await context.newPage();
  for(const width of target==='main'?[1440]:[1440,390]) {
   await page.setViewportSize({width,height:1000});
   for(const [slug,name,oldVersion,newVersion] of [['uptime','Uptime','v0.5.7','v0.5.7'],['spool','Spool','v0.7.6','v0.7.7'],['oncall','Oncall','v0.5.8','v0.5.9'],['happytohelp','HappyToHelp','v0.4.21','v0.4.22']]) {
    const errors=[];
    const onError=e=>errors.push(e.message);
    page.on('pageerror',onError);
    const response=await page.goto(`http://127.0.0.1:${target==='main'?3188:3187}/${slug}`,{waitUntil:'domcontentloaded'});
    await page.evaluate(()=>document.fonts.ready);
    await page.locator('dl').waitFor();
    await page.evaluate(()=>{for(const video of document.querySelectorAll('video')) video.pause();});
    const title=await page.locator('h1').innerText();
    const version=await page.locator('dl').filter({hasText:'Version'}).innerText();
    const geometry=await page.evaluate(()=>({viewport:innerWidth,documentWidth:document.documentElement.scrollWidth,bodyWidth:document.body.scrollWidth}));
    if(width===1440) {
     assert.equal(response.status(),200);
     assert.equal(title,name);
     assert.ok(version.includes(target==='main'?oldVersion:newVersion));
     assert.ok(geometry.documentWidth<=width,JSON.stringify(geometry));
     assert.deepEqual(errors,[]);
    }
    const screenshot=`${target}-${slug}-${width}.png`;
    await page.screenshot({path:new URL(screenshot,packet).pathname,fullPage:true,animations:'disabled'});
    rows.push({target,slug,width,status:response.status(),title,version,geometry,pageErrors:errors,screenshot,assertions:width===1440?'status, heading, version, no horizontal overflow, no page errors':'visual proof only'});
    page.off('pageerror',onError);
   }
  }
  await context.close();
 }
 await writeFile(new URL('browser-receipt.json',packet),JSON.stringify(rows,null,2)+'\n');
 console.log(JSON.stringify(rows,null,2));
} finally { await browser.close(); }
