/* =========================================================
   ŚWIEŻE LODY — STAFF ICE CREAM
   AKTUALNE / UKRYTE
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
      border:2px solid #ddd;
    }

    .sl-ice-card.active{
      border-color:#20b26b;
      background:#f1fff7;
    }

    .sl-ice-name{
      font-family:"Bangers", Impact, sans-serif;
      font-size:27px;
      letter-spacing:.7px;
      margin-bottom:5px;
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
      line-height:1.4;
      margin-bottom:10px;
    }

    .sl-ice-price{
      font-size:19px;
      font-weight:900;
      margin-bottom:12px;
    }

    .sl-ice-state{
      display:grid;
      grid-template-columns:1fr 1fr;
      gap:8px;
      margin-bottom:8px;
    }

    .sl-ice-state button{
      border:2px solid transparent;
      border-radius:12px;
      padding:11px 8px;
      font-weight:900;
      cursor:pointer;
    }

    .sl-ice-current{
      background:#20b26b;
      color:#fff;
      border-color:#12884e !important;
      box-shadow:0 3px 12px rgba(32,178,107,.25);
    }

    .sl-ice-current-inactive{
      background:#e9e9e9;
      color:#999;
    }

    .sl-ice-hidden{
      background:#222;
      color:#fff;
      border-color:#000 !important;
    }

    .sl-ice-hidden-inactive{
      background:#eee;
      color:#777;
    }

    .sl-ice-edit{
      width:100%;
      border:0;
      border-radius:11px;
      padding:10px;
      background:#dbe8ff;
      font-weight:900;
      cursor:pointer;
    }

    .sl-ice-form{
      display:grid;
      gap:10px;
      margin:14px 0;
      padding:14px;
      border-radius:15px;
      background:#fff8dd;
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
      min-height:85px;
      resize:vertical;
    }

    .sl-ice-image-picker{
      display:grid;
      gap:10px;
      padding:12px;
      border:1px solid #e1d49f;
      border-radius:12px;
      background:#fff;
    }

    .sl-ice-file-input{
      position:absolute;
      width:1px !important;
      height:1px;
      padding:0 !important;
      margin:-1px !important;
      overflow:hidden;
      clip:rect(0, 0, 0, 0);
      white-space:nowrap;
      border:0 !important;
    }

    .sl-ice-image-actions{
      display:flex;
      gap:8px;
      flex-wrap:wrap;
    }

    .sl-ice-image-choose,
    .sl-ice-image-remove{
      border:1px solid #ddd;
      border-radius:11px;
      background:#fff;
      padding:10px 12px;
      font-weight:900;
      cursor:pointer;
    }

    .sl-ice-image-remove{
      color:#8f0000;
    }

    .sl-ice-image-preview{
      width:100%;
      max-height:320px;
      object-fit:cover;
      border-radius:12px;
      background:#f2f2f2;
    }

    .sl-ice-image-help{
      color:#777;
      font-size:13px;
      line-height:1.4;
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

  let activePreviewUrl = null;
  let formSaveInProgress = false;


  function releasePreviewUrl(){
    if (!activePreviewUrl) return;

    URL.revokeObjectURL(activePreviewUrl);
    activePreviewUrl = null;
  }


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

    const panel =
      document.createElement('section');

    panel.id = PANEL_ID;
    panel.className = 'panel';

    panel.innerHTML = `
      <div class="sl-ice-head">

        <div>
          <h2 class="sl-ice-title">
            🍦 DZISIEJSZE SMAKI LODÓW
          </h2>

          <div class="muted">
            Zielone = klient widzi smak.
            Ukryte = smak zostaje tylko tutaj.
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
      .onclick = () => renderForm();

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
        ? data
        : [];

    if (!flavours.length){
      list.innerHTML =
        '<div class="sl-ice-empty">Brak zapisanych smaków.</div>';

      return;
    }

    list.innerHTML =
      flavours.map(flavour => {

        const active =
          flavour.available_today === true;

        return `
          <article
            class="sl-ice-card ${active ? 'active' : ''}"
            data-id="${esc(flavour.id)}"
          >

            <div class="sl-ice-name">
              ${esc(flavour.name)}
            </div>

            ${
              flavour.badge
                ? `
                  <div class="sl-ice-badge">
                    ${esc(flavour.badge)}
                  </div>
                `
                : ''
            }

            ${
              flavour.base_label
                ? `
                  <div class="sl-ice-base">
                    ${
                      String(flavour.base_label)
                        .toLowerCase()
                        .includes('jogur')
                        ? '🥣'
                        : '🥛'
                    }
                    ${esc(flavour.base_label)}
                  </div>
                `
                : ''
            }

            ${
              flavour.description
                ? `
                  <div class="sl-ice-desc">
                    ${esc(flavour.description)}
                  </div>
                `
                : ''
            }

            <div class="sl-ice-price">
              ${money(flavour.price)} / porcja
            </div>

            <div class="sl-ice-state">

              <button
                type="button"
                data-act="active"
                class="${
                  active
                    ? 'sl-ice-current'
                    : 'sl-ice-current-inactive'
                }"
              >
                🟢 AKTUALNE
              </button>

              <button
                type="button"
                data-act="hidden"
                class="${
                  active
                    ? 'sl-ice-hidden-inactive'
                    : 'sl-ice-hidden'
                }"
              >
                ⚫ UKRYTE
              </button>

            </div>

            <button
              type="button"
              class="sl-ice-edit"
              data-act="edit"
            >
              ✏️ Edytuj
            </button>

          </article>
        `;
      }).join('');


    list
      .querySelectorAll('.sl-ice-card')
      .forEach(card => {

        const flavour =
          flavours.find(
            item =>
              String(item.id) ===
              String(card.dataset.id)
          );

        if (!flavour) return;


        card
          .querySelector('[data-act="active"]')
          .onclick = async () => {

            const {
              error
            } = await sb.rpc(
              'staff_set_ice_cream_available',
              {
                p_id: flavour.id,
                p_available: true
              }
            );

            if (error){
              console.error(error);
              alert('Nie udało się zmienić statusu.');
              return;
            }

            loadFlavours();
          };


        card
          .querySelector('[data-act="hidden"]')
          .onclick = async () => {

            const {
              error
            } = await sb.rpc(
              'staff_set_ice_cream_available',
              {
                p_id: flavour.id,
                p_available: false
              }
            );

            if (error){
              console.error(error);
              alert('Nie udało się zmienić statusu.');
              return;
            }

            loadFlavours();
          };


        card
          .querySelector('[data-act="edit"]')
          .onclick = () => {
            renderForm(flavour);
          };
      });
  }


  function renderForm(flavour = null){
    if (formSaveInProgress){
      alert('Trwa zapisywanie smaku. Poczekaj na zakończenie.');
      return;
    }

    const box =
      document.getElementById('slIceFormBox');

    if (!box) return;

    releasePreviewUrl();

    let selectedImage = null;
    let savedImageUrl =
      flavour?.image_url || null;

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
          min="0.5"
          step="0.50"
          placeholder="Cena za porcję"
          value="${esc(flavour?.price ?? 10)}"
        >

        <input
          id="slIceBase"
          type="text"
          placeholder="Np. Na śmietance i mleku"
          value="${esc(
            flavour?.base_label ||
            'Na śmietance i mleku'
          )}"
        >

        <input
          id="slIceBadge"
          type="text"
          placeholder="Np. 🍪 OREO"
          value="${esc(flavour?.badge || '')}"
        >

        <textarea
          id="slIceDescription"
          placeholder="Piękny krótki opis smaku"
        >${esc(flavour?.description || '')}</textarea>

        <div class="sl-ice-image-picker">

          <input
            id="slIceImageFile"
            class="sl-ice-file-input"
            type="file"
            accept="image/*"
          >

          <div class="sl-ice-image-actions">
            <button
              type="button"
              class="sl-ice-image-choose"
              id="slIceChooseImage"
            >
              Wybierz zdjęcie
            </button>

            <button
              type="button"
              class="sl-ice-image-remove hidden"
              id="slIceRemoveImage"
            >
              Usuń zdjęcie
            </button>
          </div>

          <img
            id="slIceImagePreview"
            class="sl-ice-image-preview hidden"
            alt="Podgląd zdjęcia smaku"
          >

          <div class="sl-ice-image-help">
            Maksymalnie 15 MB. Zdjęcie zostanie automatycznie
            zmniejszone i zapisane jako JPEG.
          </div>

        </div>

        <div class="sl-ice-form-actions">

          <button
            type="button"
            class="sl-ice-save"
            id="slIceSave"
          >
            Zapisz
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


    const fileInput =
      document.getElementById('slIceImageFile');

    const chooseImageButton =
      document.getElementById('slIceChooseImage');

    const removeImageButton =
      document.getElementById('slIceRemoveImage');

    const imagePreview =
      document.getElementById('slIceImagePreview');


    function showImagePreview(url, isNewSelection = false){
      if (!url){
        imagePreview.removeAttribute('src');
        imagePreview.classList.add('hidden');
        removeImageButton.classList.add('hidden');
        return;
      }

      imagePreview.src = url;
      imagePreview.classList.remove('hidden');
      removeImageButton.classList.remove('hidden');
      removeImageButton.textContent =
        isNewSelection
          ? 'Usuń wybrane zdjęcie'
          : 'Usuń zdjęcie';
    }


    showImagePreview(savedImageUrl);


    chooseImageButton.onclick = () => {
      fileInput.click();
    };


    fileInput.onchange = () => {
      const file = fileInput.files?.[0];

      if (!file) return;

      try {
        window.ImageUpload.validateFile(file);
      } catch (error) {
        fileInput.value = '';
        alert(error.message);
        return;
      }

      releasePreviewUrl();
      selectedImage = file;
      activePreviewUrl = URL.createObjectURL(file);
      showImagePreview(activePreviewUrl, true);
    };


    removeImageButton.onclick = () => {
      if (selectedImage){
        selectedImage = null;
        fileInput.value = '';
        releasePreviewUrl();
        showImagePreview(savedImageUrl);
        return;
      }

      savedImageUrl = null;
      showImagePreview(null);
    };


    document
      .getElementById('slIceCancel')
      .onclick = () => {
        if (formSaveInProgress) return;

        releasePreviewUrl();
        box.innerHTML = '';
      };


    document
      .getElementById('slIceSave')
      .onclick = async () => {

        if (formSaveInProgress) return;

        const saveButton =
          document.getElementById('slIceSave');

        const form =
          saveButton?.closest('.sl-ice-form');

        if (!saveButton || !form) return;

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

        let uploadedImage = null;
        let saveCompleted = false;
        let cleanupError = null;

        const controlsToLock = [
          ...form.querySelectorAll(
            'input, textarea, button'
          ),
          document.getElementById('slIceAdd'),
          document.getElementById('logoutBtn'),
          ...document.querySelectorAll('#slIceList button')
        ].filter(Boolean);

        const controlStates =
          controlsToLock.map(
            control => ({
              control,
              disabled: control.disabled
            })
          );

        formSaveInProgress = true;

        controlsToLock.forEach(control => {
          control.disabled = true;
        });

        saveButton.textContent =
          selectedImage
            ? 'Przetwarzanie zdjęcia…'
            : 'Zapisywanie…';

        try {
          if (selectedImage){
            uploadedImage =
              await window.ImageUpload.uploadImage(
                sb,
                selectedImage
              );
          }

          const imageUrl =
            uploadedImage?.publicUrl ||
            savedImageUrl ||
            null;

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
                imageUrl,

              p_available_today:
                flavour?.available_today ?? false,

              p_sort_order:
                flavour?.sort_order ?? 100,

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
            throw error;
          }

          saveCompleted = true;
          releasePreviewUrl();
          box.innerHTML = '';

          await loadFlavours();
        } catch (error) {
          console.error(error);

          if (
            uploadedImage?.path &&
            !saveCompleted
          ){
            try {
              await window.ImageUpload.removeUploadedImage(
                sb,
                uploadedImage.path
              );
            } catch (cleanupFailure) {
              cleanupError = cleanupFailure;

              console.error(
                'Nie udało się usunąć przesłanego zdjęcia.',
                cleanupFailure
              );
            }
          }

          const saveErrorMessage =
            error?.message ||
            'Nie udało się zapisać smaku.';

          if (cleanupError){
            alert(
              `Nie udało się zapisać smaku.\n` +
              `Błąd zapisu: ${saveErrorMessage}\n\n` +
              `Nie udało się też usunąć przesłanego zdjęcia.\n` +
              `Błąd usuwania: ${
                cleanupError?.message ||
                'Nieznany błąd.'
              }`
            );
          } else {
            alert(saveErrorMessage);
          }
        } finally {
          formSaveInProgress = false;

          controlStates.forEach(
            ({ control, disabled }) => {
              if (document.body.contains(control)){
                control.disabled = disabled;
              }
            }
          );

          if (document.body.contains(saveButton)){
            saveButton.textContent = 'Zapisz';
          }
        }
      };
  }


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
