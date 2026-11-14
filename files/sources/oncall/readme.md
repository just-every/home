<p align="center">
  <a href="https://run-oncall.com">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset=".github/assets/banner-dark.webp">
      <source media="(prefers-color-scheme: light)" srcset=".github/assets/banner-light.webp">
      <img src=".github/assets/banner-light.webp" width="100%" alt="Oncall: Everyone knows who's on call. Free, open source incident coordination alongside your existing pager.">
    </picture>
  </a>
</p>

<p align="center"><a href="https://run-oncall.com">run-oncall.com</a> · <a href="https://justevery.com">Part of Just Every</a> · <a href="LICENSE">MIT licensed</a></p>

<p align="center">
  <a href="https://justevery.com/#vol-oncall"><img src=".github/assets/media/preview.gif" width="800" alt="Oncall: an override is typed and saved, and On call now switches from Priya Shah to Ana Ruiz"></a>
</p>
<p align="center"><a href="https://justevery.com/#vol-oncall"><b>Watch the full demo</b></a> · 54 seconds</p>

<p align="center">
  <img src=".github/assets/media/flow.webp" width="800" alt="On call now and next before the override, Priya Shah on primary, and after saving it, Ana Ruiz">
</p>

<p align="center">
  <img src=".github/assets/media/screen-1.webp" width="800" alt="Oncall's schedule editor for Checkout on-call: timezone, rotation anchors, primary and backup responders, and previewed coverage windows"><br>
  <sub>Rotations in your own time zone, with coverage previewed before you save.</sub>
</p>

<p align="center">
  <img src=".github/assets/media/screen-2.webp" width="800" alt="An acknowledged incident, Checkout latency above 2 s: the append-only evidence and decisions timeline, runbook checklist and follow-up owners"><br>
  <sub>A calm place to coordinate an incident, with an append-only record.</sub>
</p>

# Run it locally

See the [Oncall Run page](https://run-oncall.com/run) for local launch and PATH help. Public source: [just-every/run-oncall](https://github.com/just-every/run-oncall). The `v0.5.13` release candidate includes hosted coordination. See [Getting started](docs/getting-started.md#host-for-your-team) for complete credentials and deployment instructions.

One line installs the `rer` command, clones Oncall and starts it:

```sh
curl -fsSL https://runeditrun.com/install.sh | sh -s -- dev just-every/run-oncall
```

Already have Node 22 or later? `npx -y @runeditrun/rer dev just-every/run-oncall` does the same.

macOS, Linux or Windows with WSL2. git is required; rer brings Node and pnpm.

To start it again later, run `cd run-oncall && rer dev`; after the `curl` installer, a terminal without `~/.local/bin` on PATH needs `export PATH="$HOME/.local/bin:$PATH"` first or it says `rer: command not found` (add that line to your shell startup file to keep it; `"$HOME/.local/bin/rer" cli path` shows the line for your shell). `rer dev` installs the application dependencies, creates a local development owner and prints a private `RER_OPEN` link that opens Oncall signed in. On first launch, confirm the read-only owner details at `/setup` (**Finish setup**); later launches open the app directly. To choose your own owner mailbox before the first launch, use [explicit setup](docs/getting-started.md#explicit-and-unattended-setup); unattended setup accepts a private answers file.

Open the printed link on this computer. `rer dev --as signed-out` selects the signed-out persona. The compatibility flag `rer dev --login` still opens automatic owner entry. Ordinary `/signin` email sign-in sends only through a configured remote mail provider with real credentials; no sender is configured by default. The app does not capture mail or print sign-in tokens. Stop the background server with `rer dev --stop` (Ctrl-C also stops a foreground run); stop preview with `rer preview --stop` before building, verifying or deploying. A running dev or preview server owns the local state, so even a deploy dry run refuses with exit 4 until it stops.

```sh
rer build
rer preview
rer verify
rer export --output exports/installation.rer
rer import --input exports/installation.rer --yes
rer reset --yes
rer dev --stop
rer preview --stop
rer deploy --environment production --dry-run
rer describe
rer check
```

Before the first `rer verify`, stop dev and preview, then install its browser using the dependencies `rer dev` (or `rer install`) already installed:

```sh
node node_modules/@playwright/test/cli.js install chromium
rer verify
```

This command uses Node directly; no global pnpm is needed. On Linux, add `--with-deps` to the browser install command if system libraries are missing. `rer doctor` reports a missing verification browser and prints this command. `rer check` is silent on success (exit 0); `rer check --json` prints the result.

Export includes supported durable records and the import journal, excluding sessions and dev credentials. Import requires an empty destination and explicit confirmation. If it refuses with `target_not_empty`, export any data you need to keep, stop dev and preview, then run `rer reset --yes` before importing into the now-empty installation. Configure a new owner, sign in, then explicitly map an archived administrator identity from the signed-out workspace; credentials never travel. Reset deletes local data and owner settings and keeps your exports; see [Export and restore](docs/data.md) for the in-place restore sequence.

A deploy dry run builds and validates the local deployment plan. With no env file or Cloudflare credentials, a valid local plan exits 0: it sends nothing to Cloudflare, changes nothing remotely and checks no target secrets, deployment permissions or remote readiness. Adding `--env-file` to a dry run does not enable remote checks. For those checks, prepare the private credentials file and run the real deployment described in [Host for your team](#host-for-your-team); it creates or updates hosted resources. Email delivery needs the separate sign-in test below.

Release 1 supports hosted incident coordination alongside your existing pager. Paging stays OFF; an independent standby is not required for coordination. Release 2 paging and its independent standby are not built. See [hosting instructions](docs/getting-started.md#host-for-your-team) for deployment, sign-in and removal. Use `describe` for flags and `doctor` for missing local prerequisites.

Oncall keeps rotas, schedules, overrides, incident coordination and recorded alert intake beside your existing pager. The existing pager stays authoritative. No SMS, voice, push or paging email is sent. The delivery adapter refuses plainly. To connect monitoring, see the [alert intake JSON and curl example](docs/incidents.md#send-an-alert-event).

Schedules use named IANA zones, calendar-day turns, explicit repeated-time rules and half-open UTC overrides. Inspect who is on call now and at the next hand-off, download a private seven-day ICS feed, and store primary/backup escalation delays as data. Coverage gaps remain visible.

Move in (under Settings) reviews supplied Opsgenie exports first, then PagerDuty. Preview writes nothing; confirmed imports stay paused and grant no access or delivery authority. A durable Base import-kit journal supports resume and guarded undo. Read [MOVE-IN.md](MOVE-IN.md) for documented export shapes and compatibility limits.

Held data upgrades in place through unchanged migrations 0001–0006 and additive migrations. Coordination now stores individual members, services, policies, events, alerts, incidents and audit entries in relational tables. Old password accounts remain usable; Base owner identity never silently takes over an existing workspace. For a held installation, continue using its password accounts until the owner explicitly links identity during a future identity migration. On local and hosted apps, the configured owner uses email links and admin-created team members use their installation-local workspace name and password at `/signin/local`. Only anonymous first-admin bootstrap remains loopback-only. Do not reset to upgrade.

To look around with realistic sample data, run `rer demo` after setup: a throwaway, signed-in copy where nothing can page, call, text or email ([DEMO.md](DEMO.md)).

Read [CONTRACT.md](CONTRACT.md), [ACCEPTANCE.md](ACCEPTANCE.md), [OPERATIONS.md](OPERATIONS.md) and [RELEASE.md](RELEASE.md). The checkout declares its exact command version in `package.json` and the lockfile. `base-copies.json` records each Base runtime/module copy and its own revision; `src/base` comes from Base 6d38b54a6401879989e8d1f7ab4a02ffbdb4c46c. Source locks are generated with Base's edition-authoring command from this checkout. This repository is runnable source, without a composition step.

## Update, host and remove

### From 0.1.0

Stop the old servers **before pulling**: 0.1.0 uses the checkout's runner, which the update removes.

```sh
node scripts/rer.mjs dev --stop
node scripts/rer.mjs preview --stop
```

Then, from this checkout on `main`, update and start it with `npx`, which needs no separate install of `rer`:

```sh
git pull --ff-only
npx -y @runeditrun/rer dev
```

The update applies Oncall's additive migrations. Your data, owner and password accounts are kept; people who sign in with a workspace password sign in once more after updating to 0.3.0. Do not reset to upgrade.

### Later updates

Update this checkout without resetting its data:

```sh
rer dev --stop
rer preview --stop
git pull --ff-only
rer dev
```

This restarts the updated local app, applies migrations and keeps your owner, schedules and incidents. `rer` installs a pulled change of its own pin before it runs and provides the pinned Node and pnpm versions.

### Host for your team

Hosting is in `v0.3.0` and later. Release 1 hosts coordination alongside your existing pager, with paging OFF and no standby requirement. Follow [Getting started](docs/getting-started.md#host-for-your-team) to prepare a real owner mailbox, obtain Cloudflare and SendGrid credentials with the required permissions, and save them in an owner-only `0600` file outside Git. The Install page includes each provider's menu path, verification steps and expected results.

Stop dev and preview from the hosting checkout before either the dry run or deployment (Ctrl-C also stops a foreground server). With the private file prepared as described there:

```sh
rer dev --stop
rer preview --stop
rer deploy --environment production --env-file "$HOME/.config/oncall/production.env" --dry-run
rer deploy --environment production --env-file "$HOME/.config/oncall/production.env"
```

The dry run above remains local even with the private file. The real command without `--dry-run` uses `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_API_TOKEN`, `SENDGRID_API_KEY` and `MAIL_FROM` from that file to check the target and deploy; a dry-run success does not prove those inputs work.

Use the same named environment for every later command; it defaults to `production` if omitted. Deployment creates the hosted installation, applies migrations, verifies deployment identity, claims the configured owner automatically and retires its one-time setup token. Open the returned address and use **Email a sign-in link**, then open the email on the same device and press **Confirm**. Finish the owner confirmation at `/setup` if shown. Local dev entry links do not work there. Admin-created team members use their workspace name and password at `/signin/local`; Oncall sends no invitations.

The deploying owner can recover access without email from the original checkout:

```sh
rer signin --environment production --env-file "$HOME/.config/oncall/production.env"
```

This prints a private, single-use owner link that expires within 15 minutes. Open it privately and press **Confirm**; do not record or share the output. It does not test mail delivery.

Deployment uses a separate hosted database; it does not upload local schedules or incidents. Keep this checkout's `.rer/deploy/` records. For later hosted updates, pull `main` and deploy to the same environment:

```sh
git pull --ff-only
rer deploy --environment production --env-file "$HOME/.config/oncall/production.env"
```

Updates keep the hosted owner and data. Existing hosted secrets are retained; [Getting started](docs/getting-started.md#update-a-hosted-installation) explains explicit mail-key and sender changes.

To remove the hosted installation and its database, keep its deployment records and use the same Cloudflare credentials and environment:

```sh
rer deploy --environment production --env-file "$HOME/.config/oncall/production.env" --remove --yes
```

Removal deletes only recorded resources created by this deployment and verifies each is absent. Your local folder and data stay.
