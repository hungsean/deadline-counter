// 全局變量跟踪方塊狀態
let floatingBox = null;
let isBoxVisible = true;

// 創建漂浮小方塊
async function createFloatingBox() {
  // 檢查是否已經存在，避免重複創建
  if (document.getElementById('floating-box')) {
    return;
  }

  try {
    // 獲取HTML模板
    const htmlUrl = chrome.runtime.getURL('content/content.html');
    const response = await fetch(htmlUrl);
    const htmlText = await response.text();
    
    // 創建臨時容器來解析HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlText;
    const box = tempDiv.firstElementChild;
    
    // 設置初始位置
    box.style.left = '20px';
    box.style.top = '20px';
    
    // 添加到頁面
    document.body.appendChild(box);
    floatingBox = box;
    
    // 添加拖拽功能
    makeDraggable(box);
  } catch (error) {
    console.error('創建漂浮方塊失敗:', error);
  }
}

// 顯示/隱藏方塊
function toggleBox() {
  if (floatingBox) {
    isBoxVisible = !isBoxVisible;
    floatingBox.style.display = isBoxVisible ? 'flex' : 'none';
  }
  return isBoxVisible;
}

// 獲取方塊狀態
function getBoxStatus() {
  return isBoxVisible;
}

// 實現拖拽功能
function makeDraggable(element) {
  let isDragging = false;
  let currentX;
  let currentY;
  let initialX;
  let initialY;
  let xOffset = 0;
  let yOffset = 0;

  element.addEventListener('mousedown', dragStart);
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', dragEnd);

  function dragStart(e) {
    initialX = e.clientX - xOffset;
    initialY = e.clientY - yOffset;

    // 只允許透過拖拽手柄來拖動
    if (e.target.classList.contains('drag-handle')) {
      isDragging = true;
      element.style.cursor = 'grabbing';
    }
  }

  function drag(e) {
    if (isDragging) {
      e.preventDefault();
      
      currentX = e.clientX - initialX;
      currentY = e.clientY - initialY;

      xOffset = currentX;
      yOffset = currentY;

      element.style.left = currentX + 'px';
      element.style.top = currentY + 'px';
    }
  }

  function dragEnd() {
    // 邊緣吸附配置
    const margin = 20; // 可配置的邊距
    
    // 獲取視窗尺寸和元素尺寸
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    const elementWidth = element.offsetWidth;
    const elementHeight = element.offsetHeight;
    
    // 計算到各邊的距離
    const distanceToLeft = currentX;
    const distanceToRight = windowWidth - (currentX + elementWidth);
    const distanceToTop = currentY;
    const distanceToBottom = windowHeight - (currentY + elementHeight);
    
    // 找到最近的邊緣
    const distances = [
      { edge: 'left', distance: distanceToLeft, x: margin, y: currentY },
      { edge: 'right', distance: distanceToRight, x: windowWidth - elementWidth - margin, y: currentY },
      { edge: 'top', distance: distanceToTop, x: currentX, y: margin },
      { edge: 'bottom', distance: distanceToBottom, x: currentX, y: windowHeight - elementHeight - margin }
    ];
    
    const nearestEdge = distances.reduce((min, current) => 
      current.distance < min.distance ? current : min
    );
    
    // 總是吸附到最近的邊緣
    // 確保吸附位置在視窗範圍內
    const snapX = Math.max(margin, Math.min(windowWidth - elementWidth - margin, nearestEdge.x));
    const snapY = Math.max(margin, Math.min(windowHeight - elementHeight - margin, nearestEdge.y));
    
    // 添加吸附動畫類
    element.classList.add('snapping');
    
    // 設置新位置
    element.style.left = snapX + 'px';
    element.style.top = snapY + 'px';
    
    // 更新偏移量
    xOffset = snapX;
    yOffset = snapY;
    currentX = snapX;
    currentY = snapY;
    
    // 移除動畫類
    setTimeout(() => {
      element.classList.remove('snapping');
    }, 300);
    
    initialX = currentX;
    initialY = currentY;
    isDragging = false;
    element.style.cursor = 'grab';
  }
}

// 監聽來自popup的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'toggle') {
    const newStatus = toggleBox();
    sendResponse({isVisible: newStatus});
  } else if (request.action === 'getStatus') {
    sendResponse({isVisible: getBoxStatus()});
  }
});

// 等待頁面加載完成後創建小方塊
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createFloatingBox);
} else {
  createFloatingBox();
}