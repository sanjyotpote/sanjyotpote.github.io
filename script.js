(function () {
  const data = window.PORTFOLIO_DATA;
  const root = document.documentElement;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const icons = {
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>',
    copy: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="8" y="8" width="11" height="11" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/></svg>'
  };

  function renderExperience() {
    const target = document.querySelector("[data-experience-list]");
    if (!target) return;

    target.innerHTML = data.experience
      .map(
        (item) => `
          <article class="timeline-item reveal">
            <div class="timeline-period">${item.period}</div>
            <div class="timeline-role">
              <h3>${item.role}</h3>
              <p>${item.company} <span>·</span> ${item.location}</p>
            </div>
            <div class="timeline-detail">
              <p>${item.summary}</p>
              ${
                item.highlights.length
                  ? `<ul>${item.highlights.map((highlight) => `<li>${highlight}</li>`).join("")}</ul>`
                  : ""
              }
            </div>
          </article>`
      )
      .join("");
  }

  function renderWork(filter = "all") {
    const target = document.querySelector("[data-work-grid]");
    if (!target) return;
    const filtered = filter === "all" ? data.work : data.work.filter((item) => item.type.split(" ").includes(filter));

    target.innerHTML = filtered
      .map(
        (item) => `
          <article class="work-card reveal is-visible">
            <div class="work-card-top"><span>${item.number}</span><span>${item.label}</span></div>
            <div>
              <h3>${item.title}</h3>
              <p>${item.description}</p>
            </div>
            <div>
              <p class="work-outcome">${item.outcome}</p>
              <ul class="tag-list" aria-label="Tools and topics">
                ${item.tags.map((tag) => `<li>${tag}</li>`).join("")}
              </ul>
            </div>
          </article>`
      )
      .join("");
  }

  function renderContacts() {
    const target = document.querySelector("[data-contact-links]");
    if (!target) return;
    target.innerHTML = data.contacts
      .filter((contact) => contact.href)
      .map(
        (contact) => `
          <a href="${contact.href}" ${contact.href.startsWith("http") ? 'target="_blank" rel="noreferrer"' : ""} ${contact.copy ? 'data-copy-email="spote@purdue.edu"' : ""}>
            <span><small>${contact.label}</small>${contact.value}</span>
            ${contact.copy ? icons.copy : icons.arrow}
          </a>`
      )
      .join("");
  }

  function renderPublications() {
    const target = document.querySelector("[data-publication-list]");
    if (!target) return;
    target.innerHTML = data.publications
      .map(
        (publication) => `
          <article class="publication-card reveal">
            <div>
              <p class="publication-kicker">Published · ${publication.date}</p>
              <h3>${publication.title}</h3>
              <p>${publication.description}</p>
            </div>
            <a class="round-link" href="${publication.href}" target="_blank" rel="noreferrer" aria-label="Open ${publication.title}">
              ${icons.arrow}
            </a>
          </article>`
      )
      .join("");
  }

  renderExperience();
  renderWork();
  renderPublications();
  renderContacts();

  document.querySelector("[data-year]").textContent = new Date().getFullYear();

  const themeToggle = document.querySelector("[data-theme-toggle]");
  themeToggle?.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (_) {}
  });

  const menuToggle = document.querySelector("[data-menu-toggle]");
  const mobileMenu = document.querySelector("[data-mobile-menu]");
  function closeMenu() {
    menuToggle?.setAttribute("aria-expanded", "false");
    mobileMenu?.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  }
  menuToggle?.addEventListener("click", () => {
    const open = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!open));
    mobileMenu.classList.toggle("is-open", !open);
    document.body.classList.toggle("menu-open", !open);
  });
  mobileMenu?.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelectorAll("[data-filter]").forEach((candidate) => {
        const active = candidate === button;
        candidate.classList.toggle("is-active", active);
        candidate.setAttribute("aria-pressed", String(active));
      });
      renderWork(button.dataset.filter);
    });
  });

  const toast = document.querySelector("[data-toast]");
  document.addEventListener("click", async (event) => {
    const copyLink = event.target.closest("[data-copy-email]");
    if (!copyLink || !navigator.clipboard) return;
    event.preventDefault();
    try {
      await navigator.clipboard.writeText(copyLink.dataset.copyEmail);
      toast.classList.add("is-visible");
      window.setTimeout(() => toast.classList.remove("is-visible"), 1800);
    } catch (_) {
      window.location.href = copyLink.href;
    }
  });

  const revealElements = () => {
    const elements = document.querySelectorAll(".reveal:not(.is-visible)");
    if (reducedMotion || !("IntersectionObserver" in window)) {
      elements.forEach((element) => element.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    elements.forEach((element) => observer.observe(element));
  };
  revealElements();

  const sections = [...document.querySelectorAll("main section[id]")];
  const navLinks = [...document.querySelectorAll(".desktop-nav a")];
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) => link.classList.toggle("is-current", link.getAttribute("href") === `#${entry.target.id}`));
        });
      },
      { rootMargin: "-35% 0px -60%", threshold: 0 }
    );
    sections.forEach((section) => sectionObserver.observe(section));
  }
})();
