(() => {
  'use strict';

  const story = window.comicStoryData;
  if (!story?.episodes) return;

  story.version = 7;

  const setLine = (episodeKey, panelIndex, lineIndex, text) => {
    const line = story.episodes?.[episodeKey]?.panels?.[panelIndex]?.lines?.[lineIndex];
    if (line) line.text = text;
  };

  const setTeaser = (episodeKey, text) => {
    const episode = story.episodes?.[episodeKey];
    if (episode) episode.nextTeaser = text;
  };

  // Episode 1: keep the physical-sheet mystery unresolved.
  setLine('season-1/beat-00-unmarked-envelope', 1, 1, {
    pl: 'Albo wskazówki. Te arkusze jeszcze nie układają się w pełny wzór.',
    de: 'Oder Hinweise. Diese Blätter ergeben noch kein vollständiges Muster.',
    en: 'Or clues. These sheets still do not form a complete pattern.',
    cs: 'Nebo stopy. Tyhle listy zatím netvoří úplný vzor.'
  });

  setLine('season-1/beat-00-unmarked-envelope', 1, 2, {
    pl: 'To sprawdźmy, co już potrafimy z nich odczytać.',
    de: 'Dann prüfen wir, was wir daraus schon lesen können.',
    en: 'Then let’s see what we can already read from them.',
    cs: 'Tak zjistíme, co z nich už dokážeme přečíst.'
  });

  // Episode 5: Fort Anioła leads onward without identifying a physical component.
  setLine('season-1/beat-29-round-fort', 2, 1, {
    pl: 'Ten znak wygląda raczej jak odsyłacz do innego muzeum.',
    de: 'Dieses Zeichen sieht eher wie ein Verweis auf ein anderes Museum aus.',
    en: 'This mark looks more like a reference to another museum.',
    cs: 'Ten znak vypadá spíš jako odkaz na jiné muzeum.'
  });

  setTeaser('season-1/beat-29-round-fort', {
    pl: 'Znak prowadzi do Muzeum Rybołówstwa Morskiego. Co łączy współczesną zagadkę ze starym muzeum?',
    de: 'Das Zeichen führt zum Museum für Meeresfischerei. Was verbindet das moderne Rätsel mit dem alten Museum?',
    en: 'The mark leads to the Museum of Sea Fishery. What connects the modern mystery with the old museum?',
    cs: 'Znak vede do Muzea mořského rybolovu. Co spojuje současnou záhadu se starým muzeem?'
  });

  // Episode 6: complete sheets, unresolved reading rule.
  setLine('season-1/beat-36-new-mystery-old-museum', 1, 1, {
    pl: 'Tylko ten układ nadal nie wyjaśnia wszystkich oznaczeń.',
    de: 'Nur erklärt dieses Muster noch nicht alle Markierungen.',
    en: 'But this pattern still does not explain every marking.',
    cs: 'Jenže tenhle vzor pořád nevysvětluje všechny značky.'
  });

  setLine('season-1/beat-36-new-mystery-old-museum', 1, 2, {
    pl: 'Może potrzebujemy innego sposobu odczytu.',
    de: 'Vielleicht brauchen wir eine andere Art, es zu lesen.',
    en: 'Maybe we need a different way to read it.',
    cs: 'Možná potřebujeme jiný způsob, jak to číst.'
  });

  setLine('season-1/beat-36-new-mystery-old-museum', 2, 0, {
    pl: 'Jeden z symboli wskazuje na drugi brzeg Świny.',
    de: 'Eines der Symbole weist auf die andere Seite der Świna.',
    en: 'One of the symbols points to the other side of the Świna.',
    cs: 'Jeden ze symbolů ukazuje na druhou stranu Świny.'
  });

  setTeaser('season-1/beat-36-new-mystery-old-museum', {
    pl: 'Cztery symbole prowadzą przez Świnę. Co zmieni perspektywa po drugiej stronie?',
    de: 'Vier Symbole führen über die Świna. Was verändert die Perspektive auf der anderen Seite?',
    en: 'Four symbols lead across the Świna. What will change when they see the route from the other side?',
    cs: 'Čtyři symboly vedou přes Świnu. Co změní pohled z druhé strany?'
  });

  // Episode 9 teaser: keep the physical-sheet mystery unresolved.
  setTeaser('season-1/beat-57-fort-answer', {
    pl: 'Wskazówka prowadzi do Podziemnego Miasta pod wydmami. Jaką nową zasadę odczytu pokaże mapa pod ziemią?',
    de: 'Der Hinweis führt zur Unterirdischen Stadt unter den Dünen. Welche neue Leseregel zeigt die Karte unter der Erde?',
    en: 'The clue leads to the Underground City beneath the dunes. What new reading rule will the map reveal underground?',
    cs: 'Nápověda vede do Podzemního města pod dunami. Jaké nové pravidlo čtení ukáže mapa pod zemí?'
  });

  // Episode 10: no hole or cut-out language.
  setLine('season-1/beat-64-beneath-dunes', 1, 0, {
    pl: 'Latarka odbiła się dokładnie między dwiema liniami!',
    de: 'Die Lampe hat sich genau zwischen zwei Linien gespiegelt!',
    en: 'The torch reflected exactly between two lines!',
    cs: 'Svítilna se odrazila přesně mezi dvěma čarami!'
  });

  setLine('season-1/beat-64-beneath-dunes', 1, 1, {
    pl: 'Nie sama latarka. Jej odbicie połączyło wzór.',
    de: 'Nicht die Lampe selbst. Ihre Spiegelung hat das Muster verbunden.',
    en: 'Not the torch itself. Its reflection connected the pattern.',
    cs: 'Ne samotná svítilna. Její odraz propojil vzor.'
  });

  // Episode 13: first strong suspicion of another whole sheet.
  setLine('season-1/beat-86-map-44-islands', 2, 0, {
    pl: 'Cały szlak — tak. Ale trzy całe arkusze nie wyjaśniają jednego zestawu oznaczeń.',
    de: 'Die ganze Route – ja. Aber drei vollständige Blätter erklären eine Gruppe von Markierungen nicht.',
    en: 'The whole route—yes. But the three complete sheets do not explain one set of markings.',
    cs: 'Celou trasu — ano. Ale tři celé listy nevysvětlují jednu skupinu značek.'
  });

  setLine('season-1/beat-86-map-44-islands', 2, 1, {
    pl: 'A jeśli mapa potrzebuje jeszcze jednego całego przezroczystego arkusza?',
    de: 'Und wenn die Karte noch ein vollständiges transparentes Blatt braucht?',
    en: 'What if the map needs one more complete transparent sheet?',
    cs: 'Co když mapa potřebuje ještě jeden celý průhledný list?'
  });

  setTeaser('season-1/beat-86-map-44-islands', {
    pl: 'Po raz pierwszy pojawia się podejrzenie czwartego całego arkusza. Czy odpowiedź była z nimi od początku?',
    de: 'Zum ersten Mal entsteht der Verdacht auf ein viertes vollständiges Blatt. War die Antwort von Anfang an bei ihnen?',
    en: 'For the first time, they suspect a fourth complete sheet may exist. Has the answer been with them from the start?',
    cs: 'Poprvé vzniká podezření, že může existovat čtvrtý celý list. Měli odpověď od začátku u sebe?'
  });

  // Episode 14: reveal the sleeve as one whole rectangular fourth sheet.
  setLine('season-1/beat-93-four-layers', 0, 0, {
    pl: 'Trzy całe arkusze pasują do planu, ale jedna grupa oznaczeń nadal nie ma wyjaśnienia.',
    de: 'Drei vollständige Blätter passen zum Plan, doch eine Gruppe von Markierungen bleibt unerklärt.',
    en: 'Three complete sheets fit the map, but one set of markings still has no explanation.',
    cs: 'Tři celé listy sedí na plán, ale jedna skupina značek stále nemá vysvětlení.'
  });

  setLine('season-1/beat-93-four-layers', 0, 1, {
    pl: 'Jeśli Lea ma rację, potrzebny byłby czwarty arkusz w tym samym formacie.',
    de: 'Wenn Lea recht hat, bräuchten wir ein viertes Blatt im selben Format.',
    en: 'If Lea is right, we would need a fourth sheet in the same format.',
    cs: 'Jestli má Lea pravdu, potřebovali bychom čtvrtý list ve stejném formátu.'
  });

  setLine('season-1/beat-93-four-layers', 0, 2, {
    pl: 'A przez cały czas nosimy ze sobą coś przezroczystego.',
    de: 'Und die ganze Zeit tragen wir etwas Durchsichtiges bei uns.',
    en: 'And we have been carrying something transparent the whole time.',
    cs: 'A celou dobu s sebou nosíme něco průhledného.'
  });

  setLine('season-1/beat-93-four-layers', 1, 0, {
    pl: 'Obwoluta koperty! To cały przezroczysty prostokąt.',
    de: 'Die Hülle des Umschlags! Sie ist ein vollständiges transparentes Rechteck.',
    en: 'The envelope sleeve! It is one complete transparent rectangle.',
    cs: 'Obal obálky! Je to celý průhledný obdélník.'
  });

  setLine('season-1/beat-93-four-layers', 1, 1, {
    pl: 'I ma dokładnie ten sam wymiar co trzy arkusze.',
    de: 'Und sie hat genau dieselben Maße wie die drei Blätter.',
    en: 'And it is exactly the same size as the three sheets.',
    cs: 'A má přesně stejný rozměr jako tři listy.'
  });

  setLine('season-1/beat-93-four-layers', 1, 2, {
    pl: 'Nałóż ją jako czwarty arkusz.',
    de: 'Leg sie als viertes Blatt darüber.',
    en: 'Lay it over them as the fourth sheet.',
    cs: 'Polož ho přes ně jako čtvrtý list.'
  });
})();
