create or replace function public.staff_update_order(
  p_order_id bigint,
  p_status text default null,
  p_estimated_minutes integer default null
)
returns table(
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

  update public.orders as o
  set
    status = coalesce(p_status, o.status),
    estimated_minutes = coalesce(p_estimated_minutes, o.estimated_minutes)
  where o.id = p_order_id;

  return query
  select o.id, o.order_number, o.status, o.estimated_minutes, o.updated_at
  from public.orders as o
  where o.id = p_order_id;
end;
$$;
