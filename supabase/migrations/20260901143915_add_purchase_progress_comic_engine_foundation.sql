create schema if not exists private;

revoke all on schema private from public;
revoke all on schema private from anon, authenticated;

create table public.comic_seasons (
  id bigint generated always as identity primary key,
  code text not null unique,
  status text not null default 'draft',
  target_amount numeric(12,2) not null,
  starts_at timestamp with time zone not null default now(),
  ends_at timestamp with time zone,
  sort_order integer not null default 0,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  constraint comic_seasons_code_check
    check (code ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint comic_seasons_status_check
    check (status in ('draft', 'active', 'archived')),
  constraint comic_seasons_target_amount_check
    check (target_amount > 0),
  constraint comic_seasons_window_check
    check (ends_at is null or starts_at < ends_at)
);

create unique index comic_seasons_one_active_idx
  on public.comic_seasons ((status))
  where status = 'active';

create table public.comic_season_translations (
  season_id bigint not null
    references public.comic_seasons(id) on delete cascade,
  locale text not null
    references public.app_locales(code) on delete restrict,
  title text not null,
  summary text,
  primary key (season_id, locale),
  constraint comic_season_translations_title_check
    check (btrim(title) <> '')
);

create index comic_season_translations_locale_idx
  on public.comic_season_translations(locale);

create table public.comic_episodes (
  id bigint generated always as identity primary key,
  season_id bigint not null
    references public.comic_seasons(id) on delete cascade,
  code text not null,
  unlock_at_amount numeric(12,2) not null,
  sort_order integer not null default 0,
  is_final boolean not null default false,
  is_active boolean not null default true,
  cover_artwork_key text,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  unique (season_id, code),
  unique (season_id, sort_order),
  constraint comic_episodes_code_check
    check (code ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint comic_episodes_unlock_amount_check
    check (unlock_at_amount >= 0),
  constraint comic_episodes_cover_artwork_key_check
    check (
      cover_artwork_key is null
      or btrim(cover_artwork_key) <> ''
    )
);

create unique index comic_episodes_one_final_per_season_idx
  on public.comic_episodes(season_id)
  where is_final = true;

create table public.comic_episode_translations (
  episode_id bigint not null
    references public.comic_episodes(id) on delete cascade,
  locale text not null
    references public.app_locales(code) on delete restrict,
  title text not null,
  summary text,
  primary key (episode_id, locale),
  constraint comic_episode_translations_title_check
    check (btrim(title) <> '')
);

create index comic_episode_translations_locale_idx
  on public.comic_episode_translations(locale);

create table public.comic_scenes (
  id bigint generated always as identity primary key,
  episode_id bigint not null
    references public.comic_episodes(id) on delete cascade,
  code text not null,
  sort_order integer not null default 0,
  artwork_key text,
  is_active boolean not null default true,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  unique (episode_id, code),
  unique (episode_id, sort_order),
  constraint comic_scenes_code_check
    check (code ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint comic_scenes_artwork_key_check
    check (artwork_key is null or btrim(artwork_key) <> '')
);

create table public.comic_scene_translations (
  scene_id bigint not null
    references public.comic_scenes(id) on delete cascade,
  locale text not null
    references public.app_locales(code) on delete restrict,
  title text,
  body text,
  primary key (scene_id, locale),
  constraint comic_scene_translations_content_check
    check (
      nullif(btrim(coalesce(title, '')), '') is not null
      or nullif(btrim(coalesce(body, '')), '') is not null
    )
);

create index comic_scene_translations_locale_idx
  on public.comic_scene_translations(locale);

create table public.comic_order_credits (
  id bigint generated always as identity primary key,
  season_id bigint not null
    references public.comic_seasons(id) on delete restrict,
  order_id bigint not null
    references public.orders(id) on delete restrict,
  customer_id uuid not null
    references public.customers(id) on delete cascade,
  credited_amount numeric(12,2) not null,
  credited_at timestamp with time zone not null default now(),
  revoked_at timestamp with time zone,
  revocation_reason text,
  unique (season_id, order_id),
  constraint comic_order_credits_amount_check
    check (credited_amount > 0),
  constraint comic_order_credits_revocation_check
    check (
      (revoked_at is null and revocation_reason is null)
      or (
        revoked_at is not null
        and nullif(btrim(coalesce(revocation_reason, '')), '') is not null
      )
    )
);

create index comic_order_credits_customer_season_active_idx
  on public.comic_order_credits(customer_id, season_id)
  where revoked_at is null;

create index comic_order_credits_order_idx
  on public.comic_order_credits(order_id);

create table public.comic_customer_seasons (
  customer_id uuid not null
    references public.customers(id) on delete cascade,
  season_id bigint not null
    references public.comic_seasons(id) on delete restrict,
  credited_amount numeric(12,2) not null default 0,
  first_completed_at timestamp with time zone,
  updated_at timestamp with time zone not null default now(),
  primary key (customer_id, season_id),
  constraint comic_customer_seasons_amount_check
    check (credited_amount >= 0)
);

create index comic_customer_seasons_season_idx
  on public.comic_customer_seasons(season_id, customer_id);

create table public.comic_collectibles (
  id bigint generated always as identity primary key,
  season_id bigint not null
    references public.comic_seasons(id) on delete cascade,
  episode_id bigint not null
    references public.comic_episodes(id) on delete cascade,
  code text not null,
  artwork_key text,
  is_active boolean not null default true,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  unique (season_id, code),
  unique (episode_id),
  constraint comic_collectibles_code_check
    check (code ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  constraint comic_collectibles_artwork_key_check
    check (artwork_key is null or btrim(artwork_key) <> '')
);

create index comic_collectibles_season_idx
  on public.comic_collectibles(season_id);

create table public.comic_collectible_translations (
  collectible_id bigint not null
    references public.comic_collectibles(id) on delete cascade,
  locale text not null
    references public.app_locales(code) on delete restrict,
  name text not null,
  description text,
  primary key (collectible_id, locale),
  constraint comic_collectible_translations_name_check
    check (btrim(name) <> '')
);

create index comic_collectible_translations_locale_idx
  on public.comic_collectible_translations(locale);

create table public.comic_customer_collectibles (
  customer_id uuid not null
    references public.customers(id) on delete cascade,
  collectible_id bigint not null
    references public.comic_collectibles(id) on delete cascade,
  source_credit_id bigint
    references public.comic_order_credits(id) on delete set null,
  earned_at timestamp with time zone not null default now(),
  revoked_at timestamp with time zone,
  primary key (customer_id, collectible_id)
);

create index comic_customer_collectibles_collectible_idx
  on public.comic_customer_collectibles(collectible_id, customer_id);

create index comic_customer_collectibles_source_credit_idx
  on public.comic_customer_collectibles(source_credit_id)
  where source_credit_id is not null;

alter table public.comic_seasons enable row level security;
alter table public.comic_season_translations enable row level security;
alter table public.comic_episodes enable row level security;
alter table public.comic_episode_translations enable row level security;
alter table public.comic_scenes enable row level security;
alter table public.comic_scene_translations enable row level security;
alter table public.comic_order_credits enable row level security;
alter table public.comic_customer_seasons enable row level security;
alter table public.comic_collectibles enable row level security;
alter table public.comic_collectible_translations enable row level security;
alter table public.comic_customer_collectibles enable row level security;

revoke all on table
  public.comic_seasons,
  public.comic_season_translations,
  public.comic_episodes,
  public.comic_episode_translations,
  public.comic_scenes,
  public.comic_scene_translations,
  public.comic_order_credits,
  public.comic_customer_seasons,
  public.comic_collectibles,
  public.comic_collectible_translations,
  public.comic_customer_collectibles
from public, anon, authenticated;

revoke all on sequence
  public.comic_seasons_id_seq,
  public.comic_episodes_id_seq,
  public.comic_scenes_id_seq,
  public.comic_order_credits_id_seq,
  public.comic_collectibles_id_seq
from public, anon, authenticated;

create or replace function private.validate_comic_episode_threshold()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_target numeric(12,2);
begin
  select season.target_amount
    into v_target
  from public.comic_seasons as season
  where season.id = new.season_id;

  if new.unlock_at_amount > v_target then
    raise exception 'Episode threshold exceeds season target';
  end if;

  if new.is_final and new.unlock_at_amount <> v_target then
    raise exception 'Final episode threshold must equal season target';
  end if;

  return new;
end;
$$;

revoke execute on function private.validate_comic_episode_threshold()
from public, anon, authenticated;

create trigger comic_episodes_validate_threshold
before insert or update of season_id, unlock_at_amount, is_final
on public.comic_episodes
for each row
execute function private.validate_comic_episode_threshold();

create or replace function private.validate_comic_season_target()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if exists (
    select 1
    from public.comic_episodes as episode
    where episode.season_id = new.id
      and (
        episode.unlock_at_amount > new.target_amount
        or (
          episode.is_final = true
          and episode.unlock_at_amount <> new.target_amount
        )
      )
  ) then
    raise exception 'Season target conflicts with episode thresholds';
  end if;

  return new;
end;
$$;

revoke execute on function private.validate_comic_season_target()
from public, anon, authenticated;

create trigger comic_seasons_validate_target
before update of target_amount
on public.comic_seasons
for each row
execute function private.validate_comic_season_target();

create or replace function private.refresh_comic_customer_season(
  p_customer_id uuid,
  p_season_id bigint,
  p_delta numeric,
  p_source_credit_id bigint default null
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_target numeric(12,2);
  v_total numeric(12,2);
begin
  select season.target_amount
    into strict v_target
  from public.comic_seasons as season
  where season.id = p_season_id;

  insert into public.comic_customer_seasons (
    customer_id,
    season_id,
    credited_amount,
    first_completed_at,
    updated_at
  )
  values (
    p_customer_id,
    p_season_id,
    greatest(0::numeric, round(p_delta, 2)),
    case
      when greatest(0::numeric, round(p_delta, 2)) >= v_target
        then now()
      else null
    end,
    now()
  )
  on conflict (customer_id, season_id) do update
    set credited_amount = greatest(
          0::numeric,
          public.comic_customer_seasons.credited_amount + round(p_delta, 2)
        ),
        first_completed_at = coalesce(
          public.comic_customer_seasons.first_completed_at,
          case
            when greatest(
              0::numeric,
              public.comic_customer_seasons.credited_amount + round(p_delta, 2)
            ) >= v_target
              then now()
            else null
          end
        ),
        updated_at = now()
  returning credited_amount into v_total;

  insert into public.comic_customer_collectibles (
    customer_id,
    collectible_id,
    source_credit_id,
    earned_at,
    revoked_at
  )
  select
    p_customer_id,
    collectible.id,
    p_source_credit_id,
    now(),
    null
  from public.comic_collectibles as collectible
  join public.comic_episodes as episode
    on episode.id = collectible.episode_id
  where collectible.season_id = p_season_id
    and collectible.is_active = true
    and episode.is_active = true
    and episode.unlock_at_amount <= v_total
  on conflict (customer_id, collectible_id) do update
    set source_credit_id = coalesce(
          excluded.source_credit_id,
          public.comic_customer_collectibles.source_credit_id
        ),
        earned_at = case
          when public.comic_customer_collectibles.revoked_at is not null
            then now()
          else public.comic_customer_collectibles.earned_at
        end,
        revoked_at = null;

  update public.comic_customer_collectibles as owned
  set revoked_at = coalesce(owned.revoked_at, now())
  from public.comic_collectibles as collectible
  join public.comic_episodes as episode
    on episode.id = collectible.episode_id
  where owned.collectible_id = collectible.id
    and owned.customer_id = p_customer_id
    and collectible.season_id = p_season_id
    and episode.unlock_at_amount > v_total
    and owned.revoked_at is null;
end;
$$;

revoke execute on function private.refresh_comic_customer_season(
  uuid,
  bigint,
  numeric,
  bigint
) from public, anon, authenticated;

create or replace function private.credit_comic_order(p_order_id bigint)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_customer_id uuid;
  v_amount numeric(12,2);
  v_season_id bigint;
  v_credit_id bigint;
begin
  select
    order_row.customer_id,
    round(order_row.total, 2)
  into v_customer_id, v_amount
  from public.orders as order_row
  where order_row.id = p_order_id
    and order_row.status = 'collected'
    and order_row.customer_id is not null
    and order_row.total > 0
  for update;

  if v_customer_id is null or v_amount is null then
    return;
  end if;

  select season.id
    into v_season_id
  from public.comic_seasons as season
  where season.status = 'active'
    and season.starts_at <= now()
    and (season.ends_at is null or now() < season.ends_at)
  order by season.id
  limit 1;

  if v_season_id is null then
    return;
  end if;

  insert into public.comic_order_credits (
    season_id,
    order_id,
    customer_id,
    credited_amount
  )
  values (
    v_season_id,
    p_order_id,
    v_customer_id,
    v_amount
  )
  on conflict (season_id, order_id) do nothing
  returning id into v_credit_id;

  if v_credit_id is null then
    return;
  end if;

  perform private.refresh_comic_customer_season(
    v_customer_id,
    v_season_id,
    v_amount,
    v_credit_id
  );
end;
$$;

revoke execute on function private.credit_comic_order(bigint)
from public, anon, authenticated;

create or replace function private.revoke_comic_order(
  p_order_id bigint,
  p_reason text
)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_credit record;
begin
  for v_credit in
    update public.comic_order_credits as credit
    set revoked_at = now(),
        revocation_reason = left(
          coalesce(nullif(btrim(p_reason), ''), 'status_changed'),
          80
        )
    where credit.order_id = p_order_id
      and credit.revoked_at is null
    returning
      credit.id,
      credit.customer_id,
      credit.season_id,
      credit.credited_amount
  loop
    perform private.refresh_comic_customer_season(
      v_credit.customer_id,
      v_credit.season_id,
      -v_credit.credited_amount,
      null
    );
  end loop;
end;
$$;

revoke execute on function private.revoke_comic_order(bigint, text)
from public, anon, authenticated;

create or replace function private.handle_comic_order_status_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  if new.status = 'collected'
     and old.status is distinct from new.status then
    perform private.credit_comic_order(new.id);
  elsif old.status = 'collected'
        and new.status is distinct from old.status then
    perform private.revoke_comic_order(new.id, new.status);
  end if;

  return new;
end;
$$;

revoke execute on function private.handle_comic_order_status_change()
from public, anon, authenticated;

create trigger orders_apply_comic_progress
after update of status
on public.orders
for each row
when (old.status is distinct from new.status)
execute function private.handle_comic_order_status_change();

create or replace function private.comic_catalog_json(
  p_locale text,
  p_customer_id uuid default null
)
returns jsonb
language sql
stable
security definer
set search_path = ''
as $$
  select jsonb_build_object(
    'locale', p_locale,
    'seasons', coalesce(
      jsonb_agg(
        jsonb_build_object(
          'id', season.id,
          'code', season.code,
          'status', season.status,
          'title', coalesce(localized.title, polish.title, season.code),
          'summary', coalesce(localized.summary, polish.summary),
          'target_amount', season.target_amount,
          'credited_amount', coalesce(progress.credited_amount, 0),
          'progress_percent', least(
            100::numeric,
            round(
              coalesce(progress.credited_amount, 0)
              * 100
              / season.target_amount,
              2
            )
          ),
          'is_completed',
            coalesce(progress.credited_amount, 0) >= season.target_amount,
          'first_completed_at', progress.first_completed_at,
          'episodes', coalesce(
            (
              select jsonb_agg(
                jsonb_build_object(
                  'id', episode.id,
                  'code', episode.code,
                  'title', coalesce(
                    episode_localized.title,
                    episode_polish.title,
                    episode.code
                  ),
                  'summary', coalesce(
                    episode_localized.summary,
                    episode_polish.summary
                  ),
                  'unlock_at_amount', episode.unlock_at_amount,
                  'is_final', episode.is_final,
                  'is_unlocked',
                    coalesce(progress.credited_amount, 0)
                      >= episode.unlock_at_amount,
                  'cover_artwork_key', episode.cover_artwork_key,
                  'scenes', case
                    when coalesce(progress.credited_amount, 0)
                           >= episode.unlock_at_amount
                      then coalesce(
                        (
                          select jsonb_agg(
                            jsonb_build_object(
                              'id', scene.id,
                              'code', scene.code,
                              'title', coalesce(
                                scene_localized.title,
                                scene_polish.title
                              ),
                              'body', coalesce(
                                scene_localized.body,
                                scene_polish.body
                              ),
                              'artwork_key', scene.artwork_key
                            )
                            order by scene.sort_order, scene.id
                          )
                          from public.comic_scenes as scene
                          left join public.comic_scene_translations
                            as scene_localized
                            on scene_localized.scene_id = scene.id
                           and scene_localized.locale = p_locale
                          left join public.comic_scene_translations
                            as scene_polish
                            on scene_polish.scene_id = scene.id
                           and scene_polish.locale = 'pl'
                          where scene.episode_id = episode.id
                            and scene.is_active = true
                        ),
                        '[]'::jsonb
                      )
                    else '[]'::jsonb
                  end
                )
                order by episode.sort_order, episode.id
              )
              from public.comic_episodes as episode
              left join public.comic_episode_translations
                as episode_localized
                on episode_localized.episode_id = episode.id
               and episode_localized.locale = p_locale
              left join public.comic_episode_translations
                as episode_polish
                on episode_polish.episode_id = episode.id
               and episode_polish.locale = 'pl'
              where episode.season_id = season.id
                and episode.is_active = true
            ),
            '[]'::jsonb
          ),
          'collectibles', coalesce(
            (
              select jsonb_agg(
                jsonb_build_object(
                  'id', collectible.id,
                  'code', collectible.code,
                  'name', coalesce(
                    collectible_localized.name,
                    collectible_polish.name,
                    collectible.code
                  ),
                  'description', coalesce(
                    collectible_localized.description,
                    collectible_polish.description
                  ),
                  'artwork_key', collectible.artwork_key,
                  'earned_at', owned.earned_at
                )
                order by collectible.id
              )
              from public.comic_customer_collectibles as owned
              join public.comic_collectibles as collectible
                on collectible.id = owned.collectible_id
              left join public.comic_collectible_translations
                as collectible_localized
                on collectible_localized.collectible_id = collectible.id
               and collectible_localized.locale = p_locale
              left join public.comic_collectible_translations
                as collectible_polish
                on collectible_polish.collectible_id = collectible.id
               and collectible_polish.locale = 'pl'
              where owned.customer_id = p_customer_id
                and collectible.season_id = season.id
                and collectible.is_active = true
                and owned.revoked_at is null
            ),
            '[]'::jsonb
          )
        )
        order by season.sort_order, season.id
      ) filter (where season.id is not null),
      '[]'::jsonb
    )
  )
  from public.comic_seasons as season
  left join public.comic_season_translations as localized
    on localized.season_id = season.id
   and localized.locale = p_locale
  left join public.comic_season_translations as polish
    on polish.season_id = season.id
   and polish.locale = 'pl'
  left join public.comic_customer_seasons as progress
    on progress.season_id = season.id
   and progress.customer_id = p_customer_id
  where season.status = 'active'
     or (
       p_customer_id is not null
       and progress.customer_id is not null
     );
$$;

revoke execute on function private.comic_catalog_json(text, uuid)
from public, anon, authenticated;

create or replace function public.get_public_comic_catalog(
  p_locale text default 'pl'
)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_locale text := lower(coalesce(p_locale, 'pl'));
begin
  if v_locale not in ('pl', 'de', 'en', 'cs') then
    v_locale := 'pl';
  end if;

  return private.comic_catalog_json(v_locale, null);
end;
$$;

revoke execute on function public.get_public_comic_catalog(text) from public;
grant execute on function public.get_public_comic_catalog(text)
to anon, authenticated;

create or replace function public.get_my_comic_progress(
  p_locale text default 'pl'
)
returns jsonb
language plpgsql
stable
security definer
set search_path = ''
as $$
declare
  v_locale text := lower(coalesce(p_locale, 'pl'));
  v_customer_id uuid;
begin
  if auth.uid() is null then
    raise exception 'not authenticated'
      using errcode = '42501';
  end if;

  if v_locale not in ('pl', 'de', 'en', 'cs') then
    v_locale := 'pl';
  end if;

  select customer.id
    into v_customer_id
  from public.customers as customer
  where customer.auth_user_id = auth.uid()
  limit 1;

  return private.comic_catalog_json(v_locale, v_customer_id);
end;
$$;

revoke execute on function public.get_my_comic_progress(text) from public;
grant execute on function public.get_my_comic_progress(text)
to authenticated;

alter table public.orders
  drop constraint orders_status_check;

alter table public.orders
  add constraint orders_status_check
  check (
    status in (
      'new',
      'accepted',
      'preparing',
      'ready',
      'collected',
      'cancelled',
      'returned',
      'refunded'
    )
  );

create or replace function public.staff_update_order(
  p_order_id bigint,
  p_status text default null,
  p_estimated_minutes integer default null
)
returns table (
  id bigint,
  order_number bigint,
  status text,
  estimated_minutes integer,
  ready_at timestamp with time zone,
  updated_at timestamp with time zone
)
language plpgsql
security definer
set search_path = ''
as $$
begin
  if not public.is_staff() then
    raise exception 'not authorized';
  end if;

  if p_status is not null
     and p_status not in (
       'new',
       'accepted',
       'preparing',
       'ready',
       'collected',
       'cancelled',
       'returned',
       'refunded'
     ) then
    raise exception 'invalid status';
  end if;

  if p_estimated_minutes is not null
     and (p_estimated_minutes < 0 or p_estimated_minutes > 180) then
    raise exception 'invalid estimated time';
  end if;

  update public.orders as order_row
  set status = coalesce(p_status, order_row.status),
      estimated_minutes = coalesce(
        p_estimated_minutes,
        order_row.estimated_minutes
      ),
      ready_at = case
        when p_status = 'ready' then now()
        when p_status in (
          'collected',
          'cancelled',
          'returned',
          'refunded'
        ) then order_row.ready_at
        when p_estimated_minutes is not null
          then now() + make_interval(mins => p_estimated_minutes)
        when order_row.ready_at is null
             and coalesce(p_status, order_row.status)
                 in ('new', 'accepted', 'preparing')
          then now() + make_interval(mins => order_row.estimated_minutes)
        else order_row.ready_at
      end,
      updated_at = now()
  where order_row.id = p_order_id;

  if p_status = 'collected' then
    perform public.unlock_items_from_collected_order(p_order_id);
  end if;

  return query
  select
    order_row.id,
    order_row.order_number,
    order_row.status,
    order_row.estimated_minutes,
    order_row.ready_at,
    order_row.updated_at
  from public.orders as order_row
  where order_row.id = p_order_id;
end;
$$;

revoke execute on function public.staff_update_order(bigint, text, integer)
from public, anon;
grant execute on function public.staff_update_order(bigint, text, integer)
to authenticated;

with new_season as (
  insert into public.comic_seasons (
    code,
    status,
    target_amount,
    starts_at,
    sort_order
  )
  values (
    'season-1',
    'active',
    500.00,
    now(),
    10
  )
  returning id
)
insert into public.comic_season_translations (
  season_id,
  locale,
  title,
  summary
)
select
  new_season.id,
  translation.locale,
  translation.title,
  null
from new_season
cross join (
  values
    ('pl', 'Sezon 1'),
    ('de', 'Saison 1'),
    ('en', 'Season 1'),
    ('cs', 'Sezóna 1')
) as translation(locale, title);
