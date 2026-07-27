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

-- User authentication table with one account per IP constraint
create table if not exists users (
  id              serial primary key,
  email           text not null unique,
  password_hash   text not null,
  ip_address      inet not null unique,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists users_email_idx on users (email);
create index if not exists users_ip_idx on users (ip_address);

-- Cards table linked to users for ownership
create table if not exists cards (
  id              serial primary key,
  user_id         integer not null references users(id) on delete cascade,
  slug            text not null,
  template_id     text not null,
  status          text not null default 'draft',
  data            jsonb not null default '{}'::jsonb,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique(user_id, slug)
);

create index if not exists cards_user_id_idx on cards (user_id);
create index if not exists cards_slug_idx on cards (slug);
