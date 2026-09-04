/* Localized presentation scripts for the approved Season 1 comic slice.
 * This is not an unlock catalog: season/episode access, ordering and thresholds
 * always come from the server. Artwork remains language-neutral.
 * Keep speaker IDs stable; each panel is read top-to-bottom without interaction.
 */
window.comicStoryData = {
  version: 6,
  cast: {
    maja: { name: 'Maja', voice: 'Practical, cautious; checks an idea before following it.' },
    maks: { name: 'Maks', voice: 'Enthusiastic treasure-hunter; quick to jump to conclusions.' },
    lea: { name: 'Lea', voice: 'Observant, precise; notices connections the others miss.' }
  },
  episodes: {
    'season-1/beat-00-unmarked-envelope': {
      sceneCode: 'scene-00-unmarked-envelope',
      nextEpisodeCode: 'beat-07-windmill-not-mill',
      panels: [
        {
          id: 'discovery',
          artworkIndex: 0,
          protectedZones: [[10,34,32,15], [58,42,23,15], [37,49,25,15], [24,68,55,13]],
          lines: [
            { speaker: 'maks', placement: { x: 20, y: 1, width: 76, anchor: [72,44], edge: 'bottom' }, text: {
              pl: 'O! Ktoś zostawił nam zagadkę?',
              de: 'Oh! Hat uns jemand ein Rätsel hinterlassen?',
              en: 'Oh! Did someone leave us a mystery?',
              cs: 'Hele! Nechal nám tu někdo záhadu?'
            } },
            { speaker: 'maja', placement: { x: 4, y: 18, width: 76, anchor: [25,36], edge: 'bottom' }, text: {
              pl: 'Nam? Najpierw poszukaj podpisu.',
              de: 'Uns? Such erst mal nach einem Namen.',
              en: 'Us? Look for a name first.',
              cs: 'Nám? Nejdřív najdi podpis.'
            } },
            { speaker: 'lea', placement: { x: 20, y: 82, width: 76, anchor: [30,63], edge: 'top' }, text: {
              pl: 'Nie ma. Tylko ta przezroczysta mapa…',
              de: 'Keiner da. Nur diese durchsichtige Karte …',
              en: 'No name. Just this see-through map…',
              cs: 'Žádný tu není. Jen tahle průhledná mapa…'
            } }
          ]
        },
        {
          id: 'investigation',
          artworkIndex: 1,
          protectedZones: [[5,39,90,38]],
          lines: [
            { speaker: 'maks', placement: { x: 4, y: 1, width: 76, anchor: [48,40], edge: 'bottom' }, text: {
              pl: 'Cztery znaki. Czyli cztery skarby?',
              de: 'Vier Zeichen. Also vier Schätze?',
              en: 'Four symbols. So, four treasures?',
              cs: 'Čtyři znaky. Takže čtyři poklady?'
            } },
            { speaker: 'lea', placement: { x: 20, y: 18, width: 76, anchor: [82,51], edge: 'bottom' }, text: {
              pl: 'Albo wskazówki. Brakuje jednej warstwy.',
              de: 'Oder Hinweise. Eine Schicht fehlt.',
              en: 'Or clues. One layer is missing.',
              cs: 'Nebo stopy. Jedna vrstva chybí.'
            } },
            { speaker: 'maja', placement: { x: 4, y: 82, width: 80, anchor: [18,59], edge: 'top' }, text: {
              pl: 'To sprawdźmy, do czego pasuje ta.',
              de: 'Dann sehen wir, wozu diese hier passt.',
              en: 'Then let’s see what this one fits.',
              cs: 'Tak zjistíme, k čemu pasuje tahle.'
            } }
          ]
        },
        {
          id: 'cliffhanger',
          artworkIndex: 2,
          protectedZones: [[54,20,41,25], [4,36,91,40]],
          lines: [
            { speaker: 'lea', placement: { x: 4, y: 3, width: 87, anchor: [55,50], edge: 'bottom' }, text: {
              pl: 'Patrzcie! Ten zarys pasuje do Stawy Młyny!',
              de: 'Seht mal! Der Umriss passt zur Stawa Młyny!',
              en: 'Look! That outline matches Stawa Młyny!',
              cs: 'Hele! Ten obrys sedí na Stawa Młyny!'
            } },
            { speaker: 'maja', placement: { x: 4, y: 78.5, width: 92, anchor: [20,55], edge: 'top' }, text: {
              pl: 'Ale skąd nadawca wiedział, że tu trafimy?',
              de: 'Aber woher wusste der Absender, dass wir hierherkommen?',
              en: 'But how did the sender know we’d come here?',
              cs: 'Ale jak odesílatel věděl, že sem přijdeme?'
            } }
          ]
        }
      ],
      nextTeaser: {
        pl: 'Pierwszy znak prowadzi do Stawy Młyny. Jeśli nadawca wiedział, że tu trafią — co tam na nich czeka?',
        de: 'Das erste Zeichen führt zur Stawa Młyny. Wenn der Absender sie hier erwartet hat – was wartet dort auf sie?',
        en: 'The first symbol points to Stawa Młyny. If the sender expected them here, what is waiting there?',
        cs: 'První znak vede ke Stawa Młyny. Jestli odesílatel čekal, že sem dorazí — co tam na ně čeká?'
      }
    },

    'season-1/beat-07-windmill-not-mill': {
      sceneCode: 'scene-07-windmill-not-mill',
      nextEpisodeCode: 'beat-14-ink-from-waves',
      panels: [
        {
          id: 'not-a-mill',
          artworkIndex: 0,
          protectedZones: [[40,20,20,52], [8,58,82,20]],
          lines: [
            { speaker: 'maks', placement: { x: 4, y: 2, width: 45, anchor: [24,66], edge: 'bottom' }, text: {
              pl: 'Czyli zagadka prowadzi do wiatraka?',
              de: 'Also führt das Rätsel zu einer Windmühle?',
              en: 'So the mystery leads to a windmill?',
              cs: 'Takže nás záhada vede k větrnému mlýnu?'
            } },
            { speaker: 'maja', placement: { x: 52, y: 2, width: 44, anchor: [70,65], edge: 'bottom' }, text: {
              pl: 'Do znaku nawigacyjnego, nie młyna.',
              de: 'Zu einem Seezeichen, nicht zu einer Mühle.',
              en: 'To a navigation beacon, not a mill.',
              cs: 'K navigačnímu znaku, ne k mlýnu.'
            } }
          ]
        },
        {
          id: 'sail-angle',
          artworkIndex: 1,
          protectedZones: [[20,28,60,42], [4,48,18,18], [78,46,18,18]],
          lines: [
            { speaker: 'lea', placement: { x: 4, y: 2, width: 52, anchor: [28,55], edge: 'bottom' }, text: {
              pl: 'Spójrzcie na skrzydła. Ten kąt jest na naszej karcie.',
              de: 'Seht euch die Flügel an. Dieser Winkel ist auf unserer Karte.',
              en: 'Look at the sails. That angle is on our card.',
              cs: 'Podívejte na křídla. Tenhle úhel je na naší kartě.'
            } },
            { speaker: 'maks', placement: { x: 57, y: 4, width: 39, anchor: [76,54], edge: 'bottom' }, text: {
              pl: 'Czyli jednak trafiłem!',
              de: 'Dann lag ich doch richtig!',
              en: 'So I was right!',
              cs: 'Takže jsem měl pravdu!'
            } },
            { speaker: 'maja', placement: { x: 8, y: 82, width: 84, anchor: [50,62], edge: 'top' }, text: {
              pl: 'Do miejsca. Jeszcze nie do odpowiedzi.',
              de: 'Beim Ort. Noch nicht bei der Antwort.',
              en: 'About the place. Not the answer.',
              cs: 'Místo jsi trefil. Odpověď ještě ne.'
            } }
          ]
        },
        {
          id: 'line-on-breakwater',
          artworkIndex: 2,
          protectedZones: [[5,52,50,28], [58,45,35,25]],
          lines: [
            { speaker: 'lea', placement: { x: 4, y: 2, width: 60, anchor: [32,62], edge: 'bottom' }, text: {
              pl: 'Nowa linia biegnie wzdłuż falochronu.',
              de: 'Eine neue Linie läuft am Wellenbrecher entlang.',
              en: 'A new line runs along the breakwater.',
              cs: 'Nová čára vede podél vlnolamu.'
            } },
            { speaker: 'maja', placement: { x: 36, y: 80, width: 60, anchor: [66,62], edge: 'top' }, text: {
              pl: 'I urywa się tam, gdzie kartę może dosięgnąć woda.',
              de: 'Und sie endet dort, wo Wasser die Karte erreichen kann.',
              en: 'And it stops where water can reach the card.',
              cs: 'A končí tam, kam na kartu může dosáhnout voda.'
            } }
          ]
        }
      ],
      nextTeaser: {
        pl: 'Linia kończy się przy wodzie. Czy karta reaguje na coś więcej niż światło?',
        de: 'Die Linie endet am Wasser. Reagiert die Karte auf mehr als nur Licht?',
        en: 'The line ends by the water. Does the card react to more than light?',
        cs: 'Čára končí u vody. Reaguje karta na něco víc než jen na světlo?'
      }
    },

    'season-1/beat-14-ink-from-waves': {
      sceneCode: 'scene-14-ink-from-waves',
      nextEpisodeCode: 'beat-21-park-as-map',
      panels: [
        {
          id: 'water-reveal',
          artworkIndex: 0,
          protectedZones: [[18,34,64,36], [8,56,84,22]],
          lines: [
            { speaker: 'maks', placement: { x: 4, y: 2, width: 51, anchor: [26,60], edge: 'bottom' }, text: {
              pl: 'Morze właśnie dopisało nam mapę!',
              de: 'Das Meer hat gerade unsere Karte weitergezeichnet!',
              en: 'The sea just added to our map!',
              cs: 'Moře nám právě dokreslilo mapu!'
            } },
            { speaker: 'lea', placement: { x: 56, y: 3, width: 40, anchor: [74,57], edge: 'bottom' }, text: {
              pl: 'Woda odsłoniła ukryty nadruk.',
              de: 'Das Wasser hat einen verborgenen Druck sichtbar gemacht.',
              en: 'The water revealed a hidden print.',
              cs: 'Voda odhalila skrytý tisk.'
            } }
          ]
        },
        {
          id: 'not-treasure',
          artworkIndex: 1,
          protectedZones: [[22,28,56,44], [5,49,18,18], [78,48,18,18]],
          lines: [
            { speaker: 'maks', placement: { x: 4, y: 3, width: 38, anchor: [22,55], edge: 'bottom' }, text: {
              pl: 'Skarb. Wiedziałem.',
              de: 'Schatz. Ich wusste es.',
              en: 'Treasure. I knew it.',
              cs: 'Poklad. Já to věděl.'
            } },
            { speaker: 'lea', placement: { x: 45, y: 3, width: 51, anchor: [75,56], edge: 'bottom' }, text: {
              pl: 'To nie skarb. Ten znak wygląda jak park.',
              de: 'Kein Schatz. Das Zeichen sieht nach einem Park aus.',
              en: 'Not treasure. That symbol looks like a park.',
              cs: 'Ne poklad. Ten znak vypadá jako park.'
            } }
          ]
        },
        {
          id: 'toward-the-park',
          artworkIndex: 2,
          protectedZones: [[8,38,84,37], [42,54,38,25]],
          lines: [
            { speaker: 'maja', placement: { x: 4, y: 2, width: 46, anchor: [23,59], edge: 'bottom' }, text: {
              pl: 'Park Zdrojowy jest dalej od morza.',
              de: 'Der Kurpark liegt weiter weg vom Meer.',
              en: 'Park Zdrojowy is farther inland.',
              cs: 'Lázeňský park je dál od moře.'
            } },
            { speaker: 'lea', placement: { x: 52, y: 2, width: 44, anchor: [73,58], edge: 'bottom' }, text: {
              pl: 'Ta kreska prowadzi właśnie tam.',
              de: 'Diese Linie führt genau dorthin.',
              en: 'This line points straight there.',
              cs: 'Tahle čára vede přímo tam.'
            } },
            { speaker: 'maks', placement: { x: 8, y: 81, width: 84, anchor: [48,66], edge: 'top' }, text: {
              pl: 'Tylko którą ścieżkę wybrać, kiedy park ma ich tyle?',
              de: 'Nur welchen Weg nehmen wir, wenn der Park so viele hat?',
              en: 'But which path do we take when the park has so many?',
              cs: 'Jen kterou cestu vybrat, když jich je v parku tolik?'
            } }
          ]
        }
      ],
      nextTeaser: {
        pl: 'Ukryty znak prowadzi do Parku Zdrojowego. Jak znaleźć jedną właściwą trasę wśród tylu alejek?',
        de: 'Das verborgene Zeichen führt in den Kurpark. Wie findet man zwischen all den Wegen die eine richtige Route?',
        en: 'The hidden symbol points to Park Zdrojowy. How do they find one right route among so many paths?',
        cs: 'Skrytý znak vede do lázeňského parku. Jak mezi tolika cestami najdou tu správnou?'
      }
    },

    'season-1/beat-21-park-as-map': {
      sceneCode: 'scene-21-park-as-map',
      nextEpisodeCode: 'beat-29-round-fort',
      panels: [
        {
          id: 'search-the-pattern',
          artworkIndex: 0,
          protectedZones: [[12,30,76,42], [8,58,84,20]],
          lines: [
            { speaker: 'lea', placement: { x: 4, y: 2, width: 49, anchor: [27,60], edge: 'bottom' }, text: {
              pl: 'Nie szukamy punktu. Szukamy układu.',
              de: 'Wir suchen keinen Punkt. Wir suchen ein Muster.',
              en: 'We’re not looking for a point. We’re looking for a pattern.',
              cs: 'Nehledáme bod. Hledáme vzor.'
            } },
            { speaker: 'maks', placement: { x: 55, y: 3, width: 41, anchor: [73,61], edge: 'bottom' }, text: {
              pl: 'Czyli cały park jest planszą?',
              de: 'Also ist der ganze Park ein Spielfeld?',
              en: 'So the whole park is the board?',
              cs: 'Takže celý park je herní plán?'
            } }
          ]
        },
        {
          id: 'frytka-picks-wrong',
          artworkIndex: 1,
          protectedZones: [[18,34,64,37], [4,52,22,20], [72,50,24,22]],
          lines: [
            { speaker: 'maks', placement: { x: 4, y: 2, width: 43, anchor: [22,57], edge: 'bottom' }, text: {
              pl: 'Frytka wybrała. Ta ławka!',
              de: 'Frytka hat gewählt. Diese Bank!',
              en: 'Frytka picked one. That bench!',
              cs: 'Frytka vybrala. Tahle lavička!'
            } },
            { speaker: 'maja', placement: { x: 50, y: 2, width: 46, anchor: [72,57], edge: 'bottom' }, text: {
              pl: 'Frytka wybrała okruszki.',
              de: 'Frytka hat die Krümel gewählt.',
              en: 'Frytka picked the crumbs.',
              cs: 'Frytka vybrala drobky.'
            } },
            { speaker: 'lea', placement: { x: 8, y: 81, width: 84, anchor: [51,64], edge: 'top' }, text: {
              pl: 'A wzór pasuje do alejki po drugiej stronie.',
              de: 'Und das Muster passt zum Weg auf der anderen Seite.',
              en: 'And the pattern matches the path on the other side.',
              cs: 'A vzor sedí na cestu na druhé straně.'
            } }
          ]
        },
        {
          id: 'round-shape',
          artworkIndex: 2,
          protectedZones: [[18,28,64,43], [34,48,40,30]],
          lines: [
            { speaker: 'lea', placement: { x: 4, y: 2, width: 58, anchor: [40,56], edge: 'bottom' }, text: {
              pl: 'W centrum układu pojawia się znajomy okrągły zarys.',
              de: 'Im Zentrum des Musters erscheint ein vertrauter runder Umriss.',
              en: 'A familiar round outline appears at the centre.',
              cs: 'Uprostřed vzoru se objeví známý kulatý obrys.'
            } },
            { speaker: 'maks', placement: { x: 64, y: 4, width: 32, anchor: [77,58], edge: 'bottom' }, text: {
              pl: 'Okrągły. I zdecydowanie nie jest ławką.',
              de: 'Rund. Und ganz sicher keine Bank.',
              en: 'Round. And definitely not a bench.',
              cs: 'Kulatý. A rozhodně to není lavička.'
            } },
            { speaker: 'maja', placement: { x: 8, y: 81, width: 84, anchor: [27,63], edge: 'top' }, text: {
              pl: 'Chyba że właśnie na to liczy nadawca.',
              de: 'Außer der Absender rechnet genau damit.',
              en: 'Unless that’s exactly what the sender is counting on.',
              cs: 'Pokud právě s tím odesílatel nepočítá.'
            } }
          ]
        }
      ],
      nextTeaser: {
        pl: 'Wzór wskazuje Fort Anioła. Czy fort jest odpowiedzią — czy dopiero następnym pytaniem?',
        de: 'Das Muster weist zum Fort Anioła. Ist das Fort die Antwort – oder erst die nächste Frage?',
        en: 'The pattern points to Fort Anioła. Is the fort the answer—or only the next question?',
        cs: 'Vzor ukazuje na Fort Anioła. Je pevnost odpověď — nebo teprve další otázka?'
      }
    },

    "season-1/beat-29-round-fort": {
      sceneCode: "scene-29-round-fort",
      nextEpisodeCode: "beat-36-new-mystery-old-museum",
      panels: [
        {
          id: "shape-check",
          artworkIndex: 0,
          protectedZones: [[18,28,64,43]],
          lines: [
            { speaker: "lea", placement: { x: 4, y: 2, width: 46, anchor: [24,58], edge: "bottom" }, text: {
              pl: "Ten zarys naprawdę pasuje do fortu.",
              de: "Der Umriss passt wirklich zum Fort.",
              en: "That outline really does match the fort.",
              cs: "Ten obrys opravdu odpovídá pevnosti."
            } },
            { speaker: "maks", placement: { x: 50, y: 3, width: 46, anchor: [74,58], edge: "bottom" }, text: {
              pl: "Czyli tym razem fort jest odpowiedzią?",
              de: "Ist das Fort diesmal also die Antwort?",
              en: "So is the fort actually the answer this time?",
              cs: "Takže tentokrát je pevnost odpověď?"
            } },
            { speaker: "maja", placement: { x: 8, y: 81, width: 84, anchor: [50,64], edge: "top" }, text: {
              pl: "Miejscem do sprawdzenia, nie skrytką.",
              de: "Ein Ort zum Prüfen, kein Versteck.",
              en: "A place to check, not a hiding place.",
              cs: "Místo k ověření, ne skrýš."
            } }
          ]
        },
        {
          id: "modern-mark",
          artworkIndex: 1,
          protectedZones: [[18,28,64,43]],
          lines: [
            { speaker: "maja", placement: { x: 4, y: 2, width: 46, anchor: [24,58], edge: "bottom" }, text: {
              pl: "Porównujemy tylko naszą kartę. Eksponatów nie dotykamy.",
              de: "Wir vergleichen nur unsere Karte. Die Ausstellungsstücke bleiben unberührt.",
              en: "We only compare our card. We leave the exhibits untouched.",
              cs: "Porovnáváme jen naši kartu. Na exponáty nesaháme."
            } },
            { speaker: "lea", placement: { x: 50, y: 3, width: 46, anchor: [74,58], edge: "bottom" }, text: {
              pl: "Ten sam znak powtarza się obok okrągłego kształtu.",
              de: "Dasselbe Zeichen steht wieder neben der runden Form.",
              en: "The same mark repeats beside the round shape.",
              cs: "Stejný znak se znovu objevuje vedle kulatého tvaru."
            } },
            { speaker: "maks", placement: { x: 8, y: 81, width: 84, anchor: [50,64], edge: "top" }, text: {
              pl: "I wygląda na nadruk, nie ślad na murze.",
              de: "Und es sieht gedruckt aus, nicht in die Mauer geritzt.",
              en: "And it looks printed, not carved into the wall.",
              cs: "A vypadá vytištěně, ne vyrytě do zdi."
            } }
          ]
        },
        {
          id: "museum-project",
          artworkIndex: 2,
          protectedZones: [[18,28,64,43]],
          lines: [
            { speaker: "maja", placement: { x: 4, y: 2, width: 60, anchor: [30,58], edge: "bottom" }, text: {
              pl: "Opiekun kojarzy ten znak ze współczesnym, niedokończonym projektem muzealnym.",
              de: "Der Betreuer kennt das Zeichen von einem modernen, unvollendeten Museumsprojekt.",
              en: "The guide recognises the mark from a modern, unfinished museum project.",
              cs: "Průvodce ten znak zná ze současného, nedokončeného muzejního projektu."
            } },
            { speaker: "lea", placement: { x: 36, y: 81, width: 60, anchor: [70,62], edge: "top" }, text: {
              pl: "To które muzeum wie coś o brakującej warstwie?",
              de: "Welches Museum weiß dann etwas über die fehlende Schicht?",
              en: "Then which museum knows something about the missing layer?",
              cs: "Které muzeum tedy ví něco o chybějící vrstvě?"
            } }
          ]
        }
      ],
      nextTeaser: {
        pl: "Znak prowadzi do Muzeum Rybołówstwa Morskiego. Skoro projekt jest współczesny, dlaczego jedna warstwa zniknęła?",
        de: "Das Zeichen führt zum Museum für Meeresfischerei. Wenn das Projekt modern ist – warum ist eine Schicht verschwunden?",
        en: "The mark leads to the Museum of Sea Fishery. If the project is modern, why did one layer disappear?",
        cs: "Znak vede do Muzea mořského rybolovu. Jestli je projekt současný, proč jedna vrstva zmizela?"
      }
    },

    "season-1/beat-36-new-mystery-old-museum": {
      sceneCode: "scene-36-new-mystery-old-museum",
      nextEpisodeCode: "beat-43-across-swina",
      panels: [
        {
          id: "modern-not-historic",
          artworkIndex: 0,
          protectedZones: [],
          lines: [
            { speaker: "maja", placement: { x: 4, y: 2, width: 46, anchor: [24,58], edge: "bottom" }, text: {
              pl: "Te mapy są współczesne. To nie zabytkowe eksponaty.",
              de: "Diese Karten sind modern. Das sind keine historischen Exponate.",
              en: "These maps are modern. They are not historical exhibits.",
              cs: "Tyhle mapy jsou současné. Nejsou to historické exponáty."
            } },
            { speaker: "maks", placement: { x: 50, y: 3, width: 46, anchor: [74,58], edge: "bottom" }, text: {
              pl: "Czyli ktoś ułożył naszą zagadkę całkiem niedawno.",
              de: "Also hat jemand unser Rätsel erst vor Kurzem gebaut.",
              en: "So someone put our mystery together quite recently.",
              cs: "Takže někdo naši záhadu vytvořil docela nedávno."
            } },
            { speaker: "lea", placement: { x: 8, y: 81, width: 84, anchor: [50,64], edge: "top" }, text: {
              pl: "I tak, żeby działała bez jednego języka.",
              de: "Und so, dass es ohne eine einzige Sprache funktioniert.",
              en: "And designed it to work without relying on one language.",
              cs: "A tak, aby fungovala bez jediného jazyka."
            } }
          ]
        },
        {
          id: "four-symbols",
          artworkIndex: 1,
          protectedZones: [],
          lines: [
            { speaker: "lea", placement: { x: 4, y: 2, width: 46, anchor: [24,58], edge: "bottom" }, text: {
              pl: "Światło, woda, ptak i droga. Cztery znaki zamiast słów.",
              de: "Licht, Wasser, Vogel und Weg. Vier Zeichen statt Worten.",
              en: "Light, water, bird and route. Four symbols instead of words.",
              cs: "Světlo, voda, pták a cesta. Čtyři znaky místo slov."
            } },
            { speaker: "maks", placement: { x: 50, y: 3, width: 46, anchor: [74,58], edge: "bottom" }, text: {
              pl: "Tylko nadal brakuje jednej warstwy.",
              de: "Nur eine Schicht fehlt immer noch.",
              en: "Except one layer is still missing.",
              cs: "Jenže jedna vrstva pořád chybí."
            } },
            { speaker: "maja", placement: { x: 8, y: 81, width: 84, anchor: [50,64], edge: "top" }, text: {
              pl: "Bo zestawu nigdy nie dokończono.",
              de: "Weil das Set nie fertiggestellt wurde.",
              en: "Because the set was never finished.",
              cs: "Protože sada nikdy nebyla dokončena."
            } }
          ]
        },
        {
          id: "across-swina",
          artworkIndex: 2,
          protectedZones: [],
          lines: [
            { speaker: "lea", placement: { x: 4, y: 2, width: 60, anchor: [30,58], edge: "bottom" }, text: {
              pl: "Brakującą warstwę ostatnio widziano po drugiej stronie Świny.",
              de: "Die fehlende Schicht wurde zuletzt auf der anderen Seite der Świna gesehen.",
              en: "The missing layer was last seen on the other side of the Świna.",
              cs: "Chybějící vrstvu naposledy viděli na druhé straně Świny."
            } },
            { speaker: "maks", placement: { x: 36, y: 81, width: 60, anchor: [70,62], edge: "top" }, text: {
              pl: "Więc następny trop czeka po drugiej stronie.",
              de: "Dann wartet der nächste Hinweis drüben.",
              en: "Then the next clue is waiting across the river.",
              cs: "Takže další stopa čeká na druhé straně."
            } }
          ]
        }
      ],
      nextTeaser: {
        pl: "Brakującą warstwę ostatnio widziano po drugiej stronie Świny. Co zostało z tropu po przeprawie?",
        de: "Die fehlende Schicht wurde zuletzt auf der anderen Seite der Świna gesehen. Was ist nach der Überfahrt noch von der Spur übrig?",
        en: "The missing layer was last seen across the Świna. What will be left of the trail after the crossing?",
        cs: "Chybějící vrstvu naposledy viděli na druhé straně Świny. Co ze stopy zůstane po přeplutí?"
      }
    },

    "season-1/beat-43-across-swina": {
      sceneCode: "scene-43-across-swina",
      nextEpisodeCode: "beat-50-view-from-above",
      panels: [
        {
          id: "public-crossing",
          artworkIndex: 0,
          protectedZones: [],
          lines: [
            { speaker: "maja", placement: { x: 4, y: 2, width: 46, anchor: [24,58], edge: "bottom" }, text: {
              pl: "Przeprawiamy się publiczną trasą i pilnujemy mapy.",
              de: "Wir nehmen die öffentliche Überfahrt und passen auf die Karte auf.",
              en: "We take the public crossing and keep hold of the map.",
              cs: "Použijeme veřejnou přepravu a hlídáme mapu."
            } },
            { speaker: "maks", placement: { x: 50, y: 3, width: 46, anchor: [74,58], edge: "bottom" }, text: {
              pl: "Frytki też?",
              de: "Und auf Frytka?",
              en: "And Frytka?",
              cs: "A Frytku taky?"
            } },
            { speaker: "lea", placement: { x: 8, y: 81, width: 84, anchor: [50,64], edge: "top" }, text: {
              pl: "Zwłaszcza Frytki.",
              de: "Vor allem auf Frytka.",
              en: "Especially Frytka.",
              cs: "Frytku hlavně."
            } }
          ]
        },
        {
          id: "gull-and-flash",
          artworkIndex: 1,
          protectedZones: [],
          lines: [
            { speaker: "maks", placement: { x: 4, y: 2, width: 46, anchor: [24,58], edge: "bottom" }, text: {
              pl: "Ona naprawdę myśli, że róg mapy to przekąska!",
              de: "Sie hält die Ecke der Karte wirklich für einen Snack!",
              en: "She really thinks the corner of the map is a snack!",
              cs: "Ona si vážně myslí, že roh mapy je svačina!"
            } },
            { speaker: "maja", placement: { x: 50, y: 3, width: 46, anchor: [74,58], edge: "bottom" }, text: {
              pl: "Trzymaj kartę. Mewa sobie poradzi.",
              de: "Halt die Karte fest. Die Möwe kommt klar.",
              en: "Hold the card. The gull will be fine.",
              cs: "Drž kartu. Racek si poradí."
            } },
            { speaker: "lea", placement: { x: 8, y: 81, width: 84, anchor: [50,64], edge: "top" }, text: {
              pl: "Czekajcie — światło trafiło w ten znak.",
              de: "Moment – das Licht trifft genau dieses Zeichen.",
              en: "Wait—the light just hit that mark.",
              cs: "Počkejte — světlo dopadlo přesně na ten znak."
            } }
          ]
        },
        {
          id: "toward-lighthouse",
          artworkIndex: 2,
          protectedZones: [],
          lines: [
            { speaker: "lea", placement: { x: 4, y: 2, width: 60, anchor: [30,58], edge: "bottom" }, text: {
              pl: "Ten błysk układa się w linię prosto ku latarni.",
              de: "Dieser Lichtblitz bildet eine Linie direkt zum Leuchtturm.",
              en: "That flash forms a line straight toward the lighthouse.",
              cs: "Ten záblesk skládá čáru přímo k majáku."
            } },
            { speaker: "maks", placement: { x: 36, y: 81, width: 60, anchor: [70,62], edge: "top" }, text: {
              pl: "Czyli odpowiedź zobaczymy dopiero z góry?",
              de: "Also sehen wir die Antwort erst von oben?",
              en: "So we only see the answer from above?",
              cs: "Takže odpověď uvidíme až shora?"
            } }
          ]
        }
      ],
      nextTeaser: {
        pl: "Błysk wskazuje latarnię morską. Czy z góry rozproszone linie wreszcie złożą się w jedną trasę?",
        de: "Der Lichtblitz weist zum Leuchtturm. Werden die verstreuten Linien von oben endlich zu einer einzigen Route?",
        en: "The flash points to the lighthouse. From above, will the scattered lines finally become one route?",
        cs: "Záblesk ukazuje k majáku. Složí se shora rozptýlené čáry konečně v jednu trasu?"
      }
    },

    "season-1/beat-50-view-from-above": {
      sceneCode: "scene-50-view-from-above",
      nextEpisodeCode: "beat-57-fort-answer",
      panels: [
        {
          id: "panorama",
          artworkIndex: 0,
          protectedZones: [],
          lines: [
            { speaker: "maja", placement: { x: 4, y: 2, width: 46, anchor: [24,58], edge: "bottom" }, text: {
              pl: "Z góry widać, dlaczego tyle tropów prowadziło przez port.",
              de: "Von hier oben sieht man, warum so viele Spuren durch den Hafen führten.",
              en: "From up here, you can see why so many clues crossed the harbour.",
              cs: "Shora je vidět, proč tolik stop vedlo přes přístav."
            } },
            { speaker: "lea", placement: { x: 50, y: 3, width: 46, anchor: [74,58], edge: "bottom" }, text: {
              pl: "Morze, Świna, port i wyspy — teraz mieszczą się w jednym widoku.",
              de: "Meer, Świna, Hafen und Inseln – jetzt passen sie in ein einziges Bild.",
              en: "The sea, the Świna, the harbour and the islands all fit into one view now.",
              cs: "Moře, Świna, přístav i ostrovy se teď vejdou do jednoho pohledu."
            } },
            { speaker: "maks", placement: { x: 8, y: 81, width: 84, anchor: [50,64], edge: "top" }, text: {
              pl: "Frytka też mieści się w panoramie?",
              de: "Passt Frytka auch ins Panorama?",
              en: "Does Frytka fit into the panorama too?",
              cs: "Vejde se do panoramatu i Frytka?"
            } }
          ]
        },
        {
          id: "align-the-map",
          artworkIndex: 1,
          protectedZones: [],
          lines: [
            { speaker: "lea", placement: { x: 4, y: 2, width: 46, anchor: [24,58], edge: "bottom" }, text: {
              pl: "Jeśli obrócę kartę zgodnie z panoramą, linie przestają się rozjeżdżać.",
              de: "Wenn ich die Karte an der Aussicht ausrichte, laufen die Linien nicht mehr auseinander.",
              en: "If I align the card with the panorama, the lines stop drifting apart.",
              cs: "Když kartu srovnám s panoramatem, čáry se přestanou rozcházet."
            } },
            { speaker: "maks", placement: { x: 50, y: 3, width: 46, anchor: [74,58], edge: "bottom" }, text: {
              pl: "To ja ustawię Frytkę.",
              de: "Dann richte ich Frytka aus.",
              en: "Then I’ll align Frytka.",
              cs: "Tak já srovnám Frytku."
            } },
            { speaker: "maja", placement: { x: 8, y: 81, width: 84, anchor: [50,64], edge: "top" }, text: {
              pl: "Mapę wystarczy.",
              de: "Die Karte reicht.",
              en: "The map will do.",
              cs: "Mapa stačí."
            } }
          ]
        },
        {
          id: "four-lines",
          artworkIndex: 2,
          protectedZones: [],
          lines: [
            { speaker: "lea", placement: { x: 4, y: 2, width: 60, anchor: [30,58], edge: "bottom" }, text: {
              pl: "Cztery linie zbiegają się przy jednym forcie.",
              de: "Vier Linien treffen sich bei einem einzigen Fort.",
              en: "Four lines meet beside a single fort.",
              cs: "Čtyři čáry se sbíhají u jediné pevnosti."
            } },
            { speaker: "maja", placement: { x: 36, y: 81, width: 60, anchor: [70,62], edge: "top" }, text: {
              pl: "Fort Gerharda. Tylko dlaczego właśnie tam?",
              de: "Fort Gerharda. Aber warum ausgerechnet dort?",
              en: "Fort Gerharda. But why there?",
              cs: "Fort Gerharda. Ale proč právě tam?"
            } }
          ]
        }
      ],
      nextTeaser: {
        pl: "Cztery linie prowadzą do Fortu Gerharda. Jakiej odpowiedzi ma udzielić fort?",
        de: "Vier Linien führen zum Fort Gerharda. Welche Antwort soll das Fort geben?",
        en: "Four lines lead to Fort Gerharda. What answer is the fort supposed to give?",
        cs: "Čtyři čáry vedou k Fortu Gerharda. Jakou odpověď má pevnost dát?"
      }
    },

    "season-1/beat-57-fort-answer": {
      sceneCode: "scene-57-fort-answer",
      nextEpisodeCode: "beat-64-beneath-dunes",
      panels: [
        {
          id: "organised-visit",
          artworkIndex: 0,
          protectedZones: [],
          lines: [
            { speaker: "maja", placement: { x: 4, y: 2, width: 46, anchor: [24,58], edge: "bottom" }, text: {
              pl: "Trzymamy się trasy zwiedzania. Ten fort chronił wejście do portu.",
              de: "Wir bleiben auf der Besucherroute. Dieses Fort schützte die Hafeneinfahrt.",
              en: "We stay on the visitor route. This fort guarded the harbour entrance.",
              cs: "Držíme se návštěvní trasy. Tahle pevnost chránila vjezd do přístavu."
            } },
            { speaker: "maks", placement: { x: 50, y: 3, width: 46, anchor: [74,58], edge: "bottom" }, text: {
              pl: "Czyli był strażnikiem wejścia?",
              de: "Also war es der Wächter am Eingang?",
              en: "So it was the gatekeeper?",
              cs: "Takže to byl strážce vjezdu?"
            } },
            { speaker: "lea", placement: { x: 8, y: 81, width: 84, anchor: [50,64], edge: "top" }, text: {
              pl: "I jego układ pasuje do następnego znaku na karcie.",
              de: "Und seine Form passt zum nächsten Zeichen auf der Karte.",
              en: "And its layout matches the next mark on the card.",
              cs: "A jeho půdorys odpovídá dalšímu znaku na kartě."
            } }
          ]
        },
        {
          id: "printed-riddle",
          artworkIndex: 1,
          protectedZones: [],
          lines: [
            { speaker: "lea", placement: { x: 4, y: 2, width: 46, anchor: [24,58], edge: "bottom" }, text: {
              pl: "Symbol z karty pasuje do drukowanej zagadki z naszego zestawu.",
              de: "Das Symbol auf der Karte passt zu dem gedruckten Rätsel aus unserem Set.",
              en: "The symbol on the card matches the printed riddle from our set.",
              cs: "Symbol na kartě odpovídá vytištěné hádance z naší sady."
            } },
            { speaker: "maks", placement: { x: 50, y: 3, width: 46, anchor: [74,58], edge: "bottom" }, text: {
              pl: "Wreszcie coś, co wygląda jak odpowiedź.",
              de: "Endlich etwas, das wie eine Antwort aussieht.",
              en: "Finally, something that looks like an answer.",
              cs: "Konečně něco, co vypadá jako odpověď."
            } },
            { speaker: "maja", placement: { x: 8, y: 81, width: 84, anchor: [50,64], edge: "top" }, text: {
              pl: "Raczej wskazówka. Przeczytaj do końca.",
              de: "Eher ein Hinweis. Lies bis zum Ende.",
              en: "More like a clue. Read it to the end.",
              cs: "Spíš nápověda. Dočti ji až do konce."
            } }
          ]
        },
        {
          id: "invisible-city",
          artworkIndex: 2,
          protectedZones: [],
          lines: [
            { speaker: "maks", placement: { x: 4, y: 2, width: 60, anchor: [30,58], edge: "bottom" }, text: {
              pl: "„Miasto, którego nie widać z ulicy”… Jak można nie widzieć miasta?",
              de: "„Eine Stadt, die man von der Straße nicht sieht“… Wie kann man eine Stadt nicht sehen?",
              en: "“A city you cannot see from the street”… How can you not see a city?",
              cs: "„Město, které z ulice není vidět“… Jak může být město neviditelné?"
            } },
            { speaker: "lea", placement: { x: 36, y: 81, width: 60, anchor: [70,62], edge: "top" }, text: {
              pl: "Jeśli jest pod nami, można.",
              de: "Wenn sie unter uns liegt, schon.",
              en: "If it is underneath us, you can.",
              cs: "Pokud je pod námi, tak může."
            } }
          ]
        }
      ],
      nextTeaser: {
        pl: "Wskazówka prowadzi do Podziemnego Miasta pod wydmami. Co brakująca warstwa pokaże pod ziemią?",
        de: "Der Hinweis führt zur Unterirdischen Stadt unter den Dünen. Was wird die fehlende Schicht unter der Erde zeigen?",
        en: "The clue leads to the Underground City beneath the dunes. What will the missing layer reveal underground?",
        cs: "Nápověda vede do Podzemního města pod dunami. Co chybějící vrstva ukáže pod zemí?"
      }
    },

    "season-1/beat-64-beneath-dunes": {
      sceneCode: "scene-64-beneath-dunes",
      nextEpisodeCode: "beat-71-line-under-river",
      panels: [
        {
          id: "official-route",
          artworkIndex: 0,
          protectedZones: [],
          lines: [
            { speaker: "maja", placement: { x: 4, y: 2, width: 46, anchor: [24,58], edge: "bottom" }, text: {
              pl: "Tu idziemy tylko oficjalną trasą z przewodnikiem.",
              de: "Hier bleiben wir auf der offiziellen Route mit dem Guide.",
              en: "Here we stay on the official guided route.",
              cs: "Tady zůstáváme na oficiální trase s průvodcem."
            } },
            { speaker: "maks", placement: { x: 50, y: 3, width: 46, anchor: [74,58], edge: "bottom" }, text: {
              pl: "Miasto pod wydmami. To brzmi jak najlepsza część zagadki.",
              de: "Eine Stadt unter den Dünen. Das klingt nach dem besten Teil des Rätsels.",
              en: "A city beneath the dunes. That sounds like the best part of the mystery.",
              cs: "Město pod dunami. To zní jako nejlepší část záhady."
            } },
            { speaker: "lea", placement: { x: 8, y: 81, width: 84, anchor: [50,64], edge: "top" }, text: {
              pl: "Patrz na kartę, nie na boczne przejścia.",
              de: "Schau auf die Karte, nicht in die Seitengänge.",
              en: "Watch the card, not the side passages.",
              cs: "Sleduj kartu, ne boční chodby."
            } }
          ]
        },
        {
          id: "torch-reflection",
          artworkIndex: 1,
          protectedZones: [],
          lines: [
            { speaker: "maks", placement: { x: 4, y: 2, width: 46, anchor: [24,58], edge: "bottom" }, text: {
              pl: "Latarka odbiła się dokładnie w pustym miejscu!",
              de: "Die Lampe hat sich genau in der leeren Stelle gespiegelt!",
              en: "The torch reflected right into the empty space!",
              cs: "Svítilna se odrazila přesně do prázdného místa!"
            } },
            { speaker: "lea", placement: { x: 50, y: 3, width: 46, anchor: [74,58], edge: "bottom" }, text: {
              pl: "Nie sama latarka. Jej odbicie domknęło wzór.",
              de: "Nicht die Lampe selbst. Ihre Spiegelung hat das Muster geschlossen.",
              en: "Not the torch itself. Its reflection completed the pattern.",
              cs: "Ne samotná svítilna. Její odraz dokončil vzor."
            } },
            { speaker: "maja", placement: { x: 8, y: 81, width: 84, anchor: [50,64], edge: "top" }, text: {
              pl: "Przypadek, który warto sprawdzić.",
              de: "Ein Zufall, den wir prüfen sollten.",
              en: "A coincidence worth checking.",
              cs: "Náhoda, kterou stojí za to prověřit."
            } }
          ]
        },
        {
          id: "under-water-line",
          artworkIndex: 2,
          protectedZones: [],
          lines: [
            { speaker: "lea", placement: { x: 4, y: 2, width: 60, anchor: [30,58], edge: "bottom" }, text: {
              pl: "Nowa linia biegnie dalej — pod wodą.",
              de: "Eine neue Linie läuft weiter – unter dem Wasser.",
              en: "A new line keeps going—under the water.",
              cs: "Nová čára pokračuje dál — pod vodou."
            } },
            { speaker: "maks", placement: { x: 36, y: 81, width: 60, anchor: [70,62], edge: "top" }, text: {
              pl: "Pod wodą? To którędy mamy iść?",
              de: "Unter Wasser? Wo sollen wir denn dann lang?",
              en: "Underwater? So which way are we supposed to go?",
              cs: "Pod vodou? Tak kudy máme jít?"
            } }
          ]
        }
      ],
      nextTeaser: {
        pl: "Linia znika pod Świną. Czy mapa wskazuje drogę, której nie widać na powierzchni?",
        de: "Die Linie verschwindet unter der Świna. Zeigt die Karte einen Weg, den man an der Oberfläche nicht sieht?",
        en: "The line disappears beneath the Świna. Is the map pointing to a route that cannot be seen on the surface?",
        cs: "Čára mizí pod Świnou. Ukazuje mapa cestu, kterou na povrchu není vidět?"
      }
    },

    "season-1/beat-71-line-under-river": {
      sceneCode: "scene-71-line-under-river",
      nextEpisodeCode: "beat-79-karsiborska-silence",
      panels: [
        {
          id: "modern-link",
          artworkIndex: 0,
          protectedZones: [],
          lines: [
            { speaker: "lea", placement: { x: 4, y: 2, width: 46, anchor: [24,58], edge: "bottom" }, text: {
              pl: "Ta linia nie kończy się w wodzie. Łączy Uznam z Wolinem.",
              de: "Die Linie endet nicht im Wasser. Sie verbindet Usedom mit Wolin.",
              en: "The line does not end in the water. It connects Uznam and Wolin.",
              cs: "Ta čára nekončí ve vodě. Spojuje Uznam s Wolinem."
            } },
            { speaker: "maks", placement: { x: 50, y: 3, width: 46, anchor: [74,58], edge: "bottom" }, text: {
              pl: "Czyli mapa przewidziała tunel?",
              de: "Hat die Karte also den Tunnel vorhergesagt?",
              en: "So the map predicted the tunnel?",
              cs: "Takže mapa předpověděla tunel?"
            } },
            { speaker: "maja", placement: { x: 8, y: 81, width: 84, anchor: [50,64], edge: "top" }, text: {
              pl: "Nie. Tunel jest współczesny, tak samo jak ta zagadka.",
              de: "Nein. Der Tunnel ist modern – genau wie dieses Rätsel.",
              en: "No. The tunnel is modern, just like this mystery.",
              cs: "Ne. Tunel je současný, stejně jako tahle záhada."
            } }
          ]
        },
        {
          id: "old-and-new",
          artworkIndex: 1,
          protectedZones: [],
          lines: [
            { speaker: "maja", placement: { x: 4, y: 2, width: 46, anchor: [24,58], edge: "bottom" }, text: {
              pl: "Najpierw znaki nawigacyjne, potem prom, teraz tunel.",
              de: "Erst Seezeichen, dann die Fähre, jetzt der Tunnel.",
              en: "First navigation marks, then the ferry, now the tunnel.",
              cs: "Nejdřív navigační znaky, potom trajekt, teď tunel."
            } },
            { speaker: "lea", placement: { x: 50, y: 3, width: 46, anchor: [74,58], edge: "bottom" }, text: {
              pl: "Stare i nowe sposoby orientacji są częścią tej samej opowieści.",
              de: "Alte und neue Wege der Orientierung gehören zu derselben Geschichte.",
              en: "Old and new ways of finding your way are part of the same story.",
              cs: "Staré i nové způsoby orientace patří do stejného příběhu."
            } },
            { speaker: "maks", placement: { x: 8, y: 81, width: 84, anchor: [50,64], edge: "top" }, text: {
              pl: "Czyli nadawca lubi łączyć epoki.",
              de: "Dann verbindet der Absender gern verschiedene Zeiten.",
              en: "So the sender likes connecting different eras.",
              cs: "Takže odesílatel rád propojuje různé doby."
            } }
          ]
        },
        {
          id: "bird-in-reeds",
          artworkIndex: 2,
          protectedZones: [],
          lines: [
            { speaker: "lea", placement: { x: 4, y: 2, width: 60, anchor: [30,58], edge: "bottom" }, text: {
              pl: "Pojawił się następny znak — ptak pośród trzcin.",
              de: "Das nächste Zeichen ist da – ein Vogel zwischen Schilf.",
              en: "The next symbol is here—a bird among the reeds.",
              cs: "Objevil se další znak — pták mezi rákosím."
            } },
            { speaker: "maja", placement: { x: 36, y: 81, width: 60, anchor: [70,62], edge: "top" }, text: {
              pl: "To kieruje nas tam, gdzie najważniejsze jest nie przeszkadzać.",
              de: "Das führt uns an einen Ort, an dem Nicht-Stören am wichtigsten ist.",
              en: "That points us somewhere where not disturbing anything matters most.",
              cs: "To nás vede tam, kde je nejdůležitější nic nerušit."
            } }
          ]
        }
      ],
      nextTeaser: {
        pl: "Ptak pośród trzcin prowadzi ku Karsiborskiej Kępie. Czy znak naprawdę oznacza jednego ptaka?",
        de: "Der Vogel zwischen Schilf führt zur Karsiborska Kępa. Steht das Zeichen wirklich für einen einzelnen Vogel?",
        en: "The bird among the reeds points toward Karsiborska Kępa. Does the symbol really mean one bird?",
        cs: "Pták mezi rákosím vede ke Karsiborské Kępě. Znamená ten znak opravdu jednoho ptáka?"
      }
    },

    "season-1/beat-79-karsiborska-silence": {
      sceneCode: "scene-79-karsiborska-silence",
      nextEpisodeCode: "beat-86-map-44-islands",
      panels: [
        {
          id: "quiet-route",
          artworkIndex: 0,
          protectedZones: [],
          lines: [
            { speaker: "maja", placement: { x: 4, y: 2, width: 46, anchor: [24,58], edge: "bottom" }, text: {
              pl: "Zostajemy na dozwolonej ścieżce i obserwujemy z dystansu.",
              de: "Wir bleiben auf dem erlaubten Weg und beobachten aus der Distanz.",
              en: "We stay on the permitted path and watch from a distance.",
              cs: "Zůstaneme na povolené stezce a pozorujeme z odstupu."
            } },
            { speaker: "maks", placement: { x: 50, y: 3, width: 46, anchor: [74,58], edge: "bottom" }, text: {
              pl: "Nawet Frytka ma być cicho?",
              de: "Sogar Frytka soll leise sein?",
              en: "Even Frytka has to be quiet?",
              cs: "Dokonce i Frytka má být potichu?"
            } },
            { speaker: "lea", placement: { x: 8, y: 81, width: 84, anchor: [50,64], edge: "top" }, text: {
              pl: "Zwłaszcza Frytka.",
              de: "Vor allem Frytka.",
              en: "Especially Frytka.",
              cs: "Frytka hlavně."
            } }
          ]
        },
        {
          id: "not-one-bird",
          artworkIndex: 1,
          protectedZones: [],
          lines: [
            { speaker: "lea", placement: { x: 4, y: 2, width: 46, anchor: [24,58], edge: "bottom" }, text: {
              pl: "Ten znak wcale nie pokazuje jednego gatunku.",
              de: "Das Zeichen zeigt gar keine einzelne Vogelart.",
              en: "The symbol is not showing a single species at all.",
              cs: "Ten znak vůbec neukazuje jeden druh."
            } },
            { speaker: "maks", placement: { x: 50, y: 3, width: 46, anchor: [74,58], edge: "bottom" }, text: {
              pl: "To czemu wygląda jak ptak?",
              de: "Warum sieht es dann wie ein Vogel aus?",
              en: "Then why does it look like a bird?",
              cs: "Tak proč vypadá jako pták?"
            } },
            { speaker: "maja", placement: { x: 8, y: 81, width: 84, anchor: [50,64], edge: "top" }, text: {
              pl: "Bo patrzyliśmy na szczegół zamiast na cały kształt.",
              de: "Weil wir auf ein Detail statt auf die ganze Form geschaut haben.",
              en: "Because we were looking at a detail instead of the whole shape.",
              cs: "Protože jsme sledovali detail místo celého tvaru."
            } }
          ]
        },
        {
          id: "delta-islands",
          artworkIndex: 2,
          protectedZones: [],
          lines: [
            { speaker: "lea", placement: { x: 4, y: 2, width: 60, anchor: [30,58], edge: "bottom" }, text: {
              pl: "To kształt delty. A na mapie pojawiają się dziesiątki małych wysp.",
              de: "Es ist die Form des Deltas. Und auf der Karte erscheinen Dutzende kleiner Inseln.",
              en: "It is the shape of the delta. And dozens of small islands are appearing on the map.",
              cs: "Je to tvar delty. A na mapě se objevují desítky malých ostrovů."
            } },
            { speaker: "maks", placement: { x: 36, y: 81, width: 60, anchor: [70,62], edge: "top" }, text: {
              pl: "Dziesiątki? Ile ich właściwie jest?",
              de: "Dutzende? Wie viele sind es eigentlich?",
              en: "Dozens? How many are there actually?",
              cs: "Desítky? Kolik jich vlastně je?"
            } }
          ]
        }
      ],
      nextTeaser: {
        pl: "Mapa wypełnia się wyspami. Ile z nich naprawdę tworzy Świnoujście — i co łączy cały przebyty szlak?",
        de: "Die Karte füllt sich mit Inseln. Wie viele bilden Świnoujście wirklich – und was verbindet die ganze bisherige Route?",
        en: "The map is filling with islands. How many really make up Świnoujście—and what connects the entire route so far?",
        cs: "Mapa se plní ostrovy. Kolik jich skutečně tvoří Świnoujście — a co spojuje celou dosavadní trasu?"
      }
    },

    "season-1/beat-86-map-44-islands": {
      sceneCode: "scene-86-map-44-islands",
      nextEpisodeCode: "beat-93-four-layers",
      panels: [
        {
          id: "official-map",
          artworkIndex: 0,
          protectedZones: [],
          lines: [
            { speaker: "lea", placement: { x: 4, y: 2, width: 46, anchor: [24,58], edge: "bottom" }, text: {
              pl: "Oficjalna mapa potwierdza: Świnoujście leży na 44 wyspach.",
              de: "Die offizielle Karte bestätigt es: Świnoujście liegt auf 44 Inseln.",
              en: "The official map confirms it: Świnoujście lies across 44 islands.",
              cs: "Oficiální mapa to potvrzuje: Świnoujście leží na 44 ostrovech."
            } },
            { speaker: "maks", placement: { x: 50, y: 3, width: 46, anchor: [74,58], edge: "bottom" }, text: {
              pl: "Czterdzieści cztery? A my byliśmy na ilu?",
              de: "Vierundvierzig? Und auf wie vielen waren wir?",
              en: "Forty-four? How many have we been on?",
              cs: "Čtyřicet čtyři? A na kolika jsme byli?"
            } },
            { speaker: "maja", placement: { x: 8, y: 81, width: 84, anchor: [50,64], edge: "top" }, text: {
              pl: "Nie musimy odwiedzić wszystkich, żeby zrozumieć układ.",
              de: "Wir müssen nicht alle besuchen, um das Muster zu verstehen.",
              en: "We do not need to visit every one to understand the pattern.",
              cs: "Nemusíme navštívit všechny, abychom pochopili celek."
            } }
          ]
        },
        {
          id: "three-inhabited",
          artworkIndex: 1,
          protectedZones: [],
          lines: [
            { speaker: "maja", placement: { x: 4, y: 2, width: 46, anchor: [24,58], edge: "bottom" }, text: {
              pl: "Stale zamieszkane są Uznam, Wolin i Karsibór.",
              de: "Dauerhaft bewohnt sind Usedom, Wolin und Karsibór.",
              en: "Uznam, Wolin and Karsibór are permanently inhabited.",
              cs: "Trvale obydlené jsou Uznam, Wolin a Karsibór."
            } },
            { speaker: "lea", placement: { x: 50, y: 3, width: 46, anchor: [74,58], edge: "bottom" }, text: {
              pl: "A nasze przystanki układają się między nimi w jeden szlak.",
              de: "Und unsere Stationen bilden zwischen ihnen eine einzige Route.",
              en: "And our stops form one route between them.",
              cs: "A naše zastávky mezi nimi tvoří jednu trasu."
            } },
            { speaker: "maks", placement: { x: 8, y: 81, width: 84, anchor: [50,64], edge: "top" }, text: {
              pl: "Czyli wreszcie mamy całą mapę?",
              de: "Haben wir jetzt endlich die ganze Karte?",
              en: "So do we finally have the whole map?",
              cs: "Takže už konečně máme celou mapu?"
            } }
          ]
        },
        {
          id: "still-missing",
          artworkIndex: 2,
          protectedZones: [],
          lines: [
            { speaker: "lea", placement: { x: 4, y: 2, width: 60, anchor: [30,58], edge: "bottom" }, text: {
              pl: "Cały szlak — tak. Ale nadal brakuje czwartej przezroczystej warstwy.",
              de: "Die ganze Route – ja. Aber die vierte transparente Schicht fehlt immer noch.",
              en: "The whole route—yes. But the fourth transparent layer is still missing.",
              cs: "Celou trasu — ano. Ale čtvrtá průhledná vrstva pořád chybí."
            } },
            { speaker: "maks", placement: { x: 36, y: 81, width: 60, anchor: [70,62], edge: "top" }, text: {
              pl: "A jeśli mieliśmy ją przy sobie od samego początku?",
              de: "Und wenn wir sie von Anfang an bei uns hatten?",
              en: "What if we have had it with us since the very beginning?",
              cs: "Co když jsme ji měli u sebe od samého začátku?"
            } }
          ]
        }
      ],
      nextTeaser: {
        pl: "Szlak jest kompletny, lecz brakuje jednej warstwy. Czy odpowiedź była z nimi od chwili znalezienia koperty?",
        de: "Die Route ist vollständig, doch eine Schicht fehlt. War die Antwort seit dem Fund des Umschlags die ganze Zeit bei ihnen?",
        en: "The route is complete, but one layer is missing. Has the answer been with them since they found the envelope?",
        cs: "Trasa je úplná, ale jedna vrstva chybí. Byla odpověď s nimi už od chvíle, kdy našli obálku?"
      }
    },

    "season-1/beat-93-four-layers": {
      sceneCode: "scene-93-four-layers",
      nextEpisodeCode: "beat-100-course-found",
      panels: [
        {
          id: "three-on-plan",
          artworkIndex: 0,
          protectedZones: [],
          lines: [
            { speaker: "lea", placement: { x: 4, y: 2, width: 46, anchor: [24,58], edge: "bottom" }, text: {
              pl: "Trzy karty pasują do oficjalnego planu, ale zostawiają dokładnie jedną lukę.",
              de: "Drei Karten passen auf den offiziellen Plan, lassen aber genau eine Lücke.",
              en: "Three cards fit the official map, but they leave exactly one gap.",
              cs: "Tři karty sedí na oficiální plán, ale nechávají přesně jednu mezeru."
            } },
            { speaker: "maja", placement: { x: 50, y: 3, width: 46, anchor: [74,58], edge: "bottom" }, text: {
              pl: "Czyli brakująca warstwa musi mieć ten sam format.",
              de: "Dann muss die fehlende Schicht dasselbe Format haben.",
              en: "Then the missing layer must have the same format.",
              cs: "Takže chybějící vrstva musí mít stejný formát."
            } },
            { speaker: "maks", placement: { x: 8, y: 81, width: 84, anchor: [50,64], edge: "top" }, text: {
              pl: "I cały czas czegoś przezroczystego szukamy.",
              de: "Und die ganze Zeit suchen wir etwas Durchsichtiges.",
              en: "And we have been looking for something transparent this whole time.",
              cs: "A celou dobu hledáme něco průhledného."
            } }
          ]
        },
        {
          id: "envelope-sleeve",
          artworkIndex: 1,
          protectedZones: [],
          lines: [
            { speaker: "maks", placement: { x: 4, y: 2, width: 46, anchor: [24,58], edge: "bottom" }, text: {
              pl: "Obwoluta koperty! Przecież ona też jest przezroczysta.",
              de: "Die Hülle des Umschlags! Sie ist doch auch durchsichtig.",
              en: "The envelope sleeve! It is transparent too.",
              cs: "Obal obálky! Vždyť je také průhledný."
            } },
            { speaker: "lea", placement: { x: 50, y: 3, width: 46, anchor: [74,58], edge: "bottom" }, text: {
              pl: "I ma dokładnie ten sam wymiar.",
              de: "Und sie hat genau dieselben Maße.",
              en: "And it is exactly the same size.",
              cs: "A má přesně stejný rozměr."
            } },
            { speaker: "maja", placement: { x: 8, y: 81, width: 84, anchor: [50,64], edge: "top" }, text: {
              pl: "Nałóż ją na pozostałe.",
              de: "Leg sie über die anderen.",
              en: "Lay it over the others.",
              cs: "Polož ho přes ostatní."
            } }
          ]
        },
        {
          id: "back-to-stawa",
          artworkIndex: 2,
          protectedZones: [],
          lines: [
            { speaker: "lea", placement: { x: 4, y: 2, width: 60, anchor: [30,58], edge: "bottom" }, text: {
              pl: "Cztery warstwy wskazują znowu Stawę Młyny.",
              de: "Alle vier Schichten weisen wieder zur Stawa Młyny.",
              en: "All four layers point back to Stawa Młyny.",
              cs: "Všechny čtyři vrstvy znovu ukazují ke Stawě Młyny."
            } },
            { speaker: "maks", placement: { x: 36, y: 81, width: 60, anchor: [70,62], edge: "top" }, text: {
              pl: "Tylko tym razem mapa pokazuje ją po zmroku.",
              de: "Nur zeigt die Karte sie diesmal nach Einbruch der Dunkelheit.",
              en: "Except this time the map shows it after dark.",
              cs: "Jenže tentokrát ji mapa ukazuje po setmění."
            } }
          ]
        }
      ],
      nextTeaser: {
        pl: "Kompletna mapa wraca do Stawy Młyny po zmroku. Co pokaże trasa w miejscu, gdzie wszystko się zaczęło?",
        de: "Die vollständige Karte führt nach Einbruch der Dunkelheit zurück zur Stawa Młyny. Was zeigt die Route dort, wo alles begann?",
        en: "The complete map returns to Stawa Młyny after dark. What will the route reveal where everything began?",
        cs: "Kompletní mapa se po setmění vrací ke Stawě Młyny. Co trasa ukáže tam, kde všechno začalo?"
      }
    },

    "season-1/beat-100-course-found": {
      sceneCode: "scene-100-course-found",
      nextEpisodeCode: null,
      panels: [
        {
          id: "return-to-start",
          artworkIndex: 0,
          protectedZones: [],
          lines: [
            { speaker: "lea", placement: { x: 4, y: 2, width: 60, anchor: [30,58], edge: "bottom" }, text: {
              pl: "Cztery warstwy. Wreszcie jedna kompletna mapa.",
              de: "Vier Schichten. Endlich eine vollständige Karte.",
              en: "Four layers. Finally, one complete map.",
              cs: "Čtyři vrstvy. Konečně jedna kompletní mapa."
            } },
            { speaker: "maja", placement: { x: 36, y: 81, width: 60, anchor: [70,62], edge: "top" }, text: {
              pl: "I wróciliśmy dokładnie tam, gdzie wszystko się zaczęło.",
              de: "Und wir sind genau dort zurück, wo alles angefangen hat.",
              en: "And we have come back exactly where everything started.",
              cs: "A vrátili jsme se přesně tam, kde všechno začalo."
            } }
          ]
        },
        {
          id: "four-ideas",
          artworkIndex: 1,
          protectedZones: [],
          lines: [
            { speaker: "lea", placement: { x: 4, y: 2, width: 46, anchor: [24,58], edge: "bottom" }, text: {
              pl: "Cztery znaki składają się w cztery tematy: nawigację, pamięć, przyrodę i połączenie wysp.",
              de: "Die vier Zeichen ergeben vier Themen: Navigation, Erinnerung, Natur und die Verbindung der Inseln.",
              en: "The four symbols form four themes: navigation, memory, nature and the connection between the islands.",
              cs: "Čtyři znaky tvoří čtyři témata: navigaci, paměť, přírodu a propojení ostrovů."
            } },
            { speaker: "maks", placement: { x: 50, y: 3, width: 46, anchor: [74,58], edge: "bottom" }, text: {
              pl: "Czyli skarbem była cała trasa?",
              de: "War also die ganze Route der Schatz?",
              en: "So the whole route was the treasure?",
              cs: "Takže pokladem byla celá trasa?"
            } },
            { speaker: "maja", placement: { x: 8, y: 81, width: 84, anchor: [50,64], edge: "top" }, text: {
              pl: "I to, co połączyliśmy po drodze.",
              de: "Und das, was wir unterwegs miteinander verbunden haben.",
              en: "And what we connected along the way.",
              cs: "A to, co jsme cestou propojili."
            } }
          ]
        },
        {
          id: "second-map",
          artworkIndex: 2,
          protectedZones: [],
          lines: [
            { speaker: "maks", placement: { x: 4, y: 2, width: 46, anchor: [24,58], edge: "bottom" }, text: {
              pl: "Hej — na odwrocie też coś jest.",
              de: "Hey – auf der Rückseite ist auch etwas.",
              en: "Hey—there is something on the back too.",
              cs: "Hej — na zadní straně je taky něco."
            } },
            { speaker: "lea", placement: { x: 50, y: 3, width: 46, anchor: [74,58], edge: "bottom" }, text: {
              pl: "Podpis „K.” i początek drugiej mapy.",
              de: "Die Signatur „K.“ und der Anfang einer zweiten Karte.",
              en: "A “K.” signature and the beginning of a second map.",
              cs: "Podpis „K.“ a začátek druhé mapy."
            } },
            { speaker: "maja", placement: { x: 8, y: 81, width: 84, anchor: [50,64], edge: "top" }, text: {
              pl: "A ta linia wychodzi poza zachodnią krawędź naszej trasy.",
              de: "Und diese Linie führt über den westlichen Rand unserer Route hinaus.",
              en: "And that line goes beyond the western edge of our route.",
              cs: "A tahle čára vede za západní okraj naší trasy."
            } }
          ]
        }
      ]
    }
  }
};
