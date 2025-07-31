// content/content.js
let floatingBox;            // DOM 參考
let isBoxVisible = true;    // 顯 / 隱 狀態
let startTime  = null;      // ISO 字串
let targetCount = null;     // 正整數
const REFRESH_MS = 1_000;
const DEFAULT_VISIBLE = true;      // 抽成常數，方便以後改

/* ─────────── 建立方塊 ─────────── */
async function createFloatingBox() {
  if (floatingBox) return;  // 已存在

  const html = await fetch(chrome.runtime.getURL('content/content.html')).then(r=>r.text());
  const temp = document.createElement('div');
  temp.innerHTML = html;
  floatingBox = temp.firstElementChild;
  document.body.appendChild(floatingBox);

  // 初始位置
  floatingBox.style.left = '20px';
  floatingBox.style.top  = '20px';
  makeDraggable(floatingBox);

  // 先讀 storage，再啟動計時
  chrome.storage.sync.get(['startTime', 'targetCount', 'boxVisible'], (data) => {
    startTime   = data.startTime   || null;
    targetCount = data.targetCount || null;
    isBoxVisible  = (typeof data.boxVisible === 'boolean') ? data.boxVisible : DEFAULT_VISIBLE;
    floatingBox.style.display = isBoxVisible ? 'flex' : 'none';
    updateDisplay();                    // 立即算一次
    setInterval(updateDisplay, REFRESH_MS);
  });
}

/* ─────────── 工具：將 Date 轉成 YYYY-MM-DD HH:MM:SS ─────────── */
function formatDateTime(d){
  const pad = n => String(n).padStart(2,'0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ` +
         `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
}

/* ─────────── 計算並更新文字 ─────────── */
function updateDisplay() {
  const boxText = floatingBox.querySelector('.countdown-time');
  const startEl = floatingBox.querySelector('.start-time');
  const nowEl   = floatingBox.querySelector('.current-time');

  // 如果尚未設定開始時間，全部清空
  if (!startTime) {
    boxText.textContent = '尚未設定';
    startEl.textContent = '';
    nowEl.textContent   = '';
    return;
  }

  // 更新「開始」與「現在」時間
  const now = new Date();
  startEl.textContent = formatDateTime(new Date(startTime));
  nowEl.textContent   = formatDateTime(now);

  // 尚未設定產量目標就只顯示時間
  if (!targetCount) {
    boxText.textContent = '尚未設定';
    return;
  }

  // 計算產量
  const hrs = (now.getTime() - new Date(startTime).getTime()) / 3_600_000;
  const produced = Math.floor(hrs * targetCount);
  boxText.textContent = `${produced}`;
}

/* ─────────── storage 變動同步 ─────────── */
chrome.storage.onChanged.addListener((changes, area)=>{
  if (area!=='sync') return;
  if (changes.startTime)   startTime   = changes.startTime.newValue;
  if (changes.targetCount) targetCount = changes.targetCount.newValue;
  if (changes.boxVisible) {
    isBoxVisible = changes.boxVisible.newValue;
    floatingBox.style.display = isBoxVisible ? 'flex' : 'none';
  }
  updateDisplay();
});

/* ─────────── 顯 / 隱 & 拖拽 (原邏輯保留) ─────────── */
function toggleBox() {
  isBoxVisible = !isBoxVisible;
  floatingBox.style.display = isBoxVisible ? 'flex' : 'none';
  chrome.storage.sync.set({ boxVisible: isBoxVisible });
  return isBoxVisible;
}
function getBoxStatus() { return isBoxVisible; }
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

/* ─────────── 監聽 popup 訊息 ─────────── */
chrome.runtime.onMessage.addListener((req, _, sendResponse)=>{
  if (req.action==='toggle')     sendResponse({isVisible: toggleBox()});
  if (req.action === 'getStatus') sendResponse({ isVisible: getBoxStatus() });
  
});

/* ─────────── 執行 ─────────── */
if (document.readyState==='loading') {
  document.addEventListener('DOMContentLoaded', createFloatingBox);
} else { createFloatingBox(); }
