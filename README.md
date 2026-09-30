# Świeże Lody

Statyczna aplikacja klienta i odizolowany panel pracownika, wdrażane przez Vercel. Backendem jest istniejący projekt Supabase (`orabfrxuxvssdunkqnbx`): Postgres, Auth i Storage.

## Bezpieczeństwo

- Przeglądarka używa wyłącznie publicznego publishable key z `config.js`. Service-role key nigdy nie trafia do frontendu.
- Dostęp pracownika wymaga sesji Supabase Auth oraz pozytywnego wyniku `is_staff()`.
- Dane są chronione przez RLS; operacje administracyjne wykonują istniejące, kontrolujące rolę funkcje RPC.
- Zdjęcia produktów są zapisywane w istniejącym bucketcie `menu-images` zgodnie z jego politykami Storage.
- Publiczne tworzenie zamówień ma rate limit po stronie bazy.

## Frontendy

- `/` — aplikacja klienta/PWA. Jej root service worker nie obsługuje żądań `/admin/`.
- `/admin/` — niezależny, mobile-first panel bez własnego service workera i bez zależności od cache PWA.
- Biblioteka Supabase używana przez admina jest lokalnie przypięta w `vendor/supabase.min.js`.

## Lokalna weryfikacja

```sh
pnpm test
pnpm test:e2e -- --base-url=http://127.0.0.1:4173
```

E2E logowania wymaga zmiennych `ADMIN_TEST_EMAIL` i `ADMIN_TEST_PASSWORD`. Nie zapisuj ich w repozytorium ani logach.

## Supabase i migracje

Historia zmian znajduje się w `supabase/migrations/`. Nie uruchamiaj `db reset` ani starych migracji przeciwko production. Plik `supabase/baseline/production_schema_20260930.sql` jest snapshotem startowym wyłącznie dla nowej, pustej bazy; nie jest migracją production. Szczegóły driftu są w `supabase/README.md`.
