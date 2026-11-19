import assert from 'node:assert/strict';
import {execFileSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';
import {writeFileSync} from 'node:fs';
const root=execFileSync('npm',['root','-g'],{encoding:'utf8'}).trim();
const {chromium}=await import(pathToFileURL(root+'/playwright/index.mjs').href);
const out=process.argv[2];
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox','--use-mock-keychain','--password-store=basic']});
const rows=[];
try {
 for (const width of [1440,390]) {
  const context=await browser.newContext({viewport:{width,height:1000},deviceScaleFactor:1,reducedMotion:'reduce'});
  try {
   const page=await context.newPage();
   const response=await page.goto('http://127.0.0.1:3135/lamp',{waitUntil:'domcontentloaded'});
   if(width===1440) {
    assert.equal(response.status(),200);
    const listings=await page.request.get('http://127.0.0.1:3135/data/listings.json');
    const payload=await listings.json();
    const lamp=payload.listings.find(x=>x.slug==='lamp');
    const visible=await page.locator('dl div').filter({has:page.getByText('Version',{exact:true})}).locator('dd').innerText();
    assert.equal(visible,lamp.version);
    assert.equal(lamp.status,'released');
    rows.push({width,status:response.status(),version:visible,publicListingMatchesRenderedVersion:true});
   } else rows.push({width,proofOnly:true});
   await page.evaluate(()=>document.fonts.ready);
   await page.locator('main').screenshot({path:out+`/LAMP-${width}.png`});
  } finally {await context.close();}
 }
} finally {await browser.close();}
writeFileSync(out+'/BROWSER.json',JSON.stringify({rows},null,2)+'\n');
