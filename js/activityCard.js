// activityCard — 獨立功能模組（依 index.html 順序載入）
function activityCard(a) { 
    let cls = { '廣告': 'blue', '快閃店': 'pink', '展覽': 'green' }[a.category] || '', open = opened === a.id; 
    return `<article class="item ${cls}"><div class="itemhead"><input type="checkbox" aria-label="完成 ${esc(a.name)}" data-check="${a.id}" ${a.done ? 'checked' : ''}><strong>${esc(a.name)}</strong><span class="status ${a.done ? 'ok' : 'wait'}">● ${a.done ? '已完成' : '未開始'}</span><button class="expand" aria-label="展開詳情" data-expand="${a.id}">${open ? '▾' : '▸'}</button></div>${open ? `<div class="detail"><p>🏷️ ${esc(a.category)}</p><p>📅 ${esc(a.date || '日期未設定')}</p><p>🎟️ ${esc(a.reservation || '預約資訊未設定')}</p><p>📝 ${esc(a.notes || '尚無備註')}</p><div class="tools"><button class="outline" data-action="edit-activity" data-id="${a.id}">編輯</button><button class="outline danger" data-action="delete-activity" data-id="${a.id}">刪除</button></div></div>` : ''}</article>` 
}
