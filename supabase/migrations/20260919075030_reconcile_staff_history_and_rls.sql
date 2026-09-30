
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
      o.created_at >= now() - interval '30 days'
      and o.status in ('collected','cancelled','returned','refunded')
    )
  group by o.id
  order by
    case o.status
      when 'new' then 1
      when 'accepted' then 2
      when 'preparing' then 3
      when 'ready' then 4
      when 'collected' then 5
      when 'cancelled' then 6
      when 'returned' then 7
      when 'refunded' then 8
      else 9
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

drop policy if exists "Collection items readable" on public.collection_items;
drop policy if exists "Rewards catalog readable" on public.collection_rewards;
drop policy if exists "Collections readable" on public.collections;
drop policy if exists "Customer sees own collection items" on public.customer_collection_items;
drop policy if exists "Customer sees own rewards" on public.customer_rewards;

alter policy customer_read_own_profile
  on public.customers
  using ((select auth.uid()) = auth_user_id);

alter policy customer_read_own_purchases
  on public.purchases
  using (
    exists (
      select 1
      from public.customers c
      where c.id = purchases.customer_id
        and c.auth_user_id = (select auth.uid())
    )
  );

alter policy customer_read_own_bonus_history
  on public.loyalty_transactions
  using (
    exists (
      select 1
      from public.customers c
      where c.id = loyalty_transactions.customer_id
        and c.auth_user_id = (select auth.uid())
    )
  );

alter policy "customer reads own collection items"
  on public.customer_collection_items
  using (
    exists (
      select 1
      from public.customers c
      where c.id = customer_collection_items.customer_id
        and c.auth_user_id = (select auth.uid())
    )
  );

alter policy "customer reads own rewards"
  on public.customer_rewards
  using (
    exists (
      select 1
      from public.customers c
      where c.id = customer_rewards.customer_id
        and c.auth_user_id = (select auth.uid())
    )
  );

alter policy customer_favourites_select_own
  on public.customer_ice_cream_favourites
  using (
    exists (
      select 1
      from public.customers c
      where c.id = customer_ice_cream_favourites.customer_id
        and c.auth_user_id = (select auth.uid())
    )
  );

drop policy if exists public_read_active_locales on public.app_locales;
drop policy if exists authenticated_read_locales on public.app_locales;
drop policy if exists staff_read_all_locales on public.app_locales;

create policy public_read_active_locales
  on public.app_locales
  for select
  to anon
  using (is_active = true);

create policy authenticated_read_locales
  on public.app_locales
  for select
  to authenticated
  using (is_active = true or (select public.is_staff()));

drop policy if exists authenticated_read_visible_menu_categories on public.menu_categories;
drop policy if exists staff_read_all_menu_categories on public.menu_categories;

create policy authenticated_read_visible_menu_categories
  on public.menu_categories
  for select
  to authenticated
  using (
    (select public.is_staff())
    or (
      (select auth.uid()) is not null
      and is_active = true
      and (
        visibility = any (array['public'::text,'authenticated'::text])
        or (
          visibility = 'unlocked'::text
          and private.user_has_menu_reward(required_reward_id)
        )
      )
      and (available_starts_at is null or available_starts_at <= now())
      and (available_ends_at is null or available_ends_at > now())
    )
  );

drop policy if exists authenticated_read_visible_menu_products on public.menu_products;
drop policy if exists staff_read_all_menu_products on public.menu_products;

create policy authenticated_read_visible_menu_products
  on public.menu_products
  for select
  to authenticated
  using (
    (select public.is_staff())
    or (
      (select auth.uid()) is not null
      and is_active = true
      and (
        visibility = any (array['public'::text,'authenticated'::text])
        or (
          visibility = 'unlocked'::text
          and private.user_has_menu_reward(required_reward_id)
        )
      )
      and (available_starts_at is null or available_starts_at <= now())
      and (available_ends_at is null or available_ends_at > now())
      and exists (
        select 1
        from public.menu_categories category
        where category.id = menu_products.category_id
          and category.is_active = true
          and (
            category.visibility = any (array['public'::text,'authenticated'::text])
            or (
              category.visibility = 'unlocked'::text
              and private.user_has_menu_reward(category.required_reward_id)
            )
          )
          and (category.available_starts_at is null or category.available_starts_at <= now())
          and (category.available_ends_at is null or category.available_ends_at > now())
      )
    )
  );

drop policy if exists authenticated_read_visible_category_translations on public.menu_category_translations;
drop policy if exists staff_manage_category_translations on public.menu_category_translations;
drop policy if exists staff_insert_category_translations on public.menu_category_translations;
drop policy if exists staff_update_category_translations on public.menu_category_translations;
drop policy if exists staff_delete_category_translations on public.menu_category_translations;

create policy authenticated_read_visible_category_translations
  on public.menu_category_translations
  for select
  to authenticated
  using (
    (select public.is_staff())
    or (
      (select auth.uid()) is not null
      and exists (
        select 1
        from public.menu_categories category
        where category.id = menu_category_translations.category_id
          and category.is_active = true
          and (
            category.visibility = any (array['public'::text,'authenticated'::text])
            or (
              category.visibility = 'unlocked'::text
              and private.user_has_menu_reward(category.required_reward_id)
            )
          )
          and (category.available_starts_at is null or category.available_starts_at <= now())
          and (category.available_ends_at is null or category.available_ends_at > now())
      )
    )
  );

create policy staff_insert_category_translations
  on public.menu_category_translations
  for insert
  to authenticated
  with check ((select public.is_staff()));

create policy staff_update_category_translations
  on public.menu_category_translations
  for update
  to authenticated
  using ((select public.is_staff()))
  with check ((select public.is_staff()));

create policy staff_delete_category_translations
  on public.menu_category_translations
  for delete
  to authenticated
  using ((select public.is_staff()));

drop policy if exists authenticated_read_visible_product_translations on public.menu_product_translations;
drop policy if exists staff_manage_product_translations on public.menu_product_translations;
drop policy if exists staff_insert_product_translations on public.menu_product_translations;
drop policy if exists staff_update_product_translations on public.menu_product_translations;
drop policy if exists staff_delete_product_translations on public.menu_product_translations;

create policy authenticated_read_visible_product_translations
  on public.menu_product_translations
  for select
  to authenticated
  using (
    (select public.is_staff())
    or (
      (select auth.uid()) is not null
      and exists (
        select 1
        from public.menu_products product
        join public.menu_categories category on category.id = product.category_id
        where product.id = menu_product_translations.product_id
          and product.is_active = true
          and (
            product.visibility = any (array['public'::text,'authenticated'::text])
            or (
              product.visibility = 'unlocked'::text
              and private.user_has_menu_reward(product.required_reward_id)
            )
          )
          and (product.available_starts_at is null or product.available_starts_at <= now())
          and (product.available_ends_at is null or product.available_ends_at > now())
          and category.is_active = true
          and (
            category.visibility = any (array['public'::text,'authenticated'::text])
            or (
              category.visibility = 'unlocked'::text
              and private.user_has_menu_reward(category.required_reward_id)
            )
          )
          and (category.available_starts_at is null or category.available_starts_at <= now())
          and (category.available_ends_at is null or category.available_ends_at > now())
      )
    )
  );

create policy staff_insert_product_translations
  on public.menu_product_translations
  for insert
  to authenticated
  with check ((select public.is_staff()));

create policy staff_update_product_translations
  on public.menu_product_translations
  for update
  to authenticated
  using ((select public.is_staff()))
  with check ((select public.is_staff()));

create policy staff_delete_product_translations
  on public.menu_product_translations
  for delete
  to authenticated
  using ((select public.is_staff()));
