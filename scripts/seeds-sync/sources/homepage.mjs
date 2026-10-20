/**
 * Reads every seed's homepage through capture-page.mjs, here or on another
 * machine over ssh (`--capture-host`), and returns its results by slug with
 * the path of each PNG on this machine.
 */
import { execFile } from 'node:child_process';
import { randomBytes } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const run = promisify(execFile);
const here = dirname(fileURLToPath(import.meta.url));
const script = join(here, 'capture-page.mjs');

/** Where the capture host keeps Playwright (installed once) and its runs. */
const REMOTE_DIR = 'seeds-sync-capture';
const REMOTE_PLAYWRIGHT = 'playwright-core@1.63.0';

const sh = (host, command, timeout = 600000) =>
  run('ssh', ['-o', 'BatchMode=yes', host, command], {
    timeout,
    maxBuffer: 32 << 20,
  });

async function captureRemote(host, jobsFile, out) {
  const id = `run-${Date.now()}-${randomBytes(3).toString('hex')}`;
  const dir = `${REMOTE_DIR}/${id}`;
  await sh(
    host,
    `mkdir -p ${dir} && cd ${REMOTE_DIR} && ` +
      `{ [ -d node_modules/playwright-core ] || npm i --no-save --silent --no-audit --no-fund ${REMOTE_PLAYWRIGHT}; }`
  );
  try {
    await run('scp', [
      '-q',
      '-o',
      'BatchMode=yes',
      script,
      jobsFile,
      `${host}:${dir}/`,
    ]);
    const { stdout } = await sh(
      host,
      `cd ${dir} && node capture-page.mjs jobs.json out`
    );
    process.stdout.write(stdout.replace(/^/gm, `  [${host}] `));
    await run('scp', [
      '-q',
      '-r',
      '-o',
      'BatchMode=yes',
      `${host}:${dir}/out/.`,
      out,
    ]);
  } finally {
    await sh(host, `rm -rf ${dir}`).catch(() => {});
  }
}

/**
 * Captures `jobs` ([{ slug, url }]) into `out`. Returns a Map of slug to the
 * page's facts plus `png` (its local path) when it was read.
 */
export async function captureHomepages(jobs, out, { host } = {}) {
  mkdirSync(out, { recursive: true });
  const jobsFile = join(out, 'jobs.json');
  writeFileSync(jobsFile, JSON.stringify(jobs, null, 2));
  if (host) {
    await captureRemote(host, jobsFile, out);
  } else {
    const { stdout } = await run(process.execPath, [script, jobsFile, out], {
      timeout: 900000,
      maxBuffer: 32 << 20,
    });
    process.stdout.write(stdout.replace(/^/gm, '  '));
  }
  const results = JSON.parse(readFileSync(join(out, 'results.json'), 'utf8'));
  return new Map(
    results.map(result => [
      result.slug,
      { ...result, png: result.ok ? join(out, `${result.slug}.png`) : null },
    ])
  );
}
