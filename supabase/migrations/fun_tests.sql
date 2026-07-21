create table if not exists public.fun_tests (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text not null,
  icon text not null default '📝',
  questions jsonb not null default '[]',
  results jsonb not null default '[]',
  active boolean default true,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table public.fun_tests enable row level security;
