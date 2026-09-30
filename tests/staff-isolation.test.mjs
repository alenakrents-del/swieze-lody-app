import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const [staffHtml, serviceWorker, staffScript] = await Promise.all([
  readFile(new URL('../staff.html', import.meta.url), 'utf8'),
  readFile(new URL('../sw.js', import.meta.url), 'utf8'),
  readFile(new URL('../staff-v4.js', import.meta.url), 'utf8')
]);

test('staff unregisters the customer root worker before booting', () => {
  assert.match(staffHtml, /await isolateFromCustomerWorker\(\);\s+await boot\(\);/);
  assert.match(staffHtml, /registration\.unregister\(\)/);
});

test('customer worker bypasses staff requests', () => {
  assert.match(serviceWorker, /requestUrl\.pathname\.startsWith\('\/staff'\)/);
  assert.match(serviceWorker, /'\/image-upload\.js'/);
  assert.match(serviceWorker, /'\/supabase-staff-lite\.js'/);
});

test('staff code never registers the customer worker', () => {
  assert.doesNotMatch(staffScript, /serviceWorker\.register/);
});
