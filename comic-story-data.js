/* Localized presentation script for the Episode 1 pilot.
 * This is not an unlock catalog: season/episode access, ordering and thresholds
 * always come from the server. Artwork remains language-neutral.
 * Keep speaker IDs stable; each panel is read top-to-bottom without interaction.
 */
window.comicStoryData = {
  version: 1,
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
          lines: [
            { speaker: 'maks', text: {
              pl: 'O! Ktoś zostawił nam zagadkę?',
              de: 'Oh! Hat uns jemand ein Rätsel hinterlassen?',
              en: 'Oh! Did someone leave us a mystery?',
              cs: 'Hele! Nechal nám tu někdo záhadu?'
            } },
            { speaker: 'maja', text: {
              pl: 'Nam? Najpierw poszukaj podpisu.',
              de: 'Uns? Such erst mal nach einem Namen.',
              en: 'Us? Look for a name first.',
              cs: 'Nám? Nejdřív najdi podpis.'
            } },
            { speaker: 'lea', text: {
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
          lines: [
            { speaker: 'maks', text: {
              pl: 'Cztery znaki. Czyli cztery skarby?',
              de: 'Vier Zeichen. Also vier Schätze?',
              en: 'Four symbols. So, four treasures?',
              cs: 'Čtyři znaky. Takže čtyři poklady?'
            } },
            { speaker: 'lea', text: {
              pl: 'Albo wskazówki. Brakuje jednej warstwy.',
              de: 'Oder Hinweise. Eine Schicht fehlt.',
              en: 'Or clues. One layer is missing.',
              cs: 'Nebo stopy. Jedna vrstva chybí.'
            } },
            { speaker: 'maja', text: {
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
          lines: [
            { speaker: 'lea', text: {
              pl: 'Patrzcie! Ten zarys pasuje do Stawy Młyny!',
              de: 'Seht mal! Der Umriss passt zur Stawa Młyny!',
              en: 'Look! That outline matches Stawa Młyny!',
              cs: 'Hele! Ten obrys sedí na Stawa Młyny!'
            } },
            { speaker: 'maks', text: {
              pl: 'Czyli wiemy, dokąd iść!',
              de: 'Dann wissen wir, wohin wir müssen!',
              en: 'Then we know where to go!',
              cs: 'Tak už víme, kam jít!'
            } },
            { speaker: 'maja', text: {
              pl: 'Ale skąd nadawca wiedział, że tu trafimy?',
              de: 'Aber woher wusste der Absender, dass wir hierherkommen?',
              en: 'But how did the sender know we’d come here?',
              cs: 'Ale jak odesílatel věděl, že sem přijdeme?'
            } }
          ]
        }
      ],
      nextTeaser: {
        pl: 'Pierwszy znak pasuje. Co zobaczą, gdy podejdą bliżej?',
        de: 'Das erste Zeichen passt. Was entdecken sie aus der Nähe?',
        en: 'The first symbol fits. What will they find up close?',
        cs: 'První znak sedí. Co objeví zblízka?'
      }
    }
  }
};
