// 創建漂浮小方塊
function createFloatingBox() {
  // 檢查是否已經存在，避免重複創建
  if (document.getElementById('floating-box')) {
    return;
  }

  // 創建小方塊元素
  const box = document.createElement('div');
  box.id = 'floating-box';
  box.className = 'floating-box';
  box.innerHTML = '📦<br>拖我！';
  
  // 設置初始位置
  box.style.left = '20px';
  box.style.top = '20px';
  
  // 添加到頁面
  document.body.appendChild(box);
  
  // 添加拖拽功能
  makeDraggable(box);
  
  // 添加點擊事件
  box.addEventListener('click', function() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    box.style.backgroundColor = randomColor;
  });
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

    if (e.target === element) {
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
    initialX = currentX;
    initialY = currentY;
    isDragging = false;
    element.style.cursor = 'grab';
  }
}

// 等待頁面加載完成後創建小方塊
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createFloatingBox);
} else {
  createFloatingBox();
}