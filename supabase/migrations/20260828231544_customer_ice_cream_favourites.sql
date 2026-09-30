create table if not exists public.customer_ice_cream_favourites (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references public.customers(id) on delete cascade,
  flavour_id uuid not null references public.ice_cream_flavours(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique(customer_id, flavour_id)
);

alter table public.customer_ice_cream_favourites enable row level security;

revoke all on table public.customer_ice_cream_favourites from anon, authenticated;

drop policy if exists customer_favourites_select_own on public.customer_ice_cream_favourites;
create policy customer_favourites_select_own
on public.customer_ice_cream_favourites
for select
to authenticated
using (
  exists (
    select 1 from public.customers c
    where c.id = customer_id
      and c.auth_user_id = auth.uid()
  )
);

create or replace function public.get_my_ice_cream_favourites()
returns table(flavour_id uuid)
language sql
security definer
set search_path = public
as $$
  select f.flavour_id
  from public.customer_ice_cream_favourites f
  join public.customers c on c.id = f.customer_id
  where c.auth_user_id = auth.uid()
  order by f.created_at desc;
$$;

create or replace function public.toggle_my_ice_cream_favourite(p_flavour_id uuid)
returns boolean
language plpgsql
security definer
set search_path = public
as $$
declare
  v_customer_id uuid;
  v_exists boolean;
begin
  if auth.uid() is null then
    raise exception 'not_authenticated';
  end if;

  select c.id into v_customer_id
  from public.customers c
  where c.auth_user_id = auth.uid();

  if v_customer_id is null then
    raise exception 'customer_not_found';
  end if;

  if not exists (
    select 1 from public.ice_cream_flavours f
    where f.id = p_flavour_id
      and f.archived = false
  ) then
    raise exception 'flavour_not_found';
  end if;

  select exists (
    select 1
    from public.customer_ice_cream_favourites f
    where f.customer_id = v_customer_id
      and f.flavour_id = p_flavour_id
  ) into v_exists;

  if v_exists then
    delete from public.customer_ice_cream_favourites
    where customer_id = v_customer_id
      and flavour_id = p_flavour_id;
    return false;
  end if;

  insert into public.customer_ice_cream_favourites(customer_id, flavour_id)
  values (v_customer_id, p_flavour_id)
  on conflict (customer_id, flavour_id) do nothing;

  return true;
end;
$$;

revoke all on function public.get_my_ice_cream_favourites() from public;
revoke all on function public.toggle_my_ice_cream_favourite(uuid) from public;
grant execute on function public.get_my_ice_cream_favourites() to authenticated;
grant execute on function public.toggle_my_ice_cream_favourite(uuid) to authenticated;

create index if not exists customer_ice_cream_favourites_flavour_idx
  on public.customer_ice_cream_favourites(flavour_id);
