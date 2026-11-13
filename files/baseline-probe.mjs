import {chromium} from 'playwright';
import {readFileSync,writeFileSync} from 'node:fs';
import assert from 'node:assert/strict';
const packet=process.env.HOME+'/rer-consolidation/work/je-gate-39/packet';
const browser=await chromium.launch({headless:true,executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
try {
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});const page=await context.newPage();
 const response=await page.goto('http://127.0.0.1:3140/lamp',{waitUntil:'domcontentloaded'});
 await page.evaluate(()=>Promise.race([document.fonts.ready,new Promise(resolve=>setTimeout(resolve,10000))]));
 const text=await page.locator('body').innerText();
 const head=readFileSync(`${packet}/lamp-text-1440.txt`,'utf8').trimEnd();
 assert.equal(response.status(),200);assert.equal(text.replaceAll('v1.11.14','v1.11.15'),head);
 const metrics=await page.evaluate(()=>({viewport:innerWidth,documentWidth:document.documentElement.scrollWidth,title:document.querySelector('h1')?.innerText}));
 await page.screenshot({path:`${packet}/baseline-lamp-1440.png`,fullPage:true,animations:'disabled'});
 await page.getByText('v1.11.14',{exact:false}).last().scrollIntoViewIfNeeded();
 await page.screenshot({path:`${packet}/baseline-lamp-version-1440.png`,animations:'disabled'});
 writeFileSync(`${packet}/regression-receipt.json`,JSON.stringify({at:new Date().toISOString(),head:'055dc4dbed1ae33d95a9cf0412464558c5ff5aef',base:'8d4a1a7af1f507fb24e1f6e2502bf0e967f31663',width:1440,status:response.status(),metrics,visibleTextDiff:'only v1.11.14 -> v1.11.15',assertion:'baseline visible body text with version replacement equals candidate visible body text'},null,2)+'\n');
 console.log('Baseline /lamp 1440: HTTP 200; body text matches candidate except version.');
 await context.close();
} finally {await browser.close()}
