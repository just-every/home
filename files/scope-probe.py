import datetime,hashlib,json,re,subprocess
from pathlib import Path
root=Path.cwd();p=root.parent/'packet'
def git(*args):return subprocess.check_output(['git',*args],text=True)
base=git('rev-parse','origin/main').strip();head=git('rev-parse','HEAD').strip()
paths=git('diff','--name-only','origin/main','HEAD').splitlines()
assert paths==['public/data/listings.json','scripts/seeds-sync/state.json','src/data/seed-pages.ts']
diff=git('diff','origin/main','HEAD','--',*paths);(p/'candidate.diff').write_text(diff)
assert not re.search(r'(?:gh[pousr]_|github_pat_|sk_live_|sk_test_|AIza|AKIA)[A-Za-z0-9_]{10,}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----',diff)
assert git('diff','--check','origin/main','HEAD')==''
log=git('log','origin/main..HEAD','--format=%H%n%an <%ae>%n%cn <%ce>%n%(trailers:only,unfold)');(p/'candidate-identities.txt').write_text(log)
for sha in git('rev-list','origin/main..HEAD').splitlines():
    fields=git('show','-s','--format=%an%x00%ae%x00%cn%x00%ce',sha).strip().split('\x00')
    assert fields==['Run Edit Run fleet','fleet@runeditrun.com','Run Edit Run fleet','fleet@runeditrun.com']
    assert not git('show','-s','--format=%(trailers:only,unfold)',sha).strip()
old=json.loads(git('show','origin/main:public/data/listings.json'));new=json.loads((root/'public/data/listings.json').read_text())
counts=lambda data:dict(total=len(data['listings']),released=sum(x['status']=='released' for x in data['listings']),comingSoon=sum(x['status']=='coming-soon' for x in data['listings']))
assert counts(old)==counts(new)==dict(total=49,released=35,comingSoon=14)
before={s['slug']:s for s in old['listings']};after={s['slug']:s for s in new['listings']}
assert before.keys()==after.keys()
assert not set(['beacon','relay','ferry','lily','brook','delta','barrow','linen']) & after.keys()
changes=[]
for slug in before:
    for key in before[slug]:
        if before[slug][key]!=after[slug][key]:changes.append({'slug':slug,'field':key,'before':before[slug][key],'after':after[slug][key]})
assert changes==[dict(slug='lamp',field='version',before='v1.11.14',after='v1.11.15')]
versions={slug:after[slug]['version'] for slug in ['happytohelp','lamp','uptime','oncall','orbit','spool']}
oldstate=json.loads(git('show','origin/main:scripts/seeds-sync/state.json'));newstate=json.loads((root/'scripts/seeds-sync/state.json').read_text())
statechanges=[]
for slug in oldstate['seeds']:
    for field in oldstate['seeds'][slug].keys() | newstate['seeds'][slug].keys():
        a=oldstate['seeds'][slug].get(field);b=newstate['seeds'][slug].get(field)
        if a!=b:statechanges.append(dict(slug=slug,field=field,before=a,after=b))
assert {r['slug'] for r in statechanges}=={'happytohelp','lamp','oncall','spool'}
assert all(r['field']=='open' or r['slug']=='lamp' and r['field'] in ['commit','sourceRef','tag','copy'] for r in statechanges)
pageold=git('show','origin/main:src/data/seed-pages.ts');pagenew=(root/'src/data/seed-pages.ts').read_text()
assert pageold.replace("version: 'v1.11.14'","version: 'v1.11.15'")==pagenew
row={'at':datetime.datetime.now(datetime.timezone.utc).isoformat(),'base':base,'head':head,'paths':paths,'commitsReviewed':git('rev-list','origin/main..HEAD').splitlines(),'credentialShapedDiffValues':0,'trailerCount':0,'countsBefore':counts(old),'countsAfter':counts(new),'listingChanges':changes,'versions':versions,'stateChanges':statechanges,'wordingChanged':False,'pricingSourceUnchanged':True,'sourceLock':'not applicable: no sources.lock.json or lock generator in this repository','contractViews':'not applicable: no CONTRACT.md, ACCEPTANCE.md or docs/CLAIMS.md or generator','migrationLedger':'not applicable: no migration-ledger check documented; migrations untouched'}
(p/'scope-receipt.json').write_text(json.dumps(row,indent=2)+'\n');print(json.dumps(row,indent=2))
