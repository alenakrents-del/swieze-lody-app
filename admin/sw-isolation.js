(function isolateAdminFromCustomerServiceWorker() {
  const root = document.documentElement;
  const attemptKey = 'swieze-admin-sw-isolation-attempts-v1';
  const customerWorkerUrl = new URL('/sw.js', location.origin).href;

  if (!('serviceWorker' in navigator)) return;

  const controllerIsCustomer =
    navigator.serviceWorker.controller?.scriptURL === customerWorkerUrl;

  if (controllerIsCustomer) root.hidden = true;

  navigator.serviceWorker.getRegistrations()
    .then(registrations => Promise.all(
      registrations
        .filter(registration =>
          [
            registration.active,
            registration.waiting,
            registration.installing
          ].some(worker => worker?.scriptURL === customerWorkerUrl)
        )
        .map(registration => registration.unregister())
    ))
    .then(() => {
      if (!controllerIsCustomer) {
        sessionStorage.removeItem(attemptKey);
        return;
      }

      const attempts = Number(sessionStorage.getItem(attemptKey) || 0);

      if (attempts >= 2) {
        throw new Error('Customer service worker still controls /admin/.');
      }

      sessionStorage.setItem(attemptKey, String(attempts + 1));
      location.replace(location.href);
    })
    .catch(error => {
      root.hidden = false;
      console.error('Admin service worker isolation failed.', error);
    });
})();
