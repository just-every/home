import {
  AB_EVENTS,
  HERO_COOKIE,
  VISITOR_COOKIE,
  isHeroVariant,
  isVisitorId,
} from '@/lib/hero-ab';
import type { AbEventName, HeroVariantId } from '@/lib/hero-ab';

import { requireDb } from '../env';
import { ApiError } from '../http';
import { takeRateLimit } from '../rate-limit';

export type DeviceClass = 'mobile' | 'tablet' | 'desktop' | 'bot';

/** All /api/ab keeps of the user agent. Crawlers and headless browsers are 'bot'. */
export function deviceClass(userAgent: string | null): DeviceClass {
  const agent = userAgent ?? '';
  if (
    !agent ||
    /bot|crawl|spider|slurp|headless|lighthouse|preview|curl|wget|python/i.test(
      agent
    )
  ) {
    return 'bot';
  }
  if (/ipad|tablet|android(?!.*mobile)/i.test(agent)) return 'tablet';
  if (/mobi|iphone|ipod|android/i.test(agent)) return 'mobile';
  return 'desktop';
}

function cookieValue(header: string | null, name: string): string | undefined {
  for (const pair of (header ?? '').split(';')) {
    const at = pair.indexOf('=');
    if (at > 0 && pair.slice(0, at).trim() === name) {
      return pair.slice(at + 1).trim();
    }
  }
  return undefined;
}

/** Trimmed text, or null when absent or empty; refuses non-text and too long. */
function text(value: unknown, max: number, label: string): string | null {
  if (value === undefined || value === null) return null;
  if (typeof value !== 'string') {
    throw new ApiError('invalid_request', `${label} must be text.`);
  }
  const trimmed = value.trim();
  if (trimmed.length > max) {
    throw new ApiError(
      'invalid_request',
      `${label} must be ${max} characters or fewer.`
    );
  }
  return trimmed || null;
}

type Beacon =
  | {
      kind: 'exposure';
      variant: HeroVariantId;
      forced: boolean;
      utmSource: string | null;
      utmCampaign: string | null;
      utmContent: string | null;
      landing: string | null;
    }
  | {
      kind: 'event';
      variant: HeroVariantId;
      forced: boolean;
      name: AbEventName;
      detail: string | null;
    };

const isEventName = (value: unknown): value is AbEventName =>
  (AB_EVENTS as readonly unknown[]).includes(value);

/** The beacon as stored, or an `invalid_request` naming what is wrong. */
export function readBeacon(body: Record<string, unknown>): Beacon {
  const { kind, variant, forced } = body;
  if (!isHeroVariant(variant)) {
    throw new ApiError('invalid_request', 'That hero variant does not exist.');
  }
  if (typeof forced !== 'boolean') {
    throw new ApiError('invalid_request', 'Say whether the hero was forced.');
  }
  if (kind === 'exposure') {
    return {
      kind,
      variant,
      forced,
      utmSource: text(body.utm_source, 100, 'utm_source'),
      utmCampaign: text(body.utm_campaign, 100, 'utm_campaign'),
      utmContent: text(body.utm_content, 100, 'utm_content'),
      landing: text(body.landing, 200, 'The landing path'),
    };
  }
  if (kind === 'event') {
    if (!isEventName(body.name)) {
      throw new ApiError('invalid_request', 'That event is not measured.');
    }
    return {
      kind,
      variant,
      forced,
      name: body.name,
      detail: text(body.detail, 120, 'The detail'),
    };
  }
  throw new ApiError(
    'invalid_request',
    'Send an exposure or an event as the kind.'
  );
}

/**
 * POST /api/ab: validate, check the beacon against the visitor's cookies,
 * rate limit, store. A randomised (not forced) beacon must name the variant
 * the middleware assigned, so a randomised exposure is only ever the hero the
 * random split chose. Rows hold the cookie's random visitor id, never an IP
 * or a user agent.
 */
export async function storeBeacon(
  env: CloudflareEnv,
  body: Record<string, unknown>,
  headers: Headers,
  address: string
): Promise<void> {
  const beacon = readBeacon(body);
  const cookies = headers.get('cookie');
  const visitor = cookieValue(cookies, VISITOR_COOKIE);
  if (!isVisitorId(visitor)) {
    throw new ApiError('invalid_request', 'There is no visitor cookie.');
  }
  if (!beacon.forced && cookieValue(cookies, HERO_COOKIE) !== beacon.variant) {
    throw new ApiError(
      'invalid_request',
      'That is not the hero this visitor was assigned.'
    );
  }
  await takeRateLimit(env, 'ab', address);
  const db = requireDb(env);
  const forced = beacon.forced ? 1 : 0;
  if (beacon.kind === 'exposure') {
    await db
      .prepare(
        `INSERT INTO ab_exposures
           (visitor_id, variant, forced, utm_source, utm_campaign, utm_content, landing, device)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8)`
      )
      .bind(
        visitor,
        beacon.variant,
        forced,
        beacon.utmSource,
        beacon.utmCampaign,
        beacon.utmContent,
        beacon.landing,
        deviceClass(headers.get('user-agent'))
      )
      .run();
    return;
  }
  await db
    .prepare(
      'INSERT INTO ab_events (visitor_id, variant, forced, name, detail) VALUES (?1, ?2, ?3, ?4, ?5)'
    )
    .bind(visitor, beacon.variant, forced, beacon.name, beacon.detail)
    .run();
}
