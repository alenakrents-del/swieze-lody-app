create or replace function public.get_my_orders()
returns table (
  id bigint,
  order_number bigint,
  status text,
  total numeric,
  estimated_minutes integer,
  created_at timestamptz,
  updated_at timestamptz,
  ready_at timestamptz,
  items jsonb
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_customer_id uuid;
begin
  if auth.uid() is null then
    raise exception 'not authenticated';
  end if;

  select c.id
    into v_customer_id
  from public.customers c
  where c.auth_user_id = auth.uid()
  limit 1;

  if v_customer_id is null then
    return;
  end if;

  return query
  select
    o.id,
    o.order_number,
    o.status,
    o.total,
    o.estimated_minutes,
    o.created_at,
    o.updated_at,
    o.ready_at,
    coalesce(
      jsonb_agg(
        jsonb_build_object(
          'product_key', oi.product_key,
          'name', oi.name,
          'unit_price', oi.unit_price,
          'quantity', oi.quantity
        ) order by oi.id
      ) filter (where oi.id is not null),
      '[]'::jsonb
    ) as items
  from public.orders o
  left join public.order_items oi on oi.order_id = o.id
  where o.customer_id = v_customer_id
  group by o.id
  order by o.created_at desc;
end;
$$;

revoke all on function public.get_my_orders() from public;
revoke all on function public.get_my_orders() from anon;
grant execute on function public.get_my_orders() to authenticated;
