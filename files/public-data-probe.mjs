import {createHash} from 'node:crypto';
import {readFileSync,writeFileSync} from 'node:fs';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
const root=process.cwd();
const {seedPageContent:pages}=await import(root+'/src/data/seed-pages.ts');
const before=JSON.parse(execFileSync('git',['show','origin/main:public/data/listings.json'],{encoding:'utf8'}));
const after=JSON.parse(readFileSync('public/data/listings.json','utf8'));
const state=JSON.parse(readFileSync('scripts/seeds-sync/state.json','utf8'));
const previousState=JSON.parse(execFileSync('git',['show','origin/main:scripts/seeds-sync/state.json'],{encoding:'utf8'}));
assert.equal(after.listings.length,49);
assert.equal(after.listings.filter(x=>x.status==='released').length,35);
assert.equal(after.listings.filter(x=>x.status==='coming-soon').length,14);
const target={lamp:'v1.11.11',happytohelp:'v0.4.21'};
for(const [slug,version] of Object.entries(target)){
 assert.equal(after.listings.find(x=>x.slug===slug).version,version);
 assert.equal(pages.find(x=>x.slug===slug).version,version);
 assert.equal(state.seeds[slug].sourceRef,version); assert.equal(state.seeds[slug].tag,version);
 const contract=readFileSync('../packet/'+slug+'-CONTRACT.md');
 assert.equal(createHash('sha256').update(contract).digest('hex').slice(0,16),state.seeds[slug].copy['CONTRACT.md']);
 assert.equal(state.seeds[slug].copy['CONTRACT.md'],previousState.seeds[slug].copy['CONTRACT.md']);
}
const normalized=structuredClone(after);normalized.generatedAt=before.generatedAt;
for(const x of normalized.listings) if(target[x.slug]) x.version=before.listings.find(y=>y.slug===x.slug).version;
assert.deepEqual(normalized,before);
for(const slug of ['beacon','relay','ferry','lily','brook','delta','barrow','linen']) assert(!after.listings.some(x=>x.slug===slug));
for(const [slug,version] of Object.entries({uptime:'v0.5.5',oncall:'v0.5.8',orbit:'v0.4.5',spool:'v0.7.5'})) assert.equal(after.listings.find(x=>x.slug===slug).version,version);
const pageBefore=execFileSync('git',['show','origin/main:src/data/seed-pages.ts'],{encoding:'utf8'});
const pageAfter=readFileSync('src/data/seed-pages.ts','utf8');
assert.equal(pageAfter.replace("version: 'v0.4.21'","version: 'v0.4.20'").replace("version: 'v1.11.11'","version: 'v1.11.10'"),pageBefore);
const stateChanges=[];
function compare(a,b,path=''){
 if(JSON.stringify(a)===JSON.stringify(b))return;
 if(a&&b&&typeof a==='object'&&typeof b==='object'&&!Array.isArray(a)&&!Array.isArray(b)){
  for(const k of new Set([...Object.keys(a),...Object.keys(b)]))compare(a[k],b[k],path?path+'.'+k:k);
 }else stateChanges.push({path,before:a??null,after:b??null});
}
compare(previousState,state);
const allowed=new Set(['syncedAt',...['lamp','happytohelp'].flatMap(x=>['commit','sourceRef','tag','copy.README.md','copy.seed.json'].map(y=>'seeds.'+x+'.'+y)),...['lamp','oncall','uptime'].map(x=>'seeds.'+x+'.open')]);
assert(stateChanges.every(x=>allowed.has(x.path)));
const claims=Object.fromEntries(pages.filter(x=>target[x.slug]).map(x=>[x.slug,x]));
const result={head:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),baseline:execFileSync('git',['rev-parse','origin/main'],{encoding:'utf8'}).trim(),beforeCounts:{total:before.listings.length,released:before.listings.filter(x=>x.status==='released').length,comingSoon:before.listings.filter(x=>x.status==='coming-soon').length},afterCounts:{total:49,released:35,comingSoon:14},checks:'all assertions passed',stateChanges,claims};
writeFileSync('../packet/data-receipt.json',JSON.stringify(result,null,2)+'\n');
console.log(JSON.stringify({...result,claims:undefined},null,2));
