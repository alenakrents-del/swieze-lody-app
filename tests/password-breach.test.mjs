import assert from 'node:assert/strict';
import {webcrypto} from 'node:crypto';
import test from 'node:test';

await import('../password-breach.js');

const protection=globalThis.SwiezePasswordProtection;
const suffixForPassword='1E4C9B93F3F0682250B6CF8331B7EE68FD8';

test('checks only the five-character SHA-1 prefix with padded k-anonymity',async()=>{
  const requests=[];
  const result=await protection.check('password',{
    subtle:webcrypto.subtle,
    cache:false,
    fetchImpl:async(url,options)=>{
      requests.push({url,options});
      return new Response(`${suffixForPassword}:3303003\r\n${'0'.repeat(35)}:0\r\n`);
    }
  });

  assert.deepEqual(result,{compromised:true,count:3303003});
  assert.equal(requests[0].url,'https://api.pwnedpasswords.com/range/5BAA6');
  assert.equal(requests[0].options.headers['Add-Padding'],'true');
  assert.equal(requests[0].options.credentials,'omit');
  assert.ok(!requests[0].url.includes(suffixForPassword));
});

test('accepts a password when its hash suffix is absent',async()=>{
  const result=await protection.check('a unique local test password',{
    subtle:webcrypto.subtle,
    cache:false,
    fetchImpl:async()=>new Response(`${'A'.repeat(35)}:4\r\n`)
  });

  assert.deepEqual(result,{compromised:false,count:0});
});

test('blocks compromised passwords and fails closed when the check is unavailable',async()=>{
  await assert.rejects(
    protection.assertSafe('password',{
      subtle:webcrypto.subtle,
      cache:false,
      fetchImpl:async()=>new Response(`${suffixForPassword}:1\r\n`)
    }),
    error=>error.code==='password_compromised'&&!String(error.message).includes('password')
  );

  await assert.rejects(
    protection.assertSafe('network failure test',{
      subtle:webcrypto.subtle,
      cache:false,
      fetchImpl:async()=>{throw new Error('offline')}
    }),
    error=>error.code==='password_check_unavailable'
  );
});

test('customer signup and admin password update run the breach check before Supabase Auth',async()=>{
  const {readFile}=await import('node:fs/promises');
  const root=new URL('../',import.meta.url);
  const [customer,admin,customerHtml,adminHtml,sw]=await Promise.all([
    readFile(new URL('auth.js',root),'utf8'),
    readFile(new URL('admin/admin.js',root),'utf8'),
    readFile(new URL('index.html',root),'utf8'),
    readFile(new URL('admin/index.html',root),'utf8'),
    readFile(new URL('sw.js',root),'utf8')
  ]);

  assert.ok(customer.indexOf('SwiezePasswordProtection.assertSafe')<customer.indexOf('customerAuth.auth.signUp'));
  assert.ok(admin.indexOf('SwiezePasswordProtection.assertSafe')<admin.indexOf('api.updatePassword'));
  assert.match(customerHtml,/password-breach\.js\?v=1[\s\S]+auth\.js\?v=2/);
  assert.match(adminHtml,/password-breach\.js\?v=1[\s\S]+admin\/admin\.js\?v=2/);
  assert.match(sw,/const CACHE = `\$\{CACHE_PREFIX\}v39`;/);
  assert.match(sw,/'password-breach\.js\?v=1'/);
});
