(() => {
  'use strict';

  const L = (pl, de, en, cs) => ({ pl, de, en, cs });

  window.comicLongformV1 = {
    version: 1,
    episodes: {
      '01': {
        codes: ['beat-00-unmarked-envelope'],
        titles: [
          'Koperta bez nadawcy',
          'Der Umschlag ohne Absender',
          'The Unmarked Envelope',
          'Obálka bez odesílatele'
        ],
        panels: [
          {
            blocks: [
              { type:'narration', text:L(
                'Na promenadzie Maks pierwszy zauważa biały, sztywny kopertowy pakiet. Nie ma na nim nazwiska, adresu ani logo.',
                'Auf der Promenade entdeckt Maks als Erster einen festen weißen Umschlag. Kein Name, keine Adresse, kein Logo.',
                'On the promenade, Maks is the first to spot a stiff white envelope. There is no name, address or logo on it.',
                'Na promenádě si Maks jako první všimne pevné bílé obálky. Není na ní jméno, adresa ani logo.'
              )},
              { speaker:'maks', text:L(
                'Patrzcie! Koperta. I nic na niej — ani imienia, ani adresu.',
                'Schaut! Ein Umschlag. Und nichts darauf – kein Name, keine Adresse.',
                'Look! An envelope. And nothing on it—no name, no address.',
                'Podívejte! Obálka. A nic na ní — žádné jméno, žádná adresa.'
              )},
              { speaker:'maja', text:L(
                'Pierwsza zasada: nie rozwiązujemy zagadki, dopóki nie wiemy, czy to w ogóle zagadka.',
                'Erste Regel: Wir lösen kein Rätsel, bevor wir wissen, ob es überhaupt eines ist.',
                'First rule: we do not solve a mystery until we know it actually is one.',
                'První pravidlo: neřešíme záhadu, dokud nevíme, jestli je to vůbec záhada.'
              )},
              { speaker:'maks', text:L(
                'Za późno. Już zdecydowałem, że w środku jest mapa skarbu.',
                'Zu spät. Ich habe schon entschieden, dass darin eine Schatzkarte ist.',
                'Too late. I already decided there is a treasure map inside.',
                'Pozdě. Už jsem rozhodl, že uvnitř je mapa pokladu.'
              )},
              { speaker:'lea', text:L(
                'Jak na mapę skarbu jest podejrzanie przezroczysta.',
                'Für eine Schatzkarte ist sie verdächtig durchsichtig.',
                'For a treasure map, it is suspiciously transparent.',
                'Na mapu pokladu je podezřele průhledná.'
              )},
              { type:'narration', text:L(
                'Lea wyjmuje cienkie, przezroczyste prostokątne arkusze z liniami i symbolami. Frytka natychmiast próbuje dziobnąć róg koperty.',
                'Lea zieht dünne, transparente rechteckige Blätter mit Linien und Symbolen heraus. Frytka versucht sofort, in die Ecke des Umschlags zu picken.',
                'Lea takes out thin transparent rectangular sheets marked with lines and symbols. Frytka immediately tries to peck the corner of the envelope.',
                'Lea vytáhne tenké průhledné obdélníkové listy s čarami a symboly. Frytka se hned pokusí klovnout do rohu obálky.'
              )},
              { speaker:'lea', text:L(
                'Hej. Nie jedz dowodu.',
                'Hey. Friss nicht den Beweis.',
                'Hey. Do not eat the evidence.',
                'Hej. Nejez důkaz.'
              )},
              { speaker:'maks', text:L(
                'Może zna nadawcę.',
                'Vielleicht kennt sie den Absender.',
                'Maybe she knows the sender.',
                'Možná zná odesílatele.'
              )},
              { speaker:'maja', text:L(
                'Albo po prostu uważa papier za obiad.',
                'Oder sie hält Papier einfach für Mittagessen.',
                'Or she simply thinks paper is lunch.',
                'Nebo prostě považuje papír za oběd.'
              )}
            ]
          },
          {
            blocks: [
              { type:'narration', text:L(
                'Lea nakłada arkusze na siebie i powoli je obraca.',
                'Lea legt die Blätter übereinander und dreht sie langsam.',
                'Lea layers the sheets and slowly rotates them.',
                'Lea položí listy přes sebe a pomalu je otáčí.'
              )},
              { speaker:'lea', text:L(
                'Chwileczkę. Niektóre linie są dalszym ciągiem innych.',
                'Moment. Einige Linien setzen andere fort.',
                'Wait. Some of these lines continue into one another.',
                'Počkejte. Některé čáry na sebe navazují.'
              )},
              { speaker:'maks', text:L(
                'Czyli zaraz pojawi się krzyżyk i napis „skarb tutaj”.',
                'Dann erscheint gleich ein Kreuz und „Schatz hier“.',
                'So any second now we get a cross and “treasure here”.',
                'Takže se za chvíli objeví křížek a nápis „poklad tady“.'
              )},
              { speaker:'maja', text:L(
                'A jeśli nie?',
                'Und wenn nicht?',
                'And if we do not?',
                'A když ne?'
              )},
              { speaker:'maks', text:L(
                'To nadawca za mało się postarał.',
                'Dann hat sich der Absender nicht genug Mühe gegeben.',
                'Then the sender did not try hard enough.',
                'Tak se odesílatel málo snažil.'
              )},
              { speaker:'lea', text:L(
                'Pełny wzór jeszcze nie wychodzi. Ale to na pewno nie jest przypadkowy zestaw kresek.',
                'Ein vollständiges Muster entsteht noch nicht. Aber zufällig sind diese Linien sicher nicht.',
                'It still does not form a complete pattern. But these lines are definitely not random.',
                'Úplný vzor z toho zatím není. Ale ty čáry rozhodně nejsou náhodné.'
              )},
              { speaker:'maja', text:L(
                'Dobrze. Bez zgadywania. Sprawdzamy najpierw to, co już potrafimy odczytać.',
                'Gut. Kein Raten. Wir prüfen zuerst, was wir bereits lesen können.',
                'Good. No guessing. We start with what we can actually read.',
                'Dobře. Bez hádání. Nejdřív ověříme to, co už dokážeme přečíst.'
              )}
            ]
          },
          {
            blocks: [
              { speaker:'lea', text:L(
                'Ten zarys. Gdzieś go już widziałam.',
                'Diesen Umriss habe ich schon einmal gesehen.',
                'That outline. I have seen it somewhere.',
                'Ten obrys. Už jsem ho někde viděla.'
              )},
              { speaker:'maja', text:L(
                'Nie zgaduj. Porównaj.',
                'Nicht raten. Vergleichen.',
                'Do not guess. Compare.',
                'Nehádej. Porovnej.'
              )},
              { type:'narration', text:L(
                'Porównują kształt na arkuszu z sylwetką widoczną w oddali.',
                'Sie vergleichen die Form auf dem Blatt mit der Silhouette in der Ferne.',
                'They compare the shape on the sheet with the silhouette in the distance.',
                'Porovnají tvar na listu se siluetou v dálce.'
              )},
              { speaker:'lea', text:L(
                'Stawa Młyny.',
                'Stawa Młyny.',
                'Stawa Młyny.',
                'Stawa Młyny.'
              )},
              { speaker:'maks', text:L(
                'Młyn!',
                'Eine Mühle!',
                'A windmill!',
                'Mlýn!'
              )},
              { speaker:'maja', text:L(
                'Nie młyn. Znak nawigacyjny.',
                'Keine Mühle. Ein Seezeichen.',
                'Not a mill. A navigation beacon.',
                'Ne mlýn. Navigační znak.'
              )},
              { speaker:'lea', text:L(
                'Kontur się zgadza. I jedna z linii kończy się właśnie w tamtą stronę.',
                'Der Umriss stimmt. Und eine der Linien endet genau in dieser Richtung.',
                'The outline matches. And one of the lines ends in exactly that direction.',
                'Obrys sedí. A jedna z čar končí přesně tím směrem.'
              )},
              { speaker:'maja', text:L(
                'Więc pytanie nie brzmi już „dokąd”. Tylko: skąd osoba, która to zostawiła, wiedziała, że właśnie my to znajdziemy?',
                'Dann lautet die Frage nicht mehr „wohin“. Sondern: Woher wusste die Person, die das hier ließ, dass ausgerechnet wir es finden?',
                'So the question is no longer “where”. It is: how did the person who left this know that we would be the ones to find it?',
                'Takže otázka už není „kam“. Ale: jak člověk, který to tu nechal, věděl, že to najdeme právě my?'
              )},
              { type:'narration', text:L(
                'Frytka wzbija się w powietrze i leci w stronę Stawy Młyny.',
                'Frytka hebt ab und fliegt in Richtung Stawa Młyny.',
                'Frytka takes off and flies toward Stawa Młyny.',
                'Frytka vzlétne a letí směrem ke Stawě Młyny.'
              )},
              { speaker:'maks', text:L(
                'Dobrze. Oficjalnie głosuję za tajemnicą.',
                'Gut. Ich stimme offiziell für ein Geheimnis.',
                'Fine. I officially vote for mystery.',
                'Dobře. Oficiálně hlasuji pro záhadu.'
              )}
            ]
          }
        ],
        teaser:L(
          'Pierwszy symbol prowadzi do Stawy Młyny. Kto ułożył trasę — i dlaczego zaczyna się właśnie dla nich?',
          'Das erste Symbol führt zur Stawa Młyny. Wer hat die Route geplant – und warum beginnt sie ausgerechnet für sie?',
          'The first symbol leads to Stawa Młyny. Who designed the route—and why does it begin with them?',
          'První symbol vede ke Stawě Młyny. Kdo trasu připravil — a proč začíná právě pro ně?'
        )
      },

      '02': {
        codes: ['beat-07-windmill-not-mill'],
        titles: [
          'Młyn, który nie miele',
          'Die Mühle, die nicht mahlt',
          'The Mill That Does Not Mill',
          'Mlýn, který nemele'
        ],
        panels: [
          {
            blocks: [
              { speaker:'maks', text:L(
                'I tak wygląda jak młyn.',
                'Sieht trotzdem wie eine Mühle aus.',
                'It still looks like a windmill.',
                'Stejně vypadá jako mlýn.'
              )},
              { speaker:'maja', text:L(
                'To znak nawigacyjny.',
                'Es ist ein Seezeichen.',
                'It is a navigation beacon.',
                'Je to navigační znak.'
              )},
              { speaker:'maks', text:L(
                'Ze skrzydłami.',
                'Mit Flügeln.',
                'With sails.',
                'S křídly.'
              )},
              { speaker:'lea', text:L(
                'Wygląd nie musi odpowiadać funkcji.',
                'Aussehen und Funktion müssen nicht dasselbe sein.',
                'Appearance does not have to match function.',
                'Vzhled nemusí odpovídat funkci.'
              )},
              { speaker:'maks', text:L(
                'Mówisz o znaku czy o Frytce?',
                'Redest du vom Seezeichen oder von Frytka?',
                'Are you talking about the beacon or Frytka?',
                'Mluvíš o znaku, nebo o Frytce?'
              )},
              { type:'narration', text:L(
                'Frytka przechodzi obok z miną, jakby uwaga w ogóle jej nie dotyczyła.',
                'Frytka stolziert vorbei, als ginge sie die Bemerkung überhaupt nichts an.',
                'Frytka walks past as if the remark has absolutely nothing to do with her.',
                'Frytka projde kolem, jako by se jí poznámka vůbec netýkala.'
              )}
            ]
          },
          {
            blocks: [
              { type:'narration', text:L(
                'Lea rozkłada trzy całe przezroczyste prostokątne arkusze.',
                'Lea legt drei vollständige transparente rechteckige Blätter aus.',
                'Lea lays out three complete transparent rectangular sheets.',
                'Lea rozloží tři celé průhledné obdélníkové listy.'
              )},
              { speaker:'lea', text:L(
                'Są trzy. Wszystkie całe. Bez pęknięć, wycięć i uszkodzeń.',
                'Es sind drei. Alle vollständig. Keine Risse, Ausschnitte oder Schäden.',
                'There are three. All complete. No cracks, cut-outs or damage.',
                'Jsou tři. Všechny celé. Bez prasklin, výřezů nebo poškození.'
              )},
              { speaker:'maja', text:L(
                'Dobrze. Pracujemy tylko z tym, co naprawdę mamy.',
                'Gut. Wir arbeiten nur mit dem, was wir tatsächlich haben.',
                'Good. We work only with what we actually have.',
                'Dobře. Pracujeme jen s tím, co opravdu máme.'
              )},
              { speaker:'maks', text:L(
                'Trzy arkusze, cztery symbole i jedna mewa. Brzmi jak instrukcja, o którą nikt nie prosił.',
                'Drei Blätter, vier Symbole und eine Möwe. Klingt wie eine Anleitung, um die niemand gebeten hat.',
                'Three sheets, four symbols and one gull. Sounds like instructions nobody asked for.',
                'Tři listy, čtyři symboly a jeden racek. To zní jako návod, o který nikdo nežádal.'
              )},
              { speaker:'lea', text:L(
                'Spójrzcie na kąt skrzydeł Stawy Młyny.',
                'Schaut auf den Winkel der Flügel der Stawa Młyny.',
                'Look at the angle of the Stawa Młyny sails.',
                'Podívejte na úhel křídel Stawy Młyny.'
              )},
              { type:'narration', text:L(
                'Lea obraca górny arkusz. Jedna linia nagle pokrywa się z kątem konstrukcji.',
                'Lea dreht das obere Blatt. Eine Linie stimmt plötzlich mit dem Winkel der Konstruktion überein.',
                'Lea rotates the top sheet. One line suddenly matches the angle of the structure.',
                'Lea otočí horní list. Jedna čára se najednou shoduje s úhlem konstrukce.'
              )},
              { speaker:'lea', text:L(
                'Jest. Linia się zgadza.',
                'Da. Die Linie stimmt.',
                'There. The line matches.',
                'Tady. Čára sedí.'
              )},
              { speaker:'maja', text:L(
                'A jej dalszy ciąg biegnie wzdłuż falochronu.',
                'Und ihre Fortsetzung läuft am Wellenbrecher entlang.',
                'And its continuation runs along the breakwater.',
                'A pokračování vede podél vlnolamu.'
              )},
              { speaker:'maks', text:L(
                'Czyli naprawdę idziemy po linii?',
                'Wir laufen also wirklich einer Linie nach?',
                'So we really are following a line?',
                'Takže opravdu jdeme po čáře?'
              )},
              { speaker:'maja', text:L(
                'Na razie. Nie rób z tego życiowej zasady.',
                'Vorerst. Mach daraus keine Lebensregel.',
                'For now. Do not turn it into a life rule.',
                'Zatím. Nedělej z toho životní pravidlo.'
              )}
            ]
          },
          {
            blocks: [
              { type:'narration', text:L(
                'Linia urywa się w miejscu, gdzie morska bryza dociera do kamieni.',
                'Die Linie endet dort, wo die Gischt die Steine erreicht.',
                'The line stops where sea spray reaches the rocks.',
                'Čára končí tam, kam na kameny dopadá mořská tříšť.'
              )},
              { speaker:'lea', text:L(
                'Dziwne. Dalej nic.',
                'Seltsam. Danach nichts.',
                'Strange. Nothing after that.',
                'Zvláštní. Dál nic.'
              )},
              { speaker:'maks', text:L(
                'Tajny atrament.',
                'Geheimtinte.',
                'Secret ink.',
                'Tajný inkoust.'
              )},
              { speaker:'maja', text:L(
                'Mówisz to za każdym razem, kiedy nie wiesz, co zrobić.',
                'Das sagst du jedes Mal, wenn du nicht weißt, was du tun sollst.',
                'You say that every time you do not know what to do.',
                'To říkáš pokaždé, když nevíš, co dělat.'
              )},
              { speaker:'maks', text:L(
                'I któregoś dnia będę miał rację.',
                'Und eines Tages werde ich recht haben.',
                'And one day I will be right.',
                'A jednou budu mít pravdu.'
              )},
              { type:'narration', text:L(
                'Frytka trzepocze skrzydłami. Kilka kropel pada na róg arkusza.',
                'Frytka schlägt mit den Flügeln. Ein paar Tropfen landen auf der Ecke des Blattes.',
                'Frytka flaps her wings. A few drops land on the corner of the sheet.',
                'Frytka zamává křídly. Několik kapek dopadne na roh listu.'
              )},
              { speaker:'lea', text:L(
                'Stop.',
                'Stopp.',
                'Stop.',
                'Stop.'
              )},
              { speaker:'maja', text:L(
                'Co?',
                'Was?',
                'What?',
                'Co?'
              )},
              { speaker:'lea', text:L(
                'Na mokrym miejscu pojawił się ślad. Bardzo słaby.',
                'An der nassen Stelle ist eine Spur erschienen. Sehr schwach.',
                'A mark appeared where it got wet. Very faint.',
                'Na mokrém místě se objevila stopa. Velmi slabá.'
              )},
              { speaker:'maks', text:L(
                'Wiedziałem.',
                'Ich wusste es.',
                'I knew it.',
                'Já to věděl.'
              )},
              { speaker:'maja', text:L(
                'To zrobiła Frytka.',
                'Das war Frytka.',
                'Frytka did that.',
                'To udělala Frytka.'
              )},
              { speaker:'maks', text:L(
                'Wiedziałem, że ona wie.',
                'Ich wusste, dass sie es weiß.',
                'I knew she knew.',
                'Věděl jsem, že to ví.'
              )}
            ]
          }
        ],
        teaser:L(
          'Kilka kropel ujawniło ledwie widoczny ślad. Następnym razem sprawdzą reakcję na wodę już celowo.',
          'Ein paar Tropfen haben eine kaum sichtbare Spur enthüllt. Als Nächstes testen sie die Reaktion auf Wasser ganz bewusst.',
          'A few drops revealed a barely visible mark. Next, they will test the reaction to water deliberately.',
          'Několik kapek odhalilo sotva viditelnou stopu. Příště reakci na vodu vyzkoušejí záměrně.'
        )
      },

      '03': {
        codes: ['beat-14-ink-from-waves'],
        titles: [
          'Atrament z fal',
          'Tinte aus den Wellen',
          'Ink from the Waves',
          'Inkoust z vln'
        ],
        panels: [
          {
            blocks: [
              { speaker:'maja', text:L(
                'Żadnego moczenia całej mapy w morzu. Tylko kilka kropli.',
                'Wir tauchen die Karte nicht ins Meer. Nur ein paar Tropfen.',
                'We are not soaking the whole map in the sea. Just a few drops.',
                'Žádné namáčení celé mapy do moře. Jen pár kapek.'
              )},
              { speaker:'maks', text:L(
                'Nuda.',
                'Langweilig.',
                'Boring.',
                'Nuda.'
              )},
              { speaker:'lea', text:L(
                'Za to da się powtórzyć.',
                'Dafür lässt es sich wiederholen.',
                'But it is repeatable.',
                'Ale dá se to zopakovat.'
              )},
              { type:'narration', text:L(
                'Lea ostrożnie zwilża skraj przezroczystego arkusza.',
                'Lea befeuchtet vorsichtig den Rand des transparenten Blattes.',
                'Lea carefully wets the edge of the transparent sheet.',
                'Lea opatrně navlhčí okraj průhledného listu.'
              )},
              { speaker:'lea', text:L(
                'Pojawia się.',
                'Es erscheint.',
                'It is appearing.',
                'Objevuje se.'
              )},
              { speaker:'maks', text:L(
                'Co?',
                'Was?',
                'What?',
                'Co?'
              )},
              { speaker:'lea', text:L(
                'Warstwa nadruku. Na sucho jej nie widać.',
                'Eine Druckschicht. Trocken ist sie unsichtbar.',
                'A printed layer. You cannot see it when it is dry.',
                'Vrstva tisku. Za sucha není vidět.'
              )},
              { speaker:'maja', text:L(
                'Czyli woda nie jest zagrożeniem dla tej zagadki. Jest częścią instrukcji.',
                'Dann ist Wasser keine Gefahr für das Rätsel. Es ist Teil der Anleitung.',
                'So water is not a threat to the puzzle. It is part of the instructions.',
                'Takže voda není pro záhadu hrozba. Je součástí návodu.'
              )}
            ]
          },
          {
            blocks: [
              { type:'narration', text:L(
                'Na arkuszu stopniowo pojawia się sieć linii przypominająca alejki.',
                'Auf dem Blatt erscheint nach und nach ein Netz von Linien, das an Parkwege erinnert.',
                'A network of lines slowly appears on the sheet, like paths through a park.',
                'Na listu se postupně objeví síť čar připomínající parkové cesty.'
              )},
              { speaker:'maks', text:L(
                'Labirynt?',
                'Ein Labyrinth?',
                'A maze?',
                'Bludiště?'
              )},
              { speaker:'lea', text:L(
                'Raczej układ alejek.',
                'Eher ein Wegenetz.',
                'More like a network of paths.',
                'Spíš síť cest.'
              )},
              { speaker:'maja', text:L(
                'Jaki park mamy w pobliżu?',
                'Welchen Park haben wir in der Nähe?',
                'What park do we have nearby?',
                'Jaký park je poblíž?'
              )},
              { speaker:'lea', text:L(
                'Park Zdrojowy.',
                'Park Zdrojowy.',
                'Park Zdrojowy.',
                'Park Zdrojowy.'
              )},
              { speaker:'maks', text:L(
                'A jeśli to wcale nie park?',
                'Und wenn es gar kein Park ist?',
                'And what if it is not a park at all?',
                'A co když to vůbec není park?'
              )},
              { speaker:'lea', text:L(
                'To będziemy mieli dobry sposób, żeby to sprawdzić.',
                'Dann haben wir eine gute Möglichkeit, das zu prüfen.',
                'Then we have a good way to test it.',
                'Tak budeme mít dobrý způsob, jak to ověřit.'
              )},
              { type:'narration', text:L(
                'Lea porównuje układ z publicznym planem miasta. Nie pasuje idealnie, ale kierunek się zgadza.',
                'Lea vergleicht das Muster mit einem öffentlichen Stadtplan. Es passt nicht perfekt, aber die Richtung stimmt.',
                'Lea compares the pattern with a public city map. It is not a perfect match, but the direction is right.',
                'Lea porovná vzor s veřejnou mapou města. Není to dokonalá shoda, ale směr sedí.'
              )}
            ]
          },
          {
            blocks: [
              { type:'narration', text:L(
                'W rogu wilgotnego arkusza pojawia się krótki, ukośny znak.',
                'In der Ecke des feuchten Blattes erscheint ein kurzer, schräger Strich.',
                'A short angled mark appears in the corner of the damp sheet.',
                'V rohu vlhkého listu se objeví krátká šikmá značka.'
              )},
              { speaker:'maks', text:L(
                'To litera?',
                'Ist das ein Buchstabe?',
                'Is that a letter?',
                'Je to písmeno?'
              )},
              { speaker:'lea', text:L(
                'Może.',
                'Vielleicht.',
                'Maybe.',
                'Možná.'
              )},
              { speaker:'maja', text:L(
                'Jaka?',
                'Welcher?',
                'Which one?',
                'Jaké?'
              )},
              { speaker:'lea', text:L(
                'Trochę przypomina K. Albo zwykłe przecięcie linii.',
                'Es sieht ein wenig wie ein K aus. Oder nur wie eine Kreuzung von Linien.',
                'It looks a little like a K. Or just two lines crossing.',
                'Trochu to připomíná K. Nebo jen křížení čar.'
              )},
              { speaker:'maks', text:L(
                'K jak „klejnot”.',
                'K wie „Kostbarkeit“.',
                'K for “king-sized treasure”.',
                'K jako „kořist“.'
              )},
              { speaker:'maja', text:L(
                'K jak „koniec zgadywania”.',
                'K wie „kein weiteres Raten“.',
                'K for “keep guessing to yourself”.',
                'K jako „konec hádání“.'
              )},
              { speaker:'maks', text:L(
                'To więcej niż jedna litera.',
                'Das ist mehr als ein Buchstabe.',
                'That is more than one letter.',
                'To je víc než jedno písmeno.'
              )},
              { speaker:'lea', text:L(
                'Nie wiemy nawet, czy to litera. Zapamiętujemy i nie wyciągamy wniosków.',
                'Wir wissen nicht einmal, ob es ein Buchstabe ist. Wir merken es uns und ziehen noch keinen Schluss.',
                'We do not even know if it is a letter. We remember it and draw no conclusions yet.',
                'Ani nevíme, jestli je to písmeno. Zapamatujeme si to a zatím nic nevyvozujeme.'
              )},
              { type:'narration', text:L(
                'Reszta nowego wzoru wskazuje w stronę Parku Zdrojowego.',
                'Der Rest des neuen Musters weist in Richtung Park Zdrojowy.',
                'The rest of the newly revealed pattern points toward Park Zdrojowy.',
                'Zbytek nově odhaleného vzoru ukazuje směrem k Parku Zdrojowemu.'
              )}
            ]
          }
        ],
        teaser:L(
          'Woda ujawniła trasę do Parku Zdrojowego i niepewny znak przypominający K. Podpis czy przypadek?',
          'Wasser hat die Route zum Park Zdrojowy und ein unsicheres Zeichen enthüllt, das wie ein K aussieht. Signatur oder Zufall?',
          'Water revealed the route to Park Zdrojowy and an uncertain mark resembling K. Signature or coincidence?',
          'Voda odhalila trasu k Parku Zdrojowemu a nejasnou značku připomínající K. Podpis, nebo náhoda?'
        )
      }
    }
  };
})();
