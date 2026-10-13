# justevery.com

The Just Every homepage: one page that shows the collection of open-source
products as a box set, lets a visitor find the replacement for a tool they use
today, and takes suggestions for what to build next.

Next.js 15 (App Router) on Cloudflare Workers through OpenNext, with D1 for
search logs and suggestions and R2 (`assets.justevery.com`) for the demo reels.

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
npm test                 # the /api/match and /api/suggest flows
npm run build
npm run build:cloudflare
```

## Where things are

- `src/components/landing/` — the page, one component and CSS module per
  section. `label.module.css` holds the shared tokens (text colours, card
  border, radius, section rhythm).
- `src/components/landing/shelf3d/` — the three.js box-set shelf in the hero,
  with a static poster (`public/landing/shelf/`) that hands over to the live
  scene. Phones get the poster only.
- `src/components/landing/search/` and `suggest/` — "What do you use today?"
  and "What should we build next?".
- `src/data/seeds.ts` — the products, in collection order, with marks and reels.
- `src/content/` — page copy and site metadata.
- `src/app/api/match`, `src/app/api/suggest`, `src/server/` — the two endpoints,
  validation, the shared per-visitor rate limit and D1 storage.
- `migrations/` — the D1 schema.

## Scripts

- `scripts/update-reels.mjs` — re-encodes the newest finished product reels into
  `public/video/<slug>-720.mp4` and a poster.
- `scripts/render-shelf.mjs` — renders the shelf poster from the live scene.
- `scripts/render-og.mjs` — renders `public/og-image.png` from a running server.
- `npm run suggestions [-- --remote]` — prints recent suggestions and unmatched
  searches.

## Deploy

A push to `main` runs `.github/workflows/deploy-production.yml`: when the pushed
commit changes `public/video/` it uploads the reels to R2, then it builds with
`NEXT_PUBLIC_R2_PUBLIC_URL=https://assets.justevery.com`, and deploys the Worker
to `justevery.com`. Reels are Git LFS files; `.husky/pre-push` runs
`git lfs pre-push` so a push uploads them. Production secrets are set with
`npx wrangler secret put ANTHROPIC_API_KEY`, and D1 migrations with
`npm run db:migrate:remote`.
