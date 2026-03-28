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
        <img
          :class="['memory-card__image', 'memory-card__image--clickable', orientationClass]"
          :src="imageUrl"
          :alt="memory.caption"
          loading="lazy"
          @load="detectOrientation"
        />
      </a>
      <img
        v-else
        :class="['memory-card__image', orientationClass]"
        :src="imageUrl"
        :alt="memory.caption"
        loading="lazy"
        @load="detectOrientation"
      />
    </div>
    <figcaption class="memory-card__caption">
      <p>{{ memory.caption }}</p>
    </figcaption>
  </figure>
</template>

<script setup>
import { computed, ref, watch } from 'vue';

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

const orientation = ref(null);

watch(() => props.memory?.image, () => {
  orientation.value = null;
});

function detectOrientation(event) {
  const img = event.target;
  orientation.value = img.naturalWidth >= img.naturalHeight ? 'landscape' : 'portrait';
}

const orientationClass = computed(() => {
  if (!orientation.value) return '';
  return `memory-card__image--${orientation.value}`;
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
  display: block;
}

/* 橫式照片：填滿寬度，固定高度裁切 */
.memory-card__image--landscape {
  aspect-ratio: 16 / 10;
  object-fit: cover;
}

/* 直式照片：完整顯示不裁切，置中 */
.memory-card__image--portrait {
  object-fit: contain;
  width: auto;
  max-width: 100%;
  margin: 0 auto;
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
