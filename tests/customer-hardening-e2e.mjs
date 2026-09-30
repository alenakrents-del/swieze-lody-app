import {chromium} from 'playwright';

const arg=process.argv.find(value=>value.startsWith('--base-url='));
const baseUrl=(arg?.split('=').slice(1).join('=')||process.env.CUSTOMER_BASE_URL||'http://127.0.0.1:4173').replace(/\/$/,'');
const browser=await chromium.launch({headless:true});
const context=await browser.newContext({serviceWorkers:'block'});
const page=await context.newPage();
let pwaContext;
let statusRequests=0;

await page.addInitScript(()=>{
  localStorage.setItem('swiezeLanguage','en');
  localStorage.setItem('swiezeLastOrder',JSON.stringify({
    publicToken:'customer-hardening-test-token',
    orderNumber:62,
    status:'returned'
  }));
});

await page.route('**/rest/v1/rpc/get_pickup_order_status',async route=>{
  statusRequests+=1;
  await route.fulfill({
    status:200,
    contentType:'application/json',
    body:JSON.stringify([{
      order_number:62,
      status:'returned',
      estimated_minutes:15,
      ready_at:new Date(Date.now()-60000).toISOString(),
      total:20
    }])
  });
});

try{
  await page.goto(`${baseUrl}/`,{waitUntil:'domcontentloaded',timeout:30000});
  const button=page.locator('.sl-order-status-btn');
  await button.waitFor({state:'attached'});
  if(!await button.evaluate(element=>element.classList.contains('v3-no-active-order'))){
    throw new Error('returned order is still shown as active');
  }

  const resources=await page.evaluate(()=>performance.getEntriesByType('resource').map(entry=>entry.name));
  if(!resources.some(url=>url.includes('/vendor/supabase.min.js'))||resources.some(url=>url.includes('cdn.jsdelivr.net/npm/@supabase/supabase-js'))){
    throw new Error('customer app did not load only the local Supabase bundle');
  }

  await button.evaluate(element=>element.click());
  await page.locator('[data-terminal-status="returned"]').waitFor();
  if(await page.locator('#slCountdown, .sl-progress').count()){
    throw new Error('terminal screen still renders active countdown/progress');
  }
  if(!await page.locator('#slOrderStatusContent').getByText('Returned',{exact:true}).count()){
    throw new Error('localized returned label is missing');
  }

  const afterManualFetch=statusRequests;
  await page.waitForTimeout(5250);
  if(statusRequests!==afterManualFetch){
    throw new Error('terminal order triggered background RPC polling');
  }

  await page.evaluate(()=>{
    const order=JSON.parse(localStorage.getItem('swiezeLastOrder'));
    localStorage.setItem('swiezeLastOrder',JSON.stringify({...order,status:'new'}));
  });
  await page.waitForTimeout(5250);
  if(statusRequests<=afterManualFetch){
    throw new Error('new order did not resume background RPC polling');
  }

  await page.evaluate(()=>{
    Object.defineProperty(document,'hidden',{configurable:true,value:true});
    const order=JSON.parse(localStorage.getItem('swiezeLastOrder'));
    localStorage.setItem('swiezeLastOrder',JSON.stringify({...order,status:'accepted'}));
  });
  const beforeHiddenTick=statusRequests;
  await page.waitForTimeout(5250);
  if(statusRequests!==beforeHiddenTick){
    throw new Error('hidden document triggered background RPC polling');
  }

  pwaContext=await browser.newContext();
  const pwaPage=await pwaContext.newPage();
  await pwaPage.goto(`${baseUrl}/`,{waitUntil:'domcontentloaded',timeout:30000});
  const cacheState=await pwaPage.evaluate(async()=>{
    await navigator.serviceWorker.ready;
    const keys=await caches.keys();
    const cache=await caches.open('swieze-lody-v38');
    return {
      keys,
      localSupabaseCached:Boolean(await cache.match('/vendor/supabase.min.js'))
    };
  });
  if(!cacheState.keys.includes('swieze-lody-v38')||!cacheState.localSupabaseCached){
    throw new Error('service worker did not cache the pinned local Supabase bundle');
  }
  await pwaPage.reload({waitUntil:'domcontentloaded'});
  await pwaContext.setOffline(true);
  await pwaPage.reload({waitUntil:'domcontentloaded'});
  if(!await pwaPage.evaluate(()=>Boolean(window.supabase?.createClient))){
    throw new Error('customer app did not boot the Supabase client from cache while offline');
  }

  console.log('customer-hardening: PASS terminal UI, polling guards, resume, local/offline Supabase bundle');
}finally{
  await pwaContext?.close();
  await context.close();
  await browser.close();
}
