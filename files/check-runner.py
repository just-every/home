import datetime,json,subprocess,sys,time
from pathlib import Path
root=Path.home()/'rer-consolidation/work/je-gate-27'
name=sys.argv[1]; command=sys.argv[2:]
start=time.monotonic(); utc=datetime.datetime.now(datetime.timezone.utc).isoformat()
with (root/'packet'/f'{name}.log').open('w') as output:
    output.write('$ '+' '.join(command)+'\n'); output.flush()
    result=subprocess.run(command,stdout=output,stderr=subprocess.STDOUT)
row={'check':name,'command':command,'utc':utc,'exit':result.returncode,'duration_seconds':round(time.monotonic()-start,3),'head':subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip()}
path=root/'packet/checks.json'
rows=json.loads(path.read_text()) if path.exists() else []
rows.append(row);path.write_text(json.dumps(rows,indent=2)+'\n')
print(json.dumps(row));print((root/'packet'/f'{name}.log').read_text()[-5000:])
sys.exit(result.returncode)
