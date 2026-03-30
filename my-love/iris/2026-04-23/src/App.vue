<template>
  <div class="page" :data-node="currentNode.id" :data-perf="perfMode">
    <FloatingPetalsFX />

    <header class="journey-header">
      <div class="journey-header__card">
        <span class="journey-header__orb journey-header__orb--left" aria-hidden="true"></span>
        <span class="journey-header__orb journey-header__orb--right" aria-hidden="true"></span>
        <p class="journey-header__eyebrow">Anniversary · 2026/04/23</p>
        <h1 class="journey-header__title">櫻花結緣物語</h1>
        <p class="journey-header__meta">
          已解鎖篇章 <strong>{{ visitedCount }}</strong> / <strong>{{ totalNodes }}</strong>
        </p>

        <div class="journey-progress-wrap">
          <div class="journey-progress__pair" :style="{ left: `${runnerPercent}%` }">
            <svg class="journey-progress__pair-svg" viewBox="0 0 64 28" role="presentation" focusable="false">
              <circle cx="18" cy="7" r="3" />
              <line x1="18" y1="10" x2="18" y2="17" />
              <line x1="18" y1="12" x2="25" y2="14" />
              <line x1="18" y1="12" x2="12" y2="14" />
              <line class="journey-progress__leg-a" x1="18" y1="17" x2="14" y2="24" />
              <line class="journey-progress__leg-b" x1="18" y1="17" x2="23" y2="24" />

              <circle cx="36" cy="7" r="3" />
              <line x1="36" y1="10" x2="36" y2="17" />
              <line x1="36" y1="12" x2="29" y2="14" />
              <line x1="36" y1="12" x2="42" y2="14" />
              <line class="journey-progress__leg-b" x1="36" y1="17" x2="32" y2="24" />
              <line class="journey-progress__leg-a" x1="36" y1="17" x2="41" y2="24" />

              <line class="journey-progress__hand-link" x1="25" y1="14" x2="29" y2="14" />
            </svg>
          </div>
          <div class="journey-progress" role="progressbar" :aria-valuemin="0" :aria-valuemax="100" :aria-valuenow="progressPercent">
            <div class="journey-progress__fill" :style="{ width: `${progressPercent}%` }"></div>
          </div>
        </div>
        <p class="journey-progress__label">
          <span>旅程進度</span>
          <strong>{{ progressPercent }}%</strong>
        </p>
      </div>

    </header>

    <main>
      <HeroSection
        v-if="currentNode.type === 'hero'"
        @start-journey="startJourney"
      />
      <template v-else>
        <ChapterNavigator
          :disable-previous="!canGoPrevious"
          :disable-next="!canGoNext"
          :disable-home="!canGoHome"
          :is-auto-playable="isAutoPlayable"
          :is-paused="isPaused"
          @previous="manualGoBack"
          @next="manualAdvance"
          @home="goHome"
          @toggle-pause="togglePause"
        />
        <NarrativeNode
          :node="currentNode"
          :keep-focus-during-playback="!isPaused"
        />
      </template>
    </main>

  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import ChapterNavigator from './components/ChapterNavigator.vue';
import FloatingPetalsFX from './components/FloatingPetalsFX.vue';
import HeroSection from './components/AnniversaryLetter.vue';
import NarrativeNode from './components/NarrativeNode.vue';
import { useNarrativeGraph } from './composables/useNarrativeGraph';
import { storyGraph } from './data/storyGraph';

const {
  currentNode,
  visitedCount: visitedNodeCount,
  advance,
  goBack,
  goHome,
  perfMode,
  canGoBack
} = useNarrativeGraph();
const totalNodes = computed(() => Math.max(1, Object.keys(storyGraph).length - 1));
const visitedCount = computed(() => Math.max(0, visitedNodeCount.value - 1));
const progressPercent = computed(() => Math.round((visitedCount.value / totalNodes.value) * 100));
const runnerPercent = computed(() => Math.min(96, Math.max(4, progressPercent.value)));

const canGoPrevious = computed(() => canGoBack.value);
const canGoNext = computed(() => Boolean(currentNode.value.next));
const canGoHome = computed(() => currentNode.value.id !== 'hero-opening');

const AUTO_PLAYABLE_TYPES = new Set(['scene', 'finale']);
const TEXT_REVEAL_INTERVAL_MS = 360;
const CJK_CHARS_PER_SECOND = 10;
const ENGLISH_WORDS_PER_SECOND = 3.6;
const NUMBER_TOKENS_PER_SECOND = 4.2;
const SYMBOLS_PER_SECOND = 11;
let autoAdvanceTimer = null;
const isPaused = ref(false);

const isAutoPlayable = computed(() => {
  const node = currentNode.value;
  return AUTO_PLAYABLE_TYPES.has(node.type) && Boolean(node.next);
});

const togglePause = () => {
  isPaused.value = !isPaused.value;
  if (!isPaused.value && isAutoPlayable.value) {
    scheduleAutoAdvance(currentNode.value);
  } else {
    clearAutoAdvanceTimer();
  }
};

const manualAdvance = () => {
  isPaused.value = true;
  clearAutoAdvanceTimer();
  advance();
};

const manualGoBack = () => {
  isPaused.value = true;
  clearAutoAdvanceTimer();
  goBack();
};

const startJourney = () => {
  isPaused.value = false;
  advance();
};

const clearAutoAdvanceTimer = () => {
  if (autoAdvanceTimer !== null) {
    window.clearTimeout(autoAdvanceTimer);
    autoAdvanceTimer = null;
  }
};

const getEstimatedReadingDurationMs = (node) => {
  const text = [node.title, node.subtitle, node.body].filter(Boolean).join('\n');
  const cjkCount = (text.match(/[\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}]/gu) || []).length;
  const englishWordCount = (text.match(/[A-Za-z]+(?:'[A-Za-z]+)*/g) || []).length;
  const numberTokenCount = (text.match(/\d+(?:[.,:/-]\d+)*/g) || []).length;
  const nonSpaceCharCount = text.replace(/\s/g, '').length;
  const latinCharCount = (text.match(/[A-Za-z]/g) || []).length;
  const numberCharCount = (text.match(/\d/g) || []).length;
  const symbolCount = Math.max(0, nonSpaceCharCount - cjkCount - latinCharCount - numberCharCount);

  const readingSeconds =
    cjkCount / CJK_CHARS_PER_SECOND +
    englishWordCount / ENGLISH_WORDS_PER_SECOND +
    numberTokenCount / NUMBER_TOKENS_PER_SECOND +
    symbolCount / SYMBOLS_PER_SECOND;

  return Math.ceil(readingSeconds * 1000);
};

const getAutoAdvanceDelayMs = (node) => {
  const bodyLineCount = (node.body || '').split('\n').filter(Boolean).length;
  const revealDuration = bodyLineCount * TEXT_REVEAL_INTERVAL_MS;
  const readingDuration = getEstimatedReadingDurationMs(node);
  const scaledDelay = revealDuration + readingDuration + 500;
  return Math.min(12000, Math.max(2600, scaledDelay));
};

const scheduleAutoAdvance = (node) => {
  clearAutoAdvanceTimer();
  autoAdvanceTimer = window.setTimeout(() => {
    autoAdvanceTimer = null;
    advance();
  }, getAutoAdvanceDelayMs(node));
};

watch(
  () => currentNode.value,
  (node) => {
    clearAutoAdvanceTimer();
    if (isPaused.value) return;

    if (!AUTO_PLAYABLE_TYPES.has(node.type)) return;
    if (!node.next) return;

    scheduleAutoAdvance(node);
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  clearAutoAdvanceTimer();
});
</script>

<style scoped>
.page {
  min-height: 100vh;
  position: relative;
  padding: clamp(1rem, 3vw, 2rem) clamp(1rem, 5vw, 4rem) clamp(5rem, 8vw, 7rem);
}

.journey-header {
  position: relative;
  z-index: var(--layer-section-content);
  max-width: 900px;
  margin: 0 auto clamp(1.2rem, 3vw, 2rem);
}

.journey-header__card {
  position: relative;
  overflow: hidden;
  text-align: center;
  padding: clamp(1rem, 3vw, 1.75rem) clamp(0.95rem, 4vw, 2rem) 1.2rem;
  border-radius: 28px;
  background:
    linear-gradient(155deg, rgba(255, 255, 255, 0.62), rgba(255, 237, 244, 0.42) 52%, rgba(253, 230, 208, 0.4)),
    radial-gradient(circle at 12% 0%, rgba(255, 206, 225, 0.28), transparent 42%),
    radial-gradient(circle at 92% 100%, rgba(255, 210, 189, 0.24), transparent 44%);
  border: 1px solid rgba(218, 137, 170, 0.34);
  box-shadow:
    0 18px 42px rgba(168, 75, 113, 0.18),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(6px);
}

.journey-header__card::before {
  content: '';
  position: absolute;
  inset: 8px;
  border-radius: calc(28px - 8px);
  border: 1px solid rgba(255, 255, 255, 0.55);
  pointer-events: none;
}

.journey-header__card::after {
  content: '';
  position: absolute;
  inset: -40% auto auto -20%;
  width: 55%;
  height: 170%;
  background: linear-gradient(120deg, rgba(255, 255, 255, 0.32), rgba(255, 255, 255, 0));
  transform: rotate(18deg);
  pointer-events: none;
}

.journey-header__orb {
  position: absolute;
  width: 130px;
  height: 130px;
  border-radius: 999px;
  pointer-events: none;
  filter: blur(1px);
}

.journey-header__orb--left {
  top: -64px;
  left: -48px;
  background: radial-gradient(circle, rgba(255, 176, 206, 0.36), rgba(255, 176, 206, 0));
}

.journey-header__orb--right {
  right: -52px;
  bottom: -74px;
  background: radial-gradient(circle, rgba(255, 206, 170, 0.28), rgba(255, 206, 170, 0));
}

.journey-header__eyebrow {
  position: relative;
  z-index: 1;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.78rem;
  border-radius: 999px;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #8a4f5d;
  background: rgba(255, 242, 247, 0.9);
  border: 1px solid rgba(222, 153, 181, 0.35);
}

.journey-header__title {
  position: relative;
  z-index: 1;
  margin-top: 0.35rem;
  font-size: clamp(1.4rem, 3.8vw, 2.2rem);
  line-height: 1.1;
  color: #8b344f;
  letter-spacing: 0.01em;
  text-shadow: 0 14px 24px rgba(184, 82, 122, 0.16);
}

.journey-header__meta {
  position: relative;
  z-index: 1;
  margin: 0.56rem auto 0;
  width: fit-content;
  padding: 0.24rem 0.72rem;
  border-radius: 999px;
  color: #74424f;
  font-size: 0.9rem;
  background: rgba(255, 245, 249, 0.75);
  border: 1px solid rgba(219, 157, 182, 0.34);
}

.journey-header__meta strong {
  color: #c44573;
}

.journey-header__hint {
  margin-top: 0.35rem;
  color: #8a5b67;
  font-size: 0.92rem;
}

.journey-progress-wrap {
  position: relative;
  z-index: 1;
  margin: 0.9rem auto 0;
  padding-top: 0.25rem;
  width: min(640px, 100%);
}

.journey-progress {
  width: 100%;
  height: 11px;
  border-radius: 999px;
  background: linear-gradient(90deg, rgba(255, 218, 230, 0.74), rgba(255, 224, 205, 0.7));
  border: 1px solid rgba(229, 158, 186, 0.4);
  overflow: hidden;
  box-shadow: inset 0 2px 6px rgba(167, 95, 122, 0.12);
}

.journey-progress__fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(120deg, #f595b5, #de5f89);
  transition: width 0.38s ease;
  box-shadow: 0 6px 14px rgba(212, 88, 136, 0.28);
  position: relative;
}

.journey-progress__fill::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent 0%, rgba(255, 255, 255, 0.36) 45%, transparent 78%);
  animation: progressSweep 2.4s linear infinite;
}

.journey-progress__pair {
  position: absolute;
  top: 0;
  transform: translate(-50%, -52%);
  transition: left 0.38s ease;
  pointer-events: none;
  filter: drop-shadow(0 0.5px 1px rgba(124, 52, 78, 0.2));
}

.journey-progress__pair-svg {
  width: 44px;
  height: 20px;
  overflow: visible;
  fill: none;
  stroke: #9f4f69;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  animation: pairJog 0.65s ease-in-out infinite;
}

.journey-progress__hand-link {
  stroke: #c94f79;
  stroke-width: 2.2;
}

.journey-progress__leg-a {
  animation: pairLegA 0.5s ease-in-out infinite;
  transform-origin: center;
}

.journey-progress__leg-b {
  animation: pairLegB 0.5s ease-in-out infinite;
  transform-origin: center;
}

.journey-progress__label {
  margin-top: 0.48rem;
  width: fit-content;
  padding: 0.2rem 0.62rem;
  border-radius: 999px;
  font-size: 0.84rem;
  color: #7a4e5a;
  display: inline-flex;
  align-items: baseline;
  gap: 0.4rem;
  background: rgba(255, 242, 247, 0.72);
  border: 1px solid rgba(219, 157, 182, 0.3);
}

.journey-progress__label strong {
  font-size: 0.98rem;
  color: #cb4b78;
}

main {
  position: relative;
  z-index: var(--layer-section-content);
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 2.5vw, 1.8rem);
}

@media (max-width: 700px) {
  .page {
    padding: 0.9rem 0.9rem calc(7.2rem + env(safe-area-inset-bottom));
  }

  .journey-header {
    margin-bottom: 1rem;
  }

  .journey-header__card {
    border-radius: 22px;
    padding: 0.92rem 0.85rem 0.9rem;
  }

  .journey-header__card::before {
    border-radius: calc(22px - 8px);
  }

  .journey-header__title {
    font-size: clamp(1.2rem, 6vw, 1.7rem);
  }

  .journey-header__meta {
    font-size: 0.82rem;
  }

  .journey-progress {
    height: 10px;
  }
}

@keyframes progressSweep {
  0% {
    transform: translateX(-100%);
  }

  100% {
    transform: translateX(100%);
  }
}

@keyframes pairJog {
  0%,
  100% {
    transform: translateY(0);
  }

  50% {
    transform: translateY(-1px);
  }
}

@keyframes pairLegA {
  0%,
  100% {
    transform: rotate(8deg);
  }

  50% {
    transform: rotate(-8deg);
  }
}

@keyframes pairLegB {
  0%,
  100% {
    transform: rotate(-8deg);
  }

  50% {
    transform: rotate(8deg);
  }
}
</style>
