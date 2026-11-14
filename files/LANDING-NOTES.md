# Landing notes

Report time: 2026-11-14T10:17:05Z.

NOTE G: The first browser readiness attempt waited for networkidle and timed out after 60 seconds before any product assertion. The successful public-door proof instead waited for DOMContentLoaded, visible h1 and loaded fonts; it used the real production page, no route interception, and no mock application. This is a harness observation, not a reproduced product failure.

NOTE G: Local `next start` warns that the build uses standalone output; it nevertheless served the real pre-rendered route with HTTP 200. Local Cloudflare token-cache and analytics bindings were unavailable (`caches is not defined`; D1 `page_views` table absent). Main showed the same local runtime conditions. No browser page exception, changed layout, version mismatch or user-visible regression appeared. These observations do not replace or contradict the successful exact-SHA Verify.

NOTE G: npm ci installed Husky. Fleet hook symlinks exposed a Husky post-checkout path-resolution problem, corrected only in the scratch Git common directory by an h trampoline that executes the original hook at its original path. Hooks were not disabled and no product file or commit was changed. See hook-setup-note.txt.

No publication/landing action is authorized by this report. The fleet retains the Mac publication scan, PR merge, deployment and live-site verification. No product branch was pushed by this gate. The local cloud/je-gate-41 name points to unmodified baseline main; evidence provenance binds the detached checkout to the candidate head.

Both owned servers were stopped by their recorded PIDs, 1447 and 2174, and Playwright closed each browser in finally. The scratch clone, including node_modules, is removed after report-only publication; packet files remain outside it.
