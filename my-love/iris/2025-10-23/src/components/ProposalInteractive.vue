<template>
  <section class="proposal" aria-labelledby="proposal-title">
    <div class="proposal__background" aria-hidden="true">
      <span class="proposal__glow proposal__glow--one"></span>
      <span class="proposal__glow proposal__glow--two"></span>
      <span class="proposal__halo proposal__halo--outer"></span>
      <span class="proposal__halo proposal__halo--inner"></span>
      <span class="proposal__beam proposal__beam--one"></span>
      <span class="proposal__beam proposal__beam--two"></span>
    </div>

    <div class="proposal__petals" aria-hidden="true">
      <span
        v-for="petal in petals"
        :key="petal.id"
        class="proposal__petal"
        :style="getPetalStyle(petal)"
      >
        ❀
      </span>
    </div>

    <div class="proposal__content">
      <div class="proposal__header fade-up">
        <h2 id="proposal-title">在這個特別的夜晚</h2>
        <p>想邀請妳一起走向下一段旅程。跟著小小的互動，慢慢揭開我準備的驚喜吧。</p>
      </div>

      <div class="proposal__progress fade-up" role="group" aria-label="求婚驚喜進度">
        <div
          class="proposal__progress-track"
          role="progressbar"
          :aria-valuenow="step"
          aria-valuemin="1"
          aria-valuemax="3"
        >
          <span class="proposal__progress-bar" :style="{ width: `${stepProgress}%` }"></span>
        </div>
        <ul class="proposal__steps">
          <li
            v-for="(item, index) in stepsMeta"
            :key="item.id"
            class="proposal__step"
            :class="{
              'is-active': step >= index + 1,
              'is-current': step === index + 1
            }"
            :aria-current="step === index + 1 ? 'step' : undefined"
          >
            <span class="proposal__step-indicator">
              <span class="proposal__step-number">{{ index + 1 }}</span>
              <span class="proposal__step-glow"></span>
            </span>
            <span class="proposal__step-label">{{ item.label }}</span>
          </li>
        </ul>
      </div>

      <div class="proposal__card-container fade-up" :class="`proposal__card-container--step-${step}`">
        <div class="proposal__card" :class="`proposal__card--step-${step}`">
          <template v-if="step === 1">
            <h3>Step 1｜開啟密語</h3>
            <p>按下按鈕，讓我寫給妳的話語綻放。</p>
            <button
              class="btn-primary proposal__btn"
              :class="{ 'is-pulsing': !letterOpened }"
              @click="revealLetter"
            >
              開啟愛的信件
            </button>
            <transition name="letter">
              <blockquote v-if="letterOpened" class="proposal__letter">
                親愛的寶貝，謝謝妳讓我感受到被愛與被需要，每一天都想把宇宙的溫柔和希望捧給妳。
              </blockquote>
            </transition>
          </template>

          <template v-else-if="step === 2">
            <h3>Step 2｜收集勇氣</h3>
            <p>拖曳愛心滑桿，當勇氣值滿格，就會看見最重要的驚喜。</p>
            <div class="proposal__slider">
              <div class="proposal__slider-pulse"></div>
              <input
                v-model="courage"
                type="range"
                min="0"
                max="100"
                step="1"
                @input="handleCourage"
                :style="sliderStyle"
              />
              <span class="proposal__slider-value">{{ courage }}%</span>
            </div>
            <p class="proposal__hint">現在的勇氣值：{{ courageMessage }}</p>
          </template>

          <template v-else>
            <h3>Step 3｜我要和妳說</h3>
            <p>是妳，讓我開始相信永久的模樣。</p>
            <div class="proposal__ring" role="img" aria-label="求婚戒指動畫">
              <div class="proposal__ring-glow"></div>
              <div class="proposal__ring-inner"></div>
              <div class="proposal__ring-gem"></div>
              <div class="proposal__ring-orbit proposal__ring-orbit--one"></div>
              <div class="proposal__ring-orbit proposal__ring-orbit--two"></div>
              <div class="proposal__ring-sparkle proposal__ring-sparkle--one"></div>
              <div class="proposal__ring-sparkle proposal__ring-sparkle--two"></div>
            </div>
            <p class="proposal__question">Will you marry me?</p>
            <div class="proposal__answers">
              <button class="btn-primary proposal__btn proposal__btn--yes" @click="triggerConfetti">
                YES！我願意
              </button>
              <button class="btn-secondary proposal__btn proposal__btn--gentle" @click="playfulDecline">
                再想一下好嗎？
              </button>
            </div>
            <transition name="fade">
              <p v-if="playfulMessage" class="proposal__playful">{{ playfulMessage }}</p>
            </transition>
          </template>
        </div>
      </div>
    </div>

    <transition name="fade">
      <div v-if="confettiPieces.length" class="proposal__confetti" aria-hidden="true">
        <span
          v-for="piece in confettiPieces"
          :key="piece.id"
          class="proposal__confetti-piece"
          :style="piece.style"
        ></span>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { computed, onUnmounted, ref } from 'vue';

const stepsMeta = Object.freeze([
  { id: 'letter', label: '開啟密語' },
  { id: 'courage', label: '收集勇氣' },
  { id: 'proposal', label: '與你共度' }
]);

const step = ref(1);
const letterOpened = ref(false);
const courage = ref(0);
const playfulMessage = ref('');
const confettiPieces = ref([]);

const petals = Array.from({ length: 18 }, (_, index) => ({
  id: index,
  left: 5 + Math.random() * 90,
  delay: Math.random() * 6,
  duration: 12 + Math.random() * 10,
  drift: -25 + Math.random() * 50,
  scale: 0.6 + Math.random() * 0.8,
  opacity: 0.35 + Math.random() * 0.4
}));

const getPetalStyle = (petal) => ({
  left: `${petal.left}%`,
  animationDelay: `${petal.delay}s`,
  animationDuration: `${petal.duration}s`,
  '--drift': `${petal.drift}px`,
  '--scale': petal.scale,
  opacity: petal.opacity
});

const stepProgress = computed(() => {
  if (stepsMeta.length <= 1) return 100;
  const ratio = (step.value - 1) / (stepsMeta.length - 1);
  return Math.round(Math.min(Math.max(ratio, 0), 1) * 100);
});

const sliderStyle = computed(() => {
  const value = Number(courage.value) || 0;
  return {
    background: `linear-gradient(90deg, rgba(244, 93, 144, 0.9) 0%, rgba(255, 194, 214, 0.9) ${value}%, rgba(255, 255, 255, 0.45) ${value}%, rgba(255, 255, 255, 0.45) 100%)`
  };
});

const courageMessage = computed(() => {
  if (courage.value < 30) return '需要一點點勇氣；我會陪著妳。';
  if (courage.value < 70) return '越來越接近，我的心也跳得更快。';
  if (courage.value < 100) return '只差一步，讓我們一起跨越吧！';
  return '勇氣滿格，我聽見妳的心了。';
});

let confettiTimer = null;

const revealLetter = () => {
  letterOpened.value = true;
  setTimeout(() => {
    step.value = 2;
  }, 1800);
};

const handleCourage = () => {
  const courageValue = Number(courage.value) || 0;
  if (courageValue >= 100) {
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
  const total = 70;
  confettiPieces.value = Array.from({ length: total }, (_, index) => ({
    id: index,
    style: {
      left: `${Math.random() * 100}%`,
      background: index % 3 === 0
        ? 'linear-gradient(135deg, #f45d90, #ff99c1)'
        : index % 3 === 1
        ? 'linear-gradient(135deg, #ffc2d6, #ffe3ef)'
        : 'linear-gradient(135deg, #fff6f9, #ffd6ea)',
      animationDelay: `${Math.random()}s`,
      animationDuration: `${4 + Math.random() * 2}s`,
      '--confetti-rotation': `${Math.random() * 360}deg`,
      '--confetti-drift': `${-30 + Math.random() * 60}px`
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
  overflow: hidden;
  border-radius: 48px;
  padding: clamp(4rem, 9vw, 7.6rem);
  margin-block: clamp(3rem, 8vw, 6rem);
  background: linear-gradient(145deg, rgba(255, 240, 248, 0.92), rgba(255, 213, 231, 0.82));
  box-shadow: 0 38px 110px rgba(244, 93, 144, 0.24);
  color: var(--primary-dark);
  isolation: isolate;
}

.proposal__background {
  position: absolute;
  inset: -25% -15% -30%;
  pointer-events: none;
  z-index: 0;
}

.proposal__glow {
  position: absolute;
  width: clamp(260px, 34vw, 420px);
  height: clamp(260px, 34vw, 420px);
  border-radius: 50%;
  filter: blur(58px);
  opacity: 0.6;
  animation: pulseGlow 16s ease-in-out infinite;
}

.proposal__glow--one {
  top: -10%;
  left: -12%;
  background: radial-gradient(circle, rgba(255, 194, 214, 0.75), transparent 70%);
}

.proposal__glow--two {
  bottom: -18%;
  right: -10%;
  background: radial-gradient(circle, rgba(255, 235, 210, 0.7), transparent 70%);
  animation-delay: 4s;
}

.proposal__halo {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.5);
  filter: blur(0.6px);
  animation: pulseHalo 12s ease-in-out infinite;
  opacity: 0.35;
}

.proposal__halo--outer {
  inset: 16% 20%;
}

.proposal__halo--inner {
  inset: 26% 30%;
  opacity: 0.25;
  animation-delay: 3.6s;
}

.proposal__beam {
  position: absolute;
  width: clamp(180px, 30vw, 260px);
  height: 100%;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.35), transparent 70%);
  filter: blur(26px);
  opacity: 0.35;
}

.proposal__beam--one {
  left: 6%;
  animation: driftBeam 28s linear infinite;
}

.proposal__beam--two {
  right: 8%;
  animation: driftBeam 28s linear infinite reverse;
  animation-delay: 5s;
}

.proposal__petals {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.proposal__petal {
  position: absolute;
  top: -12%;
  font-size: clamp(16px, 2vw, 24px);
  color: rgba(255, 190, 210, 0.9);
  animation-name: floatPetal;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  text-shadow: 0 0 18px rgba(255, 200, 220, 0.55);
}

.proposal__content {
  position: relative;
  z-index: 2;
  display: grid;
  gap: clamp(2.4rem, 6vw, 3.8rem);
}

.proposal__header {
  text-align: center;
  max-width: 640px;
  margin: 0 auto;
  display: grid;
  gap: 1.2rem;
}

.proposal__header h2 {
  font-size: clamp(2rem, 4vw, 2.8rem);
  letter-spacing: 0.08em;
}

.proposal__header p {
  margin: 0;
  color: var(--text-muted);
  line-height: 1.7;
}

.proposal__progress {
  display: grid;
  gap: 1.4rem;
}

.proposal__progress-track {
  position: relative;
  height: 6px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.55);
  box-shadow: inset 0 0 0 1px rgba(244, 93, 144, 0.12);
  overflow: hidden;
}

.proposal__progress-bar {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(90deg, rgba(244, 93, 144, 0.9), rgba(255, 194, 214, 0.95));
  box-shadow: 0 10px 28px rgba(244, 93, 144, 0.35);
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}

.proposal__steps {
  display: flex;
  gap: clamp(0.8rem, 2vw, 1.4rem);
  justify-content: space-between;
  list-style: none;
  padding: 0;
  margin: 0;
}

.proposal__step {
  flex: 1;
  display: grid;
  gap: 0.65rem;
  justify-items: center;
  text-align: center;
  color: rgba(51, 28, 46, 0.48);
  font-size: 0.85rem;
  transition: color 0.35s ease;
}

.proposal__step-indicator {
  position: relative;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 50%;
  border: 1px solid rgba(244, 93, 144, 0.24);
  backdrop-filter: blur(6px);
  display: grid;
  place-items: center;
  overflow: hidden;
}

.proposal__step-number {
  font-weight: 600;
  letter-spacing: 0.04em;
}

.proposal__step-glow {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: radial-gradient(circle, rgba(244, 93, 144, 0.55), transparent 70%);
  opacity: 0;
  transition: opacity 0.35s ease;
}

.proposal__step-label {
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.proposal__step.is-active {
  color: rgba(51, 28, 46, 0.8);
}

.proposal__step.is-active .proposal__step-glow {
  opacity: 1;
}

.proposal__step.is-current .proposal__step-indicator {
  border-color: transparent;
  box-shadow: 0 16px 36px rgba(244, 93, 144, 0.38);
}

.proposal__card-container {
  position: relative;
  padding: clamp(0.4rem, 1vw, 0.8rem);
  border-radius: 36px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.38), rgba(255, 182, 215, 0.22));
  box-shadow: 0 24px 80px rgba(244, 93, 144, 0.25);
  backdrop-filter: blur(24px);
}

.proposal__card-container::before {
  content: '';
  position: absolute;
  inset: 12% 24% 16%;
  border-radius: 50%;
  border: 1px dashed rgba(255, 255, 255, 0.45);
  opacity: 0.4;
  filter: blur(0.4px);
  animation: pulseHalo 14s ease-in-out infinite;
  pointer-events: none;
}

.proposal__card {
  position: relative;
  border-radius: 28px;
  padding: clamp(2.4rem, 6vw, 3.6rem);
  display: grid;
  gap: 1.6rem;
  text-align: center;
  background: rgba(255, 255, 255, 0.82);
  box-shadow: inset 0 0 0 1px rgba(244, 93, 144, 0.08);
}

.proposal__card--step-2 {
  background: rgba(255, 255, 255, 0.88);
}

.proposal__card--step-3 {
  background: rgba(255, 255, 255, 0.94);
  box-shadow: inset 0 0 0 1px rgba(244, 93, 144, 0.12), 0 26px 70px rgba(244, 93, 144, 0.3);
}

.proposal__card h3 {
  font-size: 1.4rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.proposal__card p {
  margin: 0;
  line-height: 1.6;
  color: rgba(51, 28, 46, 0.75);
}

.proposal__letter {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 24px;
  padding: clamp(1.6rem, 4vw, 2rem);
  font-style: italic;
  line-height: 1.7;
  color: var(--text-muted);
  margin-top: 1rem;
  box-shadow: inset 0 0 0 2px rgba(244, 93, 144, 0.15), 0 18px 40px rgba(244, 93, 144, 0.18);
  position: relative;
}

.proposal__letter::after {
  content: '♥';
  position: absolute;
  bottom: 1.2rem;
  right: 1.4rem;
  font-size: 1.4rem;
  color: rgba(244, 93, 144, 0.4);
}

.letter-enter-active,
.letter-leave-active {
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.letter-enter-from,
.letter-leave-to {
  opacity: 0;
  transform: translateY(10px);
}

.proposal__slider {
  position: relative;
  display: grid;
  gap: 0.85rem;
  justify-items: center;
}

.proposal__slider-pulse {
  position: absolute;
  inset: -26px;
  border-radius: 999px;
  background: radial-gradient(circle, rgba(244, 93, 144, 0.18), transparent 70%);
  filter: blur(16px);
  animation: pulseHalo 12s ease-in-out infinite;
  pointer-events: none;
}

.proposal__slider input[type='range'] {
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  height: 16px;
  border-radius: 999px;
  outline: none;
  overflow: hidden;
  border: 1px solid rgba(244, 93, 144, 0.18);
  transition: box-shadow 0.35s ease;
}

.proposal__slider input[type='range']:focus-visible {
  box-shadow: 0 0 0 6px rgba(244, 93, 144, 0.16);
}

.proposal__slider input[type='range']::-webkit-slider-thumb {
  appearance: none;
  -webkit-appearance: none;
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  box-shadow: 0 0 0 6px rgba(244, 93, 144, 0.18);
  border: none;
}

.proposal__slider input[type='range']::-moz-range-thumb {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  border: none;
  box-shadow: 0 0 0 6px rgba(244, 93, 144, 0.18);
}

.proposal__slider-value {
  font-weight: 600;
  color: var(--primary-dark);
  letter-spacing: 0.08em;
}

.proposal__hint {
  color: var(--text-muted);
}

.proposal__ring {
  position: relative;
  width: clamp(200px, 28vw, 240px);
  height: clamp(200px, 28vw, 240px);
  margin: 0 auto;
  border-radius: 50%;
  display: grid;
  place-items: center;
  animation: floatSoft 6s ease-in-out infinite;
  box-shadow: 0 28px 80px rgba(244, 93, 144, 0.28);
}

.proposal__ring-glow {
  position: absolute;
  inset: -20%;
  border-radius: inherit;
  background: radial-gradient(circle, rgba(255, 194, 214, 0.35), transparent 70%);
  filter: blur(30px);
  z-index: 0;
}

.proposal__ring-inner {
  position: relative;
  width: 60%;
  height: 60%;
  border-radius: 50%;
  border: 8px dashed rgba(255, 194, 214, 0.55);
  animation: rotate 9s linear infinite;
  z-index: 1;
}

.proposal__ring-gem {
  position: absolute;
  top: -18%;
  width: clamp(64px, 12vw, 80px);
  height: clamp(64px, 12vw, 80px);
  border-radius: 22% 78% 32% 68% / 45% 55% 45% 55%;
  background: linear-gradient(135deg, #fff8fc, #ffe0f3);
  box-shadow: 0 18px 40px rgba(244, 93, 144, 0.28);
  animation: shimmer 3.4s ease-in-out infinite;
  z-index: 2;
}

.proposal__ring-orbit {
  position: absolute;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.55);
  opacity: 0.6;
  animation: orbitSpin 8s linear infinite;
}

.proposal__ring-orbit--one {
  inset: 10% 14%;
}

.proposal__ring-orbit--two {
  inset: 18% 20%;
  animation-duration: 11s;
  animation-direction: reverse;
}

.proposal__ring-sparkle {
  position: absolute;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.95), transparent 70%);
  animation: twinkle 2.4s ease-in-out infinite;
}

.proposal__ring-sparkle--one {
  top: 14%;
  right: 18%;
}

.proposal__ring-sparkle--two {
  bottom: 16%;
  left: 20%;
  animation-delay: 0.9s;
}

.proposal__question {
  font-size: clamp(1.8rem, 4vw, 2.4rem);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin-top: 0.6rem;
}

.proposal__answers {
  display: flex;
  justify-content: center;
  gap: 1rem;
  flex-wrap: wrap;
}

.proposal__btn {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  padding: clamp(0.85rem, 2.6vw, 1.05rem) clamp(2rem, 6vw, 2.6rem);
  border-radius: 999px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  color: inherit;
  transition: transform 0.35s ease, box-shadow 0.35s ease, filter 0.35s ease;
  overflow: hidden;
  isolation: isolate;
}

.proposal__btn::before,
.proposal__btn::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  pointer-events: none;
}

.proposal__btn::before {
  z-index: -1;
  opacity: 0;
  transition: opacity 0.45s ease;
}

.proposal__btn::after {
  background: linear-gradient(120deg, transparent 0%, rgba(255, 255, 255, 0.55) 45%, transparent 65%);
  transform: translateX(-140%) skewX(-18deg);
  opacity: 0.8;
  transition: transform 0.65s cubic-bezier(0.4, 0, 0.2, 1);
}

.proposal__btn:hover::after,
.proposal__btn:focus-visible::after {
  transform: translateX(140%) skewX(-18deg);
}

.proposal__btn:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.7);
  outline-offset: 4px;
}

.btn-primary.proposal__btn {
  color: #fff;
  background: linear-gradient(135deg, rgba(244, 93, 144, 0.95), rgba(204, 70, 117, 0.95));
  box-shadow: 0 22px 54px rgba(244, 93, 144, 0.35);
}

.btn-primary.proposal__btn::before {
  background: radial-gradient(circle, rgba(255, 255, 255, 0.4), transparent 72%);
}

.btn-primary.proposal__btn:hover,
.btn-primary.proposal__btn:focus-visible {
  transform: translateY(-4px);
  filter: saturate(1.05);
  box-shadow: 0 26px 64px rgba(244, 93, 144, 0.42);
}

.btn-primary.proposal__btn:active {
  transform: translateY(-1px);
  filter: saturate(0.95);
}

.btn-secondary.proposal__btn {
  background: rgba(255, 255, 255, 0.78);
  color: var(--primary-dark);
  border: 1px solid rgba(244, 93, 144, 0.28);
  box-shadow: 0 20px 48px rgba(255, 194, 214, 0.38);
  backdrop-filter: blur(12px);
}

.btn-secondary.proposal__btn::before {
  background: radial-gradient(circle, rgba(255, 255, 255, 0.62), transparent 72%);
}

.btn-secondary.proposal__btn:hover,
.btn-secondary.proposal__btn:focus-visible {
  transform: translateY(-4px);
  filter: saturate(1.03);
  box-shadow: 0 24px 60px rgba(255, 194, 214, 0.46);
}

.btn-secondary.proposal__btn:active {
  transform: translateY(-1px);
  filter: saturate(0.98);
}

.proposal__btn--yes::before {
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.48), transparent 72%),
    radial-gradient(circle at 70% 70%, rgba(255, 145, 190, 0.32), transparent 72%);
}

.proposal__btn--gentle::before {
  background: radial-gradient(circle at 28% 28%, rgba(255, 255, 255, 0.56), transparent 70%),
    radial-gradient(circle at 72% 70%, rgba(255, 235, 245, 0.55), transparent 75%);
}

.proposal__btn:hover::before,
.proposal__btn:focus-visible::before {
  opacity: 1;
}

.proposal__btn.is-pulsing {
  animation: proposalButtonPulse 2.6s ease-in-out infinite;
  box-shadow: 0 20px 58px rgba(244, 93, 144, 0.36);
}

.proposal__btn.is-pulsing:hover,
.proposal__btn.is-pulsing:focus-visible {
  animation: none;
}

.proposal__playful {
  margin-top: 1.2rem;
  color: rgba(51, 28, 46, 0.7);
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.6s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes shimmer {
  0%,
  100% {
    filter: drop-shadow(0 0 6px rgba(255, 255, 255, 0.6));
  }
  50% {
    filter: drop-shadow(0 0 16px rgba(255, 255, 255, 0.85));
  }
}

@keyframes pulseGlow {
  0%,
  100% {
    transform: scale(0.96);
    opacity: 0.55;
  }
  50% {
    transform: scale(1.05);
    opacity: 0.75;
  }
}

@keyframes pulseHalo {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.4;
  }
  50% {
    transform: scale(1.04);
    opacity: 0.7;
  }
}

@keyframes floatSoft {
  0%,
  100% {
    transform: translateY(-6px);
  }
  50% {
    transform: translateY(8px);
  }
}

@keyframes orbitSpin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0.4;
    transform: scale(0.85);
  }
  50% {
    opacity: 1;
    transform: scale(1.1);
  }
}

@keyframes floatPetal {
  0% {
    transform: translate3d(0, 0, 0) scale(var(--scale, 1));
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  100% {
    transform: translate3d(var(--drift), 110vh, 0) scale(var(--scale, 1));
    opacity: 0;
  }
}

@keyframes proposalButtonPulse {
  0%,
  100% {
    transform: translateY(0);
    box-shadow: 0 20px 58px rgba(244, 93, 144, 0.34);
  }
  50% {
    transform: translateY(-6px) scale(1.02);
    box-shadow: 0 28px 70px rgba(244, 93, 144, 0.42);
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
    transform: translate3d(var(--confetti-drift, -20px), 110vh, 0) rotate(var(--confetti-rotation, 360deg));
    opacity: 0;
  }
}

@keyframes driftBeam {
  0% {
    transform: translateY(-10%);
  }
  50% {
    transform: translateY(10%);
  }
  100% {
    transform: translateY(-10%);
  }
}

@media (max-width: 960px) {
  .proposal {
    padding: clamp(3rem, 12vw, 4.6rem);
  }

  .proposal__steps {
    flex-direction: column;
    gap: 1rem;
  }

  .proposal__step {
    grid-auto-flow: column;
    justify-content: flex-start;
    text-align: left;
  }

  .proposal__step-indicator {
    justify-self: flex-start;
  }

  .proposal__card {
    padding: clamp(2rem, 7vw, 2.8rem);
  }
}

@media (max-width: 640px) {
  .proposal__header h2 {
    font-size: clamp(1.8rem, 6vw, 2.2rem);
  }

  .proposal__card h3 {
    font-size: 1.2rem;
  }

  .proposal__question {
    font-size: 1.6rem;
  }
}
</style>
