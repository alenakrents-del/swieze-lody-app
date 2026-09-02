(() => {
  'use strict';

  const shell = document.getElementById('comicProgressShell');
  const content = document.getElementById('comicProgressContent');
  const eyebrow = document.getElementById('comicProgressEyebrow');
  const heading = document.getElementById('comicProgressHeading');
  const comicSupabase = window.customerSupabase;

  if (!shell || !content || !comicSupabase) return;

  const COPY = {
    pl: {
      eyebrow: 'Twoja historia', heading: 'Komiks', loading: 'Ładowanie komiksu…', unavailable: 'Komiks jest chwilowo niedostępny.', retry: 'Spróbuj ponownie', empty: 'Pierwszy sezon pojawi się tutaj.', guest: 'Zaloguj się, aby zapisywać postęp komiksu.', signIn: 'Przejdź do logowania', season: 'Komiks', active: 'Aktualny sezon', archived: 'Poprzedni sezon', completed: 'Sezon ukończony', progress: 'Postęp sezonu', next: 'Do kolejnego odblokowania', preparing: 'Kolejne epizody są w przygotowaniu.', episode: 'Epizod', locked: 'Zablokowane', unlocked: 'Odblokowane', journey: 'Szlak sezonu', read: 'Czytaj epizod', close: 'Zamknij', back: 'Wróć do szlaku', chapterEnd: 'Koniec epizodu', nextReady: 'Następny epizod jest już dostępny.', mystery: 'Dalsza część historii pozostaje ukryta.', finale: 'Finał sezonu', collectibles: 'Kolekcjonerskie dodatki', collectibleEmpty: 'Cyfrowe dodatki zdobyte w sezonie pojawią się tutaj.'
    },
    de: {
      eyebrow: 'Deine Geschichte', heading: 'Comic', loading: 'Comic wird geladen…', unavailable: 'Der Comic ist vorübergehend nicht verfügbar.', retry: 'Erneut versuchen', empty: 'Die erste Staffel erscheint hier.', guest: 'Melde dich an, um deinen Comic-Fortschritt zu speichern.', signIn: 'Zur Anmeldung', season: 'Comic', active: 'Aktuelle Staffel', archived: 'Frühere Staffel', completed: 'Staffel abgeschlossen', progress: 'Staffelfortschritt', next: 'Bis zur nächsten Freischaltung', preparing: 'Weitere Episoden sind in Vorbereitung.', episode: 'Episode', locked: 'Gesperrt', unlocked: 'Freigeschaltet', journey: 'Staffelroute', read: 'Episode lesen', close: 'Schließen', back: 'Zurück zur Route', chapterEnd: 'Ende der Episode', nextReady: 'Die nächste Episode ist bereits verfügbar.', mystery: 'Der nächste Teil der Geschichte bleibt verborgen.', finale: 'Staffelfinale', collectibles: 'Digitale Sammlerstücke', collectibleEmpty: 'Deine digitalen Extras aus dieser Staffel erscheinen hier.'
    },
    en: {
      eyebrow: 'Your story', heading: 'Comic', loading: 'Loading comic…', unavailable: 'The comic is temporarily unavailable.', retry: 'Try again', empty: 'The first season will appear here.', guest: 'Sign in to save your comic progress.', signIn: 'Go to sign in', season: 'Comic', active: 'Current season', archived: 'Previous season', completed: 'Season completed', progress: 'Season progress', next: 'Until the next unlock', preparing: 'More episodes are being prepared.', episode: 'Episode', locked: 'Locked', unlocked: 'Unlocked', journey: 'Season journey', read: 'Read episode', close: 'Close', back: 'Back to journey', chapterEnd: 'End of episode', nextReady: 'The next episode is already available.', mystery: 'The next part of the story remains hidden.', finale: 'Season finale', collectibles: 'Digital collectibles', collectibleEmpty: 'Digital extras earned in this season will appear here.'
    },
    cs: {
      eyebrow: 'Tvůj příběh', heading: 'Komiks', loading: 'Načítání komiksu…', unavailable: 'Komiks je dočasně nedostupný.', retry: 'Zkusit znovu', empty: 'První sezóna se objeví zde.', guest: 'Přihlaste se, aby se ukládal postup komiksu.', signIn: 'Přejít k přihlášení', season: 'Komiks', active: 'Aktuální sezóna', archived: 'Předchozí sezóna', completed: 'Sezóna dokončena', progress: 'Postup sezóny', next: 'Do dalšího odemčení', preparing: 'Další epizody se připravují.', episode: 'Epizoda', locked: 'Zamčeno', unlocked: 'Odemčeno', journey: 'Trasa sezóny', read: 'Číst epizodu', close: 'Zavřít', back: 'Zpět na trasu', chapterEnd: 'Konec epizody', nextReady: 'Další epizoda je už dostupná.', mystery: 'Další část příběhu zůstává skrytá.', finale: 'Finále sezóny', collectibles: 'Digitální sběratelské předměty', collectibleEmpty: 'Zde se objeví digitální doplňky získané v sezóně.'
    }
  };

  const SUPPORTED_LANGS = new Set(Object.keys(COPY));
  // Presentation-only aliases for existing server artwork keys; never unlock criteria.
  const ENVELOPE_PANELS = Object.freeze([
    'assets/comic/season-1/episode-01-panel-01-v1.png',
    'assets/comic/season-1/episode-01-panel-02-v1.png',
    'assets/comic/season-1/episode-01-panel-03-v1.png'
  ]);
  const ILLUSTRATED_PANELS = new Map([
    ['comic/season-1/placeholders/beat-00', ENVELOPE_PANELS],
    ['comic/season-1/placeholders/scene-00', ENVELOPE_PANELS],
    ['beat-00-unmarked-envelope', ENVELOPE_PANELS],
    ['scene-00-unmarked-envelope', ENVELOPE_PANELS]
  ]);
  let requestNumber = 0;
  let readerDialog = null;

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = String(text);
    return node;
  };

  const safeArray = value => Array.isArray(value) ? value : [];
  const safePercent = value => Math.min(100, Math.max(0, Number.isFinite(Number(value)) ? Number(value) : 0));
  const safeAmount = value => Math.max(0, Number.isFinite(Number(value)) ? Number(value) : 0);
  const getLang = () => {
    const lang = localStorage.getItem('swiezeLanguage') || 'pl';
    return SUPPORTED_LANGS.has(lang) ? lang : 'pl';
  };
  const money = (value, lang) => `${new Intl.NumberFormat(lang === 'cs' ? 'cs-CZ' : `${lang}-${lang === 'en' ? 'GB' : lang.toUpperCase()}`, { maximumFractionDigits: 2 }).format(safeAmount(value))} zł`;

  function seasonNumber(season, index) {
    const match = String(season?.code || '').match(/(?:season|sezon)-(\d+)/i);
    return match ? Number(match[1]) : index + 1;
  }

  function setStaticCopy(copy) {
    eyebrow.textContent = copy.eyebrow;
    heading.textContent = copy.heading;
  }

  function replaceContent(node) {
    content.replaceChildren(node);
    content.setAttribute('aria-busy', 'false');
  }

  function statusView(message, buttonLabel, action) {
    const box = el('div', 'comic-status');
    box.append(el('p', '', message));
    if (buttonLabel && action) {
      const button = el('button', 'comic-action', buttonLabel);
      button.type = 'button';
      button.addEventListener('click', action);
      box.append(button);
    }
    return box;
  }

  function artworkTheme(value) {
    const key = String(value || '').toLowerCase();
    if (key.includes('100') || key.includes('course-found')) return 'finale';
    if (key.includes('00') || key.includes('envelope')) return 'envelope';
    if (key.includes('07') || key.includes('windmill')) return 'windmill';
    if (key.includes('14') || key.includes('waves')) return 'waves';
    if (key.includes('21') || key.includes('park')) return 'park';
    if (key.includes('29') || key.includes('round-fort')) return 'round-fort';
    if (key.includes('36') || key.includes('museum')) return 'museum';
    if (key.includes('43') || key.includes('swina')) return 'crossing';
    if (key.includes('50') || key.includes('above')) return 'lighthouse';
    if (key.includes('57') || key.includes('fort-answer')) return 'fort';
    if (key.includes('64') || key.includes('dunes')) return 'dunes';
    if (key.includes('71') || key.includes('river')) return 'tunnel';
    if (key.includes('79') || key.includes('karsiborska')) return 'marsh';
    if (key.includes('86') || key.includes('44-islands')) return 'islands';
    if (key.includes('93') || key.includes('layers')) return 'layers';
    if (key.includes('kompas') || key.includes('compass')) return 'compass';
    return 'coast';
  }

  function comicArtwork(artworkKey, panelIndex = 0, label = '', locked = false) {
    const theme = artworkTheme(artworkKey);
    const art = el('div', `comic-panel-art art-${theme} art-view-${panelIndex % 3}${locked ? ' is-obscured' : ''}`);
    art.setAttribute('role', 'img');
    art.setAttribute('aria-label', label);
    ['sky', 'sun', 'cloud cloud-a', 'cloud cloud-b', 'horizon', 'water', 'route', 'landmark', 'prop', 'hero hero-a', 'hero hero-b', 'hero hero-c', 'gull'].forEach(className => {
      const shape = el('span', `comic-shape ${className}`);
      shape.setAttribute('aria-hidden', 'true');
      art.append(shape);
    });
    const panels = ILLUSTRATED_PANELS.get(String(artworkKey || ''));
    // Locked previews never select a later reveal panel.
    if (panels && !locked) {
      const illustration = el('img', 'comic-illustration');
      illustration.alt = '';
      illustration.setAttribute('aria-hidden', 'true');
      illustration.width = 1536;
      illustration.height = 1024;
      illustration.decoding = 'async';
      illustration.loading = 'lazy';
      illustration.addEventListener('error', () => {
        illustration.remove();
        art.classList.remove('has-illustration');
      }, { once: true });
      illustration.src = panels[Math.min(Math.max(0, panelIndex), panels.length - 1)];
      art.classList.add('has-illustration');
      art.append(illustration);
    }
    if (locked) {
      const veil = el('span', 'comic-art-lock', '🔒');
      veil.setAttribute('aria-hidden', 'true');
      art.append(veil);
    }
    return art;
  }

  function storyBeats(body) {
    const text = String(body || '').trim();
    if (!text) return [];
    let sentences = [];
    if (typeof Intl.Segmenter === 'function') {
      const segmenter = new Intl.Segmenter(getLang(), { granularity: 'sentence' });
      sentences = Array.from(segmenter.segment(text), part => part.segment.trim()).filter(Boolean);
    } else {
      sentences = text.match(/[^.!?]+[.!?]+|[^.!?]+$/g)?.map(item => item.trim()).filter(Boolean) || [text];
    }
    if (sentences.length <= 3) return sentences;
    return [sentences[0], sentences.slice(1, -1).join(' '), sentences.at(-1)];
  }

  function renderPanel(scene, beat, panelIndex, sceneIndex, showTitle = true) {
    const panel = el('article', `comic-reader-panel panel-${(panelIndex % 3) + 1}`);
    panel.append(comicArtwork(scene.artwork_key || scene.code, panelIndex, scene.title || ''));
    // Server scene bodies are narration, not attributed character dialogue.
    const copyBox = el('div', `comic-panel-copy is-caption${panelIndex % 3 === 2 ? ' is-reveal' : ''}`);
    if (showTitle && panelIndex === 0 && scene.title) copyBox.append(el('h4', '', scene.title));
    copyBox.append(el('p', '', beat));
    panel.append(copyBox);
    panel.style.setProperty('--panel-order', String(sceneIndex + panelIndex));
    return panel;
  }

  function localizedStoryText(text, lang) {
    return typeof text?.[lang] === 'string' && text[lang].trim() ? text[lang] : (text?.pl || '');
  }

  function episodeScript(season, episode) {
    // Presentation data never grants access or supplies server thresholds.
    if (episode?.is_unlocked !== true) return null;
    const script = window.comicStoryData?.episodes?.[`${season.code}/${episode.code}`];
    return script && safeArray(episode.scenes).some(scene => scene.code === script.sceneCode) ? script : null;
  }

  function renderDialoguePanels(episode, script, lang) {
    const pages = el('div', 'comic-reader-pages has-dialogue');
    const scene = episode.scenes.find(item => item.code === script.sceneCode);
    script.panels.forEach((entry, index) => {
      const panel = el('article', `comic-reader-panel panel-${index + 1} comic-dialogue-panel`);
      panel.append(comicArtwork(scene.artwork_key || scene.code, entry.artworkIndex, scene.title || ''));
      const conversation = el('div', 'comic-dialogue');
      entry.lines.forEach((line, lineIndex) => {
        // Only known cast IDs become CSS classes; all content is plain text.
        const speaker = ['maja', 'maks', 'lea'].includes(line.speaker) ? line.speaker : 'unknown';
        const bubble = el('div', `comic-speech speaker-${speaker}${lineIndex % 2 ? ' from-right' : ''}`);
        if (index === script.panels.length - 1 && lineIndex === entry.lines.length - 1) bubble.classList.add('is-cliffhanger');
        bubble.append(
          el('span', 'comic-speech-name', window.comicStoryData.cast[speaker]?.name || ''),
          el('p', '', localizedStoryText(line.text, lang))
        );
        conversation.append(bubble);
      });
      panel.append(conversation);
      pages.append(panel);
    });
    return pages;
  }

  function renderScenePanels(episode, script, lang) {
    if (script) return renderDialoguePanels(episode, script, lang);
    const pages = el('div', 'comic-reader-pages');
    const scenes = safeArray(episode.scenes);
    if (!scenes.length) {
      const fallback = { title: episode.title, code: episode.code, artwork_key: episode.cover_artwork_key };
      pages.append(renderPanel(fallback, episode.summary || episode.title, 0, 0));
      return pages;
    }
    scenes.forEach((scene, sceneIndex) => {
      const beats = storyBeats(scene.body);
      (beats.length ? beats : [scene.title]).forEach((beat, panelIndex) => {
        pages.append(renderPanel(scene, beat, panelIndex, sceneIndex, scene.title !== episode.title));
      });
    });
    return pages;
  }

  function closeReader() {
    if (readerDialog?.open) readerDialog.close();
  }

  function openEpisode(season, episode, episodeIndex, copy, lang) {
    if (episode.is_unlocked !== true) return;
    const script = episodeScript(season, episode);
    readerDialog?.remove();
    const dialog = el('dialog', 'comic-reader');
    readerDialog = dialog;
    dialog.setAttribute('aria-labelledby', 'comicReaderTitle');

    const toolbar = el('header', 'comic-reader-toolbar');
    const close = el('button', 'comic-reader-close', `← ${copy.back}`);
    close.type = 'button';
    close.addEventListener('click', closeReader);
    toolbar.append(close, el('span', 'comic-reader-count', `${copy.episode} ${episodeIndex + 1}`));

    const cover = el('section', 'comic-reader-cover');
    const coverKey = episode.cover_artwork_key || episode.code;
    // Until bespoke cover art exists, show the establishing panel once in the story.
    if (!ILLUSTRATED_PANELS.has(String(coverKey || ''))) {
      cover.append(comicArtwork(coverKey, 0, episode.title || ''));
    }
    const coverCopy = el('div', 'comic-reader-cover-copy');
    coverCopy.append(
      el('span', 'comic-kicker', episode.is_final ? copy.finale : `${copy.episode} ${episodeIndex + 1}`),
      el('h3', '', episode.title || `${copy.episode} ${episodeIndex + 1}`)
    );
    coverCopy.querySelector('h3').id = 'comicReaderTitle';
    if (!script && episode.summary && episode.summary !== episode.title) coverCopy.append(el('p', '', episode.summary));
    cover.append(coverCopy);

    const nextEpisode = safeArray(season.episodes)[episodeIndex + 1];
    const ending = el('footer', 'comic-reader-ending');
    ending.append(el('span', 'comic-ending-burst', episode.is_final ? '★' : '…'));
    ending.append(el('h4', '', episode.is_final ? copy.finale : copy.chapterEnd));
    const lastScene = safeArray(episode.scenes).at(-1);
    const lastClue = script ? null : storyBeats(lastScene?.body).at(-1);
    if (lastClue) ending.append(el('blockquote', 'comic-ending-clue', lastClue));
    if (script && nextEpisode?.code === script.nextEpisodeCode) {
      ending.append(el('p', 'comic-next-teaser', localizedStoryText(script.nextTeaser, lang)));
    }
    if (nextEpisode?.is_unlocked === true) {
      ending.append(el('p', '', copy.nextReady));
      const nextButton = el('button', 'comic-action', `${copy.read}: ${nextEpisode.title || `${copy.episode} ${episodeIndex + 2}`}`);
      nextButton.type = 'button';
      nextButton.addEventListener('click', () => openEpisode(season, nextEpisode, episodeIndex + 1, copy, lang));
      ending.append(nextButton);
    } else if (nextEpisode) {
      const remaining = Math.max(0, safeAmount(nextEpisode.unlock_at_amount) - safeAmount(season.credited_amount));
      ending.append(el('p', '', `${copy.mystery} ${copy.next}: ${money(remaining, lang)}`));
    } else {
      ending.append(el('p', '', season.is_completed ? copy.completed : copy.preparing));
    }
    const back = el('button', 'comic-reader-back comic-action', copy.back);
    back.type = 'button';
    back.addEventListener('click', closeReader);
    ending.append(back);

    dialog.append(toolbar, cover, renderScenePanels(episode, script, lang), ending);
    dialog.addEventListener('click', event => {
      if (event.target === dialog) closeReader();
    });
    dialog.addEventListener('close', () => document.body.classList.remove('comic-reader-open'));
    document.body.append(dialog);
    document.body.classList.add('comic-reader-open');
    dialog.showModal();
    dialog.scrollTop = 0;
    close.focus();
  }

  function renderJourney(season, copy, lang) {
    const journey = el('section', 'comic-journey');
    journey.append(el('h4', 'comic-journey-title', copy.journey));
    const route = el('ol', 'comic-route');
    const episodes = safeArray(season.episodes);
    const unlockedIndexes = episodes.map((episode, index) => episode.is_unlocked === true ? index : -1).filter(index => index >= 0);
    const currentIndex = season.is_completed ? -1 : unlockedIndexes.at(-1);
    const firstLockedIndex = episodes.findIndex(episode => episode.is_unlocked !== true);

    episodes.forEach((episode, index) => {
      const unlocked = episode.is_unlocked === true;
      const stop = el('li', `comic-route-stop${unlocked ? ' is-unlocked' : ' is-locked'}${index === currentIndex ? ' is-current' : ''}`);
      const button = el('button', 'comic-route-button');
      button.type = 'button';
      button.disabled = !unlocked;
      button.setAttribute('aria-label', unlocked ? `${copy.read}: ${episode.title || `${copy.episode} ${index + 1}`}` : `${copy.episode} ${index + 1}: ${copy.locked}`);

      const node = el('span', 'comic-route-node', unlocked ? String(index + 1) : '🔒');
      const thumb = comicArtwork(episode.cover_artwork_key || episode.code, index, unlocked ? (episode.title || '') : copy.locked, !unlocked);
      thumb.classList.add('comic-route-art');
      const info = el('span', 'comic-route-info');
      info.append(el('small', '', `${copy.episode} ${index + 1}`));
      info.append(el('strong', '', unlocked ? (episode.title || `${copy.episode} ${index + 1}`) : '???'));
      if (unlocked) {
        info.append(el('span', 'comic-route-state', index === currentIndex ? `▶ ${copy.read}` : `✓ ${copy.unlocked}`));
      } else if (index === firstLockedIndex) {
        const remaining = Math.max(0, safeAmount(episode.unlock_at_amount) - safeAmount(season.credited_amount));
        info.append(el('span', 'comic-route-state', `${copy.next}: ${money(remaining, lang)}`));
      } else {
        info.append(el('span', 'comic-route-state', copy.mystery));
      }
      button.append(node, thumb, info);
      if (unlocked) button.addEventListener('click', () => openEpisode(season, episode, index, copy, lang));
      stop.append(button);
      const previousScript = index > 0 ? episodeScript(season, episodes[index - 1]) : null;
      if (!unlocked && previousScript?.nextEpisodeCode === episode.code) {
        // A non-interactive teaser, not an early reveal or an unlock control.
        stop.append(el('p', 'comic-route-teaser', localizedStoryText(previousScript.nextTeaser, lang)));
      }
      route.append(stop);
    });
    journey.append(route);
    return journey;
  }

  function renderCollectibles(season, copy) {
    const section = el('section', 'comic-collectibles');
    section.append(el('h4', '', copy.collectibles));
    const collectibles = safeArray(season.collectibles);
    if (!collectibles.length) {
      section.append(el('p', 'comic-collectible-empty', copy.collectibleEmpty));
      return section;
    }
    const list = el('div', 'comic-collectible-list');
    collectibles.forEach(item => {
      const card = el('article', 'comic-collectible');
      card.append(comicArtwork(item.artwork_key || item.code, 0, item.name || copy.collectibles));
      card.append(el('strong', '', item.name || item.code || copy.collectibles));
      if (item.description) card.append(el('p', '', item.description));
      list.append(card);
    });
    section.append(list);
    return section;
  }

  function renderSeason(season, index, copy, lang) {
    const percent = safePercent(season.progress_percent);
    const card = el('article', 'comic-season');
    const number = seasonNumber(season, index);
    const episodes = safeArray(season.episodes);
    const firstArt = episodes.find(episode => episode.is_unlocked)?.cover_artwork_key || episodes[0]?.cover_artwork_key;
    const masthead = el('section', 'comic-season-masthead');
    masthead.append(comicArtwork(firstArt, 0, season.title || ''));
    const mastheadCopy = el('div', 'comic-season-masthead-copy');
    const seasonState = season.is_completed ? copy.completed : season.status === 'active' ? copy.active : copy.archived;
    mastheadCopy.append(el('span', `comic-season-badge${season.is_completed ? ' is-completed' : ''}`, seasonState), el('h3', '', `${copy.season} #${number} — ${season.title || `#${number}`}: ${Math.round(percent)}%`));
    if (season.summary) mastheadCopy.append(el('p', '', season.summary));
    masthead.append(mastheadCopy);

    const progress = el('div', 'comic-progress');
    const label = el('div', 'comic-progress-label');
    label.append(el('span', '', copy.progress), el('strong', '', `${Math.round(percent)}%`));
    const track = el('div', 'comic-progress-track');
    track.setAttribute('role', 'progressbar');
    track.setAttribute('aria-label', copy.progress);
    track.setAttribute('aria-valuemin', '0');
    track.setAttribute('aria-valuemax', '100');
    track.setAttribute('aria-valuenow', String(Math.round(percent)));
    const fill = el('span', 'comic-progress-fill');
    fill.style.width = `${percent}%`;
    track.append(fill);
    progress.append(label, track);

    const nextLocked = episodes.find(episode => episode.is_unlocked !== true);
    const hint = season.is_completed ? copy.completed : nextLocked ? `${copy.next}: ${money(Math.max(0, safeAmount(nextLocked.unlock_at_amount) - safeAmount(season.credited_amount)), lang)}` : copy.preparing;
    progress.append(el('p', 'comic-next-hint', hint));

    card.append(masthead, progress);
    if (episodes.length) card.append(renderJourney(season, copy, lang));
    card.append(renderCollectibles(season, copy));
    return card;
  }

  function render(data, isGuest) {
    closeReader();
    const lang = getLang();
    const copy = COPY[lang] || COPY.pl;
    setStaticCopy(copy);
    const root = el('div', 'comic-seasons');
    const seasons = safeArray(data?.seasons);
    if (isGuest) {
      const guest = statusView(copy.guest, copy.signIn, () => document.getElementById('authPhone')?.focus());
      guest.classList.add('comic-guest-note');
      root.append(guest);
    }
    if (!seasons.length) root.append(statusView(copy.empty));
    seasons.forEach((season, index) => root.append(renderSeason(season, index, copy, lang)));
    replaceContent(root);
  }

  function renderUnavailable() {
    closeReader();
    const copy = COPY[getLang()] || COPY.pl;
    setStaticCopy(copy);
    replaceContent(statusView(copy.unavailable, copy.retry, refresh));
  }

  async function refresh() {
    const request = ++requestNumber;
    const lang = getLang();
    const copy = COPY[lang] || COPY.pl;
    setStaticCopy(copy);
    content.setAttribute('aria-busy', 'true');
    replaceContent(statusView(copy.loading));
    content.setAttribute('aria-busy', 'true');
    try {
      const { data: sessionData, error: sessionError } = await comicSupabase.auth.getSession();
      if (sessionError) throw sessionError;
      const isGuest = !sessionData.session;
      const rpcName = isGuest ? 'get_public_comic_catalog' : 'get_my_comic_progress';
      const { data, error } = await comicSupabase.rpc(rpcName, { p_locale: lang });
      if (error) throw error;
      if (request !== requestNumber) return;
      render(data || { seasons: [] }, isGuest);
    } catch (error) {
      console.error('Comic progress load failed:', error);
      if (request === requestNumber) renderUnavailable();
    }
  }

  window.addEventListener('customer-auth-changed', refresh);
  document.querySelectorAll('[data-lang]').forEach(button => button.addEventListener('click', () => window.setTimeout(refresh, 0)));
  window.comicProgressUI = Object.freeze({ refresh });
  refresh();
})();
