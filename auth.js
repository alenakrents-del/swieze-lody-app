// ===============================
// ŚWIEŻE LODY — CUSTOMER AUTH
// ===============================

// Используем уже подключённый Supabase-клиент из app.js
const customerAuth = sb;


// -------------------------------
// Телефон -> технический email
// Клиент этот email никогда не видит
// -------------------------------
function phoneToTechnicalEmail(phone) {
  const digits = String(phone || '').replace(/\D/g, '');

  if (digits.length < 8 || digits.length > 15) {
    throw new Error('Podaj prawidłowy numer telefonu.');
  }

  return `phone.${digits}@auth.swieze-lody.app`;
}


// -------------------------------
// Нормализация телефона
// Польский номер без + автоматически получает +48
// -------------------------------
function normalizeCustomerPhone(phone) {
  let value = String(phone || '')
    .trim()
    .replace(/[()\s-]/g, '');

  if (value.startsWith('00')) {
    value = '+' + value.slice(2);
  }

  // Например: 501234567 -> +48501234567
  if (/^\d{9}$/.test(value)) {
    value = '+48' + value;
  }

  if (!value.startsWith('+')) {
    value = '+' + value;
  }

  if (!/^\+[1-9]\d{7,14}$/.test(value)) {
    throw new Error('Podaj numer telefonu z kodem kraju, np. +48 501 234 567.');
  }

  return value;
}


// -------------------------------
// Проверка данных
// -------------------------------
function validateCustomerAuth(name, phone, password) {
  const cleanName = String(name || '').trim();

  if (cleanName.length < 2) {
    throw new Error('Wpisz imię lub nick.');
  }

  const cleanPhone = normalizeCustomerPhone(phone);

  if (!password || password.length < 6) {
    throw new Error('Hasło musi mieć co najmniej 6 znaków.');
  }

  return {
    name: cleanName,
    phone: cleanPhone,
    password
  };
}


// -------------------------------
// Создать / обновить запись customers
// -------------------------------
async function ensureCustomerProfile(name, phone) {
  const { data, error } = await customerAuth.rpc(
    'ensure_my_customer_profile',
    {
      p_name: name,
      p_phone: phone
    }
  );

  if (error) {
    console.error('ensureCustomerProfile error:', error);
    throw error;
  }

  return data;
}


// -------------------------------
// РЕГИСТРАЦИЯ
// -------------------------------
function notifyCustomerAuthChanged(event, session) {
  window.dispatchEvent(
    new CustomEvent('customer-auth-changed', {
      detail: {
        event,
        session
      }
    })
  );
}

async function registerCustomer(name, phone, password) {
  const input = validateCustomerAuth(name, phone, password);

  const technicalEmail = phoneToTechnicalEmail(input.phone);

  const { data, error } = await customerAuth.auth.signUp({
    email: technicalEmail,
    password: input.password,
    options: {
      data: {
        name: input.name,
        phone: input.phone
      }
    }
  });

  if (error) {
    console.error('registerCustomer error:', error);

    if (
      String(error.message || '')
        .toLowerCase()
        .includes('already registered')
    ) {
      throw new Error(
        'Ten numer telefonu jest już zarejestrowany. Spróbuj się zalogować.'
      );
    }

    throw error;
  }

  if (!data.session) {
    throw new Error(
      'Konto zostało utworzone, ale nie udało się rozpocząć sesji.'
    );
  }

  await ensureCustomerProfile(input.name, input.phone);
  notifyCustomerAuthChanged('PROFILE_READY', data.session);

  return data;
}


// -------------------------------
// ВХОД
// -------------------------------
async function loginCustomer(phone, password) {
  const normalizedPhone = normalizeCustomerPhone(phone);
  const technicalEmail = phoneToTechnicalEmail(normalizedPhone);

  const { data, error } =
    await customerAuth.auth.signInWithPassword({
      email: technicalEmail,
      password
    });

  if (error) {
    console.error('loginCustomer error:', error);
    throw new Error('Nieprawidłowy numer telefonu lub hasło.');
  }

  return data;
}


// -------------------------------
// ВЫХОД
// -------------------------------
async function logoutCustomer() {
  const { error } = await customerAuth.auth.signOut();

  if (error) {
    console.error('logoutCustomer error:', error);
    throw error;
  }

  return true;
}


// -------------------------------
// ТЕКУЩАЯ СЕССИЯ
// -------------------------------
async function getCustomerSession() {
  const {
    data: { session },
    error
  } = await customerAuth.auth.getSession();

  if (error) {
    console.error('getCustomerSession error:', error);
    return null;
  }

  return session;
}


// -------------------------------
// ПРОФИЛЬ ТЕКУЩЕГО КЛИЕНТА
// -------------------------------
async function getMyCustomerProfile() {
  const session = await getCustomerSession();

  if (!session?.user) {
    return null;
  }

  const { data, error } = await customerAuth
    .from('customers')
    .select(
      'id, auth_user_id, name, phone, qr_token, points_balance, created_at'
    )
    .eq('auth_user_id', session.user.id)
    .maybeSingle();

  if (error) {
    console.error('getMyCustomerProfile error:', error);
    return null;
  }

  return data;
}


// -------------------------------
// Следить за входом / выходом
// -------------------------------
customerAuth.auth.onAuthStateChange((event, session) => {
  console.log(
    'Customer auth:',
    event,
    session?.user?.id || 'no user'
  );

  notifyCustomerAuthChanged(event, session);
});


// -------------------------------
// Делаем функции доступными приложению
// -------------------------------
window.customerAuth = {
  register: registerCustomer,
  login: loginCustomer,
  logout: logoutCustomer,
  getSession: getCustomerSession,
  getProfile: getMyCustomerProfile,
  normalizePhone: normalizeCustomerPhone
};
// ===============================
// PROFILE UI
// ===============================

async function refreshCustomerProfileUI() {
  const guest = document.getElementById('authGuest');
  const profileBox = document.getElementById('authProfile');

  if (!guest || !profileBox) return;

  const session = await window.customerAuth.getSession();

  if (!session) {
    guest.hidden = false;
    profileBox.hidden = true;
    return;
  }

  const profile = await window.customerAuth.getProfile();

  if (!profile) {
    guest.hidden = false;
    profileBox.hidden = true;
    return;
  }

  guest.hidden = true;
  profileBox.hidden = false;

  document.getElementById('customerProfileName').textContent =
    profile.name || 'Klient';

  document.getElementById('customerQrToken').textContent =
    String(profile.qr_token || '').slice(0, 8).toUpperCase();

  document.getElementById('customerPoints').textContent =
    Number(profile.points_balance || 0);
}


const registerBtn = document.getElementById('authRegister');
const loginBtn = document.getElementById('authLogin');
const logoutBtn = document.getElementById('authLogout');
const authMessage = document.getElementById('authMessage');


if (registerBtn) {
  registerBtn.addEventListener('click', async () => {
    const name = document.getElementById('authName').value;
    const phone = document.getElementById('authPhone').value;
    const password = document.getElementById('authPassword').value;

    authMessage.textContent = 'Tworzenie konta...';

    try {
      await window.customerAuth.register(
        name,
        phone,
        password
      );

      authMessage.textContent = '';
      await refreshCustomerProfileUI();

    } catch (error) {
      authMessage.textContent =
        error?.message || 'Nie udało się utworzyć konta.';
    }
  });
}


if (loginBtn) {
  loginBtn.addEventListener('click', async () => {
    const phone = document.getElementById('authPhone').value;
    const password = document.getElementById('authPassword').value;

    authMessage.textContent = 'Logowanie...';

    try {
      await window.customerAuth.login(
        phone,
        password
      );

      authMessage.textContent = '';
      await refreshCustomerProfileUI();

    } catch (error) {
      authMessage.textContent =
        error?.message || 'Nie udało się zalogować.';
    }
  });
}


if (logoutBtn) {
  logoutBtn.addEventListener('click', async () => {
    try {
      await window.customerAuth.logout();
      await refreshCustomerProfileUI();
    } catch (error) {
      console.error(error);
    }
  });
}


window.addEventListener(
  'customer-auth-changed',
  refreshCustomerProfileUI
);


refreshCustomerProfileUI();

// ===============================
// MY ORDERS UI
// ===============================

async function refreshCustomerOrdersUI() {
  const profileBox =
    document.getElementById('authProfile');

  if (!profileBox) return;

  const session =
    await window.customerAuth.getSession();

  let section =
    document.getElementById('customerOrders');

  if (!session) {
    if (section) {
      section.remove();
    }
    return;
  }

  if (!section) {
    section = document.createElement('div');
    section.id = 'customerOrders';

    section.style.marginTop = '22px';
    section.style.textAlign = 'left';

    const logoutButton =
      document.getElementById('authLogout');

    profileBox.insertBefore(
      section,
      logoutButton
    );
  }

  section.innerHTML = `
    <h3 style="
      margin:0 0 12px;
      font-size:20px;
    ">
      🧾 Moje zamówienia
    </h3>

    <div
      id="customerOrdersList"
      style="
        display:grid;
        gap:10px;
      "
    >
      Ładowanie…
    </div>
  `;

  const list =
    document.getElementById(
      'customerOrdersList'
    );

  const { data, error } =
    await sb.rpc('get_my_orders');

  if (error) {
    console.error(
      'get_my_orders error:',
      error
    );

    list.textContent =
      'Nie udało się pobrać zamówień.';
    return;
  }

  if (!data || !data.length) {
    list.textContent =
      'Nie masz jeszcze zamówień.';
    return;
  }

  const statusNames = {
    new: 'Nowe',
    accepted: 'Przyjęte',
    preparing: 'W przygotowaniu',
    ready: 'Gotowe do odbioru',
    collected: 'Odebrane',
    cancelled: 'Anulowane'
  };

  data.forEach(order => {
    const card =
      document.createElement('div');

    card.style.padding = '14px';
    card.style.border =
      '1px solid #e5e5e5';
    card.style.borderRadius = '16px';
    card.style.background = '#fff';

    const top =
      document.createElement('div');

    top.style.display = 'flex';
    top.style.justifyContent =
      'space-between';
    top.style.gap = '12px';
    top.style.fontWeight = '800';

    const number =
      document.createElement('span');

    number.textContent =
      `Zamówienie #${order.order_number}`;

    const total =
      document.createElement('span');

    total.textContent =
      `${Number(order.total || 0)} zł`;

    top.appendChild(number);
    top.appendChild(total);

    const status =
      document.createElement('div');

    status.style.marginTop = '7px';
    status.style.fontWeight = '700';

    status.textContent =
      statusNames[order.status] ||
      order.status;

    const date =
      document.createElement('div');

    date.style.marginTop = '5px';
    date.style.fontSize = '13px';
    date.style.color = '#777';

    date.textContent =
      new Date(
        order.created_at
      ).toLocaleString('pl-PL');

    const items =
      document.createElement('div');

    items.style.marginTop = '10px';
    items.style.fontSize = '14px';

    (order.items || []).forEach(item => {
      const row =
        document.createElement('div');

      row.textContent =
        `${item.quantity} × ${item.name}`;

      items.appendChild(row);
    });

    card.appendChild(top);
    card.appendChild(status);
    card.appendChild(date);
    card.appendChild(items);

    list.appendChild(card);
  });
}


window.addEventListener(
  'customer-auth-changed',
  refreshCustomerOrdersUI
);


document
  .querySelectorAll(
    '[data-page="profile"]'
  )
  .forEach(button => {
    button.addEventListener(
      'click',
      refreshCustomerOrdersUI
    );
  });


refreshCustomerOrdersUI();
