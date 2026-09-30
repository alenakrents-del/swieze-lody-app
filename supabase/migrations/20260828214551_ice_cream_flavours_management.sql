create table if not exists public.ice_cream_flavours (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  price numeric(10,2),
  image_url text,
  available_today boolean not null default false,
  archived boolean not null default false,
  sort_order integer not null default 100,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists ice_cream_flavours_name_unique_ci
on public.ice_cream_flavours (lower(name))
where archived = false;

alter table public.ice_cream_flavours enable row level security;

revoke all on public.ice_cream_flavours from anon, authenticated;

create or replace function public.get_today_ice_cream_flavours()
returns table (
  id uuid,
  name text,
  price numeric,
  image_url text,
  sort_order integer
)
language sql
security definer
set search_path = public
as $$
  select f.id, f.name, f.price, f.image_url, f.sort_order
  from public.ice_cream_flavours f
  where f.available_today = true
    and f.archived = false
    and f.price is not null
    and f.price > 0
  order by f.sort_order, f.name;
$$;

revoke all on function public.get_today_ice_cream_flavours() from public;
grant execute on function public.get_today_ice_cream_flavours() to anon, authenticated;

create or replace function public.staff_list_ice_cream_flavours()
returns table (
  id uuid,
  name text,
  price numeric,
  image_url text,
  available_today boolean,
  archived boolean,
  sort_order integer
)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_staff() then
    raise exception 'not_staff';
  end if;

  return query
  select f.id, f.name, f.price, f.image_url, f.available_today, f.archived, f.sort_order
  from public.ice_cream_flavours f
  where f.archived = false
  order by f.available_today desc, f.sort_order, f.name;
end;
$$;

revoke all on function public.staff_list_ice_cream_flavours() from public;
grant execute on function public.staff_list_ice_cream_flavours() to authenticated;

create or replace function public.staff_save_ice_cream_flavour(
  p_id uuid default null,
  p_name text default null,
  p_price numeric default null,
  p_image_url text default null,
  p_available_today boolean default false,
  p_sort_order integer default 100
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
  v_name text := nullif(btrim(p_name), '');
begin
  if not public.is_staff() then
    raise exception 'not_staff';
  end if;

  if v_name is null then
    raise exception 'name_required';
  end if;

  if p_price is not null and p_price <= 0 then
    raise exception 'invalid_price';
  end if;

  if p_id is null then
    insert into public.ice_cream_flavours(name, price, image_url, available_today, sort_order)
    values (v_name, p_price, nullif(btrim(p_image_url), ''), coalesce(p_available_today,false), coalesce(p_sort_order,100))
    returning id into v_id;
  else
    update public.ice_cream_flavours f
    set name = v_name,
        price = p_price,
        image_url = nullif(btrim(p_image_url), ''),
        available_today = coalesce(p_available_today,false),
        sort_order = coalesce(p_sort_order,100),
        updated_at = now()
    where f.id = p_id and f.archived = false
    returning f.id into v_id;

    if v_id is null then
      raise exception 'flavour_not_found';
    end if;
  end if;

  return v_id;
end;
$$;

revoke all on function public.staff_save_ice_cream_flavour(uuid,text,numeric,text,boolean,integer) from public;
grant execute on function public.staff_save_ice_cream_flavour(uuid,text,numeric,text,boolean,integer) to authenticated;

create or replace function public.staff_set_ice_cream_available(
  p_id uuid,
  p_available boolean
)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_staff() then
    raise exception 'not_staff';
  end if;

  update public.ice_cream_flavours f
  set available_today = coalesce(p_available,false), updated_at = now()
  where f.id = p_id and f.archived = false;

  return found;
end;
$$;

revoke all on function public.staff_set_ice_cream_available(uuid,boolean) from public;
grant execute on function public.staff_set_ice_cream_available(uuid,boolean) to authenticated;

create or replace function public.staff_archive_ice_cream_flavour(p_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_staff() then
    raise exception 'not_staff';
  end if;

  update public.ice_cream_flavours f
  set archived = true, available_today = false, updated_at = now()
  where f.id = p_id and f.archived = false;

  return found;
end;
$$;

revoke all on function public.staff_archive_ice_cream_flavour(uuid) from public;
grant execute on function public.staff_archive_ice_cream_flavour(uuid) to authenticated;
