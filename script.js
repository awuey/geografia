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
function detectRegionFromFilename() {
  const name = (decodeURIComponent(window.location.pathname).split('/').pop()?.split('.').shift() || '').toLowerCase();
  if (name.includes('azja') || name.includes('asia')) return { data: ASIA, label: 'AZJA' };
  if (name.includes('europa') || name.includes('europe')) return { data: EUROPE, label: 'EUROPA' };
  if (name.includes('afryka') || name.includes('oceania')) return { data: AFRICA_OCEANIA, label: 'AFRYKA' };
  return { data: EUROPE, label: 'EUROPA' };
}

const REGION = detectRegionFromFilename();

function makeRNGFromNow() {
  let x = (Date.now() & 0x7fffffff) || 1;
  return () => {
    x ^= (x << 13);
    x ^= (x >>> 17);
    x ^= (x << 5);
    return (x >>> 0) / 4294967296;
  };
}

function shuffle(array, rng) {
  if (!Array.isArray(array)) return [];
  const a = array.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pickN(list, n, rng) {
  if (!Array.isArray(list)) return [];
  if (n >= list.length) return list.slice();
  return shuffle(list, rng).slice(0, n);
}

function renderResults(resultsObj) {
  const container = document.getElementById('results');
  if (!container) return;
  container.innerHTML = '';
  for (const [title, items] of Object.entries(resultsObj)) {
    const box = document.createElement('div');
    box.className = 'box';
    let html = `<h3>${title}</h3><ul>`;
    items.forEach((it, idx) => {
      const id = `${title.replace(/\s+/g,'_')}_${idx}`;
      html += `<li><input type="checkbox" class="item-check" id="${id}"> <label for="${id}">${it}</label></li>`;
    });
    html += `</ul>`;
    box.innerHTML = html;
    container.appendChild(box);
  }
}

document.getElementById('drawBtn')?.addEventListener('click', () => {
  const rng = makeRNGFromNow();
  const results = {};
  Object.keys(REGION.data).forEach(cat => {
    results[cat] = pickN(REGION.data[cat], 3, rng);
  });
  renderResults(results);
});

document.getElementById('submitBtn')?.addEventListener('click', () => {
  const checks = document.querySelectorAll('.item-check');
  let clicked = 0;
  checks.forEach(ch => { if (ch.checked) clicked++; });
  const total = checks.length || 0;
  alert(`Zatwierdzono! Zaznaczono: ${clicked} z ${total} elementów.`);
});