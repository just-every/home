# Released-source diffs

Author: Run Edit Run fleet. Recorded 2026-11-21T14:37:00Z.

## CONTRACT.md

```diff
--- v0.4.31/CONTRACT.md
+++ v0.4.32/CONTRACT.md
@@ -266,7 +266,7 @@
 
 #### PUBLIC-002 — Free product promise
 
-**Requirement.** “Not just better. Free.” (100% free and open source, free as in code and free as in cost, MIT licensed, “No seats. No plans. No fees.”, each promise after a line icon in a pale aqua circle, with the MIT license drawn as an ink card over a wordless code editor, “free of charge” and the rights highlighted in aqua);
+**Requirement.** “Yours to run and change.” (100% free and open source, free as in code and free as in cost, MIT licensed, “No seats. No plans. No fees.”, each promise after a line icon in a pale aqua circle, with the MIT license drawn as an ink card over a wordless code editor, “free of charge” and the rights highlighted in aqua);
 
 **Acceptance.**
 1. The Free section retains the no-seats, no-plans, no-fees promise, MIT license, aqua icon circles and ink license over a wordless editor.
```

## seed.json

```diff
--- v0.4.31/seed.json
+++ v0.4.32/seed.json
@@ -1,7 +1,7 @@
 {
   "id": "happytohelp",
   "name": "HappyToHelp",
-  "version": "0.4.31",
+  "version": "0.4.32",
   "license": "MIT",
   "repository": "https://github.com/just-every/run-happytohelp",
   "maturity": "Owner-installable MIT source release. Local verification and hosted, real-provider and accessibility acceptance are separate; see ACCEPTANCE.md.",
```

## README.md

```diff
--- v0.4.31/README.md
+++ v0.4.32/README.md
@@ -37,23 +37,15 @@
 an AI provider. The editable React application runs on Cloudflare Workers with
 Hono, D1, R2, Queues and Durable Objects.
 
-## Release 0.4.28
-
-Deploy version 0.4.28, tagged **`v0.4.28`** once published. v0.4.26 is the upgrade baseline; the release upgrade checks cover v0.4.26, v0.4.25 and v0.4.24. The pinned installer is rer 0.2.117.
-
-This release includes the content of the tagged but unreleased v0.4.27. Credential-shaped notification test fixtures blocked source scanning for that tag; they now use short example markers. The local size documentation also reflects the qualified rer 0.2.117 results. v0.4.26 remains the previous public release.
-
-- **Reports:** summary and team reports read indexed, message-bearing date cohorts, with separate timing distributions and SLA breakdowns. Workload reads the selected cohort and older active backlog while a maintained inventory preserves historical empty buckets. Overlapping handle sessions still include older tickets worked in the interval. Report evidence, labels and permissions remain live reads; these projections are not cached report totals.
-- **Conversations and knowledge:** transcript assembly reuses article references within a response and skips article-free source arrays. Socket replay reads bounded pages of raw message and ordered attachment projections, then renders current knowledge and rechecks authority before sending. Message corrections, attachment changes and erasure update the replay data while retaining event identities. An attachment index narrows message reads, and a solved-time index narrows the scheduler’s due cohort without changing rule eligibility or cursor order.
-- **Backup and restore:** derived report projections are excluded from portable archives and rebuilt after source rows and current write triggers are restored. Historical archive handling skips these derived backfills when the original inventory lacks their source subsystems. Keep normal backups and the installation’s existing custody and recovery requirements.
-- **Installer and mail settings:** the managed integration recipe now carries the complete native migration inventory and current binding declarations. Public mail validation covers native SendGrid and Mailgun as well as Resend, Cloudflare and the managed relay. Explicit off, none or disabled selections normalize to mail off and remove stale public provider settings from emitted plans; private bindings remain separately selected and checked. This does not activate mail or establish provider readiness.
-- **Local size tooling:** the pinned rer installer advances from 0.2.112 to 0.2.117. A seed-owned declaration exercises the built application with disposable synthetic local installations, exports SQL statement artifacts and supports a deliberate unbounded-read rejection exercise. Selected source and migration changes and daily scheduled verification use the shared build with queue consumers disabled for size measurement. This local tooling does not qualify live-provider limits or real-customer scale; synthetic text and attachment distributions and scheduled-consumer completion remain limitations.
-- **Fresh hosted installs:** after the full migration inventory and this Worker are installed, normal writes maintain the new report and replay projections and existing reads use the new indexes. On an empty database there is no historical cohort or replay data to backfill. Managed recovery still requires compatible platform custody and a verified assertion; SQL alone enables no recovery authority. Legacy import and adoption remain inert until a package is imported through the approved flow. Updating starts no import and activates no mail provider; live hosted delivery and provider qualification remain separate.
-- **Migrations:** four since v0.4.26, bringing the inventory from 196 to 200 files. `333_report_cohorts.sql` is additive: it creates report tables, a view, indexes and maintenance triggers and immediately backfills derived membership, workload and bucket-presence rows without rewriting business rows. `334_media_message_reads.sql` adds only the media-message read index. `335_socket_replay_projection.sql` is additive to the outbox schema: it adds nullable raw-message and media columns, immediately fills existing outbox rows from retained native data, and installs synchronization triggers. It therefore writes derived data on upgrade. `336_solved_time_rule_reads.sql` adds only the solved-time expression index. Apply missing migrations once in filename order before the new Worker serves HTTP or queue traffic. Migration 326 remains absent.
-
-Update from v0.4.26 without resetting; v0.4.25 and v0.4.24 are also upgrade baselines. Back up D1, R2, Durable Object state, private settings and installation encryption custody, then stop the old Worker. Use Node 22.20.0, pnpm 10.12.4 and pinned rer 0.2.117. Retain native owners, permissions, support history, files, erasure fences and every applied migration identity. On v0.4.26 apply 333_report_cohorts.sql, 334_media_message_reads.sql, 335_socket_replay_projection.sql and 336_solved_time_rule_reads.sql once in that order. On v0.4.25 or v0.4.24 first apply the missing 330_identity_recovery.sql once even though 331 and 332 are already recorded, then apply 333 through 336 in filename order. Retain earlier published buyer steps, including 332’s conditional cleanup; older installations first apply every other missing published migration in filename order. Finish all missing migrations BEFORE the new Worker serves HTTP or queue traffic. Report and replay backfills run during migration; report projections are rebuilt after portable restore. There is no migration 326. Keep the durable recovery revocation watermark on rollback, and require fresh Managed custody binding after portable restore. Run `rer deploy --dry-run` against the retained installation before any separately authorized deployment. Legacy v1 remains cleanup-only and incomplete cleanup remains pending. No reset, mail activation, recovery adoption, production import, cutover or production deployment is authorized by this preparation.
-
-See [RELEASE.json](RELEASE.json), [Updates and recovery](docs/INDEPENDENT-RELEASE.md) and [the changelog](CHANGELOG.md).
+## Releases and upgrades
+
+For a new deployment, use the [latest published release](https://github.com/just-every/run-happytohelp/releases/latest),
+following the acquisition commands below. Read the release notes on that page
+and `RELEASE.json` in the selected release checkout for its version-specific
+buyer steps. This README does not pin a deployment version. For an existing installation, follow
+[Updates and recovery](docs/INDEPENDENT-RELEASE.md), keep your backups and apply
+the selected release's buyer steps before its Worker serves traffic. See
+[the changelog](CHANGELOG.md) for release history.
 
 Version 0.4.0 adds Move in for reviewed support-history imports, resolution
 feedback with workspace-calendar Reports, Connections with scoped API tokens,
@@ -103,9 +95,10 @@
 
 Normal setup and launch install the app's dependencies and build its local assets;
 they do not download Chromium. Dev uses its local
-address for the chat widget and generates a private owner password. Wait for `RER_READY`, then open the `RER_OPEN` address to enter as the
-real local owner and reach **Setup**. No private answers, email service or AI
-account are needed. Use `rer dev --stop` from the checkout to stop the managed app.
+address for the chat widget and generates a private owner password. Continue in
+the app, or open the private `RER_OPEN` link to reach **Setup** as the owner.
+No private answers, email service or AI account are needed. Use `rer dev --stop`
+from the checkout to stop the managed app.
 
 **Browser verification:** `rer verify` downloads the Chromium and headless shell
 pinned by the checkout's Playwright into your user cache when first needed.
@@ -114,7 +107,7 @@
 
 Already running 0.3? Keep your checkout and data, and follow
 [Upgrading from 0.3.x](OPERATIONS.md#upgrading-from-03x) instead.
-See [Install](docs/INSTALLER.md) for private setup answers and
+See [Install](docs/INSTALLER.md#private-setup-answers) for scripted setup and
 [Local command reference](RUN-LOCALLY.md) for ports, preview and idle shutdown.
 
 To try the customer flow, [install the widget on a local page](docs/INSTALLER.md#try-the-customer-widget-locally),
@@ -134,13 +127,25 @@
 
 ## Deploy to your own Cloudflare account
 
-For a new installation, acquire **`v0.4.28` once published**,
-after installing `rer` as shown above:
-
-```sh
-git clone --branch v0.4.28 https://github.com/just-every/run-happytohelp
-cd run-happytohelp
-```
+For a **new** installation, select the latest published release after installing
+`rer` as shown above. These commands work from the folder where you ran the local
+quick start, or from inside its checkout: they create a separate
+`run-happytohelp-release` folder, leaving the local trial available. Run them
+once in a folder without an existing `run-happytohelp-release` directory.
+Git and curl are needed, as for the quick start. Stop your local trial before
+building or deploying. For an existing hosted installation, use
+[Updates and recovery](docs/INDEPENDENT-RELEASE.md) instead.
+
+```sh
+release_url="$(curl --fail --silent --show-error --location --output /dev/null --write-out '%{url_effective}' https://github.com/just-every/run-happytohelp/releases/latest)"
+release_tag="${release_url##*/}"
+git clone --branch "$release_tag" https://github.com/just-every/run-happytohelp run-happytohelp-release
+cd run-happytohelp-release
+```
+
+The release tag comes from GitHub's latest **published** release, rather than the
+newest tag or the installer's later main. Keep running the following commands
+inside `run-happytohelp-release`.
 
 Start with a local build and validation:
 
@@ -153,6 +158,25 @@
 the application locally. The completion report lists any inputs needed for a
 real deploy; remote resources, credential validity, target secrets and remote
 readiness remain unchecked.
+
+To inspect an **existing** Worker separately, use the
+[read-only provider preflight](docs/INSTALLER.md#read-only-provider-preflight):
+set `CLOUDFLARE_API_TOKEN` privately in the process environment with only
+**Account → Workers Scripts → Read** on the intended account, review the account
+ID and Worker name, then explicitly consent:
+
+```sh
+pnpm run preflight:provider --account-id YOUR_ACCOUNT_ID --worker YOUR_EXISTING_WORKER --consent-read-only
+```
+
+It reads only the account's Workers subdomain, Worker settings and secret NAMES
+(three GETs), sends no mail and changes no resources. It refuses missing consent
+or a missing token. The installer guide explains private token entry, the summary
+and failures. It is independent of the credential-free dry run. **Live qualification
+is UNMET-EXTERNAL:** it needs the owner's scoped token and consent and has not
+been done. This inspection does not prove remote provisioning or readiness.
+
+_Preflight guidance: Run Edit Run fleet, 17 November 2026._
 
 For a real deployment, read
 [deployment prerequisites](OPERATIONS.md#deploy-to-your-cloudflare-account).
@@ -165,18 +189,12 @@
 rer deploy --environment production
 ```
 
-The contract also requires a separately started **read-only provider preflight**
-with explicit owner consent and the owner's scoped Cloudflare token. For an
-existing Worker, that preflight permits only the account's Workers subdomain and
-the Worker's settings and secret names (three GETs), with no mail or mutations.
-That separate preflight is not yet implemented or live-qualified; the local dry
-run does not perform it or prove remote readiness.
-
 For a new installation with outbound email, also supply real `EMAIL_PROVIDER`,
 `EMAIL_FROM`, `EMAIL_API_KEY` and `OWNER_EMAIL` inputs in an owned 0600 `--env-file`;
 the owner email must receive sign-in mail. Existing installations retain held
 secrets. The seven optional mailbox settings can stay unset. Remote provisioning
 remains separately unqualified.
+In rer’s deploy summary, `MAIL_PROVIDER` and `MAIL_FROM` correspond to HappyToHelp’s `EMAIL_PROVIDER` and `EMAIL_FROM` ([deployment configuration](OPERATIONS.md)).
 
 ```sh
 rer deploy --environment production --env-file ~/happytohelp-production.env
@@ -235,10 +253,10 @@
 sender DNS, inbound mail, model access, spend ceilings, widget origin and an
 authenticated widget visit. Saved settings alone do not complete them. Add the widget through **Settings →
 Widget**, set its exact [website origin](docs/SETUP-WORKFLOW.md#the-widget-website-origin),
-publish useful articles and invite teammates through **Settings → Agents**. By default the widget does not ask
-for an email. For visitors to receive replies by email, enable **Settings → Widget
-→ Settings → Required contact details → Require email**. The visitor enters their
-address before sending a message; operator replies can then use it on a hosted
+publish useful articles and invite teammates through **Settings → Agents**. Fresh installs ask widget visitors
+for an email before sending a message. To turn this off, open **Settings → Widget
+→ Settings → Required contact details** and disable **Require email**. An explicitly
+saved choice is retained. When an address is collected, operator replies can then use it on a hosted
 installation with email sending configured.
 
 ## Set up AI replies
@@ -355,12 +373,14 @@
 
 ## Contributor setup
 
-For work on the source, select Node **22.20.0** and pnpm **10.12.4**:
+For source work, install Node **22.20.0** and pnpm **10.12.4** in your
+development environment. From the repository checkout root, install the locked
+dependencies and run the repository scripts:
 
 ```sh
 pnpm install --frozen-lockfile
-pnpm exec rer describe --json
-pnpm exec rer check --profile first-party
+pnpm run describe --json
+pnpm run check --profile first-party
 ```
 
 ## Verify
@@ -378,12 +398,13 @@
 
 ### Local size check
 
-After `pnpm run build`, run `pnpm exec rer size --write-statements .local-evidence/size/statements`.
+From the contributor checkout after `pnpm run build`, run
+`pnpm run rer size --write-statements .local-evidence/size/statements`.
 The seed-owned [declaration](size-check.json) uses disposable local D1 installs of
 the built application, native owner and widget sessions, and the declared minute
 schedule. It checks inbox/list/search, conversation and transcript reads, message
 admission, sockets, reports, knowledge, outbound tickets and the AI draft route.
-`pnpm exec rer check --profile first-party` validates the declaration.
+`pnpm run check --profile first-party` validates the declaration.
 
 The large fixture carries 162,000 contacts, 161,893 conversations, 27,000 messages
 and outbox rows, 2,835 media rows and 3,034 pending workflow events. The small
@@ -400,7 +421,7 @@
 budgets, not measured provider limits. Existing flows retain the historical
 working ceilings; added routes have initial engineering budgets. No credentials or real conversations are used. The published 0.2.112 command let
 consumer work enter the meter, and report statements exceeded the 90-item margin.
-With the pinned, qualified rer 0.2.117, all 17 unchanged control flows pass
+With the previously qualified rer 0.2.117, all 17 unchanged control flows pass
 (inbox reads 2,359 to 2,403 rows); the copied-build full-table-query fault is
 refused solely for ceiling and growth. Queues are held. Scheduled knowledge refresh and legacy importer
 fixtures target admission/wakes; consumer completion is not qualified. The two legacy run rows are discovery fixtures without R2
```
