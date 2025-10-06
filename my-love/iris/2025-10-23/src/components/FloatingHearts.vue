<template>
  <div class="floating-hearts" aria-hidden="true">
    <span v-for="heart in hearts" :key="heart.id" class="heart" :style="getStyle(heart)">
      {{ heart.symbol }}
    </span>
  </div>
</template>

<script setup>
/**
 * A decorative layer that gently animates floating hearts across the viewport.
 * The hearts array is intentionally small to keep performance smooth on mobile devices.
 */
const heartSymbols = ['♥', '❥', '♡', '❤', '💖', '💗', '💘', '💝', '💞', '💓', '💟'];
const hearts = Array.from({ length: 12 }, (_, index) => ({
  id: index,
  size: 28 + Math.round(Math.random() * 24),
  delay: Math.random() * 6,
  duration: 12 + Math.random() * 10,
  horizontal: Math.random() * 100,
  drift: -30 + Math.random() * 60, // 水平漂移
  rise: 70 + Math.random() * 60, // 垂直上升距離 vh
  symbol: heartSymbols[Math.floor(Math.random() * heartSymbols.length)] // 隨機愛心符號
}));

/**
 * Inline styles keep the animation declarative while allowing per-heart variance.
 */
const getStyle = (heart) => ({
  left: `${heart.horizontal}%`,
  fontSize: `${heart.size}px`,
  animationDelay: `${heart.delay}s`,
  animationDuration: `${heart.duration}s`,
  opacity: 0.2 + Math.random() * 0.2,
  '--drift': `${heart.drift}px`,
  '--rise': `${heart.rise}vh`
});
</script>

<style scoped>
.floating-hearts {
  position: fixed;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.heart {
  position: absolute;
  bottom: -10%;
  font-size: 24px;
  animation-name: rise;
  animation-timing-function: ease-out;
  animation-iteration-count: infinite;
  animation-fill-mode: forwards;
  opacity: 0;
}

.heart:nth-child(odd) {
  color: var(--secondary);
}

@keyframes rise {
  0% {
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 0;
  }

  10% {
    opacity: 0.6;
  }

  50% {
    transform: translate3d(var(--drift, 10px), calc(-0.5 * var(--rise, 90vh)), 0) scale(1.1);
  }

  100% {
    transform: translate3d(calc(var(--drift, 10px) * 1.4), calc(-1 * var(--rise, 90vh)), 0) scale(0.9);
    opacity: 0;
  }
}
</style>
