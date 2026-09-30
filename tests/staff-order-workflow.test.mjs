import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import vm from 'node:vm';

const source = await readFile(
  new URL('../staff-order-workflow.js', import.meta.url),
  'utf8'
);

const context = { window: {} };
vm.runInNewContext(source, context);
const workflow = context.window.StaffOrderWorkflow;

const orders = [
  'new',
  'accepted',
  'preparing',
  'ready',
  'collected',
  'cancelled',
  'returned',
  'refunded'
].map((status, index) => ({ id: index + 1, status }));

test('active filter excludes every terminal status', () => {
  assert.deepEqual(
    workflow.filterOrders(orders, 'active').map(order => order.status),
    ['new', 'accepted', 'preparing', 'ready']
  );
});

test('history filter includes cancelled, returned, and refunded orders', () => {
  assert.deepEqual(
    workflow.filterOrders(orders, 'all').map(order => order.status),
    ['collected', 'cancelled', 'returned', 'refunded']
  );
});

test('history workflow supports return and refund transitions', () => {
  assert.deepEqual(
    Array.from(workflow.historyAction('collected')),
    ['returned', '↩ Oznacz zwrot']
  );
  assert.deepEqual(
    Array.from(workflow.historyAction('returned')),
    ['refunded', '💳 Oznacz refundację']
  );
  assert.equal(workflow.historyAction('refunded'), null);
});
