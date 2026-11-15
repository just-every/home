import { chromium } from '/home/agent/.local/lib/node_modules/playwright/index.mjs';
import { writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
const packet = new URL('./packet/', import.meta.url).pathname;
const observations = [];
const browser = await chromium.launch({headless:true,executablePath:'/usr/bin/chromium',args:['--no-sandbox','--use-mock-keychain','--password-store=basic']});
try {
  for (const width of [1440,390]) {
    const context = await browser.newContext({viewport:{width,height:900},deviceScaleFactor:1,colorScheme:'light',reducedMotion:'reduce'});
    try {
      for (const [slug,version] of [['uptime','v0.5.13'],['oncall','v0.5.16']]) {
        const page = await context.newPage();
        const errors=[];
        page.on('pageerror',e=>errors.push(e.message));
        const response=await page.goto('http://127.0.0.1:3039/'+slug,{waitUntil:'domcontentloaded',timeout:45000});
        await page.evaluate(()=>document.fonts.ready);
        const visibleVersion=await page.locator('dl').innerText();
        const ld=await page.locator('script[type="application/ld+json"]').allTextContents();
        if(width===1440) {
          if(response.status()!==200||!visibleVersion.includes(version)||!ld.some(t=>t.includes(version))||errors.length) throw new Error(JSON.stringify({slug,status:response.status(),visibleVersion,errors}));
        }
        await page.locator('dl').scrollIntoViewIfNeeded();
        await page.screenshot({path:packet+`browser-${slug}-${width}.png`,fullPage:false});
        observations.push({slug,width,status:response.status(),version:visibleVersion,documentWidth:await page.evaluate(()=>document.documentElement.scrollWidth),viewportWidth:width,pageErrors:errors,screenshot:`browser-${slug}-${width}.png`,assertionWidth:1440});
        await page.close();
      }
    } finally {await context.close();}
  }
} finally {await browser.close();}
writeFileSync(packet+'browser-receipt.json',JSON.stringify({author:'Run Edit Run fleet',observedAt:execFileSync('date',['-u','+%Y-%m-%dT%H:%M:%SZ'],{encoding:'utf8'}).trim(),head:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),assertions:'HTTP 200, correct rendered version, correct JSON-LD version, no page errors at 1440; screenshots at 1440 and 390',observations},null,2)+'\n');
console.log(JSON.stringify(observations,null,2));
