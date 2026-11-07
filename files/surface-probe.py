import datetime
import hashlib
import json
from pathlib import Path
import re
import subprocess
import sys

repo=Path(sys.argv[1]).resolve()
packet=Path(__file__).resolve().parent
base='706ef98b603a948b1352be2089ccf614e6f16aca'
head='025b26efa66630787eaf2fb5bf0549ac5ec6732c'
def git(*args):
    return subprocess.check_output(['git','-C',str(repo),*args],text=True).strip()
def content(sha,path):
    return subprocess.check_output(['git','-C',str(repo),'show',f'{sha}:{path}'])
assert git('rev-parse','HEAD')==head
assert git('show','-s','--format=%P',head)==base
assert git('diff','--name-status',base,head)=='M\tscripts/seeds-sync/state.json'
assert git('status','--porcelain=v1')==''
assert git('diff','--check',base,head)==''
log=git('log','origin/main..HEAD','--format=%H%x00%an%x00%ae%x00%cn%x00%ce%x00%(trailers:only,unfold)')
parts=log.split('\0')
assert len(parts)==6
assert parts[:5]==[head,'Run Edit Run fleet','fleet@runeditrun.com','Run Edit Run fleet','fleet@runeditrun.com']
assert parts[5]==''
before=json.loads(content(base,'scripts/seeds-sync/state.json'))
after=json.loads(content(head,'scripts/seeds-sync/state.json'))
assert before['syncedAt']=='2026-11-06T21:06:54.134Z'
assert after['syncedAt']=='2026-11-07T22:00:48.037Z'
deltas=[]
def compare(left,right,path=()):
    if isinstance(left,dict) and isinstance(right,dict):
        assert set(left)==set(right),path
        for key in left:
            compare(left[key],right[key],path+(key,))
    elif left!=right:
        deltas.append({'path':'.'.join(path),'before':left,'after':right})
compare(before,after)
assert len(deltas)==8
expected={'syncedAt',*[f'seeds.{s}.commit' for s in ['crank','mallet','placemat','platter']],*[f'seeds.{s}.copy.CONTRACT.md' for s in ['crank','placemat','platter']]}
assert {row['path'] for row in deltas}==expected
for row in deltas:
    pattern=r'\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d\.\d{3}Z' if row['path']=='syncedAt' else r'[a-f0-9]{40}' if row['path'].endswith('.commit') else r'[a-f0-9]{16}'
    assert re.fullmatch(pattern,row['after']),row['path']
views={}
for label,sha in [('baseline',base),('candidate',head)]:
    raw=content(sha,'public/data/listings.json')
    rows=json.loads(raw)['listings']
    counts={status:sum(r['status']==status for r in rows) for status in ['released','coming-soon']}
    assert len(rows)==49 and counts=={'released':35,'coming-soon':14}
    excluded=['beacon','relay','ferry','lily','brook','delta','barrow','linen']
    assert not set(excluded).intersection(r['slug'] for r in rows)
    for slug in ['crank','mallet','placemat','platter']:
        assert next(r for r in rows if r['slug']==slug)['status']=='coming-soon'
    views[label]={'total':len(rows),**counts,'listings_sha256':hashlib.sha256(raw).hexdigest(),'excludedAbsent':excluded}
assert views['baseline']==views['candidate']
assert (repo/'public/data/listings.json').read_bytes()==content(head,'public/data/listings.json')
treeProof={}
for path in ['src','public','tests','scripts/listings.mjs','scripts/seeds-sync/index.mjs','scripts/seeds-sync/detect','scripts/seeds-sync/sources','scripts/seeds-sync/apply','scripts/seeds-sync/overrides.json']:
    a=git('rev-parse',f'{base}:{path}')
    b=git('rev-parse',f'{head}:{path}')
    assert a==b,path
    treeProof[path]={'baseline':a,'candidate':b,'identical':True}
ci=json.loads((packet/'ci.json').read_text())
assert ci['id']==42418959568 and ci['head_sha']==head
assert ci['name']=='Verify branch' and ci['status']=='completed' and ci['conclusion']=='success'
pr=json.loads((packet/'pr.json').read_text())
assert pr['head']['sha']==head and pr['head']['ref']=='cloud/je-sync-11' and pr['state']=='open'
assert not any((repo/path).exists() for path in ['CONTRACT.md','ACCEPTANCE.md','sources.lock.json','docs/CLAIMS.md'])
receipt={'schema':1,'tag':'je-gate-19','recordedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'repository':'just-every/home','candidate':head,'baseline':base,'candidateBranch':'cloud/je-sync-11','productWorktree':'detached exact candidate; local cloud/je-gate-19 created at baseline, unpublished','pr':pr,'ci':ci,'githubApiInvocations':3,'githubApiBudget':10,'scope':{'paths':['scripts/seeds-sync/state.json'],'insertions':8,'deletions':8,'parsedValueChanges':deltas,'credentialDeltaCheck':'All changed values restricted to 1 ISO timestamp, 4 full lowercase commit SHAs, 3 16-hex digest prefixes; no other field or value changed.','identities':'Fleet author and committer, no trailers; entire candidate range including all parents checked.','publicTrees':treeProof},'counts':views,'checks':[{'command':'npm ci','exit':0,'log':'npm-ci.log'},{'command':'npm run listings -- --check','exit':0,'log':'listings-check.log'},{'command':'npm run listings','exit':0,'log':'listings-write.log'},{'command':'npm run type-check','exit':0,'log':'type-check.log'},{'command':'npm run lint','exit':0,'log':'lint.log'},{'command':'node --import tsx ../replay.mjs <clone>','exit':0,'log':'copy-replay.log'},{'command':'git diff --check 706ef98b603a948b1352be2089ccf614e6f16aca HEAD','exit':0},{'command':'git status --porcelain=v1','exit':0,'result':'empty; tracked worktree and index clean'}],'independentGeneration':{'sourceLock':'N/A: no sources.lock.json or source-lock command in this repository','contractViews':'N/A: no CONTRACT.md, ACCEPTANCE.md, docs/CLAIMS.md or documented generator','migrationLedger':'N/A: SQL migrations exist but no migration-ledger check is defined; unchanged','listings':'check and write both ran independently on exact candidate; no diff'},'clauseStatusChanges':[],'findings':[],'blockers':[],'verdict':'GATE PASS '+head}
(packet/'gate-receipt.json').write_text(json.dumps(receipt,indent=2)+'\n')
print(json.dumps({'candidate':head,'scope':'1 state file, 8 scalar changes','counts':views,'checks':'PASS','worktree':'clean','verdict':receipt['verdict']},indent=2))
