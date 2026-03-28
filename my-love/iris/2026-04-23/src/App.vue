<template>
  <div class="page" :data-node="currentNode.id" :data-perf="perfMode">
    <FloatingPetalsFX />

    <header class="journey-header">
      <div class="journey-header__card">
        <p class="journey-header__eyebrow">Anniversary · 2026/04/23</p>
        <h1 class="journey-header__title">櫻花結緣物語</h1>
        <p class="journey-header__meta">
          已解鎖篇章 {{ visitedCount }} / {{ totalNodes }}
        </p>

        <div class="journey-header__stats" aria-hidden="true">
          <span class="journey-header__pill">已解鎖 <strong>{{ visitedCount }}</strong></span>
          <span class="journey-header__pill">總篇章 <strong>{{ totalNodes }}</strong></span>
        </div>

        <div class="journey-progress-wrap" aria-hidden="true">
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

const getAutoAdvanceDelayMs = (node) => {
  const textLength = (node.body || '').replace(/\s/g, '').length;
  const scaledDelay = 2600 + textLength * 34;
  return Math.min(9000, Math.max(3200, scaledDelay));
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
  text-align: center;
  padding: clamp(1rem, 3vw, 1.6rem) clamp(0.95rem, 4vw, 2rem) 1.1rem;
  border-radius: 28px;
  background:
    linear-gradient(160deg, rgba(255, 255, 255, 0.5), rgba(255, 237, 244, 0.36)),
    radial-gradient(circle at 12% 0%, rgba(255, 206, 225, 0.26), transparent 42%);
  border: 1px solid rgba(218, 137, 170, 0.3);
  box-shadow:
    0 18px 42px rgba(168, 75, 113, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.7);
}

.journey-header__card::before {
  content: '';
  position: absolute;
  inset: 8px;
  border-radius: calc(28px - 8px);
  border: 1px solid rgba(255, 255, 255, 0.55);
  pointer-events: none;
}

.journey-header__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.26rem 0.74rem;
  border-radius: 999px;
  font-size: 0.78rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #8a4f5d;
  background: rgba(255, 242, 247, 0.84);
  border: 1px solid rgba(222, 153, 181, 0.35);
}

.journey-header__title {
  margin-top: 0.35rem;
  font-size: clamp(1.4rem, 3.8vw, 2.2rem);
  line-height: 1.1;
  text-shadow: 0 14px 24px rgba(184, 82, 122, 0.16);
}

.journey-header__meta {
  margin-top: 0.4rem;
  color: #7d5660;
}

.journey-header__stats {
  margin-top: 0.7rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.55rem;
  justify-content: center;
}

.journey-header__pill {
  display: inline-flex;
  align-items: baseline;
  gap: 0.3rem;
  padding: 0.28rem 0.72rem;
  border-radius: 999px;
  background: linear-gradient(120deg, rgba(247, 186, 208, 0.32), rgba(249, 211, 186, 0.3));
  border: 1px solid rgba(217, 128, 165, 0.3);
  color: #83505f;
  font-size: 0.8rem;
}

.journey-header__pill strong {
  font-size: 0.88rem;
  color: #c84574;
}

.journey-header__hint {
  margin-top: 0.35rem;
  color: #8a5b67;
  font-size: 0.92rem;
}

.journey-progress-wrap {
  margin: 0.75rem auto 0;
  width: min(640px, 100%);
  position: relative;
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
  transform: translate(-50%, -82%);
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
  margin-top: 0.4rem;
  font-size: 0.88rem;
  color: #7d5761;
  display: inline-flex;
  align-items: baseline;
  gap: 0.4rem;
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
