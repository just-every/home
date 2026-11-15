const {chromium}=require('/opt/codex/cua_node/lib/node_modules/playwright');
const fs=require('node:fs');
const cp=require('node:child_process');
(async()=>{
 const stamp=cp.execFileSync('date',['-u','+%Y-%m-%dT%H:%M:%SZ'],{encoding:'utf8'}).trim();
 const variant=process.argv[2]||'head';
 const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});
 const rows=[];
 try {
  const context=await browser.newContext({reducedMotion:'reduce'});
  for(const width of [1440,390]){
   const page=await context.newPage({viewport:{width,height:900}});
   await page.setViewportSize({width,height:900});
   const errors=[];page.on('pageerror',e=>errors.push(e.message));
   for(const [slug,newVersion,oldVersion] of [['lamp','v1.11.18','v1.11.17'],['spool','v0.7.12','v0.7.11']]) {
    const response=await page.goto('http://127.0.0.1:3137/'+slug,{waitUntil:'domcontentloaded'});
    await page.evaluate(()=>document.fonts.ready);
    await page.waitForTimeout(1500);
    const text=await page.locator('body').innerText();
    const version=variant==='head'?newVersion:oldVersion;
    const layout=await page.evaluate(()=>({viewport:innerWidth,width:document.documentElement.scrollWidth,h1:[...document.querySelectorAll('h1')].map(x=>x.textContent),height:document.body.scrollHeight}));
    if(response.status()!==200 || !text.includes(version) || layout.width>width+1 || errors.length) throw new Error(JSON.stringify({slug,width,variant,status:response.status(),version,layout,errors}));
    const file=`${variant}-${slug}-${width}.png`;
    await page.screenshot({path:'../packet/'+file,fullPage:true});
    fs.writeFileSync(`../packet/${variant}-${slug}-${width}.txt`,text+'\n');
    rows.push({timestamp:stamp,variant,slug,width,status:response.status(),version,layout,errors:[...errors],screenshot:file});
   }
   await page.close();
  }
  await context.close();
 } finally {await browser.close();}
 fs.writeFileSync(`../packet/browser-${variant}.json`,JSON.stringify(rows,null,2)+'\n');
 console.log(JSON.stringify(rows,null,2));
})().catch(e=>{console.error(e);process.exitCode=1});
