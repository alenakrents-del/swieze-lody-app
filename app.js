const sb = window.supabase.createClient(
  window.APP_CONFIG.supabaseUrl,
  window.APP_CONFIG.supabaseAnonKey
);

let currentLang = localStorage.getItem('swiezeLanguage') || 'pl';
let currentCollection = 'MILKSHAKE';
let DATA = {};

/* =========================================================
   TRANSLATIONS
========================================================= */

const T = {
  pl: {
    madeHere: 'Robione na miejscu',
    hello: '👋 Cześć!',
    collectRewards: 'Zbieraj smaki i odbieraj nagrody!',
    lemonades: 'Lemoniady',
    mission: 'Misja',
    discovered: 'odkrytych',
    rewardUnlocked: '🎉 NAGRODA ODBLOKOWANA!',
    freeTopping: 'Darmowy topping',
    freeToppingDesc: 'Wybierz 1 z 8 toppingów gratis.',
    showCode: '🎟️ Pokaż kod',
    showCodeSimple: 'Pokaż kod',
    yourRewards: '🎁 Twoje nagrody',
    rewardSubtitle: 'Aktywne nagrody i odblokowane bonusy.',
    available: 'DOSTĘPNA',
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
    secretLemonadeLabel: '🔒 SEKRETNA LEMONIADA',
    missionRewardLabel: '🎁 NAGRODA MISJI',
    lookingLocation: 'Szukam Twojej lokalizacji…',
    locationDenied: 'Włącz dostęp do lokalizacji, aby policzyć odległość.',
    aboutGame: 'Próbuj różnych smaków. Ten sam smak nie zwiększa kolekcji. Nowy smak = nowa karta.',
    familyText: 'Rodzina będzie mogła zbierać wspólną kolekcję jednym kodem.',
    privacyText: 'Dane klienta są chronione.',
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
    freeTopping: 'Kostenloses Topping',
    freeToppingDesc: 'Wähle 1 von 8 Toppings kostenlos.',
    showCode: '🎟️ Code zeigen',
    showCodeSimple: 'Code zeigen',
    yourRewards: '🎁 Deine Belohnungen',
    rewardSubtitle: 'Aktive Belohnungen und freigeschaltete Boni.',
    available: 'VERFÜGBAR',
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
    familyText: 'Eine Familie kann gemeinsam mit einem Code sammeln.',
    privacyText: 'Kundendaten werden geschützt.',
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
    freeTopping: 'Free topping',
    freeToppingDesc: 'Choose 1 of 8 toppings for free.',
    showCode: '🎟️ Show code',
    showCodeSimple: 'Show code',
    yourRewards: '🎁 Your rewards',
    rewardSubtitle: 'Active rewards and unlocked bonuses.',
    available: 'AVAILABLE',
    reward3: 'Unlocked after 3 different milkshakes.',
    stillLocked: 'STILL LOCKED',
    secretDessert: 'Secret Dessert',
    discover6: 'Discover 6 Milkshake flavours.',
    collectAll: 'Complete the full collection 9/9.',
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
    privacyText: 'Customer data is protected.',
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
    freeTopping: 'Topping zdarma',
    freeToppingDesc: 'Vyber si 1 z 8 toppingů zdarma.',
    showCode: '🎟️ Ukázat kód',
    showCodeSimple: 'Ukázat kód',
    yourRewards: '🎁 Tvoje odměny',
    rewardSubtitle: 'Aktivní odměny a odemčené bonusy.',
    available: 'DOSTUPNÁ',
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
    privacyText: 'Údaje zákazníků jsou chráněny.',
    icecreamInfo: 'Zmrzlina 100 g • 10 zł.',
    coffeeInfo: 'Káva a Ice Coffee.',
    secretInfo: 'Tajné položky se odemknou po dokončení kolekcí a misí.'
  }
};

/* =========================================================
   ITEM NAMES
========================================================= */

const ITEM_NAMES = {
  pl: {
    LOTUS: 'Lotus Biscoff', RAFFAELLO: 'Raffaello', KINDER: 'Kinder Bueno',
    OREO: 'Oreo', BANANA: 'Banan', STRAWBERRY: 'Truskawka',
    CHOCOLATE: 'Czekolada', ICE_COFFEE: 'Ice Coffee', MANGO: 'Mango',
    LEMON_MINT: 'Cytryna & Mięta', MANGO_PASSION: 'Mango & Marakuja',
    BLUE_LAGOON: 'Blue Lagoon', ICE_CREAM: 'Lody', WAFFLE: 'Gofr',
    MILKSHAKE: 'Milkshake', LEMONADE: 'Lemoniada', COFFEE: 'Kawa'
  },
  de: {
    LOTUS: 'Lotus Biscoff', RAFFAELLO: 'Raffaello', KINDER: 'Kinder Bueno',
    OREO: 'Oreo', BANANA: 'Banane', STRAWBERRY: 'Erdbeere',
    CHOCOLATE: 'Schokolade', ICE_COFFEE: 'Eiskaffee', MANGO: 'Mango',
    LEMON_MINT: 'Zitrone & Minze', MANGO_PASSION: 'Mango & Passionsfrucht',
    BLUE_LAGOON: 'Blue Lagoon', ICE_CREAM: 'Eis', WAFFLE: 'Waffel',
    MILKSHAKE: 'Milkshake', LEMONADE: 'Limonade', COFFEE: 'Kaffee'
  },
  en: {
    LOTUS: 'Lotus Biscoff', RAFFAELLO: 'Raffaello', KINDER: 'Kinder Bueno',
    OREO: 'Oreo', BANANA: 'Banana', STRAWBERRY: 'Strawberry',
    CHOCOLATE: 'Chocolate', ICE_COFFEE: 'Ice Coffee', MANGO: 'Mango',
    LEMON_MINT: 'Lemon & Mint', MANGO_PASSION: 'Mango & Passion Fruit',
    BLUE_LAGOON: 'Blue Lagoon', ICE_CREAM: 'Ice Cream', WAFFLE: 'Waffle',
    MILKSHAKE: 'Milkshake', LEMONADE: 'Lemonade', COFFEE: 'Coffee'
  },
  cs: {
    LOTUS: 'Lotus Biscoff', RAFFAELLO: 'Raffaello', KINDER: 'Kinder Bueno',
    OREO: 'Oreo', BANANA: 'Banán', STRAWBERRY: 'Jahoda',
    CHOCOLATE: 'Čokoláda', ICE_COFFEE: 'Ledová káva', MANGO: 'Mango',
    LEMON_MINT: 'Citron & Máta', MANGO_PASSION: 'Mango & Marakuja',
    BLUE_LAGOON: 'Blue Lagoon', ICE_CREAM: 'Zmrzlina', WAFFLE: 'Vafle',
    MILKSHAKE: 'Milkshake', LEMONADE: 'Limonáda', COFFEE: 'Káva'
  }
};

/* =========================================================
   COLLECTION IMAGES
========================================================= */

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

const UNLOCKED_ACCOUNT = {
  MILKSHAKE: new Set(),
  LEMONADE: new Set(),
  VACATION: new Set()
};

async function loadMyCollectionItems() {
  UNLOCKED_ACCOUNT.MILKSHAKE.clear();
  UNLOCKED_ACCOUNT.LEMONADE.clear();
  UNLOCKED_ACCOUNT.VACATION.clear();

  const {
    data: { session }
  } = await sb.auth.getSession();

  if (!session) {
    return;
  }

  const { data, error } =
    await sb.rpc('get_my_collection_items');

  if (error) {
    console.error(
      'Collection account load error:',
      error
    );
    return;
  }

  (data || []).forEach(row => {
    const collection =
      UNLOCKED_ACCOUNT[row.collection_code];

    if (collection) {
      collection.add(row.item_code);
    }
  });
}

function tr(key) {
  return T[currentLang]?.[key] || T.pl[key] || key;
}

function collectionTitle(code) {
  if (code === 'MILKSHAKE') return tr('milkshakeCollection');
  if (code === 'LEMONADE') return tr('lemonadeCollection');
  return tr('vacationCollection');
}

function itemName(item) {
  return ITEM_NAMES[currentLang]?.[item.code] || item.name;
}

function updateSecretText() {
  const label = document.querySelector('#secretLabel');
  const secret = document.querySelector('#secret');
  const hint = document.querySelector('#hint');
  if (!label || !secret || !hint) return;

  if (currentCollection === 'MILKSHAKE') {
    label.textContent = tr('secretDessertLabel');
    hint.textContent = tr('milkshakeHint');
  } else if (currentCollection === 'LEMONADE') {
    label.textContent = tr('secretLemonadeLabel');
    secret.textContent = '???';
    hint.textContent = tr('lemonadeHint');
  } else if (currentCollection === 'VACATION') {
    label.textContent = tr('missionRewardLabel');
    secret.textContent = 'LODY 100 g';
    hint.textContent = tr('vacationHint');
  }
}

function applyTranslations() {
  document.documentElement.lang = currentLang === 'cs' ? 'cs' : currentLang;

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (T[currentLang]?.[key]) el.textContent = T[currentLang][key];
  });

  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === currentLang);
  });

  const title = document.querySelector('#collectionTitle');
  if (title) title.textContent = collectionTitle(currentCollection);

  updateSecretText();

  const rewardTitle = document.querySelector('#rewardTitle');
  if (rewardTitle) rewardTitle.textContent = tr('freeTopping');

  const rewardDesc = document.querySelector('#rewardDesc');
  if (rewardDesc) rewardDesc.textContent = tr('freeToppingDesc');

  renderToppings();

  if (DATA[currentCollection]) renderCollection(currentCollection);
}

document.querySelectorAll('[data-lang]').forEach(btn => {
  btn.onclick = () => {
    currentLang = btn.dataset.lang;
    localStorage.setItem('swiezeLanguage', currentLang);
    applyTranslations();
  };
});

/* =========================================================
   LOAD CATALOG
========================================================= */
function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}
async function openIceCreamMenu() {
  const menuTitle = document.querySelector('#menuTitle');
  const menuItems = document.querySelector('#menuItems');
function safeImageUrl(value) {
  try {
    const url = new URL(String(value || ''), window.location.origin);
    return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
  } catch {
    return '';
  }
}  if (!menuTitle || !menuItems) return;

  const words = {
    pl: {
      loading: 'Ładowanie smaków…',
      empty: 'DZISIAJ BRAK SMAKÓW',
      emptyText: 'Sprawdź ponownie trochę później.',
      add: '➕ Dodaj',
      favourite: '🤍 Ulubione',
      favouriteOn: '❤️ Ulubione',
      addedFavourite: 'Dodano do ulubionych ❤️',
      removedFavourite: 'Usunięto z ulubionych',
      package: 'Opakowanie wybierzesz przy odbiorze: wafelek lub pudełko.'
    },

    de: {
      loading: 'Sorten werden geladen…',
      empty: 'HEUTE KEINE SORTEN',
      emptyText: 'Schau später noch einmal vorbei.',
      add: '➕ Hinzufügen',
      favourite: '🤍 Favorit',
      favouriteOn: '❤️ Favorit',
      addedFavourite: 'Zu Favoriten hinzugefügt ❤️',
      removedFavourite: 'Aus Favoriten entfernt',
      package: 'Die Verpackung wählst du bei der Abholung: Waffel oder Becher.'
    },

    en: {
      loading: 'Loading flavours…',
      empty: 'NO FLAVOURS TODAY',
      emptyText: 'Check again a little later.',
      add: '➕ Add',
      favourite: '🤍 Favourite',
      favouriteOn: '❤️ Favourite',
      addedFavourite: 'Added to favourites ❤️',
      removedFavourite: 'Removed from favourites',
      package: 'Choose the packaging at pickup: cone or cup.'
    },

    cs: {
      loading: 'Načítání příchutí…',
      empty: 'DNES NEJSOU PŘÍCHUTĚ',
      emptyText: 'Zkuste to prosím později.',
      add: '➕ Přidat',
      favourite: '🤍 Oblíbené',
      favouriteOn: '❤️ Oblíbené',
      addedFavourite: 'Přidáno do oblíbených ❤️',
      removedFavourite: 'Odebráno z oblíbených',
      package: 'Obal si vyberete při vyzvednutí: kornout nebo kelímek.'
    }
  };

  const w = words[currentLang] || words.pl;
let favouriteIds = new Set();

async function loadAccountFavourites() {
  favouriteIds = new Set();

  const {
    data: { session }
  } = await sb.auth.getSession();

  if (!session) return;

  const { data, error } = await sb.rpc(
    'get_my_ice_cream_favourites'
  );

  if (error) {
    console.error('Favourites load error:', error);
    return;
  }

  favouriteIds = new Set(
    (data || []).map(item => String(item.flavour_id))
  );
}

function isFavourite(id) {
  return favouriteIds.has(String(id));
}
  menuTitle.textContent = '🍦 ' + tr('iceCream');

  menuItems.innerHTML = `
    <div style="
      text-align:center;
      padding:24px;
      color:#777;
    ">
      ${w.loading}
    </div>
  `;

  document.querySelector('#menuDlg')?.showModal();

const { data, error } = await sb.rpc(
    'get_today_ice_cream_flavours'
  );

  if (error) {
    console.error(error);

    menuItems.innerHTML = `
      <div style="text-align:center;padding:24px;">
        Nie udało się pobrać smaków.
      </div>
    `;

    return;
  }

  const flavours = Array.isArray(data) ? data : [];

  if (!flavours.length) {
    menuItems.innerHTML = `
      <div style="
        text-align:center;
        padding:26px 10px;
      ">
        <div style="font-size:52px;">🍦</div>

        <b style="
          display:block;
          font-family:'Bangers', Impact, sans-serif;
          font-size:28px;
          margin-top:8px;
        ">
          ${w.empty}
        </b>

        <div style="
          color:#777;
          margin-top:8px;
        ">
          ${w.emptyText}
        </div>
      </div>
    `;

    return;
  }
await loadAccountFavourites();
  menuItems.innerHTML = flavours.map(flavour => {
    const price = Number(flavour.price || 10);

    const favourite = isFavourite(flavour.id);

    const picture = flavour.image_url
      ? `
        <img
          src="${escapeHtml(flavour.image_url)}"
         alt="${escapeHtml(flavour.name)}"
        >
      `
      : `
        <div style="
          min-width:90px;
          width:90px;
          height:90px;
          display:flex;
          align-items:center;
          justify-content:center;
          font-size:46px;
          border-radius:14px;
          background:#fff1b8;
        ">
          🍦
        </div>
      `;

    const baseIcon =
      String(flavour.base_label || '')
        .toLowerCase()
        .includes('jogur')
          ? '🥣'
          : '🥛';

    return `
      <article
        class="food sl-ice-client"
      data-flavour-id="${flavour.id}"
        style="
          position:relative;
          align-items:flex-start;
          padding-bottom:14px;
        "
      >
        ${picture}

        <div style="
          flex:1;
          padding:8px 8px 0 0;
        ">

          <b style="
            font-family:'Bangers', Impact, sans-serif;
            font-size:25px;
            letter-spacing:.6px;
          ">
            ${escapeHtml(flavour.name)}
          </b>

          ${
            flavour.badge
              ? `
                <div style="
                  display:table;
                  background:#111;
                  color:#fff;
                  border-radius:999px;
                  padding:4px 8px;
                  font-size:11px;
                  font-weight:900;
                  margin:5px 0;
                ">
                  ${escapeHtml(flavour.badge)}
                </div>
              `
              : ''
          }

          ${
            flavour.base_label
              ? `
                <div style="
                  font-size:13px;
                  font-weight:800;
                  margin-top:4px;
                ">
                  ${baseIcon} ${escapeHtml(flavour.base_label)}
                </div>
              `
              : ''
          }

          ${
            flavour.description
              ? `
                <div style="
                  font-size:13px;
                  color:#666;
                  line-height:1.35;
                  margin-top:5px;
                ">
                  ${escapeHtml(flavour.description)}
                </div>
              `
              : ''
          }

          <div style="
            font-size:18px;
            font-weight:900;
            margin-top:9px;
          ">
            ${price} zł / porcja
          </div>

          <div style="
            font-size:12px;
            color:#777;
            margin-top:5px;
          ">
            ${w.package}
          </div>

          <div style="
            display:grid;
            grid-template-columns:1fr 1fr;
            gap:8px;
            margin-top:12px;
          ">

            <button
              type="button"
              class="sl-ice-favourite"
              data-id="${flavour.id}"
              style="
                min-height:46px;
                border:2px solid ${favourite ? '#e94b72' : '#ddd'};
                border-radius:12px;
                background:${favourite ? '#fff0f4' : '#fff'};
                font-weight:900;
                cursor:pointer;
              "
            >
              ${favourite ? w.favouriteOn : w.favourite}
            </button>

            <button
              type="button"
              class="sl-ice-add"
              data-id="${flavour.id}"
              style="
                min-height:46px;
                border:0;
                border-radius:12px;
                background:#ffc728;
                color:#111;
                font-weight:900;
                cursor:pointer;
              "
            >
              ${w.add}
            </button>

          </div>

        </div>
      </article>
    `;
  }).join('');

  menuItems
    .querySelectorAll('.sl-ice-add')
    .forEach(button => {

      button.onclick = event => {
        event.preventDefault();
        event.stopPropagation();

        const flavour = flavours.find(
          item => String(item.id) === String(button.dataset.id)
        );

        if (!flavour) return;

        if (typeof window.addIceCreamToCart === 'function') {
          window.addIceCreamToCart(flavour);
        } else {
          console.error('addIceCreamToCart is not available');
        }
      };
    });

    menuItems
    .querySelectorAll('.sl-ice-favourite')
    .forEach(button => {

      button.onclick = async event => {
        event.preventDefault();
        event.stopPropagation();

        const id = String(button.dataset.id);

        const session = await window.customerAuth?.getSession?.();

        if (!session) {
          alert('Zaloguj się, aby zapisać ulubione smaki.');
          return;
        }

        button.disabled = true;

        const { data, error } = await sb.rpc(
          'toggle_my_ice_cream_favourite',
          {
            p_flavour_id: id
          }
        );

        button.disabled = false;

        if (error) {
          console.error('Favourite error:', error);
          alert('Nie udało się zapisać ulubionego smaku.');
          return;
        }

        const isNowFavourite = data === true;

        button.textContent =
          isNowFavourite ? w.favouriteOn : w.favourite;

        button.style.background =
          isNowFavourite ? '#fff0f4' : '#fff';

        button.style.borderColor =
          isNowFavourite ? '#e94b72' : '#ddd';
      };
    });
}

async function loadCatalog() 
{  
  const { data: collections, error: collectionsError } = await sb
    .from('collections')
    .select('id,code,name,icon,sort_order')
    .eq('active', true)
    .order('sort_order');

  if (collectionsError) {
    console.error('Collections load error:', collectionsError);
    return;
  }

  const { data: items, error: itemsError } = await sb
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
          unlocked: UNLOCKED_DEMO[collection.code]?.has(item.code) || false
        }))
    };
  });

  renderCollection('MILKSHAKE');
  applyTranslations();
}

function renderCollection(code) {
  const d = DATA[code];
  currentCollection = code;

  const title = document.querySelector('#collectionTitle');
  if (title) title.textContent = collectionTitle(code);

  document.querySelectorAll('.chip').forEach(c => {
    c.classList.toggle('active', c.dataset.collection === code);
  });

  updateSecretText();
  if (!d) return;

  const cards = document.querySelector('#cards');
  const icon = document.querySelector('#collectionIcon');

  if (icon) icon.textContent = d.icon || '🍦';
  if (!cards) return;

  cards.innerHTML = '';

  d.items.forEach(item => {
    const e = document.createElement('article');
    e.className =
      'card ' +
      (item.unlocked ? 'unlocked' : 'locked') +
      (item.image ? '' : ' placeholder');

    e.innerHTML = item.image
      ? `<img src="${item.image}.jpg" alt="${itemName(item)}">`
      : `<div>${item.icon || '🍦'}</div>`;

    e.innerHTML += `
      <div class="badge">${item.unlocked ? '✓' : '🔒'}</div>
      <div class="name">${itemName(item)}</div>
    `;

    cards.appendChild(e);
  });

  const n = d.items.filter(item => item.unlocked).length;
  const total = d.items.length;

  const now = document.querySelector('#now');
  const totalEl = document.querySelector('#total');
  const bar = document.querySelector('#bar');
  const rewardCard = document.querySelector('#rewardCard');
  const secret = document.querySelector('#secret');
  const dots = document.querySelector('#dots');

  if (now) now.textContent = n;
  if (totalEl) totalEl.textContent = total;
  if (bar) bar.style.width = total ? `${(n / total) * 100}%` : '0%';

  if (rewardCard) {
    rewardCard.classList.toggle('hidden', code !== 'MILKSHAKE' || n < 3);
  }

  if (code === 'MILKSHAKE' && secret) {
    secret.textContent = n >= 9 ? 'MILKSHAKE MASTER' : '???';
  }

  updateSecretText();

  if (dots) {
    dots.innerHTML = '';
    for (let i = 0; i < total; i++) {
      const s = document.createElement('span');
      s.className = 'dot ' + (i < n ? 'on' : '');
      dots.appendChild(s);
    }
  }
}

document.querySelectorAll('.chip').forEach(c => {
  c.onclick = () => renderCollection(c.dataset.collection);
});

/* =========================================================
   PAGES
========================================================= */

function showPage(n) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const page = document.querySelector('#page-' + n);
  if (page) page.classList.add('active');

  document.querySelectorAll('nav button').forEach(b => {
    b.classList.toggle('on', b.dataset.page === n);
  });

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('[data-page]').forEach(b => {
  b.onclick = () => showPage(b.dataset.page);
});

/* =========================================================
   REWARDS + TOPPINGS
========================================================= */

const dlg = document.querySelector('#dlg');
const topDlg = document.querySelector('#toppingDlg');

const codeBtn = document.querySelector('#code');
if (codeBtn) codeBtn.onclick = () => topDlg?.showModal();

const rewardShowCode = document.querySelector('#rewardShowCode');
if (rewardShowCode) rewardShowCode.onclick = () => topDlg?.showModal();

const xBtn = document.querySelector('#x');
if (xBtn) xBtn.onclick = () => dlg?.close();

const topX = document.querySelector('#topX');
if (topX) topX.onclick = () => topDlg?.close();

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
  const index = { pl: 1, de: 2, en: 3, cs: 4 }[currentLang] || 1;
  return row[0] + ' ' + row[index];
}

function renderToppings() {
  const grid = document.querySelector('#toppingGrid');
  if (!grid) return;

  grid.innerHTML = TOPPING_KEYS
    .map(row => `<button>${toppingName(row)}</button>`)
    .join('');

  grid.querySelectorAll('button').forEach(b => {
    b.onclick = () => {
      const chosen = document.querySelector('#chosenTopping');
      if (chosen) chosen.textContent = tr('chosen') + ': ' + b.textContent;

      const confirm = document.querySelector('#confirmTopping');
      if (confirm) confirm.disabled = false;
    };
  });
}

const confirmTopping = document.querySelector('#confirmTopping');
if (confirmTopping) {
  confirmTopping.onclick = () => {
    topDlg?.close();
    dlg?.showModal();
  };
}

/* =========================================================
   MENU
========================================================= */

const MENU = {
  milkshake: [
    { name: { pl: 'Mango', de: 'Mango', en: 'Mango', cs: 'Mango' }, image: 'mango_real.jpg', price: '25 zł' },
    { name: { pl: 'Lotus', de: 'Lotus', en: 'Lotus', cs: 'Lotus' }, image: 'lotus_real.jpg', price: '25 zł' },
    { name: { pl: 'Oreo', de: 'Oreo', en: 'Oreo', cs: 'Oreo' }, image: 'oreo_real.jpg', price: '25 zł' },
    { name: { pl: 'Raffaello', de: 'Raffaello', en: 'Raffaello', cs: 'Raffaello' }, image: 'raffaello_real.jpg', price: '25 zł' },
    { name: { pl: 'Kinder Bueno', de: 'Kinder Bueno', en: 'Kinder Bueno', cs: 'Kinder Bueno' }, image: 'kinder_real.jpg', price: '25 zł' },
    { name: { pl: 'Banan', de: 'Banane', en: 'Banana', cs: 'Banán' }, image: 'banana_real.jpg', price: '25 zł' },
    { name: { pl: 'Truskawka', de: 'Erdbeere', en: 'Strawberry', cs: 'Jahoda' }, image: 'strawberry_real.jpg', price: '25 zł' },
    { name: { pl: 'Czekolada', de: 'Schokolade', en: 'Chocolate', cs: 'Čokoláda' }, image: 'chocolate.jpg', price: '25 zł' },
    { name: { pl: 'Ice Coffee', de: 'Eiskaffee', en: 'Ice Coffee', cs: 'Ledová káva' }, image: 'ice_coffee_real.jpg', price: '25 zł' }
  ],

  lemonade: [
    { name: { pl: 'Blue Lagoon', de: 'Blue Lagoon', en: 'Blue Lagoon', cs: 'Blue Lagoon' }, image: 'lemonade_blue.jpg', price: '18 zł' },
    { name: { pl: 'Truskawka', de: 'Erdbeere', en: 'Strawberry', cs: 'Jahoda' }, image: 'lemonade_strawberry.jpg', price: '18 zł' },
    { name: { pl: 'Cytryna + mięta', de: 'Zitrone + Minze', en: 'Lemon + mint', cs: 'Citron + máta' }, image: 'lemonade_lemon_mint.jpg', price: '18 zł' },
    { name: { pl: 'Mango + marakuja', de: 'Mango + Passionsfrucht', en: 'Mango + passion fruit', cs: 'Mango + marakuja' }, image: 'lemonade_mango.jpg', price: '18 zł' }
  ],

  waffle: [
    { name: { pl: 'Klasyczny', de: 'Klassisch', en: 'Classic', cs: 'Klasický' }, image:'waffle_classic.jpg', price: '10 zł' },
    { name: { pl: 'Z cukrem pudrem', de: 'Mit Puderzucker', en: 'With powdered sugar', cs: 'S moučkovým cukrem' }, image:'waffle_powdered.jpg', price: '12 zł' },
    { name: { pl: 'Z sosem', de: 'Mit Soße', en: 'With sauce', cs: 'S omáčkou' }, image: 'waffle_sauce.jpg', price: '15 zł' },
    { name: { pl: 'Z frużeliną', de: 'Mit Fruchttopping', en: 'With fruit topping', cs: 'S ovocnou polevou' }, image: 'waffle_cherry.jpg', price: '17 zł' },
    { name: { pl: 'Z bitą śmietaną', de: 'Mit Schlagsahne', en: 'With whipped cream', cs: 'Se šlehačkou' }, image: 'waffle_cream.jpg', price: '17 zł' },
    { name: { pl: 'Z Nutellą', de: 'Mit Nutella', en: 'With Nutella', cs: 'S Nutellou' }, image:'waffle_nutella.jpg', price: '17 zł' },
    { name: { pl: 'Z owocami', de: 'Mit Früchten', en: 'With fruit', cs: 'S ovocem' }, image: 'waffle_fruit.jpg', price: '17 zł' },
    { name: { pl: 'Z dżemem', de: 'Mit Marmelade', en: 'With jam', cs: 'S džemem' }, image: 'waffle_jam.jpg', price: '17 zł' },
    { name: { pl: 'Bita śmietana + sos', de: 'Schlagsahne + Soße', en: 'Whipped cream + sauce', cs: 'Šlehačka + omáčka' }, image: 'waffle_cream_sauce.jpg', price: '20 zł' },
    { name: { pl: 'Bita śmietana + posypka', de: 'Schlagsahne + Streusel', en: 'Whipped cream + sprinkles', cs: 'Šlehačka + posypka' }, image: 'waffle_candy.jpg', price: '20 zł' },
    { name: { pl: 'Nutella + owoce', de: 'Nutella + Früchte', en: 'Nutella + fruit', cs: 'Nutella + ovoce' }, image: 'waffle_fruit_nutella.jpg', price: '25 zł' },
    { name: { pl: 'Bita śmietana + owoce', de: 'Schlagsahne + Früchte', en: 'Whipped cream + fruit', cs: 'Šlehačka + ovoce' }, image: 'waffle_fruit_cream.jpg', price: '25 zł' },
    { name: { pl: 'Bita śmietana + frużelina', de: 'Schlagsahne + Fruchttopping', en: 'Whipped cream + fruit topping', cs: 'Šlehačka + ovocná poleva' }, image: 'waffle_berries_cream.jpg', price: '25 zł' },
    { name: { pl: '1 porcja lodów + bita śmietana + owoce + sos', de: '1 Portion Eis + Schlagsahne + Früchte + Soße', en: '1 serving of ice cream + whipped cream + fruit + sauce', cs: '1 porce zmrzliny + šlehačka + ovoce + omáčka' }, image: 'waffle_icecream.jpg', price: '34 zł' }
  ]
};

function menuProductName(product) {
  return product.name?.[currentLang] || product.name?.pl || '';
}

function openMenu(k, title) {
  const menuTitle = document.querySelector('#menuTitle');
  const menuItems = document.querySelector('#menuItems');
  if (!menuTitle || !menuItems) return;

  menuTitle.textContent = title;

  menuItems.innerHTML = (MENU[k] || [])
    .map(product => {
      const name = menuProductName(product);
      const picture = product.image
        ? `<img src="${product.image}" alt="${name}">`
        : `<div style="min-width:90px;width:90px;height:90px;display:flex;align-items:center;justify-content:center;font-size:42px;border-radius:14px;background:#fff7d6;">🧇</div>`;

      return `
        <article class="food">
          ${picture}
          <div>
            <b>${name}</b>
            <span>${product.price}</span>
          </div>
        </article>
      `;
    })
    .join('');

  document.querySelector('#menuDlg')?.showModal();
}

document.querySelectorAll('[data-menu]').forEach(b => {
  b.onclick = () => openMenu(b.dataset.menu, tr(b.dataset.titleKey));
});

const menuX = document.querySelector('#menuX');
if (menuX) {
  menuX.onclick = () => document.querySelector('#menuDlg')?.close();
}

/* =========================================================
   INFO
========================================================= */

const info = document.querySelector('#infoDlg');

function openInfo(title, text) {
  const infoTitle = document.querySelector('#infoTitle');
  const infoText = document.querySelector('#infoText');
  if (infoTitle) infoTitle.textContent = title;
  if (infoText) infoText.textContent = text;
  info?.showModal();
}

const infoX = document.querySelector('#infoX');
if (infoX) infoX.onclick = () => info?.close();

const howItWorks = document.querySelector('#howItWorks');
if (howItWorks) howItWorks.onclick = () => openInfo('🎮 ' + tr('howWorks'), tr('aboutGame'));

const familyPass = document.querySelector('#familyPass');
if (familyPass) familyPass.onclick = () => openInfo('👨‍👩‍👧 Family Pass', tr('familyText'));

const privacyBtn = document.querySelector('#privacy');
if (privacyBtn) privacyBtn.onclick = () => openInfo('🔐 ' + tr('privacy'), tr('privacyText'));
document.querySelectorAll('[data-info]').forEach(btn => {
  btn.onclick = () => {

    if (btn.dataset.info === 'icecream') {
      openIceCreamMenu();
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

/* =========================================================
   LOCATION
========================================================= */

const DEST = { lat: 53.91835, lon: 14.2442 };

function hav(a, b, c, d) {
  const R = 6371e3;
  const p = x => x * Math.PI / 180;
  const q1 = p(a);
  const q2 = p(c);
  const dq = p(c - a);
  const dl = p(d - b);

  const h =
    Math.sin(dq / 2) ** 2 +
    Math.cos(q1) * Math.cos(q2) * Math.sin(dl / 2) ** 2;

  return 2 * R * Math.asin(Math.sqrt(h));
}

const locateBtn = document.querySelector('#locate');

if (locateBtn) {
  locateBtn.onclick = () => {
    const status = document.querySelector('#distanceStatus');
    if (status) status.textContent = tr('lookingLocation');

    navigator.geolocation.getCurrentPosition(
      p => {
        const m = hav(
          p.coords.latitude,
          p.coords.longitude,
          DEST.lat,
          DEST.lon
        );

        const distance = m < 1000
          ? Math.round(m) + ' m'
          : (m / 1000).toFixed(1) + ' km';

        if (status) status.innerHTML = `<b>${distance}</b>`;

        const walkbar = document.querySelector('#walkbar');
        if (walkbar) {
          walkbar.style.width =
            Math.max(8, Math.min(100, 100 - (m / 3000 * 100))) + '%';
        }
      },
      () => {
        if (status) status.textContent = tr('locationDenied');
      }
    );
  };
}

/* =========================================================
   START
========================================================= */

renderToppings();
applyTranslations();
loadCatalog();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js');
  });
}
