const sb = window.supabase.createClient(
  window.APP_CONFIG.supabaseUrl,
  window.APP_CONFIG.supabaseAnonKey
);

let currentLang = localStorage.getItem('swiezeLanguage') || 'pl';
let currentCollection = 'MILKSHAKE';
let DATA = {};

const T = {
  pl: {
    madeHere: 'Robione na miejscu',
    hello: '👋 Cześć!',
    collectRewards: 'Zbieraj smaki i odbieraj nagrody!',
    lemonades: 'Lemoniady',
    mission: 'Misja',
    discovered: 'odkrytych',
    rewardUnlocked: '🎉 NAGRODA ODBLOKOWANA!',
    showCode: '🎟️ Pokaż kod',
    showCodeSimple: 'Pokaż kod',
    yourRewards: '🎁 Twoje nagrody',
    rewardSubtitle: 'Aktywne nagrody i odblokowane bonusy.',
    available: 'DOSTĘPNA',
    freeTopping: 'Darmowy topping',
    reward3: 'Odblokowane za 3 różne milkshake’i.',
    stillLocked: 'JESZCZE ZABLOKOWANE',
    secretDessert: 'Sekretny Deser',
    discover6: 'Odkryj 6 smaków Milkshake.',
    collectAll: 'Zbierz całą kolekcję 9/9.',
    menuTitle: '☰ Menu',
    tapCategory: 'Dotknij kategorii, aby zobaczyć produkty.',
    milkshakeCount: '9 smaków • 25 zł',
    lemonadeCount: '4 smaki • 18 zł',
    waffles: 'Gofry',
    from10: 'od 10 zł',
    iceCream: 'Lody',
    iceCreamPrice: '100 g • 10 zł',
    coffee: 'Kawa',
    onSite: 'na miejscu',
    toUnlock: 'do odblokowania',
    hereNow: '📍 Tu i teraz',
    hereNowShop: 'Świeże Lody. Tu i teraz.',
    distanceStart: 'Kliknij, a pokażę ile zostało iść.',
    calculateDistance: '📡 Policz odległość',
    guideMe: '🚶 Prowadź mnie',
    more: '••• Więcej',
    collectorProgram: 'Program kolekcjonera Świeże Lody.',
    customerProfile: 'Profil klienta',
    howWorks: 'Jak działa gra?',
    privacy: 'Prywatność',
    yourProfile: '👤 Twój profil',
    profileSubtitle: 'Karta klienta i kod do skanowania.',
    collector: 'Kolekcjoner Świeże Lody',
    showAtOrder: 'Pokaż ten kod przy zamówieniu.',
    flavours: 'smaki',
    reward: 'nagroda',
    collectionNav: 'Kolekcja',
    rewardsNav: 'Nagrody',
    locationNav: 'Lokalizacja',
    moreNav: 'Więcej',
    yourRewardCode: 'TWÓJ KOD NAGRODY',
    rewardCodeHelp: 'Pokaż ten ekran przy zamówieniu. Nagrodę zatwierdza obsługa.',
    chooseTopping: '✨ Wybierz topping',
    oneFree: 'Jeden topping gratis.',
    chosen: 'Wybrano',
    milkshakeTitle: '🥤 Milkshake',
    lemonadeTitle: '🍋 Lemoniady',
    waffleTitle: '🧇 Gofry',
    milkshakeCollection: 'Twoja kolekcja Milkshake',
    lemonadeCollection: 'Twoja kolekcja Lemoniad',
    vacationCollection: 'Wakacyjna Misja',
    milkshakeHint: '9/9 → Secret Milkshake + status Master',
    lemonadeHint: 'Zbierz 4 różne lemoniady',
    vacationHint: 'Ukończ misję → nagroda',
    secretDessertLabel: '🔒 SEKRETNY DESER',
    secretLemonadeLabel: '🔒 SECRET LEMONADE',
    missionRewardLabel: '🎁 NAGRODA MISJI',
    lookingLocation: 'Szukam Twojej lokalizacji…',
    locationDenied: 'Włącz dostęp do lokalizacji, aby policzyć odległość.',
    aboutGame: 'Próbuj różnych smaków. Ten sam smak nie zwiększa kolekcji. Nowy smak = nowa karta.',
    familyText: 'Rodzina będzie mogła zbierać wspólną kolekcję jednym kodem.',
    privacyText: 'Dane klienta są chronione przez Supabase i RLS.',
    icecreamInfo: 'Lody 100 g • 10 zł.',
    coffeeInfo: 'Kawa i Ice Coffee.',
    secretInfo: 'Sekretne pozycje odblokowują się po ukończeniu kolekcji i misji.'
  },

  de: {
    madeHere: 'Vor Ort gemacht',
    hello: '👋 Hallo!',
    collectRewards: 'Sammle Sorten und sichere dir Belohnungen!',
    lemonades: 'Limonaden',
    mission: 'Mission',
    discovered: 'entdeckt',
    rewardUnlocked: '🎉 BELOHNUNG FREIGESCHALTET!',
    showCode: '🎟️ Code zeigen',
    showCodeSimple: 'Code zeigen',
    yourRewards: '🎁 Deine Belohnungen',
    rewardSubtitle: 'Aktive Belohnungen und freigeschaltete Boni.',
    available: 'VERFÜGBAR',
    freeTopping: 'Kostenloses Topping',
    reward3: 'Freigeschaltet nach 3 verschiedenen Milkshakes.',
    stillLocked: 'NOCH GESPERRT',
    secretDessert: 'Geheimes Dessert',
    discover6: 'Entdecke 6 Milkshake-Sorten.',
    collectAll: 'Sammle die gesamte Kollektion 9/9.',
    menuTitle: '☰ Menü',
    tapCategory: 'Tippe auf eine Kategorie, um die Produkte zu sehen.',
    milkshakeCount: '9 Sorten • 25 zł',
    lemonadeCount: '4 Sorten • 18 zł',
    waffles: 'Waffeln',
    from10: 'ab 10 zł',
    iceCream: 'Eis',
    iceCreamPrice: '100 g • 10 zł',
    coffee: 'Kaffee',
    onSite: 'vor Ort',
    toUnlock: 'freizuschalten',
    hereNow: '📍 Hier und jetzt',
    hereNowShop: 'Świeże Lody. Hier und jetzt.',
    distanceStart: 'Tippe hier, um die Entfernung zu berechnen.',
    calculateDistance: '📡 Entfernung berechnen',
    guideMe: '🚶 Route starten',
    more: '••• Mehr',
    collectorProgram: 'Świeże Lody Sammlerprogramm.',
    customerProfile: 'Kundenprofil',
    howWorks: 'Wie funktioniert das Spiel?',
    privacy: 'Datenschutz',
    yourProfile: '👤 Dein Profil',
    profileSubtitle: 'Kundenkarte und Scan-Code.',
    collector: 'Świeże Lody Sammler',
    showAtOrder: 'Zeige diesen Code bei der Bestellung.',
    flavours: 'Sorten',
    reward: 'Belohnung',
    collectionNav: 'Sammlung',
    rewardsNav: 'Belohnungen',
    locationNav: 'Standort',
    moreNav: 'Mehr',
    yourRewardCode: 'DEIN BELOHNUNGSCODE',
    rewardCodeHelp: 'Zeige diesen Bildschirm bei der Bestellung. Das Personal bestätigt die Belohnung.',
    chooseTopping: '✨ Topping auswählen',
    oneFree: 'Ein Topping kostenlos.',
    chosen: 'Ausgewählt',
    milkshakeTitle: '🥤 Milkshake',
    lemonadeTitle: '🍋 Limonaden',
    waffleTitle: '🧇 Waffeln',
    milkshakeCollection: 'Deine Milkshake-Sammlung',
    lemonadeCollection: 'Deine Limonaden-Sammlung',
    vacationCollection: 'Urlaubsmission',
    milkshakeHint: '9/9 → Secret Milkshake + Master-Status',
    lemonadeHint: 'Sammle 4 verschiedene Limonaden',
    vacationHint: 'Mission abschließen → Belohnung',
    secretDessertLabel: '🔒 GEHEIMES DESSERT',
    secretLemonadeLabel: '🔒 GEHEIME LIMONADE',
    missionRewardLabel: '🎁 MISSIONSBELOHNUNG',
    lookingLocation: 'Standort wird gesucht…',
    locationDenied: 'Aktiviere den Standortzugriff, um die Entfernung zu berechnen.',
    aboutGame: 'Probiere verschiedene Sorten. Dieselbe Sorte erhöht die Sammlung nicht. Neue Sorte = neue Karte.',
    familyText: 'Eine Familie kann künftig mit einem gemeinsamen Code sammeln.',
    privacyText: 'Kundendaten werden durch Supabase und RLS geschützt.',
    icecreamInfo: 'Eis 100 g • 10 zł.',
    coffeeInfo: 'Kaffee und Ice Coffee.',
    secretInfo: 'Geheime Produkte werden nach Abschluss von Sammlungen und Missionen freigeschaltet.'
  },

  en: {
    madeHere: 'Made on site',
    hello: '👋 Hello!',
    collectRewards: 'Collect flavours and unlock rewards!',
    lemonades: 'Lemonades',
    mission: 'Mission',
    discovered: 'discovered',
    rewardUnlocked: '🎉 REWARD UNLOCKED!',
    showCode: '🎟️ Show code',
    showCodeSimple: 'Show code',
    yourRewards: '🎁 Your rewards',
    rewardSubtitle: 'Active rewards and unlocked bonuses.',
    available: 'AVAILABLE',
    freeTopping: 'Free topping',
    reward3: 'Unlocked after 3 different milkshakes.',
    stillLocked: 'STILL LOCKED',
    secretDessert: 'Secret Dessert',
    discover6: 'Discover 6 Milkshake flavours.',
    collectAll: 'Complete the full 9/9 collection.',
    menuTitle: '☰ Menu',
    tapCategory: 'Tap a category to see the products.',
    milkshakeCount: '9 flavours • 25 zł',
    lemonadeCount: '4 flavours • 18 zł',
    waffles: 'Waffles',
    from10: 'from 10 zł',
    iceCream: 'Ice cream',
    iceCreamPrice: '100 g • 10 zł',
    coffee: 'Coffee',
    onSite: 'on site',
    toUnlock: 'to unlock',
    hereNow: '📍 Here and now',
    hereNowShop: 'Świeże Lody. Here and now.',
    distanceStart: 'Tap to calculate the walking distance.',
    calculateDistance: '📡 Calculate distance',
    guideMe: '🚶 Take me there',
    more: '••• More',
    collectorProgram: 'Świeże Lody collector programme.',
    customerProfile: 'Customer profile',
    howWorks: 'How does the game work?',
    privacy: 'Privacy',
    yourProfile: '👤 Your profile',
    profileSubtitle: 'Customer card and scanning code.',
    collector: 'Świeże Lody Collector',
    showAtOrder: 'Show this code when ordering.',
    flavours: 'flavours',
    reward: 'reward',
    collectionNav: 'Collection',
    rewardsNav: 'Rewards',
    locationNav: 'Location',
    moreNav: 'More',
    yourRewardCode: 'YOUR REWARD CODE',
    rewardCodeHelp: 'Show this screen when ordering. Staff will confirm the reward.',
    chooseTopping: '✨ Choose a topping',
    oneFree: 'One topping free.',
    chosen: 'Selected',
    milkshakeTitle: '🥤 Milkshake',
    lemonadeTitle: '🍋 Lemonades',
    waffleTitle: '🧇 Waffles',
    milkshakeCollection: 'Your Milkshake collection',
    lemonadeCollection: 'Your Lemonade collection',
    vacationCollection: 'Holiday Mission',
    milkshakeHint: '9/9 → Secret Milkshake + Master status',
    lemonadeHint: 'Collect 4 different lemonades',
    vacationHint: 'Complete the mission → reward',
    secretDessertLabel: '🔒 SECRET DESSERT',
    secretLemonadeLabel: '🔒 SECRET LEMONADE',
    missionRewardLabel: '🎁 MISSION REWARD',
    lookingLocation: 'Finding your location…',
    locationDenied: 'Enable location access to calculate the distance.',
    aboutGame: 'Try different flavours. The same flavour does not increase your collection. New flavour = new card.',
    familyText: 'A family will be able to collect together using one shared code.',
    privacyText: 'Customer data is protected by Supabase and RLS.',
    icecreamInfo: 'Ice cream 100 g • 10 zł.',
    coffeeInfo: 'Coffee and Ice Coffee.',
    secretInfo: 'Secret items unlock after completing collections and missions.'
  },

  cs: {
    madeHere: 'Vyrobeno na místě',
    hello: '👋 Ahoj!',
    collectRewards: 'Sbírej příchutě a získávej odměny!',
    lemonades: 'Limonády',
    mission: 'Mise',
    discovered: 'objeveno',
    rewardUnlocked: '🎉 ODMĚNA ODEMČENA!',
    showCode: '🎟️ Ukázat kód',
    showCodeSimple: 'Ukázat kód',
    yourRewards: '🎁 Tvoje odměny',
    rewardSubtitle: 'Aktivní odměny a odemčené bonusy.',
    available: 'DOSTUPNÁ',
    freeTopping: 'Topping zdarma',
    reward3: 'Odemčeno za 3 různé milkshaky.',
    stillLocked: 'STÁLE ZAMČENO',
    secretDessert: 'Tajný dezert',
    discover6: 'Objev 6 příchutí Milkshake.',
    collectAll: 'Dokonči celou kolekci 9/9.',
    menuTitle: '☰ Menu',
    tapCategory: 'Klepni na kategorii a zobraz produkty.',
    milkshakeCount: '9 příchutí • 25 zł',
    lemonadeCount: '4 příchutě • 18 zł',
    waffles: 'Vafle',
    from10: 'od 10 zł',
    iceCream: 'Zmrzlina',
    iceCreamPrice: '100 g • 10 zł',
    coffee: 'Káva',
    onSite: 'na místě',
    toUnlock: 'k odemčení',
    hereNow: '📍 Tady a teď',
    hereNowShop: 'Świeże Lody. Tady a teď.',
    distanceStart: 'Klepni a spočítáme vzdálenost.',
    calculateDistance: '📡 Spočítat vzdálenost',
    guideMe: '🚶 Navigovat',
    more: '••• Více',
    collectorProgram: 'Sběratelský program Świeże Lody.',
    customerProfile: 'Profil zákazníka',
    howWorks: 'Jak hra funguje?',
    privacy: 'Soukromí',
    yourProfile: '👤 Tvůj profil',
    profileSubtitle: 'Zákaznická karta a skenovací kód.',
    collector: 'Sběratel Świeże Lody',
    showAtOrder: 'Ukaž tento kód při objednávce.',
    flavours: 'příchutě',
    reward: 'odměna',
    collectionNav: 'Kolekce',
    rewardsNav: 'Odměny',
    locationNav: 'Poloha',
    moreNav: 'Více',
    yourRewardCode: 'TVŮJ KÓD ODMĚNY',
    rewardCodeHelp: 'Ukaž tuto obrazovku při objednávce. Obsluha odměnu potvrdí.',
    chooseTopping: '✨ Vyber topping',
    oneFree: 'Jeden topping zdarma.',
    chosen: 'Vybráno',
    milkshakeTitle: '🥤 Milkshake',
    lemonadeTitle: '🍋 Limonády',
    waffleTitle: '🧇 Vafle',
    milkshakeCollection: 'Tvoje Milkshake kolekce',
    lemonadeCollection: 'Tvoje kolekce limonád',
    vacationCollection: 'Prázdninová mise',
    milkshakeHint: '9/9 → Secret Milkshake + status Master',
    lemonadeHint: 'Nasbírej 4 různé limonády',
    vacationHint: 'Dokonči misi → odměna',
    secretDessertLabel: '🔒 TAJNÝ DEZERT',
    secretLemonadeLabel: '🔒 TAJNÁ LIMONÁDA',
    missionRewardLabel: '🎁 ODMĚNA ZA MISI',
    lookingLocation: 'Hledám tvoji polohu…',
    locationDenied: 'Povol přístup k poloze pro výpočet vzdálenosti.',
    aboutGame: 'Zkoušej různé příchutě. Stejná příchuť kolekci nezvyšuje. Nová příchuť = nová karta.',
    familyText: 'Rodina bude moci sbírat společně pomocí jednoho kódu.',
    privacyText: 'Údaje zákazníků jsou chráněny pomocí Supabase a RLS.',
    icecreamInfo: 'Zmrzlina 100 g • 10 zł.',
    coffeeInfo: 'Káva a Ice Coffee.',
    secretInfo: 'Tajné položky se odemknou po dokončení kolekcí a misí.'
  }
};

const ITEM_NAMES = {
  pl: {
    LOTUS: 'Lotus Biscoff',
    RAFFAELLO: 'Raffaello',
    KINDER: 'Kinder Bueno',
    OREO: 'Oreo',
    BANANA: 'Banan',
    STRAWBERRY: 'Truskawka',
    CHOCOLATE: 'Czekolada',
    ICE_COFFEE: 'Ice Coffee',
    MANGO: 'Mango',
    LEMON_MINT: 'Cytryna & Mięta',
    MANGO_PASSION: 'Mango & Marakuja',
    BLUE_LAGOON: 'Blue Lagoon',
    ICE_CREAM: 'Lody',
    WAFFLE: 'Gofr',
    MILKSHAKE: 'Milkshake',
    LEMONADE: 'Lemoniada',
    COFFEE: 'Kawa'
  },

  de: {
    LOTUS: 'Lotus Biscoff',
    RAFFAELLO: 'Raffaello',
    KINDER: 'Kinder Bueno',
    OREO: 'Oreo',
    BANANA: 'Banane',
    STRAWBERRY: 'Erdbeere',
    CHOCOLATE: 'Schokolade',
    ICE_COFFEE: 'Eiskaffee',
    MANGO: 'Mango',
    LEMON_MINT: 'Zitrone & Minze',
    MANGO_PASSION: 'Mango & Passionsfrucht',
    BLUE_LAGOON: 'Blue Lagoon',
    ICE_CREAM: 'Eis',
    WAFFLE: 'Waffel',
    MILKSHAKE: 'Milkshake',
    LEMONADE: 'Limonade',
    COFFEE: 'Kaffee'
  },

  en: {
    LOTUS: 'Lotus Biscoff',
    RAFFAELLO: 'Raffaello',
    KINDER: 'Kinder Bueno',
    OREO: 'Oreo',
    BANANA: 'Banana',
    STRAWBERRY: 'Strawberry',
    CHOCOLATE: 'Chocolate',
    ICE_COFFEE: 'Ice Coffee',
    MANGO: 'Mango',
    LEMON_MINT: 'Lemon & Mint',
    MANGO_PASSION: 'Mango & Passion Fruit',
    BLUE_LAGOON: 'Blue Lagoon',
    ICE_CREAM: 'Ice Cream',
    WAFFLE: 'Waffle',
    MILKSHAKE: 'Milkshake',
    LEMONADE: 'Lemonade',
    COFFEE: 'Coffee'
  },

  cs: {
    LOTUS: 'Lotus Biscoff',
    RAFFAELLO: 'Raffaello',
    KINDER: 'Kinder Bueno',
    OREO: 'Oreo',
    BANANA: 'Banán',
    STRAWBERRY: 'Jahoda',
    CHOCOLATE: 'Čokoláda',
    ICE_COFFEE: 'Ledová káva',
    MANGO: 'Mango',
    LEMON_MINT: 'Citron & Máta',
    MANGO_PASSION: 'Mango & Marakuja',
    BLUE_LAGOON: 'Blue Lagoon',
    ICE_CREAM: 'Zmrzlina',
    WAFFLE: 'Vafle',
    MILKSHAKE: 'Milkshake',
    LEMONADE: 'Limonáda',
    COFFEE: 'Káva'
  }
};

const IMAGE_MAP = {
  MILKSHAKE: {
    MANGO: 'mango_real',
    LOTUS: 'lotus_real',
    OREO: 'oreo_real',
    RAFFAELLO: 'raffaello_real',
    KINDER: 'kinder_real',
    BANANA: 'banana_real',
    STRAWBERRY: 'strawberry_real',
    CHOCOLATE: 'chocolate',
    ICE_COFFEE: 'ice_coffee_real'
  },

  LEMONADE: {
    LEMON_MINT: 'lemonade_lemon_mint',
    STRAWBERRY: 'lemonade_strawberry',
    MANGO_PASSION: 'lemonade_mango',
    BLUE_LAGOON: 'lemonade_blue'
  }
};

const UNLOCKED_DEMO = {
  MILKSHAKE: new Set(['MANGO', 'LOTUS', 'OREO']),
  LEMONADE: new Set(['LEMON_MINT']),
  VACATION: new Set(['ICE_CREAM'])
};

function tr(key) {
  return T[currentLang]?.[key] || T.pl[key] || key;
}

function applyTranslations() {
  document.documentElement.lang = currentLang === 'cs' ? 'cs' : currentLang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;

    if (T[currentLang]?.[key]) {
      el.textContent = T[currentLang][key];
    }
  });

  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.classList.toggle(
      'active',
      btn.dataset.lang === currentLang
    );
  });

  renderToppings();

  if (DATA[currentCollection]) {
    renderCollection(currentCollection);
  }
}

document.querySelectorAll('[data-lang]').forEach(btn => {
  btn.onclick = () => {
    currentLang = btn.dataset.lang;
    localStorage.setItem('swiezeLanguage', currentLang);
    applyTranslations();
  };
});

async function loadCatalog() {
  const { data: collections, error: collectionsError } =
    await sb
      .from('collections')
      .select('id,code,name,icon,sort_order')
      .eq('active', true)
      .order('sort_order');

  if (collectionsError) {
    console.error('Collections load error:', collectionsError);
    return;
  }

  const { data: items, error: itemsError } =
    await sb
      .from('collection_items')
      .select('id,collection_id,code,name,icon,sort_order')
      .eq('active', true)
      .order('sort_order');

  if (itemsError) {
    console.error('Items load error:', itemsError);
    return;
  }

  DATA = {};

  collections.forEach(collection => {
    DATA[collection.code] = {
      id: collection.id,
      code: collection.code,
      icon: collection.icon,

      items: items
        .filter(item => item.collection_id === collection.id)
        .map(item => ({
          code: item.code,
          name: item.name,
          icon: item.icon,
          image: IMAGE_MAP[collection.code]?.[item.code] || null,
          unlocked:
            UNLOCKED_DEMO[collection.code]?.has(item.code) || false
        }))
    };
  });

  applyTranslations();
  renderCollection('MILKSHAKE');
}

function collectionTitle(code) {
  if (code === 'MILKSHAKE') return tr('milkshakeCollection');
  if (code === 'LEMONADE') return tr('lemonadeCollection');
  return tr('vacationCollection');
}

function itemName(item) {
  return ITEM_NAMES[currentLang]?.[item.code] || item.name;
}

function renderCollection(code) {
  const d = DATA[code];
  if (!d) return;

  currentCollection = code;

  const cards = document.querySelector('#cards');

  document.querySelector('#collectionTitle').textContent =
    collectionTitle(code);

  document.querySelector('#collectionIcon').textContent =
    d.icon || '🍦';

  document.querySelectorAll('.chip').forEach(c => {
    c.classList.toggle(
      'active',
      c.dataset.collection === code
    );
  });

  cards.innerHTML = '';

  d.items.forEach(item => {
    const e = document.createElement('article');

    e.className =
      'card ' +
      (item.unlocked ? 'unlocked' : 'locked') +
      (item.image ? '' : ' placeholder');

    if (item.image) {
      e.innerHTML =
        `<img src="${item.image}.jpg" alt="${itemName(item)}">`;
    } else {
      e.innerHTML =
        `<div>${item.icon || '🍦'}</div>`;
    }

    e.innerHTML += `
      <div class="badge">
        ${item.unlocked ? '✓' : '🔒'}
      </div>
      <div class="name">
        ${itemName(item)}
      </div>
    `;

    cards.appendChild(e);
  });

  const n = d.items.filter(item => item.unlocked).length;
  const total = d.items.length;

  document.querySelector('#now').textContent = n;
  document.querySelector('#total').textContent = total;

  document.querySelector('#bar').style.width =
    total ? (n / total * 100) + '%' : '0%';

  document.querySelector('#rewardCard').classList.toggle(
    'hidden',
    code !== 'MILKSHAKE' || n < 3
  );

  if (code === 'VACATION') {
    document.querySelector('#secretLabel').textContent =
      tr('missionRewardLabel');

    document.querySelector('#secret').textContent =
      'LODY 100 g';

    document.querySelector('#hint').textContent =
      tr('vacationHint');

  } else if (code === 'LEMONADE') {
    document.querySelector('#secretLabel').textContent =
      tr('secretLemonadeLabel');

    document.querySelector('#secret').textContent =
      '???';

    document.querySelector('#hint').textContent =
      tr('lemonadeHint');

  } else {
    document.querySelector('#secretLabel').textContent =
      tr('secretDessertLabel');

    document.querySelector('#secret').textContent =
      n >= 9 ? 'MILKSHAKE MASTER' : '???';

    document.querySelector('#hint').textContent =
      tr('milkshakeHint');
  }

  const dots = document.querySelector('#dots');
  dots.innerHTML = '';

  for (let i = 0; i < total; i++) {
    const s = document.createElement('span');
    s.className = 'dot ' + (i < n ? 'on' : '');
    dots.appendChild(s);
  }
}

function showPage(n) {
  document.querySelectorAll('.page').forEach(
    p => p.classList.remove('active')
  );

  document.querySelector('#page-' + n).classList.add('active');

  document.querySelectorAll('nav button').forEach(
    b => b.classList.toggle(
      'on',
      b.dataset.page === n
    )
  );

  scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

document.querySelectorAll('[data-page]').forEach(
  b => b.onclick = () => showPage(b.dataset.page)
);

document.querySelectorAll('.chip').forEach(
  c => c.onclick = () =>
    renderCollection(c.dataset.collection)
);

const dlg = document.querySelector('#dlg');
const topDlg = document.querySelector('#toppingDlg');

document.querySelector('#code').onclick =
  () => topDlg.showModal();

document.querySelector('#rewardShowCode').onclick =
  () => topDlg.showModal();

document.querySelector('#x').onclick =
  () => dlg.close();

document.querySelector('#topX').onclick =
  () => topDlg.close();

const TOPPING_KEYS = [
  ['🍫', 'Czekolada', 'Schokolade', 'Chocolate', 'Čokoláda'],
  ['🍮', 'Toffi', 'Toffee', 'Toffee', 'Toffee'],
  ['🍓', 'Owocowy', 'Frucht', 'Fruit', 'Ovocný'],
  ['🍪', 'Oreo', 'Oreo', 'Oreo', 'Oreo'],
  ['🍪', 'Lotus', 'Lotus', 'Lotus', 'Lotus'],
  ['🥥', 'Kokos', 'Kokos', 'Coconut', 'Kokos'],
  ['🌈', 'Posypka', 'Streusel', 'Sprinkles', 'Posypka'],
  ['☁️', 'Marshmallow', 'Marshmallow', 'Marshmallow', 'Marshmallow']
];

function toppingName(row) {
  const index = {
    pl: 1,
    de: 2,
    en: 3,
    cs: 4
  }[currentLang] || 1;

  return `${row[0]} ${row[index]}`;
}

function renderToppings() {
  const grid = document.querySelector('#toppingGrid');

  grid.innerHTML =
    TOPPING_KEYS
      .map(row => `<button>${toppingName(row)}</button>`)
      .join('');

  grid.querySelectorAll('button').forEach(
    b => b.onclick = () => {
      document.querySelector('#chosenTopping').textContent =
        `${tr('chosen')}: ${b.textContent}`;

      document.querySelector('#confirmTopping').disabled = false;
    }
  );
}

document.querySelector('#confirmTopping').onclick = () => {
  topDlg.close();
  dlg.showModal();
};

const MENU = {
  milkshake: [
    ['Mango', 'mango_real.jpg', '25 zł'],
    ['Lotus', 'lotus_real.jpg', '25 zł'],
    ['Oreo', 'oreo_real.jpg', '25 zł'],
    ['Raffaello', 'raffaello_real.jpg', '25 zł'],
    ['Kinder Bueno', 'kinder_real.jpg', '25 zł'],
    ['Banana', 'banana_real.jpg', '25 zł'],
    ['Strawberry', 'strawberry_real.jpg', '25 zł'],
    ['Chocolate', 'chocolate.jpg', '25 zł'],
    ['Ice Coffee', 'ice_coffee_real.jpg', '25 zł']
  ],

  lemonade: [
    ['Blue Lagoon', 'lemonade_blue.jpg', '18 zł'],
    ['Strawberry', 'lemonade_strawberry.jpg', '18 zł'],
    ['Lemon & Mint', 'lemonade_lemon_mint.jpg', '18 zł'],
    ['Mango & Passion', 'lemonade_mango.jpg', '18 zł']
  ],

  waffle: [
    ['Frużelina + śmietana', 'waffle_cherry.jpg', '25 zł'],
    ['Owoce + Nutella', 'waffle_fruit_nutella.jpg', ''],
    ['Śmietana + sos', 'waffle_cream_sauce.jpg', '20 zł'],
    ['Śmietana', 'waffle_cream.jpg', '17 zł'],
    ['Owoce + śmietana', 'waffle_fruit_cream.jpg', '24 zł'],
    ['Owoce', 'waffle_fruit.jpg', '17 zł'],
    ['Owoce + śmietana', 'waffle_berries_cream.jpg', '24 zł'],
    ['Posypka + marshmallow', 'waffle_candy.jpg', '']
  ]
};

function openMenu(k, title) {
  document.querySelector('#menuTitle').textContent = title;

  document.querySelector('#menuItems').innerHTML =
    (MENU[k] || [])
      .map(
        x => `
          <article class="food">
            <img src="${x[1]}" alt="${x[0]}">
            <div>
              <b>${x[0]}</b>
              <span>${x[2]}</span>
            </div>
          </article>
        `
      )
      .join('');

  document.querySelector('#menuDlg').showModal();
}

document.querySelectorAll('[data-menu]').forEach(
  b => b.onclick = () => {
    const key = b.dataset.titleKey;

    openMenu(
      b.dataset.menu,
      tr(key)
    );
  }
);

document.querySelector('#menuX').onclick =
  () => document.querySelector('#menuDlg').close();

const info = document.querySelector('#infoDlg');

function openInfo(title, text) {
  document.querySelector('#infoTitle').textContent = title;
  document.querySelector('#infoText').textContent = text;
  info.showModal();
}

document.querySelector('#infoX').onclick =
  () => info.close();

document.querySelector('#howItWorks').onclick =
  () =>
    openInfo(
      '🎮 ' + tr('howWorks'),
      tr('aboutGame')
    );

document.querySelector('#familyPass').onclick =
  () =>
    openInfo(
      '👨‍👩‍👧 Family Pass',
      tr('familyText')
    );

document.querySelector('#privacy').onclick =
  () =>
    openInfo(
      '🔐 ' + tr('privacy'),
      tr('privacyText')
    );

document.querySelectorAll('[data-info]').forEach(btn => {
  btn.onclick = () => {
    if (btn.dataset.info === 'icecream') {
      openInfo(
        '🍦 ' + tr('iceCream'),
        tr('icecreamInfo')
      );
    }

    if (btn.dataset.info === 'coffee') {
      openInfo(
        '☕ ' + tr('coffee'),
        tr('coffeeInfo')
      );
    }

    if (btn.dataset.info === 'secret') {
      openInfo(
        '🔒 Secret Menu',
        tr('secretInfo')
      );
    }
  };
});

const DEST = {
  lat: 53.91835,
  lon: 14.2442
};

function hav(a, b, c, d) {
  const R = 6371e3;
  const p = x => x * Math.PI / 180;

  const q1 = p(a);
  const q2 = p(c);
  const dq = p(c - a);
  const dl = p(d - b);

  const h =
    Math.sin(dq / 2) ** 2 +
    Math.cos(q1) *
    Math.cos(q2) *
    Math.sin(dl / 2) ** 2;

  return 2 * R * Math.asin(Math.sqrt(h));
}

document.querySelector('#locate').onclick = () => {
  const status =
    document.querySelector('#distanceStatus');

  status.textContent = tr('lookingLocation');

  navigator.geolocation.getCurrentPosition(
    p => {
      const m = hav(
        p.coords.latitude,
        p.coords.longitude,
        DEST.lat,
        DEST.lon
      );

      const distance =
        m < 1000
          ? `${Math.round(m)} m`
          : `${(m / 1000).toFixed(1)} km`;

      status.innerHTML =
        `<b>${distance}</b>`;

      document.querySelector('#walkbar').style.width =
        Math.max(
          8,
          Math.min(
            100,
            100 - (m / 3000 * 100)
          )
        ) + '%';
    },

    () => {
      status.textContent =
        tr('locationDenied');
    }
  );
};

applyTranslations();
loadCatalog();

if ('serviceWorker' in navigator) {
  addEventListener(
    'load',
    () =>
      navigator.serviceWorker.register('sw.js')
  );
}
