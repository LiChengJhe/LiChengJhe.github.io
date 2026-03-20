<template>
  <aside class="bear" aria-label="joke bear 可愛角色">
    <img class="bear__image" :src="currentImage" :alt="`joke bear ${currentMoodLabel}`" loading="lazy" />
    <p class="bear__label">joke bear：{{ currentMoodLabel }}</p>
  </aside>
</template>

<script setup>
import { computed } from 'vue';
import { bearMoodMap } from '../data/bearMoodMap';

const props = defineProps({
  mood: {
    type: String,
    default: 'default'
  }
});

const mood = computed(() => bearMoodMap[props.mood] || bearMoodMap.default);

const bearImages = import.meta.glob('../assets/bear/*', {
  eager: true,
  import: 'default'
});

const currentImage = computed(() => {
  return bearImages[`../assets/bear/${mood.value.image}`] || '';
});

const currentMoodLabel = computed(() => mood.value.label);
</script>

<style scoped>
.bear {
  position: fixed;
  right: clamp(0.75rem, 2vw, 2rem);
  bottom: clamp(0.75rem, 2vw, 2rem);
  width: min(170px, 34vw);
  padding: 0.45rem;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.95);
  border: 2px solid #171717;
  box-shadow: 0 10px 24px rgba(23, 23, 23, 0.14);
  z-index: var(--layer-floating-ui);
}

.bear__image {
  display: block;
  width: 100%;
  border-radius: 10px;
  background: #fff;
}

.bear__label {
  margin-top: 0.3rem;
  text-align: center;
  font-size: 0.74rem;
  color: #171717;
  letter-spacing: 0.04em;
}

@media (max-width: 700px) {
  .bear {
    width: min(124px, 35vw);
  }

  .bear__label {
    font-size: 0.72rem;
  }
}
</style>
