(function () {
  document.documentElement.classList.add("js");

  const data = window.PORTFOLIO_DATA;
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const externalAttributes = (href) => href.startsWith("http") ? 'target="_blank" rel="noreferrer"' : 'target="_blank" rel="noreferrer"';

  const projectVisuals = {
    orbit: `
      <svg viewBox="0 0 900 200" preserveAspectRatio="none">
        <path class="dim dash" d="M-80 180C180-40 525-40 950 150" />
        <path class="dim dash" d="M-30 220C220 35 590 5 965 92" style="animation-direction:reverse" />
        <path class="draw trace" d="M90 166C260 36 540 32 800 112" />
        <circle class="fill-blue pulse" cx="220" cy="84" r="8" />
        <circle class="fill-signal pulse" cx="515" cy="54" r="7" style="animation-delay:.7s" />
        <circle class="fill-blue pulse" cx="735" cy="92" r="6" style="animation-delay:1.2s" />
        <path class="draw" d="M445 178v-25m-13 25h26m-21-25 8-10 8 10" />
        <path class="dim" d="M445 146c-20-18-40-18-60 0M445 146c20-18 40-18 60 0" />
      </svg>`,
    spectrum: `
      <svg viewBox="0 0 900 200" preserveAspectRatio="none">
        <path class="dim" d="M45 164H860M45 125H860M45 86H860M45 47H860" />
        <rect class="fill-blue bar" x="92" y="105" width="18" height="59" />
        <rect class="fill-blue bar" x="125" y="76" width="18" height="88" style="animation-delay:.16s" />
        <rect class="fill-signal bar" x="158" y="42" width="18" height="122" style="animation-delay:.32s" />
        <rect class="fill-blue bar" x="191" y="69" width="18" height="95" style="animation-delay:.48s" />
        <rect class="fill-blue bar" x="224" y="112" width="18" height="52" style="animation-delay:.64s" />
        <path class="draw trace" d="M45 152C105 150 126 142 155 71S207 135 255 142 330 138 370 95 432 147 480 148 551 140 593 105 652 144 710 151 785 149 860 152" />
        <path class="dim dash" d="M320 28v145M675 28v145" />
      </svg>`,
    pwm: `
      <svg viewBox="0 0 900 200" preserveAspectRatio="none">
        <path class="dim" d="M40 158H860M40 102H860M40 46H860" />
        <path class="draw trace" d="M50 150V48H135V150H202V48H287V150H354V48H439V150H506V48H591V150H658V48H743V150H810" />
        <circle class="fill-signal pulse" cx="820" cy="48" r="10" />
        <circle class="fill-blue pulse" cx="850" cy="78" r="7" style="animation-delay:.4s" />
        <text x="52" y="184" fill="rgba(255,255,255,.55)" font-family="monospace" font-size="12">8-BIT COUNTER / COMPARATOR / DUTY CYCLE</text>
      </svg>`,
    map: `
      <svg viewBox="0 0 900 200" preserveAspectRatio="none">
        <path class="dim" d="M0 65C130 110 192 8 328 55s177 97 312 41S788 54 900 70M0 158c139-58 238 3 357-37s244-20 338 24 152 20 205 0" />
        <path class="draw dash" d="M78 152C174 155 185 52 301 66s104 101 221 68 99-95 211-72 51 88 112 75" />
        <circle class="fill-signal pulse" cx="78" cy="152" r="8" />
        <circle class="fill-blue pulse" cx="301" cy="66" r="8" style="animation-delay:.5s" />
        <circle class="fill-signal pulse" cx="522" cy="134" r="8" style="animation-delay:1s" />
        <circle class="fill-blue pulse" cx="733" cy="62" r="8" style="animation-delay:1.5s" />
        <path class="draw" d="M823 127h44v28h-44zM830 127l8-13h15l8 13M834 155v12m22-12v12" />
      </svg>`
  };

  function renderProjects() {
    const tabs = document.querySelector("[data-project-tabs]");
    if (!tabs || !data?.projects?.length) return;
    const count = document.querySelector("[data-project-count]");
    if (count) count.textContent = String(data.projects.length).padStart(2, "0");

    tabs.innerHTML = data.projects.map((project, index) => `
      <button
        class="project-tab${index === 0 ? " is-active" : ""}"
        type="button"
        role="tab"
        id="project-tab-${project.id}"
        aria-controls="project-stage"
        aria-selected="${index === 0}"
        tabindex="${index === 0 ? "0" : "-1"}"
        data-project-index="${index}"
      >
        <span>${project.number}</span><strong>${project.shortTitle}</strong><i aria-hidden="true"></i>
      </button>`).join("");

    const stage = document.querySelector("[data-project-stage]");
    stage.id = "project-stage";
    stage.setAttribute("role", "tabpanel");

    function selectProject(index, moveFocus = false) {
      const project = data.projects[index];
      if (!project) return;

      const allTabs = [...tabs.querySelectorAll("[data-project-index]")];
      allTabs.forEach((tab, tabIndex) => {
        const active = tabIndex === index;
        tab.classList.toggle("is-active", active);
        tab.setAttribute("aria-selected", String(active));
        tab.tabIndex = active ? 0 : -1;
      });
      if (moveFocus) allTabs[index].focus();

      stage.setAttribute("aria-labelledby", `project-tab-${project.id}`);
      stage.classList.remove("is-switching");
      void stage.offsetWidth;
      stage.classList.add("is-switching");

      document.querySelector("[data-project-visual]").innerHTML = projectVisuals[project.visual] || "";
      document.querySelector("[data-project-type]").textContent = project.type;
      document.querySelector("[data-project-year]").textContent = project.year;
      document.querySelector("[data-project-title]").textContent = project.title;
      document.querySelector("[data-project-summary]").textContent = project.summary;
      document.querySelector("[data-project-approach]").textContent = project.approach;
      document.querySelector("[data-project-outcome]").textContent = project.outcome;
      document.querySelector("[data-project-tags]").innerHTML = project.tags.map((tag) => `<li>${tag}</li>`).join("");
      document.querySelector("[data-project-actions]").innerHTML = project.actions.map((action) => `
        <a href="${action.href}" ${externalAttributes(action.href)}>${action.label}<span aria-hidden="true">↗</span></a>`).join("");
    }

    tabs.addEventListener("click", (event) => {
      const button = event.target.closest("[data-project-index]");
      if (button) selectProject(Number(button.dataset.projectIndex));
    });

    tabs.addEventListener("keydown", (event) => {
      if (!["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const current = Number(document.activeElement.dataset.projectIndex || 0);
      let next = current;
      if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (current + 1) % data.projects.length;
      if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (current - 1 + data.projects.length) % data.projects.length;
      if (event.key === "Home") next = 0;
      if (event.key === "End") next = data.projects.length - 1;
      selectProject(next, true);
    });

    selectProject(0);
  }

  function renderExperience() {
    const target = document.querySelector("[data-experience-list]");
    if (!target) return;
    target.innerHTML = data.experience.map((item, index) => `
      <details class="experience-item" data-reveal ${index === 0 ? "open" : ""}>
        <summary>
          <span>${item.period}</span>
          <div class="experience-role"><strong>${item.role}</strong><small>${item.company} · ${item.location}</small></div>
          <p class="experience-summary">${item.summary}</p>
          <i class="experience-plus" aria-hidden="true"></i>
        </summary>
        <div class="experience-detail"><p>${item.detail}</p></div>
      </details>`).join("");
  }

  function renderWriting() {
    const target = document.querySelector("[data-writing-list]");
    if (!target) return;
    target.innerHTML = data.writing.map((item) => `
      <a class="writing-item" href="${item.href}" ${externalAttributes(item.href)} data-reveal>
        <span>${item.label}</span>
        <div><h3>${item.title}</h3><p>${item.note}</p></div>
        <i class="writing-arrow" aria-hidden="true">↗</i>
      </a>`).join("");
  }

  function renderContacts() {
    const target = document.querySelector("[data-contact-links]");
    if (!target) return;
    target.innerHTML = data.contacts.map((item) => `
      <a class="contact-link" href="${item.href}" ${item.href.startsWith("http") ? 'target="_blank" rel="noreferrer"' : ""}>
        <span><small>${item.label}</small><strong>${item.value}</strong></span><span aria-hidden="true">↗</span>
      </a>`).join("");
  }

  renderProjects();
  renderExperience();
  renderWriting();
  renderContacts();
  document.querySelector("[data-year]").textContent = new Date().getFullYear();

  const header = document.querySelector("[data-header]");
  const progress = document.querySelector("[data-scroll-progress]");
  function updateScrollUI() {
    const scrollable = Math.max(document.documentElement.scrollHeight - innerHeight, 1);
    const ratio = Math.min(Math.max(scrollY / scrollable, 0), 1);
    progress.style.transform = `scaleX(${ratio})`;
    header.classList.toggle("is-scrolled", scrollY > 18);
  }
  addEventListener("scroll", updateScrollUI, { passive: true });
  updateScrollUI();

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
  addEventListener("keydown", (event) => { if (event.key === "Escape") closeMenu(); });

  const revealItems = document.querySelectorAll("[data-reveal]");
  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.1 });
    revealItems.forEach((item) => revealObserver.observe(item));
  }

  const navLinks = [...document.querySelectorAll(".desktop-nav a")];
  const sections = [...document.querySelectorAll("main section[id]")];
  if ("IntersectionObserver" in window) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => link.classList.toggle("is-current", link.getAttribute("href") === `#${entry.target.id}`));
      });
    }, { rootMargin: "-34% 0px -58%", threshold: 0 });
    sections.forEach((section) => navObserver.observe(section));
  }

  function setupHeroSignal() {
    const canvas = document.querySelector("[data-hero-signal]");
    const portrait = document.querySelector("[data-portrait]");
    if (!canvas || !portrait) return;
    const ctx = canvas.getContext("2d");
    let width = 1;
    let height = 1;
    let pointerX = 0.62;
    let pointerY = 0.38;
    let frame = 0;

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, 2);
      width = Math.max(rect.width, 1);
      height = Math.max(rect.height, 1);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function draw(time = 0) {
      ctx.clearRect(0, 0, width, height);
      const amplitude = 12 + pointerX * 28;
      const center = height * (0.36 + pointerY * 0.26);
      for (let row = 0; row < 7; row += 1) {
        ctx.beginPath();
        for (let x = -10; x <= width + 10; x += 5) {
          const envelope = Math.sin(Math.min(Math.max(x / width, 0), 1) * Math.PI);
          const y = center + (row - 3) * 19 + Math.sin(x * (0.021 + pointerX * 0.012) - time * 0.0013 + row * 0.65) * amplitude * envelope;
          if (x === -10) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = row === 3 ? "rgba(199,255,74,.86)" : `rgba(111,135,255,${0.16 + row * 0.025})`;
        ctx.lineWidth = row === 3 ? 1.7 : 1;
        ctx.stroke();
      }
      const packetX = ((time * 0.08) % (width + 80)) - 40;
      const packetY = center + Math.sin(packetX * 0.028 - time * 0.0013 + 1.95) * amplitude;
      ctx.beginPath();
      ctx.arc(packetX, packetY, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = "#c7ff4a";
      ctx.shadowColor = "#c7ff4a";
      ctx.shadowBlur = 14;
      ctx.fill();
      ctx.shadowBlur = 0;
      frame = reducedMotion ? 0 : requestAnimationFrame(draw);
    }

    portrait.addEventListener("pointermove", (event) => {
      const rect = portrait.getBoundingClientRect();
      pointerX = (event.clientX - rect.left) / rect.width;
      pointerY = (event.clientY - rect.top) / rect.height;
      portrait.style.setProperty("--rx", `${(0.5 - pointerY) * 3.2}deg`);
      portrait.style.setProperty("--ry", `${(pointerX - 0.5) * 3.2}deg`);
      if (reducedMotion) draw(0);
    });
    portrait.addEventListener("pointerleave", () => {
      portrait.style.setProperty("--rx", "0deg");
      portrait.style.setProperty("--ry", "0deg");
    });
    new ResizeObserver(resize).observe(canvas);
    resize();
    cancelAnimationFrame(frame);
    draw(0);
  }

  function setupConstellation() {
    const canvas = document.querySelector("[data-constellation]");
    const snrInput = document.querySelector("[data-snr]");
    const snrOutput = document.querySelector("[data-snr-output]");
    if (!canvas || !snrInput) return;
    const ctx = canvas.getContext("2d");
    let width = 1;
    let height = 1;
    let modulation = "QPSK";
    let snr = Number(snrInput.value);

    const symbols = {
      BPSK: [[-1, 0], [1, 0]],
      QPSK: [[-1, -1], [-1, 1], [1, -1], [1, 1]],
      "16-QAM": [-1, -0.34, 0.34, 1].flatMap((x) => [-1, -0.34, 0.34, 1].map((y) => [x, y]))
    };

    function resize() {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, 2);
      width = Math.max(rect.width, 1);
      height = Math.max(rect.height, 1);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reducedMotion) draw(0);
    }

    function pseudoNoise(seed, time) {
      return Math.sin(seed * 91.79 + time * 0.0011) * Math.cos(seed * 17.13 + time * 0.0007);
    }

    function draw(time = 0) {
      ctx.clearRect(0, 0, width, height);
      const cx = width / 2;
      const cy = height / 2;
      const scale = Math.min(width, height) * 0.31;

      ctx.strokeStyle = "rgba(255,255,255,.08)";
      ctx.lineWidth = 1;
      for (let i = -2; i <= 2; i += 1) {
        ctx.beginPath(); ctx.moveTo(cx + i * scale / 2, 20); ctx.lineTo(cx + i * scale / 2, height - 20); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(20, cy + i * scale / 2); ctx.lineTo(width - 20, cy + i * scale / 2); ctx.stroke();
      }
      ctx.strokeStyle = "rgba(255,255,255,.3)";
      ctx.beginPath(); ctx.moveTo(cx, 14); ctx.lineTo(cx, height - 14); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(14, cy); ctx.lineTo(width - 14, cy); ctx.stroke();

      const bases = symbols[modulation];
      const noiseScale = (31 - snr) / 120;
      for (let i = 0; i < 112; i += 1) {
        const base = bases[i % bases.length];
        const nx = pseudoNoise(i + 2, time) * noiseScale;
        const ny = pseudoNoise(i + 71, time + 320) * noiseScale;
        const x = cx + (base[0] + nx) * scale;
        const y = cy - (base[1] + ny) * scale;
        ctx.beginPath();
        ctx.arc(x, y, 2.1, 0, Math.PI * 2);
        ctx.fillStyle = i % 4 === 0 ? "rgba(199,255,74,.86)" : "rgba(111,135,255,.64)";
        ctx.fill();
      }
      bases.forEach(([x, y]) => {
        ctx.strokeStyle = "rgba(199,255,74,.55)";
        ctx.lineWidth = 1.3;
        ctx.strokeRect(cx + x * scale - 7, cy - y * scale - 7, 14, 14);
      });
      if (!reducedMotion) requestAnimationFrame(draw);
    }

    document.querySelectorAll("[data-modulation]").forEach((button) => {
      button.addEventListener("click", () => {
        modulation = button.dataset.modulation;
        document.querySelectorAll("[data-modulation]").forEach((candidate) => candidate.classList.toggle("is-active", candidate === button));
        if (reducedMotion) draw(0);
      });
    });
    snrInput.addEventListener("input", () => {
      snr = Number(snrInput.value);
      snrOutput.textContent = `${snr} dB SNR`;
      if (reducedMotion) draw(0);
    });
    new ResizeObserver(resize).observe(canvas);
    resize();
    draw(0);
  }

  setupHeroSignal();
  setupConstellation();
})();
