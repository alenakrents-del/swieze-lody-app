# RC v6 — hardening pass

This release candidate continues RC v5 without publishing the frontend to production.

## Customer comic reader
- Episode detection now covers all 15 episode artwork ids, not only Episodes 1–3.
- Long-form text can refresh after a language change instead of remaining stuck in the language used when the reader was first transformed.
- Existing server unlock state remains authoritative.
- Story data and thresholds are unchanged.

## Staff orders
- `Historia` shows terminal orders, while `Aktywne` remains operational orders only.
- Old active orders are visibly marked `STARE AKTYWNE ZAMÓWIENIE` instead of silently blending into today's queue.
- Fresh active orders win the Start-page attention slot, so an old forgotten/test order cannot hide a new customer order.
- Active cards render one next lifecycle action. Estimate buttons remain secondary for new/accepted/preparing orders.
- Returned/refunded statuses have readable labels.

## Backend reconciliation
Production Supabase now returns:
- all active orders regardless of age;
- terminal order history for the last 30 days.

Security/performance cleanup already applied in production is represented by the included migration under `supabase/migrations/` so the repository can be reconciled later.

No customer order, customer profile, comic credit, reward, or menu row was edited by this hardening pass.
The two pre-existing stale active orders were intentionally left untouched so their business status is not guessed by code.
