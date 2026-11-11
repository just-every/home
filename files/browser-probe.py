import json,os,subprocess,sys,time,urllib.request
from pathlib import Path
from playwright.sync_api import sync_playwright
root=Path.cwd(); packet=root.parent/'packet'; mode=sys.argv[1]
sha=subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip()
expected={'lamp':'v1.11.11','happytohelp':'v0.4.21'} if mode=='head' else {'lamp':'v1.11.10','happytohelp':'v0.4.20'}
port=38127
rows=[]
log=(packet/f'{mode}-server.log').open('w')
server=subprocess.Popen(['node','node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port',str(port)],stdout=log,stderr=subprocess.STDOUT)
(packet/f'{mode}-server-pid.json').write_text(json.dumps({'pid':server.pid,'sha':sha,'port':port})+'\n')
try:
    for attempt in range(60):
        if server.poll() is not None: raise RuntimeError('own server exited '+str(server.returncode))
        try:
            if urllib.request.urlopen(f'http://127.0.0.1:{port}/lamp',timeout=2).status==200:break
        except Exception:time.sleep(0.5)
    else:raise RuntimeError('own server did not become ready')
    with sync_playwright() as p:
        browser=p.chromium.launch(executable_path='/usr/bin/chromium',headless=True,args=['--no-sandbox','--use-mock-keychain','--password-store=basic'])
        try:
            for width in [1440,390]:
                context=browser.new_context(viewport={'width':width,'height':1000 if width==1440 else 844},device_scale_factor=1,reduced_motion='reduce')
                for slug,version in expected.items():
                    page=context.new_page();errors=[]
                    page.on('pageerror',lambda error:errors.append(str(error)))
                    response=page.goto(f'http://127.0.0.1:{port}/{slug}',wait_until='domcontentloaded',timeout=60000)
                    page.get_by_text(version,exact=False).first.wait_for(state='visible',timeout=15000)
                    page.evaluate('() => Promise.race([document.fonts.ready,new Promise(r=>setTimeout(r,5000))])')
                    page.screenshot(path=str(packet/f'{mode}-{slug}-{width}.png'),full_page=True,animations='disabled',timeout=15000)
                    text=page.locator('body').inner_text()
                    versions=page.get_by_text(version,exact=False)
                    geometry=page.evaluate('''() => ({viewport:innerWidth,documentWidth:document.documentElement.scrollWidth,bodyWidth:document.body.scrollWidth,height:document.documentElement.scrollHeight,h1:Array.from(document.querySelectorAll('h1')).map(e=>({text:e.innerText,x:e.getBoundingClientRect().x,width:e.getBoundingClientRect().width})),overflow:Array.from(document.querySelectorAll('main *')).filter(e=>{let b=e.getBoundingClientRect();return b.width>0&&(b.right>innerWidth+1||b.left< -1)}).slice(0,12).map(e=>({tag:e.tagName,class:e.className,text:e.innerText?.slice(0,90)}))})''')
                    row={'mode':mode,'sha':sha,'slug':slug,'width':width,'http':response.status,'version':version,'versionMatches':versions.count(),'layout':geometry,'pageErrors':errors,'bodyText':text}
                    rows.append(row)
                    if width==1440:
                        assert response.status==200,row
                        assert versions.count()>0,'version absent: '+slug
                        assert geometry['documentWidth']<=width,'horizontal page overflow: '+slug
                        assert not errors,errors
                    print(json.dumps({k:v for k,v in row.items() if k!='bodyText'}),flush=True)
                    page.close()
                context.close()
        finally:browser.close()
finally:
    server.terminate()
    try:server.wait(timeout=15)
    except subprocess.TimeoutExpired:server.kill();server.wait(timeout=10)
    log.close()
    (packet/f'{mode}-browser-receipt.json').write_text(json.dumps({'head':sha,'assertionWidth':1440,'rows':rows,'ownServerPid':server.pid,'ownServerStopped':True},indent=2)+'\n')
