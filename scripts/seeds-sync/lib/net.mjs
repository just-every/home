/**
 * Network reads: repository files from raw.githubusercontent.com, refs with
 * `git ls-remote`, and plain HTTP checks. Nothing here uses the GitHub API,
 * which is rate limited and shared with other sessions; the one exception,
 * `commitAt`, is called only when a seed has no baseline yet.
 */
import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const run = promisify(execFile);

/** An outage or refusal we could not read past: the seed is left unchanged. */
export class Unreadable extends Error {
  constructor(what, cause) {
    super(`${what}: ${cause}`);
    this.what = what;
  }
}

const sleep = ms => new Promise(done => setTimeout(done, ms));

/**
 * GET with three tries. Resolves to the Response for 2xx and to null for 404
 * (the file is absent, which is a fact, not a failure); anything else after
 * the last try throws Unreadable.
 */
export async function get(url, { tries = 3, timeoutMs = 20000 } = {}) {
  let last;
  for (let attempt = 1; attempt <= tries; attempt++) {
    try {
      const response = await fetch(url, {
        signal: AbortSignal.timeout(timeoutMs),
        redirect: 'follow',
        headers: { 'user-agent': 'justevery-seeds-sync' },
      });
      if (response.ok) return response;
      if (response.status === 404 || response.status === 410) return null;
      last = `HTTP ${response.status}`;
    } catch (error) {
      last = error.cause?.code ?? error.name ?? String(error);
    }
    if (attempt < tries) await sleep(800 * attempt);
  }
  throw new Unreadable(url, last);
}

export const parseRepo = url => {
  const match = /github\.com\/([^/]+)\/([^/#?]+)/.exec(url);
  if (!match) throw new Error(`not a GitHub repository URL: ${url}`);
  return `${match[1]}/${match[2].replace(/\.git$/, '')}`;
};

/** A file at a commit, as a Buffer, or null where the repo has none. */
export async function rawFile(repo, ref, path) {
  const response = await get(
    `https://raw.githubusercontent.com/${repo}/${ref}/${path}`
  );
  return response ? Buffer.from(await response.arrayBuffer()) : null;
}

async function lsRemote(repo, options, patterns = []) {
  try {
    const { stdout } = await run(
      'git',
      ['ls-remote', ...options, `https://github.com/${repo}.git`, ...patterns],
      {
        timeout: 30000,
        env: { ...process.env, GIT_TERMINAL_PROMPT: '0' },
      }
    );
    return stdout
      .trim()
      .split('\n')
      .filter(Boolean)
      .map(line => line.split('\t'));
  } catch (error) {
    throw new Unreadable(
      `git ls-remote ${repo}`,
      error.stderr?.trim() || error.message
    );
  }
}

/** The default branch's head commit. */
export async function headCommit(repo) {
  const rows = await lsRemote(repo, [], ['HEAD']);
  const head = rows.find(
    ([sha, ref]) => ref === 'HEAD' && /^[0-9a-f]{40}$/.test(sha)
  );
  if (!head) throw new Unreadable(`HEAD of ${repo}`, 'no HEAD ref');
  return head[0];
}

/** Every vX.Y.Z tag, newest version first. */
export async function versionTags(repo) {
  const rows = await lsRemote(repo, ['--tags', '--refs']);
  return rows
    .map(([, ref]) => ref.replace('refs/tags/', ''))
    .filter(tag => /^v\d+\.\d+\.\d+$/.test(tag))
    .sort((a, b) => compareVersions(b, a));
}

export function compareVersions(a, b) {
  const pa = a.replace(/^v/, '').split('.').map(Number);
  const pb = b.replace(/^v/, '').split('.').map(Number);
  for (let i = 0; i < 3; i++) if (pa[i] !== pb[i]) return pa[i] - pb[i];
  return 0;
}

/**
 * The default branch's commit at a moment, from the GitHub API (one call).
 * Only used to set a baseline for a seed the state has never seen.
 */
export async function commitAt(repo, isoDate) {
  try {
    const { stdout } = await run(
      'gh',
      [
        'api',
        `repos/${repo}/commits?until=${encodeURIComponent(isoDate)}&per_page=1`,
        '--jq',
        '.[0].sha',
      ],
      { timeout: 30000 }
    );
    const sha = stdout.trim();
    return /^[0-9a-f]{40}$/.test(sha) ? sha : null;
  } catch (error) {
    throw new Unreadable(
      `commit of ${repo} at ${isoDate}`,
      error.stderr?.trim() || error.message
    );
  }
}

/** Runs `fn` over `items` with at most `limit` at once, in order. */
export async function mapLimit(items, limit, fn) {
  const results = new Array(items.length);
  let next = 0;
  const worker = async () => {
    while (next < items.length) {
      const index = next++;
      results[index] = await fn(items[index], index);
    }
  };
  await Promise.all(
    Array.from({ length: Math.min(limit, items.length) }, worker)
  );
  return results;
}
