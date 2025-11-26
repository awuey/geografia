const EUROPE = {
  "🌊 Morza i zatoki": [
    "Śródziemne","Czarne","Marmara","Północne","Norweskie","Białe","Bałtyckie",
    "Adriatyckie","Egejskie","Biskajska","Kanał La Manche","Botnicka","Fińska"
  ],
  "🏝️ Wyspy i półwyspy": [
    "Sycylia","Sardynia","Korsyka","Kreta","Baleary","Islandia","Irlandia",
    "Nowa Ziemia","Svalbard","Wielka Brytania","Płw. Skandynawski","Płw. Iberyjski",
    "Płw. Apeniński","Płw. Kolski","Płw. Bretoński","Jutlandzki","Krym"
  ],
  "🌾 Niziny / wyżyny": [
    "Wschodnioeuropejska","Nadkaspijska","Czarnomorska","Wołoska","Francuska",
    "Niemiecka","Wielka Węgierska","Masyw Centralny","Podolska","Bawarska","Środkoworosyjska"
  ],
  "⛰️ Góry / wulkany": [
    "Alpy (Mont Blanc)","Karpaty (Gerlach)","Ural","Dynarskie","Apeniny",
    "Pireneje","Betyckie","Skandynawskie","Rudy","Wezuwiusz","Etna","Hekla"
  ],
  "💧 Rzeki i jeziora": [
    "Wołga","Dunaj","Ren","Łaba","Dniepr","Tamiza","Sekwana","Wisła",
    "Loara","Tag","Duero","Rodan","Ładoga","Onega","Balaton","Saimaa"
  ]
};

const ASIA = {
  "🌊 Morza i zatoki": [
    "Arabskie","Południowochińskie","Żółte","Japońskie","Ochockie","Czukockie",
    "Łaptiewów","Wschodniosyberyjskie","Czerwone","Bengalska","Perska","Adeńska"
  ],
  "🏝️ Wyspy i półwyspy": [
    "Cejlon","Archipelag Malajski (Borneo, Jawa, Sumatra, Celebes)","Tajwan",
    "Honsiu","Sachalin","Nowosyberyjskie","Ziemia Północna","Kamczatka"
  ],
  "🌾 Niziny": [
    "Zachodniosyberyjska","Turańska","Chińska","Gangesu","Indusu","Mezopotamii"
  ],
  "🏔️ Wyżyny": [
    "Tybetańska","Irańska","Mongolska","Pogórze Kazachskie","Środkowosyberyjska","Dekan"
  ],
  "🏜️ Pustynie": [
    "Gobi","Takla Makan","Rub al-Chali","Kara-Kum"
  ],
  "⛰️ Góry": [
    "Himalaje (Mont Everest)","Kunlun","Tienszan","Hindukusz","Kaukaz","Ałtaj",
    "Sajany","Pamir","Zagros","Wierchojańskie"
  ],
  "💧 Rzeki": [
    "Jangcy","Huang He","Mekong","Ob","Lena","Jenisej","Angara",
    "Ganges","Indus","Brahmaputra","Tygrys","Eufrat","Amur","Amu-daria","Syr-daria"
  ],
  "🏞️ Jeziora": [
    "Bajkał","Bałchasz","Morze Martwe","Aralskie"
  ]
};

const AFRICA_OCEANIA = {
  "🌊 Morza i zatoki": [
    "Czerwone", "Gwinejska", "Adeńska", "Kanał Mozambicki",
    "Tasmana", "Koralowe", "Arafura", "Zatoka Karpentaria", "Wielka Zatoka Australijska"
  ],
  "🏝️ Wyspy i półwyspy": [
    "Madagaskar", "Kanaryjskie", "Seszelskie", "Komory", "Płw. Somalijski",
    "Tasmania", "Nowa Gwinea", "Hawaje", "Nowa Kaledonia", "Fidżi"
  ],
  "🌾 Niziny / wyżyny / pustynie": [
    "Wschodnioafrykańska (Wyż.)", "Kotlina Konga", "Libijska (Niz.)",
    "Nullarbor", "Wielki Basen Artezyjski",
    "Sahara (Pust.)", "Kalahari (Pust.)", "Namib (Pust.)",
    "Wielka Pust. Piaszczysta", "Pust. Wiktorii", "Pust. Gibsona"
  ],
  "⛰️ Góry / szczyty / wulkany": [
    "Atlas", "Smocze", "Kilimandżaro", "Kenia", "Ruwenzori",
    "Wielkie Góry Wododziałowe", "Góra Kościuszki", "Mauna Loa", "Mauna Kea"
  ],
  "💧 Rzeki i jeziora": [
    "Nil", "Kongo", "Niger", "Limpopo", "Oranje",
    "Murray", "Darling",
    "Wiktoria (Jez.)", "Tanganika (Jez.)", "Malawi (Jez.)", "Czad (Jez.)",
    "Jezioro Eyre"
  ],

};
const kodDostepuRegionu = "gobi"; 

function detectRegionFromFilename() {
  const path = decodeURIComponent(window.location.pathname || '');
  const file = path.split('/').filter(Boolean).pop() || '';
  const name = (file.split('.').shift() || '').toLowerCase();

  if (name.includes('azja') || name.includes('asia')) return { key: 'asia', label: 'AZJA', data: ASIA };
  if (name.includes('europa') || name.includes('europe') || name.includes('eu')) return { key: 'europe', label: 'EUROPA', data: EUROPE };
  if (name.includes('afryka') || name.includes('australia') || name.includes('oceania')) return { key: 'africa_oceania', label: 'AFRYKA & AUSTRALIA/OCEANIA', data: AFRICA_OCEANIA };
  return { key: 'europe', label: 'EUROPA', data: EUROPE };
}

const REGION = detectRegionFromFilename();

function makeRNGFromNow() {
  let x = (Date.now() & 0x7fffffff) || 1;
  return {
    random: function() {
      x ^= (x << 13);
      x ^= (x >>> 17);
      x ^= (x << 5);
      return (x >>> 0) / 4294967296;
    }
  };
}

function przetwarzanieGeograficzne(klucz) {
    return klucz.toLowerCase() === kodDostepuRegionu; 
}


function shuffle(array, rng) {
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickN(list, n, rng) {
  if (!Array.isArray(list)) return [];
  if (n >= list.length) return list.slice();
  return shuffle(list, rng).slice(0, n);
}

function makeId(prefix, idx) {
  return `${prefix.replace(/\s+/g,'_').replace(/[^\w\-]/g,'')}_${idx}`;
}

const RESULTS_KEY = `${REGION.key}_lastResults`;
const HISTORY_KEY = `${REGION.key}_history`;

function renderResults(resultsObj) {
  const container = document.getElementById('results');
  if (!container) return;
  container.innerHTML = '';
  for (const [title, items] of Object.entries(resultsObj)) {
    const box = document.createElement('div');
    box.className = 'box';
    const safeTitle = title.replace(/\s+/g,'_');
    let html = `<h3>${title}</h3><ul>`;
    items.forEach((it, idx) => {
      const id = makeId(safeTitle, idx);
      html += `<li><input type="checkbox" class="item-check" id="${id}"> <label for="${id}">${it}</label></li>`;
    });
    html += `</ul>`;
    box.innerHTML = html;
    container.appendChild(box);
  }
}

let history = JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]');

function updateHistoryBox() {
  const box = document.getElementById('historyBox');
  if (!box) return;
  if (history.length === 0) {
    box.innerHTML = `<strong>${REGION.label} — Historia:</strong><br>(brak)`;
    return;
  }
  box.innerHTML = `<strong>${REGION.label} — Historia:</strong><br>` + history.map((h, i) =>
    `${i+1}. Kliknięcia: ${h.clicked}, Pozostało: ${h.remaining} — ${h.timestamp}`
  ).join("<br>");
}

function pushToHistory(entry) {
  history.push(entry);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  updateHistoryBox();
}

function loadLastResults() {
  try {
    const stored = JSON.parse(localStorage.getItem(RESULTS_KEY));
    if (stored && typeof stored === 'object') {
      renderResults(stored);
    }
  } catch (e) { }
}
loadLastResults();
updateHistoryBox();

document.getElementById('drawBtn')?.addEventListener('click', () => {
  const rng = makeRNGFromNow();

  const results = {};
  Object.keys(REGION.data).forEach(cat => {
    results[cat] = pickN(REGION.data[cat], 3, rng);
  });

  localStorage.setItem(RESULTS_KEY, JSON.stringify(results));
  renderResults(results);
});

document.getElementById('submitBtn')?.addEventListener('click', () => {
  const checks = document.querySelectorAll('.item-check');
  let clicked = 0;
  checks.forEach(ch => { if (ch.checked) clicked++; });

  const total = checks.length || 0;
  const remaining = Math.max(0, total - clicked);

  const entry = {
    clicked,
    remaining,
    timestamp: new Date().toLocaleString()
  };
  pushToHistory(entry);
});
document.getElementById('resetBtn')?.addEventListener('click', () => {
  if (confirm(`Na pewno chcesz wyczyścić pamięć dla regionu ${REGION.label}?`)) {
    localStorage.removeItem(`${REGION.key}_lastResults`);
    localStorage.removeItem(`${REGION.key}_history`);
    alert(`Dane dla ${REGION.label} zostały usunięte ✅`);
    window.location.reload(); 
  }
});