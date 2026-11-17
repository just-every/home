from pathlib import Path
import os, subprocess, time, urllib.request,json
root=Path.home()/'rer-consolidation/work/je-gate-56';p=root/'packet';env=dict(os.environ)
for k in list(env):
 if any(x in k.upper() for x in ('TOKEN','SECRET','PASSWORD','CLOUD_KEY','API_KEY','RER_RUN_ENV')): env.pop(k)
env['PATH']=str(Path.home()/'.rer/toolchain/gate-node22/node_modules/.bin')+':'+env['PATH'];env['NEXT_TELEMETRY_DISABLED']='1'
servers=[];logs=[]
try:
 for label,port,repo in [('baseline',3191,'baseline'),('head',3192,'home')]:
  out=(p/(label+'-server.log')).open('w');logs.append(out)
  server=subprocess.Popen(['node','node_modules/next/dist/bin/next','start','-H','127.0.0.1','-p',str(port)],cwd=root/repo,env=env,stdout=out,stderr=subprocess.STDOUT)
  servers.append(server)
  for _ in range(60):
   try:
    with urllib.request.urlopen(f'http://127.0.0.1:{port}',timeout=3):break
   except Exception:
    if server.poll() is not None: raise RuntimeError(label+' server exited')
    time.sleep(1)
  else: raise RuntimeError(label+' server timeout')
 code=subprocess.run(['node','/tmp/gate-browser.cjs'],cwd=root,env=env,timeout=600).returncode
 (p/'browser-receipt.json').write_text(json.dumps(dict(exit=code,ports=[3191,3192],server_pids=[s.pid for s in servers],timestamp=subprocess.check_output(['date','-u','+%Y-%m-%dT%H:%M:%SZ'],text=True).strip()),indent=2)+'\n')
finally:
 for s in servers:
  if s.poll() is None:s.terminate()
 for s in servers:
  try:s.wait(timeout=10)
  except subprocess.TimeoutExpired:s.kill();s.wait()
 for log in logs:log.close()
