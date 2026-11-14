import hashlib
import json
import re
import sys
from pathlib import Path
from urllib.parse import parse_qs, urlsplit, unquote
packet=Path.home()/'rer-consolidation/work/je-sync-34/packet'
snapshot=json.loads((packet/'source-snapshot.json').read_text())['data']
extra=json.loads((packet/'oncall-v0.5.14-source.json').read_text())['data']
versions={'happytohelp':'v0.4.26','lamp':'v1.11.15','uptime':'v0.5.11','oncall':'v0.5.13','orbit':'v0.4.9','spool':'v0.7.11'}
marks={'happytohelp':'public/homepage/media/brands/happytohelp-mark.svg','lamp':'public/app-assets/brand/lamp-mark.svg','uptime':'public/favicon.svg','oncall':'public/brand/mark.svg','orbit':'public/brand/mark.svg','spool':'public/theme/spool-mark.svg'}
def commit(target):
    while 'target' in target: target=target['target']
    return target['oid']
def repo_slug(repo):
    m=re.fullmatch(r'just-every/run-(happytohelp|lamp|uptime|oncall|orbit|spool)',repo)
    if not m: raise ValueError('repository outside six-path snapshot')
    return m[1]
def tags(slug): return snapshot[slug]['refs']['nodes']
def tag_commit(slug,tag): return commit(next(t['target'] for t in tags(slug) if t['name']==tag))
def read_blob(slug,ref,path):
    r=snapshot[slug]
    copy_paths={'CONTRACT.md':'contract','README.md':'readme','seed.json':'seed'}
    brand_paths={marks[slug]:'mark','src/branding.json':'branding','public/rer-theme.css':'theme'}
    if path in copy_paths:
        if ref==tag_commit(slug,versions[slug]): row=r[copy_paths[path]]
        elif slug=='oncall' and ref==tag_commit(slug,'v0.5.14'): row=extra['oncall'][copy_paths[path]]
        else: raise ValueError('copy source ref outside recorded release snapshot')
    elif path in brand_paths and ref==r['defaultBranchRef']['target']['oid']:
        row=r[brand_paths[path]]
    else: raise ValueError('brand source ref outside recorded default-branch snapshot')
    if row is None:
        print('gh: Not Found (HTTP 404)',file=sys.stderr)
        raise SystemExit(1)
    data=row['text'].encode()
    assert hashlib.sha1(b'blob '+str(len(data)).encode()+b'\0'+data).hexdigest()==row['oid'], 'Git blob digest mismatch'
    sys.stdout.buffer.write(data)

def main():
    mode=sys.argv[1]; args=sys.argv[2:]
    if mode=='git':
        if not args or args[0]!='ls-remote': raise ValueError('adapter only handles source ls-remote')
        url=next(a for a in args if a.startswith('https://github.com/'))
        slug=repo_slug(url.removeprefix('https://github.com/').removesuffix('.git'))
        if '--tags' not in args:
            assert args[-1]=='HEAD'
            print(snapshot[slug]['defaultBranchRef']['target']['oid']+'\tHEAD')
        else:
            patterns=args[args.index(url)+1:]
            for t in tags(slug):
                ref='refs/tags/'+t['name']
                if not patterns or ref in patterns:
                    print(t['target']['oid']+'\t'+ref)
                if '--refs' not in args and 'target' in t['target'] and (not patterns or ref+'^{}' in patterns):
                    print(commit(t['target'])+'\t'+ref+'^{}')
    elif mode=='gh':
        assert args[0]=='api'
        m=re.fullmatch(r'repos/(just-every/run-[^/]+)/contents/(.+)\?ref=(.+)',args[1])
        if not m: raise ValueError('adapter permits only recorded source-file API reads')
        read_blob(repo_slug(m[1]),unquote(m[3]),m[2])
    else: raise ValueError('invalid adapter mode')
try:
    main()
except (ValueError,AssertionError,StopIteration,KeyError) as e:
    print('source API snapshot adapter refused: '+str(e),file=sys.stderr)
    raise SystemExit(1)
