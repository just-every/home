import { chromium } from '/tmp/je-gate-browser/node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
const packet=new URL('./',import.meta.url);
const browser=await chromium.launch({headless:true,executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
const results={};
try {
  for (const [name,port,version] of [['candidate',3117,'v0.4.23'],['baseline',3118,'v0.4.22']]) {
    const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
    const page=await context.newPage();
    const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    const response=await page.goto('http://127.0.0.1:'+port+'/happytohelp',{waitUntil:'load',timeout:60000});
    await page.evaluate(()=>document.fonts.ready);
    await page.locator('h1').waitFor();
    const body=await page.locator('main').innerText();
    assert.equal(response.status(),200);
    assert.equal(await page.locator('h1').innerText(),'HappyToHelp');
    const versionNode=page.locator('dl div').filter({has:page.getByText('Version',{exact:true})});
    assert.equal(await versionNode.locator('dd').innerText(),version);
    const listingsResponse=await page.request.get('http://127.0.0.1:'+port+'/data/listings.json');
    assert.equal(listingsResponse.status(),200);
    const listings=await listingsResponse.json();
    assert.equal(listings.listings.find(x=>x.slug==='happytohelp').version,version);
    assert.equal(listings.listings.length,49);
    const geometry=await page.evaluate(()=>({viewport:innerWidth,width:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight}));
    assert.ok(geometry.width<=1440,JSON.stringify(geometry));
    assert.deepEqual(errors,[]);
    const facts=await page.locator('dl').boundingBox();
    const geometryElements=await page.locator('h1,main article,main section,main dl').evaluateAll(elements=>elements.map(el=>{const r=el.getBoundingClientRect();return {tag:el.tagName,id:el.id,x:r.x,y:r.y,width:r.width,height:r.height};}));
    results[name]={url:response.url(),status:response.status(),version,counts:{total:listings.listings.length,released:listings.listings.filter(x=>x.status==='released').length,soon:listings.listings.filter(x=>x.status==='coming-soon').length},body,geometry,geometryElements,errors};
    // The version lives at the bottom of the same real route; proof frames show its surrounding section.
    await page.locator('dl').scrollIntoViewIfNeeded();
    await page.screenshot({path:new URL(name+'-1440.png',packet).pathname,animations:'disabled'});
    await page.setViewportSize({width:390,height:844});
    await page.locator('dl').scrollIntoViewIfNeeded();
    await page.evaluate(()=>document.fonts.ready);
    results[name].phoneGeometry=await page.evaluate(()=>({viewport:innerWidth,width:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight}));
    await page.screenshot({path:new URL(name+'-390.png',packet).pathname,animations:'disabled'});
    await context.close();
  }
  assert.equal(results.candidate.body.replaceAll('v0.4.23','VERSION'),results.baseline.body.replaceAll('v0.4.22','VERSION'));
  assert.deepEqual(results.candidate.geometryElements,results.baseline.geometryElements);
  console.log('PASS real production /happytohelp and /data/listings.json at 1440: HTTP 200, correct old/new version, counts, no horizontal overflow or page errors; main content and layout identical except version. Candidate and baseline proof captured at 1440 and 390.');
  await fs.writeFile(new URL('browser-receipt.json',packet),JSON.stringify(results,null,2)+'\n');
} finally { await browser.close(); }
