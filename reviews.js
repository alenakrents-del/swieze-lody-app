/* =========================================================
   ŚWIEŻE LODY — REVIEWS
   5 stars + comment
========================================================= */

(() => {
  const COPY = {
    pl: {
      title: 'Jak smakowało?',
      subtitle: 'Oceń swoje zamówienie',
      comment: 'Napisz kilka słów (opcjonalnie)',
      placeholder: 'Co Ci się podobało?',
      send: 'Wyślij opinię',
      thanks: 'Dziękujemy! ❤️',
      thanksText: 'Twoja opinia została zapisana.',
      chooseStars: 'Wybierz liczbę gwiazdek.',
      error: 'Nie udało się zapisać opinii.',
      button: 'Oceń zamówienie'
    },

    de: {
      title: 'Wie hat es geschmeckt?',
      subtitle: 'Bewerte deine Bestellung',
      comment: 'Schreib ein paar Worte (optional)',
      placeholder: 'Was hat dir gefallen?',
      send: 'Bewertung senden',
      thanks: 'Danke! ❤️',
      thanksText: 'Deine Bewertung wurde gespeichert.',
      chooseStars: 'Bitte Sterne auswählen.',
      error: 'Bewertung konnte nicht gespeichert werden.',
      button: 'Bestellung bewerten'
    },

    en: {
      title: 'How was it?',
      subtitle: 'Rate your order',
      comment: 'Write a few words (optional)',
      placeholder: 'What did you like?',
      send: 'Send review',
      thanks: 'Thank you! ❤️',
      thanksText: 'Your review has been saved.',
      chooseStars: 'Please choose a star rating.',
      error: 'Could not save your review.',
      button: 'Rate your order'
    },

    cs: {
      title: 'Jak vám chutnalo?',
      subtitle: 'Ohodnoťte objednávku',
      comment: 'Napište pár slov (volitelné)',
      placeholder: 'Co se vám líbilo?',
      send: 'Odeslat hodnocení',
      thanks: 'Děkujeme! ❤️',
      thanksText: 'Vaše hodnocení bylo uloženo.',
      chooseStars: 'Vyberte počet hvězdiček.',
      error: 'Hodnocení se nepodařilo uložit.',
      button: 'Ohodnotit objednávku'
    }
  };

  let rating = 0;

  function lang() {
    if (
      typeof currentLang !== 'undefined' &&
      COPY[currentLang]
    ) {
      return currentLang;
    }

    return localStorage.getItem('swiezeLanguage') || 'pl';
  }

  function text(key) {
    return COPY[lang()]?.[key] || COPY.pl[key] || key;
  }

  function lastOrder() {
    try {
      return JSON.parse(
        localStorage.getItem('swiezeLastOrder') || 'null'
      );
    } catch (e) {
      return null;
    }
  }

  function reviewKey(orderNumber) {
    return `swiezeReviewed_${orderNumber}`;
  }

  const style = document.createElement('style');

  style.textContent = `
    .sl-review-btn {
      position: fixed;
      left: 16px;
      bottom: 140px;
      z-index: 38;
      border: 0;
      border-radius: 999px;
      background: #fff;
      color: #111;
      padding: 12px 16px;
      font-weight: 900;
      box-shadow: 0 7px 24px rgba(0,0,0,.18);
      cursor: pointer;
      display: none;
    }

    .sl-review-modal {
      border: 0;
      border-radius: 24px;
      width: min(92vw, 500px);
      padding: 0;
      box-shadow: 0 20px 70px rgba(0,0,0,.30);
    }

    .sl-review-modal::backdrop {
      background: rgba(0,0,0,.45);
    }

    .sl-review-wrap {
      padding: 22px;
      text-align: center;
    }

    .sl-review-close {
      position: absolute;
      top: 14px;
      right: 14px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      border: 0;
      background: #f1f1f1;
      font-size: 22px;
      cursor: pointer;
    }

    .sl-review-title {
      font-size: 28px;
      font-weight: 900;
      margin: 10px 0 4px;
    }

    .sl-review-subtitle {
      color: #666;
      margin-bottom: 20px;
    }

    .sl-stars {
      display: flex;
      justify-content: center;
      gap: 7px;
      margin: 18px 0 24px;
    }

    .sl-star {
      border: 0;
      background: transparent;
      font-size: 46px;
      cursor: pointer;
      padding: 2px;
      filter: grayscale(1);
      opacity: .35;
    }

    .sl-star.active {
      filter: none;
      opacity: 1;
    }

    .sl-review-label {
      display: block;
      text-align: left;
      font-weight: 800;
      margin-bottom: 7px;
    }

    .sl-review-textarea {
      width: 100%;
      min-height: 100px;
      resize: vertical;
      box-sizing: border-box;
      border: 1px solid #ddd;
      border-radius: 14px;
      padding: 12px;
      font: inherit;
      font-size: 16px;
    }

    .sl-review-send {
      width: 100%;
      margin-top: 16px;
      border: 0;
      border-radius: 14px;
      padding: 15px;
      background: #ffc728;
      color: #111;
      font-weight: 900;
      font-size: 17px;
      cursor: pointer;
    }

    .sl-review-message {
      margin-top: 12px;
      min-height: 24px;
      font-weight: 700;
    }

    .sl-review-thanks {
      padding: 28px 10px;
    }

    .sl-review-thanks-icon {
      font-size: 64px;
    }

    .sl-review-thanks-title {
      font-size: 28px;
      font-weight: 900;
      margin: 10px 0;
    }
  `;

  document.head.appendChild(style);

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'sl-review-btn';
  button.textContent = `⭐ ${text('button')}`;

  document.body.appendChild(button);

  const dialog = document.createElement('dialog');
  dialog.className = 'sl-review-modal';

  dialog.innerHTML = `
    <div class="sl-review-wrap">

      <button
        type="button"
        class="sl-review-close"
      >
        ×
      </button>

      <div id="slReviewContent"></div>

    </div>
  `;

  document.body.appendChild(dialog);

  dialog
    .querySelector('.sl-review-close')
    .onclick = () => dialog.close();

  function renderForm() {
    rating = 0;

    const content =
      dialog.querySelector('#slReviewContent');

    content.innerHTML = `
      <div class="sl-review-title">
        ${text('title')}
      </div>

      <div class="sl-review-subtitle">
        ${text('subtitle')}
      </div>

      <div class="sl-stars">
        ${[1, 2, 3, 4, 5].map(value => `
          <button
            type="button"
            class="sl-star"
            data-rating="${value}"
          >
            ⭐
          </button>
        `).join('')}
      </div>

      <label class="sl-review-label">
        ${text('comment')}
      </label>

      <textarea
        id="slReviewComment"
        class="sl-review-textarea"
        maxlength="500"
        placeholder="${text('placeholder')}"
      ></textarea>

      <button
        type="button"
        id="slReviewSend"
        class="sl-review-send"
      >
        ${text('send')}
      </button>

      <div
        id="slReviewMessage"
        class="sl-review-message"
      ></div>
    `;

    const stars =
      content.querySelectorAll('.sl-star');

    stars.forEach(star => {
      star.addEventListener('click', () => {
        rating =
          Number(star.dataset.rating);

        stars.forEach(item => {
          const value =
            Number(item.dataset.rating);

          item.classList.toggle(
            'active',
            value <= rating
          );
        });
      });
    });

    content
      .querySelector('#slReviewSend')
      .addEventListener(
        'click',
        submitReview
      );
  }

  async function submitReview() {
    const order = lastOrder();

    const message =
      dialog.querySelector(
        '#slReviewMessage'
      );

    if (!rating) {
      message.textContent =
        text('chooseStars');

      return;
    }

    if (!order?.publicToken) {
      message.textContent =
        text('error');

      return;
    }

    const comment =
      dialog
        .querySelector('#slReviewComment')
        .value
        .trim();

    const sendButton =
      dialog.querySelector('#slReviewSend');

    sendButton.disabled = true;

    const { error } =
      await sb.rpc(
        'submit_pickup_order_review',
        {
          p_public_token:
            order.publicToken,

          p_rating:
            rating,

          p_comment:
            comment || null,

          p_locale:
            lang()
        }
      );

    if (error) {
      console.error(error);

      message.textContent =
        text('error');

      sendButton.disabled = false;

      return;
    }

    localStorage.setItem(
      reviewKey(order.orderNumber),
      '1'
    );

    button.style.display = 'none';

    const content =
      dialog.querySelector(
        '#slReviewContent'
      );

    content.innerHTML = `
      <div class="sl-review-thanks">

        <div class="sl-review-thanks-icon">
          ⭐
        </div>

        <div class="sl-review-thanks-title">
          ${text('thanks')}
        </div>

        <div>
          ${text('thanksText')}
        </div>

      </div>
    `;
  }

  function checkReviewButton() {
    const order = lastOrder();

    if (
      !order ||
      !order.orderNumber ||
      !['ready', 'collected'].includes(
        order.status
      )
    ) {
      button.style.display = 'none';
      return;
    }

    if (
      localStorage.getItem(
        reviewKey(order.orderNumber)
      )
    ) {
      button.style.display = 'none';
      return;
    }

    button.textContent =
      `⭐ ${text('button')}`;

    button.style.display = 'block';
  }

  button.onclick = () => {
    renderForm();
    dialog.showModal();
  };

  setInterval(
    checkReviewButton,
    3000
  );

  document
    .querySelectorAll('[data-lang]')
    .forEach(langButton => {
      langButton.addEventListener(
        'click',
        () => {
          setTimeout(
            checkReviewButton,
            0
          );
        }
      );
    });

  checkReviewButton();
})();
