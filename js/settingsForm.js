// settingsForm — 獨立功能模組（依 index.html 順序載入）
function settingsForm() { 
    return `<form class="editor" id="settingsForm"><h3>旅程設定</h3><label class="field">旅程名稱<input name="title" required value="${esc(data.title)}"></label><label class="field">旅行天數<input name="days" type="number" min="1" max="30" required value="${data.days}"></label><div class="tools"><button class="black" type="submit">儲存設定</button><button class="outline" type="button" data-action="cancel">取消</button><button class="outline danger" type="button" data-action="reset">恢復範例資料</button></div></form>` }
