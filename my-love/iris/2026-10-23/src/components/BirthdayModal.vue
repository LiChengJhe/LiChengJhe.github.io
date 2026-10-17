<template>
  <div v-if="isOpen" class="modal-backdrop" @click.self="close">
    <div class="modal-container glass-card" role="dialog" aria-modal="true">
      <!-- Close Button -->
      <button class="modal-close-btn" @click="close" title="關閉">
        ✕
      </button>

      <!-- Modal Header -->
      <div class="modal-header">
        <div class="header-ribbon">
          <span class="ribbon-icon">🎉</span>
          <span>10/23 專屬生日特輯 • 壽星彥伃</span>
        </div>
        <h2 class="modal-title font-serif">
          Happy Birthday, Iris! 🎂
        </h2>
        <p class="modal-subtitle">
          承哲專屬獻上 • 點擊蛋糕或吹熄蠟燭來許下今年的生日願望吧！
        </p>
      </div>

      <!-- Interactive Birthday Cake -->
      <div class="cake-stage" @click="toggleCandles">
        <div class="cake-container">
          <!-- Cake Plate -->
          <div class="cake-plate"></div>

          <!-- Cake Base Layer -->
          <div class="cake-tier tier-bottom">
            <div class="tier-frosting frosting-bottom"></div>
            <div class="tier-strawberry">🍓 🍓 🍓 🍓 🍓</div>
          </div>

          <!-- Cake Top Layer -->
          <div class="cake-tier tier-top">
            <div class="tier-frosting frosting-top"></div>
            <div class="cream-dollops">
              <span v-for="n in 5" :key="n" class="dollop">☁️</span>
            </div>
          </div>

          <!-- Candles (10 / 23) -->
          <div class="candles-wrap">
            <!-- Candle 1 -->
            <div class="candle candle-1">
              <div v-if="candlesLit" class="candle-flame animate-flicker"></div>
              <div v-else class="candle-smoke">💨</div>
              <div class="candle-wick"></div>
              <div class="candle-stick stick-pink">
                <span class="candle-digit">1</span>
              </div>
            </div>

            <!-- Candle 2 -->
            <div class="candle candle-2">
              <div v-if="candlesLit" class="candle-flame animate-flicker"></div>
              <div v-else class="candle-smoke">💨</div>
              <div class="candle-wick"></div>
              <div class="candle-stick stick-gold">
                <span class="candle-digit">0</span>
              </div>
            </div>

            <!-- Heart / Slash separator -->
            <div class="candle-heart">💖</div>

            <!-- Candle 3 -->
            <div class="candle candle-3">
              <div v-if="candlesLit" class="candle-flame animate-flicker"></div>
              <div v-else class="candle-smoke">💨</div>
              <div class="candle-wick"></div>
              <div class="candle-stick stick-gold">
                <span class="candle-digit">2</span>
              </div>
            </div>

            <!-- Candle 4 -->
            <div class="candle candle-4">
              <div v-if="candlesLit" class="candle-flame animate-flicker"></div>
              <div v-else class="candle-smoke">💨</div>
              <div class="candle-wick"></div>
              <div class="candle-stick stick-pink">
                <span class="candle-digit">3</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Action Button -->
      <div class="cake-actions">
        <button
          v-if="candlesLit"
          class="btn btn-primary btn-blow animate-pulse-glow"
          @click="blowCandles"
        >
          <span>💨</span>
          <span>許願吹蠟燭 (點我吹熄)</span>
        </button>

        <button
          v-else
          class="btn btn-gold btn-relight"
          @click="relightCandles"
        >
          <span>✨</span>
          <span>再點一次蠟燭許願</span>
        </button>

        <button class="btn btn-outline" @click="sendHeart">
          <span>💖</span>
          <span>送出滿滿愛心 ({{ heartCount }})</span>
        </button>
      </div>

      <!-- Birthday Letter from 承哲 to 彥伃 -->
      <div class="letter-card" :class="{ 'letter-revealed': !candlesLit }">
        <div class="letter-stamp">
          <span>💌</span>
          <span>承哲的心意</span>
        </div>
        <h3 class="letter-title font-serif">給最親愛的彥伃：</h3>
        <div class="letter-body font-serif">
          <p>
            祝我最愛的女孩、我心裡唯一的 Iris，10/23 生日快樂！🎂✨
          </p>
          <p>
            能和妳在一起的每一天，對我來說都是無比幸福的恩賜。今年秋天，我特別送給妳這趟關西來回機票作為生日禮物，牽著妳的手漫步在秋日關西，每一刻都是我們專屬的甜蜜回憶。
          </p>
          <p>
            看著妳在心齋橋拿著自嘲熊吊飾笑得像個小女孩、在宇治表參道喝著抹茶拿鐵、在任天堂博物館一起手忙腳亂拍打巨大手把、在伊根舟屋依偎著我吹海風餵海鷗、在琵琶湖山谷俯瞰蔚藍湖景並在童話草屋拍美照、一起挑選明日的早餐，還有在環球影城戴著手環敲磚塊、揮舞魔杖遊玩、在芙莉蓮餐廳為妳慶生，晚上還一起在三根掃帚餐廳點了萬聖節套餐！以及我們牽著手去《Resident Evil Requiem》看里昂和挑戰殭屍工廠——雖然現場真的很可怕，但只要有我在，我永遠都會第一時間擋在妳身前保護妳！
          </p>
          <p class="modal-next-trip">
            ✨ <strong>我藏在心底、最想對妳說的心願：</strong><br />
            回到台灣翻看照片時，我的心裡其實最期待一件事——<strong>我真的好希望、好期待下一次，能和妳兩個人單獨一起出國旅遊！</strong><br />
            只有我們兩個人，不必在乎任何繁瑣的行程，手牽著手睡到自然醒，踩著我們最舒服的步調漫步異國街頭。只要身邊是妳，世界上任何風景都是最美的。
          </p>
          <p class="modal-proposal">
            💍 <strong>悄悄藏在心底的真心話：</strong><br />
            雖然這一次在關西向妳求婚，妳還沒有準備好答應我，但完全沒關係，我會用更多的愛和行動讓妳安心踏實。我會繼續努力，<strong>希望下一次當我再次拿出戒指、向妳求婚的時候，妳可以甜甜地對我點頭答應我：「好，我願意！」💍✨</strong>
          </p>
          <p>
            願我的寶貝新的一歲平安順心、天天笑逐顏開。未來的每一個生日與每一次旅行，我都會一直牽著妳的手，永遠當妳最堅強的依靠，繼續寵妳、深愛妳。❤️
          </p>
          <div class="letter-signature">
            <span class="sig-title">永遠愛妳的男友</span>
            <span class="sig-name font-display">承哲 筆 💖</span>
            <span class="sig-date">2026 年 10 月 23 日 • 關西旅程回憶與慶生獻禮 🎂</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { triggerBirthdayConfetti, triggerHeartBurst } from '../utils/confetti'
import { soundSynthesizer } from '../utils/sound'

defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'close'): void
}>()

const candlesLit = ref(true)
const heartCount = ref(99)

function close() {
  emit('close')
}

function toggleCandles() {
  if (candlesLit.value) {
    blowCandles()
  } else {
    relightCandles()
  }
}

function blowCandles() {
  candlesLit.value = false
  soundSynthesizer.playBlowCandleSound()
  soundSynthesizer.playBirthdayChime()
  triggerBirthdayConfetti()
}

function relightCandles() {
  candlesLit.value = true
  triggerHeartBurst(0.5, 0.4)
}

function sendHeart() {
  heartCount.value++
  triggerHeartBurst(Math.random() * 0.4 + 0.3, Math.random() * 0.4 + 0.3)
}
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  z-index: 999;
  background: rgba(18, 21, 36, 0.75);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
  overflow-y: auto;
  animation: fadeIn 0.3s ease;
}

.modal-container {
  position: relative;
  width: 100%;
  max-width: 680px;
  background: rgba(255, 255, 255, 0.96);
  border: 2px solid rgba(232, 99, 128, 0.3);
  border-radius: var(--radius-xl);
  padding: 2.5rem 2rem;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.25), 0 0 35px rgba(232, 99, 128, 0.35);
}

.modal-close-btn {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: rgba(255, 255, 255, 0.9);
  color: var(--text-secondary);
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.modal-close-btn:hover {
  background: var(--primary-maple);
  color: white;
  transform: rotate(90deg);
}

.modal-header {
  text-align: center;
  margin-bottom: 1.5rem;
}

.header-ribbon {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  background: var(--accent-blush-soft);
  color: var(--accent-blush);
  font-size: 0.85rem;
  font-weight: 700;
  padding: 0.3rem 1rem;
  border-radius: var(--radius-full);
  margin-bottom: 0.6rem;
  border: 1px solid rgba(232, 99, 128, 0.25);
}

.modal-title {
  font-size: 2rem;
  font-weight: 900;
  color: var(--kyoto-indigo);
  margin-bottom: 0.4rem;
}

.modal-subtitle {
  font-size: 0.95rem;
  color: var(--text-secondary);
}

/* Cake Stage */
.cake-stage {
  display: flex;
  justify-content: center;
  padding: 2.5rem 0 1.5rem;
  cursor: pointer;
  user-select: none;
}

.cake-container {
  position: relative;
  width: 240px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cake-plate {
  position: absolute;
  bottom: -6px;
  width: 270px;
  height: 16px;
  background: linear-gradient(180deg, #e8d8c8, #cbb5a0);
  border-radius: 50%;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
  z-index: 1;
}

.cake-tier {
  position: relative;
  border-radius: 14px 14px 10px 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.tier-bottom {
  width: 230px;
  height: 65px;
  background: linear-gradient(180deg, #ffd3b6, #ffaaa5);
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
}

.frosting-bottom {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 16px;
  background: #fff8f0;
  border-radius: 14px 14px 8px 8px;
}

.tier-strawberry {
  font-size: 1.1rem;
  letter-spacing: 0.3rem;
  margin-top: 10px;
}

.tier-top {
  width: 170px;
  height: 55px;
  background: linear-gradient(180deg, #ffaaa5, #e86380);
  z-index: 3;
  margin-bottom: -4px;
}

.frosting-top {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 14px;
  background: #ffffff;
  border-radius: 14px 14px 8px 8px;
}

.cream-dollops {
  display: flex;
  justify-content: space-around;
  padding: 0 0.5rem;
  margin-top: -8px;
}

.dollop {
  font-size: 0.95rem;
  filter: drop-shadow(0 2px 2px rgba(0,0,0,0.1));
}

/* Candles */
.candles-wrap {
  position: absolute;
  top: -38px;
  display: flex;
  align-items: flex-end;
  gap: 0.8rem;
  z-index: 4;
}

.candle {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.candle-wick {
  width: 2px;
  height: 7px;
  background: #333;
}

.candle-flame {
  width: 12px;
  height: 20px;
  background: radial-gradient(circle at 50% 80%, #fff 20%, #ffbe0b 50%, #fb5607 100%);
  border-radius: 50% 50% 35% 35%;
  box-shadow: 0 0 12px rgba(255, 170, 0, 0.9);
  margin-bottom: -1px;
}

.candle-smoke {
  font-size: 0.85rem;
  opacity: 0.7;
  animation: floatSlow 2s infinite;
}

.candle-stick {
  width: 20px;
  height: 36px;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 1.05rem;
  color: white;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.stick-pink {
  background: linear-gradient(180deg, #ff758c, #ff7eb3);
}

.stick-gold {
  background: linear-gradient(180deg, #f9d423, #ff4e50);
}

.candle-heart {
  font-size: 1.1rem;
  margin-bottom: 8px;
  animation: heartBeat 1.5s infinite;
}

/* Cake Actions */
.cake-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.85rem;
  margin-bottom: 2rem;
}

.btn-blow {
  font-size: 1.05rem;
  padding: 0.85rem 1.75rem;
}

/* Letter */
.letter-card {
  background: #fffdf9;
  border: 1.5px dashed rgba(229, 169, 60, 0.5);
  border-radius: var(--radius-lg);
  padding: 2rem;
  position: relative;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.04);
}

.letter-stamp {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  background: var(--accent-ginkgo-light);
  color: var(--accent-ginkgo-dark);
  font-weight: 700;
  font-size: 0.8rem;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(229, 169, 60, 0.3);
}

.letter-title {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--primary-maple-dark);
  margin-bottom: 1rem;
}

.letter-body {
  font-size: 0.98rem;
  line-height: 1.9;
  color: #3f3935;
}

.letter-body p {
  margin-bottom: 1rem;
}

.letter-signature {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px solid rgba(184, 59, 50, 0.1);
}

.sig-title {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.sig-name {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--primary-maple);
  margin: 0.2rem 0;
}

.modal-next-trip {
  background: rgba(232, 99, 128, 0.08);
  border: 1.5px dashed rgba(232, 99, 128, 0.45);
  border-radius: var(--radius-md);
  padding: 0.85rem 1rem;
  color: #88221b;
  margin: 1rem 0 !important;
}

.modal-proposal {
  background: linear-gradient(135deg, rgba(255, 240, 245, 0.95), rgba(254, 247, 235, 0.95));
  border: 1.5px solid rgba(229, 169, 60, 0.6);
  border-radius: var(--radius-md);
  padding: 0.85rem 1rem;
  color: #7a201a;
  margin: 1rem 0 !important;
  box-shadow: 0 4px 12px rgba(229, 169, 60, 0.1);
}

.sig-date {
  font-size: 0.8rem;
  color: var(--text-secondary);
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@media (max-width: 640px) {
  .modal-backdrop {
    padding: 0.75rem;
  }

  .modal-container {
    padding: 2rem 1.25rem 1.5rem;
    max-height: 94vh;
  }

  .modal-title {
    font-size: 1.5rem;
  }

  .cake-stage {
    padding: 1.5rem 0 1rem;
    transform: scale(0.85);
    transform-origin: center;
  }

  .cake-actions {
    flex-direction: column;
    width: 100%;
  }

  .cake-actions .btn {
    width: 100%;
    justify-content: center;
  }

  .letter-card {
    padding: 1.25rem 1rem;
  }

  .letter-stamp {
    position: static;
    margin-bottom: 0.75rem;
    display: inline-flex;
  }
}
</style>
