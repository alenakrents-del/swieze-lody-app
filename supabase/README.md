# Supabase production schema

`baseline/production_schema_20260930.sql` captures foundational tables that
exist in production but have no `CREATE TABLE` in migration history, including
`customers`, collections and the menu catalog. It is only for a brand-new empty
project and must never be run against production. It came from read-only catalog
inspection; production was not reset or mutated.

The files in `migrations/` include the production migration history for project
`orabfrxuxvssdunkqnbx` as observed on 2026-09-30.

Production was changed forward in place on that date. The matching migrations
are:

- `20260930125001_revoke_unnecessary_public_execute.sql`
- `20260930125137_auto_cancel_stale_pickup_orders_on_staff_load.sql`
- `20260930125315_rate_limit_public_order_creation_by_ip.sql`
- `20260930125720_fix_staff_list_orders_stale_alias.sql`

Together they preserve the current production behavior: restricted function
execution, order-creation rate limiting, automatic cancellation of active orders
older than 24 hours, and the unambiguous `staff_list_orders()` implementation.

Do not rebuild production from an older migration subset, run `db reset` against
production, or overwrite the live schema with a historical dump. Make future
schema changes with new forward-only migrations after first comparing the live
schema and migration history.

`20260919075030_reconcile_staff_history_and_rls.sql` is the exact migration
recorded in production. The later idempotent
`20260919095000_reconcile_staff_history_and_rls.sql` remains in the repository
because it was already part of `main`; do not use it to roll production back.
