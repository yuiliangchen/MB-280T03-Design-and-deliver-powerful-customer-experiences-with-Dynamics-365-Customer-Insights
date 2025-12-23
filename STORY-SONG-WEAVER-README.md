# 節奏與押韻夥伴（Rhythm & Rhyme Buddy, R2B）

## 系統簡介

節奏與押韻夥伴（R2B）是一個個人化的幼兒學習系統，結合了 AI 歌詞生成、音樂節奏調整、語音辨識和學習監測等功能，為每位幼兒提供量身訂製的學習體驗。

## 功能模組

### 4.2.1-1 故事歌詞編織器（Story-Song Weaver）

#### 4.2.1-1-1 個人化歌詞生成
- 依據每位幼兒的學習目標與進度生成創新歌詞
- 系統會根據使用者檔案中的資訊自動調整內容

#### 4.2.1-1-2 內容客製化
- 可融入特定拼音、常用字、數字或日常步驟
- 由教師或家長在「使用者檔案」中提供

#### 4.2.1-1-3 AI 技術整合
- 利用大型語言模型（LLM）生成內容
- 使用特殊提示技術確保內容語境相關且語法正確
- **注意**：目前使用模擬資料，實際部署時需要連接真實的 LLM API（如 OpenAI、Claude 等）

### 4.2.1-2 節奏共鳴（Rhythm Resonance）

#### 4.2.1-2-1 動態調整
- 動態調整音樂的節奏、旋律與速度
- 根據幼兒的專注度、學習進度及發展需求自動調整

#### 4.2.1-2-2 加權評估
- 透過加權評估指標分析使用表現
- 即時調整內容難度

### 4.2.1-3 和聲助手（Harmony Helper）

#### 4.2.1-3-1 語音辨識
- 利用語音辨識提供即時發音、押韻與聲音參與的回饋
- **注意**：目前使用模擬分析，實際部署時需要連接語音辨識 API（如 Google Speech-to-Text、Azure Speech Services 等）

#### 4.2.1-3-2 矯正提示
- 給予鼓勵性的矯正提示
- 適性調整引導以強化正確發音

### 4.2.1-4 實體設計與互動

#### 4.2.1-4-1 R2B 布偶造型
- R2B 為安全布偶造型，內含隱藏螢幕或高品質喇叭/麥克風系統
- 目前以網頁介面模擬 R2B 的互動功能

#### 4.2.1-4-2 互動提示
- 顏色/燈光提示吸引注意
- 觸覺輸入以促進互動學習（支援瀏覽器震動 API）

### 4.2.1-5 使用者檔案模組

#### 4.2.1-5-1 個人化學習
- 記錄每位幼兒的認知、感官與行為特徵
- 支援高度個人化學習
- 資料儲存在瀏覽器 localStorage 中

### 4.2.1-6 即時監測系統

#### 4.2.1-6-1 學習追蹤
- 追蹤學習進度
- 依據專注度與表現動態調整學習路徑
- 記錄所有動態調整的歷史

## 檔案結構

```
MB-280T03/
├── story-song-weaver.html    # 主系統頁面
├── weaver-styles.css         # 系統專用樣式
├── weaver-script.js          # 核心 JavaScript 邏輯
└── STORY-SONG-WEAVER-README.md  # 本說明文件
```

## 使用方式

### 1. 開啟系統
- 從 `index.html` 點選「節奏與押韻夥伴（Rhythm & Rhyme Buddy, R2B）」連結
- 或直接開啟 `story-song-weaver.html`

### 2. 建立使用者檔案
1. 在「使用者檔案」區塊輸入幼兒姓名
2. 填寫學習目標
3. 輸入特定內容（拼音、常用字、數字、步驟等）
4. 選擇認知發展階段
5. 點擊「儲存檔案」

### 3. 生成個人化歌詞
1. 輸入歌詞主題（如：動物、顏色、季節）
2. 選擇難度等級
3. 點擊「生成歌詞」
4. 系統會根據使用者檔案生成客製化歌詞

### 4. 調整音樂節奏
1. 使用滑桿調整節奏速度（60-180 BPM）
2. 選擇專注度等級
3. 選擇學習進度
4. 系統會自動調整節奏
5. 點擊「播放音樂」開始播放

### 5. 使用語音辨識
1. 點擊「開始錄音」
2. 允許瀏覽器存取麥克風
3. 開始唱歌或說話
4. 點擊「停止錄音」
5. 系統會分析發音並提供回饋

### 6. 查看學習監測
- 系統會自動追蹤學習進度、專注度和表現評分
- 查看「動態調整記錄」了解系統的自動調整

### 7. R2B 互動
- 點擊「顏色提示」、「燈光提示」或「觸覺回饋」
- R2B 會提供相應的互動回饋

## 技術實作

### 前端技術
- HTML5
- CSS3（包含動畫和響應式設計）
- JavaScript (ES6+)
- Web APIs：
  - MediaRecorder API（語音錄音）
  - localStorage API（資料儲存）
  - Vibration API（觸覺回饋）

### 需要整合的外部服務

#### 1. LLM API（歌詞生成）
目前使用模擬資料，實際部署時需要：
- OpenAI GPT API
- Anthropic Claude API
- 或其他 LLM 服務

**整合範例：**
```javascript
async function generateLyricsWithLLM(theme, difficulty, specificContent, learningGoals) {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer YOUR_API_KEY'
        },
        body: JSON.stringify({
            model: 'gpt-4',
            messages: [{
                role: 'user',
                content: `為幼兒創作一首關於「${theme}」的學習歌詞...`
            }]
        })
    });
    const data = await response.json();
    return data.choices[0].message.content;
}
```

#### 2. 語音辨識 API（發音分析）
目前使用模擬分析，實際部署時需要：
- Google Cloud Speech-to-Text
- Azure Speech Services
- Web Speech API（瀏覽器內建，但功能有限）

**整合範例：**
```javascript
async function analyzeAudio(audioBlob) {
    const formData = new FormData();
    formData.append('audio', audioBlob);
    
    const response = await fetch('https://speech.googleapis.com/v1/speech:recognize', {
        method: 'POST',
        headers: {
            'Authorization': 'Bearer YOUR_API_KEY'
        },
        body: formData
    });
    // 處理回應...
}
```

#### 3. 音樂生成 API（可選）
如果需要動態生成音樂：
- Google Magenta
- AIVA
- 或其他音樂生成服務

## 資料儲存

- 使用者檔案儲存在瀏覽器 `localStorage` 中
- 學習監測資料儲存在記憶體中（頁面重新載入會重置）
- **建議**：實際部署時應使用後端資料庫儲存資料

## 瀏覽器相容性

- Chrome/Edge（推薦）
- Firefox
- Safari（部分功能可能受限）
- 需要支援：
  - MediaRecorder API
  - localStorage API
  - CSS Grid 和 Flexbox

## 未來擴充建議

1. **後端整合**
   - 建立後端 API 伺服器
   - 使用資料庫儲存使用者資料和學習記錄
   - 整合真實的 LLM 和語音辨識 API

2. **硬體整合**
   - 連接實際的 R2B 布偶硬體
   - 整合感測器（專注度監測）
   - 連接音響系統

3. **進階功能**
   - 多語言支援
   - 家長/教師儀表板
   - 學習報告生成
   - 社群分享功能

4. **安全性**
   - 使用者認證
   - 資料加密
   - 隱私保護

## 授權與使用

本系統為教育用途開發，可根據需求進行修改和擴充。

## 聯絡資訊

如有問題或建議，請聯繫開發團隊。

