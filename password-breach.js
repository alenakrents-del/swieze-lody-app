(function installPasswordBreachProtection(global) {
  const RANGE_ENDPOINT = 'https://api.pwnedpasswords.com/range/';
  const rangeCache = new Map();

  function protectionError(code, message, cause) {
    const error = new Error(message, cause ? { cause } : undefined);
    error.code = code;
    return error;
  }

  async function sha1Hex(password, subtle) {
    if (!subtle?.digest) {
      throw protectionError(
        'password_check_unavailable',
        'Nie udało się sprawdzić bezpieczeństwa hasła. Spróbuj ponownie.'
      );
    }

    const digest = await subtle.digest(
      'SHA-1',
      new TextEncoder().encode(password)
    );

    return Array.from(new Uint8Array(digest), byte =>
      byte.toString(16).padStart(2, '0')
    ).join('').toUpperCase();
  }

  async function fetchRange(prefix, fetchImpl, useCache) {
    if (useCache && rangeCache.has(prefix)) {
      return rangeCache.get(prefix);
    }

    const request = fetchImpl(`${RANGE_ENDPOINT}${prefix}`, {
      method: 'GET',
      headers: { 'Add-Padding': 'true' },
      cache: 'no-store',
      credentials: 'omit',
      referrerPolicy: 'no-referrer'
    }).then(async response => {
      if (!response.ok) {
        throw new Error(`Pwned Passwords returned ${response.status}`);
      }

      return response.text();
    });

    if (useCache) rangeCache.set(prefix, request);

    try {
      return await request;
    } catch (error) {
      rangeCache.delete(prefix);
      throw error;
    }
  }

  async function check(password, options = {}) {
    if (typeof password !== 'string' || password.length === 0) {
      throw new TypeError('Password must be a non-empty string.');
    }

    const fetchImpl = options.fetchImpl || global.fetch;
    const subtle = options.subtle || global.crypto?.subtle;

    if (typeof fetchImpl !== 'function') {
      throw protectionError(
        'password_check_unavailable',
        'Nie udało się sprawdzić bezpieczeństwa hasła. Spróbuj ponownie.'
      );
    }

    const hash = await sha1Hex(password, subtle);
    const prefix = hash.slice(0, 5);
    const suffix = hash.slice(5);

    let body;
    try {
      body = await fetchRange(prefix, fetchImpl, options.cache !== false);
    } catch (cause) {
      throw protectionError(
        'password_check_unavailable',
        'Nie udało się sprawdzić bezpieczeństwa hasła. Spróbuj ponownie.',
        cause
      );
    }

    const match = body
      .split(/\r?\n/)
      .map(line => line.trim().split(':'))
      .find(([candidate, count]) =>
        candidate?.toUpperCase() === suffix && Number(count) > 0
      );

    return {
      compromised: Boolean(match),
      count: match ? Number(match[1]) : 0
    };
  }

  async function assertSafe(password, options) {
    const result = await check(password, options);

    if (result.compromised) {
      throw protectionError(
        'password_compromised',
        'To hasło wystąpiło w wycieku danych. Wybierz inne, unikalne hasło.'
      );
    }

    return result;
  }

  global.SwiezePasswordProtection = Object.freeze({ check, assertSafe });
})(globalThis);
