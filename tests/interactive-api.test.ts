/**
 * The landing page's endpoints through their route handlers, against a
 * real local D1 and rate limiter (wrangler's platform proxy, in memory, with
 * migrations/ applied). Only the Anthropic API is faked, at fetch.
 *
 *   npm test
 */
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import { after, before, beforeEach, test } from 'node:test';

import { getPlatformProxy } from 'wrangler';

import { POST as contact } from '../src/app/api/contact/route';
import { POST as events } from '../src/app/api/events/route';
import { POST as match } from '../src/app/api/match/route';
import { POST as suggest } from '../src/app/api/suggest/route';

type Proxy = Awaited<ReturnType<typeof getPlatformProxy<CloudflareEnv>>>;
let proxy: Proxy;
const contextKey = Symbol.for('__cloudflare-context__');
const realFetch = globalThis.fetch;
let modelCalls: unknown[] = [];

/** The route handlers read their bindings from OpenNext's global context. */
function useEnv(env: Partial<CloudflareEnv>) {
  (globalThis as Record<symbol, unknown>)[contextKey] = {
    env: { ...proxy.env, ...env },
    cf: proxy.cf,
    ctx: proxy.ctx,
  };
}

/** Claude's structured output for every request, as the Messages API sends it. */
function fakeClaude(output: object) {
  globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
    const url = input instanceof Request ? input.url : String(input);
    if (!url.startsWith('https://api.anthropic.com/'))
      return realFetch(input, init);
    modelCalls.push(JSON.parse(String(init?.body)));
    return Response.json({
      id: 'msg_test',
      type: 'message',
      role: 'assistant',
      model: 'claude-sonnet-5-5',
      content: [{ type: 'text', text: JSON.stringify(output) }],
      stop_reason: 'end_turn',
      stop_sequence: null,
      usage: { input_tokens: 20, output_tokens: 40 },
    });
  }) as typeof fetch;
}

const post = (path: string, body: object, ip = '203.0.113.7') =>
  new Request(`http://localhost${path}`, {
    method: 'POST',
    headers: { 'content-type': 'application/json', 'cf-connecting-ip': ip },
    body: JSON.stringify(body),
  });

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
});

after(async () => {
  globalThis.fetch = realFetch;
  await proxy.dispose();
});

beforeEach(() => {
  modelCalls = [];
});

test('match: Claude picks real products; a repeat comes from D1 with no model call', async () => {
  useEnv({ ANTHROPIC_API_KEY: 'sk-ant-test' });
  fakeClaude({
    matches: [
      { slug: 'dial', reason: 'Booking pages that check your live calendar.' },
    ],
  });

  const first = await match(
    post('/api/match', { query: 'We book client calls by email' })
  );
  assert.equal(first.status, 200);
  assert.deepEqual(await first.json(), {
    query: 'we book client calls by email',
    matches: [
      { slug: 'dial', reason: 'Booking pages that check your live calendar.' },
    ],
    cached: false,
  });
  const request = modelCalls[0] as { system: { cache_control?: object }[] };
  assert.ok(request.system[0]?.cache_control, 'the catalogue prompt is cached');

  const second = await match(
    post('/api/match', { query: '  we book client calls by email! ' })
  );
  assert.equal(((await second.json()) as { cached: boolean }).cached, true);
  assert.equal(modelCalls.length, 1);

  const { results } = await proxy.env.DB.prepare(
    'SELECT query, slugs, cache_hit FROM search_log ORDER BY id'
  ).all();
  assert.deepEqual(results, [
    { query: 'we book client calls by email', slugs: 'dial', cache_hit: 0 },
    { query: 'we book client calls by email', slugs: 'dial', cache_hit: 1 },
  ]);
});

test('match: without an Anthropic key a new query fails honestly', async () => {
  useEnv({ ANTHROPIC_API_KEY: undefined });
  const response = await match(
    post('/api/match', { query: 'payroll' }, '203.0.113.8')
  );
  assert.equal(response.status, 503);
  assert.equal(
    ((await response.json()) as { error: { code: string } }).error.code,
    'not_configured'
  );
  assert.equal(modelCalls.length, 0);
});

test('suggest: stores the row, refuses the honeypot, then rate limits', async () => {
  useEnv({});
  // Local rate-limit windows follow the wall clock; keep the burst inside one.
  const left = 60_000 - (Date.now() % 60_000);
  if (left < 8_000)
    await new Promise(resolve => setTimeout(resolve, left + 100));
  const ip = '198.51.100.4';
  const ok = await suggest(
    post(
      '/api/suggest',
      {
        product: 'Payroll',
        note: 'Twelve people',
        email: 'a@example.com',
        website: '',
      },
      ip
    )
  );
  assert.equal(ok.status, 201);

  const bot = await suggest(
    post('/api/suggest', { product: 'Spam', website: 'http://spam.test' }, ip)
  );
  assert.equal(bot.status, 400);

  const { results } = await proxy.env.DB.prepare(
    'SELECT product, note, email FROM suggestions'
  ).all();
  assert.deepEqual(results, [
    { product: 'Payroll', note: 'Twelve people', email: 'a@example.com' },
  ]);

  const statuses: number[] = [];
  for (let i = 0; i < 10; i += 1) {
    statuses.push(
      (await suggest(post('/api/suggest', { product: `Tool ${i}` }, ip))).status
    );
  }
  assert.deepEqual(statuses.slice(0, 9), Array(9).fill(201));
  assert.equal(statuses[9], 429);
});

test('contact: stores the message, refuses the honeypot and bad input, then rate limits', async () => {
  useEnv({});
  const left = 60_000 - (Date.now() % 60_000);
  if (left < 8_000)
    await new Promise(resolve => setTimeout(resolve, left + 100));
  const ip = '198.51.100.9';
  const send = (body: object) => contact(post('/api/contact', body, ip));
  const message = { email: 'a@example.com', message: 'Hello there' };

  assert.equal(
    (await send({ ...message, name: 'Ada', topic: 'maker', website: '' }))
      .status,
    201
  );
  assert.equal(
    (await send({ ...message, website: 'http://spam.test' })).status,
    400
  );
  assert.equal((await send({ message: 'No email' })).status, 400);
  assert.equal((await send({ email: 'a@example.com' })).status, 400);

  const { results } = await proxy.env.DB.prepare(
    'SELECT topic, name, email, message FROM contact_messages'
  ).all();
  assert.deepEqual(results, [
    {
      topic: 'maker',
      name: 'Ada',
      email: 'a@example.com',
      message: 'Hello there',
    },
  ]);

  const statuses: number[] = [];
  for (let i = 0; i < 10; i += 1) statuses.push((await send(message)).status);
  assert.deepEqual(statuses.slice(0, 9), Array(9).fill(201));
  assert.equal(statuses[9], 429);
});

test('events: stores page views and events without an IP; refuses unknown beacons', async () => {
  useEnv({});
  const view = '0b1c2d3e-4f50-4a6b-8c7d-9e0f1a2b3c4d';
  const beacon = (body: object) =>
    events(
      new Request('http://localhost/api/events', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'cf-connecting-ip': '198.51.100.20',
          'user-agent':
            'Mozilla/5.0 (iPhone; CPU iPhone OS 18_0 like Mac OS X) Mobile/15E148',
        },
        body: JSON.stringify(body),
      })
    );

  const pageView = {
    kind: 'view',
    view_id: view,
    path: '/#vol-uptime',
    utm_source: 'x',
  };
  assert.equal((await beacon(pageView)).status, 201);
  const click = {
    kind: 'event',
    view_id: view,
    name: 'hero_cta',
    detail: 'uptime',
  };
  assert.equal((await beacon(click)).status, 201);

  assert.equal((await beacon({ ...click, view_id: 'nope' })).status, 400);
  assert.equal((await beacon({ ...click, name: 'scrolled' })).status, 400);
  assert.equal((await beacon({ ...pageView, path: undefined })).status, 400);
  assert.equal((await beacon({ ...click, kind: 'exposure' })).status, 400);

  const views = await proxy.env.DB.prepare(
    'SELECT view_id, path, utm_source, utm_campaign, device FROM page_views'
  ).all();
  assert.deepEqual(views.results, [
    {
      view_id: view,
      path: '/#vol-uptime',
      utm_source: 'x',
      utm_campaign: null,
      device: 'mobile',
    },
  ]);
  const stored = await proxy.env.DB.prepare(
    'SELECT view_id, name, detail FROM events'
  ).all();
  assert.deepEqual(stored.results, [
    { view_id: view, name: 'hero_cta', detail: 'uptime' },
  ]);
});
