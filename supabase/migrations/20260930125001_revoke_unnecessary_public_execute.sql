
    revoke execute on function public.create_pickup_order(jsonb, text) from public;
    revoke execute on function public.get_today_ice_cream_flavours() from public;

    grant execute on function public.create_pickup_order(jsonb, text) to anon, authenticated;
    grant execute on function public.get_today_ice_cream_flavours() to anon, authenticated;
