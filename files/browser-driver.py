import os,signal,subprocess,sys,time,urllib.request
from pathlib import Path
packet=Path.home()/'rer-consolidation/work/je-gate-47/packet'
label=sys.argv[1]
with (packet/(label+'-server.log')).open('w') as log:
    server=subprocess.Popen(['node','node_modules/next/dist/bin/next','start','--port','34747','--hostname','127.0.0.1'],stdout=log,stderr=subprocess.STDOUT,start_new_session=True)
    print('started server PID='+str(server.pid),flush=True)
    try:
        for attempt in range(60):
            try:
                with urllib.request.urlopen('http://127.0.0.1:34747/uptime',timeout=2) as response:
                    if response.status==200:break
            except OSError:time.sleep(.5)
        else:raise RuntimeError('own server failed to start')
        subprocess.run(['node','/tmp/je-gate-47-browser.mjs',label],check=True,timeout=180)
    finally:
        os.killpg(server.pid,signal.SIGTERM)
        try:server.wait(timeout=10)
        except subprocess.TimeoutExpired:
            os.killpg(server.pid,signal.SIGKILL);server.wait()
        print('stopped own server PID='+str(server.pid),flush=True)
