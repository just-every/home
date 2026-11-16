import {chromium} from '/home/agent/.local/lib/node_modules/playwright-core/index.mjs';
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
const out='../packet/browser-proof';mkdirSync(out,{recursive:true});
const startedAt=execFileSync('date',['-u','+%Y-%m-%dT%H:%M:%SZ'],{encoding:'utf8'}).trim();
const browser=await chromium.launch({headless:true,executablePath:'/usr/bin/chromium',args:['--no-sandbox','--use-mock-keychain','--password-store=basic']});
const rows=[];
try{
 const ctx=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 const page=await ctx.newPage();
 for(const slug of ['orbit','spool']){
  const versions=JSON.parse(readFileSync(`../packet/releases-${slug}.json`,'utf8'));
  const listing=JSON.parse(readFileSync('public/data/listings.json','utf8')).listings.find(r=>r.slug===slug);
  const release=versions.find(r=>r.tag_name===listing.version && !r.draft && !r.prerelease && r.published_at && r.assets.some(a=>a.name==='rer-release.dsse.json'));
  assert.ok(release,'listing version must have published release metadata with envelope');
  const response=await page.goto(`http://127.0.0.1:3187/${slug}`,{waitUntil:'domcontentloaded'});
  assert.equal(response.status(),200);
  const row=page.locator('dl > div').filter({has:page.getByText('Version',{exact:true})});
  await row.waitFor();
  assert.equal((await row.locator('dd').innerText()).trim(),release.tag_name);
  const jsonld=await page.locator('script[type="application/ld+json"]').allTextContents();
  assert.ok(jsonld.some(t=>t.includes(release.tag_name)),'structured metadata exposes the listed release');
  await page.evaluate(()=>document.fonts.ready);
  await row.scrollIntoViewIfNeeded();
  await page.screenshot({path:`${out}/${slug}-1440.png`});
  rows.push({slug,width:1440,httpStatus:response.status(),version:release.tag_name,versionRowMatchesRelease:true,structuredMetadataMatchesRelease:true,screenshot:`browser-proof/${slug}-1440.png`});
  await page.setViewportSize({width:390,height:844});
  await row.scrollIntoViewIfNeeded();
  await page.screenshot({path:`${out}/${slug}-390.png`});
  rows.push({slug,width:390,screenshot:`browser-proof/${slug}-390.png`,observation:'phone screenshot only; assertions performed at 1440'});
  await page.setViewportSize({width:1440,height:1000});
 }
 await ctx.close();
} finally { await browser.close(); }
const finishedAt=execFileSync('date',['-u','+%Y-%m-%dT%H:%M:%SZ'],{encoding:'utf8'}).trim();
writeFileSync('../packet/browser-receipt.json',JSON.stringify({startedAt,finishedAt,origin:'http://127.0.0.1:3187',browser:'/usr/bin/chromium',rows},null,2)+'\n');
console.log(JSON.stringify(rows));
