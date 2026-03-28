<template>
  <div class="page" :data-node="currentNode.id" :data-perf="perfMode">
    <FloatingPetalsFX />

    <header class="journey-header">
      <p class="journey-header__eyebrow">Anniversary · 2026/04/23</p>
      <h1 class="journey-header__title">櫻花結緣物語</h1>
      <p class="journey-header__meta">
        已解鎖節點 {{ visitedCount }} / {{ totalNodes }}
      </p>
      <div class="journey-progress" role="progressbar" :aria-valuemin="0" :aria-valuemax="100" :aria-valuenow="progressPercent">
        <div class="journey-progress__fill" :style="{ width: `${progressPercent}%` }"></div>
      </div>
      <p class="journey-progress__label">
        旅程進度 {{ progressPercent }}%
      </p>

    </header>

    <main>
      <HeroSection
        v-if="currentNode.type === 'hero'"
        @start-journey="startJourney"
      />
      <NarrativeNode
        v-else
        :node="currentNode"
        @choose="choose"
      />
    </main>

    <ChapterNavigator
      v-if="currentNode.type !== 'hero'"
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

  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import ChapterNavigator from './components/ChapterNavigator.vue';
import FloatingPetalsFX from './components/FloatingPetalsFX.vue';
import HeroSection from './components/HeroSection.vue';
import NarrativeNode from './components/NarrativeNode.vue';
import { useNarrativeGraph } from './composables/useNarrativeGraph';
import { storyGraph } from './data/storyGraph';

const {
  currentNode,
  visitedCount,
  choose,
  advance,
  goBack,
  goHome,
  perfMode,
  goToNodeWithTransition,
  canGoBack
} = useNarrativeGraph();
const totalNodes = computed(() => Object.keys(storyGraph).length);
const progressPercent = computed(() => Math.round((visitedCount.value / totalNodes.value) * 100));

const canGoPrevious = computed(() => canGoBack.value);
const canGoNext = computed(() => {
  if (currentNode.value.type === 'hero') {
    return Boolean(currentNode.value.next);
  }
  return Boolean(currentNode.value.next && !currentNode.value.options?.length);
});
const canGoHome = computed(() => currentNode.value.id !== 'hero-opening');

const AUTO_PLAYABLE_TYPES = new Set(['intro', 'scene', 'finale']);
let autoAdvanceTimer = null;
const isPaused = ref(false);

const isAutoPlayable = computed(() => {
  const node = currentNode.value;
  return AUTO_PLAYABLE_TYPES.has(node.type) && !node.options?.length && Boolean(node.next);
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
    if (node.options?.length || !node.next) return;

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
  max-width: 860px;
  margin: 0 auto clamp(1.2rem, 3vw, 2rem);
  text-align: center;
}

.journey-header__eyebrow {
  font-size: 0.78rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #9f5f6c;
}

.journey-header__title {
  margin-top: 0.35rem;
  font-size: clamp(2rem, 5.2vw, 3.2rem);
}

.journey-header__meta {
  margin-top: 0.4rem;
  color: #7d5660;
}

.journey-header__hint {
  margin-top: 0.35rem;
  color: #8a5b67;
  font-size: 0.92rem;
}

.journey-progress {
  margin: 0.75rem auto 0;
  width: min(640px, 100%);
  height: 10px;
  border-radius: 999px;
  background: rgba(255, 216, 228, 0.75);
  overflow: hidden;
}

.journey-progress__fill {
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(120deg, #f595b5, #de5f89);
  transition: width 0.38s ease;
}

.journey-progress__label {
  margin-top: 0.4rem;
  font-size: 0.88rem;
  color: #7d5761;
}

main {
  position: relative;
  z-index: var(--layer-section-content);
}

@media (max-width: 700px) {
  .page {
    padding: 0.9rem 0.9rem calc(7.2rem + env(safe-area-inset-bottom));
  }

  .journey-header {
    margin-bottom: 1rem;
  }
}
</style>
