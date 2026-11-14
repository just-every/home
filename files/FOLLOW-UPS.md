# Follow-ups

Report time: 2026-11-14T10:17:05Z.

No new C findings. Known context from the brief does not count as a new finding or change this verdict.

## Out of scope

The following eight HappyToHelp promises were already present on main and remain byte-for-byte unchanged. The released source status table marks them partial because its named evidence is incomplete, rather than proving these sentences false. Retain the existing copy follow-up; do not promote implementation status.

| Clause | Exact unchanged JE sentence | Released status |
| --- | --- | --- |
| CONVERSATION-001 | Customer and agent messages are stored once, and two conflicting final replies can never both be accepted. | partial |
| DELIVERY-001 | Messages are saved before they are shown live, so a reload or dropped connection recovers everything that was sent, and an AI draft never becomes a final answer until it is safely accepted. | partial |
| OUTCOMES-001 | Customers can rate a resolution with a thumbs up or down and a short comment, and comments are removed if the contact is erased. | partial |
| AI-001 | With no AI key, the AI is simply not assigned to new conversations and your team keeps them; your company's policy sets AI spending limits and uncertain attempts are never silently repeated. | partial |
| DELEGATION-001 | Revoking a computer's access ends its authority at once, and HappyToHelp never claims that work already running there was stopped. | partial |
| CONNECTIONS-001 | API tokens have chosen scopes, are shown once, are stored hashed and can expire; an unclear webhook result is not sent again. | partial |
| IDENTITY-003 | Teammates can sign in with an authenticator app or a security key plus one-time recovery codes, and an owner can require it for everyone or by role. | partial |
| PORTABILITY-001 | You can export your conversations, files, contacts, help articles, settings and history in one checked archive and restore it into a clean installation; sign-ins and provider secrets are left out. | partial |

The brief also retains Terrace trust wording, Uptime/Lamp partial-evidence promises and Spool ERR-006 as pre-existing context. No wording or implementation-status edit in this candidate touches them. They were not audited as new obligations.
