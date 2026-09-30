import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';

const source = await readFile(
  new URL('../supabase-staff-lite.js', import.meta.url),
  'utf8'
);

function createHarness(responses = []) {
  const values = new Map();
  const requests = [];
  const fetch = async (url, options = {}) => {
    requests.push({ url, options });
    const response = responses.shift() || {
      status: 200,
      body: { Key: 'menu-images/products/example.jpg' }
    };
    return {
      ok: response.status >= 200 && response.status < 300,
      status: response.status,
      async text() {
        return JSON.stringify(response.body);
      }
    };
  };

  const window = {
    location: {
      hash: '',
      origin: 'https://example.test'
    }
  };

  const context = {
    window,
    localStorage: {
      getItem(key) { return values.get(key) || null; },
      setItem(key, value) { values.set(key, value); },
      removeItem(key) { values.delete(key); }
    },
    fetch,
    URLSearchParams,
    Blob,
    atob,
    queueMicrotask,
    console,
    setTimeout,
    clearTimeout
  };
  vm.runInNewContext(source, context);
  values.set('staff-test-auth', JSON.stringify({
    access_token: 'staff-token',
    refresh_token: 'refresh-token',
    expires_at: Math.floor(Date.now() / 1000) + 3600
  }));

  const client = window.supabase.createClient(
    'https://project.supabase.co',
    'publishable-key',
    { auth: { storageKey: 'staff-test-auth' } }
  );
  return { client, requests };
}

test('storage upload sends the blob with staff authorization', async () => {
  const { client, requests } = createHarness();
  const blob = new Blob(['image'], { type: 'image/jpeg' });

  const result = await client.storage
    .from('menu-images')
    .upload('products/2026/09/a b.jpg', blob, {
      contentType: 'image/jpeg',
      cacheControl: '3600',
      upsert: false
    });

  assert.equal(result.error, null);
  assert.equal(
    requests[0].url,
    'https://project.supabase.co/storage/v1/object/menu-images/products/2026/09/a%20b.jpg'
  );
  assert.equal(requests[0].options.method, 'POST');
  assert.equal(requests[0].options.body, blob);
  assert.equal(requests[0].options.headers.Authorization, 'Bearer staff-token');
  assert.equal(requests[0].options.headers['Content-Type'], 'image/jpeg');
  assert.equal(requests[0].options.headers['cache-control'], 'max-age=3600');
  assert.equal(requests[0].options.headers['x-upsert'], 'false');
});

test('storage getPublicUrl returns the public object URL synchronously', () => {
  const { client } = createHarness();
  const { data } = client.storage
    .from('menu-images')
    .getPublicUrl('products/2026/09/a b.jpg');

  assert.equal(
    data.publicUrl,
    'https://project.supabase.co/storage/v1/object/public/menu-images/products/2026/09/a%20b.jpg'
  );
});

test('storage remove sends the expected prefixes payload', async () => {
  const { client, requests } = createHarness([
    { status: 200, body: [{ name: 'products/2026/09/example.jpg' }] }
  ]);

  const result = await client.storage
    .from('menu-images')
    .remove(['products/2026/09/example.jpg']);

  assert.equal(result.error, null);
  assert.equal(
    requests[0].url,
    'https://project.supabase.co/storage/v1/object/menu-images'
  );
  assert.equal(requests[0].options.method, 'DELETE');
  assert.deepEqual(
    JSON.parse(requests[0].options.body),
    { prefixes: ['products/2026/09/example.jpg'] }
  );
});

test('storage returns Supabase errors without throwing', async () => {
  const { client } = createHarness([
    { status: 403, body: { message: 'Not authorized' } }
  ]);

  const result = await client.storage
    .from('menu-images')
    .remove(['products/2026/09/example.jpg']);

  assert.equal(result.data, null);
  assert.equal(result.error.status, 403);
  assert.equal(result.error.message, 'Not authorized');
});

test('storage refreshes an expired authorization response once', async () => {
  const { client, requests } = createHarness([
    { status: 401, body: { message: 'JWT expired' } },
    {
      status: 200,
      body: {
        access_token: 'fresh-token',
        refresh_token: 'fresh-refresh-token',
        expires_in: 3600
      }
    },
    { status: 200, body: { Key: 'menu-images/products/example.jpg' } }
  ]);
  const blob = new Blob(['image'], { type: 'image/jpeg' });

  const result = await client.storage
    .from('menu-images')
    .upload('products/2026/09/example.jpg', blob);

  assert.equal(result.error, null);
  assert.equal(requests.length, 3);
  assert.match(requests[1].url, /grant_type=refresh_token/);
  assert.equal(requests[2].options.headers.Authorization, 'Bearer fresh-token');
  assert.equal(requests[2].options.body, blob);
});
