(function () {
  'use strict';

  const PANEL_ID = 'slCatalogPanel';
  const LOCALES = [
    ['pl', 'Polski'],
    ['de', 'Deutsch'],
    ['en', 'English'],
    ['cs', 'Čeština']
  ];
  const VISIBILITIES = [
    ['public', 'Publiczne'],
    ['authenticated', 'Zalogowani'],
    ['unlocked', 'Odblokowane nagrodą'],
    ['hidden', 'Ukryte']
  ];
  const PENDING_CLEANUP_KEY = 'swieze-lody-menu-image-cleanup';

  function storedCleanupPath() {
    try {
      return localStorage.getItem(PENDING_CLEANUP_KEY);
    } catch (_) {
      return null;
    }
  }

  function rememberCleanupPath(path) {
    state.pendingCleanupPath = path || null;
    try {
      if (path) localStorage.setItem(PENDING_CLEANUP_KEY, path);
      else localStorage.removeItem(PENDING_CLEANUP_KEY);
    } catch (_) {
      // The in-memory value still protects the current session.
    }
  }

  const state = {
    catalog: null,
    selectedCategoryId: null,
    loaded: false,
    loading: false,
    form: null,
    pendingCleanupPath: storedCleanupPath()
  };

  let panel;
  let messageBox;
  let formHost;
  let categoryList;
  let productTitle;
  let productList;

  function node(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined && text !== null) element.textContent = String(text);
    return element;
  }

  function button(text, className, handler) {
    const element = node('button', className, text);
    element.type = 'button';
    if (handler) element.addEventListener('click', handler);
    return element;
  }

  function field(labelText, control, wide) {
    const label = node('label', `sl-cat-field${wide ? ' sl-cat-wide' : ''}`);
    label.append(node('span', '', labelText), control);
    return label;
  }

  function textInput(name, value, options = {}) {
    const input = document.createElement('input');
    input.type = options.type || 'text';
    input.name = name;
    input.value = value ?? '';
    if (options.placeholder) input.placeholder = options.placeholder;
    if (options.min !== undefined) input.min = String(options.min);
    if (options.step !== undefined) input.step = String(options.step);
    if (options.maxLength) input.maxLength = options.maxLength;
    if (options.required) input.required = true;
    return input;
  }

  function checkInput(name, checked) {
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.name = name;
    input.checked = Boolean(checked);
    return input;
  }

  function selectInput(name, options, value) {
    const select = document.createElement('select');
    select.name = name;
    options.forEach(([optionValue, label]) => {
      const option = document.createElement('option');
      option.value = optionValue;
      option.textContent = label;
      option.selected = String(optionValue) === String(value ?? '');
      select.appendChild(option);
    });
    return select;
  }

  function setMessage(text, type = '') {
    if (!messageBox) return;
    messageBox.textContent = text || '';
    messageBox.className = `sl-cat-message${type ? ` sl-cat-${type}` : ''}`;
    messageBox.hidden = !text;
  }

  function safeImageUrl(value) {
    try {
      const url = new URL(String(value || ''));
      return ['https:', 'http:'].includes(url.protocol) ? url.href : '';
    } catch (_) {
      return '';
    }
  }

  function money(value) {
    const number = Number(value);
    return Number.isFinite(number) ? `${number.toFixed(2).replace('.00', '')} zł` : '—';
  }

  function localDateTime(value) {
    if (!value) return '';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';
    const shifted = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return shifted.toISOString().slice(0, 16);
  }

  function isoOrNull(value) {
    if (!value) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) throw new Error('Nieprawidłowa data lub godzina.');
    return date.toISOString();
  }

  function translationsFor(kind, id) {
    const key = kind === 'category' ? 'category_id' : 'product_id';
    const source = state.catalog?.[`${kind}_translations`] || [];
    return Object.fromEntries(
      source.filter(item => item[key] === id).map(item => [item.locale, item])
    );
  }

  function localizedName(kind, item) {
    const translations = translationsFor(kind, item.id);
    return translations.pl?.name || translations.en?.name || item.slug;
  }

  function rewardOptions(selected) {
    const options = [['', 'Bez wymaganej nagrody']];
    (state.catalog?.rewards || []).forEach(reward => {
      const suffix = reward.active ? '' : ' (nieaktywna)';
      options.push([
        reward.id,
        `${reward.collection_name} — ${reward.reward_name} [${reward.reward_code}]${suffix}`
      ]);
    });
    if (selected && !options.some(([id]) => id === selected)) {
      options.push([selected, `Nieznana nagroda (${selected})`]);
    }
    return options;
  }

  function addTranslationFields(container, translations) {
    const heading = node('h3', 'sl-cat-subtitle', 'Tłumaczenia');
    const grid = node('div', 'sl-cat-translations');
    LOCALES.forEach(([locale, label]) => {
      const box = node('fieldset', 'sl-cat-locale');
      const legend = node('legend', '', `${label} (${locale.toUpperCase()})`);
      const name = textInput(`name_${locale}`, translations[locale]?.name || '', {
        required: true,
        maxLength: 200
      });
      const description = document.createElement('textarea');
      description.name = `description_${locale}`;
      description.maxLength = 2000;
      description.rows = 3;
      description.value = translations[locale]?.description || '';
      box.append(legend, field('Nazwa', name, true), field('Opis', description, true));
      grid.appendChild(box);
    });
    container.append(heading, grid);
  }

  function readTranslations(form) {
    return Object.fromEntries(LOCALES.map(([locale]) => {
      const name = form.elements.namedItem(`name_${locale}`).value.trim();
      if (!name) throw new Error(`Nazwa ${locale.toUpperCase()} jest wymagana.`);
      return [locale, {
        name,
        description: form.elements.namedItem(`description_${locale}`).value.trim() || null
      }];
    }));
  }

  function setFormBusy(form, busy) {
    if (state.form) state.form.busy = busy;
    Array.from(form.elements).forEach(element => {
      element.disabled = busy;
    });
  }

  function closeForm(force = false) {
    if (state.form?.busy && !force) return false;
    if (state.form?.optimized) window.StaffImageUpload.releaseOptimized(state.form.optimized);
    state.form = null;
    if (formHost) formHost.replaceChildren();
    return true;
  }

  async function loadCatalog(options = {}) {
    if (state.loading) return;
    state.loading = true;
    if (!options.quiet) setMessage('Ładowanie katalogu…');
    try {
      const { data, error } = await sb.rpc('staff_get_menu_catalog');
      if (error) throw error;
      const required = ['categories', 'category_translations', 'products', 'product_translations', 'rewards'];
      if (!data || required.some(key => !Array.isArray(data[key]))) {
        throw new Error('Serwer zwrócił niepełny katalog.');
      }
      state.catalog = data;
      state.loaded = true;
      const categoryIds = new Set(data.categories.map(category => category.id));
      if (!categoryIds.has(state.selectedCategoryId)) {
        state.selectedCategoryId = data.categories[0]?.id || null;
      }
      renderCatalog();
      if (!options.keepMessage) setMessage('');
    } catch (error) {
      console.error('STAFF CATALOG LOAD ERROR:', error);
      setMessage(`Nie udało się wczytać katalogu: ${error.message || error}`, 'error');
    } finally {
      state.loading = false;
    }
  }

  function renderCatalog() {
    renderCategories();
    renderProducts();
  }

  function renderCategories() {
    categoryList.replaceChildren();
    const categories = [...(state.catalog?.categories || [])]
      .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0) || a.slug.localeCompare(b.slug));
    if (!categories.length) {
      categoryList.append(node('div', 'sl-cat-empty', 'Brak kategorii.'));
      return;
    }
    categories.forEach(category => {
      const card = button('', `sl-cat-category${category.id === state.selectedCategoryId ? ' is-selected' : ''}`);
      const title = node('strong', '', localizedName('category', category));
      const meta = node('span', '', `${category.slug} · kolejność ${category.sort_order}`);
      const flags = node('span', 'sl-cat-flags');
      flags.append(
        node('span', category.is_active ? 'is-on' : 'is-off', category.is_active ? 'Aktywna' : 'Nieaktywna'),
        node('span', '', category.visibility)
      );
      const edit = button('Edytuj', 'sl-cat-small', event => {
        event.stopPropagation();
        openCategoryForm(category);
      });
      card.append(title, meta, flags, edit);
      card.addEventListener('click', () => {
        if (state.form?.busy) return;
        state.selectedCategoryId = category.id;
        closeForm(true);
        renderCatalog();
      });
      categoryList.appendChild(card);
    });
  }

  function renderProducts() {
    productList.replaceChildren();
    const category = (state.catalog?.categories || []).find(item => item.id === state.selectedCategoryId);
    productTitle.textContent = category ? `Towary: ${localizedName('category', category)}` : 'Towary';
    const products = (state.catalog?.products || [])
      .filter(product => product.category_id === state.selectedCategoryId)
      .filter(product => product.product_type === 'standard' && !product.ice_cream_flavour_id)
      .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0) || a.slug.localeCompare(b.slug));
    if (!category) {
      productList.append(node('div', 'sl-cat-empty', 'Wybierz kategorię.'));
      return;
    }
    if (!products.length) {
      productList.append(node('div', 'sl-cat-empty', 'Brak standardowych towarów w tej kategorii.'));
      return;
    }
    products.forEach(product => {
      const card = node('article', 'sl-cat-product');
      const imageUrl = safeImageUrl(product.image_url);
      if (imageUrl) {
        const image = document.createElement('img');
        image.src = imageUrl;
        image.alt = localizedName('product', product);
        image.loading = 'lazy';
        card.appendChild(image);
      } else {
        card.append(node('div', 'sl-cat-product-placeholder', '📷'));
      }
      const copy = node('div', 'sl-cat-product-copy');
      copy.append(
        node('strong', '', localizedName('product', product)),
        node('span', '', product.legacy_key || 'Brak integration key'),
        node('span', '', `${money(product.regular_price)}${product.promo_price !== null ? ` · promo ${money(product.promo_price)}` : ''}`)
      );
      const flags = node('div', 'sl-cat-flags');
      flags.append(
        node('span', product.is_active ? 'is-on' : 'is-off', product.is_active ? 'active' : 'inactive'),
        node('span', product.is_available ? 'is-on' : 'is-off', product.is_available ? 'available' : 'unavailable'),
        node('span', product.is_orderable ? 'is-on' : 'is-off', product.is_orderable ? 'orderable' : 'not orderable')
      );
      copy.append(flags, button('Edytuj', 'sl-cat-secondary', () => openProductForm(product)));
      card.appendChild(copy);
      productList.appendChild(card);
    });
  }

  function formActions(form, onSave) {
    const actions = node('div', 'sl-cat-actions');
    const save = button('Zapisz', 'sl-cat-primary', onSave);
    save.dataset.action = 'save';
    const cancel = button('Anuluj', 'sl-cat-secondary', () => closeForm());
    cancel.dataset.action = 'cancel';
    actions.append(save, cancel);
    form.appendChild(actions);
  }

  function openCategoryForm(category = null) {
    if (!closeForm()) return;
    const translations = category ? translationsFor('category', category.id) : {};
    const form = node('form', 'sl-cat-form');
    form.noValidate = true;
    const title = node('h3', 'sl-cat-form-title', category ? 'Edytuj kategorię' : 'Nowa kategoria');
    const errorBox = node('div', 'sl-cat-form-error');
    errorBox.hidden = true;
    const grid = node('div', 'sl-cat-form-grid');
    grid.append(
      field('Slug', textInput('slug', category?.slug || '', { required: true, maxLength: 100 })),
      field('Ikona', textInput('icon', category?.icon || '', { maxLength: 32 })),
      field('Sort order', textInput('sort_order', category?.sort_order ?? 0, { type: 'number', step: 1, required: true })),
      field('Visibility', selectInput('visibility', VISIBILITIES, category?.visibility || 'public')),
      field('Wymagana nagroda', selectInput('required_reward_id', rewardOptions(category?.required_reward_id), category?.required_reward_id), true),
      field('Dostępna od', textInput('available_starts_at', localDateTime(category?.available_starts_at), { type: 'datetime-local' })),
      field('Dostępna do', textInput('available_ends_at', localDateTime(category?.available_ends_at), { type: 'datetime-local' })),
      field('Aktywna', checkInput('is_active', category?.is_active ?? true))
    );
    form.append(title, errorBox, grid);
    addTranslationFields(form, translations);
    formActions(form, () => saveCategory(form, category, errorBox));
    form.addEventListener('submit', event => event.preventDefault());
    state.form = { kind: 'category', busy: false };
    formHost.replaceChildren(form);
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  function showFormError(box, error) {
    box.textContent = error?.message || String(error || 'Nieznany błąd.');
    box.hidden = false;
  }

  async function saveCategory(form, category, errorBox) {
    if (state.form?.busy) return;
    if (!form.reportValidity()) return;
    errorBox.hidden = true;
    setFormBusy(form, true);
    try {
      const payload = {
        p_id: category?.id || null,
        p_slug: form.elements.namedItem('slug').value.trim(),
        p_icon: form.elements.namedItem('icon').value.trim() || null,
        p_image_url: category?.image_url || null,
        p_sort_order: Number(form.elements.namedItem('sort_order').value),
        p_is_active: form.elements.namedItem('is_active').checked,
        p_visibility: form.elements.namedItem('visibility').value,
        p_available_starts_at: isoOrNull(form.elements.namedItem('available_starts_at').value),
        p_available_ends_at: isoOrNull(form.elements.namedItem('available_ends_at').value),
        p_required_reward_id: form.elements.namedItem('required_reward_id').value || null,
        p_translations: readTranslations(form)
      };
      const { data, error } = await sb.rpc('staff_save_menu_category', payload);
      if (error) throw error;
      state.selectedCategoryId = data;
      closeForm(true);
      await loadCatalog({ quiet: true });
      setMessage(category ? 'Kategoria została zaktualizowana.' : 'Kategoria została utworzona.', 'success');
    } catch (error) {
      console.error('CATEGORY SAVE ERROR:', error);
      showFormError(errorBox, error);
      setFormBusy(form, false);
    }
  }

  function renderImagePreview(box, product) {
    box.replaceChildren();
    const current = state.form;
    const url = current?.optimized?.previewUrl || (!current?.removeExisting ? safeImageUrl(product?.image_url) : '');
    if (url) {
      const image = document.createElement('img');
      image.src = url;
      image.alt = 'Podgląd zdjęcia produktu';
      box.appendChild(image);
    } else {
      box.append(node('div', 'sl-cat-image-empty', 'Brak zdjęcia'));
    }
    if (current?.optimized) {
      box.append(node('small', '', `${current.optimized.width}×${current.optimized.height} · ${(current.optimized.blob.size / 1024).toFixed(0)} KB`));
    }
  }

  async function chooseImage(file, preview, status) {
    if (!file || !state.form || state.form.kind !== 'product') return;
    const token = Symbol('image');
    state.form.imageToken = token;
    state.form.imageProcessing = true;
    const saveButton = preview.closest('form')?.querySelector('[data-action="save"]');
    if (saveButton) saveButton.disabled = true;
    status.textContent = 'Optymalizacja zdjęcia…';
    try {
      const optimized = await window.StaffImageUpload.optimizeImage(file);
      if (!state.form || state.form.imageToken !== token) {
        window.StaffImageUpload.releaseOptimized(optimized);
        return;
      }
      if (state.form.optimized) window.StaffImageUpload.releaseOptimized(state.form.optimized);
      state.form.optimized = optimized;
      state.form.removeExisting = false;
      status.textContent = 'Zdjęcie gotowe do wysłania podczas zapisu.';
      renderImagePreview(preview, state.form.product);
    } catch (error) {
      console.error('IMAGE OPTIMIZE ERROR:', error);
      status.textContent = error.message || String(error);
    } finally {
      if (state.form?.imageToken === token) {
        state.form.imageProcessing = false;
        if (saveButton) saveButton.disabled = false;
      }
    }
  }

  function openProductForm(product = null) {
    if (!state.selectedCategoryId || !closeForm()) return;
    const translations = product ? translationsFor('product', product.id) : {};
    const form = node('form', 'sl-cat-form');
    form.noValidate = true;
    const title = node('h3', 'sl-cat-form-title', product ? 'Edytuj towar' : 'Nowy towar');
    const legacy = node('div', 'sl-cat-legacy', product
      ? `Integration key: ${product.legacy_key || 'brak'} (tylko do odczytu)`
      : 'Integration key zostanie wygenerowany przez serwer jako menu:<UUID>.');
    const errorBox = node('div', 'sl-cat-form-error');
    errorBox.hidden = true;
    const categories = (state.catalog?.categories || []).map(category => [category.id, localizedName('category', category)]);
    const grid = node('div', 'sl-cat-form-grid');
    grid.append(
      field('Kategoria', selectInput('category_id', categories, product?.category_id || state.selectedCategoryId)),
      field('Slug', textInput('slug', product?.slug || '', { required: true, maxLength: 100 })),
      field('Cena regularna', textInput('regular_price', product?.regular_price ?? '', { type: 'number', min: 0, step: 0.01, required: true })),
      field('Cena promo', textInput('promo_price', product?.promo_price ?? '', { type: 'number', min: 0, step: 0.01 })),
      field('Promo od', textInput('promo_starts_at', localDateTime(product?.promo_starts_at), { type: 'datetime-local' })),
      field('Promo do', textInput('promo_ends_at', localDateTime(product?.promo_ends_at), { type: 'datetime-local' })),
      field('Badge', textInput('badge', product?.badge || '', { maxLength: 100 })),
      field('Nowość do', textInput('new_until', localDateTime(product?.new_until), { type: 'datetime-local' })),
      field('Sort order', textInput('sort_order', product?.sort_order ?? 0, { type: 'number', step: 1, required: true })),
      field('Visibility', selectInput('visibility', VISIBILITIES, product?.visibility || 'public')),
      field('Wymagana nagroda', selectInput('required_reward_id', rewardOptions(product?.required_reward_id), product?.required_reward_id), true),
      field('Dostępny od', textInput('available_starts_at', localDateTime(product?.available_starts_at), { type: 'datetime-local' })),
      field('Dostępny do', textInput('available_ends_at', localDateTime(product?.available_ends_at), { type: 'datetime-local' })),
      field('Nowość', checkInput('is_new', product?.is_new ?? false)),
      field('Aktywny', checkInput('is_active', product?.is_active ?? true)),
      field('Dostępny', checkInput('is_available', product?.is_available ?? true)),
      field('Można zamówić', checkInput('is_orderable', product?.is_orderable ?? true))
    );

    const imageSection = node('section', 'sl-cat-image-section');
    imageSection.append(node('h3', 'sl-cat-subtitle', 'Zdjęcie produktu'));
    const preview = node('div', 'sl-cat-image-preview');
    const imageStatus = node('div', 'sl-cat-image-status', 'Oryginał do 15 MB; wynik JPEG do 1400 px i 3 MB.');
    const file = document.createElement('input');
    file.type = 'file';
    file.name = 'image_file';
    file.accept = 'image/*';
    file.hidden = true;
    const choose = button('Wybierz zdjęcie', 'sl-cat-secondary', () => file.click());
    const remove = button('Usuń zdjęcie', 'sl-cat-danger', () => {
      if (state.form?.busy) return;
      state.form.imageToken = Symbol('image-cancelled');
      state.form.imageProcessing = false;
      if (state.form?.optimized) window.StaffImageUpload.releaseOptimized(state.form.optimized);
      state.form.optimized = null;
      state.form.removeExisting = true;
      const saveButton = form.querySelector('[data-action="save"]');
      if (saveButton) saveButton.disabled = false;
      file.value = '';
      imageStatus.textContent = 'Zdjęcie zostanie usunięte po zapisaniu produktu.';
      renderImagePreview(preview, product);
    });
    file.addEventListener('change', () => chooseImage(file.files?.[0], preview, imageStatus));
    const imageActions = node('div', 'sl-cat-image-actions');
    imageActions.append(choose, remove, file);
    imageSection.append(preview, imageActions, imageStatus);

    form.append(title, legacy, errorBox, grid, imageSection);
    addTranslationFields(form, translations);
    formActions(form, () => saveProduct(form, product, errorBox, imageStatus));
    form.addEventListener('submit', event => event.preventDefault());
    state.form = {
      kind: 'product',
      product,
      busy: false,
      optimized: null,
      removeExisting: false,
      imageToken: null,
      imageProcessing: false
    };
    renderImagePreview(preview, product);
    formHost.replaceChildren(form);
    form.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  async function cleanupPendingUpload() {
    if (!state.pendingCleanupPath) return;
    const path = state.pendingCleanupPath;
    await window.StaffImageUpload.remove(sb, path);
    if (state.pendingCleanupPath === path) rememberCleanupPath(null);
  }

  async function saveProduct(form, product, errorBox, imageStatus) {
    if (state.form?.busy) return;
    if (state.form?.imageProcessing) {
      showFormError(errorBox, new Error('Poczekaj na zakończenie optymalizacji zdjęcia.'));
      return;
    }
    if (!form.reportValidity()) return;
    errorBox.hidden = true;
    setFormBusy(form, true);
    let uploaded = null;
    try {
      if (state.pendingCleanupPath) {
        imageStatus.textContent = 'Usuwanie pliku po poprzedniej nieudanej próbie…';
        try {
          await cleanupPendingUpload();
        } catch (cleanupError) {
          throw new Error(`Nie można usunąć pliku po poprzedniej próbie: ${cleanupError.message || cleanupError}. Nowe zdjęcie nie zostało wysłane.`);
        }
      }

      if (state.form.optimized) {
        imageStatus.textContent = 'Wysyłanie zoptymalizowanego zdjęcia…';
        uploaded = await window.StaffImageUpload.upload(sb, state.form.optimized);
      }

      const regularPrice = Number(form.elements.namedItem('regular_price').value);
      const promoRaw = form.elements.namedItem('promo_price').value;
      const imageUrl = uploaded?.publicUrl
        || (state.form.removeExisting ? null : product?.image_url || null);
      const payload = {
        p_id: product?.id || null,
        p_category_id: form.elements.namedItem('category_id').value,
        p_slug: form.elements.namedItem('slug').value.trim(),
        p_image_url: imageUrl,
        p_regular_price: regularPrice,
        p_promo_price: promoRaw === '' ? null : Number(promoRaw),
        p_promo_starts_at: isoOrNull(form.elements.namedItem('promo_starts_at').value),
        p_promo_ends_at: isoOrNull(form.elements.namedItem('promo_ends_at').value),
        p_badge: form.elements.namedItem('badge').value.trim() || null,
        p_is_new: form.elements.namedItem('is_new').checked,
        p_new_until: isoOrNull(form.elements.namedItem('new_until').value),
        p_is_active: form.elements.namedItem('is_active').checked,
        p_is_available: form.elements.namedItem('is_available').checked,
        p_sort_order: Number(form.elements.namedItem('sort_order').value),
        p_visibility: form.elements.namedItem('visibility').value,
        p_is_orderable: form.elements.namedItem('is_orderable').checked,
        p_available_starts_at: isoOrNull(form.elements.namedItem('available_starts_at').value),
        p_available_ends_at: isoOrNull(form.elements.namedItem('available_ends_at').value),
        p_required_reward_id: form.elements.namedItem('required_reward_id').value || null,
        p_translations: readTranslations(form)
      };

      imageStatus.textContent = 'Zapisywanie produktu…';
      const { data, error } = await sb.rpc('staff_save_menu_product', payload);
      if (error) throw error;

      const oldPath = window.StaffImageUpload.pathFromPublicUrl(product?.image_url);
      const newPath = uploaded?.path || null;
      const oldNeedsRemoval = oldPath && oldPath !== newPath
        && (Boolean(uploaded) || state.form.removeExisting);
      let cleanupWarning = '';
      if (oldNeedsRemoval) {
        try {
          await window.StaffImageUpload.remove(sb, oldPath);
        } catch (cleanupError) {
          cleanupWarning = ` Produkt zapisano, ale starego zdjęcia nie udało się usunąć: ${cleanupError.message || cleanupError}`;
          rememberCleanupPath(oldPath);
        }
      }

      state.selectedCategoryId = payload.p_category_id;
      closeForm(true);
      await loadCatalog({ quiet: true });
      setMessage(`${product ? 'Produkt został zaktualizowany.' : 'Produkt został utworzony.'}${cleanupWarning}`, cleanupWarning ? 'warning' : 'success');
      return data;
    } catch (saveError) {
      let cleanupError = null;
      if (saveError?.cleanupPath) rememberCleanupPath(saveError.cleanupPath);
      if (uploaded?.path) {
        try {
          await window.StaffImageUpload.remove(sb, uploaded.path);
        } catch (error) {
          cleanupError = error;
          rememberCleanupPath(uploaded.path);
        }
      }
      const combined = cleanupError
        ? new Error(`Nie udało się zapisać produktu: ${saveError.message || saveError}. Nie udało się też usunąć wysłanego zdjęcia: ${cleanupError.message || cleanupError}. Przed kolejnym uploadem spróbujemy ponownie usunąć plik.`)
        : saveError;
      console.error('PRODUCT SAVE ERROR:', saveError, cleanupError || 'cleanup ok');
      showFormError(errorBox, combined);
      imageStatus.textContent = state.form?.optimized
        ? 'Wybrane zdjęcie pozostaje gotowe do ponownej próby.'
        : 'Zdjęcie nie zostało zmienione.';
      setFormBusy(form, false);
    }
  }

  function injectStyles() {
    if (document.getElementById('slCatalogStyles')) return;
    const style = document.createElement('style');
    style.id = 'slCatalogStyles';
    style.textContent = `
      #${PANEL_ID}{margin:22px 0;padding:18px;border-radius:20px;background:#fff;box-shadow:0 10px 32px rgba(0,0,0,.09)}
      .sl-cat-head,.sl-cat-products-head,.sl-cat-actions,.sl-cat-image-actions{display:flex;gap:10px;align-items:center;justify-content:space-between;flex-wrap:wrap}
      .sl-cat-title,.sl-cat-form-title{margin:0}.sl-cat-muted,.sl-cat-legacy,.sl-cat-image-status{color:#666;font-size:13px}
      .sl-cat-primary,.sl-cat-secondary,.sl-cat-danger,.sl-cat-small,.sl-cat-add{border:0;border-radius:12px;padding:10px 14px;font-weight:800;cursor:pointer}
      .sl-cat-primary,.sl-cat-add{background:#ffc928;color:#171717}.sl-cat-secondary,.sl-cat-small{background:#eceff3;color:#171717}.sl-cat-danger{background:#ffe3e3;color:#9d1c1c}
      .sl-cat-message,.sl-cat-form-error{margin:12px 0;padding:11px 13px;border-radius:12px;background:#f2f5f7}.sl-cat-error,.sl-cat-form-error{background:#ffe7e7;color:#8d1616}.sl-cat-success{background:#e4f7e9;color:#17652d}.sl-cat-warning{background:#fff1cf;color:#765400}
      .sl-cat-layout{display:grid;grid-template-columns:minmax(220px,300px) minmax(0,1fr);gap:16px;margin-top:16px}.sl-cat-category-list{display:grid;gap:9px;align-content:start}
      .sl-cat-category{text-align:left;border:1px solid #dde2e7;border-radius:14px;background:#fff;padding:12px;display:grid;gap:5px;cursor:pointer}.sl-cat-category.is-selected{border-color:#f0b800;box-shadow:0 0 0 2px #ffe48b}.sl-cat-category>span{font-size:12px;color:#626b72}.sl-cat-category .sl-cat-small{justify-self:start;padding:6px 9px}
      .sl-cat-products{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:12px}.sl-cat-product{border:1px solid #e0e4e8;border-radius:16px;overflow:hidden;background:#fff;display:grid;grid-template-columns:100px minmax(0,1fr);min-height:120px}.sl-cat-product img,.sl-cat-product-placeholder{width:100px;height:100%;min-height:120px;object-fit:cover;background:#f3f3f3;display:grid;place-items:center;font-size:28px}.sl-cat-product-copy{padding:12px;display:grid;gap:6px;align-content:start}.sl-cat-product-copy>span{font-size:12px;color:#626b72;overflow-wrap:anywhere}
      .sl-cat-flags{display:flex;gap:5px;flex-wrap:wrap}.sl-cat-flags span{font-size:10px;padding:3px 7px;border-radius:999px;background:#e8ebee;color:#4f565c}.sl-cat-flags .is-on{background:#dff5e5;color:#17652d}.sl-cat-flags .is-off{background:#f4e2e2;color:#8d2525}
      .sl-cat-form{max-width:760px;margin:18px auto;padding:16px;border:1px solid #dce1e5;border-radius:18px;background:#fafbfc}.sl-cat-form-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin:14px 0}.sl-cat-field{display:grid;gap:5px;font-size:12px;font-weight:700}.sl-cat-field input:not([type=checkbox]),.sl-cat-field select,.sl-cat-field textarea{width:100%;box-sizing:border-box;border:1px solid #cfd6dc;border-radius:10px;padding:10px;background:#fff;font:inherit}.sl-cat-field input[type=checkbox]{width:24px;height:24px}.sl-cat-wide{grid-column:1/-1}.sl-cat-subtitle{font-size:15px;margin:18px 0 9px}.sl-cat-translations{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.sl-cat-locale{border:1px solid #dce1e5;border-radius:13px;padding:10px;display:grid;gap:8px}.sl-cat-locale legend{font-weight:800;padding:0 5px}.sl-cat-actions{justify-content:flex-end;margin-top:16px}
      .sl-cat-image-section{margin-top:14px}.sl-cat-image-preview{max-width:360px;min-height:150px;border:1px dashed #bfc7ce;border-radius:14px;overflow:hidden;background:#f0f2f4;display:grid;place-items:center;gap:4px}.sl-cat-image-preview img{width:100%;max-height:300px;object-fit:contain}.sl-cat-image-preview small{padding:5px}.sl-cat-image-actions{justify-content:flex-start;margin-top:9px}.sl-cat-image-empty,.sl-cat-empty{padding:20px;text-align:center;color:#777}
      @media(max-width:900px){.sl-cat-layout{grid-template-columns:1fr}.sl-cat-category-list{grid-template-columns:repeat(2,minmax(0,1fr))}.sl-cat-products{grid-template-columns:1fr}}
      @media(max-width:600px){#${PANEL_ID}{padding:13px}.sl-cat-category-list,.sl-cat-form-grid,.sl-cat-translations{grid-template-columns:1fr}.sl-cat-product{grid-template-columns:88px minmax(0,1fr)}.sl-cat-product img,.sl-cat-product-placeholder{width:88px}.sl-cat-form{padding:12px}.sl-cat-wide{grid-column:auto}}
      button:disabled,input:disabled,select:disabled,textarea:disabled{opacity:.62;cursor:not-allowed}
    `;
    document.head.appendChild(style);
  }

  function mount() {
    const staffPanel = document.getElementById('staffPanel');
    if (!staffPanel || document.getElementById(PANEL_ID)) return;
    injectStyles();
    panel = node('section');
    panel.id = PANEL_ID;
    panel.className = 'panel';
    const head = node('div', 'sl-cat-head');
    const heading = node('div');
    heading.append(
      node('h2', 'sl-cat-title', '🧾 UNIWERSALNY KATALOG'),
      node('div', 'sl-cat-muted', 'Kategorie i standardowe towary. Lody pozostają w osobnym module.')
    );
    head.append(heading, button('+ Dodaj kategorię', 'sl-cat-add', () => openCategoryForm()));
    messageBox = node('div', 'sl-cat-message');
    messageBox.hidden = true;
    formHost = node('div');
    const layout = node('div', 'sl-cat-layout');
    const categoriesPane = node('section');
    categoriesPane.append(node('h3', 'sl-cat-subtitle', 'Kategorie'));
    categoryList = node('div', 'sl-cat-category-list');
    categoriesPane.appendChild(categoryList);
    const productsPane = node('section');
    const productsHead = node('div', 'sl-cat-products-head');
    productTitle = node('h3', 'sl-cat-subtitle', 'Towary');
    productsHead.append(productTitle, button('+ Dodaj towar', 'sl-cat-add', () => openProductForm()));
    productList = node('div', 'sl-cat-products');
    productsPane.append(productsHead, productList);
    layout.append(categoriesPane, productsPane);
    panel.append(head, messageBox, formHost, layout);
    staffPanel.prepend(panel);

    window.addEventListener('staff-access-changed', event => {
      if (event.detail?.authorized) loadCatalog();
      else {
        if (state.form?.busy) {
          setMessage('Sesja staff wygasła podczas zapisu. Operacja zostanie zakończona bez zamykania formularza; w razie błędu zdjęcie zostanie rozliczone.', 'warning');
        } else {
          closeForm(true);
        }
        state.catalog = null;
        state.loaded = false;
        categoryList.replaceChildren();
        productList.replaceChildren();
      }
    });

    document.getElementById('logoutBtn')?.addEventListener('click', event => {
      if (!state.form?.busy) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      setMessage('Poczekaj na zakończenie zapisu przed wylogowaniem.', 'warning');
    }, true);

    if (state.pendingCleanupPath) {
      setMessage('Pozostał plik do usunięcia po wcześniejszej nieudanej operacji. Zostanie usunięty przed następnym uploadem.', 'warning');
    }
    if (!staffPanel.classList.contains('hidden')) {
      loadCatalog({ keepMessage: Boolean(state.pendingCleanupPath) });
    }
  }

  mount();
})();
