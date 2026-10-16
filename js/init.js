// 事件初始化與第一次畫面渲染
document.querySelectorAll('[data-nav]').forEach(b => b.onclick = () => { 
    view = b.dataset.nav; 
    editing = false; 
    render(); 
    window.scrollTo({ 
        top: 0, 
        behavior: 'smooth' 
    }) 
}); 
$('#pdfBtn').onclick = () => window.print(); 
$('#copyBtn').onclick = async () => { 
    let txt = data.title + '\n\n' + data.stops.slice().sort((a, b) => a.day - b.day || a.start.localeCompare(b.start)).map(s => `Day ${s.day} ${s.start}–${s.end} ${s.name}\n${s.notes || ''}\n${s.route || ''}`).join('\n\n'); 
    try { 
        await navigator.clipboard.writeText(txt); 
        notify('行程已複製') 
    } catch { 
        notify('無法複製，請檢查瀏覽器權限') 
    } 
}; 
render();

setupJsonButtons();
