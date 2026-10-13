/**
 * GET /api/tokens, the footer's "Made with N tokens", through its route
 * handler against a real local D1 (wrangler's platform proxy, in memory, with
 * migrations/ applied).
 *
 *   npm test
 */
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { after, before, test } from 'node:test';

import { getPlatformProxy } from 'wrangler';

import { GET as tokens } from '../src/app/api/tokens/route';

type Proxy = Awaited<ReturnType<typeof getPlatformProxy<CloudflareEnv>>>;
let proxy: Proxy;

before(async () => {
  proxy = await getPlatformProxy<CloudflareEnv>({ persist: false });
  for (const file of readdirSync('migrations').sort()) {
    const statements = readFileSync(`migrations/${file}`, 'utf8')
      .replace(/--.*$/gm, '')
      .split(';')
      .map(statement => statement.trim())
      .filter(Boolean);
    await proxy.env.DB.batch(statements.map(sql => proxy.env.DB.prepare(sql)));
  }
  // The route reads its bindings from OpenNext's global context and caches
  // through the Workers Cache API.
  (globalThis as Record<symbol, unknown>)[
    Symbol.for('__cloudflare-context__')
  ] = {
    env: proxy.env,
    cf: proxy.cf,
    ctx: proxy.ctx,
  };
  (globalThis as Record<string, unknown>).caches = proxy.caches;
});

after(async () => {
  await proxy.dispose();
});

const get = () => tokens(new Request('http://localhost/api/tokens'));

test('tokens: no count before the first measurement, then the newest one', async () => {
  const none = await get();
  assert.equal(none.status, 404);
  assert.equal(none.headers.get('cache-control'), 'no-store');
  const body = (await none.json()) as { error: { code: string } };
  assert.equal(body.error.code, 'not_found');

  const insert = proxy.env.DB.prepare(
    'INSERT INTO token_snapshots (scope, measured_at, total, rate_per_second, breakdown) VALUES (?, ?, ?, ?, ?)'
  );
  await proxy.env.DB.batch([
    insert.bind(
      'products',
      '2026-10-10T00:00:00.000Z',
      90_000_000_000,
      41_000.5,
      '{}'
    ),
    insert.bind(
      'products',
      '2026-10-13T00:00:00.000Z',
      100_000_000_000,
      42_000.25,
      '{"claude":1}'
    ),
    insert.bind(
      'all',
      '2026-10-14T00:00:00.000Z',
      300_000_000_000,
      99_000,
      '{}'
    ),
  ]);

  const latest = await get();
  assert.equal(latest.status, 200);
  assert.match(
    latest.headers.get('cache-control') ?? '',
    /^public, max-age=\d+$/
  );
  assert.deepEqual(await latest.json(), {
    total: 100_000_000_000,
    ratePerSecond: 42_000.25,
    measuredAt: '2026-10-13T00:00:00.000Z',
  });
});
