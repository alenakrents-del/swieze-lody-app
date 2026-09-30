
create or replace function public.staff_list_orders()
returns table(
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
as $function$
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
  where
    o.status in ('new','accepted','preparing','ready')
    or (
      o.created_at >= now() - interval '2 days'
      and o.status <> 'cancelled'
    )
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
$function$;

alter function public.set_updated_at() set search_path = '';

revoke execute on function public.handle_new_customer() from public, anon, authenticated;
revoke execute on function public.set_updated_at() from public, anon, authenticated;

create index if not exists customer_collection_items_item_id_idx
  on public.customer_collection_items(item_id);
create index if not exists customer_collection_items_purchase_id_idx
  on public.customer_collection_items(purchase_id);
create index if not exists customer_rewards_collection_reward_id_idx
  on public.customer_rewards(collection_reward_id);
create index if not exists in_app_announcement_translations_locale_idx
  on public.in_app_announcement_translations(locale);
create index if not exists loyalty_transactions_customer_id_idx
  on public.loyalty_transactions(customer_id);
create index if not exists loyalty_transactions_purchase_id_idx
  on public.loyalty_transactions(purchase_id);
create index if not exists menu_category_translations_locale_idx
  on public.menu_category_translations(locale);
create index if not exists menu_product_translations_locale_idx
  on public.menu_product_translations(locale);
create index if not exists purchases_customer_id_idx
  on public.purchases(customer_id);
