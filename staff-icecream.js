/* =========================================================
   ŚWIEŻE LODY — STAFF ICE CREAM
   Dzisiejsze smaki lodów
========================================================= */

(() => {
  const PANEL_ID = 'slIceCreamPanel';

  const style = document.createElement('style');

  style.textContent = `
    #${PANEL_ID}{
      margin-top:18px;
    }

    .sl-ice-head{
      display:flex;
      justify-content:space-between;
      gap:12px;
      align-items:center;
      margin-bottom:14px;
    }

    .sl-ice-title{
      font-family:"Bangers", Impact, sans-serif;
      font-size:32px;
      letter-spacing:1px;
      margin:0;
    }

    .sl-ice-add{
      border:0;
      border-radius:12px;
      background:#ffc728;
      padding:11px 14px;
      font-weight:900;
      cursor:pointer;
    }

    .sl-ice-list{
      display:grid;
      gap:12px;
    }

    .sl-ice-card{
      background:#fff;
      border-radius:16px;
      padding:14px;
      border:2px solid #eee;
    }

    .sl-ice-card.on{
      border-color:#20b26b;
      background:#f3fff8;
    }

    .sl-ice-name{
      font-family:"Bangers", Impact, sans-serif;
      font-size:26px;
      letter-spacing:.7px;
      margin-bottom:4px;
    }

    .sl-ice-badge{
      display:inline-block;
      background:#111;
      color:#fff;
      border-radius:999px;
      padding:5px 9px;
      font-size:12px;
      font-weight:900;
      margin-bottom:8px;
    }

    .sl-ice-base{
      font-weight:800;
      margin-bottom:5px;
    }

    .sl-ice-desc{
      color:#666;
      font-size:14px;
      line-height:1.35;
      margin-bottom:10px;
    }

    .sl-ice-price{
      font-weight:900;
      font-size:18px;
      margin-bottom:10px;
    }

    .sl-ice-actions{
      display:flex;
      gap:8px;
      flex-wrap:wrap;
    }

    .sl-ice-actions button{
      border:0;
      border-radius:10px;
      padding:9px 11px;
      font-weight:900;
      cursor:pointer;
    }

    .sl-ice-on{
      background:#a8e6c7;
    }

    .sl-ice-off{
      background:#eee;
    }

    .sl-ice-edit{
      background:#dbe8ff;
    }

    .sl-ice-hide{
      background:#222;
      color:#fff;
    }

    .sl-ice-form{
      display:grid;
      gap:10px;
      margin-top:14px;
    }

    .sl-ice-form input,
    .sl-ice-form textarea{
      width:100%;
      border:1px solid #ddd;
      border-radius:12px;
      padding:11px 12px;
      font:inherit;
      background:#fff;
    }

    .sl-ice-form textarea{
      min-height:80px;
      resize:vertical;
    }

    .sl-ice-form-actions{
      display:flex;
      gap:8px;
    }

    .sl-ice-save{
      flex:1;
      border:0;
      border-radius:12px;
      background:#ffc728;
      padding:12px;
      font-weight:900;
      cursor:pointer;
    }

    .sl-ice-cancel{
      border:1px solid #ddd;
      border-radius:12px;
      background:#fff;
      padding:12px;
      font-weight:900;
      cursor:pointer;
    }

    .sl-ice-empty{
      padding:18px;
      text-align:center;
      color:#777;
      background:#fff;
      border-radius:14px;
    }
  `;

  document.head.appendChild(style);

  function esc(value){
    return String(value ?? '')
      .replaceAll('&','&amp;')
      .replaceAll('<','&lt;')
      .replaceAll('>','&gt;')
      .replaceAll('"','&quot;')
      .replaceAll("'","&#039;");
  }

  function money(value){
    const n = Number(value || 0);
    return `${n.toFixed(2).replace('.00','')} zł`;
  }

  function mount(){
    const staffPanel =
      document.getElementById('staffPanel');

    if (!staffPanel) return;

    if (document.getElementById(PANEL_ID)) return;

    const panel = document.createElement('section');

    panel.id = PANEL_ID;
    panel.className = 'panel';

    panel.innerHTML = `
      <div class="sl-ice-head">
        <div>
          <h2 class="sl-ice-title">
            🍦 DZISIEJSZE SMAKI LODÓW
          </h2>
          <div class="muted">
            Włącz tylko smaki dostępne dzisiaj.
          </div>
        </div>

        <button
          type="button"
          class="sl-ice-add"
          id="slIceAdd"
        >
          + Dodaj smak
        </button>
      </div>

      <div id="slIceFormBox"></div>

      <div
        id="slIceList"
        class="sl-ice-list"
      ></div>
    `;

    staffPanel.prepend(panel);

    document
      .getElementById('slIceAdd')
      .addEventListener(
        'click',
        () => renderForm()
      );

    loadFlavours();
  }

  async function loadFlavours(){
    const list =
      document.getElementById('slIceList');

    if (!list) return;

    list.innerHTML =
      '<div class="sl-ice-empty">Ładowanie smaków…</div>';

    const {
      data,
      error
    } = await sb.rpc(
      'staff_list_ice_cream_flavours'
    );

    if (error){
      console.error(error);

      list.innerHTML =
        '<div class="error">Nie udało się pobrać smaków.</div>';

      return;
    }

    const flavours =
      Array.isArray(data)
        ? data.filter(x => !x.archived)
        : [];

    if (!flavours.length){
      list.innerHTML =
        '<div class="sl-ice-empty">Brak zapisanych smaków.</div>';

      return;
    }

    list.innerHTML =
      flavours.map(flavour => `
        <article
          class="sl-ice-card ${flavour.available_today ? 'on' : ''}"
          data-id="${esc(flavour.id)}"
        >

          <div class="sl-ice-name">
            ${esc(flavour.name)}
          </div>

          ${
            flavour.badge
              ? `<div class="sl-ice-badge">
                  ${esc(flavour.badge)}
                </div>`
              : ''
          }

          ${
            flavour.base_label
              ? `<div class="sl-ice-base">
                  🥛 ${esc(flavour.base_label)}
                </div>`
              : ''
          }

          ${
            flavour.description
              ? `<div class="sl-ice-desc">
                  ${esc(flavour.description)}
                </div>`
              : ''
          }

          <div class="sl-ice-price">
            ${money(flavour.price)} / porcja
          </div>

          <div class="sl-ice-actions">

            <button
              type="button"
              class="${flavour.available_today ? 'sl-ice-off' : 'sl-ice-on'}"
              data-act="toggle"
            >
              ${
                flavour.available_today
                  ? 'Brak dzisiaj'
                  : '✓ Jest dzisiaj'
              }
            </button>

            <button
              type="button"
              class="sl-ice-edit"
              data-act="edit"
            >
              Edytuj
            </button>

            <button
              type="button"
              class="sl-ice-hide"
              data-act="hide"
            >
              Ukryj
            </button>

          </div>

        </article>
      `).join('');

    list
      .querySelectorAll('.sl-ice-card')
      .forEach(card => {

        const id =
          card.dataset.id;

        const flavour =
          flavours.find(
            x => String(x.id) === String(id)
          );

        if (!flavour) return;

        card
          .querySelector('[data-act="toggle"]')
          .onclick = async () => {

            await sb.rpc(
              'staff_set_ice_cream_available',
              {
                p_id: flavour.id,
                p_available:
                  !flavour.available_today
              }
            );

            loadFlavours();
          };

        card
          .querySelector('[data-act="edit"]')
          .onclick = () => {
            renderForm(flavour);
          };

        card
          .querySelector('[data-act="hide"]')
          .onclick = async () => {

            const ok =
              confirm(
                `Ukryć smak "${flavour.name}"?`
              );

            if (!ok) return;

            await sb.rpc(
              'staff_archive_ice_cream_flavour',
              {
                p_id: flavour.id
              }
            );

            loadFlavours();
          };
      });
  }

  function renderForm(flavour = null){
    const box =
      document.getElementById('slIceFormBox');

    if (!box) return;

    box.innerHTML = `
      <div class="sl-ice-form">

        <input
          id="slIceName"
          type="text"
          placeholder="Nazwa smaku"
          value="${esc(flavour?.name || '')}"
        >

        <input
          id="slIcePrice"
          type="number"
          min="0"
          step="0.50"
          placeholder="Cena za porcję"
          value="${esc(flavour?.price ?? 10)}"
        >

        <input
          id="slIceBase"
          type="text"
          placeholder="Baza, np. Na śmietance i mleku"
          value="${esc(flavour?.base_label || '')}"
        >

        <input
          id="slIceBadge"
          type="text"
          placeholder="Etykieta, np. 🍪 OREO"
          value="${esc(flavour?.badge || '')}"
        >

        <textarea
          id="slIceDescription"
          placeholder="Krótki opis smaku"
        >${esc(flavour?.description || '')}</textarea>

        <input
          id="slIceImage"
          type="text"
          placeholder="Adres zdjęcia — opcjonalnie"
          value="${esc(flavour?.image_url || '')}"
        >

        <div class="sl-ice-form-actions">

          <button
            type="button"
            class="sl-ice-save"
            id="slIceSave"
          >
            Zapisz smak
          </button>

          <button
            type="button"
            class="sl-ice-cancel"
            id="slIceCancel"
          >
            Anuluj
          </button>

        </div>

      </div>
    `;

    document
      .getElementById('slIceCancel')
      .onclick = () => {
        box.innerHTML = '';
      };

    document
      .getElementById('slIceSave')
      .onclick = async () => {

        const name =
          document
            .getElementById('slIceName')
            .value
            .trim();

        if (!name){
          alert('Wpisz nazwę smaku.');
          return;
        }

        const price =
          Number(
            document
              .getElementById('slIcePrice')
              .value || 10
          );

        const base =
          document
            .getElementById('slIceBase')
            .value
            .trim();

        const badge =
          document
            .getElementById('slIceBadge')
            .value
            .trim();

        const description =
          document
            .getElementById('slIceDescription')
            .value
            .trim();

        const image =
          document
            .getElementById('slIceImage')
            .value
            .trim();

        const {
          error
        } = await sb.rpc(
          'staff_save_ice_cream_flavour',
          {
            p_id:
              flavour?.id || null,

            p_name:
              name,

            p_price:
              price,

            p_image_url:
              image || null,

            p_available_today:
              flavour?.available_today || false,

            p_sort_order:
              flavour?.sort_order || 100,

            p_base_label:
              base || null,

            p_description:
              description || null,

            p_badge:
              badge || null,

            p_graphic_type:
              flavour?.graphic_type || 'app'
          }
        );

        if (error){
          console.error(error);

          alert(
            'Nie udało się zapisać smaku.'
          );

          return;
        }

        box.innerHTML = '';

        await loadFlavours();
      };
  }

  const oldShowStaff =
    window.showStaff;

  function tryMount(){
    const panel =
      document.getElementById('staffPanel');

    if (
      panel &&
      !panel.classList.contains('hidden')
    ){
      mount();
    }
  }

  setInterval(
    tryMount,
    1000
  );

  tryMount();
})();
