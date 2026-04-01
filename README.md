<div align="center">

# X Translator

**Smart per-line tweet translation for X (Twitter)**

75+ languages · Inline translation · Selection sync · Keyboard shortcut

[Install](#install) · [Features](#features) · [Usage](#usage) · [Languages](#languages) · [Contributing](#contributing)

</div>

---

## Features

**Inline Per-Line Translation** — Each line of a tweet gets its own translation right below it. No popups, no page redirects, no replacing the original text.

**Smart Language Detection** — Automatically detects the language of each line. Mixed-language tweets are handled correctly, with each line translated independently.

**Selection Sync** — Select text in the original tweet and the corresponding translation highlights automatically.

**75+ Languages** — From Chinese, Japanese, Korean, and English to Kurdish, Pashto, Amharic, and Esperanto. Organized by region with an auto-detect option that follows your browser language.

**Keyboard Shortcut** — Press `⇧ T` (Shift+T) anywhere on X to toggle translation on/off. Doesn't interfere with typing in text fields.

**Show More Support** — When you expand a truncated tweet, the new content is automatically translated.

**Zero Config** — Works out of the box. Install, press ⇧T, done. Language defaults to your browser language.

## Install

### From Source (Developer)

1. Clone this repository:
   ```bash
   git clone https://github.com/user/x-translator.git
   ```
2. Open Chrome → `chrome://extensions/`
3. Enable **Developer mode** (top-right toggle)
4. Click **Load unpacked**
5. Select the cloned folder
6. Done — the icon appears in your toolbar

### From Chrome Web Store

*Coming soon*

## Usage

| Action | How |
|--------|-----|
| Toggle translation | Press `⇧ T` on any X page |
| Change target language | Click extension icon → select language |
| Auto-detect language | Set target to "Auto Detect" (uses browser language) |
| Selection sync | Select original text → translation highlights |

### Translation Display

```
もうマジでテスラ買わないでください。        ← Original (untouched)
JA 请不要购买另一辆特斯拉。                ← Translation (inline below)
妻が悲しんでます。                         ← Original
JA 我的妻子很伤心。                        ← Translation
```

- Original text is never modified or replaced
- Translation appears in blue with a language badge (JA, EN, KO, etc.)
- URLs, hashtags, and mentions are not translated

## Languages

<details>
<summary><b>75+ supported languages</b> (click to expand)</summary>

| Region | Languages |
|--------|-----------|
| **Common** | Chinese (Simplified), Chinese (Traditional), English, Japanese, Korean |
| **Europe** | French, German, Spanish, Portuguese, Italian, Dutch, Polish, Romanian, Czech, Slovak, Hungarian, Greek, Bulgarian, Croatian, Serbian, Slovenian, Bosnian, Macedonian, Albanian, Ukrainian, Belarusian, Russian, Lithuanian, Latvian, Estonian, Swedish, Danish, Norwegian, Finnish, Icelandic, Irish, Welsh, Catalan, Basque, Galician, Maltese, Luxembourgish |
| **Asia** | Hindi, Bengali, Tamil, Telugu, Marathi, Gujarati, Kannada, Malayalam, Punjabi, Urdu, Nepali, Sinhala, Thai, Vietnamese, Indonesian, Malay, Filipino, Burmese, Khmer, Lao, Mongolian, Georgian, Armenian, Kazakh, Uzbek, Kyrgyz, Tajik, Turkmen, Azerbaijani |
| **Middle East** | Arabic, Persian (Farsi), Hebrew, Turkish, Kurdish, Pashto |
| **Africa** | Swahili, Amharic, Hausa, Yoruba, Igbo, Zulu, Xhosa, Afrikaans, Somali, Malagasy, Kinyarwanda |
| **Other** | Esperanto, Latin, Hawaiian, Maori, Samoan |

</details>

## How It Works

1. Content script runs on `x.com` / `twitter.com`
2. Finds all `div[data-testid="tweetText"]` elements
3. Normalizes line breaks (`\n` → `<br>`)
4. Splits text by `<br>` boundaries into individual lines
5. Translates each line via Google Translate API (free, no key required)
6. Injects translation `<span>` elements after each line break
7. MutationObserver watches for new tweets (scroll) and content changes ("Show more")

## Tech Stack

- **Manifest V3** Chrome Extension
- **Google Translate API** (free endpoint, no API key)
- **MutationObserver** for SPA navigation and infinite scroll
- **Zero dependencies** — pure vanilla JS, no build step

## File Structure

```
x-translator/
├── manifest.json           # Extension config (Manifest V3)
├── background/
│   └── service-worker.js   # Translation API, settings management
├── content/
│   ├── translator.js       # Core: DOM injection, line detection, selection sync
│   └── translator.css      # Translation line styles, toast, highlights
├── popup/
│   ├── popup.html          # Extension popup UI
│   └── popup.js            # Settings logic
├── lib/
│   └── i18n.js             # 75+ language names in 5 UI languages
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md
```

## Contributing

1. Fork this repo
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Commit changes: `git commit -m "feat: add my feature"`
4. Push: `git push origin feature/my-feature`
5. Open a Pull Request

## License

MIT
