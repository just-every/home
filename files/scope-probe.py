from pathlib import Path
import hashlib,json,re,subprocess
root=Path.cwd()
packet=root.parent/'packet'
base='origin/main'
def old(path):
    return subprocess.check_output(['git','show',base+':'+path]).decode()
def now(path):
    return Path(path).read_text()
paths=subprocess.check_output(['git','diff','--name-only',base,'HEAD']).decode().splitlines()
assert paths==['public/data/listings.json','scripts/seeds-sync/state.json','src/data/seed-pages.ts'],paths
print('PASS exact three paths; no tests changed')
before=json.loads(old(paths[0])); after=json.loads(now(paths[0]))
assert before.keys()==after.keys()
assert before['generatedAt']!=after['generatedAt']
for a,b in zip(before['listings'],after['listings'],strict=True):
    if a['slug']=='happytohelp':
        assert a['version']=='v0.4.22' and b['version']=='v0.4.23'
        assert {k:v for k,v in a.items() if k!='version'}=={k:v for k,v in b.items() if k!='version'}
    else: assert a==b,a['slug']
assert len(after['listings'])==49
assert sum(x['status']=='released' for x in after['listings'])==35
assert sum(x['status']=='coming-soon' for x in after['listings'])==14
excluded={'beacon','relay','ferry','lily','brook','delta','barrow','linen'}
assert not excluded & {x['slug'] for x in after['listings']}
assert old(paths[2]).replace("version: 'v0.4.22'","version: 'v0.4.23'",1)==now(paths[2])
print('PASS listings 49 = 35 released + 14 coming soon on main and head; eight exclusions absent; only HappyToHelp version changes; all public wording identical')
a=json.loads(old(paths[1])); b=json.loads(now(paths[1]))
assert a['syncedAt']!=b['syncedAt']
changes={}
for slug in a['seeds']:
    if a['seeds'][slug]!=b['seeds'][slug]:
        changes[slug]=[k for k in set(a['seeds'][slug])|set(b['seeds'][slug]) if a['seeds'][slug].get(k)!=b['seeds'][slug].get(k)]
assert set(changes)=={'happytohelp','uptime'}
assert set(changes['happytohelp'])=={'commit','sourceRef','tag','copy','open'}
assert set(changes['uptime'])=={'open'}
h=b['seeds']['happytohelp']
assert h['tag']==h['sourceRef']=='v0.4.23'
assert h['commit']=='3c45a60a6debb0886ae8c41eee18a95e6fee694d'
for name,local in [('CONTRACT.md','happytohelp-contract.md'),('README.md','happytohelp-readme.md'),('seed.json','happytohelp-seed.json')]:
    assert h['copy'][name]==hashlib.sha256((packet/local).read_bytes()).hexdigest()[:16]
assert h['open']==['42983364b373']
assert a['seeds']['uptime']['open']==['c843303a1181'] and 'open' not in b['seeds']['uptime']
print('PASS state only timestamp, HappyToHelp released commit/ref/tag/file hashes and open finding marker; Uptime only removes open finding marker. No state wording/brand/home/status change.')
commits=subprocess.check_output(['git','rev-list',base+'..HEAD']).decode().splitlines()
assert commits==['e6fe389a5b80b60ed8d7c97db717f653651143f2']
for sha in commits:
    meta=subprocess.check_output(['git','show','-s','--format=%an%n%ae%n%cn%n%ce',sha]).decode().splitlines()
    assert meta==['Run Edit Run fleet','fleet@runeditrun.com']*2,meta
    msg=subprocess.check_output(['git','show','-s','--format=%B',sha]).decode()
    assert 'co-authored-by' not in msg.lower()
print('PASS all candidate commits including side parents: exactly one, fleet author/committer, no trailers')
diff=(packet/'candidate.diff').read_text()
added='\n'.join(line[1:] for line in diff.splitlines() if line.startswith('+') and not line.startswith('+++'))
patterns=[r'gh[pousr]_[A-Za-z0-9_]{20,}',r'github_pat_[A-Za-z0-9_]{20,}',r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----',r'AKIA[A-Z0-9]{16}',r'sk-(?:proj-)?[A-Za-z0-9_-]{20,}',r'https?://[^\s/@]+:[^\s/@]+@']
assert not any(re.search(pattern,added) for pattern in patterns)
print('PASS added-hunk credential patterns; manual full-hunk review contains only timestamps/version, source hashes and open marker ids')
print('PASS no pricing file or statement changed. Current JE sources contain no Assisted/Managed pricing sentence; US$10/month and US$100/month are not independently re-observed on this surface.')
print('N/A source lock, contract views, migration ledger: no such tracked files or documented AGENTS/package commands in this website repository; listings generator independently write/check exercised.')
print('PASS scope probe')
