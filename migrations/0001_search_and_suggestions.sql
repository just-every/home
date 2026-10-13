-- Product search and suggestions for the justevery.com landing page.
-- No table stores an IP address, a user agent or any other request metadata.

-- Normalised visitor text -> Claude's answer, so a repeated query makes no
-- model call. `catalogue` hashes the model, prompt, schema and product
-- catalogue, so a new or changed product starts a fresh cache.
CREATE TABLE match_cache (
  catalogue TEXT NOT NULL,
  query TEXT NOT NULL,
  -- JSON array of {"slug", "reason"}; [] means nothing in the collection fits.
  result TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  PRIMARY KEY (catalogue, query)
);

-- Every answered search, for demand: what people use and what we lack.
CREATE TABLE search_log (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  query TEXT NOT NULL,
  -- Matched slugs, best first, comma separated; '' when nothing fits.
  slugs TEXT NOT NULL,
  cache_hit INTEGER NOT NULL CHECK (cache_hit IN (0, 1)),
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX search_log_created_at ON search_log (created_at);
CREATE INDEX search_log_unmatched ON search_log (query) WHERE slugs = '';

-- "What should we build next?" form entries.
CREATE TABLE suggestions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product TEXT NOT NULL,
  note TEXT,
  email TEXT,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX suggestions_created_at ON suggestions (created_at);
