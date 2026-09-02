/* Localized presentation script for the Episode 1 benchmark.
 * This is not an unlock catalog: season/episode access, ordering and thresholds
 * always come from the server. Artwork remains language-neutral.
 * Keep speaker IDs stable; each panel is read top-to-bottom without interaction.
 */
window.comicStoryData = {
  version: 3,
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
          // Percent coordinates in the portrait master. Never derive placement from line order.
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
    }
  }
};
