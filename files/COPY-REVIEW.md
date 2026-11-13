# Released-source copy review

No new copy drift was reported by the initial dry run or the copy-only apply. Preserve accepted wording; partial implementation evidence alone does not prove a public sentence false and grants no status promotion.

## happytohelp

| Clause | Released CONTRACT.md row | Class | Status |
| --- | ---: | --- | --- |
| `CONVERSATION-001` | 1204 | published | partial |
| `DELIVERY-001` | 1205 | published | partial |
| `OUTCOMES-001` | 1208 | published | partial |
| `CONNECTIONS-001` | 1210 | published | partial |
| `AI-001` | 1212 | published | partial |
| `DELEGATION-001` | 1215 | published | partial |
| `IDENTITY-003` | 1269 | target | partial |
| `PORTABILITY-001` | 1279 | target | partial |

## uptime

| Clause | Released CONTRACT.md row | Class | Status |
| --- | ---: | --- | --- |
| `STATE-001` | 1522 | published | partial |
| `NETWORK-001` | 1524 | published | partial |

## lamp

| Clause | Released CONTRACT.md row | Class | Status |
| --- | ---: | --- | --- |
| `PAGE-006` | 3199 | published | partial |
| `INCIDENT-004` | 3253 | published | partial |
| `UPDATE-008` | 3271 | published | partial |
| `SUB-006` | 3301 | published | partial |
| `NOTIFY-004` | 3323 | published | partial |
| `NOTIFY-009` | 3329 | published | partial |
| `INTAKE-002` | 3345 | published | partial |
| `MOVE-002` | 3408 | published | partial |

## terrace

| Clause | Released CONTRACT.md row | Class | Status |
| --- | ---: | --- | --- |
| `TER-004` | 499 | published | done |
| `TER-006` | 501 | published | done |
| `ACCT-001` | 546 | target | done |
| `ACCT-006` | 551 | target | done |
| `ACCT-011` | 556 | target | done |
| `ACCT-012` | 557 | target | partial |

Terrace: CONTRACT.md rows 546 and 551 describe the balanced property ledger and bank/three-way reconciliation as done; row 557 keeps complete owner statements partial. Its README.md row 7 still carries an earlier exclusion for trust reconciliation, while row 95 also describes earlier capacity limits. These mixed source statements do not justify rewriting accepted wording in this version-only round; the current released contract supports retaining it. The implementation judgments remain unchanged.

HappyToHelp, Uptime and Lamp: the named rows remain partial. Their evidence boundaries are retained; no claim has been broadened and no clause has been promoted.

Spool v0.7.8 → v0.7.9: CONTRACT.md is byte-identical. README.md rows 36, 58 and 80 update the release tag; rows 96–98 add the browser helper without Node/npm and clarify the application toolchain; row 122 clarifies source-map service/current CLI limits versus the published npm SDK. seed.json row 4 updates the version. JE makes no map-size, map-count or npm browser-helper promise, so none of those changes proves its existing sentences false. All Spool wording is retained. Exact diffs are in spool-contract.diff, spool-readme.diff and spool-seed.diff.

Coming-soon sources: copy-only apply reported zero drift; no unreleased copy or release status was imported. Auth remains coming soon under its existing owner override.
