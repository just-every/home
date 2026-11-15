# Landing notes

Author: Run Edit Run fleet; 2026-11-15T10:36:43Z.

NOTE G: The first local browser attempt used networkidle and timed out after 45 seconds while asynchronous work remained. The rerun used DOM readiness, real visible content, fonts and screenshots; it passed without changing or mocking application code. Keep browser-initial-networkidle.json with the successful receipt.

NOTE G: The production Next server warned that standalone output normally uses .next/standalone/server.js. It nevertheless served the built /lamp and /data/listings.json as HTTP 200. Local Cloudflare-only telemetry logged caches undefined and an absent page_views D1 table, and browser reload aborted /api/tokens and /api/events requests. Those routes and all render components are unchanged against main; no provider credentials or telemetry writes were requested by the gate. These observations are local harness limitations, not findings introduced by the version sync, and do not impair the demonstrated catalogue or version display.

Envelope asset presence is not signature verification. The annotated Git tag reports unsigned; the frozen promotion rule does not require a signed Git tag. The Mac lane retains publication scan, landing by PR and deployment. No product branch, PR, comment, workflow or deployment was changed by this gate.
