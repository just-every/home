import {chromium} from '/opt/codex/cua_node/lib/node_modules/playwright/index.mjs';
import fs from 'node:fs';
import assert from 'node:assert/strict';
const revision=process.argv[2]; const isHead=revision==='head';
const expected=isHead?'v0.7.9':'v0.7.8';
const packet='/home/agent/rer-consolidation/work/je-gate-36/packet';
const browser=await chromium.launch({headless:true,executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
const observations=[];
try{
 for(const width of [1440,390]) {
  const context=await browser.newContext({viewport:{width,height:1000},deviceScaleFactor:1,reducedMotion:'reduce'});
  const page=await context.newPage(); const errors=[]; const failed=[];
  page.on('pageerror',e=>errors.push(e.message));
  page.on('requestfailed',req=>failed.push({url:req.url().split('?')[0],error:req.failure()?.errorText}));
  const response=await page.goto('http://127.0.0.1:3096/spool',{waitUntil:'domcontentloaded',timeout:30000});
  await page.locator('dd').filter({hasText:expected}).waitFor({state:'visible',timeout:15000});
  await page.evaluate(()=>document.fonts.ready);

  const body=await page.locator('body').innerText();
  const data=await page.evaluate(()=>({title:document.title,width:innerWidth,scrollWidth:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight,version:[...document.querySelectorAll('dt')].find(el=>el.textContent==='Version')?.nextElementSibling?.textContent??null,images:[...document.querySelectorAll('img')].map(el=>({src:el.getAttribute('src')?.split('?')[0],complete:el.complete,naturalWidth:el.naturalWidth,loading:el.loading})),headings:[...document.querySelectorAll('h1,h2')].map(el=>el.textContent),offscreen:[...document.querySelectorAll('main *')].filter(el=>{const r=el.getBoundingClientRect();const s=getComputedStyle(el);return r.width>0&&s.visibility!=='hidden'&&s.display!=='none'&&(r.left< -1||r.right>innerWidth+1)}).slice(0,12).map(el=>({tag:el.tagName,cls:el.className,left:el.getBoundingClientRect().left,right:el.getBoundingClientRect().right}))}));
  if(width===1440){
   assert.equal(response.status(),200);
   assert.ok(body.includes(expected));
   assert.ok(!body.includes(isHead?'v0.7.8':'v0.7.9'));
   assert.equal(data.version,expected);
   assert.ok(data.scrollWidth<=width);
   assert.deepEqual(errors,[]);
   const listingsResponse=await context.request.get('http://127.0.0.1:3096/data/listings.json');
   assert.equal(listingsResponse.status(),200);
   const listings=await listingsResponse.json();
   assert.equal(listings.listings.length,49);
   assert.equal(listings.listings.find(x=>x.slug==='spool').version,expected);
   fs.writeFileSync(`${packet}/${revision}-page-text.txt`,body+'\n');
  }
  await page.screenshot({path:`${packet}/${revision}-spool-${width}.png`,fullPage:true,animations:'disabled'});
  observations.push({width,httpStatus:response.status(),...data,errors,failedRequests:failed,screenshot:`${revision}-spool-${width}.png`,assertions:width===1440?'status 200; version label; old version absent; no document overflow; no page errors; real listings URL counts/version':'visual proof and metrics only'});
  await context.close();
 }
 fs.writeFileSync(`${packet}/${revision}-browser-receipt.json`,JSON.stringify({revision,result:'PASS',route:'/spool',expected,observations},null,2)+'\n');
 console.log(JSON.stringify(observations,null,2));
}finally{await browser.close()}
