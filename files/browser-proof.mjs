import { chromium } from './browser-tools/node_modules/playwright/index.mjs';
import {spawn} from 'node:child_process';
import {once} from 'node:events';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';
const task=path.dirname(new URL(import.meta.url).pathname);
const packet=path.join(task,'packet');
const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
const sha=b=>crypto.createHash('sha256').update(b).digest('hex');
let browser;
const servers=[];const logs=[];const proof={head:'fa8f9b53062373c3c4a0cab931fe7483f90fef34',baseline:'d9893baa5c4d862ab94e62cda6b9f43774a60e8f',assertionWidth:1440,observations:[]};
async function serve(directory,port,label){
 const stream=fs.createWriteStream(path.join(packet,label+'-server.log'));logs.push(stream);
 const child=spawn(process.execPath,[path.join(directory,'node_modules/next/dist/bin/next'),'start','--hostname','127.0.0.1','-p',String(port)],{cwd:directory,stdio:['ignore','pipe','pipe']});
 child.stdout.pipe(stream);child.stderr.pipe(stream);servers.push(child);
 for(let attempt=0;attempt<100;attempt++){
  if(child.exitCode!=null)throw new Error(label+' server exited '+child.exitCode);
  try{const r=await fetch(`http://127.0.0.1:${port}/lamp`);if(r.ok)return `http://127.0.0.1:${port}`;}catch{}
  await pause(200);
 }
 throw new Error(label+' server did not start');
}
try{
 browser=await chromium.launch({headless:true,executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
 const context=await browser.newContext({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 const page=await context.newPage();
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const [label,folder,port,version,widths] of [['baseline','baseline',3336,'v1.11.3',[1440]],['candidate','home',3337,'v1.11.4',[1440,390]]]){
  const base=await serve(path.join(task,folder),port,label);
  for(const width of widths){
   await page.setViewportSize({width,height:1000});
   const response=await page.goto(base+'/lamp',{waitUntil:'domcontentloaded'});
   await page.locator('dd').filter({hasText:version}).waitFor({state:'visible'});
   await page.evaluate(()=>document.fonts.ready);
   await pause(500);
   const html=await response.text();
   const visible=page.getByText(version,{exact:true});
   const metrics=await page.evaluate(()=>({viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth,title:document.title,main:document.querySelector('main')?.innerText??document.body.innerText,images:[...document.querySelectorAll('main img')].map(x=>x.getAttribute('src')),links:[...document.querySelectorAll('main a')].map(x=>({text:x.textContent,href:x.getAttribute('href')}))}));
   if(width===1440){
    assert.equal(response.status(),200);
    assert.equal(await visible.count(),1);
    assert.ok(await visible.isVisible());
    assert.ok(html.includes(version));
    assert.ok(!html.includes(label==='candidate'?'v1.11.3':'v1.11.4'));
    assert.ok(metrics.scrollWidth<=width,'desktop horizontal overflow');
    proof[label+'Main']=metrics.main;
    proof[label+'Images']=metrics.images;
    proof[label+'Links']=metrics.links;
   }
   await visible.scrollIntoViewIfNeeded();
   await page.screenshot({path:path.join(packet,`${label}-lamp-${width}.png`),animations:'disabled'});
   proof.observations.push({label,url:base+'/lamp',width,status:response.status(),version,versionVisible:await visible.isVisible(),scrollWidth:metrics.scrollWidth,title:metrics.title,servedHtmlSHA256:sha(html),screenshot:`${label}-lamp-${width}.png`});
  }
  const r=await fetch(base+'/data/listings.json');const bytes=Buffer.from(await r.arrayBuffer());
  assert.equal(r.status,200);assert.equal(sha(bytes),sha(fs.readFileSync(path.join(task,folder,'public/data/listings.json'))));
  const data=JSON.parse(bytes);assert.equal(data.listings.find(x=>x.slug==='lamp').version,version);
  proof[label+'ServedListings']={status:r.status,sha256:sha(bytes),lampVersion:version,count:data.listings.length};
 }
 assert.equal(proof.candidateMain.replaceAll('v1.11.4','v1.11.3'),proof.baselineMain);
 assert.deepEqual(proof.candidateImages,proof.baselineImages);
 assert.deepEqual(proof.candidateLinks,proof.baselineLinks);
 proof.regressionComparison='main rendered text differs only by Lamp version; main image and link lists identical at 1440';
 proof.pageErrors=errors;assert.deepEqual(errors,[]);
 proof.result='PASS';
 console.log(proof.regressionComparison);
}catch(error){proof.result='FAIL';proof.error=String(error);console.error(error);process.exitCode=1;}
finally{
 if(browser)await browser.close();
 proof.serverPIDs=servers.map(s=>s.pid);
 for(const server of servers){if(server.exitCode===null){server.kill('SIGTERM');await once(server,'exit');}}
 for(const stream of logs)stream.end();
 proof.browserClosed=true;proof.serversStopped=true;
 fs.writeFileSync(path.join(packet,'browser-receipt.json'),JSON.stringify(proof,null,2)+'\n');
 console.log(JSON.stringify({result:proof.result,observations:proof.observations,browserClosed:proof.browserClosed,serversStopped:proof.serversStopped},null,2));
}
