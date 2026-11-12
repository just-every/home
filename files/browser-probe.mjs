import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
const [label, expected, port] = process.argv.slice(2);
const packet=process.env.HOME+'/rer-consolidation/work/je-gate-29/packet';
const browser=await chromium.launch({headless:true,executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
const results=[];
try {
 const context=await browser.newContext({reducedMotion:'reduce'});
 for (const width of [1440,390]) {
  const page=await context.newPage({viewport:{width,height:1000}});
  await page.setViewportSize({width,height:1000});
  const errors=[]; page.on('pageerror',e=>errors.push(e.message));
  const response=await page.goto(`http://127.0.0.1:${port}/uptime`,{waitUntil:'domcontentloaded'});
  assert.equal(response.status(),200);
  await page.locator('h1').waitFor({state:'visible'});
  await page.evaluate(()=>document.fonts.ready);
  await page.evaluate(()=>{for(const v of document.querySelectorAll('video'))v.pause();});
  const text=await page.locator('body').innerText();
  const measure=await page.evaluate(()=>({width:innerWidth,doc:document.documentElement.scrollWidth,body:document.body.scrollWidth,h1:document.querySelector('h1')?.textContent,version:[...document.querySelectorAll('dt')].find(x=>x.textContent==='Version')?.nextElementSibling?.textContent}));
  const shot=`${label}-uptime-${width}.png`;
  await page.screenshot({path:packet+'/'+shot,fullPage:true,animations:'disabled'});
  if(width===1440){
   assert.equal(measure.version,expected);
   assert.equal(measure.doc,1440);
   assert.equal(measure.body,1440);
   assert.deepEqual(errors,[]);
  }
  results.push({label,width,status:response.status(),...measure,pageErrors:errors,screenshot:shot,asserted:width===1440,observedNoOverflow:measure.doc<=width&&measure.body<=width});
  await writeFile(packet+`/${label}-uptime-${width}.txt`,text+'\n');
  await page.close();
 }
 await context.close();
} finally {await browser.close();}
await writeFile(packet+`/${label}-browser-receipt.json`,JSON.stringify(results,null,2)+'\n');
console.log(JSON.stringify(results,null,2));
