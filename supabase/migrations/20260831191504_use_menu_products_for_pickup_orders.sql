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
set search_path to 'public'
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
      select
        case
          when product.promo_price is not null
            and (
              product.promo_starts_at is null
              or product.promo_starts_at <= now()
            )
            and (
              product.promo_ends_at is null
              or now() < product.promo_ends_at
            )
          then product.promo_price
          else product.regular_price
        end,
        left(
          coalesce(
            nullif(btrim(localized.name), ''),
            nullif(btrim(polish.name), '')
          ),
          200
        )
      into v_price, v_name
      from public.menu_products product
      left join public.menu_product_translations localized
        on localized.product_id = product.id
       and localized.locale = p_locale
      left join public.menu_product_translations polish
        on polish.product_id = product.id
       and polish.locale = 'pl'
      where product.legacy_key = v_key
        and product.product_type = 'standard'
        and product.visibility = 'public'
        and product.required_reward_id is null
        and product.is_active = true
        and product.is_available = true
        and product.is_orderable = true
        and (
          product.available_starts_at is null
          or product.available_starts_at <= now()
        )
        and (
          product.available_ends_at is null
          or now() < product.available_ends_at
        )
        and coalesce(
          nullif(btrim(localized.name), ''),
          nullif(btrim(polish.name), '')
        ) is not null
      limit 1;
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
