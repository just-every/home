import hashlib,json,re,subprocess
from pathlib import Path

def git(*args):
    return subprocess.check_output(['git',*args],text=True)

def baseline(path):
    return git('show','origin/main:'+path)

packet=Path('../packet')
paths=git('diff','--name-only','origin/main','HEAD').splitlines()
assert set(paths)=={'public/data/listings.json','scripts/seeds-sync/state.json','src/data/seed-pages.ts'}
base=json.loads(baseline('public/data/listings.json'))
head=json.loads(Path('public/data/listings.json').read_text())
counts=lambda obj: dict(total=len(obj['listings']),released=sum(x['status']=='released' for x in obj['listings']),coming_soon=sum(x['status']=='coming-soon' for x in obj['listings']))
assert counts(head)==counts(base)==dict(total=49,released=35,coming_soon=14)
by_base={x['slug']:x for x in base['listings']}
by_head={x['slug']:x for x in head['listings']}
excluded=['beacon','relay','ferry','lily','brook','delta','barrow','linen']
assert not set(excluded)&set(by_head)
changed=[]
for slug,item in by_head.items():
    if item!=by_base[slug]:
        changed.append(slug)
        assert slug=='happytohelp'
        assert by_base[slug]['version']=='v0.4.25' and item['version']=='v0.4.26'
        assert {k:v for k,v in item.items() if k!='version'}=={k:v for k,v in by_base[slug].items() if k!='version'}
assert changed==['happytohelp']
expected={'spool':'v0.7.11','uptime':'v0.5.11','oncall':'v0.5.13','orbit':'v0.4.9','lamp':'v1.11.15'}
for slug,version in expected.items():
    assert by_head[slug]['version']==version==by_base[slug]['version']
    assert by_head[slug]['status']==by_base[slug]['status']=='released'
page=Path('src/data/seed-pages.ts').read_text()
assert page.replace("version: 'v0.4.26'", "version: 'v0.4.25'",1)==baseline('src/data/seed-pages.ts')
base_state=json.loads(baseline('scripts/seeds-sync/state.json'))
state=json.loads(Path('scripts/seeds-sync/state.json').read_text())
state_changes=[]
for slug,item in state['seeds'].items():
    if item!=base_state['seeds'][slug]:
        keys=[key for key in set(item)|set(base_state['seeds'][slug]) if item.get(key)!=base_state['seeds'][slug].get(key)]
        state_changes.append(dict(slug=slug,keys=sorted(keys)))
        assert slug in ['happytohelp','spool']
        allowed={'commit','sourceRef','tag','copy','open'} if slug=='happytohelp' else {'open'}
        assert set(keys)<=allowed
hashes={}
for name,want in state['seeds']['happytohelp']['copy'].items():
    actual=hashlib.sha256((packet/('happytohelp-'+name)).read_bytes()).hexdigest()[:16]
    assert actual==want
    hashes[name]=actual
marker=hashlib.sha256(b'copy:README.md, seed.json changed since the last sync').hexdigest()[:12]
assert marker=='42983364b373'
assert state['seeds']['happytohelp']['open']==[marker]
assert base_state['seeds']['spool']['open']==[marker] and 'open' not in state['seeds']['spool']
added='\n'.join(x[1:] for x in git('diff','--unified=0','origin/main','HEAD').splitlines() if x.startswith('+') and not x.startswith('+++'))
patterns=[r'(?:gh[pousr]_|github_pat_)[A-Za-z0-9_]{15,}',r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----',r'(?:sk|rk)_(?:live|test)_[A-Za-z0-9]{16,}',r'https?://[^\s/]+:[^\s/]+@',r'AKIA[0-9A-Z]{16}',r'\bsk-[A-Za-z0-9]{20,}']
assert not any(re.search(p,added) for p in patterns)
commits=git('rev-list','origin/main..HEAD').splitlines()
for sha in commits:
    identity=git('show','-s','--format=%an%n%ae%n%cn%n%ce',sha).strip().splitlines()
    assert identity==['Run Edit Run fleet','fleet@runeditrun.com','Run Edit Run fleet','fleet@runeditrun.com']
    assert not git('show','-s','--format=%(trailers:only,unfold)',sha).strip()
contract=(packet/'happytohelp-CONTRACT.md').read_text()
clauses={}
for line in contract.splitlines():
    if line.startswith('| `'):
        fields=[p.strip() for p in line.split('|')]
        if len(fields)>=7:
            clauses[fields[1].strip('`')]=dict(title=fields[2],group=fields[3],status=fields[4],gap=fields[-2])
ids=['MOVE-IN-001','CONVERSATION-001','DELIVERY-001','OUTCOMES-001','REPORTS-001','AI-001','DELEGATION-001','CONNECTIONS-001','IDENTITY-003','PORTABILITY-001']
rows={k:clauses[k] for k in ids}
assert sum(r['status']=='partial' for r in rows.values())==8
receipt=dict(timestamp=subprocess.check_output(['date','-u','+%Y-%m-%dT%H:%M:%SZ'],text=True).strip(),head=git('rev-parse','HEAD').strip(),base=git('rev-parse','origin/main').strip(),paths=paths,commits=commits,before=counts(base),after=counts(head),changed_listing=changed,unchanged_versions=expected,absent=excluded,source_hashes=hashes,state_changes=state_changes,open_marker=marker,credential_shapes_in_added_diff=0,authors_and_committers='Run Edit Run fleet <fleet@runeditrun.com>',trailers='absent',wording_changed=False,test_files_changed=False,contract_claim_rows=rows)
(packet/'audit.json').write_text(json.dumps(receipt,indent=2)+'\n')
print(json.dumps({k:v for k,v in receipt.items() if k!='contract_claim_rows'},indent=2))
