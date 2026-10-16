// render — 獨立功能模組（依 index.html 順序載入）
function render() { 
    document.title = data.title + '｜旅途手帳'; 
    $('#tripTitle').textContent = data.title; 
    document.querySelectorAll('.nav').forEach(b => b.classList.toggle('active', b.dataset.nav === view)); 
    $('#page').innerHTML = view === 'itinerary' ? itinerary() : view === 'activities' ? activities() : checklist(); 
    bind() 
}
