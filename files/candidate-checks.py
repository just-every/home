from pathlib import Path
import subprocess,os,json,sys
root=Path.home()/'rer-consolidation/work/je-gate-56'
repo=root/'home'
packet=root/'packet'
env=dict(os.environ)
for k in list(env):
 if any(x in k.upper() for x in ('TOKEN','SECRET','PASSWORD','CLOUD_KEY','API_KEY','RER_RUN_ENV')): env.pop(k)
env['PATH']=str(Path.home()/'.rer/toolchain/gate-node22/node_modules/.bin')+':'+env['PATH']
env['NEXT_TELEMETRY_DISABLED']='1'
env['WRANGLER_SEND_METRICS']='false'
commands=[['npm','ci'],['npm','run','type-check'],['npm','run','lint'],['npm','test'],['npm','run','listings','--','--check'],['npm','audit','--json'],['npm','audit','--omit=dev','--json'],['npm','run','build'],['env','NODE_ENV=production','npm','run','build:cloudflare']]
rows=[]
for i,cmd in enumerate(commands):
 start=subprocess.check_output(['date','-u','+%Y-%m-%dT%H:%M:%SZ'],text=True).strip()
 name=f'head-{i+1:02d}.log'
 print('START',start,cmd,flush=True)
 with (packet/name).open('w') as out:
  try: r=subprocess.run(cmd,cwd=repo,env=env,stdout=out,stderr=subprocess.STDOUT,timeout=900); code=r.returncode
  except subprocess.TimeoutExpired: code=124
 row=dict(command=cmd,start=start,end=subprocess.check_output(['date','-u','+%Y-%m-%dT%H:%M:%SZ'],text=True).strip(),exit=code,log=name)
 rows.append(row); (packet/'checks.json').write_text(json.dumps(rows,indent=2)+'\n')
 print('END',row,flush=True)
 if i==0 and code: break
