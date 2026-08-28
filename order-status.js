/* =========================================================
   ŚWIEŻE LODY — CUSTOMER ORDER STATUS V2
   Timer + Progress + Ready screen + Sound
========================================================= */

(() => {
  const COPY = {
    pl: {
      title: 'Twoje zamówienie',
      number: 'Numer zamówienia',
      status: 'Status',
      remaining: 'Pozostało około',
      new: 'Nowe',
      accepted: 'Przyjęte',
      preparing: 'Przygotowanie',
      ready: 'Gotowe do odbioru',
      collected: 'Wydane',
      cancelled: 'Anulowane',
      noOrder: 'Brak aktywnego zamówienia',
      readyTitle: 'Zamówienie gotowe!',
      readyText: 'Możesz już odebrać swoje zamówienie.',
      overdue: 'Prawie gotowe',
      step1: 'Przyjęte',
      step2: 'Robimy',
      step3: 'Gotowe'
    },

    de: {
      title: 'Deine Bestellung',
      number: 'Bestellnummer',
      status: 'Status',
      remaining: 'Ungefähr noch',
      new: 'Neu',
      accepted: 'Angenommen',
      preparing: 'In Vorbereitung',
      ready: 'Abholbereit',
      collected: 'Abgeholt',
      cancelled: 'Storniert',
      noOrder: 'Keine aktive Bestellung',
      readyTitle: 'Bestellung ist fertig!',
      readyText: 'Du kannst deine Bestellung jetzt abholen.',
      overdue: 'Fast fertig',
      step1: 'Angenommen',
      step2: 'Wir machen es',
      step3: 'Fertig'
    },

    en: {
      title: 'Your order',
      number: 'Order number',
      status: 'Status',
      remaining: 'About',
      new: 'New',
      accepted: 'Accepted',
      preparing: 'Preparing',
      ready: 'Ready for pickup',
      collected: 'Collected',
      cancelled: 'Cancelled',
      noOrder: 'No active order',
      readyTitle: 'Your order is ready!',
      readyText: 'You can pick up your order now.',
      overdue: 'Almost ready',
      step1: 'Accepted',
      step2: 'Preparing',
      step3: 'Ready'
    },

    cs: {
      title: 'Tvoje objednávka',
      number: 'Číslo objednávky',
      status: 'Stav',
      remaining: 'Přibližně zbývá',
      new: 'Nová',
      accepted: 'Přijatá',
      preparing: 'Příprava',
      ready: 'Připraveno k vyzvednutí',
      collected: 'Vydáno',
      cancelled: 'Zrušeno',
      noOrder: 'Žádná aktivní objednávka',
      readyTitle: 'Objednávka je připravena!',
      readyText: 'Objednávku si můžeš vyzvednout.',
      overdue: 'Téměř hotovo',
      step1: 'Přijatá',
      step2: 'Příprava',
      step3: 'Hotovo'
    }
  };

  let currentOrder = null;
  let countdownTimer = null;
  let lastNotifiedStatus = null;

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

  function loadLastOrder() {
    try {
      return JSON.parse(
        localStorage.getItem('swiezeLastOrder') || 'null'
      );
    } catch (e) {
      return null;
    }
  }

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
        gain.gain.value = 0.2;

        oscillator.connect(gain);
        gain.connect(ctx.destination);

        const start = ctx.currentTime + delay;

        oscillator.start(start);
        oscillator.stop(start + 0.3);
      }

      beep(0, 880);
      beep(0.4, 1100);
      beep(0.8, 1320);

      setTimeout(() => {
        ctx.close();
      }, 1600);

    } catch (e) {
      console.log('Sound unavailable');
    }
  }

  function showReadyAlert(orderNumber) {
    playReadySound();

    alert(
      `🔔 ${text('readyTitle')}\n\n#${orderNumber}`
    );
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
      padding: 13px 17px;
      font-weight: 900;
      box-shadow: 0 7px 24px rgba(0,0,0,.18);
      cursor: pointer;
      font-size: 15px;
    }

    .sl-order-status-modal {
      border: 0;
      border-radius: 24px;
      width: min(92vw, 520px);
      padding: 0;
      box-shadow: 0 20px 70px rgba(0,0,0,.3);
    }

    .sl-order-status-modal::backdrop {
      background: rgba(0,0,0,.45);
    }

    .sl-order-status-wrap {
      padding: 20px;
    }

    .sl-order-status-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }

    .sl-order-status-head h2 {
      margin: 0;
      font-size: 24px;
    }

    .sl-order-status-close {
      border: 0;
      background: #f1f1f1;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      font-size: 24px;
      cursor: pointer;
    }

    .sl-order-card {
      margin-top: 16px;
      background: #f8f8f8;
      border-radius: 20px;
      padding: 18px;
    }

    .sl-order-number {
      font-size: 34px;
      font-weight: 900;
      margin: 5px 0 15px;
    }

    .sl-status-badge {
      display: inline-block;
      padding: 10px 14px;
      border-radius: 999px;
      font-weight: 900;
      margin-bottom: 18px;
      background: #eee;
    }

    .sl-status-badge[data-status="new"] {
      background: #ffe2e2;
    }

    .sl-status-badge[data-status="accepted"] {
      background: #fff0bf;
    }

    .sl-status-badge[data-status="preparing"] {
      background: #dce8ff;
    }

    .sl-status-badge[data-status="ready"] {
      background: #d8f6e5;
    }

    .sl-timer-label {
      font-size: 15px;
      color: #666;
      margin-bottom: 5px;
    }

    .sl-countdown {
      font-size: 42px;
      font-weight: 900;
      letter-spacing: 1px;
      margin-bottom: 20px;
    }

    .sl-progress {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 6px;
      margin-top: 18px;
    }

    .sl-step {
      flex: 1;
      text-align: center;
      font-size: 12px;
      font-weight: 800;
      color: #aaa;
    }

    .sl-step-circle {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      margin: 0 auto 7px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #e4e4e4;
      font-size: 16px;
    }

    .sl-step.active {
      color: #111;
    }

    .sl-step.active .sl-step-circle {
      background: #ffc728;
    }

    .sl-step.done .sl-step-circle {
      background: #bdebcf;
    }

    .sl-ready-screen {
      text-align: center;
      padding: 28px 10px 22px;
    }

    .sl-ready-icon {
      font-size: 72px;
      margin-bottom: 10px;
    }

    .sl-ready-title {
      font-size: 30px;
      font-weight: 900;
      margin-bottom: 8px;
    }

    .sl-ready-number {
      font-size: 42px;
      font-weight: 900;
      margin: 16px 0;
    }

    .sl-ready-text {
      font-size: 18px;
      line-height: 1.4;
    }

    .sl-order-empty {
      text-align: center;
      padding: 35px 10px;
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
        >
          ×
        </button>
      </div>

      <div id="slOrderStatusContent"></div>

    </div>
  `;

  document.body.appendChild(dialog);

  dialog
    .querySelector('.sl-order-status-close')
    .onclick = () => dialog.close();

  function getProgressIndex(status) {
    if (status === 'ready') return 3;
    if (status === 'preparing') return 2;
    if (status === 'accepted') return 1;
    if (status === 'new') return 0;

    return 0;
  }

  function renderProgress(status) {
    const current = getProgressIndex(status);

    const steps = [
      {
        icon: '🧾',
        label: text('new')
      },
      {
        icon: '✓',
        label: text('step1')
      },
      {
        icon: '👩‍🍳',
        label: text('step2')
      },
      {
        icon: '✅',
        label: text('step3')
      }
    ];

    return `
      <div class="sl-progress">
        ${steps.map((step, index) => {
          let className = 'sl-step';

          if (index < current) {
            className += ' done';
          }

          if (index === current) {
            className += ' active';
          }

          return `
            <div class="${className}">
              <div class="sl-step-circle">
                ${step.icon}
              </div>

              <div>
                ${step.label}
              </div>
            </div>
          `;
        }).join('')}
      </div>
    `;
  }

  function countdownText(readyAt) {
    if (!readyAt) {
      return '--:--';
    }

    const diff =
      new Date(readyAt).getTime() -
      Date.now();

    if (diff <= 0) {
      return text('overdue');
    }

    const totalSeconds =
      Math.floor(diff / 1000);

    const minutes =
      Math.floor(totalSeconds / 60);

    const seconds =
      totalSeconds % 60;

    return (
      String(minutes).padStart(2, '0') +
      ':' +
      String(seconds).padStart(2, '0')
    );
  }

  function startCountdown() {
    clearInterval(countdownTimer);

    countdownTimer =
      setInterval(() => {
        if (!currentOrder) return;

        const timer =
          dialog.querySelector(
            '#slCountdown'
          );

        if (!timer) return;

        timer.textContent =
          countdownText(
            currentOrder.ready_at
          );
      }, 1000);
  }

  function renderOrder(order) {
    currentOrder = order;

    const content =
      dialog.querySelector(
        '#slOrderStatusContent'
      );

    if (order.status === 'ready') {
      content.innerHTML = `
        <div class="sl-ready-screen">

          <div class="sl-ready-icon">
            ✅
          </div>

          <div class="sl-ready-title">
            ${text('readyTitle')}
          </div>

          <div class="sl-ready-number">
            #${order.order_number}
          </div>

          <div class="sl-ready-text">
            ${text('readyText')}
          </div>

        </div>
      `;

      return;
    }

    content.innerHTML = `
      <div class="sl-order-card">

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
          class="sl-status-badge"
          data-status="${order.status}"
        >
          ${text(order.status)}
        </div>

        <div class="sl-timer-label">
          ${text('remaining')}
        </div>

        <div
          id="slCountdown"
          class="sl-countdown"
        >
          ${countdownText(order.ready_at)}
        </div>

        ${renderProgress(order.status)}

      </div>
    `;

    startCountdown();
  }

  async function fetchStatus() {
    const lastOrder = loadLastOrder();

    const title =
      dialog.querySelector(
        '#slOrderStatusTitle'
      );

    const content =
      dialog.querySelector(
        '#slOrderStatusContent'
      );

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
          p_public_token:
            lastOrder.publicToken
        }
      );

    if (
      error ||
      !data ||
      !data.length
    ) {
      content.innerHTML = `
        <div class="sl-order-empty">
          ${text('noOrder')}
        </div>
      `;

      return;
    }

    const order = data[0];

    renderOrder(order);

    localStorage.setItem(
      'swiezeLastOrder',
      JSON.stringify({
        publicToken:
          lastOrder.publicToken,
        orderNumber:
          order.order_number,
        status:
          order.status,
        estimatedMinutes:
          order.estimated_minutes,
        readyAt:
          order.ready_at,
        total:
          order.total
      })
    );
  }

  button.onclick =
    async () => {
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

              if (dialog.open) {
                fetchStatus();
              }
            },
            0
          );
        }
      );
    });

  setInterval(
    async () => {
      const lastOrder =
        loadLastOrder();

      if (!lastOrder?.publicToken) {
        return;
      }

      const { data } =
        await sb.rpc(
          'get_pickup_order_status',
          {
            p_public_token:
              lastOrder.publicToken
          }
        );

      if (
        !data ||
        !data.length
      ) {
        return;
      }

      const order = data[0];

      if (
        order.status === 'ready' &&
        lastNotifiedStatus !== 'ready'
      ) {
        showReadyAlert(
          order.order_number
        );
      }

      lastNotifiedStatus =
        order.status;

      localStorage.setItem(
        'swiezeLastOrder',
        JSON.stringify({
          publicToken:
            lastOrder.publicToken,
          orderNumber:
            order.order_number,
          status:
            order.status,
          estimatedMinutes:
            order.estimated_minutes,
          readyAt:
            order.ready_at,
          total:
            order.total
        })
      );

      if (dialog.open) {
        renderOrder(order);
      }

    },
    5000
  );
})();
