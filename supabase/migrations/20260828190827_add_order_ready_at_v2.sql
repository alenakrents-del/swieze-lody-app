alter table public.orders
  add column if not exists ready_at timestamptz;

update public.orders
set ready_at = coalesce(updated_at, created_at) + make_interval(mins => estimated_minutes)
where ready_at is null
  and status in ('new','accepted','preparing');

drop function if exists public.staff_update_order(bigint,text,integer);

create function public.staff_update_order(
  p_order_id bigint,
  p_status text default null,
  p_estimated_minutes integer default null
)
returns table(
  id bigint,
  order_number bigint,
  status text,
  estimated_minutes integer,
  ready_at timestamptz,
  updated_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_staff() then
    raise exception 'not authorized';
  end if;

  if p_status is not null and p_status not in ('new','accepted','preparing','ready','collected','cancelled') then
    raise exception 'invalid status';
  end if;

  if p_estimated_minutes is not null and (p_estimated_minutes < 0 or p_estimated_minutes > 180) then
    raise exception 'invalid estimated time';
  end if;

  update public.orders o
  set
    status = coalesce(p_status, o.status),
    estimated_minutes = coalesce(p_estimated_minutes, o.estimated_minutes),
    ready_at = case
      when p_status = 'ready' then now()
      when p_status in ('collected','cancelled') then o.ready_at
      when p_estimated_minutes is not null then now() + make_interval(mins => p_estimated_minutes)
      when o.ready_at is null and coalesce(p_status, o.status) in ('new','accepted','preparing') then now() + make_interval(mins => o.estimated_minutes)
      else o.ready_at
    end
  where o.id = p_order_id;

  return query
  select o.id, o.order_number, o.status, o.estimated_minutes, o.ready_at, o.updated_at
  from public.orders o
  where o.id = p_order_id;
end;
$$;

revoke all on function public.staff_update_order(bigint,text,integer) from public, anon;
grant execute on function public.staff_update_order(bigint,text,integer) to authenticated;

drop function if exists public.get_pickup_order_status(uuid);

create function public.get_pickup_order_status(p_public_token uuid)
returns table(
  order_number bigint,
  status text,
  estimated_minutes integer,
  ready_at timestamptz,
  total numeric,
  created_at timestamptz,
  updated_at timestamptz
)
language sql
stable
security definer
set search_path = public
as $$
  select o.order_number, o.status, o.estimated_minutes, o.ready_at, o.total, o.created_at, o.updated_at
  from public.orders o
  where o.public_token = p_public_token
  limit 1;
$$;

revoke all on function public.get_pickup_order_status(uuid) from public;
grant execute on function public.get_pickup_order_status(uuid) to anon, authenticated;
