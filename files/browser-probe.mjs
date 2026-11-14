import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import { createWriteStream, writeFileSync, readFileSync } from 'node:fs';
import { once } from 'node:events';
import { chromium } from './browser-tools/node_modules/playwright/index.mjs';

const root = new URL('.', import.meta.url).pathname;
const packet = `${root}packet/`;
const label = process.argv[2];
const cwd = `${root}${label === 'candidate' ? 'home' : 'baseline'}`;
const version = label === 'candidate' ? 'v1.11.16' : 'v1.11.15';
const port = label === 'candidate' ? 31443 : 31444;
const log = createWriteStream(`${packet}${label}-server.log`);
const server = spawn(process.execPath, [`${cwd}/node_modules/next/dist/bin/next`, 'start', '-p', String(port), '-H', '127.0.0.1'], {cwd, env: {...process.env, NODE_ENV:'production'}, stdio:['ignore','pipe','pipe']});
server.stdout.pipe(log); server.stderr.pipe(log);
const receipt={label,version,route:'/lamp',sha:label==='candidate'?'e7d336a0005e9a764869340199e6c007cbd51011':'1eb1fe9d9bf8683ec1e8ecdab8653a5ce6446a86',buildId:readFileSync(`${cwd}/.next/BUILD_ID`,'utf8').trim(),serverPid:server.pid,startedAt:new Date().toISOString(),screens:[]};
writeFileSync(`${packet}${label}-server-pid.json`,JSON.stringify({pid:server.pid,label},null,2)+'\n');
let browser;
try {
  let ready=false;
  for(let i=0;i<100;i++){
    try {const r=await fetch(`http://127.0.0.1:${port}/lamp`); if(r.status===200){ready=true;break;}} catch{}
    if(server.exitCode!==null) throw new Error(`Server exited ${server.exitCode}`);
    await new Promise(r=>setTimeout(r,200));
  }
  assert.ok(ready,'production server ready');
  browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox','--use-mock-keychain','--password-store=basic']});
  const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  const page=await context.newPage();
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  for(const width of [1440,390]){
    await page.setViewportSize({width,height:1000});
    const response=await page.goto(`http://127.0.0.1:${port}/lamp`,{waitUntil:'domcontentloaded',timeout:60000});
    await page.locator('h1').waitFor();
    await page.evaluate(()=>document.fonts.ready);
    const result=await page.evaluate(()=>{
      const version=[...document.querySelectorAll('dt')].find(e=>e.textContent==='Version')?.nextElementSibling;
      return {width:innerWidth,height:innerHeight,documentWidth:document.documentElement.scrollWidth,bodyWidth:document.body.scrollWidth,title:document.querySelector('h1')?.textContent,version:version?.textContent,text:document.body.innerText,versionBox:version?JSON.parse(JSON.stringify(version.getBoundingClientRect())):null};
    });
    result.httpStatus=response.status();
    result.screenshot=`${label}-lamp-${width}.png`;
    await page.screenshot({path:packet+result.screenshot,fullPage:true,animations:'disabled'});
    if(width===1440){
      assert.equal(result.httpStatus,200);
      assert.equal(result.title,'Lamp');
      assert.equal(result.version,version);
      assert.ok(result.documentWidth<=width,'no horizontal page overflow');
      const data=await (await context.request.get(`http://127.0.0.1:${port}/data/listings.json`)).json();
      assert.equal(data.listings.length,49);
      assert.equal(data.listings.filter(s=>s.status==='released').length,35);
      assert.equal(data.listings.filter(s=>s.status==='coming-soon').length,14);
      assert.equal(data.listings.find(s=>s.slug==='lamp').version,version);
      result.desktopAssertions='passed: HTTP 200, Lamp heading, exact version, no horizontal overflow, public JSON 49=35+14 and Lamp version';
    } else result.proofOnly=true;
    receipt.screens.push(result);
  }
  receipt.pageErrors=errors;
  receipt.status='passed';
} catch(e){receipt.status='failed';receipt.error=e.stack;process.exitCode=1;}
finally {
  if(browser) await browser.close();
  if(server.exitCode===null){
    server.kill('SIGTERM');
    await Promise.race([once(server,'exit'),new Promise(r=>setTimeout(r,5000))]);
  }
  receipt.serverExitCode=server.exitCode;receipt.serverSignal=server.signalCode;receipt.finishedAt=new Date().toISOString();
  writeFileSync(`${packet}${label}-browser.json`,JSON.stringify(receipt,null,2)+'\n');
  log.end();
  console.log(JSON.stringify({label,status:receipt.status,screens:receipt.screens.map(({width,version,documentWidth,httpStatus,screenshot})=>({width,version,documentWidth,httpStatus,screenshot})),pageErrors:receipt.pageErrors,serverPid:server.pid,serverSignal:server.signalCode,error:receipt.error}));
}
