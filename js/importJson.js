// 匯入 JSON 前先驗證資料，避免破壞現有行程。
function validateTravelJson(input) {
  if (!input || typeof input !== 'object' || Array.isArray(input)) throw new Error('JSON 必須是旅程物件');
  if (typeof input.title !== 'string' || !input.title.trim()) throw new Error('缺少有效的 title');
  if (!Number.isInteger(input.days) || input.days < 1 || input.days > 30) throw new Error('days 必須是 1～30 的整數');
  if (!Array.isArray(input.stops)) throw new Error('stops 必須是陣列');
  if (!Array.isArray(input.activities)) throw new Error('activities 必須是陣列');
  const isString = value => typeof value === 'string';
  const unique = (arr, name) => {
    const ids = arr.map(x => x.id);
    if (new Set(ids).size !== ids.length) throw new Error(`${name} 的 id 不可重複`);
  };
  const stops = input.stops.map((s, i) => {
    if (!s || typeof s !== 'object' || Array.isArray(s)) throw new Error(`stops[${i}] 格式錯誤`);
    if (!isString(s.id) || !s.id || !isString(s.name) || !s.name.trim()) throw new Error(`stops[${i}] 缺少 id 或 name`);
    if (!Number.isInteger(s.day) || s.day < 1 || s.day > input.days) throw new Error(`stops[${i}].day 超出天數`);
    for (const field of ['start', 'end']) {
      if (!isString(s[field]) || !/^([01]\d|2[0-3]):[0-5]\d$/.test(s[field])) throw new Error(`stops[${i}].${field} 應為 HH:MM`);
    }
    const normalized = { id: s.id, day: s.day, start: s.start, end: s.end, name: s.name };
    for (const field of ['type', 'hours', 'notes', 'route', 'cost', 'map', 'travel']) {
      if (s[field] != null && !isString(s[field])) throw new Error(`stops[${i}].${field} 必須是文字`);
      normalized[field] = s[field] ?? '';
    }
    return normalized;
  });
  const activities = input.activities.map((a, i) => {
    if (!a || typeof a !== 'object' || Array.isArray(a)) throw new Error(`activities[${i}] 格式錯誤`);
    if (!isString(a.id) || !a.id || !isString(a.name) || !a.name.trim()) throw new Error(`activities[${i}] 缺少 id 或 name`);
    if (a.done != null && typeof a.done !== 'boolean') throw new Error(`activities[${i}].done 必須是布林值`);
    const normalized = { id: a.id, name: a.name, done: a.done ?? false };
    for (const field of ['category', 'date', 'reservation', 'notes']) {
      if (a[field] != null && !isString(a[field])) throw new Error(`activities[${i}].${field} 必須是文字`);
      normalized[field] = a[field] ?? '';
    }
    return normalized;
  });
  unique(stops, 'stops');
  unique(activities, 'activities');
  return { title: input.title, days: input.days, stops, activities };
}

async function importJson(file) {
  if (!file) return;
  if (file.size > 5 * 1024 * 1024) { notify('檔案不可超過 5 MB'); return; }
  let imported;
  try {
    imported = validateTravelJson(JSON.parse(await file.text()));
  } catch (error) {
    alert('匯入失敗：' + error.message + '\n目前行程未變更。');
    return;
  }
  const message = `確定匯入「${imported.title}」？\n${imported.days} 天、${imported.stops.length} 筆行程、${imported.activities.length} 筆活動。\n\n這會覆蓋此瀏覽器目前的旅程資料，建議先匯出 JSON 備份。`;
  if (!confirm(message)) return;
  try {
    // 先確認能寫入儲存空間，再切換畫面資料。
    localStorage.setItem(key, JSON.stringify(imported));
  } catch {
    alert('無法儲存匯入資料，請檢查瀏覽器儲存空間或權限。原有行程未變更。');
    return;
  }
  data = imported;
  day = 1;
  filter = '全部';
  opened = null;
  editing = false;
  view = 'itinerary';
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
  notify('JSON 匯入成功');
}

function setupJsonButtons() {
  $('#exportJsonBtn').addEventListener('click', exportJson);
  $('#importJsonBtn').addEventListener('click', () => $('#importJsonFile').click());
  $('#importJsonFile').addEventListener('change', async event => {
    const file = event.target.files?.[0];
    try { await importJson(file); } finally { event.target.value = ''; }
  });
}
