import { isUsageEvent, isViewId } from '@/lib/usage';
import type { UsageEventName } from '@/lib/usage';

import { requireDb } from '../env';
import { ApiError } from '../http';
import { takeRateLimit } from '../rate-limit';

export type DeviceClass = 'mobile' | 'tablet' | 'desktop' | 'bot';

/** All /api/events keeps of the user agent. Crawlers and headless browsers are 'bot'. */
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
      kind: 'view';
      viewId: string;
      path: string;
      utmSource: string | null;
      utmCampaign: string | null;
      utmContent: string | null;
    }
  | {
      kind: 'event';
      viewId: string;
      name: UsageEventName;
      detail: string | null;
    };

/** The beacon as stored, or an `invalid_request` naming what is wrong. */
export function readBeacon(body: Record<string, unknown>): Beacon {
  const { kind, view_id: viewId } = body;
  if (!isViewId(viewId)) {
    throw new ApiError('invalid_request', 'Send the page view id.');
  }
  if (kind === 'view') {
    const path = text(body.path, 200, 'The path');
    if (!path?.startsWith('/')) {
      throw new ApiError('invalid_request', 'Send the page path.');
    }
    return {
      kind,
      viewId,
      path,
      utmSource: text(body.utm_source, 100, 'utm_source'),
      utmCampaign: text(body.utm_campaign, 100, 'utm_campaign'),
      utmContent: text(body.utm_content, 100, 'utm_content'),
    };
  }
  if (kind === 'event') {
    if (!isUsageEvent(body.name)) {
      throw new ApiError('invalid_request', 'That event is not measured.');
    }
    return {
      kind,
      viewId,
      name: body.name,
      detail: text(body.detail, 120, 'The detail'),
    };
  }
  throw new ApiError('invalid_request', 'Send a view or an event as the kind.');
}

/**
 * POST /api/events: validate, rate limit, store. Rows hold the page's random
 * view id, never an IP or a user agent (only a device class, on views).
 */
export async function storeBeacon(
  env: CloudflareEnv,
  body: Record<string, unknown>,
  userAgent: string | null,
  address: string
): Promise<void> {
  const beacon = readBeacon(body);
  await takeRateLimit(env, 'events', address);
  const db = requireDb(env);
  if (beacon.kind === 'view') {
    await db
      .prepare(
        `INSERT INTO page_views
           (view_id, path, utm_source, utm_campaign, utm_content, device)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6)`
      )
      .bind(
        beacon.viewId,
        beacon.path,
        beacon.utmSource,
        beacon.utmCampaign,
        beacon.utmContent,
        deviceClass(userAgent)
      )
      .run();
    return;
  }
  await db
    .prepare('INSERT INTO events (view_id, name, detail) VALUES (?1, ?2, ?3)')
    .bind(beacon.viewId, beacon.name, beacon.detail)
    .run();
}
