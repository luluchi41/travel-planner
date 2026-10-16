// activities — 獨立功能模組（依 index.html 順序載入）
function activities() { 
    let categories = ['全部', '咖啡廳', '廣告', '快閃店', '展覽', '其他'], 
        arr = data.activities.filter(a => filter === '全部' || a.category === filter); 
    return `<div class="section-head"><h2>應援打卡點 <span style="color:#ac711c">${data.activities.filter(a => a.done).length} / ${data.activities.length}</span></h2><button class="outline" data-action="add-activity">＋ 新增</button></div><div class="progress"><span style="width:${data.activities.length ? 100 * data.activities.filter(a => a.done).length / data.activities.length : 0}%"></span></div><div class="filters">${categories.map(c => `<button class="chip ${filter === c ? 'active' : ''}" data-filter="${c}">${c}</button>`).join('')}</div>${arr.map(a => activityCard(a)).join('') || '<div class="empty">目前沒有這個分類的活動。</div>'}${editing ? activityForm() : ''}` 
}
