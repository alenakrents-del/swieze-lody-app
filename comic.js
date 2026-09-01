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
      eyebrow: 'Twoja historia', heading: 'Komiks', loading: 'Ładowanie komiksu…', unavailable: 'Komiks jest chwilowo niedostępny.', retry: 'Spróbuj ponownie', empty: 'Pierwszy sezon pojawi się tutaj.', guest: 'Zaloguj się, aby zapisywać postęp komiksu.', signIn: 'Przejdź do logowania', season: 'Komiks', active: 'Aktualny sezon', archived: 'Poprzedni sezon', completed: 'Sezon ukończony', progress: 'Postęp sezonu', next: 'Do kolejnego odblokowania', preparing: 'Kolejne epizody są w przygotowaniu.', episode: 'Epizod', locked: 'Zablokowane', sceneSlot: 'Miejsce na scenę', collectibles: 'Kolekcjonerskie dodatki', collectibleEmpty: 'Cyfrowe dodatki zdobyte w sezonie pojawią się tutaj.'
    },
    de: {
      eyebrow: 'Deine Geschichte', heading: 'Comic', loading: 'Comic wird geladen…', unavailable: 'Der Comic ist vorübergehend nicht verfügbar.', retry: 'Erneut versuchen', empty: 'Die erste Staffel erscheint hier.', guest: 'Melde dich an, um deinen Comic-Fortschritt zu speichern.', signIn: 'Zur Anmeldung', season: 'Comic', active: 'Aktuelle Staffel', archived: 'Frühere Staffel', completed: 'Staffel abgeschlossen', progress: 'Staffelfortschritt', next: 'Bis zur nächsten Freischaltung', preparing: 'Weitere Episoden sind in Vorbereitung.', episode: 'Episode', locked: 'Gesperrt', sceneSlot: 'Platz für eine Szene', collectibles: 'Digitale Sammlerstücke', collectibleEmpty: 'Deine digitalen Extras aus dieser Staffel erscheinen hier.'
    },
    en: {
      eyebrow: 'Your story', heading: 'Comic', loading: 'Loading comic…', unavailable: 'The comic is temporarily unavailable.', retry: 'Try again', empty: 'The first season will appear here.', guest: 'Sign in to save your comic progress.', signIn: 'Go to sign in', season: 'Comic', active: 'Current season', archived: 'Previous season', completed: 'Season completed', progress: 'Season progress', next: 'Until the next unlock', preparing: 'More episodes are being prepared.', episode: 'Episode', locked: 'Locked', sceneSlot: 'Scene placeholder', collectibles: 'Digital collectibles', collectibleEmpty: 'Digital extras earned this season will appear here.'
    },
    cs: {
      eyebrow: 'Tvůj příběh', heading: 'Komiks', loading: 'Načítání komiksu…', unavailable: 'Komiks je dočasně nedostupný.', retry: 'Zkusit znovu', empty: 'První sezóna se objeví zde.', guest: 'Přihlaste se, aby se ukládal postup komiksu.', signIn: 'Přejít k přihlášení', season: 'Komiks', active: 'Aktuální sezóna', archived: 'Předchozí sezóna', completed: 'Sezóna dokončena', progress: 'Postup sezóny', next: 'Do dalšího odemčení', preparing: 'Další epizody se připravují.', episode: 'Epizoda', locked: 'Zamčeno', sceneSlot: 'Místo pro scénu', collectibles: 'Digitální sběratelské předměty', collectibleEmpty: 'Zde se objeví digitální doplňky získané v sezóně.'
    }
  };

  const SUPPORTED_LANGS = new Set(Object.keys(COPY));
  let requestNumber = 0;

  const el = (tag, className, text) => {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined && text !== null) node.textContent = String(text);
    return node;
  };

  const getLang = () => {
    const lang = localStorage.getItem('swiezeLanguage') || 'pl';
    return SUPPORTED_LANGS.has(lang) ? lang : 'pl';
  };

  const safeArray = value => Array.isArray(value) ? value : [];
  const safePercent = value => Math.min(100, Math.max(0, Number.isFinite(Number(value)) ? Number(value) : 0));
  const safeAmount = value => Math.max(0, Number.isFinite(Number(value)) ? Number(value) : 0);
  const money = (value, lang) => `${new Intl.NumberFormat(lang === 'cs' ? 'cs-CZ' : `${lang}-${lang === 'en' ? 'GB' : lang.toUpperCase()}`, { maximumFractionDigits: 2 }).format(safeAmount(value))} zł`;

  function seasonNumber(season, index) {
    const match = String(season && season.code || '').match(/(?:season|sezon)-(\d+)/i);
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

  function artworkPlaceholder(label) {
    const slot = el('div', 'comic-artwork-slot');
    slot.setAttribute('aria-label', label);
    slot.append(el('span', '', 'ŚL'));
    return slot;
  }

  function renderScenes(episode, copy) {
    const scenes = el('div', 'comic-scenes');
    const source = safeArray(episode.scenes);
    if (!source.length) {
      const scene = el('article', 'comic-scene comic-scene-placeholder');
      scene.append(artworkPlaceholder(copy.sceneSlot), el('p', '', copy.sceneSlot));
      scenes.append(scene);
      return scenes;
    }

    source.forEach(sceneData => {
      const scene = el('article', 'comic-scene');
      scene.append(artworkPlaceholder(copy.sceneSlot));
      if (sceneData.title) scene.append(el('h5', '', sceneData.title));
      if (sceneData.body) scene.append(el('p', '', sceneData.body));
      scenes.append(scene);
    });
    return scenes;
  }

  function renderEpisodes(season, copy) {
    const list = el('div', 'comic-episodes');
    safeArray(season.episodes).forEach((episode, index) => {
      const unlocked = episode.is_unlocked === true;
      const card = el('article', `comic-episode${unlocked ? ' is-unlocked' : ' is-locked'}`);
      const top = el('div', 'comic-episode-head');
      top.append(el('span', 'comic-episode-number', `${copy.episode} ${index + 1}`));
      if (!unlocked) top.append(el('span', 'comic-lock-badge', `🔒 ${copy.locked}`));
      card.append(top, artworkPlaceholder(unlocked ? copy.sceneSlot : copy.locked));
      card.append(el('h4', '', unlocked ? (episode.title || `${copy.episode} ${index + 1}`) : '???'));
      if (unlocked && episode.summary) card.append(el('p', 'comic-episode-summary', episode.summary));
      if (unlocked) card.append(renderScenes(episode, copy));
      list.append(card);
    });
    return list;
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
      card.append(artworkPlaceholder(copy.collectibles), el('strong', '', item.name || item.code || copy.collectibles));
      if (item.description) card.append(el('p', '', item.description));
      list.append(card);
    });
    section.append(list);
    return section;
  }

  function renderSeason(season, index, copy, lang) {
    const percent = safePercent(season.progress_percent);
    const card = el('article', 'comic-season');
    const header = el('div', 'comic-season-head');
    const titleBox = el('div', 'comic-season-title');
    const number = seasonNumber(season, index);
    titleBox.append(el('h3', '', `${copy.season} #${number} — ${season.title || `#${number}`}: ${Math.round(percent)}%`));
    if (season.summary) titleBox.append(el('p', '', season.summary));
    const seasonState = season.is_completed ? copy.completed : season.status === 'active' ? copy.active : copy.archived;
    header.append(titleBox, el('span', `comic-season-badge${season.is_completed ? ' is-completed' : ''}`, seasonState));

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

    const locked = safeArray(season.episodes)
      .filter(episode => episode.is_unlocked !== true)
      .map(episode => safeAmount(episode.unlock_at_amount))
      .sort((a, b) => a - b);
    const hint = season.is_completed
      ? copy.completed
      : locked.length
        ? `${copy.next}: ${money(Math.max(0, locked[0] - safeAmount(season.credited_amount)), lang)}`
        : copy.preparing;
    progress.append(el('p', 'comic-next-hint', hint));

    card.append(header, progress);
    if (safeArray(season.episodes).length) card.append(renderEpisodes(season, copy));
    card.append(renderCollectibles(season, copy));
    return card;
  }

  function render(data, isGuest) {
    const lang = getLang();
    const copy = COPY[lang] || COPY.pl;
    setStaticCopy(copy);
    const root = el('div', 'comic-seasons');
    const seasons = safeArray(data && data.seasons);

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
  document.querySelectorAll('[data-lang]').forEach(button => {
    button.addEventListener('click', () => window.setTimeout(refresh, 0));
  });

  window.comicProgressUI = Object.freeze({ refresh });
  refresh();
})();
