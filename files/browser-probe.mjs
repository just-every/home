import {chromium} from '/opt/codex/runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright/index.mjs';
import fs from 'node:fs/promises';
import assert from 'node:assert/strict';
const packet=process.argv[2];
const versions={lamp:['v1.11.13','v1.11.14'],uptime:['v0.5.9','v0.5.10'],oncall:['v0.5.10','v0.5.11'],orbit:['v0.4.7','v0.4.8']};
const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
const rows=[];
try {
  for (const width of [1440,390]) {
    const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
    for(const [slug,[oldVersion,newVersion]] of Object.entries(versions)) {
      const pair=[];
      for(const [label,port,expected] of [['baseline',3101,oldVersion],['candidate',3100,newVersion]]) {
        const page=await context.newPage();
        const errors=[];
        page.on('pageerror',e=>errors.push(e.message));
        const response=await page.goto(`http://127.0.0.1:${port}/${slug}`,{waitUntil:'domcontentloaded'});
        await page.evaluate(()=>document.fonts.ready);
        await page.locator('dl').waitFor();
        await page.waitForTimeout(700);
        // One ordinary route probe at 1440. The 390 pass supplies browser proof.
        if(width===1440) {
          assert.equal(response.status(),200);
          assert.equal(await page.locator('h1').innerText(),slug==='oncall'?'Oncall':slug[0].toUpperCase()+slug.slice(1));
          assert.equal(await page.locator('dl').getByText(expected,{exact:true}).count(),1);
          assert.equal(errors.length,0,errors.join('\n'));
        }
        const state=await page.evaluate(()=>({
          text:document.querySelector('main').innerText,
          viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth,
          contentHeight:document.documentElement.scrollHeight,
          facts:[...document.querySelectorAll('dl > div')].map(el=>({label:el.querySelector('dt')?.innerText,value:el.querySelector('dd')?.innerText,rect:(()=>{let r=el.getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height}})()})),
          claims:[...document.querySelectorAll('[data-contract-id]')].map(el=>({id:el.getAttribute('data-contract-id'),text:el.innerText})),
          horizontalOverflow:[...document.querySelectorAll('main *')].filter(el=>{let r=el.getBoundingClientRect();let s=getComputedStyle(el);return s.visibility!=='hidden'&&s.display!=='none'&&r.width>0&&(r.left< -1||r.right>innerWidth+1)}).map(el=>({tag:el.tagName,class:el.className})).slice(0,10)
        }));
        if(width===1440)assert.ok(state.scrollWidth<=width+1,`${slug}: document overflow ${state.scrollWidth}`);
        // Scroll lazy assets into view before the single full-page proof capture.
        await page.locator('dl').scrollIntoViewIfNeeded();
        await page.waitForTimeout(350);
        await page.screenshot({path:`${packet}/${label}-${slug}-${width}.png`,fullPage:true,animations:'disabled'});
        rows.push({label,slug,width,status:response.status(),expected,errors,...state});
        pair.push(state);
        await page.close();
      }
      if(width===1440){
        assert.equal(pair[0].text.replaceAll(oldVersion,'<version>'),pair[1].text.replaceAll(newVersion,'<version>'));
        assert.deepEqual(pair[0].claims,pair[1].claims);
      }
    }
    await context.close();
  }
  await fs.writeFile(`${packet}/browser-receipt.json`,JSON.stringify({head:'0396a50284d16568b52f397e13787cf9440f3ad5',baseline:'7212b2fd1cb0bfe9241752dc64d37a407f0b004f',assertionWidth:1440,proofWidths:[1440,390],browser:await browser.version(),rows},null,2)+'\n');
  console.log('PASS: four built routes; candidate/main text identical apart from intended versions; no document overflow or page errors at 1440. Proof captured at 1440 and 390.');
} finally {await browser.close();}
