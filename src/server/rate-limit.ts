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
 * One request from `address` against the Workers Rate Limiting binding
 * (wrangler.toml: 10 a minute, counted separately per scope). Throws
 * `rate_limited` when the visitor is over the limit.
 */
export async function takeRateLimit(
  env: CloudflareEnv,
  scope: 'match' | 'suggest',
  address: string
): Promise<void> {
  if (!env.RATE_LIMITER) {
    throw new ApiError(
      'not_configured',
      'Rate limiting is not set up here yet.'
    );
  }
  const { success } = await env.RATE_LIMITER.limit({
    key: await hashedKey(scope, address),
  });
  if (!success) {
    throw new ApiError(
      'rate_limited',
      'Too many requests from here. Try again in a minute.'
    );
  }
}
