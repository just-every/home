#!/usr/bin/env python3
"""Expose fresh gh-api snapshot bytes to unmodified seeds-sync; no other remote transport."""
import json,os,re,subprocess,sys
from pathlib import Path
from urllib.parse import parse_qs,urlsplit,unquote
root=Path('/home/agent/rer-consolidation/work/je-sync-32')
args=sys.argv[1:]
name=Path(sys.argv[0]).name
source=json.loads((root/'packet/source-snapshot.json').read_text())['data']
repos={r['nameWithOwner']:r for r in source.values()}
marks=json.loads((root/'home/scripts/seeds-sync/sources.json').read_text())
if name=='git':
    if not args or args[0]!='ls-remote':
        os.execv('/usr/bin/git',['git',*args])
    url=next((s for s in args if s.startswith('https://github.com/')),None)
    repo=(url or '').removeprefix('https://github.com/').removesuffix('.git')
    if repo not in repos: raise SystemExit('snapshot adapter: undeclared source repository')
    r=repos[repo]
    if args[-1]=='HEAD':
        print(r['head']['oid']+'\tHEAD')
    else:
        patterns=[x for x in args if x.startswith('refs/tags/')]
        for row in r['refs']['nodes']:
            ref='refs/tags/'+row['name']; target=row['target']
            if not patterns or ref in patterns: print(target['oid']+'\t'+ref)
            if target['__typename']=='Tag' and (not patterns or ref+'^{}' in patterns):
                print(target['target']['oid']+'\t'+ref+'^{}')
    raise SystemExit(0)
if name!='gh' or len(args)<2 or args[0]!='api':
    raise SystemExit('snapshot adapter permits only captured source gh api reads')
url=urlsplit(args[1]); match=re.fullmatch(r'repos/(just-every/run-[^/]+)/contents/(.+)',url.path)
if not match or match[1] not in repos: raise SystemExit('snapshot adapter: uncaptured endpoint')
repo,path=match.groups(); ref=parse_qs(url.query).get('ref',[''])[0]; r=repos[repo]
slug=repo.removeprefix('just-every/run-'); blob=None; known=False
for label,paths in [('listed',['CONTRACT.md','README.md','seed.json']),('head',[marks['marks'].get(slug,marks['defaultMark']),'src/branding.json','public/rer-theme.css'])]:
    if ref==r[label]['oid'] and path in paths:
        blob=r[f'{label}File{paths.index(path)}']; known=True
if repo=='just-every/run-spool' and (root/'packet/spool-source.json').is_file():
    extra=json.loads((root/'packet/spool-source.json').read_text())['data']['repository']
    if ref==extra['commit']['oid'] and path in ['CONTRACT.md','README.md','seed.json']:
        blob=extra[dict(zip(['CONTRACT.md','README.md','seed.json'],['contract','readme','seed']))[path]]; known=True
if not known: raise SystemExit('snapshot adapter: uncaptured file/ref')
if blob is None:
    sys.stderr.write('gh: Not Found (HTTP 404)\n'); raise SystemExit(1)
if blob.get('isTruncated') or blob.get('text') is None: raise SystemExit('snapshot adapter: incomplete text blob')
data=blob['text'].encode()
if len(data)!=blob['byteSize']: raise SystemExit('snapshot adapter: byte count mismatch')
# Validate the actual Git blob identity supplied by GitHub.
import hashlib
if hashlib.sha1(b'blob '+str(len(data)).encode()+b'\0'+data).hexdigest()!=blob['oid']: raise SystemExit('snapshot adapter: blob hash mismatch')
sys.stdout.buffer.write(data)
