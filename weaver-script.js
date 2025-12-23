// Story-Song Weaver 核心 JavaScript

// 使用者檔案資料
let userProfile = {
    childName: '',
    learningGoals: '',
    specificContent: '',
    cognitiveLevel: 'beginner',
    learningProgress: 0,
    focusLevel: 50,
    performanceScore: 0
};

// 學習監測資料
let monitoringData = {
    learningProgress: 0,
    focusLevel: 50,
    performanceScore: 0,
    adjustments: []
};

// 錄音相關
let isRecording = false;
let mediaRecorder = null;
let audioChunks = [];

// 音樂播放相關
let currentTempo = 120;
let isPlaying = false;

// ========== 使用者檔案模組 ==========
function saveUserProfile() {
    const childName = document.getElementById('childName').value;
    const learningGoals = document.getElementById('learningGoals').value;
    const specificContent = document.getElementById('specificContent').value;
    const cognitiveLevel = document.getElementById('cognitiveLevel').value;

    if (!childName) {
        alert('請輸入幼兒姓名');
        return;
    }

    userProfile = {
        childName,
        learningGoals,
        specificContent,
        cognitiveLevel,
        learningProgress: 0,
        focusLevel: 50,
        performanceScore: 0
    };

    // 儲存到 localStorage
    localStorage.setItem('userProfile', JSON.stringify(userProfile));

    alert(`已儲存 ${childName} 的學習檔案！`);
    updateMonitoringDisplay();
    logAdjustment(`已建立 ${childName} 的使用者檔案`);
}

function loadUserProfile() {
    const saved = localStorage.getItem('userProfile');
    if (saved) {
        userProfile = JSON.parse(saved);
        document.getElementById('childName').value = userProfile.childName || '';
        document.getElementById('learningGoals').value = userProfile.learningGoals || '';
        document.getElementById('specificContent').value = userProfile.specificContent || '';
        document.getElementById('cognitiveLevel').value = userProfile.cognitiveLevel || 'beginner';
        updateMonitoringDisplay();
    }
}

// ========== 故事歌詞編織器模組 ==========
async function generateLyrics() {
    const theme = document.getElementById('lyricTheme').value;
    const difficulty = document.getElementById('lyricDifficulty').value;
    const specificContent = userProfile.specificContent || '';
    const learningGoals = userProfile.learningGoals || '';

    if (!theme) {
        alert('請輸入歌詞主題');
        return;
    }

    const lyricDisplay = document.getElementById('lyricDisplay');
    lyricDisplay.innerHTML = '<p>正在生成個人化歌詞...</p>';

    // 模擬 LLM API 調用（實際應用中需要連接真實的 LLM API）
    try {
        const lyrics = await generateLyricsWithLLM(theme, difficulty, specificContent, learningGoals);
        displayLyrics(lyrics);
        logAdjustment('已生成新的個人化歌詞');
        updateLearningProgress(5);
    } catch (error) {
        lyricDisplay.innerHTML = '<p style="color: red;">生成失敗，請稍後再試</p>';
    }
}

async function generateLyricsWithLLM(theme, difficulty, specificContent, learningGoals) {
    // 這裡應該調用實際的 LLM API（如 OpenAI, Claude 等）
    // 目前使用模擬資料
    
    const prompt = `為幼兒創作一首關於「${theme}」的學習歌詞。
難度等級：${difficulty}
學習目標：${learningGoals}
特定內容：${specificContent}
要求：語境相關、語法正確、適合幼兒學習`;

    // 模擬 API 延遲
    await new Promise(resolve => setTimeout(resolve, 1500));

    // 範例歌詞（實際應用中應從 LLM 獲取）
    const sampleLyrics = {
        easy: `小${theme}，真可愛，
每天學習真愉快。
${specificContent ? specificContent + '，' : ''}一起來，
快樂學習不離開！`,
        medium: `今天我們來認識${theme}，
${specificContent ? specificContent + '，' : ''}真有趣。
跟著節奏一起唱，
學習知識真開心！`,
        hard: `探索${theme}的世界，
${specificContent ? specificContent + '，' : ''}要記住。
用心學習每一天，
成長進步看得見！`
    };

    return sampleLyrics[difficulty] || sampleLyrics.easy;
}

function displayLyrics(lyrics) {
    const lyricDisplay = document.getElementById('lyricDisplay');
    lyricDisplay.innerHTML = `<div class="lyric-content">${lyrics.split('\n').map(line => `<p>${line}</p>`).join('')}</div>`;
}

// ========== 節奏共鳴模組 ==========
function updateTempo(value) {
    currentTempo = parseInt(value);
    document.getElementById('tempoValue').textContent = `${currentTempo} BPM`;
    adjustRhythm();
}

function adjustRhythm() {
    const focusLevel = document.getElementById('focusLevel').value;
    const learningProgress = document.getElementById('learningProgress').value;

    // 根據專注度和學習進度調整節奏
    let adjustedTempo = currentTempo;

    if (focusLevel === 'low') {
        adjustedTempo = Math.max(60, currentTempo - 20);
    } else if (focusLevel === 'high') {
        adjustedTempo = Math.min(180, currentTempo + 20);
    }

    if (learningProgress === 'beginner') {
        adjustedTempo = Math.max(60, adjustedTempo - 15);
    } else if (learningProgress === 'advanced') {
        adjustedTempo = Math.min(180, adjustedTempo + 15);
    }

    document.getElementById('tempo').value = adjustedTempo;
    document.getElementById('tempoValue').textContent = `${adjustedTempo} BPM`;
    currentTempo = adjustedTempo;

    logAdjustment(`節奏已調整為 ${adjustedTempo} BPM（根據專注度：${focusLevel}，學習進度：${learningProgress}）`);
}

function playMusic() {
    if (isPlaying) return;
    
    isPlaying = true;
    const visualizer = document.getElementById('rhythmVisualizer');
    visualizer.style.animation = `pulse ${60/currentTempo}s infinite`;
    
    logAdjustment(`開始播放音樂，節奏：${currentTempo} BPM`);
    updateFocusLevel(10);
}

function stopMusic() {
    isPlaying = false;
    const visualizer = document.getElementById('rhythmVisualizer');
    visualizer.style.animation = 'none';
    logAdjustment('音樂已停止');
}

// ========== 和聲助手模組 ==========
async function startRecording() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);
        audioChunks = [];

        mediaRecorder.ondataavailable = (event) => {
            audioChunks.push(event.data);
        };

        mediaRecorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            analyzeAudio(audioBlob);
        };

        mediaRecorder.start();
        isRecording = true;
        
        document.getElementById('recordBtn').disabled = true;
        document.getElementById('stopBtn').disabled = false;
        document.getElementById('encouragementText').textContent = '正在錄音中...請開始唱歌！';
        
        logAdjustment('開始語音錄音');
    } catch (error) {
        alert('無法存取麥克風，請檢查權限設定');
        console.error('錄音錯誤:', error);
    }
}

function stopRecording() {
    if (mediaRecorder && isRecording) {
        mediaRecorder.stop();
        mediaRecorder.stream.getTracks().forEach(track => track.stop());
        isRecording = false;
        
        document.getElementById('recordBtn').disabled = false;
        document.getElementById('stopBtn').disabled = true;
        document.getElementById('encouragementText').textContent = '正在分析您的發音...';
    }
}

async function analyzeAudio(audioBlob) {
    // 模擬語音辨識分析（實際應用中需要連接語音辨識 API）
    await new Promise(resolve => setTimeout(resolve, 2000));

    // 模擬分析結果
    const pronunciationScore = Math.floor(Math.random() * 30) + 70; // 70-100
    const rhymeScore = Math.floor(Math.random() * 20) + 80; // 80-100

    document.getElementById('pronunciationScore').textContent = `${pronunciationScore}%`;
    document.getElementById('rhymeScore').textContent = `${rhymeScore}%`;

    let encouragement = '';
    if (pronunciationScore >= 90) {
        encouragement = '太棒了！發音非常準確！👏';
    } else if (pronunciationScore >= 80) {
        encouragement = '很好！繼續努力，發音越來越準確了！👍';
    } else {
        encouragement = '不錯的嘗試！多練習幾次會更好，加油！💪';
    }

    document.getElementById('encouragementText').textContent = encouragement;
    
    // 更新表現評分
    const avgScore = (pronunciationScore + rhymeScore) / 2;
    updatePerformanceScore(avgScore);
    updateLearningProgress(3);

    // 顯示發音指導
    displayPronunciationGuide(pronunciationScore);

    logAdjustment(`語音分析完成：發音 ${pronunciationScore}%，押韻 ${rhymeScore}%`);
}

function analyzePronunciation() {
    if (!isRecording) {
        alert('請先開始錄音');
        return;
    }
    stopRecording();
}

function displayPronunciationGuide(score) {
    const guideContent = document.getElementById('guideContent');
    if (score >= 90) {
        guideContent.innerHTML = '<p style="color: green;">✅ 發音完美！繼續保持！</p>';
    } else if (score >= 80) {
        guideContent.innerHTML = '<p style="color: orange;">⚠️ 發音良好，注意語調和節奏</p>';
    } else {
        guideContent.innerHTML = '<p style="color: red;">📝 建議：放慢速度，清晰發音每個字</p>';
    }
}

// ========== 即時監測系統 ==========
function updateMonitoringDisplay() {
    document.getElementById('learningProgressBar').style.width = `${monitoringData.learningProgress}%`;
    document.getElementById('learningProgressText').textContent = `${monitoringData.learningProgress}%`;
    
    document.getElementById('focusProgressBar').style.width = `${monitoringData.focusLevel}%`;
    document.getElementById('focusProgressText').textContent = `${monitoringData.focusLevel}%`;
    
    document.getElementById('performanceScore').textContent = 
        monitoringData.performanceScore > 0 ? `${monitoringData.performanceScore}分` : '--';
}

function updateLearningProgress(increment) {
    monitoringData.learningProgress = Math.min(100, monitoringData.learningProgress + increment);
    updateMonitoringDisplay();
    
    // 根據進度調整學習路徑
    updateLearningPath();
    
    logAdjustment(`學習進度更新：${monitoringData.learningProgress}%`);
}

function updateFocusLevel(increment) {
    monitoringData.focusLevel = Math.min(100, Math.max(0, monitoringData.focusLevel + increment));
    updateMonitoringDisplay();
    
    // 根據專注度動態調整
    if (monitoringData.focusLevel < 30) {
        adjustRhythm(); // 降低節奏
        logAdjustment('專注度較低，已自動調整節奏');
    }
}

function updatePerformanceScore(score) {
    monitoringData.performanceScore = Math.round(score);
    updateMonitoringDisplay();
}

function updateLearningPath() {
    const steps = document.querySelectorAll('.path-step');
    const progress = monitoringData.learningProgress;
    
    steps.forEach((step, index) => {
        step.classList.remove('active', 'completed');
        
        if (progress >= (index + 1) * 33) {
            step.classList.add('completed');
        } else if (progress >= index * 33) {
            step.classList.add('active');
        }
    });
}

function logAdjustment(message) {
    const adjustmentList = document.getElementById('adjustmentList');
    const timestamp = new Date().toLocaleTimeString('zh-TW');
    const logEntry = document.createElement('li');
    logEntry.textContent = `[${timestamp}] ${message}`;
    adjustmentList.insertBefore(logEntry, adjustmentList.firstChild);
    
    // 限制記錄數量
    while (adjustmentList.children.length > 20) {
        adjustmentList.removeChild(adjustmentList.lastChild);
    }
    
    monitoringData.adjustments.push({
        timestamp: new Date().toISOString(),
        message: message
    });
}

// ========== R2B 互動模組 ==========
function triggerR2BInteraction(type) {
    const r2bStatus = document.getElementById('r2bStatus');
    const r2bFace = document.querySelector('.r2b-face');
    const lights = document.querySelectorAll('.light');
    
    switch(type) {
        case 'color':
            r2bStatus.textContent = 'R2B 顯示顏色提示！';
            r2bFace.textContent = '🎨';
            lights.forEach(light => {
                light.style.background = `hsl(${Math.random() * 360}, 70%, 50%)`;
            });
            break;
        case 'light':
            r2bStatus.textContent = 'R2B 閃爍燈光吸引注意！';
            r2bFace.textContent = '✨';
            lights.forEach(light => {
                light.style.animation = 'blink 0.3s infinite';
            });
            break;
        case 'haptic':
            r2bStatus.textContent = 'R2B 提供觸覺回饋！';
            r2bFace.textContent = '🤗';
            // 模擬觸覺回饋（實際應用中需要硬體支援）
            if (navigator.vibrate) {
                navigator.vibrate([100, 50, 100]);
            }
            break;
    }
    
    setTimeout(() => {
        r2bFace.textContent = '😊';
        r2bStatus.textContent = 'R2B 準備就緒，等待互動...';
    }, 3000);
    
    logAdjustment(`R2B 觸發 ${type} 互動`);
    updateFocusLevel(5);
}

// ========== 初始化 ==========
document.addEventListener('DOMContentLoaded', () => {
    loadUserProfile();
    updateMonitoringDisplay();
    logAdjustment('系統已啟動');
    
    // 定期更新專注度（模擬）
    setInterval(() => {
        if (isPlaying || isRecording) {
            const change = Math.random() * 2 - 1; // -1 到 1
            updateFocusLevel(change);
        }
    }, 5000);
});

