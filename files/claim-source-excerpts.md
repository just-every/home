## uptime STATE-001

#### STATE-001 — Fixed coverage and incident hysteresis

**Requirement.** Missing or expired passing coverage is Unknown, partial failure stays visible, independent-vantage agreement and scheduled confirmation determine Failing, and complete fresh scheduled passing evidence plus recovery threshold is required for recovery; manual checks and maintenance never rewrite observations or scheduled policy. See [Evidence and state](docs/contract/safety-rules.md#evidence-and-state).

**Acceptance.**
1. Run two assigned network vantages through partial, missing, stale, failing and recovering slots; inspect Unknown/Degraded/Failing and thresholds.
2. A manual pass, absent probe or maintenance expiry cannot fabricate recovery.


Status row:
| `STATE-001` | Fixed coverage and incident hysteresis | published | partial | `src/domain/policy.mjs`; `tests/control-runtime.mjs`; `tests/control-runtime.mjs`; `docs/evidence/contracts/release-0.4.0/`; `tests/control-state-support.mjs`: proveStateHysteresis, two signed assigned runners show mixed-vantage Degraded, first complete scheduled Recovering, manual-pass isolation and absent-probe Unknown without recovery, then one recovery after the second complete scheduled pass, retaining the fixed denominator, original observations and incident identity; `tests/control-cadence-support.mjs`: proveCadenceRevision, incomplete selected coverage and missing-region Unknown; `tests/maintenance-windows.mjs`: MAINT-001 expiry and ordinary scheduled reevaluation without orphan recovery. Qualification pending; current main judgment and gap retained. | Two configured runner networks still prove confirmed Failing and the scheduled confirmation/recovery thresholds. Gap: exactly one failing vantage reading Degraded; Unknown for partial, missing and stale evidence; the intermediate Recovering state; and no fabricated recovery from a manual pass during an outage, an absent selected probe or maintenance expiry lack assertions in the cited files. Maintenance expiry is asserted only in tests/maintenance-windows.mjs, which this clause does not cite. |

## uptime EVIDENCE-001

#### EVIDENCE-001 — Immutable scheduled evidence

**Requirement.** Definitions, scheduled slots and every retry attempt retain revision, policy, fixed selected probes, runner identity, timings, status, assertions and error category; retries never erase failures, and observation/state/outbox commit atomically. See [Evidence and state](docs/contract/safety-rules.md#evidence-and-state) and [Integrity and authority](docs/contract/safety-rules.md#integrity-and-authority).

**Acceptance.**
1. Through signed claim/result routes submit failure, retry, late and duplicate attempts, restart, and read history; each attempt and its revision remains identifiable and observation/state/outbox either all commit or none do.


Status row:
| `EVIDENCE-001` | Immutable scheduled evidence | published | done | `src/domain/evidence.server.ts`; `src/domain/history.server.ts`; `docs/evidence/contracts/release-0.4.0/`; `tests/evidence-integrity-support.mjs` proveEvidenceIntegrity (called by `tests/probe-native-evidence.mjs`) — actual signed failure accepted with observation, history, outbox and job committed together, duplicate first-copy-wins and late fresh-signature and expired-window refusals each leaving every durable table unchanged (lines 15-151); `tests/control-runtime.mjs` — real private runners keep each probe's failed first attempt beside its retry (line 19), exact observations, revisions, outbox and incidents survive a Worker process restart (lines 35-44), a real expired acceptance window is refused (lines 46-49) and scheduled history reads back its revision (lines 61-63); `tests/probe-json-evidence-support.mjs` proveJsonSelectors (called by `tests/probe-native-evidence.mjs`) — each failed probe retains its original attempt and its retry (line 52) | |

## uptime NOTIFY-001

#### NOTIFY-001 — Authorized installation-wide destinations

**Requirement.** An owner may configure email, signed JSON webhook, or Slack incoming webhook destinations for all monitors in one installation; only scheduled incident transitions generate automatic notifications, and a test send cannot change monitor evidence or incident state. The hosted Worker submits email through the configured Base mail adapter and sends webhooks and Slack without a private runner; a private runner can also claim notification work. Webhook destinations also take WEBHOOK-001's configurable method, content type, custom headers and payload template. Destination credentials are installation-local and are not restored from archives. See [Contact, interface and delivery](docs/contract/safety-rules.md#contact-interface-and-delivery) and [Network and credentials](docs/contract/safety-rules.md#network-and-credentials).

**Acceptance.**
1. Create/rotate/disable email, Slack and signed webhook destinations, cause scheduled failure/recovery and a test send through actual Worker/runner delivery doors; inspect one job per enabled destination, credentials, exact signing, escaping and unchanged health for tests.


Status row:
| `NOTIFY-001` | Authorized installation-wide destinations | published | done | `src/domain/notification-destinations.server.ts`; `src/domain/notification-protocols.ts`; `docs/evidence/contracts/release-0.4.0/`; `tests/notify-delivery.mjs` — email, Slack and signed webhook destinations, scheduled failure, recovery and test sends through the actual runner and Worker doors, one job per destination, credential custody, receiver-verified signing, escaping and unchanged health for tests (lines 53-142, lines 216-221); `tests/alert-drill.mjs` — webhook credential rotation through the owner door and an email address change reset proof, and rotated secrets stay out of reads and logs (lines 145-157); `tests/alert-routes.mjs` — a disabled destination is excluded from the effective route (lines 18-38), and `tests/alert-routing-filters-support.mjs` proveRoutingFilters (called by that journey) — a primary disabled before dispatch sends nothing (lines 51-55) | |

## uptime DELIVERY-001

#### DELIVERY-001 — Bounded notification acknowledgment

**Requirement.** Each event and destination without receiver-side deduplication (email, Slack incoming webhooks and the other channels DELIVERY-002 names), every test send and every drill gets one automatic send attempt. A RER relay 429 with Retry-After confirms non-acceptance and queues another submission after that delay. For those sends HTTP 500, connection loss, timeout, and unknown outcomes remain uncertain and are not automatically sent again; deduplicating destinations retry and every route can fall back to another contact under DELIVERY-002. Accepted means the configured provider or endpoint acknowledged the request; it does not mean a person received, read, or acted on it. See [Contact, interface and delivery](docs/contract/safety-rules.md#contact-interface-and-delivery).

**Acceptance.**
1. At authorized provider edges return accepted, proven-unaccepted relay 429, HTTP 500, timeout and connection loss; restart during claims.
2. Only the proven-unaccepted case requeues automatically; uncertain started sends never replay and acceptance remains distinct from receipt.


Status row:
| `DELIVERY-001` | Bounded notification acknowledgment | published | done | `src/domain/notification-claims.server.ts`; `docs/evidence/contracts/release-0.4.0/`; `tests/notify-delivery.mjs` — accepted, HTTP 500, 4xx and single-attempt 429, lost connections, stalled timeouts and in-progress claim restart: uncertain sends never replay and a non-deduplicating 429 never requeues (lines 143-215); `tests/relay-mail-support.mjs` proveRelayMail (called by `tests/hosted-alerts.mjs`) — proven-unaccepted relay 429 with Retry-After kept as a durable not-before time across Worker restart, exactly one due submission, accepted jobs terminal and acceptance kept apart from recipient proof (lines 12-127) | |

## uptime DRILL-001

#### DRILL-001 — Recipient-reported alert drills

**Requirement.** An owner can run an alert drill on one destination: the existing test event with drill wording, sent once through the same path with no automatic resend, plus a one-time confirmation link (random capability, stored only as a bound hash, single use, 24-hour expiry, one drill and one destination). Opening the link shows a page; only a same-origin POST confirms, and unknown, used, expired and foreign links answer 404 alike. The console keeps Submitted, Acknowledged (or Uncertain/Failed with its code) and Recipient confirmed as separate lines, and does not measure whether anyone acted. A confirmed drill is a report by the recipient that one message reached a person at one time. It is never evidence of monitoring, a delivery guarantee or a human response, and it changes no monitor evidence, state or incident. Proof belongs to the destination's current credential: a new address or URL or a rotated secret makes it Never proven, and drill history stays with the installation, so a restored destination is Never proven. See [Alert drills](docs/contract/safety-rules.md#alert-drills).

**Acceptance.**
1. Drill email, Slack and signed webhook through the actual delivery runtime: GET/HEAD never confirm, same-origin POST confirms once, expired/replayed/foreign links refuse, 500 stays uncertain, rotation resets proof and archives/logs contain no capability or endpoint secret.


Status row:
| `DRILL-001` | Recipient-reported alert drills | published | done | `src/domain/alert-drills.server.ts`; `tests/alert-drill.mjs` |  |

## uptime TLS-001

#### TLS-001 — SSL certificate and chain monitoring

*Tier:* Core

**Requirement.** TLS checks verify hostname/SNI, certificate chain/trust, validity, expiry and renewal on HTTPS or configured TLS ports from each location. Staged configurable expiry warnings name the certificate and accountable owner, track renewal and resolve only after a newly observed valid chain.

**Acceptance.**
1. Monitor a controlled TLS service; present an expiring certificate, broken chain, wrong name and then renewed certificate, advance the clock and inspect deduplicated warnings, location evidence and renewal resolution.


Status row:
| `TLS-001` | SSL certificate and chain monitoring | target | done | `src/domain/protocol/x509.mjs`; `src/domain/protocol/tls12-certificates.mjs`; `src/domain/expiry-notices.server.ts`; `tests/protocol-monitors.mjs` — TLS block: expiring certificate warns once naming the certificate and accountable owner, wrong-name and untrusted-chain failures as location evidence, renewal resolves the warning (lines 123-136); `tests/tls-stages-support.mjs` proveTlsExpiryStages (called by that journey) — one real certificate crosses every saved warning stage with an advancing clock, one durable warning per stage across probes and Worker restarts, renewal resolves their shared identity and earlier evidence is unchanged (lines 18-127) | |

## uptime MAINT-001

#### MAINT-001 — Planned and recurring maintenance

*Tier:* Core

**Requirement.** One-time and recurring windows target monitors/groups with US time zones, daylight-saving handling, preview and audit. Buyers choose notification suppression or execution pause explicitly; reports show maintenance separately and retain denominator and underlying observations. Expiry re-evaluates actual evidence and cannot emit orphan recovery.

**Acceptance.**
1. Schedule a New York recurring maintenance window across a DST transition and a one-time group window; fail a monitor during each, restart, end/cancel the window and inspect preserved results, suppression and reports.


Status row:
| `MAINT-001` | Planned and recurring maintenance | target | done | `src/domain/planned-maintenance/`; `src/domain/planned-maintenance.server.ts`; `public/planned-maintenance.js`; `tests/maintenance-windows.mjs` (run by the test:operations script in Verify) — DST previews (spring gap skipped, fall repeat first), stale-review refusal, one-time group pause and suppression with failing monitors, in-flight retention, Worker and runner restart, cancellation, expiry without orphan recovery, preserved observations and separate maintenance report and CSV denominators, then calls `tests/maintenance-recurring-support.mjs` proveRecurringAcrossDst — its own installation on a pinned clock: an America/New_York Sunday 01:30 recurring suppress window across the next November fall-back (preview shows three Sundays, the middle one first-repeat spanning the clock change; applied through preview digest), a failing monitor fails before and after the clock change with no notification, a Worker restart keeps every observation and the calendar, recovery inside the window emits no orphan recovery, the window ends by itself and a new failure after expiry raises exactly one ordinary trigger and no recovery, the report keeps the window's maintenance milliseconds apart from availability, and the window cancels; `tests/archive-roundtrip.mjs`; `docs/evidence/contracts/maintenance/` | |

## uptime ARCHIVE-001

#### ARCHIVE-001 — Inactive validated restore

**Requirement.** Bounded versioned archives require integrity and semantic validation before transactional restore into empty product data, preserve historical evidence, erasure receipts and the permanent anonymized action audit, create paused current revisions, interrupt leases and quarantine alerts; installation-local sessions, keys, grants, request credential values, heartbeat authority, contact, webhook and Slack URLs, and signing keys are excluded; destination definitions and retained notification histories are portable, and imported evidence cannot establish current health or replay events. The source erasure journal fences copies made before a later erasure when that journal accompanies the restore. A local CLI receiving checkout must run setup first to establish its owner and settings. Supersedes `BASE-DATA-001` for installation authority and endpoint credentials only: the owner accepted this archive policy on 2026-10-13 (RL-1), as an intentional replacement, not BASE-DATA-001 equivalence. See [Portability and retention](docs/contract/safety-rules.md#portability-and-retention) and [Integrity and authority](docs/contract/safety-rules.md#integrity-and-authority).

**Acceptance.**
1. Export a populated installation including TCP, DNS, TLS and domain monitors, establish a different receiving owner, import into empty product data, then export/read history and repeat the restore.
2. Each protocol’s settings and immutable revisions/slots survive; definitions are paused, leases interrupted, delivery quarantined, secrets/authority absent, history retained and later erasure journals enforced; corrupt/nonempty imports write nothing.


Status row:
| `ARCHIVE-001` | Inactive validated restore | published | done | `src/domain/archive.server.ts`; `src/domain/archive-monitor-validation.ts`; `docs/evidence/contracts/archives/`; `docs/evidence/contracts/release-0.4.0/`; `tests/archive-roundtrip.mjs` — populated export including TCP, DNS, TLS and domain monitors, separate receiving owner, import into empty data, exact settings, revisions and slots, paused definitions, interrupted leases, quarantined delivery, absent secrets, corrupt and nonempty refusal writing nothing, repeated restore (lines 17-58); `tests/erasure-audit.mjs` — restore with a later erasure journal refused through the owner restore route with no monitor or audit write (lines 153-158); `tests/failure-page-custody-support.mjs` proveFailureSnapshotErasure — old snapshot-bearing archive refused by the source's later journal with every table unchanged (lines 79-91) | |

## uptime NETWORK-001

#### NETWORK-001 — Pinned bounded destination execution

**Requirement.** Every public DNS answer and redirect hop is validated fail closed; private-runner numeric sockets preserve Host and TLS identity, hosted checks use Cloudflare’s public Internet fetch transport, unsafe/mixed addresses and HTTPS downgrade are rejected, cross-origin redirects strip request authority, and synthetic grants and protected origin-bound local credential files retain their separate custody limits. The PROBE-002 identification header follows these credential rules and is stripped on cross-origin redirects. See [Network and credentials](docs/contract/safety-rules.md#network-and-credentials).

**Acceptance.**
1. Exercise real controlled HTTP/TLS endpoints with mixed DNS, rebinding, hostname mismatch, redirects, downgrade, forbidden addresses, credentials and execution bounds; inspect requests and prove rejected destinations receive no connection or authority.


Status row:
| `NETWORK-001` | Pinned bounded destination execution | published | partial | `runners/src/public-http.mjs`; `src/domain/worker-http.server.ts`; `tests/tls-auth.mjs`; `tests/api-auth-journey.mjs`; `tests/probe-native-evidence.mjs` — existing mixed-answer runner refusal and Unknown assertions; `tests/network-mixed-dns.mjs` — mixed DNS connection refusal journey: owner-created monitor, actual signed runners and retained scheduled evidence; an allowed public answer qualifies target socket and request counters, then both public-first and private-first mixed answers cause zero target connections and requests, retained network runner_error, Unknown with the fixed coverage denominator and no fabricated trigger or recovery. Qualification pending; current main judgment and gap retained. | Cross-origin authentication, client-certificate and body stripping are asserted. Gap: mixed DNS answers, rebinding before connection, TLS hostname mismatch, re-resolution of every redirect, HTTPS downgrade and forbidden redirect refusal, exact-origin credential binding, timeout/body/encoding bounds and zero connections to rejected destinations lack assertions in the cited files. tests/tls-auth.mjs calls assertions in helper files this clause does not cite. |

## uptime ERASURE-001

#### ERASURE-001 — Operator-directed entity erasure

**Requirement.** An owner can erase a monitor with its evidence and dependent notification/heartbeat records, a destination with its credential copies, or an operator while another active owner remains. Monitor erasure requires typing the current monitor name. Each completed erasure returns a receipt with entity kind, per-table counts and completion time, and returns it only after the transaction containing the erasure, audit entry and portability fence succeeds. Requests based on stale monitor or destination state cannot re-create erased rows. The last active owner cannot be erased: local installations use `rer reset --yes`, while hosted installations require replacement by redeployment. Uptime has no R2 attachment feature; import-door uploads, plan snapshots and archive bytes are held in installation-local custody under the erasure rule in [Erasure and audit](docs/contract/safety-rules.md#erasure-and-audit). Already downloaded archives, messages already sent to external recipients and requests already in progress remain outside local erasure. See [Erasure and audit](docs/contract/safety-rules.md#erasure-and-audit).

**Acceptance.**
1. Erase each supported entity through the owner API, including stale concurrent requests and the original owner with a successor.
2. Inspect the atomic per-table receipt, audit and journal; the last owner is protected and an old archive with the later journal cannot resurrect erased records.


Status row:
| `ERASURE-001` | Operator-directed entity erasure | published | done | `tests/erasure-audit.mjs` — public owner erasure and later-journal restore: monitor, destination and second-operator erasure, populated per-table receipts, atomic audit and portability fences, held runner and notification refusal, anonymized actors and old-archive refusal; `tests/erasure-race-support.mjs` — erasureRaceProof, mounted once by the erasure journey: an actual owner PATCH based on revision 3 stays open across monitor erasure, resumes with refusal and cannot restore any durable row; unsigned, wrong-name and last-owner erasure refusals preserve all 197 durable tables, including populated transfer custody, receipts, audit and fences; `tests/alert-routes.mjs` — owned routes preview inheritance, deliver matched triggers and recoveries and retain auditable changes, calling `tests/catalog-routes-support.mjs` proveCatalogRoutes: original-owner erasure with an enrolled successor, anonymized retained ownership and surviving fresh sign-in and factor authority. | |

## lamp INTAKE-002

#### INTAKE-002 — Alerts never publish

**Requirement.** The source-specific intake policy controls accepted alerts. Under the held intake policy an alert remains a private draft until publication; AUTO-001 carries component-specific alternatives. An agent publication carries external and live classes decided by company policy.

**Acceptance.**
1. Under the held intake policy an accepted alert creates or updates a draft within 30 seconds.
2. That intake changes no public page, feed, widget or other public surface.
3. Publication follows UPDATE-008 and supplies every UPDATE-001 narrative field; an alert payload alone is not a completed narrative.


Status row:
| `INTAKE-002` | Alerts never publish | published | partial | `tests/e2e/publishing-contract.test.mjs` | The cited journey asserts a private draft and page exclusion. It does not measure the 30-second create/update bound or compare all public surfaces. The class/policy wording carries no promotion. |

## lamp INCIDENT-004

#### INCIDENT-004 — Published updates are immutable

**Requirement.** Corrections add to the public record without changing earlier wording.

**Acceptance.**
1. Published updates cannot be edited or deleted.
2. A correction is a new publication identifying the update it corrects.
3. Original and correction remain on the public timeline in publication order.


Status row:
| `INCIDENT-004` | Published updates are immutable | published | partial | `tests/e2e/publishing-browser.test.mjs`, `tests/e2e/publishing-contract.test.mjs` | Asserted: original wording retained; correction identifies original; both updates retained. Unasserted in old cited evidence: published deletion refused; public publication order. |

## lamp UPDATE-008

#### UPDATE-008 — Atomic publication and recipients

**Requirement.** Publication commits its fixed recipient set before dispatching without holding publish. Its committed success starts PAGE-007’s visibility bound and NOTIFY-002’s delivery bound.

**Acceptance.**
1. The selected channels’ recipients and the update commit together before success is returned.
2. Narrowing selection afterwards preserves committed delivery; unsubscribing suppresses it under SUB-008.
3. Failed publication exposes no update and records no recipients.
4. Dispatch retries the committed set until success without blocking publication.


Status row:
| `UPDATE-008` | Atomic publication and recipients | published | partial | `tests/e2e/delivery-contract.test.mjs`, `tests/e2e/publishing-contract.test.mjs` | Asserted: update once; recipients once; no failed recipient. Unasserted in old cited evidence: narrowing preserves delivery; unsubscribe suppresses delivery; failed update not public; retry to success; dispatch does not block. |

## lamp NOTIFY-009

#### NOTIFY-009 — Delivery never blocks publication

**Requirement.** Delivery failure never withholds a committed public update; its notification set resumes when the failed channel recovers.

**Acceptance.**
1. Publication succeeds despite a failing mail provider, queue or subscriber endpoint.
2. The public page, feed and widget meet PAGE-007 despite the failure.
3. Recovery delivers the original committed notification set under NOTIFY-003.


Status row:
| `NOTIFY-009` | Delivery never blocks publication | published | partial | `tests/e2e/delivery-contract.test.mjs` | Old cited evidence asserts only the previously described delivered slice. It does not assert: mail provider failure publish; queue failure publish; endpoint failure publish; public page survives delivery failure; feed survives delivery failure; widget survives delivery failure; recovery preserves and delivers committed set. |

## lamp UPTIME-001

#### UPTIME-001 — Definition

**Requirement.** The public uptime figure derives from component-state history over the trailing ninety days.

**Acceptance.**
1. Each visible component shows the percentage of the ninety-day window not in a downtime state, using one-minute resolution.
2. The figure rounds down to two decimals so any downtime prevents a displayed 100.00%.


Status row:
| `UPTIME-001` | Definition | published | done | `tests/e2e/public-contract.test.mjs` (owner maintains a complete catalogue and customers read, refresh, embed and retain its public story), loading `tests/e2e/helpers/public-capacity-journey.mjs` (publicCapacityJourney): public collection readback asserts the complete ninety-day partial boundary and 99.99 percent for a one-minute outage. |  |

## lamp PAGE-006

#### PAGE-006 — Serving through a failure

**Requirement.** Public status continues to answer from retained content during primary storage, database or queue failure, with truthful stale labeling.

**Acceptance.**
1. When the database, queue or object storage is unreachable, the page, Atom feed and widget return successful current or retained content; an origin outage can use PAGE-007’s cached response.
2. Only an installation with no snapshot ever written returns unavailable instead of status content.
3. Content not built from current data identifies its generation instant and says Last known state; a failed read never invents an operational all-clear.


Status row:
| `PAGE-006` | Serving through a failure | published | partial | `tests/e2e/public-contract.test.mjs`, `tests/e2e/public-contract.test.mjs`, `tests/e2e/publishing-contract.test.mjs` | Old cited evidence asserts The page body still contains Partially unavailable after database removal; Stale page content is labeled Last known state; The generation instant is visible in stale page content; The retained failure body contains Partially unavailable. Unasserted: The Atom feed survives database outage; The widget survives database outage; Page content survives queue outage; Atom feed content survives queue outage; Widget content survives queue outage; Page content survives object-storage outage; Atom feed content survives object-storage outage; Widget content survives object-storage outage; Origin outage uses the specified cached-response window; Page is unavailable only before first publication; Atom feed is unavailable only before first publication; Widget is unavailable only before first publication. |

## lamp PAGE-013

#### PAGE-013 — Enforced isolation

**Requirement.** Public status has restrictive same-origin isolation and needs no CAPTCHA or consent banner. The exact header policy is documented in the public mechanisms record. The formats and configuration details are in [Public status mechanisms](docs/contract/public-details.md).

**Acceptance.**
1. Every public response has the documented own-origin default, script, style, image, connection, form and base policies, refuses framing, prevents content-type sniffing and uses the documented referrer policy.
2. The public page contains neither a CAPTCHA nor a consent banner.
3. The public page writes no visitor data to browser storage.


Status row:
| `PAGE-013` | Enforced isolation | published | done | `tests/e2e/delivery-contract.test.mjs`, `tests/e2e/public-contract.test.mjs` (owner maintains a complete catalogue and customers read, refresh, embed and retain its public story): acceptance 1 checks the complete documented CSP, framing refusal, nosniff and referrer headers on the public page, history, feeds, widget, status JSON and badge. Its registered `tests/e2e/helpers/public-isolation-flow.mjs` (publicIsolationFlow) proves acceptance 2 and 3 on populated default, Calm headline, Uptime-history-led and Regions map pages: fresh anonymous readers load, poll, observe a native publication and reload without CAPTCHA, consent controls or attempted storage writes; independent cookies, localStorage, sessionStorage, IndexedDB and CacheStorage inventories remain empty. Existing `tests/baseline/e2e-baseline/core-baseline.test.mjs` retains public no-Set-Cookie and document.cookie controls under BASE-PUBLIC-001. |  |

## lamp NOTIFY-004

#### NOTIFY-004 — Delivery log, without tracking

**Requirement.** The notification log exposes delivery facts for each recipient and supports channel, outcome and update filtering plus CSV. It adds subscription-communication fields to the Base mail-outcome duty.

**Acceptance.**
1. Each notification records subscriber, channel, update, queue time, outcome and outcome time.
2. Outcomes distinguish queued, delivered, bounced, complained, suppressed and failed.
3. Messages contain no tracking pixel or tracked link.
4. Each channel, outcome and update filter returns matching rows, and the complete CSV matches those filters.


Status row:
| `NOTIFY-004` | Delivery log, without tracking | published | partial | `tests/e2e/delivery-contract.test.mjs`, `tests/e2e/delivery-contract.test.mjs` | Old cited evidence asserts outcome field; queued outcome; delivered outcome; bounced outcome. Unasserted: subscriber field readback; channel field readback; update field readback; queue time readback; outcome time readback; complained outcome readback; message pixel absence; tracked-link absence; the outcome filter returns all and only matching rows throughout its result set; channel filter reconciliation; update filter reconciliation; all 101 distinct expected destinations occur once and match the full filtered view. |

## lamp MOVE-002

#### MOVE-002 — Retroactive and silent

**Requirement.** Imported incident and maintenance history is silent and preserves its original timing rather than replaying publication.

**Acceptance.**
1. Each incident update keeps its original publication time, and imported component state history derives from those times under INCIDENT-009.
2. Past maintenance is completed; import creates no lifecycle maintenance notice and queues no incident or maintenance notification.
3. Preview, apply, resume, job reads and Cutover checks send no mail.
4. Imported email subscribers remain pending for the separate invitation action.


Status row:
| `MOVE-002` | Retroactive and silent | published | partial | `tests/e2e/statuspage-import.test.mjs`, `tests/e2e/statuspage-import.test.mjs`, `tests/e2e/sorry-import.test.mjs` | Old cited evidence asserts Sorry incident update timestamps equal source times; Past Sorry maintenance is completed; Imported Better Stack maintenance has no native notice; Import queues no notification delivery. Unasserted: Complete imported component history derives from original update times; Concurrent repeated applies send no mail; Preview sends no mail; Every resume sends no mail; Cutover checks send no mail; Each imported email subscriber is pending. |

## lamp SUB-006

#### SUB-006 — One-click unsubscribe

**Requirement.** Every notification offers standards-compatible one-click unsubscribe. Its public rate allowance belongs to the subscriber token, so one mailbox provider cannot exhaust another subscriber's allowance. The technical profile is specified in [Delivery details](docs/contract/delivery-details.md).

**Acceptance.**
1. Notification email contains the mail and web unsubscribe values, the one-click declaration and a visible unsubscribe link.
2. Both supported form encodings deactivate that subscription with a successful empty response, no redirect and no further interaction.
3. The message signature covers both unsubscribe headers.
4. One token's rate allowance never consumes another token's allowance, including requests from one mailbox provider.


Status row:
| `SUB-006` | One-click unsubscribe | published | partial | `tests/e2e/delivery-contract.test.mjs`, `tests/e2e/rer-mail.test.mjs`; `tests/e2e/helpers/subscriber-one-click-flow.mjs`; the R-40 live-provider receipt remains outstanding. | Old cited evidence asserts mail unsubscribe value is present; web unsubscribe value is present; one-click declaration; URL-encoded deactivation. Unasserted: visible unsubscribe link in notification body; multipart form deactivation; DKIM coverage of both unsubscribe headers; per-token allowance independence. |

## orbit OUT-001

#### OUT-001 — Exact-content customer sending

**Requirement.** A person’s send binds the exact saved recipients, subject, body, attachments and message settings, and scheduled dispatch uses that unchanged snapshot. Signals, scores, recommendations and generated text are evidence, never authority. An agent’s customer-message call carries external; the company’s policy decides whether it runs, enters review, waits for approval or is off. Under the held company policy a signed-in person approves the exact saved revision before it dispatches. A later content, recipient, permission or evidence change invalidates that approval. Batch and sequence messages retain the exact per-item snapshots in their own clauses.

**Acceptance.**
1. Under the held company policy, attempt sending from ingestion, an agent and an unreviewed draft; only a signed-in person’s approval of the unchanged saved recipient, subject and body permits dispatch.


Status row:
| `OUT-001` | Exact-content customer sending | published | partial | `src/core/features/outreach/service.ts`; `src/core/features/outreach/scheduler.ts`; `tests/core/signals-outreach.test.ts`; `tests/core/source-onboarding.test.ts` (source onboarding authenticates inert connection tests, ranks real evidence and preserves customer reply through reviewed send); `tests/rer/onboarding.test.mjs` | Unasserted in the carried evidence: an actual agent customer-message call under held company policy through its owning agent-surface tool. Asserted: the current source signature ingests evidence but cannot approve or dispatch a saved draft without a native session; refusal is 401 with unchanged saved content and effect inventories and no mail submission, followed by signed-in exact-revision approval and exact reviewed bytes dispatched. |

## orbit OPP-004

#### OPP-004 — Explainability

**Requirement.** The opportunity view shows every signal the current score used, by ID, with its source, occurred time, confidence, and positive or negative contribution, and shows the reason for the current recommendation beside them.

**Acceptance.**
1. Open a scored deal and follow every contribution to its source evidence and current action reason.


Status row:
| `OPP-004` | Explainability | published | partial | `tests/e2e/operator.spec.mjs` — OPP-004 — the mobile detail renders current score evidence and recommendation reason; push Verify runtime-browser in shards (batch-13); `src/core/features/opportunities/repository.ts`; `src/core/features/operator/ui/record/next-action.tsx`; `src/core/features/operator/ui/record/recorded-details.tsx` | Not reachable in the product, so unasserted: following each contribution to its source evidence. A contribution in the deal's Why this is first list has no link or visible signal ID, Recorded details lists each signal's subject, kind, source and linking basis without ids, and no route serves a signal's source evidence; `tests/e2e/operator.spec.mjs` resolves each contribution's signal ID from the opportunity API inside the test and then finds its Recorded details line by subject text. Asserted at 390 and 1440 in the browser: every contribution shown with its signal subject, type, signed points and source; the current recommendation's reason and next action beside them; each contributing signal's Recorded details line names its source and how it was linked. |

## orbit SIGNAL-007

#### SIGNAL-007 — No tracking

**Requirement.** Orbit serves no tracking script, pixel, or cookie, and performs no fingerprinting or cross-site collection. A page-view, chat, or download signal is accepted only when its source supplies the visitor identity it already holds and the basis for holding it; without that basis the event is held unlinked under SIGNAL-004 and never becomes contact history. The one exception is OUT-016's disclosed, opt-in, per-message open and link-click tracking of Orbit-sent customer mail, which adds nothing to Orbit's public pages, its app or any other site.

**Acceptance.**
1. Inspect public assets/network and submit identity-free page/chat events; no Orbit tracker runs and unsupported identity stays outside customer history.


Status row:
| `SIGNAL-007` | No tracking | published | partial | `src/core/features/ingestion/routes.ts`; `src/core/features/ingestion/repository.ts`; `tests/core/signals-outreach.test.ts` | Unasserted in the carried evidence: no tracking script/pixel/cookie in public assets/network; identity-free chat held; unsupported identity absent from customer history. Asserted: identity-free page view held. |

## orbit OUT-007

#### OUT-007 — Stop conditions

**Requirement.** A reply, a booked meeting, an unsubscribe, a do-not-contact, or a permanent bounce cancels that contact's scheduled messages and marks their unsent drafts stale under ACTION-005. A reply or a bounce ends awaiting response and returns the opportunity to NOW with the reply or the delivery problem as its next action. An OUT-031 unattributed stop request pauses, rather than cancels, the scheduled messages and sequence enrollments of every external recipient of its message until a user resolves it.

**Acceptance.**
1. Schedule a message, deliver reply/booking/unsubscribe/bounce or a manual stop, then advance dispatch; cancel the message and stale the draft without duplicates.


Status row:
| `OUT-007` | Stop conditions | published | partial | `src/core/features/outreach/service.ts`; `src/core/features/outreach/scheduler.ts`; `tests/core/signals-outreach.test.ts` | Unasserted in the carried evidence: booking cancels scheduled mail; unsubscribe cancels scheduled mail; bounce cancels scheduled mail; manual stop cancels scheduled mail; replay has no second effect. Asserted: reply cancels scheduled mail; stop stales unsent draft. |

## orbit OUT-012

#### OUT-012 — Unsubscribe

**Requirement.** An outbound customer message that carries opt-out under OUT-020 carries the opt-out URL header and the one-click opt-out header headers handled by the mail provider, or by the installation origin for managed relay mail and OUT-013 mailbox sends. An unsubscribe event that identifies one recipient sets that contact do-not-contact under RECORD-012 within 60 seconds and cancels their scheduled messages. OUT-020 sets which message types carry opt-out (sequence email on and one-to-one email off by default) and the scope of an opt-out from a message with more than one external recipient.

**Acceptance.**
1. Inspect unsubscribe headers on actual submitted mail of a type set to carry opt-out, receive a signed unsubscribe and confirm future sending and scheduled work are suppressed.


Status row:
| `OUT-012` | Unsubscribe | published | done | `tests/core/outbound-boundaries.test.ts`; `tests/core/outreach-limits.test.ts` — OUT-007 OUT-009 OUT-012 a signed provider unsubscribe stops the recipient and schedule within sixty seconds and returns the opportunity to NOW once (after the signed unsubscribe a new draft to the contact is refused, and the workbench approval of an earlier draft, sent with the recipient-time confirmation so quiet hours cannot be the reason, answers 409 "Revision already approved, changed, or is no longer permitted." at any hour with no outbound message and no mail call); push Verify core-9 in shards (batch-10) and core-8 in shards (batch-16) |  |

## orbit ACTION-005

#### ACTION-005 — Stale draft

**Requirement.** A reply, meeting, unsubscribe, do-not-contact, permanent bounce, changed recipient, changed opportunity, or replaced recommendation marks a draft stale. A stale draft is shown as stale, and sending it returns 409 and writes no outbound message until an operator opens it, sees what changed, and confirms.

**Acceptance.**
1. Change the customer/deal or deliver a stop event after drafting; refuse sending until the operator sees and explicitly reviews current differences.


Status row:
| `ACTION-005` | Stale draft | published | partial | `src/core/features/drafts/service.ts`; `tests/e2e/stale-review.spec.mjs`; `tests/core/capture-boundaries.test.ts` | Unasserted in the carried evidence: customer/deal mutation stales draft; stale send refused; current differences shown before new review. Asserted: reply stop stales draft. |

## orbit CAPTURE-005

#### CAPTURE-005 — Human boundary

**Requirement.** Capture never creates a draft, approves or starts a message, or makes a contact contactable. A contact created from a proposal is do-not-contact until an operator clears it under RECORD-012; the person accepting a CAPTURE-012 new-prospect proposal makes that choice explicitly in the same review, with the basis it records, and an unsubscribe request in a captured message is a do-not-contact proposal. Capture endpoints accept only a full native operator's session: a source signature, a delegation credential or an invited collaborator is refused, and the signed paths of SIGNAL-009 cannot write into a capture source. Mail delivered to an operator-created Orbit address (CAPTURE-008) is the only intake without a session; its authority is that address's private tag, and it writes only into that address's source.

**Acceptance.**
1. Attempt capture with native, collaborator, source and delegation authority; only permitted native/address intake succeeds, and a proposed new contact stays blocked.


Status row:
| `CAPTURE-005` | Human boundary | published | partial | `src/core/features/capture/providers/oauth.ts`; `tests/core/capture-providers.test.ts`; `tests/core/capture-boundaries.test.ts` | Unasserted in the carried evidence: delegation credential refused; address-only intake works; proposed new contact stays blocked. Asserted: native intake works; collaborator intake refused; source signature refused. |

## orbit AI-003

#### AI-003 — Provider failure

**Requirement.** When the AI provider is unconfigured or unavailable, records, signal ingestion, linking, scoring, queue placement, search, manual updates, hand-written drafts, and sending all continue to work, and a recommendation still names its action and evidence. A generation request shows the failure and produces no explanation or draft.

**Acceptance.**
1. Leave AI unconfigured and fail a configured request; finish manual CRM, ingestion, scoring and handwritten outreach flows while generation reports failure.


Status row:
| `AI-003` | Provider failure | published | partial | `src/core/features/assistance/provider.ts`; `tests/core/assistance.test.ts` — AI-002 invented evidence fails visibly; AI-003 unconfigured provider generates nothing and handwritten outreach submits once (after the unconfigured generation 503, the same installation creates a handwritten draft, reads its exact rendered content, opt-out state and recipient time, approves through native Workbench, compares the real mail adapter request with the saved approval snapshot, reads one accepted provider receipt and refuses repeated approval without another submission; no AI call, generated draft or explanation). | Unasserted in the carried evidence: configured-outage continuity; manual CRM updates; ingestion and linking continuity; scoring and queue placement continuity; search continuity; recommendation action and evidence readback; rendered generation-failure qualification. Connected mailboxes and live model or provider qualification remain unclaimed. Asserted: unconfigured generation unavailable; handwritten drafting, exact approval and one accepted customer-mail submission continue with AI unconfigured. |

## orbit RECORD-004

#### RECORD-004 — Duplicate merge

**Requirement.** Merging two contacts or two companies requires an operator to choose the surviving record and the value of every conflicting field. The request is bound to both reviewed record states; a changed record refuses the merge without modifying either record, requiring a new review. Contactability is not a reviewed choice: a do-not-contact stop that lands after review is inherited by the merge. The merge moves associations and timeline entries once, retires the other record's key as an alias so later signals carrying it link to the survivor, creates no signal, recommendation, or outreach, and records the retired ID in the audit trail.

**Acceptance.**
1. Review two duplicates, choose field values and survivor, then change one reviewed record and require refusal; review again and merge once, inheriting a concurrent stop.


Status row:
| `RECORD-004` | Duplicate merge | published | done | `tests/core/records-merge-review.test.ts` — RECORD-004 RECORD-009 matching names across companies remain review-only and native merges refuse missing and stale reviews (acceptance 1: reviewed survivor and conflicting values, stale refusal without writes, stops on either participant after review, both schedules cancelled, associations and both nonempty timelines transferred once, audited retired identity and replay refusal; signed later retired-email ingress read back on the survivor and both deals; native readback preserves existing signals, recommendations and outreach exactly, with no state created by the merge); `tests/e2e/imports.spec.mjs` — RECORD-008 reviewed vendor files and plain CSV import and undo through the responsive native wizard (native duplicate merge before and after a stop, inherited contactability without a choice, retired identity absent; screens at 1440 and 390). | |

## orbit DATA-002

#### DATA-002 — Contact erasure

**Requirement.** Within 5 minutes of an operator deleting a contact, their email addresses, signal payloads, drafts, message bodies, and the notifications naming them are absent from records, search results, exports, and every later AI or mail request. Erasing a contact, company or deal redacts INTEGRATE-005’s stored notice content and issues tracked chat.delete requests for its bot messages, with each deletion outcome visible. Copies already held outside Slack cannot be recalled. Copies already held outside Slack cannot be recalled.

**Acceptance.**
1. Erasing a contact, company or deal redacts INTEGRATE-005’s stored notice content and issues tracked chat.delete requests for its bot messages, with each deletion outcome visible.
2. Delete a contact containing aliases, imported/captured mail and notes, drafts and transfer copies; verify search/export/AI/mail absence and anonymized audit within five minutes, including replay.


Status row:
| `DATA-002` | Contact erasure | published | partial | `src/core/features/records/data.ts`; `tests/core/contact-erasure.test.ts`; `tests/core/crm-import-erasure.test.ts`; `tests/core/assistance.test.ts` — AI-001 DATA-002 changed or deleted preview context never leaves deployment (confirmed authenticated contact erasure withdraws its saved recipient-bound preview; the original preview ID returns 409 with zero provider calls and unchanged post-erasure AI call, draft and generated explanation inventories; changed-context refusal retained) | Unasserted in the carried evidence: contact erasure redacts stored Slack content; company erasure redacts stored Slack content; deal erasure redacts stored Slack content; provider delete requests tracked; each provider-deletion outcome visible; aliases erased; imported/captured evidence erased; drafts erased; transfer copies withdrawn; AI absence; mail absence; anonymous audit; completion within five minutes; replay cannot recreate erased content. Asserted: search absence; export absence. |

## oncall OC-012

#### OC-012 — Paging off

**Requirement.** Production paging is OFF, and the existing pager is authoritative (RL-1). Every normal-installation delivery attempt refuses with an explanation that an independent standby and a real-phone drill are required. No production paging provider sends, synthetic delivery proof, cron delivery, SMS, voice or push are performed. Escalation policies are inspectable configuration data, not active timers. A labeled demo simulation is not production delivery or acceptance. Native cutover additionally requires OC-026 to OC-029 and OC-038 real-phone and provider-failure acceptance.

**Acceptance.**
1. On a normal installation, each delivery, job, tick, callback and resume door returns the paging-OFF refusal and creates no receipt.
2. Demo simulations are treated as simulations.


Status row:
| `OC-012` | Paging off | published | done | `tests/activation.mjs` — normal-installation refusal loop: delivery, job, tick, callback and resume each explain paging OFF, the existing pager, independent standby and a passed real-phone drill, preserve workspace and paging records and revisions, retain refusal audit, create no receipt and attempt no outbound request; labelled demo HTTP flow: emitted HTML Demo decoration and title plus the workspace demo flag identify all four simulated channel outcomes, with no production receipt or outbound request. |  |

## oncall OC-006

#### OC-006 — Bounded outbound incident effects

**Requirement.** In release 1, only signed OC-053 response events to an endpoint a current administrator explicitly approved may leave the incident workspace (RL-2). No paging provider notification, AI call, production action or Lamp publication occurs in release 1. Configured remote mail sends sign-in links only. Handoffs are minimum summaries with stable identity and visibility; an exported draft is explicitly unreviewed. Source links grant no access. External acceptance, delivery and acknowledgment are distinct later records. Approved OC-053 events are proved under OC-053.

**Acceptance.** On a normal installation with no approved OC-053 endpoint:
1. Coordination and handoff preparation and export create no paging receipt, production action, AI call or external publication.
2. Draft exports remain unreviewed, and source links confer no access.


Status row:
| `OC-006` | Bounded outbound incident effects | published | done | `src/delivery.ts`; `src/handoff-api.ts`; `src/mail.server.mjs`; `tests/runtime.mjs`; `tests/activation.mjs`; `tests/activation.mjs` (PROBE OC-006 1); `tests/activation.mjs` (PROBE OC-006 2); `tests/runtime.mjs` (coordinationJourney) | |

## oncall OC-005

#### OC-005 — Copied runbooks

**Requirement.** Runbooks are copied into the incident at declaration; future service edits never silently rewrite incident instructions. Follow-ups carry owner, due date, open or completed state and completion evidence. Resolved incidents retain open work and editable review.

**Acceptance.**
1. Declare an incident and edit its service runbook, and the copied incident steps remain unchanged; an owned, due-dated action requires completion evidence; unfinished work and the review are retained after resolution.


Status row:
| `OC-005` | Copied runbooks | published | done | `tests/runtime.mjs` — coordinationJourney: declaration copies every service step; an accepted service runbook edit reads back while the declared incident, its copied steps and revision stay unchanged; an owned, due-dated action reads back open with no evidence; completion without a URL is refused with every record unchanged; an evidenced submission awaits human acceptance and is accepted; the unfinished action, copied steps with checklist progress and an editable review are retained after resolution.; `tests/runtime.mjs` (coordinationJourney) | |

## oncall OC-004

#### OC-004 — Incident state transitions

**Requirement.** Incident state transitions are explicit. Acknowledgment assigns responsibility. Resolution requires recovery evidence and a summary, independently of alert recovery. Optimistic revision checks reject stale edits. All accepted changes append an attributed timeline transactionally with state. Any active responder or admin can attest recovery and follow-up evidence; attestation is a human claim, not automatic measurement verification. This resolution rule governs declared incidents; an alert-only page that its source recovers closes without a human summary under OC-056.

**Acceptance.**
1. Declare from admitted alerts and acknowledge; stale and concurrent changes are rejected; the source alert clears; resolution without evidence and a summary is refused; the incident then resolves, and its attributed timeline reads back over HTTP.


Status row:
| `OC-004` | Incident state transitions | published | done | `tests/runtime.mjs` — coordinationJourney: exact admitted alert links, responder commander, stale and concurrent refusal, source recovery independence, unchanged state after recovery without evidence and resolution without a summary, evidenced recovery, resolved state and human-attributed lifecycle history; `tests/triage.mjs` — bulk resolution refuses missing recovery evidence. |  |

## oncall OC-008

#### OC-008 — User-authored records kept

**Requirement.** Authored incident records are kept through restart and export. Ingress accepts bounded structured fields. Provider and incumbent-compatible intake retain bounded structured evidence and no raw bodies under OC-059. Native Events API parsing is bounded to 64 KiB; authenticated oversized, malformed or incomplete native input retains only its first 64 KiB or fewer of exact raw bytes as untrusted incomplete custody under OC-059, never parsed or routed from that prefix. Incumbent-compatible endpoints and provider adapters use the larger per-provider bounds of OC-059. There is no arbitrary remote fetching or runbook execution. Complete retention controls are OC-040.

**Acceptance.**
1. Over-limit and malformed intake is neither parsed nor retained beyond its bound, and over-limit command input is refused.
2. Hostile structured text and runbook links display literally, with no script execution and no fetch.
3. Authored history is preserved after restart and export.


Status row:
| `OC-008` | User-authored records kept | published | done | `src/api.ts`; `src/native-incomplete.ts`; `src/family/response-operations/domain.ts`; `tests/runtime.mjs`; `tests/product-browser-journey.mjs`; `tests/product-browser.mjs` |  |

## oncall OC-011

#### OC-011 — Calendar-day rotations

**Requirement.** Named-zone calendar-day rotations retain fixed primary and backup member slots. Hand-offs use the wall minute plus integer civil days, not fixed elapsed seconds. Repeated minutes explicitly choose earlier, later or reject; nonexistent or rejected boundaries produce visible gaps. Override intervals include their start and exclude their end; an overlap in the same role is rejected. Inactive, viewer and missing members do not shift slots. A duplicated primary and backup assignment leaves the backup unavailable.

**Acceptance.**
1. Save primary and backup schedules and query the HTTP preview across spring and fall DST, ambiguous and nonexistent minutes, override edges and an overlap refusal; inactive, viewer and missing slots are retained as gaps, and duplicate primary and backup responders are detected.


Status row:
| `OC-011` | Calendar-day rotations | published | done | `src/family/response-operations/schedules.ts`; `src/paging-api.ts`; `src/schedule-api.ts`; `tests/activation.mjs` — savedRotationCoverage (run by scheduleCoordination in the changes shard): saves primary and backup rotations over HTTP and reads the HTTP preview and now-next for the fall New York 09:00 hand-off (a 25-hour civil day), a repeated 01:30 and a nonexistent 02:30 under earlier, later and reject with explained gaps, primary and backup override edges (start included, end excluded, a different role may share an interval, a same-role overlap refused with no write, a touching interval accepted), viewer and missing member slots retained as explained gaps with later turns unmoved, and identical primary and backup rotations leaving the backup unavailable; every read leaves all durable rows and outbound requests unchanged. | |

## oncall OC-003

#### OC-003 — Roles and authority

**Requirement.** Incident changes require an active authorized human session or an explicitly scoped OC-053 service-account capability (RL-2). A machine is attributed as a service account and never gains human-session, member-management or human-review authority. Viewer reads; responder coordinates; admin manages services, policies, members and import. All active members see all workspace incident data, and admin, responder and viewer permissions are separate from incident-commander attribution. Ingest credentials grant no read or human authority. Bearer and signed intake return only `duplicate`, the stored event `id`, the source `eventId`, `service`, `observedAt` and `acceptedAt` (201 accepted; 200 deduplicated). Routing decisions, snapshots and alert identities stay behind authorized read and export doors; scoped OC-053 reads disclose only granted service records, and archive and export authority remains session-protected. The status-only stakeholder role, with no incident, alert, runbook or archive access, is specified and tracked in OC-061.

**Acceptance.**
1. Anonymous, expired, revoked, viewer, responder and admin sessions each get their role's outcome on reads, commands, sources and archives, and a real HTTP mutation held open while its author is revoked or downgraded publishes nothing.
2. Minimal intake receipts disclose no private routing data.


Status row:
| `OC-003` | Roles and authority | published | done | `tests/runtime.mjs` — coordinationJourney: session roles, responder workspace reads, attributed acknowledgment and note, administrator refusals, held downgrade and revoke mutations, minimal bearer and signed intake receipts; `tests/member-coordination-browser.mjs` — responder coordinates and reloads attributed history. |  |

## oncall OC-002

#### OC-002 — Routing replay

**Requirement.** Retain the routing policy version and explanation at admission. Release 1 routes coordination ownership, with no timed escalation or paging. Replay is read-only: it returns the historical decision, ownership, policy and evaluation snapshot beside the proposed current decision, in submitted order, and produces no alert, incident or external effect; it does not claim schedule replay. Unmatched signals remain visible and unowned; suppression reasons remain inspectable.

**Acceptance.**
1. Admit a severity-routed event, change the policy and replay it: the immutable admission explanation is compared with the proposed decision in submitted order, and durable state is unchanged before and after (zero writes).


Status row:
| `OC-002` | Routing replay | published | done | `src/api.ts`; `src/orchestration/replay.ts`; `src/family/response-operations/domain.ts`; `tests/runtime.mjs` — coordinationJourney (the OC-002 native replay block): a severity-routed event is admitted under a policy, the policy is changed by an attributed command, and the authorized replay request for a newer-generation event then the original returns decisions in submitted order, each historical decision, owner, policy version and evaluation snapshot equal to the immutable admission record beside the proposed decision under the changed policy, with unchanged application state, workspace revision and permanent audit rows before and after (zero writes), and anonymous and revoked sessions refused with no comparison. | |

## oncall OC-021

#### OC-021 — Move-in preview

**Requirement.** The shared Base import-kit D1 file door accepts PagerDuty, Opsgenie, Splunk On-Call, Jira Service Management Ops and Better Stack saved exports. Preview writes zero native objects; retained upload custody, plan snapshots and grant/bookkeeping rows exist. A current administrator must review the exact source fingerprint before applying. Users are matched by normalized email and grant no login rights; schedules and policy data stay paused. Original bytes, unmapped fields, rejected objects, the journal and provenance are retained. Every unmappable rotation or rule is named; no partial rotation approximation is allowed. Missing detail exports reject. No account or API calls or routing credentials are activated. Complete incumbent migration and real-export acceptance remain OC-038. The shared file door and its proof limits are documented in [Move-in](docs/move-in.md#shared-file-door-implementation-and-proof-limits).

**Acceptance.**
1. Following the provider export instructions, saved Opsgenie and PagerDuty list and detail bundles preview with zero native-object writes, exact rejected and unmapped rules and fingerprints are shown, and the apply stays paused, with people and services explicitly mapped before native coverage is adopted.


Status row:
| `OC-021` | Move-in preview | published | done | `src/move-in/owner-door.ts`; `src/move-in/source.ts`; `src/move-in/adoption.ts`; `tests/activation.mjs`; `tests/import-door.mjs`; `tests/product-browser-journey.mjs`; `tests/import-door.mjs` |  |

## oncall OC-022

#### OC-022 — Resume and undo

**Requirement.** Journaled imports support bounded resume after restart and explicit undo. SQL checks current actor, session and admin authority inside publication and reversal. Changed source identities require a reviewed catch-up through the shared door; outside that lifecycle they conflict. Duplicate unchanged sources are idempotent. Undo removes only unchanged attributed native objects; edits are preserved with an explicit conflict. Invalid input or failed publication leaves prior committed state unchanged; partial progress remains visible and resumable.

**Native proof.** In `tests/activation.mjs`, the per-vendor “unfinished checkpoint” journey applies one bounded batch of a PagerDuty or Opsgenie saved file, proves its checkpoint is strictly inside the reviewed total, restarts the Worker, and completes the same job and fingerprint. It compares the committed prefix unchanged, checks each remaining object exists once, retries the completed job without new effects, and undoes exactly that import while native membership and paging state remain unchanged. The injected native SQL failure and expired publication lease legs distinguish rolled-back publication from retained partial effects that require explicit rollback. The same file's saved-response journeys cover unchanged replay, and its native-edit and later-import journeys preserve records under `NATIVE_EDIT_CONFLICT` and `IMPORT_SUPERSEDED`, including revoked-session refusal. In `tests/import-door.mjs`, the PagerDuty account HTTP journey revokes Business import authority inside the committing batch, injects publication failure, and checks unchanged native records; its identical-byte and reviewed catch-up journeys cover unchanged and changed identities. These are synthetic saved-file proofs with imported objects inactive and paging OFF; live account conversion and cutover remain with OC-038 and OC-074.

**Acceptance.**
1. Apply, interrupt and restart, resume and undo both vendor imports over HTTP; revoke authority at publication, inject an SQL failure, replay unchanged and changed identities, and preserve native edits as named undo conflicts.


Status row:
| `OC-022` | Resume and undo | published | done | `src/move-in/owner-door.ts`; `src/move-in/api.ts`; `src/move-in/journal.ts`; `tests/activation.mjs`; `tests/import-door.mjs`; `tests/import-door.mjs`; `tests/import-door.mjs`; `tests/activation.mjs` (OC-022 pagerduty: unfinished checkpoint); `tests/activation.mjs` (OC-022 opsgenie: unfinished checkpoint); `tests/import-door.mjs` (OC-038 PagerDuty account HTTP) | |

## spool ERR-003

#### ERR-003 — Scrub before storage

**Requirement.** Apply the native allowlist, bounded text, query/fragment removal and sensitive-text scrubbing before persistence. Native envelopes contain no headers, cookies, request bodies or personal user identity; the `user` interface that unmodified Sentry SDKs send is governed by SDK-008's project identity policy instead. An optional random installation identifier supports bounded exposure measurement; it is never a name or address. Telemetry, source and notes are untrusted data and cannot authorize execution. The event fields SDK-010 keeps from unmodified Sentry SDKs (frame local variables, SDK-sent source context lines, exception values, tags, contexts, request, extra and thread stacks) pass through these scrubbers and SDK-003's server-side rules before storage, and default secret names are masked inside frame variables. Default protection persists when SDK-003 and CTX-002 introduce opt-in context; those captures require their own field policies and previews. Redaction does not promise removal of arbitrary semantic personal data.

**Acceptance.** Privacy canaries ingested through public ingest:
1. are absent from stored events;
2. are absent from issue views;
3. are absent from evidence packets;
4. are absent from archives;
5. are absent from alert delivery content;
6. while the ordinary diagnostic content beside them survives.


Status row:
| `ERR-003` | Scrub before storage | published | done | `src/domain/privacy.ts`; `src/domain/scrub.ts`; `tests/privacy-table.mjs` |  |

## spool ERR-004

#### ERR-004 — Separated authority

**Requirement.** Every private API/document checks the current owner session or its exact ingest, deploy or read-only project grant itself. Cookie writes enforce same origin. Revocation and identity fencing take effect on the next request; confidential maps are never public. Ingest cannot read, deploy can only register releases/upload artifacts and record deployment starts/callbacks, and read-only agent grants cannot mutate. TEAM-001 extends this model to collaborative membership without broadening existing credentials.

**Acceptance.** Each private transport:
1. refuses an anonymous call;
2. refuses a wrong-scope grant;
3. refuses a foreign-project grant;
4. refuses a revoked grant on the next request;
5. refuses an identity-fenced grant;
6. leaves state unchanged after every denied write;
7. and a direct map URL reveals no private bytes.


Status row:
| `ERR-004` | Separated authority | published | done | `src/domain/api.ts`; `src/domain/credential-fence.ts`; `src/domain/agent-access.ts`; `tests/agent-handoff.mjs`; `tests/dev-credentials.mjs` |  |

## spool ERR-002

#### ERR-002 — Atomic acceptance

**Requirement.** Accepted means a sanitized occurrence, its group aggregate and its local new/regression alert commit atomically. Retry identity is project plus event ID and SHA-256 of canonical original accepted JSON before scrubbing: identical retry never increments, changed raw content conflicts even if its sanitized result matches. Raw bytes are not retained. Group algorithm version and basis remain inspectable.

**Acceptance.** Through public ingest:
1. An event ingested twice yields one occurrence and one aggregate increment.
2. It raises one local alert.
3. The same event ID with a changed raw secret is an explicit conflict, with no partial rows.


Status row:
| `ERR-002` | Atomic acceptance | published | done | `src/domain/admission.ts`; `src/domain/capture.ts`; `tests/product-runtime.mjs` |  |

## spool ERR-006

#### ERR-006 — Audited triage and regression

**Requirement.** Revision-checked open, acknowledged, resolved and suppressed changes are audited. An issue resolved in its current release reopens as a regression on a recurrence in a later release; delayed older-release events cannot invent one. For native version-1 events the order is the registered sequence, never guessed semver; Sentry events follow the project's stated rule in SDK-028, including releases later enriched by registration. SDK-009 carries resolve in the next or a named release and plain Resolve, and plain Resolve regresses on the next accepted event in any release; TEAM-004 inherits resolution from a commit's release, and TEAM-003 carries same-release recurrence policies, bulk actions and collaborative triage. Recognized JavaScript bundle hash suffixes do not split grouping; native anchors and reported frames stay immutable. Corrections retain exact occurrence provenance and reversible fenced apply/undo.

**Acceptance.**
1. A captured issue resolved in its current release reopens as a regression when its fingerprint arrives in a newer release.
2. A later event from an older release does not reopen it.
3. Split and merge previews through the owner HTTP door and the issue view move nothing.
4. Split and merge apply and undo through the owner HTTP door and the issue view.
5. A stale revision is refused.
6. Original membership stays inspectable after apply and undo.


Status row:
| `ERR-006` | Audited triage and regression | published | done | `tests/product-runtime.mjs` — emitted Worker and D1 acceptance (1: newer-release reopening and one regression alert; 2: strictly older capture retains the newer resolution; 5: stale triage refusal); `tests/alerts-native.mjs` — native scheduled event delivers a later-release regression with silent local mail once (1); `tests/operator-flow.mjs` — operatorFlow (3: inert HTTP split and merge previews; 4: fenced HTTP apply and undo; 5: stale correction refusal; 6: immutable originals); `tests/triage-journey.mjs` — journey calling `tests/operator-ui.mjs` — operatorUi at 1440 and 390 (3: inert split and merge previews; 4: exact reviewed split and merge apply and undo; 6: inspectable original membership); `tests/operator-archive.mjs` — operatorRetentionAndErasure (expired occurrence and erasure fences) | |

## spool ERR-007

#### ERR-007 — Sanitized evidence packet

**Requirement.** A compatible v1 packet exposes issue/lifecycle/grouping, retained release sequence and per-event release/build/environment, generated/original coordinates, immutable diagnostics beside current lookup, links and coded coverage gaps. UTF-8 JSON is bounded to 256 KiB and ten events, removing oldest events first and naming included/available counts even if none fit. It excludes source snippets, sourcesContent and artifact bytes. It carries the latest computed repair observation and newest three owner-recorded repairs, with omitted history named. CLI and stdio MCP keep exact-project read authority and untrusted/no-execution labels; they cause no model egress.

**Acceptance.**
1. The same packet reads through HTTP, the CLI and the official MCP transport, with equal projections.
2. At the size boundary the oldest events are removed first and the included and available counts are named.
3. At the retention, import and loss boundaries the packet carries each coded coverage gap.
4. The packet carries no secrets.
5. It carries no source bytes.
6. Reading it performs no write.
7. A cross-project read is refused.


Status row:
| `ERR-007` | Sanitized evidence packet | published | done | `src/domain/packet.ts`; `src/domain/agent-projection.ts`; `packages/agent/bin/spool-agent.mjs`; `tests/agent-handoff.mjs` Agent handoff public journey: complete HTTP, CLI JSON, embedded Markdown JSON and official MCP equality; unchanged archived rows; next-call revocation. `tests/agent-handoff/caps.mjs` capProof: UTF-8 byte boundary, newest-first omission and included and available counts. `tests/agent-handoff.mjs` gaps: retention, import and loss. `tests/agent-handoff/packet.mjs` compatible and noSecrets: secret and confidential-source exclusion. `tests/agent-handoff/scope.mjs` scopeProof: exact-project reads and cross-project refusal. |  |

## spool ERR-008

#### ERR-008 — Loss counters and repair observation

**Requirement.** Expose windowed accepted/rejected/budget outcomes, SDK-reported discards by category and reason, and unknown pre-transport loss. Reported discarded errors are a loss input and prevent a quiet feed from proving a repair; other discarded categories do not imply lost errors. Only the owner records revision-checked repair links, scrubbed notes, checks, approval/merge/deploy facts and an exercised-flow record. Links are HTTPS origin/path text and never fetched. Manual repair writes send no notifications or external work. Compute recur/reasoned inconclusive/no-recurrence-after-exercise from stored release sequence, maps, events, exercise and loss; list older-release events separately. Missing exercise, capture, map, exposure or retention yields inconclusive. Never label a quiet feed fixed. Repair recurrence counts retained native admission membership, current membership and exact occurrence membership during the repair's lifetime, even after further corrections or undo; any applied or undone correction involving the issue leaves a `grouping_changed` coverage gap, so without retained recurrence its observation is inconclusive. AI-004 adds rate-based live proof.

**Acceptance.**
1. The owner records a repair through the HTTP door.
2. Every project-grant write to repairs is denied, with the rows unchanged.
3. A deployed repair with no events reads inconclusive, with a named reason.
4. A healthy exercised window reads no recurrence after exercise.
5. An older-release event is listed separately and does not count as recurrence.
6. A loss case reads inconclusive.
7. A recurrence reads recurred.
8. Manual repair records send no notification and start no external work.


Status row:
| `ERR-008` | Loss counters and repair observation | published | done | `src/domain/repairs/observation.ts`; `src/domain/exposure/proof.ts`; `src/domain/sentry/client-reports.ts`; `tests/client-report-flow.mjs`; `tests/repair-recovery.mjs` |  |
