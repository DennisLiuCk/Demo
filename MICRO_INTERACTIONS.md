# 微互動 (Micro-Interactions) 功能說明

本文檔詳細說明了作品集網站中實現的各種 Apple 風格微互動效果。

---

## 🎯 微互動概述

微互動是小型、專注的互動設計，為用戶提供即時反饋並增強整體體驗。這些細節雖小，但對創造精緻、專業的用戶體驗至關重要。

---

## ✨ 已實現的微互動

### 1. **滾動進度指示器 (Scroll Progress Indicator)**

**位置**: 頁面最頂部
**功能**: 顯示用戶在頁面中的滾動進度

**技術細節**:
```css
.scroll-progress-bar {
    height: 3px;
    background: linear-gradient(90deg, #0071e3, #2e8df5);
    box-shadow: 0 0 10px rgba(0, 113, 227, 0.5);
}
```

**特點**:
- 流暢的漸變色（Apple Blue）
- 微妙的光暈效果
- 實時更新，無延遲
- 使用 `cubic-bezier` 緩動函數

**實現邏輯**:
```javascript
function updateScrollProgress() {
    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
    scrollProgress.style.width = scrollPercent + '%';
}
```

---

### 2. **Section 淡入動畫 (Fade-in on Scroll)**

**觸發**: 當 section 元素進入視野時
**功能**: 漸進式顯示內容，創造層次感

**受影響的元素**:
- Timeline items
- Skill categories
- AI tool cards
- Focus items
- Education cards
- Section titles

**技術細節**:
```javascript
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -80px 0px'
};
```

**動畫參數**:
- **不透明度**: 0 → 1
- **位移**: translateY(30px) → translateY(0)
- **持續時間**: 0.6s
- **緩動**: cubic-bezier(0.4, 0, 0.2, 1)
- **錯開延遲**: 每個元素延遲 0.1s（創造波浪效果）

**Apple 設計原則**:
- 使用 Intersection Observer API（性能優化）
- 微妙的運動（30px，不是過度的 100px）
- 流暢的緩動曲線

---

### 3. **3D 卡片傾斜效果 (3D Card Tilt)**

**位置**: Skill categories, AI tool cards, Focus items
**觸發**: 鼠標移動在卡片上

**功能**: 根據鼠標位置產生微妙的 3D 傾斜效果

**技術實現**:
```javascript
card.addEventListener('mousemove', (e) => {
    const rotateX = (y - centerY) / 30;
    const rotateY = (centerX - x) / 30;

    card.style.transform = `perspective(1000px)
                            rotateX(${rotateX}deg)
                            rotateY(${rotateY}deg)
                            translateY(-4px)
                            scale(1.01)`;
});
```

**參數說明**:
- **Perspective**: 1000px（3D 透視深度）
- **旋轉範圍**: ±30 度除數（非常微妙）
- **提升**: 4px
- **縮放**: 1.01（幾乎察覺不到）

**CSS 支持**:
```css
.skill-category {
    transform-style: preserve-3d;
    will-change: transform;
    transition: transform 0.1s ease-out;
}
```

**用戶體驗**:
- 創造深度感和真實感
- 鼠標離開時平滑復原
- 不會過度誇張（符合 Apple 的克制美學）

---

### 4. **按鈕互動增強 (Enhanced Button Interactions)**

**功能**: 為所有按鈕添加平滑的 hover 反饋

**實現**:
```javascript
button.addEventListener('mouseenter', () => {
    button.style.transform = 'translateY(-1px)';
});

button.addEventListener('mouseleave', () => {
    button.style.transform = 'translateY(0)';
});
```

**視覺效果**:
- **Hover**: 輕微上浮（-1px）
- **陰影**: 彩色光暈
- **過渡**: 0.2s cubic-bezier

**CSS**:
```css
.btn-primary:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 16px rgba(0, 113, 227, 0.3);
}
```

**符合 Apple 原則**:
- 微妙的運動（1px，不是 5px）
- 使用品牌色的陰影
- 快速反應（200ms）

---

### 5. **頁面加載動畫 (Page Load Fade-in)**

**觸發**: 頁面首次加載
**功能**: 避免突兀的內容閃現

**實現**:
```javascript
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';

    setTimeout(() => {
        document.body.style.transition = 'opacity 0.4s ease-out';
        document.body.style.opacity = '1';
    }, 100);
});
```

**時間線**:
1. 頁面開始載入 → body opacity: 0
2. 延遲 100ms（確保 DOM 準備就緒）
3. 淡入動畫 0.4s
4. 完全可見

**用戶體驗**:
- 創造優雅的首次印象
- 避免"跳躍"感
- 平滑過渡

---

### 6. **導航欄滾動效果 (Navbar Scroll Shadow)**

**功能**: 滾動時為導航欄添加陰影

**實現**:
```javascript
if (currentScroll > 50) {
    navbar.classList.add('scrolled');
}
```

**CSS**:
```css
.navbar.scrolled {
    box-shadow: var(--shadow-sm);
}
```

**Apple 特色**:
- 微妙的陰影（不明顯但有存在感）
- 僅在滾動 50px 後觸發
- Backdrop blur 效果增強深度

---

### 7. **導航連結動畫 (Nav Link Underline)**

**功能**: Hover 時下劃線從中心向兩側展開

**CSS**:
```css
.nav-link::after {
    width: 0;
    left: 50%;
    transform: translateX(-50%);
}

.nav-link:hover::after {
    width: 100%;
}
```

**特點**:
- 從中心展開（更優雅）
- 1px 細線（精緻）
- 使用品牌色

---

### 8. **技能標籤互動 (Skill Tag Hover)**

**功能**: Hover 時放大並顯示彩色陰影

**CSS**:
```css
.skill-tag:hover {
    transform: scale(1.08);
    box-shadow: 0 2px 8px rgba(0, 113, 227, 0.3);
}
```

**視覺變化**:
- 背景：灰色 → Apple Blue
- 文字：黑色 → 白色
- 縮放：1 → 1.08
- 陰影：無 → 彩色光暈

---

### 9. **Timeline 水平移動 (Timeline Horizontal Shift)**

**功能**: Hover 時時間軸項目輕微右移

**CSS**:
```css
.timeline-content:hover {
    transform: translateX(4px);
}
```

**為什麼水平移動？**
- 創造視覺趣味
- 與垂直時間軸形成對比
- 4px 是剛好可察覺的距離

---

## 🎨 設計原則總結

### Apple 微互動的核心原則：

1. **微妙性 (Subtlety)**
   - 小幅度的運動（1-6px）
   - 低調的陰影和光暈
   - 避免過度動畫

2. **快速性 (Speed)**
   - 大多數動畫 150-200ms
   - 使用 cubic-bezier 緩動
   - 無延遲的反饋

3. **目的性 (Purpose)**
   - 每個動畫都有明確目的
   - 提供視覺反饋
   - 增強用戶理解

4. **一致性 (Consistency)**
   - 統一的緩動函數
   - 一致的動畫時長
   - 相似元素相似行為

5. **性能 (Performance)**
   - 使用 `will-change` 提示瀏覽器
   - Intersection Observer 而非 scroll 事件
   - GPU 加速的 transform

---

## 🔧 技術實現亮點

### 1. **Intersection Observer**
- 比傳統 scroll 監聽更高效
- 自動處理可見性
- 支援複雜的觸發條件

### 2. **CSS Transform**
- GPU 加速
- 不觸發 reflow
- 流暢的 60fps 動畫

### 3. **Will-change 屬性**
```css
will-change: transform;
```
- 提前告知瀏覽器優化
- 提升動畫性能
- 謹慎使用（不要濫用）

### 4. **Transform-style: preserve-3d**
```css
transform-style: preserve-3d;
```
- 啟用 3D 渲染上下文
- 支援 3D 傾斜效果
- 創造真實深度

---

## 📊 性能考量

### 優化策略：

1. **事件節流**
   - 滾動事件已優化
   - 使用 requestAnimationFrame

2. **選擇性動畫**
   - 僅在需要時啟用
   - Hover 才觸發複雜效果

3. **硬體加速**
   - 使用 transform 而非 position
   - 啟用 GPU 渲染

4. **延遲加載**
   - Intersection Observer 自動管理
   - 元素進入視野才動畫

---

## 🚀 未來可擴展的微互動

可考慮添加的額外效果：

1. **視差滾動 (Parallax)**
   - Hero 背景輕微移動
   - 創造深度層次

2. **數字動畫 (Number Counter)**
   - 技能百分比動態計數
   - 統計數據滾動顯示

3. **路徑動畫 (Path Animation)**
   - SVG 圖標繪製效果
   - 連接線動畫

4. **顏色過渡 (Color Transitions)**
   - 主題色動態變化
   - 深色模式切換動畫

5. **粒子效果 (Particle Effects)**
   - 鼠標移動跟隨
   - 點擊漣漪效果

---

## 📱 響應式考量

### 移動設備優化：

```javascript
// 檢測觸控設備
const isTouchDevice = 'ontouchstart' in window;

if (!isTouchDevice) {
    // 僅在非觸控設備啟用 3D 傾斜
    enableCardTilt();
}
```

**原因**:
- 觸控設備無 hover 狀態
- 避免不必要的計算
- 節省電池壽命

---

## 🎓 學習要點

從這些微互動中學到：

1. **克制的重要性**
   - 不是越多越好
   - 微妙勝於誇張

2. **性能優先**
   - 流暢 > 華麗
   - 60fps 是基準

3. **用戶反饋**
   - 即時響應
   - 清晰的視覺提示

4. **細節決定品質**
   - 1px 的差異很重要
   - 緩動函數影響感覺

5. **系統化思維**
   - 統一的動畫語言
   - 可複用的模式

---

**最後更新**: 2025-11-09
**實現狀態**: ✅ 已完成並測試
