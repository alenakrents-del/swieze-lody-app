create table if not exists public.staff_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.staff_users enable row level security;
revoke all on public.staff_users from anon, authenticated;

create or replace function public.is_staff()
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.staff_users s
    where s.user_id = auth.uid()
  );
$$;

grant execute on function public.is_staff() to authenticated;

create or replace function public.staff_list_orders()
returns table (
  id bigint,
  order_number bigint,
  status text,
  locale text,
  total numeric,
  estimated_minutes integer,
  created_at timestamptz,
  updated_at timestamptz,
  items jsonb
)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_staff() then
    raise exception 'not authorized';
  end if;

  return query
  select
    o.id,
    o.order_number,
    o.status,
    o.locale,
    o.total,
    o.estimated_minutes,
    o.created_at,
    o.updated_at,
    coalesce(
      jsonb_agg(
        jsonb_build_object(
          'name', oi.name,
          'unit_price', oi.unit_price,
          'quantity', oi.quantity
        ) order by oi.id
      ) filter (where oi.id is not null),
      '[]'::jsonb
    ) as items
  from public.orders o
  left join public.order_items oi on oi.order_id = o.id
  where o.created_at >= now() - interval '2 days'
    and o.status <> 'cancelled'
  group by o.id
  order by
    case o.status
      when 'new' then 1
      when 'accepted' then 2
      when 'preparing' then 3
      when 'ready' then 4
      when 'collected' then 5
      else 6
    end,
    o.created_at asc;
end;
$$;

grant execute on function public.staff_list_orders() to authenticated;

create or replace function public.staff_update_order(
  p_order_id bigint,
  p_status text default null,
  p_estimated_minutes integer default null
)
returns table (
  id bigint,
  order_number bigint,
  status text,
  estimated_minutes integer,
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

  update public.orders
  set
    status = coalesce(p_status, status),
    estimated_minutes = coalesce(p_estimated_minutes, estimated_minutes)
  where orders.id = p_order_id;

  return query
  select o.id, o.order_number, o.status, o.estimated_minutes, o.updated_at
  from public.orders o
  where o.id = p_order_id;
end;
$$;

grant execute on function public.staff_update_order(bigint, text, integer) to authenticated;
