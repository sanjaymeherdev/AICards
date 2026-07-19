-- db/schema.sql
-- Run once against your Railway Postgres instance:
--   node scripts/migrate.js
-- (or, if you have the psql client available: psql "$DATABASE_URL" -f db/schema.sql)

-- Stores AI-generated section/cover designs so they show up in the normal
-- design picker (server.js merges these into the file-based sections/*.js
-- designs at request time) without writing to Railway's ephemeral disk.
create table if not exists ai_designs (
  id              text primary key,
  section_type    text not null,
  label           text not null,
  fields          jsonb not null default '[]'::jsonb,
  defaults        jsonb not null default '{}'::jsonb,
  html            text not null default '',
  css             text not null default '',
  js              text not null default '',
  prompt          text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists ai_designs_section_type_idx on ai_designs (section_type);

-- Auth + card ownership land here in the next phase (users, cards tables
-- with user_id / slug), once login/signup is wired up.
