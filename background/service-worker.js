// X Translator v3 - Background Service Worker

const DEFAULT_SETTINGS = {
  enabled: false,
  targetLang: "zh-CN",
  showOriginal: true,
  style: "border", // "border" | "background" | "plain"
};

chrome.runtime.onInstalled.addListener(async () => {
  const existing = await chrome.storage.local.get("settings");
  if (!existing.settings) {
    await chrome.storage.local.set({ settings: DEFAULT_SETTINGS });
  } else {
    // Merge new defaults for upgrades
    const merged = { ...DEFAULT_SETTINGS, ...existing.settings };
    await chrome.storage.local.set({ settings: merged });
  }
});

// Handle messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "TRANSLATE_TEXT") {
    translateText(message.text, message.targetLang)
      .then((result) => sendResponse({ success: true, data: result }))
      .catch((err) => sendResponse({ success: false, error: err.message }));
    return true;
  }

  if (message.type === "GET_SETTINGS") {
    chrome.storage.local.get("settings").then(({ settings }) => {
      sendResponse(settings || DEFAULT_SETTINGS);
    });
    return true;
  }

  if (message.type === "UPDATE_SETTINGS") {
    chrome.storage.local.set({ settings: message.settings }).then(() => {
      sendResponse({ success: true });
    });
    return true;
  }
});

// --- Translation Engine ---

async function translateText(text, targetLang = "zh-CN") {
  if (!text?.trim()) return { translatedText: "", detectedLang: "auto" };

  const base = "https://translate.googleapis.com/translate_a/single";
  const url = `${base}?client=gtx&sl=auto&tl=${encodeURIComponent(targetLang)}&dt=t&dt=bd&dj=1&q=${encodeURIComponent(text)}`;

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Translation API error: ${response.status}`);
  }

  const data = await response.json();
  const sentences = data.sentences || [];
  const translatedText = sentences.map((s) => s.trans || "").join("");
  const detectedLang = data.src || "auto";

  return { translatedText, detectedLang };
}
