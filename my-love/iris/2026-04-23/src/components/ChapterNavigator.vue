<template>
  <nav class="chapter-nav" aria-label="章節導航">
    <button
      class="chapter-nav__btn"
      type="button"
      :disabled="disablePrevious"
      aria-label="上一步"
      @click="$emit('previous')"
    >
      <span class="mdi mdi-arrow-left"></span>
    </button>
    <button
      class="chapter-nav__btn chapter-nav__btn--primary"
      type="button"
      :disabled="disableNext"
      aria-label="下一步"
      @click="$emit('next')"
    >
      <span class="mdi mdi-arrow-right"></span>
    </button>
    <button
      class="chapter-nav__btn"
      type="button"
      :disabled="disableHome"
      aria-label="回到旅程起點"
      @click="$emit('home')"
    >
      <span class="mdi mdi-home-heart"></span>
    </button>
    <button
      v-if="isAutoPlayable"
      class="chapter-nav__btn chapter-nav__btn--pause"
      type="button"
      @click="$emit('toggle-pause')"
      :aria-label="isPaused ? '繼續自動播放' : '暫停自動播放'"
    >
      <span :class="['mdi', isPaused ? 'mdi-play' : 'mdi-pause']"></span>
    </button>
  </nav>
</template>

<script setup>
defineProps({
  disablePrevious: {
    type: Boolean,
    default: false
  },
  disableNext: {
    type: Boolean,
    default: false
  },
  disableHome: {
    type: Boolean,
    default: false
  },
  isAutoPlayable: {
    type: Boolean,
    default: false
  },
  isPaused: {
    type: Boolean,
    default: false
  }
});

defineEmits(['previous', 'next', 'home', 'toggle-pause']);
</script>

<style scoped>
.chapter-nav {
  margin: 1rem auto 0;
  max-width: 860px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.7rem;
}

.chapter-nav__btn {
  width: 44px;
  height: 44px;
  flex-shrink: 0;
  border: 1px solid rgba(195, 102, 131, 0.32);
  border-radius: 50%;
  background: rgba(255, 250, 252, 0.95);
  color: #8f4159;
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
  padding: 0;
}

.chapter-nav__btn .mdi {
  font-size: 1.6rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chapter-nav__btn:hover:enabled {
  transform: translateY(-1px);
  box-shadow: 0 10px 22px rgba(195, 102, 131, 0.18);
}

.chapter-nav__btn--primary {
  border: none;
  background: linear-gradient(120deg, #eb7397, #d84d78);
  color: #fff;
}

.chapter-nav__btn--pause {
  border-color: rgba(150, 102, 195, 0.32);
  color: #6a3d8f;
}

.chapter-nav__btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

@media (max-width: 700px) {
  .chapter-nav {
    position: sticky;
    bottom: calc(0.7rem + env(safe-area-inset-bottom));
    z-index: var(--layer-floating-ui);
    padding: 0.6rem;
    border-radius: 20px;
    background: rgba(255, 248, 251, 0.86);
    border: 1px solid rgba(195, 102, 131, 0.2);
    box-shadow: 0 20px 44px rgba(137, 72, 94, 0.22);
    -webkit-backdrop-filter: blur(8px);
    backdrop-filter: blur(8px);
  }
}
</style>
