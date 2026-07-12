-- SAM Barbershop — appointments table
-- Run this in the Supabase SQL Editor after creating your project.

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone_number text not null,
  service text not null,
  booking_date date not null,
  booking_time text not null,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at timestamptz not null default now()
);

-- Prevent double-booking (cancelled slots become available again)
create unique index if not exists appointments_slot_unique
  on public.appointments (booking_date, booking_time)
  where (status <> 'cancelled');

create index if not exists appointments_date_idx
  on public.appointments (booking_date);

create index if not exists appointments_status_idx
  on public.appointments (status);

-- Row Level Security (open for this demo — add auth before production)
alter table public.appointments enable row level security;

grant select, insert, update, delete on public.appointments to anon, authenticated;

create policy "Allow public read"
  on public.appointments for select
  to anon, authenticated
  using (true);

create policy "Allow public insert"
  on public.appointments for insert
  to anon, authenticated
  with check (true);

create policy "Allow public update"
  on public.appointments for update
  to anon, authenticated
  using (true)
  with check (true);

create policy "Allow public delete"
  on public.appointments for delete
  to anon, authenticated
  using (true);

-- Enable Realtime for the admin dashboard
alter publication supabase_realtime add table public.appointments;
