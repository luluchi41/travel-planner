# 旅途手帳 Travel Journal

純 HTML / CSS / JavaScript 的繁體中文手機版互動旅遊規劃網站，可直接部署 GitHub Pages。

## 功能
- Day 1～Day N 行程切換、時間軸、交通資訊與 Google Maps 搜尋導航
- 新增、修改、刪除景點與餐廳
- 活動分類篩選、打卡勾選、預約狀態與活動詳情
- 旅行名稱、天數設定
- localStorage 本機自動儲存
- 複製行程文字、瀏覽器列印／另存 PDF

## 部署 GitHub Pages
1. 在 GitHub 建立公開 repository，例如 `travel-planner`。
2. 上傳本資料夾的 `index.html` 到 repository 根目錄。
3. 進入 Settings → Pages → Build and deployment，Source 選 **Deploy from a branch**。
4. Branch 選 `main`、資料夾選 `/ (root)`，按 Save。
5. 網站會位於 `https://你的帳號.github.io/travel-planner/`。

## 使用
開啟網站後，切換底部分頁。行程可新增／編輯／刪除；活動可勾選、篩選、展開編輯。清單頁面的「旅程設定」可修改標題與天數。

## 注意
- 預設資料是示範用（依截圖重建風格），並非真實旅行推薦或即時營業資訊。
- 所有修改只保存在目前瀏覽器的 localStorage；更換裝置、清除網站資料或無痕模式可能遺失。GitHub Pages 不會同步資料到其他裝置。
- 「存成 PDF」會開啟系統列印介面，選擇「另存 PDF」。
- Google Maps 導航會以關鍵字開啟搜尋頁，不保證自動產生逐段路線。
