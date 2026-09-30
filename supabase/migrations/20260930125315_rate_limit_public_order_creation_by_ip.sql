
    create table if not exists private.order_rate_limits (
      ip inet not null,
      request_at timestamptz not null default now()
    );

    create index if not exists order_rate_limits_ip_request_at_idx
      on private.order_rate_limits (ip, request_at desc);

    revoke all on table private.order_rate_limits
      from public, anon, authenticated;

    create or replace function public.check_request()
    returns void
    language plpgsql
    security definer
    set search_path to ''
    as $function$
    declare
      req_method text :=
        pg_catalog.current_setting('request.method', true);
      req_path text :=
        pg_catalog.current_setting('request.path', true);
      req_headers json :=
        nullif(
          pg_catalog.current_setting('request.headers', true),
          ''
        )::json;
      req_ip_text text;
      req_ip inet;
      recent_count integer;
    begin
      if req_method is distinct from 'POST'
         or req_path is distinct from 'rpc/create_pickup_order' then
        return;
      end if;

      req_ip_text := pg_catalog.split_part(
        coalesce(
          req_headers->>'x-forwarded-for',
          req_headers->>'cf-connecting-ip',
          req_headers->>'x-real-ip',
          ''
        ),
        ',',
        1
      );

      if nullif(pg_catalog.btrim(req_ip_text), '') is null then
        return;
      end if;

      begin
        req_ip := pg_catalog.btrim(req_ip_text)::inet;
      exception
        when others then
          return;
      end;

      select count(*)::integer
      into recent_count
      from private.order_rate_limits
      where ip = req_ip
        and request_at >= now() - interval '5 minutes';

      if recent_count >= 30 then
        raise sqlstate 'PGRST' using
          message = json_build_object(
            'code', 'ORDER_RATE_LIMIT',
            'message', 'Too many order attempts. Try again in a few minutes.'
          )::text,
          detail = json_build_object(
            'status', 429,
            'status_text', 'Too Many Requests'
          )::text;
      end if;

      insert into private.order_rate_limits(ip, request_at)
      values (req_ip, now());

      delete from private.order_rate_limits
      where ip = req_ip
        and request_at < now() - interval '1 day';
    end;
    $function$;

    revoke execute on function public.check_request()
      from public;
    grant execute on function public.check_request()
      to anon, authenticated;

    alter role authenticator
      set pgrst.db_pre_request = 'public.check_request';

    notify pgrst, 'reload config';
