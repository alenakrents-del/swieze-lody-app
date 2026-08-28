/* =========================================================
   ŚWIEŻE LODY — REAL CART + SUPABASE ORDERS
========================================================= */

(() => {
  const COPY = {
    pl: {
      add: 'Dodaj',
      cart: 'Koszyk',
      empty: 'Koszyk jest pusty.',
      total: 'Razem',
      order: 'Zamów',
      remove: 'Usuń',
      added: 'Dodano do koszyka',
      sending: 'Wysyłam zamówienie…',
      orderReady: 'Zamówienie przyjęte!',
      pickup: 'Odbiór na miejscu',
      estimatePrefix: 'Szacowany czas odbioru:',
      minutes: 'min',
      continue: 'Wróć do menu',
      error: 'Nie udało się wysłać zamówienia. Spróbuj ponownie.',
      orderNumber: 'Numer zamówienia'
    },

    de: {
      add: 'Hinzufügen',
      cart: 'Warenkorb',
      empty: 'Der Warenkorb ist leer.',
      total: 'Gesamt',
      order: 'Bestellen',
      remove: 'Entfernen',
      added: 'Zum Warenkorb hinzugefügt',
      sending: 'Bestellung wird gesendet…',
      orderReady: 'Bestellung angenommen!',
      pickup: 'Abholung vor Ort',
      estimatePrefix: 'Geschätzte Abholzeit:',
      minutes: 'Min.',
      continue: 'Zurück zum Menü',
      error: 'Die Bestellung konnte nicht gesendet werden. Bitte erneut versuchen.',
      orderNumber: 'Bestellnummer'
    },

    en: {
      add: 'Add',
      cart: 'Cart',
      empty: 'Your cart is empty.',
      total: 'Total',
      order: 'Order',
      remove: 'Remove',
      added: 'Added to cart',
      sending: 'Sending order…',
      orderReady: 'Order received!',
      pickup: 'Pickup on site',
      estimatePrefix: 'Estimated pickup time:',
      minutes: 'min',
      continue: 'Back to menu',
      error: 'Could not send the order. Please try again.',
      orderNumber: 'Order number'
    },

    cs: {
      add: 'Přidat',
      cart: 'Košík',
      empty: 'Košík je prázdný.',
      total: 'Celkem',
      order: 'Objednat',
      remove: 'Odstranit',
      added: 'Přidáno do košíku',
      sending: 'Odesílám objednávku…',
      orderReady: 'Objednávka přijata!',
      pickup: 'Vyzvednutí na místě',
      estimatePrefix: 'Odhadovaný čas vyzvednutí:',
      minutes: 'min',
      continue: 'Zpět do menu',
      error: 'Objednávku se nepodařilo odeslat. Zkuste to znovu.',
      orderNumber: 'Číslo objednávky'
    }
  };

  let cart = [];

  try {
    cart = JSON.parse(
      localStorage.getItem('swiezeCart') || '[]'
    );

    if (!Array.isArray(cart)) {
      cart = [];
    }
  } catch (e) {
    cart = [];
  }

  function lang() {
    if (
      typeof currentLang !== 'undefined' &&
      COPY[currentLang]
    ) {
      return currentLang;
    }

    return 'pl';
  }

  function text(key) {
    return COPY[lang()][key] || COPY.pl[key] || key;
  }

  function priceNumber(price) {
    return (
      Number(
        String(price || '0')
          .replace(',', '.')
          .replace(/[^0-9.]/g, '')
      ) || 0
    );
  }

  function money(value) {
    return `${value.toFixed(2).replace('.00', '')} zł`;
  }

  function productName(item) {
    return (
      item.name?.[lang()] ||
      item.name?.pl ||
      item.name?.en ||
      ''
    );
  }

  function saveCart() {
    localStorage.setItem(
      'swiezeCart',
      JSON.stringify(cart)
    );

    updateCartButton();
  }

  const style = document.createElement('style');

  style.textContent = `
    .sl-add-btn {
      margin-left: auto;
      border: 0;
      border-radius: 12px;
      background: #ffc728;
      padding: 10px 13px;
      font-weight: 800;
      cursor: pointer;
      white-space: nowrap;
    }

    .sl-cart-fab {
      position: fixed;
      right: 16px;
      bottom: 84px;
      z-index: 40;
      border: 0;
      border-radius: 999px;
      background: #171717;
      color: white;
      padding: 12px 16px;
      font-weight: 800;
      box-shadow: 0 7px 24px rgba(0,0,0,.22);
      cursor: pointer;
    }

    .sl-cart-fab span {
      display: inline-flex;
      min-width: 22px;
      height: 22px;
      align-items: center;
      justify-content: center;
      margin-left: 6px;
      border-radius: 999px;
      background: #ffc728;
      color: #111;
      padding: 0 5px;
    }

    .sl-cart-modal {
      border: 0;
      border-radius: 22px;
      width: min(92vw, 520px);
      max-height: 82vh;
      padding: 0;
      box-shadow: 0 20px 70px rgba(0,0,0,.28);
    }

    .sl-cart-modal::backdrop {
      background: rgba(0,0,0,.42);
    }

    .sl-cart-wrap {
      padding: 20px;
    }

    .sl-cart-head {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
      margin-bottom: 14px;
    }

    .sl-cart-head h2 {
      margin: 0;
    }

    .sl-cart-close {
      border: 0;
      background: #f1f1f1;
      width: 38px;
      height: 38px;
      border-radius: 50%;
      font-size: 22px;
      cursor: pointer;
    }

    .sl-cart-item {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 10px;
      padding: 13px 0;
      border-bottom: 1px solid #eee;
    }

    .sl-cart-item b {
      display: block;
      margin-bottom: 5px;
    }

    .sl-qty {
      display: flex;
      align-items: center;
      gap: 7px;
      margin-top: 8px;
    }

    .sl-qty button {
      border: 1px solid #ddd;
      background: white;
      border-radius: 9px;
      width: 30px;
      height: 30px;
      font-weight: 900;
      cursor: pointer;
    }

    .sl-remove {
      border: 0;
      background: transparent;
      color: #777;
      padding: 4px 0;
      cursor: pointer;
      font-size: 12px;
    }

    .sl-total {
      display: flex;
      justify-content: space-between;
      font-size: 20px;
      font-weight: 900;
      padding: 16px 0;
    }

    .sl-order-btn {
      width: 100%;
      border: 0;
      border-radius: 14px;
      background: #ffc728;
      padding: 14px;
      font-size: 17px;
      font-weight: 900;
      cursor: pointer;
    }

    .sl-order-btn:disabled {
      opacity: .45;
      cursor: not-allowed;
    }

    .sl-empty {
      text-align: center;
      padding: 28px 8px;
      color: #777;
    }

    .sl-success {
      text-align: center;
      padding: 16px 4px 8px;
    }

    .sl-success .emoji {
      font-size: 54px;
    }

    .sl-success h2 {
      margin: 8px 0;
    }

    .sl-success .number {
      font-size: 28px;
      font-weight: 900;
      margin: 14px 0;
    }

    .sl-success .time {
      font-size: 20px;
      font-weight: 900;
      background: #fff4c7;
      border-radius: 14px;
      padding: 14px;
      margin: 16px 0;
    }

    .sl-error {
      background: #ffe8e8;
      border-radius: 12px;
      padding: 12px;
      margin: 12px 0;
      font-weight: 700;
    }
  `;

  document.head.appendChild(style);

  const cartButton = document.createElement('button');

  cartButton.className = 'sl-cart-fab';
  cartButton.type = 'button';

  document.body.appendChild(cartButton);

  const dialog = document.createElement('dialog');

  dialog.className = 'sl-cart-modal';

  dialog.innerHTML = `
    <div class="sl-cart-wrap">
      <div id="slCartContent"></div>
    </div>
  `;

  document.body.appendChild(dialog);

  function updateCartButton() {
    const count = cart.reduce(
      (sum, item) => sum + item.qty,
      0
    );

    cartButton.innerHTML =
      `🛒 ${text('cart')} <span>${count}</span>`;
  }

  function addToCart(category, product, index) {
    const key = `${category}:${index}`;

    const existing =
      cart.find(item => item.key === key);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({
        key,
        category,
        index,
        name: product.name,
        price: product.price,
        image: product.image || null,
        qty: 1
      });
    }

    saveCart();
    showToast(text('added'));
  }

  function showToast(message) {
    const old =
      document.querySelector('.sl-toast');

    if (old) {
      old.remove();
    }

    const toast =
      document.createElement('div');

    toast.className = 'sl-toast';

    Object.assign(
      toast.style,
      {
        position: 'fixed',
        left: '50%',
        bottom: '145px',
        transform: 'translateX(-50%)',
        background: '#171717',
        color: '#fff',
        padding: '10px 14px',
        borderRadius: '12px',
        zIndex: '100',
        fontWeight: '800',
        boxShadow:
          '0 6px 20px rgba(0,0,0,.25)'
      }
    );

    toast.textContent = message;

    document.body.appendChild(toast);

    setTimeout(
      () => toast.remove(),
      1300
    );
  }

  function renderCart() {
    const box =
      dialog.querySelector('#slCartContent');

    const total = cart.reduce(
      (sum, item) =>
        sum +
        priceNumber(item.price) * item.qty,
      0
    );

    box.innerHTML = `
      <div class="sl-cart-head">

        <h2>
          🛒 ${text('cart')}
        </h2>

        <button
          class="sl-cart-close"
          type="button"
        >
          ×
        </button>

      </div>

      ${
        cart.length

        ? cart.map(item => `

          <div
            class="sl-cart-item"
            data-key="${item.key}"
          >

            <div>

              <b>
                ${productName(item)}
              </b>

              <span>
                ${item.price}
              </span>

              <div class="sl-qty">

                <button
                  type="button"
                  data-act="minus"
                >
                  −
                </button>

                <strong>
                  ${item.qty}
                </strong>

                <button
                  type="button"
                  data-act="plus"
                >
                  +
                </button>

              </div>

              <button
                type="button"
                class="sl-remove"
                data-act="remove"
              >
                ${text('remove')}
              </button>

            </div>

            <strong>
              ${
                money(
                  priceNumber(item.price) *
                  item.qty
                )
              }
            </strong>

          </div>

        `).join('')

        : `
          <div class="sl-empty">
            ${text('empty')}
          </div>
        `
      }

      <div class="sl-total">

        <span>
          ${text('total')}
        </span>

        <span>
          ${money(total)}
        </span>

      </div>

      <div id="slOrderError"></div>

      <button
        id="slOrderButton"
        class="sl-order-btn"
        type="button"
        ${cart.length ? '' : 'disabled'}
      >
        ${text('order')}
      </button>
    `;

    box.querySelector(
      '.sl-cart-close'
    ).onclick =
      () => dialog.close();

    box.querySelectorAll(
      '.sl-cart-item'
    ).forEach(row => {

      const item =
        cart.find(
          i => i.key === row.dataset.key
        );

      if (!item) {
        return;
      }

      row.querySelector(
        '[data-act="plus"]'
      ).onclick = () => {

        item.qty += 1;

        saveCart();
        renderCart();
      };

      row.querySelector(
        '[data-act="minus"]'
      ).onclick = () => {

        item.qty -= 1;

        if (item.qty <= 0) {
          cart =
            cart.filter(
              i => i.key !== item.key
            );
        }

        saveCart();
        renderCart();
      };

      row.querySelector(
        '[data-act="remove"]'
      ).onclick = () => {

        cart =
          cart.filter(
            i => i.key !== item.key
          );

        saveCart();
        renderCart();
      };
    });

    const orderBtn =
      box.querySelector('#slOrderButton');

    if (cart.length) {
      orderBtn.onclick =
        placeRealOrder;
    }
  }

  async function placeRealOrder() {
    if (!cart.length) {
      return;
    }

    const button =
      dialog.querySelector('#slOrderButton');

    const errorBox =
      dialog.querySelector('#slOrderError');

    button.disabled = true;
    button.textContent = text('sending');

    errorBox.innerHTML = '';

    try {
      const orderItems = cart.map(item => ({
        key: item.key,
        name: productName(item),
        price: priceNumber(item.price),
        qty: item.qty
      }));

      const { data, error } =
        await sb.rpc(
          'create_pickup_order',
          {
            p_items: orderItems,
            p_locale: lang()
          }
        );

      if (error) {
        throw error;
      }

      if (!data || !data.length) {
        throw new Error('No order returned');
      }

      const order = data[0];

      localStorage.setItem(
        'swiezeLastOrder',
        JSON.stringify({
          publicToken: order.public_token,
          orderNumber: order.order_number,
          status: order.status,
          estimatedMinutes:
            order.estimated_minutes,
          total: order.total
        })
      );

      cart = [];
      saveCart();

      showOrderSuccess(order);

    } catch (error) {
      console.error(
        'ORDER ERROR:',
        error
      );

      button.disabled = false;
      button.textContent = text('order');

      errorBox.innerHTML = `
        <div class="sl-error">
          ${text('error')}
        </div>
      `;
    }
  }

  function showOrderSuccess(order) {
    const box =
      dialog.querySelector('#slCartContent');

    box.innerHTML = `
      <div class="sl-cart-head">

        <h2>
          ${text('orderNumber')}
        </h2>

        <button
          class="sl-cart-close"
          type="button"
        >
          ×
        </button>

      </div>

      <div class="sl-success">

        <div class="emoji">
          ✅
        </div>

        <h2>
          ${text('orderReady')}
        </h2>

        <div class="number">
          #${order.order_number}
        </div>

        <p>
          ${text('pickup')}
        </p>

        <div class="time">
          ⏱️
          ${text('estimatePrefix')}
          ${order.estimated_minutes}
          ${text('minutes')}
        </div>

        <button
          class="sl-order-btn"
          type="button"
        >
          ${text('continue')}
        </button>

      </div>
    `;

    box.querySelector(
      '.sl-cart-close'
    ).onclick =
      () => dialog.close();

    box.querySelector(
      '.sl-order-btn'
    ).onclick =
      () => dialog.close();
  }

  cartButton.onclick = () => {
    renderCart();
    dialog.showModal();
  };

  if (typeof openMenu === 'function') {
    const originalOpenMenu =
      openMenu;

    openMenu = function(k, title) {

      originalOpenMenu(k, title);

      const products =
        typeof MENU !== 'undefined' &&
        MENU[k]
          ? MENU[k]
          : [];

      const rows =
        document.querySelectorAll(
          '#menuItems .food'
        );

      rows.forEach(
        (row, index) => {

          const product =
            products[index];

          if (
            !product ||
            row.querySelector('.sl-add-btn')
          ) {
            return;
          }

          const button =
            document.createElement(
              'button'
            );

          button.className =
            'sl-add-btn';

          button.type =
            'button';

          button.textContent =
            text('add');

          button.onclick = event => {

            event.preventDefault();
            event.stopPropagation();

            addToCart(
              k,
              product,
              index
            );
          };

          row.appendChild(button);
        }
      );
    };
  }

  document
    .querySelectorAll('[data-lang]')
    .forEach(button => {

      button.addEventListener(
        'click',
        () =>
          setTimeout(
            updateCartButton,
            0
          )
      );
    });

  updateCartButton();
})();
