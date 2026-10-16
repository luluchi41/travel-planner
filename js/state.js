// 旅程範例、狀態與共用工具
const sample = { 
        title: '德國旅行手帳', 
        days: 7, 
        stops: [
                { 
                        id: 's1', 
                        day: 1, 
                        start: '17:00', 
                        end: '18:00', 
                        name: '駁二藝術特區', 
                        type: '景點', 
                        hours: '10:00–18:00', 
                        notes: '停留 1 小時，欣賞藝術裝置與港邊風景', 
                        route: '高雄國際機場 → 美麗島（紅線）→ 鹽埕埔（橘線）', 
                        cost: 'TWD 35', 
                        map: '高雄駁二藝術特區', 
                        travel: '步行約 10 分鐘至永心浮島' 
                }, 
                { 
                        id: 's2', 
                        day: 1, 
                        start: '18:30', 
                        end: '20:30', 
                        name: '永心浮島 YONSHIN FUDOPIA', 
                        type: '美食', 
                        hours: '12:00–23:00', 
                        notes: '推薦：碳烤生章魚腳、台式青醬牡蠣炒麵、酥炸銀魚。用餐約 120 分鐘',
                         route: '從駁二藝術特區步行前往', 
                         cost: '', 
                         map: '永心浮島 高雄', 
                         travel: '' 
                }, 
                { 
                        id: 's3',
                        day: 2, 
                        start: '10:00', 
                        end: '11:30', 
                        name: '特色咖啡廳', 
                        type: '美食', 
                        hours: '09:00–19:00', 
                        notes: '享受早午餐，拍照留念', 
                        route: '搭乘大眾運輸前往', 
                        cost: '', 
                        map: '高雄 咖啡廳', 
                        travel: '' 
                }
        ], 
        activities: [
                {
                        id: 'a1', 
                        name: 'Compose Coffee', 
                        category: '咖啡廳', 
                        date: '', 
                        reservation: '', 
                        notes: '旅行期間想去的咖啡廳', 
                        done: false 
                }, { 
                        id: 'a2', 
                        name: '田柾國公車看板', 
                        category: '廣告', 
                        date: '', 
                        reservation: '', 
                        notes: '粉絲應援打卡', 
                        done: false 
                }, { 
                        id: 'a3', 
                        name: 'JIMIN 公車看板', 
                        category: '廣告', 
                        date: '', 
                        reservation: '', 
                        notes: '粉絲應援打卡', 
                        done: false 
                }, { 
                        id: 'a4', 
                        name: 'Lador', 
                        category: '快閃店', 
                        date: '', 
                        reservation: '', 
                        notes: '期間限定活動', 
                        done: false
                }, { 
                        id: 'a5', 
                        name: '防彈應援咖啡廳', 
                        category: '咖啡廳', 
                        date: '', 
                        reservation: '未預約', 
                        notes: '請確認預約資訊', 
                        done: false 
                }, { 
                        id: 'a6', 
                        name: 'LOVE QUEST 展覽', 
                        category: '展覽', 
                        date: '', 
                        reservation: '未預約', 
                        notes: '請確認展覽開放時間', 
                        done: false 
                }] 
};
const key = 'travel-journal-v1'; 
let data; 
try { 
        data = JSON.parse(localStorage.getItem(key)) || structuredClone(sample) 
} catch { 
        data = structuredClone(sample) 
} 
let view = 'itinerary', day = 1, filter = '全部', opened = null, editing = false; 
const $ = s => document.querySelector(s), 
        esc = s => String(s ?? '').replace(/[&<>"']/g, 
                c => ({ 
                        '&': '&amp;', 
                        '<': '&lt;', 
                        '>': '&gt;', 
                        '"': '&quot;', 
                        "'": '&#39;' 
                }[c])), 
        save = () => { 
                try { localStorage.setItem(key, JSON.stringify(data)) } catch { } 
        }, 
        notify = s => { 
                let el = $('#toast'); 
                el.textContent = s; 
                el.style.display = 'block'; 
                (() => el.style.display = 'none', 2300) 
        }, 
        uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
