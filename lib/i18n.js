// X Translator v5 - Full i18n with 70+ languages

const LANG_KEYS = {
  // UI
  enableTranslation: { "zh-CN": "开启翻译", "zh-TW": "開啟翻譯", ja: "翻訳を有効にする", ko: "번역 활성화", en: "Enable Translation" },
  targetLanguage: { "zh-CN": "翻译成", "zh-TW": "翻譯成", ja: "翻訳先", ko: "번역 대상", en: "Translate to" },
  shortcutHint: { "zh-CN": "在 X 页面按 ⇧T 开关翻译", "zh-TW": "在 X 頁面按 ⇧T 開關翻譯", ja: "Xで⇧Tを押して切替", ko: "X에서 ⇧T로 전환", en: "Press ⇧T on X to toggle" },
  statusActive: { "zh-CN": "翻译已开启", "zh-TW": "翻譯已開啟", ja: "翻訳ON", ko: "번역 ON", en: "Translation ON" },
  statusHint: { "zh-CN": "开启后自动翻译 X 上的外语帖子", "zh-TW": "開啟後自動翻譯 X 上的外語貼文", ja: "ONにするとXの外国語投稿を自動翻訳", ko: "활성화하면 외국어 게시물을 자동 번역", en: "Auto-translate foreign posts on X" },
  heroSub: { "zh-CN": "智能逐行翻译 X 帖子 · 75+ 语言", "zh-TW": "智慧逐行翻譯 X 貼文 · 75+ 語言", ja: "Xの投稿をスマートに行ごと翻訳 · 75+言語", ko: "X 게시물 스마트 라인별 번역 · 75+언어", en: "Smart per-line tweet translation · 75+ languages" },
  shortcutLabel: { "zh-CN": "快捷键", "zh-TW": "快捷鍵", ja: "ショートカット", ko: "단축키", en: "Shortcut" },

  // Groups
  groupAuto: { "zh-CN": "自动", "zh-TW": "自動", ja: "自動", ko: "자동", en: "Auto" },
  groupCommon: { "zh-CN": "常用", "zh-TW": "常用", ja: "よく使う", ko: "자주 사용", en: "Common" },
  groupEurope: { "zh-CN": "欧洲", "zh-TW": "歐洲", ja: "ヨーロッパ", ko: "유럽", en: "Europe" },
  groupAsia: { "zh-CN": "亚洲 / 中亚 / 高加索", "zh-TW": "亞洲 / 中亞 / 高加索", ja: "アジア / 中央アジア", ko: "아시아 / 중앙아시아", en: "Asia / Central Asia / Caucasus" },
  groupMiddleEast: { "zh-CN": "中东", "zh-TW": "中東", ja: "中東", ko: "중동", en: "Middle East" },
  groupAfrica: { "zh-CN": "非洲", "zh-TW": "非洲", ja: "アフリカ", ko: "아프리카", en: "Africa" },
  groupOther: { "zh-CN": "其他", "zh-TW": "其他", ja: "その他", ko: "기타", en: "Other" },

  // Auto
  langAuto: { "zh-CN": "自动识别 (浏览器语言)", "zh-TW": "自動識別 (瀏覽器語言)", ja: "自動検出 (ブラウザ言語)", ko: "자동 감지 (브라우저 언어)", en: "Auto Detect (Browser Language)" },

  // Common
  langZhCN: { "zh-CN": "简体中文", "zh-TW": "簡體中文", ja: "中国語(簡体)", ko: "중국어(간체)", en: "Chinese (Simplified)" },
  langZhTW: { "zh-CN": "繁体中文", "zh-TW": "繁體中文", ja: "中国語(繁体)", ko: "중국어(번체)", en: "Chinese (Traditional)" },
  langEn: { "zh-CN": "英语", "zh-TW": "英語", ja: "英語", ko: "영어", en: "English" },
  langJa: { "zh-CN": "日语", "zh-TW": "日語", ja: "日本語", ko: "일본어", en: "Japanese" },
  langKo: { "zh-CN": "韩语", "zh-TW": "韓語", ja: "韓国語", ko: "한국어", en: "Korean" },

  // Europe — Western
  langFr: { "zh-CN": "法语", "zh-TW": "法語", ja: "フランス語", ko: "프랑스어", en: "French" },
  langDe: { "zh-CN": "德语", "zh-TW": "德語", ja: "ドイツ語", ko: "독일어", en: "German" },
  langEs: { "zh-CN": "西班牙语", "zh-TW": "西班牙語", ja: "スペイン語", ko: "스페인어", en: "Spanish" },
  langPt: { "zh-CN": "葡萄牙语", "zh-TW": "葡萄牙語", ja: "ポルトガル語", ko: "포르투갈어", en: "Portuguese" },
  langIt: { "zh-CN": "意大利语", "zh-TW": "義大利語", ja: "イタリア語", ko: "이탈리아어", en: "Italian" },
  langNl: { "zh-CN": "荷兰语", "zh-TW": "荷蘭語", ja: "オランダ語", ko: "네덜란드어", en: "Dutch" },
  // Europe — Central/Eastern
  langPl: { "zh-CN": "波兰语", "zh-TW": "波蘭語", ja: "ポーランド語", ko: "폴란드어", en: "Polish" },
  langRo: { "zh-CN": "罗马尼亚语", "zh-TW": "羅馬尼亞語", ja: "ルーマニア語", ko: "루마니아어", en: "Romanian" },
  langCs: { "zh-CN": "捷克语", "zh-TW": "捷克語", ja: "チェコ語", ko: "체코어", en: "Czech" },
  langSk: { "zh-CN": "斯洛伐克语", "zh-TW": "斯洛伐克語", ja: "スロバキア語", ko: "슬로바키아어", en: "Slovak" },
  langHu: { "zh-CN": "匈牙利语", "zh-TW": "匈牙利語", ja: "ハンガリー語", ko: "헝가리어", en: "Hungarian" },
  langEl: { "zh-CN": "希腊语", "zh-TW": "希臘語", ja: "ギリシャ語", ko: "그리스어", en: "Greek" },
  langBg: { "zh-CN": "保加利亚语", "zh-TW": "保加利亞語", ja: "ブルガリア語", ko: "불가리아어", en: "Bulgarian" },
  // Europe — Balkan
  langHr: { "zh-CN": "克罗地亚语", "zh-TW": "克羅埃西亞語", ja: "クロアチア語", ko: "크로아티아어", en: "Croatian" },
  langSr: { "zh-CN": "塞尔维亚语", "zh-TW": "塞爾維亞語", ja: "セルビア語", ko: "세르비아어", en: "Serbian" },
  langSl: { "zh-CN": "斯洛文尼亚语", "zh-TW": "斯洛維尼亞語", ja: "スロベニア語", ko: "슬로베니아어", en: "Slovenian" },
  langBs: { "zh-CN": "波斯尼亚语", "zh-TW": "波士尼亞語", ja: "ボスニア語", ko: "보스니아어", en: "Bosnian" },
  langMk: { "zh-CN": "马其顿语", "zh-TW": "馬其頓語", ja: "マケドニア語", ko: "마케도니아어", en: "Macedonian" },
  langSq: { "zh-CN": "阿尔巴尼亚语", "zh-TW": "阿爾巴尼亞語", ja: "アルバニア語", ko: "알바니아어", en: "Albanian" },
  // Europe — Eastern Slavic
  langUk: { "zh-CN": "乌克兰语", "zh-TW": "烏克蘭語", ja: "ウクライナ語", ko: "우크라이나어", en: "Ukrainian" },
  langBe: { "zh-CN": "白俄罗斯语", "zh-TW": "白俄羅斯語", ja: "ベラルーシ語", ko: "벨라루스어", en: "Belarusian" },
  langRu: { "zh-CN": "俄语", "zh-TW": "俄語", ja: "ロシア語", ko: "러시아어", en: "Russian" },
  // Europe — Baltic
  langLt: { "zh-CN": "立陶宛语", "zh-TW": "立陶宛語", ja: "リトアニア語", ko: "리투아니아어", en: "Lithuanian" },
  langLv: { "zh-CN": "拉脱维亚语", "zh-TW": "拉脫維亞語", ja: "ラトビア語", ko: "라트비아어", en: "Latvian" },
  langEt: { "zh-CN": "爱沙尼亚语", "zh-TW": "愛沙尼亞語", ja: "エストニア語", ko: "에스토니아어", en: "Estonian" },
  // Europe — Nordic
  langSv: { "zh-CN": "瑞典语", "zh-TW": "瑞典語", ja: "スウェーデン語", ko: "스웨덴어", en: "Swedish" },
  langDa: { "zh-CN": "丹麦语", "zh-TW": "丹麥語", ja: "デンマーク語", ko: "덴마크어", en: "Danish" },
  langNo: { "zh-CN": "挪威语", "zh-TW": "挪威語", ja: "ノルウェー語", ko: "노르웨이어", en: "Norwegian" },
  langFi: { "zh-CN": "芬兰语", "zh-TW": "芬蘭語", ja: "フィンランド語", ko: "핀란드어", en: "Finnish" },
  langIs: { "zh-CN": "冰岛语", "zh-TW": "冰島語", ja: "アイスランド語", ko: "아이슬란드어", en: "Icelandic" },
  // Europe — Celtic / Iberian / Island
  langGa: { "zh-CN": "爱尔兰语", "zh-TW": "愛爾蘭語", ja: "アイルランド語", ko: "아일랜드어", en: "Irish" },
  langCy: { "zh-CN": "威尔士语", "zh-TW": "威爾斯語", ja: "ウェールズ語", ko: "웨일스어", en: "Welsh" },
  langCa: { "zh-CN": "加泰罗尼亚语", "zh-TW": "加泰隆尼亞語", ja: "カタルーニャ語", ko: "카탈로니아어", en: "Catalan" },
  langEu: { "zh-CN": "巴斯克语", "zh-TW": "巴斯克語", ja: "バスク語", ko: "바스크어", en: "Basque" },
  langGl: { "zh-CN": "加利西亚语", "zh-TW": "加利西亞語", ja: "ガリシア語", ko: "갈리시아어", en: "Galician" },
  langMt: { "zh-CN": "马耳他语", "zh-TW": "馬爾他語", ja: "マルタ語", ko: "몰타어", en: "Maltese" },
  langLb: { "zh-CN": "卢森堡语", "zh-TW": "盧森堡語", ja: "ルクセンブルク語", ko: "룩셈부르크어", en: "Luxembourgish" },

  // South Asia
  langHi: { "zh-CN": "印地语", "zh-TW": "印地語", ja: "ヒンディー語", ko: "힌디어", en: "Hindi" },
  langBn: { "zh-CN": "孟加拉语", "zh-TW": "孟加拉語", ja: "ベンガル語", ko: "벵골어", en: "Bengali" },
  langTa: { "zh-CN": "泰米尔语", "zh-TW": "泰米爾語", ja: "タミル語", ko: "타밀어", en: "Tamil" },
  langTe: { "zh-CN": "泰卢固语", "zh-TW": "泰盧固語", ja: "テルグ語", ko: "텔루구어", en: "Telugu" },
  langMr: { "zh-CN": "马拉地语", "zh-TW": "馬拉地語", ja: "マラーティー語", ko: "마라티어", en: "Marathi" },
  langGu: { "zh-CN": "古吉拉特语", "zh-TW": "古吉拉特語", ja: "グジャラート語", ko: "구자라트어", en: "Gujarati" },
  langKn: { "zh-CN": "卡纳达语", "zh-TW": "卡納達語", ja: "カンナダ語", ko: "칸나다어", en: "Kannada" },
  langMl: { "zh-CN": "马拉雅拉姆语", "zh-TW": "馬拉雅拉姆語", ja: "マラヤーラム語", ko: "말라얄람어", en: "Malayalam" },
  langPa: { "zh-CN": "旁遮普语", "zh-TW": "旁遮普語", ja: "パンジャブ語", ko: "펀자브어", en: "Punjabi" },
  langUr: { "zh-CN": "乌尔都语", "zh-TW": "烏爾都語", ja: "ウルドゥー語", ko: "우르두어", en: "Urdu" },
  langNe: { "zh-CN": "尼泊尔语", "zh-TW": "尼泊爾語", ja: "ネパール語", ko: "네팔어", en: "Nepali" },
  langSi: { "zh-CN": "僧伽罗语", "zh-TW": "僧伽羅語", ja: "シンハラ語", ko: "싱할라어", en: "Sinhala" },
  // Southeast Asia
  langTh: { "zh-CN": "泰语", "zh-TW": "泰語", ja: "タイ語", ko: "태국어", en: "Thai" },
  langVi: { "zh-CN": "越南语", "zh-TW": "越南語", ja: "ベトナム語", ko: "베트남어", en: "Vietnamese" },
  langId: { "zh-CN": "印度尼西亚语", "zh-TW": "印尼語", ja: "インドネシア語", ko: "인도네시아어", en: "Indonesian" },
  langMs: { "zh-CN": "马来语", "zh-TW": "馬來語", ja: "マレー語", ko: "말레이어", en: "Malay" },
  langFil: { "zh-CN": "菲律宾语", "zh-TW": "菲律賓語", ja: "フィリピン語", ko: "필리핀어", en: "Filipino" },
  langMy: { "zh-CN": "缅甸语", "zh-TW": "緬甸語", ja: "ミャンマー語", ko: "미얀마어", en: "Burmese" },
  langKm: { "zh-CN": "高棉语", "zh-TW": "高棉語", ja: "クメール語", ko: "크메르어", en: "Khmer" },
  langLo: { "zh-CN": "老挝语", "zh-TW": "寮國語", ja: "ラオ語", ko: "라오어", en: "Lao" },
  // East/Central Asia & Caucasus
  langMn: { "zh-CN": "蒙古语", "zh-TW": "蒙古語", ja: "モンゴル語", ko: "몽골어", en: "Mongolian" },
  langKa: { "zh-CN": "格鲁吉亚语", "zh-TW": "喬治亞語", ja: "ジョージア語", ko: "조지아어", en: "Georgian" },
  langHy: { "zh-CN": "亚美尼亚语", "zh-TW": "亞美尼亞語", ja: "アルメニア語", ko: "아르메니아어", en: "Armenian" },
  langKk: { "zh-CN": "哈萨克语", "zh-TW": "哈薩克語", ja: "カザフ語", ko: "카자흐어", en: "Kazakh" },
  langUz: { "zh-CN": "乌兹别克语", "zh-TW": "烏茲別克語", ja: "ウズベク語", ko: "우즈베크어", en: "Uzbek" },
  langKy: { "zh-CN": "吉尔吉斯语", "zh-TW": "吉爾吉斯語", ja: "キルギス語", ko: "키르기스어", en: "Kyrgyz" },
  langTg: { "zh-CN": "塔吉克语", "zh-TW": "塔吉克語", ja: "タジク語", ko: "타지크어", en: "Tajik" },
  langTk: { "zh-CN": "土库曼语", "zh-TW": "土庫曼語", ja: "トルクメン語", ko: "투르크멘어", en: "Turkmen" },
  langAz: { "zh-CN": "阿塞拜疆语", "zh-TW": "亞塞拜然語", ja: "アゼルバイジャン語", ko: "아제르바이잔어", en: "Azerbaijani" },

  // Middle East
  langAr: { "zh-CN": "阿拉伯语", "zh-TW": "阿拉伯語", ja: "アラビア語", ko: "아랍어", en: "Arabic" },
  langFa: { "zh-CN": "波斯语 (伊朗)", "zh-TW": "波斯語 (伊朗)", ja: "ペルシア語", ko: "페르시아어", en: "Persian (Farsi)" },
  langHe: { "zh-CN": "希伯来语", "zh-TW": "希伯來語", ja: "ヘブライ語", ko: "히브리어", en: "Hebrew" },
  langTr: { "zh-CN": "土耳其语", "zh-TW": "土耳其語", ja: "トルコ語", ko: "터키어", en: "Turkish" },
  langKu: { "zh-CN": "库尔德语", "zh-TW": "庫爾德語", ja: "クルド語", ko: "쿠르드어", en: "Kurdish" },
  langPs: { "zh-CN": "普什图语 (阿富汗)", "zh-TW": "普什圖語 (阿富汗)", ja: "パシュトー語", ko: "파슈토어", en: "Pashto" },

  // Africa
  langSw: { "zh-CN": "斯瓦希里语", "zh-TW": "斯瓦希里語", ja: "スワヒリ語", ko: "스와힐리어", en: "Swahili" },
  langAm: { "zh-CN": "阿姆哈拉语 (埃塞俄比亚)", "zh-TW": "阿姆哈拉語 (衣索比亞)", ja: "アムハラ語", ko: "암하라어", en: "Amharic" },
  langHa: { "zh-CN": "豪萨语", "zh-TW": "豪薩語", ja: "ハウサ語", ko: "하우사어", en: "Hausa" },
  langYo: { "zh-CN": "约鲁巴语", "zh-TW": "約魯巴語", ja: "ヨルバ語", ko: "요루바어", en: "Yoruba" },
  langIg: { "zh-CN": "伊博语", "zh-TW": "伊博語", ja: "イボ語", ko: "이그보어", en: "Igbo" },
  langZu: { "zh-CN": "祖鲁语", "zh-TW": "祖魯語", ja: "ズールー語", ko: "줄루어", en: "Zulu" },
  langXh: { "zh-CN": "科萨语", "zh-TW": "科薩語", ja: "コサ語", ko: "코사어", en: "Xhosa" },
  langAf: { "zh-CN": "南非荷兰语", "zh-TW": "南非荷蘭語", ja: "アフリカーンス語", ko: "아프리칸스어", en: "Afrikaans" },
  langSo: { "zh-CN": "索马里语", "zh-TW": "索馬里語", ja: "ソマリ語", ko: "소말리어", en: "Somali" },
  langMg: { "zh-CN": "马达加斯加语", "zh-TW": "馬達加斯加語", ja: "マダガスカル語", ko: "마다가스카르어", en: "Malagasy" },
  langRw: { "zh-CN": "卢旺达语", "zh-TW": "盧安達語", ja: "ルワンダ語", ko: "르완다어", en: "Kinyarwanda" },

  // Other
  langEo: { "zh-CN": "世界语", "zh-TW": "世界語", ja: "エスペラント語", ko: "에스페란토", en: "Esperanto" },
  langLa: { "zh-CN": "拉丁语", "zh-TW": "拉丁語", ja: "ラテン語", ko: "라틴어", en: "Latin" },
  langHaw: { "zh-CN": "夏威夷语", "zh-TW": "夏威夷語", ja: "ハワイ語", ko: "하와이어", en: "Hawaiian" },
  langMi: { "zh-CN": "毛利语", "zh-TW": "毛利語", ja: "マオリ語", ko: "마오리어", en: "Maori" },
  langSm: { "zh-CN": "萨摩亚语", "zh-TW": "薩摩亞語", ja: "サモア語", ko: "사모아어", en: "Samoan" },
};

function detectLocale() {
  const lang = navigator.language || navigator.userLanguage || "en";
  if (LANG_KEYS.enableTranslation[lang]) return lang;
  const base = lang.split("-")[0];
  if (LANG_KEYS.enableTranslation[base]) return base;
  if (base === "zh") return "zh-CN";
  return "en";
}

function t(key) {
  const locale = detectLocale();
  const entry = LANG_KEYS[key];
  if (!entry) return key;
  return entry[locale] || entry["en"] || key;
}
