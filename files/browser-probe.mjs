import { chromium } from '/opt/codex/cua_node/lib/node_modules/playwright/index.mjs';
import { spawn, execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
const packet=path.join(process.env.HOME,'rer-consolidation/work/je-gate-49/packet');
const label=process.argv[2] || 'head';
const port=3017;
const now=()=>execFileSync('date',['-u','+%Y-%m-%dT%H:%M:%SZ'],{encoding:'utf8'}).trim();
const log=fs.openSync(path.join(packet,`${label}-server.log`),'w');
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port',String(port)],{stdio:['ignore',log,log]});
let browser;
const result={label,head:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),started:now(),serverPid:server.pid,pages:[]};
try {
 for(let i=0;i<60;i++) {
   try { if((await fetch(`http://127.0.0.1:${port}/happytohelp`)).ok) break; } catch {}
   if(i===59) throw new Error('production server not ready');
   await new Promise(r=>setTimeout(r,500));
 }
 browser=await chromium.launch({headless:true,executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
 for(const width of [1440,390]) {
   const context=await browser.newContext({viewport:{width,height:900},reducedMotion:'reduce'});
   const page=await context.newPage();
   const errors=[]; page.on('pageerror',x=>errors.push(x.message));
   const response=await page.goto(`http://127.0.0.1:${port}/happytohelp`,{waitUntil:'load'});
   await page.evaluate(()=>document.fonts.ready);
   const version=page.locator('dl > div').filter({has:page.locator('dt',{hasText:'Version'})});
   const title=await page.locator('h1').innerText();
   const versionText=await version.locator('dd').innerText();
   const geo=await page.evaluate(()=>({viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth,bodyWidth:document.body.scrollWidth,height:document.documentElement.scrollHeight}));
   if(width===1440) {
     if(response.status()!==200 || title!=='HappyToHelp') throw new Error('real HappyToHelp route failed');
     if(versionText!==(label==='main'?'v0.4.28':'v0.4.31')) throw new Error('wrong version '+versionText);
     if(geo.scrollWidth>width) throw new Error('horizontal overflow');
     const data=await (await context.request.get(`http://127.0.0.1:${port}/data/listings.json`)).json();
     if(data.listings.length!==49) throw new Error('listings endpoint count');
     const lamp=await context.request.get(`http://127.0.0.1:${port}/lamp`);
     if(lamp.status()!==200 || !(await lamp.text()).includes('v1.11.19')) throw new Error('Lamp version sentinel');
   }
   await page.screenshot({path:path.join(packet,`${label}-happytohelp-${width}.png`),fullPage:true,animations:'disabled'});
   await version.scrollIntoViewIfNeeded();
   await page.screenshot({path:path.join(packet,`${label}-version-${width}.png`),animations:'disabled'});
   result.pages.push({width,status:response.status(),title,version:versionText,geometry:geo,pageErrors:errors});
   await context.close();
 }
 result.status='passed';
} catch(error) {result.status='failed';result.error=String(error);process.exitCode=1;}
finally {
 if(browser) await browser.close();
 server.kill('SIGTERM');
 await new Promise(resolve=>server.once('exit',resolve));
 fs.closeSync(log);
 result.ended=now(); result.serverStopped=true;
 fs.writeFileSync(path.join(packet,`${label}-browser.json`),JSON.stringify(result,null,2)+'\n');
 console.log(JSON.stringify(result,null,2));
}
