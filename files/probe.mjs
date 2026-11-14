import { chromium } from './node_modules/playwright/index.mjs';
import assert from 'node:assert/strict';
import { writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
const [label, expectedVersion] = process.argv.slice(2);
const packet = process.env.HOME + '/rer-consolidation/work/je-gate-41/packet';
const browser = await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
const rows = [];
try {
  for (const width of [1440,390]) {
    const context = await browser.newContext({viewport:{width,height:1000},deviceScaleFactor:1,reducedMotion:'reduce'});
    const page = await context.newPage();
    const errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    const response = await page.goto('http://127.0.0.1:3141/happytohelp',{waitUntil:'domcontentloaded',timeout:30000});
    await page.locator('h1').waitFor({state:'visible',timeout:30000});
    await page.evaluate(()=>document.fonts.ready);
    const version = page.locator('dl > div').filter({has:page.locator('dt',{hasText:/^Version$/})}).locator('dd');
    await version.scrollIntoViewIfNeeded();
    const facts = await page.evaluate(()=>({viewport:innerWidth,documentWidth:document.documentElement.scrollWidth,bodyWidth:document.body.scrollWidth,h1:document.querySelector('h1')?.textContent,text:document.querySelector('main')?.innerText}));
    const versionText = await version.innerText();
    const versionBox = await version.boundingBox();
    const visible = await version.isVisible();
    const listingResponse=await page.request.get('http://127.0.0.1:3141/data/listings.json');
    const listings=await listingResponse.json();
    const listing=listings.listings.find(item=>item.slug==='happytohelp');
    if(width===1440) {
      assert.equal(response.status(),200);
      assert.equal(facts.h1,'HappyToHelp');
      assert.equal(versionText,expectedVersion);
      assert.equal(listing.version,expectedVersion);
      assert.equal(listing.status,'released');
      assert.equal(visible,true);
      assert.ok(facts.documentWidth<=width);
      assert.equal(errors.length,0);
    }
    const image=label+'-'+width+'.png';
    await page.screenshot({path:packet+'/'+image,fullPage:true,animations:'disabled',timeout:60000});
    const row={width,status:response.status(),h1:facts.h1,version:versionText,versionVisible:visible,versionBox,documentWidth:facts.documentWidth,bodyWidth:facts.bodyWidth,listingVersion:listing.version,listingStatus:listing.status,pageErrors:errors,screenshot:image};
    rows.push(row);
    if(width===1440) await writeFile(packet+'/'+label+'-rendered-copy.txt',facts.text+'\n');
    await context.close();
  }
} finally { await browser.close(); }
const receipt={timestamp:execFileSync('date',['-u','+%Y-%m-%dT%H:%M:%SZ'],{encoding:'utf8'}).trim(),label,head:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),route:'/happytohelp',assertedWidth:1440,visualWidths:[1440,390],rows};
await writeFile(packet+'/'+label+'-browser.json',JSON.stringify(receipt,null,2)+'\n');
console.log(JSON.stringify(receipt,null,2));
