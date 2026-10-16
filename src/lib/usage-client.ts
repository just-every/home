/**
 * The browser side of the usage log: one record per page view and one per
 * engagement event, posted to /api/events. A page view is a random id minted
 * here; no cookie and nothing else about the visitor is sent.
 */
import type { UsageEventName } from './usage';

let viewId: string | null = null;

function newViewId(): string {
  return crypto.randomUUID();
}

function beacon(body: Record<string, unknown>): void {
  try {
    void fetch('/api/events', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
      // Survives the navigation a GitHub or run-site click starts.
      keepalive: true,
      credentials: 'omit',
    }).catch(() => {});
  } catch {
    // Measurement never gets in the visitor's way.
  }
}

const clip = (value: string | null, max: number) =>
  value ? value.slice(0, max) : null;

/** Starts a page view: a fresh view id, and its record with the landing path. */
export function recordView(): void {
  try {
    viewId = newViewId();
    const params = new URLSearchParams(window.location.search);
    beacon({
      kind: 'view',
      view_id: viewId,
      path: clip(window.location.pathname + window.location.hash, 200),
      utm_source: clip(params.get('utm_source'), 100),
      utm_campaign: clip(params.get('utm_campaign'), 100),
      utm_content: clip(params.get('utm_content'), 100),
    });
  } catch {
    // Measurement never gets in the visitor's way.
  }
}

/** One engagement event, counted with the current page view. */
export function recordEvent(name: UsageEventName, detail?: string): void {
  if (typeof window === 'undefined') return;
  try {
    viewId ??= newViewId();
    beacon({
      kind: 'event',
      view_id: viewId,
      name,
      detail: clip(detail ?? null, 120),
    });
  } catch {
    // Measurement never gets in the visitor's way.
  }
}
