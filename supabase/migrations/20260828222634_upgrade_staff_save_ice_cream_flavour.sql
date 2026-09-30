drop function if exists public.staff_save_ice_cream_flavour(uuid,text,numeric,text,boolean,integer);

create function public.staff_save_ice_cream_flavour(
  p_id uuid default null,
  p_name text default null,
  p_price numeric default null,
  p_image_url text default null,
  p_available_today boolean default false,
  p_sort_order integer default 100,
  p_base_label text default null,
  p_description text default null,
  p_badge text default null,
  p_graphic_type text default 'app'
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id uuid;
  v_name text := nullif(btrim(p_name), '');
begin
  if not public.is_staff() then
    raise exception 'not_staff';
  end if;

  if v_name is null then
    raise exception 'name_required';
  end if;

  if p_price is not null and p_price <= 0 then
    raise exception 'invalid_price';
  end if;

  if p_id is null then
    insert into public.ice_cream_flavours(
      name, price, image_url, available_today, sort_order,
      base_label, description, badge, graphic_type, archived
    ) values (
      v_name,
      p_price,
      nullif(btrim(p_image_url), ''),
      coalesce(p_available_today,false),
      coalesce(p_sort_order,100),
      nullif(btrim(p_base_label), ''),
      nullif(btrim(p_description), ''),
      nullif(btrim(p_badge), ''),
      coalesce(nullif(btrim(p_graphic_type), ''),'app'),
      false
    ) returning id into v_id;
  else
    update public.ice_cream_flavours f
    set name = v_name,
        price = p_price,
        image_url = nullif(btrim(p_image_url), ''),
        available_today = coalesce(p_available_today,false),
        sort_order = coalesce(p_sort_order,100),
        base_label = nullif(btrim(p_base_label), ''),
        description = nullif(btrim(p_description), ''),
        badge = nullif(btrim(p_badge), ''),
        graphic_type = coalesce(nullif(btrim(p_graphic_type), ''),'app'),
        archived = false,
        updated_at = now()
    where f.id = p_id
    returning f.id into v_id;

    if v_id is null then
      raise exception 'flavour_not_found';
    end if;
  end if;

  return v_id;
end;
$$;

revoke all on function public.staff_save_ice_cream_flavour(uuid,text,numeric,text,boolean,integer,text,text,text,text) from public, anon;
grant execute on function public.staff_save_ice_cream_flavour(uuid,text,numeric,text,boolean,integer,text,text,text,text) to authenticated;
