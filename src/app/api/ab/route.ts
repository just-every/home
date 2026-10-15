import type { SuggestResponse } from '@/lib/interactive-api';
import { storeBeacon } from '@/server/ab/service';
import { workerEnv } from '@/server/env';
import {
  clientAddress,
  errorResponse,
  json,
  readJsonObject,
} from '@/server/http';

/**
 * POST { kind: 'exposure', variant, forced, utm_source?, utm_campaign?,
 * utm_content?, landing? } or { kind: 'event', variant, forced, name,
 * detail? }, with the je_vid and je_hero cookies -> 201 { ok: true }.
 */
export async function POST(request: Request): Promise<Response> {
  try {
    const body = await readJsonObject(request);
    const env = await workerEnv();
    await storeBeacon(env, body, request.headers, clientAddress(request));
    const created: SuggestResponse = { ok: true };
    return json(created, 201);
  } catch (error) {
    return errorResponse(error);
  }
}
