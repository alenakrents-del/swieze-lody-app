alter table public.customer_collection_items
  add column if not exists order_id bigint references public.orders(id) on delete set null;

create index if not exists customer_collection_items_order_id_idx
  on public.customer_collection_items(order_id);

create or replace function public.unlock_collection_item(
  p_customer_id uuid,
  p_collection_code text,
  p_item_code text,
  p_purchase_id uuid default null,
  p_order_id bigint default null
)
returns table(item_unlocked boolean, collected integer, total_items integer)
language plpgsql
security definer
set search_path to 'public'
as $function$
declare
    v_item_id uuid;
    v_collection_id uuid;
    v_inserted integer := 0;
    v_collected integer := 0;
    v_total integer := 0;
begin
    select id
    into v_collection_id
    from public.collections
    where code = p_collection_code
      and active = true;

    if v_collection_id is null then
        raise exception 'Collection not found';
    end if;

    select id
    into v_item_id
    from public.collection_items
    where collection_id = v_collection_id
      and code = p_item_code
      and active = true;

    if v_item_id is null then
        raise exception 'Collection item not found';
    end if;

    insert into public.customer_collection_items
        (customer_id, item_id, purchase_id, order_id)
    values
        (p_customer_id, v_item_id, p_purchase_id, p_order_id)
    on conflict (customer_id, item_id) do nothing;

    get diagnostics v_inserted = row_count;

    select count(*)
    into v_collected
    from public.customer_collection_items cci
    join public.collection_items ci
      on ci.id = cci.item_id
    where cci.customer_id = p_customer_id
      and ci.collection_id = v_collection_id;

    select count(*)
    into v_total
    from public.collection_items
    where collection_id = v_collection_id
      and active = true;

    insert into public.customer_rewards
        (customer_id, collection_reward_id)
    select
        p_customer_id,
        cr.id
    from public.collection_rewards cr
    where cr.collection_id = v_collection_id
      and cr.active = true
      and cr.unlock_count <= v_collected
    on conflict (customer_id, collection_reward_id) do nothing;

    return query
    select
        (v_inserted > 0),
        v_collected,
        v_total;
end;
$function$;

create or replace function public.unlock_items_from_collected_order(p_order_id bigint)
returns void
language plpgsql
security definer
set search_path to 'public'
as $function$
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
          null,
          p_order_id
        );
      end if;

      perform * from public.unlock_collection_item(
        v_customer_id,
        'VACATION',
        'MILKSHAKE',
        null,
        p_order_id
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
          null,
          p_order_id
        );
      end if;

      perform * from public.unlock_collection_item(
        v_customer_id,
        'VACATION',
        'LEMONADE',
        null,
        p_order_id
      );

    elsif v_item.product_key like 'waffle:%' then
      perform * from public.unlock_collection_item(
        v_customer_id,
        'VACATION',
        'WAFFLE',
        null,
        p_order_id
      );

    elsif v_item.product_key like 'icecream:%' then
      perform * from public.unlock_collection_item(
        v_customer_id,
        'VACATION',
        'ICE_CREAM',
        null,
        p_order_id
      );
    end if;
  end loop;
end;
$function$;

create or replace function public.get_my_collection_items()
returns table(collection_code text, item_code text, unlocked_at timestamptz, order_id bigint)
language plpgsql
security definer
set search_path to 'public'
as $function$
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
    col.code,
    ci.code,
    cci.unlocked_at,
    cci.order_id
  from public.customer_collection_items cci
  join public.collection_items ci on ci.id = cci.item_id
  join public.collections col on col.id = ci.collection_id
  where cci.customer_id = v_customer_id
  order by cci.unlocked_at;
end;
$function$;
