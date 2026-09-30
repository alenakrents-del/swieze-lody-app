create or replace function public.ensure_my_customer_profile(p_name text, p_phone text)
returns public.customers
language plpgsql
security definer
set search_path = public
as $$
declare
  v_uid uuid := auth.uid();
  v_name text := trim(coalesce(p_name, ''));
  v_phone text := regexp_replace(coalesce(p_phone, ''), '[^0-9+]', '', 'g');
  v_customer public.customers;
begin
  if v_uid is null then
    raise exception 'Not authenticated';
  end if;

  if length(v_name) < 2 then
    raise exception 'Name is too short';
  end if;

  if v_phone !~ '^\+[1-9][0-9]{7,14}$' then
    raise exception 'Phone must be in international format';
  end if;

  select * into v_customer
  from public.customers
  where auth_user_id = v_uid;

  if found then
    update public.customers
      set name = v_name,
          phone = v_phone,
          updated_at = now()
      where id = v_customer.id
      returning * into v_customer;
    return v_customer;
  end if;

  if exists (
    select 1 from public.customers
    where phone = v_phone
      and auth_user_id is distinct from v_uid
  ) then
    raise exception 'Phone already in use';
  end if;

  insert into public.customers (auth_user_id, name, phone)
  values (v_uid, v_name, v_phone)
  returning * into v_customer;

  return v_customer;
end;
$$;

revoke all on function public.ensure_my_customer_profile(text,text) from public;
grant execute on function public.ensure_my_customer_profile(text,text) to authenticated;
