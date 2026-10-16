// checklist — 獨立功能模組（依 index.html 順序載入）
function checklist() { 
    let total = data.activities.length, done = data.activities.filter(a => a.done).length; 
    return `<div class="section-head"><h2>旅行待辦清單</h2><button class="outline" data-action="settings">⚙️ 旅程設定</button></div><div class="item green"><b>打卡完成度　${done} / ${total}</b><div class="progress"><span style="width:${total ? done / total * 100 : 0}%"></span></div><div class="small">打卡紀錄會儲存在目前瀏覽器。</div></div><div class="section-head"><h2>所有打卡項目</h2><button class="outline" data-action="add-activity">＋ 新增</button></div>${data.activities.map(a => `<article class="item"><div class="itemhead"><input type="checkbox" data-check="${a.id}" aria-label="完成 ${esc(a.name)}" ${a.done ? 'checked' : ''}><strong style="${a.done ? 'text-decoration:line-through;color:#8b867e' : ''}">${esc(a.name)}</strong><span class="small">${esc(a.category)}</span></div></article>`).join('')}${editing ? activityForm() : ''}` 
}
