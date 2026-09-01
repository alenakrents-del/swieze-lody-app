create table public.in_app_announcements (
  id uuid primary key default gen_random_uuid(),
  kind text not null,
  product_id uuid null references public.menu_products(id) on delete cascade,
  show_to_customers boolean not null default false,
  starts_at timestamp with time zone null,
  ends_at timestamp with time zone null,
  sort_order integer not null default 0,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  constraint in_app_announcements_kind_check
    check (kind = any (array['general'::text, 'new_product'::text, 'promotion'::text])),
  constraint in_app_announcements_dates_check
    check (starts_at is null or ends_at is null or ends_at > starts_at),
  constraint in_app_announcements_product_check
    check (kind = 'general' or product_id is not null)
);

create table public.in_app_announcement_translations (
  announcement_id uuid not null
    references public.in_app_announcements(id) on delete cascade,
  locale text not null
    references public.app_locales(code) on update cascade on delete restrict,
  title text not null,
  body text null,
  primary key (announcement_id, locale)
);

create index in_app_announcements_product_id_idx
  on public.in_app_announcements(product_id)
  where product_id is not null;

create index in_app_announcements_public_schedule_idx
  on public.in_app_announcements(sort_order, starts_at, ends_at)
  where show_to_customers = true;

alter table public.in_app_announcements enable row level security;
alter table public.in_app_announcement_translations enable row level security;

revoke all on table public.in_app_announcements
  from public, anon, authenticated;
revoke all on table public.in_app_announcement_translations
  from public, anon, authenticated;

create or replace function public.get_public_in_app_announcements(
  p_locale text default 'pl'
)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $function$
  with request_context as (
    select
      now() as current_time,
      case
        when lower(coalesce(nullif(btrim(p_locale), ''), 'pl'))
          = any (array['pl', 'de', 'en', 'cs'])
        then lower(coalesce(nullif(btrim(p_locale), ''), 'pl'))
        else 'pl'
      end as locale
  ),
  visible as (
    select announcement.*
    from public.in_app_announcements as announcement
    cross join request_context as context
    left join public.menu_products as product
      on product.id = announcement.product_id
    left join public.menu_categories as category
      on category.id = product.category_id
    where announcement.show_to_customers = true
      and (
        announcement.starts_at is null
        or announcement.starts_at <= context.current_time
      )
      and (
        announcement.ends_at is null
        or context.current_time < announcement.ends_at
      )
      and (
        announcement.product_id is null
        or (
          product.id is not null
          and product.product_type = 'standard'
          and product.ice_cream_flavour_id is null
          and product.visibility = 'public'
          and product.required_reward_id is null
          and product.is_active = true
          and product.is_available = true
          and product.is_orderable = true
          and (
            product.available_starts_at is null
            or product.available_starts_at <= context.current_time
          )
          and (
            product.available_ends_at is null
            or context.current_time < product.available_ends_at
          )
          and category.id is not null
          and category.visibility = 'public'
          and category.required_reward_id is null
          and category.is_active = true
          and (
            category.available_starts_at is null
            or category.available_starts_at <= context.current_time
          )
          and (
            category.available_ends_at is null
            or context.current_time < category.available_ends_at
          )
        )
      )
      and (
        announcement.kind = 'general'
        or (
          announcement.kind = 'new_product'
          and product.is_new = true
          and (
            product.new_until is null
            or context.current_time < product.new_until
          )
        )
        or (
          announcement.kind = 'promotion'
          and product.promo_price is not null
          and (
            product.promo_starts_at is null
            or product.promo_starts_at <= context.current_time
          )
          and (
            product.promo_ends_at is null
            or context.current_time < product.promo_ends_at
          )
        )
      )
  ),
  localized as (
    select
      announcement.id,
      announcement.kind,
      announcement.product_id,
      announcement.starts_at,
      announcement.ends_at,
      announcement.sort_order,
      coalesce(
        nullif(btrim(requested.title), ''),
        nullif(btrim(polish.title), '')
      ) as title,
      coalesce(
        nullif(btrim(requested.body), ''),
        nullif(btrim(polish.body), '')
      ) as body
    from visible as announcement
    cross join request_context as context
    left join public.in_app_announcement_translations as requested
      on requested.announcement_id = announcement.id
     and requested.locale = context.locale
    left join public.in_app_announcement_translations as polish
      on polish.announcement_id = announcement.id
     and polish.locale = 'pl'
    where coalesce(
      nullif(btrim(requested.title), ''),
      nullif(btrim(polish.title), '')
    ) is not null
  )
  select coalesce(
    jsonb_agg(
      jsonb_build_object(
        'id', localized.id,
        'kind', localized.kind,
        'product_id', localized.product_id,
        'starts_at', localized.starts_at,
        'ends_at', localized.ends_at,
        'sort_order', localized.sort_order,
        'title', localized.title,
        'body', localized.body
      )
      order by localized.sort_order, localized.id
    ),
    '[]'::jsonb
  )
  from localized;
$function$;

create or replace function public.staff_save_in_app_announcement(
  p_id uuid,
  p_kind text,
  p_product_id uuid,
  p_show_to_customers boolean,
  p_starts_at timestamp with time zone,
  p_ends_at timestamp with time zone,
  p_sort_order integer,
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
begin
  if not coalesce(public.is_staff(), false) then
    raise exception 'Staff access required'
      using errcode = '42501';
  end if;

  if p_kind is null
     or p_kind not in ('general', 'new_product', 'promotion') then
    raise exception 'Invalid announcement kind'
      using errcode = '22023';
  end if;

  if p_show_to_customers is null then
    raise exception 'Announcement visibility flag is required'
      using errcode = '22023';
  end if;

  if p_sort_order is null then
    raise exception 'Announcement sort_order is required'
      using errcode = '22023';
  end if;

  if p_starts_at is not null
     and p_ends_at is not null
     and p_ends_at <= p_starts_at then
    raise exception 'Announcement end must be after start'
      using errcode = '22023';
  end if;

  if p_kind <> 'general' and p_product_id is null then
    raise exception 'Product announcement requires a product'
      using errcode = '22023';
  end if;

  if p_product_id is not null
     and not exists (
       select 1
       from public.menu_products as product
       where product.id = p_product_id
         and product.product_type = 'standard'
         and product.ice_cream_flavour_id is null
     ) then
    raise exception 'Standard menu product does not exist'
      using errcode = '23503';
  end if;

  if p_translations is null
     or jsonb_typeof(p_translations) <> 'object' then
    raise exception 'Announcement translations must be an object'
      using errcode = '22023';
  end if;

  if exists (
    select 1
    from jsonb_object_keys(p_translations) as translation_key(locale)
    where not (translation_key.locale = any (array['pl', 'de', 'en', 'cs']))
  ) then
    raise exception 'Unsupported announcement translation locale'
      using errcode = '22023';
  end if;

  foreach v_locale in array array['pl', 'de', 'en', 'cs']
  loop
    v_translation := p_translations -> v_locale;

    if v_translation is null
       or jsonb_typeof(v_translation) <> 'object'
       or nullif(btrim(v_translation ->> 'title'), '') is null then
      raise exception 'Missing announcement title for locale %', v_locale
        using errcode = '22023';
    end if;

    if length(btrim(v_translation ->> 'title')) > 200 then
      raise exception 'Announcement title is too long for locale %', v_locale
        using errcode = '22023';
    end if;

    if v_translation ? 'body'
       and length(coalesce(v_translation ->> 'body', '')) > 2000 then
      raise exception 'Announcement body is too long for locale %', v_locale
        using errcode = '22023';
    end if;
  end loop;

  if p_id is null then
    v_id := gen_random_uuid();

    insert into public.in_app_announcements (
      id,
      kind,
      product_id,
      show_to_customers,
      starts_at,
      ends_at,
      sort_order
    ) values (
      v_id,
      p_kind,
      p_product_id,
      p_show_to_customers,
      p_starts_at,
      p_ends_at,
      p_sort_order
    );
  else
    v_id := p_id;

    if not exists (
      select 1
      from public.in_app_announcements as announcement
      where announcement.id = v_id
    ) then
      raise exception 'Announcement does not exist'
        using errcode = 'P0002';
    end if;

    update public.in_app_announcements
    set kind = p_kind,
        product_id = p_product_id,
        show_to_customers = p_show_to_customers,
        starts_at = p_starts_at,
        ends_at = p_ends_at,
        sort_order = p_sort_order,
        updated_at = now()
    where id = v_id;
  end if;

  foreach v_locale in array array['pl', 'de', 'en', 'cs']
  loop
    v_translation := p_translations -> v_locale;

    insert into public.in_app_announcement_translations (
      announcement_id,
      locale,
      title,
      body
    ) values (
      v_id,
      v_locale,
      btrim(v_translation ->> 'title'),
      nullif(btrim(v_translation ->> 'body'), '')
    )
    on conflict (announcement_id, locale)
    do update
      set title = excluded.title,
          body = excluded.body;
  end loop;

  return v_id;
end;
$function$;

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
    ),
    'announcements',
    coalesce(
      (
        select jsonb_agg(
          jsonb_build_object(
            'id', announcement.id,
            'kind', announcement.kind,
            'product_id', announcement.product_id,
            'show_to_customers', announcement.show_to_customers,
            'starts_at', announcement.starts_at,
            'ends_at', announcement.ends_at,
            'sort_order', announcement.sort_order,
            'created_at', announcement.created_at,
            'updated_at', announcement.updated_at
          )
          order by announcement.sort_order, announcement.id
        )
        from public.in_app_announcements as announcement
      ),
      '[]'::jsonb
    ),
    'announcement_translations',
    coalesce(
      (
        select jsonb_agg(
          jsonb_build_object(
            'announcement_id', translation.announcement_id,
            'locale', translation.locale,
            'title', translation.title,
            'body', translation.body
          )
          order by translation.announcement_id, translation.locale
        )
        from public.in_app_announcement_translations as translation
      ),
      '[]'::jsonb
    )
  );
end;
$function$;

revoke execute on function public.get_public_in_app_announcements(text)
  from public, anon, authenticated;
grant execute on function public.get_public_in_app_announcements(text)
  to anon, authenticated;

revoke execute on function public.staff_save_in_app_announcement(
  uuid,
  text,
  uuid,
  boolean,
  timestamp with time zone,
  timestamp with time zone,
  integer,
  jsonb
) from public, anon, authenticated;
grant execute on function public.staff_save_in_app_announcement(
  uuid,
  text,
  uuid,
  boolean,
  timestamp with time zone,
  timestamp with time zone,
  integer,
  jsonb
) to authenticated;

revoke execute on function public.staff_get_menu_catalog()
  from public, anon, authenticated;
grant execute on function public.staff_get_menu_catalog()
  to authenticated;
