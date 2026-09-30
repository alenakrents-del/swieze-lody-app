create or replace function public.create_pickup_order(
  p_items jsonb,
  p_locale text default 'pl'::text
)
returns table(
  order_id bigint,
  public_token uuid,
  order_number bigint,
  status text,
  estimated_minutes integer,
  total numeric
)
language plpgsql
security definer
set search_path = public
as $function$
declare
  v_order_id bigint;
  v_total numeric(10,2) := 0;
  v_count integer;
  v_item jsonb;
  v_name text;
  v_key text;
  v_price numeric(10,2);
  v_qty integer;
  v_customer_id uuid;
  v_customer_name text;
  v_flavour_id uuid;
begin
  if p_items is null or jsonb_typeof(p_items) <> 'array' then
    raise exception 'items must be an array';
  end if;

  v_count := jsonb_array_length(p_items);
  if v_count < 1 or v_count > 50 then
    raise exception 'invalid item count';
  end if;

  if p_locale not in ('pl','de','en','cs') then
    p_locale := 'pl';
  end if;

  if auth.uid() is not null then
    select c.id, c.name
      into v_customer_id, v_customer_name
    from public.customers c
    where c.auth_user_id = auth.uid()
    limit 1;
  end if;

  insert into public.orders(locale, customer_id, customer_name)
  values (p_locale, v_customer_id, v_customer_name)
  returning id into v_order_id;

  for v_item in select value from jsonb_array_elements(p_items)
  loop
    v_key := left(coalesce(v_item->>'key',''), 120);
    v_name := left(coalesce(v_item->>'name',''), 200);
    v_qty := coalesce((v_item->>'qty')::integer, 1);
    v_price := null;

    if v_key = '' or v_name = '' or v_qty < 1 or v_qty > 20 then
      raise exception 'invalid order item';
    end if;

    if v_key like 'icecream:%' then
      if split_part(v_key, ':', 2) !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$' then
        raise exception 'invalid ice cream key';
      end if;

      v_flavour_id := split_part(v_key, ':', 2)::uuid;

      select f.price, f.name
        into v_price, v_name
      from public.ice_cream_flavours f
      where f.id = v_flavour_id
        and f.archived = false
        and f.available_today = true
      limit 1;

    else
      v_price := case v_key
        when 'milkshake:0' then 25
        when 'milkshake:1' then 25
        when 'milkshake:2' then 25
        when 'milkshake:3' then 25
        when 'milkshake:4' then 25
        when 'milkshake:5' then 25
        when 'milkshake:6' then 25
        when 'milkshake:7' then 25
        when 'milkshake:8' then 25

        when 'lemonade:0' then 18
        when 'lemonade:1' then 18
        when 'lemonade:2' then 18
        when 'lemonade:3' then 18

        when 'waffle:0' then 10
        when 'waffle:1' then 12
        when 'waffle:2' then 15
        when 'waffle:3' then 17
        when 'waffle:4' then 17
        when 'waffle:5' then 17
        when 'waffle:6' then 17
        when 'waffle:7' then 17
        when 'waffle:8' then 20
        when 'waffle:9' then 20
        when 'waffle:10' then 25
        when 'waffle:11' then 25
        when 'waffle:12' then 25
        when 'waffle:13' then 34
        else null
      end;
    end if;

    if v_price is null or v_price < 0 or v_price > 1000 then
      raise exception 'unknown or unavailable product';
    end if;

    insert into public.order_items(order_id, product_key, name, unit_price, quantity)
    values (v_order_id, v_key, v_name, v_price, v_qty);

    v_total := v_total + (v_price * v_qty);
  end loop;

  update public.orders
  set total = v_total
  where id = v_order_id;

  return query
  select o.id, o.public_token, o.order_number, o.status, o.estimated_minutes, o.total
  from public.orders o
  where o.id = v_order_id;
end;
$function$;
