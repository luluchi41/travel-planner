// activityForm — 獨立功能模組（依 index.html 順序載入）
function activityForm() { 
    let a = data.activities.find(x => x.id === editing) || { category: '咖啡廳' }; 
    return `<form class="editor" id="activityForm"><h3>${a.id ? '編輯' : '新增'}打卡活動</h3><label class="field">活動名稱<input name="name" required value="${esc(a.name)}"></label><label class="field">分類<select name="category">${['咖啡廳', '廣告', '快閃店', '展覽', '其他'].map(c => `<option ${a.category === c ? 'selected' : ''}>${c}</option>`).join('')}</select></label><label class="field">日期／活動期間<input name="date" placeholder="例如：2026/11/19" value="${esc(a.date)}"></label><label class="field">預約狀態<input name="reservation" placeholder="例如：已預約 10:00" value="${esc(a.reservation)}"></label><label class="field">備註<textarea name="notes">${esc(a.notes)}</textarea></label><div class="tools"><button class="black" type="submit">儲存活動</button><button class="outline" type="button" data-action="cancel">取消</button></div></form>` 
}
