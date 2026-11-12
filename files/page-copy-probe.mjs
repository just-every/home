import {seedPageContent} from '/home/agent/rer-consolidation/work/je-gate-31/home/src/data/seed-pages.ts';
import {writeFileSync} from 'node:fs';
const seeds=['spool','lamp','orbit','oncall','uptime'];
writeFileSync('/home/agent/rer-consolidation/work/je-gate-31/packet/je-pages.json',JSON.stringify(seedPageContent.filter(p=>seeds.includes(p.slug)),null,2)+'\n');
