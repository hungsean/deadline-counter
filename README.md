# 漂浮小方塊插件 (Chrome 擴充功能)

一個簡單的 Chrome 擴充功能，可在任何網頁上新增可拖曳的漂浮方塊元件。

## 功能特色

* 📦 可拖曳的漂浮方塊，出現在所有網頁上
* 🎨 點擊即可隨機更換顏色
* 🖱️ 流暢的拖放操作
* 🔒 最小權限（僅 `activeTab`）

## 安裝方式

1. 複製或下載此儲存庫
2. 開啟 Chrome 並前往 `chrome://extensions/`
3. 開啟右上角「開發者模式」
4. 點擊「載入未封裝項目」並選擇專案資料夾
5. 此擴充功能即會在所有網頁啟用

## 開發說明

### 專案結構

```plaintext
deadline-counter/
├── manifest.json      # 擴充功能描述檔
├── content.js         # 主要功能
├── content.css        # 樣式檔案
├── popup.html         # 擴充功能彈出視窗
├── popup.js           # 處理 popup.html 中的邏輯
├── CLAUDE.md          # Claude Code 協作文件
└── README.md          # 本文件
```

### Claude Code 協作

本專案已設定 Claude Code 協作。詳見 `CLAUDE.md`，內含專案背景、程式碼規範與開發指南。

### 主要檔案

* **manifest.json**：Chrome 擴充功能 Manifest V3 設定
* **content.js**：包含漂浮方塊建立與拖曳功能
* **content.css**：漂浮方塊樣式
* **popup.html**：擴充功能彈出介面
* **popup.js**：處理 popup.html 中的邏輯

## 技術細節

* **Manifest 版本**：3
* **權限**：`activeTab`（最小權限策略）
* **注入方式**：內容指令碼運行於所有 URL
* **瀏覽器支援**：Chrome/Chromium 瀏覽器

## 使用方式

安裝後，擴充功能會自動在每個網頁加入一個小型漂浮方塊。您可以：

* 拖曳方塊至任意位置
* 點擊方塊更換背景顏色
* 方塊會在同一分頁內持續存在

## 貢獻指南

參與此專案時：

1. 遵循 `CLAUDE.md` 中的程式碼規範
2. 在多個網站測試您的變更
3. 維持中文註解以保持一致性
4. 採用最小權限策略以確保安全性