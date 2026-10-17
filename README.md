# justevery.com

The Just Every homepage: one page that shows the collection of open-source
products as a box set, lets a visitor find the replacement for a tool they use
today, and takes suggestions for what to build next.

Next.js 15 (App Router) on Cloudflare Workers through OpenNext, with D1 for
search logs, suggestions and the usage log, and R2 (`assets.justevery.com`) for the demo reels.

## Run it

```bash
npm ci
npm run dev                       # local D1 migrations, then next dev
npm run preview -- --port 3334    # the Worker build under wrangler, with local D1
```

`POST /api/match` needs `ANTHROPIC_API_KEY` in `.dev.vars` (copy
`.dev.vars.example`); without it the AI match answers 503 and the instant local
match still works.

## Checks

```bash
npm run lint
npm run type-check
npm test                 # the /api/match, /api/suggest, /api/contact and /api/events flows
npm run build
npm run build:cloudflare
```

## Where things are

- `src/components/landing/` — the page, one component and CSS module per
  section. `label.module.css` holds the shared tokens (text colours, card
  border, radius, section rhythm).
- `src/components/landing/hero/` — the hero (12ui design G): the rented
  stack as a picker beside the seeds that replace it, over the watercolour
  landscape in `public/landing/hero/`.
- `src/components/landing/search/` and `suggest/` — "What do you use today?"
  and "What should we build next?".
- `src/data/seeds.ts` — the products, in collection order, with marks and reels.
- `src/content/` — page copy and site metadata.
- `src/app/api/match`, `src/app/api/suggest`, `src/server/` — the two endpoints,
  validation, the shared per-visitor rate limit and D1 storage.
- `src/lib/usage.ts`, `src/lib/usage-client.ts`, `src/app/api/events` — the
  first-party usage log: one row per page view (`page_views`) and per
  engagement event (`events`), keyed by a random per-page-view id, with no IP,
  cookie or user agent stored. `src/lib/x-pixel.ts` sends each event to it and
  to the X pixel.
- `migrations/` — the D1 schema.

## Scripts

- `scripts/update-reels.mjs` — re-encodes the newest finished product reels into
  `public/video/<slug>-720.mp4` and a poster.
- `scripts/og-image.mjs` — renders the share image, `public/og-image.png`, from
  the built site's hero (`npm run build` first).
- `npm run suggestions [-- --remote]` — prints recent suggestions and unmatched
  searches.
- `npm run usage [-- --remote] [-- --days 7]` — prints page views, the share
  with an event, and each event's counts and top details.

## Deploy

A push to `main` runs `.github/workflows/deploy-production.yml`: when the pushed
commit changes `public/video/` it uploads the reels to R2, then it builds with
`NEXT_PUBLIC_R2_PUBLIC_URL=https://assets.justevery.com`, and deploys the Worker
to `justevery.com`. Reels are Git LFS files; `.husky/pre-push` runs
`git lfs pre-push` so a push uploads them. Production secrets are set with
`npx wrangler secret put ANTHROPIC_API_KEY`, and D1 migrations with
`npm run db:migrate:remote`.
