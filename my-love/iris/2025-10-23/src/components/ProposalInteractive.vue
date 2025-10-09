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
      <span v-for="petal in petals" :key="petal.id" class="proposal__petal" :style="getPetalStyle(petal)">
        {{ petal.symbol }}
      </span>
    </div>

    <div class="proposal__content">
      <div class="proposal__header fade-up">
        <h2 id="proposal-title">在這個屬於我們的時刻</h2>
        <p>想邀請妳一起走向下一段旅程。跟著小小的互動，慢慢揭開我準備的驚喜吧。</p>
      </div>

      <div class="proposal__progress fade-up" role="group" aria-label="求婚驚喜進度">
        <div class="proposal__progress-track" role="progressbar" :aria-valuenow="step" aria-valuemin="1"
          aria-valuemax="3">
          <span class="proposal__progress-bar" :style="{ width: `${stepProgress}%` }"></span>
        </div>
        <ul class="proposal__steps">
          <li v-for="(item, index) in stepsMeta" :key="item.id" class="proposal__step" :class="{
            'is-active': step >= index + 1,
            'is-current': step === index + 1
          }" :aria-current="step === index + 1 ? 'step' : undefined">
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
            <h3>Step 1｜打開心裡話</h3>
            <p>點一下，讓我想對妳說的心裡話慢慢展開。</p>
            <button class="btn-primary proposal__btn" :class="{ 'is-pulsing': !letterOpened }" @click="revealLetter">
              打開專屬妳的信
            </button>
            <transition name="letter">
              <blockquote v-if="letterOpened" class="proposal__letter">
                親愛的妳，謝謝妳一直陪在我身邊，讓我每天都覺得很幸福。這些話一直放在心裡，今天想好好說給妳聽。
              </blockquote>
            </transition>
          </template>

          <template v-else-if="step === 2">
            <h3>Step 2｜收集勇氣</h3>
            <p>把愛心滑桿往右推，等勇氣滿滿時，就能看到我藏在心裡的驚喜。</p>
            <div class="proposal__slider">
              <div class="proposal__slider-pulse"></div>
              <input v-model="courage" type="range" min="0" max="100" step="1" @input="handleCourage"
                :style="sliderStyle" />
              <span class="proposal__slider-value">{{ courage }}%</span>
            </div>
            <p class="proposal__hint">現在的勇氣值：{{ courageMessage }}</p>
          </template>

          <template v-else>
            <h3>Step 3｜我要跟妳說</h3>
            <p>從遇見妳開始，世界都變得溫柔。未來的每一天，我都想牽著妳的手，陪妳看盡人間美好。願意和我一起，寫下屬於我們的幸福故事嗎？</p>
            <div class="proposal__ring" role="img" aria-label="求婚戒指與浪漫符號">
              <span class="proposal__ring-emoji proposal__ring-emoji--ring" aria-hidden="true">💍</span>
              <span class="proposal__ring-emoji proposal__ring-emoji--heart" aria-hidden="true">💖</span>
              <span class="proposal__ring-emoji proposal__ring-emoji--sparkle" aria-hidden="true">✨</span>
              <span class="proposal__ring-emoji proposal__ring-emoji--sparkle proposal__ring-emoji--sparkle-alt"
                aria-hidden="true">
                ✨
              </span>
            </div>
            <p class="proposal__question">妳願意嫁給我，陪我一起白頭偕老嗎？</p>
            <div class="proposal__answers">
              <button class="btn-primary proposal__btn proposal__btn--yes" @click="triggerConfetti">
                當然願意，牽你一輩子！
              </button>
              <button class="btn-secondary proposal__btn proposal__btn--gentle" @click="playfulDecline">
                欸～再撐一下下，想多被你告白幾次！
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
        <span v-for="piece in confettiPieces" :key="piece.id" class="proposal__confetti-piece"
          :style="piece.style"></span>
      </div>
    </transition>
  </section>
</template>

<script setup>
import { computed, onUnmounted, ref } from 'vue';

const stepsMeta = Object.freeze([
  { id: 'letter', label: '打開心裡話' },
  { id: 'courage', label: '收集勇氣' },
  { id: 'proposal', label: '我要跟妳說' }
]);
const flowerSymbols = ['♥', '❥', '♡', '❤', '💖', '💗', '💘', '💝', '💓', '💟'];
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
  opacity: 0.35 + Math.random() * 0.4,
  symbol: flowerSymbols[Math.floor(Math.random() * flowerSymbols.length)]
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
  const v = Number(courage.value) || 0;
  if (v === 0) return '不管怎樣我都會在妳身邊，現在只差一點點勇氣。';
  if (v > 0 && v <= 25) return '一點一點累積勇氣，像愛慢慢在心裡發芽。';
  if (v > 25 && v <= 50) return '每次想到彼此，心裡的勇氣就會悄悄冒出來。';
  if (v > 50 && v <= 75) return '再靠近一點，我們的心就能緊緊相依。';
  if (v > 75 && v < 100) return '只差一步，讓我們一起牽手跨過這道心門。';
  if (v >= 100) return '勇氣滿滿，妳的眼神早已給我答案。';
});

let confettiTimer = null;

const revealLetter = () => {
  letterOpened.value = true;
  setTimeout(() => {
    step.value = 2;
  }, 5000);
};

const handleCourage = () => {
  const courageValue = Number(courage.value) || 0;
  if (courageValue >= 100) {
    setTimeout(() => {
      step.value = 3;
    }, 1000);
  }
};

const triggerConfetti = () => {
  playfulMessage.value = '從今以後，讓我們一起牽手到白頭，陪妳走過每一個春夏秋冬。';
  launchConfetti();
};

const playfulDecline = () => {
  playfulMessage.value = '沒關係~ 因為我相信，妳的心早就和我一起悄悄許下幸福的約定。';
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
  background: var(--surface-gradient);
  box-shadow: 0 38px 110px rgba(244, 93, 144, 0.24);
  color: var(--primary-dark);
  isolation: isolate;
}

.proposal__background {
  position: absolute;
  inset: -25% -15% -30%;
  pointer-events: none;
  z-index: var(--layer-section-bg);
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
  z-index: var(--layer-section-decor);
}

.proposal__petal {
  position: absolute;
  bottom: -12%;
  /* 由下方浮上來 */
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: clamp(20px, 2.6vw, 32px);
  color: #f45990;
  background: none;
  animation-name: floatPetalUp;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  text-shadow:
    0 0 14px #ffd0e8,
    0 0 24px #fff,
    0 2px 8px #f45990;
  transition: font-size 0.3s, color 0.3s;
}

.proposal__content {
  position: relative;
  z-index: var(--layer-section-content);
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
  color: #f45990;
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
  background: radial-gradient(circle at 50% 35%, rgba(255, 255, 255, 0.92), rgba(255, 210, 230, 0.25));
  box-shadow: 0 28px 80px rgba(244, 93, 144, 0.3);
  animation: floatSoft 6s ease-in-out infinite;
  overflow: hidden;
  isolation: isolate;
}

.proposal__ring::before {
  content: '';
  position: absolute;
  inset: 14%;
  border-radius: inherit;
  background: radial-gradient(circle, rgba(244, 93, 144, 0.22), transparent 70%);
  filter: blur(14px);
  opacity: 0.75;
}

.proposal__ring::after {
  content: '';
  position: absolute;
  inset: -12% -14% 36% -14%;
  border-radius: 50%;
  background: linear-gradient(160deg, rgba(255, 255, 255, 0.5), transparent 60%);
  opacity: 0.8;
  filter: blur(18px);
  animation: ringEmojiGlow 7s ease-in-out infinite;
}

.proposal__ring-emoji {
  position: absolute;
  display: inline-block;
  line-height: 1;
  text-shadow: 0 16px 40px rgba(244, 93, 144, 0.28);
  filter: drop-shadow(0 8px 20px rgba(51, 28, 46, 0.18));
}

.proposal__ring-emoji--ring {
  position: relative;
  font-size: clamp(3.4rem, 8vw, 4.8rem);
  animation: ringEmojiFloat 5.4s ease-in-out infinite;
}

.proposal__ring-emoji--heart {
  bottom: 18%;
  right: clamp(14px, 6vw, 34px);
  font-size: clamp(1.8rem, 4.8vw, 2.6rem);
  animation: ringEmojiHeart 2.6s ease-in-out infinite;
}

.proposal__ring-emoji--sparkle {
  top: clamp(18px, 5vw, 32px);
  left: clamp(22px, 6vw, 40px);
  font-size: clamp(1.2rem, 3.6vw, 2rem);
  animation: ringEmojiSparkle 3s ease-in-out infinite;
}

.proposal__ring-emoji--sparkle-alt {
  top: clamp(36px, 7vw, 48px);
  right: clamp(26px, 6vw, 46px);
  animation-delay: 1.4s;
  opacity: 0.8;
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
  z-index: var(--layer-floating-ui);
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

@keyframes ringEmojiGlow {

  0%,
  100% {
    opacity: 0.6;
    transform: rotate(0deg);
  }

  50% {
    opacity: 0.85;
    transform: rotate(12deg);
  }
}

@keyframes ringEmojiFloat {

  0%,
  100% {
    transform: translateY(-6px) scale(1);
  }

  50% {
    transform: translateY(4px) scale(1.02);
  }
}

@keyframes ringEmojiHeart {

  0%,
  100% {
    transform: scale(0.92) rotate(-6deg);
    opacity: 0.75;
  }

  50% {
    transform: scale(1.08) rotate(-6deg);
    opacity: 1;
  }
}

@keyframes ringEmojiSparkle {

  0%,
  100% {
    transform: scale(0.85) rotate(-10deg);
    opacity: 0.45;
  }

  50% {
    transform: scale(1.15) rotate(8deg);
    opacity: 1;
  }
}

@keyframes floatPetalUp {
  0% {
    transform: translate3d(0, 0, 0) scale(var(--scale, 1));
    opacity: 0;
  }

  10% {
    opacity: 1;
  }

  100% {
    transform: translate3d(var(--drift), -110vh, 0) scale(var(--scale, 1));
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
