// X Translator v5 - Popup Script

document.addEventListener("DOMContentLoaded", async () => {
  applyI18n();

  const toggleEnabled = document.getElementById("toggleEnabled");
  const targetLang = document.getElementById("targetLang");
  const statusText = document.getElementById("statusText");
  const langLabel = document.getElementById("langCurrentLabel");

  // First open: default to "auto" (browser language)
  const settings = await chrome.runtime.sendMessage({ type: "GET_SETTINGS" });
  if (settings) {
    toggleEnabled.checked = settings.enabled;

    // If targetLang matches browser language or is not set, show "auto"
    const browserLang = navigator.language || "en";
    const saved = settings.targetLang || browserLang;
    if (saved === browserLang || saved === "auto") {
      targetLang.value = "auto";
    } else {
      targetLang.value = saved;
    }

    updateLangLabel();
    updateStatus(settings.enabled);
  }

  // Toggle
  toggleEnabled.addEventListener("change", async () => {
    const enabled = toggleEnabled.checked;
    const current = await chrome.runtime.sendMessage({ type: "GET_SETTINGS" });
    await chrome.runtime.sendMessage({ type: "UPDATE_SETTINGS", settings: { ...current, enabled } });
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab?.id) chrome.tabs.sendMessage(tab.id, { type: "TOGGLE_TRANSLATION", enabled });
    updateStatus(enabled);
  });

  // Language change
  targetLang.addEventListener("change", async () => {
    let value = targetLang.value;
    if (value === "auto") {
      value = navigator.language || "en";
    }
    const current = await chrome.runtime.sendMessage({ type: "GET_SETTINGS" });
    await chrome.runtime.sendMessage({ type: "UPDATE_SETTINGS", settings: { ...current, targetLang: value } });
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab?.id) chrome.tabs.sendMessage(tab.id, { type: "UPDATE_TARGET_LANG", targetLang: value });
    updateLangLabel();
  });

  function updateLangLabel() {
    const val = targetLang.value;
    if (val === "auto") {
      const bl = navigator.language || "en";
      langLabel.textContent = `→ ${bl}`;
    } else {
      langLabel.textContent = "";
    }
  }

  function updateStatus(enabled) {
    const dot = `<span class="dot ${enabled ? "on" : "off"}"></span>`;
    statusText.innerHTML = enabled ? `${dot}${t("statusActive")}` : `${dot}${t("statusHint")}`;
  }

  function applyI18n() {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-label]").forEach((el) => {
      el.label = t(el.dataset.i18nLabel);
    });
  }
});
