create or replace function public.staff_get_menu_catalog()
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $function$
begin
  if not coalesce(public.is_staff(), false) then
    raise exception 'Staff access required'
      using errcode = '42501';
  end if;

  return jsonb_build_object(
    'categories',
    coalesce(
      (
        select jsonb_agg(
          jsonb_build_object(
            'id', category.id,
            'slug', category.slug,
            'icon', category.icon,
            'image_url', category.image_url,
            'sort_order', category.sort_order,
            'is_active', category.is_active,
            'visibility', category.visibility,
            'available_starts_at', category.available_starts_at,
            'available_ends_at', category.available_ends_at,
            'required_reward_id', category.required_reward_id,
            'created_at', category.created_at,
            'updated_at', category.updated_at
          )
          order by category.sort_order, category.slug, category.id
        )
        from public.menu_categories as category
      ),
      '[]'::jsonb
    ),
    'category_translations',
    coalesce(
      (
        select jsonb_agg(
          jsonb_build_object(
            'category_id', translation.category_id,
            'locale', translation.locale,
            'name', translation.name,
            'description', translation.description
          )
          order by translation.category_id, translation.locale
        )
        from public.menu_category_translations as translation
      ),
      '[]'::jsonb
    ),
    'products',
    coalesce(
      (
        select jsonb_agg(
          jsonb_build_object(
            'id', product.id,
            'category_id', product.category_id,
            'slug', product.slug,
            'legacy_key', product.legacy_key,
            'image_url', product.image_url,
            'regular_price', product.regular_price,
            'promo_price', product.promo_price,
            'promo_starts_at', product.promo_starts_at,
            'promo_ends_at', product.promo_ends_at,
            'badge', product.badge,
            'is_new', product.is_new,
            'new_until', product.new_until,
            'is_active', product.is_active,
            'is_available', product.is_available,
            'sort_order', product.sort_order,
            'product_type', product.product_type,
            'visibility', product.visibility,
            'is_orderable', product.is_orderable,
            'available_starts_at', product.available_starts_at,
            'available_ends_at', product.available_ends_at,
            'required_reward_id', product.required_reward_id,
            'ice_cream_flavour_id', product.ice_cream_flavour_id,
            'created_at', product.created_at,
            'updated_at', product.updated_at
          )
          order by product.category_id, product.sort_order, product.slug, product.id
        )
        from public.menu_products as product
      ),
      '[]'::jsonb
    ),
    'product_translations',
    coalesce(
      (
        select jsonb_agg(
          jsonb_build_object(
            'product_id', translation.product_id,
            'locale', translation.locale,
            'name', translation.name,
            'description', translation.description
          )
          order by translation.product_id, translation.locale
        )
        from public.menu_product_translations as translation
      ),
      '[]'::jsonb
    ),
    'rewards',
    coalesce(
      (
        select jsonb_agg(
          jsonb_build_object(
            'id', reward.id,
            'collection_id', reward.collection_id,
            'collection_name', collection.name,
            'reward_code', reward.reward_code,
            'reward_name', reward.reward_name,
            'reward_description', reward.reward_description,
            'unlock_count', reward.unlock_count,
            'secret', reward.secret,
            'active', reward.active
          )
          order by collection.name, reward.unlock_count, reward.reward_code, reward.id
        )
        from public.collection_rewards as reward
        join public.collections as collection
          on collection.id = reward.collection_id
      ),
      '[]'::jsonb
    )
  );
end;
$function$;

create or replace function public.staff_save_menu_category(
  p_id uuid,
  p_slug text,
  p_icon text,
  p_image_url text,
  p_sort_order integer,
  p_is_active boolean,
  p_visibility text,
  p_available_starts_at timestamp with time zone,
  p_available_ends_at timestamp with time zone,
  p_required_reward_id uuid,
  p_translations jsonb
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $function$
declare
  v_id uuid;
  v_locale text;
  v_translation jsonb;
  v_row_count integer;
begin
  if not coalesce(public.is_staff(), false) then
    raise exception 'Staff access required'
      using errcode = '42501';
  end if;

  p_slug := lower(btrim(p_slug));

  if p_slug is null
     or p_slug = ''
     or length(p_slug) > 100
     or p_slug !~ '^[a-z0-9]+(?:-[a-z0-9]+)*$' then
    raise exception 'Invalid category slug'
      using errcode = '22023';
  end if;

  if p_icon is not null and length(p_icon) > 32 then
    raise exception 'Category icon is too long'
      using errcode = '22023';
  end if;

  if p_image_url is not null and length(p_image_url) > 2048 then
    raise exception 'Category image URL is too long'
      using errcode = '22023';
  end if;

  if p_sort_order is null then
    raise exception 'Category sort_order is required'
      using errcode = '22023';
  end if;

  if p_is_active is null then
    raise exception 'Category is_active is required'
      using errcode = '22023';
  end if;

  if p_visibility is null
     or p_visibility not in ('public', 'authenticated', 'unlocked', 'hidden') then
    raise exception 'Invalid category visibility'
      using errcode = '22023';
  end if;

  if p_available_starts_at is not null
     and p_available_ends_at is not null
     and p_available_ends_at <= p_available_starts_at then
    raise exception 'Category availability end must be after start'
      using errcode = '22023';
  end if;

  if p_visibility = 'unlocked' and p_required_reward_id is null then
    raise exception 'Unlocked category requires a reward'
      using errcode = '22023';
  end if;

  if p_required_reward_id is not null
     and not exists (
       select 1
       from public.collection_rewards as reward
       where reward.id = p_required_reward_id
     ) then
    raise exception 'Required reward does not exist'
      using errcode = '23503';
  end if;

  if p_translations is null
     or jsonb_typeof(p_translations) <> 'object' then
    raise exception 'Category translations must be an object'
      using errcode = '22023';
  end if;

  if exists (
    select 1
    from jsonb_object_keys(p_translations) as translation_key(locale)
    where not (translation_key.locale = any (array['pl', 'de', 'en', 'cs']))
  ) then
    raise exception 'Unsupported category translation locale'
      using errcode = '22023';
  end if;

  foreach v_locale in array array['pl', 'de', 'en', 'cs']
  loop
    v_translation := p_translations -> v_locale;

    if v_translation is null
       or jsonb_typeof(v_translation) <> 'object'
       or nullif(btrim(v_translation ->> 'name'), '') is null then
      raise exception 'Missing category name for locale %', v_locale
        using errcode = '22023';
    end if;

    if length(btrim(v_translation ->> 'name')) > 200 then
      raise exception 'Category name is too long for locale %', v_locale
        using errcode = '22023';
    end if;

    if v_translation ? 'description'
       and length(coalesce(v_translation ->> 'description', '')) > 2000 then
      raise exception 'Category description is too long for locale %', v_locale
        using errcode = '22023';
    end if;
  end loop;

  if p_id is null then
    v_id := gen_random_uuid();

    insert into public.menu_categories (
      id,
      slug,
      icon,
      image_url,
      sort_order,
      is_active,
      visibility,
      available_starts_at,
      available_ends_at,
      required_reward_id
    )
    values (
      v_id,
      p_slug,
      nullif(btrim(p_icon), ''),
      nullif(btrim(p_image_url), ''),
      p_sort_order,
      p_is_active,
      p_visibility,
      p_available_starts_at,
      p_available_ends_at,
      p_required_reward_id
    );
  else
    v_id := p_id;

    update public.menu_categories
    set slug = p_slug,
        icon = nullif(btrim(p_icon), ''),
        image_url = nullif(btrim(p_image_url), ''),
        sort_order = p_sort_order,
        is_active = p_is_active,
        visibility = p_visibility,
        available_starts_at = p_available_starts_at,
        available_ends_at = p_available_ends_at,
        required_reward_id = p_required_reward_id,
        updated_at = now()
    where id = v_id;

    get diagnostics v_row_count = row_count;

    if v_row_count <> 1 then
      raise exception 'Category not found'
        using errcode = 'P0002';
    end if;
  end if;

  foreach v_locale in array array['pl', 'de', 'en', 'cs']
  loop
    v_translation := p_translations -> v_locale;

    insert into public.menu_category_translations (
      category_id,
      locale,
      name,
      description
    )
    values (
      v_id,
      v_locale,
      btrim(v_translation ->> 'name'),
      nullif(btrim(v_translation ->> 'description'), '')
    )
    on conflict (category_id, locale)
    do update
      set name = excluded.name,
          description = excluded.description;
  end loop;

  return v_id;
end;
$function$;

create or replace function public.staff_save_menu_product(
  p_id uuid,
  p_category_id uuid,
  p_slug text,
  p_image_url text,
  p_regular_price numeric,
  p_promo_price numeric,
  p_promo_starts_at timestamp with time zone,
  p_promo_ends_at timestamp with time zone,
  p_badge text,
  p_is_new boolean,
  p_new_until timestamp with time zone,
  p_is_active boolean,
  p_is_available boolean,
  p_sort_order integer,
  p_visibility text,
  p_is_orderable boolean,
  p_available_starts_at timestamp with time zone,
  p_available_ends_at timestamp with time zone,
  p_required_reward_id uuid,
  p_translations jsonb
)
returns uuid
language plpgsql
security definer
set search_path = ''
as $function$
declare
  v_id uuid;
  v_legacy_key text;
  v_product_type text;
  v_ice_cream_flavour_id uuid;
  v_locale text;
  v_translation jsonb;
begin
  if not coalesce(public.is_staff(), false) then
    raise exception 'Staff access required'
      using errcode = '42501';
  end if;

  if p_category_id is null
     or not exists (
       select 1
       from public.menu_categories as category
       where category.id = p_category_id
     ) then
    raise exception 'Category does not exist'
      using errcode = '23503';
  end if;

  p_slug := lower(btrim(p_slug));

  if p_slug is null
     or p_slug = ''
     or length(p_slug) > 100
     or p_slug !~ '^[a-z0-9]+(?:-[a-z0-9]+)*$' then
    raise exception 'Invalid product slug'
      using errcode = '22023';
  end if;

  if p_image_url is not null and length(p_image_url) > 2048 then
    raise exception 'Product image URL is too long'
      using errcode = '22023';
  end if;

  if p_regular_price is null
     or p_regular_price::text = 'NaN'
     or p_regular_price < 0 then
    raise exception 'Invalid regular price'
      using errcode = '22023';
  end if;

  if p_promo_price is not null
     and (
       p_promo_price::text = 'NaN'
       or p_promo_price < 0
       or p_promo_price > p_regular_price
     ) then
    raise exception 'Invalid promo price'
      using errcode = '22023';
  end if;

  if p_promo_price is null
     and (p_promo_starts_at is not null or p_promo_ends_at is not null) then
    raise exception 'Promo dates require a promo price'
      using errcode = '22023';
  end if;

  if p_promo_starts_at is not null
     and p_promo_ends_at is not null
     and p_promo_ends_at <= p_promo_starts_at then
    raise exception 'Promo end must be after start'
      using errcode = '22023';
  end if;

  if p_badge is not null and length(p_badge) > 100 then
    raise exception 'Product badge is too long'
      using errcode = '22023';
  end if;

  if p_is_new is null
     or p_is_active is null
     or p_is_available is null
     or p_is_orderable is null then
    raise exception 'Product boolean flags are required'
      using errcode = '22023';
  end if;

  if p_sort_order is null then
    raise exception 'Product sort_order is required'
      using errcode = '22023';
  end if;

  if p_visibility is null
     or p_visibility not in ('public', 'authenticated', 'unlocked', 'hidden') then
    raise exception 'Invalid product visibility'
      using errcode = '22023';
  end if;

  if p_available_starts_at is not null
     and p_available_ends_at is not null
     and p_available_ends_at <= p_available_starts_at then
    raise exception 'Product availability end must be after start'
      using errcode = '22023';
  end if;

  if p_visibility = 'unlocked' and p_required_reward_id is null then
    raise exception 'Unlocked product requires a reward'
      using errcode = '22023';
  end if;

  if p_required_reward_id is not null
     and not exists (
       select 1
       from public.collection_rewards as reward
       where reward.id = p_required_reward_id
     ) then
    raise exception 'Required reward does not exist'
      using errcode = '23503';
  end if;

  if p_translations is null
     or jsonb_typeof(p_translations) <> 'object' then
    raise exception 'Product translations must be an object'
      using errcode = '22023';
  end if;

  if exists (
    select 1
    from jsonb_object_keys(p_translations) as translation_key(locale)
    where not (translation_key.locale = any (array['pl', 'de', 'en', 'cs']))
  ) then
    raise exception 'Unsupported product translation locale'
      using errcode = '22023';
  end if;

  foreach v_locale in array array['pl', 'de', 'en', 'cs']
  loop
    v_translation := p_translations -> v_locale;

    if v_translation is null
       or jsonb_typeof(v_translation) <> 'object'
       or nullif(btrim(v_translation ->> 'name'), '') is null then
      raise exception 'Missing product name for locale %', v_locale
        using errcode = '22023';
    end if;

    if length(btrim(v_translation ->> 'name')) > 200 then
      raise exception 'Product name is too long for locale %', v_locale
        using errcode = '22023';
    end if;

    if v_translation ? 'description'
       and length(coalesce(v_translation ->> 'description', '')) > 2000 then
      raise exception 'Product description is too long for locale %', v_locale
        using errcode = '22023';
    end if;
  end loop;

  if p_id is null then
    v_id := gen_random_uuid();
    v_legacy_key := 'menu:' || v_id::text;

    insert into public.menu_products (
      id,
      category_id,
      slug,
      legacy_key,
      image_url,
      regular_price,
      promo_price,
      promo_starts_at,
      promo_ends_at,
      badge,
      is_new,
      new_until,
      is_active,
      is_available,
      sort_order,
      ice_cream_flavour_id,
      product_type,
      visibility,
      is_orderable,
      available_starts_at,
      available_ends_at,
      required_reward_id
    )
    values (
      v_id,
      p_category_id,
      p_slug,
      v_legacy_key,
      nullif(btrim(p_image_url), ''),
      p_regular_price,
      p_promo_price,
      p_promo_starts_at,
      p_promo_ends_at,
      nullif(btrim(p_badge), ''),
      p_is_new,
      p_new_until,
      p_is_active,
      p_is_available,
      p_sort_order,
      null,
      'standard',
      p_visibility,
      p_is_orderable,
      p_available_starts_at,
      p_available_ends_at,
      p_required_reward_id
    );
  else
    v_id := p_id;

    select product.legacy_key,
           product.product_type,
           product.ice_cream_flavour_id
    into v_legacy_key,
         v_product_type,
         v_ice_cream_flavour_id
    from public.menu_products as product
    where product.id = v_id
    for update;

    if not found then
      raise exception 'Product not found'
        using errcode = 'P0002';
    end if;

    if v_product_type <> 'standard'
       or v_ice_cream_flavour_id is not null then
      raise exception 'Ice cream and non-standard products are not editable here'
        using errcode = '42501';
    end if;

    update public.menu_products
    set category_id = p_category_id,
        slug = p_slug,
        image_url = nullif(btrim(p_image_url), ''),
        regular_price = p_regular_price,
        promo_price = p_promo_price,
        promo_starts_at = p_promo_starts_at,
        promo_ends_at = p_promo_ends_at,
        badge = nullif(btrim(p_badge), ''),
        is_new = p_is_new,
        new_until = p_new_until,
        is_active = p_is_active,
        is_available = p_is_available,
        sort_order = p_sort_order,
        visibility = p_visibility,
        is_orderable = p_is_orderable,
        available_starts_at = p_available_starts_at,
        available_ends_at = p_available_ends_at,
        required_reward_id = p_required_reward_id,
        updated_at = now()
    where id = v_id;
  end if;

  foreach v_locale in array array['pl', 'de', 'en', 'cs']
  loop
    v_translation := p_translations -> v_locale;

    insert into public.menu_product_translations (
      product_id,
      locale,
      name,
      description
    )
    values (
      v_id,
      v_locale,
      btrim(v_translation ->> 'name'),
      nullif(btrim(v_translation ->> 'description'), '')
    )
    on conflict (product_id, locale)
    do update
      set name = excluded.name,
          description = excluded.description;
  end loop;

  return v_id;
end;
$function$;

revoke execute on function public.staff_get_menu_catalog()
  from public, anon;

revoke execute on function public.staff_save_menu_category(
  uuid,
  text,
  text,
  text,
  integer,
  boolean,
  text,
  timestamp with time zone,
  timestamp with time zone,
  uuid,
  jsonb
) from public, anon;

revoke execute on function public.staff_save_menu_product(
  uuid,
  uuid,
  text,
  text,
  numeric,
  numeric,
  timestamp with time zone,
  timestamp with time zone,
  text,
  boolean,
  timestamp with time zone,
  boolean,
  boolean,
  integer,
  text,
  boolean,
  timestamp with time zone,
  timestamp with time zone,
  uuid,
  jsonb
) from public, anon;

grant execute on function public.staff_get_menu_catalog()
  to authenticated;

grant execute on function public.staff_save_menu_category(
  uuid,
  text,
  text,
  text,
  integer,
  boolean,
  text,
  timestamp with time zone,
  timestamp with time zone,
  uuid,
  jsonb
) to authenticated;

grant execute on function public.staff_save_menu_product(
  uuid,
  uuid,
  text,
  text,
  numeric,
  numeric,
  timestamp with time zone,
  timestamp with time zone,
  text,
  boolean,
  timestamp with time zone,
  boolean,
  boolean,
  integer,
  text,
  boolean,
  timestamp with time zone,
  timestamp with time zone,
  uuid,
  jsonb
) to authenticated;

revoke insert, update, delete
  on public.menu_categories,
     public.menu_category_translations,
     public.menu_products,
     public.menu_product_translations
  from authenticated;
