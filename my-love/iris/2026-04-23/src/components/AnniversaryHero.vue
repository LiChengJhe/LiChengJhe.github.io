<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero__background" aria-hidden="true">
      <div class="hero__wash"></div>
      <div class="hero__blob hero__blob--a"></div>
      <div class="hero__blob hero__blob--b"></div>
    </div>

    <div class="hero__grid">
      <div class="hero__content fade-up">
        <div class="hero__meta-row">
          <span class="hero__badge" aria-hidden="true">Anniversary Letter · 2026/04/23</span>
          <span class="hero__chip" aria-hidden="true">For {{ nickname }}</span>
        </div>

        <p class="hero__intro">To {{ nickname }}</p>
        <div id="hero-title" class="hero__title text-shadow" role="heading" aria-level="2">
          <span class="hero__title-line">我們的紀念日</span>
          <span class="hero__title-line hero__title-line--accent">值得把未來裝進驚喜裡</span>
        </div>

        <div class="hero__metrics" role="list" aria-label="重要紀念時間">
          <p class="hero__metric" role="listitem">
            <span class="hero__metric-label">我們已經認識</span>
            <span class="hero__metric-value">{{ knownYearDay }}</span>
          </p>
          <p class="hero__metric" role="listitem">
            <span class="hero__metric-label">成為戀人</span>
            <span class="hero__metric-value">{{ togetherYearDay }}</span>
          </p>
        </div>

        <p class="hero__subtitle">
          謝謝妳，把我的普通日常變成會發光的風景。<br>
          妳笑起來的樣子，總能讓我重新喜歡這個世界。<br>
          今天我會送妳一個戒指盒，裡面先放進機票和旅遊行程，
          讓我們把下一段冒險，從這個紀念日一起出發。
        </p>
        <p class="hero__signature">永遠站在妳這邊的 {{ signature }}</p>
        <div class="hero__cta">
          <button class="btn-primary" @click="$emit('start-journey')">開啟專屬紀念日旅程</button>
        </div>
      </div>

      <div class="hero__visual fade-up" style="animation-delay: 0.18s">
        <p class="hero__visual-kicker">Memory Highlight</p>
        <div class="hero__visual-frame">
          <img ref="photoElement" class="hero__visual-photo"
            :class="{ 'hero__visual-photo--transitioning': isTransitioning }" :src="highlightPhoto"
            alt="屬於我們的生日回憶剪影" loading="lazy" />
        </div>
        <div class="hero__visual-meta" aria-label="目前照片進度">
          <span class="hero__visual-count">{{ currentPhotoNumber }} / {{ photoTotal }}</span>
          <span class="hero__visual-caption">妳的笑容，是我心裡最溫柔的風景。</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
/**
 * Props keep the component reusable and easy to localize in the future.
 */
const props = defineProps({
  nickname: {
    type: String,
    default: '鮭魚子'
  },
  signature: {
    type: String,
    default: '存摺子'
  }
});


// 照片切換邏輯
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { photoNarrativeByFile } from '../data/storyGraph';

const photoElement = ref(null);
const PHOTO_INTERVAL_MS = 5000;
const TRANSITION_FALLBACK_MS = 650;

const heroImageMap = import.meta.glob('../assets/hero/*', {
  eager: true,
  import: 'default'
});

const memoryImageMap = import.meta.glob('../assets/memories/*', {
  eager: true,
  import: 'default'
});

const resolveHeroImage = (fileName) => {
  return heroImageMap[`../assets/hero/${fileName}`] || '';
};

const resolveMemoryImage = (fileName) => {
  return memoryImageMap[`../assets/memories/${fileName}`] || '';
};

// 載入 hero 資料夾中的原本照片
const heroPhotos = [
  resolveHeroImage('1.png')
].filter(Boolean);

// 載入 memories，順序與 photoNarrativeByFile 保持一致
const memoryPhotoFiles = Object.keys(photoNarrativeByFile);

const memoryPhotos = memoryPhotoFiles.map((file) => resolveMemoryImage(file)).filter(Boolean);

// 合併所有照片：先顯示 hero 照片，再顯示 memories 照片
const photos = [...heroPhotos, ...memoryPhotos];

const currentPhotoIndex = ref(0);
const isTransitioning = ref(false);
let photoInterval = null;
let transitionFallbackId = 0;
let pendingSwap = false;

const highlightPhoto = computed(() => photos[currentPhotoIndex.value] || '');

const finalizeTransition = () => {
  if (!pendingSwap) {
    return;
  }

  currentPhotoIndex.value = (currentPhotoIndex.value + 1) % photos.length;
  pendingSwap = false;

  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      isTransitioning.value = false;
    });
  });
};

const handleTransitionEnd = (event) => {
  if (!pendingSwap || event.propertyName !== 'opacity') {
    return;
  }

  if (transitionFallbackId) {
    clearTimeout(transitionFallbackId);
    transitionFallbackId = 0;
  }

  finalizeTransition();
};

// 切換照片
const switchPhoto = () => {
  if (photos.length < 2) {
    return;
  }

  if (pendingSwap) {
    return;
  }

  pendingSwap = true;
  isTransitioning.value = true;

  if (!photoElement.value) {
    finalizeTransition();
    return;
  }

  transitionFallbackId = window.setTimeout(() => {
    transitionFallbackId = 0;
    finalizeTransition();
  }, TRANSITION_FALLBACK_MS);
};

onMounted(() => {
  if (photoElement.value) {
    photoElement.value.addEventListener('transitionend', handleTransitionEnd);
  }

  // 每 5 秒預先觸發一次切換，讓淡出與淡入保持同步
  photoInterval = window.setInterval(() => {
    switchPhoto();
  }, PHOTO_INTERVAL_MS);
});

onUnmounted(() => {
  if (photoInterval) {
    clearInterval(photoInterval);
  }

  if (transitionFallbackId) {
    clearTimeout(transitionFallbackId);
  }

  if (photoElement.value) {
    photoElement.value.removeEventListener('transitionend', handleTransitionEnd);
  }
});

const photoTotal = computed(() => photos.length || 1);
const currentPhotoNumber = computed(() => {
  if (!photos.length) return 0;
  return currentPhotoIndex.value + 1;
});

// 計算認識天數與交往天數
const knowDate = new Date('2023-02-18T00:00:00');
const togetherDate = new Date('2023-04-23T00:00:00');
const now = ref(new Date());
function getYearDayString(fromDate, nowDate) {
  const msPerDay = 1000 * 60 * 60 * 24;
  const totalDays = Math.floor((nowDate - fromDate) / msPerDay);
  const years = Math.floor(totalDays / 365);
  const days = totalDays % 365;
  return years > 0 ? `${years}年${days}天` : `${days}天`;
}

const knownYearDay = computed(() => getYearDayString(knowDate, now.value));
const togetherYearDay = computed(() => getYearDayString(togetherDate, now.value));
let clockTimer = null;

onUnmounted(() => {
  if (clockTimer) {
    window.clearInterval(clockTimer);
  }
});

onMounted(() => {
  clockTimer = window.setInterval(() => {
    now.value = new Date();
  }, 60000);
});
</script>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  border-radius: 52px;
  padding: clamp(2.6rem, 6vw, 5.4rem);
  margin-block-start: clamp(2rem, 5vw, 4rem);
  background:
    linear-gradient(145deg, rgba(255, 250, 245, 0.9), rgba(255, 238, 246, 0.92)),
    radial-gradient(circle at 14% 18%, rgba(255, 196, 215, 0.2), transparent 42%),
    radial-gradient(circle at 84% 78%, rgba(255, 218, 190, 0.2), transparent 48%);
  border: 1px solid rgba(212, 130, 155, 0.22);
  box-shadow:
    0 24px 80px rgba(188, 81, 120, 0.18);
  color: var(--primary-dark);
  isolation: isolate;
}

.hero__background {
  position: absolute;
  inset: -14% -8% -16%;
  pointer-events: none;
  overflow: hidden;
  z-index: var(--layer-section-bg);
}

.hero__wash {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 18% 22%, rgba(255, 255, 255, 0.65), transparent 45%),
    radial-gradient(circle at 82% 72%, rgba(255, 199, 224, 0.35), transparent 52%);
}

.hero__blob {
  position: absolute;
  width: clamp(220px, 28vw, 360px);
  height: clamp(220px, 28vw, 360px);
  border-radius: 44% 56% 50% 50% / 48% 40% 60% 52%;
  filter: blur(30px);
  opacity: 0.65;
  animation: blobPulse 14s ease-in-out infinite;
}

.hero__blob--a {
  top: -4%;
  left: 0;
  background: radial-gradient(circle, rgba(255, 187, 220, 0.8), transparent 72%);
}

.hero__blob--b {
  right: 4%;
  bottom: -4%;
  background: radial-gradient(circle, rgba(255, 223, 185, 0.75), transparent 72%);
  animation-delay: 4s;
}

.hero__grid {
  position: relative;
  display: grid;
  gap: clamp(2rem, 5vw, 4rem);
  grid-template-columns: minmax(0, 1.15fr) minmax(260px, 0.9fr);
  align-items: center;
  z-index: var(--layer-section-content);
}

.hero__content {
  display: grid;
  gap: 1.15rem;
  max-width: 39rem;
}

.hero__content>* {
  margin: 0;
}

.hero__meta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.65rem;
  align-items: center;
}

.hero__badge {
  padding: 0.46rem 1.2rem;
  border-radius: 999px;
  background: linear-gradient(135deg, rgba(235, 121, 162, 0.24), rgba(232, 150, 114, 0.2));
  color: var(--primary-dark);
  font-size: 0.76rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  box-shadow: 0 10px 24px rgba(244, 93, 144, 0.22);
  backdrop-filter: blur(12px);
}

.hero__chip {
  padding: 0.34rem 0.92rem;
  border-radius: 999px;
  font-size: 0.75rem;
  letter-spacing: 0.06em;
  background: rgba(244, 93, 144, 0.1);
  color: rgba(80, 33, 54, 0.8);
  border: 1px solid rgba(244, 93, 144, 0.2);
}

.hero__intro {
  font-size: 0.96rem;
  color: rgba(64, 31, 46, 0.74);
  letter-spacing: 0.12em;
  text-transform: uppercase;
  font-family: 'Cormorant Garamond', 'Noto Serif TC', serif;
}

.hero__title {
  display: grid;
  gap: 0.2rem;
}

.hero__title-line {
  font-family: 'Noto Serif TC', 'Songti TC', serif;
  font-size: clamp(1.35rem, 2.8vw, 2rem);
  line-height: 1.2;
  color: rgba(62, 26, 44, 0.92);
  letter-spacing: 0.02em;
}

.hero__title-line--accent {
  background: linear-gradient(120deg, rgba(62, 26, 44, 0.85), rgba(229, 84, 136, 0.9));
  background-size: 180% 180%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: titleShimmer 7s ease-in-out infinite;
}

.hero__metrics {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.8rem;
}

.hero__metric {
  display: grid;
  gap: 0.35rem;
  padding: 0.88rem 0.95rem;
  border-radius: 16px;
  background: linear-gradient(155deg, rgba(242, 159, 192, 0.22), rgba(248, 184, 150, 0.18));
  border: 1px solid rgba(226, 140, 169, 0.24);
  box-shadow: 0 8px 20px rgba(176, 75, 111, 0.14);
}

.hero__metric-label {
  font-size: 0.8rem;
  color: rgba(66, 33, 48, 0.72);
  letter-spacing: 0.06em;
}

.hero__metric-value {
  font-weight: 800;
  font-size: 1.08rem;
  color: var(--primary);
  letter-spacing: 0.03em;
  font-family: 'Playfair Display', 'Noto Serif TC', 'Times New Roman', serif;
  text-shadow: 0 8px 18px rgba(244, 93, 144, 0.18);
}

.hero__subtitle {
  font-size: 1.03rem;
  line-height: 1.78;
  color: rgba(55, 30, 42, 0.8);
  max-width: 34rem;
  font-family: 'Noto Serif TC', 'Songti TC', serif;
}

.hero__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
  margin-top: 0.2rem;
}

.btn-primary {
  border-radius: 999px;
  padding: 0.9rem 1.75rem;
  border: none;
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: 0.08em;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease, filter 0.3s ease;
}

.btn-primary {
  background: linear-gradient(135deg, #d84f7e, #be3b64 52%, #8d2a4a);
  color: #fff;
  box-shadow: 0 14px 30px rgba(200, 76, 122, 0.36);
}

.btn-primary:hover,
.btn-primary:focus-visible {
  transform: translateY(-3px) scale(1.01);
  box-shadow: 0 20px 42px rgba(200, 76, 122, 0.42);
  filter: saturate(1.08);
}

.btn-primary:focus-visible {
  outline: 3px solid rgba(255, 255, 255, 0.74);
  outline-offset: 2px;
}

.hero__signature {
  font-size: 1rem;
  color: rgba(66, 33, 49, 0.82);
  letter-spacing: 0.06em;
  font-family: 'Cormorant Garamond', 'Noto Serif TC', serif;
}

.hero__visual {
  position: relative;
  display: grid;
  gap: 0.85rem;
  justify-items: center;
}

.hero__visual-kicker {
  margin: 0;
  font-size: 0.72rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(81, 39, 57, 0.65);
}

.hero__visual-frame {
  position: relative;
  width: 100%;
  border-radius: 20px;
  overflow: hidden;
  box-shadow:
    0 20px 48px rgba(51, 28, 46, 0.22),
    0 4px 14px rgba(188, 81, 120, 0.16);
  animation: floatSoft 7s ease-in-out infinite;
}

.hero__visual-frame::after {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.42),
    inset 0 1px 0 rgba(255, 228, 238, 0.55);
  pointer-events: none;
  z-index: 1;
}

.hero__visual-photo {
  display: block;
  width: 100%;
  height: auto;
  border-radius: 0;
  box-shadow: none;
  animation: photoGlow 12s ease-in-out infinite;
  transition: opacity 0.6s ease-in-out, transform 0.6s ease-in-out, filter 0.6s ease-in-out;
}

.hero__visual-photo--transitioning {
  opacity: 0;
  transform: scale(0.95);
  filter: blur(8px);
}

.hero__visual-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.8rem;
  width: 100%;
  padding: 0.15rem 0.25rem 0;
}

.hero__visual-count {
  margin: 0;
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  color: rgba(82, 39, 58, 0.66);
  text-transform: uppercase;
}

.hero__visual-caption {
  margin: 0;
  font-size: 0.92rem;
  line-height: 1.6;
  color: rgba(59, 30, 43, 0.78);
}

@media (max-width: 900px) {
  .hero__grid {
    grid-template-columns: 1fr;
  }

  .hero__visual {
    order: -1;
    max-width: 480px;
    width: 100%;
    margin-inline: auto;
  }
}

@media (max-width: 960px) {
  .hero {
    border-radius: 34px;
    padding: clamp(2.4rem, 8vw, 3.8rem);
  }

  .hero__meta-row {
    justify-content: center;
  }

  .hero__content {
    justify-items: center;
    text-align: center;
  }

  .hero__subtitle {
    max-width: 36rem;
  }
}

@media (max-width: 640px) {
  .hero {
    border-radius: 28px;
    padding: 2rem 1.2rem;
  }

  .hero__title-line {
    font-size: clamp(1.2rem, 5.5vw, 1.6rem);
  }

  .hero__metrics {
    grid-template-columns: 1fr;
  }

  .hero__cta {
    justify-content: center;
  }

  .hero__visual-photo {
    width: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {

  .hero__blob,
  .hero__title-line--accent,
  .hero__visual-frame,
  .hero__visual-photo,
  .btn-primary {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}

@keyframes blobPulse {

  0%,
  100% {
    transform: scale(0.94) rotate(0deg);
    opacity: 0.65;
  }

  50% {
    transform: scale(1.05) rotate(8deg);
    opacity: 0.82;
  }
}

@keyframes floatSoft {

  0%,
  100% {
    transform: translateY(-5px);
  }

  50% {
    transform: translateY(6px);
  }
}

@keyframes titleShimmer {
  0% {
    filter: drop-shadow(0 0 0 rgba(233, 90, 139, 0.2));
    background-position: 0% 50%;
  }

  50% {
    filter: drop-shadow(0 8px 20px rgba(233, 90, 139, 0.25));
    background-position: 100% 50%;
  }

  100% {
    filter: drop-shadow(0 0 0 rgba(233, 90, 139, 0.2));
    background-position: 0% 50%;
  }
}

@keyframes photoGlow {

  0%,
  100% {
    filter: saturate(1) brightness(1);
  }

  50% {
    filter: saturate(1.14) brightness(1.06);
  }
}
</style>
