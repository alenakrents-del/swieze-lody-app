
-- Remove policies that are strictly redundant under an existing broader SELECT policy.
drop policy if exists "Collection items readable" on public.collection_items;
drop policy if exists "Rewards catalog readable" on public.collection_rewards;
drop policy if exists "Collections readable" on public.collections;
drop policy if exists "Customer sees own collection items" on public.customer_collection_items;
drop policy if exists "Customer sees own rewards" on public.customer_rewards;

-- Keep customer-facing policy semantics but evaluate auth.uid() once per statement.
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

-- Merge public/staff locale reads into one policy per role.
drop policy if exists public_read_active_locales on public.app_locales;
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

-- Merge customer-visible and staff-all SELECT policies for menu categories.
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

-- Merge customer-visible and staff-all SELECT policies for menu products.
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

-- Translation tables: staff can still read everything, but writes no longer use an ALL
-- policy that overlaps the customer SELECT policy.
drop policy if exists authenticated_read_visible_category_translations on public.menu_category_translations;
drop policy if exists staff_manage_category_translations on public.menu_category_translations;

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
