/* Learning Journal — rendering + interactions. Content comes from data.js. */

(function () {
  "use strict";

  const els = {
    title: document.getElementById("note-title"),
    subtitle: document.getElementById("note-subtitle"),
    meta: document.getElementById("note-meta"),
    dimensions: document.getElementById("dimensions"),
    content: document.getElementById("content"),
    footer: document.getElementById("note-footer"),
    toast: document.getElementById("toast"),
    settingsBtn: document.getElementById("settings-btn"),
    settingsPanel: document.getElementById("settings-panel"),
    settings: document.getElementById("settings"),
    themeToggle: document.getElementById("theme-toggle"),
  };

  /* ---------------- Theme ---------------- */
  const THEME_KEY = "lj-theme";

  function systemPrefersDark() {
    return window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
  }

  function applyTheme(theme) {
    const dark = theme === "dark";
    document.documentElement.setAttribute("data-theme", dark ? "dark" : "light");
    if (els.themeToggle) els.themeToggle.setAttribute("aria-checked", String(dark));
  }

  function initTheme() {
    let stored;
    try { stored = localStorage.getItem(THEME_KEY); } catch (e) {}
    const theme = stored || (systemPrefersDark() ? "dark" : "light");
    applyTheme(theme);

    els.themeToggle.addEventListener("click", () => {
      const next =
        document.documentElement.getAttribute("data-theme") === "dark"
          ? "light"
          : "dark";
      applyTheme(next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
    });
  }

  /* ---------------- Settings panel ---------------- */
  function initSettings() {
    const open = () => {
      els.settingsPanel.hidden = false;
      els.settingsBtn.setAttribute("aria-expanded", "true");
    };
    const close = () => {
      els.settingsPanel.hidden = true;
      els.settingsBtn.setAttribute("aria-expanded", "false");
    };
    els.settingsBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      els.settingsPanel.hidden ? open() : close();
    });
    document.addEventListener("click", (e) => {
      if (!els.settings.contains(e.target)) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
  }

  /* ---------------- Icons ---------------- */
  const chevronSVG = `<svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>`;
  const copyIconSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2.5"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>`;
  const checkIconSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>`;

  /* ---------------- Helpers ---------------- */
  function formatDate(iso) {
    if (!iso) return "";
    const d = new Date(iso + "T00:00:00");
    if (isNaN(d)) return iso;
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }

  let toastTimer;
  function showToast(text) {
    els.toast.textContent = text;
    els.toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => els.toast.classList.remove("show"), 1400);
  }

  async function copyText(text, btn) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      flashCopied(btn);
      showToast("Copied — go use it");
    } catch (err) {
      showToast("Couldn't copy — select and copy manually");
    }
  }

  function flashCopied(btn) {
    if (!btn) return;
    const label = btn.querySelector(".copy-label");
    btn.classList.add("copied");
    btn.querySelector(".copy-icon").innerHTML = checkIconSVG;
    if (label) label.textContent = "Copied";
    setTimeout(() => {
      btn.classList.remove("copied");
      btn.querySelector(".copy-icon").innerHTML = copyIconSVG;
      if (label) label.textContent = btn.dataset.copyLabel || "Copy";
    }, 1300);
  }

  /* ---------------- Data shaping ---------------- */
  // Group notes by dimension, preserving first-seen order. Fully dynamic.
  const dimensions = [];
  const byDimension = new Map();
  for (const note of journal) {
    const dim = note.dimension || "Notes";
    if (!byDimension.has(dim)) {
      byDimension.set(dim, []);
      dimensions.push(dim);
    }
    byDimension.get(dim).push(note);
  }

  /* ---------------- Rendering ---------------- */
  // Items can be: a plain string (copyable prompt), { prompt } (copyable),
  // { text } (plain reading line), { heading } (a small sub-heading), or a
  // { builder }. Add `plain: true` to any text/prompt to hide its number badge.
  function normalizeItem(item) {
    if (typeof item === "string") return { text: item, copyable: true, plain: false };
    if (item && item.prompt != null)
      return { text: item.prompt, copyable: true, plain: item.plain === true };
    if (item && item.text != null)
      return { text: item.text, copyable: item.copy === true, plain: item.plain === true };
    return { text: String(item), copyable: false, plain: false };
  }

  function buildHeading(text) {
    const h = document.createElement("p");
    h.className = "item-heading";
    h.textContent = text;
    return h;
  }

  // A browsable, selectable list of skills. Two kinds:
  //   • single skill  — one SKILL.md; multi-selectable, combined into one
  //     `npx skills add` install prompt.
  //   • plugin marketplace — a bundle of many skills; not selectable, each
  //     installs with its own command shown on the card.
  // A filter switches between All / single skills / marketplaces.
  function buildSkillList(skills) {
    skills = Array.isArray(skills) ? skills : [];
    const isMkt = (s) => s && s.type === "marketplace";

    const singles = skills.filter((s) => !isMkt(s));
    const markets = skills.filter(isMkt);

    const wrap = document.createElement("div");
    wrap.className = "skill-tool";

    // ----- Filter (only shown when both kinds are present) -----
    const modes = [
      { key: "all", label: "All", n: skills.length },
      { key: "skill", label: "Single skills", n: singles.length },
      { key: "marketplace", label: "Marketplaces", n: markets.length },
    ];
    let current = "all";
    const filterBtns = {};
    const filter = document.createElement("div");
    filter.className = "skill-filter";
    filter.setAttribute("role", "tablist");
    filter.setAttribute("aria-label", "Filter skills by type");
    modes.forEach((m) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "skill-filter-btn";
      b.setAttribute("role", "tab");
      b.setAttribute("aria-selected", m.key === current ? "true" : "false");
      b.textContent = m.label + " (" + m.n + ")";
      b.addEventListener("click", () => applyFilter(m.key));
      filterBtns[m.key] = b;
      filter.appendChild(b);
    });
    if (singles.length && markets.length) wrap.appendChild(filter);

    const list = document.createElement("div");
    list.className = "skill-list";

    const selected = new Set();
    const singleChecks = []; // { cb, skill, card }
    const cardEls = []; // { card, marketplace }

    // Assemble one install prompt from the chosen single skills.
    function buildPrompt() {
      const chosen = singles.filter((s) => selected.has(s));
      const lines = chosen
        .map((s) => "- " + (s.name || "Skill") + " — " + (s.repo || ""))
        .join("\n");
      return (
        "Install the following Claude Code skills so I can use them in this project.\n\n" +
        "For each skill below, run `npx skills add <owner/repo or repo URL>` — the skills CLI finds the SKILL.md inside each repo automatically. By default it adds to my skills library; pass `-a claude-code` to target Claude Code, or `-g` for a global install. If a repo's README gives a different step, follow that instead.\n\n" +
        "Show me exactly what you added and where, and don't commit anything unless I ask. When you're done, list every skill now available, each with a one-line description and how to invoke it.\n\n" +
        "Skills to install:\n" +
        lines
      );
    }

    skills.forEach((s) => {
      const marketplace = isMkt(s);

      const card = document.createElement("article");
      card.className = "skill-card";
      card.dataset.type = marketplace ? "marketplace" : "skill";

      const head = document.createElement("div");
      head.className = "skill-head";

      // Single skills get a checkbox; marketplaces just show the name.
      if (marketplace) {
        const name = document.createElement("h3");
        name.className = "skill-name";
        name.textContent = s.name || "";
        head.appendChild(name);
      } else {
        const select = document.createElement("label");
        select.className = "skill-select";

        const cb = document.createElement("input");
        cb.type = "checkbox";
        cb.className = "skill-check";
        cb.setAttribute("aria-label", "Select " + (s.name || "skill"));

        const name = document.createElement("h3");
        name.className = "skill-name";
        name.textContent = s.name || "";

        select.append(cb, name);
        head.appendChild(select);

        cb.addEventListener("change", () => {
          if (cb.checked) {
            selected.add(s);
            card.classList.add("selected");
          } else {
            selected.delete(s);
            card.classList.remove("selected");
          }
          syncBar();
        });
        singleChecks.push({ cb: cb, skill: s, card: card });
      }

      const type = document.createElement("span");
      type.className = "skill-type";
      type.dataset.type = marketplace ? "marketplace" : "skill";
      type.textContent = marketplace ? "Plugin marketplace" : "Single skill";
      head.appendChild(type);

      if (s.tag) {
        const tag = document.createElement("span");
        tag.className = "skill-tag";
        tag.textContent = s.tag;
        head.appendChild(tag);
      }
      card.appendChild(head);

      if (s.desc) {
        const desc = document.createElement("p");
        desc.className = "skill-desc";
        desc.textContent = s.desc;
        card.appendChild(desc);
      }

      if (s.install) {
        const inst = document.createElement("div");
        inst.className = "skill-install";

        const code = document.createElement("code");
        code.className = "skill-cmd";
        code.textContent = s.install;

        const btn = document.createElement("button");
        btn.className = "copy-btn";
        btn.type = "button";
        btn.setAttribute("aria-label", "Copy install command for " + (s.name || "skill"));
        btn.innerHTML = `<span class="copy-icon">${copyIconSVG}</span><span class="copy-label">Copy</span>`;
        btn.addEventListener("click", () => copyText(s.install, btn));

        inst.append(code, btn);
        card.appendChild(inst);
      }

      if (s.repo) {
        const link = document.createElement("a");
        link.className = "skill-link";
        link.href = s.repo;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = "View on GitHub →";
        card.appendChild(link);
      }

      cardEls.push({ card: card, marketplace: marketplace });
      list.appendChild(card);
    });

    wrap.appendChild(list);

    // ----- Action bar — only for single skills -----
    const bar = document.createElement("div");
    bar.className = "skill-actions";

    const selectAll = document.createElement("button");
    selectAll.type = "button";
    selectAll.className = "skill-selectall";

    const status = document.createElement("span");
    status.className = "skill-status";

    const copyAll = document.createElement("button");
    copyAll.className = "copy-btn skill-copy-all";
    copyAll.type = "button";
    copyAll.dataset.copyLabel = "Copy install prompt";
    copyAll.innerHTML = `<span class="copy-icon">${copyIconSVG}</span><span class="copy-label">Copy install prompt</span>`;
    copyAll.addEventListener("click", () => {
      if (selected.size === 0) return;
      copyText(buildPrompt(), copyAll);
    });

    selectAll.addEventListener("click", () => {
      const makeAll = selected.size !== singles.length;
      singleChecks.forEach(({ cb, skill, card }) => {
        cb.checked = makeAll;
        if (makeAll) {
          selected.add(skill);
          card.classList.add("selected");
        } else {
          selected.delete(skill);
          card.classList.remove("selected");
        }
      });
      syncBar();
    });

    function syncBar() {
      const n = selected.size;
      status.textContent = n
        ? n + (n === 1 ? " skill selected" : " skills selected")
        : "Tick single skills to build one install prompt";
      selectAll.textContent =
        n === singles.length && n > 0 ? "Clear all" : "Select all";
      copyAll.disabled = n === 0;
    }

    bar.append(selectAll, status, copyAll);
    if (singles.length) wrap.appendChild(bar);

    // ----- Filtering -----
    function applyFilter(mode) {
      current = mode;
      Object.keys(filterBtns).forEach((k) =>
        filterBtns[k].setAttribute("aria-selected", k === mode ? "true" : "false")
      );
      cardEls.forEach(({ card, marketplace }) => {
        const type = marketplace ? "marketplace" : "skill";
        card.style.display = mode === "all" || mode === type ? "" : "none";
      });
      // The combined-prompt bar is only relevant when single skills are visible.
      const showBar = singles.length > 0 && mode !== "marketplace";
      bar.style.display = showBar ? "" : "none";
    }

    syncBar();
    applyFilter("all");
    return wrap;
  }


  function buildItem(item, i) {
    if (item && item.deck) return buildPersonaDeck(item.deck);
    if (item && item.skills) return buildSkillList(item.skills);
    if (item && item.builder) return buildBuilder(item.builder);
    if (item && item.heading != null) return buildHeading(item.heading);

    const { text, copyable, plain } = normalizeItem(item);

    const el = document.createElement("div");
    el.className = copyable ? "item" : "item item--read";
    if (plain) el.classList.add("item--plain");

    if (!plain) {
      const num = document.createElement("span");
      num.className = "item-num";
      num.textContent = String(i + 1).padStart(2, "0");
      el.append(num);
    }

    const p = document.createElement("p");
    p.className = "item-text";
    p.textContent = text;
    el.append(p);

    if (copyable) {
      const btn = document.createElement("button");
      btn.className = "copy-btn";
      btn.type = "button";
      btn.setAttribute("aria-label", "Copy to clipboard");
      btn.innerHTML = `<span class="copy-icon">${copyIconSVG}</span><span class="copy-label">Copy</span>`;
      btn.addEventListener("click", () => copyText(text, btn));
      el.append(btn);
    }

    return el;
  }

  // Interactive prompt builder: pick options, the prompt assembles live.
  // Controls are choice pills by default, or { type: "input" } for free text.
  // A control with { showWhen: { otherId: index } } only appears for that choice.
  function buildBuilder(cfg) {
    const wrap = document.createElement("div");
    wrap.className = "builder";

    const controls = Array.isArray(cfg.controls) ? cfg.controls : [];
    const state = {}; // id -> selected choice index, or input string
    const groups = {}; // id -> control's DOM wrapper (for show/hide)

    function resolve(id) {
      const ctrl = controls.find((c) => c.id === id);
      if (!ctrl) return null;
      if (ctrl.type === "input") {
        const v = String(state[id] || "").trim();
        return v || ctrl.fallback || "";
      }
      const choice = ctrl.choices[state[id] || 0];
      return choice ? choice.value : "";
    }

    // Resolve tokens repeatedly so choice values may themselves hold {tokens}.
    function assemble() {
      let out = cfg.template;
      for (let pass = 0; pass < 6 && /\{(\w+)\}/.test(out); pass++) {
        out = out.replace(/\{(\w+)\}/g, (m, id) => {
          const r = resolve(id);
          return r == null ? m : r;
        });
      }
      return out;
    }

    const output = document.createElement("p");
    output.className = "item-text";

    function refreshVisibility() {
      controls.forEach((ctrl) => {
        if (!ctrl.showWhen) return;
        const depId = Object.keys(ctrl.showWhen)[0];
        groups[ctrl.id].hidden = state[depId] !== ctrl.showWhen[depId];
      });
    }

    function update() {
      output.textContent = assemble();
      refreshVisibility();
    }

    controls.forEach((ctrl) => {
      const group = document.createElement("div");
      group.className = "builder-control";
      groups[ctrl.id] = group;

      const label = document.createElement("span");
      label.className = "builder-label";
      label.textContent = ctrl.label;
      group.appendChild(label);

      if (ctrl.type === "input") {
        state[ctrl.id] = ctrl.default || "";
        const input = document.createElement("input");
        input.type = "text";
        input.className = "builder-input";
        input.placeholder = ctrl.placeholder || "";
        input.value = state[ctrl.id];
        input.addEventListener("input", () => {
          state[ctrl.id] = input.value;
          update();
        });
        group.appendChild(input);
      } else {
        state[ctrl.id] = 0;
        const choices = document.createElement("div");
        choices.className = "builder-choices";
        ctrl.choices.forEach((choice, idx) => {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = "choice-btn";
          btn.textContent = choice.label;
          btn.setAttribute("aria-pressed", idx === 0 ? "true" : "false");
          btn.addEventListener("click", () => {
            state[ctrl.id] = idx;
            choices
              .querySelectorAll(".choice-btn")
              .forEach((b) => b.setAttribute("aria-pressed", "false"));
            btn.setAttribute("aria-pressed", "true");
            update();
          });
          choices.appendChild(btn);
        });
        group.appendChild(choices);
      }

      wrap.appendChild(group);
    });

    // Live output + copy
    const out = document.createElement("div");
    out.className = "item builder-output";
    out.appendChild(output);

    const btn = document.createElement("button");
    btn.className = "copy-btn";
    btn.type = "button";
    btn.setAttribute("aria-label", "Copy to clipboard");
    btn.innerHTML = `<span class="copy-icon">${copyIconSVG}</span><span class="copy-label">Copy</span>`;
    btn.addEventListener("click", () => copyText(assemble(), btn));
    out.appendChild(btn);

    wrap.appendChild(out);
    update();
    return wrap;
  }

  // Swipeable deck of investor personas. Each card copies that investor's
  // master prompt with a shared ticker substituted into the {TICKER} token.
  function buildPersonaDeck(cfg) {
    const wrap = document.createElement("div");
    wrap.className = "persona";

    const cards = Array.isArray(cfg.cards) ? cfg.cards : [];
    const tcfg = cfg.ticker || {};
    const fallback = tcfg.fallback || "[TICKER]";
    let ticker = "";

    function resolvePrompt(p) {
      const t = ticker.trim().toUpperCase() || fallback;
      return String(p).replace(/\{TICKER\}/g, t);
    }

    // Shared ticker input — read live at copy time.
    const tickerGroup = document.createElement("div");
    tickerGroup.className = "builder-control persona-ticker";
    const tlabel = document.createElement("span");
    tlabel.className = "builder-label";
    tlabel.textContent = tcfg.label || "Ticker";
    const input = document.createElement("input");
    input.type = "text";
    input.className = "builder-input";
    input.placeholder = tcfg.placeholder || "";
    input.setAttribute("aria-label", tcfg.label || "Ticker");
    input.addEventListener("input", () => { ticker = input.value; });
    tickerGroup.append(tlabel, input);
    wrap.appendChild(tickerGroup);

    // Card track — native scroll-snap handles touch/trackpad swiping.
    const deck = document.createElement("div");
    deck.className = "persona-deck";

    cards.forEach((card) => {
      const c = document.createElement("article");
      c.className = "persona-card";
      c.dataset.camp = card.camp || "";

      // Optional semi-transparent portrait behind the card content. Removes
      // itself if the image is missing, so the card falls back to its tint.
      if (card.image) {
        const bg = document.createElement("img");
        bg.className = "persona-bg";
        bg.src = card.image;
        bg.alt = "";
        bg.setAttribute("aria-hidden", "true");
        bg.addEventListener("error", () => bg.remove());
        c.appendChild(bg);
      }

      const avatar = document.createElement("div");
      avatar.className = "persona-avatar";
      avatar.textContent = card.initials || "";

      const name = document.createElement("h3");
      name.className = "persona-name";
      name.textContent = card.name || "";

      const tag = document.createElement("p");
      tag.className = "persona-tag";
      tag.textContent = card.tag || "";

      const voice = document.createElement("p");
      voice.className = "persona-voice";
      voice.textContent = card.voice ? "Voice — " + card.voice : "";

      const btn = document.createElement("button");
      btn.className = "copy-btn persona-copy";
      btn.type = "button";
      btn.setAttribute("aria-label", "Copy " + (card.name || "investor") + " prompt");
      btn.innerHTML = `<span class="copy-icon">${copyIconSVG}</span><span class="copy-label">Copy prompt</span>`;
      btn.addEventListener("click", () => copyText(resolvePrompt(card.prompt), btn));

      c.append(avatar, name, tag, voice, btn);
      deck.appendChild(c);
    });

    wrap.appendChild(deck);

    // Navigation — prev/next arrows plus a dot per card.
    const nav = document.createElement("div");
    nav.className = "persona-nav";

    const prev = document.createElement("button");
    prev.type = "button";
    prev.className = "persona-arrow";
    prev.setAttribute("aria-label", "Previous investor");
    prev.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>`;

    const next = document.createElement("button");
    next.type = "button";
    next.className = "persona-arrow";
    next.setAttribute("aria-label", "Next investor");
    next.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>`;

    const dots = document.createElement("div");
    dots.className = "persona-dots";
    const dotEls = cards.map((card, idx) => {
      const d = document.createElement("button");
      d.type = "button";
      d.className = "persona-dot";
      d.setAttribute("aria-label", "Go to " + (card.name || "card " + (idx + 1)));
      d.addEventListener("click", () => scrollToCard(idx));
      dots.appendChild(d);
      return d;
    });

    function cardStep() {
      const first = deck.querySelector(".persona-card");
      if (!first) return deck.clientWidth || 1;
      const cs = getComputedStyle(deck);
      const gap = parseFloat(cs.columnGap || cs.gap || "0") || 0;
      return first.getBoundingClientRect().width + gap;
    }

    function activeIndex() {
      return Math.round(deck.scrollLeft / cardStep());
    }

    function scrollToCard(i) {
      const idx = Math.max(0, Math.min(cards.length - 1, i));
      deck.scrollTo({ left: idx * cardStep(), behavior: "smooth" });
    }

    function syncDots() {
      const a = Math.max(0, Math.min(cards.length - 1, activeIndex()));
      dotEls.forEach((d, i) => d.setAttribute("aria-current", i === a ? "true" : "false"));
      prev.disabled = a <= 0;
      next.disabled = a >= cards.length - 1;
    }

    prev.addEventListener("click", () => scrollToCard(activeIndex() - 1));
    next.addEventListener("click", () => scrollToCard(activeIndex() + 1));

    let raf;
    deck.addEventListener("scroll", () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(syncDots);
    });

    nav.append(prev, dots, next);
    wrap.appendChild(nav);

    // Set initial dot/arrow state once laid out.
    requestAnimationFrame(syncDots);

    return wrap;
  }

  function buildSection(section, openByDefault) {
    const details = document.createElement("details");
    details.className = "section";
    if (openByDefault) details.open = true;

    const tips = Array.isArray(section.tips) ? section.tips : null;
    const items = Array.isArray(section.items) ? section.items : [];
    const count = tips ? tips.length : items.length;

    const summary = document.createElement("summary");
    summary.className = "section-head";
    summary.innerHTML = `
      <span class="section-title"></span>
      <span class="section-aside">
        <span class="section-count">${count}</span>
        ${chevronSVG}
      </span>`;
    summary.querySelector(".section-title").textContent = section.title || "Untitled";
    details.appendChild(summary);

    const body = document.createElement("div");
    body.className = "section-body";
    if (tips) {
      tips.forEach((tip, i) => body.appendChild(buildSubsection(tip, i === 0)));
    } else {
      items.forEach((item, i) => body.appendChild(buildItem(item, i)));
    }
    details.appendChild(body);
    return details;
  }

  // A nested, collapsible tip inside a section.
  function buildSubsection(tip, openByDefault) {
    const details = document.createElement("details");
    details.className = "subsection";
    if (tip.open === true || openByDefault) details.open = true;

    const items = Array.isArray(tip.items) ? tip.items : [];

    const summary = document.createElement("summary");
    summary.className = "subsection-head";
    summary.innerHTML = `
      <span class="subsection-title"></span>
      ${chevronSVG}`;
    summary.querySelector(".subsection-title").textContent = tip.title || "Untitled";
    details.appendChild(summary);

    const body = document.createElement("div");
    body.className = "section-body";
    items.forEach((item, i) => body.appendChild(buildItem(item, i)));
    details.appendChild(body);
    return details;
  }

  function renderDimension(dimension) {
    const notes = byDimension.get(dimension) || [];
    const primary = notes[0] || {};

    els.title.textContent = primary.title || dimension;
    els.subtitle.textContent = primary.subtitle || "";
    els.subtitle.style.display = primary.subtitle ? "" : "none";

    const dateStr = formatDate(primary.date);
    els.meta.textContent = [dimension, dateStr].filter(Boolean).join("  ·  ");

    els.content.innerHTML = "";
    const footerParts = [];

    notes.forEach((note, noteIdx) => {
      // Label additional notes that share a dimension.
      if (noteIdx > 0 && note.title) {
        const h = document.createElement("h2");
        h.className = "section-title";
        h.style.cssText = "display:block;margin:40px 0 12px";
        h.textContent = note.title;
        els.content.appendChild(h);
      }

      (note.sections || []).forEach((section, sIdx) => {
        const open = section.open === true || (noteIdx === 0 && sIdx === 0);
        els.content.appendChild(buildSection(section, open));
      });

      if (note.footer) footerParts.push(note.footer);
    });

    els.footer.textContent = footerParts.join("  ");
  }

  function renderDimensionTabs() {
    els.dimensions.innerHTML = "";
    // Single dimension → no need for tabs.
    els.dimensions.style.display = dimensions.length <= 1 ? "none" : "";

    dimensions.forEach((dim, i) => {
      const btn = document.createElement("button");
      btn.className = "dimension-btn";
      btn.type = "button";
      btn.textContent = dim;
      btn.setAttribute("role", "tab");
      btn.setAttribute("aria-selected", i === 0 ? "true" : "false");
      btn.addEventListener("click", () => {
        els.dimensions
          .querySelectorAll(".dimension-btn")
          .forEach((b) => b.setAttribute("aria-selected", "false"));
        btn.setAttribute("aria-selected", "true");
        renderDimension(dim);
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
      els.dimensions.appendChild(btn);
    });
  }

  /* ---------------- Init ---------------- */
  initTheme();
  initSettings();

  if (!Array.isArray(journal) || journal.length === 0) {
    els.title.textContent = "No notes yet";
    els.subtitle.textContent = "Add one in data.js to get started.";
    return;
  }
  renderDimensionTabs();
  renderDimension(dimensions[0]);
})();
