<template>
  <section class="wishes" aria-labelledby="wishes-title">

    <article class="wish-card fade-up" @mousemove="handleCardMouseMove" @mouseleave="resetTilt"
      :style="{ transform: cardTransform }">
      <span class="wish-card__halo" aria-hidden="true"></span>
      <span class="wish-card__glint" :class="{ 'wish-card__glint--active': shimmerActive }" aria-hidden="true"></span>

      <div class="wish-card__petals" aria-hidden="true">
        <span v-for="petal in floatingPetals" :key="petal.id" class="wish-card__petal" :style="{
          '--petal-left': petal.left,
          '--petal-top': petal.top,
          '--petal-delay': petal.delay,
          '--petal-duration': petal.duration,
          '--petal-scale': petal.scale,
          '--petal-rotation': petal.rotation,
          '--petal-blur': petal.blur
        }">{{ petal.symbol }}</span>
      </div>


      <div class="wish-card__noise" aria-hidden="true"></div>

      <header class="wish-card__header">
        <span class="wish-card__badge">Birthday Blessing</span>
        <h2 id="wishes-title">
          <span class="wish-card__title-glow" aria-hidden="true"></span>
          屬於我們的故事
        </h2>
        <p class="wish-card__tagline">把這些珍藏在心裡的故事，一頁頁寫給妳，成為最閃亮的祝福</p>
      </header>

      <p class="wish-card__intro">
        每次我們一起翻相本，看著一張張照片，腦海裡就會浮現好多屬於我們的故事和感覺。這些有妳的溫柔時刻，我都偷偷放在心裡，寫成這本只屬於妳的回憶本。
      </p>

      <div class="wish-card__content" aria-live="polite">
        <div class="wish-card__video" aria-hidden="true">
          <div class="wish-card__video-frame">
            <video :src="wishVideoSrc" autoplay muted loop playsinline></video>
            <span class="wish-card__video-hint">我們的故事</span>
          </div>
        </div>

        <transition-group name="wish-message" tag="div" class="wish-card__message-block">
          <p v-for="paragraph in visibleParagraphs" :key="paragraph" class="wish-card__message">
            {{ paragraph }}
          </p>
        </transition-group>

        <div class="wish-card__divider" :class="{ 'wish-card__divider--visible': closingVisible }" aria-hidden="true">
        </div>

        <p class="wish-card__closing" :class="{ 'wish-card__closing--visible': closingVisible }">
          {{ closingLine }}
        </p>
      </div>
    </article>
  </section>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, reactive, ref } from 'vue';

const messageParagraphs = [
  '有妳在身邊，連陽光都變得溫柔。每次翻開相本，妳的笑容都像灑進心裡的光，讓平凡的日子都閃閃發亮。',
  '每次和妳一起出門玩、一起大笑，或是陪我聊天的時候，這些快樂的片段都像一格一格的底片，讓我一直記得被妳愛著的感覺。',
  '未來的日子，換我把溫暖和快樂慢慢放進妳的生活，讓我們的故事一頁一頁繼續寫下去。'
];

const closingLine = '陪妳翻相本的存摺子';

const tilt = reactive({ x: 0, y: 0 });
const revealedCount = ref(0);
const closingVisible = ref(false);
const shimmerActive = ref(false);
const wishVideoSrc = new URL('../assets/memories/2.mp4', import.meta.url).href;

const visibleParagraphs = computed(() => messageParagraphs.slice(0, revealedCount.value));


const petalSymbols = [
  '♥', '❥', '♡', '❤', '💖', '💗', '💘', '💝', '💞', '💓', '💟', '✦'
];
const floatingPetals = Object.freeze([
  { id: 'petal-1', left: '12%', top: '26%', delay: '-2.4s', duration: '12.4s', scale: '1.05', rotation: '18deg', blur: '0px', symbol: petalSymbols[Math.floor(Math.random() * petalSymbols.length)] },
  { id: 'petal-2', left: '28%', top: '84%', delay: '-6.8s', duration: '14.2s', scale: '0.88', rotation: '-16deg', blur: '1px', symbol: petalSymbols[Math.floor(Math.random() * petalSymbols.length)] },
  { id: 'petal-3', left: '78%', top: '18%', delay: '-4.2s', duration: '13.6s', scale: '0.96', rotation: '26deg', blur: '0px', symbol: petalSymbols[Math.floor(Math.random() * petalSymbols.length)] },
  { id: 'petal-4', left: '88%', top: '76%', delay: '-8.6s', duration: '15s', scale: '1.14', rotation: '-12deg', blur: '2px', symbol: petalSymbols[Math.floor(Math.random() * petalSymbols.length)] },
  { id: 'petal-5', left: '6%', top: '62%', delay: '-10s', duration: '16s', scale: '1.28', rotation: '34deg', blur: '1px', symbol: petalSymbols[Math.floor(Math.random() * petalSymbols.length)] }
]);

const timers = [];

const handleCardMouseMove = (event) => {
  const card = event.currentTarget;
  if (!card) return;

  const rect = card.getBoundingClientRect();
  const offsetX = event.clientX - rect.left;
  const offsetY = event.clientY - rect.top;

  const percentX = (offsetX / rect.width) * 2 - 1;
  const percentY = (offsetY / rect.height) * 2 - 1;

  tilt.x = -(percentY * 6);
  tilt.y = percentX * 6;
};

const resetTilt = () => {
  tilt.x = 0;
  tilt.y = 0;
};

const cardTransform = computed(() => {
  const scale = closingVisible.value ? 1.02 : 1.01;
  return `rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) scale3d(${scale}, ${scale}, ${scale})`;
});

onMounted(() => {
  shimmerActive.value = true;

  if (typeof window === 'undefined') {
    revealedCount.value = messageParagraphs.length;
    closingVisible.value = true;
    return;
  }

  const baseDelay = 420;
  const stepDuration = 1250;

  messageParagraphs.forEach((_, index) => {
    const timer = window.setTimeout(() => {
      revealedCount.value = index + 1;
    }, baseDelay + index * stepDuration);
    timers.push(timer);
  });

  const closingTimer = window.setTimeout(() => {
    closingVisible.value = true;
  }, baseDelay + messageParagraphs.length * stepDuration + 640);
  timers.push(closingTimer);
});

onBeforeUnmount(() => {
  if (typeof window === 'undefined') return;
  timers.forEach((timer) => window.clearTimeout(timer));
});
</script>

<style scoped>
.wishes {
  position: relative;
  display: flex;
  justify-content: center;
  padding: clamp(4rem, 9vw, 8rem) clamp(1.5rem, 6vw, 4rem);
  overflow: hidden;
  border-radius: 48px;
  background: var(--surface-gradient);
  box-shadow: 0 40px 120px rgba(244, 93, 144, 0.22);
  isolation: isolate;
}

.wish-card {
  position: relative;
  width: min(720px, 100%);
  padding: clamp(2.6rem, 6vw, 4rem);
  border-radius: 44px;
  background: var(--surface-gradient);
  box-shadow: 0 60px 160px rgba(244, 93, 144, 0.2);
  backdrop-filter: blur(28px) saturate(120%);
  overflow: hidden;
  transform-style: preserve-3d;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.wish-card:hover {
  box-shadow: 0 70px 180px rgba(244, 93, 144, 0.26);
}

.wish-card__halo {
  position: absolute;
  inset: -40%;
  background: radial-gradient(circle at 50% 20%, rgba(255, 255, 255, 0.35) 0%, rgba(255, 255, 255, 0) 60%);
  opacity: 0.6;
  transform: translateZ(-40px);
}

.wish-card__glint {
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent 0%, rgba(255, 255, 255, 0.28) 45%, rgba(255, 193, 218, 0.6) 50%, rgba(255, 255, 255, 0.28) 55%, transparent 100%);
  transform: translateX(-120%);
  opacity: 0;
}

.wish-card__glint--active {
  animation: glintSweep 6s ease-in-out 0.8s infinite;
}

.wish-card__noise {
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.08) 0, rgba(255, 255, 255, 0.08) 2px, transparent 2px, transparent 4px);
  opacity: 0.2;
  mix-blend-mode: soft-light;
  pointer-events: none;
}

.wish-card__petals,
.wish-card__sparkles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.wish-card__petal {
  position: absolute;
  left: var(--petal-left);
  top: var(--petal-top);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  width: clamp(32px, 5vw, 44px);
  height: clamp(36px, 5vw, 52px);
  color: #f45990;
  background: linear-gradient(120deg, #f45d90 40%, #ffb4d6 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  text-fill-color: transparent;
  background: none;
  border-radius: 50%;
  opacity: 0.8;
  filter: blur(var(--petal-blur));
  transform: translate(-50%, -50%) scale(var(--petal-scale)) rotate(var(--petal-rotation));
  animation: petalFloat calc(var(--petal-duration) * 0.6) cubic-bezier(0.6, -0.28, 0.74, 0.05) infinite;
  animation-delay: var(--petal-delay);
  text-shadow:
    0 0 14px #ffd0e8,
    0 0 24px #fff,
    0 2px 8px #f45990;
  transition: font-size 0.3s, color 0.3s;
}

.wish-card__sparkle {
  position: absolute;
  left: var(--sparkle-left);
  top: var(--sparkle-top);
  width: clamp(8px, 1.8vw, 14px);
  height: clamp(8px, 1.8vw, 14px);
  background: radial-gradient(circle, rgba(255, 255, 255, 0.85) 0%, rgba(255, 194, 223, 0.75) 45%, rgba(255, 255, 255, 0) 70%);
  border-radius: 50%;
  transform: translate(-50%, -50%) scale(var(--sparkle-scale));
  opacity: 0;
  animation: sparkleTwinkle var(--sparkle-duration) ease-in-out infinite;
  animation-delay: var(--sparkle-delay);
}

.wish-card__header {
  position: relative;
  display: grid;
  gap: 0.75rem;
  text-align: center;
  margin-bottom: 2rem;
  z-index: var(--layer-section-content);
}

.wish-card__badge {
  justify-self: center;
  padding: 0.55rem 1.7rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.38);
  color: var(--primary-dark);
  letter-spacing: 0.28em;
  text-transform: uppercase;
  font-size: 0.72rem;
  font-weight: 600;
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.28);
}

.wish-card__header h2 {
  position: relative;
  margin: 0;
  font-size: clamp(1.7rem, 4.2vw, 2.75rem);
  color: var(--primary-dark);
  text-shadow: 0 18px 42px rgba(51, 28, 46, 0.15);
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  padding: 0.25rem 1rem;
}

.wish-card__title-glow {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  background: radial-gradient(circle at 50% 10%, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 65%);
  opacity: 0.6;
  filter: blur(18px);
  z-index: -1;
}

.wish-card__tagline {
  margin: 0;
  font-size: 1.05rem;
  color: rgba(51, 28, 46, 0.68);
  letter-spacing: 0.06em;
}

.wish-card__intro {
  margin: 0 auto clamp(2rem, 4.2vw, 2.6rem);
  max-width: 48ch;
  text-align: center;
  color: rgba(51, 28, 46, 0.64);
  font-size: 1rem;
  line-height: 1.9;
  position: relative;
  z-index: var(--layer-section-content);
}

.wish-card__content {
  position: relative;
  display: grid;
  gap: clamp(1rem, 3vw, 1.8rem);
  text-align: center;
  z-index: var(--layer-section-content);
}

.wish-card__video {
  display: flex;
  justify-content: center;
  width: 100%;
  max-width: 420px;
  margin: 0 auto;
}

.wish-card__video-frame {
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 9;
  border-radius: 22px;
  overflow: hidden;
  box-shadow: 0 26px 72px rgba(51, 28, 46, 0.18);
  background: rgba(255, 255, 255, 0.8);
}

.wish-card__video-frame video {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.wish-card__video-hint {
  position: absolute;
  bottom: 10px;
  right: 10px;
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  background: rgba(51, 28, 46, 0.6);
  color: #fff;
  font-size: 0.82rem;
  letter-spacing: 0.04em;
  box-shadow: 0 10px 24px rgba(51, 28, 46, 0.22);
}

.wish-card__message-block {
  display: grid;
  gap: 1.25rem;
}

.wish-card__message {
  margin: 0;
  font-size: 1.06rem;
  line-height: 1.95;
  color: rgba(51, 28, 46, 0.78);
  text-shadow: 0 12px 30px rgba(244, 93, 144, 0.08);
}

.wish-message-enter-from {
  opacity: 0;
  transform: translateY(18px) scale(0.97);
}

.wish-message-enter-to {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.wish-message-enter-active {
  transition: all 0.7s cubic-bezier(0.19, 1, 0.22, 1);
}

.wish-card__divider {
  height: 1px;
  width: 100%;
  background: linear-gradient(90deg, transparent, rgba(244, 93, 144, 0.5), transparent);
  opacity: 0;
  transform: scaleX(0.5);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.wish-card__divider--visible {
  opacity: 0.75;
  transform: scaleX(1);
}

.wish-card__closing {
  margin: 0;
  font-size: 1.02rem;
  color: rgba(51, 28, 46, 0.64);
  letter-spacing: 0.22em;
  text-transform: uppercase;
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.7s ease, transform 0.7s ease;
}

.wish-card__closing--visible {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 640px) {
  .wish-card {
    padding: clamp(2.2rem, 8vw, 2.8rem);
  }

  .wish-card__title-glow {
    filter: blur(12px);
  }
}

@media (prefers-reduced-motion: reduce) {

  .wishes__aurora,
  .wish-card__glint,
  .wish-card__petal,
  .wish-card__sparkle {
    animation: none !important;
  }

  .wish-message-enter-active {
    transition: none !important;
  }

  .wish-card__divider,
  .wish-card__closing {
    transition: none !important;
  }
}

@keyframes glintSweep {

  0%,
  70% {
    opacity: 0;
    transform: translateX(-140%);
  }

  75% {
    opacity: 1;
  }

  100% {
    opacity: 0;
    transform: translateX(140%);
  }
}

@keyframes petalFloat {
  0% {
    transform: translate3d(0, 0, 0) scale(var(--petal-scale));
    opacity: 0;
  }

  10% {
    opacity: 1;
  }

  100% {
    transform: translate3d(var(--petal-drift, 0px), -110vh, 0) scale(var(--petal-scale));
    opacity: 0;
  }
}

@keyframes sparkleTwinkle {

  0%,
  100% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(calc(var(--sparkle-scale) * 0.8));
  }

  50% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(calc(var(--sparkle-scale) * 1.25));
  }
}

@keyframes iconPulse {

  0%,
  100% {
    transform: scale(1);
  }

  40% {
    transform: scale(1.08);
  }

  60% {
    transform: scale(0.96);
  }
}
</style>
