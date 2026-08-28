const sb = window.supabase.createClient(
  window.APP_CONFIG.supabaseUrl,
  window.APP_CONFIG.supabaseAnonKey
);

async function checkSupabase() {
  const { data, error } = await sb
    .from('collections')
    .select('code,name,icon,active,sort_order')
    .eq('active', true)
    .order('sort_order');

  if (error) {
    console.error('Supabase connection error:', error);
    return;
  }

  console.log('Supabase connected:', data);
}

checkSupabase();

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

let DATA = {};

async function loadCatalog() {
  const { data: collections, error: collectionsError } = await sb
    .from('collections')
    .select('code,name,icon,sort_order')
    .eq('active', true)
    .order('sort_order');

  if (collectionsError) {
    console.error('Collections load error:', collectionsError);
    return;
  }

  const { data: items, error: itemsError } = await sb
    .from('collection_items')
    .select('collection_code,code,name,icon,sort_order')
    .eq('active', true)
    .order('sort_order');

  if (itemsError) {
    console.error('Items load error:', itemsError);
    return;
  }

  DATA = {};

  collections.forEach(collection => {
    const code = collection.code;

    DATA[code] = {
      title:
        code === 'MILKSHAKE'
          ? 'Twoja kolekcja Milkshake'
          : code === 'LEMONADE'
          ? 'Twoja kolekcja Lemoniad'
          : 'Wakacyjna Misja',
      icon: collection.icon,
      items: items
        .filter(item => item.collection_code === code)
        .map(item => [
          item.name,
          IMAGE_MAP[code]?.[item.code] || null,
          UNLOCKED_DEMO[code]?.has(item.code) ? 1 : 0,
          item.icon
        ])
    };
  });

  renderCollection('MILKSHAKE');
}

const TOPPINGS = [
  '🍫 Czekolada',
  '🍮 Toffi',
  '🍓 Owocowy',
  '🍪 Oreo',
  '🍪 Lotus',
  '🥥 Kokos',
  '🌈 Kolorowa posypka',
  '☁️ Marshmallow'
];

function showPage(n) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelector('#page-' + n).classList.add('active');
  document.querySelectorAll('nav button').forEach(b =>
    b.classList.toggle('on', b.dataset.page === n)
  );
  scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelectorAll('[data-page]').forEach(
  b => b.onclick = () => showPage(b.dataset.page)
);

function renderCollection(code) {
  const d = DATA[code];
  if (!d) return;

  const cards = document.querySelector('#cards');

  document.querySelector('#collectionTitle').textContent = d.title;
  document.querySelector('#collectionIcon').textContent = d.icon;

  document.querySelectorAll('.chip').forEach(c =>
    c.classList.toggle('active', c.dataset.collection === code)
  );

  cards.innerHTML = '';

  d.items.forEach(([name, img, on, emoji]) => {
    let e = document.createElement('article');

    e.className =
      'card ' +
      (on ? 'unlocked' : 'locked') +
      (img ? '' : ' placeholder');

    e.innerHTML = img
      ? `<img src="${img}.jpg" alt="${name}">`
      : `<div>${emoji}</div>`;

    e.innerHTML += `
      <div class="badge">${on ? '✓' : '🔒'}</div>
      <div class="name">${name}</div>
    `;

    cards.appendChild(e);
  });

  let n = d.items.filter(x => x[2]).length;
  let t = d.items.length;

  document.querySelector('#now').textContent = n;
  document.querySelector('#total').textContent = t;
  document.querySelector('#bar').style.width = (n / t * 100) + '%';

  document
    .querySelector('#rewardCard')
    .classList.toggle('hidden', code !== 'MILKSHAKE' || n < 3);

  document.querySelector('#secretLabel').textContent =
    code === 'VACATION'
      ? '🎁 NAGRODA MISJI'
      : code === 'LEMONADE'
      ? '🔒 SECRET LEMONADE'
      : '🔒 SEKRETNY DESER';

  document.querySelector('#secret').textContent =
    code === 'VACATION'
      ? 'LODY 100 g'
      : code === 'LEMONADE'
      ? '???'
      : n >= 9
      ? 'MILKSHAKE MASTER'
      : '???';

  document.querySelector('#hint').textContent =
    code === 'VACATION'
      ? 'Ukończ misję → nagroda'
      : code === 'MILKSHAKE'
      ? '9/9 → Secret Milkshake + status Master'
      : 'Zbierz 4 różne lemoniady';

  let dots = document.querySelector('#dots');
  dots.innerHTML = '';

  for (let i = 0; i < t; i++) {
    let s = document.createElement('span');
    s.className = 'dot ' + (i < n ? 'on' : '');
    dots.appendChild(s);
  }
}

document.querySelectorAll('.chip').forEach(
  c => c.onclick = () => renderCollection(c.dataset.collection)
);

const dlg = document.querySelector('#dlg');
const topDlg = document.querySelector('#toppingDlg');

document.querySelector('#code').onclick = () => topDlg.showModal();
document.querySelector('#rewardShowCode').onclick = () => topDlg.showModal();
document.querySelector('#x').onclick = () => dlg.close();
document.querySelector('#topX').onclick = () => topDlg.close();

document.querySelector('#toppingGrid').innerHTML =
  TOPPINGS.map(x => `<button>${x}</button>`).join('');

document.querySelectorAll('#toppingGrid button').forEach(
  b => b.onclick = () => {
    document.querySelector('#chosenTopping').textContent =
      'Wybrano: ' + b.textContent;

    document.querySelector('#confirmTopping').disabled = false;
  }
);

document.querySelector('#confirmTopping').onclick = () => {
  topDlg.close();
  dlg.showModal();
};

const menu = {
  milkshake: [
    ['Mango', 'mango_real.jpg', '25 zł'],
    ['Lotus', 'lotus_real.jpg', '25 zł'],
    ['Oreo', 'oreo_real.jpg', '25 zł'],
    ['Raffaello', 'raffaello_real.jpg', '25 zł'],
    ['Kinder Bueno', 'kinder_real.jpg', '25 zł'],
    ['Banan', 'banana_real.jpg', '25 zł'],
    ['Truskawka', 'strawberry_real.jpg', '25 zł'],
    ['Czekolada', 'chocolate.jpg', '25 zł'],
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
    (menu[k] || []).map(
      x => `
        <article class="food">
          <img src="${x[1]}">
          <div>
            <b>${x[0]}</b>
            <span>${x[2]}</span>
          </div>
        </article>
      `
    ).join('');

  document.querySelector('#menuDlg').showModal();
}

document.querySelectorAll('[data-menu]').forEach(
  b => b.onclick = () =>
    openMenu(b.dataset.menu, b.dataset.title)
);

document.querySelector('#menuX').onclick =
  () => document.querySelector('#menuDlg').close();

const info = document.querySelector('#infoDlg');

function openInfo(t, x) {
  document.querySelector('#infoTitle').textContent = t;
  document.querySelector('#infoText').textContent = x;
  info.showModal();
}

document.querySelector('#infoX').onclick = () => info.close();

document.querySelector('#howItWorks').onclick = () =>
  openInfo(
    '🎮 Jak działa gra?',
    'Próbuj różnych smaków. Ten sam smak nie zwiększa kolekcji. Nowy smak = nowa karta. Są też krótkie misje dla turystów.'
  );

document.querySelector('#familyPass').onclick = () =>
  openInfo(
    '👨‍👩‍👧 Family Pass',
    'Rodzina może w przyszłości zbierać wspólną kolekcję jednym kodem.'
  );

document.querySelector('#privacy').onclick = () =>
  openInfo(
    '🔐 Prywatność',
    'Dane klienta będą chronione przez Supabase i RLS. Klucz administracyjny nie będzie umieszczony w aplikacji.'
  );

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
  let s = document.querySelector('#distanceStatus');

  s.textContent = 'Szukam Twojej lokalizacji…';

  navigator.geolocation.getCurrentPosition(
    p => {
      let m = hav(
        p.coords.latitude,
        p.coords.longitude,
        DEST.lat,
        DEST.lon
      );

      let min = Math.max(1, Math.round(m / 80));

      s.innerHTML = `
        <b>${m < 1000
          ? Math.round(m) + ' m'
          : (m / 1000).toFixed(1) + ' km'}
        </b>
        • około ${min} min pieszo
        <br>
        <small>
          Jeszcze tylko ${
            m < 1000
              ? Math.round(m) + ' metrów'
              : (m / 1000).toFixed(1) + ' km'
          } do Świeże Lody!
        </small>
      `;

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
      s.textContent =
        'Włącz dostęp do lokalizacji w Safari, aby policzyć odległość.';
    }
  );
};

loadCatalog();

if ('serviceWorker' in navigator) {
  addEventListener('load', () =>
    navigator.serviceWorker.register('sw.js')
  );
}
