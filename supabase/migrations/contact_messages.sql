create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  created_at timestamptz default now()
);

alter table public.contact_messages enable row level security;

create policy "Service role can manage contact_messages"
  on public.contact_messages for all
  to service_role
  using (true)
  with check (true);
