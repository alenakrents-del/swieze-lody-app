(() => {
  'use strict';

  const DATA = () => window.comicLongformV1;
  const SUPPORTED = new Set(['pl','de','en','cs']);
  const speakerNames = { maja: 'Maja', maks: 'Maks', lea: 'Lea' };

  const getLang = () => {
    const saved = localStorage.getItem('swiezeLanguage') || 'pl';
    return SUPPORTED.has(saved) ? saved : 'pl';
  };

  const localize = value => {
    const lang = getLang();
    return String(value?.[lang] || value?.pl || value?.en || '');
  };

  function identifyEpisode(dialog) {
    const longformId = dialog.querySelector('.comic-longform-pages')?.dataset.longformEpisode;
    if (longformId) return longformId;

    const src = dialog.querySelector('.comic-illustration')?.getAttribute('src') || '';
    const imageMatch = src.match(/episode-(0[1-9]|1[0-5])-panel/i);
    if (imageMatch) return imageMatch[1];

    const title = dialog.querySelector('#comicReaderTitle')?.textContent?.trim() || '';
    const episodes = DATA()?.episodes || {};
    return Object.entries(episodes).find(([, entry]) => entry.titles?.includes(title))?.[0] || null;
  }

  function blockNode(block, blockIndex) {
    if (block.type === 'narration') {
      const p = document.createElement('p');
      p.className = 'comic-longform-narration';
      p.dataset.longformBlock = String(blockIndex);
      p.textContent = localize(block.text);
      return p;
    }

    const row = document.createElement('div');
    row.className = `comic-longform-line speaker-${block.speaker || 'unknown'}`;
    row.dataset.longformBlock = String(blockIndex);

    const avatar = document.createElement('span');
    avatar.className = 'comic-longform-avatar';
    avatar.setAttribute('aria-hidden', 'true');
    avatar.textContent =
      block.speaker === 'maja' ? '👩' :
      block.speaker === 'lea' ? '👓' :
      block.speaker === 'maks' ? '🧒' : '•';

    const bubble = document.createElement('div');
    bubble.className = 'comic-longform-bubble';

    const name = document.createElement('strong');
    name.textContent = speakerNames[block.speaker] || '';

    const text = document.createElement('p');
    text.textContent = localize(block.text);

    bubble.append(name, text);
    row.append(avatar, bubble);
    return row;
  }

  function refreshLocalizedCopy(dialog, episodeId) {
    const entry = DATA()?.episodes?.[episodeId];
    const pages = dialog.querySelector('.comic-longform-pages');
    if (!entry || !pages) return false;

    pages.querySelectorAll('.comic-longform-panel').forEach((panel, panelIndex) => {
      const blocks = entry.panels?.[panelIndex]?.blocks || [];
      panel.querySelectorAll('[data-longform-block]').forEach(node => {
        const blockIndex = Number(node.dataset.longformBlock);
        const block = blocks[blockIndex];
        if (!block) return;
        const target = block.type === 'narration'
          ? node
          : node.querySelector('.comic-longform-bubble p');
        if (target) target.textContent = localize(block.text);
      });
    });

    const teaser = dialog.querySelector('.comic-next-teaser');
    if (teaser && entry.teaser) teaser.textContent = localize(entry.teaser);

    dialog.dataset.longformLang = getLang();
    return true;
  }

  function transform(dialog) {
    if (!dialog?.classList?.contains('comic-reader')) return;

    const episodeId = identifyEpisode(dialog);
    const entry = DATA()?.episodes?.[episodeId];
    if (!entry) return;

    if (dialog.dataset.longformApplied === '1') {
      if (refreshLocalizedCopy(dialog, episodeId)) return;
      dialog.dataset.longformApplied = '0';
    }

    const oldPages = dialog.querySelector('.comic-reader-pages');
    if (!oldPages) return;

    const oldPanels = [...oldPages.querySelectorAll('.comic-reader-panel')];
    if (!oldPanels.length) return;

    const pages = document.createElement('div');
    pages.className = 'comic-reader-pages comic-longform-pages';
    pages.dataset.longformEpisode = episodeId;

    entry.panels.forEach((panelData, index) => {
      const panel = document.createElement('article');
      panel.className = `comic-longform-panel panel-${index + 1}`;
      panel.dataset.longformPanel = String(index);

      const oldArt = oldPanels[index]?.querySelector('.comic-panel-art');
      if (oldArt) {
        const artWrap = document.createElement('div');
        artWrap.className = 'comic-longform-art';
        artWrap.append(oldArt);
        panel.append(artWrap);
      }

      const reading = document.createElement('div');
      reading.className = 'comic-longform-reading';
      panelData.blocks.forEach((block, blockIndex) => {
        reading.append(blockNode(block, blockIndex));
      });
      panel.append(reading);
      pages.append(panel);
    });

    oldPages.replaceWith(pages);

    const teaser = dialog.querySelector('.comic-next-teaser');
    if (teaser && entry.teaser) teaser.textContent = localize(entry.teaser);

    dialog.classList.add('comic-reader-longform');
    dialog.classList.remove('v3-reader-flow');
    dialog.dataset.longformApplied = '1';
    dialog.dataset.longformLang = getLang();
  }

  function scan(root = document) {
    root.querySelectorAll?.('dialog.comic-reader').forEach(transform);
  }

  const observer = new MutationObserver(records => {
    for (const record of records) {
      for (const node of record.addedNodes) {
        if (node.nodeType !== 1) continue;
        if (node.matches?.('dialog.comic-reader')) transform(node);
        else scan(node);
      }
    }
  });

  observer.observe(document.body, { childList:true, subtree:true });

  // Language buttons update localStorage in app.js. Refresh on the next task so
  // already-open long-form copy never gets stuck in the previous language.
  document.addEventListener('click', () => {
    setTimeout(() => scan(), 0);
    setTimeout(() => scan(), 60);
  }, true);

  window.addEventListener('languagechange', () => scan());
  window.addEventListener('storage', event => {
    if (event.key === 'swiezeLanguage') scan();
  });
  scan();
})();
