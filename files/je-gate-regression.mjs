import {chromium} from '/opt/codex/cua_node/lib/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const packet=process.env.HOME+'/rer-consolidation/work/je-gate-28/packet';
const versions={uptime:['v0.5.5','v0.5.6'],lamp:['v1.11.11','v1.11.12'],orbit:['v0.4.5','v0.4.6'],spool:['v0.7.5','v0.7.6']};
const b=await chromium.launch({executablePath:'/usr/bin/chromium',args:['--no-sandbox'],headless:true});
const receipt={base:'71a913e8667dc8a68e8cfc7e8fc04a1c401de2fa',head:'393067c8e694cb7d088fd44685a9d4dd37b0ae9d',assertion_width:1440,pages:[]};
try {
 const context=await b.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 for(const [slug,[oldVersion,newVersion]] of Object.entries(versions)) {
  const snapshots=[];
  for(const port of [3129,3128]) {
   const p=await context.newPage();const response=await p.goto(`http://127.0.0.1:${port}/${slug}`,{waitUntil:'domcontentloaded'});
   await p.evaluate(()=>document.fonts.ready);
   const data=await p.evaluate(()=>({text:document.body.innerText,scrollWidth:document.documentElement.scrollWidth,geometry:[...document.querySelectorAll('article h1,article h2,article dl')].map(e=>({tag:e.tagName,text:e.tagName==='DL'?'facts':e.textContent,box:JSON.parse(JSON.stringify(e.getBoundingClientRect()))}))}));
   snapshots.push({status:response.status(),...data});await p.close();
  }
  assert.equal(snapshots[0].status,200);assert.equal(snapshots[1].status,200);
  assert.equal(snapshots[0].text,snapshots[1].text.replaceAll(newVersion,oldVersion));
  assert.equal(snapshots[0].scrollWidth,snapshots[1].scrollWidth);
  assert.deepEqual(snapshots[0].geometry,snapshots[1].geometry);
  const row={slug,baselineVersion:oldVersion,candidateVersion:newVersion,bodyIdenticalExceptVersion:true,geometryIdentical:true,scrollWidth:snapshots[0].scrollWidth};
  receipt.pages.push(row);console.log(JSON.stringify(row));
 }
 await context.close();
} finally {await b.close();await fs.writeFile(packet+'/regression-receipt.json',JSON.stringify(receipt,null,2)+'\n');}
