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
      if (label) label.textContent = "Copy";
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
  // Items can be a plain string (copyable prompt), { prompt } (copyable),
  // or { text } (plain reading line, not copyable).
  function normalizeItem(item) {
    if (typeof item === "string") return { text: item, copyable: true };
    if (item && item.prompt != null) return { text: item.prompt, copyable: true };
    if (item && item.text != null) return { text: item.text, copyable: item.copy === true };
    return { text: String(item), copyable: false };
  }

  function buildItem(item, i) {
    if (item && item.builder) return buildBuilder(item.builder);

    const { text, copyable } = normalizeItem(item);

    const el = document.createElement("div");
    el.className = copyable ? "item" : "item item--read";

    const num = document.createElement("span");
    num.className = "item-num";
    num.textContent = String(i + 1).padStart(2, "0");

    const p = document.createElement("p");
    p.className = "item-text";
    p.textContent = text;

    el.append(num, p);

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

  function buildSection(section, openByDefault) {
    const details = document.createElement("details");
    details.className = "section";
    if (openByDefault) details.open = true;

    const items = Array.isArray(section.items) ? section.items : [];

    const summary = document.createElement("summary");
    summary.className = "section-head";
    summary.innerHTML = `
      <span class="section-title"></span>
      <span class="section-aside">
        <span class="section-count">${items.length}</span>
        ${chevronSVG}
      </span>`;
    summary.querySelector(".section-title").textContent = section.title || "Untitled";
    details.appendChild(summary);

    const body = document.createElement("div");
    body.className = "section-body";
    items.forEach((text, i) => body.appendChild(buildItem(text, i)));
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
