-- "Say hello" form entries on /contact. Like suggestions: only what the visitor
-- typed (and the topic the maker route set) and when. No IP address, user agent
-- or other request metadata.
CREATE TABLE contact_messages (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  topic TEXT NOT NULL DEFAULT 'general' CHECK (topic IN ('general', 'maker')),
  name TEXT,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
);

CREATE INDEX contact_messages_created_at ON contact_messages (created_at);
