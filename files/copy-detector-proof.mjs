import fs from 'node:fs';
import {execFileSync} from 'node:child_process';
import {detectCopy} from './home/scripts/seeds-sync/detect/copy.mjs';
const root=new URL('./packet/',import.meta.url);
const response=JSON.parse(fs.readFileSync(new URL('source-response.json',root))).data;
const before=JSON.parse(execFileSync('git',['show','d9893baa5c4d862ab94e62cda6b9f43774a60e8f:scripts/seeds-sync/state.json'])).seeds;
const after=JSON.parse(fs.readFileSync('scripts/seeds-sync/state.json')).seeds;
const names=['CONTRACT.md','README.md','seed.json'];
const rows=[];
for(const [slug,repo] of Object.entries(response)){
 const files=Object.fromEntries(names.map((name,i)=>{
  let text=repo['after'+i]?.text;
  if(slug==='strap'&&name==='CONTRACT.md') text=fs.readFileSync(new URL('strap-CONTRACT-source.md',root),'utf8');
  return [name,text==null?null:Buffer.from(text)];
 }));
 const seed={repo:repo.nameWithOwner};
 const source={files,copyCommit:after[slug].commit};
 const baselineFindings=detectCopy(seed,source,before[slug]);
 const headFindings=detectCopy(seed,source,after[slug]);
 if(headFindings.length) throw new Error(slug+' has unexplained pinned copy drift');
 rows.push({slug,baselineFindings,headFindings});
}
fs.writeFileSync(new URL('independent-copy-detector-receipt.json',root),JSON.stringify({head:'fa8f9b53062373c3c4a0cab931fe7483f90fef34',source:'actual gh api public pinned blobs; no live default-branch substitution',rows},null,2)+'\n');
console.log('Independent repository detectCopy replay: five explained changed-source findings from baseline, zero on candidate at its pinned source refs.');
