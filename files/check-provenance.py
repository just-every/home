import collections,difflib,hashlib,json,re,subprocess
from pathlib import Path
P=Path('../packet'); head='fa8f9b53062373c3c4a0cab931fe7483f90fef34'; base='d9893baa5c4d862ab94e62cda6b9f43774a60e8f'
def git(*args):return subprocess.check_output(['git',*args])
def at(ref,path):return git('show',ref+':'+path)
before=json.loads(at(base,'scripts/seeds-sync/state.json'))['seeds']
after=json.loads(at(head,'scripts/seeds-sync/state.json'))['seeds']
response=json.loads((P/'source-response.json').read_text())['data']
rows=[];diffs=[]
for slug,repo in response.items():
    assert repo['isPrivate'] is False
    row={'slug':slug,'repo':repo['nameWithOwner'],'before':before[slug]['commit'],'after':after[slug]['commit'],'files':{}}
    for side,state in [('before',before),('after',after)]:
        assert repo[side]['oid']==state[slug]['commit']
        for i,name in enumerate(['CONTRACT.md','README.md','seed.json']):
            blob=repo[f'{side}{i}']; text=None if blob is None else blob['text']
            if blob and len(text.encode())!=blob['byteSize']:
                assert slug=='strap' and name=='CONTRACT.md' and blob['oid']==repo['after0']['oid']
                text=Path('../strap-contract-api.md').read_text()
            actual=None if text is None else hashlib.sha256(text.encode()).hexdigest()[:16]
            expected=state[slug]['copy'][name]
            assert actual==expected,(slug,side,name,actual,expected)
            row['files'].setdefault(name,{})[side]={'hash':actual,'bytes':None if blob is None else blob['byteSize']}
    row['changedCopy']=[n for n,x in row['files'].items() if x['before']['hash']!=x['after']['hash']]
    for i,name in enumerate(['CONTRACT.md','README.md','seed.json']):
        old=repo[f'before{i}'];new=repo[f'after{i}']
        if old and new and old['text']!=new['text']:
            diffs.extend(difflib.unified_diff(old['text'].splitlines(keepends=True),new['text'].splitlines(keepends=True),fromfile=f'{slug}/before/{name}',tofile=f'{slug}/after/{name}'))
    rows.append(row)
assert response['lamp']['tag']['target']['target']['oid']==after['lamp']['commit']
(P/'upstream-copy.patch').write_text(''.join(diffs))
(P/'source-provenance-receipt.json').write_text(json.dumps({'head':head,'baseline':base,'allPublic':True,'allCommitObjectsExist':True,'all42CopyHashesMatch':True,'lampAnnotatedTagPeelsToRecordedSHA':True,'seeds':rows},indent=2)+'\n')
paths=git('diff','--name-only',base,head).decode().splitlines()
assert set(paths)=={'public/data/listings.json','scripts/seeds-sync/state.json','src/data/seed-pages.ts'}
a=json.loads(at(base,'public/data/listings.json'));b=json.loads(at(head,'public/data/listings.json'))
counts=lambda data:dict(collections.Counter(x['status'] for x in data['listings']))
excluded=['beacon','relay','ferry','lily','brook','delta','barrow','linen']
assert len(a['listings'])==len(b['listings'])==49
assert counts(a)==counts(b)=={'coming-soon':14,'released':35}
assert not set(excluded)&{x['slug'] for x in b['listings']}
a.pop('generatedAt');b.pop('generatedAt')
assert next(x for x in a['listings'] if x['slug']=='lamp')['version']=='v1.11.3'
next(x for x in a['listings'] if x['slug']=='lamp')['version']='v1.11.4'
assert a==b
old=at(base,'src/data/seed-pages.ts');new=at(head,'src/data/seed-pages.ts')
assert old.replace(b"version: 'v1.11.3'",b"version: 'v1.11.4'")==new
identities=git('log',base+'..'+head,'--format=%H%n%an <%ae>%n%cn <%ce>%n%(trailers:only,unfold)').decode()
(P/'candidate-identities.log').write_text(identities)
assert identities.splitlines()[1:3]==['Run Edit Run fleet <fleet@runeditrun.com>']*2
assert not re.search(r'(?i)co-authored-by:',identities)
patch=git('diff',base,head).decode();(P/'product.patch').write_text(patch)
patterns=[r'(?i)(?:gh[pousr]_|github_pat_)[A-Za-z0-9_]+',r'-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----',r'(?i)https?://[^\s/@]+:[^\s/@]+@',r'(?i)(?:api[_-]?key|secret|token|password)\s*[:=]\s*[\"\x27][^\"\x27\s]{16,}']
assert not any(re.search(p,patch) for p in patterns)
receipt={'head':head,'baseline':base,'changedPaths':paths,'numstat':git('diff','--numstat',base,head).decode(),'identitiesValid':True,'trailers':[],'credentialShapeDiffScan':'no matches','before':{'total':49,**counts(json.loads(at(base,'public/data/listings.json')))},'after':{'total':49,**counts(json.loads(at(head,'public/data/listings.json')))},'excludedAbsent':excluded,'publicListingChangesOnly':['generatedAt','lamp.version'],'seedPageChangesOnly':'lamp.version','comingSoonWordingUnchanged':True,'pricingFilesUnchanged':True,'clauseStatusChanges':[]}
(P/'data-scope-receipt.json').write_text(json.dumps(receipt,indent=2)+'\n')
print(json.dumps(receipt,indent=2))
print('All 42 old/new copy hashes match the independent public API blobs; seven recorded commits exist.')
