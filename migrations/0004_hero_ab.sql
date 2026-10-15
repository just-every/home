-- The hero A/B test (src/lib/hero-ab.ts; results: npm run ab). A visitor is
-- the random id in the je_vid cookie, minted with each 30-day assignment, so
-- one visitor id belongs to one randomised variant. No table stores an IP
-- address or a user agent: only a coarse device class.

-- A page view that showed a hero: at most one per browser session for the
-- same variant.
CREATE TABLE ab_exposures (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  visitor_id TEXT NOT NULL,
  variant TEXT NOT NULL,
  -- 1 when ?hero= forced the variant for a preview: never a randomised exposure.
  forced INTEGER NOT NULL CHECK (forced IN (0, 1)),
  utm_source TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  -- The path and anchor the page loaded at, e.g. /#vol-uptime.
  landing TEXT,
  device TEXT NOT NULL CHECK (device IN ('mobile', 'tablet', 'desktop', 'bot')),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX ab_exposures_visitor ON ab_exposures (visitor_id, created_at);

-- An engagement event (search, product opened, reel played, GitHub click,
-- run-site click, command copied, suggestion sent, contact sent) with the
-- hero it counts for. detail is a product or repository name, never search
-- text or form contents.
CREATE TABLE ab_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  visitor_id TEXT NOT NULL,
  variant TEXT NOT NULL,
  forced INTEGER NOT NULL CHECK (forced IN (0, 1)),
  name TEXT NOT NULL,
  detail TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX ab_events_visitor ON ab_events (visitor_id, created_at);
