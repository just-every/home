# je-sync-9 · seed listing sync · 5 Nov 2026

Product candidate pushed as 298570aa56137eb77a8a420fb98510d01e2e748d on cloud/je-sync-9. PR: https://github.com/just-every/home/pull/33. Exact-SHA CI result is recorded in receipt.json.

## Result and review

Baseline: just-every/home main 5e018f20cd79437a02bf826505a116eae9b288a9. Branch: cloud/je-sync-9. Before/after counts: 49 total, 35 released, 14 coming soon. No version or released-status promotion is proposed. No contract clause judgments change.

The successful initial dry run said `Dry run: 6 of 49 seeds changed.` All 49 repositories and homepages were readable. Its findings were Terrace’s changed live headline and homepage still, plus five coming-soon copy-source changes. No mark, colour, new homepage URL, or status update and no recurring manual/override finding was reported. The first dry attempt stopped because Playwright was absent; installing the documented global capture dependency repaired that environment limitation without product implementation edits.

## Scope and decisions

Refresh only Terrace’s existing public/seeds/terrace/home.webp from the committed seed-main homepage through the existing sync tool. Its source src/identity.ts:10 changes “Rent in. Repairs done. Owners paid.” to “Rent in. Repairs done. Owners informed.” at main commit 354b7960edf19cf7934767caea70080104fc6cc3; terrace-source.json preserves the source diff and comparison URL. The tool measured 3.0% of still pixels changed. The compared images show the new headline, “Ready” owner-statement state and revised subhead, with the existing design/art retained.

Terrace’s copy publication boundary remains v0.1.4 / 0afcac8b3a42c23d984078e6ff90e928c9ebc22f. Its released CONTRACT.md, README.md and seed.json hashes did not drift. JE src/data/seeds.ts:840 already uses the narrower line “Tenancies, recorded rent, photo inspections and maintenance for landlords.” JE has no Terrace headline string to import (headline is null). Retain all published JE text in src/data/seed-pages.ts, including its released-source description; no changed released source proves a public claim false. The live/main headline is an observation, not a new released contract or implementation judgment. No public claim edits were made, so there are no edited-claim source rows to enumerate.

The copy-only apply records provenance and preserves artwork, brand/home observations and wording. Coming-soon/unreleased copy drift is recorded below and deliberately not imported into public wording. The full apply then records the homepage observation and imports the existing still.

## Per-seed proposed changes and withheld copy

### Terrace

Copy source: `v0.1.4` at `0afcac8b3a42c23d984078e6ff90e928c9ebc22f` (released listing version).

- homepage: headline changed: "Rent in. Repairs done. Owners paid." -> "Rent in. Repairs done. Owners informed.". Keep JE wording; live/main observation does not alter the released copy boundary.
- homepage: homepage looks different (3.0% of the still changed). Import existing homepage still only.

### Crank

Copy source: `HEAD` at `e2c146dc38eb64e685cf01d2c56e798404b3936e` (coming-soon seed; no release tag).

- copy: CONTRACT.md changed since the last sync. Withheld from public copy: coming-soon seed with no release tag. Record provenance only.
  Source range: https://github.com/just-every/run-crank/compare/85383fe22f35...e2c146dc38eb (`85383fe22f35ff8f627feefb5f2156fbe1013348` → `e2c146dc38eb64e685cf01d2c56e798404b3936e`).

### Placemat

Copy source: `HEAD` at `9e6bb6147a834849683f30973a45a814a0ee0139` (coming-soon seed; no release tag).

- copy: CONTRACT.md changed since the last sync. Withheld from public copy: coming-soon seed with no release tag. Record provenance only.
  Source range: https://github.com/just-every/run-placemat/compare/80cfda9a755f...9e6bb6147a83 (`80cfda9a755fac08ad1c5d0f30c8c91646b7943b` → `9e6bb6147a834849683f30973a45a814a0ee0139`).

### Platter

Copy source: `HEAD` at `696c5253a2a06ba928c1e6f5457b4d4e10aa7e1a` (coming-soon seed; no release tag).

- copy: CONTRACT.md changed since the last sync. Withheld from public copy: coming-soon seed with no release tag. Record provenance only.
  Source range: https://github.com/just-every/run-platter/compare/3662a92c8630...696c5253a2a0 (`3662a92c8630520c6deca5795989397b01814599` → `696c5253a2a06ba928c1e6f5457b4d4e10aa7e1a`).

### Satchel

Copy source: `HEAD` at `798b3b2110cdeddb82f4772d6860d9650df3f695` (coming-soon seed; no release tag).

- copy: CONTRACT.md changed since the last sync. Withheld from public copy: coming-soon seed with no release tag. Record provenance only.
  Source range: https://github.com/just-every/run-satchel/compare/49349464fe62...798b3b2110cd (`49349464fe624676a13bce36d05b3c7c0951ed1f` → `798b3b2110cdeddb82f4772d6860d9650df3f695`).

### Strap

Copy source: `HEAD` at `5bc1e11b32150892809e3d81d525e46e506233cb` (coming-soon seed; no release tag).

- copy: README.md changed since the last sync. Withheld from public copy: coming-soon seed with no release tag. Record provenance only.
  Source range: https://github.com/just-every/run-strap/compare/a0ad77620c82...5bc1e11b3215 (`a0ad77620c82771e7cf39e2b46af5f76d36171a2` → `5bc1e11b32150892809e3d81d525e46e506233cb`).

All other seeds have no proposed public change. Beacon, Relay, Ferry, Lily, Brook, Delta, Barrow and Linen remain absent. No gallery imports, new logo/design work, RER work, pricing edits, GST wording or billing-country restrictions. Accepted Assisted US$10/month and Managed US$100/month presentation is preserved by leaving its sources unchanged.

## Fresh stable Release observations

These are non-draft, non-prerelease GitHub Releases carrying rer-release.dsse.json. Envelope asset presence was observed; no envelope signature was verified. All are already listed, so no promotion is performed.

| Seed | Stable tag | Release URL | Envelope |
| --- | --- | --- | --- |
| lamp | v1.11.3 | https://github.com/just-every/run-lamp/releases/tag/v1.11.3 | rer-release.dsse.json present; signature not verified |
| uptime | v0.5.0 | https://github.com/just-every/run-uptime/releases/tag/v0.5.0 | rer-release.dsse.json present; signature not verified |
| orbit | v0.4.3 | https://github.com/just-every/run-orbit/releases/tag/v0.4.3 | rer-release.dsse.json present; signature not verified |
| oncall | v0.5.5 | https://github.com/just-every/run-oncall/releases/tag/v0.5.5 | rer-release.dsse.json present; signature not verified |

## Full copy source refs

| Seed | Boundary | Commit | Reason |
| --- | --- | --- | --- |
| uptime | v0.5.0 | 4a2ababc3f2bfc3981a95808cc962a95303d9af2 | released listing version |
| happytohelp | v0.4.13 | 704c50b8fdcd552af13aad76029135361fdc2125 | released listing version |
| nook | v0.5.0 | 7fc9516570502e9066b7f3a16d08ad63610d608e | released listing version |
| lamp | v1.11.3 | d42822f3281899cda3d5636ed30915e8bc287ae0 | released listing version |
| cradle | v0.4.0 | 6422d6fa21bb215167d9335d41e02b862bb7ad65 | released listing version |
| vector | v0.4.1 | 3c1e3de9f338b79206be339f7b594ed55e62c934 | released listing version |
| slate | v0.4.0 | 635df53b1d055f31998b7a5dd448ce467dab07d2 | released listing version |
| pencil | v0.7.0 | 97a985113cfadb9b7edaa8171bac9f5bd31718cb | released listing version |
| orbit | v0.4.3 | d06ba7473ab6ed7f5e12f5a1a0ca74e9b77812d5 | released listing version |
| mango | v0.4.0 | b40be01dcfcf8d793a92780252859eeccdaeb754 | released listing version |
| dial | v0.5.0 | da9f7f3c8b60b1b1935de0a4c7384a5cad1256ac | released listing version |
| penny | v0.2.1 | 4befdc40491a1a2f0ce66a77cb67ca5c49a31135 | released listing version |
| oncall | v0.5.5 | e2b4e1f7acabb49ea376f5c760fdbf9f3312b70a | released listing version |
| spool | v0.7.3 | 9654729a3be89c2516c755c4a595e8dc4590aeb4 | released listing version |
| balm | v0.1.4 | fc2451647ed0263ae50bd8d3536038a9a5c379c0 | released listing version |
| beam | v0.1.0 | 3278cad69eab0cf0a591ddf993f6549fbc4097c4 | released listing version |
| cabin | v0.1.0 | 37464b4468f5967f381951737d3c3cba46a736fe | released listing version |
| chest | v0.2.0 | 219ca4f53eed1448409e979823eac80ad8a24400 | released listing version |
| coaster | v0.1.0 | 568ad6d10bdf64f7a1f40a3ff2bbf3e16785fb51 | released listing version |
| coffer | v0.1.0 | 87b6d2c62e187385f72debfc5c9bbd3e3d1df458 | released listing version |
| easel | v0.1.0 | 82c03999852d81ca96e04c50b87ee81adb2abeb2 | released listing version |
| gasket | v0.1.0 | 33769933eaf2bafeb75c80eb2093b1400d282bc5 | released listing version |
| gauge | v0.1.0 | cf3745f66aff3b27a4111e30b7cf59824395b4cd | released listing version |
| glove | v0.1.0 | a9086f381d9c15af4aec26baafcb6aba619a374d | released listing version |
| larder | v0.1.3 | 10758c4295dec89b655e30ef8e26fa4f472e223d | released listing version |
| locket | v0.1.3 | b16525ec322de963fa48e6f4aafd78790ff58b41 | released listing version |
| lodge | v0.1.0 | 5d58f08b12819305f62e0e617edb1398b07654ca | released listing version |
| nectar | v0.1.0 | 59215a083b5f8a1248b1ab53c4c3ea4e51aa110b | released listing version |
| pantry | v0.2.8 | b24aaab5aac7e4cd3b83ef39d93a07e8325b6a8e | released listing version |
| pier | v0.1.0 | 67c944bf027977ad161aa209e1ff22b0afa9e812 | released listing version |
| purse | v0.1.1 | bab2cbe475ea23bd4831a71b441a6fb2b0d2cbdf | released listing version |
| willow | v0.1.0 | def0450eb8de870eed4b41fbe3ebdfdb35e6166f | released listing version |
| buoy | v0.1.3 | e85c5fa796ccd03ba45e6bea5d5fd3b65b27d471 | released listing version |
| lanyard | v0.1.3 | db2a1ef37612248290e0efd85209c9b1f0da8c83 | released listing version |
| terrace | v0.1.4 | 0afcac8b3a42c23d984078e6ff90e928c9ebc22f | released listing version |
| auth | HEAD | f07f60e355bc518ab3e2487350002811e78b1290 | coming-soon seed |
| blotter | HEAD | 4e7612a8313d08773cf95527824ef60c214837f2 | coming-soon seed; no release tag |
| crank | HEAD | e2c146dc38eb64e685cf01d2c56e798404b3936e | coming-soon seed; no release tag |
| evidence | HEAD | 2a064b4ce1e9e30350a6ea887ff8e4d057f4ef8d | coming-soon seed; no release tag |
| inkwell | HEAD | e4e3c2dd4bdf48fe16111f9d447568d6c4366a84 | coming-soon seed; no release tag |
| mallet | HEAD | b5656076d025dcd521173057070e5f8fd3b5ff29 | coming-soon seed; no release tag |
| pane | HEAD | 16501ad7d10c5af6f04799aa44c700249a41e9b4 | coming-soon seed; no release tag |
| placemat | HEAD | 9e6bb6147a834849683f30973a45a814a0ee0139 | coming-soon seed; no release tag |
| platter | HEAD | 696c5253a2a06ba928c1e6f5457b4d4e10aa7e1a | coming-soon seed; no release tag |
| plinth | HEAD | 43a2d1228129a76cc7d124068badb4b8b1b5db73 | coming-soon seed; no release tag |
| satchel | HEAD | 798b3b2110cdeddb82f4772d6860d9650df3f695 | coming-soon seed; no release tag |
| stall | HEAD | 8ee1f25df4f0b10b9a62e7fe221453499f27b297 | coming-soon seed; no release tag |
| strap | HEAD | 5bc1e11b32150892809e3d81d525e46e506233cb | coming-soon seed; no release tag |
| vane | HEAD | a2638146dc0faaefe358d203ac940389183151ef | coming-soon seed; no release tag |

## Plan, checks and custody

PLAN.md records the complete execution plan. Actual sync reports/logs, release observations, source receipt, browser proof and validation output accompany this report; receipt.json records final outcomes, SHA, PR and exact-SHA CI. Evidence transport is independent of product readiness. No merge, deployment or live production verification is performed here. The lane retains its landing hold, deciding gate, publication scan, merge, deployment and live viewport verification.

## Validation results

- npm ci passed. The committed sync implementation was not changed.
- Copy-only apply: 5 of 49 seeds changed, provenance only. Full apply: 1 of 49 changed, Terrace’s existing homepage still. Final dry: 0 of 49 changed, 0 unreadable and no unexplained residual findings.
- npm run listings: unchanged (49 seeds). npm run listings -- --check: passed.
- npm run type-check, npm run lint and npm run build: passed. Existing Next middleware convention warning remains outside scope. No permanent tests or full test suite were added or run locally. CI retains all of its required steps.
- Browser proof: actual production build served locally; 1440 assertions passed for HTTP status, Terrace heading, loaded homepage image and exact served asset bytes. Screenshots at 1440 and 390 were visually inspected. The local runtime’s missing analytics tables were migrated using npm run db:migrate:local; no remote provider operation. The first network-idle wait failed; proof used DOM, fonts and image decode readiness on retry. Screenshots and initial/final logs are retained.
- Changed paths: public/seeds/terrace/home.webp and scripts/seeds-sync/state.json only. Listings and all TS wording stayed byte-identical. Excluded slugs remain absent. Credential-shape and diff-hygiene checks passed.
- The supplied hook symlinks could not find Husky’s relative h loader. Clone-local forwarding was repaired to exec original hooks from their original paths, retaining the fleet cleanup and repository hooks. Husky lint-staged/Prettier then passed. An initial unintended base-only push attempt failed locally before publication; the actual candidate subsequently passed all identity/message checks and pushed successfully. No published history was rewritten.
- Fleet author and committer identity confirmed for every candidate commit, including traversal of all parents; full messages have no co-author trailers. Current remote branch SHA was independently confirmed. The working tree is clean.
- No clause status, version, release status, mark, colour, public wording or pricing changes; no fresh gallery capture/import. The only public asset update is the existing homepage still.
- Mac publication scan, independent deciding gate, deployment and production viewport verification remain with the lane as instructed.

## Terminal product custody

Done. Product branch cloud/je-sync-9 at 298570aa56137eb77a8a420fb98510d01e2e748d is pushed with a clean working tree. PR: https://github.com/just-every/home/pull/33.

Exact-SHA Verify branch push run 42112620417 completed successfully: https://github.com/just-every/home/actions/runs/42112620417. REST discovery was followed by one conclusive run observation at least 300 seconds later. The receipt retains the other discovery run IDs, but READY is based specifically on this successful push workflow and exact SHA. No generated-view exception was needed. No blocker remains; independent lane gates and landing hold still apply.

Evidence is published independently on refs/heads/evidence/je-sync-9. After final publication, the disposable clone and node_modules are removed as requested; this packet remains under the fleet work directory. The final message supplies the exact final evidence ref/head.
