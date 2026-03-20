<template>
  <article class="node" :class="`node--${node.type}`">
    <header>
      <p class="node__eyebrow">日式櫻花結緣篇</p>
      <h1 class="node__title">{{ node.title }}</h1>
      <p v-if="node.subtitle" class="node__subtitle">{{ node.subtitle }}</p>
    </header>

    <p class="node__body" v-for="line in visibleLines" :key="line">{{ line }}</p>

    <MemoryMomentCard :memory="node.memory" />

    <BranchingChoices v-if="node.options?.length" :choices="node.options" @choose="$emit('choose', $event)" />
  </article>
</template>

<script setup>
import { computed, onBeforeUnmount, ref, watch } from 'vue';
import BranchingChoices from './BranchingChoices.vue';
import MemoryMomentCard from './MemoryMomentCard.vue';

const props = defineProps({
  node: {
    type: Object,
    required: true
  }
});

defineEmits(['choose']);

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
  max-width: 860px;
  margin: 0 auto;
  padding: clamp(1.4rem, 4vw, 2.4rem);
  border-radius: 30px;
  border: 1px solid rgba(186, 102, 102, 0.25);
  background: linear-gradient(150deg, rgba(255, 251, 248, 0.95), rgba(255, 237, 241, 0.9));
  box-shadow: 0 20px 45px rgba(137, 94, 86, 0.18);
}

.node__eyebrow {
  color: #a95e6c;
  font-size: 0.82rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.node__title {
  margin-top: 0.45rem;
  font-family: 'Noto Serif TC', serif;
  font-size: clamp(1.65rem, 3.6vw, 2.6rem);
}

.node__subtitle {
  margin-top: 0.55rem;
  color: #7f5560;
}

.node__body {
  margin-top: 0.85rem;
  line-height: 1.9;
  color: #4c3640;
}

</style>
