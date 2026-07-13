-- Hair SixtyOne — appointments table
-- Run this in the Supabase SQL Editor after creating your project.

create table if not exists public.appointments (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  phone_number text not null,
  email text,
  service text not null,
  service_price numeric(10, 2),
  staff_id text,
  staff_name text,
  booking_date date not null,
  booking_time text not null,
  status text not null default 'pending'
    check (status in ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at timestamptz not null default now()
);

-- Prevent double-booking per staff member (cancelled slots become available again)
drop index if exists appointments_slot_unique;
drop index if exists appointments_slot_staff_unique;

create unique index if not exists appointments_slot_staff_unique
  on public.appointments (booking_date, booking_time, staff_id)
  where (status <> 'cancelled' and staff_id is not null);

create index if not exists appointments_date_idx
  on public.appointments (booking_date);

create index if not exists appointments_status_idx
  on public.appointments (status);

create index if not exists appointments_staff_idx
  on public.appointments (staff_id);

-- Row Level Security (open for this demo — add auth before production)
alter table public.appointments enable row level security;

grant select, insert, update, delete on public.appointments to anon, authenticated;

drop policy if exists "Allow public read" on public.appointments;
drop policy if exists "Allow public insert" on public.appointments;
drop policy if exists "Allow public update" on public.appointments;
drop policy if exists "Allow public delete" on public.appointments;

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

-- Migration for existing databases:
-- alter table public.appointments add column if not exists email text;
-- alter table public.appointments add column if not exists service_price numeric(10, 2);
-- alter table public.appointments add column if not exists staff_id text;
-- alter table public.appointments add column if not exists staff_name text;
