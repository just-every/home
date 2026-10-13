import { getCloudflareContext } from '@opennextjs/cloudflare';

import { ApiError } from './http';

/** The Worker's bindings: production, `npm run preview`, or `next dev` via wrangler. */
export async function workerEnv(): Promise<CloudflareEnv> {
  const { env } = await getCloudflareContext({ async: true });
  return env;
}

export function requireDb(env: CloudflareEnv): D1Database {
  if (!env.DB) {
    throw new ApiError('not_configured', 'Storage is not set up here yet.');
  }
  return env.DB;
}
