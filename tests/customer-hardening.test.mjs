import assert from 'node:assert/strict';
import {readFile} from 'node:fs/promises';
import test from 'node:test';

const root=new URL('../',import.meta.url);
const read=path=>readFile(new URL(path,root),'utf8');

test('customer shortcut excludes all terminal order statuses',async()=>{
  const source=await read('customer-v3.js');
  assert.match(source,/const terminalStatuses = \[\s*'collected',\s*'cancelled',\s*'returned',\s*'refunded'\s*\]/);
  assert.match(source,/!terminalStatuses\.includes\(order\.status\)/);
});

test('order status provides returned and refunded copy in every language',async()=>{
  const source=await read('order-status.js');
  for(const value of ['Zwrócone','Zrefundowane','Zurückgegeben','Erstattet','Returned','Refunded','Vráceno','Refundováno']){
    assert.ok(source.includes(value),`missing localized order status: ${value}`);
  }
  assert.match(source,/data-terminal-status="\$\{order\.status\}"/);
});

test('background polling skips hidden documents and terminal orders without disabling future ticks',async()=>{
  const source=await read('order-status.js');
  const polling=source.slice(source.lastIndexOf('setInterval('));
  assert.match(polling,/if \(document\.hidden\) \{\s*return;/);
  assert.match(polling,/isTerminalStatus\(lastOrder\.status\)/);
  assert.ok(polling.indexOf('isTerminalStatus(lastOrder.status)')<polling.indexOf("sb.rpc("),'terminal guard must run before RPC');
  assert.doesNotMatch(polling,/clearInterval/);
});

test('customer app uses the pinned local Supabase bundle offline',async()=>{
  const [html,sw]=await Promise.all([read('index.html'),read('sw.js')]);
  assert.match(html,/<script src="\/vendor\/supabase\.min\.js"><\/script>/);
  assert.match(sw,/'\/vendor\/supabase\.min\.js'/);
  assert.doesNotMatch(html+sw,/cdn\.jsdelivr\.net\/npm\/@supabase\/supabase-js/);
  assert.match(sw,/CACHE_PREFIX}v39/);
});
