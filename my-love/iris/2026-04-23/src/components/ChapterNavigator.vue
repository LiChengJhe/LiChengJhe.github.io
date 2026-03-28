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
  --nav-btn-size: 44px;
  margin: clamp(0.4rem, 1.6vw, 0.9rem) auto 0;
  width: fit-content;
  max-width: 100%;
  padding: 0.4rem 0.48rem;
  border-radius: 999px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  background: linear-gradient(140deg, rgba(255, 252, 254, 0.88), rgba(255, 240, 248, 0.7));
  border: 1px solid rgba(201, 118, 146, 0.28);
  box-shadow:
    0 16px 36px rgba(137, 72, 94, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.68);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
}

.chapter-nav::before {
  content: '';
  position: absolute;
  inset: 1px;
  border-radius: inherit;
  background: linear-gradient(120deg, rgba(255, 255, 255, 0.3), rgba(255, 239, 247, 0));
  pointer-events: none;
}

.chapter-nav__btn {
  width: var(--nav-btn-size);
  height: var(--nav-btn-size);
  flex-shrink: 0;
  border: 1px solid rgba(195, 102, 131, 0.26);
  border-radius: 50%;
  position: relative;
  background: radial-gradient(circle at 30% 24%, rgba(255, 255, 255, 0.95), rgba(255, 247, 251, 0.9));
  color: #8f4159;
  font-size: 1.5rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;
  transition: transform 0.2s ease, color 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
  padding: 0;
  box-shadow:
    0 8px 16px rgba(195, 102, 131, 0.14),
    inset 0 1px 0 rgba(255, 255, 255, 0.88);
}

.chapter-nav__btn .mdi {
  font-size: 1.5rem;
  line-height: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chapter-nav__btn:hover:enabled {
  transform: translateY(-2px) scale(1.06);
  color: #c93e6a;
  border-color: rgba(195, 84, 125, 0.45);
  box-shadow:
    0 14px 24px rgba(195, 102, 131, 0.24),
    inset 0 1px 0 rgba(255, 255, 255, 0.9);
}

.chapter-nav__btn:active:enabled {
  transform: translateY(0) scale(0.96);
}

.chapter-nav__btn--primary {
  border: none;
  background: linear-gradient(130deg, #ef7ea3 0%, #db547f 52%, #c43b66 100%);
  color: #fff;
  box-shadow:
    0 12px 24px rgba(216, 77, 120, 0.34),
    inset 0 1px 0 rgba(255, 213, 227, 0.58);
  animation: navPrimaryGlow 2.8s ease-in-out infinite;
}

.chapter-nav__btn--pause {
  border-color: rgba(150, 102, 195, 0.24);
  background: radial-gradient(circle at 30% 24%, rgba(255, 253, 255, 0.92), rgba(246, 237, 255, 0.86));
  color: #6a3d8f;
}

.chapter-nav__btn:focus-visible {
  outline: 2px solid rgba(214, 75, 118, 0.52);
  outline-offset: 2px;
}

.chapter-nav__btn:disabled {
  opacity: 0.42;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
  filter: grayscale(0.1);
}

@media (min-width: 1100px) {
  .chapter-nav {
    --nav-btn-size: 48px;
    gap: 0.85rem;
    padding: 0.42rem;
  }

  .chapter-nav__btn .mdi {
    font-size: 1.62rem;
  }
}

@media (max-width: 700px) {
  .chapter-nav {
    position: sticky;
    left: 0;
    right: 0;
    bottom: calc(0.7rem + env(safe-area-inset-bottom));
    width: min(100%, 340px);
    margin-inline: auto;
    justify-content: space-between;
    gap: 0.45rem;
    padding: 0.48rem 0.6rem;
    border-radius: 18px;
    z-index: var(--layer-floating-ui);
  }

  .chapter-nav__btn {
    --nav-btn-size: 42px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .chapter-nav__btn,
  .chapter-nav__btn--primary {
    transition-duration: 0.001ms !important;
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
  }
}

@keyframes navPrimaryGlow {
  0%,
  100% {
    box-shadow:
      0 12px 24px rgba(216, 77, 120, 0.3),
      inset 0 1px 0 rgba(255, 213, 227, 0.58);
  }

  50% {
    box-shadow:
      0 16px 28px rgba(216, 77, 120, 0.42),
      inset 0 1px 0 rgba(255, 213, 227, 0.62);
  }
}
</style>
