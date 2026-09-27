(() => {
  'use strict';

  const COPY = {
    pl: {
      menuTitle: 'Menu',
      menuSubtitle: 'Wybierz kategorię i dodaj produkt bez dodatkowych ekranów.',
      storyTitle: 'Historia',
      storySubtitle: 'Czytaj dalej i sprawdź, ile brakuje do następnego epizodu.',
      rewardsSubtitle: 'Nagrody i kolekcje w jednym miejscu.',
      collectionsTitle: 'Kolekcje',
      collectionsSubtitle: 'Próbuj różnych smaków i odblokowuj bonusy.',
      profileSubtitle: 'Konto, język, instalacja i lokalizacja.',
      welcome: 'Witaj!',
      signIn: 'Zaloguj się',
      createAccount: 'Utwórz konto',
      accountBenefit: 'Zaloguj się przed zamówieniem, aby zakup mógł zostać przypisany do Twojej historii i nagród.',
      loginHelp: 'Problem z logowaniem?',
      language: 'Język',
      installApp: 'Zainstaluj aplikację',
      location: 'Jak do nas trafić',
      navMenu: 'Menu',
      navStory: 'Historia',
      navRewards: 'Nagrody',
      navProfile: 'Profil',
      continueReading: 'Czytaj dalej',
      read: 'Czytaj',
      allEpisodes: 'Wszystkie epizody',
      collapseEpisodes: 'Pokaż mniej',
      added: '✓ Dodano',
      add: '+ Dodaj',
      products: 'produkty',
      todayIceCream: 'Lody',
      coffee: 'Kawa',
      secret: 'Secret',
      noProducts: 'Brak dostępnych produktów.',
      menuUnavailable: 'Menu jest chwilowo niedostępne.',
      cartGuest: 'Zamówienie możesz złożyć bez konta. Zaloguj się przed zamówieniem, jeśli chcesz, aby zakup został przypisany do historii i nagród.',
      cartSigned: '✓ Jesteś zalogowany. To zamówienie może zostać przypisane do Twojej historii i nagród.',
      goSignIn: 'Zaloguj się',
      activeOrder: 'zamówienie',
      installIosTitle: 'Zainstaluj Świeże Lody',
      installIosText: 'W Safari wybierz Udostępnij → Dodaj do ekranu początkowego.',
      installUnsupported: 'Instalacja aplikacji jest dostępna z menu przeglądarki.',
      loginHelpTitle: 'Pomoc z logowaniem',
      loginHelpText: 'Konto klienta używa numeru telefonu i technicznego adresu logowania. Automatyczne odzyskiwanie hasła przez email nie jest jeszcze dostępne. W razie problemu poproś obsługę o pomoc.'
    },
    de: {
      menuTitle: 'Menü',
      menuSubtitle: 'Kategorie wählen und Produkte direkt hinzufügen.',
      storyTitle: 'Geschichte',
      storySubtitle: 'Weiterlesen und sehen, wie viel bis zur nächsten Episode fehlt.',
      rewardsSubtitle: 'Belohnungen und Sammlungen an einem Ort.',
      collectionsTitle: 'Sammlungen',
      collectionsSubtitle: 'Probiere verschiedene Sorten und schalte Boni frei.',
      profileSubtitle: 'Konto, Sprache, Installation und Standort.',
      welcome: 'Willkommen!',
      signIn: 'Anmelden',
      createAccount: 'Konto erstellen',
      accountBenefit: 'Melde dich vor der Bestellung an, damit der Kauf deiner Geschichte und deinen Belohnungen zugeordnet werden kann.',
      loginHelp: 'Probleme beim Anmelden?',
      language: 'Sprache',
      installApp: 'App installieren',
      location: 'Anfahrt',
      navMenu: 'Menü',
      navStory: 'Geschichte',
      navRewards: 'Belohnungen',
      navProfile: 'Profil',
      continueReading: 'Weiterlesen',
      read: 'Lesen',
      allEpisodes: 'Alle Episoden',
      collapseEpisodes: 'Weniger anzeigen',
      added: '✓ Hinzugefügt',
      add: '+ Hinzufügen',
      products: 'Produkte',
      todayIceCream: 'Eis',
      coffee: 'Kaffee',
      secret: 'Secret',
      noProducts: 'Keine Produkte verfügbar.',
      menuUnavailable: 'Das Menü ist momentan nicht verfügbar.',
      cartGuest: 'Du kannst ohne Konto bestellen. Melde dich vor der Bestellung an, wenn der Kauf deiner Geschichte und deinen Belohnungen zugeordnet werden soll.',
      cartSigned: '✓ Du bist angemeldet. Diese Bestellung kann deiner Geschichte und deinen Belohnungen zugeordnet werden.',
      goSignIn: 'Anmelden',
      activeOrder: 'Bestellung',
      installIosTitle: 'Świeże Lody installieren',
      installIosText: 'In Safari: Teilen → Zum Home-Bildschirm.',
      installUnsupported: 'Die Installation ist über das Browsermenü verfügbar.',
      loginHelpTitle: 'Hilfe bei der Anmeldung',
      loginHelpText: 'Das Kundenkonto verwendet eine Telefonnummer und eine technische Login-Adresse. Eine automatische Passwort-Wiederherstellung per E-Mail ist noch nicht verfügbar. Bitte wende dich bei Problemen an das Personal.'
    },
    en: {
      menuTitle: 'Menu',
      menuSubtitle: 'Choose a category and add products without extra screens.',
      storyTitle: 'Story',
      storySubtitle: 'Continue reading and see how much remains until the next episode.',
      rewardsSubtitle: 'Rewards and collections in one place.',
      collectionsTitle: 'Collections',
      collectionsSubtitle: 'Try different flavours and unlock bonuses.',
      profileSubtitle: 'Account, language, installation and location.',
      welcome: 'Welcome!',
      signIn: 'Sign in',
      createAccount: 'Create account',
      accountBenefit: 'Sign in before ordering so the purchase can be linked to your story and rewards.',
      loginHelp: 'Trouble signing in?',
      language: 'Language',
      installApp: 'Install app',
      location: 'How to find us',
      navMenu: 'Menu',
      navStory: 'Story',
      navRewards: 'Rewards',
      navProfile: 'Profile',
      continueReading: 'Continue reading',
      read: 'Read',
      allEpisodes: 'All episodes',
      collapseEpisodes: 'Show less',
      added: '✓ Added',
      add: '+ Add',
      products: 'products',
      todayIceCream: 'Ice cream',
      coffee: 'Coffee',
      secret: 'Secret',
      noProducts: 'No products available.',
      menuUnavailable: 'The menu is temporarily unavailable.',
      cartGuest: 'You can order without an account. Sign in before ordering if you want the purchase linked to your story and rewards.',
      cartSigned: '✓ You are signed in. This order can be linked to your story and rewards.',
      goSignIn: 'Sign in',
      activeOrder: 'order',
      installIosTitle: 'Install Świeże Lody',
      installIosText: 'In Safari choose Share → Add to Home Screen.',
      installUnsupported: 'App installation is available from your browser menu.',
      loginHelpTitle: 'Sign-in help',
      loginHelpText: 'The customer account uses a phone number and a technical login address. Automatic password recovery by email is not available yet. Ask staff for help if you cannot sign in.'
    },
    cs: {
      menuTitle: 'Menu',
      menuSubtitle: 'Vyber kategorii a přidej produkt bez dalších obrazovek.',
      storyTitle: 'Příběh',
      storySubtitle: 'Pokračuj ve čtení a zjisti, kolik zbývá do další epizody.',
      rewardsSubtitle: 'Odměny a kolekce na jednom místě.',
      collectionsTitle: 'Kolekce',
      collectionsSubtitle: 'Zkoušej různé příchutě a odemykej bonusy.',
      profileSubtitle: 'Účet, jazyk, instalace a poloha.',
      welcome: 'Vítej!',
      signIn: 'Přihlásit se',
      createAccount: 'Vytvořit účet',
      accountBenefit: 'Přihlas se před objednávkou, aby bylo možné nákup přiřadit k příběhu a odměnám.',
      loginHelp: 'Problém s přihlášením?',
      language: 'Jazyk',
      installApp: 'Nainstalovat aplikaci',
      location: 'Jak se k nám dostat',
      navMenu: 'Menu',
      navStory: 'Příběh',
      navRewards: 'Odměny',
      navProfile: 'Profil',
      continueReading: 'Pokračovat',
      read: 'Číst',
      allEpisodes: 'Všechny epizody',
      collapseEpisodes: 'Zobrazit méně',
      added: '✓ Přidáno',
      add: '+ Přidat',
      products: 'produkty',
      todayIceCream: 'Zmrzlina',
      coffee: 'Káva',
      secret: 'Secret',
      noProducts: 'Žádné produkty nejsou dostupné.',
      menuUnavailable: 'Menu je dočasně nedostupné.',
      cartGuest: 'Objednat můžeš i bez účtu. Přihlas se před objednávkou, pokud chceš nákup přiřadit k příběhu a odměnám.',
      cartSigned: '✓ Jsi přihlášen. Tuto objednávku lze přiřadit k příběhu a odměnám.',
      goSignIn: 'Přihlásit se',
      activeOrder: 'objednávka',
      installIosTitle: 'Nainstalovat Świeże Lody',
      installIosText: 'V Safari zvol Sdílet → Přidat na plochu.',
      installUnsupported: 'Instalace aplikace je dostupná v menu prohlížeče.',
      loginHelpTitle: 'Pomoc s přihlášením',
      loginHelpText: 'Zákaznický účet používá telefonní číslo a technickou přihlašovací adresu. Automatické obnovení hesla e-mailem zatím není dostupné. Při problému požádej obsluhu o pomoc.'
    }
  };

  let activeCategoryKey = 'icecream';
  let deferredInstallPrompt = null;
  let menuObserver = null;
  let storyObserver = null;
  let cartObserver = null;
  let storyExpanded = false;

  function lang() {
    try {
      if (typeof currentLang !== 'undefined' && COPY[currentLang]) {
        return currentLang;
      }
    } catch (_) {}
    const saved = localStorage.getItem('swiezeLanguage') || 'pl';
    return COPY[saved] ? saved : 'pl';
  }

  function copy(key) {
    return COPY[lang()]?.[key] || COPY.pl[key] || key;
  }

  function applyV3Copy() {
    document.querySelectorAll('[data-v3-copy]').forEach(node => {
      const value = copy(node.dataset.v3Copy);
      if (value) node.textContent = value;
    });

    const allButton = document.getElementById('v3StoryAllBtn');
    if (allButton && !allButton.hidden) {
      allButton.textContent =
        document.getElementById('comicProgressShell')?.classList.contains('v3-compact-route')
          ? copy('allEpisodes')
          : copy('collapseEpisodes');
    }
  }

  function safePublicCategories() {
    try {
      return Array.isArray(publicMenuCategories) ? publicMenuCategories : [];
    } catch (_) {
      return [];
    }
  }

  function menuStatus() {
    try {
      return typeof publicMenuStatus === 'string' ? publicMenuStatus : 'loading';
    } catch (_) {
      return 'loading';
    }
  }

  function localized(translations, field) {
    try {
      if (typeof localizedMenuValue === 'function') {
        return localizedMenuValue(translations, field) || '';
      }
    } catch (_) {}

    const locale = lang();
    return translations?.[locale]?.[field]
      || translations?.pl?.[field]
      || translations?.en?.[field]
      || '';
  }

  function productState(product) {
    try {
      if (typeof currentMenuProductState === 'function') {
        return currentMenuProductState(product);
      }
    } catch (_) {}

    return {
      price: Number(product?.promoPrice ?? product?.regularPrice ?? 0),
      promoActive: false
    };
  }

  function formattedPrice(value) {
    try {
      if (typeof formatMenuPrice === 'function') {
        return formatMenuPrice(value);
      }
    } catch (_) {}
    return `${Number(value || 0).toFixed(2).replace('.00', '')} zł`;
  }

  function safeImage(value) {
    try {
      if (typeof safeImageUrl === 'function') return safeImageUrl(value);
    } catch (_) {}
    try {
      const url = new URL(String(value || ''));
      return ['https:', 'http:'].includes(url.protocol) ? url.href : '';
    } catch (_) {
      return '';
    }
  }

  function setAddedFeedback(button) {
    if (!button || button.dataset.v3FeedbackBusy === '1') return;
    button.dataset.v3FeedbackBusy = '1';

    const original = button.dataset.v3OriginalText || button.textContent;
    button.dataset.v3OriginalText = original;
    button.classList.add('v3-added');
    button.textContent = copy('added');

    setTimeout(() => {
      button.classList.remove('v3-added');
      button.textContent = button.dataset.v3OriginalText || copy('add');
      delete button.dataset.v3FeedbackBusy;
    }, 950);
  }

  document.addEventListener('click', event => {
    const button = event.target.closest('.sl-add-btn, .sl-ice-add, .v3-product-add');
    if (button) setAddedFeedback(button);
  }, true);

  function categoryKey(category) {
    return `category:${category.id}`;
  }

  function categoryFromKey(key) {
    if (!key.startsWith('category:')) return null;
    const id = key.slice('category:'.length);
    return safePublicCategories().find(category => String(category.id) === id) || null;
  }

  function renderCategoryChips() {
    const host = document.getElementById('v3MenuCategories');
    if (!host) return;

    const categories = safePublicCategories();
    const status = menuStatus();

    if (status === 'unavailable') {
      host.innerHTML = `<span class="v3-empty">${copy('menuUnavailable')}</span>`;
      document.getElementById('v3ProductList').innerHTML =
        `<div class="v3-empty">${copy('menuUnavailable')}</div>`;
      return;
    }

    if (!categories.length && status !== 'ready') {
      host.innerHTML = '<span class="v3-loading">…</span>';
      return;
    }

    const entries = [
      { key: 'icecream', label: `🍦 ${copy('todayIceCream')}` },
      ...categories.map(category => ({
        key: categoryKey(category),
        label: `${category.icon || '🍦'} ${localized(category.translations, 'name') || category.slug}`
      })),
      { key: 'coffee', label: `☕ ${copy('coffee')}` },
      { key: 'secret', label: `🔒 ${copy('secret')}` }
    ];

    if (!entries.some(entry => entry.key === activeCategoryKey)) {
      activeCategoryKey = entries[0]?.key || 'icecream';
    }

    host.replaceChildren();

    entries.forEach(entry => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = `v3-category-chip${entry.key === activeCategoryKey ? ' active' : ''}`;
      button.textContent = entry.label;
      button.dataset.categoryKey = entry.key;

      button.addEventListener('click', () => {
        activeCategoryKey = entry.key;
        renderCategoryChips();
        renderActiveProducts();
      });

      host.appendChild(button);
    });
  }

  function createMedia(imageUrl, fallback = '🍦') {
    const media = document.createElement('div');
    media.className = 'v3-product-media';

    const image = safeImage(imageUrl);
    if (image) {
      const img = document.createElement('img');
      img.src = image;
      img.alt = '';
      img.loading = 'lazy';
      img.decoding = 'async';
      media.appendChild(img);
    } else {
      media.textContent = fallback;
    }

    return media;
  }

  function createProductArticle({ name, description, price, oldPrice, image, emoji, badges, add }) {
    const article = document.createElement('article');
    article.className = 'v3-product';

    article.appendChild(createMedia(image, emoji));

    const copyBox = document.createElement('div');
    copyBox.className = 'v3-product-copy';

    const title = document.createElement('h3');
    title.textContent = name || '';
    copyBox.appendChild(title);

    if (description) {
      const desc = document.createElement('p');
      desc.textContent = description;
      copyBox.appendChild(desc);
    }

    if (badges?.length) {
      const badgeRow = document.createElement('div');
      badgeRow.className = 'v3-badges';
      badges.forEach(item => {
        const badge = document.createElement('span');
        badge.className = `v3-badge ${item.kind || ''}`.trim();
        badge.textContent = item.label;
        badgeRow.appendChild(badge);
      });
      copyBox.appendChild(badgeRow);
    }

    const priceLine = document.createElement('div');
    priceLine.className = 'v3-product-price';
    if (oldPrice) {
      const old = document.createElement('del');
      old.className = 'v3-old-price';
      old.textContent = oldPrice;
      priceLine.appendChild(old);
    }
    priceLine.append(document.createTextNode(price || ''));
    copyBox.appendChild(priceLine);

    article.appendChild(copyBox);

    const addButton = document.createElement('button');
    addButton.type = 'button';
    addButton.className = 'sl-add-btn v3-product-add';
    addButton.textContent = copy('add');
    addButton.dataset.v3OriginalText = copy('add');
    addButton.addEventListener('click', add);
    article.appendChild(addButton);

    return article;
  }

  async function renderIceCream() {
    const host = document.getElementById('v3ProductList');
    host.innerHTML = '<div class="v3-loading">…</div>';

    const client = window.customerSupabase;
    if (!client) {
      host.innerHTML = `<div class="v3-empty">${copy('menuUnavailable')}</div>`;
      return;
    }

    const { data, error } = await client.rpc('get_today_ice_cream_flavours');

    if (error) {
      console.error('V3 ICE CREAM LOAD ERROR:', error);
      host.innerHTML = `<div class="v3-empty">${copy('menuUnavailable')}</div>`;
      return;
    }

    const flavours = Array.isArray(data) ? data : [];
    host.replaceChildren();

    if (!flavours.length) {
      host.innerHTML = `<div class="v3-empty">${copy('noProducts')}</div>`;
      return;
    }

    flavours.forEach(flavour => {
      host.appendChild(createProductArticle({
        name: flavour.name,
        description: flavour.description || flavour.base_label || '',
        price: formattedPrice(Number(flavour.price || 10)),
        image: flavour.image_url || '',
        emoji: '🍦',
        badges: flavour.badge ? [{ label: flavour.badge }] : [],
        add: () => window.addIceCreamToCart?.(flavour)
      }));
    });
  }

  function renderStandardCategory(category) {
    const host = document.getElementById('v3ProductList');
    host.replaceChildren();

    const products = Array.isArray(category?.products) ? category.products : [];

    if (!products.length) {
      host.innerHTML = `<div class="v3-empty">${copy('noProducts')}</div>`;
      return;
    }

    products.forEach(product => {
      const state = productState(product);
      const badges = [];

      if (state.promoActive) {
        badges.push({ label: 'PROMO', kind: 'promo' });
      }

      if (product.isNew) {
        badges.push({ label: 'NEW', kind: 'new' });
      }

      if (product.badge) {
        badges.push({ label: product.badge });
      }

      const names = Object.fromEntries(
        Object.entries(product.translations || {}).map(([locale, translation]) => [
          locale,
          translation?.name || ''
        ])
      );

      host.appendChild(createProductArticle({
        name: localized(product.translations, 'name') || product.slug,
        description: localized(product.translations, 'description'),
        price: formattedPrice(state.price),
        oldPrice: state.promoActive ? formattedPrice(product.regularPrice) : '',
        image: product.imageUrl,
        emoji: category.icon || '🍦',
        badges,
        add: () => window.addMenuProductToCart?.({
          legacyKey: product.legacyKey,
          categorySlug: category.slug,
          name: names,
          price: formattedPrice(state.price),
          image: product.imageUrl
        })
      }));
    });
  }

  function renderInfoCategory(kind) {
    const host = document.getElementById('v3ProductList');
    host.replaceChildren();

    const box = document.createElement('div');
    box.className = 'v3-product-info';

    const copyBox = document.createElement('div');
    const title = document.createElement('strong');
    const desc = document.createElement('div');

    if (kind === 'coffee') {
      title.textContent = `☕ ${copy('coffee')}`;
      try {
        desc.textContent = typeof tr === 'function' ? tr('coffeeInfo') : '';
      } catch (_) {
        desc.textContent = '';
      }
    } else {
      title.textContent = `🔒 ${copy('secret')}`;
      try {
        desc.textContent = typeof tr === 'function' ? tr('secretInfo') : '';
      } catch (_) {
        desc.textContent = '';
      }
    }

    copyBox.append(title, desc);

    const detailsButton = document.createElement('button');
    detailsButton.type = 'button';
    detailsButton.textContent = '›';
    detailsButton.addEventListener('click', () => {
      document.querySelector(`[data-info="${kind}"]`)?.click();
    });

    box.append(copyBox, detailsButton);
    host.appendChild(box);
  }

  function renderActiveProducts() {
    if (activeCategoryKey === 'icecream') {
      renderIceCream();
      return;
    }

    if (activeCategoryKey === 'coffee' || activeCategoryKey === 'secret') {
      renderInfoCategory(activeCategoryKey);
      return;
    }

    const category = categoryFromKey(activeCategoryKey);
    if (category) {
      renderStandardCategory(category);
    }
  }

  function refreshMenuV3() {
    renderCategoryChips();
    renderActiveProducts();
  }

  function startMenuBridge() {
    const legacy = document.getElementById('dynamicMenuCategories');

    if (legacy) {
      menuObserver = new MutationObserver(() => {
        renderCategoryChips();

        const selected = categoryFromKey(activeCategoryKey);
        if (selected) renderStandardCategory(selected);
      });

      menuObserver.observe(legacy, { childList: true, subtree: true });
    }

    let attempts = 0;
    const timer = setInterval(() => {
      attempts += 1;

      if (menuStatus() === 'ready' || menuStatus() === 'unavailable') {
        clearInterval(timer);
        refreshMenuV3();
      } else if (attempts > 80) {
        clearInterval(timer);
        renderCategoryChips();
      }
    }, 250);
  }

  /* -------------------------------------------------------
     AUTH UI MODE
  ------------------------------------------------------- */
  function setAuthMode(mode) {
    const register = mode === 'register';

    document.querySelectorAll('.v3-register-only').forEach(node => {
      node.hidden = !register;
    });

    document.getElementById('authLogin').hidden = register;

    const loginTab = document.getElementById('v3AuthLoginMode');
    const registerTab = document.getElementById('v3AuthRegisterMode');

    loginTab.classList.toggle('active', !register);
    registerTab.classList.toggle('active', register);
    loginTab.setAttribute('aria-selected', String(!register));
    registerTab.setAttribute('aria-selected', String(register));

    const password = document.getElementById('authPassword');
    if (password) {
      password.autocomplete = register ? 'new-password' : 'current-password';
    }
  }

  document.getElementById('v3AuthLoginMode')?.addEventListener('click', () => setAuthMode('login'));
  document.getElementById('v3AuthRegisterMode')?.addEventListener('click', () => setAuthMode('register'));

  document.getElementById('v3TogglePassword')?.addEventListener('click', () => {
    const input = document.getElementById('authPassword');
    if (!input) return;
    input.type = input.type === 'password' ? 'text' : 'password';
  });

  function showInfo(title, text) {
    const dialog = document.getElementById('infoDlg');
    const heading = document.getElementById('infoTitle');
    const body = document.getElementById('infoText');

    if (!dialog || !heading || !body) return;

    heading.textContent = title;
    body.textContent = text;
    dialog.showModal();
  }

  document.getElementById('v3LoginHelp')?.addEventListener('click', () => {
    showInfo(copy('loginHelpTitle'), copy('loginHelpText'));
  });

  /* -------------------------------------------------------
     CART CREDITING HINT
  ------------------------------------------------------- */
  async function enhanceCart() {
    const dialog = document.querySelector('.sl-cart-modal');
    const content = dialog?.querySelector('#slCartContent');
    if (!dialog || !content) return;

    content.querySelector('.v3-cart-credit')?.remove();

    const orderButton = content.querySelector('#slOrderButton');
    if (!orderButton) return;

    let session = null;
    let profile = null;

    try {
      session = await window.customerAuth?.getSession?.();
      if (session) {
        profile = await window.customerAuth?.getProfile?.();
      }
    } catch (_) {}

    const linked = Boolean(session && profile?.id);

    const hint = document.createElement('div');
    hint.className = `v3-cart-credit${linked ? ' is-signed' : ''}`;
    hint.textContent = linked ? copy('cartSigned') : copy('cartGuest');

    if (!linked) {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = copy('goSignIn');
      button.addEventListener('click', () => {
        dialog.close();
        try {
          if (typeof showPage === 'function') showPage('profile');
        } catch (_) {}
        setAuthMode('login');
        setTimeout(() => document.getElementById('authPhone')?.focus(), 50);
      });
      hint.appendChild(button);
    }

    orderButton.before(hint);
  }

  function startCartBridge() {
    const dialog = document.querySelector('.sl-cart-modal');
    const content = dialog?.querySelector('#slCartContent');

    if (content) {
      cartObserver = new MutationObserver(() => enhanceCart());
      cartObserver.observe(content, { childList: true, subtree: true });
    }

    const cartButton = document.querySelector('.sl-cart-fab');
    if (cartButton) {
      const sync = () => {
        let count = 0;
        let total = 0;

        try {
          const items = JSON.parse(localStorage.getItem('swiezeCart') || '[]');

          if (Array.isArray(items)) {
            count = items.reduce(
              (sum, item) => sum + Number(item?.qty || 0),
              0
            );

            total = items.reduce((sum, item) => {
              const price = Number(
                String(item?.price || '0')
                  .replace(',', '.')
                  .replace(/[^0-9.]/g, '')
              ) || 0;

              return sum + price * Number(item?.qty || 0);
            }, 0);
          }
        } catch (_) {}

        cartButton.classList.toggle('v3-empty-cart', count <= 0);

        if (count > 0) {
          const nextMarkup =
            `🛒 ${count} · ${formattedPrice(total)} <span>→</span>`;

          // Avoid an endless MutationObserver loop.
          if (cartButton.innerHTML !== nextMarkup) {
            cartButton.innerHTML = nextMarkup;
          }
        }
      };

      const observer = new MutationObserver(sync);
      observer.observe(cartButton, { childList: true, subtree: true, characterData: true });
      sync();
      setInterval(sync, 1000);
    }
  }

  /* -------------------------------------------------------
     ACTIVE ORDER SHORTCUT
  ------------------------------------------------------- */
  function orderStatusText(status) {
    const map = {
      pl: { new:'Nowe', accepted:'Przyjęte', preparing:'Robimy', ready:'Gotowe', collected:'Wydane', cancelled:'Anulowane' },
      de: { new:'Neu', accepted:'Angenommen', preparing:'In Arbeit', ready:'Fertig', collected:'Abgeholt', cancelled:'Storniert' },
      en: { new:'New', accepted:'Accepted', preparing:'Preparing', ready:'Ready', collected:'Collected', cancelled:'Cancelled' },
      cs: { new:'Nová', accepted:'Přijatá', preparing:'Příprava', ready:'Hotovo', collected:'Vydáno', cancelled:'Zrušeno' }
    };
    return map[lang()]?.[status] || status || '';
  }

  function refreshOrderShortcut() {
    const button = document.querySelector('.sl-order-status-btn');
    const host = document.getElementById('v3OrderShortcutHost');

    if (!button || !host) return;

    if (button.parentElement !== host) host.appendChild(button);

    let order = null;
    try {
      order = JSON.parse(localStorage.getItem('swiezeLastOrder') || 'null');
    } catch (_) {}

    const active = order && !['collected', 'cancelled'].includes(order.status);

    button.classList.toggle('v3-no-active-order', !active);

    if (active) {
      const number = order.orderNumber ? `#${order.orderNumber}` : '';
      const status = orderStatusText(order.status);
      button.textContent = `🧾 ${number} · ${status}`.replace(/\s+/g, ' ').trim();
    }
  }

  /* -------------------------------------------------------
     STORY COMPACT ROUTE + GUTTER READER
  ------------------------------------------------------- */
  function updateStorySummary() {
    const shell = document.getElementById('comicProgressShell');
    const continueCard = document.getElementById('v3StoryContinue');
    const allButton = document.getElementById('v3StoryAllBtn');

    if (!shell || !continueCard || !allButton) return;

    const stops = [...shell.querySelectorAll('.comic-route-stop')];
    if (!stops.length) {
      continueCard.hidden = true;
      allButton.hidden = true;
      return;
    }

    stops.forEach(stop => stop.classList.remove('v3-visible-stop'));

    let current =
      shell.querySelector('.comic-route-stop.is-current')
      || [...shell.querySelectorAll('.comic-route-stop.is-unlocked')].at(-1)
      || stops[0];

    current?.classList.add('v3-visible-stop');

    const firstLocked = shell.querySelector('.comic-route-stop.is-locked');
    firstLocked?.classList.add('v3-visible-stop');

    shell.classList.toggle('v3-compact-route', !storyExpanded);

    const currentButton = current?.querySelector('.comic-route-button');
    const currentTitle = current?.querySelector('.comic-route-info strong')?.textContent?.trim();
    const nextHint =
      shell.querySelector('.comic-next-hint')?.textContent?.trim()
      || firstLocked?.querySelector('.comic-route-state')?.textContent?.trim()
      || '';

    document.getElementById('v3StoryEpisodeTitle').textContent = currentTitle || 'Komiks';
    document.getElementById('v3StoryNextHint').textContent = nextHint;
    continueCard.hidden = !currentButton;
    allButton.hidden = stops.length <= 2;

    const continueButton = document.getElementById('v3StoryContinueBtn');
    continueButton.onclick = () => currentButton?.click();

    allButton.textContent = storyExpanded
      ? copy('collapseEpisodes')
      : copy('allEpisodes');
  }

  document.getElementById('v3StoryAllBtn')?.addEventListener('click', event => {
    const shell = document.getElementById('comicProgressShell');
    if (!shell) return;

    storyExpanded = !storyExpanded;
    shell.classList.toggle('v3-compact-route', !storyExpanded);
    event.currentTarget.textContent = storyExpanded
      ? copy('collapseEpisodes')
      : copy('allEpisodes');
  });

  function forceReaderFlow(root = document) {
    root.querySelectorAll?.('.comic-reader').forEach(dialog => {
      dialog.classList.add('v3-reader-flow');
      dialog.querySelectorAll('.comic-dialogue-panel').forEach(panel => {
        panel.classList.add('uses-lettering-gutter');
      });
    });
  }

  function startStoryBridge() {
    const content = document.getElementById('comicProgressContent');

    if (content) {
      storyObserver = new MutationObserver(() => updateStorySummary());
      storyObserver.observe(content, { childList: true, subtree: true });
      updateStorySummary();
    }

    const bodyObserver = new MutationObserver(records => {
      records.forEach(record => {
        record.addedNodes.forEach(node => {
          if (node.nodeType !== 1) return;
          if (node.matches?.('.comic-reader')) {
            forceReaderFlow(node.parentElement || document);
          } else if (node.querySelector?.('.comic-reader')) {
            forceReaderFlow(node);
          }
        });
      });
    });

    bodyObserver.observe(document.body, { childList: true, subtree: true });
  }

  /* -------------------------------------------------------
     INSTALL
  ------------------------------------------------------- */
  window.addEventListener('beforeinstallprompt', event => {
    event.preventDefault();
    deferredInstallPrompt = event;
  });

  document.getElementById('v3InstallApp')?.addEventListener('click', async () => {
    if (deferredInstallPrompt) {
      deferredInstallPrompt.prompt();
      try {
        await deferredInstallPrompt.userChoice;
      } catch (_) {}
      deferredInstallPrompt = null;
      return;
    }

    const ua = navigator.userAgent || '';
    const isiOS = /iPad|iPhone|iPod/.test(ua)
      || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

    if (isiOS) {
      showInfo(copy('installIosTitle'), copy('installIosText'));
    } else {
      showInfo(copy('installApp'), copy('installUnsupported'));
    }
  });

  /* -------------------------------------------------------
     LANGUAGE + INIT
  ------------------------------------------------------- */
  document.querySelectorAll('[data-lang]').forEach(button => {
    button.addEventListener('click', () => {
      setTimeout(() => {
        applyV3Copy();
        renderCategoryChips();
        renderActiveProducts();
        updateStorySummary();
        enhanceCart();
        refreshOrderShortcut();
      }, 0);
    });
  });

  window.addEventListener('customer-auth-changed', () => {
    setTimeout(() => {
      enhanceCart();
      refreshOrderShortcut();
    }, 0);
  });

  setAuthMode('login');
  applyV3Copy();
  startMenuBridge();
  startCartBridge();
  startStoryBridge();

  setInterval(refreshOrderShortcut, 2000);
  refreshOrderShortcut();

  try {
    if (typeof showPage === 'function') showPage('menu');
  } catch (_) {}
})();
