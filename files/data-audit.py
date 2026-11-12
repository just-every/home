import hashlib,json,re,subprocess
from pathlib import Path
root=Path.cwd()
packet=root.parent/'packet'
base=subprocess.check_output(['git','rev-parse','origin/main'],text=True).strip()
head=subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip()
def before(path):return subprocess.check_output(['git','show',f'{base}:{path}'])
def changes(a,b,path=''):
    if isinstance(a,dict) and isinstance(b,dict):
        out=[]
        for k in sorted(a.keys()|b.keys()):
            if k not in a or k not in b:out.append(dict(path=f'{path}/{k}',before=a.get(k),after=b.get(k)))
            else:out+=changes(a[k],b[k],f'{path}/{k}')
        return out
    return [] if a==b else [dict(path=path,before=a,after=b)]
paths=subprocess.check_output(['git','diff','--name-only',f'{base}..{head}'],text=True).splitlines()
assert paths==['public/data/listings.json','scripts/seeds-sync/state.json','src/data/seed-pages.ts'],paths
old=json.loads(before(paths[0])); new=json.loads((root/paths[0]).read_bytes())
oldmap={x['slug']:x for x in old['listings']}; newmap={x['slug']:x for x in new['listings']}
listing_changes=changes(oldmap,newmap)
assert listing_changes==[{'path':'/uptime/version','before':'v0.5.8','after':'v0.5.9'}],listing_changes
counts=lambda v:dict(total=len(v),released=sum(x['status']=='released' for x in v),comingSoon=sum(x['status']=='coming-soon' for x in v))
assert counts(new['listings'])==dict(total=49,released=35,comingSoon=14)
excluded=['beacon','relay','ferry','lily','brook','delta','barrow','linen']
assert not set(excluded)&newmap.keys()
assert oldmap['happytohelp']==newmap['happytohelp']
assert newmap['happytohelp']['version']=='v0.4.22'
oldpages=before(paths[2]).decode();newpages=(root/paths[2]).read_text()
assert oldpages.replace("version: 'v0.5.8'","version: 'v0.5.9'",1)==newpages
oldstate=json.loads(before(paths[1]));state=json.loads((root/paths[1]).read_bytes())
state_changes=changes(oldstate,state)
allowed={'/syncedAt','/seeds/uptime/commit','/seeds/uptime/sourceRef','/seeds/uptime/tag','/seeds/uptime/copy/CONTRACT.md','/seeds/uptime/copy/README.md','/seeds/uptime/copy/seed.json'}
assert all(x['path'] in allowed or re.fullmatch('/seeds/(lamp|oncall|orbit|spool|uptime)/open',x['path']) for x in state_changes)
hashes={}
for name,source in [('CONTRACT.md','uptime-contract-v0.5.9.md'),('README.md','uptime-readme-v0.5.9.md'),('seed.json','uptime-seed-v0.5.9.json')]:
    hashes[name]=hashlib.sha256((packet/source).read_bytes()).hexdigest()[:16]
    assert hashes[name]==state['seeds']['uptime']['copy'][name]
assert state['seeds']['uptime']['commit']=='88c586f6fabdaed6768ddc8072af2340310a7ace'
assert state['seeds']['uptime']['tag']==state['seeds']['uptime']['sourceRef']==newmap['uptime']['version']
identities=subprocess.check_output(['git','log','origin/main..HEAD','--format=%an <%ae>%n%cn <%ce>%n%(trailers:only,unfold)'],text=True)
assert [x for x in identities.splitlines() if x]==['Run Edit Run fleet <fleet@runeditrun.com>']*2
added=subprocess.check_output(['git','diff','--unified=0',f'{base}..{head}'],text=True)
patterns={
 'provider_token':r'(?:gh[pousr]_|github_pat_|sk-(?:proj-|ant-)?)[A-Za-z0-9_\-]{15,}',
 'private_key':r'-----BEGIN (?:[A-Z ]+)?PRIVATE KEY-----',
 'credential_url':r'https?://[^\s/<>]+:[^\s/@<>]+@',
 'aws_access_key':r'\b(?:AKIA|ASIA)[A-Z0-9]{16}\b',
 'secret_assignment':r'(?i)(?:password|secret|api[_-]?key|access[_-]?token)\s*[=:]\s*["\x27][^"\x27]{8,}'
}
added='\n'.join(x[1:] for x in added.splitlines() if x.startswith('+') and not x.startswith('+++'))
assert all(not re.search(p,added) for p in patterns.values()),'credential-shaped added value'
result=dict(head=head,baseline=base,paths=paths,identities=identities.strip().splitlines(),trailers=[],credentialShapeScan={'surface':'all added diff lines; manual review all hunks','categories':list(patterns),'matches':0},before=counts(old['listings']),after=counts(new['listings']),excludedAbsent=excluded,happytohelpVersion='v0.4.22',listingChanges=listing_changes,stateChanges=state_changes,copyHashesVerified=hashes,publishedWordingChanged=False,testsDeletedOrWeakened=False)
(packet/'data-audit.json').write_text(json.dumps(result,indent=2)+'\n')
print(json.dumps(result,indent=2))
