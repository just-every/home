const {chromium}=require('playwright');
const fs=require('node:fs');
const assert=require('node:assert/strict');
const path=require('node:path');
const mode=process.argv[2]||'candidate';
const out=path.join(process.env.HOME,'rer-consolidation/work/je-gate-25/packet');
const expected=mode==='candidate'?{orbit:'v0.4.5',spool:'v0.7.5',happytohelp:'v0.4.19',oncall:'v0.5.7'}:{orbit:'v0.4.4',spool:'v0.7.4',happytohelp:'v0.4.18',oncall:'v0.5.6'};
(async()=>{
 const browser=await chromium.launch({headless:true,executablePath:'/usr/bin/chromium',args:['--no-sandbox']});
 const results=[];
 try{
  for(const width of mode==='candidate'?[1440,390]:[1440]){
   const context=await browser.newContext({viewport:{width,height:1000},reducedMotion:'reduce'});
   for(const [slug,version] of Object.entries(expected)){
    const page=await context.newPage();const errors=[];
    page.on('pageerror',e=>errors.push(e.message));
    const response=await page.goto('http://127.0.0.1:4317/'+slug,{waitUntil:'domcontentloaded',timeout:60000});
    await page.evaluate(()=>document.fonts.ready);
    await page.locator('h1').waitFor({state:'visible'});
    const facts=await page.evaluate(()=>{
      const versionRow=[...document.querySelectorAll('dl div')].find(x=>x.querySelector('dt')?.textContent==='Version');
      const dd=versionRow?.querySelector('dd');const r=dd?.getBoundingClientRect();
      return {title:document.querySelector('h1')?.textContent,version:dd?.textContent,versionBox:r?{x:r.x,y:r.y,width:r.width,height:r.height}:null,viewport:innerWidth,scrollWidth:document.documentElement.scrollWidth,bodyWidth:document.body.scrollWidth,mainWidth:document.querySelector('main')?.scrollWidth,text:document.querySelector('main')?.innerText};
    });
    if(width===1440){
      assert.equal(response.status(),200);assert.equal(facts.version,version);
      assert.ok(facts.title.toLowerCase()===slug,'real product h1');
      assert.ok(facts.scrollWidth<=width+1,'horizontal overflow');
      assert.ok(facts.versionBox.width>0&&facts.versionBox.height>0,'version visible');
      assert.equal(errors.length,0,'page errors');
    }
    const file=`${mode}-${slug}-${width}.png`;
    await page.screenshot({path:path.join(out,file),fullPage:true,animations:'disabled',timeout:60000});
    results.push({mode,slug,width,status:response.status(),...facts,errors,screenshot:file,assertions:width===1440?'200, correct product/version, visible version, no horizontal overflow, no page errors':'visual proof and measured geometry only'});
    console.log(mode,slug,width,response.status(),facts.version,'scrollWidth='+facts.scrollWidth,'errors='+errors.length);
    await page.close();
   }
   await context.close();
  }
 }finally{await browser.close();}
 fs.writeFileSync(path.join(out,mode+'-browser.json'),JSON.stringify(results,null,2)+'\n');
})().catch(e=>{console.error(e);process.exitCode=1;});
