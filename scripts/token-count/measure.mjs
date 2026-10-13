#!/usr/bin/env node
// Measures the Claude and Codex tokens spent across every home on this Mac
// and on m1-runner, deduplicates them, and reports them per scope.
//
//   node scripts/token-count/measure.mjs [--json] [--remote-host m1-runner]
//
// Both scans run at nice 15 and pause while the load average is high (36 on
// the Mac, 8 on the 10-core m1-runner). m1-runner scans its own homes and
// sends back per-file summaries only. The full report is written to
// ~/.cache/justevery-token-count/report.json.
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { finished } from 'node:stream/promises';
import { parseArgs } from 'node:util';

import { Ledger } from './lib/aggregate.mjs';
import { readLines, splitLine } from './lib/cache.mjs';
import { buildReport, formatReport } from './lib/report.mjs';
import { classify } from './lib/scope.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
export const CACHE_DIR = path.join(
  os.homedir(),
  '.cache',
  'justevery-token-count'
);
const LOCAL = 'mac';
const REMOTE_TOOL = '~/.cache/justevery-token-count/tool';

function run(command, args, { log, stdout = 'ignore', stdin } = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: [
        stdin ? 'pipe' : 'ignore',
        stdout === 'ignore' ? 'ignore' : 'pipe',
        'pipe',
      ],
    });
    if (stdin) stdin.pipe(child.stdin);
    if (stdout !== 'ignore') child.stdout.pipe(stdout);
    let err = '';
    child.stderr.on('data', chunk => {
      err += chunk;
      if (log)
        for (const line of String(chunk).split('\n').filter(Boolean)) log(line);
    });
    child.on('error', reject);
    child.on('close', code =>
      code === 0
        ? resolve()
        : reject(
            new Error(
              `${command} ${args.join(' ')} exited ${code}: ${err.trim().split('\n').at(-1) ?? ''}`
            )
          )
    );
  });
}

async function scanLocal(out, log) {
  await run(
    'nice',
    [
      '-n',
      '15',
      process.execPath,
      path.join(HERE, 'scan.mjs'),
      '--machine',
      LOCAL,
      '--max-load',
      '36',
      '--out',
      out,
    ],
    { log }
  );
}

async function scanRemote(host, out, log) {
  const ssh = ['-o', 'BatchMode=yes', '-o', 'ConnectTimeout=15', host];
  const tar = spawn('tar', ['-cf', '-', '-C', HERE, 'scan.mjs', 'lib'], {
    stdio: ['ignore', 'pipe', 'inherit'],
  });
  await run(
    'ssh',
    [...ssh, `mkdir -p ${REMOTE_TOOL} && tar -xf - -C ${REMOTE_TOOL}`],
    { stdin: tar.stdout }
  );
  const file = fs.createWriteStream(out);
  await Promise.all([
    run(
      'ssh',
      [
        ...ssh,
        `nice -n 15 node ${REMOTE_TOOL}/scan.mjs --machine ${host} --max-load 8 --out -`,
      ],
      { log, stdout: file }
    ),
    finished(file),
  ]);
}

export async function measure({
  remoteHost = 'm1-runner',
  log = line => process.stderr.write(`${line}\n`),
} = {}) {
  const started = Date.now();
  fs.mkdirSync(CACHE_DIR, { recursive: true });
  const outputs = [
    path.join(CACHE_DIR, `summaries-${LOCAL}.jsonl`),
    path.join(CACHE_DIR, `summaries-${remoteHost}.jsonl`),
  ];
  await Promise.all([
    scanLocal(outputs[0], log),
    scanRemote(remoteHost, outputs[1], log),
  ]);
  const measuredAt = new Date();

  const ledger = new Ledger();
  const machines = [];
  for (const file of outputs) {
    let head = null;
    for await (const line of readLines(file)) {
      if (!head) {
        machines.push((head = JSON.parse(line)));
        continue;
      }
      const { header, summaryText } = splitLine(line);
      ledger.add(head.machine, header, JSON.parse(summaryText));
    }
  }
  const totals = ledger.totals(classify, measuredAt.getTime() / 1000);
  const report = buildReport({
    ledger,
    totals,
    machines,
    measuredAt,
    seconds: Math.round((Date.now() - started) / 1000),
  });
  fs.writeFileSync(
    path.join(CACHE_DIR, 'report.json'),
    `${JSON.stringify(report, null, 2)}\n`
  );
  return report;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { values } = parseArgs({
    options: {
      json: { type: 'boolean' },
      'remote-host': { type: 'string', default: 'm1-runner' },
    },
  });
  measure({ remoteHost: values['remote-host'] })
    .then(report =>
      process.stdout.write(
        `${values.json ? JSON.stringify(report, null, 2) : formatReport(report)}\n`
      )
    )
    .catch(error => {
      process.stderr.write(`${error.stack ?? error}\n`);
      process.exit(1);
    });
}
