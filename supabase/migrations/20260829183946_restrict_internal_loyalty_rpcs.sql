revoke execute on function public.unlock_collection_item(uuid,text,text,uuid,bigint) from public, anon, authenticated;
revoke execute on function public.unlock_items_from_collected_order(bigint) from public, anon, authenticated;

-- Staff list is intentionally callable only after sign-in; its body still verifies public.is_staff().
revoke execute on function public.staff_list_orders() from public, anon;
grant execute on function public.staff_list_orders() to authenticated;

-- is_staff() is only useful for signed-in sessions.
revoke execute on function public.is_staff() from public, anon;
grant execute on function public.is_staff() to authenticated;
