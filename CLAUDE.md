# Chrome 擴充功能專案 - 漂浮方塊元件

## 專案概述

這是一個名為「漂浮小方塊插件」的 Chrome 擴充功能，能在網頁上建立可拖曳的漂浮方塊元件。該擴充功能會在頁面中顯示一個小型可拖曳的方塊，使用者可以移動並與之互動。

## 專案結構

* `manifest.json` - Chrome 擴充功能描述檔 (v3)
* `content.js` - 含有漂浮方塊邏輯的主要內容指令碼
* `content.css` - 漂浮方塊的樣式
* `popup.html` - 擴充功能的彈出介面
* `popup.js` - 處理 `popup.html` 中的邏輯

## 開發指南

### 程式碼風格與慣例

* 使用中文註解以維持與現有程式碼一致
* JavaScript 變數與函式名稱使用 camelCase
* CSS 類別與 ID 使用 kebab-case
* 縮排為 2 個空格
* JavaScript 中需使用分號結尾

### 擴充功能架構

* **Manifest 版本**：3 (Chrome Extension Manifest V3)
* **權限**：僅 `activeTab`（最小權限）
* **內容指令碼**：注入於所有 URL (`<all_urls>`)
* **操作介面**：基於彈出視窗互動

### 核心元件

1. **漂浮方塊建立** (`createFloatingBox()`)

   * 建立可拖曳的方塊元素
   * 避免重複建立
   * 設定初始位置與樣式

2. **拖曳功能** (`makeDraggable()`)

   * 實作以滑鼠為基礎的拖放功能
   * 處理滑鼠事件：mousedown、mousemove、mouseup
   * 拖曳時更新游標狀態

3. **互動功能**

   * 拖曳時提供視覺回饋

### 檔案組織

* 所有文字與註解需維持中文
* CSS 類別應以 `floating-box` 為前綴
* JavaScript 函式應具描述性且模組化

### 測試與開發

* 在多個網站上測試以確保相容性
* 驗證拖曳功能在不同頁面佈局下是否正常運作
* 確認擴充功能不會干擾現有頁面功能

### 常用指令

* 載入擴充功能：使用 Chrome 開發者模式 (chrome://extensions/)
* 偵錯：使用 Chrome DevTools 主控台調試內容指令碼
* 重新載入：於 Chrome 擴充功能頁面使用重新載入按鈕

### 瀏覽器相容性

* **目標**：Chrome/Chromium 瀏覽器
* **Manifest**：需採用 V3 格式
* **API**：標準 DOM API 與 Chrome 擴充功能 API

## 協作注意事項

* 擴充功能名稱與描述為繁體中文
* 核心功能聚焦於簡單的拖曳互動
* 採用最小權限策略以確保安全性
* 使用 Chrome 擴充功能 Manifest V3 的最新標準
