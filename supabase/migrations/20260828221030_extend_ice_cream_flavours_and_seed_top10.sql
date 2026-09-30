alter table public.ice_cream_flavours
  add column if not exists base_label text,
  add column if not exists description text,
  add column if not exists badge text,
  add column if not exists graphic_type text not null default 'app';

insert into public.ice_cream_flavours (name, price, image_url, available_today, archived, sort_order, base_label, description, badge, graphic_type)
values
  ('Śmietankowe', 10, null, false, false, 10, 'Na śmietance i mleku', 'Delikatne, aksamitne i wyjątkowo kremowe. Klasyczny smak, który pasuje każdemu.', '🤍 CREAM', 'app'),
  ('Czekoladowe', 10, null, false, false, 20, 'Na śmietance i mleku', 'Gładkie, intensywnie czekoladowe i przyjemnie kremowe. Dla prawdziwych fanów czekolady.', '🍫 CHOCOLATE', 'app'),
  ('Słony Karmel', 10, null, false, false, 30, 'Na śmietance i mleku', 'Kremowy karmel z delikatną nutą soli. Idealne połączenie słodyczy i charakteru.', '🍮 SALTED CARAMEL', 'app'),
  ('Mango Lassi', 10, null, false, false, 40, 'Na jogurcie', 'Soczyste mango połączone z delikatnym jogurtem. Kremowe, świeże i lekko orzeźwiające.', '🥭 MANGO', 'app'),
  ('Kinder Bueno', 10, null, false, false, 50, 'Na śmietance i mleku', 'Kremowe, mleczne i orzechowe. Deserowy smak inspirowany Kinder Bueno.', '🍫 KINDER BUENO', 'brand'),
  ('Orzechowe', 10, null, false, false, 60, 'Na śmietance i mleku', 'Wyrazisty smak prażonych orzechów połączony z delikatną, kremową bazą.', '🌰 NUTS', 'app'),
  ('OREO', 10, null, false, false, 70, 'Na śmietance i mleku', 'Kremowe lody z charakterystycznym smakiem kakaowych ciasteczek.', '🍪 OREO', 'brand'),
  ('Biszkopt Lotus z Maliną', 10, null, false, false, 80, 'Na śmietance i mleku', 'Karmelowy smak ciasteczek Lotus połączony z soczystą, lekko kwaśną maliną.', '🍪 LOTUS • 🍓 MALINA', 'brand'),
  ('Morelowa Chmurka', 10, null, false, false, 90, 'Na śmietance i mleku', 'Delikatna, puszysta kompozycja ze słodką morelą. Lekka, kremowa i bardzo letnia.', '🍑 MORELA', 'app'),
  ('Mascarpone z Wiśnią', 10, null, false, false, 100, 'Na śmietance i mleku', 'Kremowe mascarpone z wyrazistą, lekko kwaśną wiśnią. Deserowy i elegancki smak.', '🍒 WIŚNIA', 'app')
on conflict do nothing;
