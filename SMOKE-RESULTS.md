# Smoke test — 2026-09-06

## Backend end-to-end result: PASS

A synthetic order was created inside an explicit PostgreSQL transaction and the whole transaction was rolled back after verification.

Verified lifecycle:
- new
- accepted
- preparing
- ready
- collected

Verified after `collected`:
- public order status returned `collected`
- order appeared in `get_my_orders()`
- comic credit was created
- credited amount increased by 35.00 zł
- Episode 2 (35 zł threshold) became unlocked
- staff status transitions returned the expected statuses

Cleanup verification:
- synthetic order rows remaining: 0
- synthetic comic credit rows remaining: 0
- comic credit sequence restored to its original state

No persistent test order or comic credit was left in production data.

## Static release checks: PASS

- customer-v3.js syntax
- staff-v4.js syntax
- sw.js syntax
- Staff manifest JSON
- Customer required DOM targets
- Staff required DOM targets
- v3/v4 assets included in the service worker cache list

## Story canon blocker: RESOLVED IN RC v3

See `STORY-CANON-FIX.md`.


## 2026-09-19 backend hardening: PASS

- `staff_list_orders()` returns old active orders regardless of age.
- Staff-role verification returns stale active orders #9 and #64.
- Terminal history returns 10 orders inside the 30-day window.
- Non-staff staff RPC remains denied.
- Performance Advisor now reports only `unused_index` informational findings.
- No order/customer/comic business rows were mutated by the hardening migration.

## RC v6 static hardening

- comic long-form episode-id detection expanded to 01–15.
- already-transformed long-form copy refreshes from current PL/DE/EN/CS language.
- Staff history is terminal-only; active queue is separate.
- stale active orders receive a warning badge and do not outrank fresh orders on Start.
- service worker cache bumped to v30.
