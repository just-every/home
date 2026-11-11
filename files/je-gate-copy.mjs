import fs from 'node:fs';
import assert from 'node:assert/strict';
const root=process.cwd();
const {seedPageContent:head}=await import(root+'/src/data/seed-pages.ts');
const {seedPageContent:base}=await import(root+'/../baseline/src/data/seed-pages.ts');
assert.deepEqual(head.map(({version,...p})=>p),base.map(({version,...p})=>p));
const result=head.filter(p=>['uptime','lamp','orbit','spool'].includes(p.slug));
fs.writeFileSync('../packet/page-copy.json',JSON.stringify(result,null,2)+'\n');
console.log('All '+head.length+' pages have identical wording; exported four complete touched page entries.');
