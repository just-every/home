import assert from 'node:assert/strict';
import fs from 'node:fs';
import cp from 'node:child_process';
import crypto from 'node:crypto';
const old = name => cp.execFileSync('git',['show',`origin/main:${name}`]);
const file = name => fs.readFileSync(name);
const changed=cp.execFileSync('git',['diff','--name-only','origin/main','HEAD'],{encoding:'utf8'}).trim().split('\n');
assert.deepEqual(changed,['public/data/listings.json','scripts/seeds-sync/state.json','src/data/seed-pages.ts']);
const before=JSON.parse(old(changed[0])); const after=JSON.parse(file(changed[0]));
for(const obj of [before,after]) {
 assert.equal(obj.listings.length,49);
 assert.equal(obj.listings.filter(x=>x.status==='released').length,35);
 assert.equal(obj.listings.filter(x=>x.status==='coming-soon').length,14);
 for(const slug of ['beacon','relay','ferry','lily','brook','delta','barrow','linen'])assert.ok(!obj.listings.some(x=>x.slug===slug));
}
const b=structuredClone(before),a=structuredClone(after);
delete b.generatedAt; delete a.generatedAt;
assert.equal(b.listings.find(x=>x.slug==='spool').version,'v0.7.8');
assert.equal(a.listings.find(x=>x.slug==='spool').version,'v0.7.9');
a.listings.find(x=>x.slug==='spool').version='v0.7.8';
assert.deepEqual(a,b);
assert.equal(file(changed[2]).toString().replace("version: 'v0.7.9'","version: 'v0.7.8'"),old(changed[2]).toString());
const sb=JSON.parse(old(changed[1])),sa=JSON.parse(file(changed[1]));
const stateChanges=[];
function walk(before,after,path='') {
 if(JSON.stringify(before)===JSON.stringify(after))return;
 if(before&&after&&typeof before==='object'&&typeof after==='object'&&!Array.isArray(before)&&!Array.isArray(after)){
  for(const key of new Set([...Object.keys(before),...Object.keys(after)]))walk(before[key],after[key],path?`${path}.${key}`:key);
 } else stateChanges.push({path,before:before??null,after:after??null});
}
walk(sb,sa);
assert.deepEqual(stateChanges.map(x=>x.path),['syncedAt','seeds.happytohelp.open','seeds.spool.commit','seeds.spool.sourceRef','seeds.spool.tag','seeds.spool.copy.README.md','seeds.spool.copy.seed.json','seeds.spool.open']);
assert.equal(sa.seeds.spool.commit,'8049c9153f1d987bba6211bc05b8405b06101a6f');
assert.equal(sa.seeds.spool.sourceRef,'v0.7.9'); assert.equal(sa.seeds.spool.tag,'v0.7.9');
for(const name of ['CONTRACT.md','README.md','seed.json'])assert.equal(crypto.createHash('sha256').update(fs.readFileSync(`../packet/spool-${name}`)).digest('hex').slice(0,16),sa.seeds.spool.copy[name]);
const diff=cp.execFileSync('git',['diff','origin/main','HEAD'],{encoding:'utf8'});
assert.ok(!/(?:gh[pousr]_|github_pat_)[A-Za-z0-9_]{15,}|sk-(?:live|test|proj)-[A-Za-z0-9_-]{12,}|-----BEGIN (?:RSA |OPENSSH |EC )?PRIVATE KEY-----|AKIA[0-9A-Z]{16}/.test(diff));
const identity=cp.execFileSync('git',['log','origin/main..HEAD','--format=%an <%ae>%n%cn <%ce>%n%(trailers:only,unfold)'],{encoding:'utf8'}).trim().split('\n');
assert.deepEqual(identity,['Run Edit Run fleet <fleet@runeditrun.com>','Run Edit Run fleet <fleet@runeditrun.com>']);
const rows=Object.fromEntries(after.listings.filter(x=>['happytohelp','lamp','uptime','oncall','orbit','spool'].includes(x.slug)).map(x=>[x.slug,{version:x.version,status:x.status}]));
const out={result:'PASS',head:cp.execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),baseline:cp.execFileSync('git',['rev-parse','origin/main'],{encoding:'utf8'}).trim(),changedPaths:changed,countsBefore:{total:49,released:35,comingSoon:14},countsAfter:{total:49,released:35,comingSoon:14},versions:rows,stateChanges,wording:'byte-identical after reverting the one version literal',credentialPatternScan:'No credential-shaped values in diff',identity:'one candidate commit; fleet author and committer; no trailers',pricing:'All pricing/rendering implementation files byte-identical to main. Assisted/Managed price statements are absent from this checkout in both revisions; current licence line is MIT, 100% free.',notApplicable:['home has no CONTRACT.md, sources.lock.json, contract-view generator or migration-ledger check; none declared in AGENTS.md/package scripts/Verify']};
fs.writeFileSync('../packet/static-receipt.json',JSON.stringify(out,null,2)+'\n'); console.log(JSON.stringify(out,null,2));
