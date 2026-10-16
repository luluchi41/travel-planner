// 等 ini.json 與本機資料載入後，才開始渲染網站。
async function init() {
  try {
    await loadInitialData();
  } catch (error) {
    console.error(error);
    $('#page').innerHTML = '<div class="empty">無法讀取 ini.json，請確認檔案存在，並使用 Live Server 或 GitLab Pages 開啟網站。</div>';
    return;
  }

  document.querySelectorAll('[data-nav]').forEach(button => {
    button.onclick = () => {
      view = button.dataset.nav;
      editing = false;
      render();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };
  });
  $('#pdfBtn').onclick = () => window.print();
  $('#copyBtn').onclick = async () => {
    const text = data.title + '\n\n' + data.stops.slice()
      .sort((a, b) => a.day - b.day || a.start.localeCompare(b.start))
      .map(s => `Day ${s.day} ${s.start}–${s.end} ${s.name}\n${s.notes || ''}\n${s.route || ''}`)
      .join('\n\n');
    try {
      await navigator.clipboard.writeText(text);
      notify('行程已複製');
    } catch {
      notify('無法複製，請檢查瀏覽器權限');
    }
  };
  setupJsonButtons();
  render();
}
init();
