document.addEventListener('DOMContentLoaded', () => {
  /* ---------- DOM ---------- */
  const toggleSwitch = document.getElementById('toggleSwitch');
  const timeInput    = document.getElementById('timeInput');
  const countInput   = document.getElementById('countInput');

  /* ---------- 讀取已存的設定 ---------- */
  chrome.storage.sync.get(['startTime', 'targetCount', 'boxVisible'], (data) => {
    if (data.startTime)  timeInput.value  = data.startTime;
    if (data.targetCount) countInput.value = data.targetCount;
    toggleSwitch.checked = (typeof data.boxVisible === 'boolean') ? data.boxVisible : true;
  });

  /* ---------- 輸入即儲存 ---------- */
  function save() {
    chrome.storage.sync.set({
      startTime:   timeInput.value.trim(),        // 建議用有效的 ISO 字串
      targetCount: +countInput.value || null      // 轉成數字；空字串存 null
    });
  }
  timeInput .addEventListener('blur',   save);
  countInput.addEventListener('blur',   save);
  timeInput .addEventListener('keyup',  (e)=>e.key==='Enter'&&save());
  countInput.addEventListener('keyup', (e) => e.key === 'Enter' && save());
  toggleSwitch.addEventListener('change', () => {
    const newState = toggleSwitch.checked;
    chrome.storage.sync.set({ boxVisible: newState });

  });

});