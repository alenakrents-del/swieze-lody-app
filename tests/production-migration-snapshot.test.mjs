import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const productionChanges = {
  '20260930125001_revoke_unnecessary_public_execute.sql':
    '2baadb6ccddeb908a20b1eaa48c33069',
  '20260930125137_auto_cancel_stale_pickup_orders_on_staff_load.sql':
    'f3fa754c63351f759a0873e2ce24c4c6',
  '20260930125315_rate_limit_public_order_creation_by_ip.sql':
    '058d74b9159e7c8e300de0f243402cf2',
  '20260930125720_fix_staff_list_orders_stale_alias.sql':
    'db7df64b5924156f0716df7ba7b9b978'
};

const normalizedMd5 = source =>
  createHash('md5')
    .update(source.replace(/\s/g, ''))
    .digest('hex');

for (const [filename, expected] of Object.entries(productionChanges)) {
  test(`production snapshot matches ${filename}`, async () => {
    const source = await readFile(
      new URL(`../supabase/migrations/${filename}`, import.meta.url),
      'utf8'
    );
    assert.equal(normalizedMd5(source), expected);
  });
}
