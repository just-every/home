from pathlib import Path
import json,subprocess,re,hashlib
root=Path.home()/'rer-consolidation/work/je-gate-25'
repo=root/'home';p=root/'packet'
def git(*args):return subprocess.check_output(['git','-C',str(repo),*args],text=True)
head=git('rev-parse','HEAD').strip();base=git('rev-parse','origin/main').strip()
assert head=='a5fcb3ad373f028a71c9271daf5a682af20614f4'
assert base=='c520b40c7b5bec6943a7e08bbb8fbdccc5ad535a'
paths=git('diff','--name-only',base,head).splitlines()
assert sorted(paths)==sorted(['public/data/listings.json','scripts/seeds-sync/state.json','src/data/seed-pages.ts'])
assert git('rev-parse','HEAD^').strip()==base
identity=git('log','origin/main..HEAD','--format=%H%n%an <%ae>%n%cn <%ce>%n%(trailers:only,unfold)')
(p/'candidate-identities.txt').write_text(identity)
commits=git('rev-list','origin/main..HEAD').splitlines()
for c in commits:
 fields=git('show','-s','--format=%an%n%ae%n%cn%n%ce',c).splitlines()
 assert fields==['Run Edit Run fleet','fleet@runeditrun.com','Run Edit Run fleet','fleet@runeditrun.com']
 assert not git('show','-s','--format=%(trailers:only,unfold)',c).strip()
patch=git('diff',base,head)
(p/'candidate.diff').write_text(patch)
added='\n'.join(l[1:] for l in patch.splitlines() if l.startswith('+') and not l.startswith('+++'))
patterns=[r'(?:gh[pousr]_|github_pat_)[A-Za-z0-9_]{10,}',r'-----BEGIN (?:[A-Z ]+ )?PRIVATE KEY-----',r'AKIA[0-9A-Z]{16}',r'(?:sk|pk)_(?:live|test)_[A-Za-z0-9]{10,}',r'https?://[^\s/@]+:[^\s/@]+@',r'(?i)(?:password|api[_-]?key|secret|token)\s*[=:]\s*["\x27][^"\x27]{12,}']
assert not any(re.search(p,added) for p in patterns)
old=json.loads(git('show',base+':public/data/listings.json'));new=json.loads((repo/'public/data/listings.json').read_text())
oldmap={x['slug']:x for x in old['listings']};newmap={x['slug']:x for x in new['listings']}
expected={'orbit':['v0.4.4','v0.4.5'],'spool':['v0.7.4','v0.7.5'],'happytohelp':['v0.4.18','v0.4.19'],'oncall':['v0.5.6','v0.5.7']}
assert oldmap.keys()==newmap.keys()
for slug in oldmap:
 for k in oldmap[slug]:
  if slug in expected and k=='version':assert [oldmap[slug][k],newmap[slug][k]]==expected[slug]
  else:assert oldmap[slug][k]==newmap[slug][k],(slug,k)
assert len(newmap)==49
assert sum(x['status']=='released' for x in newmap.values())==35
assert sum(x['status']=='coming-soon' for x in newmap.values())==14
assert not set(['beacon','relay','ferry','lily','brook','delta','barrow','linen'])&newmap.keys()
assert newmap['uptime']['version']=='v0.5.4' and newmap['lamp']['version']=='v1.11.10'
a=git('show',base+':src/data/seed-pages.ts');b=(repo/'src/data/seed-pages.ts').read_text()
for lo,hi in expected.values():a=a.replace("version: '"+lo+"'","version: '"+hi+"'")
assert a==b
pages={a['slug']:a for a in json.loads((p/'je-copy.json').read_text())}
state=json.loads((repo/'scripts/seeds-sync/state.json').read_text())
for slug,versions in expected.items():
 assert pages[slug]['version']==state['seeds'][slug]['sourceRef']==state['seeds'][slug]['tag']==versions[1]
 rel=json.loads((p/(slug+'-release.json')).read_text())
 assert len(rel)==1 and not rel[0]['draft'] and not rel[0]['prerelease'] and rel[0]['tag_name']==versions[1]
 assert 'rer-release.dsse.json' in [a['name'] for a in rel[0]['assets']]
 contract=(p/(slug+'-contract.md')).read_bytes()
 assert hashlib.sha256(contract).hexdigest()[:16]==state['seeds'][slug]['copy']['CONTRACT.md'],slug
oldstate=json.loads(git('show',base+':scripts/seeds-sync/state.json'))
def diffs(a,b,path=''):
 if isinstance(a,dict) and isinstance(b,dict):
  for k in sorted(set(a)|set(b)):
   if k not in a or k not in b:yield [path+'/'+k,a.get(k),b.get(k)]
   else:yield from diffs(a[k],b[k],path+'/'+k)
 elif a!=b:yield [path,a,b]
statechanges=list(diffs(oldstate,state))
for path,a,b in statechanges:
 assert path=='/syncedAt' or re.fullmatch(r'/seeds/[^/]+/(home/signature|open)',path) or re.fullmatch(r'/seeds/(orbit|spool|happytohelp|oncall)/(commit|sourceRef|tag|copy/(CONTRACT.md|README.md|seed.json))',path),path
(p/'state-delta.json').write_text(json.dumps(statechanges,indent=2)+'\n')
summary=dict(head=head,base=base,changed_paths=paths,candidate_commits=commits,identities='fleet author and committer, no trailers',credential_shape_check='no added matches in six pattern families; hashes and homepage color fingerprints reviewed',counts_before={'all':49,'released':35,'coming_soon':14},counts_after={'all':49,'released':35,'coming_soon':14},versions=expected,unrelated_versions_status_wording='unchanged',excluded_slugs='all eight absent',pricing='all pricing-bearing source paths unchanged',state_changes=[x[0] for x in statechanges],contract_hashes_match_provenance=True)
(p/'audit.json').write_text(json.dumps(summary,indent=2)+'\n')
print(json.dumps(summary,indent=2))
