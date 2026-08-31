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
    redeemed: 'WYKORZYSTANA',
    expired: 'WYGASŁA',
    rewardsLoading: 'Ładowanie nagród…',
    rewardsSignIn: 'Zaloguj się, aby zobaczyć swoje nagrody.',
    rewardsEmpty: 'Nie masz jeszcze odblokowanych nagród.',
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
    redeemed: 'EINGELÖST',
    expired: 'ABGELAUFEN',
    rewardsLoading: 'Belohnungen werden geladen…',
    rewardsSignIn: 'Melde dich an, um deine Belohnungen zu sehen.',
    rewardsEmpty: 'Du hast noch keine Belohnungen freigeschaltet.',
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
    redeemed: 'REDEEMED',
    expired: 'EXPIRED',
    rewardsLoading: 'Loading rewards…',
    rewardsSignIn: 'Sign in to see your rewards.',
    rewardsEmpty: 'You have not unlocked any rewards yet.',
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
    redeemed: 'UPLATNĚNA',
    expired: 'VYPRŠELA',
    rewardsLoading: 'Načítání odměn…',
    rewardsSignIn: 'Přihlas se a zobraz své odměny.',
    rewardsEmpty: 'Zatím nemáš odemčené žádné odměny.',
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

let ACCOUNT_REWARDS = [];
let accountSessionActive = false;
let accountStateReady = false;
let accountRefreshQueue = Promise.resolve();

function clearAccountCollectionItems() {
  UNLOCKED_ACCOUNT.MILKSHAKE.clear();
  UNLOCKED_ACCOUNT.LEMONADE.clear();
  UNLOCKED_ACCOUNT.VACATION.clear();
}

function syncCatalogUnlocks() {
  Object.values(DATA).forEach(collection => {
    collection.items.forEach(item => {
      item.unlocked =
        UNLOCKED_ACCOUNT[collection.code]?.has(item.code) || false;
    });
  });
}

async function loadMyCollectionItems(session) {
  clearAccountCollectionItems();

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

async function loadMyRewards(session) {
  ACCOUNT_REWARDS = [];

  if (!session) {
    return;
  }

  const { data, error } = await sb.rpc('get_my_rewards');

  if (error) {
    console.error('Customer rewards load error:', error);
    return;
  }

  ACCOUNT_REWARDS = Array.isArray(data) ? data : [];
}

function getAccountReward(rewardCode) {
  return ACCOUNT_REWARDS.find(
    reward => reward.reward_code === rewardCode
  ) || null;
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

function rewardName(reward) {
  if (reward.reward_code === 'MILKSHAKE_3') {
    return tr('freeTopping');
  }

  if (reward.reward_code === 'SECRET_DESSERT') {
    return tr('secretDessert');
  }

  if (reward.reward_code === 'SECRET_MILKSHAKE') {
    return 'Secret Milkshake';
  }

  return reward.reward_name || reward.reward_code;
}

function rewardDescription(reward) {
  if (reward.reward_code === 'MILKSHAKE_3') {
    return tr('reward3');
  }

  if (reward.reward_code === 'SECRET_DESSERT') {
    return tr('discover6');
  }

  if (reward.reward_code === 'SECRET_MILKSHAKE') {
    return tr('collectAll');
  }

  return reward.reward_description || '';
}

function rewardStatus(reward) {
  if (reward.status === 'AVAILABLE') return tr('available');
  if (reward.status === 'REDEEMED') return tr('redeemed');
  if (reward.status === 'EXPIRED') return tr('expired');
  return reward.status || '';
}

function renderRewards() {
  const list = document.querySelector('#rewardList');
  if (!list) return;

  list.replaceChildren();

  if (!accountStateReady || !accountSessionActive || !ACCOUNT_REWARDS.length) {
    const card = document.createElement('article');
    card.className = 'big-reward locked';

    const icon = document.createElement('div');
    icon.className = 'r-emoji';
    icon.textContent = accountStateReady && !accountSessionActive ? '🔐' : '🎁';

    const content = document.createElement('div');
    const message = document.createElement('p');
    message.textContent = !accountStateReady
      ? tr('rewardsLoading')
      : accountSessionActive
        ? tr('rewardsEmpty')
        : tr('rewardsSignIn');

    content.appendChild(message);
    card.append(icon, content);
    list.appendChild(card);
    return;
  }

  ACCOUNT_REWARDS.forEach(reward => {
    const available = reward.status === 'AVAILABLE';
    const card = document.createElement('article');
    card.className = `big-reward ${available ? 'available' : 'locked'}`;

    const icon = document.createElement('div');
    icon.className = 'r-emoji';
    icon.textContent = available
      ? '✨'
      : reward.status === 'REDEEMED'
        ? '✓'
        : '⌛';

    const content = document.createElement('div');
    const status = document.createElement('small');
    const title = document.createElement('h2');
    const description = document.createElement('p');

    status.textContent = rewardStatus(reward);
    title.textContent = rewardName(reward);
    description.textContent = rewardDescription(reward);

    content.append(status, title);
    if (description.textContent) content.appendChild(description);

    card.append(icon, content);

    if (available && reward.reward_code === 'MILKSHAKE_3') {
      const button = document.createElement('button');
      button.type = 'button';
      button.textContent = tr('showCodeSimple');
      button.onclick = () => topDlg?.showModal();
      card.appendChild(button);
    }

    list.appendChild(card);
  });
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
  renderRewards();

  renderPublicMenuCategories();
  if (activeMenuCategoryId) renderPublicMenuDialog(activeMenuCategoryId);

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
function safeImageUrl(value) {
  try {
    const url = new URL(String(value || ''), window.location.origin);
    return ['http:', 'https:'].includes(url.protocol) ? url.href : '';
  } catch {
    return '';
  }
}
async function openIceCreamMenu() {
  const menuTitle = document.querySelector('#menuTitle');
  const menuItems = document.querySelector('#menuItems');
  if (!menuTitle || !menuItems) return;
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
          src="${escapeHtml(safeImageUrl(flavour.image_url))}"
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
      data-flavour-id="${escapeHtml(flavour.id)}"
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
              data-id="${escapeHtml(flavour.id)}"
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
              data-id="${escapeHtml(flavour.id)}"
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

async function loadCatalog() {
  const { data, error } = await sb.rpc('get_collection_catalog');

  if (error) {
    console.error('Collections load error:', error);
    return;
  }

  const nextData = {};

  (data || []).forEach(row => {
    if (!nextData[row.collection_code]) {
      nextData[row.collection_code] = {
        id: row.collection_id,
        code: row.collection_code,
        icon: row.collection_icon,
        items: []
      };
    }

    nextData[row.collection_code].items.push({
      code: row.item_code,
      name: row.item_name,
      icon: row.item_icon,
      image: IMAGE_MAP[row.collection_code]?.[row.item_code] || null,
      unlocked:
        UNLOCKED_ACCOUNT[row.collection_code]?.has(row.item_code) || false
    });
  });

  DATA = nextData;
  applyTranslations();
}

async function refreshCustomerCollectionState() {
  accountStateReady = false;
  renderRewards();

  const {
    data: { session },
    error
  } = await sb.auth.getSession();

  if (error) {
    console.error('Customer session load error:', error);
  }

  const activeSession = error ? null : session;
  accountSessionActive = Boolean(activeSession);

  await Promise.all([
    loadMyCollectionItems(activeSession),
    loadMyRewards(activeSession)
  ]);

  syncCatalogUnlocks();
  await loadCatalog();
  accountStateReady = true;
  renderRewards();
}

function queueCustomerCollectionRefresh() {
  accountRefreshQueue = accountRefreshQueue
    .catch(error => {
      console.error('Previous collection refresh error:', error);
    })
    .then(refreshCustomerCollectionState)
    .catch(error => {
      accountSessionActive = false;
      ACCOUNT_REWARDS = [];
      clearAccountCollectionItems();
      syncCatalogUnlocks();
      accountStateReady = true;
      applyTranslations();
      console.error('Collection refresh error:', error);
    });

  return accountRefreshQueue;
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
    const toppingReward = getAccountReward('MILKSHAKE_3');
    rewardCard.classList.toggle(
      'hidden',
      code !== 'MILKSHAKE' || toppingReward?.status !== 'AVAILABLE'
    );
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

const MENU_UI = {
  pl: { loading: 'Ładowanie menu…', unavailable: 'Menu jest teraz niedostępne.', products: 'produktów', from: 'od', add: 'Dodaj' },
  de: { loading: 'Menü wird geladen…', unavailable: 'Das Menü ist derzeit nicht verfügbar.', products: 'Produkte', from: 'ab', add: 'Hinzufügen' },
  en: { loading: 'Loading menu…', unavailable: 'The menu is currently unavailable.', products: 'products', from: 'from', add: 'Add' },
  cs: { loading: 'Načítání menu…', unavailable: 'Menu momentálně není dostupné.', products: 'produktů', from: 'od', add: 'Přidat' }
};

let publicMenuCategories = [];
let activeMenuCategoryId = null;
let publicMenuStatus = 'loading';

function menuUi(key) {
  return MENU_UI[currentLang]?.[key] || MENU_UI.pl[key] || key;
}

function isAvailableNow(startsAt, endsAt, now = Date.now()) {
  const starts = startsAt ? Date.parse(startsAt) : null;
  const ends = endsAt ? Date.parse(endsAt) : null;
  return (!starts || starts <= now) && (!ends || now < ends);
}

function effectiveMenuPrice(product, now = Date.now()) {
  const promoActive = product.promo_price != null &&
    isAvailableNow(product.promo_starts_at, product.promo_ends_at, now);
  return Number(promoActive ? product.promo_price : product.regular_price);
}

function formatMenuPrice(value) {
  const amount = Number(value);
  return `${amount.toFixed(2).replace(/\.00$/, '').replace('.', ',')} zł`;
}

function localizedMenuValue(translations, field) {
  return translations?.[currentLang]?.[field] || translations?.pl?.[field] || '';
}

function groupTranslations(rows, ownerField) {
  return (rows || []).reduce((catalog, row) => {
    const ownerId = row[ownerField];
    if (!catalog[ownerId]) catalog[ownerId] = {};
    catalog[ownerId][row.locale] = row;
    return catalog;
  }, {});
}

function renderPublicMenuCategories(message = '') {
  const container = document.querySelector('#dynamicMenuCategories');
  if (!container) return;

  container.replaceChildren();
  if (message || publicMenuStatus !== 'ready' || !publicMenuCategories.length) {
    const status = document.createElement('p');
    status.className = 'menu-catalog-status';
    status.textContent = message || menuUi(
      publicMenuStatus === 'unavailable' ? 'unavailable' : 'loading'
    );
    container.appendChild(status);
    return;
  }

  publicMenuCategories.forEach(category => {
    const button = document.createElement('button');
    button.type = 'button';

    const icon = document.createElement('div');
    icon.textContent = category.icon || '🍦';

    const name = document.createElement('b');
    name.textContent = localizedMenuValue(category.translations, 'name');

    const prices = category.products.map(product => product.price);
    const summary = document.createElement('span');
    summary.textContent = `${category.products.length} ${menuUi('products')} • ${menuUi('from')} ${formatMenuPrice(Math.min(...prices))}`;

    button.append(icon, name, summary);
    button.onclick = () => openMenu(category.id);
    container.appendChild(button);
  });
}

function renderPublicMenuDialog(categoryId) {
  const category = publicMenuCategories.find(item => item.id === categoryId);
  const menuTitle = document.querySelector('#menuTitle');
  const menuItems = document.querySelector('#menuItems');
  if (!category || !menuTitle || !menuItems) return;

  menuTitle.textContent = `${category.icon || ''} ${localizedMenuValue(category.translations, 'name')}`.trim();
  menuItems.replaceChildren();

  category.products.forEach(product => {
    const article = document.createElement('article');
    article.className = 'food menu-product';

    const productName = localizedMenuValue(product.translations, 'name');
    const imageUrl = safeImageUrl(product.imageUrl);
    if (imageUrl) {
      const image = document.createElement('img');
      image.src = imageUrl;
      image.alt = productName;
      article.appendChild(image);
    } else {
      const placeholder = document.createElement('div');
      placeholder.className = 'food-placeholder';
      placeholder.textContent = category.icon || '🍦';
      article.appendChild(placeholder);
    }

    const copy = document.createElement('div');
    copy.className = 'food-copy';
    const name = document.createElement('b');
    name.textContent = productName;
    const price = document.createElement('span');
    price.textContent = formatMenuPrice(product.price);
    copy.append(name, price);

    const descriptionText = localizedMenuValue(product.translations, 'description');
    if (descriptionText) {
      const description = document.createElement('span');
      description.className = 'food-description';
      description.textContent = descriptionText;
      copy.appendChild(description);
    }
    if (product.badge) {
      const badge = document.createElement('span');
      badge.className = 'food-badge';
      badge.textContent = product.badge;
      copy.appendChild(badge);
    }

    const add = document.createElement('button');
    add.className = 'sl-add-btn';
    add.type = 'button';
    add.textContent = window.getCartText?.('add') || menuUi('add');
    add.onclick = () => window.addMenuProductToCart?.({
      legacyKey: product.legacyKey,
      categorySlug: category.slug,
      name: Object.fromEntries(Object.entries(product.translations).map(([locale, translation]) => [locale, translation.name])),
      price: formatMenuPrice(product.price),
      image: product.imageUrl
    });

    article.append(copy, add);
    menuItems.appendChild(article);
  });
}

function openMenu(categoryId) {
  activeMenuCategoryId = categoryId;
  renderPublicMenuDialog(categoryId);

  document.querySelector('#menuDlg')?.showModal();
}

async function loadPublicMenu() {
  publicMenuStatus = 'loading';
  renderPublicMenuCategories(menuUi('loading'));

  const [categoriesResult, categoryTranslationsResult, productsResult, productTranslationsResult] = await Promise.all([
    sb.from('menu_categories')
      .select('id,slug,icon,sort_order,is_active,visibility,available_starts_at,available_ends_at,required_reward_id')
      .eq('is_active', true)
      .eq('visibility', 'public')
      .is('required_reward_id', null)
      .order('sort_order')
      .order('slug'),
    sb.from('menu_category_translations')
      .select('category_id,locale,name,description'),
    sb.from('menu_products')
      .select('id,category_id,slug,legacy_key,image_url,regular_price,promo_price,promo_starts_at,promo_ends_at,badge,sort_order,is_active,is_available,is_orderable,product_type,visibility,available_starts_at,available_ends_at,required_reward_id')
      .eq('is_active', true)
      .eq('is_available', true)
      .eq('is_orderable', true)
      .eq('visibility', 'public')
      .eq('product_type', 'standard')
      .is('required_reward_id', null)
      .not('legacy_key', 'is', null)
      .order('sort_order')
      .order('slug'),
    sb.from('menu_product_translations')
      .select('product_id,locale,name,description')
  ]);

  const failed = [categoriesResult, categoryTranslationsResult, productsResult, productTranslationsResult]
    .find(result => result.error);
  if (failed) throw failed.error;

  const now = Date.now();
  const categoryTranslations = groupTranslations(categoryTranslationsResult.data, 'category_id');
  const productTranslations = groupTranslations(productTranslationsResult.data, 'product_id');
  const productsByCategory = new Map();

  (productsResult.data || [])
    .filter(product => product.is_active && product.is_available && product.is_orderable)
    .filter(product => product.product_type === 'standard' && product.visibility === 'public')
    .filter(product => product.required_reward_id == null)
    .filter(product => isAvailableNow(product.available_starts_at, product.available_ends_at, now))
    .filter(product => String(product.legacy_key || '').trim())
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0) || a.slug.localeCompare(b.slug))
    .forEach(product => {
      const list = productsByCategory.get(product.category_id) || [];
      list.push({
        id: product.id,
        slug: product.slug,
        legacyKey: product.legacy_key,
        imageUrl: product.image_url,
        badge: product.badge,
        sortOrder: product.sort_order,
        price: effectiveMenuPrice(product, now),
        translations: productTranslations[product.id] || {}
      });
      productsByCategory.set(product.category_id, list);
    });

  publicMenuCategories = (categoriesResult.data || [])
    .filter(category => category.is_active && category.visibility === 'public')
    .filter(category => category.required_reward_id == null)
    .filter(category => isAvailableNow(category.available_starts_at, category.available_ends_at, now))
    .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0) || a.slug.localeCompare(b.slug))
    .map(category => ({
      id: category.id,
      slug: category.slug,
      icon: category.icon,
      sortOrder: category.sort_order,
      translations: categoryTranslations[category.id] || {},
      products: productsByCategory.get(category.id) || []
    }))
    .filter(category => category.products.length);

  publicMenuStatus = publicMenuCategories.length ? 'ready' : 'unavailable';
  renderPublicMenuCategories(publicMenuCategories.length ? '' : menuUi('unavailable'));
}

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

loadPublicMenu().catch(error => {
  console.error('MENU CATALOG ERROR:', error);
  publicMenuStatus = 'unavailable';
  renderPublicMenuCategories(menuUi('unavailable'));
});

window.addEventListener(
  'customer-auth-changed',
  queueCustomerCollectionRefresh
);

queueCustomerCollectionRefresh();

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js');
  });
}
