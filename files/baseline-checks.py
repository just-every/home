from pathlib import Path
import subprocess,os,json
root=Path.home()/'rer-consolidation/work/je-gate-56'; packet=root/'packet'; repo=root/'baseline'
env=dict(os.environ)
for k in list(env):
 if any(x in k.upper() for x in ('TOKEN','SECRET','PASSWORD','CLOUD_KEY','API_KEY','RER_RUN_ENV')): env.pop(k)
env['PATH']=str(Path.home()/'.rer/toolchain/gate-node22/node_modules/.bin')+':'+env['PATH']
env['NEXT_TELEMETRY_DISABLED']='1'; env['WRANGLER_SEND_METRICS']='false'
rows=[]
for i,cmd in enumerate([['npm','ci'],['npm','audit','--json'],['npm','audit','--omit=dev','--json'],['npm','run','build'],['env','NODE_ENV=production','npm','run','build:cloudflare']]):
 name=f'baseline-{i+1:02d}.log'; start=subprocess.check_output(['date','-u','+%Y-%m-%dT%H:%M:%SZ'],text=True).strip()
 print('START',start,cmd,flush=True)
 with (packet/name).open('w') as out:
  try: code=subprocess.run(cmd,cwd=repo,env=env,stdout=out,stderr=subprocess.STDOUT,timeout=900).returncode
  except subprocess.TimeoutExpired: code=124
 row=dict(command=cmd,start=start,end=subprocess.check_output(['date','-u','+%Y-%m-%dT%H:%M:%SZ'],text=True).strip(),exit=code,log=name)
 rows.append(row); (packet/'baseline-checks.json').write_text(json.dumps(rows,indent=2)+'\n'); print('END',row,flush=True)
 if i==0 and code: break
