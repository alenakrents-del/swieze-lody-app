alter table public.orders
  add column if not exists customer_id uuid null;

alter table public.orders
  drop constraint if exists orders_customer_id_fkey;

alter table public.orders
  add constraint orders_customer_id_fkey
  foreign key (customer_id)
  references public.customers(id)
  on delete set null;

create index if not exists idx_orders_customer_id_created_at
  on public.orders(customer_id, created_at desc);

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
    v_key := left(coalesce(v_item->>'key','item'), 120);
    v_name := left(coalesce(v_item->>'name',''), 200);
    v_price := coalesce((v_item->>'price')::numeric, 0);
    v_qty := coalesce((v_item->>'qty')::integer, 1);

    if v_name = '' or v_price < 0 or v_price > 1000 or v_qty < 1 or v_qty > 20 then
      raise exception 'invalid order item';
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
