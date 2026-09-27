(() => {
  'use strict';

  const root = window.comicLongformV1;
  if (!root?.episodes) return;

  const L = (pl, de, en, cs) => ({ pl, de, en, cs });
  const E = root.episodes;

  E['04'] = {
    codes:['beat-21-park-as-map'],
    titles:['Park jak mapa','Der Park als Karte','The Park as a Map','Park jako mapa'],
    panels:[
      {blocks:[
        {speaker:'maks',text:L('No dobrze. Którą alejkę wybieramy?','Also gut. Welchen Weg nehmen wir?','All right. Which path do we take?','Tak dobře. Kterou cestu vybereme?')},
        {speaker:'maja',text:L('Tę, którą potrafimy uzasadnić.','Die, die wir begründen können.','The one we can justify.','Tu, kterou dokážeme zdůvodnit.')},
        {speaker:'maks',text:L('Czyli żadną.','Also keine.','So none of them.','Takže žádnou.')},
        {speaker:'lea',text:L('Chwileczkę. My nie szukamy właściwej alejki. Szukamy układu między alejkami.','Moment. Wir suchen nicht den richtigen Weg. Wir suchen das Muster zwischen den Wegen.','Wait. We are not looking for the right path. We are looking for the pattern between the paths.','Počkejte. Nehledáme správnou cestu. Hledáme vzor mezi cestami.')},
        {type:'narration',text:L('Maks wybiera ławkę po lewej, pewny, że jeden łuk na planie pasuje idealnie.','Maks wählt selbstsicher eine Bank links, weil ein einzelner Bogen auf dem Plan perfekt passt.','Maks confidently picks a bench on the left because one curve on the plan seems perfect.','Maks sebejistě vybere lavičku vlevo, protože jeden oblouk na plánu vypadá dokonale.')},
        {speaker:'lea',text:L('Porównałeś jeden fragment i zignorowałeś resztę.','Du hast ein Detail verglichen und den Rest ignoriert.','You compared one detail and ignored the rest.','Porovnal jsi jeden detail a zbytek ignoroval.')}
      ]},
      {blocks:[
        {type:'narration',text:L('Frytka ląduje na ławce po przeciwnej stronie i natychmiast znajduje okruszki.','Frytka landet auf der Bank gegenüber und findet sofort Krümel.','Frytka lands on the opposite bench and immediately finds crumbs.','Frytka přistane na lavičce naproti a okamžitě najde drobky.')},
        {speaker:'maks',text:L('Widzicie? Frytka wybrała.','Seht ihr? Frytka hat gewählt.','See? Frytka chose.','Vidíte? Frytka vybrala.')},
        {speaker:'maja',text:L('Frytka wybrała pieczywo.','Frytka hat Brot gewählt.','Frytka chose bread.','Frytka vybrala pečivo.')},
        {speaker:'lea',text:L('Już wiem. Mapa nie prowadzi przez park. Sam park jest częścią mapy.','Jetzt weiß ich es. Die Karte führt nicht durch den Park. Der Park selbst ist Teil der Karte.','I have it. The map does not lead through the park. The park itself is part of the map.','Už to mám. Mapa nevede parkem. Samotný park je součást mapy.')},
        {type:'narration',text:L('Lea nakłada przezroczysty arkusz na publiczny plan i obraca go. Sieć alejek zaczyna pokrywać się z liniami.','Lea legt das transparente Blatt auf einen öffentlichen Plan und dreht es. Das Wegenetz beginnt mit den Linien übereinzustimmen.','Lea overlays the transparent sheet on a public map and rotates it. The network of paths begins to match the lines.','Lea položí průhledný list na veřejný plán a otočí ho. Síť cest se začne shodovat s čarami.')},
        {speaker:'maja',text:L('W centrum pojawia się okrągły kształt.','In der Mitte erscheint eine runde Form.','A round shape appears in the centre.','Uprostřed se objeví kulatý tvar.')}
      ]},
      {blocks:[
        {speaker:'maks',text:L('Okrągły skarb?','Ein runder Schatz?','A round treasure?','Kulatý poklad?')},
        {speaker:'lea',text:L('Raczej okrągła budowla. Fort Anioła.','Eher ein rundes Bauwerk. Fort Anioła.','More likely a round building. Fort Anioła.','Spíš kulatá stavba. Fort Anioła.')},
        {speaker:'maks',text:L('A ten znak K też prowadzi do fortu?','Und führt das K-Zeichen auch zum Fort?','Does that K mark lead to the fort too?','A vede ten znak K také k pevnosti?')},
        {speaker:'lea',text:L('Nie nazywaj go jeszcze K. Nadal może być tylko przecięciem linii.','Nenn es noch nicht K. Es kann immer noch nur eine Linienkreuzung sein.','Do not call it K yet. It could still just be crossing lines.','Ještě tomu neříkej K. Pořád to může být jen křížení čar.')},
        {speaker:'maja',text:L('Czyli mamy następny punkt i nadal żadnego prawa do zgadywania.','Also haben wir den nächsten Punkt und immer noch kein Recht zu raten.','So we have the next point and still no licence to guess.','Takže máme další bod a pořád žádné právo hádat.')},
        {type:'narration',text:L('Wzór wskazuje Fort Anioła. Im więcej miejsc pasuje do mapy, tym bardziej wygląda ona na celowo zaprojektowaną trasę.','Das Muster weist zum Fort Anioła. Je mehr Orte passen, desto stärker wirkt die Karte wie eine bewusst geplante Route.','The pattern points to Fort Anioła. The more places fit, the more the map looks like a deliberately designed route.','Vzor ukazuje na Fort Anioła. Čím víc míst sedí, tím víc mapa působí jako záměrně navržená trasa.')}
      ]}
    ],
    teaser:L('Wzór wskazuje Fort Anioła. Czy fort da odpowiedź — czy tylko następne pytanie?','Das Muster weist zum Fort Anioła. Gibt das Fort eine Antwort – oder nur die nächste Frage?','The pattern points to Fort Anioła. Will the fort give an answer—or only the next question?','Vzor ukazuje na Fort Anioła. Dá pevnost odpověď — nebo jen další otázku?')
  };

  E['05'] = {
    codes:['beat-29-round-fort'],
    titles:['Okrągły fort','Das runde Fort','The Round Fort','Kruhová pevnost'],
    panels:[
      {blocks:[
        {type:'narration',text:L('Przy Fort Anioła Lea znów rozkłada trzy całe przezroczyste arkusze.','Am Fort Anioła legt Lea wieder die drei vollständigen transparenten Blätter aus.','At Fort Anioła, Lea lays out the three complete transparent sheets again.','U Fortu Anioła Lea znovu rozloží tři celé průhledné listy.')},
        {speaker:'lea',text:L('Okrąg pasuje niemal idealnie.','Der Kreis passt fast perfekt.','The circle matches almost perfectly.','Kruh sedí téměř dokonale.')},
        {speaker:'maks',text:L('„Niemal” to ulubione słowo tej mapy.','„Fast“ ist das Lieblingswort dieser Karte.','“Almost” is this map’s favourite word.','„Téměř“ je oblíbené slovo téhle mapy.')},
        {speaker:'maja',text:L('Bo mapa nie ma obowiązku dawać odpowiedzi od razu.','Weil die Karte nicht verpflichtet ist, sofort Antworten zu geben.','Because the map does not owe us an immediate answer.','Protože mapa nemusí dávat odpověď hned.')},
        {speaker:'maks',text:L('Byłoby uprzejmie.','Wäre aber höflich.','It would be polite.','Bylo by to slušné.')}
      ]},
      {blocks:[
        {speaker:'maks',text:L('A jeśli ta linia pokazuje tajne wejście?','Und wenn diese Linie einen Geheimeingang zeigt?','What if that line points to a secret entrance?','Co když ta čára ukazuje tajný vchod?')},
        {speaker:'maja',text:L('Nie. Niczego nie szukamy w murach i niczego nie dotykamy.','Nein. Wir suchen nichts in den Mauern und fassen nichts an.','No. We are not searching walls and we are not touching anything.','Ne. Ve zdech nic nehledáme a ničeho se nedotýkáme.')},
        {speaker:'lea',text:L('Poza tym to nie wygląda jak plan wnętrza. To znowu relacja między kształtami.','Außerdem sieht es nicht wie ein Innenplan aus. Es geht wieder um Beziehungen zwischen Formen.','Besides, it does not look like a floor plan. It is about relationships between shapes again.','Navíc to nevypadá jako plán interiéru. Znovu jde o vztahy mezi tvary.')},
        {type:'narration',text:L('Lea zmienia kolejność trzech arkuszy. Okrąg staje się dokładny, ale jedna z linii nadal prowadzi w nieoczekiwanym kierunku.','Lea ändert die Reihenfolge der drei Blätter. Der Kreis wird exakt, doch eine Linie führt weiterhin unerwartet weiter.','Lea changes the order of the three sheets. The circle becomes exact, but one line still heads somewhere unexpected.','Lea změní pořadí tří listů. Kruh se zpřesní, ale jedna čára dál míří nečekaným směrem.')},
        {speaker:'lea',text:L('Mamy właściwe arkusze, ale chyba nadal nie w samych arkuszach.','Wir haben die richtigen Blätter, aber das Problem liegt offenbar nicht in den Blättern selbst.','We have the right sheets, but the problem does not seem to be the sheets themselves.','Máme správné listy, ale problém zřejmě není v samotných listech.')}
      ]},
      {blocks:[
        {speaker:'maja',text:L('Do tej pory każda dziwność okazywała się wskazówką.','Bisher wurde jede Merkwürdigkeit zu einem Hinweis.','So far, every oddity has turned into a clue.','Zatím se každá zvláštnost změnila ve stopu.')},
        {speaker:'lea',text:L('Może mamy dobry materiał, ale zły sposób odczytu.','Vielleicht haben wir das richtige Material, aber die falsche Lesemethode.','Maybe we have the right material but the wrong way of reading it.','Možná máme správný materiál, ale špatný způsob čtení.')},
        {speaker:'maks',text:L('Czyli mapa znowu jest od nas mądrzejsza.','Die Karte ist also wieder klüger als wir.','So the map is smarter than us again.','Takže mapa je zase chytřejší než my.')},
        {speaker:'lea',text:L('Ten mały symbol powtarza się przy okręgu. I nie wygląda historycznie.','Dieses kleine Zeichen wiederholt sich am Kreis. Und es sieht nicht historisch aus.','That small symbol repeats beside the circle. And it does not look historical.','Ten malý znak se u kruhu opakuje. A nevypadá historicky.')},
        {speaker:'maja',text:L('Czyli ktoś dodał go współcześnie.','Dann hat ihn jemand in neuerer Zeit hinzugefügt.','So someone added it in modern times.','Takže ho někdo přidal v moderní době.')},
        {speaker:'lea',text:L('I prowadzi do Muzeum Rybołówstwa Morskiego.','Und er führt zum Museum für Meeresfischerei.','And it leads to the Museum of Sea Fishery.','A vede do Muzea mořského rybolovu.')},
        {type:'narration',text:L('Trzy arkusze znów wyjaśniają prawie wszystko — ale nie wszystko.','Die drei Blätter erklären wieder fast alles – aber eben nicht alles.','The three sheets explain almost everything again—but not everything.','Tři listy znovu vysvětlují téměř všechno — ale ne všechno.')}
      ]}
    ],
    teaser:L('Następny adres to Muzeum Rybołówstwa Morskiego. Co łączy współczesną zagadkę ze starym muzeum?','Die nächste Adresse ist das Museum für Meeresfischerei. Was verbindet das moderne Rätsel mit dem alten Museum?','The next stop is the Museum of Sea Fishery. What connects the modern mystery with the old museum?','Další zastávka je Muzeum mořského rybolovu. Co spojuje současnou záhadu se starým muzeem?')
  };

  E['06'] = {
    codes:['beat-36-new-mystery-old-museum'],
    titles:['Nowa zagadka w starym muzeum','Ein neues Rätsel im alten Museum','A New Mystery in the Old Museum','Nová záhada ve starém muzeu'],
    panels:[
      {blocks:[
        {type:'narration',text:L('W muzeum nie szukają skrytek. Porównują tylko własne arkusze z dostępnymi informacjami i ekspozycją.','Im Museum suchen sie keine Verstecke. Sie vergleichen nur ihre eigenen Blätter mit öffentlich zugänglichen Informationen und der Ausstellung.','At the museum they search for no hiding places. They only compare their own sheets with public information and the displays.','V muzeu nehledají žádné skrýše. Jen porovnávají své listy s veřejnými informacemi a expozicí.')},
        {speaker:'maks',text:L('Byłoby prościej, gdyby mapa po prostu napisała „idź tutaj”.','Es wäre einfacher, wenn die Karte einfach „geh hierhin“ sagen würde.','It would be easier if the map simply said “go here”.','Bylo by jednodušší, kdyby mapa prostě napsala „jdi sem“.')},
        {speaker:'lea',text:L('Wtedy byłaby instrukcją, nie zagadką.','Dann wäre sie eine Anleitung und kein Rätsel.','Then it would be instructions, not a mystery.','Pak by to byl návod, ne záhada.')},
        {speaker:'maja',text:L('I nie ma gwarancji, że Maks przeczytałby instrukcję.','Und es gibt keine Garantie, dass Maks die Anleitung lesen würde.','And there is no guarantee Maks would read the instructions.','A není jisté, že by Maks návod vůbec četl.')},
        {speaker:'maks',text:L('Gdyby była dużą czcionką.','Wenn die Schrift groß genug wäre.','If the font were big enough.','Kdyby byla velkým písmem.')}
      ]},
      {blocks:[
        {speaker:'lea',text:L('Te arkusze są zdecydowanie współczesne. Ktoś zaprojektował je tak, żeby łączyły różne części miasta.','Diese Blätter sind eindeutig modern. Jemand hat sie so entworfen, dass sie verschiedene Teile der Stadt verbinden.','These sheets are clearly modern. Someone designed them to connect different parts of the city.','Tyhle listy jsou jednoznačně současné. Někdo je navrhl tak, aby spojovaly různé části města.')},
        {speaker:'maja',text:L('Stare miejsca, nowe sposoby orientacji, przyroda.','Alte Orte, neue Orientierung, Natur.','Old places, new ways of navigating, nature.','Stará místa, nové způsoby orientace, příroda.')},
        {speaker:'maks',text:L('I mewa.','Und eine Möwe.','And a gull.','A racek.')},
        {speaker:'maja',text:L('Mewy nikt nie zamawiał.','Die Möwe hat niemand bestellt.','Nobody ordered the gull.','Racka si nikdo neobjednal.')},
        {speaker:'lea',text:L('Światło, woda, ptak, droga. Cztery symbole zamiast jednego języka.','Licht, Wasser, Vogel, Weg. Vier Symbole statt einer einzigen Sprache.','Light, water, bird, route. Four symbols instead of one language.','Světlo, voda, pták, cesta. Čtyři symboly místo jednoho jazyka.')},
        {speaker:'lea',text:L('Ale układ nadal nie wyjaśnia wszystkich oznaczeń. Może potrzebujemy innego sposobu odczytu.','Aber das Muster erklärt noch nicht alle Markierungen. Vielleicht brauchen wir eine andere Lesemethode.','But the pattern still does not explain every marking. Maybe we need a different way to read it.','Ale vzor pořád nevysvětluje všechny značky. Možná potřebujeme jiný způsob čtení.')}
      ]},
      {blocks:[
        {type:'narration',text:L('Jedna z linii powtarza się przy symbolu prowadzącym w stronę Świny.','Eine Linie wiederholt sich bei einem Symbol, das in Richtung Świna weist.','One line repeats beside a symbol pointing toward the Świna.','Jedna čára se opakuje u symbolu, který míří ke Świně.')},
        {speaker:'lea',text:L('Ten symbol wskazuje drugi brzeg.','Dieses Symbol weist auf die andere Seite.','This symbol points to the other bank.','Ten symbol ukazuje na druhý břeh.')},
        {speaker:'maks',text:L('Czyli następny trop czeka po drugiej stronie.','Dann wartet der nächste Hinweis auf der anderen Seite.','So the next clue is waiting across the river.','Takže další stopa čeká na druhé straně.')},
        {speaker:'maja',text:L('Prawdopodobnie. Ale bardziej interesuje mnie, dlaczego autor tak dobrze przewidział sposób, w jaki będziemy myśleć.','Wahrscheinlich. Mich interessiert mehr, warum der Autor so gut vorhergesehen hat, wie wir denken werden.','Probably. I am more interested in why the author predicted so well how we would think.','Pravděpodobně. Víc mě zajímá, proč autor tak dobře předvídal, jak budeme přemýšlet.')},
        {speaker:'lea',text:L('Może ta trasa została zbudowana właśnie po to, żeby ktoś przechodził przez kolejne błędne wersje.','Vielleicht wurde die Route genau dafür gebaut, dass jemand nacheinander falsche Erklärungen verwirft.','Maybe the route was designed precisely so someone would work through the wrong explanations one by one.','Možná byla trasa navržena právě tak, aby někdo postupně zavrhoval chybné výklady.')},
        {type:'narration',text:L('Następny ruch prowadzi przez Świnę — i zmienia perspektywę całej zagadki.','Der nächste Schritt führt über die Świna – und verändert die Perspektive auf das ganze Rätsel.','The next move crosses the Świna—and changes the perspective on the whole mystery.','Další krok vede přes Świnu — a změní pohled na celou záhadu.')}
      ]}
    ],
    teaser:L('Cztery symbole prowadzą przez Świnę. Co zmieni perspektywa po drugiej stronie?','Vier Symbole führen über die Świna. Was verändert die Perspektive auf der anderen Seite?','Four symbols lead across the Świna. What changes when the route is seen from the other side?','Čtyři symboly vedou přes Świnu. Co změní pohled z druhé strany?')
  };

  E['07'] = {
    codes:['beat-43-across-swina'],
    titles:['Przez Świnę','Über die Świna','Across the Świna','Přes Świnu'],
    panels:[
      {blocks:[
        {type:'narration',text:L('Przeprawiają się przez Świnę dozwoloną publiczną trasą i obserwują port z drugiej strony.','Sie überqueren die Świna auf einer erlaubten öffentlichen Route und betrachten den Hafen von der anderen Seite.','They cross the Świna by an authorised public route and look back at the port from the other side.','Překročí Świnu po povolené veřejné trase a dívají se na přístav z druhé strany.')},
        {speaker:'maks',text:L('Dziwnie. Idziemy tam, na co przed chwilą patrzyliśmy stąd.','Seltsam. Wir gehen dorthin, worauf wir eben von hier aus geschaut haben.','Strange. We are walking into the place we were just looking at from over there.','Zvláštní. Jdeme tam, na co jsme se před chvílí dívali odsud.')},
        {speaker:'lea',text:L('Właśnie o to chodzi. Zmienia się punkt widzenia.','Genau darum geht es. Der Blickwinkel ändert sich.','Exactly. The viewpoint changes.','Právě o to jde. Mění se úhel pohledu.')},
        {speaker:'maja',text:L('I trzymaj mapę mocniej.','Und halt die Karte fester.','And hold the map tighter.','A drž mapu pevněji.')},
        {type:'narration',text:L('Frytka próbuje złapać róg arkusza. Maks przyciąga go do siebie w ostatniej chwili.','Frytka schnappt nach einer Ecke des Blattes. Maks zieht es im letzten Moment weg.','Frytka grabs for the corner of a sheet. Maks pulls it away at the last second.','Frytka se pokusí chytit roh listu. Maks ho na poslední chvíli stáhne.')}
      ]},
      {blocks:[
        {speaker:'maks',text:L('Ona naprawdę uważa tę mapę za przekąskę.','Sie hält die Karte wirklich für einen Snack.','She really does think the map is a snack.','Ona tu mapu opravdu považuje za svačinu.')},
        {speaker:'maja',text:L('Mewa sobie poradzi. Mapę trzymaj.','Die Möwe kommt klar. Halt die Karte.','The gull will be fine. Hold the map.','Racek si poradí. Drž mapu.')},
        {type:'narration',text:L('Promień słońca przechodzi przez przezroczysty arkusz pod nowym kątem.','Ein Sonnenstrahl fällt aus einem neuen Winkel durch das transparente Blatt.','A beam of sunlight passes through the transparent sheet at a new angle.','Sluneční paprsek projde průhledným listem pod novým úhlem.')},
        {speaker:'lea',text:L('Czekajcie. To nie woda. Tym razem światło.','Wartet. Nicht Wasser. Diesmal Licht.','Wait. Not water. This time it is light.','Počkejte. Ne voda. Tentokrát světlo.')},
        {speaker:'maja',text:L('Pierwszy z czterech symboli.','Der erste der vier Symbole.','The first of the four symbols.','První ze čtyř symbolů.')},
        {speaker:'lea',text:L('Z tamtego brzegu kąt był zły. Stąd jedna linia trafia dokładnie w kierunek latarni.','Vom anderen Ufer war der Winkel falsch. Von hier trifft eine Linie genau die Richtung des Leuchtturms.','From the other bank the angle was wrong. From here one line points exactly toward the lighthouse.','Z druhého břehu byl úhel špatný. Odtud jedna čára míří přesně k majáku.')}
      ]},
      {blocks:[
        {speaker:'maks',text:L('Czyli część mapy działa tylko z odpowiedniego miejsca?','Funktioniert ein Teil der Karte also nur vom richtigen Ort aus?','So part of the map only works from the right place?','Takže část mapy funguje jen ze správného místa?')},
        {speaker:'lea',text:L('Albo pod odpowiednim kątem.','Oder im richtigen Winkel.','Or at the right angle.','Nebo pod správným úhlem.')},
        {speaker:'maja',text:L('Szukamy reguły, nie czekamy na cud pogodowy.','Wir suchen eine Regel und warten nicht auf ein Wetterwunder.','We look for a rule, not a weather miracle.','Hledáme pravidlo, ne zázrak počasí.')},
        {speaker:'lea',text:L('Ktoś, kto to projektował, musiał wiedzieć dokładnie, skąd patrzeć.','Wer das entworfen hat, musste genau wissen, von wo man schauen soll.','Whoever designed this had to know exactly where to stand.','Kdo to navrhl, musel přesně vědět, odkud se dívat.')},
        {speaker:'maks',text:L('Czyli przeszedł tę trasę wcześniej.','Dann ist er diese Route schon vorher gegangen.','So they walked this route before us.','Tak tu trasu prošel už před námi.')},
        {speaker:'maja',text:L('Albo ją ułożył.','Oder hat sie geplant.','Or designed it.','Nebo ji navrhl.')}
      ]}
    ],
    teaser:L('Światło wskazuje latarnię. Trasa coraz bardziej wygląda na zaprojektowaną krok po kroku.','Das Licht weist zum Leuchtturm. Die Route wirkt immer mehr Schritt für Schritt geplant.','The light points to the lighthouse. The route increasingly looks designed step by step.','Světlo ukazuje k majáku. Trasa stále víc působí jako plánovaná krok za krokem.')
  };

  E['08'] = {
    codes:['beat-50-view-from-above'],
    titles:['Widok z góry','Der Blick von oben','The View from Above','Pohled shora'],
    panels:[
      {blocks:[
        {type:'narration',text:L('Z dostępnego dla zwiedzających punktu widokowego morze, Świna, port i wyspy mieszczą się w jednym obrazie.','Vom für Besucher zugänglichen Aussichtspunkt passen Meer, Świna, Hafen und Inseln in ein einziges Bild.','From the visitor viewpoint, the sea, the Świna, the port and the islands fit into one view.','Z návštěvnické vyhlídky se moře, Świna, přístav a ostrovy vejdou do jednoho pohledu.')},
        {speaker:'maks',text:L('Teraz miasto naprawdę wygląda jak mapa.','Jetzt sieht die Stadt wirklich wie eine Karte aus.','Now the city really does look like a map.','Teď město opravdu vypadá jako mapa.')},
        {speaker:'lea',text:L('Bo pierwszy raz widzisz połączenia, a nie pojedyncze miejsca.','Weil du zum ersten Mal Verbindungen siehst und nicht nur einzelne Orte.','Because for the first time you can see connections instead of separate places.','Protože poprvé vidíš spojení, ne jednotlivá místa.')},
        {speaker:'maja',text:L('To może być najważniejsza zasada całej zagadki.','Das könnte die wichtigste Regel des ganzen Rätsels sein.','That may be the most important rule in the whole mystery.','To může být nejdůležitější pravidlo celé záhady.')}
      ]},
      {blocks:[
        {type:'narration',text:L('Lea trzyma trzy przezroczyste arkusze przed panoramą i obraca je zgodnie z linią brzegu.','Lea hält die drei transparenten Blätter vor die Aussicht und richtet sie an der Küstenlinie aus.','Lea holds the three transparent sheets against the panorama and rotates them along the shoreline.','Lea drží tři průhledné listy proti panoramatu a otáčí je podle pobřeží.')},
        {speaker:'lea',text:L('Linie przestały się rozjeżdżać.','Die Linien laufen nicht mehr auseinander.','The lines have stopped drifting apart.','Čáry se přestaly rozcházet.')},
        {speaker:'maks',text:L('Mogę ustawić Frytkę pod tym samym kątem.','Ich kann Frytka im selben Winkel ausrichten.','I can align Frytka at the same angle.','Můžu Frytku natočit do stejného úhlu.')},
        {speaker:'maja',text:L('Mapę wystarczy.','Die Karte reicht.','The map will do.','Mapa stačí.')},
        {speaker:'lea',text:L('Cztery kierunki zbiegają się przy Fort Gerharda.','Vier Richtungen treffen sich beim Fort Gerharda.','Four directions meet at Fort Gerharda.','Čtyři směry se sbíhají u Fortu Gerharda.')}
      ]},
      {blocks:[
        {speaker:'maks',text:L('Jeszcze jeden fort.','Noch ein Fort.','Another fort.','Další pevnost.')},
        {speaker:'maja',text:L('Pierwszy dał nam kształt. Ten może dać funkcję.','Das erste gab uns eine Form. Dieses könnte uns eine Funktion geben.','The first gave us a shape. This one may give us a function.','První nám dal tvar. Tenhle nám možná dá funkci.')},
        {speaker:'lea',text:L('I zauważcie coś jeszcze: mapa nie prowadzi najkrótszą drogą.','Und noch etwas: Die Karte führt nicht auf dem kürzesten Weg.','And notice something else: the map does not take the shortest route.','A ještě něco: mapa nevede nejkratší cestou.')},
        {speaker:'maks',text:L('Czyli celem nie jest dotrzeć szybko.','Dann geht es nicht darum, schnell anzukommen.','So the goal is not to arrive quickly.','Takže cílem není dorazit rychle.')},
        {speaker:'lea',text:L('Tylko zobaczyć miasto w określony sposób.','Sondern die Stadt auf eine bestimmte Weise zu sehen.','It is to see the city in a particular way.','Ale vidět město určitým způsobem.')},
        {type:'narration',text:L('Fort Gerharda staje się następnym węzłem. Zagadka zaczyna wyglądać bardziej jak lekcja patrzenia niż polowanie na skarb.','Fort Gerharda wird zum nächsten Knotenpunkt. Das Rätsel wirkt immer mehr wie eine Schule des Sehens statt wie eine Schatzsuche.','Fort Gerharda becomes the next node. The mystery is starting to feel more like a lesson in seeing than a treasure hunt.','Fort Gerharda se stává dalším uzlem. Záhada začíná připomínat spíš lekci pozorování než lov pokladu.')}
      ]}
    ],
    teaser:L('Cztery linie prowadzą do Fortu Gerharda. Jakiej odpowiedzi ma udzielić fort?','Vier Linien führen zum Fort Gerharda. Welche Antwort soll das Fort geben?','Four lines lead to Fort Gerharda. What answer is the fort supposed to give?','Čtyři čáry vedou k Fortu Gerharda. Jakou odpověď má pevnost dát?')
  };

  E['09'] = {
    codes:['beat-57-fort-answer'],
    titles:['Odpowiedź fortu','Die Antwort des Forts','The Fort’s Answer','Odpověď pevnosti'],
    panels:[
      {blocks:[
        {type:'narration',text:L('Podczas zorganizowanego zwiedzania zespół poznaje rolę fortu przy wejściu do portu.','Bei einer organisierten Besichtigung lernt das Team die Rolle des Forts am Hafeneingang kennen.','During an organised visit, the team learns about the fort’s role at the harbour entrance.','Během organizované návštěvy se tým dozví o roli pevnosti u vjezdu do přístavu.')},
        {speaker:'maks',text:L('Czyli był strażnikiem wejścia?','Also war es ein Wächter am Eingang?','So it was a gatekeeper?','Takže byl strážcem vjezdu?')},
        {speaker:'maja',text:L('W bardzo uproszczonym sensie — tak.','Sehr vereinfacht gesagt – ja.','In a very simplified sense—yes.','Velmi zjednodušeně — ano.')},
        {speaker:'lea',text:L('I jego układ pasuje do następnego znaku na karcie.','Und sein Aufbau passt zum nächsten Zeichen auf der Karte.','And its layout matches the next mark on the map.','A jeho uspořádání odpovídá dalšímu znaku na mapě.')}
      ]},
      {blocks:[
        {speaker:'lea',text:L('Ten symbol pasuje do drukowanej zagadki z naszego zestawu.','Dieses Symbol passt zu einem gedruckten Rätsel aus unserem Set.','This symbol matches a printed riddle from our set.','Ten symbol odpovídá vytištěné hádance z naší sady.')},
        {speaker:'maks',text:L('Wreszcie słowa.','Endlich Wörter.','Finally, words.','Konečně slova.')},
        {speaker:'maja',text:L('Czytaj do końca.','Lies bis zum Ende.','Read all of it.','Dočti to celé.')},
        {speaker:'maks',text:L('„Miasto, którego nie widać z ulicy”. Jak można nie widzieć miasta?','„Eine Stadt, die man von der Straße nicht sieht.“ Wie kann man eine Stadt nicht sehen?','“A city you cannot see from the street.” How can you not see a city?','„Město, které z ulice není vidět.“ Jak může být město neviditelné?')},
        {speaker:'lea',text:L('Jeśli jest pod nami — można.','Wenn sie unter uns liegt – sehr leicht.','If it is underneath us—you can.','Pokud je pod námi — snadno.')},
        {speaker:'maja',text:L('Podziemne Miasto.','Die Unterirdische Stadt.','The Underground City.','Podzemní město.')}
      ]},
      {blocks:[
        {speaker:'maks',text:L('Mamy światło, wodę, fort i teraz miasto pod ziemią.','Wir haben Licht, Wasser, ein Fort und jetzt eine Stadt unter der Erde.','We have light, water, a fort and now a city underground.','Máme světlo, vodu, pevnost a teď město pod zemí.')},
        {speaker:'lea',text:L('Powtarzają się nie miejsca, tylko sposoby odczytu.','Nicht die Orte wiederholen sich, sondern die Arten zu lesen.','What repeats is not the places but the ways of reading them.','Neopakují se místa, ale způsoby čtení.')},
        {speaker:'maja',text:L('Nie wyprzedzajmy dowodów.','Gehen wir den Beweisen nicht voraus.','Let us not outrun the evidence.','Nepředbíhejme důkazy.')},
        {speaker:'lea',text:L('Kilka oznaczeń nadal nie reaguje ani na kształt, ani na kierunek.','Einige Markierungen reagieren immer noch weder auf Form noch Richtung.','Several markings still respond to neither shape nor direction.','Několik značek stále nereaguje ani na tvar, ani na směr.')},
        {speaker:'maks',text:L('Czyli znowu idziemy tam, gdzie nie wiemy, czego szukamy.','Also gehen wir wieder irgendwohin, ohne zu wissen, wonach wir suchen.','So once again we are going somewhere without knowing what we are looking for.','Takže zase jdeme někam, aniž víme, co hledáme.')},
        {type:'narration',text:L('Pod ziemią mają znaleźć nie nowy przedmiot, lecz nową regułę.','Unter der Erde sollen sie keinen neuen Gegenstand, sondern eine neue Regel finden.','Underground, they are looking not for a new object but for a new rule.','Pod zemí nemají najít nový předmět, ale nové pravidlo.')}
      ]}
    ],
    teaser:L('Wskazówka prowadzi do Podziemnego Miasta. Jaką nową zasadę odczytu pokaże mapa pod ziemią?','Der Hinweis führt zur Unterirdischen Stadt. Welche neue Leseregel zeigt die Karte unter der Erde?','The clue leads to the Underground City. What new reading rule will the map reveal underground?','Nápověda vede do Podzemního města. Jaké nové pravidlo čtení ukáže mapa pod zemí?')
  };

  E['10'] = {
    codes:['beat-64-beneath-dunes'],
    titles:['Pod wydmami','Unter den Dünen','Beneath the Dunes','Pod dunami'],
    panels:[
      {blocks:[
        {speaker:'maja',text:L('Tutaj trzymamy się wyłącznie oficjalnej trasy z przewodnikiem.','Hier bleiben wir ausschließlich auf der offiziellen Route mit Guide.','Here we stay strictly on the official guided route.','Tady zůstáváme výhradně na oficiální trase s průvodcem.')},
        {speaker:'maks',text:L('Niczego nie dotykam.','Ich fasse nichts an.','I am touching nothing.','Na nic nesahám.')},
        {speaker:'lea',text:L('Jeszcze nawet nie zdążyłeś.','Du hattest noch nicht einmal Zeit dazu.','You have not even had time yet.','Ještě jsi ani neměl čas.')},
        {speaker:'maks',text:L('Ale już jestem zdyscyplinowany.','Aber ich bin schon diszipliniert.','But I am already being disciplined.','Ale už jsem disciplinovaný.')}
      ]},
      {blocks:[
        {type:'narration',text:L('Odbicie światła z latarki przechodzi między dwiema liniami na przezroczystym arkuszu.','Die Spiegelung einer Lampe läuft zwischen zwei Linien auf dem transparenten Blatt.','A reflected torch beam passes between two lines on the transparent sheet.','Odraz světla z baterky projde mezi dvěma čarami na průhledném listu.')},
        {speaker:'maks',text:L('Światło trafiło dokładnie między nie!','Das Licht ist genau dazwischen gefallen!','The light hit exactly between them!','Světlo dopadlo přesně mezi ně!')},
        {speaker:'lea',text:L('Nie samo światło. Odbicie. I właśnie ono wizualnie łączy dwie linie.','Nicht das Licht selbst. Die Spiegelung. Und genau die verbindet die beiden Linien optisch.','Not the light itself. The reflection. That is what visually connects the two lines.','Ne samotné světlo. Odraz. A právě ten vizuálně spojí dvě čáry.')},
        {speaker:'maja',text:L('Czyli kolejną regułą jest odbicie.','Dann ist die nächste Regel Spiegelung.','So the next rule is reflection.','Takže další pravidlo je odraz.')},
        {speaker:'maks',text:L('Ta mapa naprawdę wymaga repertuaru sztuczek.','Diese Karte verlangt wirklich ein ganzes Repertoire an Tricks.','This map really does require a whole bag of tricks.','Tahle mapa opravdu vyžaduje celý repertoár triků.')}
      ]},
      {blocks:[
        {speaker:'lea',text:L('Po połączeniu linii dalszy ciąg biegnie pod Świną.','Wenn die Linien verbunden sind, läuft die Fortsetzung unter der Świna weiter.','Once the lines connect, the route continues beneath the Świna.','Když se čáry propojí, pokračování vede pod Świnou.')},
        {speaker:'maks',text:L('Pod wodą? To którędy mamy iść?','Unter Wasser? Wo sollen wir dann lang?','Underwater? So how are we supposed to go there?','Pod vodou? Tak kudy máme jít?')},
        {speaker:'maja',text:L('Mapa pokazuje połączenie. Nie zawsze dosłowną ścieżkę.','Die Karte zeigt eine Verbindung. Nicht immer einen wörtlichen Weg.','The map is showing a connection, not always a literal path.','Mapa ukazuje spojení, ne vždy doslovnou cestu.')},
        {speaker:'lea',text:L('Co łączy brzegi pod Świną? Tunel.','Was verbindet die Ufer unter der Świna? Der Tunnel.','What connects the banks under the Świna? The tunnel.','Co spojuje břehy pod Świnou? Tunel.')},
        {speaker:'maks',text:L('Czyli autor miesza stare miejsca z nowymi rozwiązaniami.','Der Autor mischt also alte Orte mit neuen Lösungen.','So the author is mixing old places with modern solutions.','Takže autor míchá stará místa s moderními řešeními.')},
        {speaker:'maja',text:L('A pytanie „kiedy” zaczyna być prawie tak ważne jak „kto”.','Und die Frage „wann“ wird fast so wichtig wie „wer“.','And “when” is becoming almost as important as “who”.','A otázka „kdy“ začíná být skoro stejně důležitá jako „kdo“.')}
      ]}
    ],
    teaser:L('Linia prowadzi do współczesnego tunelu. Ktoś połączył stare i nowe sposoby odnajdywania drogi.','Die Linie führt zum modernen Tunnel. Jemand hat alte und neue Arten der Orientierung verbunden.','The line leads to the modern tunnel. Someone connected old and new ways of finding direction.','Čára vede k modernímu tunelu. Někdo propojil staré a nové způsoby orientace.')
  };

  E['11'] = {
    codes:['beat-71-line-under-river'],
    titles:['Linia pod rzeką','Die Linie unter dem Fluss','The Line Under the River','Čára pod řekou'],
    panels:[
      {blocks:[
        {speaker:'lea',text:L('Ta linia nie kończy się w wodzie. Łączy Uznam z Wolinem.','Die Linie endet nicht im Wasser. Sie verbindet Uznam mit Wolin.','The line does not end in the water. It connects Uznam and Wolin.','Ta čára nekončí ve vodě. Spojuje Uznam a Wolin.')},
        {speaker:'maks',text:L('Czyli mapa przewidziała tunel?','Hat die Karte also den Tunnel vorhergesagt?','So the map predicted the tunnel?','Takže mapa předpověděla tunel?')},
        {speaker:'maja',text:L('Nie. Tunel jest współczesny, tak samo jak sama zagadka.','Nein. Der Tunnel ist modern – genau wie das Rätsel selbst.','No. The tunnel is modern, just like the mystery itself.','Ne. Tunel je současný, stejně jako samotná záhada.')},
        {speaker:'lea',text:L('Najpierw znak nawigacyjny, potem przeprawa, teraz tunel.','Erst ein Seezeichen, dann die Überfahrt, jetzt der Tunnel.','First a navigation beacon, then the crossing, now the tunnel.','Nejdřív navigační znak, potom přeprava, teď tunel.')}
      ]},
      {blocks:[
        {speaker:'maja',text:L('Stare i nowe sposoby orientacji należą tu do jednej historii.','Alte und neue Arten der Orientierung gehören hier zu einer Geschichte.','Old and new ways of navigation belong to one story here.','Staré i nové způsoby orientace tu patří do jednoho příběhu.')},
        {speaker:'maks',text:L('Jeśli to współczesna gra, czemu nikt jej po prostu nie dokończył i nie postawił tabliczki?','Wenn es ein modernes Spiel ist, warum hat es niemand einfach fertiggestellt und ein Schild aufgestellt?','If this is a modern game, why did nobody simply finish it and put up a sign?','Jestli je to moderní hra, proč ji nikdo prostě nedokončil a nepověsil ceduli?')},
        {speaker:'maja',text:L('Dobre pytanie.','Gute Frage.','Good question.','Dobrá otázka.')},
        {speaker:'lea',text:L('Może wcale nie my mieliśmy ją znaleźć.','Vielleicht sollten gar nicht wir sie finden.','Maybe we were never supposed to find it.','Možná jsme ji vůbec neměli najít my.')},
        {speaker:'maks',text:L('To kto?','Wer dann?','Then who was?','Tak kdo?')},
        {speaker:'lea',text:L('Nie wiem.','Ich weiß es nicht.','I do not know.','Nevím.')}
      ]},
      {blocks:[
        {type:'narration',text:L('Na arkuszu znów widać słaby znak przypominający K. Obok pojawia się sylwetka ptaka wśród trzcin.','Auf dem Blatt ist wieder das schwache K-ähnliche Zeichen zu sehen. Daneben erscheint ein Vogel zwischen Schilf.','The faint K-like mark appears again. Beside it is the shape of a bird among reeds.','Na listu se znovu objeví slabá značka připomínající K. Vedle ní je pták mezi rákosím.')},
        {speaker:'lea',text:L('Nowy symbol. Ptak w trzcinach.','Ein neues Symbol. Ein Vogel im Schilf.','A new symbol. A bird in reeds.','Nový symbol. Pták v rákosí.')},
        {speaker:'maks',text:L('Frytka wreszcie ma swoją specjalizację.','Frytka hat endlich ihr Spezialgebiet.','Frytka finally has her specialist subject.','Frytka má konečně svou specializaci.')},
        {speaker:'maja',text:L('Tam akurat ma nie przeszkadzać.','Gerade dort soll sie vor allem nicht stören.','There, her main job is not to disturb anything.','Právě tam má hlavně nic nerušit.')},
        {speaker:'lea',text:L('Jeśli symbol dotyczy krajobrazu, prowadzi w stronę Karsiborskiej Kępy.','Wenn das Symbol die Landschaft meint, führt es Richtung Karsiborska Kępa.','If the symbol refers to the landscape, it points toward Karsiborska Kępa.','Pokud symbol odkazuje na krajinu, vede ke Karsiborské Kępě.')},
        {type:'narration',text:L('Słaby znak K pozostaje bez wyjaśnienia. Ptasia wskazówka prowadzi ich dalej.','Das schwache K-Zeichen bleibt ungeklärt. Der Vogelhinweis führt sie weiter.','The faint K mark remains unexplained. The bird clue takes them onward.','Slabá značka K zůstává nevysvětlená. Ptačí stopa je vede dál.')}
      ]}
    ],
    teaser:L('Ptak wśród trzcin prowadzi ku Karsiborskiej Kępie. A jeśli symbol nie oznacza jednego ptaka?','Der Vogel im Schilf führt zur Karsiborska Kępa. Und wenn das Symbol gar keinen einzelnen Vogel meint?','The bird in the reeds points to Karsiborska Kępa. What if the symbol does not mean a single bird?','Pták mezi rákosím vede ke Karsiborské Kępě. Co když symbol neznamená jednoho ptáka?')
  };

  E['12'] = {
    codes:['beat-79-karsiborska-silence'],
    titles:['Cisza Karsiborskiej Kępy','Die Stille von Karsiborska Kępa','The Silence of Karsiborska Kępa','Ticho Karsiborské Kępy'],
    panels:[
      {blocks:[
        {speaker:'maja',text:L('Zostajemy na dozwolonej ścieżce i obserwujemy z dystansu.','Wir bleiben auf dem erlaubten Weg und beobachten aus der Distanz.','We stay on the permitted path and observe from a distance.','Zůstaneme na povolené stezce a pozorujeme z odstupu.')},
        {speaker:'maks',text:L('Nawet Frytka ma być cicho?','Sogar Frytka soll leise sein?','Even Frytka has to be quiet?','Dokonce i Frytka má být potichu?')},
        {speaker:'lea',text:L('Zwłaszcza Frytka.','Vor allem Frytka.','Especially Frytka.','Frytka hlavně.')},
        {type:'narration',text:L('Frytka milczy dokładnie dwie sekundy.','Frytka ist genau zwei Sekunden still.','Frytka stays silent for exactly two seconds.','Frytka mlčí přesně dvě sekundy.')}
      ]},
      {blocks:[
        {speaker:'maks',text:L('Może trzeba znaleźć ptaka o takim samym kształcie jak symbol.','Vielleicht müssen wir einen Vogel finden, der genauso aussieht wie das Symbol.','Maybe we need to find a bird shaped like the symbol.','Možná musíme najít ptáka stejného tvaru jako symbol.')},
        {speaker:'lea',text:L('Znów patrzymy zbyt dosłownie.','Wir schauen wieder zu wörtlich.','We are being too literal again.','Zase se díváme příliš doslova.')},
        {speaker:'maja',text:L('Jak z „młynem”.','Wie mit der „Mühle“.','Like the “windmill”.','Jako s „mlýnem“.')},
        {speaker:'maks',text:L('Nadal wygląda jak młyn.','Sie sieht immer noch wie eine Mühle aus.','It still looks like a windmill.','Pořád vypadá jako mlýn.')},
        {speaker:'lea',text:L('Nie patrz na ptaka. Spójrz na kontur wokół niego.','Schau nicht auf den Vogel. Schau auf den Umriss darum herum.','Do not look at the bird. Look at the outline around it.','Nedívej se na ptáka. Podívej se na obrys kolem něj.')}
      ]},
      {blocks:[
        {type:'narration',text:L('Lea obraca arkusz. Ptasia sylwetka przestaje być najważniejsza; układ linii zaczyna przypominać deltę.','Lea dreht das Blatt. Die Vogelform wird unwichtig; die Linien beginnen wie ein Delta auszusehen.','Lea rotates the sheet. The bird shape stops being the focus; the lines begin to resemble a delta.','Lea otočí list. Ptačí tvar přestane být důležitý a čáry začnou připomínat deltu.')},
        {speaker:'lea',text:L('To nie jeden gatunek. To kształt delty.','Das ist keine einzelne Art. Das ist die Form eines Deltas.','It is not one species. It is the shape of a delta.','Není to jeden druh. Je to tvar delty.')},
        {speaker:'maks',text:L('Dlatego obok jest tyle małych znaczków?','Deshalb sind daneben so viele kleine Zeichen?','Is that why there are so many little marks beside it?','Proto je vedle tolik malých značek?')},
        {speaker:'lea',text:L('Tak. Wyglądają jak wyspy. Dziesiątki wysp.','Ja. Sie sehen wie Inseln aus. Dutzende Inseln.','Yes. They look like islands. Dozens of islands.','Ano. Vypadají jako ostrovy. Desítky ostrovů.')},
        {speaker:'maja',text:L('Pora sprawdzić oficjalną mapę Świnoujścia.','Zeit für eine offizielle Karte von Świnoujście.','Time to check an official map of Świnoujście.','Je čas zkontrolovat oficiální mapu Świnoujście.')},
        {type:'narration',text:L('Po raz pierwszy mają szansę zobaczyć cały przebyty szlak w jednym układzie.','Zum ersten Mal können sie die gesamte bisherige Route in einem einzigen Muster sehen.','For the first time they may be able to see the whole route in one system.','Poprvé mohou vidět celou dosavadní trasu v jednom systému.')}
      ]}
    ],
    teaser:L('Mapa wypełnia się wyspami. Ile naprawdę tworzy Świnoujście — i co łączy cały szlak?','Die Karte füllt sich mit Inseln. Wie viele bilden Świnoujście wirklich – und was verbindet die ganze Route?','The map fills with islands. How many really make up Świnoujście—and what connects the whole route?','Mapa se plní ostrovy. Kolik jich skutečně tvoří Świnoujście — a co spojuje celou trasu?')
  };

  E['13'] = {
    codes:['beat-86-map-44-islands'],
    titles:['Mapa 44 wysp','Die Karte der 44 Inseln','The Map of 44 Islands','Mapa 44 ostrovů'],
    panels:[
      {blocks:[
        {speaker:'lea',text:L('Oficjalna mapa potwierdza: Świnoujście leży na 44 wyspach.','Die offizielle Karte bestätigt es: Świnoujście liegt auf 44 Inseln.','The official map confirms it: Świnoujście lies across 44 islands.','Oficiální mapa potvrzuje: Świnoujście leží na 44 ostrovech.')},
        {speaker:'maks',text:L('Czterdzieści cztery? A na ilu byliśmy?','Vierundvierzig? Auf wie vielen waren wir?','Forty-four? How many have we been on?','Čtyřicet čtyři? A na kolika jsme byli?')},
        {speaker:'maja',text:L('Nie trzeba odwiedzić wszystkich, żeby zrozumieć układ.','Man muss nicht alle besuchen, um das Muster zu verstehen.','You do not need to visit all of them to understand the pattern.','Nemusíš navštívit všechny, abys pochopil celek.')},
        {speaker:'lea',text:L('Stale zamieszkane są Uznam, Wolin i Karsibór. Nasze przystanki układają się między nimi.','Dauerhaft bewohnt sind Uznam, Wolin und Karsibór. Unsere Stationen liegen dazwischen.','Uznam, Wolin and Karsibór are permanently inhabited. Our stops form a route between them.','Trvale obydlené jsou Uznam, Wolin a Karsibór. Naše zastávky mezi nimi tvoří trasu.')}
      ]},
      {blocks:[
        {type:'narration',text:L('Lea nakłada trzy całe przezroczyste arkusze na oficjalną mapę. Tym razem wszystkie odwiedzone miejsca łączą się w jeden szlak.','Lea legt die drei vollständigen transparenten Blätter auf die offizielle Karte. Diesmal verbinden sich alle besuchten Orte zu einer Route.','Lea overlays the three complete transparent sheets on the official map. This time every visited place connects into one route.','Lea položí tři celé průhledné listy na oficiální mapu. Tentokrát se všechna navštívená místa spojí do jedné trasy.')},
        {speaker:'lea',text:L('Teraz widać całość.','Jetzt sieht man das Ganze.','Now we can see the whole thing.','Teď je vidět celek.')},
        {speaker:'maks',text:L('Czyli wreszcie mamy całą mapę?','Haben wir jetzt endlich die ganze Karte?','So do we finally have the whole map?','Takže už konečně máme celou mapu?')},
        {speaker:'lea',text:L('Cały szlak — tak. Ale trzy całe arkusze nie wyjaśniają jednej grupy oznaczeń.','Die ganze Route – ja. Aber drei vollständige Blätter erklären eine Gruppe von Markierungen nicht.','The whole route—yes. But the three complete sheets do not explain one set of markings.','Celou trasu — ano. Ale tři celé listy nevysvětlují jednu skupinu značek.')},
        {speaker:'maja',text:L('Sprawdzałaś kolejność i obrót?','Hast du Reihenfolge und Drehung geprüft?','Did you check the order and rotation?','Zkontrolovala jsi pořadí a natočení?')},
        {speaker:'lea',text:L('Wszystkie rozsądne warianty.','Alle sinnvollen Varianten.','Every reasonable combination.','Všechny rozumné varianty.')}
      ]},
      {blocks:[
        {speaker:'lea',text:L('Jest jedna hipoteza, której wcześniej nie chciałam mówić.','Es gibt eine Hypothese, die ich bisher nicht aussprechen wollte.','There is one hypothesis I did not want to say out loud before.','Je jedna hypotéza, kterou jsem dřív nechtěla vyslovit.')},
        {speaker:'maks',text:L('Nareszcie.','Endlich.','Finally.','Konečně.')},
        {speaker:'lea',text:L('Możliwe, że system przewiduje jeszcze jeden cały przezroczysty arkusz tego samego formatu.','Möglicherweise ist das System für ein weiteres vollständiges transparentes Blatt im selben Format gedacht.','It is possible the system expects one more complete transparent sheet of the same size.','Je možné, že systém počítá ještě s jedním celým průhledným listem stejného formátu.')},
        {speaker:'maja',text:L('Możliwe. Nie pewne.','Möglich. Nicht bewiesen.','Possible. Not proven.','Možné. Neprokázané.')},
        {speaker:'maks',text:L('I gdzie znajdziemy przezroczysty prostokąt dokładnie tego samego rozmiaru?','Und wo finden wir ein transparentes Rechteck genau in derselben Größe?','And where do we find a transparent rectangle exactly the same size?','A kde najdeme průhledný obdélník přesně stejné velikosti?')},
        {type:'narration',text:L('Wszyscy troje spoglądają na kopertę, ale nikt jeszcze niczego nie ogłasza.','Alle drei schauen auf den Umschlag, aber noch verkündet niemand etwas.','All three look at the envelope, but nobody announces anything yet.','Všichni tři se podívají na obálku, ale nikdo zatím nic neprohlásí.')}
      ]}
    ],
    teaser:L('Po raz pierwszy pojawia się podejrzenie jeszcze jednego całego arkusza. Czy odpowiedź była z nimi od początku?','Zum ersten Mal entsteht der Verdacht auf ein weiteres vollständiges Blatt. War die Antwort von Anfang an bei ihnen?','For the first time, they suspect one more complete sheet may exist. Has the answer been with them from the start?','Poprvé vzniká podezření na ještě jeden celý list. Měli odpověď od začátku u sebe?')
  };

  E['14'] = {
    codes:['beat-93-four-layers'],
    titles:['Cztery warstwy','Vier Schichten','Four Layers','Čtyři vrstvy'],
    panels:[
      {blocks:[
        {type:'narration',text:L('Trzy całe arkusze znów leżą na oficjalnym planie. Trasa jest kompletna, lecz jedna grupa symboli nadal nie ma funkcji.','Die drei vollständigen Blätter liegen wieder auf dem offiziellen Plan. Die Route ist vollständig, doch eine Gruppe von Symbolen hat noch keine Funktion.','The three complete sheets lie on the official map again. The route is complete, but one set of symbols still has no function.','Tři celé listy znovu leží na oficiálním plánu. Trasa je úplná, ale jedna skupina symbolů stále nemá funkci.')},
        {speaker:'lea',text:L('Jeśli moja hipoteza jest dobra, potrzebny jest czwarty arkusz w tym samym formacie.','Wenn meine Hypothese stimmt, brauchen wir ein viertes Blatt im selben Format.','If my hypothesis is right, we need a fourth sheet in the same format.','Jestli je moje hypotéza správná, potřebujeme čtvrtý list stejného formátu.')},
        {speaker:'maks',text:L('I przez cały czas nosimy ze sobą coś przezroczystego.','Und die ganze Zeit tragen wir etwas Durchsichtiges bei uns.','And we have been carrying something transparent the whole time.','A celou dobu s sebou nosíme něco průhledného.')},
        {speaker:'maja',text:L('Najpierw sprawdzamy rozmiar.','Zuerst prüfen wir die Größe.','First we check the size.','Nejdřív zkontrolujeme velikost.')}
      ]},
      {blocks:[
        {type:'narration',text:L('Maks podnosi przezroczystą obwolutę koperty i kładzie ją obok trzech arkuszy.','Maks hebt die transparente Hülle des Umschlags an und legt sie neben die drei Blätter.','Maks lifts the transparent envelope sleeve and places it beside the three sheets.','Maks zvedne průhledný obal obálky a položí ho vedle tří listů.')},
        {speaker:'lea',text:L('To cały prostokąt.','Es ist ein vollständiges Rechteck.','It is one complete rectangle.','Je to celý obdélník.')},
        {speaker:'maja',text:L('I dokładnie ten sam format.','Und exakt dasselbe Format.','And exactly the same size.','A přesně stejný formát.')},
        {speaker:'maks',text:L('Czyli koperta była częścią mapy?','Der Umschlag war also Teil der Karte?','So the envelope was part of the map?','Takže obálka byla součástí mapy?')},
        {speaker:'lea',text:L('Nie sama koperta. Przezroczysta obwoluta. To czwarty cały arkusz.','Nicht der Umschlag selbst. Die transparente Hülle. Sie ist das vierte vollständige Blatt.','Not the envelope itself. The transparent sleeve. It is the fourth complete sheet.','Ne samotná obálka. Průhledný obal. Je to čtvrtý celý list.')}
      ]},
      {blocks:[
        {speaker:'lea',text:L('Nakładam go na trzy pozostałe.','Ich lege es auf die anderen drei.','I am laying it over the other three.','Položím ho přes ostatní tři.')},
        {type:'narration',text:L('Linie, które wcześniej wydawały się niezależne, łączą się. Cztery całe prostokątne warstwy tworzą jeden układ.','Linien, die vorher unabhängig wirkten, verbinden sich. Vier vollständige rechteckige Schichten bilden ein System.','Lines that seemed unrelated now connect. Four complete rectangular layers form one system.','Čáry, které dřív působily nezávisle, se spojí. Čtyři celé obdélníkové vrstvy vytvoří jeden systém.')},
        {speaker:'maks',text:L('Teraz naprawdę działa.','Jetzt funktioniert es wirklich.','Now it really works.','Teď to opravdu funguje.')},
        {speaker:'maja',text:L('Co pokazuje?','Was zeigt es?','What does it show?','Co to ukazuje?')},
        {speaker:'lea',text:L('Nie tylko miejsce. Także porę. Stawa Młyny — po zmroku.','Nicht nur einen Ort. Auch eine Zeit. Stawa Młyny – nach Einbruch der Dunkelheit.','Not only a place. A time as well. Stawa Młyny—after dark.','Nejen místo. Také čas. Stawa Młyny — po setmění.')},
        {speaker:'maks',text:L('Wracamy tam, gdzie wszystko się zaczęło.','Wir gehen zurück dorthin, wo alles angefangen hat.','We are going back to where it all started.','Vracíme se tam, kde všechno začalo.')}
      ]}
    ],
    teaser:L('Cztery całe warstwy wskazują Stawę Młyny po zmroku. Finał prowadzi z powrotem do początku.','Vier vollständige Schichten weisen nach Einbruch der Dunkelheit zur Stawa Młyny. Das Finale führt zurück zum Anfang.','Four complete layers point to Stawa Młyny after dark. The finale leads back to the beginning.','Čtyři celé vrstvy ukazují ke Stawě Młyny po setmění. Finále vede zpět na začátek.')
  };

  E['15'] = {
    codes:['beat-100-course-found'],
    titles:['Kurs odnaleziony','Der Kurs ist gefunden','Course Found','Kurz nalezen'],
    panels:[
      {blocks:[
        {type:'narration',text:L('Po zmroku Stawa Młyny wygląda inaczej. Światła nawigacyjne stają się częścią nocnego krajobrazu.','Nach Einbruch der Dunkelheit wirkt die Stawa Młyny anders. Die Navigationslichter werden Teil der Nachtlandschaft.','After dark, Stawa Młyny looks different. Navigation lights become part of the night landscape.','Po setmění vypadá Stawa Młyny jinak. Navigační světla se stanou součástí noční krajiny.')},
        {speaker:'maks',text:L('Wróciliśmy dokładnie tam, gdzie zaczęliśmy.','Wir sind genau dorthin zurückgekehrt, wo wir angefangen haben.','We came back exactly where we started.','Vrátili jsme se přesně tam, kde jsme začali.')},
        {speaker:'lea',text:L('Tak. Ale teraz widzimy więcej.','Ja. Aber jetzt sehen wir mehr.','Yes. But now we can see more.','Ano. Ale teď vidíme víc.')},
        {speaker:'maja',text:L('Czyli trasa nie była o odległości.','Dann ging es bei der Route nicht um Entfernung.','So the route was not about distance.','Takže v trase nešlo o vzdálenost.')},
        {speaker:'maks',text:L('Tylko o chodzenie w kółko?','Sondern ums Im-Kreis-Laufen?','About walking in circles?','Ale o chození dokola?')},
        {speaker:'lea',text:L('O nauczenie się, jak czytać miasto.','Darum, zu lernen, wie man eine Stadt liest.','About learning how to read a city.','O to naučit se číst město.')}
      ]},
      {blocks:[
        {speaker:'lea',text:L('Światło — nawigacja.','Licht – Navigation.','Light—navigation.','Světlo — navigace.')},
        {speaker:'maja',text:L('Woda — ruch i połączenie.','Wasser – Bewegung und Verbindung.','Water—movement and connection.','Voda — pohyb a spojení.')},
        {speaker:'maks',text:L('Ptak — przyroda.','Vogel – Natur.','Bird—nature.','Pták — příroda.')},
        {speaker:'lea',text:L('Droga — to, co łączy wyspy i ludzi.','Weg – das, was Inseln und Menschen verbindet.','Route—what connects islands and people.','Cesta — to, co spojuje ostrovy a lidi.')},
        {speaker:'maja',text:L('Razem to nie lista atrakcji. To jeden system.','Zusammen ist das keine Liste von Sehenswürdigkeiten. Es ist ein System.','Together, it is not a list of attractions. It is one system.','Dohromady to není seznam atrakcí. Je to jeden systém.')},
        {speaker:'maks',text:L('Ale nadal nie wiemy, dlaczego znaleźliśmy to właśnie my.','Aber wir wissen immer noch nicht, warum ausgerechnet wir es gefunden haben.','But we still do not know why we were the ones to find it.','Ale pořád nevíme, proč jsme to našli právě my.')}
      ]},
      {blocks:[
        {speaker:'lea',text:L('Może nie chodziło o konkretne osoby. Może o kogokolwiek wystarczająco ciekawego, żeby przejść trasę do końca.','Vielleicht ging es nicht um bestimmte Personen. Vielleicht um jeden, der neugierig genug ist, die Route bis zum Ende zu gehen.','Maybe it was not about specific people. Maybe it was for anyone curious enough to finish the route.','Možná nešlo o konkrétní lidi. Možná o kohokoli dost zvědavého, aby trasu dokončil.')},
        {type:'narration',text:L('Lea odwraca czwarty arkusz. Słaby znak, który wcześniej przypominał literę, jest teraz wyraźny.','Lea dreht das vierte Blatt um. Das schwache Zeichen, das vorher wie ein Buchstabe wirkte, ist jetzt deutlich.','Lea turns over the fourth sheet. The faint mark that once looked like a letter is now clear.','Lea otočí čtvrtý list. Slabá značka, která dřív připomínala písmeno, je teď jasná.')},
        {speaker:'lea',text:L('Teraz to na pewno K.','Jetzt ist es eindeutig ein K.','Now it is definitely K.','Teď je to určitě K.')},
        {speaker:'maks',text:L('Czyli znak z początku nie był przypadkiem. Kim jest K?','Das Zeichen vom Anfang war also kein Zufall. Wer ist K?','So the mark from the beginning was not an accident. Who is K?','Takže značka ze začátku nebyla náhoda. Kdo je K?')},
        {speaker:'maja',text:L('Tego jeszcze nie wiemy.','Das wissen wir noch nicht.','We still do not know.','To ještě nevíme.')},
        {type:'narration',text:L('Na odwrocie pojawia się cienka linia drugiej mapy, wychodząca poza zachodnią krawędź obecnej trasy.','Auf der Rückseite erscheint die dünne Linie einer zweiten Karte, die über den westlichen Rand der bisherigen Route hinausführt.','On the back is the thin beginning of a second map, leading beyond the western edge of the current route.','Na zadní straně se objeví tenká čára druhé mapy, která vede za západní okraj současné trasy.')},
        {speaker:'maks',text:L('To znaczy, że wszystko dopiero się zaczyna?','Heißt das, alles fängt gerade erst an?','Does that mean everything is only beginning?','Znamená to, že všechno teprve začíná?')},
        {speaker:'maja',text:L('Nie. Tę trasę skończyliśmy. Następną dopiero zobaczyliśmy.','Nein. Diese Route haben wir beendet. Die nächste haben wir gerade erst gesehen.','No. We finished this route. We have only just seen the next one.','Ne. Tuhle trasu jsme dokončili. Tu další jsme teprve zahlédli.')},
        {type:'narration',text:L('Frytka siada obok czterech warstw. W nocnym świetle linie na moment układają się w idealny szlak.','Frytka setzt sich neben die vier Schichten. Im Nachtlicht bilden die Linien für einen Moment eine perfekte Route.','Frytka settles beside the four layers. In the night light, the lines form a perfect route for a moment.','Frytka si sedne vedle čtyř vrstev. V nočním světle se čáry na okamžik složí do dokonalé trasy.')},
        {speaker:'maks',text:L('Oby następna mapa nie reagowała na lody.','Hoffentlich reagiert die nächste Karte nicht auf Eis.','I just hope the next map does not react to ice cream.','Snad další mapa nereaguje na zmrzlinu.')},
        {speaker:'maja',text:L('Nie podpowiadaj autorowi.','Bring den Autor nicht auf Ideen.','Do not give the author ideas.','Nedávej autorovi nápady.')},
        {speaker:'lea',text:L('Jeśli autor to K, możliwe, że już wie.','Wenn der Autor K ist, weiß er es vielleicht schon.','If the author is K, maybe they already know.','Jestli je autor K, možná už to ví.')}
      ]}
    ],
    teaser:L('Podpis K i początek drugiej mapy zostają na odwrocie. Pierwszy sezon jest zamknięty, ale większa tajemnica dopiero się otwiera.','Die Signatur K und der Anfang einer zweiten Karte bleiben auf der Rückseite. Die erste Staffel ist abgeschlossen, aber das größere Rätsel öffnet sich erst.','The signature K and the beginning of a second map remain on the back. Season One is complete, but the larger mystery is only opening.','Podpis K a začátek druhé mapy zůstávají na zadní straně. První sezóna končí, ale větší záhada se teprve otevírá.')
  };

  root.version = 2;
})();
