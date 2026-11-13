import json
from pathlib import Path
import subprocess
import sys
import time
import urllib.request

root=Path.home()/'rer-consolidation/work/je-gate-34'
packet=root/'packet'
processes=[]
try:
    for name,port in [('home',3100),('baseline',3101)]:
        stream=(packet/f'{name}-server.log').open('w')
        process=subprocess.Popen(['node','node_modules/next/dist/bin/next','start','--hostname','127.0.0.1','--port',str(port)],cwd=root/name,stdout=stream,stderr=subprocess.STDOUT)
        processes.append((process,stream))
        for attempt in range(60):
            if process.poll() is not None:
                raise RuntimeError(f'{name} server exited {process.returncode}')
            try:
                with urllib.request.urlopen(f'http://127.0.0.1:{port}/lamp',timeout=3) as response:
                    if response.status==200:break
            except Exception:
                time.sleep(0.5)
        else:raise RuntimeError(f'{name} server did not start')
    (packet/'server-pids.json').write_text(json.dumps([{'pid':p.pid,'owned':True} for p,s in processes],indent=2)+'\n')
    result=subprocess.run(['node','/tmp/je-gate-browser.mjs',str(packet)])
    raise SystemExit(result.returncode)
finally:
    for process,stream in processes:
        if process.poll() is None:process.terminate()
        try:process.wait(timeout=15)
        except subprocess.TimeoutExpired:
            process.kill()
            process.wait()
        stream.close()
    (packet/'server-cleanup.json').write_text(json.dumps([{'pid':p.pid,'exit':p.returncode,'stopped':p.poll() is not None} for p,s in processes],indent=2)+'\n')
