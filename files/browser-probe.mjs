import { chromium } from 'playwright';
import assert from 'node:assert/strict';
import { writeFileSync } from 'node:fs';
const mode=process.argv[2];
const origin='http://127.0.0.1:3132';
const packet=new URL('../packet/',import.meta.url).pathname;
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
const rows=[];
try {
  for(const width of [1440,390]) {
    const context=await browser.newContext({viewport:{width,height:1000},deviceScaleFactor:1,reducedMotion:'reduce'});
    const page=await context.newPage();
    const errors=[];
    page.on('pageerror',error=>errors.push(error.message));
    const response=await page.goto(origin+'/uptime',{waitUntil:'domcontentloaded'});
    await page.locator('h1').waitFor();
    await page.evaluate(()=>document.fonts.ready);
    await page.evaluate(()=>document.querySelectorAll('video').forEach(v=>v.pause()));
    await page.locator('dt').filter({hasText:/^Version$/}).scrollIntoViewIfNeeded();
    const metrics=await page.evaluate(()=>{
      const dt=[...document.querySelectorAll('dt')].find(e=>e.textContent==='Version');
      const dd=dt?.parentElement.querySelector('dd');
      const bounds=dd?.getBoundingClientRect();
      return {title:document.title,h1:document.querySelector('h1')?.textContent,version:dd?.textContent,versionBounds:bounds?{x:bounds.x,y:bounds.y,width:bounds.width,height:bounds.height}:null,viewportWidth:innerWidth,documentWidth:document.documentElement.scrollWidth,bodyText:document.body.innerText,sections:[...document.querySelectorAll('h2')].map(e=>e.textContent)};
    });
    if(width===1440) {
      assert.equal(response.status(),200);
      assert.equal(metrics.h1,'Uptime');
      assert.equal(metrics.version,mode==='candidate'?'v0.5.9':'v0.5.8');
      assert.ok(metrics.documentWidth<=width,`horizontal overflow ${metrics.documentWidth}`);
      assert.deepEqual(errors,[]);
      if(mode==='candidate') {
        const data=await (await context.request.get(origin+'/data/listings.json')).json();
        assert.equal(data.listings.find(x=>x.slug==='uptime').version,metrics.version);
      }
    }
    await page.screenshot({path:packet+`${mode}-uptime-${width}.png`,fullPage:true});
    await page.screenshot({path:packet+`${mode}-uptime-${width}-version.png`});
    rows.push({mode,width,status:response.status(),...metrics,errors,assertions:width===1440?'public /uptime status, heading, version, horizontal bounds, runtime errors; candidate public JSON version agreement':'visual proof only'});
    await context.close();
  }
} finally { await browser.close(); }
writeFileSync(packet+`${mode}-browser.json`,JSON.stringify(rows,null,2)+'\n');
console.log(JSON.stringify(rows.map(({bodyText,...r})=>r),null,2));
