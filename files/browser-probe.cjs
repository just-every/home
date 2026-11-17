const {chromium}=require('/opt/codex/cua_node/lib/node_modules/playwright');
const fs=require('fs'); const path=require('path'); const crypto=require('crypto');
const root=path.join(process.env.HOME,'rer-consolidation/work/je-gate-56'); const packet=path.join(root,'packet');
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
 const results=[];
 try {
 for(const width of [1440,390]){
  for(const [label,port] of [['baseline',3191],['head',3192]]){
   const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce'});
   for(const route of ['/','/products','/uptime','/nook']){
    const page=await context.newPage(); const errors=[]; const consoles=[]; const failed=[];
    page.on('pageerror',e=>errors.push(String(e)));
    page.on('console',m=>{if(m.type()==='error')consoles.push(m.text());});
    page.on('requestfailed',r=>failed.push({url:r.url().split('?')[0],error:r.failure()?.errorText}));
    const response=await page.goto('http://127.0.0.1:'+port+route,{waitUntil:'domcontentloaded',timeout:60000});
    await page.locator('h1').waitFor({state:'visible',timeout:15000});
    await page.evaluate(()=>Promise.race([document.fonts.ready,new Promise(r=>setTimeout(r,5000))]));
    await page.waitForTimeout(1000);
    const data=await page.evaluate(()=>({text:document.body.innerText,structure:Array.from(document.querySelectorAll('body *')).filter(e=>getComputedStyle(e).display!=='none'&&!['SCRIPT','STYLE','LINK','META'].includes(e.tagName)).map(e=>[e.tagName,e.getAttribute('role'),e.getAttribute('href')]),headings:Array.from(document.querySelectorAll('h1,h2,h3,header,main,footer')).map(e=>{const r=e.getBoundingClientRect();return {tag:e.tagName,text:e.innerText.slice(0,100),x:r.x,y:r.y,width:r.width,height:r.height}}),scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth}));
    const screenshot=label+'-'+width+'-'+(route==='/'?'home':route.slice(1))+'.png';
    await page.screenshot({path:path.join(packet,screenshot),fullPage:true,animations:'disabled',timeout:60000});
    results.push({label,width,route,status:response.status(),errors,consoles,failed,screenshot,...data});
    await page.close();
   }
   await context.close();
  }
 }
 const comparisons=[];
 for(const width of [1440,390])for(const route of ['/','/products','/uptime','/nook']){
  const a=results.find(r=>r.label==='baseline'&&r.width===width&&r.route===route),b=results.find(r=>r.label==='head'&&r.width===width&&r.route===route);
  comparisons.push({width,route,text_equal:a.text===b.text,structure_equal:JSON.stringify(a.structure)===JSON.stringify(b.structure),headings_equal:JSON.stringify(a.headings)===JSON.stringify(b.headings),baseline_overflow:a.scrollWidth>a.clientWidth,head_overflow:b.scrollWidth>b.clientWidth,baseline_page_errors:a.errors,head_page_errors:b.errors,baseline_console_errors:a.consoles,head_console_errors:b.consoles});
 }
 const assets=[];
 for(const route of ['/brand.json','/data/listings.json']){
  const a=await fetch('http://127.0.0.1:3191'+route),b=await fetch('http://127.0.0.1:3192'+route);const aa=Buffer.from(await a.arrayBuffer()),bb=Buffer.from(await b.arrayBuffer());
  assets.push({route,baseline_status:a.status,head_status:b.status,identical:aa.equals(bb),bytes:aa.length,sha256:crypto.createHash('sha256').update(aa).digest('hex')});
 }
 fs.writeFileSync(path.join(packet,'browser.json'),JSON.stringify({results,comparisons,assets},null,2)+'\n');
 console.log(JSON.stringify({comparisons,assets},null,2));
 }finally{await browser.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
