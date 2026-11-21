import subprocess,urllib.request,time,os,signal,sys
from pathlib import Path
root=Path.home()/'rer-consolidation/work/je-gate-66'
mode=sys.argv[1]
def descendants(pid):
 result=[]
 try:children=Path(f'/proc/{pid}/task/{pid}/children').read_text().split()
 except FileNotFoundError:return []
 for child in children:result+=[int(child)]+descendants(child)
 return result
with (root/(mode+'-server.log')).open('w') as log:
 server=subprocess.Popen(['node','node_modules/next/dist/bin/next','start','-p','3186','-H','127.0.0.1'],stdout=log,stderr=subprocess.STDOUT,start_new_session=True)
 try:
  for i in range(60):
   try:
    with urllib.request.urlopen('http://127.0.0.1:3186/uptime',timeout=2) as r:
     if r.status==200:break
   except Exception:
    if server.poll() is not None:raise RuntimeError('own production server exited')
    time.sleep(1)
  else:raise RuntimeError('own production server not ready')
  subprocess.run(['python3','/tmp/rer-reap.py','node','/tmp/je-gate-66-browser.mjs',mode],check=True,timeout=180)
 finally:
  owned=[server.pid]+descendants(server.pid)
  (root/(mode+'-server-pids.txt')).write_text('\n'.join(map(str,owned))+'\n')
  for pid in reversed(owned):
   try:os.kill(pid,signal.SIGTERM)
   except ProcessLookupError:pass
  server.wait(timeout=20)
