<template>
  <section class="proposal" aria-labelledby="proposal-title">
    <div class="proposal__content">
      <div class="proposal__header fade-up">
        <h2 id="proposal-title">在這個特別的夜晚</h2>
        <p>
          想邀請妳一起走向下一段旅程。跟著小小的互動，慢慢揭開我準備的驚喜吧。
        </p>
      </div>

      <div class="proposal__card fade-up" :class="`proposal__card--step-${step}`">
        <template v-if="step === 1">
          <h3>Step 1｜開啟密語</h3>
          <p>按下按鈕，讓我寫給妳的話語綻放。</p>
          <button class="btn-primary" @click="revealLetter">開啟愛的信件</button>
          <transition name="fade">
            <blockquote v-if="letterOpened" class="proposal__letter">
              親愛的寶貝，謝謝妳讓我感受到被愛與被需要，每一天都想把宇宙的溫柔和希望捧給妳。
            </blockquote>
          </transition>
        </template>

        <template v-else-if="step === 2">
          <h3>Step 2｜收集勇氣</h3>
          <p>拖曳愛心滑桿，當勇氣值滿格，就會看見最重要的驚喜。</p>
          <div class="proposal__slider">
            <input
              v-model="courage"
              type="range"
              min="0"
              max="100"
              step="1"
              @input="handleCourage"
            />
            <span class="proposal__slider-value">{{ courage }}%</span>
          </div>
          <p class="proposal__hint">現在的勇氣值：{{ courageMessage }}</p>
        </template>

        <template v-else>
          <h3>Step 3｜我要和妳說</h3>
          <p>是妳，讓我開始相信永久的模樣。</p>
          <div class="proposal__ring" role="img" aria-label="求婚戒指動畫">
            <div class="proposal__ring-inner"></div>
            <div class="proposal__ring-gem"></div>
            <div class="proposal__ring-sparkle proposal__ring-sparkle--one"></div>
            <div class="proposal__ring-sparkle proposal__ring-sparkle--two"></div>
          </div>
          <p class="proposal__question">Will you marry me?</p>
          <div class="proposal__answers">
            <button class="btn-primary" @click="triggerConfetti">YES！我願意</button>
            <button class="btn-secondary" @click="playfulDecline">再想一下好嗎？</button>
          </div>
          <p v-if="playfulMessage" class="proposal__playful">{{ playfulMessage }}</p>
        </template>
      </div>
    </div>

    <transition name="fade">
      <div v-if="confettiPieces.length" class="proposal__confetti" aria-hidden="true">
        <span v-for="piece in confettiPieces" :key="piece.id" class="proposal__confetti-piece" :style="piece.style"></span>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { computed, onUnmounted, ref } from 'vue';

const step = ref(1);
const letterOpened = ref(false);
const courage = ref(0);
const playfulMessage = ref('');
const confettiPieces = ref([]);
let confettiTimer = null;

const courageMessage = computed(() => {
  if (courage.value < 30) return '需要一點點勇氣；我會陪著妳。';
  if (courage.value < 70) return '越來越接近，我的心也跳得更快。';
  if (courage.value < 100) return '只差一步，讓我們一起跨越吧！';
  return '勇氣滿格，我聽見妳的心了。';
});

const revealLetter = () => {
  letterOpened.value = true;
  setTimeout(() => {
    step.value = 2;
  }, 1800);
};

const handleCourage = () => {
  if (Number(courage.value) >= 100) {
    setTimeout(() => {
      step.value = 3;
    }, 600);
  }
};

const triggerConfetti = () => {
  playfulMessage.value = '歡迎來到我們的幸福旅程，牽著你的手直到天荒地老。';
  launchConfetti();
};

const playfulDecline = () => {
  playfulMessage.value = '我會一直等到妳點下「Yes」那刻，因為我知道答案早藏在妳的眼裡。';
};

const launchConfetti = () => {
  const total = 60;
  confettiPieces.value = Array.from({ length: total }, (_, index) => ({
    id: index,
    style: {
      left: `${Math.random() * 100}%`,
      backgroundColor: index % 3 === 0 ? '#f45d90' : index % 3 === 1 ? '#ffc2d6' : '#fff6f9',
      animationDelay: `${Math.random()}s`,
      animationDuration: `${4 + Math.random() * 2}s`
    }
  }));

  clearTimeout(confettiTimer);
  confettiTimer = setTimeout(() => {
    confettiPieces.value = [];
  }, 6000);
};

onUnmounted(() => {
  clearTimeout(confettiTimer);
});
</script>

<style scoped>
.proposal {
  position: relative;
  padding-block: clamp(4rem, 10vw, 9rem);
}

.proposal__content {
  position: relative;
  z-index: 2;
}

.proposal__header {
  text-align: center;
  max-width: 640px;
  margin: 0 auto 3rem;
}

.proposal__header p {
  margin-top: 1rem;
  color: var(--text-muted);
}

.proposal__card {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 230, 240, 0.9));
  border-radius: 32px;
  padding: clamp(2.4rem, 6vw, 3.6rem);
  box-shadow: 0 24px 60px rgba(244, 93, 144, 0.22);
  max-width: 720px;
  margin: 0 auto;
  display: grid;
  gap: 1.5rem;
  text-align: center;
}

.proposal__letter {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 24px;
  padding: 1.8rem;
  font-style: italic;
  line-height: 1.6;
  color: var(--text-muted);
  margin-top: 1rem;
  box-shadow: inset 0 0 0 2px rgba(244, 93, 144, 0.15);
}

.proposal__slider {
  display: grid;
  gap: 0.75rem;
  align-items: center;
}

.proposal__slider input[type='range'] {
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  height: 14px;
  border-radius: 999px;
  background: linear-gradient(90deg, var(--secondary), rgba(255, 255, 255, 0.5));
  outline: none;
  overflow: hidden;
}

.proposal__slider input[type='range']::-webkit-slider-thumb {
  appearance: none;
  -webkit-appearance: none;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: var(--primary);
  box-shadow: 0 0 0 6px rgba(244, 93, 144, 0.18);
}

.proposal__slider-value {
  font-weight: 600;
  color: var(--primary-dark);
}

.proposal__hint {
  color: var(--text-muted);
}

.proposal__ring {
  position: relative;
  width: 220px;
  height: 220px;
  margin: 0 auto;
  border-radius: 50%;
  border: 12px solid rgba(255, 255, 255, 0.65);
  display: grid;
  place-items: center;
  animation: floatSlow 5s ease-in-out infinite;
  box-shadow: 0 24px 70px rgba(244, 93, 144, 0.3);
}

.proposal__ring-inner {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 6px dashed rgba(255, 194, 214, 0.6);
  animation: rotate 9s linear infinite;
}

.proposal__ring-gem {
  position: absolute;
  top: -20px;
  width: 80px;
  height: 80px;
  border-radius: 20% 80% 30% 70% / 45% 55% 45% 55%;
  background: linear-gradient(135deg, #fff8fc, #ffe0f3);
  box-shadow: 0 18px 40px rgba(244, 93, 144, 0.28);
}

.proposal__ring-sparkle {
  position: absolute;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.9), transparent 70%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  animation: twinkle 2.4s ease-in-out infinite;
}

.proposal__ring-sparkle--one {
  top: 12%;
  right: 16%;
}

.proposal__ring-sparkle--two {
  bottom: 18%;
  left: 18%;
  animation-delay: 0.9s;
}

.proposal__question {
  font-size: 2rem;
  letter-spacing: 0.08em;
}

.proposal__answers {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.proposal__playful {
  margin-top: 1rem;
  color: var(--text-muted);
}

.proposal__confetti {
  position: fixed;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 10;
}

.proposal__confetti-piece {
  position: absolute;
  top: -10%;
  width: 10px;
  height: 26px;
  border-radius: 4px;
  animation: confettiFall linear forwards;
  opacity: 0.85;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes confettiFall {
  0% {
    transform: translate3d(0, 0, 0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  100% {
    transform: translate3d(-20px, 110vh, 0) rotate(360deg);
    opacity: 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 720px) {
  .proposal__card {
    padding: 2rem;
  }
}
</style>
