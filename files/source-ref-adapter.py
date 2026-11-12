#!/usr/bin/python3
"""Read external refs via gh api; product Git operations use real Git."""
import fnmatch
import json
import os
import re
import subprocess
import sys
args=sys.argv[1:]
if not args or args[0] != 'ls-remote':
    os.execv('/usr/bin/git', ['git', *args])
url=next((x for x in args if x.startswith('https://github.com/')), '')
m=re.fullmatch(r'https://github.com/([^/]+/[^/]+?)(?:\.git)?', url)
if not m:
    raise SystemExit('fleet API refs: unsupported remote')
repo=m[1]
patterns=args[args.index(url)+1:]
def api(path):
    p=subprocess.run(['gh', 'api', path], capture_output=True, text=True)
    if p.returncode:
        sys.stderr.write(p.stderr)
        raise SystemExit(p.returncode)
    return json.loads(p.stdout)
if patterns == ['HEAD']:
    print(api(f'repos/{repo}/commits/HEAD')['sha']+'\tHEAD')
else:
    rows=api(f'repos/{repo}/git/matching-refs/tags/')
    for row in rows:
        ref=row['ref']; obj=row['object']
        if not patterns or any(fnmatch.fnmatchcase(ref,p) for p in patterns):
            print(obj['sha']+'\t'+ref)
        if obj['type']=='tag' and '--refs' not in args:
            peeled=ref+'^{}'
            if not patterns or peeled in patterns:
                while obj['type']=='tag':
                    obj=api(f'repos/{repo}/git/tags/'+obj['sha'])['object']
                print(obj['sha']+'\t'+peeled)
