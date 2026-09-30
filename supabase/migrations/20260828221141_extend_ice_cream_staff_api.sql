drop function if exists public.staff_list_ice_cream_flavours();
drop function if exists public.get_today_ice_cream_flavours();

create function public.staff_list_ice_cream_flavours()
returns table (
  id uuid,
  name text,
  price numeric,
  image_url text,
  available_today boolean,
  archived boolean,
  sort_order integer,
  base_label text,
  description text,
  badge text,
  graphic_type text
)
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_staff() then
    raise exception 'not_staff';
  end if;
  return query
  select f.id, f.name, f.price, f.image_url, f.available_today, f.archived,
         f.sort_order, f.base_label, f.description, f.badge, f.graphic_type
  from public.ice_cream_flavours f
  order by f.archived asc, f.available_today desc, f.sort_order asc, f.name asc;
end;
$$;

create or replace function public.staff_save_ice_cream_flavour_v2(
  p_id uuid default null,
  p_name text default null,
  p_price numeric default 10,
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
declare v_id uuid;
begin
  if not public.is_staff() then raise exception 'not_staff'; end if;
  if nullif(btrim(p_name), '') is null then raise exception 'name_required'; end if;
  if coalesce(p_price,0) < 0 then raise exception 'invalid_price'; end if;

  if p_id is null then
    insert into public.ice_cream_flavours
      (name,price,image_url,available_today,archived,sort_order,base_label,description,badge,graphic_type,updated_at)
    values
      (btrim(p_name),coalesce(p_price,10),nullif(btrim(p_image_url),''),coalesce(p_available_today,false),false,coalesce(p_sort_order,100),nullif(btrim(p_base_label),''),nullif(btrim(p_description),''),nullif(btrim(p_badge),''),coalesce(nullif(btrim(p_graphic_type),''),'app'),now())
    returning id into v_id;
  else
    update public.ice_cream_flavours f
       set name=btrim(p_name), price=coalesce(p_price,f.price), image_url=nullif(btrim(p_image_url),''),
           available_today=coalesce(p_available_today,f.available_today), sort_order=coalesce(p_sort_order,f.sort_order),
           base_label=nullif(btrim(p_base_label),''), description=nullif(btrim(p_description),''),
           badge=nullif(btrim(p_badge),''), graphic_type=coalesce(nullif(btrim(p_graphic_type),''),f.graphic_type,'app'), updated_at=now()
     where f.id=p_id returning f.id into v_id;
    if v_id is null then raise exception 'flavour_not_found'; end if;
  end if;
  return v_id;
end;
$$;

create function public.get_today_ice_cream_flavours()
returns table (
  id uuid,
  name text,
  price numeric,
  image_url text,
  sort_order integer,
  base_label text,
  description text,
  badge text,
  graphic_type text
)
language sql
security definer
set search_path = public
as $$
  select f.id,f.name,f.price,f.image_url,f.sort_order,f.base_label,f.description,f.badge,f.graphic_type
  from public.ice_cream_flavours f
  where f.available_today=true and f.archived=false
  order by f.sort_order asc,f.name asc;
$$;

revoke all on function public.staff_list_ice_cream_flavours() from public, anon;
revoke all on function public.staff_save_ice_cream_flavour_v2(uuid,text,numeric,text,boolean,integer,text,text,text,text) from public, anon;
grant execute on function public.staff_list_ice_cream_flavours() to authenticated;
grant execute on function public.staff_save_ice_cream_flavour_v2(uuid,text,numeric,text,boolean,integer,text,text,text,text) to authenticated;
grant execute on function public.get_today_ice_cream_flavours() to anon, authenticated;
