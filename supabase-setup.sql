-- IG-MOTORS : schéma d'administration Supabase
-- Exécuter dans Supabase > SQL Editor après création du projet.
-- Aucune clé secrète ne doit être copiée dans le site.

create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.vehicles (
  id text primary key,
  payload jsonb not null,
  published boolean not null default false,
  updated_at timestamptz not null default now(),
  constraint vehicle_payload_is_object check (jsonb_typeof(payload) = 'object')
);

alter table public.admin_users enable row level security;
alter table public.vehicles enable row level security;

create or replace function public.is_igmotors_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.admin_users au where au.user_id = auth.uid()
  );
$$;
revoke all on function public.is_igmotors_admin() from public;
grant execute on function public.is_igmotors_admin() to anon, authenticated;

drop policy if exists "admin can see own membership" on public.admin_users;
create policy "admin can see own membership" on public.admin_users
  for select to authenticated using (user_id = auth.uid());

-- Les visiteurs ne lisent que les annonces publiées ; les administrateurs voient tout.
drop policy if exists "public reads published vehicles" on public.vehicles;
create policy "public reads published vehicles" on public.vehicles
  for select to anon, authenticated
  using (published = true or public.is_igmotors_admin());
drop policy if exists "admins add vehicles" on public.vehicles;
create policy "admins add vehicles" on public.vehicles
  for insert to authenticated with check (public.is_igmotors_admin());
drop policy if exists "admins edit vehicles" on public.vehicles;
create policy "admins edit vehicles" on public.vehicles
  for update to authenticated
  using (public.is_igmotors_admin()) with check (public.is_igmotors_admin());
drop policy if exists "admins remove vehicles" on public.vehicles;
create policy "admins remove vehicles" on public.vehicles
  for delete to authenticated using (public.is_igmotors_admin());

grant select on public.vehicles to anon, authenticated;
grant insert, update, delete on public.vehicles to authenticated;
grant select on public.admin_users to authenticated;

-- Photos publiques en lecture, téléversement/suppression réservés aux administrateurs.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('vehicle-photos', 'vehicle-photos', true, 5242880, array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public = true, file_size_limit = 5242880,
  allowed_mime_types = array['image/jpeg','image/png','image/webp'];

drop policy if exists "public reads vehicle photos" on storage.objects;
create policy "public reads vehicle photos" on storage.objects
  for select to anon, authenticated using (bucket_id = 'vehicle-photos');
drop policy if exists "admins upload vehicle photos" on storage.objects;
create policy "admins upload vehicle photos" on storage.objects
  for insert to authenticated with check (
    bucket_id = 'vehicle-photos' and public.is_igmotors_admin()
  );
drop policy if exists "admins update vehicle photos" on storage.objects;
create policy "admins update vehicle photos" on storage.objects
  for update to authenticated using (
    bucket_id = 'vehicle-photos' and public.is_igmotors_admin()
  ) with check (bucket_id = 'vehicle-photos' and public.is_igmotors_admin());
drop policy if exists "admins delete vehicle photos" on storage.objects;
create policy "admins delete vehicle photos" on storage.objects
  for delete to authenticated using (
    bucket_id = 'vehicle-photos' and public.is_igmotors_admin()
  );

-- Active les changements en temps réel pour le catalogue public.
do $$ begin
  if not exists (
    select 1 from pg_publication_tables
    where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'vehicles'
  ) then
    alter publication supabase_realtime add table public.vehicles;
  end if;
end $$;
