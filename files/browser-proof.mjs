import {chromium} from '/home/agent/.local/lib/node_modules/playwright/index.mjs';
import {spawn} from 'node:child_process';
import {writeFileSync, openSync, closeSync} from 'node:fs';
import {setTimeout} from 'node:timers/promises';
import assert from 'node:assert/strict';
const packet=process.env.HOME+'/rer-consolidation/work/je-sync-34/packet';
const log=openSync(packet+'/browser-server.log','w');
const server=spawn(process.execPath,['node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port','31434'],{stdio:['ignore',log,log]});
writeFileSync(packet+'/browser-server.pid',String(server.pid)+'\n');
let browser;
const receipt={startedAt:new Date().toISOString(),serverPid:server.pid,url:'http://127.0.0.1:31434/oncall',screenshots:[],assertionWidth:1440};
try {
  let ready=false;
  for(let i=0;i<90;i++){
    if(server.exitCode!==null) throw new Error('server exited '+server.exitCode);
    try {const response=await fetch('http://127.0.0.1:31434/oncall'); if(response.ok){ready=true;break;}}catch{}
    await setTimeout(500);
  }
  assert.ok(ready,'production server ready');
  browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox','--use-mock-keychain','--password-store=basic']});
  for(const width of [1440,390]){
    const context=await browser.newContext({viewport:{width,height:1000},deviceScaleFactor:1,colorScheme:'light',reducedMotion:'reduce'});
    const page=await context.newPage();
    await page.goto(receipt.url,{waitUntil:'load',timeout:45000});
    await page.evaluate(()=>document.fonts.ready);
    if(width===1440){
      assert.equal(await page.getByText('v0.5.14',{exact:true}).count(),1,'published version shown once');
      assert.equal(await page.getByRole('heading',{name:'Oncall',exact:true}).count(),1,'Oncall page heading shown');
      receipt.desktopVersionAssertion='passed';
    }
    const name='oncall-'+width+'.png';
    await page.screenshot({path:packet+'/'+name,fullPage:true});
    receipt.screenshots.push({path:name,width,height:await page.evaluate(()=>document.documentElement.scrollHeight)});
    await context.close();
  }
  receipt.status='passed';
} catch(error) {
  receipt.status='failed'; receipt.error=error.message; process.exitCode=1;
} finally {
  if(browser) await browser.close();
  server.kill('SIGTERM');
  await new Promise(resolve=>server.once('exit',resolve));
  closeSync(log);
  receipt.serverStopped=true;
  receipt.finishedAt=new Date().toISOString();
  writeFileSync(packet+'/browser-receipt.json',JSON.stringify(receipt,null,2)+'\n');
  console.log(JSON.stringify(receipt,null,2));
}
