// bind — 獨立功能模組（依 index.html 順序載入）
function bind() { 
    document.querySelectorAll('[data-day]').forEach(b => b.onclick = () => { 
        day = Number(b.dataset.day); 
        editing = false; 
        render() 
    }); 
    document.querySelectorAll('[data-filter]').forEach(b => b.onclick = () => { 
        filter = b.dataset.filter; 
        render() 
    }); 
    document.querySelectorAll('[data-check]').forEach(b => b.onchange = () => { 
        let a = data.activities.find(x => x.id === b.dataset.check); 
            a.done = b.checked; 
            save(); 
            render() 
    }); 
    document.querySelectorAll('[data-expand]').forEach(b => b.onclick = () => { 
        opened = opened === b.dataset.expand ? null : b.dataset.expand; 
        render() 
    }); 
    document.querySelectorAll('[data-action]').forEach(b => b.onclick = () => action(b)); 
    for (let kind of ['stop', 'activity', 'settings']) { 
        let f = $('#' + kind + 'Form'); 
        if (f) { f.onsubmit = e => { e.preventDefault(); 
        let v = Object.fromEntries(new FormData(f)); 
        if (kind === 'settings') { data.title = v.title; 
            data.days = Math.max(1, Math.min(30, Number(v.days))); day = Math.min(day, data.days) 
        } else { 
            let arr = kind === 'stop' ? data.stops : data.activities, old = arr.find(x => x.id === editing); 
            if (kind === 'stop') v.day = Number(v.day); 
            if (old) Object.assign(old, v); 
            else arr.push({ ...v, id: uid(), ...(kind === 'activity' ? { done: false } : {}) }) } editing = false; 
            save(); 
            render(); 
            notify('已儲存') } 
        } 
    } 
}
