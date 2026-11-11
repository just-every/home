<picture><source media="(prefers-color-scheme: dark)" srcset="public/brand/mark-dark.svg"><img src="public/brand/mark.svg" alt="" width="54" height="36"></picture>

# Terrace

Residential property management for an independent manager or landlord. Keep tenancies, recorded rent, photographed inspections, reviewed maintenance and owner statements in your own Cloudflare account. MIT licensed.

Terrace records charges and money received elsewhere. It does not yet collect rent, hold or move funds, reconcile a trust account, hold security deposits, screen applicants or publish listings. See [ACCEPTANCE.md](ACCEPTANCE.md) for the first release.

## Clone and run

Install Git. RER selects the project's pinned Node 22.20.0 for project commands. Run one line to install the CLI, clone Terrace and start it:

```sh
npx -y @runeditrun/rer dev just-every/run-terrace
```

Or, as [run-terrace.com/run](https://run-terrace.com/run) shows it, install rer first (it brings its own Node when you have none) and then start Terrace:

```sh
curl -fsSL https://runeditrun.com/install.sh | sh
rer dev just-every/run-terrace
```

To start it again later, run `cd run-terrace && rer dev`.

`rer dev` installs the pinned dependencies, prepares a local D1 database and owner, applies migrations and starts the app. Allow several minutes on the first run. Open its `RER_OPEN` link privately: it signs you in as the local owner. Confirm the owner on **Finish setup**, then open Terrace. The link is a credential; do not share it publicly. Local development mail is silently suppressed and sends no external email.

For an installation with your real owner mailbox, run `npx -y @runeditrun/rer install just-every/run-terrace`, then `rer setup --owner-email you@example.com` from the checkout before the first `rer dev`. The interactive `rer setup` also accepts your mailbox. Do not change an existing owner's identity by overwriting settings.

Stop with `rer dev --stop` (or Ctrl-C). Rerunning `rer dev` reuses a compatible running instance. Stop dev or preview before a build or verification. If a command times out, repeat it and follow its recovery message; do not reset data to repair a startup.

## Try a disposable workspace

Run `rer demo` for a fresh signed-in **Terrace Demo**, with eight tenancies, rent history, reviewed decisions, photographed inspections and maintenance. Stop it with `rer demo --stop`; each launch starts fresh. [DEMO.md](DEMO.md) describes isolation and real-read / mocked-send behavior.

## First working cycle

1. **Tenancies → Add a tenancy.** Enter the address, owner and tenant names/emails, lease dates and rent cadence. The chosen tenancy carries into its selected screen. Prepare a renewal with its source reference; approve the exact proposed terms in **Prepared decisions**. Previous terms remain in the archive.
2. **Rent & arrears.** Select the tenancy. Add a charge with a unique reference. Record an amount already received in your external system, with its date and unique bank/receipt reference. A receipt cannot exceed a charge's remaining balance. Use **Reduce an incorrect charge** for an explained correction. Prepare an arrears follow-up and approve it on **Tenancies**. No follow-up email is sent automatically. Download a period **Owner statement** CSV; its opening and closing amounts are rent receivables, not owner disbursements.
3. **Inspections & maintenance → New inspection.** Save a date and notes, upload a JPEG/PNG up to 1.5 MB, then complete the inspection. At least one photo and notes are required. Prepare maintenance with its vendor, due date and estimate. Approve the exact work and checklist, then choose **Dispatch approved work by email** to send through your installation mail provider. Record sourced technician replies and human escalation for missed commitments. Provider acceptance does not confirm delivery or resolution. You can also download the `.eml` packet, send it in your email client and record that external handoff. The approval snapshot and photo fingerprint are retained.
4. **Move in.** Paste [fixtures/terrace-tenancies.csv](fixtures/terrace-tenancies.csv), use a stable namespace, preview the rows and approve their displayed fingerprint. Inspect the journal and original, or undo the import. Undo stops if a tenancy acquired rent, inspections, maintenance or later edits. See the exact [CSV contract](docs/move-in.md). The fixture is a documented-shape example, not a verified vendor export.
5. **Data & access.** Download a backup. To restore, start a separate empty installation and upload the `.rer` file there. The owner records and reviews resident access/erasure requests and legal holds. Eligible lease evidence is deleted; accounting identity stays through its retention or hold, and financial evidence is then retained under an opaque alias. Download a new backup after erasure and provide it as the later journal when restoring any older backup.

Owners control imports, backup, restore, erasure and operators. Admins are property managers: they record rent and inspections and approve proposals. Members can read the portfolio and prepare proposals only. Invite people in **Data & access**. Agents should use a member account and the [command API](API.md); a person's owner/admin account approves.

## Backup, restore and checks

The browser supports archives up to 20 MB. The CLI supports larger archives:

```sh
rer export --output exports/terrace.rer
# In an empty destination with the same schema:
rer import --input /absolute/path/terrace.rer --yes
# When the source has since erased data:
rer import --input /absolute/path/old.rer --journal /absolute/path/later.rer --yes
rer verify
```

Archives include all product tables, original import bytes, journals and photograph BLOBs. Auth sessions, credentials, development outbox and private configuration are excluded. Restore preserves the destination owner and refuses a nonempty product destination, corrupt archives and a supplied erasure fence. Keep backups private. An offline archive cannot know about a later erasure unless you supply the later journal. `rer reset --yes` removes local data and settings; export first if they matter.

Verification builds the app, typechecks it and runs the public-door product journeys, the run-site build test, plus the emitted-Worker runtime and ordinary email-link checks at the mail provider boundary. Build and deploy do not run tests. Test cap: 200. Push and PR Verify runs source/site, typecheck, product and emitted-Worker shards in parallel. Release tags (`v*`), nightly and manual Nightly journeys run the full plan; the SAFE-007 clean-install/reviewed-upgrade, OPEN-001 published command and REPORT-005 native custom-report journeys run there, outside the push wall. See [VERIFY-WORKFLOW.md](VERIFY-WORKFLOW.md) to add them without dropping checks. `rer describe`, `rer check --profile first-party` and `rer doctor` explain the declared operations and local setup.

## Deploy to your Cloudflare account

Use the RunEditRun Cloudflare account for this seed's managed deployment. Your own fork can be installed into your own account. No domain is needed for a workers.dev deployment. The Worker/project/database/package identifiers in the committed declarations are stable; do not rename them during deployment.

1. Finish `rer setup` with your real owner email. Commit any intentional source/branding changes; real deploy refuses dirty tracked files.
2. Review [Cloudflare hosting pricing](https://developers.cloudflare.com/workers/platform/pricing/), [D1 storage pricing](https://developers.cloudflare.com/d1/platform/pricing/) and [Resend email pricing](https://resend.com/pricing) before connecting them: those providers bill your account. Terrace has no author license key, paid gate, unit/seat cap or per-payment fee. Both deploy and dry-run print these disclosures before the provider deployment hook runs. Configure `deploy.json`'s nonsecret `MAIL_FROM` to a sender verified with Resend. It currently uses a non-deliverable example address. Obtain a Cloudflare API token scoped to the target account and a Resend API key. Configure Cloudflare through RER's private setup; do not commit credentials.
3. Provide `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN`, `OWNER_EMAIL`, `SESSION_SECRET`, `SETUP_TOKEN` and `MAIL_API_KEY` in the deployment process's private environment. Session/setup values must be private random secrets of at least 32 characters. RER's deploy kit names any missing inputs. Never paste secret values into command history or Git.
4. Validate and then deploy:

```sh
rer deploy --dry-run
rer deploy
```

The dry run builds and validates without contacting providers. Real deploy provisions declared D1 resources, applies migrations, uploads the Worker/assets and checks deployment identity and asset health. Keep the returned workers.dev address. On the new installation, claim its first owner at **Finish setup** with the configured setup token, then use the emailed sign-in link. If the provider settings are incomplete, fix them before calling the deployment ready.

The static run site includes the Terrace homepage, `/run` instructions and repository Markdown guides. Build it with `rer build --site`. The public site is at https://run-terrace.com and updates automatically through GitHub Actions on pushes to `main`. Email delivery remains unverified.

## Reviewed upgrades

Back up first and merge the chosen upstream commit in a separate review installation, preserving owner changes and private configuration. Follow [the upgrade and diagnostics guide](docs/upgrades.md) before changing a live installation.

## Source

Foundation: `runeditrun/base` `fc0e1041efa55771142bbb57c4ab4743147e264d`. Package-mode CLI: the exact `@runeditrun/rer` devDependency in `package.json`. `base-copies.json` records the vendored runtime copies. [SOURCE.md](SOURCE.md) records the Base and sibling reuse. Terrace uses one set of tokens (lavender paper, navy ink and the violet ramp of its stepped-blocks mark): its palette in `public/fonts/fonts.css` and the `--rer-*` theme tokens Base's installer reads in `public/rer-theme.css`, and self-hosted Geist, Figtree and JetBrains Mono ([public/fonts](public/fonts/README.md)) across its run site, setup, sign-in and server-rendered app.

The explicit OPS-003 installed-container cadence journey is `node tests/workflow-cadence.mjs` on a clean committed checkout. It builds the production container artifact and waits for two real hourly Cron deliveries (up to 125 minutes), without direct dispatch or a fake clock; it is deliberately outside push Verify. Its private local results name the candidate SHA. This does not measure Cloudflare hosted trigger delivery.

## Capacity readiness

SAFE-009 remains partial. On a clean committed checkout, `node tests/capacity.mjs` creates a disposable local Worker and D1 with 500 units, 60 properties, 600 leases (including 50 past and 50 future leases), 150 dated owners, 1,200 residents, 250 vendors and 24 months of rent history, all through public commands. It checks the counts and measures local rent posting, as-of rent roll and delinquency, including a duplicate-run check. `CAPACITY_RESULT` selects a private receipt file outside the repository; the receipt records date, commit, counts and measured times. This journey runs separately from push Verify.

These are local readiness measurements. They do not prove the required Cloudflare reference deployment, bank auto-matching, three-way reconciliation, complete owner statement batch or staff and portal p95. `node tests/capacity.mjs --require-reference` fails while those required measurements are absent. ACCT-006 and ACCT-012 still need their operating foundations before a full reference capacity receipt and setup disclosure can be claimed.
