import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [staffHtml, serviceWorker, staffScript] = await Promise.all([
  readFile(new URL('../staff.html', import.meta.url), 'utf8'),
  readFile(new URL('../sw.js', import.meta.url), 'utf8'),
  readFile(new URL('../staff-v4.js', import.meta.url), 'utf8')
]);

test('staff boots without a focus-stealing reload and unregisters the customer worker', () => {
  assert.match(staffHtml, /await boot\(\);\s+await isolateFromCustomerWorker\(\);/);
  assert.match(staffHtml, /registration\.unregister\(\)/);
  assert.doesNotMatch(staffHtml, /location\.reload\(\)/);
});

test('staff login controls stay native and editable', () => {
  assert.match(staffHtml, /<input id="email" type="email" autocomplete="username">/);
  assert.match(staffHtml, /<input id="password" type="password" autocomplete="current-password">/);
  assert.match(staffHtml, /<button id="loginBtn"[^>]+type="button">Zaloguj<\/button>/);
  assert.doesNotMatch(staffHtml, /<(?:input|button)[^>]+(?:disabled|readonly)/);
});

test('customer worker bypasses staff requests', () => {
  assert.match(serviceWorker, /requestUrl\.pathname\.startsWith\('\/staff'\)/);
  assert.match(serviceWorker, /'\/image-upload\.js'/);
  assert.match(serviceWorker, /'\/supabase-staff-lite\.js'/);
});

test('staff code never registers the customer worker', () => {
  assert.doesNotMatch(staffScript, /serviceWorker\.register/);
});
