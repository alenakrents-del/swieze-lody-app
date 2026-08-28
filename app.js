function applyTranslations() {
  document.documentElement.lang =
    currentLang === 'cs' ? 'cs' : currentLang;

  // Все обычные тексты
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;

    if (T[currentLang]?.[key]) {
      el.textContent = T[currentLang][key];
    }
  });

  // Активная кнопка языка
  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.classList.toggle(
      'active',
      btn.dataset.lang === currentLang
    );
  });

  // Заголовок текущей коллекции
  const collectionTitleEl =
    document.querySelector('#collectionTitle');

  if (collectionTitleEl) {
    if (currentCollection === 'MILKSHAKE') {
      collectionTitleEl.textContent =
        tr('milkshakeCollection');
    }

    if (currentCollection === 'LEMONADE') {
      collectionTitleEl.textContent =
        tr('lemonadeCollection');
    }

    if (currentCollection === 'VACATION') {
      collectionTitleEl.textContent =
        tr('vacationCollection');
    }
  }

  // Секретная награда + подсказка
  const secretLabel =
    document.querySelector('#secretLabel');

  const hint =
    document.querySelector('#hint');

  if (currentCollection === 'MILKSHAKE') {
    if (secretLabel) {
      secretLabel.textContent =
        tr('secretDessertLabel');
    }

    if (hint) {
      hint.textContent =
        tr('milkshakeHint');
    }
  }

  if (currentCollection === 'LEMONADE') {
    if (secretLabel) {
      secretLabel.textContent =
        tr('secretLemonadeLabel');
    }

    if (hint) {
      hint.textContent =
        tr('lemonadeHint');
    }
  }

  if (currentCollection === 'VACATION') {
    if (secretLabel) {
      secretLabel.textContent =
        tr('missionRewardLabel');
    }

    if (hint) {
      hint.textContent =
        tr('vacationHint');
    }
  }

  // Награда Milkshake
  const rewardTitle =
    document.querySelector('#rewardTitle');

  if (rewardTitle) {
    rewardTitle.textContent =
      tr('freeTopping');
  }

  // Перерисовываем topping-и
  renderToppings();

  // Если каталог уже загружен —
  // перерисовываем карточки и их названия
  if (DATA[currentCollection]) {
    renderCollection(currentCollection);
  }
}
