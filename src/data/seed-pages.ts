/**
 * The content of each seed's own page (/<slug>), read from each seed's repo
 * (README, CONTRACT.md, seed.json) on 17 Oct 2026: what it does, what it
 * promises, what it moves in and where it runs. Its version is the repo's
 * latest release tag, kept current by `npm run seeds:sync`, which also
 * reports a changed README, CONTRACT.md or seed.json for a rewrite. Facts
 * about the product's look and card (mark, colours, line, reel) stay in
 * seeds.ts and upcoming.ts; src/components/seed/model.ts joins the two. An
 * empty `contractUrl` or `version` means the repo has none yet.
 */
export type PromiseCategory =
  | 'privacy'
  | 'access'
  | 'history'
  | 'undo'
  | 'export'
  | 'import'
  | 'alerts'
  | 'evidence'
  | 'money'
  | 'ai'
  | 'erasure'
  | 'schedule'
  | 'approval'
  | 'security'
  | 'reliability'
  | 'other';

export interface SeedPromise {
  /** The contract's own id, e.g. STATE-001; empty where the contract numbers none. */
  id: string;
  text: string;
  category: PromiseCategory;
}

export interface SeedPageContent {
  slug: string;
  summary: string;
  does: string[];
  promises: SeedPromise[];
  /** What the seed imports from; empty when it names none. */
  moveIn: string[];
  runsOn: string;
  version: string;
  contractUrl: string;
  seoTitle: string;
  seoDescription: string;
}

export const seedPageContent: SeedPageContent[] = [
  {
    slug: 'uptime',
    summary:
      'Uptime watches your websites and APIs on a schedule and tells you only when a failure is confirmed. It never calls a missing check healthy, and it keeps the evidence behind every incident. Alerts go to email, Slack or a signed webhook.',
    does: [
      'Check web pages and API responses for the right status, text, headers, data values and speed',
      'Check that a server port answers, that DNS records are right, and that SSL certificates and domain registrations are not about to expire',
      'Choose how many failed checks in a row open an incident and how many passes close it',
      'Show a time as Unknown when no check arrived, instead of guessing it was fine',
      'Watch cron jobs and nightly backups through heartbeat check-ins',
      'Alert you by email, Slack or a signed webhook, and run an alert drill to learn whether a message really reaches someone',
      'Pause alerts during planned maintenance windows',
      'Run checks from a machine on your own network and export your monitors, evidence and alert history any time',
    ],
    promises: [
      {
        id: 'STATE-001',
        text: 'One failed check never raises an alarm. A monitor is called Failing only after confirmation, a missing check shows as Unknown, and it recovers only on fresh passing checks.',
        category: 'reliability',
      },
      {
        id: 'EVIDENCE-001',
        text: 'Every scheduled check and every retry is kept with its time, result and error type, and a retry never erases an earlier failure.',
        category: 'evidence',
      },
      {
        id: 'NOTIFY-001',
        text: "Only confirmed incident changes send automatic alerts, and a test send never changes a monitor's status.",
        category: 'alerts',
      },
      {
        id: 'DELIVERY-001',
        text: "Each alert gets one automatic send per destination where a repeat could double up, an unclear outcome is not sent again, and 'accepted' is never reported as 'read'.",
        category: 'alerts',
      },
      {
        id: 'DRILL-001',
        text: "An alert drill sends a clearly marked test with a one-time confirmation link, and a confirmation is the recipient's own report, never proof of monitoring.",
        category: 'alerts',
      },
      {
        id: 'TLS-001',
        text: 'Certificate checks look at trust, host name and expiry from each location, warn in stages before a certificate runs out, and clear only after a new valid certificate is seen.',
        category: 'alerts',
      },
      {
        id: 'MAINT-001',
        text: 'Planned and recurring maintenance windows use US time zones and daylight saving, and keep the underlying check results so reports still show what happened.',
        category: 'schedule',
      },
      {
        id: 'ARCHIVE-001',
        text: 'A backup restores only into an empty installation: monitors come back paused, destinations disabled and old alerts held back.',
        category: 'import',
      },
      {
        id: 'NETWORK-001',
        text: 'Every address and redirect is validated, unsafe addresses are refused, and a redirect that downgrades from HTTPS is rejected.',
        category: 'security',
      },
      {
        id: 'ERASURE-001',
        text: 'An owner can erase a monitor with its evidence, an alert destination, or an operator, and gets a receipt of what was removed.',
        category: 'erasure',
      },
    ],
    moveIn: ['Pingdom', 'UptimeRobot', 'Better Stack Uptime', 'Site24x7'],
    runsOn: 'Your computer, or your own Cloudflare account',
    version: 'v0.4.3',
    contractUrl: 'https://run-uptime.com/contract',
    seoTitle: 'Uptime: free, open-source alternative to Pingdom',
    seoDescription:
      'Uptime checks your websites, APIs, DNS and certificates, confirms failures before alerting, and tells you by email, Slack or webhook.',
  },
  {
    slug: 'happytohelp',
    summary:
      'HappyToHelp is a customer support desk where your own Codex or Claude investigates the problem, fixes it and drafts the reply, and you press Send. It brings a website chat widget, a shared inbox for chat and email, a help center and replies drafted from your own articles into one place. You can try it beside your current helpdesk and bring your history over when you are ready.',
    does: [
      "Let your own Codex or Claude, running on your computer, investigate a customer's problem, fix it and draft the reply for you to send",
      'Put a chat widget on your website that offers a hand when a visitor seems stuck',
      'Answer chat and email from one shared inbox, with customer details beside each conversation, assignment rules, saved-reply macros, snoozing and merging of duplicates',
      'Publish a searchable help center that customers use to find answers themselves',
      'Get suggested replies drafted from your own articles, with the source shown',
      'Collect a thumbs up or down on resolved conversations and see reports you can export',
      'Connect with scoped API tokens, signed webhooks and Slack',
      'Bring over your help center and history from Zendesk, Help Scout, Intercom or Freshdesk while your current helpdesk keeps running',
    ],
    promises: [
      {
        id: 'MOVE-IN-001',
        text: 'Imports are reviewed before anything is written, send no messages to your customers, can be undone as a whole, and keep source dates, private notes and publication state.',
        category: 'import',
      },
      {
        id: 'CONVERSATION-001',
        text: 'Customer and agent messages are stored once, and two conflicting final replies can never both be accepted.',
        category: 'reliability',
      },
      {
        id: 'DELIVERY-001',
        text: 'Messages are saved before they are shown live, so a reload or dropped connection recovers everything that was sent, and an AI draft never becomes a final answer until it is safely accepted.',
        category: 'reliability',
      },
      {
        id: 'OUTCOMES-001',
        text: 'Customers can rate a resolution with a thumbs up or down and a short comment, and comments are removed if the contact is erased.',
        category: 'erasure',
      },
      {
        id: 'REPORTS-001',
        text: 'Reports use your own calendar and time zone, count each conversation once, and export to a spreadsheet file that is safe to open.',
        category: 'export',
      },
      {
        id: 'AI-001',
        text: 'With no AI key, the AI is simply not assigned to new conversations and your team keeps them; automatic AI work has daily limits and uncertain attempts are never silently repeated.',
        category: 'ai',
      },
      {
        id: 'DELEGATION-001',
        text: "Revoking a computer's access ends its authority at once, and HappyToHelp never claims that work already running there was stopped.",
        category: 'approval',
      },
      {
        id: 'CONNECTIONS-001',
        text: 'API tokens have chosen scopes, are shown once, are stored hashed and can expire; an unclear webhook result is not sent again.',
        category: 'security',
      },
      {
        id: 'IDENTITY-003',
        text: 'Teammates can sign in with an authenticator app or a security key plus one-time recovery codes, and an owner can require it for everyone or by role.',
        category: 'security',
      },
      {
        id: 'PORTABILITY-001',
        text: 'You can export your conversations, files, contacts, help articles, settings and history in one checked archive and restore it into a clean installation; sign-ins and provider secrets are left out.',
        category: 'export',
      },
    ],
    moveIn: ['Zendesk', 'Help Scout', 'Intercom', 'Freshdesk'],
    runsOn: 'Your computer, or your own Cloudflare account',
    version: 'v0.4.12',
    contractUrl: 'https://happytohelp.com/contract',
    seoTitle: 'HappyToHelp: free, open-source alternative to Zendesk',
    seoDescription:
      'HappyToHelp is a free support desk: your Codex or Claude fixes the problem and drafts the reply, you press Send. A Zendesk, Intercom and Freshdesk alternative.',
  },
  {
    slug: 'nook',
    summary:
      'Nook is a team chat where a message can become a decision or a request, and everyone can see who is on it. It has public, private and direct channels with threads, one list of what needs you, and quiet time when you need to focus. You can keep Slack running while your team tries it.',
    does: [
      'Talk in public channels, private channels and direct messages, with replies kept in threads and emoji reactions',
      'Turn a message into a recorded decision or a request that only the person asked can accept',
      'See requests for you, mentions and replies you follow in one list, and go quiet for an hour when you need to focus',
      'Attach images, PDFs and text files to messages, kept private to the conversation',
      'Search any message you are allowed to read, and set reminders or schedule messages for later',
      'Invite teammates and choose which channels each person sees',
      'Opt in to email and phone notifications for mentions and urgent requests',
      'Bring in your Slack history as read-only channels, and back everything up to one file you can restore later',
    ],
    promises: [
      {
        id: 'NOOK-001',
        text: "Every action checks who you are and whether you are in that conversation; workspace admins cannot read other people's direct messages.",
        category: 'access',
      },
      {
        id: 'NOOK-002',
        text: 'A message is saved once however many times a send is retried, and edits never overwrite a newer version.',
        category: 'reliability',
      },
      {
        id: 'NOOK-003',
        text: "Removing someone from a channel cuts their reading, writing and search access immediately. New members can see a channel's whole history.",
        category: 'access',
      },
      {
        id: 'NOOK-004',
        text: 'A request becomes accepted only through the person it was assigned to, and a completed item is reported as completed, never as verified.',
        category: 'approval',
      },
      {
        id: 'NOOK-010',
        text: "If a request's wording or deadline materially changes, the assignee must accept the new version again.",
        category: 'approval',
      },
      {
        id: 'NOOK-013',
        text: 'Muting hides routine updates but never an explicit mention or a request to you.',
        category: 'alerts',
      },
      {
        id: 'NOOK-014',
        text: 'Email is off for everyone until they turn it on, goes only to your own sign-in address, and covers only mentions, urgent requests and commitments.',
        category: 'alerts',
      },
      {
        id: 'NOOK-012',
        text: 'Attachments are kept private and are checked for membership on every download; only text, PNG, JPEG and PDF files are accepted.',
        category: 'security',
      },
      {
        id: 'NOOK-009',
        text: 'Backups include every conversation, decision, file and attention choice with integrity checks, and leave out live sign-ins.',
        category: 'export',
      },
      {
        id: 'ERASURE-001',
        text: 'Owners and admins can erase messages and members, but never the last owner, and never through a door into private direct messages.',
        category: 'erasure',
      },
    ],
    moveIn: [
      'Slack',
      'Microsoft Teams',
      'Google Chat',
      'Campfire',
      'Zulip',
      'Mattermost',
    ],
    runsOn: 'Your computer, or your own Cloudflare account',
    version: 'v0.5.0',
    contractUrl: 'https://run-nook.com/contract',
    seoTitle: 'Nook: free, open-source alternative to Slack',
    seoDescription:
      'Nook is a free team chat where a message becomes a decision or a request, and everyone sees who is on it. A Slack and Microsoft Teams alternative.',
  },
  {
    slug: 'lamp',
    summary:
      "Lamp is a status page that tells your customers who is affected, how badly and what still works. You write each update once, and the page, the feed, the site banner and subscriber emails all carry the same words. Your page keeps answering even when Lamp's own database is down.",
    does: [
      "Show a status page with each component's state, a 90-day record and a plain-words account of every incident",
      'Write each update once and send it to the page, an Atom feed, a site banner and subscriber email together, with a preview first',
      "Keep the page answering from the last known state, labelled with its age, when Lamp's own database is down",
      'Let subscribers choose the components they follow and unsubscribe in one click, with no cookies and no CAPTCHA',
      'Run planned maintenance that starts, finishes and notifies subscribers by itself',
      'Turn alerts from your monitoring tools into one draft incident per problem, which you review and publish',
      'Publish post-incident reports, post to Slack or Microsoft Teams, send signed webhooks and keep a delivery log',
      'Use your own domain and colours, and export everything whenever you like',
    ],
    promises: [
      {
        id: 'INTAKE-002',
        text: 'A monitoring alert only creates a draft. Nothing reaches customers until a person publishes it.',
        category: 'approval',
      },
      {
        id: 'INCIDENT-004',
        text: 'A published update is never edited or deleted; a correction is a new update and both stay on the public timeline.',
        category: 'history',
      },
      {
        id: 'UPDATE-008',
        text: 'Publishing is a single step: the update and the list of people to notify are saved together.',
        category: 'reliability',
      },
      {
        id: 'NOTIFY-009',
        text: "Publishing still works while email, the queue or a subscriber's endpoint is failing.",
        category: 'reliability',
      },
      {
        id: 'UPTIME-001',
        text: 'Uptime is rounded down, so a period with any downtime never shows 100 percent.',
        category: 'evidence',
      },
      {
        id: 'PAGE-006',
        text: 'If the database or queue is down, the public page, feed and banner keep serving the last known state, labelled as such, and never show a false all-clear.',
        category: 'reliability',
      },
      {
        id: 'PAGE-013',
        text: 'The public page sets no cookies, has no tracking or consent banner, and loads nothing from other sites.',
        category: 'privacy',
      },
      {
        id: 'NOTIFY-004',
        text: 'The delivery log records whether each message was delivered, bounced or failed, and nothing tracks whether anyone read it.',
        category: 'privacy',
      },
      {
        id: 'MOVE-002',
        text: 'Moving in keeps original update times, notifies nobody, and brings email subscribers over as pending until they confirm.',
        category: 'import',
      },
      {
        id: 'SUB-006',
        text: 'Every notification email carries a one-click unsubscribe.',
        category: 'alerts',
      },
    ],
    moveIn: [
      'Atlassian Statuspage',
      'Status.io',
      'Better Stack',
      'Instatus',
      'incident.io',
      'Sorry',
    ],
    runsOn: 'Your computer, or your own Cloudflare account',
    version: 'v1.10.0',
    contractUrl: 'https://run-lamp.com/contract',
    seoTitle: 'Lamp: free, open-source alternative to Atlassian Statuspage',
    seoDescription:
      'Lamp is a free status page that tells customers who is affected and what still works, and keeps answering when your own systems are down.',
  },
  {
    slug: 'cradle',
    summary:
      'Cradle brings your records, views and business applications together in one private workspace. You build your own tables with linked records, look at the same data as a grid, board or form, and let routine work run on its own. Everything works the same with AI turned off.',
    does: [
      'Build tables with typed fields, link records across tables and look values up through the link, starting from a template or a blank table',
      'See one set of records as a grid, board or form, filter, group and sort, and save views you reopen in one click',
      'Edit the grid like a spreadsheet, with inline edits and copy and paste to and from Excel or Google Sheets',
      'Preview every structure change, with the fields and records it touches and a recovery export for removed values, before you apply it',
      'Import a CSV and see what will be created, updated or rejected before anything is saved, and export any view to CSV',
      'Run automations on a product event or a schedule, with every run recorded and notifications in the app and by email that respect quiet hours',
      'Limit which records and fields each role can see or change, and see who changed what on every record',
      'Ask for an optional read-only AI summary that never edits a record',
    ],
    promises: [
      {
        id: 'RECORDS-002',
        text: 'Changes to your tables show an impact preview first, and the preview is rechecked against current data when you accept it, so out-of-date changes do not apply.',
        category: 'approval',
      },
      {
        id: 'RECORDS-005',
        text: 'Importing shows every conversion, rejected row and ambiguous link before anything is written, and can be undone for imported records you have not edited.',
        category: 'import',
      },
      {
        id: 'RECORDS-006',
        text: 'You can download your complete base, with tables, records, links and views, and a full installation archive from Settings.',
        category: 'export',
      },
      {
        id: 'RECORDS-007',
        text: "An agent's proposed change is inert text until the owner adopts it, and the agent's key can never read or write your records.",
        category: 'ai',
      },
      {
        id: 'AI-003',
        text: 'AI never changes a record, sends a notification or saves a view on its own.',
        category: 'ai',
      },
      {
        id: 'AUTO-003',
        text: 'An automation runs once per triggering event, even if a message is delivered twice.',
        category: 'reliability',
      },
      {
        id: 'PERM-002',
        text: 'Rules can limit which records and fields each role can read or write; restricted cells are missing from reads, search, history, exports and API answers.',
        category: 'privacy',
      },
      {
        id: 'COLLAB-002',
        text: 'Each record shows who changed which field, from what to what and when, and an authorized person can restore an earlier value from history.',
        category: 'history',
      },
      {
        id: 'API-USER-001',
        text: 'Access keys are shown once, limited to one app, stored only as digests, can be revoked, and can be given an expiry date.',
        category: 'security',
      },
      {
        id: 'WEBHOOK-USER-001',
        text: 'Webhook and Slack addresses are stored encrypted, signing keys are shown once, and deliveries go only to secure addresses without following redirects.',
        category: 'security',
      },
    ],
    moveIn: [
      'Airtable',
      'Smartsheet',
      'Quickbase',
      'Excel and Google Sheets workbooks',
      'CSV files',
    ],
    runsOn: 'Your computer, or your own Cloudflare account',
    version: 'v0.4.0',
    contractUrl: 'https://run-cradle.com/contract',
    seoTitle: 'Cradle: free, open-source alternative to Airtable',
    seoDescription:
      'Cradle is a free workspace for tables, linked records, views and automations, with optional read-only AI summaries. An Airtable and Smartsheet alternative.',
  },
  {
    slug: 'vector',
    summary:
      'Vector is an issue tracker where every report gets a clear decision. Your team sees what is happening now, what is next and why, in one shared list. Reports from your monitoring or support tools land in a queue where someone accepts, defers or declines them.',
    does: [
      'Give every report a decision: accept it, decline it, or defer it to a date when it returns to the queue',
      'Share one Current list where each issue sits in exactly one section (needs decision, now, next, recently done) with the reason it is there',
      'Track your own work, issues, a board and saved views, and jump to any issue with a search and command palette',
      'Plan with teams, projects and cycles, with project health that names the issue putting it at risk and unfinished work rolling into the next cycle',
      'Keep every change and decision, with who made it and when',
      'Get an Inbox, due reminders and email for assignments and mentions',
      'Link GitHub pull requests, and connect other tools with scoped API tokens and webhooks',
      'Run it next to the tracker you use now, and bring your issues over when you are ready',
    ],
    promises: [
      {
        id: 'INTAKE-002',
        text: "Receiving the same report twice never creates a second issue, and reusing a report's identity with different content is refused.",
        category: 'reliability',
      },
      {
        id: 'CURR-006',
        text: 'Every issue on the Current list states why it is there, such as awaiting decision, started work, overdue or due within seven days.',
        category: 'evidence',
      },
      {
        id: 'ISSUE-006',
        text: 'If two people edit the same issue, the later save is rejected with the current version rather than overwriting the first.',
        category: 'reliability',
      },
      {
        id: 'ISSUE-007',
        text: 'Every change to an issue is recorded with the time, the old and new value and who did it, and cannot be changed afterwards.',
        category: 'history',
      },
      {
        id: 'PROJ-008',
        text: "Later edits to issues never rewrite the snapshot of a closed cycle shown in a project's history.",
        category: 'history',
      },
      {
        id: 'CYCLE-004',
        text: 'A cycle closes exactly once when it ends, unfinished committed work rolls into the next cycle, and a closed cycle is never reopened.',
        category: 'schedule',
      },
      {
        id: 'NOTIFY-003',
        text: 'An action never notifies the person who took it, and one event sends at most one notification per person and issue.',
        category: 'alerts',
      },
      {
        id: 'WEBHOOK-001',
        text: 'Webhook deliveries survive a restart, and an unclear send is never retried under a new identity.',
        category: 'reliability',
      },
      {
        id: 'DATA-005',
        text: 'A portable archive restores exactly, without inventing activity, notifications or new timestamps.',
        category: 'export',
      },
      {
        id: 'DATA-009',
        text: 'A Jira file is reviewed before anything is written, with every unsupported item listed and ambiguous dates refused.',
        category: 'import',
      },
    ],
    moveIn: [
      'Linear',
      'Jira',
      'GitHub Issues and Projects',
      'Plane',
      'Huly',
      'Shortcut',
    ],
    runsOn: 'Your computer, or your own Cloudflare account',
    version: 'v0.4.1',
    contractUrl: 'https://run-vector.com/contract',
    seoTitle: 'Vector: free, open-source alternative to Linear',
    seoDescription:
      'Vector is a free issue tracker where every report gets a decision, and one shared list shows what is now, what is next and why.',
  },
  {
    slug: 'slate',
    summary:
      'Slate is one home for everything your team knows: pages, databases and search in one wiki you run yourself. Pages nest into trees, every record is a page, and search shows each person only what they are allowed to open. Share a page with people, groups or guests, or publish it to the web and take it down again.',
    does: [
      'Write pages in nested trees with headings, tasks, tables and media, using Markdown shortcuts, at-mentions and a slash menu',
      'Keep structured records in the same tree, viewed as a table, board or chart, with every row opening as a full page with comments and history',
      'Search pages and records across the whole workspace, with each person seeing only what they may open',
      'Share pages with people, groups and guests at view, comment or edit level, with access that can expire',
      'Publish a page to the public web by an explicit act, and unpublish whenever you like',
      'Compare any two versions of a page and restore the one you want',
      'Mark pages verified with an expiry, save templates, and get an inbox of mentions, replies and watched pages',
      'Import a Notion or Confluence export, or Markdown, HTML and Word files, while your current wiki keeps running, and back up and restore the whole workspace',
    ],
    promises: [
      {
        id: 'WEB-001',
        text: 'A page is visible without signing in only when a member with full access publishes it and its container allows public links.',
        category: 'privacy',
      },
      {
        id: 'LIFE-002',
        text: 'A draft is hidden from search, lists and exports, and visible only to its author and people it is shared with.',
        category: 'privacy',
      },
      {
        id: 'SEARCH-005',
        text: 'Search never reveals a page, title, snippet or count that the person searching is not allowed to read.',
        category: 'privacy',
      },
      {
        id: 'SHARE-007',
        text: 'Access changes take effect at once.',
        category: 'access',
      },
      {
        id: 'REV-001',
        text: 'Every saved page version is kept unchanged with its author and time, and a repeated save with no change creates nothing new.',
        category: 'history',
      },
      {
        id: 'SAVE-003',
        text: 'If someone else changed a page first, your edit is rejected and your unsaved text is kept, not silently overwritten.',
        category: 'reliability',
      },
      {
        id: 'ARCH-005',
        text: 'Deleted pages go to a trash where they can be found and restored, and nothing leaves it on a timer.',
        category: 'undo',
      },
      {
        id: 'IMP-001',
        text: 'Notion and Confluence imports show a full preview with a list of what will not carry over before anything is created, and keep the original file.',
        category: 'import',
      },
      {
        id: 'PORT-002',
        text: 'Restoring an export brings back pages, history, permissions, links and files so links keep resolving.',
        category: 'export',
      },
      {
        id: 'PORT-005',
        text: 'Exports leave out sign-ins and secrets, and imported people stay inactive until you invite them.',
        category: 'security',
      },
    ],
    moveIn: ['Notion', 'Confluence', 'Guru', 'Markdown, HTML and Word files'],
    runsOn: 'Your computer, or your own Cloudflare account',
    version: 'v0.4.0',
    contractUrl: 'https://run-slate.com/contract',
    seoTitle: 'Slate: free, open-source alternative to Notion',
    seoDescription:
      'Slate is a free team wiki with pages, databases and permission-aware search in one place, and it imports Notion and Confluence exports.',
  },
  {
    slug: 'pencil',
    summary:
      'Pencil is a form builder that asks each person only what fits their last answer, so feedback feels like a conversation. People see one question at a time, and each answer picks the next question. You can read the results with honest counts and optional analysis that quotes the real answers.',
    does: [
      "Show one question at a time, with a progress count that includes only the questions on that person's path",
      'Add rules to a question so each answer leads to its own follow-up, with a default for everyone else',
      'Preview a draft with test answers to see which rule matched, and have publishing check that every path ends in a thank-you',
      'Edit after publishing: every publish is a numbered revision, and people already answering finish the version they started',
      'Share a link, embed the form on your site, or email invitations with one reminder two days later inside your sending hours',
      'Collect responses without cookies, trackers or third-party requests, telling people before the first answer who will see it',
      "Read each question's answers, where people stopped, and starts and completions for each revision, and export exactly what you filtered",
      'Bring in a Typeform form and its responses from CSV, review how every field maps, then keep working in Pencil',
    ],
    promises: [
      {
        id: 'RESP-006',
        text: 'Anonymous responses store no contact, no name or email taken from an invitation or session, and no raw IP address.',
        category: 'privacy',
      },
      {
        id: 'RESP-010',
        text: 'If someone stops halfway, Pencil keeps how far they got, never what they typed: unfinished answers are never shown, counted or exported.',
        category: 'privacy',
      },
      {
        id: 'RESP-015',
        text: 'Spam defences run on your own installation, with no third-party challenge or tracking script on public forms.',
        category: 'privacy',
      },
      {
        id: 'FLOW-009',
        text: 'Editing a published form changes only a new draft; people already answering finish the version they started.',
        category: 'history',
      },
      {
        id: 'ANLY-004',
        text: 'Anything shown in quotation marks is an exact excerpt of a real answer; summaries are labelled as analysis.',
        category: 'evidence',
      },
      {
        id: 'ANLY-008',
        text: 'If the AI is not set up or fails, no findings are invented and forms, responses and exports keep working.',
        category: 'ai',
      },
      {
        id: 'RSLT-003',
        text: 'Every percentage shown names the count it came from.',
        category: 'evidence',
      },
      {
        id: 'DIST-005',
        text: 'Every invitation and reminder has an opt-out link, and opting out stops future mail without deleting existing responses.',
        category: 'privacy',
      },
      {
        id: 'DATA-002',
        text: 'Deleting a response or contact removes their answers from analyses within five minutes and marks affected analyses stale.',
        category: 'erasure',
      },
      {
        id: 'IMPORT-002',
        text: 'A response CSV import reports every row error and commits only after you acknowledge each change; cancelling creates nothing.',
        category: 'import',
      },
    ],
    moveIn: ['Typeform', 'Google Forms', 'SurveyMonkey', 'Jotform'],
    runsOn: 'Your computer, or your own Cloudflare account',
    version: 'v0.7.0',
    contractUrl: 'https://run-pencil.com/contract',
    seoTitle: 'Pencil: free, open-source alternative to Typeform',
    seoDescription:
      'Pencil is a free form builder that asks each person only what fits their last answer, one question at a time, with no cookies on your forms.',
  },
  {
    slug: 'orbit',
    summary:
      'Orbit puts a deal in your NOW queue when a customer replies, scores it from real signals, and shows you why. Every customer email is reviewed by a person before it is sent. It is free for the whole team, and you can try it beside your current CRM.',
    does: [
      'Move a deal into your NOW queue when a customer replies, books a meeting or submits a form',
      'Score each deal from what customers actually did, with older activity counting for less and every signal behind the score shown',
      'Keep contacts, companies and deals, with your own fields, in a pipeline with your own stages',
      'Let a contact form on your site drop each enquiry onto the right contact',
      'Draft follow-ups, with optional AI, that you review and approve one by one, and schedule them with quiet hours',
      'Cancel scheduled follow-ups automatically when the customer replies',
      'Pull in emails and meetings from Gmail, Google Calendar, Outlook, forwarded mail or a calendar link',
      'Import contacts from a CSV, and export or restore a complete archive of your workspace any time',
    ],
    promises: [
      {
        id: 'OUT-001',
        text: 'No score, draft, AI result or automatic job can approve or start a customer message; a person must see the exact recipient, subject and body.',
        category: 'approval',
      },
      {
        id: 'OPP-004',
        text: "A deal's score shows every signal it used, with source, time and weight, beside the reason for the recommendation.",
        category: 'evidence',
      },
      {
        id: 'SIGNAL-007',
        text: 'Orbit uses no tracking script, pixel or cookie, and does not fingerprint visitors.',
        category: 'privacy',
      },
      {
        id: 'OUT-007',
        text: "A reply, a booked meeting, an unsubscribe or a permanent bounce cancels that contact's scheduled messages.",
        category: 'alerts',
      },
      {
        id: 'OUT-012',
        text: 'Every message carries a one-click unsubscribe; an opt-out marks the contact do-not-contact within a minute and cancels scheduled messages.',
        category: 'privacy',
      },
      {
        id: 'ACTION-005',
        text: 'A draft goes stale when the customer replies or the deal changes, and a stale draft cannot be sent until you have seen what changed.',
        category: 'approval',
      },
      {
        id: 'CAPTURE-005',
        text: 'Capture never writes a draft or sends a message, and a contact created from captured mail is do-not-contact until you clear it.',
        category: 'approval',
      },
      {
        id: 'AI-003',
        text: 'If the AI is unavailable, records, scoring, search, hand-written drafts and sending still work.',
        category: 'ai',
      },
      {
        id: 'RECORD-004',
        text: 'Merging duplicates needs you to choose the surviving record and every conflicting value, and refuses if either record changed after your review.',
        category: 'approval',
      },
      {
        id: 'DATA-002',
        text: 'Deleting a contact removes their email, signals, drafts and message bodies from records, search, exports and later AI or mail requests within five minutes.',
        category: 'erasure',
      },
    ],
    moveIn: [
      'HubSpot Sales Hub',
      'Pipedrive',
      'Salesforce Sales Cloud',
      'CSV files',
      'Gmail and Google Calendar',
      'Outlook mail and calendar',
    ],
    runsOn: 'Your computer, or your own Cloudflare account',
    version: 'v0.3.0',
    contractUrl: 'https://run-orbit.com/contract',
    seoTitle: 'Orbit: free, open-source alternative to HubSpot',
    seoDescription:
      'Orbit is a free sales CRM that puts a deal in your NOW queue when a customer replies, scores it from real signals and shows why.',
  },
  {
    slug: 'mango',
    summary:
      'Mango is for newsletters people are glad to get. You write the letter, approve exactly what goes out, and send it only to people who said yes. Your list stays in your own database, and reports show only what your mail provider confirmed.',
    does: [
      'Collect readers on a hosted signup page, with each new reader confirming by email before getting a letter',
      'Keep when and how each reader agreed, with the exact wording they saw',
      'Write in a rich-text editor or in HTML, and preview at desktop and phone widths',
      'Approve the exact saved letter, which is then locked, with checks on the sender, unsubscribe link, links and audience before approval',
      "Schedule each step in your newsletter's time zone and cancel queued work while it can still stop",
      'Hand each letter to your mail provider and report delivery, bounces and complaints as the provider confirmed them',
      'Bring your list in as CSV with opt-outs and suppressions applied first, so a later import never undoes them',
      'Export your audience with its consent history as CSV whenever you like',
    ],
    promises: [
      {
        id: 'CAMP-004',
        text: 'A campaign cannot be scheduled until you approve a specific saved version; approval checks the audience, consent, sender, links and content, and any failure leaves it a draft that names every problem.',
        category: 'approval',
      },
      {
        id: 'CONT-004',
        text: 'An unsubscribe takes effect before it is acknowledged, and later imports, syncs, merges or edits never reverse it.',
        category: 'privacy',
      },
      {
        id: 'AUD-002',
        text: 'Contacts who are pending, not subscribed, unsubscribed or suppressed on a channel are excluded from it, whatever segment they are in.',
        category: 'privacy',
      },
      {
        id: 'MSG-003',
        text: 'Every marketing email has a visible unsubscribe link and a one-click unsubscribe that works without further steps.',
        category: 'privacy',
      },
      {
        id: 'CONT-009',
        text: 'Opening a confirmation link only shows a button; subscribers are confirmed only when they press it, so mailbox scanners cannot sign anyone up.',
        category: 'privacy',
      },
      {
        id: 'CAMP-006',
        text: "Each step is set in your newsletter's time zone with the exact moment shown, and a local time that does not exist or is ambiguous is refused.",
        category: 'schedule',
      },
      {
        id: 'CAMP-009',
        text: 'Cancelling a scheduled or sending campaign stops everything the mail provider has not received, and never claims to recall a message already delivered.',
        category: 'undo',
      },
      {
        id: 'SEND-006',
        text: 'Mango records a message as delivered only when the provider says so; being accepted by the provider is never reported as delivery.',
        category: 'evidence',
      },
      {
        id: 'AUD-004',
        text: 'Someone emailed too recently is left out of the next send with a stated reason, not quietly delayed.',
        category: 'reliability',
      },
      {
        id: 'CONT-013',
        text: 'Deleting a contact removes their profile, consent evidence and messages within five minutes, while keeping a one-way record that they opted out.',
        category: 'erasure',
      },
    ],
    moveIn: [
      'Mailchimp',
      'Klaviyo',
      'ActiveCampaign',
      'Kit (ConvertKit)',
      'CSV files',
    ],
    runsOn: 'Your computer, or your own Cloudflare account',
    version: 'v0.4.0',
    contractUrl: 'https://run-mango.com/contract',
    seoTitle: 'Mango: free, open-source alternative to Mailchimp',
    seoDescription:
      'Mango is a free newsletter tool: you approve exactly what goes out and send only to people who said yes, with honest delivery reports.',
  },
  {
    slug: 'dial',
    summary:
      'Dial is a booking page for independent professionals and small businesses. It checks your live calendar when someone books, so a time is only offered while it is really free, and invitees book in their own timezone without making an account. If none of the times suit them, they can send you the dates and windows that do.',
    does: [
      'Publish a booking page that invitees use without an account, with every time shown in their own timezone',
      'Suggest up to five times a day, each with the reason it was picked',
      'Handle weekly hours, date overrides, buffers, minimum notice, a daily limit and daylight saving',
      'Block busy times from Google Calendar and put each booking on your calendar, with a Google Meet link when you choose one',
      'Check your calendar again at the moment of booking, and offer no times if it cannot be read',
      'Send confirmations, change notices, and reminders a day and an hour ahead, plus a calendar file for every booking',
      'Let invitees reschedule or cancel from a private link, or ask for another time when nothing fits',
      'Export every booking, answer and setting, and restore it into a fresh install',
    ],
    promises: [
      {
        id: 'AUTH-003',
        text: 'A booking can only be viewed or changed with its private link; a booking number or email address never gives access.',
        category: 'access',
      },
      {
        id: 'BOOK-002',
        text: 'A time slot can never be booked twice; if many people try at once, exactly one gets it and the rest choose another time.',
        category: 'reliability',
      },
      {
        id: 'BOOK-003',
        text: 'Sending the same confirmation twice returns the original booking and never creates a second booking, calendar event or email.',
        category: 'reliability',
      },
      {
        id: 'AVAIL-004',
        text: 'If a calendar you rely on cannot be read, Dial offers and confirms no time for that host rather than offer an unchecked one.',
        category: 'reliability',
      },
      {
        id: 'AVAIL-006',
        text: 'A time that does not exist when clocks change is never offered, and repeated times are shown so each maps to exactly one moment.',
        category: 'reliability',
      },
      {
        id: 'CAL-002',
        text: 'From your calendars Dial keeps only the busy times it needs; titles, descriptions, attendees and locations are never stored.',
        category: 'privacy',
      },
      {
        id: 'BOOK-008',
        text: 'Cancelling through the private link frees the slot right away and cannot be undone; repeating it sends no second notice.',
        category: 'undo',
      },
      {
        id: 'BOOK-007',
        text: 'Rescheduling from the private link moves the booking only if the new time is free; if any step fails, the original booking stays confirmed and unchanged.',
        category: 'reliability',
      },
      {
        id: 'PUBLIC-005',
        text: 'A page that is unknown, draft, disabled or deleted shows a plain not-found and reveals nothing about whether it ever existed.',
        category: 'privacy',
      },
      {
        id: 'DATA-001',
        text: 'One command writes every booking, answer and setting to a private archive, and another restores it into a fresh install.',
        category: 'export',
      },
    ],
    moveIn: [
      'Calendly',
      'Acuity Scheduling',
      'Microsoft Bookings',
      'Cal.com',
      'SavvyCal',
      'Doodle',
    ],
    runsOn: 'your own computer, or your own Cloudflare account',
    version: 'v0.5.0',
    contractUrl: 'https://run-dial.com/contract',
    seoTitle: 'Dial: free, open-source alternative to Calendly',
    seoDescription:
      'Dial is a free, open-source booking page that checks your live calendar and works in every timezone. An alternative to Calendly and Acuity Scheduling.',
  },
  {
    slug: 'penny',
    summary:
      'Penny is a customer-feedback tool for software teams. Customers post, vote and follow requests on a public board, you keep the evidence behind each request and decide what to build, and everyone who asked hears when it ships.',
    does: [
      'Run a public board where customers post requests, vote, comment and follow, with nothing public until you approve it',
      'Suggest similar requests before a new one is posted, and count one email-verified vote per person',
      'Record what you hear on sales calls, in support conversations, in interviews and by email, with the source kept on every quote',
      'Compare your options side by side against the evidence, then commit to one with your reasons and a review date',
      'Keep a private roadmap and show only the items you approve on a public roadmap',
      'Publish release notes in your own words and email every customer who asked, held during your quiet hours',
      'Keep account names, revenue, evidence sources and internal notes off every public page and email',
      'Download an archive of all your data',
    ],
    promises: [
      {
        id: 'DATA-002',
        text: 'Nothing marked for your team only ever appears in a public response, even in fields the page does not display.',
        category: 'privacy',
      },
      {
        id: 'EVID-006',
        text: 'Customer account details, evidence sources and internal notes never appear on public pages or in customer email.',
        category: 'privacy',
      },
      {
        id: 'REQ-005',
        text: 'Nothing becomes public until a team member approves its title, description, board and each attachment.',
        category: 'approval',
      },
      {
        id: 'REQ-006',
        text: 'Each person has at most one vote on a request, and the total counts distinct current voters.',
        category: 'history',
      },
      {
        id: 'REQ-023',
        text: 'Email addresses are verified with a single-use link that expires after 30 minutes.',
        category: 'security',
      },
      {
        id: 'REQ-009',
        text: "A merge of duplicate requests can be reversed, restoring the duplicate's own votes, comments and followers.",
        category: 'undo',
      },
      {
        id: 'EVID-004',
        text: 'Linking, tagging, merging or deciding never alters or removes a piece of evidence or any earlier wording of it.',
        category: 'evidence',
      },
      {
        id: 'DEC-006',
        text: 'Changing a decision later adds a new revision and keeps the original reasons and evidence readable.',
        category: 'history',
      },
      {
        id: 'REL-011',
        text: 'A hard bounce or spam complaint stops all further email to that address until the person verifies it again.',
        category: 'alerts',
      },
      {
        id: 'IMP-004',
        text: 'An import can be undone: only what it created is removed, and anything your team added since is kept and flagged.',
        category: 'undo',
      },
    ],
    moveIn: ['Canny', 'UserVoice', 'Productboard', 'Aha! Ideas', 'Featurebase'],
    runsOn: 'your own computer, or your own Cloudflare account',
    version: 'v0.2.1',
    contractUrl: 'https://run-penny.com/contract',
    seoTitle: 'Penny: free, open-source alternative to Canny',
    seoDescription:
      'Penny is a free, open-source feedback board with evidence-based decisions, a public roadmap and release notes. An alternative to Canny and Productboard.',
  },
  {
    slug: 'oncall',
    summary:
      'Oncall shows everyone who is on call now, who is next and exactly when they hand over. It keeps rotations, swaps, incidents, runbooks and follow-ups in one place, and runs alongside the pager you already use while you move your schedules over.',
    does: [
      'Show who is on call now, who is next and when the next hand-over happens',
      "Build primary and backup rotations in your team's timezone, so a hand-over stays on the same clock time when clocks change",
      'Cover a few hours with an override or swap without touching the rotation',
      'Subscribe to a private calendar feed of the next seven days of shifts',
      'Record alerts from monitoring, route them to the right service and replay the routing safely',
      'Declare an incident, assign a commander, follow the runbook and keep every decision on a timeline',
      'Resolve with recovery evidence and a summary, then track follow-up tasks and review',
      'Preview your Opsgenie or PagerDuty schedules before anything is imported',
    ],
    promises: [
      {
        id: 'OC-012',
        text: 'Oncall sends no texts, calls or push alerts, so your existing pager stays in charge while you use it.',
        category: 'alerts',
      },
      {
        id: 'OC-006',
        text: 'Oncall sends signed response events only to endpoints an administrator approves; paging stays off, and email is for sign-in links only.',
        category: 'security',
      },
      {
        id: 'OC-005',
        text: 'A runbook is copied into the incident when it is declared, so later edits never rewrite instructions mid-incident.',
        category: 'history',
      },
      {
        id: 'OC-004',
        text: 'Resolving an incident needs recovery evidence and a summary, and every change is recorded in an attributed timeline.',
        category: 'evidence',
      },
      {
        id: 'OC-008',
        text: 'Incident records you write are never deleted automatically.',
        category: 'history',
      },
      {
        id: 'OC-011',
        text: 'Rotations hand over by wall-clock time in your named zone, and clock-change gaps show up as visible gaps.',
        category: 'schedule',
      },
      {
        id: 'OC-003',
        text: 'Viewers can only read, responders coordinate, and admins manage; alert-sending credentials grant no read access, and removed access stops on the next request.',
        category: 'access',
      },
      {
        id: 'OC-002',
        text: 'Replaying alert routing only reads: it creates no alert, incident or outside effect.',
        category: 'reliability',
      },
      {
        id: 'OC-021',
        text: 'A move-in preview writes nothing, a person must review it before it is applied, and imported schedules stay paused.',
        category: 'import',
      },
      {
        id: 'OC-022',
        text: 'A move-in can be undone, and edits you made afterwards are kept rather than overwritten.',
        category: 'undo',
      },
    ],
    moveIn: ['PagerDuty', 'Opsgenie', 'Splunk On-Call', 'Better Stack'],
    runsOn: 'your own computer, or your own Cloudflare account',
    version: 'v0.5.0',
    contractUrl: 'https://run-oncall.com/contract',
    seoTitle: 'Oncall: free, open-source alternative to PagerDuty',
    seoDescription:
      'Oncall is a free, open-source on-call schedule and incident tool that shows who is on now and next. An alternative to PagerDuty and Opsgenie.',
  },
  {
    slug: 'spool',
    summary:
      "Spool catches the errors in your app, groups repeats into one issue and points to the exact line in your own source code where it broke. It tells you when a fixed error comes back in a later release, and gives your coding agent a read-only view of one project's evidence.",
    does: [
      'Catch errors from JavaScript, Python and Go apps, using the same reporting libraries Sentry uses',
      'Group repeats into a single issue and show exactly where in your original source each error happened',
      'Keep your source maps private and match them to the right release',
      'Download an evidence packet to hand to whoever is fixing the issue',
      "Create a read-only agent key so a coding agent can read one project's issues and evidence, and change nothing",
      'Reopen a resolved issue when it returns in a later release, and name that release',
      'Scrub emails, tokens and passwords before anything is saved',
      'Export everything to one file and restore it into a fresh copy',
    ],
    promises: [
      {
        id: 'ERR-003',
        text: 'Error details are scrubbed before they are stored: emails, tokens and passwords are removed, and headers, cookies and request bodies are not kept by default.',
        category: 'privacy',
      },
      {
        id: 'ERR-004',
        text: 'Owner sign-in, error sending and read-only agent access are separate, revoking one takes effect on the next request, and your source maps are never public.',
        category: 'access',
      },
      {
        id: 'ERR-002',
        text: 'An error is only counted once it is fully saved, and a repeated send never counts twice.',
        category: 'reliability',
      },
      {
        id: 'ERR-006',
        text: "Changes to an issue are recorded, and a resolved issue reopens as returning only when it appears in a later release, so an old release's error raises no false alarm.",
        category: 'history',
      },
      {
        id: 'ERR-007',
        text: 'The evidence packet is size-limited and never includes your source code.',
        category: 'evidence',
      },
      {
        id: 'ERR-008',
        text: 'Counts of errors accepted and rejected are visible, and a quiet period is never reported as proof an error is fixed.',
        category: 'evidence',
      },
    ],
    moveIn: ['Sentry', 'Datadog Error Tracking', 'Rollbar', 'Bugsnag'],
    runsOn: 'your own computer, or your own Cloudflare account',
    version: 'v0.7.3',
    contractUrl: 'https://run-spool.com/contract',
    seoTitle: 'Spool: free, open-source alternative to Sentry',
    seoDescription:
      'Spool is a free, open-source error tracker that shows the exact line that broke and tells you when a fixed error returns. An alternative to Sentry and Bugsnag.',
  },
  {
    slug: 'beam',
    summary:
      'Beam is employee training for small and mid-sized employers. It enrolls new hires from your HR system, teaches on any phone even without signal, plays the courses you already own, and renews certifications on schedule. When a procedure changes, it redrafts only the lessons affected, and every completion is tied to the exact version the person took.',
    does: [
      'Enroll new hires from your HR system and sign them in with a badge number and PIN, in Spanish or English, with no work email needed',
      'Teach on any phone, including courses downloaded for use offline, and let people pick up where they left off on any device',
      'Play your existing SCORM courses as they are',
      "Score observed practical work such as a forklift drive on the assessor's phone, and issue a numbered certificate for every completion",
      'Redraft only the lessons a changed procedure affects, with a named reviewer approving each version before staff see it and everyone keeping their progress',
      "Chase overdue training by text or Teams, go to the manager's cover when the manager is away, and stop the moment the training is done",
      'Show compliance by state, role and requirement on one page, and schedule renewals automatically',
      'Move in your TalentLMS history, credit current training, and export everything in one file',
    ],
    promises: [
      {
        id: 'BEAM-03',
        text: "A stale save is refused rather than merged, and only the course's named reviewer or the owner can publish it.",
        category: 'approval',
      },
      {
        id: 'BEAM-05',
        text: 'An assignment is tied to the exact published version of the course.',
        category: 'history',
      },
      {
        id: 'BEAM-09',
        text: 'A completion is recorded only when every lesson is done and each required assessment is passed or accepted, tied to the exact version.',
        category: 'evidence',
      },
      {
        id: 'BEAM-11',
        text: 'Certificates name your business as the issuer and state they are not an accreditation or a statement of competence.',
        category: 'evidence',
      },
      {
        id: 'BEAM-13',
        text: "A learner cannot read anyone else's assignments, attempts, evidence or certificates.",
        category: 'privacy',
      },
      {
        id: 'BEAM-08',
        text: 'Practical evidence can be read and decided only by the named assessor, and nothing completes before their decision.',
        category: 'approval',
      },
      {
        id: 'BEAM-18',
        text: 'Your own agent can only prepare drafts and plans; nothing reaches staff until a person approves it, and every decision is recorded.',
        category: 'ai',
      },
      {
        id: 'BEAM-19',
        text: "Answers to optional questions are stored without the person's name or the time, and shown only after the question closes with at least three answers.",
        category: 'privacy',
      },
      {
        id: 'BEAM-15',
        text: 'A TalentLMS move-in previews without writing anything, imported completions stay labelled as TalentLMS history, importing the same export twice adds nothing, and it can be undone while keeping rows a manager has reviewed.',
        category: 'import',
      },
      {
        id: 'BEAM-16',
        text: 'Export captures every record and file without sign-ins or credentials, and import refuses a corrupt archive or a site that already has data.',
        category: 'export',
      },
    ],
    moveIn: [
      'TalentLMS',
      'Trainual',
      'Docebo',
      'iSpring Learn',
      '360Learning',
      'Sana',
      'Arist',
      'SCORM course files',
      'BambooHR',
    ],
    runsOn:
      'your own computer; going live needs your own Cloudflare account and a verified email sender',
    version: 'v0.1.0',
    contractUrl: 'https://run-beam.com/contract',
    seoTitle: 'Beam: free, open-source alternative to TalentLMS',
    seoDescription:
      'Beam is a free, open-source employee training tool that enrolls new hires, teaches on any phone and keeps certifications current.',
  },
  {
    slug: 'chest',
    summary:
      "Chest stores, syncs and shares your team's files, reads every scan so you can search the words inside, and quietly files what arrives. Files stay in step on Mac, Windows, iPhone and Android, open together in the browser, and every version is kept.",
    does: [
      'Keep files in sync on Mac, Windows, iPhone and Android, opening on demand without filling your disk',
      'Share with links that carry a password, an expiry and a download limit, revoke any link in one click, or ask anyone to upload with a file request',
      'Search the words inside documents and scans, showing each person only what they are allowed to see',
      'Open Word, Excel and PowerPoint files in the browser, edit together, comment and keep one copy',
      'Keep every version of a file, go back to an earlier one, and rewind a whole folder after an accident',
      'Record approvals against the exact version that was signed off',
      'Let agents file what arrives from email and apps, merge duplicates and flag links shared too widely, with an undo on each action',
      'Move in from Google Drive, Dropbox or Box with folders, permissions, versions and shared links, and rewrite links inside your files to the new copies',
    ],
    promises: [
      {
        id: 'CHEST-07',
        text: 'Every replacement is a new unchanged original; an approved version stays current while newer ones wait, and approving one never approves another.',
        category: 'history',
      },
      {
        id: 'CHEST-03',
        text: 'A file is checked and safely stored before it appears in the library, so a failed upload never shows up.',
        category: 'reliability',
      },
      {
        id: 'CHEST-06',
        text: 'Lists, counts, search, previews, downloads and edits only show what the person currently has access to.',
        category: 'access',
      },
      {
        id: 'CHEST-10',
        text: "Access is granted to people or groups, and removing someone's access takes effect everywhere right away.",
        category: 'access',
      },
      {
        id: 'CHEST-13',
        text: 'Anyone can restore what they trashed, including whole folders, with no administrator involved, and nothing in trash is destroyed automatically.',
        category: 'undo',
      },
      {
        id: 'CHEST-16',
        text: 'Every uploaded version of a file is kept with its number, author, time and size, and restoring an earlier one adds it as a new current version without deleting the later ones.',
        category: 'history',
      },
      {
        id: 'RECOVER-001',
        text: 'A folder or a whole space can be rewound to a recorded point after an accidental deletion or overwrite, after a preview of what will change, and a revoked share stays revoked.',
        category: 'undo',
      },
      {
        id: 'CHEST-11',
        text: 'A move-in previews first, applies only what was reviewed, and can be undone for records nobody has touched since.',
        category: 'import',
      },
      {
        id: 'CHEST-12',
        text: 'A full export restores into an empty install with files, history and approvals intact, and never includes sign-in credentials.',
        category: 'export',
      },
    ],
    moveIn: [
      'Google Drive',
      'Dropbox',
      'Box',
      'OneDrive and SharePoint',
      'Egnyte',
      'LucidLink',
      'Nextcloud',
    ],
    runsOn:
      'your own computer; going live needs your own hosting and email setup',
    version: 'v0.2.0',
    contractUrl: 'https://run-chest.com/contract',
    seoTitle: 'Chest: free, open-source alternative to Google Drive',
    seoDescription:
      'Chest is a free, open-source place to store, sync and share team files, with search inside scans and every version kept. A Google Drive and Dropbox alternative.',
  },
  {
    slug: 'coaster',
    summary:
      'Coaster is expense management for a business. It reads each receipt, matches it to the card charge, chases approvals and missing receipts, pays employees by ACH and keeps your accounting software in step. Each claim is approved at the exact version submitted, and a returned claim is corrected, never erased.',
    does: [
      'Take receipts by photo, forwarded email, Slack or straight from services like Lyft, and read each one, including multi-night hotel bills',
      'Match each receipt to the card charge from your daily card file, and ask the employee the one thing a receipt cannot say, such as who was at dinner',
      'Flag policy exceptions such as a hotel over the nightly cap, ask the employee to explain once, and carry the explanation to the approver',
      'Let managers approve or hold from Slack or their phone, then gather approved claims into one reimbursement batch checked against a reconciled total',
      'Pay employees by ACH, explain a returned payment in plain words, and resend once the bank details are fixed',
      'Chase missing receipts on business days, skipping holidays and quiet hours, and stop the moment the receipt arrives',
      'Sync paid bills and card purchases to QuickBooks or Xero with receipts attached, and reconcile the card statement to the cent',
      'Test a new policy on twelve months of past trips before you adopt it',
    ],
    promises: [
      {
        id: 'COA-005',
        text: 'An exact duplicate expense can never be reimbursed twice.',
        category: 'money',
      },
      {
        id: 'COA-006',
        text: 'A manager decides the exact submitted version of a claim, and nobody can decide their own claim.',
        category: 'approval',
      },
      {
        id: 'COA-007',
        text: 'A returned claim is corrected and resubmitted, and earlier versions, receipts and decisions stay readable and cannot be changed.',
        category: 'history',
      },
      {
        id: 'COA-009',
        text: 'The accounting file and the reimbursements file each add up to the reviewed batch total.',
        category: 'money',
      },
      {
        id: 'COA-002',
        text: 'Every receipt keeps its exact original file, with a checksum, uploader and time.',
        category: 'evidence',
      },
      {
        id: 'COA-004',
        text: 'Policy exceptions are flagged, explained by the employee, acknowledged by the manager, and stay on the decision, the batch and the accounting file.',
        category: 'evidence',
      },
      {
        id: 'COA-008',
        text: 'Employees, managers and finance each see only what their role allows, and drafts stay private to their author.',
        category: 'access',
      },
      {
        id: 'COA-010',
        text: 'An agent can only prepare drafts; it cannot submit, approve, batch or pay anything.',
        category: 'ai',
      },
      {
        id: 'COA-011',
        text: 'An Expensify move-in previews without writing, applies only what was previewed, and can be undone.',
        category: 'import',
      },
      {
        id: 'COA-012',
        text: 'A full export restores claims, receipts, decisions and history identically, and a corrupt archive is refused.',
        category: 'export',
      },
    ],
    moveIn: ['Expensify', 'SAP Concur', 'Emburse', 'Ramp', 'Brex', 'Navan'],
    runsOn: 'your own computer, or your own Cloudflare account',
    version: 'v0.1.0',
    contractUrl: 'https://run-coaster.com/contract',
    seoTitle: 'Coaster: free, open-source alternative to Expensify',
    seoDescription:
      'Coaster is a free, open-source expense tool that reads receipts, matches card charges, gets claims approved and pays staff back.',
  },
  {
    slug: 'easel',
    summary:
      'Easel builds your twelve-month plan from your real actuals and shows the arithmetic behind every number. Departments submit their budgets, finance approves and locks them, and each month is closed and explained against the plan.',
    does: [
      'Plan revenue, hiring, expenses and cash for the next twelve months, with every figure showing the driver, rate and month behind it',
      'Upload your general-ledger file, map each account and check every row before you accept it',
      'Branch a downside scenario and compare profit and closing cash with the plan month by month',
      'Ask each department to submit its own budget, take suggested changes as proposals that finance promotes or declines, then approve and lock it with a permanent record of who approved what',
      'Close each month and see actual against budget and the forecast as it stood, with an explanation for every variance',
      'Publish a monthly review pack with decisions, downloadable as HTML or CSV',
      'Keep salaries visible only to finance and the department concerned',
      'Bring in your Excel budget as its own scenario, with every cell address and formula kept',
    ],
    promises: [
      {
        id: 'EASEL-006',
        text: 'Every number shows the arithmetic behind it; money is kept in whole cents and rounding is consistent.',
        category: 'evidence',
      },
      {
        id: 'EASEL-010',
        text: 'Approving the budget freezes it with a permanent record of exactly what was approved, by whom and when.',
        category: 'history',
      },
      {
        id: 'EASEL-007',
        text: "Individual salaries and positions are visible only to finance and that department's contributors; the server removes the detail for everyone else.",
        category: 'privacy',
      },
      {
        id: 'EASEL-003',
        text: 'Actuals are accepted only when every account and department is mapped and the reviewed preview still matches.',
        category: 'import',
      },
      {
        id: 'EASEL-004',
        text: 'An accepted actuals import can be undone exactly, unless a forecast month has already been closed.',
        category: 'undo',
      },
      {
        id: 'EASEL-012',
        text: 'A proposal is promoted only at the exact revision reviewed and only if the plan has not changed since.',
        category: 'approval',
      },
      {
        id: 'EASEL-013',
        text: 'Closing a month first keeps the forecast as it stood, so you can always compare against it.',
        category: 'history',
      },
      {
        id: 'EASEL-014',
        text: 'A published review pack is permanent, carries no individual pay detail, and every member, including viewers, can download it.',
        category: 'history',
      },
      {
        id: 'EASEL-016',
        text: 'A full export restores the same model, approvals and packs into an empty install of the same release.',
        category: 'export',
      },
    ],
    moveIn: [
      'Excel budget workbooks',
      'General-ledger CSV exports',
      'Workday Adaptive Planning',
      'Planful',
      'Anaplan',
      'Runway',
      'Pigment',
    ],
    runsOn: 'your own computer',
    version: 'v0.1.0',
    contractUrl: 'https://run-easel.com/contract',
    seoTitle:
      'Easel: free, open-source alternative to Workday Adaptive Planning',
    seoDescription:
      'Easel is a free, open-source planning tool that builds a twelve-month plan from your actuals and shows the arithmetic behind every number.',
  },
  {
    slug: 'gasket',
    summary:
      'Gasket keeps your equipment in service. It turns operator requests, preventive schedules and machine readings into work with the right people and parts, lets technicians work offline, and flags failing machines before they break down. Every asset keeps its full history of work, readings, parts, downtime and cost.',
    does: [
      'Keep one register of equipment with locations, meters, manuals, warranties and parts lists',
      'Create preventive work on its own by calendar, meter reading or inspection round, and chase late jobs until they are done',
      'Let technicians complete checklists, photos and readings offline and sync when they are back in signal',
      'Fit repairs into planned shutdowns with the person, parts, procedure and tools lined up',
      'Flag a failing machine from its live readings and its repair history, with a lead approving the fix',
      'Track parts across storerooms, reserve them for jobs, transfer between sites and draft purchase orders when stock runs low',
      'Report on-time maintenance, downtime, repair cost and the machines that fail most',
      'Move in your MaintainX equipment, parts, readings and work history after a preview',
    ],
    promises: [
      {
        id: 'GAS-01',
        text: "Ending someone's access ends their sessions at once, and every page and download checks the person's current role.",
        category: 'access',
      },
      {
        id: 'GAS-02',
        text: 'Editing an asset keeps its earlier values, and retiring one keeps all of its history.',
        category: 'history',
      },
      {
        id: 'GAS-03',
        text: 'A physical count records the exact difference without rewriting earlier stock movements, and a stale count is refused.',
        category: 'history',
      },
      {
        id: 'GAS-04',
        text: 'A work order keeps the checklist revision it was created with, so later changes never alter issued work.',
        category: 'history',
      },
      {
        id: 'GAS-09',
        text: 'Finished work needs every checklist result and a follow-up for each failure, and the person who did the work cannot approve it.',
        category: 'approval',
      },
      {
        id: 'PM-001',
        text: 'Preventive work is created automatically on schedule, and a restart or retry never creates the same job twice.',
        category: 'schedule',
      },
      {
        id: 'BUY-003',
        text: 'The person who starts a purchase cannot approve it, and changing a vendor, line or currency voids the approval.',
        category: 'approval',
      },
      {
        id: 'ADMIN-006',
        text: 'Every change to maintenance records is logged with who, what and when, and corrections are added rather than overwriting earlier evidence.',
        category: 'evidence',
      },
      {
        id: 'GAS-13',
        text: 'An agent can only prepare proposals; a different person approves them, and a proposal built on records that have since changed is refused.',
        category: 'ai',
      },
      {
        id: 'GAS-12',
        text: 'A MaintainX move-in shows a dry run first, applies only what was reviewed, adds nothing if repeated, and can be undone.',
        category: 'import',
      },
    ],
    moveIn: ['MaintainX', 'UpKeep', 'Fiix', 'Limble', 'Spreadsheets'],
    runsOn: 'your own computer, or your own Cloudflare account',
    version: 'v0.1.0',
    contractUrl: 'https://run-gasket.com/contract',
    seoTitle: 'Gasket: free, open-source alternative to MaintainX',
    seoDescription:
      "Gasket is a free, open-source maintenance tool that turns requests and schedules into work orders and tracks every asset's history, parts and downtime.",
  },
  {
    slug: 'gauge',
    summary:
      'Gauge carries each agency engagement from estimate and retainer through staffing, time and invoices to cash, and plans the recovery when a project drifts. Staff confirm their own hours, leads approve them, and finance sends one clean billing packet where every hour is billed once.',
    does: [
      'Price an estimate from role hours and real rates, send the proposal, and turn a signed deal into an engagement with its team requested',
      'Run retainers with included hours, rollover of unused time and overage billing, with the client seeing the same statement',
      'Plan staffing five weeks ahead from calendars and leave, and propose cover when someone is out so a launch date holds',
      'Draft missing hours from calendars and tools, then approve every timesheet in one queue',
      'Compare agreed budget with approved time and cost, and price the options when scope grows',
      'Invoice accepted milestones and approved hours, with card and ACH links, and sync invoices to QuickBooks',
      'Close the month, and see expected cash, utilization and margin',
      'Move in Harvest and Forecast history, run a month beside it, then take over with open invoices',
    ],
    promises: [
      {
        id: 'BUDGET-001',
        text: 'Approved terms cannot be changed; a change order is a new version beside them.',
        category: 'history',
      },
      {
        id: 'RATE-001',
        text: 'Rates are kept by effective date, so adding a new rate never rewrites past work, and rates stay private to finance.',
        category: 'privacy',
      },
      {
        id: 'COST-001',
        text: 'Expense receipts are fixed when submitted, and only their owner or finance can download them.',
        category: 'privacy',
      },
      {
        id: 'CAPACITY-001',
        text: 'A person with no working calendar shows as unknown capacity, never as zero.',
        category: 'reliability',
      },
      {
        id: 'RETAINER-002',
        text: 'Retainer rollover, caps, expiry and overage rates follow the agreed version, and only allowed overage is billed.',
        category: 'money',
      },
      {
        id: 'BILLING-001',
        text: 'The same approved work can never be reserved for two billing packets.',
        category: 'money',
      },
      {
        id: 'BILLING-002',
        text: 'An approved billing packet is fixed, repeated downloads return identical files, and corrections are separate adjustment packets.',
        category: 'money',
      },
      {
        id: 'ACCESS-001',
        text: 'Staff see only their own work, and private costs and rates stay with finance; revoking access takes effect on the next request.',
        category: 'access',
      },
      {
        id: 'AGENT-003',
        text: 'An agent proposing billing lines never sees amounts, and finance approves before anything is drafted.',
        category: 'ai',
      },
      {
        id: 'MOVE-001',
        text: 'A Harvest move-in previews first, can be rolled back, adds no duplicates when repeated, and refuses to undo records you have edited.',
        category: 'import',
      },
    ],
    moveIn: [
      'Harvest',
      'Harvest Forecast',
      'Kantata',
      'Scoro',
      'Teamwork.com',
      'Productive',
      'Rocketlane',
      'Float',
    ],
    runsOn: 'your own computer',
    version: 'v0.1.0',
    contractUrl: 'https://run-gauge.com/contract',
    seoTitle: 'Gauge: free, open-source alternative to Kantata',
    seoDescription:
      'Gauge is a free, open-source agency tool that takes engagements from estimate and retainer through staffing and time to invoices and cash.',
  },
  {
    slug: 'glove',
    summary:
      'Glove is field service software for plumbing, HVAC, electrical and other home service businesses. It answers calls and texts, books the job and sends the right technician, takes payment on site, and keeps maintenance plans on schedule.',
    does: [
      "Answer calls and texts day and night and book the job into a real open slot on a technician's calendar",
      'Turn requests from your website, Google and texts into quotes with good, better and best options, signed online with a deposit, and follow up until the customer says yes',
      'Dispatch from a drag-and-drop board with a live map, routes for every van, and a reshuffled day when a job runs long',
      'Give technicians the job, history and photos on their phone, with signatures and payment on site, even with no signal',
      'Take card, ACH and tap-to-pay payments, stop reminders when the balance reaches zero, and sync with QuickBooks Online',
      'Sell yearly maintenance plans that book every visit and renew themselves',
      'Track time, job costs and margin, and ask for a review after every paid job',
      'Keep a full record of every call, change and payment, and export everything at any time',
    ],
    promises: [
      {
        id: 'GLOVE-03',
        text: 'A person approves the exact price of one quote revision; any price change is a new revision that needs its own approval, and earlier ones stay on the record.',
        category: 'approval',
      },
      {
        id: 'GLOVE-04',
        text: "A quote is never claimed as delivered unless it truly was, and the customer's answer is recorded with who answered, how and who recorded it.",
        category: 'evidence',
      },
      {
        id: 'GLOVE-05',
        text: 'A booking that overlaps another visit for the same technician is refused until the dispatcher reviews those exact conflicts and confirms.',
        category: 'schedule',
      },
      {
        id: 'GLOVE-06',
        text: 'Field notes, photos and checklist results stay on the phone until the server confirms them, and resending after a lost signal lands each one exactly once.',
        category: 'reliability',
      },
      {
        id: 'GLOVE-08',
        text: "A job is completed only when every required checklist item is done or marked not applicable with a reason, with the customer's signature or the reason they could not sign.",
        category: 'evidence',
      },
      {
        id: 'GLOVE-09',
        text: 'An exported invoice is never changed; a correction is a new approved revision that exports as its own numbered row.',
        category: 'history',
      },
      {
        id: 'CUST-005',
        text: 'Customers sharing a phone number, email or address are flagged for a merge review, and a merge can be undone.',
        category: 'undo',
      },
      {
        id: 'GLOVE-10',
        text: "An agent can prepare quote drafts, dispatch proposals and invoice drafts, but can never approve, decide its own work or perform a person's step.",
        category: 'ai',
      },
      {
        id: 'GLOVE-11',
        text: 'Moving in shows a dry-run preview first, keeps every original ID and file, writes nothing when repeated unchanged, and can be undone.',
        category: 'import',
      },
      {
        id: 'GLOVE-12',
        text: 'Every job shows who did each step, in which role, and the whole business can be exported and restored into a fresh installation.',
        category: 'export',
      },
    ],
    moveIn: [
      'Jobber',
      'Housecall Pro',
      'ServiceTitan',
      'FieldPulse',
      'Workiz',
      'ServiceM8',
    ],
    runsOn:
      'Your own computer to try it; your own Cloudflare account to run it for real',
    version: 'v0.1.0',
    contractUrl: 'https://run-glove.com/contract',
    seoTitle: 'Glove: free, open-source alternative to Jobber',
    seoDescription:
      'Glove is free, open-source field service software for plumbers and HVAC pros: calls, quotes, dispatch, on-site payment and maintenance plans.',
  },
  {
    slug: 'larder',
    summary:
      'Larder is manufacturing and inventory software for small makers. It plans your materials and machines before offering a ship date, runs the shop floor, traces every lot, costs every job and keeps QuickBooks in sync.',
    does: [
      'Check materials, machines and people before quoting a ship date, then price the job',
      'Work out what to buy and make from the recipe, and draft the purchase and work orders with dates',
      'Reserve only free stock so two orders never claim the same goods, and make to the recipe revision you released',
      'Receive partial deliveries, record supplier lots and expiry, hold stock in quarantine, and trace any lot forward to orders or back to inputs',
      'Lay jobs onto real machines and people, and offer fixes when a machine goes down or a supplier is late',
      'Let operators start and stop work on a tablet and log good output and scrap',
      'Ship wholesale, Shopify and Amazon orders from one list, with labels and tracking',
      'Cost every order against the quote and post invoices and journals to QuickBooks, and move in from Katana, MRPeasy, Fishbowl, Odoo, Fulcrum or DOSS',
    ],
    promises: [
      {
        id: 'LARDER-003',
        text: 'Releasing work pins the active recipe revision; a later revision never changes work that was already released.',
        category: 'history',
      },
      {
        id: 'LARDER-005',
        text: 'Confirming or reserving takes only available stock; concurrent orders cannot consume the same stock, and a retried command returns its first outcome.',
        category: 'reliability',
      },
      {
        id: 'LARDER-007',
        text: 'A buyer or manager approves a draft purchase order with its exact terms and cash exposure recorded, and changes to the expected delivery keep their history.',
        category: 'approval',
      },
      {
        id: 'LARDER-008',
        text: 'Receiving part of a purchase order records supplier lots, lets stock be held in quarantine until a recorded release or rejection, and refuses over-receipt.',
        category: 'evidence',
      },
      {
        id: 'TRACE-003',
        text: 'Lots record expiry dates and the oldest-expiry lot is proposed first; expired or held stock is blocked unless a documented decision allows it.',
        category: 'evidence',
      },
      {
        id: 'LARDER-011',
        text: "Stock counts need a second person's approval, stale counts are refused, and corrections are linked entries that leave the original in place.",
        category: 'undo',
      },
      {
        id: 'LARDER-012',
        text: 'Each accountant handoff is an immutable, valued batch that downloads as CSV, with ledger references acknowledged line by line.',
        category: 'export',
      },
      {
        id: 'LARDER-013',
        text: 'One queue shows shortages, overdue purchases, quarantine and waiting approvals, and the owner can export the complete business with a checksum and restore it into an empty installation.',
        category: 'export',
      },
      {
        id: 'LARDER-015',
        text: 'Agents can prepare order intake, replenishment and merges, but only people approve; pasted enquiries are kept as data and never obeyed.',
        category: 'ai',
      },
      {
        id: 'LARDER-016',
        text: 'Moving in from Odoo shows a dry run first, lists every rejected row with its reason, and can be undone.',
        category: 'import',
      },
    ],
    moveIn: ['Katana', 'MRPeasy', 'Fishbowl', 'Odoo', 'Fulcrum', 'DOSS'],
    runsOn:
      'Your own computer to try it; your own Cloudflare account to run it for real',
    version: 'v0.1.3',
    contractUrl: 'https://run-larder.com/contract',
    seoTitle: 'Larder: free, open-source alternative to Katana',
    seoDescription:
      'Larder is free, open-source manufacturing software that plans materials and machines, runs the shop floor, traces lots and costs every job.',
  },
  {
    slug: 'locket',
    summary:
      'Locket is contract management for growing businesses. It checks drafts against your own playbook, sends them for signature, files the signed copy exactly as signed, and emails reminders before every renewal deadline so each one is decided in time.',
    does: [
      'Start a contract from a deal in your CRM, filling the order form from its line items',
      'Check an agreement against your playbook and suggest wording for each breach',
      "Keep every version, including the other side's markup, compare any two line by line, and approve the exact version that goes out",
      'Route approvals by rule, such as the CFO for large deals, and take the decision from Slack',
      'Send for signature, follow the envelope, and file the signed PDF and certificate in your drive',
      'Confirm dates, renewal terms and notice periods against the signed words and give every obligation an owner and due date',
      'Email reminders ahead of each notice deadline, escalate if nobody decides, and put the deadline on a calendar',
      'Ask questions across all agreements, see renewal briefs that check invoices against the contract, and move in your Ironclad or DocuSign archive',
    ],
    promises: [
      {
        id: 'REPO-001',
        text: 'An imported agreement keeps its original bytes, source system and ID, and the same file or source ID cannot be imported twice.',
        category: 'import',
      },
      {
        id: 'DRAFT-001',
        text: 'Only an approved template version can be used to draft, and a later template version never rewrites an agreement already produced.',
        category: 'approval',
      },
      {
        id: 'NEG-001',
        text: 'Revisions and counterparty markups are kept as versions with the originals untouched, and a version added against a stale view is refused.',
        category: 'history',
      },
      {
        id: 'APPROVE-001',
        text: 'Approvals are tied to the exact version, a requester cannot approve their own request, and a new version or value change withdraws earlier approvals.',
        category: 'approval',
      },
      {
        id: 'EXEC-001',
        text: 'An agreement counts as executed only when the signed PDF and certificate match the envelope and signers; a mismatch stays unsigned until counsel decides.',
        category: 'evidence',
      },
      {
        id: 'TERMS-001',
        text: 'Dates, renewal terms and notice periods are confirmed by a person against words from the signed text, and a correction keeps the history.',
        category: 'evidence',
      },
      {
        id: 'RENEW-001',
        text: "A notice deadline runs to the end of its day in the agreement's own time zone, and a notice is approved by someone other than its preparer before it is sent.",
        category: 'schedule',
      },
      {
        id: 'RENEW-002',
        text: 'Renewal reminders go out by email ahead of each deadline, escalate if no decision is recorded by the 30-day reminder, and a bounced reminder is retried to another person.',
        category: 'alerts',
      },
      {
        id: 'ACCESS-001',
        text: 'A restricted agreement and everything attached to it, including search results, is invisible to anyone not granted access.',
        category: 'privacy',
      },
      {
        id: 'PROPOSE-001',
        text: 'Agents prepare proposals with evidence, and a person approves them through the same checks as doing the work by hand.',
        category: 'ai',
      },
    ],
    moveIn: [
      'Ironclad',
      'DocuSign archive',
      'Icertis',
      'Agiloft',
      'SpotDraft',
      'Juro',
      'PandaDoc',
      'Adobe Acrobat Sign',
    ],
    runsOn:
      'Your own computer to try it; your own Cloudflare account to run it for real',
    version: 'v0.1.3',
    contractUrl: 'https://run-locket.com/contract',
    seoTitle: 'Locket: free, open-source alternative to Ironclad',
    seoDescription:
      'Locket is free, open-source contract management that checks drafts against your playbook, files signed copies and reminds you before every renewal.',
  },
  {
    slug: 'lodge',
    summary:
      "Lodge is hiring software for small employers. It publishes your approved jobs, schedules interviews, gathers each interviewer's independent scorecard and carries every hire from signed offer into your HR system.",
    does: [
      'Approve the exact pay range, headcount and hiring manager, then post the job to your careers page and the job boards',
      'Take applications on a page anyone can use, read resumes for you, send every applicant a receipt, and review everyone from one queue',
      "Let candidates pick their own interview times from your team's calendars, and rebook when an interviewer is out",
      "Keep each interviewer's scorecard private until the manager releases feedback, then summarise where they agree and differ with the passages cited",
      'Fill offers from your template, track the signature, and redraft and re-sign when the start date changes',
      'Record who moved a candidate between stages, when and why, and have a person decide possible duplicate candidates',
      'Create the employee in your HR system after the offer is signed and the background check is clear, then read it back',
      'Report time to fill, hiring sources and cost per hire, and move in your Workable, Greenhouse or Lever history with a preview first',
    ],
    promises: [
      {
        id: 'LDG-001',
        text: 'Publishing a job needs approval of its exact title, pay range, hiring manager and headcount; any later change makes the approval stale.',
        category: 'approval',
      },
      {
        id: 'LDG-003',
        text: 'The application page works without scripts, shows the current privacy notice, refuses stale or foreign submissions, and gives each applicant a receipt.',
        category: 'privacy',
      },
      {
        id: 'LDG-005',
        text: 'Possible duplicate candidates are listed with reasons, and nothing is merged until a person decides, with every application and its history preserved.',
        category: 'approval',
      },
      {
        id: 'LDG-006',
        text: 'Interviewers see only the applications they are assigned to, without contact details or restricted answers, and removing a role removes their access at once.',
        category: 'access',
      },
      {
        id: 'LDG-007',
        text: 'Moving or closing an application needs a reason and keeps who and when in an unbroken history.',
        category: 'history',
      },
      {
        id: 'LDG-009',
        text: 'Each panellist writes their own scorecard with evidence for every rating, and no one, including the manager, reads it until feedback is released.',
        category: 'evidence',
      },
      {
        id: 'LDG-010',
        text: 'Candidate messages are approved as exact text and downloaded unsent for you to send; editing the text voids the approval.',
        category: 'approval',
      },
      {
        id: 'LDG-011',
        text: 'An offer outcome is recorded only against an approval of its exact terms, with a plain warning when pay falls outside the approved range.',
        category: 'approval',
      },
      {
        id: 'LDG-012',
        text: 'Legal holds block deletion, and deleting a candidate removes their records, files and related drafts together and leaves a receipt.',
        category: 'erasure',
      },
      {
        id: 'LDG-014',
        text: 'Moving in from Workable previews counts and set-aside rows first, writes nothing until you commit that exact preview, and can be undone.',
        category: 'import',
      },
    ],
    moveIn: ['Workable', 'Greenhouse', 'Lever', 'JazzHR', 'Ashby'],
    runsOn:
      'Your own computer to try it; your own Cloudflare account to run it for real',
    version: 'v0.1.0',
    contractUrl: 'https://run-lodge.com/contract',
    seoTitle: 'Lodge: free, open-source alternative to Greenhouse',
    seoDescription:
      'Lodge is free, open-source hiring software that posts approved jobs, schedules interviews, keeps scorecards independent and hands hires to HR.',
  },
  {
    slug: 'nectar',
    summary:
      'Nectar is subscription and usage billing for software and service businesses. It prices every plan and meter, sends exact invoices, collects by card and ACH through your processor, recovers failed payments and ties out the month.',
    does: [
      'Rate seats and metered usage to the cent, with the rule, quantity and price shown behind every invoice line',
      "Prepare a whole month's invoices the evening before billing day, send the clean ones on their own, and hold anything unusual for you",
      'Retry failed payments at the best time, email a one-click card update link, and never retry a stolen card',
      'Chase overdue invoices, find why they are unpaid and ask the right person for what is missing',
      'Let customers change plans in their own portal with the proration shown first, and answer your app at once about what they can use',
      'Catch mismatches between signed terms, usage and invoices, with a fix drafted for you to approve',
      'Close the month with invoices, payments, payouts and sales tax tied out, synced to QuickBooks and handed to your accountant',
      'Move in from Stripe Billing by rating a month in shadow first, then take over with the same cards and invoice numbers',
    ],
    promises: [
      {
        id: 'NEC-05',
        text: 'A usage event with the same ID and values is recorded once; reused with different values or an unknown customer it is rejected and reported.',
        category: 'reliability',
      },
      {
        id: 'USE-007',
        text: 'Usage is checked against the totals your sending system reports, and invoices affected by a gap are blocked until a person resolves it.',
        category: 'reliability',
      },
      {
        id: 'NEC-07',
        text: 'Rating is deterministic: the same inputs always give the same lines, and late usage bills in the next period at the price in effect when it happened.',
        category: 'reliability',
      },
      {
        id: 'NEC-08',
        text: 'A plan change is approved from an exact preview of the charges before and after, and the bill run charges exactly what was approved.',
        category: 'approval',
      },
      {
        id: 'NEC-10',
        text: 'Issued invoices get the next sequential number, keep their accepted calculation, and never change.',
        category: 'history',
      },
      {
        id: 'NEC-11',
        text: 'Credit notes cannot exceed what an invoice still owes, and every payment is recorded with its reference and allocated no further than the balance.',
        category: 'money',
      },
      {
        id: 'NEC-12',
        text: 'Overdue reminders state the exact balances and are approved by a person before they go out.',
        category: 'approval',
      },
      {
        id: 'NEC-13',
        text: 'Invoices, usage and subscriptions download as CSV, and the whole installation exports and restores with every row and calculation unchanged.',
        category: 'export',
      },
      {
        id: 'NEC-14',
        text: 'Agents can propose price versions, usage corrections and reminders, but a person approves or rejects each one, and Nectar works out the invoice effect itself.',
        category: 'ai',
      },
      {
        id: 'NEC-16',
        text: 'Moving in from Stripe Billing refuses an incomplete capture, previews everything first, can be undone, and bills nothing until you adopt each subscription.',
        category: 'import',
      },
    ],
    moveIn: [
      'Stripe Billing',
      'Chargebee',
      'Recurly',
      'Maxio',
      'Orb',
      'Metronome',
    ],
    runsOn:
      'Your own Cloudflare account; a local copy on your computer to try it',
    version: 'v0.1.0',
    contractUrl: 'https://run-nectar.com/contract',
    seoTitle: 'Nectar: free, open-source alternative to Stripe Billing',
    seoDescription:
      'Nectar is free, open-source subscription and usage billing with exact invoices, payment recovery, collections and a month-end close.',
  },
  {
    slug: 'pantry',
    summary:
      'Pantry is accounting for small businesses. It pulls in your bank and cards, catches every receipt, gets invoices paid and closes the month with your accountant. Every figure opens to the entries behind it.',
    does: [
      'Bring in bank, card, Stripe and Gusto transactions, backfill gaps without duplicates, and file the routine ones with rules',
      'Read receipts from a photo or a forwarded email, match each to its card charge and file it once',
      'Email invoices with a card or ACH link, send reminders on schedule, and match each payment to its deposit',
      'Show when a bank feed breaks and fill in the missed days once you sign in again',
      'Chase loose ends across your bank, payroll and inbox, asking you by text and showing what each fix changed',
      'Reconcile accounts, lock the month and let your accountant sign off in the same place',
      'Open any profit and loss, balance sheet or cash flow figure to the bills, receipts and vendors behind it, on a cash or accrual basis',
      'Track 1099 contractors and sales tax, move in from QuickBooks Online or Xero with balances checked to the cent, and export everything',
    ],
    promises: [
      {
        id: 'PAN-04',
        text: 'A second person approves the exact invoice version before it is issued, and a line with no tax decision stops approval.',
        category: 'approval',
      },
      {
        id: 'PAN-09',
        text: 'A statement reconciles only when every line is matched and the difference is zero; remaining differences are listed, never written off to finish.',
        category: 'evidence',
      },
      {
        id: 'PAN-11',
        text: 'Posted entries are never edited or deleted; a mistake is corrected by a dated reversal linked both ways.',
        category: 'undo',
      },
      {
        id: 'PAN-13',
        text: 'A month closes only when accounts are reconciled, nothing is unposted, bills have evidence and every question Pantry asked is answered; a locked month refuses new postings.',
        category: 'history',
      },
      {
        id: 'PAN-14',
        text: 'Anyone in the books can download the accountant package for a period and the general ledger as files.',
        category: 'export',
      },
      {
        id: 'PAN-15',
        text: 'Agents prepare matches, entries and close packets as proposals, and a person approves each one.',
        category: 'ai',
      },
      {
        id: 'PAN-16',
        text: 'Moving in from QuickBooks Online or Xero shows a dry run with tie-outs first, can be undone, and needs a sign-off.',
        category: 'import',
      },
      {
        id: 'PAN-17',
        text: 'Every receipt is kept byte for byte with its checksum, and reading it with your own model key never changes the original.',
        category: 'evidence',
      },
      {
        id: 'PAN-18',
        text: 'Pantry asks each question once, beside its exact record, with numbered answers that say what they change.',
        category: 'alerts',
      },
      {
        id: 'PAN-19',
        text: 'Stripe payouts post as one balanced entry split into sales, fees and refunds, and payouts or payroll Pantry cannot book by itself wait for a person.',
        category: 'money',
      },
    ],
    moveIn: ['QuickBooks Online', 'Xero', 'FreshBooks'],
    runsOn:
      'Your own computer to try it; your own Cloudflare account to run it for real',
    version: 'v0.2.8',
    contractUrl: 'https://run-pantry.com/contract',
    seoTitle: 'Pantry: free, open-source alternative to QuickBooks Online',
    seoDescription:
      'Pantry is free, open-source small-business accounting with bank feeds, receipt capture, invoices that get paid and a month-end close.',
  },
  {
    slug: 'pier',
    summary:
      'Pier is inventory and order software for US wholesalers and distributors. It tracks stock across warehouses, runs orders from sales channel to carrier, reorders before you run out and keeps your books in step.',
    does: [
      'Receive, put away, pick, pack and count from any phone or scanner so every bin knows what it holds',
      'Show one stock count across Shopify, Amazon, Faire and your own storefront',
      'Take purchase orders from big-box retailers by EDI and send the acknowledgment, ship notice and invoice on time',
      'Compare UPS, FedEx and USPS rates, print the label and send tracking to your customer',
      'Suggest reorders from real sell-through, draft the purchase order with landed cost and give backorders a real date',
      'Sync items, invoices, bills, cost of goods and inventory value with QuickBooks Online and Xero',
      'Let an inventory agent forecast, send the purchase order, chase the supplier and re-promise affected orders',
      'Move in from Cin7, inFlow or Fishbowl with items, bins, stock and open orders, and export everything',
    ],
    promises: [
      {
        id: 'PIER-004',
        text: 'Orders reserve only available stock; Pier never creates stock, reserves a unit twice or allows negative sellable stock.',
        category: 'reliability',
      },
      {
        id: 'PIER-005',
        text: 'A purchase order is approved with its exact supplier, quantity, price and promise date, and a material change voids the approval.',
        category: 'approval',
      },
      {
        id: 'PIER-006',
        text: 'Part of a purchase order can be received into named bins with its cost, and an invalid line never partly posts a valid receipt.',
        category: 'reliability',
      },
      {
        id: 'PIER-007',
        text: 'A receipt is corrected with a physical count and a linked adjustment; originals remain and stale counts cannot overwrite later movement.',
        category: 'undo',
      },
      {
        id: 'PIER-009',
        text: "Dispatch uses only an order's own reservations, and a retry never takes stock out twice.",
        category: 'reliability',
      },
      {
        id: 'STOCK-001',
        text: 'Every item shows its stock at each warehouse and bin: on hand, reserved, available, in transit and expected from open purchase orders, with totals per warehouse and for the company.',
        category: 'reliability',
      },
      {
        id: 'PIER-011',
        text: 'Counts are taken at a captured point in time; a movement after the count makes its review stale and an estimate never replaces a physical count.',
        category: 'evidence',
      },
      {
        id: 'PIER-012',
        text: 'Every balance traces to its movements, documents, actors and reasons, and the whole installation exports and restores without posting openings twice.',
        category: 'export',
      },
      {
        id: 'SEC-001',
        text: 'Every write rechecks the current session, role and approved version, and movements are append-only with corrections as linked entries.',
        category: 'security',
      },
      {
        id: 'AGENT-001',
        text: 'Agents can propose replenishment and count work with assumptions, but people approve each stock or purchase consequence and a model never creates stock.',
        category: 'ai',
      },
    ],
    moveIn: ['Cin7 Core', 'inFlow Inventory', 'Fishbowl Warehouse'],
    runsOn:
      'Your own computer to try it; deploys to an owner-configured Cloudflare target when you choose',
    version: 'v0.1.0',
    contractUrl: 'https://run-pier.com/contract',
    seoTitle: 'Pier: free, open-source alternative to Cin7',
    seoDescription:
      'Pier is free, open-source inventory and order software for US wholesalers: warehouse scanning, channels, EDI, shipping, reorders and synced books.',
  },
  {
    slug: 'purse',
    summary:
      'Purse is purchasing software for growing US businesses. It follows every purchase from request to invoice, so you know what is approved, ordered and still to arrive.',
    does: [
      'Approve the exact order: change the supplier, quantity or price and it becomes a new revision that needs approval again',
      'Compare supplier quotes side by side, with anything a supplier left out marked as missing',
      'Receive what arrived, with every line showing what is accepted and what is still outstanding',
      'Match each invoice to its order lines, show price, quantity and receipt differences, and download the accounting file once it is right',
      'Hold spend against budgets and approval chains before it is committed',
      'Show what is still owed, late deliveries and supplier renewals on one page',
      'Keep a supplier register where blocked suppliers cannot be ordered from',
      'Move in from a spreadsheet with every row previewed first and an undo',
    ],
    promises: [
      {
        id: 'PUR-002',
        text: 'Blocked suppliers cannot be used for purchasing, and the register keeps contacts, documents and the reasons.',
        category: 'access',
      },
      {
        id: 'INVOICE-003',
        text: "Near-duplicate invoices, a repeated document image, changed remit-to details and invoices above an order's remaining balance are flagged, and a flagged invoice cannot be approved for payment until it is resolved.",
        category: 'money',
      },
      {
        id: 'PUR-006',
        text: 'Approval policy applies to the exact request revision, self-approval fails, and concurrent requests cannot overspend a budget.',
        category: 'approval',
      },
      {
        id: 'PUR-007',
        text: 'Approve, reject and return decisions keep who, when, why and the revision, and delegation expires.',
        category: 'history',
      },
      {
        id: 'PUR-008',
        text: 'Approved lines become numbered purchase orders exactly once, even when converted at the same time.',
        category: 'reliability',
      },
      {
        id: 'PUR-009',
        text: "Changing a purchase order's supplier, quantity or cost needs renewed approval before the amendment is issued, and issued history is kept.",
        category: 'approval',
      },
      {
        id: 'PUR-010',
        text: 'Partial receipts, returns and cancellations keep their reasons, and over-receipt is refused.',
        category: 'evidence',
      },
      {
        id: 'PUR-011',
        text: 'An invoice is recorded once per supplier and reference, differences are exposed, and the accounting file exports once without posting or paying anything.',
        category: 'money',
      },
      {
        id: 'PUR-013',
        text: 'Moving in from a spreadsheet previews every row, commits only the reviewed batch, and can be undone; imported status never grants approval.',
        category: 'import',
      },
      {
        id: 'PUR-017',
        text: 'Every page and download checks the current session and permissions, and forged roles or totals cannot authorise anything.',
        category: 'security',
      },
    ],
    moveIn: ['Procurify', 'Coupa', 'Precoro', 'Spreadsheets (CSV)'],
    runsOn:
      'Your own computer to try it; your own Cloudflare account to run it for real',
    version: 'v0.1.1',
    contractUrl: 'https://run-purse.com/contract',
    seoTitle: 'Purse: free, open-source alternative to Procurify',
    seoDescription:
      'Purse is free, open-source purchasing software for US businesses: requests, approvals, purchase orders, receiving and invoice matching with a clear record.',
  },
  {
    slug: 'willow',
    summary:
      'Willow is HR software for US employers with 20 to 200 people. It keeps your people records, welcomes new hires, handles time off and changes, and makes payroll, benefits and access agree.',
    does: [
      "Keep every person's job, pay, manager and documents in one dated record, with a directory and org chart, so you can see what was true on any day",
      'Give each new hire a checklist with owners and deadlines and chase every step until it is done',
      'Let people request time off and update their details, with managers approving in one tap and balances kept right',
      "Send offer letters and policies for e-signature and file them to each person's record",
      'Keep payroll in step with Gusto, ADP RUN, QuickBooks Payroll and Paychex and catch differences before payday',
      'Open and close Google Workspace, Microsoft 365 and Okta accounts on time and check each is really gone',
      'Carry an approved raise, move or leave through payroll, benefits, access and time off with a change agent',
      'Move in from BambooHR, Rippling or HiBob, and export everything at any time',
    ],
    promises: [
      {
        id: 'WIL-03',
        text: 'Pay, private contact details and confidential reasons stay hidden from anyone without the grant, through every page, download, summary and agent.',
        category: 'privacy',
      },
      {
        id: 'WIL-05',
        text: "Joiner, mover and leaver cases follow versioned templates, only a task's assignee can complete it, and a case cannot finish while a task is open.",
        category: 'approval',
      },
      {
        id: 'WIL-07',
        text: 'A change of terms is a new version effective from a date; past and future versions are kept, cancelled ones stay on record, and none are edited.',
        category: 'history',
      },
      {
        id: 'WIL-10',
        text: 'The leave ledger is append-only, and concurrent requests cannot spend the same hours.',
        category: 'reliability',
      },
      {
        id: 'WIL-11',
        text: 'Payroll change batches are built from one consistent snapshot, list anything without a payroll identifier as an exception, and are reviewed before handoff.',
        category: 'approval',
      },
      {
        id: 'WIL-12',
        text: "A departure cannot be marked complete while account and device tasks lack evidence, and ending access removes the person's sign-in and permissions.",
        category: 'evidence',
      },
      {
        id: 'WIL-13',
        text: 'A rehire is a new employment period; earlier history is unchanged and ended access is never restored.',
        category: 'history',
      },
      {
        id: 'WIL-15',
        text: 'Agents propose joiners and movers with the exact changes shown, HR approves the exact plan, and a plan whose records changed is refused.',
        category: 'ai',
      },
      {
        id: 'WIL-16',
        text: 'Moving in from BambooHR shows a dry run first, can be undone, and keeps the original files and source rows.',
        category: 'import',
      },
      {
        id: 'WIL-17',
        text: 'The owner can export every record and document and restore it into a fresh installation, with sign-in recovered for current members.',
        category: 'export',
      },
    ],
    moveIn: [
      'BambooHR',
      'Rippling',
      'HiBob',
      'Gusto HR',
      'Factorial',
      'Deel HR',
    ],
    runsOn:
      'Your own computer to try it; your own Cloudflare account to run it for real',
    version: 'v0.1.0',
    contractUrl: 'https://run-willow.com/contract',
    seoTitle: 'Willow: free, open-source alternative to BambooHR',
    seoDescription:
      'Willow is free, open-source HR software for US employers: people records, onboarding, time off, payroll sync and access that all agree.',
  },
  {
    slug: 'auth',
    summary:
      "Auth is the sign-in you run yourself for your team. People sign in with passkeys or email links, and one sign-in works across the apps you link and your company's other apps. It keeps one directory of people, creates and removes their accounts in your apps, and signs them out of everything in one step.",
    does: [
      'Sign people in with passkeys and email links, with administrators always using a passkey',
      "Keep everyone in one directory: invite people, allow your company's email domain and suspend access from a single list",
      'Give one sign-in across the apps you link, and sign people out of every linked app at once',
      "Connect your company's other apps by SAML or OpenID Connect and give access by person or group",
      'Create, update and switch off accounts in apps that support SCIM, and show when each change was confirmed',
      "Recover accounts with another administrator's approval, a 72-hour delay or a local emergency token, and require Google, Microsoft or Okta for a domain",
      'Let an agent prepare changes that a person approves with a passkey, and keep a record of every account and sign-in event',
      'Stage a user list from Google Workspace, Microsoft Entra, Auth0, Okta or JumpCloud for review, and export or restore people, apps and the signed grant map',
    ],
    promises: [
      {
        id: 'AUTH-PRIVACY-001',
        text: "Auth shares each person's email and name with the apps they use, and only what each app has been granted.",
        category: 'privacy',
      },
      {
        id: 'AUTH-IDENTITY-001',
        text: 'An email sign-in link completes only in the browser that asked for it, and administration needs a hardware passkey plus a fresh email confirmation.',
        category: 'security',
      },
      {
        id: 'AUTH-IDENTITY-001',
        text: "Recovering an administrator needs another administrator's approval, a cancellable notified 72-hour delay, or the local emergency token.",
        category: 'access',
      },
      {
        id: 'AUTH-PROTOCOL-001',
        text: "Access tokens last at most five minutes and can only be used to read the signed-in person's own identity details.",
        category: 'security',
      },
      {
        id: 'AUTH-SAML-001',
        text: 'A company app gets a sign-in only for people assigned to it; forged, replayed, stale or misaddressed requests are refused.',
        category: 'access',
      },
      {
        id: 'AUTH-SCIM-001',
        text: "When someone leaves, their access is switched off here first, and each app's account stays on a to-do list until it is confirmed closed.",
        category: 'reliability',
      },
      {
        id: 'AUTH-LOGOUT-001',
        text: 'Signing out everywhere or suspending a person tells every linked app to end their session, retrying for up to 24 hours.',
        category: 'security',
      },
      {
        id: 'AUTH-MOVEIN-001',
        text: 'People staged from another provider cannot sign in or receive mail until you admit them, and admission carries no password, passkey, role or session.',
        category: 'import',
      },
      {
        id: 'AUTH-ADMIN-001',
        text: 'An agent only prepares administration work and a person decides; its key is shown once, expires after 30 days and ends if its administrator is removed.',
        category: 'ai',
      },
      {
        id: 'AUTH-TRANSFER-001',
        text: 'Exports carry people, passkey public keys, apps and a signed grant map, and leave out sessions and private keys.',
        category: 'export',
      },
    ],
    moveIn: [
      'Google Workspace',
      'Microsoft Entra',
      'Auth0',
      'Okta',
      'JumpCloud',
    ],
    runsOn:
      'Your own computer to try it; a host you choose and run yourself for real use',
    version: 'v0.1.0',
    contractUrl: 'https://run-auth.com/contract',
    seoTitle: 'Auth: free, open-source alternative to Auth0',
    seoDescription:
      'Auth is free, open-source sign-in for your team: passkeys, one login across your apps, and accounts created and removed automatically.',
  },
  {
    slug: 'balm',
    summary:
      'Balm is practice software for a US physical, occupational or speech therapy clinic. It runs your schedule, patient intake, notes and reminders, and bills insurance and patients through to paid. A case agent follows each referral from authorization to paid claim.',
    does: [
      'Keep the schedule full with recurring visits, online booking from real open times, and a waitlist that is offered cancelled slots',
      'Collect intake, consent and insurance cards from one link, with home exercises and secure messages in the patient portal',
      'Write PT, OT and speech notes from templates, let the scribe draft from the visit for you to review and sign, and count billed units under the 8-minute rule',
      'Check eligibility, track authorizations, send claims through Claim.MD or Availity, post payments from the remittance and show denials with the fix',
      'Take patient payments with cards on file, text-to-pay links, copays at check-in, statements and superbills',
      'Send text and email reminders that patients confirm or reschedule with one reply',
      'Let the case agent spot stalled referrals, cite the record and line up the next step',
      'Import patients, appointments, notes and balances from WebPT, SimplePractice, Jane or Cliniko and check the totals before you switch',
    ],
    promises: [
      {
        id: 'BALM-001',
        text: 'Every page and request checks who is signed in; practitioners see only the clients they are booked with, and reception never sees intake answers or treatment notes.',
        category: 'access',
      },
      {
        id: 'BALM-001',
        text: "An assistant's key can only prepare work; a person approves each item, the approval keeps a fingerprint of exactly what was approved, and removing access takes effect on the next request.",
        category: 'ai',
      },
      {
        id: 'BALM-004',
        text: 'A note is a draft until its author signs the exact latest version; signing locks it, later changes are signed addenda, and billed units follow the 8-minute rule.',
        category: 'history',
      },
      {
        id: 'CHART-001',
        text: 'Treatment notes can be read only by their author and the owner, and an amendment adds a revision that keeps every earlier text.',
        category: 'privacy',
      },
      {
        id: 'BALM-003',
        text: "Patients pay through the clinic's own Stripe account; card numbers never reach Balm, and each payment posts once and never above the invoice.",
        category: 'money',
      },
      {
        id: 'BILL-001',
        text: 'An invoice is numbered and its bytes fixed only when a person approves it, approval is refused if anything frozen has changed, and voiding keeps the number.',
        category: 'money',
      },
      {
        id: 'AUDIT-001',
        text: 'Every opening of a patient file, read of notes or intake, change and download is added to an append-only log that holds no patient details.',
        category: 'evidence',
      },
      {
        id: 'ERASE-001',
        text: 'An unused patient can be erased and an older backup cannot bring them back; a patient with health records is retained.',
        category: 'erasure',
      },
      {
        id: 'PORT-001',
        text: 'The whole clinic exports as one archive and restores into an empty installation; damaged archives and populated destinations are refused.',
        category: 'export',
      },
      {
        id: 'MOVE-001',
        text: 'A patient import is previewed row by row, applied exactly as reviewed, and can be undone without losing patients who have since been booked or edited.',
        category: 'undo',
      },
    ],
    moveIn: ['WebPT', 'SimplePractice', 'Jane', 'Cliniko'],
    runsOn: 'your own Cloudflare account (or on your computer to try it)',
    version: 'v0.1.4',
    contractUrl: 'https://run-balm.com/contract',
    seoTitle: 'Balm: free, open-source alternative to WebPT',
    seoDescription:
      'Balm is free, open-source practice software for US therapy clinics: scheduling, notes, reminders and insurance billing.',
  },
  {
    slug: 'blotter',
    summary:
      "Blotter is practice management for bookkeeping and tax firms. It schedules every client's recurring work against federal and state deadlines, chases documents and signatures, routes the work through review and collects the fee.",
    does: [
      "Work out each client's due dates, extensions included, and create each period's work ahead of time, already assigned",
      'Ask clients for documents through a private upload link and chase by email, portal and text until each file arrives',
      'Route work through a preparer and an assigned reviewer, whose sign-off is recorded with a note',
      'Show every return and job on one board by status and due date, and rebalance staff when someone is overbooked',
      'Collect e-file signatures with identity checks and track each return through to IRS acceptance or rejection',
      'Bill recurring fees on schedule, collect by ACH or card, and sync invoices and payments with QuickBooks Online and Xero',
      'Let an agent ask the exact question about each uncategorized bookkeeping line and flag work outside the signed scope, always for a person to approve',
      'Move in from Karbon, TaxDome, Canopy, Financial Cents or Double, and back up the whole practice',
    ],
    promises: [
      {
        id: 'WORK-002',
        text: "Approved recurring rules create each next period's work once and ahead of time with staff assigned; catching up after downtime never duplicates a job or changes past sign-offs.",
        category: 'schedule',
      },
      {
        id: 'WORK-005',
        text: "Staff see a due-date-ordered queue; preparers see their assigned jobs and cannot open another preparer's hidden job.",
        category: 'access',
      },
      {
        id: 'PORTAL-001',
        text: 'Clients upload through a private expiring link, rotating it revokes the old one, and finishing the job closes collection.',
        category: 'privacy',
      },
      {
        id: 'REVIEW-001',
        text: 'A job is signed off by its assigned reviewer, never the preparer, with a note, the person and the time recorded, and the signed-off checklist is locked.',
        category: 'approval',
      },
      {
        id: 'BILL-001',
        text: 'An approved billing export never changes afterwards, each time entry or fixed fee can be exported only once, and spreadsheet formulas in cells are neutralized.',
        category: 'money',
      },
      {
        id: 'ACCESS-001',
        text: 'Every private page checks the signed-in role and assigned-job visibility, cross-site writes are refused, and removing a team member takes effect at once.',
        category: 'access',
      },
      {
        id: 'AGENT-001',
        text: 'An assistant only prepares roll-forwards, reminders and exports; only its named person can approve or decline, and a revoked key stops working.',
        category: 'ai',
      },
      {
        id: 'ARCHIVE-001',
        text: 'The whole practice downloads as an integrity-checked archive and restores into an empty installation; damaged archives are refused.',
        category: 'export',
      },
      {
        id: 'ERASURE-001',
        text: 'After a client file is erased, an older backup cannot restore it when the newer record of the erasure is supplied.',
        category: 'erasure',
      },
      {
        id: 'AUDIT-001',
        text: 'Every change keeps who did it, what and when, including reviewer notes, approvals and erasure reasons, and the owner can read the history.',
        category: 'history',
      },
    ],
    moveIn: [
      'Karbon',
      'TaxDome',
      'Canopy',
      'Financial Cents',
      'Double',
      'Client list (CSV)',
    ],
    runsOn: 'your own Cloudflare account (or on your computer to try it)',
    version: '',
    contractUrl: 'https://run-blotter.com/contract',
    seoTitle: 'Blotter: free, open-source alternative to Karbon',
    seoDescription:
      'Blotter is free, open-source practice management for bookkeeping and tax firms: deadlines, client documents, review, billing and e-file tracking.',
  },
  {
    slug: 'buoy',
    summary:
      'Buoy is customer success software for subscription companies. It joins CRM, billing, support and usage data for every account, explains its health, runs your playbooks and reconciles renewals to billing.',
    does: [
      'Join CRM, billing, support and usage data for each account, with every fact showing its source and how fresh it is',
      'Score account health with weights you choose, and name the measure and source behind every point of change',
      'Alert your team in Slack and show the same health beside the account in Salesforce and the ticket in Zendesk',
      'Run playbooks such as a champion change or a detractor follow-up, with owners, tasks, reminders and tracked outcomes',
      "Check that a ticket marked solved is really fixed against the customer's own usage, and close a risk only on that evidence",
      'Plan onboarding on one plan your team and the customer can both see, with a customer portal for their tasks',
      'Track each renewal from notice date through signature, check it landed in Salesforce and Stripe, and tie retention figures back to billing',
      'Move in from Gainsight, ChurnZero, Totango, Planhat, Vitally or Velaris, keeping the Salesforce fields your reports read',
    ],
    promises: [
      {
        id: 'HTTP-001',
        text: 'Every request checks the current sign-in, role and origin; assistant credentials can only read and prepare.',
        category: 'access',
      },
      {
        id: 'DATA-001',
        text: 'Every account fact carries its source, reference and time; missing or stale evidence stays visible beside the value, and a refresh never silently overwrites anything.',
        category: 'evidence',
      },
      {
        id: 'APPROVAL-001',
        text: 'A proposal captures the account as it stood; approval records who approved and when, is checked against that same version, and a replay changes nothing.',
        category: 'approval',
      },
      {
        id: 'APPROVAL-001',
        text: 'Completing an action needs separate evidence, and refreshing the source data never rewrites earlier decisions.',
        category: 'history',
      },
      {
        id: 'GOVERN-001',
        text: 'Each agent has an expiring, revocable credential with named scopes, a spend budget and rate limits; it cannot approve its own proposals, every action is logged, and one switch stops all agents.',
        category: 'ai',
      },
      {
        id: 'AUDIT-001',
        text: 'Sign-ins, role changes, exports, erasures, approvals and every agent action are recorded with who, when and what, and the record survives erasure of its subject with personal details removed.',
        category: 'history',
      },
      {
        id: 'IMPORT-001',
        text: 'An import applies only the data you reviewed, is journalled, and undo is refused for accounts that were edited or have dependent work.',
        category: 'undo',
      },
      {
        id: 'ERASE-001',
        text: 'Erasing an account removes its work, decisions and imported copies together and stops it being re-imported; copies held by connected systems are listed for you to action.',
        category: 'erasure',
      },
      {
        id: 'BOUNDARY-003',
        text: 'Health scores and forecasts are explainable judgments over the data present, not guaranteed churn predictions; missing data stays visible and people decide what to do.',
        category: 'other',
      },
      {
        id: 'BOUNDARY-001',
        text: 'Buoy reads billing and never charges cards, runs dunning or changes subscriptions; your billing system stays authoritative for invoices and cash.',
        category: 'money',
      },
    ],
    moveIn: [
      'Gainsight',
      'ChurnZero',
      'Totango',
      'Planhat',
      'Vitally',
      'Velaris',
    ],
    runsOn: 'your own Cloudflare account (or on your computer to try it)',
    version: 'v0.1.3',
    contractUrl: 'https://run-buoy.com/contract',
    seoTitle: 'Buoy: free, open-source alternative to Gainsight',
    seoDescription:
      'Buoy is free, open-source customer success software: explained account health, playbooks, verified fixes and renewals that tie to billing.',
  },
  {
    slug: 'cabin',
    summary:
      'Cabin is vacation rental software for hosts and managers of three to forty homes. It syncs Airbnb, Vrbo and Booking.com, answers your guests, sends the cleaner and the door code, and turns every payout into an owner statement.',
    does: [
      'Keep one calendar across Airbnb, Vrbo and Booking.com so a night booked anywhere closes everywhere, and decline requests that overlap',
      'Put every guest in one inbox across channels, text and email, with scheduled messages and drafted replies that wait for your nod',
      'Take direct bookings on your own site with Stripe, a rental agreement, ID check and damage deposit',
      'Follow demand with rates from PriceLabs or Wheelhouse, minimum nights, gap rules and fees',
      'Create a turnover and door code for every reservation, and have cleaners tick a checklist and send photos',
      'Rebook the cleaner, reset the door code and offer an approved credit when a stay goes wrong',
      'Match Airbnb, Vrbo and Stripe payouts to stays, send owner statements and a portal, and sync the books to QuickBooks',
      'Move in from Guesty, Hostaway or OwnerRez with listings, reservations, guests and owner balances',
    ],
    promises: [
      {
        id: 'AUTH-001',
        text: 'Only the owner grants manager or cleaner access, every private page checks the signed-in role, cleaners see only their assigned jobs, and removing access applies on the next request.',
        category: 'access',
      },
      {
        id: 'CONTROL-001',
        text: 'Calendar changes, turnovers and statements are not published on their own: a manager approves the exact version, with who and when recorded, and a stale approval is refused.',
        category: 'approval',
      },
      {
        id: 'CONTROL-002',
        text: "An assistant's key can only prepare drafts, can be revoked at once, and can never approve, finish work, invite people or erase records.",
        category: 'ai',
      },
      {
        id: 'SYNC-001',
        text: 'Calendar files are reviewed before use: additions, changes, cancellations and overlaps are listed, each needs a fresh approval, and malformed files are refused.',
        category: 'evidence',
      },
      {
        id: 'CABIN-02',
        text: 'A request for nights held on another channel is declined with the overlapping stay named, and a collision arriving from two channels is kept and shown as a double booking to resolve.',
        category: 'reliability',
      },
      {
        id: 'EVIDENCE-001',
        text: "A cleaner's completed checklist and photo are private to the team and cannot be changed or completed twice once recorded.",
        category: 'evidence',
      },
      {
        id: 'CABIN-08',
        text: "When a cleaner cancels, Cabin proposes a backup cleaner, a new door code and a guest credit, acts only on exact approval or within the owner's limits, and closes once the home is verified ready.",
        category: 'approval',
      },
      {
        id: 'PAY-003',
        text: "A damage deposit is held, not charged, and released automatically after checkout unless a claim is opened; claims need evidence and a person's approval, and repeated clicks cannot refund twice.",
        category: 'money',
      },
      {
        id: 'FIN-004',
        text: 'Owner statements come from the reconciled books, a manager reviews them before release, sent versions are frozen, and corrections issue traceable adjustments rather than rewriting them.',
        category: 'money',
      },
      {
        id: 'CABIN-11',
        text: 'Moving in from Guesty, Hostaway or OwnerRez shows a preview with each refused row, reconciles the result, and can be undone without losing records changed since.',
        category: 'undo',
      },
    ],
    moveIn: ['Guesty', 'Hostaway', 'OwnerRez'],
    runsOn: 'your own Cloudflare account (or on your computer to try it)',
    version: 'v0.1.0',
    contractUrl: 'https://run-cabin.com/contract',
    seoTitle: 'Cabin: free, open-source alternative to Guesty',
    seoDescription:
      'Cabin is free, open-source vacation rental software: channel sync, guest inbox, turnovers, direct bookings and owner statements.',
  },
  {
    slug: 'coffer',
    summary:
      "Coffer is donor management for a US nonprofit. It takes donations online, keeps every donor's story, sends receipts and thank-yous, and shows who needs a call. It reconciles gifts with Stripe and your books, and moves in your history from the donor system you use now.",
    does: [
      'Take gifts on campaign pages and forms, once or monthly, by card, bank or Apple Pay, with a portal where donors update their own card',
      'Keep households, relationships, every gift and every conversation on one record, with soft credits, tributes and employer matches',
      'Choose who to ask from giving history and consent, then send appeals through Mango or Mailchimp and print-ready letters to donors who prefer paper, honoring unsubscribes everywhere',
      'Thank donors by name within minutes with a tax receipt that carries the right IRS wording, and send each donor one year-end statement by email or on paper',
      'Sync Stripe gifts, fees, refunds and failed monthly gifts, and match each payout to its deposit in QuickBooks Online or Pantry, fund by fund',
      'Report who gave again and who lapsed, and track major gifts with next steps and owners',
      'Let the development agent reconcile gifts, rescue failed monthly gifts, send missing receipts and rank who needs a call',
      "Move in from Little Green Light, Bloomerang or Raiser's Edge NXT and check the totals before you switch",
    ],
    promises: [
      {
        id: 'HTTP-001',
        text: "Every request checks the person's role, and a revoked sign-in or key stops working even for a request already in progress.",
        category: 'access',
      },
      {
        id: 'GIFT-001',
        text: 'Gifts are exact ledger lines that cannot be edited; a correction is a matching opposite line, once per gift, and a gift moves to another donor only through an audited merge or an erasure.',
        category: 'history',
      },
      {
        id: 'CONSENT-001',
        text: 'Consent is kept as a history per donor and channel, with method, evidence, date and who recorded it; the newest answer counts.',
        category: 'privacy',
      },
      {
        id: 'ACK-001',
        text: 'Gifts over your threshold are due a thank-you letter within the number of days you set; a person approves the exact letters, then exports them and records when they were sent.',
        category: 'approval',
      },
      {
        id: 'RCPT-002',
        text: 'An approved letter batch is emailed once per letter, donors without an address go to print, and the batch status comes from actual delivery.',
        category: 'alerts',
      },
      {
        id: 'APPEAL-001',
        text: 'An appeal includes only donors whose latest consent for that channel is yes, and approval and export are refused if any of that consent has since changed.',
        category: 'privacy',
      },
      {
        id: 'PAY-002',
        text: 'Each Stripe payout lists every gift, refund, dispute and fee in it, and a payout that does not add up to the deposit is flagged with the difference.',
        category: 'money',
      },
      {
        id: 'AGENT-001',
        text: "An assistant's key expires, can be revoked, and can only prepare letters and appeals; approvals record who prepared and who approved.",
        category: 'ai',
      },
      {
        id: 'IMPORT-001',
        text: 'A Stripe import is previewed, applied only as reviewed, journalled with the original pages and can be undone; failed, refunded and duplicate charges are skipped with reasons.',
        category: 'import',
      },
      {
        id: 'DATA-001',
        text: 'Erasing a donor (you type ERASE) removes their personal details, consent evidence and letter text, keeps gifts as anonymous ledger lines, and stops them returning from an import or older backup.',
        category: 'erasure',
      },
    ],
    moveIn: ['Little Green Light', 'Bloomerang', "Raiser's Edge NXT", 'Stripe'],
    runsOn: 'your own Cloudflare account (or on your computer to try it)',
    version: 'v0.1.0',
    contractUrl: 'https://run-coffer.com/contract',
    seoTitle: 'Coffer: free, open-source alternative to Bloomerang',
    seoDescription:
      'Coffer is free, open-source donor management for US nonprofits: online giving, receipts, thank-yous, appeals, major gifts and retention reporting.',
  },
  {
    slug: 'crank',
    summary:
      "Crank is workflow automation that connects your apps, runs every step on schedule, retries what fails and fixes the mapping when an app changes. You build workflows step by step, add a person's approval only where it matters, and use AI steps where they help.",
    does: [
      'Connect apps such as Stripe, QuickBooks, Shopify, Slack, Gmail, Google Sheets, HubSpot and Typeform, with sign-ins kept fresh',
      'Start workflows on a schedule, a new email, a form, a webhook or any app event, with duplicates caught before they run twice',
      'Build step by step with field mapping, filters, branches, loops, waits, code steps and reusable subflows',
      'Run every workflow unattended, trace each run step by step, and retry failed steps with growing waits while runs queue and resume in order when an app is down',
      'Add approval steps for refunds or large orders, and let routine actions run on standing rules',
      'Add AI steps and agents that use your tools, or describe a workflow in plain words and have Crank build it',
      'Repair the mapping when an app renames a field, test it on recent runs, replay held runs and ask a person only for a business choice',
      'Move in from Zapier, Make or Workato and run each workflow beside the old one until the results match',
    ],
    promises: [
      {
        id: 'TRIG-001',
        text: 'Each workflow gets private webhook addresses you can revoke and rotate, and a repeated event is recognized and run only once.',
        category: 'security',
      },
      {
        id: 'TRIG-002',
        text: 'You can start a run on demand or on a schedule in your own time zone, and run a published workflow over past records after seeing how many it will touch and what it will cost.',
        category: 'schedule',
      },
      {
        id: 'WORK-004',
        text: 'Delays and waits for an event survive restarts and updates, and a duplicate callback resumes a step only once.',
        category: 'schedule',
      },
      {
        id: 'EXEC-001',
        text: 'Published workflows run without anyone starting each run; queues show what is waiting, and work resumes from its last saved step after a restart or update.',
        category: 'reliability',
      },
      {
        id: 'EXEC-002',
        text: "Retries wait longer each time and respect each app's rate limits; a step that was never sent is told apart from one with an uncertain result, and work that runs out of attempts stays saved with its next action.",
        category: 'reliability',
      },
      {
        id: 'EXEC-004',
        text: 'A failed or incomplete step can be retried or resumed from its saved input after a preview, and a successful action is never silently repeated.',
        category: 'undo',
      },
      {
        id: 'HTTP-001',
        text: 'Web deliveries go only to the exact address your installation allows, carry a stable idempotency key, refuse redirects and count as successful only when the receiver returns its effect ID.',
        category: 'reliability',
      },
      {
        id: 'TEAM-003',
        text: "An assistant's credentials are scoped and revocable and can prepare and read but never activate, approve, replay or manage data.",
        category: 'ai',
      },
      {
        id: 'TEAM-004',
        text: 'Publishing a workflow authorizes exactly the steps it declares on the connections bound to it, and that authority ends when it is unpublished, replaced or a connection is revoked.',
        category: 'approval',
      },
      {
        id: 'DATA-002',
        text: 'Erasing completed run data removes sensitive inputs and outputs and leaves value-free receipts, so an older backup cannot bring them back.',
        category: 'erasure',
      },
    ],
    moveIn: ['Zapier', 'Make', 'Workato'],
    runsOn: 'your own Cloudflare account (or on your computer to try it)',
    version: '',
    contractUrl: 'https://run-crank.com/contract',
    seoTitle: 'Crank: free, open-source alternative to Zapier',
    seoDescription:
      'Crank is free, open-source workflow automation: connect your apps, run steps on schedule, retry failures and keep mappings repaired.',
  },
  {
    slug: 'evidence',
    summary:
      'Evidence gets a business ready for its security audit. It tests your controls around the clock, collects the proof, tracks fixes until they are verified and gives your auditor everything they ask for. One set of controls serves SOC 2, ISO 27001, HIPAA and PCI DSS.',
    does: [
      'Test your controls on a schedule across AWS, GitHub, Google Workspace, Okta, your HR system and your device manager',
      'Share one set of controls across SOC 2, ISO 27001, HIPAA and PCI DSS, each control with an owner and a scope',
      'Open a task in Jira or Slack for every failing test with an owner and due date, and test again once it is fixed',
      'Start policies from templates, collect a signature from everyone and run training, onboarding, offboarding and access reviews from the same list',
      'Have the Evidence agent trace a failed control to its cause and keep the original failure on record beside the proof',
      'Give your auditor a workspace for the audit period where each request links to tested proof with its source and time',
      'Publish a trust center and answer security questionnaires from verified proof, citing the source',
      'Import controls, policies, evidence and vendors from Vanta, Drata or Secureframe and check every count before you switch',
    ],
    promises: [
      {
        id: 'TEST-001',
        text: 'Control tests run on a schedule and on source changes, each result is kept unchanged with its criteria and sources, and noisy tests are tuned with expiring exceptions rather than hidden.',
        category: 'evidence',
      },
      {
        id: 'REMEDY-001',
        text: 'A failed test creates a remediation task with an owner and deadline, and a ticket marked done stays unverified until an independent re-test passes.',
        category: 'reliability',
      },
      {
        id: 'FOLLOWUP-001',
        text: 'Reminders for fixes, policies, training and reviews go out by email, Slack or Microsoft Teams, stop when the work is verified, and a delivered reminder never counts as the work being done.',
        category: 'alerts',
      },
      {
        id: 'ATTEST-001',
        text: 'Employees attest to the exact policy version they are shown, and assent is never invented by bulk publishing.',
        category: 'approval',
      },
      {
        id: 'PROOF-001',
        text: 'Every upload gets a receipt from the stored bytes with the real time and person; a replacement keeps the original, and nothing already recorded is altered.',
        category: 'evidence',
      },
      {
        id: 'GAP-001',
        text: 'Each requirement shows covered, due soon, overdue, missing or unavailable for the chosen period; a storage failure is never shown as green and imported history never counts as current proof.',
        category: 'evidence',
      },
      {
        id: 'REVIEW-001',
        text: 'An auditor folder covers only the controls and dates you select, opens through a one-time expiring link checked on every request, and closing it is final.',
        category: 'access',
      },
      {
        id: 'AGENT-001',
        text: 'An assistant can only prepare an auditor-folder proposal; the owner approves the exact proposal and a changed one needs a new decision.',
        category: 'ai',
      },
      {
        id: 'IMPORT-001',
        text: 'A Drata import is reviewed before it is admitted and journalled, and undo keeps the original files and receipts.',
        category: 'import',
      },
      {
        id: 'CUSTODY-001',
        text: 'The whole archive of controls, receipts and proof files exports with fingerprints and restores only into an empty installation, granting no auditor or agent access.',
        category: 'export',
      },
    ],
    moveIn: ['Vanta', 'Drata', 'Secureframe'],
    runsOn: 'your own Cloudflare account (or on your computer to try it)',
    version: '',
    contractUrl: 'https://run-evidence.com/contract',
    seoTitle: 'Evidence: free, open-source alternative to Vanta',
    seoDescription:
      'Evidence is free, open-source compliance software: continuous control tests, remediation, policies and an auditor workspace for SOC 2, ISO 27001 and HIPAA.',
  },
  {
    slug: 'inkwell',
    summary:
      'Inkwell gets documents signed and filed. It builds each envelope from your templates, routes every signer in the right order, sends the reminders, catches bounced emails and files the sealed record in your CRM, with a certificate anyone can check.',
    does: [
      'Build envelopes from reusable templates with named roles, or let the agent assemble one from a CRM deal and ask about anything missing',
      'Route signers in order or in parallel, with a rule that adds another signer when a contract is over an amount you set',
      'Guide each signer through the fields on a phone, in English or Spanish, with a signer assistant that answers questions about the document',
      'Send reminders on business days only to the person whose turn it is, and catch bounced emails so a corrected address resends in one step',
      'Send one document to a whole list from an upload, or let visitors sign straight from a form on your website',
      'Seal the PDF on the last signature with a completion certificate and a tamper-evident audit trail, and let anyone verify a file',
      'File the completed record in your CRM and file storage and send every party their copy',
      'Move in completed envelopes, certificates, templates and contacts from Docusign, with anything that did not map listed by name',
    ],
    promises: [
      {
        id: 'ACCESS-001',
        text: "Every request checks the person's role: senders handle their own envelopes and ones shared with them, admins handle all, viewers only read, and only the owner manages assistant keys, archives and erasure.",
        category: 'access',
      },
      {
        id: 'SIGN-001',
        text: 'Each signer opens their own single-use link, passes the check the sender chose such as an email code, reviews the exact approved document and can sign only when it is their turn.',
        category: 'security',
      },
      {
        id: 'DELEGATE-001',
        text: 'An envelope an agent prepares is sent only when a signed-in person approves it; a revoked token loses all authority, and the audit trail names both the agent and the approver.',
        category: 'approval',
      },
      {
        id: 'RECORD-001',
        text: 'On the last signature Inkwell produces the signed PDF, a completion certificate and a chained audit trail, and verification recomputes every fingerprint and the event chain.',
        category: 'evidence',
      },
      {
        id: 'RECORD-004',
        text: 'Anyone holding a signed PDF or certificate can check it on the verification page without signing in; an altered copy fails and an unrelated file reveals nothing.',
        category: 'evidence',
      },
      {
        id: 'DELIV-003',
        text: 'Reminders go only to the person whose turn it is, on business days in your time zone, and stop at signature, decline, void or expiry.',
        category: 'alerts',
      },
      {
        id: 'DELIV-002',
        text: "A bounced or rejected address pauses that signer's reminders and alerts the sender, who corrects the address and resends in one step while the old link stops working.",
        category: 'alerts',
      },
      {
        id: 'MOVE-001',
        text: 'A DocuSeal archive is previewed without changes, imported only as approved with its original provider evidence, journalled, and can be undone.',
        category: 'import',
      },
      {
        id: 'PORT-001',
        text: 'The whole installation exports as a checksum-bound archive and restores only into an empty installation.',
        category: 'export',
      },
      {
        id: 'ERASE-001',
        text: 'The owner can erase a finished, voided or expired envelope after typing ERASE, and an older backup cannot bring it back.',
        category: 'erasure',
      },
    ],
    moveIn: [
      'Docusign',
      'Adobe Acrobat Sign',
      'Dropbox Sign',
      'Documenso',
      'DocuSeal',
    ],
    runsOn: 'your own Cloudflare account (or on your computer to try it)',
    version: '',
    contractUrl: 'https://run-inkwell.com/contract',
    seoTitle: 'Inkwell: free, open-source alternative to Docusign',
    seoDescription:
      'Inkwell is free, open-source e-signature software: templates, ordered signers, reminders, a sealed PDF with certificate and a verifiable audit trail.',
  },
  {
    slug: 'lanyard',
    summary:
      'Lanyard is scheduling and time clocking for a US business with hourly staff. It builds and fills the weekly schedule, covers call-outs and swaps, clocks time and breaks, watches labor cost against budget and sends approved hours to payroll.',
    does: [
      "Draft the week from last week's pattern and your sales forecast with each day's cost against budget, then publish a schedule checked against availability, leave and overlapping shifts",
      'Send the week to each person in English or Spanish by app or text, and collect their confirmation',
      'Let staff clock in and out at a phone or kiosk with a PIN, photo or location check, with meals timed against state rules and a premium added when one runs late',
      'Collect availability and time-off requests for managers to decide, let staff swap shifts and pick up open ones, and find qualified no-overtime cover for a call-out',
      'Watch overtime and labor cost against budget through the day, and split card tips fairly by hours worked',
      'Let managers fix missed punches, approve hours in bulk and send them to payroll once, then read them back against your payroll provider',
      'Let an assistant prepare rosters, timesheet fixes and payroll drafts for a person to approve',
      'Move in your staff list, availability, leave balances, future shifts and past timesheets, previewed and checked before anything changes',
    ],
    promises: [
      {
        id: 'ACCESS-001',
        text: 'Every page and download checks who you are and what you may see: staff see only their own work, and a manager cannot approve their own time or leave.',
        category: 'access',
      },
      {
        id: 'ROSTER-001',
        text: 'Staff record availability and request time off; a manager decides each request, nobody approves their own, and approval that clashes with a published shift is refused.',
        category: 'approval',
      },
      {
        id: 'ROSTER-002',
        text: 'A roster is published only after it is rechecked against availability, approved leave and overlapping shifts; a changed or out-of-date draft cannot go out.',
        category: 'reliability',
      },
      {
        id: 'ROSTER-003',
        text: 'Employees see their own published shifts and confirm them; a confirmation records who and when, and cannot be given for someone else or an old version.',
        category: 'evidence',
      },
      {
        id: 'TIME-001',
        text: 'A retried clock-in or clock-out never creates duplicate time, and only one clock can be open at once.',
        category: 'reliability',
      },
      {
        id: 'TIME-002',
        text: 'A manager approves the exact version of a timesheet; a correction keeps the original and needs its own approval, and nobody approves their own hours.',
        category: 'history',
      },
      {
        id: 'PAYROLL-001',
        text: 'Each approved timesheet goes into one payroll file only once, re-downloads are identical, and later corrections send just the difference.',
        category: 'export',
      },
      {
        id: 'AGENT-001',
        text: 'An assistant can only prepare drafts with a key that expires and can be revoked; only a person publishes, approves or exports.',
        category: 'ai',
      },
      {
        id: 'MOVE-001',
        text: 'A staff list is previewed before anything is written, applied exactly as reviewed, and undone for untouched rows; imported people are not invited automatically.',
        category: 'import',
      },
      {
        id: 'ERASE-001',
        text: 'A staff record that was never invited, imported or used can be erased for good; people with work history are deactivated and their records kept.',
        category: 'erasure',
      },
    ],
    moveIn: [
      'Staff list spreadsheet (CSV)',
      'Deputy',
      'When I Work',
      'Homebase',
      '7shifts',
      'Connecteam',
      'Legion',
    ],
    runsOn: 'your own Cloudflare account (or on your computer to try it)',
    version: 'v0.1.3',
    contractUrl: 'https://run-lanyard.com/contract',
    seoTitle: 'Lanyard: free, open-source alternative to Deputy',
    seoDescription:
      'Free, open-source employee scheduling and time clock for US hourly teams: build schedules, cover call-outs, clock time and send approved hours to payroll.',
  },
  {
    slug: 'mallet',
    summary:
      'Mallet is shop management for a US independent auto repair shop. It checks cars in by VIN, texts photo inspections for line-by-line approval, orders parts, runs the technician board, takes payment and brings customers back when the miles say so. Every vehicle keeps its full visit history.',
    does: [
      'Check customers in from their phone, decode the VIN and keep every visit on one vehicle history',
      'Run digital inspections with measurements and photos, and text them to the customer',
      "Build estimates that keep every revision, record the customer's yes or no on each line, and let an agent prepare them for a person to check",
      'Record parts and labour only against what the customer approved, and ask again for added work',
      'Find and order parts from suppliers, reprice the affected line and tell the customer if the promised time moves',
      'Run one board of all bays with promise times, job clocks and sold against clocked hours for each technician',
      'Take payment by text, hand over one saved invoice per visit and sync it to QuickBooks Online',
      'Bring back declined work and service intervals by mileage, and report cars, average repair order and technician efficiency each week',
    ],
    promises: [
      {
        id: 'HTTP-001',
        text: "Workshop pages, commands and downloads are private: every request checks the signed-in role, and an assistant's key can only prepare, never approve.",
        category: 'access',
      },
      {
        id: 'WORKSHOP-001',
        text: 'Each vehicle or device keeps every visit, and a booking is refused if it overlaps another for the same bay or technician.',
        category: 'history',
      },
      {
        id: 'ESTIMATE-001',
        text: "Estimates keep every revision, and a person approves the exact current one; the customer's choice, who gave it and how are recorded against it.",
        category: 'approval',
      },
      {
        id: 'WORK-001',
        text: 'Parts and labour are recorded only within the lines and quantities the customer approved; extra work never borrows an earlier yes.',
        category: 'approval',
      },
      {
        id: 'EST-004',
        text: 'New findings or price changes become a separate supplement on the same repair; only the added work needs fresh consent, and a refusal does not stop work already approved.',
        category: 'approval',
      },
      {
        id: 'EST-005',
        text: 'Declined or deferred work is kept with its reason, price, date and mileage, comes back at the next visit and is repriced before asking again; it is never counted as sold.',
        category: 'history',
      },
      {
        id: 'INVOICE-001',
        text: 'An invoice freezes the approved prices and actual quantities, a person approves it before export, and exporting again returns the same saved file.',
        category: 'export',
      },
      {
        id: 'AGENT-001',
        text: 'An assistant with an expiring, revocable key can only prepare estimates, dispatch and invoices; it cannot approve, share, export or erase.',
        category: 'ai',
      },
      {
        id: 'IMPORT-001',
        text: 'A saved customer and vehicle list is previewed without writing, applied exactly as reviewed, kept with its originals, and can be undone.',
        category: 'import',
      },
      {
        id: 'DATA-001',
        text: 'A full backup holds the workshop records, exact decisions and saved exports; restoring is into an empty installation, and an older backup cannot bring back erased records.',
        category: 'erasure',
      },
    ],
    moveIn: [
      'Tekmetric',
      'Shopmonkey',
      'Mitchell 1 Manager SE',
      'Shop-Ware',
      'AutoLeap',
      'RepairShopr',
      'RepairDesk',
      'Orderry',
      'Fixably',
    ],
    runsOn:
      'Your own computer, or your own Cloudflare account; you hold the data',
    version: '',
    contractUrl: 'https://run-mallet.com/contract',
    seoTitle: 'Mallet: free, open-source alternative to Tekmetric',
    seoDescription:
      'Free, open-source shop software for US auto repair: VIN check-in, photo inspections, line-by-line approval, parts and one saved invoice per repair.',
  },
  {
    slug: 'pane',
    summary:
      'Pane is the website builder a US small business uses instead of Squarespace or Wix. It builds your site visually, moves it over with old links and email kept, and checks that every inquiry reaches a person. You preview every change, publish when you are happy, and roll back in one step.',
    does: [
      'Draft a whole site from a short interview about your business, checking each fact before it goes in',
      'Edit pages block by block with templates, galleries, forms and booking, set a separate phone layout and send changes for review',
      'Preview any draft privately, publish a whole version at once, and restore an earlier version or a single page in one action',
      'Move in from Squarespace, Wix or WordPress.com with a report of what moved and what stayed behind, every old link redirected and tested on a preview before cutover',
      'Move your domain without breaking email, reading your records first and keeping your mailboxes working',
      "Send every inquiry to a person's inbox and your CRM, run a daily test, and flag the inquiry if a notice bounces",
      'Count visits without cookies, trace lost search traffic to old addresses, and send a monthly report in inquiries and bookings',
      'Keep every published version, take everything out in open formats, and let an assistant prepare drafts while you approve what goes live',
    ],
    promises: [
      {
        id: 'ACCESS-001',
        text: 'Owners publish, roll back and erase messages, admins prepare and preview, members only read; a deactivated person loses access on their next request.',
        category: 'access',
      },
      {
        id: 'PUBLISH-001',
        text: 'Each saved version holds the whole site and is never edited afterwards, so any version can be reproduced exactly.',
        category: 'history',
      },
      {
        id: 'PUBLISH-002',
        text: 'Owners and admins can preview any version at a private address, marked as a draft, with contact sending turned off.',
        category: 'approval',
      },
      {
        id: 'PUBLISH-003',
        text: "Going live is a single step that records the owner's approval; an admin can prepare but cannot publish unless the owner allows it.",
        category: 'approval',
      },
      {
        id: 'PUBLISH-004',
        text: 'The owner can put any earlier version back as the live site in one action, and it is recorded like any publish.',
        category: 'undo',
      },
      {
        id: 'INBOX-001',
        text: 'A contact message is stored once however many times it is retried, and shown safely escaped in your inbox.',
        category: 'reliability',
      },
      {
        id: 'VISIT-001',
        text: 'Page visits are counted by day and page only, with no cookies, visitor IDs or addresses stored, and visitors who send Do Not Track are not counted.',
        category: 'privacy',
      },
      {
        id: 'MOVEIN-001',
        text: 'A site export is previewed first, approved exactly as shown, and arrives as an unpublished draft; an unchanged, unpublished import can be undone.',
        category: 'import',
      },
      {
        id: 'BACKUP-001',
        text: 'The owner can export everything and restore it into an empty installation, bringing back the live version, its history and import records.',
        category: 'export',
      },
      {
        id: 'ERASE-001',
        text: 'Erasing a contact message is permanent: an older backup cannot restore it and the same submission cannot be replayed.',
        category: 'erasure',
      },
    ],
    moveIn: [
      'Squarespace',
      'Wix',
      'WordPress.com',
      'Webflow',
      'Framer',
      'Durable',
      'Site export file',
    ],
    runsOn: 'Your own Cloudflare account, or your own computer to try it',
    version: '',
    contractUrl: 'https://run-pane.com/contract',
    seoTitle: 'Pane: free, open-source alternative to Squarespace',
    seoDescription:
      'Free, open-source website builder for US small businesses: build visually, move in with old links and email kept, preview, publish and roll back in one step.',
  },
  {
    slug: 'placemat',
    summary:
      'Placemat fills tables and remembers guests for a US restaurant. It takes reservations from your site, Google and Instagram, runs the host stand and waitlist, and keeps every visit in your own guest list.',
    does: [
      'Take bookings from your website, Google and Instagram into times that fit, with tables assigned or combined for you and pacing that keeps the kitchen even',
      'Confirm by text so guests reply to confirm or reschedule, and hold big tables with deposits',
      'Brief every server before service with a sheet of guests to know, sections and kitchen notes',
      'Show the whole floor to the host on one live screen with tables, sections, waits and turns',
      'Run the waitlist and walk-ins, text when a table is ready, and refill a no-show table from the waitlist while charging the no-show fee',
      'Answer calls, texts and direct messages with a service agent that books into live tables',
      "Read ticket times from Toast, Square or Clover to space the next seatings, and add each check to the guest's history",
      "Keep every guest's visits, notes and preferences in one history, with a service report at close",
    ],
    promises: [
      {
        id: 'ACCESS-001',
        text: 'Owners and admins run the floor and approve plans, members can only read, and only the owner manages keys, move-in, erasure and backups.',
        category: 'access',
      },
      {
        id: 'BOOK-001',
        text: "A guest's booking is confirmed only if a fitting table is really free; if capacity is full or taken at the same moment, they see a conflict instead of a false confirmation.",
        category: 'reliability',
      },
      {
        id: 'SERVICE-001',
        text: 'A person publishes the exact prepared service, tables and floor; a later change to the draft needs approving again.',
        category: 'approval',
      },
      {
        id: 'PLAN-001',
        text: 'Table changes and reminders proposed by an assistant keep their inputs, who prepared them and who decided, and cannot be approved by the assistant.',
        category: 'ai',
      },
      {
        id: 'WAIT-001',
        text: 'Managers seat walk-ins and waiting parties as capacity frees up, and a booking cannot move through an impossible status such as seated after cancelled.',
        category: 'reliability',
      },
      {
        id: 'GUEST-001',
        text: "A guest's contact details, notes, current bookings and past visits, including cancellations and no-shows, stay linked in one history.",
        category: 'history',
      },
      {
        id: 'MIG-001',
        text: 'A guest and visit history file is previewed without writing, applied exactly as reviewed, and undone for any rows not since edited.',
        category: 'import',
      },
      {
        id: 'DATA-001',
        text: 'Owner backups are checked for integrity, restore only into an empty venue, and a damaged backup fails without partial changes.',
        category: 'export',
      },
      {
        id: 'DATA-002',
        text: "The owner can erase a guest's personal details, and older backups known to the system cannot bring them back.",
        category: 'erasure',
      },
      {
        id: 'API-001',
        text: 'Your own website can check availability and take bookings through documented routes that apply the same capacity and role checks.',
        category: 'access',
      },
    ],
    moveIn: [
      'OpenTable',
      'Resy',
      'SevenRooms',
      'Tock',
      'Eat App',
      'Loman AI',
      'Tablein',
      'Guest and visit history spreadsheet (CSV)',
    ],
    runsOn: 'Your own computer, or your own Cloudflare account',
    version: '',
    contractUrl: 'https://run-placemat.com/contract',
    seoTitle: 'Placemat: free, open-source alternative to OpenTable',
    seoDescription:
      "Free, open-source restaurant reservations, waitlist and guest management for US restaurants: one floor for bookings, walk-ins and every guest's history.",
  },
  {
    slug: 'platter',
    summary:
      'Platter is proposal software for a US service business, agency or consultancy. You offer a client two priced options, they pick one and accept online with a verified email, and the deposit invoice is ready the moment they do.',
    does: [
      'Write branded proposals from templates, a content library and a priced catalogue',
      'Offer clients two options side by side, each with its own total and deposit',
      'Approve the exact version before it can be sent, then freeze the offer when it goes out',
      'Send from your own mailbox and see who opened and read what',
      'Let clients accept online after verifying their email, with their name, chosen option and time kept exactly',
      "Raise one deposit invoice per accepted proposal and export it once as an invoice file in Xero's columns, with the same file on every re-download",
      'Let an agent draft proposals with its own key while you check the prices and send',
      'Bring in your client list by pasting it, previewing it and applying it, with undo if you need it',
    ],
    promises: [
      {
        id: 'HTTP-001',
        text: 'Every proposal, client, import and invoice action checks a signed-in person or a revocable assistant key first, and cross-site requests are refused.',
        category: 'access',
      },
      {
        id: 'ACCESS-001',
        text: "An assistant key can only read and draft; it cannot add clients, approve prices, send offers or export invoices, and a draft it touched always needs a person's approval.",
        category: 'ai',
      },
      {
        id: 'PROP-001',
        text: 'An approval applies to one exact version; saving any change clears it, so a changed price or term can never go out on an earlier approval.',
        category: 'approval',
      },
      {
        id: 'PROP-002',
        text: 'Sending freezes the approved offer; any change after sending is a new version, never an edit to what the client already holds.',
        category: 'history',
      },
      {
        id: 'SIGN-001',
        text: 'A client can only open their own offer, and acceptance needs a single-use email code that expires and limits attempts.',
        category: 'security',
      },
      {
        id: 'SIGN-002',
        text: 'An acceptance keeps the exact offer, signer, consent and time together with the deposit worked out in whole cents, and nothing can edit it afterwards.',
        category: 'evidence',
      },
      {
        id: 'INV-001',
        text: 'Each accepted proposal has one deposit invoice with one number; exporting again downloads the same invoice.',
        category: 'export',
      },
      {
        id: 'IMPORT-001',
        text: 'A client list is previewed without writing, applied only as reviewed, and undone if no imported client has changed or has proposals.',
        category: 'import',
      },
      {
        id: 'ERASE-001',
        text: 'An owner can erase a client who has no proposals or import history, and older backups cannot bring them back.',
        category: 'erasure',
      },
      {
        id: 'PORT-001',
        text: 'A backup keeps clients, versions, approvals, acceptances and invoices, restores only into an empty installation, and sent offers get fresh links afterwards.',
        category: 'export',
      },
    ],
    moveIn: [
      'Client list spreadsheet (CSV)',
      'PandaDoc',
      'Proposify',
      'Better Proposals',
      'Qwilr',
      'Ignition',
    ],
    runsOn: 'Your own computer, or your own Cloudflare account',
    version: '',
    contractUrl: 'https://run-platter.com/contract',
    seoTitle: 'Platter: free, open-source alternative to PandaDoc',
    seoDescription:
      'Free, open-source proposal software for US service businesses: two priced options, online acceptance with a verified email and a deposit invoice.',
  },
  {
    slug: 'plinth',
    summary:
      "Plinth runs a US residential builder or remodeler's jobs from e-signed estimate to handover: one schedule for every trade, client-signed change orders, selections, subcontractors, job costing and progress billing. When a job slips, it plans the recovery and checks that the handover date and margin were really restored.",
    does: [
      'Price estimates by cost code and send them to the client for e-signature',
      'Put every trade on one schedule with dependencies, a signed baseline and float, refusing a trade booked twice at once',
      'Have clients sign change orders that show the exact price and the days they add',
      'Let clients choose finishes against an allowance, with a reminder before the order deadline',
      "Hold a subcontractor's start until insurance is current, and collect conditional and unconditional lien waivers",
      'Issue purchase orders and record deliveries as they arrive',
      "Bill progress applications with retainage, take payment through the client's portal and sync with QuickBooks",
      'Track actual cost against budget and forecast margin, with daily logs and photos from the field',
      'Plan a recovery when a job slips and check afterwards that the date and margin held',
    ],
    promises: [
      {
        id: 'NATIVE-001',
        text: 'People sign in by email link, every page and photo checks their current access, and a client sees only their own jobs.',
        category: 'access',
      },
      {
        id: 'NATIVE-002',
        text: 'Quotes are numbered revisions; once accepted, the scope and price cannot change without a separate decision.',
        category: 'approval',
      },
      {
        id: 'NATIVE-003',
        text: 'A trade cannot be booked twice at the same time on different jobs, and the clash shows which job and which times.',
        category: 'reliability',
      },
      {
        id: 'NATIVE-005',
        text: 'Only the assigned client can approve a change, and approval fixes the exact wording, amount, who approved and when; managers and assistants cannot stand in.',
        category: 'approval',
      },
      {
        id: 'SUB-003',
        text: 'You set the insurance and licence evidence each trade must have, and a start is flagged or held when it is missing or expired; an uploaded file alone never counts as verified.',
        category: 'reliability',
      },
      {
        id: 'SUB-004',
        text: 'Lien waivers name the exact amount and through-date, and an unconditional release waits for confirmed payment unless someone records an approved exception.',
        category: 'approval',
      },
      {
        id: 'NATIVE-007',
        text: 'A progress claim shows the accepted quote, approved changes and earlier claims before approval, and repeat downloads return the same record.',
        category: 'evidence',
      },
      {
        id: 'NATIVE-008',
        text: "An assistant's key can only prepare drafts; it cannot accept quotes, approve, issue orders, export claims, import or erase.",
        category: 'ai',
      },
      {
        id: 'NATIVE-010',
        text: 'A jobs list is previewed, approved exactly as shown, kept with its original, and undone for any imports you have not edited.',
        category: 'import',
      },
      {
        id: 'NATIVE-012',
        text: 'The owner can erase a job and its photos for good, and older backups cannot bring them back.',
        category: 'erasure',
      },
    ],
    moveIn: [
      'Accepted jobs spreadsheet (CSV)',
      'Buildertrend',
      'Procore',
      'Houzz Pro',
      'JobTread',
      'Ressio',
      'Autodesk project archives',
      'Excel and CSV estimates and costs',
    ],
    runsOn: 'Your own computer, or your own Cloudflare account',
    version: '',
    contractUrl: 'https://run-plinth.com/contract',
    seoTitle: 'Plinth: free, open-source alternative to Buildertrend',
    seoDescription:
      'Free, open-source construction management for US builders and remodelers: estimates, schedules, change orders, subs, job costing and progress billing.',
  },
  {
    slug: 'satchel',
    summary:
      'Satchel is practice management for a US law firm of one to ten lawyers. It runs intake, conflict checks, matters, deadlines and documents, tracks your time, and keeps billing and trust accounting in order. Lawyers make every legal call, and an assistant prepares work for them to review.',
    does: [
      "Take intake forms and check conflicts across every client, adverse party and alias before a matter opens, recording the lawyer's conclusion",
      'Give lawyers and assistants access matter by matter, with private files for the principal',
      'Record court deadlines with date, time zone and source, have a lawyer confirm them, and remind and escalate before they fall due',
      'Keep every version of each matter document, organise document sets and fill templates from the matter',
      'Draft time entries from your email, calendar and documents for review, then bill hourly, flat fee or contingency with LEDES for insurers',
      'Keep trust funds in a built-in trust ledger that reconciles the bank statement, trust ledger and every client ledger',
      'Give clients a secure portal for documents and messages, with text and email for the moments that matter',
      'Let a matter agent check the file against the claim, ask the client for what is missing and draft with sources cited for a lawyer to approve',
      'Bring matters, contacts, documents, time and trust balances over from Clio',
    ],
    promises: [
      {
        id: 'SAT-001',
        text: "The principal invites lawyers and assistants and controls each person's access, matter by matter; every private page checks the person's role itself.",
        category: 'access',
      },
      {
        id: 'SAT-002',
        text: "A conflict search of clients, adverse parties and aliases is reviewed, and the lawyer's conclusion is recorded before a matter opens; a changed party record voids the search.",
        category: 'evidence',
      },
      {
        id: 'SAT-005',
        text: 'A lawyer approves the exact bill before it is exported; the same time can never be billed twice, and assistants cannot approve.',
        category: 'approval',
      },
      {
        id: 'SAT-007',
        text: 'Every document version keeps its original file, checks its integrity on download, and private files stay with the uploader and principal.',
        category: 'history',
      },
      {
        id: 'SAT-008',
        text: 'A deadline carries a date, time zone and source; a lawyer confirms it, and a changed source requires a fresh review.',
        category: 'evidence',
      },
      {
        id: 'SAT-009',
        text: "Assistants work only within their sponsor's access and can only propose; a person approves or declines each proposal.",
        category: 'ai',
      },
      {
        id: 'TRUST-003',
        text: 'Trust funds are checked per client against cleared money: a payment that would overdraw one client is refused even when the bank holds enough in total, and the attempt stays on record.',
        category: 'money',
      },
      {
        id: 'TRUST-005',
        text: 'Each month the bank statement, the trust register and the sum of client ledgers are reconciled, every difference is shown, and a signed reconciliation is locked.',
        category: 'evidence',
      },
      {
        id: 'SAT-010',
        text: 'A contact list from your old system is previewed first, applied exactly as reviewed, and undone for contacts that nobody has used since.',
        category: 'import',
      },
      {
        id: 'SAT-012',
        text: "The principal can erase a document's files for good, keeping a record that it happened, and older archives cannot bring them back.",
        category: 'erasure',
      },
    ],
    moveIn: [
      'Clio contacts spreadsheet (CSV)',
      'Clio Manage and Grow',
      'MyCase',
      'Smokeball',
      'PracticePanther',
      'Filevine',
      'Eve work exports',
    ],
    runsOn: 'Your own Cloudflare account',
    version: '',
    contractUrl: 'https://run-satchel.com/contract',
    seoTitle: 'Satchel: free, open-source alternative to Clio',
    seoDescription:
      'Free, open-source practice management for small US law firms: intake, conflict checks, matters, deadlines, time, billing and trust accounting.',
  },
  {
    slug: 'stall',
    summary:
      'Stall puts a US maker or small shop online: a storefront and checkout, sales tax, shipping labels and tracking, returns, and the carts people left behind. Customers pay with cards, Apple Pay or Google Pay while their stock is held. Your shop, customers and data stay yours.',
    does: [
      'List a new batch ahead of time and have it go live on its own, on your online store and on Google Shopping and Instagram',
      'Check out with Apple Pay, Google Pay and cards, with discount codes and stock held for ten minutes while they pay',
      'Bring shoppers back to abandoned carts with a note on what is still in stock',
      'Show live USPS and UPS rates, check addresses, print every label in one run and email tracking',
      'Collect the right sales tax for each US address, ready to file',
      'Let customers start returns from their account, with the label, restock and refund in one record',
      'Let an order agent offer a real choice when a parcel is damaged or stock runs out, for you to approve',
      'Post sales, shipping, tax, refunds and fees to QuickBooks',
      'Bring products, customers, orders and redirects over from Shopify in one import',
    ],
    promises: [
      {
        id: 'PAY-003',
        text: 'An order counts as paid only when a verified payment confirmation matches the exact amount, currency and order; a repeated notice never creates a second order or stock hold.',
        category: 'money',
      },
      {
        id: 'ORDER-003',
        text: 'A person approves the exact lines, reason and amount of a refund, and approving again can never pay twice.',
        category: 'money',
      },
      {
        id: 'AGENT-001',
        text: 'An assistant can only prepare product, shipment and refund drafts; a signed-in owner or admin approves the exact version before anything is published, shipped or paid.',
        category: 'ai',
      },
      {
        id: 'SECURITY-001',
        text: "Staff pages, imports and data downloads are protected by the shop's own sign-in on the server, and card details and secrets never reach the browser.",
        category: 'security',
      },
      {
        id: 'INTEGRATION-001',
        text: 'You connect, test and revoke your own provider accounts, and every outgoing payment, label, mail and ledger job is recorded with its outcome, so an uncertain result is never silently repeated.',
        category: 'reliability',
      },
      {
        id: 'EXPORT-001',
        text: 'You can export every supported business record, in documented formats, along with a complete archive, so you can always leave with your shop.',
        category: 'export',
      },
      {
        id: 'DATA-001',
        text: 'A shop archive keeps everything supported, is checked before it restores into an empty shop, and never repeats a charge, shipment, refund or message.',
        category: 'export',
      },
      {
        id: 'ERASURE-001',
        text: "The owner can erase a customer's contact details after open orders are settled, keeping anonymous order history, and an older backup cannot restore them.",
        category: 'erasure',
      },
      {
        id: 'AUDIT-001',
        text: 'Approvals, shipments, refunds, reconciliations and erasures keep who did them and when, and that history survives customer erasure.',
        category: 'history',
      },
      {
        id: 'DEMO-001',
        text: 'The hosted demo shop runs on sample data with simulated payments and stock, so nothing reaches a real provider and no mail is delivered.',
        category: 'privacy',
      },
    ],
    moveIn: [
      'Shopify (products, customers, orders and redirects)',
      'Squarespace Commerce',
      'BigCommerce',
      'WooCommerce',
      'Medusa, Saleor and Fourthwall',
    ],
    runsOn:
      'Your own Cloudflare account, with your own Stripe and Pier accounts',
    version: '',
    contractUrl: 'https://run-stall.com/contract',
    seoTitle: 'Stall: free, open-source alternative to Shopify',
    seoDescription:
      'Free, open-source online store for US makers and small shops: checkout, sales tax, shipping labels, returns and abandoned carts.',
  },
  {
    slug: 'strap',
    summary:
      'Strap runs a US yoga, Pilates or boutique fitness studio. It sells and auto-renews memberships, fills classes through your branded app, recovers failed payments, and spots members drifting away and books them back in. Members book their own classes and the studio owns every record.',
    does: [
      'Publish recurring class timetables with instructor, room and capacity, and let members book, cancel and pick a named reformer',
      'Sell memberships, intro offers and class packs that renew on their own, with every credit accounted for',
      'Give a cancelled spot to the first eligible person on the waitlist, with a deadline to claim it',
      'Check members in at the front desk or kiosk, with waivers, walk-ins, late-cancel fees and retail',
      'Collect the monthly renewals, explain declined cards and returned bank payments, and keep access fair while they are fixed',
      'Find a qualified substitute, tell the booked members and give payroll exact pay for every instructor',
      'Spot members drifting from their routine, offer classes that fit and book the one they pick',
      'Welcome new intro members, count their visits and offer the right plan before the intro ends',
      'Bring members, memberships, class packs, waivers and saved cards over from Mindbody and other studio systems',
    ],
    promises: [
      {
        id: 'AUTH-001',
        text: 'Members see only their own balances and bookings, and instructors see only the classes assigned to them; every page and download checks this itself.',
        category: 'access',
      },
      {
        id: 'AGENT-001',
        text: 'An assistant can only prepare class weeks, packs and reminders; the owner approves each exact draft once, and any change to the facts voids the approval.',
        category: 'ai',
      },
      {
        id: 'BOOK-001',
        text: 'A booking needs a future class with space, the current waiver acknowledged and an unexpired credit; the seat and credit are taken together and duplicates are refused.',
        category: 'reliability',
      },
      {
        id: 'BOOK-002',
        text: 'Cancelling before class returns one credit and gives the spot to the first eligible waiting member in the same moment.',
        category: 'undo',
      },
      {
        id: 'PLAN-003',
        text: 'Members and staff see the remaining, reserved, used, restored and expired credits of every pack with its exact expiry, and every staff adjustment needs a reason and keeps its history.',
        category: 'history',
      },
      {
        id: 'PAY-001',
        text: 'A recorded payment needs a unique reference, so recording the same payment twice cannot reduce a balance twice.',
        category: 'money',
      },
      {
        id: 'WAIVER-001',
        text: 'Waivers are saved as exact versions; members acknowledge the current one, and a new version asks everyone again before they book.',
        category: 'evidence',
      },
      {
        id: 'IMPORT-001',
        text: 'A member list is previewed, applied exactly as reviewed, creates members with no invented credits or charges, and can be undone.',
        category: 'import',
      },
      {
        id: 'MOVE-011',
        text: 'The owner can download every studio record, with credit and payment history and waiver text, in documented formats with stable references.',
        category: 'export',
      },
      {
        id: 'ERASE-001',
        text: 'A person who was never invited, imported or used can be erased, and an older backup cannot bring them back.',
        category: 'erasure',
      },
    ],
    moveIn: [
      'Member list spreadsheet (CSV)',
      'Mindbody',
      'WellnessLiving',
      'Vagaro',
      'Momence',
      'Arketa',
      'PushPress',
    ],
    runsOn: 'Your own Cloudflare account, or your own computer to try it',
    version: '',
    contractUrl: 'https://run-strap.com/contract',
    seoTitle: 'Strap: free, open-source alternative to Mindbody',
    seoDescription:
      'Free, open-source studio software for US yoga, Pilates and fitness studios: memberships, class schedules, waitlists, check-in and member retention.',
  },
  {
    slug: 'terrace',
    summary:
      "Terrace is property management for a US residential manager or landlord. It collects the rent, fills empty units, runs repairs from report to invoice, and keeps every owner's books reconciled to the cent. Residents, owners and vendors each get their own view.",
    does: [
      'Collect rent by bank transfer, card or cash at a store, with autopay, partial payments and late fees under your rules',
      'List an empty unit on Zillow, Apartments.com and your own site, then take applications, screening and the signed lease',
      "Run each repair from the resident's report to the matched vendor invoice, within the owner's spending limit",
      'Draft renewals and payment plans for late rent, weighed in cash and vacant days, for a manager to approve',
      'Keep a trust ledger by owner, property and resident, matched to the bank line by line, and close each month',
      "Send owner statements with receipts attached, pay owners by bank transfer and prepare the year's 1099 data",
      'Complete dated inspections with notes and photos kept as saved',
      'Bring properties, leases, deposits and opening balances over from AppFolio or Buildium, checked against the old balances',
    ],
    promises: [
      {
        id: 'TER-001',
        text: 'Owners invite managers and preparers; preparers can read and propose but cannot approve, post rent, import, erase or restore, and the role is checked on every action.',
        category: 'access',
      },
      {
        id: 'TER-003',
        text: 'A renewal is proposed with its source, an owner or manager approves it, and earlier terms are kept; competing proposals cannot overwrite accepted terms.',
        category: 'approval',
      },
      {
        id: 'TER-004',
        text: 'Rent charges, receipts and reductions are recorded in exact cents, a unique reference stops a receipt being counted twice, and receipts cannot exceed what is owed.',
        category: 'money',
      },
      {
        id: 'PAY-001',
        text: 'Recurring rent and lease charges are previewed before they post, missing terms are shown, and a retry or a month boundary never posts the same charge twice.',
        category: 'reliability',
      },
      {
        id: 'ROLE-003',
        text: 'Repair spending limits are set by the owner per property; people who prepare work cannot approve it, and a changed amount, payee or bank detail voids the approval.',
        category: 'approval',
      },
      {
        id: 'TER-007',
        text: 'An inspection is completed only with notes and photos, and the photos are kept exactly as uploaded.',
        category: 'evidence',
      },
      {
        id: 'ACCT-011',
        text: 'Each month closes with a reconciliation sign-off and is locked; reopening it needs authority and a reason, and affected statements are marked superseded.',
        category: 'history',
      },
      {
        id: 'TER-009',
        text: 'A tenancy list is previewed, approved exactly as shown, and undone if untouched; tenancies with later rent, work or edits are kept.',
        category: 'import',
      },
      {
        id: 'SAFE-005',
        text: 'The owner can download all property records, photos and history in documented formats and restore them into an empty installation.',
        category: 'export',
      },
      {
        id: 'TER-011',
        text: "The owner confirms the tenant's email to erase a tenancy with its photos and import copies, and older archives cannot bring it back.",
        category: 'erasure',
      },
    ],
    moveIn: [
      'Tenancy spreadsheet (CSV)',
      'AppFolio',
      'Buildium',
      'Rent Manager',
      'Yardi Breeze',
      'DoorLoop',
      'TurboTenant',
    ],
    runsOn: 'Your own Cloudflare account, or your own computer to try it',
    version: 'v0.1.4',
    contractUrl: 'https://run-terrace.com/contract',
    seoTitle: 'Terrace: free, open-source alternative to AppFolio',
    seoDescription:
      'Free, open-source property management for US residential landlords: rent collection, listings, repairs, owner statements and trust accounting.',
  },
  {
    slug: 'vane',
    summary:
      'Vane is website analytics that counts your visitors without cookies and without a cookie banner. It shows where visitors came from, which pages they read and which goals they completed, and tells you why the numbers moved. You run it on your own computer or your own Cloudflare account and keep every visit.',
    does: [
      'Count unique visitors, visits, bounce rate and visit duration without cookies, using a hash that resets every day, with the method published',
      'See live and historical traffic by page, source, campaign, country, device and browser, with filters and period comparisons',
      'Track goals, funnels and revenue with real order values, plus outbound links, file downloads and 404 pages',
      'Send scheduled email reports and spike or drop alerts, and share dashboards with your team or the public',
      'Find out why a number moved: the agent checks your tracking, your channel mix and your site, then proposes the fix and measures the result',
      'See the Google Search Console keywords behind your Google visits',
      'Install with one small script, or through WordPress, Shopify, Webflow or Squarespace, with a first-party proxy so ad blockers do not erase your numbers',
      'Bring your past traffic across from Google Analytics 4, Plausible, Fathom and Matomo, and export everything at any time',
    ],
    promises: [
      {
        id: 'ACCESS-001',
        text: 'Owners approve, administrators prepare changes and members only read. A removed person loses access on their next request.',
        category: 'access',
      },
      {
        id: 'ACCESS-002',
        text: 'Every private page and action needs a signed-in session and the right origin. Signed-out or cross-site requests are refused and change nothing.',
        category: 'security',
      },
      {
        id: 'APPROVE-001',
        text: 'Changes to a site, its settings or its history wait as proposals until the owner approves them once. Who prepared it, who approved it and when are recorded, and agents can prepare but never approve.',
        category: 'approval',
      },
      {
        id: 'CONSENT-001',
        text: 'If a site requires consent, only visits that carry granted consent are counted; the rest are refused.',
        category: 'privacy',
      },
      {
        id: 'PRIVACY-005',
        text: "Visitor data goes only from the visitor's browser to your own installation and is stored there; no visitor-level record is ever sent to another service.",
        category: 'privacy',
      },
      {
        id: 'DEDUP-001',
        text: 'Each page load is counted once. A repeated send of the same visit is not counted twice.',
        category: 'reliability',
      },
      {
        id: 'IMPORT-001',
        text: 'Imports show a preview that changes nothing, are approved exactly as reviewed, keep a journal of every effect and can be undone.',
        category: 'import',
      },
      {
        id: 'ARCHIVE-001',
        text: 'Export your complete analytics history as a checked archive and restore it into an empty installation. A damaged archive is rejected without changing anything.',
        category: 'export',
      },
      {
        id: 'ERASURE-001',
        text: "Erasing a site's history needs the owner's approval, removes live and imported copies, is recorded, and stops an older backup from bringing the erased data back.",
        category: 'erasure',
      },
      {
        id: 'RETENTION-001',
        text: 'Each site keeps raw events for the window you choose, and applying it erases older history and records the deletion.',
        category: 'history',
      },
    ],
    moveIn: [
      'Google Analytics 4',
      'Plausible Analytics',
      'Fathom Analytics',
      'Matomo',
      'Umami',
      'Simple Analytics',
      'PostHog',
    ],
    runsOn: 'Your own Cloudflare account, or your own computer to try it',
    version: '',
    contractUrl: 'https://run-vane.com/contract',
    seoTitle: 'Vane: free, open-source alternative to Plausible',
    seoDescription:
      'Free, open-source website analytics without cookies: visitors, sources, goals and revenue, with no banner and your data on your own server.',
  },
];
