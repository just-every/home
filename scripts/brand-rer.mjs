#!/usr/bin/env node
import { writeFileSync } from 'node:fs';
import { validateRerCli } from './lib/rer-cli.mjs';

// Refresh is explicit. Builds only read the committed snapshot.
const response = await fetch('https://runeditrun.com/brand.json', {
  signal: AbortSignal.timeout(30000),
});
if (!response.ok) throw new Error(`RER brand: HTTP ${response.status}`);
const cli = validateRerCli(await response.json());
writeFileSync(
  new URL('../src/data/rer-cli.generated.json', import.meta.url),
  `${JSON.stringify(cli, null, 2)}\n`
);
console.log('RER CLI snapshot refreshed');
