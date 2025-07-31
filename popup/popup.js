document.addEventListener('DOMContentLoaded', function() {
  const toggleSwitch = document.getElementById('toggleSwitch');
  const toggleContainer = document.querySelector('.toggle-container');

  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    // 檢查是否為支援的頁面
    if (tabs[0].url.startsWith('http')) {
      // 獲取當前狀態
      chrome.tabs.sendMessage(tabs[0].id, {action: 'getStatus'}, function(response) {
        if (chrome.runtime.lastError) {
          console.log('無法連接到內容腳本，可能是在不支援的頁面上。');
          toggleSwitch.disabled = true;
          return;
        }
        if (response && response.isVisible !== undefined) {
          updateSwitch(response.isVisible);
        }
      });
    } else {
      console.log('在不支援的頁面上，禁用切換功能。');
      toggleSwitch.disabled = true;
    }
  });

  // 開關狀態改變事件
  toggleSwitch.addEventListener('change', function() {
    if (toggleSwitch.disabled) return;

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: 'toggle'}, function(response) {
        if (chrome.runtime.lastError) {
          console.log('無法連接到內容腳本。');
          return;
        }
        if (response && response.isVisible !== undefined) {
          updateSwitch(response.isVisible);
        }
      });
    });
  });

  // 更新開關狀態
  function updateSwitch(isVisible) {
    toggleSwitch.checked = isVisible;
  }
});