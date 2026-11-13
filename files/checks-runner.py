import subprocess,json,datetime
from pathlib import Path
root=Path.home()/'rer-consolidation/work/je-gate-35'; repo=root/'home'; packet=root/'packet'
rows=[]
for name,args in [('listings-check',['npm','run','listings','--','--check']),('listings-write',['npm','run','listings']),('type-check',['npm','run','type-check']),('lint',['npm','run','lint']),('build',['npm','run','build'])]:
 print('START',name,flush=True)
 start=datetime.datetime.now(datetime.timezone.utc).isoformat()
 with (packet/(name+'.log')).open('w') as out:
  r=subprocess.run(args,cwd=repo,stdout=out,stderr=subprocess.STDOUT)
 rows.append(dict(check=name,command=args,exit=r.returncode,started=start,ended=datetime.datetime.now(datetime.timezone.utc).isoformat()))
 (packet/'checks.json').write_text(json.dumps(rows,indent=2)+'\n')
 print('END',name,'exit='+str(r.returncode),flush=True)
 if r.returncode:print((packet/(name+'.log')).read_text()[-5000:],flush=True)
