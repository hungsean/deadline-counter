// 處理顯示/隱藏開關
document.addEventListener('DOMContentLoaded', function() {
  const toggleSwitch = document.getElementById('toggleSwitch');
  
  // 獲取當前狀態
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: 'getStatus'}, function(response) {
      if (response && response.isVisible !== undefined) {
        updateSwitch(response.isVisible);
      }
    });
  });
  
  // 開關狀態改變事件
  toggleSwitch.addEventListener('change', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: 'toggle'}, function(response) {
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