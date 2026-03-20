<template>
  <div class="petals" aria-hidden="true">
    <span v-for="petal in petals" :key="petal.id" class="petal" :style="petal.style">
      ✿
    </span>
  </div>
</template>

<script setup>
const reducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const lowEndDevice =
  typeof window !== 'undefined' &&
  (window.navigator.hardwareConcurrency || 4) < 4;

const petalCount = reducedMotion ? 8 : lowEndDevice ? 12 : 24;

const petals = Array.from({ length: petalCount }, (_, id) => {
  const left = Math.random() * 100;
  const delay = Math.random() * 14;
  const duration = (reducedMotion ? 14 : 10) + Math.random() * 9;
  const drift = -40 + Math.random() * 80;
  const scale = 0.7 + Math.random() * 1;

  return {
    id,
    style: {
      left: `${left}%`,
      animationDelay: `${delay}s`,
      animationDuration: `${duration}s`,
      '--drift': `${drift}px`,
      '--scale': `${scale}`
    }
  };
});
</script>

<style scoped>
.petals {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: var(--layer-app-bg);
  overflow: hidden;
}

.petal {
  position: absolute;
  top: -8%;
  color: rgba(255, 169, 199, 0.72);
  font-size: clamp(1rem, 1.4vw, 1.6rem);
  text-shadow: 0 0 10px rgba(255, 182, 215, 0.4);
  animation-name: petalFall;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

@keyframes petalFall {
  0% {
    transform: translate3d(0, -10vh, 0) rotate(0deg) scale(var(--scale, 1));
    opacity: 0;
  }
  10% {
    opacity: 0.9;
  }
  100% {
    transform: translate3d(var(--drift), 110vh, 0) rotate(300deg) scale(var(--scale, 1));
    opacity: 0;
  }
}
</style>
