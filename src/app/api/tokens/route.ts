import { getCloudflareContext } from '@opennextjs/cloudflare';

import { latestTokenSnapshot } from '@/server/tokens/store';

export const dynamic = 'force-dynamic';

/** Measurements land every few days; a few minutes at the edge spares D1. */
const CACHE_SECONDS = 300;

/** The Workers edge cache; the DOM typings in this project lack `default`. */
const edgeCache = () => (caches as unknown as { default: Cache }).default;

function failure(status: number, code: string, message: string): Response {
  return Response.json(
    { error: { code, message } },
    { status, headers: { 'cache-control': 'no-store' } }
  );
}

/**
 * GET -> { total, ratePerSecond, measuredAt }: the newest measurement of the
 * tokens spent building the products, cached at the edge. 404 before the
 * first measurement; the footer then shows no count at all.
 */
export async function GET(request: Request): Promise<Response> {
  try {
    const cache = edgeCache();
    // One cache entry, whatever query string a visitor adds.
    const key = new Request(new URL('/api/tokens', request.url));
    const hit = await cache.match(key);
    if (hit) return hit;

    const { env, ctx } = await getCloudflareContext({ async: true });
    if (!env.DB) {
      return failure(503, 'not_configured', 'Storage is not set up here yet.');
    }
    const snapshot = await latestTokenSnapshot(env.DB);
    if (!snapshot) {
      return failure(404, 'not_found', 'No token count has been measured yet.');
    }
    const response = Response.json(snapshot, {
      headers: { 'cache-control': `public, max-age=${CACHE_SECONDS}` },
    });
    ctx.waitUntil(cache.put(key, response.clone()));
    return response;
  } catch (error) {
    console.error('Token snapshot unavailable', error);
    return failure(
      502,
      'unavailable',
      'The token count is unavailable right now.'
    );
  }
}
