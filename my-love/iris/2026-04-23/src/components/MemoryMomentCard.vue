<template>
  <figure v-if="memory" class="memory-card">
    <div class="memory-card__media">
      <a
        v-if="memory.link"
        class="memory-card__image-link"
        :href="memory.link"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="開啟相簿"
      >
        <img class="memory-card__image memory-card__image--clickable" :src="imageUrl" :alt="memory.caption" loading="lazy" />
      </a>
      <img v-else class="memory-card__image" :src="imageUrl" :alt="memory.caption" loading="lazy" />
    </div>
    <figcaption class="memory-card__caption">
      <p>{{ memory.caption }}</p>
    </figcaption>
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
  margin-top: 1.15rem;
  display: grid;
  gap: 0.68rem;
}

.memory-card__media {
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(197, 118, 118, 0.2);
  background: linear-gradient(160deg, #fff8f3, #ffeef4);
}

.memory-card__image {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  display: block;
}

.memory-card__image-link {
  display: block;
}

.memory-card__image--clickable {
  cursor: pointer;
}

.memory-card__caption {
  padding: 0 0 0 0.85rem;
  border-left: 3px solid rgba(196, 109, 132, 0.36);
  color: var(--text-muted);
  font-size: 0.92rem;
  line-height: 1.62;
}

.memory-card__caption p {
  margin: 0;
}
</style>
