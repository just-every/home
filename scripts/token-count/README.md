# Token count

The footer's "Made with care and N tokens." is measured, not estimated: these scripts
read the Claude Code and Codex session logs on the owner's machines, count
every API call once, and publish the total for the products to D1. The page
counts on from the newest measurement at its measured rate
(`src/lib/tokens.ts`), for at most a week after it.

```sh
node scripts/token-count/measure.mjs            # report every scope
node scripts/token-count/measure.mjs --json     # the same as JSON
node scripts/token-count/publish.mjs            # measure, write to local D1
node scripts/token-count/publish.mjs --remote   # measure, write to production D1
node scripts/token-count/publish.mjs --remote --dry-run   # compare only
scripts/token-count/install-schedule.sh         # publish --remote every 3 days
```

`npm run tokens:measure` and `npm run tokens:publish -- --remote` run the same
scripts.

`publish.mjs` prints the last snapshot, what the page was showing at the
moment of the new measurement, the new total and the drift between those two,
and refuses a total below the last one unless `--allow-decrease`. Remote
writes use the local `wrangler login` and account
`9d167860043f59195b15ab3e334dbda7`. Production needs
`npm run db:migrate:remote` once for `migrations/0002_token_snapshots.sql`.

## Sources

Every directory in the home folder named `.claude*`, `.codex*` or `.code*`
(Every Code), on this Mac and on `m1-runner` (over ssh; it scans its own
homes and sends back per-file summaries, never transcripts).

- Claude: `projects/**/*.jsonl`, including subagent and workflow
  transcripts. Each assistant line carries `message.usage` (input, cache
  creation, cache read, output) and the session's `cwd`.
- Codex: `sessions/` and `archived_sessions/` `rollout-*.jsonl[.zst]`. Newer
  CLIs write one `token_usage_record` per model response (keyed by
  `response_id`); older ones only cumulative `token_count` totals per thread.
  OpenAI's `input_tokens` includes cached input, so a Codex response's cached
  input is counted as a cache read and the rest as input.
- Codex thread databases: each Codex home's `state_5.sqlite` keeps
  `threads.tokens_used`, the thread's final running total. For the 21,000
  threads that still have a rollout log it matches the log's measurement
  (94% exactly; in sum the database is about 1% lower), except forks made by
  CLIs before 0.150, which start from their parent's total. It is counted only
  for threads whose rollout log is gone (the October cleanup deleted many),
  leaving out spawned threads from CLIs before 0.150. These totals have no
  input/cache/output split, so the "without cache reads" and "output" figures
  exclude them.

Only counts leave a transcript: hashed call ids, timestamps, working
directories, model names and token numbers (`lib/summary.mjs`). Lines are
found with a byte search, so tool output is never decoded.

## Counting each call once

- Claude: one call per `message.id` + `requestId`, across every file, home and
  machine. A call is written as several lines (one per content block; older
  versions streamed partial output counts into the earlier ones), and resumed
  or forked sessions and copied homes repeat earlier calls. Each field keeps
  its largest value.
- Codex records: one per `response_id` across everything (threads moved
  between homes repeat their records).
- Codex cumulative totals: growth between events, a drop starting a new
  segment (a resumed process counting from zero); one file per thread id (the
  largest). A fork whose first total includes its parent's (CLI 0.149) counts
  only its own first call. In a file with records, only growth logged before
  the first record counts.
- Codex thread database totals: only for thread ids that no rollout log on
  either machine names, the largest value across homes, spread evenly from
  the thread's creation to its last update for the 7-day rate.

The report's `dedupe` and `diagnostics` sections show how many rows each rule
merged.

## Scope

`lib/scope.mjs` classifies each call by its working directory:

- `products` (the footer): `~/www/runeditrun` (seeds, worktrees, site),
  `~/www/rer-consolidation`, `~/www/rer-fleet`, `~/www/review`,
  `~/www/happytohelp*`, `~/www/just-every/home*` (this site), the same under
  m1-runner's `~/dev`, and Claude Code scratchpads of sessions started in any
  of them.
- `ambiguous` (reported, never in the total): the early `just-every/seeds`
  workspace, `just-every/vector` and `just-every/review`, seed marketplace
  prototypes, orchestrator rosters for RER, and 12ui design calls in temp
  folders.
- `other`: everything else; `all` is the grand total.

Each scope reports tokens processed (input + cache writes + cache reads +
output), the same without cache reads, output only, by tool and machine, its
first and last call, and its rate over the last 7 days. The machine is the one
the cwd belongs to (m1-runner's homes hold copies of Mac sessions).

The footer shows tokens processed. Cache reads are most of it (over 95%): every
call re-reads the conversation so far, and both providers meter those tokens
(OpenAI's `total_tokens` includes cached input). It is the work the models
did, not the amount of text written; output alone is well under 1%.

## Speed and caching

Per-file results are cached in `~/.cache/justevery-token-count/` (on each
machine), keyed by path, size and mtime, so a re-run reads only new or grown
files. A log the tools later delete keeps its measurement, so the total does
not shrink as old sessions are pruned; logs pruned before the first run were
never counted, so the number is a floor. Scans run at nice 15 and pause while
the load average is above 36 on the Mac and 8 on m1-runner. A cold run
(about 130 GB of logs) takes about two minutes; a warm one, seconds plus the
time to read whatever grew.
