(() => {
  'use strict';

  const recoveryFromUrl =
    window.location.hash.includes('type=recovery') ||
    window.location.search.includes('type=recovery');

  const sb = window.supabase.createClient(
    window.APP_CONFIG.supabaseUrl,
    window.APP_CONFIG.supabaseAnonKey,
    {
      auth: {
        storageKey: 'swieze-lody-staff-auth',
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
      }
    }
  );

  window.sb = sb;

  const loginPanel = document.getElementById('loginPanel');
  const recoveryPanel = document.getElementById('recoveryPanel');
  const staffPanel = document.getElementById('staffPanel');
  const bottomNav = document.getElementById('adminBottomNav');
  const moreBtn = document.getElementById('adminMoreBtn');
  const topSubtitle = document.getElementById('adminTopSubtitle');
  const loginBtn = document.getElementById('loginBtn');
  const resetPasswordBtn = document.getElementById('resetPasswordBtn');
  const saveNewPasswordBtn = document.getElementById('saveNewPasswordBtn');
  const logoutBtn = document.getElementById('logoutBtn');
  const loginError = document.getElementById('loginError');
  const recoveryError = document.getElementById('recoveryError');
  const ordersBox = document.getElementById('orders');
  const refreshBtn = document.getElementById('refreshBtn');
  const homeRefreshBtn = document.getElementById('homeRefreshBtn');
  const attentionBox = document.getElementById('homeAttention');

  let allOrders = [];
  let currentFilter = 'active';
  let lastKnownNewIds = new Set();
  let currentView = 'home';

  const moduleLoads = new Map();

  function scriptBase(src) {
    return String(src || '').split('?')[0];
  }

  function loadScriptOnce(src) {
    const key = scriptBase(src);

    if (moduleLoads.has(key)) {
      return moduleLoads.get(key);
    }

    const existing = [...document.scripts].find(script =>
      scriptBase(script.getAttribute('src')) === key
    );

    if (existing) {
      const ready = Promise.resolve();
      moduleLoads.set(key, ready);
      return ready;
    }

    const promise = new Promise((resolve, reject) => {
      const script = document.createElement('script');

      script.src = src;
      script.async = true;

      script.onload = () => resolve();

      script.onerror = () => {
        moduleLoads.delete(key);
        reject(
          new Error(
            'Nie udało się załadować modułu: ' + src
          )
        );
      };

      document.body.appendChild(script);
    });

    moduleLoads.set(key, promise);

    return promise;
  }

  async function ensureStaffModules(view) {
    if (view === 'today') {
      await loadScriptOnce(
        'staff-icecream.js?v=2'
      );
    }

    if (
      view === 'products' ||
      view === 'more'
    ) {
      await loadScriptOnce(
        'image-upload.js?v=2'
      );

      await loadScriptOnce(
        'staff-catalog.js?v=2'
      );
    }

    moveExistingModules();
  }

  function escapeHtml(value) {
    return String(value ?? '')
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function money(value) {
    const n = Number(value || 0);
    return `${n.toFixed(2).replace('.00', '')} zł`;
  }

  function statusLabel(status) {
    return {
      new: 'NOWE',
      accepted: 'PRZYJĘTE',
      preparing: 'PRZYGOTOWANIE',
      ready: 'GOTOWE',
      collected: 'WYDANE',
      cancelled: 'ANULOWANE',
      returned: 'ZWROT',
      refunded: 'REFUND'
    }[status] || status;
  }

  function formatTime(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString('pl-PL', { hour: '2-digit', minute: '2-digit' });
  }

  function formatDate(dateString) {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL', { day: '2-digit', month: '2-digit' });
  }

  function go(view) {
    currentView = view;
    document.querySelectorAll('[data-admin-view]').forEach(section => {
      section.classList.toggle('active', section.dataset.adminView === view);
    });
    document.querySelectorAll('#adminBottomNav [data-admin-go]').forEach(button => {
      button.classList.toggle('active', button.dataset.adminGo === view);
    });
    topSubtitle.textContent = {
      home: 'Najważniejsze rzeczy na dzisiaj',
      orders: 'Obsługa zamówień',
      today: 'Dzisiejsza dostępność',
      products: 'Katalog i ceny',
      more: 'Akcje i ustawienia'
    }[view] || 'Panel obsługi';
    window.scrollTo({ top: 0, behavior: 'instant' });

    ensureStaffModules(view).catch(error => {
      console.error(
        'STAFF MODULE LOAD ERROR:',
        error
      );
    });
  }

  document.querySelectorAll('[data-admin-go]').forEach(button => {
    button.addEventListener('click', () => go(button.dataset.adminGo));
  });

  moreBtn.addEventListener('click', () => go('more'));
  document.getElementById('goOrdersFromMore').addEventListener('click', () => {
    currentFilter = 'all';
    syncFilterButtons();
    renderOrders();
    go('orders');
  });

  document.querySelectorAll('[data-home-filter]').forEach(button => {
    button.addEventListener('click', () => {
      currentFilter = button.dataset.homeFilter;
      syncFilterButtons();
      renderOrders();
      go('orders');
    });
  });

  document.querySelectorAll('[data-order-filter]').forEach(button => {
    button.addEventListener('click', () => {
      currentFilter = button.dataset.orderFilter;
      syncFilterButtons();
      renderOrders();
    });
  });

  function syncFilterButtons() {
    document.querySelectorAll('[data-order-filter]').forEach(button => {
      button.classList.toggle('active', button.dataset.orderFilter === currentFilter);
    });
  }

  function showLogin() {
    loginPanel.classList.remove('hidden');
    recoveryPanel.classList.add('hidden');
    staffPanel.classList.add('hidden');
    bottomNav.classList.add('hidden');
    moreBtn.classList.add('hidden');
    topSubtitle.textContent = 'Panel obsługi';
    window.dispatchEvent(new CustomEvent('staff-access-changed', {
      detail: { authorized: false }
    }));
  }

  function showRecovery() {
    loginPanel.classList.add('hidden');
    staffPanel.classList.add('hidden');
    bottomNav.classList.add('hidden');
    moreBtn.classList.add('hidden');
    recoveryPanel.classList.remove('hidden');
    topSubtitle.textContent = 'Zmiana hasła';
  }

  function showStaff() {
    loginPanel.classList.add('hidden');
    recoveryPanel.classList.add('hidden');
    staffPanel.classList.remove('hidden');
    bottomNav.classList.remove('hidden');
    moreBtn.classList.remove('hidden');
    go('home');
    window.dispatchEvent(new CustomEvent('staff-access-changed', {
      detail: { authorized: true }
    }));
  }

  async function checkStaff() {
    const { data: sessionData } = await sb.auth.getSession();
    const session = sessionData?.session;

    if (!session) {
      if (recoveryFromUrl) showRecovery();
      else showLogin();
      return;
    }

    const { data, error } = await sb.rpc('is_staff');

    if (error || data !== true) {
      await sb.auth.signOut();
      showLogin();
      return;
    }

    showStaff();
    await loadOrders();
  }

  loginBtn.addEventListener('click', async () => {
    loginError.innerHTML = '';
    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    if (!email || !password) {
      loginError.innerHTML = '<div class="admin-error">Wpisz email i hasło.</div>';
      return;
    }

    loginBtn.disabled = true;
    loginBtn.textContent = 'Logowanie…';

    const { error } = await sb.auth.signInWithPassword({ email, password });

    loginBtn.disabled = false;
    loginBtn.textContent = 'Zaloguj';

    if (error) {
      loginError.innerHTML = '<div class="admin-error">Nieprawidłowy email lub hasło.</div>';
      return;
    }

    await checkStaff();
  });

  resetPasswordBtn.addEventListener('click', async () => {
    loginError.innerHTML = '';
    const email = document.getElementById('email').value.trim();

    if (!email) {
      loginError.innerHTML = '<div class="admin-error">Wpisz email.</div>';
      return;
    }

    const { error } = await sb.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/staff.html`
    });

    loginError.innerHTML = error
      ? '<div class="admin-error">Nie udało się wysłać wiadomości.</div>'
      : '<div class="notice">Sprawdź swoją skrzynkę email.</div>';
  });

  saveNewPasswordBtn.addEventListener('click', async () => {
    recoveryError.innerHTML = '';
    const password = document.getElementById('newPassword').value;
    const repeat = document.getElementById('newPasswordRepeat').value;

    if (password.length < 8) {
      recoveryError.innerHTML = '<div class="admin-error">Hasło musi mieć co najmniej 8 znaków.</div>';
      return;
    }

    if (password !== repeat) {
      recoveryError.innerHTML = '<div class="admin-error">Hasła nie są takie same.</div>';
      return;
    }

    saveNewPasswordBtn.disabled = true;
    saveNewPasswordBtn.textContent = 'Zapisywanie…';

    const { error } = await sb.auth.updateUser({ password });

    saveNewPasswordBtn.disabled = false;
    saveNewPasswordBtn.textContent = 'Zapisz nowe hasło';

    if (error) {
      recoveryError.innerHTML = '<div class="admin-error">Nie udało się zmienić hasła.</div>';
      return;
    }

    await sb.auth.signOut();
    window.history.replaceState({}, document.title, window.location.pathname);
    showLogin();
  });

  logoutBtn.addEventListener('click', async () => {
    await sb.auth.signOut();
    showLogin();
  });

  sb.auth.onAuthStateChange(event => {
    if (event === 'PASSWORD_RECOVERY') showRecovery();
    if (event === 'SIGNED_OUT' && !recoveryFromUrl) showLogin();
  });

  const ACTIVE_STATUSES = new Set(['new', 'accepted', 'preparing', 'ready']);
  const HISTORY_STATUSES = new Set(['collected', 'cancelled', 'returned', 'refunded']);

  function isStaleActive(order) {
    if (!ACTIVE_STATUSES.has(order?.status) || !order?.created_at) return false;
    const created = new Date(order.created_at).getTime();
    return Number.isFinite(created) && Date.now() - created > 24 * 60 * 60 * 1000;
  }

  function nextAction(status) {
    return {
      new: ['accepted', '✓ Przyjmij'],
      accepted: ['preparing', '👩‍🍳 Robimy'],
      preparing: ['ready', '✅ Gotowe'],
      ready: ['collected', '🛍️ Wydane']
    }[status] || null;
  }

  function filterOrders(list) {
    if (currentFilter === 'all') return list.filter(order => HISTORY_STATUSES.has(order.status));
    if (currentFilter === 'new') return list.filter(order => order.status === 'new');
    if (currentFilter === 'ready') return list.filter(order => order.status === 'ready');
    if (currentFilter === 'preparing') {
      return list.filter(order => ['accepted', 'preparing'].includes(order.status));
    }
    return list.filter(order => !['collected', 'cancelled'].includes(order.status));
  }

  async function loadOrders() {
    ordersBox.innerHTML = '<div class="empty">Ładowanie…</div>';

    const { data, error } = await sb.rpc('staff_list_orders');

    if (error) {
      console.error(error);
      ordersBox.innerHTML = '<div class="admin-error">Nie udało się pobrać zamówień.</div>';
      return;
    }

    allOrders = Array.isArray(data) ? data : [];
    detectNewOrderSound();
    updateCounters();
    updateHomeAttention();
    renderOrders();
  }

  function detectNewOrderSound() {
    const ids = new Set(
      allOrders.filter(order => order.status === 'new').map(order => String(order.id))
    );

    if (
      lastKnownNewIds.size &&
      [...ids].some(id => !lastKnownNewIds.has(id))
    ) {
      playNotification();
    }

    lastKnownNewIds = ids;
  }

  function updateCounters() {
    const newCount = allOrders.filter(order => order.status === 'new').length;
    const preparingCount = allOrders.filter(order =>
      ['accepted', 'preparing'].includes(order.status)
    ).length;
    const readyCount = allOrders.filter(order => order.status === 'ready').length;

    document.getElementById('kpiNew').textContent = newCount;
    document.getElementById('kpiPreparing').textContent = preparingCount;
    document.getElementById('kpiReady').textContent = readyCount;
    document.getElementById('filterNewCount').textContent = newCount;
    document.getElementById('filterReadyCount').textContent = readyCount;
  }

  function orderItemsHtml(order) {
    const items = Array.isArray(order.items) ? order.items : [];

    if (!items.length) {
      return '<div class="muted">Brak pozycji</div>';
    }

    return items.map(item => {
      const name = item.name || item.product_name || 'Produkt';
      const qty = item.quantity || item.qty || 1;
      const price = item.unit_price || item.price || 0;
      return `
        <div class="item">
          <div><b>${escapeHtml(name)}</b> × ${escapeHtml(qty)}</div>
          <b>${money(Number(price) * Number(qty))}</b>
        </div>
      `;
    }).join('');
  }

  function orderCardHtml(order) {
    const active = ACTIVE_STATUSES.has(order.status);
    const stale = isStaleActive(order);
    const next = nextAction(order.status);
    const showEstimate = ['new', 'accepted', 'preparing'].includes(order.status);

    const controls = active ? `
        <div class="controls">
          ${showEstimate ? `
          <div class="time-row">
            <b>Czas:</b>
            ${[10, 15, 20, 30].map(minutes => `
              <button type="button" data-minutes="${minutes}">${minutes} min</button>
            `).join('')}
          </div>` : ''}

          ${next ? `
          <div class="status-buttons">
            <button type="button" data-next="${next[0]}">${next[1]}</button>
          </div>` : ''}
        </div>
    ` : '';

    return `
      <article class="order-card${stale ? ' is-stale' : ''}" data-order-id="${escapeHtml(order.id)}" data-status="${escapeHtml(order.status)}">
        <div class="order-head">
          <div>
            <div class="order-number">#${escapeHtml(order.order_number)}</div>
            <div class="status">${escapeHtml(statusLabel(order.status))}</div>
            ${stale ? '<div class="stale-badge">⚠ STARE AKTYWNE ZAMÓWIENIE</div>' : ''}
            <div class="muted">
              ${formatDate(order.created_at)} • ${formatTime(order.created_at)}
            </div>
          </div>
          <div class="order-total">${money(order.total)}</div>
        </div>

        <div class="items">${orderItemsHtml(order)}</div>

        ${active ? `
        <div class="muted">
          ⏱️ Czas: <b>${escapeHtml(order.estimated_minutes)} min</b>
        </div>` : ''}

        ${controls}
      </article>
    `;
  }

  function renderOrders() {
    const list = filterOrders(allOrders);

    if (!list.length) {
      ordersBox.innerHTML = '<div class="empty">Brak zamówień.</div>';
      return;
    }

    ordersBox.innerHTML = list.map(orderCardHtml).join('');
    attachOrderButtons(ordersBox);
  }

  function updateHomeAttention() {
    const active = allOrders.filter(order => ACTIVE_STATUSES.has(order.status));
    const fresh = active.filter(order => !isStaleActive(order));
    const pool = fresh.length ? fresh : active;

    const attention =
      pool.find(order => order.status === 'new') ||
      pool.find(order => order.status === 'ready') ||
      pool.find(order => ['accepted', 'preparing'].includes(order.status));

    const staleCount = active.filter(isStaleActive).length;
    const staleNotice = staleCount
      ? `<div class="admin-stale-summary">⚠ ${staleCount} stare aktywne ${staleCount === 1 ? 'zamówienie' : 'zamówienia'} — sprawdź i zamknij status.</div>`
      : '';

    if (!attention) {
      attentionBox.innerHTML = `${staleNotice}<div class="empty">Nic pilnego. ✓</div>`;
      return;
    }

    attentionBox.innerHTML = `${staleNotice}${orderCardHtml(attention)}`;
    const card = attentionBox.querySelector('.order-card');
    card?.addEventListener('click', event => {
      if (event.target.closest('button')) return;
      currentFilter = 'active';
      syncFilterButtons();
      renderOrders();
      go('orders');
    });
  }

  function attachOrderButtons(root) {
    root.querySelectorAll('.order-card').forEach(card => {
      const orderId = Number(card.dataset.orderId);

      card.querySelectorAll('[data-next]').forEach(button => {
        button.addEventListener('click', async () => {
          await updateOrder(orderId, button.dataset.next, null, button);
        });
      });

      card.querySelectorAll('[data-minutes]').forEach(button => {
        button.addEventListener('click', async () => {
          await updateOrder(orderId, null, Number(button.dataset.minutes), button);
        });
      });
    });
  }

  async function updateOrder(orderId, status, minutes, button) {
    if (button) {
      button.disabled = true;
      button.dataset.oldText = button.textContent;
      button.textContent = '…';
    }

    const { error } = await sb.rpc('staff_update_order', {
      p_order_id: orderId,
      p_status: status,
      p_estimated_minutes: minutes
    });

    if (error) {
      console.error(error);
      if (button) {
        button.disabled = false;
        button.textContent = button.dataset.oldText || 'Spróbuj ponownie';
      }
      alert('Nie udało się zaktualizować zamówienia.');
      return;
    }

    await loadOrders();
  }

  function playNotification() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;

      const ctx = new AudioContext();
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();

      oscillator.frequency.value = 880;
      gain.gain.value = 0.12;
      oscillator.connect(gain);
      gain.connect(ctx.destination);
      oscillator.start();

      setTimeout(() => {
        oscillator.stop();
        ctx.close();
      }, 250);
    } catch (_) {
      // Sound is optional.
    }
  }

  refreshBtn.addEventListener('click', loadOrders);
  homeRefreshBtn.addEventListener('click', loadOrders);

  function moveExistingModules() {
    const ice = document.getElementById('slIceCreamPanel');
    const catalog = document.getElementById('slCatalogPanel');
    const todaySlot = document.getElementById('staffTodaySlot');
    const productsSlot = document.getElementById('staffProductsSlot');
    const announcementsSlot = document.getElementById('staffAnnouncementsSlot');

    if (ice && ice.parentElement !== todaySlot) {
      todaySlot.appendChild(ice);
    }

    if (catalog && catalog.parentElement !== productsSlot) {
      productsSlot.appendChild(catalog);
    }

    const announcements = catalog?.querySelector('.sl-cat-announcements-section');
    if (announcements && announcements.parentElement !== announcementsSlot) {
      announcementsSlot.appendChild(announcements);
    }

    updateTodaySummary();
  }

  function updateTodaySummary() {
    const summary = document.getElementById('homeTodaySummary');
    const cards = [...document.querySelectorAll('#staffTodaySlot .sl-ice-card')];

    if (!cards.length) {
      summary.textContent = 'Dzisiaj: sprawdź dostępne smaki.';
      return;
    }

    const visible = cards.filter(card => card.classList.contains('active')).length;
    summary.textContent = `☀️ Dzisiaj: ${visible} smaków lodów widocznych dla klientów.`;
  }

  const moduleObserver = new MutationObserver(() => {
    moveExistingModules();
  });

  moduleObserver.observe(staffPanel, { childList: true, subtree: true });

  setInterval(async () => {
    const { data } = await sb.auth.getSession();
    if (data?.session && !staffPanel.classList.contains('hidden')) {
      await loadOrders();
      moveExistingModules();
    }
  }, 15000);

  moveExistingModules();

  async function registerStaffServiceWorker() {
    if (!('serviceWorker' in navigator)) return;
    try {
      const registration = await navigator.serviceWorker.register('sw.js', {
        updateViaCache: 'none'
      });
      await registration.update();
    } catch (error) {
      console.warn('Staff service worker unavailable:', error);
    }
  }

  checkStaff().finally(() => {
    const scheduleServiceWorkerUpdate =
      () => registerStaffServiceWorker();

    if ('requestIdleCallback' in window) {
      window.requestIdleCallback(
        scheduleServiceWorkerUpdate,
        { timeout: 5000 }
      );
    } else {
      setTimeout(
        scheduleServiceWorkerUpdate,
        2500
      );
    }
  });
})();
