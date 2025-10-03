<template>
  <div class="floating-hearts" aria-hidden="true">
    <span
      v-for="heart in hearts"
      :key="heart.id"
      class="heart"
      :style="getStyle(heart)"
    >
      ♥
    </span>
  </div>
</template>

<script setup>
/**
 * A decorative layer that gently animates floating hearts across the viewport.
 * The hearts array is intentionally small to keep performance smooth on mobile devices.
 */
const hearts = Array.from({ length: 12 }, (_, index) => ({
  id: index,
  size: 28 + Math.round(Math.random() * 24),
  delay: Math.random() * 6,
  duration: 12 + Math.random() * 10,
  horizontal: Math.random() * 100
}));

/**
 * Inline styles keep the animation declarative while allowing per-heart variance.
 */
const getStyle = (heart) => ({
  left: `${heart.horizontal}%`,
  fontSize: `${heart.size}px`,
  animationDelay: `${heart.delay}s`,
  animationDuration: `${heart.duration}s`,
  opacity: 0.2 + Math.random() * 0.2
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
    transform: translate3d(10px, -50vh, 0) scale(1.1);
  }
  100% {
    transform: translate3d(-20px, -110vh, 0) scale(0.9);
    opacity: 0;
  }
}
</style>
