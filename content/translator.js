// X Translator v5 - Inline per-line, no duplicate original, selection sync

(() => {
  "use strict";

  const state = {
    enabled: false,
    targetLang: "zh-CN",
    bodyObserver: null,
    tweetObservers: new WeakMap(),
    processedHashes: new WeakMap(),
    processing: new WeakSet(), // prevent re-entry
  };

  const LANG_CODES = {
    en: "EN", "zh-CN": "中", "zh-TW": "繁", zh: "中",
    ja: "JA", ko: "KO",
    fr: "FR", de: "DE", es: "ES", pt: "PT", it: "IT",
    nl: "NL", pl: "PL", ro: "RO", cs: "CS", sk: "SK",
    hu: "HU", el: "EL", bg: "BG", hr: "HR", sr: "SR",
    sl: "SL", bs: "BS", mk: "MK", sq: "SQ",
    uk: "UK", be: "BE", ru: "RU",
    lt: "LT", lv: "LV", et: "ET",
    sv: "SV", da: "DA", no: "NO", fi: "FI", is: "IS",
    ga: "GA", cy: "CY", ca: "CA", eu: "EU", gl: "GL",
    mt: "MT", lb: "LB",
    ar: "AR", fa: "FA", he: "HE", tr: "TR", ku: "KU", ps: "PS",
    hi: "HI", bn: "BN", ta: "TA", te: "TE", mr: "MR",
    gu: "GU", kn: "KN", ml: "ML", pa: "PA", ur: "UR",
    ne: "NE", si: "SI",
    th: "TH", vi: "VI", id: "ID", ms: "MS",
    fil: "FIL", my: "MY", km: "KM", lo: "LO",
    mn: "MN", ka: "KA", hy: "HY",
    kk: "KK", uz: "UZ", ky: "KY", tg: "TG", tk: "TK", az: "AZ",
    sw: "SW", am: "AM", ha: "HA", yo: "YO", ig: "IG",
    zu: "ZU", xh: "XH", af: "AF", so: "SO", mg: "MG", rw: "RW",
    eo: "EO", la: "LA", haw: "HAW", mi: "MI", sm: "SM",
  };

  init();

  async function init() {
    const s = await msg({ type: "GET_SETTINGS" });
    if (s) {
      state.targetLang = s.targetLang || "zh-CN";
      if (s.enabled) start();
    }
    listenMessages();
    listenShortcut();
    listenSelection();
  }

  // ── Shift+T ──
  function listenShortcut() {
    document.addEventListener("keydown", (e) => {
      if (e.key !== "T" || !e.shiftKey || e.ctrlKey || e.metaKey || e.altKey) return;
      const el = document.activeElement;
      if (!el) return;
      const tag = el.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (el.getAttribute("contenteditable") === "true" || el.getAttribute("role") === "textbox") return;
      e.preventDefault();
      e.stopPropagation();
      state.enabled = !state.enabled;
      msg({ type: "GET_SETTINGS" }).then((s) =>
        msg({ type: "UPDATE_SETTINGS", settings: { ...s, enabled: state.enabled } })
      );
      state.enabled ? start() : stop();
    }, true);
  }

  function listenMessages() {
    chrome.runtime.onMessage.addListener((m, _, r) => {
      if (m.type === "TOGGLE_TRANSLATION") { m.enabled ? start() : stop(); r({ ok: 1 }); }
      if (m.type === "UPDATE_TARGET_LANG") {
        state.targetLang = m.targetLang;
        if (state.enabled) { clearAll(); translateAll(); }
        r({ ok: 1 });
      }
      if (m.type === "UPDATE_SETTINGS_LIVE") r({ ok: 1 });
    });
  }

  // ── Selection sync ──
  function listenSelection() {
    document.addEventListener("selectionchange", () => {
      // Clear all highlights
      document.querySelectorAll(".xt-hl").forEach((el) => el.classList.remove("xt-hl"));

      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || !sel.rangeCount) return;

      let startNode = sel.getRangeAt(0).startContainer;
      if (startNode.nodeType === Node.TEXT_NODE) startNode = startNode.parentElement;
      if (!startNode) return;

      // Find the tweetText ancestor
      const tw = startNode.closest?.('[data-testid="tweetText"]');
      if (!tw) return;

      // Find which "line group" the selection is in.
      // A line group = [content nodes...][xt-tl node]
      // Walk backwards from selection to find the nearest xt-tl AFTER this line,
      // or walk forwards from selection to find the nearest xt-tl.

      // Strategy: find all xt-tl nodes, determine which one corresponds to the selected text
      const allTl = [...tw.querySelectorAll(".xt-tl")];
      if (allTl.length === 0) return;

      // Get the visual lines from innerText
      const selText = sel.toString().trim();
      if (!selText) return;

      // For each translation line, check if the selected text is part of the original
      // that this translation corresponds to
      for (const tl of allTl) {
        const origLine = tl.getAttribute("data-orig") || "";
        if (origLine && (origLine.includes(selText) || selText.includes(origLine.substring(0, 10)))) {
          tl.classList.add("xt-hl");
        }
      }
    });
  }

  // ── Start / Stop ──
  function start() {
    state.enabled = true;
    toast(uiText("on"));
    translateAll();
    observeBody();
  }

  function stop() {
    state.enabled = false;
    toast(uiText("off"));
    state.bodyObserver?.disconnect();
    state.bodyObserver = null;
    clearAll();
  }

  function translateAll() {
    if (!state.enabled) return;
    for (const el of document.querySelectorAll('article[data-testid="tweet"] div[data-testid="tweetText"]')) {
      processTweet(el);
    }
  }

  // ══════════════════════════════════════
  //  CORE
  // ══════════════════════════════════════

  async function processTweet(tw) {
    // Prevent re-entry (normalizeNewlines triggers MutationObserver)
    if (state.processing.has(tw)) return;

    const hash = getTextHash(tw);
    if (state.processedHashes.get(tw) === hash) return;

    state.processing.add(tw);

    // Remove old translations if re-processing
    tw.querySelectorAll("[data-xt]").forEach((n) => n.remove());
    state.processedHashes.set(tw, "__working__");

    // Step 1: Normalize — convert \n in text nodes to <br> elements
    normalizeNewlines(tw);

    // Step 2: Collect lines by finding all BR elements (now reliable after normalization)
    const lines = collectLines(tw);

    // Step 3: Translate each line and inject after the BR
    for (const line of lines) {
      if (!state.enabled) { state.processing.delete(tw); return; }
      const text = line.text.trim();
      if (text.length < 2 || isUrl(text)) continue;

      const res = await msg({ type: "TRANSLATE_TEXT", text, targetLang: state.targetLang });
      if (!res?.success) continue;

      const { translatedText, detectedLang } = res.data;
      if (isSameLang(detectedLang, state.targetLang)) continue;
      if (translatedText.trim() === text) continue;

      const lc = LANG_CODES[detectedLang] || detectedLang.toUpperCase().slice(0, 2);

      const el = document.createElement("span");
      el.className = "xt-tl";
      el.setAttribute("data-xt", "1");
      el.setAttribute("data-orig", text); // for selection sync
      el.innerHTML = `<span class="xt-tl-lang">${esc(lc)}</span><span class="xt-tl-text">${esc(translatedText)}</span>`;

      // Insert after the BR that ends this line, or at the end for the last line
      if (line.br) {
        line.br.parentNode.insertBefore(el, line.br.nextSibling);
      } else {
        tw.appendChild(el);
      }
    }

    state.processedHashes.set(tw, getTextHash(tw));
    state.processing.delete(tw);
    watchTweet(tw);
  }

  // ── Normalize: replace \n in text nodes with <br> elements ──
  function normalizeNewlines(tw) {
    const textNodes = [];
    const walker = document.createTreeWalker(tw, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        // Skip inside our own nodes
        let p = node.parentElement;
        while (p && p !== tw) {
          if (p.getAttribute?.("data-xt") === "1") return NodeFilter.FILTER_REJECT;
          p = p.parentElement;
        }
        return node.textContent.includes("\n") ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      },
    });
    while (walker.nextNode()) textNodes.push(walker.currentNode);

    for (const textNode of textNodes) {
      const parts = textNode.textContent.split("\n");
      if (parts.length <= 1) continue;

      const parent = textNode.parentNode;
      const frag = document.createDocumentFragment();
      for (let i = 0; i < parts.length; i++) {
        if (parts[i]) frag.appendChild(document.createTextNode(parts[i]));
        if (i < parts.length - 1) frag.appendChild(document.createElement("br"));
      }
      parent.replaceChild(frag, textNode);
    }
  }

  // ── Collect lines by recursively walking DOM for <br> elements ──
  function collectLines(tw) {
    const lines = [];
    let currentText = "";
    let lastBr = null;

    function walk(node) {
      if (node.nodeType === Node.ELEMENT_NODE && node.getAttribute?.("data-xt") === "1") return;

      if (node.nodeType === Node.TEXT_NODE) {
        currentText += node.textContent;
        return;
      }

      if (node.nodeType !== Node.ELEMENT_NODE) return;

      if (node.tagName === "BR") {
        if (currentText.trim()) {
          lines.push({ text: currentText.trim(), br: node });
        }
        currentText = "";
        return;
      }

      if (node.tagName === "IMG") {
        currentText += node.alt || "";
        return;
      }

      for (const child of node.childNodes) walk(child);
    }

    for (const child of tw.childNodes) walk(child);

    // Last line (no trailing BR)
    if (currentText.trim()) {
      lines.push({ text: currentText.trim(), br: null });
    }

    return lines;
  }

  // ── Watch for "show more" ──
  function watchTweet(tw) {
    if (state.tweetObservers.has(tw)) return;
    let debounce = null;
    const obs = new MutationObserver((mutations) => {
      if (!state.enabled) return;
      const allOurs = mutations.every((m) =>
        [...m.addedNodes, ...m.removedNodes].every(
          (n) => n.nodeType === Node.ELEMENT_NODE && n.getAttribute?.("data-xt") === "1"
        )
      );
      if (allOurs) return;
      if (debounce) clearTimeout(debounce);
      debounce = setTimeout(() => {
        const newHash = getTextHash(tw);
        if (state.processedHashes.get(tw) !== newHash) {
          state.processedHashes.delete(tw);
          processTweet(tw);
        }
      }, 300);
    });
    obs.observe(tw, { childList: true, subtree: true, characterData: true });
    state.tweetObservers.set(tw, obs);
  }

  // ── Body observer ──
  function observeBody() {
    state.bodyObserver?.disconnect();
    let t = null;
    state.bodyObserver = new MutationObserver(() => {
      if (!state.enabled) return;
      if (t) clearTimeout(t);
      t = setTimeout(translateAll, 400);
    });
    state.bodyObserver.observe(document.body, { childList: true, subtree: true });
  }

  // ── Clear ──
  function clearAll() {
    document.querySelectorAll("[data-xt]").forEach((n) => n.remove());
    state.processedHashes = new WeakMap();
  }

  // ── Text hash excluding our nodes ──
  function getTextHash(tw) {
    let t = "";
    function walk(n) {
      if (n.nodeType === Node.ELEMENT_NODE && n.getAttribute?.("data-xt") === "1") return;
      if (n.nodeType === Node.TEXT_NODE) { t += n.textContent; return; }
      if (n.nodeType === Node.ELEMENT_NODE) {
        if (n.tagName === "BR") { t += "\n"; return; }
        if (n.tagName === "IMG") { t += n.alt || ""; return; }
        for (const c of n.childNodes) walk(c);
      }
    }
    for (const c of tw.childNodes) walk(c);
    return t;
  }

  // ── Helpers ──
  function isUrl(t) { return /^https?:\/\/\S+$/i.test(t.trim()); }
  function isSameLang(a, b) {
    if (a === b) return true;
    const n = (l) => (l === "zh" || l === "zh-CN" || l === "zh-TW") ? "zh" : l.split("-")[0];
    if (a === "zh" && (b === "zh-CN" || b === "zh-TW")) return false;
    return n(a) === n(b);
  }
  function esc(s) { const d = document.createElement("div"); d.textContent = s; return d.innerHTML; }
  function msg(m) { return new Promise((r) => chrome.runtime.sendMessage(m, r)); }

  function toast(text) {
    let t = document.querySelector(".xt-toast");
    if (!t) { t = document.createElement("div"); t.className = "xt-toast xt-toast-hidden"; document.body.appendChild(t); }
    t.textContent = text; t.classList.remove("xt-toast-hidden");
    clearTimeout(t._h); t._h = setTimeout(() => t.classList.add("xt-toast-hidden"), 2000);
  }
  function uiText(k) {
    const zh = state.targetLang.startsWith("zh");
    return { on: zh ? "X 翻译已开启 ⇧T" : "X Translation ON ⇧T", off: zh ? "X 翻译已关闭" : "X Translation OFF" }[k] || k;
  }
})();
