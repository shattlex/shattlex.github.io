const NAV_LINKS = [
  ["index.html", "Главная"],
  ["catalog.html", "Каталог"],
  ["about.html", "О компании"],
  ["delivery.html", "Доставка"],
  ["news.html", "Новости"],
  ["promotions.html", "Акции"],
  ["contacts.html", "Контакты"],
  ["account.html", "Кабинет"]
];

function buildLayout() {
  const page = document.body.dataset.page || "index";
  const nav = NAV_LINKS.map(([href, label]) => {
    const id = href.replace(".html", "");
    return `<a href="${href}" class="${id === page ? "active" : ""}">${label}</a>`;
  }).join("");

  const header = document.querySelector("[data-header]");
  const footer = document.querySelector("[data-footer]");

  if (header) {
    header.innerHTML = `
      <div class="topbar"><div class="container"><span>Пн-Пт 09:00-19:00</span><span>+7 (900) 000-00-00</span></div></div>
      <header class="header">
        <div class="container">
          <a class="logo" href="index.html"><span class="logo-badge"></span><span>NOVA TRADE</span></a>
          <button class="menu-toggle" type="button">Меню</button>
          <nav class="nav">${nav}</nav>
          <form class="searchbar" id="global-search">
            <input type="search" name="q" placeholder="Поиск по сайту" />
            <button type="submit">Найти</button>
          </form>
        </div>
      </header>`;
  }

  if (footer) {
    footer.innerHTML = `
      <footer class="footer">
        <div class="container">
          <div class="footer-links">
            <a href="about.html">О компании</a>
            <a href="catalog.html">Каталог и услуги</a>
            <a href="delivery.html">Доставка и оплата</a>
            <a href="policies.html">Политики</a>
            <a href="contacts.html">Контакты</a>
            <a href="news.html">Новости</a>
            <a href="promotions.html">Акции</a>
            <a href="account.html">Личный кабинет</a>
          </div>
          <p class="muted">© 2026 NOVA TRADE. Все права защищены.</p>
        </div>
      </footer>`;
  }

  const menuToggle = document.querySelector(".menu-toggle");
  const mobileNav = document.querySelector(".nav");
  if (menuToggle && mobileNav) {
    menuToggle.addEventListener("click", () => mobileNav.classList.toggle("open"));
  }
}

function renderCatalog() {
  const container = document.querySelector("#catalog-grid");
  if (!container) return;

  const data = [
    { id: 1, name: "Станция очистки воды A1", category: "water", price: 79000, popularity: 8 },
    { id: 2, name: "Промышленный насос B2", category: "pumps", price: 128000, popularity: 9 },
    { id: 3, name: "Комплект автоматики C3", category: "auto", price: 54000, popularity: 6 },
    { id: 4, name: "Фильтровальный модуль D4", category: "water", price: 45000, popularity: 7 },
    { id: 5, name: "Насосная группа E5", category: "pumps", price: 92000, popularity: 5 },
    { id: 6, name: "Шкаф управления F6", category: "auto", price: 138000, popularity: 10 }
  ];

  const category = document.querySelector("#filter-category");
  const sort = document.querySelector("#sort");
  const query = document.querySelector("#search-local");

  function draw() {
    let list = [...data];
    if (category.value !== "all") list = list.filter((item) => item.category === category.value);
    const q = query.value.trim().toLowerCase();
    if (q) list = list.filter((item) => item.name.toLowerCase().includes(q));

    if (sort.value === "price-asc") list.sort((a, b) => a.price - b.price);
    if (sort.value === "price-desc") list.sort((a, b) => b.price - a.price);
    if (sort.value === "popular") list.sort((a, b) => b.popularity - a.popularity);

    container.innerHTML = list.map((item) => `
      <article class="card">
        <h3>${item.name}</h3>
        <p class="price">${item.price.toLocaleString("ru-RU")} ₽</p>
        <p class="muted">Категория: ${item.category}</p>
        <a class="cta cta-secondary" href="product.html?id=${item.id}">Открыть карточку</a>
      </article>
    `).join("") || "<p>По заданным фильтрам ничего не найдено.</p>";
  }

  [category, sort].forEach((el) => el.addEventListener("change", draw));
  query.addEventListener("input", draw);
  draw();
}

function initForms() {
  document.querySelectorAll("[data-lead-form]").forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const honey = form.querySelector('input[name="company"]');
      if (honey && honey.value.trim()) return;

      const payload = Object.fromEntries(new FormData(form).entries());
      const required = ["name", "phone"];
      const hasAll = required.every((key) => (payload[key] || "").trim().length > 1);
      if (!hasAll) {
        alert("Заполните обязательные поля");
        return;
      }

      const log = JSON.parse(localStorage.getItem("leadLogs") || "[]");
      log.push({ ...payload, at: new Date().toISOString() });
      localStorage.setItem("leadLogs", JSON.stringify(log));

      const result = form.querySelector(".alert");
      if (result) result.classList.add("show");
      form.reset();
      console.info("Lead captured", payload);
    });
  });
}

function initAccount() {
  const accountRoot = document.querySelector("#account-root");
  if (!accountRoot) return;

  const state = JSON.parse(localStorage.getItem("accountState") || "{}");
  const tabs = accountRoot.querySelectorAll("[data-tab-target]");
  const panels = accountRoot.querySelectorAll("[data-tab-panel]");

  tabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.tabTarget;
      panels.forEach((panel) => panel.classList.toggle("hidden", panel.dataset.tabPanel !== target));
    });
  });

  const loginForm = accountRoot.querySelector("#login-form");
  const profileForm = accountRoot.querySelector("#profile-form");
  const historyBox = accountRoot.querySelector("#history-list");

  if (state.user) {
    accountRoot.querySelector("#profile-name").value = state.user.name || "";
    accountRoot.querySelector("#profile-email").value = state.user.email || "";
  }

  const leads = JSON.parse(localStorage.getItem("leadLogs") || "[]");
  historyBox.innerHTML = leads.slice(-6).reverse().map((x) => `<li>${new Date(x.at).toLocaleString("ru-RU")} - ${x.name}</li>`).join("") || "<li>История пока пустая</li>";

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(loginForm).entries());
    localStorage.setItem("accountState", JSON.stringify({ user: { name: data.name, email: data.email } }));
    alert("Авторизация выполнена (демо)");
  });

  profileForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(profileForm).entries());
    localStorage.setItem("accountState", JSON.stringify({ user: data }));
    alert("Профиль сохранен");
  });
}

function initGlobalSearch() {
  const form = document.querySelector("#global-search");
  if (!form) return;
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const q = new FormData(form).get("q");
    if (!q) return;
    window.location.href = `catalog.html?q=${encodeURIComponent(q)}`;
  });
}

buildLayout();
renderCatalog();
initForms();
initAccount();
initGlobalSearch();
