# 旅途手帳（模組化版本）

使用 VS Code 的 Live Server 開啟 `index.html`。所有檔案保持原有相對路徑，上傳 GitLab 後即可由原有 GitLab Pages 流程部署。

## 檔案結構

- `index.html`：頁面骨架與 JavaScript 載入順序
- `style.css`：所有 CSS 樣式
- `js/state.js`：範例資料、瀏覽器儲存、全域狀態與工具函式
- `js/render.js`：主畫面渲染
- `js/itinerary.js`：行程畫面
- `js/activities.js`：活動畫面
- `js/activityCard.js`：活動卡片
- `js/checklist.js`：待辦清單
- `js/stopForm.js`：行程編輯表單
- `js/activityForm.js`：活動編輯表單
- `js/settingsForm.js`：旅程設定表單
- `js/bind.js`：事件綁定
- `js/action.js`：按鈕動作
- `js/init.js`：頂層事件與初始化

各 JS 檔案使用傳統 `<script>`，依 `index.html` 順序共用狀態，不需要 bundler。**請勿任意調換載入順序**。

提醒：這是原始程式碼的檔案拆分，不會自動將瀏覽器 localStorage 同步到 GitLab。

## JSON 備份與還原

- **匯出 JSON**：下載目前整份旅程，含行程、活動及完成狀態。
- **匯入 JSON**：選擇檔案，驗證格式後確認覆蓋目前瀏覽器資料；建議先匯出備份。
- 新增 `js/exportJson.js` 和 `js/importJson.js`，並在 `index.html` 的 `init.js` 前載入。
- 支援直接匯入舊版匯出的 `{ "title", "days", "stops", "activities" }` 資料物件。
- 匯出檔案會另外包含 `format`、`version`、`exportedAt` 作為備份資訊。
- GitLab Pages 是靜態網站；匯入僅更新當前瀏覽器的 localStorage，不會自動修改 GitLab Repository。

### 最小 JSON 範例

```json
{
  "title": "德國旅行手帳",
  "days": 2,
  "stops": [
    {"id":"s1","day":1,"start":"09:00","end":"10:00","name":"布蘭登堡門","type":"景點"}
  ],
  "activities": [
    {"id":"a1","name":"購買交通票","category":"其他","done":false}
  ]
}
```
