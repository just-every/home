import { ApiError } from './http';

/** Salt for rate-limit keys, so the keys Cloudflare counts are not IPs. */
const KEY_SALT = 'justevery-landing-v1';

async function hashedKey(scope: string, address: string): Promise<string> {
  const bytes = new TextEncoder().encode(`${KEY_SALT}:${scope}:${address}`);
  const digest = await crypto.subtle.digest('SHA-256', bytes);
  return Array.from(new Uint8Array(digest).slice(0, 16), byte =>
    byte.toString(16).padStart(2, '0')
  ).join('');
}

/**
 * One request from `address` against a Workers Rate Limiting binding,
 * counted separately per scope (wrangler.toml): the forms and search get 10 a
 * minute; the usage beacons (a page view or a click each) get
 * EVENTS_RATE_LIMITER's 120. Throws `rate_limited` when the visitor is over
 * the limit.
 */
export async function takeRateLimit(
  env: CloudflareEnv,
  scope: 'match' | 'suggest' | 'contact' | 'events',
  address: string
): Promise<void> {
  const limiter =
    scope === 'events' ? env.EVENTS_RATE_LIMITER : env.RATE_LIMITER;
  if (!limiter) {
    throw new ApiError(
      'not_configured',
      'Rate limiting is not set up here yet.'
    );
  }
  const { success } = await limiter.limit({
    key: await hashedKey(scope, address),
  });
  if (!success) {
    throw new ApiError(
      'rate_limited',
      'Too many requests from here. Try again in a minute.'
    );
  }
}
