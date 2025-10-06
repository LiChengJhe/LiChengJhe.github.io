<template>
  <div class="page">
    <FloatingHearts />

    <main>
      <HeroSection nickname="鮭魚子" signature="存摺子" @start-journey="scrollToTimeline" @play-melody="playMelody" />

      <div ref="timelineWrapper">
        <LoveTimeline />
      </div>

      <MemoryGallery />

      <WishSection />

      <ProposalInteractive />

    </main>
  </div>
</template>

<script setup>
import { onBeforeUnmount, ref } from 'vue';
import FloatingHearts from './components/FloatingHearts.vue';
import HeroSection from './components/HeroSection.vue';
import LoveTimeline from './components/LoveTimeline.vue';
import MemoryGallery from './components/MemoryGallery.vue';
import WishSection from './components/WishSection.vue';
import ProposalInteractive from './components/ProposalInteractive.vue';
import melodySrc from './assets/audio/melody.mp3';

const timelineWrapper = ref(null);
let audioContext;
let audioElement;
let audioSource;

const scrollToTimeline = () => {
  timelineWrapper.value?.scrollIntoView({ behavior: 'smooth' });
};

const playMelody = async () => {
  try {
    if (!audioContext) {
      audioContext = new AudioContext();
    }

    if (!audioElement) {
      audioElement = new Audio(melodySrc);
      audioElement.preload = 'auto';
      audioSource = audioContext.createMediaElementSource(audioElement);
      audioSource.connect(audioContext.destination);
    }

    if (audioContext.state === 'suspended') {
      await audioContext.resume();
    }

    audioElement.currentTime = 0;

    await audioElement.play();
  } catch (error) {
    console.warn('音樂播放失敗或 Web Audio 不被支援：', error);
  }
};

onBeforeUnmount(() => {
  if (audioElement) {
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
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-x: hidden;
}

main {
  position: relative;
  z-index: 1;
}
</style>
