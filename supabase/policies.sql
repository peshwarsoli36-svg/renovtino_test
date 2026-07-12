-- Run this in Supabase → SQL Editor if booking insert/update fails with RLS errors.
-- Safe to re-run on an existing appointments table.

alter table public.appointments enable row level security;

grant select, insert, update, delete on public.appointments to anon, authenticated;

drop policy if exists "Allow public read" on public.appointments;
create policy "Allow public read"
  on public.appointments for select
  to anon, authenticated
  using (true);

drop policy if exists "Allow public insert" on public.appointments;
create policy "Allow public insert"
  on public.appointments for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Allow public update" on public.appointments;
create policy "Allow public update"
  on public.appointments for update
  to anon, authenticated
  using (true)
  with check (true);

drop policy if exists "Allow public delete" on public.appointments;
create policy "Allow public delete"
  on public.appointments for delete
  to anon, authenticated
  using (true);

-- Realtime (ignore error if already added)
do $$
begin
  alter publication supabase_realtime add table public.appointments;
exception
  when duplicate_object then null;
end $$;
