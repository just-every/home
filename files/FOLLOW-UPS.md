# FOLLOW-UPS: HappyToHelp ERR-006

Author: Run Edit Run fleet. Recorded 2026-11-21T14:37:00Z.

Eight known partial-evidence promises, retained unchanged from main. These are the brief-required copy follow-ups, not newly demonstrated false behaviour or new security findings. The source status gaps qualify the evidence, not implementation truth. No new A, B or BAR finding.

## FOLLOW-UP C: ERR-006 / CONVERSATION-001

Exact JE sentence: “Customer and agent messages are stored once, and two conflicting final replies can never both be accepted.”

Released source status: partial.

Source gap: Main re-audit: unasserted in the cited Evidence set: model writer race; import writer race; lost-response final-reply race. Asserted: competing visitor revisions admit one writer; exact duplicate replay; changed replay refused; stale operator frontier refused; operator admission; erased message identity; erased message revision; erased message content removed; erased transcript frontier. Prior-reference qualification (before test consolidation): Carried-done audit: unasserted in the cited Evidence set: model writer race; import writer race; lost-response final-reply race. Asserted: competing visitor revisions admit one writer; exact duplicate replay; changed replay refused; stale operator frontier refused; operator admission; erased message identity; erased message revision; erased message content removed; erased transcript frontier.

Disposition: carry forward the existing evidence qualification; no copy rewrite authorized and no false claim established.

## FOLLOW-UP C: ERR-006 / DELIVERY-001

Exact JE sentence: “Messages are saved before they are shown live, so a reload or dropped connection recovers everything that was sent, and an AI draft never becomes a final answer until it is safely accepted.”

Released source status: partial.

Source gap: Carried-done audit: unasserted in the cited Evidence set: widget reconnect replay; operator reconnect replay; runtime restart replay; committed messages recovered; committed attachments recovered; unauthorized replay denied; superseded provisional AI never becomes final. The cited registry invokes the delivered workflow, but its helper assertions are not named in this clause’s old Evidence set; no direct outcome assertion is claimed here.

Disposition: carry forward the existing evidence qualification; no copy rewrite authorized and no false claim established.

## FOLLOW-UP C: ERR-006 / OUTCOMES-001

Exact JE sentence: “Customers can rate a resolution with a thumbs up or down and a short comment, and comments are removed if the contact is erased.”

Released source status: partial.

Source gap: Main re-audit: unasserted in the cited Evidence set: rerating retains history; other actors cannot rate; revoked session cannot rate; reopened cycle cannot use previous rating; erasure redacts comment history. Asserted: close and initial eligible rating; rerating preserves latest value; expired session cannot rate; second close has a distinct cycle; operator reads past-cycle feedback after reopen; erasure redacts current comments; human outcome from visible answer; assisted outcome from visible answer; AI-only outcome from visible answer; missing provenance stays unknown.

Disposition: carry forward the existing evidence qualification; no copy rewrite authorized and no false claim established.

## FOLLOW-UP C: ERR-006 / AI-001

Exact JE sentence: “With no AI key, the AI is simply not assigned to new conversations and your team keeps them; your company's policy sets AI spending limits and uncertain attempts are never silently repeated.”

Released source status: partial.

Source gap: Carried-done audit: unasserted in the cited Evidence set: configured suggestion; configured reply; normalized stream events; per-round usage; bounded context; bounded tools; policy budgets; missing-provider error; durable daily skip; crash never replays; ambiguous attempt never replays. The cited registry invokes the delivered workflow, but its helper assertions are not named in this clause’s old Evidence set; no direct outcome assertion is claimed here.

Disposition: carry forward the existing evidence qualification; no copy rewrite authorized and no false claim established.

## FOLLOW-UP C: ERR-006 / DELEGATION-001

Exact JE sentence: “Revoking a computer's access ends its authority at once, and HappyToHelp never claims that work already running there was stopped.”

Released source status: partial.

Source gap: Carried-done audit: unasserted in the cited Evidence set: packaged connector pairing; read-only investigation; separately authorized child fix; distinct read-only observation; human Send; exact-request replay; stale work refused; revoked work refused; offline work refused; unverified work refused; uncertain work not replayed; resolve versus resolve-and-reply; revocation does not assert cancellation. The cited registry invokes the delivered workflow, but its helper assertions are not named in this clause’s old Evidence set; no direct outcome assertion is claimed here.

Disposition: carry forward the existing evidence qualification; no copy rewrite authorized and no false claim established.

## FOLLOW-UP C: ERR-006 / CONNECTIONS-001

Exact JE sentence: “API tokens have chosen scopes, are shown once, are stored hashed and can expire; an unclear webhook result is not sent again.”

Released source status: partial.

Source gap: Main re-audit: unasserted in the cited Evidence set: issued token has exact scopes; issued token has expiry; show-once secret; hashed secret storage; unsafe literal destination refused; outgoing byte bound. Asserted: scoped native API use; token revocation; token expiry; erasure replay fences; signed events; Slack escaped customer text; redirect target never requested; declared response bound; streamed response bound; timeout remains uncertain; server error remains uncertain; uncertain work never replays; rate-limit retry retains same event. Prior-reference qualification (before test consolidation): Carried-done audit: unasserted in the cited Evidence set: show-once secret; hashed secret storage; unsafe literal destination refused. Asserted: issued token has exact scopes; issued token has expiry; scoped native API use; token revocation; token expiry; erasure replay fences; signed events; Slack escaped customer text; redirect target never requested; outgoing byte bound; declared response bound; streamed response bound; timeout remains uncertain; server error remains uncertain; uncertain work never replays; rate-limit retry retains same event.

Disposition: carry forward the existing evidence qualification; no copy rewrite authorized and no false claim established.

## FOLLOW-UP C: ERR-006 / IDENTITY-003

Exact JE sentence: “Teammates can sign in with an authenticator app or a security key plus one-time recovery codes, and an owner can require it for everyone or by role.”

Released source status: partial.

Source gap: Carried-done audit: unasserted in the cited Evidence set: TOTP enrollment; role policy forces factor enrollment; single-use recovery codes; missing factor refused; wrong factor refused; replayed TOTP refused; used recovery refused; passkey sign-in; owner reset needs own step-up; reset notification; reset audit; refund needs recent step-up; export needs recent step-up; installation owner recovery; existing no-factor sessions revoked. The direct enrollment call asserts only HTTP 201. Enrollment state and recovery-code assertions are in `tests/helpers/identity/two-factor.mjs`, outside the carried Evidence set.

Disposition: carry forward the existing evidence qualification; no copy rewrite authorized and no false claim established.

## FOLLOW-UP C: ERR-006 / PORTABILITY-001

Exact JE sentence: “You can export your conversations, files, contacts, help articles, settings and history in one checked archive and restore it into a clean installation; sign-ins and provider secrets are left out.”

Released source status: partial.

Source gap: Carried-done audit: unasserted in the cited Evidence set: nonempty target refused. Asserted: source destroyed before restore; clean independent install; each populated portable business record; native support store equality; every attachment byte; R2 metadata equality; erasure fences preserved; corrupt archive refused; oversized archive refused; refusal has no partial restore; restored work is inert; Durable Object history captured; interrupted business action state retained inertly.

Disposition: carry forward the existing evidence qualification; no copy rewrite authorized and no false claim established.

## Out of scope

No new D/E findings. Uptime/Lamp partial-evidence promises, Spool ERR-006 and Terrace trust wording remain outside this touched-copy review as the brief directs.
