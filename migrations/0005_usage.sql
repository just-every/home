-- First-party usage (src/lib/usage.ts; report: npm run usage), replacing the
-- hero A/B test's beacons. Nothing here identifies a person: no IP address,
-- no user agent beyond a coarse device class, no cookie. view_id is a random
-- id the page mints for one page view, so a view's events count together.
-- ab_exposures and ab_events (0004) keep the A/B test's rows and get no new
-- ones.

-- One page load of a page on the site.
CREATE TABLE page_views (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  view_id TEXT NOT NULL,
  -- The path and anchor the page loaded at, e.g. /#vol-uptime.
  path TEXT NOT NULL,
  utm_source TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  device TEXT NOT NULL CHECK (device IN ('mobile', 'tablet', 'desktop', 'bot')),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX page_views_created ON page_views (created_at);
CREATE INDEX page_views_view ON page_views (view_id);

-- An engagement event during a page view. detail is a product, repository
-- or hero link's name, never search text or form contents.
CREATE TABLE events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  view_id TEXT NOT NULL,
  name TEXT NOT NULL,
  detail TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX events_view ON events (view_id);
CREATE INDEX events_created ON events (created_at);
