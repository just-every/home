# Toolchain and preview limitations

Author: Run Edit Run fleet. Recorded: 2026-11-19T11:54:30Z.

The first dry sync reached all six repository sources, then stopped because the committed capture reader could not resolve Playwright. No application change was applied by that failed run. A temporary local Playwright installation made the successful first dry run possible. Before the apply/check sequence, npm ci with the repository's npm 10.9.3 pin restored lockfile dependencies. The already provisioned Playwright core 1.62.1 was then made available only in ignored node_modules. No manifest or lockfile was changed. Fleet hooks were reinstalled after dependency setup. Captures used /usr/bin/chromium and --no-sandbox; no owner browser profile was used.

The plain Next production preview returned HTTP 200 for /spool and /data/listings.json at both widths. Its log warns about output: standalone, unavailable Cloudflare caches for the token snapshot and an unmigrated local page_views analytics table. Those Cloudflare-backed services were not configured or changed in this catalogue task. The local proof covers the changed version and its data feed; it is not production deployment or backend-provider proof. The actual preview log is retained. The required exact-SHA branch Verify completed successfully, including its own full checks and Cloudflare production build.

GitHub calls made directly for review/publication/CI: six Release-list reads, one Spool released-source comparison, one PR creation and one exact-SHA workflow discovery (9 total). The mandated committed sync invocations additionally made their own contents reads (180: 36 for the first dry that lacked Playwright, 36 for the recovered dry, 18 copy-only before, 36 mechanical apply, 18 copy-only after, 36 final dry). No task-local Git/API adapter, alternate credential or short-interval API watcher was used.

No unresolved source, release or product-check blocker remains. The Mac-only publication scan and independent gate are retained with the lane. No deployment or merge was performed.
