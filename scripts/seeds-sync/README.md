# seeds-sync

Finds what the seed teams changed since the last sync (marks, brand colours,
homepages and their stills, release tags, and the files the page copy comes
from) and imports the mechanical part.

```sh
npm run seeds:sync                    # dry run: report only, changes nothing
npm run seeds:sync -- --apply         # import the mechanical updates, record the sync
```

Options: `--only nook,vane` (some seeds), `--capture-host m1-runner` (read the
homepages over ssh on another machine; also `SEEDS_SYNC_CAPTURE_HOST`),
`--out <dir>` (report folder; also `SEEDS_SYNC_OUT`), `--baseline-date <ISO>`
(for a seed the state has never seen, compare with its repo at that moment;
one GitHub API call each). With the 1-minute load over 36 the run refuses to
start a browser here: pass `--capture-host`.

Each run writes `report.md`, `report.json`, the homepage captures and
before/after images to `~/.orchestrator/evidence/home/seeds-sync/<timestamp>/`.

## What it checks, per seed

|     | Check                      | Source                                                                                                                            | Applied by `--apply`                                                                                                               |
| --- | -------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| a   | Mark changed               | the repo's designed mark (`sources.json`, default `public/brand/mark.svg`), drawn beside `public/seeds/<slug>/mark.svg`           | `mark.svg` verbatim; `mark-light.svg` (dark-scheme rules removed) where the site keeps one or the new mark adapts to a dark scheme |
| b   | Brand colours changed      | `src/branding.json`, the `--rer-*` colours of `public/rer-theme.css`, the live homepage's background, headline and button colours | accent, ink, paper; pastel re-derived; favicons regenerated                                                                        |
| c   | Homepage changed           | headline, the "alternative to" line, the page's look                                                                              | `headline` (where the site shows one), `replaces` / `primaryReplace`, a fresh still                                                |
| d   | Homepage now live, or gone | the live URL (`homepage`, else `run-<slug>.com`)                                                                                  | `homepage` and a still; a gone homepage is only reported                                                                           |
| e   | Newer release tag          | `git ls-remote --tags`                                                                                                            | `version` in `src/data/seed-pages.ts`                                                                                              |
| f   | Copy sources changed       | `CONTRACT.md`, `README.md`, `seed.json`                                                                                           | never: reported with the commit range for an agent's rewrite                                                                       |
| g   | Tag on a coming-soon seed  | `git ls-remote --tags`                                                                                                            | never: moving a seed to `seeds.ts` is a decision                                                                                   |

Repository files are read through `gh api` at the head commit; tags and heads
use `git ls-remote`. Authenticate `gh` before running. Failed reads are reported
and never replaced with local files. `--baseline-date` also uses the API.

## Rules and thresholds

- **Marks** are drawn at 128px on white and compared by pixels, so a
  re-encoded file of the same art is no change: changed when over 1% of pixels
  move by more than 64/255 in a channel. A mark that looks like Base's
  placeholder tile (one dark rounded square over the whole canvas with one
  light glyph) is reported and not imported. A seed whose mark is redrawn by
  hand in its ink (`mark-ink.svg`, `public/landing/marks/<slug>.svg`) waits for
  that redraw; it is reported, not imported. When the pastel's comment names a
  colour of the old mark that the new one no longer has, re-picking it is
  reported.
- **Homepage stills** are 1280x720, taken after fonts load with motion reduced
  and floating overlays (consent, chat, toasts, dialogs) removed, and stored as
  WebP. They are compared with the stored still at 160x90: changed when over
  0.8% of pixels move by more than 64/255. Measured on 20 Oct 2026: an
  unchanged page re-captured moves under 0.03%, a hero printing today's date
  about 0.4%, one new button about 1.7%. Seeds with a reel keep no still; the
  state keeps a 16x9 colour fingerprint of their page instead (changed when
  over 2% of cells move), and a change is reported only.
- **The headline** is the h1, or the next heading where the h1 is only the
  wordmark; quotes and spaces are normalised before comparing.
- **"Alternative to"** is the first visible element saying "alternative to
  ..."; the names are split on commas, "and" and "or", in the line's order.
  The first is `primaryReplace`, unless `overrides.json` says otherwise.
- **Colours.** Each of a seed's accent, ink and paper follows the token that
  held its value at the last sync, the highest-precedence one where several
  did (`detect/colours.mjs`: the accent prefers `src/branding.json`
  primaryColor, the ink the theme's text, the paper the theme's page). When
  that token moves, the colour moves with it. A colour that follows no token
  (picked by hand, often from the mark) stays; its sources' changes are
  reported. The pastel keeps the hue (within 25 degrees) of the accent, else
  the ink, and is re-derived from it by the recipe in `lib/pastel.mjs` (OKLCH
  lightness 0.875, 0.45 of the chroma kept between 0.04 and 0.08, same hue).
  A coming-soon seed's pastel follows its brand tokens the same way. A pastel
  taken from a mark colour stays, unless the brand had no hue (near-black, or
  Base's `#356c60`) and now has one. A colour with no hue of its own never
  becomes a pastel: that is reported for a hand.
- **Unreadable**: a seed whose repo or live homepage cannot be read is
  reported and left unchanged.
- **Hero and share image**: the hero's "JustEvery Stack" card is built from
  the data. The share image (`public/og-image.png`, `scripts/og-image.mjs`)
  shows the first eight hero rows; when a mark, pastel, ink or primary
  incumbent it shows changes, the report says it needs regenerating. The sync
  never regenerates it.

## Files

- `index.mjs` runs it; `sources/` reads the site's data, the repos and the
  homepages (`capture-page.mjs` is standalone so it runs on a capture host);
  `detect/` compares; `apply/` writes; `report/` prints and writes the report;
  `lib/` holds the network, image and pastel helpers.
- `sources.json`: where a seed keeps its designed mark, where that is not
  `public/brand/mark.svg`.
- `overrides.json`: the owner's decisions, which beat the homepage. Per seed:
  `primaryReplace` (the card's incumbent; it leads `replaces`), `replaces` (the
  whole list), `homepage` (where it is not `run-<slug>.com`),
  `staysComingSoon`, and `keep` (kinds of update to report but never make:
  `mark`, `colours`, `homepage`, `shot`, `headline`, `replaces`, `version`).
  `why` records who decided and when.
- `state.json`: what the last `--apply` saw per seed (head commit, latest tag,
  copy-file hashes, brand tokens, mark hash, homepage headline and
  fingerprint, and findings left open), so the next run reports only what is
  new. Commit it with the update it describes.

After an `--apply`, review the report's before/after images, then
`npm run lint`, `npm run type-check` and `npm run build`. The copy rewrites
and hand steps the report lists are for an agent pass. Once applied, they are
recorded as seen and not reported again, so that run's report is their
record. Findings that recur until someone acts (a mark waiting on a hand
redraw, a placeholder mark, an update an override keeps) are listed as still
open, not as news.

For a headless Linux capture with a provisioned Chromium, set
`PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/chromium`. There is no fallback
to a system browser or an owner profile. HTTPS capture follows `HTTPS_PROXY`
when configured. Hidden/retired slugs in `src/data/hidden-seeds.json` are
excluded from sync and gallery import.
