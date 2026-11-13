import json,subprocess,hashlib,re,datetime
from pathlib import Path
r=Path.home()/'rer-consolidation/work/je-gate-37-c1';h=r/'home'; p=r/'packet'
def git(*args):return subprocess.check_output(['git','-C',str(h),*args],text=True)
def load(ref,path):return json.loads(git('show',ref+':'+path))
base=git('rev-parse','origin/main').strip();head=git('rev-parse','HEAD').strip()
assert base=='1b7c84f81246cce3a6d7b26bffc31ea1ca0370a0'
assert head=='edfb1132486eaac9f87843199561c3230d5132df'
assert git('diff','--name-only',base,head).splitlines()==['public/data/listings.json','scripts/seeds-sync/state.json','src/data/seed-pages.ts']
old=load(base,'public/data/listings.json');new=load(head,'public/data/listings.json')
expected={'uptime':('v0.5.10','v0.5.11'),'oncall':('v0.5.11','v0.5.12'),'orbit':('v0.4.8','v0.4.9')}
a={v['slug']:v for v in old['listings']};b={v['slug']:v for v in new['listings']}
assert len(a)==len(b)==49 and a.keys()==b.keys()
counts=lambda d:dict(total=len(d),released=sum(x['status']=='released' for x in d.values()),coming_soon=sum(x['status']=='coming-soon' for x in d.values()))
assert counts(a)==counts(b)==dict(total=49,released=35,coming_soon=14)
assert not set(['beacon','relay','ferry','lily','brook','delta','barrow','linen'])&b.keys()
for slug in a:
 if slug in expected:
  assert (a[slug]['version'],b[slug]['version'])==expected[slug]
  before=dict(a[slug]);after=dict(b[slug]);before.pop('version');after.pop('version');assert before==after
 else:assert a[slug]==b[slug]
assert {s:b[s]['version'] for s in ['happytohelp','lamp','spool']}=={'happytohelp':'v0.4.24','lamp':'v1.11.14','spool':'v0.7.9'}
oldpages=git('show',base+':src/data/seed-pages.ts');newpages=git('show',head+':src/data/seed-pages.ts')
normalized=newpages
for oldv,newv in expected.values():
 # All three strings occur in other seeds too: compare precisely by slug blocks.
 pass
blocks=lambda s: re.split(r"(?=  \{\n    slug: ')",s)
ob,nb=blocks(oldpages),blocks(newpages);assert len(ob)==len(nb)
for before,after in zip(ob,nb):
 m=re.match(r"  \{\n    slug: '([^']+)'",before)
 if m and m[1] in expected:
  ov,nv=expected[m[1]];assert before.replace("version: '"+ov+"'","version: '"+nv+"'")==after
 else:assert before==after
oldstate=load(base,'scripts/seeds-sync/state.json');newstate=load(head,'scripts/seeds-sync/state.json')
def changes(a,b,path=()):
 if isinstance(a,dict) and isinstance(b,dict):
  for k in sorted(a.keys()|b.keys()):
   if k not in a:yield ('.'.join((*path,k)),None,b[k])
   elif k not in b:yield ('.'.join((*path,k)),a[k],None)
   else:yield from changes(a[k],b[k],(*path,k))
 elif a!=b:yield ('.'.join(path),a,b)
delta=list(changes(oldstate,newstate))
for path,*_ in delta:
 parts=path.split('.')
 assert path=='syncedAt' or (parts[0]=='seeds' and ((parts[1] in expected and (parts[2] in ['commit','sourceRef','tag','open'] or parts[2:3]==['copy'])) or (parts[1]=='spool' and parts[2]=='open')))
tags=json.loads((p/'tag-commits.json').read_text())['data']
releases=[]
for slug,(ov,nv) in expected.items():
 st=newstate['seeds'][slug];assert st['tag']==st['sourceRef']==b[slug]['version']==nv
 assert tags[slug]['object']['oid']==st['commit']
 data=(r/(slug+'-CONTRACT.md')).read_bytes();assert hashlib.sha256(data).hexdigest()[:16]==st['copy']['CONTRACT.md']
 rows=[x for x in json.loads((p/(slug+'-releases.json')).read_text()) if x['tag_name']==nv]
 assert len(rows)==1
 rel=rows[0];assert not rel['draft'] and not rel['prerelease']
 assert any(x['name']=='rer-release.dsse.json' and x['state']=='uploaded' for x in rel['assets'])
 releases.append({'seed':slug,'before':ov,'after':nv,'commit':st['commit'],'contract_sha256':hashlib.sha256(data).hexdigest(),'release':rel,'contract_unchanged_from_baseline_record':oldstate['seeds'][slug]['copy']['CONTRACT.md']==st['copy']['CONTRACT.md']})
log=git('log','origin/main..HEAD','--format=%an <%ae>%n%cn <%ce>%n%(trailers:only,unfold)')
assert log.splitlines()[:2]==['Run Edit Run fleet <fleet@runeditrun.com>']*2
assert git('rev-list','--count','origin/main..HEAD').strip()=='1'
assert not git('log','origin/main..HEAD','--format=%(trailers:only,unfold)').strip()
diff=git('diff',base,head)
# Inspect only added values on the candidate surface; never print potential matches.
adds='\n'.join(x[1:] for x in diff.splitlines() if x.startswith('+') and not x.startswith('+++'))
patterns=[r'-----BEGIN (?:RSA |OPENSSH |EC )?PRIVATE KEY',r'\b(?:gh[pousr]_|github_pat_)[A-Za-z0-9_]{10,}',r'\bAKIA[A-Z0-9]{16}\b',r'\bsk_(?:live|test)_[A-Za-z0-9]{10,}',r'https?://[^\s/@]+:[^\s/@]+@',r'(?i)(?:password|api[_-]?key|secret|access[_-]?token)\s*[:=]\s*[\x22\x27][^\x22\x27]{8,}']
assert not any(re.search(p,adds) for p in patterns)
(p/'candidate.diff').write_text(diff)
(p/'commit-identities.txt').write_text(git('log','origin/main..HEAD','--format=%H%n%an <%ae>%n%cn <%ce>%n%B'))
result=dict(at=datetime.datetime.now(datetime.timezone.utc).isoformat(),base=base,head=head,paths=git('diff','--name-only',base,head).splitlines(),before=counts(a),after=counts(b),state_changes=[dict(path=x,before=y,after=z) for x,y,z in delta],releases=releases,wording_unchanged=True,other_versions_and_statuses_unchanged=True,excluded_absent=True,credential_shape_scan='pass; added lines only',identities='pass; one candidate commit; fleet author and committer; no trailers',pricing='No pricing path or wording changed; Assisted/Managed price text does not occur in this checkout at either revision')
(p/'data-receipt.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps(result,indent=2))
