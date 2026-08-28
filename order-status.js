/* =========================================================f
   ŚWIEŻE LODY — CUSTOMER ORDER STATUS
========================================================= */

(() => {
  const COPY = {
    pl: {
      title: 'Twoje zamówienie',
      number: 'Numer zamówienia',
      status: 'Status',
      time: 'Szacowany czas',
      minutes: 'min',
      new: 'Nowe',
      accepted: 'Przyjęte',
      preparing: 'Przygotowanie',
      ready: 'Gotowe do odbioru',
      collected: 'Wydane',
      cancelled: 'Anulowane',
      noOrder: 'Brak aktywnego zamówienia',
      close: 'Zamknij'
    },
    de: {
      title: 'Deine Bestellung',
      number: 'Bestellnummer',
      status: 'Status',
      time: 'Geschätzte Zeit',
      minutes: 'Min.',
      new: 'Neu',
      accepted: 'Angenommen',
      preparing: 'In Vorbereitung',
      ready: 'Abholbereit',
      collected: 'Abgeholt',
      cancelled: 'Storniert',
      noOrder: 'Keine aktive Bestellung',
      close: 'Schließen'
    },
    en: {
      title: 'Your order',
      number: 'Order number',
      status: 'Status',
      time: 'Estimated time',
      minutes: 'min',
      new: 'New',
      accepted: 'Accepted',
      preparing: 'Preparing',
      ready: 'Ready for pickup',
      collected: 'Collected',
      cancelled: 'Cancelled',
      noOrder: 'No active order',
      close: 'Close'
    },
    cs: {
      title: 'Tvoje objednávka',
      number: 'Číslo objednávky',
      status: 'Stav',
      time: 'Odhadovaný čas',
      minutes: 'min',
      new: 'Nová',
      accepted: 'Přijatá',
      preparing: 'Příprava',
      ready: 'Připraveno k vyzvednutí',
      collected: 'Vydáno',
      cancelled: 'Zrušeno',
      noOrder: 'Žádná aktivní objednávka',
      close: 'Zavřít'
    }
  };

  function lang() {
    if (
      typeof currentLang !== 'undefined' &&
      COPY[currentLang]
    ) {
      return currentLang;
    }

    return localStorage.getItem('swiezeLanguage') || 'pl';
  }

  function text(key) {
    return COPY[lang()]?.[key] || COPY.pl[key] || key;
  }
let lastNotifiedStatus = null;

function playReadySound() {
  try {
    const AudioContext =
      window.AudioContext ||
      window.webkitAudioContext;

    if (!AudioContext) return;

    const ctx = new AudioContext();

    function beep(delay, frequency) {
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();

      oscillator.frequency.value = frequency;
      gain.gain.value = 0.18;

      oscillator.connect(gain);
      gain.connect(ctx.destination);

      const start = ctx.currentTime + delay;

      oscillator.start(start);
      oscillator.stop(start + 0.28);
    }

    beep(0, 880);
    beep(0.38, 1100);

    setTimeout(() => {
      ctx.close();
    }, 1200);

  } catch (e) {
    console.log('Sound unavailable');
  }
}

function showReadyAlert(orderNumber) {
  playReadySound();

  alert(
    `🔔 ${text('ready')}\n\n#${orderNumber}`
  );
}  function loadLastOrder() {
    try {
      return JSON.parse(
        localStorage.getItem('swiezeLastOrder') || 'null'
      );
    } catch (e) {
      return null;
    }
  }

  const style = document.createElement('style');

  style.textContent = `
    .sl-order-status-btn {
      position: fixed;
      left: 16px;
      bottom: 84px;
      z-index: 39;
      border: 0;
      border-radius: 999px;
      background: #ffc728;
      color: #111;
      padding: 12px 16px;
      font-weight: 900;
      box-shadow: 0 7px 24px rgba(0,0,0,.18);
      cursor: pointer;
    }

    .sl-order-status-modal {
      border: 0;
      border-radius: 22px;
      width: min(92vw, 500px);
      padding: 0;
      box-shadow: 0 20px 70px rgba(0,0,0,.28);
    }

    .sl-order-status-modal::backdrop {
      background: rgba(0,0,0,.42);
    }

    .sl-order-status-wrap {
      padding: 20px;
    }

    .sl-order-status-head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 12px;
    }

    .sl-order-status-close {
      border: 0;
      background: #f1f1f1;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      font-size: 22px;
      cursor: pointer;
    }

    .sl-order-status-card {
      margin-top: 16px;
      background: #f8f8f8;
      border-radius: 16px;
      padding: 16px;
    }

    .sl-order-number {
      font-size: 30px;
      font-weight: 900;
      margin: 8px 0 16px;
    }

    .sl-order-status-badge {
      display: inline-block;
      padding: 9px 13px;
      border-radius: 999px;
      background: #eee;
      font-weight: 900;
      margin-bottom: 14px;
    }

    .sl-order-status-badge[data-status="new"] {
      background: #ffe0e0;
    }

    .sl-order-status-badge[data-status="accepted"] {
      background: #fff0bf;
    }

    .sl-order-status-badge[data-status="preparing"] {
      background: #dce8ff;
    }

    .sl-order-status-badge[data-status="ready"] {
      background: #d8f6e5;
    }

    .sl-order-time {
      font-size: 20px;
      font-weight: 900;
      margin-top: 10px;
    }

    .sl-order-empty {
      text-align: center;
      padding: 30px 10px;
      color: #777;
    }
  `;

  document.head.appendChild(style);

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'sl-order-status-btn';
  button.textContent = `🧾 ${text('title')}`;
  document.body.appendChild(button);

  const dialog = document.createElement('dialog');
  dialog.className = 'sl-order-status-modal';
  dialog.innerHTML = `
    <div class="sl-order-status-wrap">
      <div class="sl-order-status-head">
        <h2 id="slOrderStatusTitle"></h2>
        <button
          type="button"
          class="sl-order-status-close"
        >×</button>
      </div>

      <div id="slOrderStatusContent"></div>
    </div>
  `;

  document.body.appendChild(dialog);

  dialog.querySelector(
    '.sl-order-status-close'
  ).onclick = () => dialog.close();

  async function fetchStatus() {
    const lastOrder = loadLastOrder();

    const title =
      dialog.querySelector('#slOrderStatusTitle');

    const content =
      dialog.querySelector('#slOrderStatusContent');

    title.textContent = text('title');

    if (!lastOrder?.publicToken) {
      content.innerHTML = `
        <div class="sl-order-empty">
          ${text('noOrder')}
        </div>
      `;
      return;
    }

    const { data, error } =
      await sb.rpc(
        'get_pickup_order_status',
        {
          p_public_token: lastOrder.publicToken
        }
      );

    if (error || !data || !data.length) {
      content.innerHTML = `
        <div class="sl-order-empty">
          ${text('noOrder')}
        </div>
      `;
      return;
    }

    const order = data[0];

    content.innerHTML = `
      <div class="sl-order-status-card">

        <div>
          ${text('number')}
        </div>

        <div class="sl-order-number">
          #${order.order_number}
        </div>

        <div>
          ${text('status')}
        </div>

        <div
          class="sl-order-status-badge"
          data-status="${order.status}"
        >
          ${text(order.status)}
        </div>

        <div>
          ${text('time')}
        </div>

        <div class="sl-order-time">
          ⏱️
          ${order.estimated_minutes}
          ${text('minutes')}
        </div>

      </div>
    `;

    localStorage.setItem(
      'swiezeLastOrder',
      JSON.stringify({
        publicToken: lastOrder.publicToken,
        orderNumber: order.order_number,
        status: order.status,
        estimatedMinutes: order.estimated_minutes,
        total: order.total
      })
    );
  }

  button.onclick = async () => {
    await fetchStatus();
    dialog.showModal();
  };

  document
    .querySelectorAll('[data-lang]')
    .forEach(langButton => {
      langButton.addEventListener(
        'click',
        () => {
          setTimeout(
            () => {
              button.textContent =
                `🧾 ${text('title')}`;
            },
            0
          );
        }
      );
    });

  setInterval(
    async () => {
      const lastOrder = loadLastOrder();

      if (!lastOrder?.publicToken) {
        return;
      }

      const { data } =
        await sb.rpc(
          'get_pickup_order_status',
          {
            p_public_token: lastOrder.publicToken
          }
        );

      if (!data || !data.length) {
        return;
      }

      const order = data[0];
if (
  order.status === 'ready' &&
  lastNotifiedStatus !== 'ready'
) {
  showReadyAlert(order.order_number);
}

lastNotifiedStatus = order.status;      localStorage.setItem(
        'swiezeLastOrder',
        JSON.stringify({
          publicToken: lastOrder.publicToken,
          orderNumber: order.order_number,
          status: order.status,
          estimatedMinutes: order.estimated_minutes,
          total: order.total
        })
      );

      if (dialog.open) {
        await fetchStatus();
      }
    },
    10000
  );
})();
