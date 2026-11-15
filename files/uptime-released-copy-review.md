# Released copy comparison: uptime

Author: Run Edit Run fleet. Date: 2026-11-15T22:02:02Z

https://github.com/just-every/run-uptime/compare/v0.5.12...v0.5.13

Base: 2045014b15f76380b5d7493c0c42b2caa430f88b
Head: c1e8376c7dfd6ed601b6fe993567237449fc7143

## CONTRACT.md

```diff
@@ -1540,7 +1540,7 @@ Judged from the code and tests at commit `67280b96d5401299f320c18baa225366d230ea
 | `BOUNDARY-001` | Monitoring ownership and honest delivery claims | published | partial | `tests/notify-delivery.mjs`, existing DELIVERY-002 deduplicated retry journey extended by `tests/notify-oncall-fixture.mjs` (proveOncallHandoff: configured native handoff; distinct facts and one acknowledgment; lost provider and bounded retry; lost probes without recovery; distinct network labels); `docs/oncall-handoff.md` | Native Oncall handoff ships through signed-webhook configuration and private delivery and incident reads. Received remains unknown: Oncall exposes no scoped native alert receipt read door. Responded remains unknown: no scoped native door attributes human response to the source, key and generation. Handoff-specific console rendering remains with uip; other named connectors remain under their own clauses. |
 | `DRILL-001` | Recipient-reported alert drills | published | done | `src/domain/alert-drills.server.ts`; `tests/alert-drill.mjs` |  |
 | `STARTUP-001` | Required configuration diagnostics | published | partial | `src/domain/startup-config.mjs`; `tests/public-paths.mjs` — missing SESSION_SECRET gives Worker health 503 with a named, value-free diagnostic; restored settings recover to 200. `tests/resilience/watches.mjs` — Recover monitoring across runner and Worker crashes without replaying uncertain sends, invoking `tests/startup-runner-config-support.mjs` proveRunnerStartupConfiguration once: the actual private-runner command independently refuses missing and malformed UPTIME_CONTROL_ORIGIN and UPTIME_RUNNER_KEY with nonzero exits and binding names, withholding raw and encoded planted values; independently observed control and target edges receive no requests, every durable table is unchanged and disposable child directories retain no execution custody. Correcting each environment and restarting the same command in the same directory against a real migrated emitted Worker gives signed authenticated enrollment, an idle claim, durable contact and clean termination without target work. | Missing SESSION_SECRET returns Worker health 503 with a named, value-free diagnostic, and restored configuration returns 200. Gap: other missing/malformed and conditional bindings, scheduled/local-app/preview/setup/deployment/private-runner entry points, missing ASSETS, a D1 readiness fault and the three-second fault-response budget lack assertions in the cited files. Retained bounded evidence (qualification pending; current partial judgment and unscoped gaps retained): the new command proof covers only missing and malformed UPTIME_CONTROL_ORIGIN and UPTIME_RUNNER_KEY and corrected idle enrollment. It does not qualify the complete private-runner binding matrix or the other runtime entry points, ASSETS, D1 faults or readiness timing. Console requalification, hosted readiness and capacity, and provider-account qualification remain held. |
-| `PUBLIC-002` | Declared sessionless paths and rate limits | published | done | `src/domain/public-rate-limits.server.ts`; `package.json`; `scripts/verification-plan.mjs`; `tests/public-paths.mjs` — declared sessionless paths enumerated against emitted routes, undeclared and private GET and POST refused by their own authentication, each class limit exceeded with 429, a second client unaffected, and removed counter storage failing closed (lines 27-135); `tests/public-paths-support.mjs` limited — positive integral Retry-After seconds and no-store (lines 64-70); `tests/access-matrix.mjs` — declared runner and setup paths keep their own runner and session checks behind admission, with installation data unchanged (lines 62-67, lines 99-108) | |
+| `PUBLIC-002` | Declared sessionless paths and rate limits | published | done | `src/domain/public-rate-limits.server.ts`; `package.json`; `scripts/verification-plan.mjs`; `tests/public-paths.mjs` — declared sessionless paths enumerated against emitted routes, undeclared and private GET and POST refused by their own authentication, each class limit exceeded with 429, a second client unaffected, and removed counter storage failing closed (lines 27-135); `tests/public-paths-support.mjs` limited — positive integral Retry-After seconds and no-store (lines 64-70); `tests/access-matrix.mjs` — declared runner and setup paths keep their own runner and session checks behind admission, with installation data unchanged (lines 62-67, lines 99-108); `tests/public-paths.mjs` (BASE-ACCESS-003 public paths and rate limits); `tests/operator-browser.mjs` (repeatConsoleLoads) | |
 | `FLOW-001` | Supported isolated browser transactions | published | partial | `src/domain/flow.mjs`; `runners/src/flow/run-flow.mjs`; `src/domain/flow-changes.server.ts`; `tests/flow-journey.mjs`; `tests/flow-journey.mjs`; `tests/flow-profiles.mjs`; `docs/browser-flows.md` | Login, synthetic signup and sandbox order submission now run through the real Worker and two isolated signed runner processes, with retained missing-control, HTTP-error, missing-outcome, navigation-timeout, private-redirect, metadata and extra-origin failures, unchanged-definition scheduled recovery and unavailable-browser Unknown. Navigation timeouts no longer claim a clicked control was missing; numeric forbidden destinations are refused before browser dispatch as well as at the proxy. Local 1440/390 evidence and guide journeys are proven; independently placed browser-vantage and hosted customer-path qualification remain open. |
 | `MONITOR-001` | Owned monitor catalog and lifecycle | target | partial | `src/domain/catalog/`; `src/domain/alert-routes.server.ts`; `public/assets/alert-route.js`; `tests/catalog.mjs`; `tests/alert-routes.mjs`; `docs/evidence/contracts/routing/`; `src/domain/catalog/routes.server.ts`; `migrations/0072_named_alert_routes.sql`; `scripts/routing.mjs`; `tests/catalog-routes-support.mjs` (called by the existing `tests/alert-routes.mjs` registration) | Catalog metadata, retained URL search/filter/selection and reviewed undoable lifecycle/URL/CSV batches ship. Existing monitor/service/group/installation recipient selection and matched recovery remain supported. Immutable named copies of reviewed explicit monitor routes now have owner-only fresh-MFA API/CLI selection preview (counts, per-monitor before/after, refusals and no-confirmed-recipient warning), atomic assignment and undo. The existing routing registration proves zero-write preview; admin/email-only and stale/race refusal; an actual confirmed incident reaching the route's separately confirmed fake-mail recipient while an unassigned monitor sends nothing; undo restoring inheritance/overrides after checks run without touching definitions, evidence or consent; later-route conflict refusal; local-only archive authority; monitor erasure and anonymized batch ownership. Issuer erasure removes session-bound MFA rows before invitation-derived Base sessions and preserves the surviving owner's factor and fresh sign-in. The existing catalog registration proves undo retains a clone's real signed HTTP observation, its scheduled slot and every history record. The list journey in `tests/operator-browser.mjs` proves planned, recurring, quick and inactive maintenance at 1440 and 390 with zero axe violations, no overflow or console errors. Gaps: held console batch-route control; naming is limited to reviewed explicit monitor policies and saved names have no edit/remove door; route defaults during URL/CSV bulk creation; removal of a never-probed clone; USD pricing; the 500-monitor target; hosted capacity/timing acceptance. Current installation cap: 100 monitors. History-bearing clones remain paused and retained by undo. |
 | `API-001` | Complete HTTP and API assertions | target | done | `src/domain/http-assertions.mjs`; `src/domain/http-assertions/`; `src/domain/evidence.server.ts`; `docs/evidence/contracts/http-assertions/`; `tests/probe-native-evidence.mjs` — saved assertion bundle executed at the network edge; status set and range, body present and absent, header, regex, root JSON member and latency each fail alone with the others passing, retries retained, saved criteria unchanged through failure and recovery (lines 23-57); `tests/probe-json-evidence-support.mjs` proveJsonSelectors (called by that journey) — JSON array and nested JSONPath selectors independently broken and recovered through owner saves, real probes and signed scheduled completion (lines 4-68) | |
```

## README.md

```diff
@@ -39,12 +39,14 @@ Use Git on macOS, Linux or Windows with WSL2. The CLI selects the checkout's pin
 curl -fsSL https://runeditrun.com/install.sh | sh -s -- dev just-every/run-uptime
 ```
 
-That one line installs `rer`, clones Uptime and starts it; Node does not need to be installed first. If you already have Node, use this alternative:
+That one line installs `rer`, clones Uptime and starts it; Node does not need to be installed first. The same in two steps: run `curl -fsSL https://runeditrun.com/install.sh | sh`, then `rer dev just-every/run-uptime` (`$HOME/.local/bin/rer dev just-every/run-uptime` until the PATH line the installer prints has taken effect).
+
+Already have Node 22 or later? This alternative does the same:
 
 ```sh
 npx -y @runeditrun/rer dev just-every/run-uptime
 ```
-To start it again later, run `cd run-uptime && rer dev`. To choose the owner yourself, run `npx -y @runeditrun/rer install just-every/run-uptime`, then these from the checkout instead:
+To start it again later, run `cd run-uptime && rer dev`. To choose the owner yourself, install `rer` with `curl -fsSL https://runeditrun.com/install.sh | sh`, then run `rer install just-every/run-uptime`, then these from the checkout instead:
 
 ```sh
 rer setup
@@ -54,21 +56,21 @@ rer setup
 rer dev
 ```
 
-`rer` runs each verb with the `@runeditrun/rer` version this checkout pins in [`package.json`](package.json).
+`rer` runs each verb with the `@runeditrun/rer` version this checkout pins in [`package.json`](package.json). The installer keeps Node private to `rer`, so `node` may not be on your PATH: wherever this README or the docs show `node scripts/NAME.mjs ARGS`, run `rer run --script scripts/NAME.mjs ARGS` instead.
 
 `rer install` installs the frozen dependencies. `rer setup` creates the first owner and private local settings; follow its prompts. A checkout already set up keeps its existing owner and data. `rer dev` starts the app, private runner and practice target. In an interactive terminal it stays in the foreground; Control-C stops it. From a non-interactive shell it returns once ready and leaves the app running. Use `rer dev --detach` for an explicit background run. A first start can take several minutes; repeating `rer dev` resumes an interrupted setup.
 
 Open the address printed as `RER_READY` and complete the browser sign-in handoff from `rer dev`. Keep any local access credential private. First-run setup opens at `/setup`; choose **Continue** (or **Skip**) to enter the console at `/app`. Until then, app routes return the owner to `/setup`. Hosted email-link sign-in and notifications use your configured mail sender. Development and demo runs report successful sends without sending email. See [Install](docs/getting-started.md) for setup details.
 
 The app origin serves its Lobby at `/` and documentation at `/docs`. The separate marketing site is `https://run-uptime.com/`, with a `/run` page: `rer build --site` writes it to `dist/site`, and `rer dev` serves it at `RER_SITE`. Vite provides assets and HMR. Stop the app and its owned runner and practice target with `rer dev --stop`, including before deployment, export, import or reset.
 
-Use `rer describe` for commands and flags, `rer check --profile first-party` for the read-only contract check, and `rer doctor` to compare your Node and pnpm with the pinned versions (run it under Node 22.20.0) and check that local state is safe. Doctor also lists every input the deployment needs (Cloudflare, the selected mail provider, `RER_DEPLOY_*` and the like) under `missingInputs`. On a local install these are expected to be missing until you deploy, so it reports `ok: false` and exits 3 even when the local app is healthy. Read the `node`, `pnpm` and `state` lines, not `ok`. The structural check works before dependency installation. Private settings are `data/local-secrets.json` (0600); durable data is `.wrangler/state`. There is no automatic credential rotation. See [OPERATIONS.md](OPERATIONS.md) for state custody and recovery.
+Use `rer describe` for commands and flags, `rer check --profile first-party` for the read-only contract check, and `rer doctor` to compare your Node and pnpm with the pinned versions (run it under Node 22.20.0) and check that local state is safe. Doctor also lists the inputs a deployment needs (Cloudflare, the selected mail provider and the like) as “Optional for local use; needed to deploy”. These deployment inputs are optional for local use. If doctor reports “Local checks need attention” and exits 3, read the named local checks and correct them before continuing. The structural check works before dependency installation. Private settings are `data/local-secrets.json` (0600); durable data is `.wrangler/state`. There is no automatic credential rotation. See [OPERATIONS.md](OPERATIONS.md) for state custody and recovery.
 
 ## Supply owner setup answers
 
 For a non-interactive setup, supply the owner explicitly. A checkout already set up preserves its existing owner.
 
-After `npx -y @runeditrun/rer install just-every/run-uptime`, use, from the checkout:
+After installing `rer` and cloning with `rer install just-every/run-uptime` (or using `npx -y @runeditrun/rer install just-every/run-uptime` with Node 22 or later), use, from the checkout:
 
 ```sh
 rer setup --owner-email owner@example.test --owner-name "Local Owner" --non-interactive
@@ -119,18 +121,26 @@ curl --fail --silent --show-error --request POST "${target_url}/control" --heade
 
 The synthetic target binds only to `127.0.0.1`. Its owner-only grant at `.wrangler/state/synthetic-grant.json` records the current process, port, allowed paths and expiry; each probe must match that grant, and the runner checks the fixture's process and response identity. `/health` is an allowed monitor path. `POST /control` is a local fixture control, not a probe target. This walkthrough demonstrates the bundled fixture only; it does not establish the health of an external service or another network vantage.
 
-Local archive export and import require `UPTIME_ACCESS_COOKIE` holding a live native Base session cookie with second-factor verification from the previous five minutes. Obtain a native session with `node scripts/mfa.mjs local-session --origin APP_ORIGIN` and verify before stopping dev, keep the cookie in your private terminal environment, and then run the transfer. A receiving installation needs its own freshly verified owner. Enroll a second factor under **Settings › People**; each later sign-in asks for it before the console opens. See the repository's `docs/mfa.md` for the console steps and the API/CLI alternative.
+Local archive export and import require `UPTIME_ACCESS_COOKIE` holding a live native Base session cookie with second-factor verification from the previous five minutes. Obtain a native session with `rer run --script scripts/mfa.mjs local-session --origin APP_ORIGIN` and verify before stopping dev, keep the cookie in your private terminal environment, and then run the transfer. A receiving installation needs its own freshly verified owner. Enroll a second factor under **Settings › People**; each later sign-in asks for it before the console opens. See the repository's `docs/mfa.md` for the console steps and the API/CLI alternative.
 
 ## Reset the local installation
 
-Stop dev first, then export to a new private file under exports/ within the checkout:
+Reset removes your monitors and history, so back them up first. The simplest backup is in the console while dev is running: open **Settings › Backup and files** and choose **Download backup** (it asks for a second factor first; enrol one under **Settings › People › Manage second factors** if you have none). Check that the downloaded backup exists and opens as JSON containing your monitors before continuing. Then stop dev and reset:
 
 ```sh
-rer export --output exports/uptime.rer
+rer dev --stop
 rer reset --yes --non-interactive
 rer setup --owner-email owner@example.test --non-interactive
 ```
 
+To back up from the command line instead, follow the `UPTIME_ACCESS_COOKIE` steps above and join the commands with `&&`, so a refused export stops before anything is removed. A bare `rer export` with no cookie is always refused (`session_required`), and in a pasted block the lines after it would still run:
+
+```sh
+rer dev --stop && rer export --output exports/uptime.rer && test -s exports/uptime.rer
+```
+
+Check that export succeeded and the new backup contains your monitors before running `rer reset --yes --non-interactive`, then `rer setup --owner-email owner@example.test --non-interactive`.
+
 Reset lists and removes only local data, generated settings, command captures and CLI bookkeeping. It retains source, dependencies, external archives and deployment receipts. A second reset succeeds with an empty inventory. Reset refuses while dev or transfer owns the installation.
 
 ## Erase an entity
@@ -161,7 +171,7 @@ Open `/login` on your hosted app, request a link for an allowed operator email,
 
 ### Public checks and private runners
 
-Public website checks and notifications run automatically in the hosted Cloudflare Worker; you do not need a private runner for them. While the owner console is open, its requests prompt due checks and sends. The one-minute Cron schedule continues background work after activation; Cloudflare can take up to about two hours to activate it on a new deployment. Use a private runner for heartbeats, website discovery, private targets and checks that need runner-local credentials or a browser. Open **Locations** and choose **Add location**. Copy the command it shows and run it on a machine on that network with Node 22.13 or later; it needs no Uptime checkout, and its one-time join key works once. Wait for the location to join, then choose **Done**; use **Rename** to change its name. For the original deployment runner, set `UPTIME_CONTROL_ORIGIN` to the exact hosted HTTPS origin and run `node scripts/runner-start.mjs --environment production`; replace `production` with your environment.
+Public website checks and notifications run automatically in the hosted Cloudflare Worker; you do not need a private runner for them. While the owner console is open, its requests prompt due checks and sends. The one-minute Cron schedule continues background work after activation; Cloudflare can take up to about two hours to activate it on a new deployment. Use a private runner for heartbeats, website discovery, private targets and checks that need runner-local credentials or a browser. Open **Locations** and choose **Add location**. Copy the command it shows and run it on a machine on that network with Node 22.13 or later; it needs no Uptime checkout, and its one-time join key works once (on the computer running `rer dev`, the panel shows the command with `rer run --script`, which needs no Node install). A location that has not joined yet shows **Show join command** for a new key. Wait for the location to join, then choose **Done**; it is named after where it runs, and **Rename** changes that. For the original deployment runner, set `UPTIME_CONTROL_ORIGIN` to the exact hosted HTTPS origin and run `node scripts/runner-start.mjs --environment production`; replace `production` with your environment.
 
 To monitor this Uptime installation's own address, assign a private runner. Cloudflare does not route the Worker's fetch of its own origin back to the app, so saving an active self-monitor with a Worker assignment is refused. An internal handler call would not test public routing, TLS or network reachability. Existing self-monitor assignments and redirects back to the app produce runner errors and Unknown coverage; their earlier history stays intact. The same restriction applies to a Worker's external check URL.
 
@@ -175,15 +185,15 @@ To remove an installation, first export the hosted product archive from the owne
 
 ## Move your data
 
-Use `rer export --output exports/uptime.rer` after stopping dev. The new 0600 file is a Base integrity archive containing Uptime's product payload: definitions, observations, events, destination definitions, delivery and preserved archive history, erasure receipts, the permanent action audit and source erasure journal. On a new receiving checkout, first run `rer setup --owner-email owner@example.test --non-interactive` to establish its owner and private settings, then run `rer import --input exports/uptime.rer --yes` while its product data is empty. Monitors remain paused, destinations disabled and imported notifications quarantined. Installation settings, sessions, grants, runner authority, webhook and Slack URLs, and signing keys are excluded; available email addresses travel with destination definitions. Hosted CLI transfer is unsupported; the authenticated console retains its existing archive format and actions. Private settings remain a separate backup. The owner accepted this installation-authority and webhook/Slack-credential archive policy on 2026-10-13.
+The easiest way to take your data with you is **Settings › Backup and files › Download backup** in the console, which asks for a fresh second factor first. From the command line, use `rer export --output exports/uptime.rer` after stopping dev, with the `UPTIME_ACCESS_COOKIE` set as described above (without it, export is refused and writes nothing). The new 0600 file is a Base integrity archive containing Uptime's product payload: definitions, observations, events, destination definitions, delivery and preserved archive history, erasure receipts, the permanent action audit and source erasure journal. On a new receiving checkout, first run `rer setup --owner-email owner@example.test --non-interactive` to establish its owner and private settings, then run `rer import --input exports/uptime.rer --yes` while its product data is empty. Monitors remain paused, destinations disabled and imported notifications quarantined. Installation settings, sessions, grants, runner authority, webhook and Slack URLs, and signing keys are excluded; available email addresses travel with destination definitions. Hosted CLI transfer is unsupported; the authenticated console retains its existing archive format and actions. Private settings remain a separate backup. The owner accepted this installation-authority and webhook/Slack-credential archive policy on 2026-10-13.
 
 ## Keep monitors as a reviewed file, or move from UptimeRobot
 
-Open **Settings › Backup and files** in the console to preview an `uptime.monitors.json` definition file, or saved UptimeRobot v3 `GET /monitors` pages, before anything changes. The preview lists each entry as create, unchanged, change, refused or unsupported, with every difference from the source spelled out, and ends with a plan digest. Every import runs through the owner's import door, the same pipeline Business uses, and apply writes exactly that reviewed plan: new monitors arrive paused, changes become new revisions that keep each monitor's on/off and maintenance state, and nothing enables a monitor, issues a heartbeat token, sends a notification or touches a destination. Each apply is a batch you can undo; undo leaves a monitor edited or enabled since alone and says so, and never removes history. Request headers, bodies and passwords in a file are withheld before it uploads and are never stored. **Export monitors** writes the same file back. With dev stopped, `node scripts/definitions.mjs preview|apply|export|batches|undo` runs the same engine locally. An UptimeRobot log export is only counted as history. See [Definition files](docs/definitions.md) and [Moving from UptimeRobot](docs/moving-from-uptimerobot.md); no real UptimeRobot export has been tested.
+Open **Settings › Backup and files** in the console to preview an `uptime.monitors.json` definition file, or saved UptimeRobot v3 `GET /monitors` pages, before anything changes. The preview lists each entry as create, unchanged, change, refused or unsupported, with every difference from the source spelled out, and ends with a plan digest. Every import runs through the owner's import door, the same pipeline Business uses, and apply writes exactly that reviewed plan: new monitors arrive paused, changes become new revisions that keep each monitor's on/off and maintenance state, and nothing enables a monitor, issues a heartbeat token, sends a notification or touches a destination. Each apply is a batch you can undo; undo leaves a monitor edited or enabled since alone and says so, and never removes history. Request headers, bodies and passwords in a file are withheld before it uploads and are never stored. **Export monitors** writes the same file back. With dev stopped, `rer run --script scripts/definitions.mjs preview|apply|export|batches|undo` runs the same engine locally. An UptimeRobot log export is only counted as history. See [Definition files](docs/definitions.md) and [Moving from UptimeRobot](docs/moving-from-uptimerobot.md); no real UptimeRobot export has been tested.
 
 ## Get told when a check fails
 
-Open **Settings › Alerts** and add an email, signed JSON webhook, or Slack incoming webhook. An enabled destination applies to every monitor in that installation. Email uses the same selected Base mail adapter and sender configuration as operator sign-in. On a hosted installation, the Cloudflare Worker runs public website checks and sends queued email, signed JSON and Slack notifications without a private runner. While the owner console is open, its requests also prompt due checks and sends. The one-minute Cron schedule keeps work running afterwards, but Cloudflare can take up to about two hours to activate it after deployment. Keep a private runner for heartbeats, website discovery, private targets and runner-local credentials; see [The private runner](docs/runner.md).
+Open **Settings › Alerts** and add an email, signed JSON webhook, or Slack incoming webhook. Saving a destination is a sensitive action: with no second factor yet, the page offers **Add an authenticator** (the same step lives under **Settings › People › Manage second factors**), and with one it asks for a code you verified within the last five minutes. An enabled destination applies to every monitor in that installation. Email uses the same selected Base mail adapter and sender configuration as operator sign-in. On a hosted installation, the Cloudflare Worker runs public website checks and sends queued email, signed JSON and Slack notifications without a private runner. While the owner console is open, its requests also prompt due checks and sends. The one-minute Cron schedule keeps work running afterwards, but Cloudflare can take up to about two hours to activate it after deployment. Keep a private runner for heartbeats, website discovery, private targets and runner-local credentials; see [The private runner](docs/runner.md).
 
 The saved email address is visible to the signed-in owner and editable in **Edit**. Private webhook and Slack URLs are never listed again. If credentials become unavailable, edit the email address or add a replacement webhook or Slack destination with its URL; a signed webhook receives a new one-time secret.
 
@@ -203,11 +213,11 @@ Uptime stores immutable scheduled evidence for its [supported monitor kinds](doc
 
 HTTP monitors support status, body text, header, JSON, and latency assertions. Use **Add rule › JSON value**, with `$.status.indicator` in **JSON value at** and `none` in **equals**, to require that JSON value. **Responds within** adds a latency budget in seconds. Keyword monitors require a body text assertion. Heartbeats use owner-issued, revision-scoped authority: a one-time check-in URL or a header token with increasing sequences. Receipt ingestion alone cannot change target health. Create one through **New monitor › Fill in the form yourself**, choose **Scheduled job (heartbeat)** under **What to check**, then **Save monitor**. Save the one-time **Check-in URL** from **Connect your job** privately in your job. Keep a private runner running. [Imported definitions](docs/definitions.md) arrive paused; open the monitor and choose **Resume** before connecting the job. [Monitors](docs/monitors.md#incoming-heartbeat) explains both check-in methods. **ICMP ping** is also offered in the editor; it needs a private Linux/macOS Node runner with native ping permission, targets safe public addresses, and reports unavailable execution as Unknown. Cloudflare Workers cannot run ICMP.
 
-Restores require empty product data. A local CLI restore requires setup on the receiving checkout first, so its owner and private settings are in place before import. Imported definitions are paused, leases interrupted, destinations disabled, and alerts quarantined. Destination type, name, enabled setting, and available email address travel with delivery history for destinations that remain in the source data; webhook and Slack URLs, signing keys, and credentials remain with the installation. Re-enter webhook and Slack URLs, plus any email address unavailable in the archive, then deliberately enable destinations and resume monitoring before execution. Imported incidents never send notifications. Archive hashes check integrity, not trustworthy provenance.
+Restores require empty product data. In the console, **Restore a backup** and a file import preview ask for a second factor verified in the last five minutes, like **Download backup**. A local CLI restore requires setup on the receiving checkout first, so its owner and private settings are in place before import. Imported definitions are paused, leases interrupted, destinations disabled, and alerts quarantined. Destination type, name, enabled setting, and available email address travel with delivery history for destinations that remain in the source data; webhook and Slack URLs, signing keys, and credentials remain with the installation. Re-enter webhook and Slack URLs, plus any email address unavailable in the archive, then deliberately enable destinations and resume monitoring before execution. Imported incidents never send notifications. Archive hashes check integrity, not trustworthy provenance.
 
 Observation metadata has no automatic age or count deletion. Expired sessions and rate-limit/auth-attempt counters are cleaned up; expired discovery work is marked expired and retained. Drill history remains after its one-time link material is cleared, retired destination credentials are scrubbed after owner rotation or deletion once sends finish, and a proven-unsent delivery attempt reservation may be removed while its delivery history stays. Entity erasure is a separate, explicit operator action. Target response bodies and probe-request secrets are not retained in observations; notification destination credentials remain installation-local and are omitted from portable archives. View, monitor, and archive bounds are not a storage retention policy or measured capacity claim. Network isolation, independent runner placement, operator acceptance, accessibility, hosted operation, and notification recipient acceptance each need their own evidence.
 
-Before browser verification, install the browser matching pinned Playwright 1.60.0 with `pnpm exec playwright install --only-shell chromium` under Node 22.20.0. See [OPERATIONS.md](OPERATIONS.md) for Linux CI and shared-cache prerequisites.
+Before browser verification, install the browser matching the checkout’s pinned Playwright with `rer run --script node_modules/playwright/cli.js install --only-shell chromium`. This uses the installer’s private Node runtime. See [OPERATIONS.md](OPERATIONS.md) for Linux CI and shared-cache prerequisites.
 
 See [CONTRACT.md](CONTRACT.md) for guarantees, [BASELINE.md](BASELINE.md) for shared baseline evidence, [ACCEPTANCE.md](ACCEPTANCE.md) for validation requirements, [OPERATIONS.md](OPERATIONS.md) for setup and delivery operations. `rer verify` runs local build, type, and runtime checks; those checks alone do not establish hosted operation or recipient acceptance.
 
```

## seed.json

```diff
@@ -1,7 +1,7 @@
 {
   "id": "uptime",
   "name": "Uptime",
-  "version": "0.5.12",
+  "version": "0.5.13",
   "maturity": "local-installer-and-owner-deploy-implemented-hosted-unverified",
   "category": "monitoring",
   "spine": {
@@ -1863,15 +1863,15 @@
       "redirects": 180,
       "heartbeats": 600,
       "runner": 1800,
-      "assets": 600,
+      "assets": 12000,
       "development": 600,
       "drills": 30,
-      "development-assets": 1800,
+      "development-assets": 12000,
       "imports": 120,
       "metrics": 60,
       "rum": 120
     },
-    "notes": "Owner-tunable source settings; each class shares one fixed 60-second D1 window per client. Production assets retain their own budget. Local Vite compiler assets use a separate budget for the unbundled browser graph: about 140 module requests per console load, with room for twelve loads per minute. These defaults are estimated, not load tested. Hosted CF-Connecting-IP must be a valid single IP; missing/malformed values share an unknown-client bucket. Local mode ignores all forwarding headers and uses one loopback bucket. Only keyed hashes of client identities are stored."
+    "notes": "Owner-tunable source settings; each class shares one fixed 60-second D1 window per client. Production assets retain their own budget, sized for repeated console document loads and several tabs, including cold or revalidated resources. Fingerprinted production build assets are immutable for one year; unversioned assets revalidate after one minute. Local Vite compiler assets use a separate budget for the unbundled browser graph and keep development revalidation/HMR. These defaults are estimated, not load tested. Hosted CF-Connecting-IP must be a valid single IP; missing/malformed values share an unknown-client bucket. Local mode ignores all forwarding headers and uses one loopback bucket. Only keyed hashes of client identities are stored."
   },
   "accessibility": {
     "level": "WCAG 2.2 AA",
```

