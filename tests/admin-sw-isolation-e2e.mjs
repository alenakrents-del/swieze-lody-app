import {chromium} from 'playwright';

const arg=process.argv.find(value=>value.startsWith('--base-url='));
const baseUrl=(arg?.split('=').slice(1).join('=')||process.env.ADMIN_BASE_URL||'http://127.0.0.1:4173').replace(/\/$/,'');
const shareArg=process.argv.find(value=>value.startsWith('--vercel-share='));
const shareToken=shareArg?.split('=').slice(1).join('=')||process.env.VERCEL_SHARE_TOKEN||null;
const accessUrl=path=>{
  const url=new URL(path,`${baseUrl}/`);
  if(shareToken)url.searchParams.set('_vercel_share',shareToken);
  return url.href;
};

const browser=await chromium.launch({headless:true});
const context=await browser.newContext({viewport:{width:1280,height:800}});
const page=await context.newPage();
const errors=[];
const failed=[];
const adminResponses=[];

page.on('pageerror',error=>errors.push(error.message));
page.on('console',message=>{
  if(message.type()==='error')errors.push(message.text());
});
page.on('requestfailed',request=>{
  if(request.url().startsWith(baseUrl)){
    failed.push(`${request.url()}: ${request.failure()?.errorText||'failed'}`);
  }
});
page.on('response',response=>{
  const url=response.url();
  if(url.startsWith(baseUrl)){
    adminResponses.push({
      path:new URL(url).pathname,
      search:new URL(url).search,
      status:response.status(),
      fromServiceWorker:response.fromServiceWorker()
    });
  }
});

try{
  await page.goto(accessUrl('/admin/'),{waitUntil:'domcontentloaded',timeout:30000});
  await page.evaluate(async()=>{
    const cache=await caches.open('swieze-lody-v39');
    await Promise.all([
      cache.put('/config.js',new Response('stale config')),
      cache.put('/vendor/supabase.min.js',new Response('stale supabase')),
      cache.put('/password-breach.js?v=1',new Response('stale password protection'))
    ]);
  });

  await page.goto(accessUrl('/'),{waitUntil:'domcontentloaded',timeout:30000});
  await page.evaluate(()=>navigator.serviceWorker.ready);
  await page.reload({waitUntil:'domcontentloaded',timeout:30000});

  const customerState=await page.evaluate(async()=>({
    controlled:Boolean(navigator.serviceWorker.controller),
    caches:await caches.keys()
  }));
  if(!customerState.controlled)throw new Error('customer page is not controlled by its service worker');
  if(!customerState.caches.includes('swieze-lody-v40'))throw new Error('customer v40 cache is missing');
  if(customerState.caches.includes('swieze-lody-v39'))throw new Error('legacy v39 cache survived v40 activation');

  const cacheIsolation=await page.evaluate(async()=>{
    const cache=await caches.open('swieze-lody-v40');
    return {
      customerConfig:Boolean(await cache.match('/config.js')),
      customerSupabase:Boolean(await cache.match('/vendor/supabase.min.js')),
      customerPasswordProtection:Boolean(await cache.match('/password-breach.js?v=1')),
      adminConfig:Boolean(await cache.match('/config.js?admin=1')),
      adminSupabase:Boolean(await cache.match('/vendor/supabase.min.js?admin=1')),
      adminPasswordProtection:Boolean(await cache.match('/password-breach.js?v=1&admin=1'))
    };
  });
  if(!cacheIsolation.customerConfig||!cacheIsolation.customerSupabase||!cacheIsolation.customerPasswordProtection){
    throw new Error('customer shared assets are missing from the v40 offline cache');
  }
  if(cacheIsolation.adminConfig||cacheIsolation.adminSupabase||cacheIsolation.adminPasswordProtection){
    throw new Error('admin runtime URLs leaked into the customer cache');
  }

  adminResponses.length=0;
  await page.goto(accessUrl('/admin/'),{waitUntil:'domcontentloaded',timeout:30000});
  await page.waitForFunction(()=>!navigator.serviceWorker.controller,null,{timeout:30000});
  await page.locator('#email').waitFor({state:'visible'});
  await page.waitForLoadState('networkidle');
  adminResponses.length=0;
  errors.length=0;
  failed.length=0;
  await page.reload({waitUntil:'networkidle',timeout:30000});

  const requiredPaths=[
    '/admin/',
    '/admin/admin.css',
    '/admin/admin.js',
    '/admin/admin-api.js',
    '/admin/admin-storage.js',
    '/admin/admin-workflow.js',
    '/config.js',
    '/vendor/supabase.min.js',
    '/password-breach.js'
  ];
  for(const path of requiredPaths){
    const matches=adminResponses.filter(item=>item.path===path);
    if(!matches.length)throw new Error(`admin asset was not requested: ${path}`);
    if(matches.some(item=>item.fromServiceWorker))throw new Error(`admin asset came from customer service worker: ${path}`);
    if(matches.some(item=>item.status>=400))throw new Error(`admin asset failed: ${path}`);
  }

  const sharedAdminAssets=Object.fromEntries(
    adminResponses
      .filter(item=>['/config.js','/vendor/supabase.min.js','/password-breach.js'].includes(item.path))
      .map(item=>[item.path,item.search])
  );
  if(sharedAdminAssets['/config.js']!=='?admin=1')throw new Error('admin config URL is not cache-separated');
  if(sharedAdminAssets['/vendor/supabase.min.js']!=='?admin=1')throw new Error('admin Supabase URL is not cache-separated');
  const passwordParams=new URLSearchParams(sharedAdminAssets['/password-breach.js']);
  if(passwordParams.get('v')!=='1'||passwordParams.get('admin')!=='1'){
    throw new Error('admin password protection URL is not cache-separated');
  }

  const email=page.locator('#email');
  const password=page.locator('#password');
  await email.click();
  await email.fill('focus.test@example.com');
  await password.click();
  await password.fill('temporary-input-check');
  if(await email.inputValue()!=='focus.test@example.com')throw new Error('admin email input lost its value');
  if(await password.inputValue()!=='temporary-input-check')throw new Error('admin password input lost its value');

  await page.goto(accessUrl('/admin/?recovery-smoke=1#type=recovery'),{waitUntil:'domcontentloaded',timeout:30000});
  await page.locator('#newPassword').waitFor({state:'visible'});
  await page.waitForLoadState('networkidle');
  await page.locator('#newPassword').fill('temporary-recovery-check');
  if(await page.locator('#newPassword').inputValue()!=='temporary-recovery-check'){
    throw new Error('admin recovery input lost its value');
  }

  if(await page.evaluate(()=>Boolean(navigator.serviceWorker.controller))){
    throw new Error('customer service worker controls the admin page');
  }
  if(failed.length)throw new Error(failed.join('; '));
  if(errors.length)throw new Error(errors.join('; '));

  console.log('admin-sw-isolation: PASS controller, cache migration, direct assets, login and recovery UI');
}finally{
  await context.close();
  await browser.close();
}
