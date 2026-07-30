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

-- User authentication table
-- Removed IP address unique constraint to allow multiple users from same IP
create table if not exists users (
  id              serial primary key,
  email           text not null unique,
  password_hash   text not null,
  ip_address      inet,
  is_premium      boolean not null default false,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now()
);

create index if not exists users_email_idx on users (email);
create index if not exists users_ip_idx on users (ip_address);

-- Cards table linked to users for ownership
-- share_slug is nullable - only settable when paid/premium
-- is_paid indicates whether this specific card has been paid for (₹1000 per-template)
create table if not exists cards (
  id              serial primary key,
  user_id         integer not null references users(id) on delete cascade,
  slug            text not null,
  share_slug      text,
  template_id     text not null,
  title           text,
  status          text not null default 'draft',
  data            jsonb not null default '{}'::jsonb,
  is_paid         boolean not null default false,
  html_content    text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),
  unique(user_id, slug)
);

create index if not exists cards_user_id_idx on cards (user_id);
create index if not exists cards_slug_idx on cards (slug);
create index if not exists cards_share_slug_idx on cards (share_slug);

-- Safe to re-run: adds the title column to a pre-existing cards table that
-- was created before this column existed.
alter table cards add column if not exists title text;

-- Payments table to track orders from PaymentGatewayAPI
-- type: 'premium' (₹5000) or 'per_template' (₹1000)
create table if not exists payments (
  id                  serial primary key,
  user_id             integer not null references users(id) on delete cascade,
  card_id             integer references cards(id) on delete set null,
  order_id            text not null unique,
  payment_session_id  text,
  type                text not null check (type in ('premium', 'per_template')),
  amount              integer not null,
  status              text not null default 'pending' check (status in ('pending', 'paid', 'failed')),
  gateway_response    jsonb,
  created_at          timestamptz not null default now(),
  updated_at          timestamptz not null default now()
);

create index if not exists payments_user_id_idx on payments (user_id);
create index if not exists payments_order_id_idx on payments (order_id);
create index if not exists payments_card_id_idx on payments (card_id);
