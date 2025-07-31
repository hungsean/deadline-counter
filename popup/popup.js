document.addEventListener('DOMContentLoaded', () => {
  /* ---------- DOM ---------- */
  const toggleSwitch = document.getElementById('toggleSwitch');
  const timeInput    = document.getElementById('timeInput');
  const countInput   = document.getElementById('countInput');

  /* ---------- 讀取已存的設定 ---------- */
  chrome.storage.sync.get(['startTime', 'targetCount'], (data) => {
    if (data.startTime)  timeInput.value  = data.startTime;
    if (data.targetCount) countInput.value = data.targetCount;
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
  countInput.addEventListener('keyup',  (e)=>e.key==='Enter'&&save());

  /* ---------- 顯示 / 隱藏開關 ---------- */
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    const tabId = tabs[0].id;

    // 讀取目前方塊狀態
    chrome.tabs.sendMessage(tabId, {action: 'getStatus'}, (res) => {
      if (!chrome.runtime.lastError && res) toggleSwitch.checked = res.isVisible;
    });

    // 切換事件
    toggleSwitch.addEventListener('change', () => {
      chrome.tabs.sendMessage(tabId, {action: 'toggle'}, (res) => {
        if (chrome.runtime.lastError) console.log('無法切換方塊', chrome.runtime.lastError);
        if (res) toggleSwitch.checked = res.isVisible;
      });
    });
  });
});