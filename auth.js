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

  window.dispatchEvent(
    new CustomEvent('customer-auth-changed', {
      detail: {
        event,
        session
      }
    })
  );
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
