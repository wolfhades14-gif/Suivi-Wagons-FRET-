-- V22 · migration de la table wagons existante
-- A exécuter une seule fois dans Supabase SQL Editor.

alter table public.wagons add column if not exists entry_uid text;
alter table public.wagons add column if not exists seq bigint;
alter table public.wagons add column if not exists record_version integer not null default 1;
alter table public.wagons add column if not exists week text;
alter table public.wagons add column if not exists serie text;
alter table public.wagons add column if not exists observation text;
alter table public.wagons add column if not exists cancelled_at timestamptz;
alter table public.wagons add column if not exists cancelled_reason text;

update public.wagons
set entry_uid = coalesce(entry_uid, 'db-' || id::text),
    seq = coalesce(seq, id),
    serie = coalesce(serie, 'Tads'),
    week = coalesce(week, to_char(created_at, 'IYYY-"W"IW'));

alter table public.wagons alter column entry_uid set not null;
create unique index if not exists wagons_entry_uid_key on public.wagons(entry_uid);

-- Autorise Realtime sur la table pour la synchronisation des téléphones.
do $$
begin
  alter publication supabase_realtime add table public.wagons;
exception
  when duplicate_object then null;
end $$;
