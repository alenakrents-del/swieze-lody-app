create or replace function public.unlock_items_from_collected_order(p_order_id bigint)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_customer_id uuid;
  v_item record;
  v_code text;
begin
  select o.customer_id
    into v_customer_id
  from public.orders o
  where o.id = p_order_id
    and o.status = 'collected';

  if v_customer_id is null then
    return;
  end if;

  for v_item in
    select oi.product_key
    from public.order_items oi
    where oi.order_id = p_order_id
  loop
    if v_item.product_key like 'milkshake:%' then
      v_code := case v_item.product_key
        when 'milkshake:0' then 'MANGO'
        when 'milkshake:1' then 'LOTUS'
        when 'milkshake:2' then 'OREO'
        when 'milkshake:3' then 'RAFFAELLO'
        when 'milkshake:4' then 'KINDER'
        when 'milkshake:5' then 'BANANA'
        when 'milkshake:6' then 'STRAWBERRY'
        when 'milkshake:7' then 'CHOCOLATE'
        when 'milkshake:8' then 'ICE_COFFEE'
        else null
      end;

      if v_code is not null then
        perform * from public.unlock_collection_item(
          v_customer_id,
          'MILKSHAKE',
          v_code,
          null
        );
      end if;

      perform * from public.unlock_collection_item(
        v_customer_id,
        'VACATION',
        'MILKSHAKE',
        null
      );

    elsif v_item.product_key like 'lemonade:%' then
      v_code := case v_item.product_key
        when 'lemonade:0' then 'BLUE_LAGOON'
        when 'lemonade:1' then 'STRAWBERRY'
        when 'lemonade:2' then 'LEMON_MINT'
        when 'lemonade:3' then 'MANGO_PASSION'
        else null
      end;

      if v_code is not null then
        perform * from public.unlock_collection_item(
          v_customer_id,
          'LEMONADE',
          v_code,
          null
        );
      end if;

      perform * from public.unlock_collection_item(
        v_customer_id,
        'VACATION',
        'LEMONADE',
        null
      );

    elsif v_item.product_key like 'waffle:%' then
      perform * from public.unlock_collection_item(
        v_customer_id,
        'VACATION',
        'WAFFLE',
        null
      );

    elsif v_item.product_key like 'icecream:%' then
      perform * from public.unlock_collection_item(
        v_customer_id,
        'VACATION',
        'ICE_CREAM',
        null
      );
    end if;
  end loop;
end;
$$;

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
    end,
    updated_at = now()
  where o.id = p_order_id;

  if p_status = 'collected' then
    perform public.unlock_items_from_collected_order(p_order_id);
  end if;

  return query
  select o.id, o.order_number, o.status, o.estimated_minutes, o.ready_at, o.updated_at
  from public.orders o
  where o.id = p_order_id;
end;
$$;
