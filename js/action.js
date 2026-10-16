// action — 獨立功能模組（依 index.html 順序載入）
function action(b) { 
    let a = b.dataset.action, id = b.dataset.id; 
    if (a === 'map') { 
        window.open('https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(b.dataset.map), '_blank', 'noopener'); 
        return 
    } 
    if (a === 'cancel') { 
        editing = false; 
        render(); 
        return 
    } if (a === 'reset') { 
        if (confirm('確定清除目前所有編輯與打卡紀錄，恢復範例資料？')) { 
            data = structuredClone(sample); 
            editing = false; save(); 
            render() 
        } 
        return 
    } 
    if (a === 'delete-stop' || a === 'delete-activity') { 
        if (confirm('確定刪除此項目？')) { 
            let k = a === 'delete-stop' ? 'stops' : 'activities'; 
            data[k] = data[k].filter(x => x.id !== id); 
            save(); 
            render() 
        } 
        return 
    } 
    if (a === 'settings') { 
        editing = 'settings'; 
        render(); 
        $('#page').insertAdjacentHTML('beforeend', settingsForm()); 
        bind(); 
        document.querySelector('.editor')?.scrollIntoView({ behavior: 'smooth' }); 
        return 
    } 
    editing = id || true; 
    render(); 
    document.querySelector('.editor')?.scrollIntoView({ behavior: 'smooth' }) 
}
