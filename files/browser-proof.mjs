import { execFileSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';
const root = execFileSync('npm', ['root','-g'], {encoding:'utf8'}).trim();
const { chromium } = await import(pathToFileURL(`${root}/playwright/index.mjs`).href);
const packet = process.argv[2];
const stamp = execFileSync('date',['-u','+%Y-%m-%dT%H:%M:%SZ'],{encoding:'utf8'}).trim();
const browser = await chromium.launch({headless:true,executablePath:'/usr/bin/chromium',args:['--no-sandbox','--use-mock-keychain','--password-store=basic']});
const results = [];
try {
  for (const width of [1440,390]) {
    const context = await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce'});
    try {
      const page = await context.newPage();
      const response = await page.goto('http://127.0.0.1:34159/happytohelp',{waitUntil:'domcontentloaded'});
      const versionGroup = page.locator('dl > div').filter({has:page.locator('dt').filter({hasText:/^Version$/})});
      if (width===1440) {
        const manifest = await (await context.request.get('http://127.0.0.1:34159/data/listings.json')).json();
        const expected = manifest.listings.find(s=>s.slug==='happytohelp').version;
        assert.equal(response.status(),200);
        assert.equal((await versionGroup.locator('dd').innerText()).trim(),expected);
        const structuredData=await page.locator('script[type="application/ld+json"]').allTextContents();
        assert.ok(structuredData.some(text=>text.includes(`"softwareVersion":"${expected}"`)));
        const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth);
        assert.equal(overflow,false);
        results.push({width,assertions:'page loads, displayed version and SEO match public catalogue, no horizontal overflow',version:expected,status:'passed'});
      } else {
        results.push({width,proof:'phone screenshot of the same changed page',version:(await versionGroup.locator('dd').innerText()).trim(),status:'captured'});
      }
      await page.evaluate(()=>document.fonts.ready);
      await versionGroup.scrollIntoViewIfNeeded();
      await page.screenshot({path:`${packet}/happytohelp-${width}.png`});
    } finally { await context.close(); }
  }
} finally { await browser.close(); }
writeFileSync(`${packet}/browser-receipt.json`,JSON.stringify({observedAt:stamp,url:'http://127.0.0.1:34159/happytohelp',results},null,2)+'\n');
console.log(JSON.stringify(results));
