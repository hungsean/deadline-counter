// 處理顯示/隱藏按鈕
document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.getElementById('toggleBtn');
  
  // 獲取當前狀態
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {action: 'getStatus'}, function(response) {
      if (response && response.isVisible !== undefined) {
        updateButton(response.isVisible);
      }
    });
  });
  
  // 按鈕點擊事件
  toggleBtn.addEventListener('click', function() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {action: 'toggle'}, function(response) {
        if (response && response.isVisible !== undefined) {
          updateButton(response.isVisible);
        }
      });
    });
  });
  
  // 更新按鈕文字
  function updateButton(isVisible) {
    toggleBtn.textContent = isVisible ? '隱藏方塊' : '顯示方塊';
  }
});