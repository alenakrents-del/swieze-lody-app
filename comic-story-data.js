/* Localized presentation scripts for the approved Season 1 comic slice.
 * This is not an unlock catalog: season/episode access, ordering and thresholds
 * always come from the server. Artwork remains language-neutral.
 * Keep speaker IDs stable; each panel is read top-to-bottom without interaction.
 */
window.comicStoryData = {
  version: 5,
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
    }
  }
};
