do $migration$
declare
  v_season_id bigint;
  v_target numeric(12,2);
  v_final_episode_id bigint;
  v_collectible_id bigint;
begin
  select season.id, season.target_amount
    into strict v_season_id, v_target
  from public.comic_seasons as season
  where season.code = 'season-1';

  if (
    select count(*)
    from public.app_locales as locale
    where locale.code in ('pl', 'de', 'en', 'cs')
  ) <> 4 then
    raise exception 'Season 1 requires pl, de, en and cs locales';
  end if;

  if exists (
    select 1
    from public.comic_episodes as episode
    where episode.season_id = v_season_id
      and episode.code not in (
        'beat-00-unmarked-envelope',
        'beat-07-windmill-not-mill',
        'beat-14-ink-from-waves',
        'beat-21-park-as-map',
        'beat-29-round-fort',
        'beat-36-new-mystery-old-museum',
        'beat-43-across-swina',
        'beat-50-view-from-above',
        'beat-57-fort-answer',
        'beat-64-beneath-dunes',
        'beat-71-line-under-river',
        'beat-79-karsiborska-silence',
        'beat-86-map-44-islands',
        'beat-93-four-layers',
        'beat-100-course-found'
      )
  ) then
    raise exception 'Season 1 contains unexpected episodes';
  end if;

  insert into public.comic_season_translations (
    season_id,
    locale,
    title,
    summary
  )
  values
    (v_season_id, 'pl', 'Kurs czterech świateł', 'Rodzinna zagadka prowadzi przez prawdziwe miejsca Świnoujścia. Maja, Maks, Lea i mewa Frytka składają współczesną mapę, która opowiada o nawigacji, pamięci, przyrodzie i połączeniu wysp.'),
    (v_season_id, 'de', 'Der Kurs der vier Lichter', 'Ein Familienrätsel führt durch reale Orte in Świnoujście. Maja, Maks, Lea und die Möwe Frytka setzen eine moderne Karte zusammen, die von Navigation, Erinnerung, Natur und der Verbindung der Inseln erzählt.'),
    (v_season_id, 'en', 'Course of the Four Lights', 'A family mystery leads through real places in Świnoujście. Maja, Maks, Lea and Frytka the gull assemble a modern map about navigation, memory, nature and the links between the islands.'),
    (v_season_id, 'cs', 'Kurz čtyř světel', 'Rodinná záhada vede skutečnými místy ve Świnoujście. Maja, Maks, Lea a racek Frytka skládají moderní mapu o navigaci, paměti, přírodě a propojení ostrovů.')
  on conflict (season_id, locale) do update
    set title = excluded.title,
        summary = excluded.summary;

  with episode_source (
    code,
    threshold_percent,
    sort_order,
    is_final,
    artwork_key
  ) as (
    values
      ('beat-00-unmarked-envelope', 0::numeric, 0, false, 'comic/season-1/placeholders/beat-00'),
      ('beat-07-windmill-not-mill', 7::numeric, 10, false, 'comic/season-1/placeholders/beat-07'),
      ('beat-14-ink-from-waves', 14::numeric, 20, false, 'comic/season-1/placeholders/beat-14'),
      ('beat-21-park-as-map', 21::numeric, 30, false, 'comic/season-1/placeholders/beat-21'),
      ('beat-29-round-fort', 29::numeric, 40, false, 'comic/season-1/placeholders/beat-29'),
      ('beat-36-new-mystery-old-museum', 36::numeric, 50, false, 'comic/season-1/placeholders/beat-36'),
      ('beat-43-across-swina', 43::numeric, 60, false, 'comic/season-1/placeholders/beat-43'),
      ('beat-50-view-from-above', 50::numeric, 70, false, 'comic/season-1/placeholders/beat-50'),
      ('beat-57-fort-answer', 57::numeric, 80, false, 'comic/season-1/placeholders/beat-57'),
      ('beat-64-beneath-dunes', 64::numeric, 90, false, 'comic/season-1/placeholders/beat-64'),
      ('beat-71-line-under-river', 71::numeric, 100, false, 'comic/season-1/placeholders/beat-71'),
      ('beat-79-karsiborska-silence', 79::numeric, 110, false, 'comic/season-1/placeholders/beat-79'),
      ('beat-86-map-44-islands', 86::numeric, 120, false, 'comic/season-1/placeholders/beat-86'),
      ('beat-93-four-layers', 93::numeric, 130, false, 'comic/season-1/placeholders/beat-93'),
      ('beat-100-course-found', 100::numeric, 140, true, 'comic/season-1/placeholders/beat-100')
  )
  insert into public.comic_episodes (
    season_id,
    code,
    unlock_at_amount,
    sort_order,
    is_final,
    is_active,
    cover_artwork_key,
    updated_at
  )
  select
    v_season_id,
    source.code,
    case
      when source.is_final then v_target
      else round(v_target * source.threshold_percent / 100, 2)
    end,
    source.sort_order,
    source.is_final,
    true,
    source.artwork_key,
    now()
  from episode_source as source
  on conflict (season_id, code) do update
    set unlock_at_amount = excluded.unlock_at_amount,
        sort_order = excluded.sort_order,
        is_final = excluded.is_final,
        is_active = excluded.is_active,
        cover_artwork_key = excluded.cover_artwork_key,
        updated_at = now();

  with translation_source (episode_code, locale, title, summary) as (
    values
      ('beat-00-unmarked-envelope', 'pl', 'Koperta bez nadawcy', 'Zarys przezroczystej mapy pasuje do sylwetki Stawy Młyny.'),
      ('beat-00-unmarked-envelope', 'de', 'Der Umschlag ohne Absender', 'Der Umriss der transparenten Karte passt zur Silhouette der Stawa Młyny.'),
      ('beat-00-unmarked-envelope', 'en', 'The Unmarked Envelope', 'The outline of the transparent map matches the silhouette of Stawa Młyny.'),
      ('beat-00-unmarked-envelope', 'cs', 'Obálka bez odesílatele', 'Obrys průhledné mapy odpovídá siluetě Stawy Młyny.'),

      ('beat-07-windmill-not-mill', 'pl', 'Młyn, który nie miele', 'Na mapie pojawia się linia biegnąca wzdłuż falochronu.'),
      ('beat-07-windmill-not-mill', 'de', 'Die Mühle, die nicht mahlt', 'Auf der Karte erscheint eine Linie entlang der Mole.'),
      ('beat-07-windmill-not-mill', 'en', 'The Mill That Does Not Mill', 'A line appears on the map and follows the breakwater.'),
      ('beat-07-windmill-not-mill', 'cs', 'Mlýn, který nemele', 'Na mapě se objeví čára vedoucí podél vlnolamu.'),

      ('beat-14-ink-from-waves', 'pl', 'Atrament z fal', 'Ujawniony znak prowadzi od morza w stronę Parku Zdrojowego.'),
      ('beat-14-ink-from-waves', 'de', 'Tinte aus den Wellen', 'Das sichtbare Zeichen führt vom Meer in Richtung Kurpark.'),
      ('beat-14-ink-from-waves', 'en', 'Ink from the Waves', 'The revealed sign leads away from the sea toward Park Zdrojowy.'),
      ('beat-14-ink-from-waves', 'cs', 'Inkoust z vln', 'Odhalený znak vede od moře směrem k lázeňskému parku.'),

      ('beat-21-park-as-map', 'pl', 'Park jak mapa', 'W centrum wzoru pojawia się charakterystyczna bryła Fortu Anioła.'),
      ('beat-21-park-as-map', 'de', 'Der Park als Karte', 'In der Mitte des Musters erscheint die markante Form des Fort Anioła.'),
      ('beat-21-park-as-map', 'en', 'The Park as a Map', 'The distinctive shape of Fort Anioła appears at the centre of the pattern.'),
      ('beat-21-park-as-map', 'cs', 'Park jako mapa', 'Uprostřed vzoru se objeví výrazný tvar Fortu Anioła.'),

      ('beat-29-round-fort', 'pl', 'Okrągły fort', 'Opiekun rozpoznaje znak współczesnego projektu muzealnego.'),
      ('beat-29-round-fort', 'de', 'Das runde Fort', 'Ein Betreuer erkennt das Zeichen eines modernen Museumsprojekts.'),
      ('beat-29-round-fort', 'en', 'The Round Fort', 'A guide recognises the mark of a modern museum project.'),
      ('beat-29-round-fort', 'cs', 'Kruhová pevnost', 'Průvodce poznává znak současného muzejního projektu.'),

      ('beat-36-new-mystery-old-museum', 'pl', 'Nowa zagadka w starym muzeum', 'Brakującą warstwę ostatnio widziano po drugiej stronie Świny.'),
      ('beat-36-new-mystery-old-museum', 'de', 'Ein neues Rätsel im alten Museum', 'Die fehlende Schicht wurde zuletzt auf der anderen Seite der Świna gesehen.'),
      ('beat-36-new-mystery-old-museum', 'en', 'A New Mystery in the Old Museum', 'The missing layer was last seen on the other side of the Świna.'),
      ('beat-36-new-mystery-old-museum', 'cs', 'Nová záhada ve starém muzeu', 'Chybějící vrstva byla naposledy spatřena na druhé straně Świny.'),

      ('beat-43-across-swina', 'pl', 'Przez Świnę', 'Odbłysk światła prowadzi wzrok bohaterów ku latarni.'),
      ('beat-43-across-swina', 'de', 'Über die Świna', 'Ein Lichtreflex lenkt den Blick der Freunde zum Leuchtturm.'),
      ('beat-43-across-swina', 'en', 'Across the Świna', 'A flash of light draws the friends toward the lighthouse.'),
      ('beat-43-across-swina', 'cs', 'Přes Świnu', 'Odlesk světla obrátí pohled přátel k majáku.'),

      ('beat-50-view-from-above', 'pl', 'Widok z góry', 'Cztery linie na mapie zbiegają się w pobliżu Fortu Gerharda.'),
      ('beat-50-view-from-above', 'de', 'Der Blick von oben', 'Vier Linien auf der Karte treffen sich nahe dem Fort Gerharda.'),
      ('beat-50-view-from-above', 'en', 'The View from Above', 'Four lines on the map meet near Fort Gerharda.'),
      ('beat-50-view-from-above', 'cs', 'Pohled shora', 'Čtyři čáry na mapě se sbíhají poblíž Fortu Gerharda.'),

      ('beat-57-fort-answer', 'pl', 'Odpowiedź fortu', 'Wydrukowana wskazówka mówi o mieście, którego nie widać z ulicy.'),
      ('beat-57-fort-answer', 'de', 'Die Antwort des Forts', 'Der gedruckte Hinweis nennt eine Stadt, die man von der Straße nicht sieht.'),
      ('beat-57-fort-answer', 'en', 'The Fort’s Answer', 'The printed clue names a city that cannot be seen from the street.'),
      ('beat-57-fort-answer', 'cs', 'Odpověď pevnosti', 'Vytištěná nápověda mluví o městě, které z ulice není vidět.'),

      ('beat-64-beneath-dunes', 'pl', 'Pod wydmami', 'Odbicie latarki układa na mapie linię biegnącą pod wodą.'),
      ('beat-64-beneath-dunes', 'de', 'Unter den Dünen', 'Die Spiegelung einer Lampe zeichnet auf der Karte eine Linie unter dem Wasser.'),
      ('beat-64-beneath-dunes', 'en', 'Beneath the Dunes', 'A torch reflection draws a line beneath the water on the map.'),
      ('beat-64-beneath-dunes', 'cs', 'Pod dunami', 'Odraz svítilny nakreslí na mapě čáru vedoucí pod vodou.'),

      ('beat-71-line-under-river', 'pl', 'Linia pod rzeką', 'Kolejny symbol przedstawia ptaka pośród trzcin.'),
      ('beat-71-line-under-river', 'de', 'Die Linie unter dem Fluss', 'Das nächste Symbol zeigt einen Vogel zwischen Schilf.'),
      ('beat-71-line-under-river', 'en', 'The Line Under the River', 'The next symbol shows a bird among the reeds.'),
      ('beat-71-line-under-river', 'cs', 'Čára pod řekou', 'Další symbol ukazuje ptáka mezi rákosím.'),

      ('beat-79-karsiborska-silence', 'pl', 'Cisza Karsiborskiej Kępy', 'Na przezroczystej mapie pojawiają się dziesiątki małych wysp.'),
      ('beat-79-karsiborska-silence', 'de', 'Die Stille von Karsiborska Kępa', 'Auf der transparenten Karte erscheinen Dutzende kleiner Inseln.'),
      ('beat-79-karsiborska-silence', 'en', 'The Silence of Karsiborska Kępa', 'Dozens of small islands appear on the transparent map.'),
      ('beat-79-karsiborska-silence', 'cs', 'Ticho Karsiborské Kępy', 'Na průhledné mapě se objeví desítky malých ostrovů.'),

      ('beat-86-map-44-islands', 'pl', 'Mapa 44 wysp', 'Cały przebyty szlak jest czytelny, ale nadal brakuje czwartej warstwy.'),
      ('beat-86-map-44-islands', 'de', 'Die Karte der 44 Inseln', 'Der ganze zurückgelegte Weg ist erkennbar, doch die vierte Schicht fehlt noch.'),
      ('beat-86-map-44-islands', 'en', 'The Map of 44 Islands', 'The whole route is now visible, but the fourth layer is still missing.'),
      ('beat-86-map-44-islands', 'cs', 'Mapa 44 ostrovů', 'Celá trasa je nyní čitelná, ale čtvrtá vrstva stále chybí.'),

      ('beat-93-four-layers', 'pl', 'Cztery warstwy', 'Złożona mapa ponownie wskazuje Stawę Młyny, tym razem po zmroku.'),
      ('beat-93-four-layers', 'de', 'Vier Schichten', 'Die zusammengesetzte Karte weist erneut zur Stawa Młyny, diesmal nach Einbruch der Dunkelheit.'),
      ('beat-93-four-layers', 'en', 'Four Layers', 'The assembled map points to Stawa Młyny again, this time after dark.'),
      ('beat-93-four-layers', 'cs', 'Čtyři vrstvy', 'Složená mapa znovu ukazuje ke Stawě Młyny, tentokrát po setmění.'),

      ('beat-100-course-found', 'pl', 'Kurs odnaleziony', 'Czwarta warstwa prowadzi do finału przy Stawie Młyny.'),
      ('beat-100-course-found', 'de', 'Der Kurs ist gefunden', 'Die vierte Schicht führt zum Finale an der Stawa Młyny.'),
      ('beat-100-course-found', 'en', 'Course Found', 'The fourth layer leads to the finale at Stawa Młyny.'),
      ('beat-100-course-found', 'cs', 'Kurz nalezen', 'Čtvrtá vrstva vede k finále u Stawy Młyny.')
  )
  insert into public.comic_episode_translations (
    episode_id,
    locale,
    title,
    summary
  )
  select episode.id, source.locale, source.title, source.summary
  from translation_source as source
  join public.comic_episodes as episode
    on episode.season_id = v_season_id
   and episode.code = source.episode_code
  on conflict (episode_id, locale) do update
    set title = excluded.title,
        summary = excluded.summary;

  with scene_source (episode_code, scene_code, sort_order, artwork_key) as (
    values
      ('beat-00-unmarked-envelope', 'scene-00-unmarked-envelope', 0, 'comic/season-1/placeholders/scene-00'),
      ('beat-07-windmill-not-mill', 'scene-07-windmill-not-mill', 10, 'comic/season-1/placeholders/scene-07'),
      ('beat-14-ink-from-waves', 'scene-14-ink-from-waves', 20, 'comic/season-1/placeholders/scene-14'),
      ('beat-21-park-as-map', 'scene-21-park-as-map', 30, 'comic/season-1/placeholders/scene-21'),
      ('beat-29-round-fort', 'scene-29-round-fort', 40, 'comic/season-1/placeholders/scene-29'),
      ('beat-36-new-mystery-old-museum', 'scene-36-new-mystery-old-museum', 50, 'comic/season-1/placeholders/scene-36'),
      ('beat-43-across-swina', 'scene-43-across-swina', 60, 'comic/season-1/placeholders/scene-43'),
      ('beat-50-view-from-above', 'scene-50-view-from-above', 70, 'comic/season-1/placeholders/scene-50'),
      ('beat-57-fort-answer', 'scene-57-fort-answer', 80, 'comic/season-1/placeholders/scene-57'),
      ('beat-64-beneath-dunes', 'scene-64-beneath-dunes', 90, 'comic/season-1/placeholders/scene-64'),
      ('beat-71-line-under-river', 'scene-71-line-under-river', 100, 'comic/season-1/placeholders/scene-71'),
      ('beat-79-karsiborska-silence', 'scene-79-karsiborska-silence', 110, 'comic/season-1/placeholders/scene-79'),
      ('beat-86-map-44-islands', 'scene-86-map-44-islands', 120, 'comic/season-1/placeholders/scene-86'),
      ('beat-93-four-layers', 'scene-93-four-layers', 130, 'comic/season-1/placeholders/scene-93'),
      ('beat-100-course-found', 'scene-100-course-found', 140, 'comic/season-1/placeholders/scene-100')
  )
  insert into public.comic_scenes (
    episode_id,
    code,
    sort_order,
    artwork_key,
    is_active,
    updated_at
  )
  select
    episode.id,
    source.scene_code,
    source.sort_order,
    source.artwork_key,
    true,
    now()
  from scene_source as source
  join public.comic_episodes as episode
    on episode.season_id = v_season_id
   and episode.code = source.episode_code
  on conflict (episode_id, code) do update
    set sort_order = excluded.sort_order,
        artwork_key = excluded.artwork_key,
        is_active = excluded.is_active,
        updated_at = now();

  with translation_source (scene_code, locale, title, body) as (
    values
      ('scene-00-unmarked-envelope', 'pl', 'Koperta bez nadawcy', 'Na promenadzie Maja, Maks i Lea znajdują nowoczesną kopertę z przezroczystą mapą. Cztery znaki oznaczają światło, wodę, ptaka i drogę, lecz jednej warstwy brakuje. Zarys mapy pasuje do sylwetki Stawy Młyny.'),
      ('scene-00-unmarked-envelope', 'de', 'Der Umschlag ohne Absender', 'Auf der Promenade finden Maja, Maks und Lea einen modernen Umschlag mit einer transparenten Karte. Vier Zeichen stehen für Licht, Wasser, einen Vogel und einen Weg, doch eine Schicht fehlt. Der Umriss der Karte passt zur Silhouette der Stawa Młyny.'),
      ('scene-00-unmarked-envelope', 'en', 'The Unmarked Envelope', 'On the promenade, Maja, Maks and Lea find a modern envelope containing a transparent map. Four symbols stand for light, water, a bird and a route, but one layer is missing. The outline of the map matches the silhouette of Stawa Młyny.'),
      ('scene-00-unmarked-envelope', 'cs', 'Obálka bez odesílatele', 'Na promenádě najdou Maja, Maks a Lea moderní obálku s průhlednou mapou. Čtyři znaky představují světlo, vodu, ptáka a cestu, ale jedna vrstva chybí. Obrys mapy odpovídá siluetě Stawy Młyny.'),

      ('scene-07-windmill-not-mill', 'pl', 'Młyn, który nie miele', 'Przy Stawie Młyny Maja wyjaśnia, że obiekt jest znakiem nawigacyjnym z lat 1873–1874, a nie prawdziwym młynem. Układ skrzydeł pasuje do pierwszego symbolu. Na mapie pojawia się linia biegnąca wzdłuż falochronu.'),
      ('scene-07-windmill-not-mill', 'de', 'Die Mühle, die nicht mahlt', 'An der Stawa Młyny erklärt Maja, dass das Bauwerk ein Navigationszeichen aus den Jahren 1873–1874 und keine echte Mühle ist. Die Stellung der Flügel passt zum ersten Symbol. Auf der Karte erscheint eine Linie entlang der Mole.'),
      ('scene-07-windmill-not-mill', 'en', 'The Mill That Does Not Mill', 'At Stawa Młyny, Maja explains that the structure is a navigational beacon from 1873–1874, not a working mill. The position of its sails matches the first symbol. A line appears on the map and follows the breakwater.'),
      ('scene-07-windmill-not-mill', 'cs', 'Mlýn, který nemele', 'U Stawy Młyny Maja vysvětlí, že stavba je navigačním znakem z let 1873–1874, nikoli skutečným mlýnem. Poloha křídel odpovídá prvnímu symbolu. Na mapě se objeví čára vedoucí podél vlnolamu.'),

      ('scene-14-ink-from-waves', 'pl', 'Atrament z fal', 'Bryzgi dotykają fikcyjnej wodoodpornej karty i ujawniają ukryty nadruk. Maks ogłasza odkrycie skarbu, ale Lea rozpoznaje symbol publicznego parku. Znak prowadzi od morza w stronę Parku Zdrojowego.'),
      ('scene-14-ink-from-waves', 'de', 'Tinte aus den Wellen', 'Spritzwasser trifft die fiktive wasserfeste Karte und macht einen verborgenen Druck sichtbar. Maks verkündet einen Schatzfund, doch Lea erkennt das Zeichen eines öffentlichen Parks. Das Zeichen führt vom Meer in Richtung Kurpark.'),
      ('scene-14-ink-from-waves', 'en', 'Ink from the Waves', 'Spray touches the fictional waterproof card and reveals a hidden print. Maks announces a treasure, but Lea recognises the symbol of a public park. The sign leads away from the sea toward Park Zdrojowy.'),
      ('scene-14-ink-from-waves', 'cs', 'Inkoust z vln', 'Mořská tříšť zasáhne smyšlenou voděodolnou kartu a odhalí skrytý tisk. Maks ohlásí nález pokladu, ale Lea pozná symbol veřejného parku. Znak vede od moře směrem k lázeňskému parku.'),

      ('scene-21-park-as-map', 'pl', 'Park jak mapa', 'Bohaterowie porównują przezroczystą warstwę z publicznym planem alejek Parku Zdrojowego. Tylko jedna trasa pasuje do wzoru, a Frytka wybiera dokładnie przeciwną ławkę. W centrum układu pojawia się charakterystyczna bryła Fortu Anioła.'),
      ('scene-21-park-as-map', 'de', 'Der Park als Karte', 'Die Freunde vergleichen die transparente Schicht mit dem öffentlichen Wegeplan des Kurparks. Nur eine Route passt zum Muster, während Frytka genau die falsche Bank auswählt. In der Mitte erscheint die markante Form des Fort Anioła.'),
      ('scene-21-park-as-map', 'en', 'The Park as a Map', 'The friends compare the transparent layer with the public plan of paths in Park Zdrojowy. Only one route fits the pattern, while Frytka chooses exactly the wrong bench. The distinctive shape of Fort Anioła appears at the centre.'),
      ('scene-21-park-as-map', 'cs', 'Park jako mapa', 'Přátelé porovnají průhlednou vrstvu s veřejným plánem cest v lázeňském parku. Vzoru odpovídá jediná trasa, zatímco Frytka si vybere přesně opačnou lavičku. Uprostřed se objeví výrazný tvar Fortu Anioła.'),

      ('scene-29-round-fort', 'pl', 'Okrągły fort', 'Podczas zwykłego zwiedzania Fortu Anioła bohaterowie porównują jego charakterystyczną bryłę z symbolem mapy. Nie szukają skrytki i niczego nie dotykają poza własną kartą. Opiekun rozpoznaje znak współczesnego projektu muzealnego.'),
      ('scene-29-round-fort', 'de', 'Das runde Fort', 'Bei einem regulären Besuch des Fort Anioła vergleichen die Freunde seine markante Form mit dem Kartensymbol. Sie suchen kein Versteck und berühren nur ihre eigene Karte. Ein Betreuer erkennt das Zeichen eines modernen Museumsprojekts.'),
      ('scene-29-round-fort', 'en', 'The Round Fort', 'During a regular visit to Fort Anioła, the friends compare its distinctive shape with the symbol on the map. They search for no hiding place and touch nothing except their own card. A guide recognises the mark of a modern museum project.'),
      ('scene-29-round-fort', 'cs', 'Kruhová pevnost', 'Při běžné návštěvě Fortu Anioła přátelé porovnají jeho výrazný tvar se symbolem na mapě. Nehledají žádnou skrýš a dotýkají se pouze vlastní karty. Průvodce poznává znak současného muzejního projektu.'),

      ('scene-36-new-mystery-old-museum', 'pl', 'Nowa zagadka w starym muzeum', 'W Muzeum Rybołówstwa Morskiego bohaterowie dowiadują się, że mapy są współczesne i nie są zabytkami. Niedokończony zestaw miał opowiadać o mieście bez używania jednego języka. Brakującą warstwę ostatnio widziano po drugiej stronie Świny.'),
      ('scene-36-new-mystery-old-museum', 'de', 'Ein neues Rätsel im alten Museum', 'Im Museum für Meeresfischerei erfahren die Freunde, dass die Karten modern und keine historischen Objekte sind. Das unvollendete Set sollte ohne eine einzige Sprache von der Stadt erzählen. Die fehlende Schicht wurde zuletzt auf der anderen Seite der Świna gesehen.'),
      ('scene-36-new-mystery-old-museum', 'en', 'A New Mystery in the Old Museum', 'At the Museum of Sea Fishery, the friends learn that the maps are modern and not historical objects. The unfinished set was meant to tell the story of the city without relying on one language. The missing layer was last seen on the other side of the Świna.'),
      ('scene-36-new-mystery-old-museum', 'cs', 'Nová záhada ve starém muzeu', 'V Muzeu mořského rybolovu se přátelé dozvědí, že mapy jsou moderní a nejsou historickými předměty. Nedokončená sada měla vyprávět o městě bez jediného jazyka. Chybějící vrstva byla naposledy spatřena na druhé straně Świny.'),

      ('scene-43-across-swina', 'pl', 'Przez Świnę', 'Bohaterowie przeprawiają się przez Świnę dozwoloną publiczną trasą i obserwują ruch portowy. Frytka prawie porywa mapę, najwyraźniej myląc ją z przekąską. Odbłysk światła prowadzi wzrok bohaterów ku latarni.'),
      ('scene-43-across-swina', 'de', 'Über die Świna', 'Die Freunde überqueren die Świna auf einem erlaubten öffentlichen Weg und beobachten den Hafenverkehr. Frytka trägt beinahe die Karte davon und hält sie offenbar für einen Snack. Ein Lichtreflex lenkt den Blick zum Leuchtturm.'),
      ('scene-43-across-swina', 'en', 'Across the Świna', 'The friends cross the Świna by an authorised public route and watch the port traffic. Frytka nearly carries off the map after apparently mistaking it for a snack. A flash of light draws their eyes toward the lighthouse.'),
      ('scene-43-across-swina', 'cs', 'Přes Świnu', 'Přátelé překročí Świnu povolenou veřejnou trasou a sledují provoz v přístavu. Frytka málem odnese mapu, protože si ji zřejmě splete se svačinou. Odlesk světla obrátí jejich pohled k majáku.'),

      ('scene-50-view-from-above', 'pl', 'Widok z góry', 'Z dostępnego dla zwiedzających tarasu latarni widać morze, Świnę, port i wyspy. Lea układa mapę zgodnie z panoramą, a Maks próbuje ustawić także Frytkę. Cztery linie zbiegają się w pobliżu Fortu Gerharda.'),
      ('scene-50-view-from-above', 'de', 'Der Blick von oben', 'Von der Besucherterrasse des Leuchtturms sind das Meer, die Świna, der Hafen und die Inseln zu sehen. Lea richtet die Karte an der Aussicht aus, während Maks auch Frytka ausrichten möchte. Vier Linien treffen sich nahe dem Fort Gerharda.'),
      ('scene-50-view-from-above', 'en', 'The View from Above', 'From the lighthouse terrace open to visitors, the sea, the Świna, the port and the islands are visible. Lea aligns the map with the panorama while Maks tries to align Frytka too. Four lines meet near Fort Gerharda.'),
      ('scene-50-view-from-above', 'cs', 'Pohled shora', 'Z návštěvnické terasy majáku jsou vidět moře, Świna, přístav a ostrovy. Lea srovná mapu s panoramatem, zatímco Maks se snaží srovnat i Frytku. Čtyři čáry se sbíhají poblíž Fortu Gerharda.'),

      ('scene-57-fort-answer', 'pl', 'Odpowiedź fortu', 'Podczas zorganizowanego zwiedzania Fortu Gerharda drużyna poznaje rolę fortyfikacji przy wejściu do portu. Symbol na karcie pasuje do drukowanej zagadki z zestawu. Wskazówka mówi o mieście, którego nie widać z ulicy.'),
      ('scene-57-fort-answer', 'de', 'Die Antwort des Forts', 'Bei einer organisierten Besichtigung des Fort Gerharda lernt das Team die Rolle der Befestigungen am Hafeneingang kennen. Das Kartensymbol passt zu einem gedruckten Rätsel aus dem Set. Der Hinweis nennt eine Stadt, die man von der Straße nicht sieht.'),
      ('scene-57-fort-answer', 'en', 'The Fort’s Answer', 'During an organised visit to Fort Gerharda, the team learns about the role of the fortifications at the harbour entrance. The card symbol matches a printed riddle from the set. The clue names a city that cannot be seen from the street.'),
      ('scene-57-fort-answer', 'cs', 'Odpověď pevnosti', 'Během organizované návštěvy Fortu Gerharda se tým dozví o úloze opevnění u vjezdu do přístavu. Symbol na kartě odpovídá vytištěné hádance ze sady. Nápověda mluví o městě, které z ulice není vidět.'),

      ('scene-64-beneath-dunes', 'pl', 'Pod wydmami', 'Na oficjalnej trasie Podziemnego Miasta bohaterowie przechodzą przez część kompleksu ukrytego pod wydmami. Odbicie latarki przypadkiem pasuje do pustego miejsca na karcie. Na mapie powstaje linia biegnąca pod wodą.'),
      ('scene-64-beneath-dunes', 'de', 'Unter den Dünen', 'Auf der offiziellen Route durch die Unterirdische Stadt gehen die Freunde durch einen Teil der unter den Dünen verborgenen Anlage. Die Spiegelung einer Lampe passt zufällig in die leere Stelle der Karte. Eine Linie führt nun unter dem Wasser entlang.'),
      ('scene-64-beneath-dunes', 'en', 'Beneath the Dunes', 'On the official Underground City route, the friends pass through part of the complex hidden beneath the dunes. A torch reflection happens to fit the empty space on the card. A new line now runs beneath the water.'),
      ('scene-64-beneath-dunes', 'cs', 'Pod dunami', 'Na oficiální trase Podzemního města projdou přátelé částí komplexu ukrytého pod dunami. Odraz svítilny náhodou zapadne do prázdného místa na kartě. Na mapě vznikne čára vedoucí pod vodou.'),

      ('scene-71-line-under-river', 'pl', 'Linia pod rzeką', 'Bohaterowie rozpoznają w symbolu współczesny tunel łączący wyspy Uznam i Wolin. Dawne i nowe sposoby orientacji stają się częściami jednej opowieści. Kolejny znak przedstawia ptaka pośród trzcin.'),
      ('scene-71-line-under-river', 'de', 'Die Linie unter dem Fluss', 'Die Freunde erkennen im Symbol den modernen Tunnel zwischen den Inseln Uznam und Wolin. Alte und neue Wege der Orientierung werden Teil derselben Geschichte. Das nächste Zeichen zeigt einen Vogel zwischen Schilf.'),
      ('scene-71-line-under-river', 'en', 'The Line Under the River', 'The friends recognise the modern tunnel linking the islands of Uznam and Wolin in the symbol. Old and new ways of finding direction become parts of one story. The next sign shows a bird among the reeds.'),
      ('scene-71-line-under-river', 'cs', 'Čára pod řekou', 'Přátelé ve znaku poznají moderní tunel spojující ostrovy Uznam a Wolin. Staré i nové způsoby orientace se stanou součástí jednoho příběhu. Další znak ukazuje ptáka mezi rákosím.'),

      ('scene-79-karsiborska-silence', 'pl', 'Cisza Karsiborskiej Kępy', 'Na dozwolonej trasie Karsiborskiej Kępy drużyna obserwuje teren bez schodzenia ze ścieżki i bez niepokojenia ptaków. Lea odkrywa, że znak nie przedstawia jednego gatunku, lecz kształt delty. Na mapie pojawiają się dziesiątki małych wysp.'),
      ('scene-79-karsiborska-silence', 'de', 'Die Stille von Karsiborska Kępa', 'Auf dem erlaubten Weg der Karsiborska Kępa beobachtet das Team die Landschaft, ohne den Pfad zu verlassen oder Vögel zu stören. Lea erkennt, dass das Zeichen keine einzelne Art, sondern die Form des Deltas zeigt. Dutzende kleine Inseln erscheinen auf der Karte.'),
      ('scene-79-karsiborska-silence', 'en', 'The Silence of Karsiborska Kępa', 'On an authorised route at Karsiborska Kępa, the team observes the landscape without leaving the path or disturbing birds. Lea discovers that the sign shows not one species but the shape of the delta. Dozens of small islands appear on the map.'),
      ('scene-79-karsiborska-silence', 'cs', 'Ticho Karsiborské Kępy', 'Na povolené trase Karsiborské Kępy tým pozoruje krajinu, aniž by opustil cestu nebo rušil ptáky. Lea zjistí, že znak neukazuje jediný druh, ale tvar delty. Na mapě se objeví desítky malých ostrovů.'),

      ('scene-86-map-44-islands', 'pl', 'Mapa 44 wysp', 'Na oficjalnej mapie drużyna potwierdza, że Świnoujście leży na 44 wyspach, a stale zamieszkane są Uznam, Wolin i Karsibór. Wszystkie odwiedzone miejsca układają się w jeden szlak. Nadal brakuje czwartej przezroczystej warstwy.'),
      ('scene-86-map-44-islands', 'de', 'Die Karte der 44 Inseln', 'Auf einer offiziellen Karte bestätigt das Team, dass Świnoujście auf 44 Inseln liegt und Uznam, Wolin sowie Karsibór dauerhaft bewohnt sind. Alle besuchten Orte bilden eine Route. Die vierte transparente Schicht fehlt weiterhin.'),
      ('scene-86-map-44-islands', 'en', 'The Map of 44 Islands', 'On an official map, the team confirms that Świnoujście lies on 44 islands and that Uznam, Wolin and Karsibór are permanently inhabited. Every visited place forms one route. The fourth transparent layer is still missing.'),
      ('scene-86-map-44-islands', 'cs', 'Mapa 44 ostrovů', 'Na oficiální mapě tým potvrdí, že Świnoujście leží na 44 ostrovech a trvale obydlené jsou Uznam, Wolin a Karsibór. Všechna navštívená místa tvoří jednu trasu. Čtvrtá průhledná vrstva stále chybí.'),

      ('scene-93-four-layers', 'pl', 'Cztery warstwy', 'W muzeum bohaterowie nakładają trzy karty na oficjalny plan. Maks odkrywa, że przezroczysta obwoluta koperty jest brakującą czwartą warstwą. Złożona mapa ponownie wskazuje Stawę Młyny, tym razem po zmroku.'),
      ('scene-93-four-layers', 'de', 'Vier Schichten', 'Im Museum legen die Freunde drei Karten auf den offiziellen Plan. Maks entdeckt, dass die transparente Hülle des Umschlags die fehlende vierte Schicht ist. Die zusammengesetzte Karte weist erneut zur Stawa Młyny, diesmal nach Einbruch der Dunkelheit.'),
      ('scene-93-four-layers', 'en', 'Four Layers', 'At the museum, the friends place three cards over the official plan. Maks discovers that the transparent envelope sleeve is the missing fourth layer. The assembled map points to Stawa Młyny again, this time after dark.'),
      ('scene-93-four-layers', 'cs', 'Čtyři vrstvy', 'V muzeu položí přátelé tři karty na oficiální plán. Maks zjistí, že průhledný obal obálky je chybějící čtvrtou vrstvou. Složená mapa znovu ukazuje ke Stawě Młyny, tentokrát po setmění.'),

      ('scene-100-course-found', 'pl', 'Kurs odnaleziony', 'Przy Stawie Młyny bohaterowie kończą współczesną grę muzealną. Cztery znaki oznaczają nawigację, pamięć, przyrodę i połączenie wysp, a kompletny zestaw wraca do muzeum. Na odwrocie czekają podpis autora K. i początek drugiej mapy prowadzącej poza zachodnią krawędź obecnej trasy.'),
      ('scene-100-course-found', 'de', 'Der Kurs ist gefunden', 'An der Stawa Młyny beenden die Freunde das moderne Museumsspiel. Die vier Zeichen stehen für Navigation, Erinnerung, Natur und die Verbindung der Inseln, und das vollständige Set kehrt ins Museum zurück. Auf der Rückseite warten die Signatur des Autors K. und der Anfang einer zweiten Karte, die über den westlichen Rand der heutigen Route hinausführt.'),
      ('scene-100-course-found', 'en', 'Course Found', 'At Stawa Młyny, the friends complete the modern museum game. The four signs mean navigation, memory, nature and the links between the islands, and the complete set returns to the museum. On the back are the signature of the author K. and the start of a second map leading beyond the western edge of the current route.'),
      ('scene-100-course-found', 'cs', 'Kurz nalezen', 'U Stawy Młyny přátelé dokončí moderní muzejní hru. Čtyři znaky znamenají navigaci, paměť, přírodu a propojení ostrovů a kompletní sada se vrátí do muzea. Na zadní straně čeká podpis autora K. a začátek druhé mapy vedoucí za západní okraj současné trasy.')
  )
  insert into public.comic_scene_translations (
    scene_id,
    locale,
    title,
    body
  )
  select scene.id, source.locale, source.title, source.body
  from translation_source as source
  join public.comic_scenes as scene
    on scene.code = source.scene_code
  join public.comic_episodes as episode
    on episode.id = scene.episode_id
   and episode.season_id = v_season_id
  on conflict (scene_id, locale) do update
    set title = excluded.title,
        body = excluded.body;

  select episode.id
    into strict v_final_episode_id
  from public.comic_episodes as episode
  where episode.season_id = v_season_id
    and episode.code = 'beat-100-course-found'
    and episode.is_final = true
    and episode.unlock_at_amount = v_target;

  insert into public.comic_collectibles (
    season_id,
    episode_id,
    code,
    artwork_key,
    is_active,
    updated_at
  )
  values (
    v_season_id,
    v_final_episode_id,
    'kompas-44-wysp',
    'comic/season-1/placeholders/kompas-44-wysp',
    true,
    now()
  )
  on conflict (season_id, code) do update
    set episode_id = excluded.episode_id,
        artwork_key = excluded.artwork_key,
        is_active = excluded.is_active,
        updated_at = now()
  returning id into v_collectible_id;

  insert into public.comic_collectible_translations (
    collectible_id,
    locale,
    name,
    description
  )
  values
    (v_collectible_id, 'pl', 'Kompas 44 Wysp', 'Cyfrowa pamiątka za ukończenie Kursu czterech świateł. Nie daje rabatu ani korzyści pieniężnej.'),
    (v_collectible_id, 'de', 'Kompass der 44 Inseln', 'Ein digitales Andenken für den Abschluss des Kurses der vier Lichter. Es gewährt keinen Rabatt und keinen finanziellen Vorteil.'),
    (v_collectible_id, 'en', 'Compass of the 44 Islands', 'A digital keepsake for completing Course of the Four Lights. It provides no discount or financial benefit.'),
    (v_collectible_id, 'cs', 'Kompas 44 ostrovů', 'Digitální památka za dokončení Kurzu čtyř světel. Neposkytuje slevu ani finanční výhodu.')
  on conflict (collectible_id, locale) do update
    set name = excluded.name,
        description = excluded.description;

  insert into public.comic_customer_collectibles (
    customer_id,
    collectible_id,
    source_credit_id,
    earned_at,
    revoked_at
  )
  select
    progress.customer_id,
    v_collectible_id,
    null,
    coalesce(progress.first_completed_at, now()),
    null
  from public.comic_customer_seasons as progress
  where progress.season_id = v_season_id
    and progress.credited_amount >= v_target
  on conflict (customer_id, collectible_id) do update
    set revoked_at = null;

  if (
    select count(*)
    from public.comic_episodes as episode
    where episode.season_id = v_season_id
      and episode.is_active = true
  ) <> 15 then
    raise exception 'Season 1 must contain exactly 15 active episodes';
  end if;

  if exists (
    select 1
    from (
      select
        episode.unlock_at_amount,
        lag(episode.unlock_at_amount) over (
          order by episode.sort_order, episode.id
        ) as previous_threshold
      from public.comic_episodes as episode
      where episode.season_id = v_season_id
        and episode.is_active = true
    ) as ordered
    where ordered.previous_threshold is not null
      and ordered.unlock_at_amount <= ordered.previous_threshold
  ) then
    raise exception 'Season 1 thresholds must be strictly increasing';
  end if;

  if not exists (
    select 1
    from public.comic_episodes as episode
    where episode.season_id = v_season_id
      and episode.sort_order = 0
      and episode.unlock_at_amount = 0
      and episode.is_final = false
  ) or not exists (
    select 1
    from public.comic_episodes as episode
    where episode.season_id = v_season_id
      and episode.sort_order = 140
      and episode.unlock_at_amount = v_target
      and episode.is_final = true
  ) then
    raise exception 'Season 1 first or final unlock is invalid';
  end if;

  if (
    select count(*)
    from public.comic_scenes as scene
    join public.comic_episodes as episode
      on episode.id = scene.episode_id
    where episode.season_id = v_season_id
      and episode.is_active = true
      and scene.is_active = true
  ) <> 15 then
    raise exception 'Season 1 must contain exactly 15 active scenes';
  end if;

  if exists (
    select scene.code
    from public.comic_scenes as scene
    join public.comic_episodes as episode
      on episode.id = scene.episode_id
    where episode.season_id = v_season_id
    group by scene.code
    having count(*) > 1
  ) then
    raise exception 'Season 1 scene codes must be globally unique';
  end if;

  if exists (
    select episode.id
    from public.comic_episodes as episode
    left join public.comic_episode_translations as translation
      on translation.episode_id = episode.id
     and translation.locale in ('pl', 'de', 'en', 'cs')
    where episode.season_id = v_season_id
    group by episode.id
    having count(translation.locale) <> 4
  ) or exists (
    select scene.id
    from public.comic_scenes as scene
    join public.comic_episodes as episode
      on episode.id = scene.episode_id
    left join public.comic_scene_translations as translation
      on translation.scene_id = scene.id
     and translation.locale in ('pl', 'de', 'en', 'cs')
    where episode.season_id = v_season_id
    group by scene.id
    having count(translation.locale) <> 4
  ) then
    raise exception 'Every Season 1 episode and scene requires four translations';
  end if;

  if exists (
    select 1
    from public.comic_scene_translations as translation
    join public.comic_scenes as scene
      on scene.id = translation.scene_id
    join public.comic_episodes as episode
      on episode.id = scene.episode_id
    where episode.season_id = v_season_id
      and concat_ws(' ', translation.title, translation.body)
          ~* '(<[^>]*>|javascript:|onerror[[:space:]]*=|onload[[:space:]]*=)'
  ) then
    raise exception 'Season 1 translations contain unsafe markup';
  end if;

  if exists (
    select 1
    from public.comic_scene_translations as translation
    join public.comic_scenes as scene
      on scene.id = translation.scene_id
    join public.comic_episodes as episode
      on episode.id = scene.episode_id
    where episode.season_id = v_season_id
      and (
        char_length(translation.title) > 80
        or char_length(translation.body) > 700
      )
  ) then
    raise exception 'Season 1 text exceeds mobile content limits';
  end if;
end;
$migration$;
