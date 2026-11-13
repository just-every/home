from pathlib import Path
import json,subprocess,re,hashlib
repo=Path.home()/'rer-consolidation/work/je-gate-35/home'; packet=repo.parent/'packet'
def git(*args):return subprocess.check_output(['git',*args],cwd=repo,text=True)
head=git('rev-parse','HEAD').strip();base=git('rev-parse','origin/main').strip()
paths=git('diff','--name-only',base,head).splitlines()
assert paths==['public/data/listings.json','scripts/seeds-sync/state.json','src/data/seed-pages.ts']
b=json.loads(git('show',base+':public/data/listings.json')); h=json.loads((repo/'public/data/listings.json').read_text())
def counts(r):return {'total':len(r['listings']),'released':sum(x['status']=='released' for x in r['listings']),'comingSoon':sum(x['status']=='coming-soon' for x in r['listings'])}
assert counts(b)==counts(h)=={'total':49,'released':35,'comingSoon':14}
excluded=['beacon','relay','ferry','lily','brook','delta','barrow','linen']
assert not set(excluded)&{x['slug'] for x in h['listings']}
changes=[]
for old,new in zip(b['listings'],h['listings']):
 for key in sorted(old.keys()|new.keys()):
  if old.get(key)!=new.get(key):changes.append({'slug':new['slug'],'field':key,'before':old.get(key),'after':new.get(key)})
assert changes==[{'slug':'happytohelp','field':'version','before':'v0.4.23','after':'v0.4.24'}]
versions={x['slug']:x['version'] for x in h['listings'] if x['slug'] in ['happytohelp','lamp','uptime','oncall','orbit','spool']}
assert versions==dict(happytohelp='v0.4.24',lamp='v1.11.14',uptime='v0.5.10',oncall='v0.5.11',orbit='v0.4.8',spool='v0.7.8')
before=git('show',base+':src/data/seed-pages.ts');after=(repo/'src/data/seed-pages.ts').read_text()
assert before.replace("version: 'v0.4.23'", "version: 'v0.4.24'")==after
bs=json.loads(git('show',base+':scripts/seeds-sync/state.json'));hs=json.loads((repo/'scripts/seeds-sync/state.json').read_text())
state=[]
def walk(b,h,path=''):
 if isinstance(b,dict) and isinstance(h,dict):
  for key in sorted(b.keys()|h.keys()):walk(b.get(key),h.get(key),path+'/'+key)
 elif b!=h:state.append({'path':path,'before':b,'after':h})
walk(bs,hs)
expected={'/syncedAt','/seeds/happytohelp/commit','/seeds/happytohelp/sourceRef','/seeds/happytohelp/tag','/seeds/happytohelp/copy/README.md','/seeds/happytohelp/copy/seed.json','/seeds/happytohelp/open','/seeds/lamp/open','/seeds/oncall/open','/seeds/orbit/open','/seeds/uptime/open'}
assert {r['path'] for r in state}==expected
assert hs['seeds']['happytohelp']['commit']=='6acf8a4c50dfeb94ca9ab705b1e386d282ea8e0f'
for key,file in [('CONTRACT.md','happytohelp-CONTRACT-v0.4.24.md'),('README.md','happytohelp-README-v0.4.24.md'),('seed.json','happytohelp-seed-v0.4.24.json')]:
 assert hashlib.sha256((packet/file).read_bytes()).hexdigest()[:16]==hs['seeds']['happytohelp']['copy'][key]
added='\n'.join(line[1:] for line in (packet/'candidate.diff').read_text().splitlines() if line.startswith('+') and not line.startswith('+++'))
patterns=[r'gh[pousr]_[A-Za-z0-9_]+',r'github_pat_[A-Za-z0-9_]+',r'-----BEGIN [A-Z ]*PRIVATE KEY-----',r'AKIA[A-Z0-9]{16}',r'sk-(?:proj-|live_|test_)?[A-Za-z0-9_-]{20,}',r'https?://[^\s/@]+:[^\s/@]+@']
assert not any(re.search(p,added) for p in patterns)
assert git('diff','--check',base,head)==''
# Source pricing is identical. No Assisted/Managed offer exists on either tree.
pricing_scope=['src/content/landing.ts','src/data/incumbent-prices.ts','src/components/seed/SeedPage.tsx']
assert git('diff',base,head,'--',*pricing_scope)==''
receipt=dict(head=head,base=base,paths=paths,beforeCounts=counts(b),afterCounts=counts(h),listingChanges=changes,stateChanges=state,versions=versions,excludedAbsent=excluded,wordingChanged=False,testsChanged=False,credentialPatternMatches=0,pricingFilesUnchanged=pricing_scope,pricingLiteralCaveat='Assisted US$10/month and Managed US$100/month are absent from both baseline and candidate source; this candidate changes no pricing, GST or billing-country statement.',applicableGenerators={'listings':'npm run listings / npm run listings -- --check','sourceLock':'N/A: no sources.lock.json or documented lock generator','contractViews':'N/A: no CONTRACT.md, ACCEPTANCE.md, docs/CLAIMS.md or documented contract generator','migrationLedger':'N/A: no ledger checker; data-only change, migrations unchanged'})
(packet/'data-receipt.json').write_text(json.dumps(receipt,indent=2)+'\n')
print(json.dumps(receipt,indent=2))
