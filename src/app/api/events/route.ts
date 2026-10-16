import type { SuggestResponse } from '@/lib/interactive-api';
import { workerEnv } from '@/server/env';
import {
  clientAddress,
  errorResponse,
  json,
  readJsonObject,
} from '@/server/http';
import { storeBeacon } from '@/server/usage/service';

/**
 * POST { kind: 'view', view_id, path, utm_source?, utm_campaign?,
 * utm_content? } or { kind: 'event', view_id, name, detail? }
 * -> 201 { ok: true }.
 */
export async function POST(request: Request): Promise<Response> {
  try {
    const body = await readJsonObject(request);
    const env = await workerEnv();
    await storeBeacon(
      env,
      body,
      request.headers.get('user-agent'),
      clientAddress(request)
    );
    const created: SuggestResponse = { ok: true };
    return json(created, 201);
  } catch (error) {
    return errorResponse(error);
  }
}
