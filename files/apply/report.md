# Seeds sync, 2026-11-21T14:15:26.427Z

Applied over 6 seeds: 1 with changes, 1 unreadable. Homepages read here (load 0.2). State: scripts/seeds-sync/state.json.

## Copy source refs

| Seed | Ref | Commit | Reason |
| --- | --- | --- | --- |
| uptime | unresolved | unresolved | homepage https://run-uptime.com could not be read (page.goto: net::ERR_CERT_VERIFIER_CHANGED at https://run-uptime.com/) |
| happytohelp | v0.4.31 | e5fb53dc305f53a71ff0b6db81d5eec7dfd0104f | released listing version |
| lamp | v1.11.25 | 09f8cdb44557e43615ffa9321bc2492bb24d0710 | released listing version |
| orbit | v0.4.12 | a9fa1830c1913562154dedaeb5a1322ead7c3e6b | released listing version |
| oncall | v0.5.22 | 9cbcf975224f7171dcd3813e6f54d4b29a0791ca | released listing version |
| spool | v0.7.17 | 512977a936e6bda3f76c3a68e2511e62cb56090d | released listing version |

## Changes by seed

### HappyToHelp (released)

- **version**: newer tag v0.4.32 (page shows v0.4.31) (applied)

## Still open from the last sync (not news)

- Oncall: no "alternative to" line found on the homepage (check https://run-oncall.com for the products it names; replaces left as is)

## Unreadable (left unchanged)

- Uptime: homepage https://run-uptime.com could not be read (page.goto: net::ERR_CERT_VERIFIER_CHANGED at https://run-uptime.com/)

## Applied

Files written: 1.

- src/data/seed-pages.ts

## Rules

- Marks: drawn at 128px on white; changed when over 1% of pixels move by more than 64/255 in a channel.
- Homepage stills: 1280x720 after fonts load, motion reduced, overlays removed; compared at 160x90, changed when over 0.8% of pixels move by more than 64/255. Seeds with a reel keep a 16x9 fingerprint instead, changed when over 2% of cells move.
- Colours follow the token that held them at the last sync; the pastel keeps the hue (within 25 degrees) of the accent or ink.

