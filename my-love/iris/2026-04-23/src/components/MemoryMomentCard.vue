<template>
  <figure v-if="memory" class="memory-card">
    <img class="memory-card__image" :src="imageUrl" :alt="memory.caption" loading="lazy" />
    <figcaption class="memory-card__caption">{{ memory.caption }}</figcaption>
  </figure>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  memory: {
    type: Object,
    default: null
  }
});

const memoryImages = import.meta.glob('../assets/memories/*', {
  eager: true,
  import: 'default'
});

const imageUrl = computed(() => {
  if (!props.memory?.image) return '';
  return memoryImages[`../assets/memories/${props.memory.image}`] || '';
});
</script>

<style scoped>
.memory-card {
  margin-top: 1rem;
  border-radius: 22px;
  overflow: hidden;
  background: #fffaf6;
  border: 1px solid rgba(210, 118, 118, 0.22);
  box-shadow: 0 18px 36px rgba(134, 95, 86, 0.18);
}

.memory-card__image {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: contain;
  background: linear-gradient(160deg, #fff8f3, #ffeef4);
  display: block;
}

.memory-card__caption {
  padding: 0.85rem 1rem 1rem;
  color: var(--text-muted);
  font-size: 0.92rem;
}
</style>
