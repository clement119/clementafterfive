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
  };

  // Group notes by dimension, preserving first-seen order.
  const dimensions = [];
  const byDimension = new Map();
  for (const note of journal) {
    if (!byDimension.has(note.dimension)) {
      byDimension.set(note.dimension, []);
      dimensions.push(note.dimension);
    }
    byDimension.get(note.dimension).push(note);
  }

  const chevronSVG = `<svg class="chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>`;

  const copyIconSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="11" height="11" rx="2.5"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>`;

  const checkIconSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6 9 17l-5-5"/></svg>`;

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
      showToast("Copied to clipboard");
    } catch (err) {
      showToast("Couldn't copy — select and copy manually");
    }
  }

  function flashCopied(btn) {
    if (!btn) return;
    btn.classList.add("copied");
    btn.innerHTML = checkIconSVG;
    setTimeout(() => {
      btn.classList.remove("copied");
      btn.innerHTML = copyIconSVG;
    }, 1200);
  }

  // Render the first note in a dimension. (One note per dimension to start;
  // if a dimension holds several, they stack.)
  function renderDimension(dimension) {
    const notes = byDimension.get(dimension);
    const primary = notes[0];

    els.title.textContent = primary.title;
    els.subtitle.textContent = primary.subtitle || "";
    els.subtitle.style.display = primary.subtitle ? "" : "none";

    const dateStr = formatDate(primary.date);
    els.meta.textContent = [dimension, dateStr].filter(Boolean).join("  ·  ");

    els.content.innerHTML = "";
    const footerParts = [];

    notes.forEach((note, noteIdx) => {
      // If more than one note shares a dimension, label subsequent ones.
      if (noteIdx > 0) {
        const h = document.createElement("h2");
        h.className = "section-title";
        h.style.margin = "40px 0 12px";
        h.textContent = note.title;
        els.content.appendChild(h);
      }

      (note.sections || []).forEach((section, sIdx) => {
        const details = document.createElement("details");
        details.className = "section";
        if (noteIdx === 0 && sIdx === 0) details.open = true;

        const summary = document.createElement("summary");
        summary.className = "section-head";
        summary.innerHTML = `
          <span class="section-title">${escapeHTML(section.title)}</span>
          <span class="section-aside">
            <span class="section-count">${section.items.length}</span>
            ${chevronSVG}
          </span>`;
        details.appendChild(summary);

        const body = document.createElement("div");
        body.className = "section-body";

        section.items.forEach((text, i) => {
          const item = document.createElement("div");
          item.className = "item";

          const num = document.createElement("span");
          num.className = "item-num";
          num.textContent = String(i + 1).padStart(2, "0");

          const p = document.createElement("p");
          p.className = "item-text";
          p.textContent = text;

          const btn = document.createElement("button");
          btn.className = "copy-btn";
          btn.type = "button";
          btn.setAttribute("aria-label", "Copy to clipboard");
          btn.title = "Copy";
          btn.innerHTML = copyIconSVG;
          btn.addEventListener("click", () => copyText(text, btn));

          item.append(num, p, btn);
          body.appendChild(item);
        });

        details.appendChild(body);
        els.content.appendChild(details);
      });

      if (note.footer) footerParts.push(note.footer);
    });

    els.footer.textContent = footerParts.join("  ");
  }

  function escapeHTML(str) {
    return str.replace(/[&<>"']/g, (c) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    }[c]));
  }

  function renderDimensionTabs() {
    els.dimensions.innerHTML = "";
    if (dimensions.length <= 1) {
      els.dimensions.style.display = "none";
    }
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

  // Init
  if (!Array.isArray(journal) || journal.length === 0) {
    els.title.textContent = "No notes yet";
    els.subtitle.textContent = "Add one in data.js to get started.";
    return;
  }
  renderDimensionTabs();
  renderDimension(dimensions[0]);
})();
