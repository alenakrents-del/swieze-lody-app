create or replace function public.get_collection_catalog()
returns table (
  collection_id uuid,
  collection_code text,
  collection_name text,
  collection_icon text,
  collection_sort_order integer,
  item_id uuid,
  item_code text,
  item_name text,
  item_icon text,
  item_sort_order integer
)
language sql
stable
security definer
set search_path = ''
as $$
  select
    collection.id,
    collection.code,
    collection.name,
    collection.icon,
    collection.sort_order,
    item.id,
    item.code,
    item.name,
    item.icon,
    item.sort_order
  from public.collections collection
  join public.collection_items item
    on item.collection_id = collection.id
  where collection.active = true
    and item.active = true
  order by collection.sort_order, item.sort_order;
$$;

revoke execute on function public.get_collection_catalog() from public;
grant execute on function public.get_collection_catalog() to anon, authenticated;

create or replace function public.get_my_rewards()
returns table (
  collection_reward_id uuid,
  collection_code text,
  reward_code text,
  reward_name text,
  reward_description text,
  unlock_count integer,
  secret boolean,
  status text,
  earned_at timestamp with time zone,
  redeemed_at timestamp with time zone,
  expires_at timestamp with time zone
)
language sql
stable
security definer
set search_path = ''
as $$
  select
    reward.id,
    collection.code,
    reward.reward_code,
    reward.reward_name,
    reward.reward_description,
    reward.unlock_count,
    reward.secret,
    customer_reward.status,
    customer_reward.earned_at,
    customer_reward.redeemed_at,
    customer_reward.expires_at
  from public.customer_rewards customer_reward
  join public.customers customer
    on customer.id = customer_reward.customer_id
  join public.collection_rewards reward
    on reward.id = customer_reward.collection_reward_id
  join public.collections collection
    on collection.id = reward.collection_id
  where auth.uid() is not null
    and customer.auth_user_id = auth.uid()
    and reward.active = true
  order by customer_reward.earned_at desc;
$$;

revoke execute on function public.get_my_rewards() from public;
grant execute on function public.get_my_rewards() to authenticated;
