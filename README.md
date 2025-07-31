# Deadline Counter

## 簡介

Deadline Counter 是一個 Chrome 擴充功能，主要功能是「計算距離死線多久的小工具」。

## 安裝說明

1. 前往 Chrome 瀏覽器的「擴充功能」頁面 (`chrome://extensions`)。
2. 啟用右上角的「開發人員模式」。
3. 點擊「載入未封裝項目」，並選擇本專案的資料夾。

## 實作原理

本擴充功能主要由以下幾個部分構成：

*   **Popup (`popup/`)**: 使用者點擊擴充功能圖示時所看到的介面，可以在此設定新的 deadline。
*   **Content Script (`content/`)**: 在使用者瀏覽的頁面上注入腳本，用以顯示倒數計時的介面。
*   **Manifest (`manifest.json`)**: 定義擴充功能的元數據、權限以及所需的檔案。

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
