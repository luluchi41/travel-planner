// 匯出完整旅程，包含 stops 與 activities。
function exportJson() {
  const payload = {
    format: 'travel-journal',
    version: 1,
    exportedAt: new Date().toISOString(),
    title: data.title,
    days: data.days,
    stops: data.stops,
    activities: data.activities
  };
  const json = JSON.stringify(payload, null, 2);
  const blob = new Blob([json], { type: 'application/json;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  const filename = (data.title || 'travel-journal').replace(/[\\/:*?"<>|\x00-\x1f]/g, '_').slice(0, 80);
  link.href = url;
  link.download = `${filename}.json`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
  notify('JSON 已匯出');
}
