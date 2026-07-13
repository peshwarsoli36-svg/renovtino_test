-- Migration: add staff and email columns for Hair SixtyOne white-label
-- Run in Supabase SQL Editor on existing databases.

alter table public.appointments add column if not exists email text;
alter table public.appointments add column if not exists service_price numeric(10, 2);
alter table public.appointments add column if not exists staff_id text;
alter table public.appointments add column if not exists staff_name text;

drop index if exists appointments_slot_unique;
drop index if exists appointments_slot_staff_unique;

create unique index if not exists appointments_slot_staff_unique
  on public.appointments (booking_date, booking_time, staff_id)
  where (status <> 'cancelled' and staff_id is not null);

create index if not exists appointments_staff_idx
  on public.appointments (staff_id);
