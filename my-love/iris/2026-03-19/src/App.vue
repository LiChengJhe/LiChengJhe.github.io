<template>
  <div class="page" :data-node="currentNode.id" :data-perf="perfMode">
    <FloatingPetalsFX />
    <SegueTransition :show="isTransitioning" :title="transitionTitle" />

    <header class="journey-header">
      <p class="journey-header__eyebrow">Anniversary · 2026/04/23</p>
      <h1 class="journey-header__title">櫻花結緣物語</h1>
      <p class="journey-header__meta">
        已解鎖節點 {{ visitedCount }} / {{ totalNodes }}
      </p>
      <div class="journey-header__actions">
        <button class="journey-header__audio" type="button" @click="playMelody">
          {{ audioButtonLabel }}
        </button>
        <button class="journey-header__reset" type="button" @click="restartJourney">
          重置旅程
        </button>
      </div>
      <p v-if="audioStatusMessage" class="journey-header__status">{{ audioStatusMessage }}</p>
      <div class="journey-progress" role="progressbar" :aria-valuemin="0" :aria-valuemax="100" :aria-valuenow="progressPercent">
        <div class="journey-progress__fill" :style="{ width: `${progressPercent}%` }"></div>
      </div>
      <p class="journey-progress__label">
        旅程進度 {{ progressPercent }}%
      </p>
      <p class="journey-header__hint">
        一張接一張，把所有照片串成同一段旅程。
      </p>
    </header>

    <main>
      <HeroSection
        v-if="currentNode.type === 'hero'"
        @start-journey="advanceWithTransition"
        @play-melody="playMelody"
      />
      <NarrativeNode
        v-else
        :node="currentNode"
        @choose="chooseWithTransition"
        @advance="advanceWithTransition"
        @restart="restartJourney"
      />
    </main>

    <ChapterNavigator
      :disable-previous="!canGoPrevious"
      :disable-next="!canGoNext"
      :disable-home="!canGoHome"
      @previous="goPreviousWithTransition"
      @next="advanceWithTransition"
      @home="goHomeWithTransition"
    />

  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, ref } from 'vue';
import ChapterNavigator from './components/ChapterNavigator.vue';
import FloatingPetalsFX from './components/FloatingPetalsFX.vue';
import HeroSection from './components/HeroSection.vue';
import NarrativeNode from './components/NarrativeNode.vue';
import SegueTransition from './components/SegueTransition.vue';
import { useNarrativeGraph } from './composables/useNarrativeGraph';
import { storyGraph } from './data/storyGraph';
import melodySrc from './assets/audio/melody.mp3';

const {
  currentNode,
  visitedCount,
  choose,
  advance,
  goBack,
  goHome,
  restart,
  perfMode,
  goToNodeWithTransition,
  canGoBack
} = useNarrativeGraph();
const totalNodes = computed(() => Object.keys(storyGraph).length);
const progressPercent = computed(() => Math.round((visitedCount.value / totalNodes.value) * 100));

const isTransitioning = ref(false);
const transitionTitle = ref('櫻花飄落中...');

let audioContext;
let audioElement;
let audioSource;
const isAudioPlaying = ref(false);
const audioStatusMessage = ref('');

const audioButtonLabel = computed(() => {
  return isAudioPlaying.value ? '暫停氛圍旋律' : '播放宮崎駿感氛圍旋律';
});

const canGoPrevious = computed(() => canGoBack.value);
const canGoNext = computed(() => {
  if (currentNode.value.type === 'hero') {
    return Boolean(currentNode.value.next);
  }
  return Boolean(currentNode.value.next && !currentNode.value.options?.length);
});
const canGoHome = computed(() => currentNode.value.id !== 'hero-opening');

const withTransition = async (targetNodeId, commitNavigation) => {
  isTransitioning.value = true;
  transitionTitle.value = `前往 ${storyGraph[targetNodeId]?.title || '下一幕'}...`;

  await new Promise((resolve) => {
    window.setTimeout(resolve, 680);
  });

  if (typeof commitNavigation === 'function') {
    commitNavigation();
  } else {
    goToNodeWithTransition(targetNodeId);
  }
  isTransitioning.value = false;
};

const chooseWithTransition = async (choiceId) => {
  const targetId = choose(choiceId, { dryRun: true, recordChoice: true });
  if (!targetId) return;
  await withTransition(targetId);
};

const advanceWithTransition = async () => {
  const targetId = advance({ dryRun: true });
  if (!targetId) return;
  await withTransition(targetId);
};

const goPreviousWithTransition = async () => {
  const targetId = goBack({ dryRun: true });
  if (!targetId) return;
  await withTransition(targetId, () => {
    goBack();
  });
};

const goHomeWithTransition = async () => {
  const targetId = goHome({ dryRun: true });
  if (!targetId) return;
  await withTransition(targetId, () => {
    goHome();
  });
};

const restartJourney = () => {
  restart();
  audioStatusMessage.value = '已重置旅程進度。';
};

const playMelody = async () => {
  try {
    if (!audioContext) {
      audioContext = new AudioContext();
    }

    if (!audioElement) {
      audioElement = new Audio(melodySrc);
      audioElement.preload = 'auto';
      audioElement.addEventListener('ended', handleAudioEnded);
      audioSource = audioContext.createMediaElementSource(audioElement);
      audioSource.connect(audioContext.destination);
    }

    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }

    if (isAudioPlaying.value) {
      audioElement.pause();
      isAudioPlaying.value = false;
      audioStatusMessage.value = '已暫停背景旋律。';
      return;
    }

    await audioElement.play();
    isAudioPlaying.value = true;
    audioStatusMessage.value = '正在播放原創日系氛圍旋律。';
  } catch (error) {
    audioStatusMessage.value = '音樂播放失敗，請再點一次按鈕。';
    console.warn('音樂播放失敗：', error);
  }
};

const handleAudioEnded = () => {
  isAudioPlaying.value = false;
  audioStatusMessage.value = '旋律播放完畢。';
};

onBeforeUnmount(() => {
  if (audioElement) {
    audioElement.removeEventListener('ended', handleAudioEnded);
    audioElement.pause();
    audioElement.removeAttribute('src');
    audioElement.load();
    audioElement = null;
  }

  if (audioSource) {
    audioSource.disconnect();
    audioSource = null;
  }

  if (audioContext) {
    audioContext.close();
    audioContext = null;
  }
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

.journey-header__audio {
  border: none;
  border-radius: 999px;
  padding: 0.72rem 1rem;
  cursor: pointer;
  color: #fff;
  background: linear-gradient(120deg, #eb7397, #d84d78);
}

.journey-header__actions {
  margin-top: 0.85rem;
  display: flex;
  justify-content: center;
  gap: 0.6rem;
  flex-wrap: wrap;
}

.journey-header__reset {
  border: 1px solid rgba(195, 102, 131, 0.35);
  border-radius: 999px;
  padding: 0.72rem 1rem;
  cursor: pointer;
  color: #8f4159;
  background: #fff8fb;
}

.journey-header__status {
  margin-top: 0.55rem;
  color: #8a4f61;
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
  .journey-header__audio,
  .journey-header__reset {
    width: 100%;
  }
}
</style>
