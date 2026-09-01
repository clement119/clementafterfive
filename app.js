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
  const downloadIconSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12m0 0-4.5-4.5M12 15l4.5-4.5"/><path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>`;

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

  // A bold group label spanning multiple sections (e.g. "Strategic Planning"
  // over several accordion sections). `isFirst` tightens the top margin for
  // a pillar heading that opens a dimension, right under the subtitle/meta.
  function buildPillarHeading(text, isFirst) {
    const h = document.createElement("h2");
    h.className = "pillar-heading" + (isFirst ? " pillar-heading--first" : "");
    h.textContent = text;
    return h;
  }

  // A before/after example pair — two labelled images side by side, with an
  // optional caption. Used to show what a prompt produces.
  function buildBeforeAfter(cfg) {
    const fig = document.createElement("figure");
    fig.className = "ba-figure";

    const grid = document.createElement("div");
    grid.className = "ba-grid";

    [
      ["before", cfg.beforeLabel || "Before"],
      ["after", cfg.afterLabel || "After"],
    ].forEach(([key, label]) => {
      const src = cfg[key];
      if (!src) return;
      const cell = document.createElement("div");
      cell.className = "ba-cell";

      const img = document.createElement("img");
      img.className = "ba-img";
      img.src = src;
      img.loading = "lazy";
      img.alt = label + " example";

      const tag = document.createElement("span");
      tag.className = "ba-label";
      tag.textContent = label;

      cell.append(img, tag);
      grid.appendChild(cell);
    });
    fig.appendChild(grid);

    if (cfg.caption) {
      const cap = document.createElement("figcaption");
      cap.className = "ba-caption";
      cap.textContent = cfg.caption;
      fig.appendChild(cap);
    }
    return fig;
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


  // A copyable prompt offered in more than one language. A toggle switches the
  // shown text; Copy always grabs whichever language is currently displayed.
  function buildI18nPrompt(cfg) {
    cfg = cfg || {};
    const langs = [
      { key: "zh", label: "中文" },
      { key: "en", label: "English" },
    ].filter((l) => cfg[l.key]);
    if (!langs.length) return buildItem(String(cfg.zh || cfg.en || ""), 0);

    let current =
      cfg.defaultLang && cfg[cfg.defaultLang] ? cfg.defaultLang : langs[0].key;

    const el = document.createElement("div");
    el.className = "item i18n-prompt";

    const head = document.createElement("div");
    head.className = "i18n-head";

    const toggle = document.createElement("div");
    toggle.className = "lang-toggle";
    toggle.setAttribute("role", "group");
    toggle.setAttribute("aria-label", "Prompt language");

    const btns = {};
    langs.forEach((l) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "lang-btn";
      b.textContent = l.label;
      b.setAttribute("aria-pressed", l.key === current ? "true" : "false");
      b.addEventListener("click", () => setLang(l.key));
      btns[l.key] = b;
      toggle.appendChild(b);
    });

    const copyBtn = document.createElement("button");
    copyBtn.className = "copy-btn";
    copyBtn.type = "button";
    copyBtn.setAttribute("aria-label", "Copy prompt");
    copyBtn.innerHTML = `<span class="copy-icon">${copyIconSVG}</span><span class="copy-label">Copy</span>`;
    copyBtn.addEventListener("click", () => copyText(cfg[current], copyBtn));

    head.append(toggle, copyBtn);

    const text = document.createElement("p");
    text.className = "item-text i18n-text";

    function setLang(k) {
      current = k;
      Object.keys(btns).forEach((key) =>
        btns[key].setAttribute("aria-pressed", key === current ? "true" : "false")
      );
      text.textContent = cfg[current];
    }
    setLang(current);

    el.append(head, text);
    return el;
  }

  // A tappable link rendered as a CTA button. Opens in a new tab.
  const externalIconSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M9 7h8v8"/></svg>`;
  function buildLinkButton(cfg) {
    const a = document.createElement("a");
    a.className = cfg.compact ? "item-link item-link--soft" : "item-link";
    a.href = cfg.href || "#";
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    const label = document.createElement("span");
    label.textContent = cfg.label || cfg.href || "Open link";
    const icon = document.createElement("span");
    icon.className = "item-link-icon";
    icon.innerHTML = externalIconSVG;
    a.append(label, icon);
    return a;
  }

  // A grid of labelled reference images (e.g. carousel slides).
  function buildGallery(cfg) {
    const fig = document.createElement("figure");
    fig.className = "ba-figure";

    const grid = document.createElement("div");
    grid.className = "gallery-grid";

    (cfg.images || []).forEach((im) => {
      if (!im || !im.src) return;
      const cell = document.createElement("div");
      cell.className = "ba-cell";

      const img = document.createElement("img");
      img.className = "ba-img";
      img.src = im.src;
      img.loading = "lazy";
      img.alt = im.label || "";

      cell.appendChild(img);
      if (im.label) {
        const tag = document.createElement("span");
        tag.className = "ba-label";
        tag.textContent = im.label;
        cell.appendChild(tag);
      }
      grid.appendChild(cell);
    });
    fig.appendChild(grid);

    if (cfg.caption) {
      const cap = document.createElement("figcaption");
      cap.className = "ba-caption";
      cap.textContent = cfg.caption;
      fig.appendChild(cap);
    }
    return fig;
  }

  // A catalog of installable items (plug-ins, skills, MCP servers). Each card
  // carries a `type` (plugin|skill|mcp) and a `domain`; install may be a string
  // OR an array of lines (two-step plugin installs) copied as one block.
  // When cfg.filters is true, render Type + Domain chip filters over the cards.
  function buildCatalog(cfg) {
    const items = cfg && Array.isArray(cfg.items) ? cfg.items : [];
    const withFilters = cfg && cfg.filters === true;
    const typeLabel = { plugin: "Plug-in", skill: "Skill", mcp: "MCP" };
    const typeChip = { all: "All", plugin: "Plug-ins", skill: "Skills", mcp: "MCP servers" };

    const wrap = document.createElement("div");
    wrap.className = "catalog";

    const cards = [];
    let curType = "all";
    let curDomain = "all";
    const typeBtns = {};
    const domainBtns = {};
    let status = null;

    function uniq(arr) {
      const out = [];
      arr.forEach((v) => { if (v && out.indexOf(v) === -1) out.push(v); });
      return out;
    }

    function chipRow(labelText, values, current, btnMap, labelFor, onPick) {
      const row = document.createElement("div");
      row.className = "catalog-filter";
      const lab = document.createElement("span");
      lab.className = "catalog-filter-label";
      lab.textContent = labelText;
      const group = document.createElement("div");
      group.className = "skill-filter";
      group.setAttribute("role", "tablist");
      group.setAttribute("aria-label", labelText + " filter");
      values.forEach((v) => {
        const b = document.createElement("button");
        b.type = "button";
        b.className = "skill-filter-btn";
        b.setAttribute("role", "tab");
        b.setAttribute("aria-selected", v === current ? "true" : "false");
        b.textContent = labelFor(v);
        b.addEventListener("click", () => onPick(v));
        btnMap[v] = b;
        group.appendChild(b);
      });
      row.append(lab, group);
      return row;
    }

    if (withFilters) {
      const types = ["all"].concat(uniq(items.map((i) => i.type)));
      const domains = ["all"].concat(uniq(items.map((i) => i.domain)));
      wrap.appendChild(chipRow("Type", types, curType, typeBtns,
        (v) => typeChip[v] || v, (v) => { curType = v; apply(); }));
      wrap.appendChild(chipRow("Domain", domains, curDomain, domainBtns,
        (v) => (v === "all" ? "All" : v), (v) => { curDomain = v; apply(); }));
      status = document.createElement("p");
      status.className = "catalog-count";
      wrap.appendChild(status);
    }

    const list = document.createElement("div");
    list.className = "skill-list";

    items.forEach((s) => {
      const card = document.createElement("article");
      card.className = "skill-card";

      const head = document.createElement("div");
      head.className = "skill-head";

      const name = document.createElement("h3");
      name.className = "skill-name";
      name.textContent = s.name || "";
      head.appendChild(name);

      if (s.type && typeLabel[s.type]) {
        const badge = document.createElement("span");
        badge.className = "skill-type";
        badge.dataset.type = s.type;
        badge.textContent = typeLabel[s.type];
        head.appendChild(badge);
      }
      if (s.star) {
        const star = document.createElement("span");
        star.className = "skill-star";
        star.textContent = "★ start here";
        head.appendChild(star);
      }
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
        const lines = Array.isArray(s.install) ? s.install : [s.install];
        const text = lines.join("\n");
        const multi = lines.length > 1;

        const inst = document.createElement("div");
        inst.className = multi ? "skill-install skill-install--multi" : "skill-install";

        const code = document.createElement("code");
        code.className = multi ? "skill-cmd skill-cmd--multi" : "skill-cmd";
        code.textContent = text;

        const btn = document.createElement("button");
        btn.className = "copy-btn";
        btn.type = "button";
        btn.setAttribute("aria-label", "Copy install command for " + (s.name || "item"));
        btn.innerHTML = `<span class="copy-icon">${copyIconSVG}</span><span class="copy-label">Copy</span>`;
        btn.addEventListener("click", () => copyText(text, btn));

        inst.append(code, btn);
        card.appendChild(inst);
      }

      if (s.note) {
        const note = document.createElement("p");
        note.className = "skill-note";
        note.textContent = s.note;
        card.appendChild(note);
      }

      if (s.demo || s.repo) {
        const links = document.createElement("div");
        links.className = "skill-links";

        if (s.demo) {
          const demo = document.createElement("a");
          demo.className = "skill-link skill-link--demo";
          demo.href = s.demo;
          demo.target = "_blank";
          demo.rel = "noopener noreferrer";
          demo.textContent = s.demoLabel || "▶ Watch demo";
          links.appendChild(demo);
        }

        if (s.repo) {
          const link = document.createElement("a");
          link.className = "skill-link";
          link.href = s.repo;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          link.textContent = s.linkLabel || (s.repo.indexOf("github.com") > -1 ? "View on GitHub →" : "Open →");
          links.appendChild(link);
        }

        card.appendChild(links);
      }

      cards.push({ el: card, type: s.type || "", domain: s.domain || "" });
      list.appendChild(card);
    });

    wrap.appendChild(list);

    function setActive(map, cur) {
      Object.keys(map).forEach((k) =>
        map[k].setAttribute("aria-selected", k === cur ? "true" : "false"));
    }
    function apply() {
      let n = 0;
      cards.forEach((c) => {
        const show = (curType === "all" || c.type === curType) &&
          (curDomain === "all" || c.domain === curDomain);
        c.el.style.display = show ? "" : "none";
        if (show) n++;
      });
      if (status) status.textContent = n + " of " + cards.length + " shown";
      setActive(typeBtns, curType);
      setActive(domainBtns, curDomain);
    }
    if (withFilters) apply();

    return wrap;
  }

  // A swipeable gallery of idea/use-case cards. Native scroll-snap does the
  // swiping on touch; arrows + a counter give the same control on desktop.
  // Each card is a scenario: where you are, what you ask, what comes back.
  function buildIdeaDeck(cfg) {
    const cards = Array.isArray(cfg && cfg.cards) ? cfg.cards : [];

    const wrap = document.createElement("div");
    wrap.className = "ideadeck";

    const track = document.createElement("div");
    track.className = "ideadeck-track";

    cards.forEach((card, idx) => {
      const c = document.createElement("article");
      c.className = "ideadeck-card";

      const head = document.createElement("div");
      head.className = "ideadeck-head";
      const num = document.createElement("span");
      num.className = "ideadeck-num";
      num.textContent = String(idx + 1).padStart(2, "0");
      head.appendChild(num);
      if (card.tag) {
        const tag = document.createElement("span");
        tag.className = "ideadeck-tag";
        tag.textContent = card.tag;
        head.appendChild(tag);
      }
      c.appendChild(head);

      if (card.title) {
        const h = document.createElement("h3");
        h.className = "ideadeck-title";
        h.textContent = card.title;
        c.appendChild(h);
      }

      // Three beats per card: the moment, the ask, the payoff.
      const rows = [
        ["Looking at", card.looking],
        ["You ask", card.ask],
        ["You get", card.get],
      ];
      rows.forEach(([label, value]) => {
        if (!value) return;
        const row = document.createElement("div");
        row.className = "ideadeck-row";
        const lab = document.createElement("span");
        lab.className = "ideadeck-label";
        lab.textContent = label;
        const val = document.createElement("p");
        val.className = "ideadeck-value";
        if (label === "You ask") val.classList.add("ideadeck-value--ask");
        val.textContent = label === "You ask" ? "\u201c" + value + "\u201d" : value;
        row.append(lab, val);
        c.appendChild(row);
      });

      if (card.ask) {
        const btn = document.createElement("button");
        btn.className = "copy-btn ideadeck-copy";
        btn.type = "button";
        btn.setAttribute("aria-label", "Copy the ask for " + (card.title || "this use case"));
        btn.innerHTML = `<span class="copy-icon">${copyIconSVG}</span><span class="copy-label">Copy the ask</span>`;
        btn.addEventListener("click", () => copyText(card.ask, btn));
        c.appendChild(btn);
      }

      track.appendChild(c);
    });

    wrap.appendChild(track);

    // Controls — a counter plus prev/next. Hidden entirely for a single card.
    if (cards.length > 1) {
      const nav = document.createElement("div");
      nav.className = "ideadeck-nav";

      const prev = document.createElement("button");
      prev.type = "button";
      prev.className = "ideadeck-arrow";
      prev.setAttribute("aria-label", "Previous card");
      prev.textContent = "\u2190";

      const count = document.createElement("span");
      count.className = "ideadeck-count";

      const next = document.createElement("button");
      next.type = "button";
      next.className = "ideadeck-arrow";
      next.setAttribute("aria-label", "Next card");
      next.textContent = "\u2192";

      // The index is authoritative: arrows drive it and update instantly, so
      // rapid clicks can't compound off a half-finished smooth scroll. A manual
      // swipe re-derives it, but only once the scroll has settled.
      let idx = 0;
      let programmatic = false;
      let settle = null;

      function maxScroll() {
        return track.scrollWidth - track.clientWidth;
      }
      // Centre the card, clamped to the scrollable range — the first and last
      // cards can never truly centre, so they pin to the ends instead.
      function offsetFor(i) {
        const el = track.children[i];
        if (!el) return 0;
        const centred = el.offsetLeft - (track.clientWidth - el.offsetWidth) / 2;
        return Math.max(0, Math.min(maxScroll(), centred));
      }
      function render() {
        count.textContent = (idx + 1) + " / " + cards.length;
        prev.disabled = idx === 0;
        next.disabled = idx === cards.length - 1;
      }
      function go(delta) {
        idx = Math.min(Math.max(idx + delta, 0), cards.length - 1);
        programmatic = true;
        track.scrollTo({ left: offsetFor(idx), behavior: "smooth" });
        render();
      }
      // Because the ends clamp, treat "scrolled to the edge" as the edge card
      // rather than asking which card is nearest the centre.
      function fromScroll() {
        if (track.scrollLeft <= 2) {
          idx = 0;
        } else if (track.scrollLeft >= maxScroll() - 2) {
          idx = cards.length - 1;
        } else {
          const mid = track.scrollLeft + track.clientWidth / 2;
          let best = 0;
          let bestDist = Infinity;
          [...track.children].forEach((el, i) => {
            const d = Math.abs(el.offsetLeft + el.offsetWidth / 2 - mid);
            if (d < bestDist) { bestDist = d; best = i; }
          });
          idx = best;
        }
        render();
      }

      prev.addEventListener("click", () => go(-1));
      next.addEventListener("click", () => go(1));

      track.addEventListener("scroll", () => {
        clearTimeout(settle);
        settle = setTimeout(() => {
          if (programmatic) { programmatic = false; render(); return; }
          fromScroll();
        }, 120);
      });

      nav.append(prev, count, next);
      wrap.appendChild(nav);
      render();
    }

    return wrap;
  }

  function buildItem(item, i) {
    if (item && item.deck) return buildPersonaDeck(item.deck);
    if (item && item.ideaDeck) return buildIdeaDeck(item.ideaDeck);
    if (item && item.skills) return buildSkillList(item.skills);
    if (item && item.catalog) return buildCatalog(item.catalog);
    if (item && item.compare) return buildBeforeAfter(item.compare);
    if (item && item.gallery) return buildGallery(item.gallery);
    if (item && typeof item === "object" && item.link) return buildLinkButton(item.link);
    if (item && item.promptI18n) return buildI18nPrompt(item.promptI18n);
    if (item && item.builder) return buildBuilder(item.builder);
    if (item && item.fontLibrary) return buildFontLibrary(item.fontLibrary);
    if (item && item.stickerLibrary) return buildStickerLibrary(item.stickerLibrary);
    if (item && item.iconPreview) return buildIconPreview(item.iconPreview);
    if (item && item.progressBarBuilder) return buildProgressBarBuilder(item.progressBarBuilder);
    if (item && item.posterLibrary) return buildPosterLibrary(item.posterLibrary);
    if (item && item.uiStyleLibrary) return buildUIStyleLibrary(item.uiStyleLibrary);
    if (item && item.sketchLibrary) return buildSketchLibrary(item.sketchLibrary);
    if (item && item.stylePicker) return buildStylePicker(item.stylePicker);
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
          // A choice may carry `swatch: "#hex"` to preview the colour it
          // names. The label goes in its own span because assigning
          // textContent would wipe the swatch back out.
          if (choice.swatch) {
            btn.classList.add("choice-btn--swatch");
            const sw = document.createElement("span");
            sw.className = "choice-swatch";
            sw.style.background = choice.swatch;
            btn.appendChild(sw);
          }
          const lab = document.createElement("span");
          lab.textContent = choice.label;
          btn.appendChild(lab);
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

  // Font Library — swipeable deck of live-rendered type samples. Spacing and
  // case are style preferences that persist across cards (wrapper-level CSS
  // classes); weight and use-case are font-specific and rebuild per active
  // card. Output assembles a natural-language style brief, not CSS.
  function buildFontLibrary(cfg) {
    const wrap = document.createElement("div");
    wrap.className = "font-library";

    const fonts = Array.isArray(cfg.fonts) ? cfg.fonts : [];
    const spacingModes = Array.isArray(cfg.spacingModes) ? cfg.spacingModes : [];
    const caseModes = Array.isArray(cfg.caseModes) ? cfg.caseModes : [];
    const categoryTemplates = cfg.categoryTemplates || {};

    const state = {
      spacing: (spacingModes.find((m) => m.default) || spacingModes[0] || {}).key,
      case: (caseModes.find((m) => m.default) || caseModes[0] || {}).key,
      weightIdx: 0,
      useCaseIdx: 0,
      customUseCase: "",
    };

    function genericFamily(category) {
      if (category === "serif") return "serif";
      if (category === "script") return "cursive";
      return "sans-serif";
    }

    function applyWrapperClasses() {
      wrap.classList.toggle("fl-spacing-narrow", state.spacing === "narrow");
      wrap.classList.toggle("fl-case-upper", state.case === "uppercase");
    }

    // A pill-button row, styled exactly like buildBuilder's choice controls.
    function pillGroup(labelText, options, currentKey, onPick) {
      const group = document.createElement("div");
      group.className = "builder-control";
      const label = document.createElement("span");
      label.className = "builder-label";
      label.textContent = labelText;
      const choices = document.createElement("div");
      choices.className = "builder-choices";
      options.forEach((opt) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "choice-btn";
        btn.textContent = opt.label;
        btn.setAttribute("aria-pressed", opt.key === currentKey ? "true" : "false");
        btn.addEventListener("click", () => {
          choices.querySelectorAll(".choice-btn").forEach((b) => b.setAttribute("aria-pressed", "false"));
          btn.setAttribute("aria-pressed", "true");
          onPick(opt.key);
        });
        choices.appendChild(btn);
      });
      group.append(label, choices);
      return group;
    }

    const globalControls = document.createElement("div");
    globalControls.className = "builder fl-global-controls";
    if (spacingModes.length) {
      globalControls.appendChild(
        pillGroup("Spacing", spacingModes, state.spacing, (key) => {
          state.spacing = key;
          applyWrapperClasses();
        })
      );
    }
    if (caseModes.length) {
      globalControls.appendChild(
        pillGroup("Case", caseModes, state.case, (key) => {
          state.case = key;
          applyWrapperClasses();
          updateOutput();
        })
      );
    }

    // Deck — one live-rendered card per font. Built once; each card's own
    // sample carries its real (or stand-in) font-family/weight permanently.
    const deck = document.createElement("div");
    deck.className = "persona-deck fl-deck";

    const cardEls = fonts.map((font) => {
      const card = document.createElement("article");
      card.className = "fl-card";
      if (font.paid) card.dataset.standin = "true";

      const label = document.createElement("h3");
      label.className = "fl-label";
      label.textContent = font.label || "";

      const sample = document.createElement("p");
      sample.className = "fl-sample";
      sample.textContent = font.sample || "";

      const renderFamily = font.paid ? font.paid.standInFamily : font.family;
      const defaultWeight = font.weights && (font.weights.find((w) => w.default) || font.weights[0]);
      const renderWeight = font.paid ? font.paid.standInWeight : defaultWeight && defaultWeight.value;
      if (font.familyCSS) sample.style.fontFamily = font.familyCSS;
      else if (renderFamily) sample.style.fontFamily = `'${renderFamily}', ${genericFamily(font.category)}`;
      if (renderWeight) sample.style.fontWeight = String(renderWeight);
      if (font.fontStyle) sample.style.fontStyle = font.fontStyle;

      card.append(label, sample);

      const noteText = font.paid ? font.paid.note : font.note;
      if (noteText) {
        const note = document.createElement("p");
        note.className = "fl-standin-note skill-note";
        note.textContent = noteText;
        card.appendChild(note);
      }

      deck.appendChild(card);
      return card;
    });

    // Nav — prev/next arrows plus a dot per card, identical mechanics to
    // buildPersonaDeck's scroll-snap sync (cardStep/activeIndex/scrollToCard).
    const nav = document.createElement("div");
    nav.className = "persona-nav";

    const prev = document.createElement("button");
    prev.type = "button";
    prev.className = "persona-arrow";
    prev.setAttribute("aria-label", "Previous font");
    prev.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>`;

    const next = document.createElement("button");
    next.type = "button";
    next.className = "persona-arrow";
    next.setAttribute("aria-label", "Next font");
    next.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>`;

    const dots = document.createElement("div");
    dots.className = "persona-dots";
    const dotEls = fonts.map((font, idx) => {
      const d = document.createElement("button");
      d.type = "button";
      d.className = "persona-dot";
      d.setAttribute("aria-label", "Go to " + (font.label || "font " + (idx + 1)));
      d.addEventListener("click", () => scrollToCard(idx));
      dots.appendChild(d);
      return d;
    });

    function cardStep() {
      const first = deck.querySelector(".fl-card");
      if (!first) return deck.clientWidth || 1;
      const cs = getComputedStyle(deck);
      const gap = parseFloat(cs.columnGap || cs.gap || "0") || 0;
      return first.getBoundingClientRect().width + gap;
    }

    // With scroll-snap-align:center, a card's true snap position isn't
    // idx*cardStep() — it's offset by half the gap between the deck's
    // visible width and a single card's width (deck.clientWidth is wide
    // enough to show more than one card, so centering card i pulls the
    // deck left by that gap). Ignoring this offset was fine for a short
    // deck but compounds into real drift over many cards, causing the last
    // few cards near either end to collide onto the same clamped scroll
    // position and become unreachable/misreported via dot or arrow nav.
    function centerOffset() {
      const first = deck.querySelector(".fl-card");
      if (!first) return 0;
      return (deck.clientWidth - first.getBoundingClientRect().width) / 2;
    }

    function maxScrollLeft() {
      return Math.max(0, deck.scrollWidth - deck.clientWidth);
    }

    function activeIndex() {
      const idx = Math.round((deck.scrollLeft + centerOffset()) / cardStep());
      return Math.max(0, Math.min(fonts.length - 1, idx));
    }

    function scrollToCard(i) {
      const idx = Math.max(0, Math.min(fonts.length - 1, i));
      const target = idx * cardStep() - centerOffset();
      deck.scrollTo({ left: Math.max(0, Math.min(maxScrollLeft(), target)), behavior: "smooth" });
    }

    nav.append(prev, dots, next);

    // Per-card controls — weight and use-case rebuild for the active font.
    const panel = document.createElement("div");
    panel.className = "builder fl-panel";

    let activeFont = fonts[0] || {};

    function resolveWeight() {
      if (!activeFont.weights || activeFont.weights.length <= 1) return null;
      return activeFont.weights[state.weightIdx] || activeFont.weights[0];
    }

    function resolveUseCase() {
      if (state.useCaseIdx === "custom") {
        const v = state.customUseCase.trim();
        if (v) return v;
      }
      const list = activeFont.useCases || [];
      const choice =
        (state.useCaseIdx !== "custom" && list[state.useCaseIdx]) ||
        list.find((u) => u.default) ||
        list[0];
      return choice ? choice.label : "";
    }

    function assemble() {
      const isPaid = !!activeFont.paid;
      const template = isPaid
        ? cfg.paidTemplate
        : activeFont.template || categoryTemplates[activeFont.category] || categoryTemplates.default;
      if (!template) return "";

      const family = isPaid ? activeFont.paid.trueName : activeFont.family || activeFont.label;
      const weight = resolveWeight();
      const weightClause = weight ? ` in its ${weight.phrase} weight` : "";
      const useCase = resolveUseCase();
      const caseApplicable = activeFont.caseToggleApplicable !== false;
      const caseClause = state.case === "uppercase" && caseApplicable ? ", set in all caps" : "";
      const categoryDescriptor = isPaid ? activeFont.paid.categoryDescriptor || "" : "";

      const tokens = { family, weightClause, useCase, caseClause, categoryDescriptor };
      return template.replace(/\{(\w+)\}/g, (m, id) => (id in tokens ? tokens[id] : m));
    }

    const output = document.createElement("p");
    output.className = "item-text";
    const outBox = document.createElement("div");
    outBox.className = "item builder-output";
    const copyBtn = document.createElement("button");
    copyBtn.className = "copy-btn";
    copyBtn.type = "button";
    copyBtn.setAttribute("aria-label", "Copy font prompt");
    copyBtn.innerHTML = `<span class="copy-icon">${copyIconSVG}</span><span class="copy-label">Copy</span>`;
    copyBtn.addEventListener("click", () => copyText(assemble(), copyBtn));
    outBox.append(output, copyBtn);

    function updateOutput() {
      output.textContent = assemble();
      copyBtn.setAttribute("aria-label", "Copy prompt for " + (activeFont.label || "font"));
    }

    function buildPanel() {
      panel.innerHTML = "";

      const weightList = activeFont.weights || [];
      if (weightList.length > 1) {
        const defIdx = weightList.findIndex((w) => w.default);
        state.weightIdx = defIdx >= 0 ? defIdx : 0;
        panel.appendChild(
          pillGroup(
            "Weight",
            weightList.map((w, idx) => ({ key: idx, label: w.label })),
            state.weightIdx,
            (idx) => {
              state.weightIdx = idx;
              updateOutput();
            }
          )
        );
      } else {
        state.weightIdx = 0;
      }

      const useCaseList = activeFont.useCases || [];
      const defUCIdx = useCaseList.findIndex((u) => u.default);
      state.useCaseIdx = defUCIdx >= 0 ? defUCIdx : 0;
      state.customUseCase = "";

      const ucOptions = useCaseList.map((u, idx) => ({ key: idx, label: u.label }));
      if (activeFont.allowCustomUseCase) ucOptions.push({ key: "custom", label: "Custom…" });

      const customInput = document.createElement("input");
      customInput.type = "text";
      customInput.className = "builder-input";
      customInput.placeholder = "Describe the use case…";
      customInput.hidden = true;
      customInput.addEventListener("input", () => {
        state.customUseCase = customInput.value;
        updateOutput();
      });

      const ucGroup = pillGroup("Use case", ucOptions, state.useCaseIdx, (key) => {
        state.useCaseIdx = key;
        customInput.hidden = key !== "custom";
        updateOutput();
      });
      ucGroup.appendChild(customInput);
      panel.appendChild(ucGroup);
    }

    let lastActive = -1;
    function onCardChange(idx) {
      activeFont = fonts[idx] || fonts[0] || {};
      buildPanel();
      updateOutput();
    }

    function syncDots() {
      const a = Math.max(0, Math.min(fonts.length - 1, activeIndex()));
      dotEls.forEach((d, i) => d.setAttribute("aria-current", i === a ? "true" : "false"));
      prev.disabled = a <= 0;
      next.disabled = a >= fonts.length - 1;
      if (a !== lastActive) {
        lastActive = a;
        onCardChange(a);
      }
    }

    prev.addEventListener("click", () => scrollToCard(activeIndex() - 1));
    next.addEventListener("click", () => scrollToCard(activeIndex() + 1));

    let raf;
    deck.addEventListener("scroll", () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(syncDots);
    });

    wrap.append(globalControls, deck, nav, panel, outBox);

    applyWrapperClasses();
    lastActive = 0;
    onCardChange(0);
    requestAnimationFrame(syncDots);

    return wrap;
  }

  // Poster prompt carousel — each card is fully self-contained (own image,
  // own subject input, own live output/copy button), unlike the Font
  // Library's shared per-active-card panel: a typed subject must survive
  // swiping away and back, so nothing resets on card change here.
  function buildPosterLibrary(cfg) {
    const wrap = document.createElement("div");
    wrap.className = "poster-library";

    const posters = Array.isArray(cfg.posters) ? cfg.posters : [];

    const deck = document.createElement("div");
    deck.className = "persona-deck poster-deck";

    posters.forEach((poster) => {
      const card = document.createElement("article");
      card.className = "poster-card";

      const name = document.createElement("h3");
      name.className = "persona-name";
      name.textContent = poster.label || "";
      card.appendChild(name);

      if (poster.category) {
        const category = document.createElement("p");
        category.className = "poster-category";
        category.textContent = poster.category;
        card.appendChild(category);
      }

      if (poster.image) {
        const imgWrap = document.createElement("div");
        imgWrap.className = "poster-image-wrap";
        const img = document.createElement("img");
        img.className = "poster-image";
        img.src = poster.image;
        img.loading = "lazy";
        img.alt = poster.label || "Example poster";
        imgWrap.appendChild(img);
        card.appendChild(imgWrap);
      }

      if (poster.bestFor) {
        const bestFor = document.createElement("p");
        bestFor.className = "persona-tag";
        bestFor.textContent = poster.bestFor;
        card.appendChild(bestFor);
      }

      const inputGroup = document.createElement("div");
      inputGroup.className = "builder-control";
      const inputLabel = document.createElement("span");
      inputLabel.className = "builder-label";
      inputLabel.textContent = "Subject / context";
      const input = document.createElement("input");
      input.type = "text";
      input.className = "builder-input";
      input.placeholder = poster.fallback || "";
      inputGroup.append(inputLabel, input);
      card.appendChild(inputGroup);

      const output = document.createElement("p");
      output.className = "item-text";
      const outBox = document.createElement("div");
      outBox.className = "item builder-output";
      const copyBtn = document.createElement("button");
      copyBtn.className = "copy-btn";
      copyBtn.type = "button";
      copyBtn.setAttribute("aria-label", "Copy prompt for " + (poster.label || "poster"));
      copyBtn.innerHTML = `<span class="copy-icon">${copyIconSVG}</span><span class="copy-label">Copy</span>`;

      // Mirrors buildBuilder's resolve() for a type:"input" control: trim
      // the typed value, substitute it into {subject}, or fall back to the
      // poster's own bracketed example when the field is empty.
      function assemble() {
        const subject = input.value.trim() || poster.fallback || "";
        return String(poster.template || "").replace(/\{subject\}/g, subject);
      }
      function update() {
        output.textContent = assemble();
      }
      input.addEventListener("input", update);
      copyBtn.addEventListener("click", () => copyText(assemble(), copyBtn));

      outBox.append(output, copyBtn);
      card.appendChild(outBox);

      if (poster.tip) {
        const tip = document.createElement("p");
        tip.className = "skill-note";
        tip.textContent = poster.tip;
        card.appendChild(tip);
      }

      update();
      deck.appendChild(card);
    });

    wrap.appendChild(deck);

    // Nav — identical scroll-snap-center-aware mechanics to the Font
    // Library's deck (cardStep/centerOffset/activeIndex/scrollToCard),
    // minus onCardChange since no per-card panel needs rebuilding here.
    const nav = document.createElement("div");
    nav.className = "persona-nav";

    const prev = document.createElement("button");
    prev.type = "button";
    prev.className = "persona-arrow";
    prev.setAttribute("aria-label", "Previous poster");
    prev.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>`;

    const next = document.createElement("button");
    next.type = "button";
    next.className = "persona-arrow";
    next.setAttribute("aria-label", "Next poster");
    next.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>`;

    const dots = document.createElement("div");
    dots.className = "persona-dots";
    const dotEls = posters.map((poster, idx) => {
      const d = document.createElement("button");
      d.type = "button";
      d.className = "persona-dot";
      d.setAttribute("aria-label", "Go to " + (poster.label || "poster " + (idx + 1)));
      d.addEventListener("click", () => scrollToCard(idx));
      dots.appendChild(d);
      return d;
    });

    function cardStep() {
      const first = deck.querySelector(".poster-card");
      if (!first) return deck.clientWidth || 1;
      const cs = getComputedStyle(deck);
      const gap = parseFloat(cs.columnGap || cs.gap || "0") || 0;
      return first.getBoundingClientRect().width + gap;
    }

    function centerOffset() {
      const first = deck.querySelector(".poster-card");
      if (!first) return 0;
      return (deck.clientWidth - first.getBoundingClientRect().width) / 2;
    }

    function maxScrollLeft() {
      return Math.max(0, deck.scrollWidth - deck.clientWidth);
    }

    function activeIndex() {
      const idx = Math.round((deck.scrollLeft + centerOffset()) / cardStep());
      return Math.max(0, Math.min(posters.length - 1, idx));
    }

    function scrollToCard(i) {
      const idx = Math.max(0, Math.min(posters.length - 1, i));
      const target = idx * cardStep() - centerOffset();
      deck.scrollTo({ left: Math.max(0, Math.min(maxScrollLeft(), target)), behavior: "smooth" });
    }

    function syncDots() {
      const a = activeIndex();
      dotEls.forEach((d, i) => d.setAttribute("aria-current", i === a ? "true" : "false"));
      prev.disabled = a <= 0;
      next.disabled = a >= posters.length - 1;
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

    requestAnimationFrame(syncDots);

    return wrap;
  }

  // Shared arrows + dots for a scroll-snap deck. Same mechanics the Font
  // Library and Poster decks each spell out inline (they predate this
  // helper and are left alone); new decks call this instead of copying it
  // a third time. `noun` only labels the controls for screen readers.
  function buildDeckNav(deck, cardSelector, count, noun) {
    const nav = document.createElement("div");
    nav.className = "persona-nav";

    const prev = document.createElement("button");
    prev.type = "button";
    prev.className = "persona-arrow";
    prev.setAttribute("aria-label", "Previous " + noun);
    prev.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6"/></svg>`;

    const next = document.createElement("button");
    next.type = "button";
    next.className = "persona-arrow";
    next.setAttribute("aria-label", "Next " + noun);
    next.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m9 18 6-6-6-6"/></svg>`;

    const dots = document.createElement("div");
    dots.className = "persona-dots";
    const dotEls = [];
    for (let i = 0; i < count; i++) {
      const d = document.createElement("button");
      d.type = "button";
      d.className = "persona-dot";
      d.setAttribute("aria-label", "Go to " + noun + " " + (i + 1));
      d.addEventListener("click", () => scrollToCard(i));
      dots.appendChild(d);
      dotEls.push(d);
    }

    function cardStep() {
      const first = deck.querySelector(cardSelector);
      if (!first) return deck.clientWidth || 1;
      const cs = getComputedStyle(deck);
      const gap = parseFloat(cs.columnGap || cs.gap || "0") || 0;
      return first.getBoundingClientRect().width + gap;
    }
    function centerOffset() {
      const first = deck.querySelector(cardSelector);
      if (!first) return 0;
      return (deck.clientWidth - first.getBoundingClientRect().width) / 2;
    }
    function maxScrollLeft() {
      return Math.max(0, deck.scrollWidth - deck.clientWidth);
    }
    function activeIndex() {
      const idx = Math.round((deck.scrollLeft + centerOffset()) / cardStep());
      return Math.max(0, Math.min(count - 1, idx));
    }
    function scrollToCard(i) {
      const idx = Math.max(0, Math.min(count - 1, i));
      const target = idx * cardStep() - centerOffset();
      deck.scrollTo({ left: Math.max(0, Math.min(maxScrollLeft(), target)), behavior: "smooth" });
    }
    function syncDots() {
      const a = activeIndex();
      dotEls.forEach((d, i) => d.setAttribute("aria-current", i === a ? "true" : "false"));
      prev.disabled = a <= 0;
      next.disabled = a >= count - 1;
    }

    prev.addEventListener("click", () => scrollToCard(activeIndex() - 1));
    next.addEventListener("click", () => scrollToCard(activeIndex() + 1));

    let raf;
    deck.addEventListener("scroll", () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(syncDots);
    });

    nav.append(prev, dots, next);
    requestAnimationFrame(syncDots);
    return nav;
  }

  // UI style library — swipe through design directions, each showing the
  // same mock component rendered in that style (sandboxed iframe, same
  // isolation trick the stickers use) above the prompt that produces it.
  // The prompt takes a {subject} the way poster prompts do, so it drops
  // straight into a real brief instead of needing an edit first.
  function buildUIStyleLibrary(cfg) {
    const wrap = document.createElement("div");
    wrap.className = "uistyle-library";

    const styles = Array.isArray(cfg.styles) ? cfg.styles : [];
    const reset = cfg.previewReset || "";

    const deck = document.createElement("div");
    deck.className = "persona-deck uistyle-deck";

    styles.forEach((style) => {
      const card = document.createElement("article");
      card.className = "uistyle-card";

      const name = document.createElement("h3");
      name.className = "persona-name";
      name.textContent = style.label || "";
      card.appendChild(name);

      if (style.category) {
        const category = document.createElement("p");
        category.className = "poster-category";
        category.textContent = style.category;
        card.appendChild(category);
      }

      if (style.preview) {
        const previewWrap = document.createElement("div");
        previewWrap.className = "uistyle-preview";
        const iframe = document.createElement("iframe");
        iframe.className = "uistyle-preview-frame";
        iframe.setAttribute("sandbox", "");
        iframe.setAttribute("loading", "lazy");
        iframe.setAttribute("title", (style.label || "Style") + " preview");
        iframe.srcdoc = wrapStickerDoc(reset, style.preview);
        previewWrap.appendChild(iframe);
        card.appendChild(previewWrap);
      }

      if (style.bestFor) {
        const bestFor = document.createElement("p");
        bestFor.className = "persona-tag";
        bestFor.textContent = style.bestFor;
        card.appendChild(bestFor);
      }

      // The decomposed spec — what actually makes the look, named so you
      // can lift one row into a prompt without taking the whole style.
      if (Array.isArray(style.elements) && style.elements.length) {
        const specs = document.createElement("dl");
        specs.className = "uistyle-specs";
        style.elements.forEach((row) => {
          const dt = document.createElement("dt");
          dt.textContent = row.name;
          const dd = document.createElement("dd");
          dd.textContent = row.value;
          specs.append(dt, dd);
        });
        card.appendChild(specs);
      }

      const inputGroup = document.createElement("div");
      inputGroup.className = "builder-control";
      const inputLabel = document.createElement("span");
      inputLabel.className = "builder-label";
      inputLabel.textContent = "What are you building?";
      const input = document.createElement("input");
      input.type = "text";
      input.className = "builder-input";
      input.placeholder = style.fallback || "";
      inputGroup.append(inputLabel, input);
      card.appendChild(inputGroup);

      const output = document.createElement("p");
      output.className = "item-text";
      const outBox = document.createElement("div");
      outBox.className = "item builder-output";
      const copyBtn = document.createElement("button");
      copyBtn.className = "copy-btn";
      copyBtn.type = "button";
      copyBtn.setAttribute("aria-label", "Copy prompt for " + (style.label || "style"));
      copyBtn.innerHTML = `<span class="copy-icon">${copyIconSVG}</span><span class="copy-label">Copy</span>`;

      function assemble() {
        const subject = input.value.trim() || style.fallback || "";
        return String(style.template || "").replace(/\{subject\}/g, subject);
      }
      function update() {
        output.textContent = assemble();
      }
      input.addEventListener("input", update);
      copyBtn.addEventListener("click", () => copyText(assemble(), copyBtn));

      outBox.append(output, copyBtn);
      card.appendChild(outBox);

      if (style.tip) {
        const tip = document.createElement("p");
        tip.className = "skill-note";
        tip.textContent = style.tip;
        card.appendChild(tip);
      }

      update();
      deck.appendChild(card);
    });

    wrap.appendChild(deck);
    wrap.appendChild(buildDeckNav(deck, ".uistyle-card", styles.length, "style"));

    return wrap;
  }

  // Sketch library — swipe through illustration styles, each card carrying a
  // reference crop plus its own full builder. Unlike the poster deck (one
  // subject box per card), the whole control set lives inside the card, so
  // buildBuilder is embedded wholesale rather than reimplemented; per-card
  // state then survives swiping away and back for free.
  function buildSketchLibrary(cfg) {
    const wrap = document.createElement("div");
    wrap.className = "sketch-library";

    const styles = Array.isArray(cfg.styles) ? cfg.styles : [];

    const deck = document.createElement("div");
    deck.className = "persona-deck sketch-deck";

    styles.forEach((style) => {
      const card = document.createElement("article");
      card.className = "sketch-card";

      const name = document.createElement("h3");
      name.className = "persona-name";
      name.textContent = style.label || "";
      card.appendChild(name);

      if (style.category) {
        const category = document.createElement("p");
        category.className = "poster-category";
        category.textContent = style.category;
        card.appendChild(category);
      }

      if (style.image) {
        const imgWrap = document.createElement("div");
        imgWrap.className = "poster-image-wrap";
        const img = document.createElement("img");
        img.className = "poster-image";
        img.src = style.image;
        img.loading = "lazy";
        img.alt = style.label ? style.label + " reference" : "Style reference";
        imgWrap.appendChild(img);
        card.appendChild(imgWrap);
      }

      if (style.bestFor) {
        const bestFor = document.createElement("p");
        bestFor.className = "persona-tag";
        bestFor.textContent = style.bestFor;
        card.appendChild(bestFor);
      }

      if (style.builder) card.appendChild(buildBuilder(style.builder));

      if (style.tip) {
        const tip = document.createElement("p");
        tip.className = "skill-note";
        tip.textContent = style.tip;
        card.appendChild(tip);
      }

      deck.appendChild(card);
    });

    wrap.appendChild(deck);
    wrap.appendChild(buildDeckNav(deck, ".sketch-card", styles.length, "style"));

    return wrap;
  }

  // --- Style swatches -------------------------------------------------
  // 50 styles need 50 previews, and the source article's artwork can't be
  // republished — so each style declares a palette plus one of these motifs
  // and the tile is composed from CSS gradients. Twelve generators across
  // fifty palettes gives every style a distinct, instantly-loading preview
  // with no image assets. These read as palette-and-texture swatches, not
  // as finished artwork, which is what the copy beside them says.
  function hexA(hex, alpha) {
    const h = String(hex).replace("#", "");
    const n = parseInt(h.length === 3 ? h.replace(/./g, (c) => c + c) : h, 16);
    return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
  }

  // Each generator returns { image, size? } and is handed the style's
  // palette as [ground, primary, secondary, accent]; accent falls back to
  // primary so a 3-colour palette is legal.
  const STYLE_MOTIFS = {
    flat: (p) => ({
      image: `linear-gradient(148deg, ${p[1]} 0%, ${p[2]} 58%, ${p[3]} 100%)`,
    }),
    grid: (p) => ({
      image:
        `radial-gradient(circle at 50% 62%, ${p[3]} 0 14%, transparent 14.5%),` +
        `repeating-linear-gradient(90deg, ${hexA(p[1], 0.55)} 0 1px, transparent 1px 14px),` +
        `repeating-linear-gradient(0deg, ${hexA(p[1], 0.45)} 0 1px, transparent 1px 18px),` +
        `linear-gradient(180deg, ${p[2]} 0%, ${p[0]} 70%)`,
    }),
    dots: (p) => ({
      image:
        `radial-gradient(${p[1]} 26%, transparent 27%),` +
        `radial-gradient(${p[3]} 22%, transparent 23%),` +
        `linear-gradient(160deg, ${p[2]}, ${p[0]})`,
      size: "18px 18px, 18px 18px, cover",
      position: "0 0, 9px 9px, 0 0",
    }),
    arcs: (p) => ({
      image:
        `radial-gradient(circle at 0% 100%, transparent 30%, ${p[1]} 31% 46%, transparent 47%),` +
        `radial-gradient(circle at 100% 0%, transparent 24%, ${p[3]} 25% 40%, transparent 41%),` +
        `radial-gradient(circle at 100% 100%, ${p[2]} 0 28%, transparent 29%),` +
        `linear-gradient(140deg, ${p[0]}, ${p[2]})`,
    }),
    stripes: (p) => ({
      image:
        `repeating-linear-gradient(48deg, ${p[1]} 0 11px, ${p[0]} 11px 22px, ${p[3]} 22px 27px, ${p[0]} 27px 38px)`,
    }),
    blobs: (p) => ({
      image:
        `radial-gradient(ellipse 62% 48% at 22% 26%, ${hexA(p[1], 0.95)}, transparent 70%),` +
        `radial-gradient(ellipse 58% 52% at 82% 34%, ${hexA(p[3], 0.9)}, transparent 72%),` +
        `radial-gradient(ellipse 78% 56% at 50% 96%, ${hexA(p[2], 0.95)}, transparent 74%),` +
        `linear-gradient(180deg, ${p[0]}, ${p[2]})`,
    }),
    rays: (p) => ({
      image:
        `conic-gradient(from 12deg at 50% 58%, ${p[1]} 0 8deg, transparent 8deg 30deg, ${p[3]} 30deg 38deg, transparent 38deg 60deg),` +
        `radial-gradient(circle at 50% 58%, ${p[3]} 0 12%, transparent 13%),` +
        `linear-gradient(180deg, ${p[2]}, ${p[0]})`,
    }),
    glass: (p) => ({
      image:
        `linear-gradient(122deg, ${hexA("#ffffff", 0.5)} 0 26%, transparent 26.5% 44%, ${hexA("#ffffff", 0.28)} 44.5% 62%, transparent 63%),` +
        `radial-gradient(ellipse 60% 60% at 26% 22%, ${p[1]}, transparent 68%),` +
        `radial-gradient(ellipse 62% 62% at 78% 76%, ${p[3]}, transparent 70%),` +
        `linear-gradient(150deg, ${p[2]}, ${p[0]})`,
    }),
    mosaic: (p) => ({
      image:
        `linear-gradient(45deg, ${p[1]} 25%, transparent 25% 75%, ${p[1]} 75%),` +
        `linear-gradient(45deg, ${p[3]} 25%, transparent 25% 75%, ${p[3]} 75%),` +
        `linear-gradient(160deg, ${p[2]}, ${p[0]})`,
      size: "16px 16px, 16px 16px, cover",
      position: "0 0, 8px 8px, 0 0",
    }),
    grain: (p) => ({
      image:
        `repeating-linear-gradient(101deg, ${hexA(p[1], 0.5)} 0 1px, transparent 1px 4px),` +
        `repeating-linear-gradient(7deg, ${hexA(p[3], 0.42)} 0 1px, transparent 1px 3px),` +
        `linear-gradient(155deg, ${p[2]}, ${p[0]})`,
    }),
    ornate: (p) => ({
      image:
        `radial-gradient(circle at 50% 0%, transparent 44%, ${p[3]} 45% 50%, transparent 51%),` +
        `radial-gradient(circle at 0% 50%, transparent 44%, ${p[1]} 45% 50%, transparent 51%),` +
        `radial-gradient(circle at 100% 50%, transparent 44%, ${p[1]} 45% 50%, transparent 51%),` +
        `linear-gradient(150deg, ${p[0]}, ${p[2]})`,
      size: "26px 26px, 26px 26px, 26px 26px, cover",
    }),
    chiaroscuro: (p) => ({
      image:
        `radial-gradient(ellipse 46% 40% at 38% 28%, ${p[3]} 0%, ${hexA(p[1], 0.75)} 34%, transparent 68%),` +
        `radial-gradient(ellipse 90% 80% at 38% 28%, ${p[2]} 0%, transparent 76%),` +
        `linear-gradient(150deg, ${p[0]}, #000)`,
    }),
  };

  function applySwatch(el, style) {
    const p = Array.isArray(style.palette) ? style.palette.slice() : [];
    while (p.length < 4) p.push(p[p.length - 1] || "#888888");
    const gen = STYLE_MOTIFS[style.motif] || STYLE_MOTIFS.flat;
    const spec = gen(p);
    el.style.backgroundColor = p[0];
    el.style.backgroundImage = spec.image;
    if (spec.size) el.style.backgroundSize = spec.size;
    if (spec.position) el.style.backgroundPosition = spec.position;
  }

  // Prefers a real preview image when the style has one; falls back to the
  // generated CSS tile otherwise (and if the image 404s, since a partial
  // asset batch should never leave a style rendering blank). Used both to
  // build a fresh swatch element and to re-target an existing one (the
  // trigger and detail-panel swatches persist across selections, so their
  // content has to be swappable in place, not just built once).
  function setSwatchContent(el, style) {
    el.innerHTML = "";
    el.style.backgroundImage = "";
    if (style.image) {
      const img = document.createElement("img");
      img.className = "style-swatch-img";
      img.src = style.image;
      img.loading = "lazy";
      img.alt = "";
      img.addEventListener("error", () => {
        img.remove();
        applySwatch(el, style);
      });
      el.appendChild(img);
    } else {
      applySwatch(el, style);
    }
  }

  function styleSwatch(style, cls) {
    const el = document.createElement("span");
    el.className = "style-swatch" + (cls ? " " + cls : "");
    el.setAttribute("aria-hidden", "true");
    setSwatchContent(el, style);
    return el;
  }

  // --- 50 design styles picker ----------------------------------------
  // A searchable listbox rather than buildBuilder's pills: fifty options as
  // pills would be unusable. Everything else borrows the builder's class
  // vocabulary so it reads as the same family of control.
  function buildStylePicker(cfg) {
    const styles = Array.isArray(cfg.styles) ? cfg.styles : [];
    const outputTypes = Array.isArray(cfg.outputTypes) ? cfg.outputTypes : [];
    if (!styles.length) return document.createElement("div");

    const wrap = document.createElement("div");
    wrap.className = "style-picker";

    let selIdx = 0;
    let outIdx = 0;
    let sourceIdx = 0; // 0 = describe, 1 = uploaded image
    let open = false;

    // ---- trigger ----
    const field = document.createElement("div");
    field.className = "builder-control";
    const fieldLabel = document.createElement("span");
    fieldLabel.className = "builder-label";
    fieldLabel.textContent = "Design style";

    const trigger = document.createElement("button");
    trigger.type = "button";
    trigger.className = "style-trigger";
    trigger.setAttribute("aria-haspopup", "listbox");
    trigger.setAttribute("aria-expanded", "false");

    const trigSwatch = styleSwatch(styles[0]);
    const trigText = document.createElement("span");
    trigText.className = "style-trigger-text";
    const trigName = document.createElement("span");
    trigName.className = "style-trigger-name";
    const trigCat = document.createElement("span");
    trigCat.className = "style-trigger-cat";
    trigText.append(trigName, trigCat);
    const chev = document.createElement("span");
    chev.className = "style-chevron";
    chev.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>`;
    trigger.append(trigSwatch, trigText, chev);

    // ---- popup ----
    const popup = document.createElement("div");
    popup.className = "style-popup";
    popup.hidden = true;

    const search = document.createElement("input");
    search.type = "text";
    search.className = "builder-input style-search";
    search.placeholder = "Search " + styles.length + " styles…";
    search.setAttribute("aria-label", "Search design styles");

    const list = document.createElement("div");
    list.className = "style-list";
    list.setAttribute("role", "listbox");
    list.setAttribute("aria-label", "Design styles");

    const empty = document.createElement("p");
    empty.className = "style-empty";
    empty.textContent = "No styles match that search.";
    empty.hidden = true;

    // Options are built once and shown/hidden on filter, so the swatches
    // aren't recomposed on every keystroke.
    const optionEls = [];
    const groupEls = [];
    let currentCat = null;
    styles.forEach((s, i) => {
      if (s.category !== currentCat) {
        currentCat = s.category;
        const g = document.createElement("p");
        g.className = "style-group";
        g.textContent = s.category;
        list.appendChild(g);
        groupEls.push({ el: g, cat: s.category });
      }
      const opt = document.createElement("button");
      opt.type = "button";
      opt.className = "style-option";
      opt.setAttribute("role", "option");
      opt.setAttribute("aria-selected", i === 0 ? "true" : "false");
      opt.dataset.index = String(i);

      const t = document.createElement("span");
      t.className = "style-option-text";
      const n = document.createElement("span");
      n.className = "style-option-name";
      n.textContent = s.name;
      const d = document.createElement("span");
      d.className = "style-option-desc";
      d.textContent = s.desc || "";
      t.append(n, d);

      opt.append(styleSwatch(s), t);
      opt.addEventListener("click", () => {
        select(i);
        closePopup(true);
      });
      list.appendChild(opt);
      optionEls.push({ el: opt, style: s, cat: s.category });
    });

    popup.append(search, list, empty);
    field.append(fieldLabel, trigger, popup);

    // ---- detail panel ----
    const detail = document.createElement("div");
    detail.className = "style-detail";
    const detailSwatch = document.createElement("span");
    detailSwatch.className = "style-swatch style-swatch--lg";
    detailSwatch.setAttribute("aria-hidden", "true");
    const detailDesc = document.createElement("p");
    detailDesc.className = "style-detail-desc";
    const detailEls = document.createElement("p");
    detailEls.className = "style-detail-elements";
    detail.append(detailSwatch, detailDesc, detailEls);

    // ---- source fork (mirrors the Doodle Icon Sheet's describe/upload) ----
    const srcGroup = document.createElement("div");
    srcGroup.className = "builder-control";
    const srcLabel = document.createElement("span");
    srcLabel.className = "builder-label";
    srcLabel.textContent = "Source";
    const srcChoices = document.createElement("div");
    srcChoices.className = "builder-choices";
    const SOURCES = ["Describe an object", "From my uploaded image"];
    const srcBtns = SOURCES.map((label, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "choice-btn";
      b.textContent = label;
      b.setAttribute("aria-pressed", i === 0 ? "true" : "false");
      b.addEventListener("click", () => {
        sourceIdx = i;
        srcBtns.forEach((o, j) => o.setAttribute("aria-pressed", j === i ? "true" : "false"));
        objGroup.hidden = i !== 0;
        update();
      });
      srcChoices.appendChild(b);
      return b;
    });
    srcGroup.append(srcLabel, srcChoices);

    const objGroup = document.createElement("div");
    objGroup.className = "builder-control";
    const objLabel = document.createElement("span");
    objLabel.className = "builder-label";
    objLabel.textContent = "Object to render";
    const objInput = document.createElement("input");
    objInput.type = "text";
    objInput.className = "builder-input";
    objInput.placeholder = cfg.placeholder || "e.g. a coffee cup, a running shoe, a landing page hero";
    objInput.addEventListener("input", update);
    objGroup.append(objLabel, objInput);

    // ---- output type ----
    const outGroup = document.createElement("div");
    outGroup.className = "builder-control";
    const outLabel = document.createElement("span");
    outLabel.className = "builder-label";
    outLabel.textContent = "What are you making?";
    const outChoices = document.createElement("div");
    outChoices.className = "builder-choices";
    const outBtns = outputTypes.map((o, i) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "choice-btn";
      b.textContent = o.label;
      b.setAttribute("aria-pressed", i === 0 ? "true" : "false");
      b.addEventListener("click", () => {
        outIdx = i;
        outBtns.forEach((x, j) => x.setAttribute("aria-pressed", j === i ? "true" : "false"));
        update();
      });
      outChoices.appendChild(b);
      return b;
    });
    outGroup.append(outLabel, outChoices);

    // ---- output ----
    const outBox = document.createElement("div");
    outBox.className = "item builder-output";
    const outText = document.createElement("p");
    outText.className = "item-text";
    const copyBtn = document.createElement("button");
    copyBtn.className = "copy-btn";
    copyBtn.type = "button";
    copyBtn.setAttribute("aria-label", "Copy style prompt");
    copyBtn.innerHTML = `<span class="copy-icon">${copyIconSVG}</span><span class="copy-label">Copy</span>`;
    copyBtn.addEventListener("click", () => copyText(assemble(), copyBtn));
    outBox.append(outText, copyBtn);

    function assemble() {
      const s = styles[selIdx];
      const out = outputTypes[outIdx] || { value: "An image" };
      const subject =
        sourceIdx === 1
          ? "the subject of the uploaded image"
          : objInput.value.trim() || "[describe your object]";
      let text = `${out.value} of ${subject}. STYLE: ${s.name} — ${s.directive}`;
      if (sourceIdx === 1) {
        text +=
          " Keep the subject, proportions and composition of the uploaded image; restyle it completely in this style rather than redrawing it from scratch.";
      }
      return text;
    }

    function update() {
      outText.textContent = assemble();
    }

    function select(i) {
      selIdx = i;
      const s = styles[i];
      setSwatchContent(trigSwatch, s);
      setSwatchContent(detailSwatch, s);
      trigName.textContent = s.name;
      trigCat.textContent = s.category || "";
      detailDesc.textContent = s.desc || "";
      detailEls.textContent = s.elements ? "Core elements — " + s.elements : "";
      optionEls.forEach((o, j) => o.el.setAttribute("aria-selected", j === i ? "true" : "false"));
      update();
    }

    function applyFilter() {
      const q = search.value.trim().toLowerCase();
      let shown = 0;
      const catHas = {};
      optionEls.forEach((o) => {
        const hit =
          !q ||
          o.style.name.toLowerCase().indexOf(q) > -1 ||
          String(o.style.category || "").toLowerCase().indexOf(q) > -1 ||
          String(o.style.desc || "").toLowerCase().indexOf(q) > -1;
        o.el.hidden = !hit;
        if (hit) {
          shown++;
          catHas[o.cat] = true;
        }
      });
      groupEls.forEach((g) => (g.el.hidden = !catHas[g.cat]));
      empty.hidden = shown > 0;
    }

    function visibleOptions() {
      return optionEls.filter((o) => !o.el.hidden).map((o) => o.el);
    }

    function openPopup() {
      open = true;
      popup.hidden = false;
      trigger.setAttribute("aria-expanded", "true");
      search.value = "";
      applyFilter();
      search.focus();
    }
    function closePopup(focusTrigger) {
      open = false;
      popup.hidden = true;
      trigger.setAttribute("aria-expanded", "false");
      if (focusTrigger) trigger.focus();
    }

    trigger.addEventListener("click", () => (open ? closePopup(false) : openPopup()));
    search.addEventListener("input", applyFilter);

    // Keyboard: Escape closes, Down enters the list, Enter picks the first
    // match so searching then pressing Enter selects without reaching.
    search.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closePopup(true);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        const v = visibleOptions();
        if (v.length) v[0].focus();
      } else if (e.key === "Enter") {
        e.preventDefault();
        const v = visibleOptions();
        if (v.length) {
          select(Number(v[0].dataset.index));
          closePopup(true);
        }
      }
    });

    list.addEventListener("keydown", (e) => {
      const v = visibleOptions();
      const at = v.indexOf(document.activeElement);
      if (e.key === "ArrowDown") {
        e.preventDefault();
        if (at > -1 && at < v.length - 1) v[at + 1].focus();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (at > 0) v[at - 1].focus();
        else search.focus();
      } else if (e.key === "Escape") {
        e.preventDefault();
        closePopup(true);
      }
    });

    document.addEventListener("click", (e) => {
      if (open && !field.contains(e.target)) closePopup(false);
    });

    wrap.append(field, detail, srcGroup, objGroup, outGroup, outBox);

    select(0);
    return wrap;
  }

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;",
    }[c]));
  }

  function wrapStickerDoc(sharedStyle, bodyHtml) {
    return `<!DOCTYPE html><html><head><meta charset="utf-8"><style>${sharedStyle}</style></head><body>${bodyHtml}</body></html>`;
  }

  // Rasterizes the sticker's own element (not the .stage preview canvas)
  // into a transparent PNG blob, read fresh from the iframe each call since
  // its srcdoc gets rebuilt on every keystroke. Requires the iframe's
  // sandbox to include "allow-same-origin" so contentDocument is reachable.
  function exportStickerBlob(iframe) {
    const node = iframe.contentDocument && iframe.contentDocument.querySelector(".sticker-capture");
    if (!node || !window.htmlToImage) return Promise.reject(new Error("Sticker preview not ready"));
    return window.htmlToImage.toBlob(node, { pixelRatio: 3, backgroundColor: undefined, cacheBust: true });
  }

  // Instagram Story sticker mockups: fill in per-sticker fields (or leave
  // blank), see a live iframe-isolated preview update instantly, and get a
  // natural-language "overlay this onto my photo" prompt for an AI image
  // tool. Each sticker owns its own buildHtml/buildPrompt in the data.
  function buildStickerLibrary(cfg) {
    const wrap = document.createElement("div");
    wrap.className = "sticker-library";
    const stickers = Array.isArray(cfg.stickers) ? cfg.stickers : [];
    stickers.forEach((sticker) => wrap.appendChild(buildStickerCard(sticker, cfg.sharedStyle)));
    return wrap;
  }

  function buildStickerCard(sticker, sharedStyle) {
    const card = document.createElement("div");
    card.className = "sticker-card";

    const label = document.createElement("h3");
    label.className = "fl-label";
    label.textContent = sticker.label || "";
    card.appendChild(label);

    const fields = Array.isArray(sticker.fields) ? sticker.fields : [];
    const fieldEls = {};
    const choiceState = {};
    const choiceEls = {}; // rowChoice key -> its .builder-choices holder

    const fieldsWrap = document.createElement("div");
    fieldsWrap.className = "builder sticker-fields";

    // Kept verbatim (no trim/split-filter) so typed blank lines and
    // leading/trailing spaces survive — that's how a sticker's rendered
    // panel height can be padded out with plain whitespace. Only
    // `resolved()`'s emptiness check decides fallback to the field's
    // default; the stored value itself is never altered.
    function readRaw() {
      const raw = {};
      fields.forEach((f) => {
        if (f.type === "choice" || f.type === "rowChoice") {
          raw[f.key] = choiceState[f.key];
          return;
        }
        const v = fieldEls[f.key].value;
        raw[f.key] = f.type === "list" ? v.split("\n") : v;
      });
      return raw;
    }

    function resolved(raw) {
      const out = {};
      fields.forEach((f) => {
        if (f.type === "choice" || f.type === "rowChoice") {
          out[f.key] = raw[f.key];
          return;
        }
        const v = raw[f.key];
        // Only a field with literally nothing typed falls back to its
        // default — pure whitespace/blank lines count as real content
        // (that's how "just blank lines, no text" pads a panel's height),
        // so this checks length/shape, not .trim().
        const empty = Array.isArray(v) ? v.length === 1 && v[0] === "" : v.length === 0;
        out[f.key] = empty ? f.default : v;
      });
      return out;
    }

    // A `rowChoice` field is a pill picker whose options come from another
    // field's list, so they have to be re-derived whenever that list is
    // edited — same shape as buildBuilder's refreshVisibility(), which
    // re-derives a control from another control's value on every update.
    // Pills are labelled with each row's own text; separator and blank
    // rows aren't offered (you'd never select those), and a leading "None"
    // pill clears the selection. Rebuilding only touches the DOM and never
    // dispatches input events, so this can't loop back into update().
    function selectableRows(f, raw) {
      const src = Array.isArray(raw[f.from]) ? raw[f.from] : [];
      const out = [];
      src.forEach((label, i) => {
        const t = String(label).trim();
        if (t === "" || t === "---") return;
        out.push({ index: i, label: t });
      });
      return out;
    }

    function refreshRowChoices(raw) {
      fields.forEach((f) => {
        if (f.type !== "rowChoice") return;
        const rows = selectableRows(f, raw);
        // The selection is positional, so it survives renaming a row —
        // the common case, since you're typing your own labels. It clears
        // only when that position stops being selectable at all (the list
        // got shorter, or that line became a divider or blank).
        if (!rows.some((r) => r.index === choiceState[f.key])) choiceState[f.key] = null;

        const holder = choiceEls[f.key];
        holder.innerHTML = "";
        const opts = [{ index: null, label: "None" }].concat(rows);
        opts.forEach((o) => {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = "choice-btn";
          btn.textContent = o.label.length > 18 ? o.label.slice(0, 17) + "…" : o.label;
          btn.setAttribute("aria-pressed", o.index === choiceState[f.key] ? "true" : "false");
          btn.addEventListener("click", () => {
            choiceState[f.key] = o.index;
            update();
          });
          holder.appendChild(btn);
        });
      });
    }

    let currentDoc = "";
    function update() {
      const raw = readRaw();
      const res = resolved(raw);
      // Derive the pills from the RESOLVED rows — an untouched field holds
      // its default as a placeholder, not a value, so `raw` would be blank
      // and offer no rows to pick. Clamping happens here, before render, so
      // the preview never draws a selection that just went stale.
      refreshRowChoices(res);
      fields.forEach((f) => {
        if (f.type !== "rowChoice") return;
        raw[f.key] = choiceState[f.key];
        res[f.key] = choiceState[f.key];
      });
      currentDoc = wrapStickerDoc(sharedStyle, sticker.buildHtml(res, escapeHtml));
      iframe.srcdoc = currentDoc;
      output.textContent = sticker.buildPrompt(raw);
    }

    fields.forEach((f) => {
      const group = document.createElement("div");
      group.className = "builder-control";
      const lab = document.createElement("span");
      lab.className = "builder-label";
      const isPicker = f.type === "choice" || f.type === "rowChoice";
      lab.textContent = isPicker ? f.label : f.label + " (optional — leave blank to let the AI choose)";
      group.appendChild(lab);

      if (f.type === "rowChoice") {
        choiceState[f.key] = f.default == null ? null : f.default;
        const choices = document.createElement("div");
        choices.className = "builder-choices";
        choiceEls[f.key] = choices; // pills are filled in by refreshRowChoices
        group.appendChild(choices);
        fieldsWrap.appendChild(group);
        return;
      }

      if (f.type === "choice") {
        choiceState[f.key] = f.default || (f.choices[0] && f.choices[0].value);
        const choices = document.createElement("div");
        choices.className = "builder-choices";
        (f.choices || []).forEach((c) => {
          const btn = document.createElement("button");
          btn.type = "button";
          btn.className = "choice-btn";
          // Same optional `swatch: "#hex"` preview buildBuilder's pills
          // support — label goes in its own span so setting textContent
          // can't wipe the swatch back out.
          if (c.swatch) {
            btn.classList.add("choice-btn--swatch");
            const sw = document.createElement("span");
            sw.className = "choice-swatch";
            sw.style.background = c.swatch;
            btn.appendChild(sw);
          }
          const lab = document.createElement("span");
          lab.textContent = c.label;
          btn.appendChild(lab);
          btn.setAttribute("aria-pressed", c.value === choiceState[f.key] ? "true" : "false");
          btn.addEventListener("click", () => {
            choiceState[f.key] = c.value;
            choices.querySelectorAll(".choice-btn").forEach((b) => b.setAttribute("aria-pressed", "false"));
            btn.setAttribute("aria-pressed", "true");
            update();
          });
          choices.appendChild(btn);
        });
        group.appendChild(choices);
        fieldsWrap.appendChild(group);
        return;
      }

      let el;
      if (f.type === "text") {
        el = document.createElement("input");
        el.type = "text";
        el.className = "builder-input";
      } else {
        el = document.createElement("textarea");
        el.className = "builder-input builder-textarea";
        el.rows = f.type === "list" ? Math.max(2, (f.default || []).length) : 3;
      }
      el.placeholder = Array.isArray(f.default) ? f.default.join("\n") : f.default || "";
      el.addEventListener("input", update);
      fieldEls[f.key] = el;
      group.appendChild(el);
      fieldsWrap.appendChild(group);
    });
    card.appendChild(fieldsWrap);

    const previewWrap = document.createElement("div");
    previewWrap.className = "sticker-preview";
    const iframe = document.createElement("iframe");
    iframe.className = "sticker-preview-frame";
    iframe.setAttribute("sandbox", "allow-same-origin");
    iframe.setAttribute("title", (sticker.label || "Sticker") + " preview");
    // .stage grows past its 340px min-height when blank lines/long text
    // push a panel taller — resize the iframe itself to match on every
    // srcdoc reload, so that growth is visible in the preview, not just
    // in the exported PNG (which already sizes to content).
    iframe.addEventListener("load", () => {
      const doc = iframe.contentDocument;
      if (!doc) return;
      iframe.style.height = Math.max(380, doc.documentElement.scrollHeight) + "px";
    });
    previewWrap.appendChild(iframe);
    card.appendChild(previewWrap);

    const actionsRow = document.createElement("div");
    actionsRow.className = "sticker-actions";

    const downloadBtn = document.createElement("button");
    downloadBtn.className = "copy-btn sticker-download";
    downloadBtn.type = "button";
    downloadBtn.dataset.copyLabel = "Download PNG";
    downloadBtn.setAttribute("aria-label", "Download " + (sticker.label || "sticker") + " as a PNG image");
    downloadBtn.innerHTML = `<span class="copy-icon">${copyIconSVG}</span><span class="copy-label">Download PNG</span>`;
    downloadBtn.addEventListener("click", () => {
      exportStickerBlob(iframe)
        .then((blob) => {
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = (sticker.id || "sticker") + ".png";
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(url);
          flashCopied(downloadBtn);
        })
        .catch(() => showToast("Couldn't export the image — try again"));
    });
    actionsRow.appendChild(downloadBtn);

    // Writing images to the clipboard isn't universally supported (notably
    // Firefox) — hide the button rather than show one that would just fail.
    if (typeof ClipboardItem !== "undefined" && navigator.clipboard && navigator.clipboard.write) {
      const copyImageBtn = document.createElement("button");
      copyImageBtn.className = "copy-btn sticker-copy-image";
      copyImageBtn.type = "button";
      copyImageBtn.dataset.copyLabel = "Copy image";
      copyImageBtn.setAttribute("aria-label", "Copy " + (sticker.label || "sticker") + " image to clipboard");
      copyImageBtn.innerHTML = `<span class="copy-icon">${copyIconSVG}</span><span class="copy-label">Copy image</span>`;
      copyImageBtn.addEventListener("click", () => {
        // The Blob promise must be handed to ClipboardItem synchronously
        // (not awaited first) — Safari revokes clipboard-write permission
        // once the call stack leaves the original user-gesture handler.
        try {
          const item = new ClipboardItem({ "image/png": exportStickerBlob(iframe) });
          navigator.clipboard
            .write([item])
            .then(() => flashCopied(copyImageBtn))
            .catch(() => showToast("Couldn't copy — try Download instead"));
        } catch (err) {
          showToast("Couldn't copy — try Download instead");
        }
      });
      actionsRow.appendChild(copyImageBtn);
    }
    card.appendChild(actionsRow);

    const htmlCopyBtn = document.createElement("button");
    htmlCopyBtn.className = "copy-btn sticker-html-copy";
    htmlCopyBtn.type = "button";
    htmlCopyBtn.dataset.copyLabel = "Copy sticker HTML";
    htmlCopyBtn.setAttribute("aria-label", "Copy " + (sticker.label || "sticker") + " HTML");
    htmlCopyBtn.innerHTML = `<span class="copy-icon">${copyIconSVG}</span><span class="copy-label">Copy sticker HTML</span>`;
    htmlCopyBtn.addEventListener("click", () => copyText(currentDoc, htmlCopyBtn));
    card.appendChild(htmlCopyBtn);

    const output = document.createElement("p");
    output.className = "item-text";
    const outBox = document.createElement("div");
    outBox.className = "item builder-output";
    const promptCopyBtn = document.createElement("button");
    promptCopyBtn.className = "copy-btn";
    promptCopyBtn.type = "button";
    promptCopyBtn.setAttribute("aria-label", "Copy prompt for " + (sticker.label || "sticker"));
    promptCopyBtn.innerHTML = `<span class="copy-icon">${copyIconSVG}</span><span class="copy-label">Copy</span>`;
    promptCopyBtn.addEventListener("click", () => copyText(output.textContent, promptCopyBtn));
    outBox.append(output, promptCopyBtn);
    card.appendChild(outBox);

    update();
    return card;
  }

  function buildIconPreview(cfg) {
    const modes = Array.isArray(cfg.modes) ? cfg.modes : [];
    const formats = Array.isArray(cfg.formats) ? cfg.formats : [];
    if (!modes.length) return document.createElement("div");

    const card = document.createElement("div");
    card.className = "icon-preview-card";

    const label = document.createElement("h3");
    label.className = "fl-label";
    label.textContent = (cfg.brand || "") + " logo";
    card.appendChild(label);

    let activeMode = modes.find((m) => m.default) || modes[0];

    const modeGroup = document.createElement("div");
    modeGroup.className = "builder-control";
    const modeLabel = document.createElement("span");
    modeLabel.className = "builder-label";
    modeLabel.textContent = "Style";
    modeGroup.appendChild(modeLabel);
    const modeChoices = document.createElement("div");
    modeChoices.className = "builder-choices";
    modeGroup.appendChild(modeChoices);
    card.appendChild(modeGroup);

    const swatch = document.createElement("div");
    swatch.className = "icon-preview-swatch";
    card.appendChild(swatch);

    const formatsRow = document.createElement("div");
    formatsRow.className = "icon-preview-formats";
    const formatLinks = formats.map((format) => {
      const a = document.createElement("a");
      a.className = "copy-btn icon-download-btn";
      a.innerHTML = `<span class="copy-icon">${downloadIconSVG}</span><span class="copy-label">${format.label}</span>`;
      formatsRow.appendChild(a);
      return { format, el: a };
    });
    card.appendChild(formatsRow);

    if (cfg.credit) {
      const credit = document.createElement("p");
      credit.className = "skill-note icon-preview-credit";
      credit.textContent = cfg.credit;
      card.appendChild(credit);
    }

    function render() {
      swatch.innerHTML = activeMode.markup || "";
      swatch.style.fontSize = activeMode.previewSize || "72px";
      modeChoices.querySelectorAll(".choice-btn").forEach((b) => {
        b.setAttribute("aria-pressed", b.dataset.modeKey === activeMode.key ? "true" : "false");
      });
      formatLinks.forEach(({ format, el }) => {
        const href = (cfg.basePath || "") + format.dir + "/" + activeMode.slug + "." + format.ext;
        el.href = href;
        el.download = activeMode.slug + "-" + format.key + "." + format.ext;
        el.setAttribute("aria-label", "Download " + activeMode.label + " " + (cfg.brand || "") + " logo as " + format.label);
      });
    }

    modes.forEach((mode) => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "choice-btn";
      btn.textContent = mode.label;
      btn.dataset.modeKey = mode.key;
      btn.addEventListener("click", () => {
        activeMode = mode;
        render();
      });
      modeChoices.appendChild(btn);
    });

    render();
    return card;
  }

  function buildProgressBarBuilder(cfg) {
    const d = cfg.defaults || {};
    const state = {
      labels: (d.labels || []).slice(),
      activeIndex: d.activeIndex != null ? d.activeIndex : 0,
      width: d.width || 600,
      height: d.height || 60,
      barThickness: d.barThickness || 6,
      fontSize: d.fontSize || 11,
      accentColor: d.accentColor || "#2B1E1A",
      trackColor: d.trackColor || "#E2E2E2",
      bracketColor: d.bracketColor || "#CCCCCC",
      inactiveColor: d.inactiveColor || "#777777",
    };

    const card = document.createElement("div");
    card.className = "progress-bar-card";

    const label = document.createElement("h3");
    label.className = "fl-label";
    label.textContent = cfg.title || "Segmented Progress Bar";
    card.appendChild(label);

    // Labels
    const labelsGroup = document.createElement("div");
    labelsGroup.className = "builder-control";
    const labelsLabel = document.createElement("span");
    labelsLabel.className = "builder-label";
    labelsLabel.textContent = "Section labels (one per line)";
    labelsGroup.appendChild(labelsLabel);
    const labelsTextarea = document.createElement("textarea");
    labelsTextarea.className = "builder-input builder-textarea";
    labelsTextarea.rows = Math.max(3, state.labels.length);
    labelsTextarea.value = state.labels.join("\n");
    labelsGroup.appendChild(labelsTextarea);
    card.appendChild(labelsGroup);

    // Active section — pills derived from the labels field above, same
    // "options come from a sibling field" idea as the Windows 95 sticker's
    // rowChoice, rebuilt here since this builder has no shared field engine
    // to hook into. Selection is positional: renaming a label keeps it
    // selected, and it only clamps when that position stops existing.
    const activeGroup = document.createElement("div");
    activeGroup.className = "builder-control";
    const activeLabel = document.createElement("span");
    activeLabel.className = "builder-label";
    activeLabel.textContent = "Active section";
    activeGroup.appendChild(activeLabel);
    const activeChoices = document.createElement("div");
    activeChoices.className = "builder-choices";
    activeGroup.appendChild(activeChoices);
    card.appendChild(activeGroup);

    function renderActivePills() {
      activeChoices.innerHTML = "";
      state.labels.forEach((lab, i) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "choice-btn";
        btn.textContent = String(lab).trim() || `(blank ${i + 1})`;
        btn.setAttribute("aria-pressed", i === state.activeIndex ? "true" : "false");
        btn.addEventListener("click", () => {
          state.activeIndex = i;
          renderActivePills();
          render();
        });
        activeChoices.appendChild(btn);
      });
    }

    labelsTextarea.addEventListener("input", () => {
      state.labels = labelsTextarea.value === "" ? (d.labels || []).slice() : labelsTextarea.value.split("\n");
      state.activeIndex = Math.max(0, Math.min(state.activeIndex, state.labels.length - 1));
      renderActivePills();
      render();
    });

    // Colors
    const colorRow = document.createElement("div");
    colorRow.className = "pbb-row";
    function colorControl(text, key) {
      const group = document.createElement("div");
      group.className = "builder-control";
      const lab = document.createElement("span");
      lab.className = "builder-label";
      lab.textContent = text;
      group.appendChild(lab);
      const input = document.createElement("input");
      input.type = "color";
      input.className = "pbb-color-input";
      input.value = state[key];
      input.addEventListener("input", () => {
        state[key] = input.value;
        render();
      });
      group.appendChild(input);
      return group;
    }
    colorRow.append(
      colorControl("Accent", "accentColor"),
      colorControl("Track", "trackColor"),
      colorControl("Brackets", "bracketColor"),
      colorControl("Inactive text", "inactiveColor")
    );
    card.appendChild(colorRow);

    // Sizes
    const sizeRow = document.createElement("div");
    sizeRow.className = "pbb-row";
    function sizeControl(text, key, min, max, step) {
      const group = document.createElement("div");
      group.className = "builder-control";
      const lab = document.createElement("span");
      lab.className = "builder-label";
      lab.textContent = text;
      group.appendChild(lab);
      const input = document.createElement("input");
      input.type = "number";
      input.className = "builder-input pbb-size-input";
      input.min = min;
      input.max = max;
      input.step = step;
      input.value = state[key];
      input.addEventListener("input", () => {
        const v = parseFloat(input.value);
        if (!Number.isNaN(v)) state[key] = v;
        render();
      });
      group.appendChild(input);
      return group;
    }
    sizeRow.append(
      sizeControl("Width", "width", 300, 900, 10),
      sizeControl("Height", "height", 40, 120, 5),
      sizeControl("Bar thickness", "barThickness", 3, 14, 1),
      sizeControl("Font size", "fontSize", 8, 18, 1)
    );
    card.appendChild(sizeRow);

    const preview = document.createElement("div");
    preview.className = "svg-preview";
    card.appendChild(preview);

    const copyBtn = document.createElement("button");
    copyBtn.className = "copy-btn";
    copyBtn.type = "button";
    copyBtn.setAttribute("aria-label", "Copy the progress bar as SVG");
    copyBtn.innerHTML = `<span class="copy-icon">${copyIconSVG}</span><span class="copy-label">Copy SVG</span>`;
    card.appendChild(copyBtn);

    let currentSvg = "";

    function generateSvg() {
      const n = state.labels.length || 1;
      const pad = 20;
      const gap = 8;
      const w = state.width;
      const h = state.height;
      const trackY = Math.round(h * 0.25);
      const tick = Math.round(h * 0.1) || 6;
      const labelY = trackY + tick + 6 + state.fontSize;
      const usable = Math.max(0, w - pad * 2 - gap * (n - 1));
      const segW = usable / n;

      const segs = [];
      for (let i = 0; i < n; i++) {
        const x0 = pad + i * (segW + gap);
        segs.push({ x0, x1: x0 + segW, cx: x0 + segW / 2 });
      }
      const active = segs[state.activeIndex] || segs[0];

      const track = `<line x1="${pad}" y1="${trackY}" x2="${w - pad}" y2="${trackY}" stroke="${state.trackColor}" stroke-width="2"/>`;
      // Inset the bar from its segment's own edges — its rounded ends sit
      // in the same y-range as the bracket ticks (both straddle trackY),
      // so a bar spanning the full segment width visually collides with
      // the tick marks on both sides instead of leaving a clean gap.
      const barInset = Math.min(gap / 2, segW / 4);
      const barX = active ? active.x0 + barInset : 0;
      const barW = active ? Math.max(0, active.x1 - active.x0 - barInset * 2) : 0;
      const bar = active
        ? `<rect x="${barX.toFixed(1)}" y="${(trackY - state.barThickness / 2).toFixed(1)}" width="${barW.toFixed(1)}" height="${state.barThickness}" rx="${(state.barThickness / 2).toFixed(1)}" fill="${state.accentColor}"/>`
        : "";
      const brackets = segs
        .map((s) => `<path d="M ${s.x0.toFixed(1)} ${trackY} v ${tick} M ${s.x1.toFixed(1)} ${trackY} v ${tick}" stroke="${state.bracketColor}" stroke-width="1.5"/>`)
        .join("\n  ");
      const texts = segs
        .map((s, i) => {
          const isActive = i === state.activeIndex;
          const fill = isActive ? state.accentColor : state.inactiveColor;
          const weight = isActive ? 700 : 500;
          return `<text x="${s.cx.toFixed(1)}" y="${labelY}" text-anchor="middle" font-family="system-ui, sans-serif" font-size="${state.fontSize}" font-weight="${weight}" fill="${fill}">${escapeHtml(state.labels[i] || "")}</text>`;
        })
        .join("\n  ");

      return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" fill="none" xmlns="http://www.w3.org/2000/svg">
  <!-- Base grey track -->
  ${track}

  <!-- Active indicator bar -->
  ${bar}

  <!-- Section brackets -->
  ${brackets}

  <!-- Text labels -->
  ${texts}
</svg>`;
    }

    function render() {
      currentSvg = generateSvg();
      preview.innerHTML = currentSvg;
    }

    copyBtn.addEventListener("click", () => copyText(currentSvg, copyBtn));

    renderActivePills();
    render();
    return card;
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

      // Sections may be grouped under a shared `pillar` label — insert a
      // divider whenever it changes, so groups within one note get a
      // heading without needing separate note objects.
      let lastPillar = null;
      (note.sections || []).forEach((section) => {
        if (section.pillar && section.pillar !== lastPillar) {
          const isFirst = els.content.children.length === 0;
          els.content.appendChild(buildPillarHeading(section.pillar, isFirst));
          lastPillar = section.pillar;
        }
        els.content.appendChild(buildSection(section, section.open === true));
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
