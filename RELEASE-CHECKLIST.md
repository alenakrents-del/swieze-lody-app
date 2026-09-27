# Świeże Lody — Release Candidate v1

## Customer UX v3
- Menu opens first.
- Four persistent tabs: Menu / Historia / Nagrody / Profil.
- Products and today's ice cream are visible directly in Menu.
- Add button confirms `✓ Dodano`.
- Empty cart control stays hidden; non-empty cart becomes one checkout bar with quantity + total.
- Active order shortcut appears on Menu only while active.
- Guest checkout remains allowed.
- Cart checks for a real customer profile before showing the "credited to history/rewards" message.
- Historia is separate from Profile.
- Comic route is compact by default; user can expand all episodes.
- Dialogue is placed below artwork for readability.
- Rewards and collections are together.
- Login and registration are separate visual modes.

## Lody Staff v4
- Stable URL remains `/staff.html`.
- Start / Zamówienia / Dzisiaj / Produkty.
- Start dashboard shows Nowe / Robimy / Gotowe.
- Orders are separated from catalog and today's flavours.
- Only the next sensible order action is visually dominant.
- Existing catalog and flavour modules are reused.
- Promotions/announcements live under Więcej.
- Separate Staff manifest uses id/start URL `/staff.html`.
- Staff page registers the existing root service worker.

## Backend compatibility verified / hardened
Production currently exposes:
- `create_pickup_order(p_items jsonb, p_locale text)`
- `get_pickup_order_status(p_public_token uuid)`
- `get_my_orders()`
- `get_my_comic_progress(p_locale text)`
- `staff_list_orders()`
- `staff_update_order(p_order_id bigint, p_status text, p_estimated_minutes integer)`

RC v6 includes a reconciliation migration under `supabase/migrations/` matching the hardening already applied to production Supabase.

## Required existing production files
This release candidate is an overlay and still uses:
`app.js`, `auth.js`, `comic.js`, `comic-story-data.js`, `cart.js`,
`order-status.js`, `reviews.js`, `styles.css`, `config.js`,
`manifest.webmanifest`, `staff-catalog.js`, `staff-icecream.js`,
`image-upload.js`, icons and comic assets.

## Real smoke test before production
1. Customer app opens on Menu.
2. Add an ice cream and a standard catalog product.
3. Verify `✓ Dodano`, quantity and total.
4. Open cart while logged out: guest warning must appear.
5. Sign in with a test customer and reopen cart: linked-account message must appear.
6. Place one small test order.
7. Open `/staff.html` with a real Staff account.
8. Verify the order is under Nowe.
9. Advance: new → accepted → preparing → ready → collected.
10. On the customer device verify status changes.
11. Verify collected order appears in account order history.
12. Verify comic credited amount changes according to server rules.
13. Verify locked comic episodes remain locked.
14. Test PL / DE / EN / CS.
15. Test customer PWA install on iPhone Safari and Android Chrome.
16. Install Lody Staff separately and verify it opens `/staff.html`.
17. Reload after service-worker update and verify old UI is not served.
18. Open a previously unlocked episode offline and verify replay.

## Stop release if
- guest purchase is presented as credited,
- Staff cannot advance an order,
- Staff and customer installs open the same page,
- locked comic episodes open,
- old UI remains after service-worker refresh.


## Additional RC v6 mobile checks
19. Switch PL → DE → EN → CS, reopen an unlocked long-form episode, and verify its text follows the selected language.
20. Verify an old active order is visibly marked as stale in Staff.
21. Verify a fresh new order appears ahead of stale active orders in Start attention.
22. Verify Historia contains terminal orders and does not mix them into the Active filter.
