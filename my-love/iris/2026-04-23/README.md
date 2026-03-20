# Romantic Celebration SPA

一個以 Vue 3 + Vite 打造的溫馨浪漫一頁式網頁，為摯愛獻上生日祝福並發出求婚邀約。專案具有細膩互動、動畫效果與清晰的程式結構，方便後續維護與擴充。

## ✨ 特色亮點

- **暖心開場**：Hero 區塊搭配真摯文案與戒指動畫，立即營造浪漫氛圍。
- **回憶時間軸**：以視覺化步驟呈現重要時刻，採用淡入與錯位排版帶出故事感。
- **祝福互動卡片**：使用者可點擊卡片逐一展開祝福訊息，加深參與感。
- **求婚體驗**：三步驟互動（信件揭示、勇氣滑桿、求婚戒指動畫）搭配彩帶特效，創造驚喜感。
- **可播放旋律**：透過 Web Audio API 動態生成簡短旋律，增添專屬儀式感。
- **易於擴充**：採元件化與註解設計，方便替換文案、顏色或添加新互動。

## 📦 使用技術

- [Vue 3](https://vuejs.org/)
- [Vite](https://vitejs.dev/)
- CSS3 動畫（keyframes、transitions）
- Web Audio API（播放自訂旋律）

## 🚀 快速開始

```bash
npm install
npm run dev
```

開啟瀏覽器並造訪 `http://localhost:5173` 即可查看效果。

## 🧱 專案結構

```
├─ index.html               # 入口 HTML，載入字體與 Vue App
├─ vite.config.js           # Vite 設定
├─ src
│  ├─ main.js               # Vue 進入點
│  ├─ App.vue               # 主頁面布局與旅程流程
│  ├─ styles
│  │  └─ global.css         # 全域樣式與動畫基礎
│  └─ components            # 元件區塊
│     ├─ FloatingHearts.vue # 背景漂浮愛心效果
│     ├─ HeroSection.vue    # 首屏生日祝福
│     ├─ LoveTimeline.vue   # 愛情故事時間軸
│     ├─ ProposalInteractive.vue # 求婚互動流程
│     └─ WishSection.vue    # 祝福卡片切換
└─ package.json             # 相依與 script 設定
```

## 🔧 客製化建議

- **主題色彩**：在 `src/styles/global.css` 中調整 `:root` 中的色票。
- **文案內容**：各元件的故事與祝福語皆集中於其 `script setup` 區塊，可快速替換。
- **動畫節奏**：調整 `fadeUp`、`floatSlow` 等 keyframes 即可微調動態節奏。

## 🧪 品質建議

- 本專案使用 Vite 原生工具鏈，可進一步加入 ESLint、Prettier 或單元測試以符合團隊規範。
- 若需部署 GitHub Pages，執行 `npm run build` 後將 `dist` 目錄上傳即可。

---

祝妳（你）與心愛的人生日快樂、永浴愛河！💍
