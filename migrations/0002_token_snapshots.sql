-- "Made with N tokens" in the footer. scripts/token-count/publish.mjs measures
-- the Claude and Codex tokens spent building the products (from our own
-- session logs) and inserts one row per measurement. GET /api/tokens serves
-- the newest row and the page counts on from it at rate_per_second.
CREATE TABLE token_snapshots (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  -- What was counted, e.g. 'products' (the Just Every products and Run Edit Run).
  scope TEXT NOT NULL,
  -- When the logs were read, ISO 8601 UTC.
  measured_at TEXT NOT NULL,
  -- Tokens processed: input + cache writes + cache reads + output.
  total INTEGER NOT NULL CHECK (total >= 0),
  -- Average over the 7 days before measured_at, in tokens per second.
  rate_per_second REAL NOT NULL CHECK (rate_per_second >= 0),
  -- Small JSON object: per tool and machine, without cache reads, output only.
  breakdown TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX token_snapshots_latest ON token_snapshots (scope, measured_at);
