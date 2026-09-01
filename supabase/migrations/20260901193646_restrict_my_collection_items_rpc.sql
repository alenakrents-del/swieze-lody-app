revoke execute on function public.get_my_collection_items()
from public, anon;

grant execute on function public.get_my_collection_items()
to authenticated;
