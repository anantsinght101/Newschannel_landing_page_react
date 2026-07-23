-- Migration: Create storage_usage_cache table for R2 free-tier safety ceiling
create table if not exists storage_usage_cache (
  id int primary key default 1,
  total_bytes bigint not null default 0,
  checked_at timestamptz not null default now(),
  constraint single_row check (id = 1)
);

insert into storage_usage_cache (id, total_bytes, checked_at)
values (1, 0, now())
on conflict (id) do nothing;

alter table storage_usage_cache enable row level security;

-- Only the Edge Function (using the service role, which bypasses RLS)
-- ever touches this table — no public policies needed.
