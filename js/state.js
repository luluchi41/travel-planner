// 共用狀態與瀏覽器儲存。預設旅程由 ini.json 提供。
const key = 'travel-journal-v1';
let sample = null;
let data = null;
let view = 'itinerary';
let day = 1;
let filter = '全部';
let opened = null;
let editing = false;

const $ = selector => document.querySelector(selector);
const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[char]));
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);

function save() {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('行程儲存失敗', error);
    notify('儲存失敗，請檢查瀏覽器空間');
  }
}

function notify(message) {
  const el = $('#toast');
  el.textContent = message;
  el.style.display = 'block';
  setTimeout(() => { el.style.display = 'none'; }, 2300);
}

// 初次進站載入 ini.json，已有本機行程則優先使用本機資料。
async function loadInitialData() {
  const response = await fetch('./ini.json', { cache: 'no-cache' });
  if (!response.ok) throw new Error(`ini.json 載入失敗：HTTP ${response.status}`);
  sample = validateTravelJson(await response.json());
  const stored = localStorage.getItem(key);
  if (stored !== null) {
    try {
      data = validateTravelJson(JSON.parse(stored));
      return;
    } catch (error) {
      console.warn('本機行程資料無效，改用 ini.json', error);
    }
  }
  data = structuredClone(sample);
}
