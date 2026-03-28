<template>
  <article class="node" :class="`node--${node.type}`">
    <div class="node__layout" :class="{ 'node__layout--with-media': node.memory }">
      <div class="node__main">
        <header class="node__header">
          <p class="node__eyebrow">
            <span class="node__eyebrow-dot" aria-hidden="true"></span>
            日式櫻花結緣篇
          </p>
          <h1 class="node__title">{{ node.title }}</h1>
          <p v-if="node.subtitle" class="node__subtitle">{{ node.subtitle }}</p>
        </header>

        <div class="node__body-wrap">
          <p class="node__body" v-for="line in visibleLines" :key="line">{{ line }}</p>
        </div>
      </div>

      <MemoryMomentCard v-if="node.memory" :memory="node.memory" />
    </div>
  </article>
</template>

<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import MemoryMomentCard from './MemoryMomentCard.vue';

const props = defineProps({
  node: {
    type: Object,
    required: true
  }
});

const lines = computed(() => {
  return (props.node.body || '').split('\n').filter(Boolean);
});

const revealedCount = ref(0);
let revealTimer;

const visibleLines = computed(() => lines.value.slice(0, revealedCount.value));

watch(
  () => props.node.id,
  () => {
    window.clearInterval(revealTimer);
    revealedCount.value = 0;

    if (!lines.value.length) {
      return;
    }

    revealTimer = window.setInterval(() => {
      revealedCount.value += 1;
      if (revealedCount.value >= lines.value.length) {
        window.clearInterval(revealTimer);
      }
    }, 360);
  },
  { immediate: true }
);

onBeforeUnmount(() => {
  window.clearInterval(revealTimer);
});
</script>

<style scoped>
.node {
  position: relative;
  max-width: 960px;
  margin: 0 auto;
  padding: clamp(1.4rem, 4vw, 2.4rem);
  border-radius: 30px;
  border: 1px solid rgba(186, 102, 102, 0.25);
  background: linear-gradient(150deg, rgba(255, 251, 248, 0.8), rgba(255, 237, 241, 0.72));
  box-shadow: 0 20px 45px rgba(137, 94, 86, 0.18);
}

.node::before {
  content: '';
  position: absolute;
  inset: 10px;
  border-radius: calc(30px - 10px);
  border: 1px solid rgba(255, 255, 255, 0.52);
  pointer-events: none;
}

.node__layout {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.node__layout--with-media {
  display: grid;
  grid-template-columns: 1fr minmax(0, 340px);
  gap: 1.8rem;
  align-items: start;
}

.node__main {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.node__header {
  position: relative;
  padding: 0.25rem 0.1rem 0.85rem;
}

.node__header::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: min(280px, 56%);
  height: 1px;
  background: linear-gradient(90deg, rgba(194, 92, 125, 0.5), rgba(194, 92, 125, 0));
}

@media (max-width: 680px) {
  .node__layout--with-media {
    grid-template-columns: 1fr;
  }

  .node__body-wrap {
    min-height: clamp(78px, 13vh, 110px);
  }
}

.node__eyebrow {
  color: #a95e6c;
  font-size: 0.76rem;
  letter-spacing: 0.13em;
  text-transform: uppercase;
  display: inline-flex;
  align-items: center;
  gap: 0.42rem;
  padding: 0.28rem 0.72rem;
  border-radius: 999px;
  background: rgba(252, 231, 239, 0.72);
  border: 1px solid rgba(212, 124, 157, 0.3);
}

.node__eyebrow-dot {
  width: 0.46rem;
  height: 0.46rem;
  border-radius: 50%;
  background: linear-gradient(145deg, rgba(229, 99, 145, 0.9), rgba(247, 159, 115, 0.84));
  box-shadow: 0 0 12px rgba(226, 109, 145, 0.45);
}

.node__title {
  margin-top: 0.45rem;
  font-family: 'Noto Serif TC', serif;
  font-size: clamp(1.2rem, 2.4vw, 1.8rem);
  line-height: 1.28;
  letter-spacing: 0.015em;
  color: #462f38;
}

.node__subtitle {
  margin-top: 0.55rem;
  color: #7f5560;
  line-height: 1.7;
  max-width: 46ch;
}

.node__body-wrap {
  display: grid;
  gap: 0.68rem;
  min-height: clamp(70px, 10vh, 96px);
  align-content: start;
  grid-auto-rows: max-content;
}

.node__body {
  margin-top: 0;
  line-height: 1.9;
  color: #4c3640;
  padding: 0.68rem 0.82rem;
  border-radius: 12px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.56), rgba(255, 244, 248, 0.4));
  border: 1px solid rgba(208, 129, 159, 0.2);
  box-shadow: 0 8px 18px rgba(154, 87, 109, 0.08);
  animation: lineReveal 0.42s ease both;
  transform-origin: left center;
  align-self: start;
}

@keyframes lineReveal {
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.99);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

</style>
