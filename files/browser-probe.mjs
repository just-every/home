import {chromium} from 'playwright';
import {writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const packet=process.env.HOME+'/rer-consolidation/work/je-gate-39/packet';
const browser=await chromium.launch({headless:true,executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
const rows=[];
try {
 for(const width of [1440,390]) {
  const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce'});
  const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
  console.log('navigate',width);const response=await page.goto('http://127.0.0.1:3139/lamp',{waitUntil:'domcontentloaded',timeout:30000});
  await page.evaluate(()=>Promise.race([document.fonts.ready,new Promise(resolve=>setTimeout(resolve,10000))]));console.log('fonts ready/bounded',width);
  const text=await page.locator('body').innerText();
  const metrics=await page.evaluate(()=>({viewport:innerWidth,documentWidth:document.documentElement.scrollWidth,bodyWidth:document.body.scrollWidth,title:document.querySelector('h1')?.innerText,clippedText:[...document.querySelectorAll('h1,h2,h3,p,li')].filter(e=>{const r=e.getBoundingClientRect();return r.width>0&&(r.left < -1||r.right>innerWidth+1)}).map(e=>e.textContent?.slice(0,100))}));
  // The public-door assertion runs at 1440; 390 is the second visual proof.
  if(width===1440){assert.equal(response.status(),200);assert.equal(metrics.title,'Lamp');assert.match(text,/v1\.11\.15/);assert.doesNotMatch(text,/v1\.11\.14/);assert.equal(metrics.documentWidth,width);assert.deepEqual(metrics.clippedText,[]);assert.deepEqual(errors,[])}
  console.log('screenshot',width);await page.screenshot({path:`${packet}/lamp-${width}.png`,fullPage:true,animations:'disabled'});
  await page.getByText('v1.11.15',{exact:false}).last().scrollIntoViewIfNeeded();
  await page.screenshot({path:`${packet}/lamp-version-${width}.png`,animations:'disabled'});
  rows.push({width,status:response.status(),versionVisible:text.includes('v1.11.15'),metrics,errors,assertionsRun:width===1440,fullPageScreenshot:`lamp-${width}.png`,versionScreenshot:`lamp-version-${width}.png`});
  writeFileSync(`${packet}/lamp-text-${width}.txt`,text+'\n');
  await context.close();
 }
 const response=await (await browser.newContext()).request.get('http://127.0.0.1:3139/data/listings.json');
 const data=await response.json();assert.equal(response.status(),200);assert.equal(data.listings.find(x=>x.slug==='lamp').version,'v1.11.15');
 writeFileSync(`${packet}/browser-receipt.json`,JSON.stringify({at:new Date().toISOString(),head:'055dc4dbed1ae33d95a9cf0412464558c5ff5aef',browser:browser.version(),route:'/lamp',rows,publicListingsStatus:response.status()},null,2)+'\n');
 console.log(JSON.stringify(rows,null,2));
} finally {await browser.close()}
