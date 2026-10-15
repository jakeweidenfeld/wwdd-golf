-- Users signed in with Google, their sessions, the 2027 interest list, and tournament results.

CREATE TABLE users (
  id               SERIAL PRIMARY KEY,
  google_sub       TEXT NOT NULL UNIQUE,
  email            TEXT NOT NULL,
  name             TEXT,
  picture          TEXT,
  role             TEXT NOT NULL DEFAULT 'member' CHECK (role IN ('member', 'admin')),
  created_at       TIMESTAMPTZ NOT NULL DEFAULT now(),
  last_sign_in_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Only a SHA-256 hash of each session token is stored, so a database leak can't be replayed as cookies.
CREATE TABLE sessions (
  token_hash  TEXT PRIMARY KEY,
  user_id     INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at  TIMESTAMPTZ NOT NULL
);
CREATE INDEX sessions_user_id ON sessions(user_id);

CREATE TABLE interest (
  user_id     INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  play        BOOLEAN NOT NULL DEFAULT false,
  sponsor     BOOLEAN NOT NULL DEFAULT false,
  volunteer   BOOLEAN NOT NULL DEFAULT false,
  note        TEXT NOT NULL DEFAULT '',
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE results (
  id          SERIAL PRIMARY KEY,
  year        INTEGER NOT NULL,
  place       INTEGER,
  team_name   TEXT,
  players     TEXT[] NOT NULL DEFAULT '{}',
  score       TEXT,
  note        TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- The one result published so far (GiveSmart, 2025).
INSERT INTO results (year, place, players, note)
VALUES (2025, 1, ARRAY['Matt Williams', 'Len Edelman', 'Michael Edelman', 'Jack Ronan'], 'Tournament champions');
