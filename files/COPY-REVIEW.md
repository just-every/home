# Released-source copy review

No public claim edits are warranted by the changed release. No contract implementation statuses are changed.

## terrace-v0.1.4

| Contract line | Clause | Publication | Implementation |
| --- | --- | --- | --- |
| 499 | `TER-004` | published | done |
| 501 | `TER-006` | published | done |
| 546 | `ACCT-001` | target | done |
| 548 | `ACCT-003` | target | missing |
| 549 | `ACCT-004` | target | missing |
| 550 | `ACCT-005` | target | missing |
| 551 | `ACCT-006` | target | done |

## uptime-v0.5.10

| Contract line | Clause | Publication | Implementation |
| --- | --- | --- | --- |
| 1522 | `STATE-001` | published | partial |
| 1524 | `NETWORK-001` | published | partial |

## lamp-v1.11.14

| Contract line | Clause | Publication | Implementation |
| --- | --- | --- | --- |
| 3199 | `PAGE-006` | published | partial |
| 3253 | `INCIDENT-004` | published | partial |
| 3271 | `UPDATE-008` | published | partial |
| 3301 | `SUB-006` | published | partial |
| 3323 | `NOTIFY-004` | published | partial |
| 3329 | `NOTIFY-009` | published | partial |
| 3345 | `INTAKE-002` | published | partial |
| 3408 | `MOVE-002` | published | partial |

## happytohelp-v0.4.24

| Contract line | Clause | Publication | Implementation |
| --- | --- | --- | --- |
| 1204 | `CONVERSATION-001` | published | partial |
| 1205 | `DELIVERY-001` | published | partial |
| 1208 | `OUTCOMES-001` | published | partial |
| 1210 | `CONNECTIONS-001` | published | partial |
| 1212 | `AI-001` | published | partial |
| 1215 | `DELEGATION-001` | published | partial |
| 1269 | `IDENTITY-003` | target | partial |
| 1279 | `PORTABILITY-001` | target | partial |

HappyToHelp v0.4.23 → v0.4.24: CONTRACT.md is byte-identical. seed.json changes version only (line 4). README.md lines 41–56 document the new legacy importer lease/adoption/custody changes, retain ordinary support, and qualify real customer remote import separately. JE does not claim those new import workflows; its existing support and reviewed historical import wording is retained. No newer contract judgment is inferred from a release number.

Terrace: released CONTRACT.md line 39 keeps external rent in integer cents, line 43 qualifies the rent CSV as distinct from trust/bank/distribution/tax statements. ACCT-001 (line 546) is done with balanced ledger and cent-exact source evidence; ACCT-006 (line 551) is done with exact settlement matching, balanced sign-off and unresolved-difference/close refusal. Missing security-deposit/refund/Plaid clauses are adjacent capabilities, not proof that the existing JE recorded-bookkeeping wording is false. Keep summary and does unchanged in this no-wording round.

Uptime and Lamp: the listed partial rows name gaps in acceptance evidence. This task does not convert those gaps into false-as-built findings or promote the judgments. No released-source copy drift was reported for either seed; preserve wording.

Spool v0.7.9: visible bare tag, no corresponding GitHub Release (GET releases/tags/v0.7.9 returned HTTP 404). Latest published Release remains v0.7.8 with rer-release.dsse.json. The unreleased v0.7.9 CONTRACT.md is identical and README/seed version drift was read for diagnosis only, never imported as released copy.

Coming-soon seeds: initial copy-only apply reports 0 changes across all 49 sources; no new unreleased copy drift was found or imported. Auth stays coming soon under the owner override. Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen remain absent.
