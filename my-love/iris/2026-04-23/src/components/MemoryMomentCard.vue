<template>
  <figure v-if="memory" class="memory-card">
    <div class="memory-card__media">
      <span class="memory-card__pin memory-card__pin--left" aria-hidden="true"></span>
      <span class="memory-card__pin memory-card__pin--right" aria-hidden="true"></span>
      <span v-if="memory.link" class="memory-card__link-hint" aria-hidden="true">點擊照片開啟回憶相簿</span>
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
      <p class="memory-card__date">
        <span class="memory-card__date-label">Memory Date</span>
        <strong>{{ memoryDate }}</strong>
      </p>
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

const memoryDate = computed(() => {
  return props.memory?.date || '拍攝日期待補';
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
  gap: 0.78rem;
}

.memory-card__media {
  position: relative;
  border-radius: 22px;
  padding: 0.7rem 0.7rem 0.62rem;
  overflow: visible;
  border: 1px solid rgba(197, 118, 118, 0.28);
  background:
    linear-gradient(160deg, rgba(255, 250, 246, 0.78), rgba(255, 237, 243, 0.72)),
    radial-gradient(circle at 10% 4%, rgba(255, 212, 228, 0.24), transparent 45%);
  box-shadow: 0 14px 34px rgba(156, 83, 105, 0.18);
}

.memory-card__media::after {
  content: '';
  position: absolute;
  inset: 8px;
  border-radius: calc(22px - 8px);
  border: 1px solid rgba(255, 255, 255, 0.52);
  pointer-events: none;
}

.memory-card__pin {
  position: absolute;
  top: -8px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: radial-gradient(circle at 28% 28%, rgba(255, 255, 255, 0.95), rgba(243, 171, 197, 0.9));
  box-shadow: 0 6px 12px rgba(174, 82, 117, 0.3);
  z-index: 2;
}

.memory-card__pin--left {
  left: 12px;
}

.memory-card__pin--right {
  right: 12px;
}

.memory-card__link-hint {
  position: absolute;
  left: 50%;
  bottom: 0.9rem;
  transform: translateX(-50%);
  z-index: 2;
  padding: 0.2rem 0.62rem;
  border-radius: 999px;
  font-size: 0.62rem;
  letter-spacing: 0.07em;
  color: rgba(78, 34, 52, 0.8);
  background: rgba(255, 248, 252, 0.82);
  border: 1px solid rgba(220, 145, 176, 0.42);
  backdrop-filter: blur(2px);
}

.memory-card__image {
  width: 100%;
  display: block;
  border-radius: 15px;
  transition: transform 0.4s ease, filter 0.4s ease;
}

/* 橫式照片：完整顯示不裁切 */
.memory-card__image--landscape {
  width: 100%;
  height: auto;
}

/* 直式照片：完整顯示不裁切 */
.memory-card__image--portrait {
  width: 100%;
  height: auto;
}

.memory-card__image-link {
  display: block;
  border-radius: 15px;
  overflow: hidden;
}

.memory-card__image--clickable {
  cursor: pointer;
}

.memory-card__image-link:hover .memory-card__image,
.memory-card__image-link:focus-visible .memory-card__image {
  transform: scale(1.015);
  filter: saturate(1.06) brightness(1.03);
}

.memory-card__caption {
  padding: 0.08rem 0.12rem 0 0.12rem;
  color: var(--text-muted);
  font-size: 0.92rem;
  line-height: 1.68;
  display: grid;
  gap: 0.34rem;
}

.memory-card__caption p {
  margin: 0;
}

.memory-card__date {
  margin: 0;
  display: inline-flex;
  align-items: baseline;
  gap: 0.4rem;
}

.memory-card__date-label {
  font-size: 0.65rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(138, 76, 97, 0.7);
}

.memory-card__date strong {
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  color: rgba(127, 72, 90, 0.88);
}

@media (max-width: 540px) {
  .memory-card__media {
    padding: 0.58rem 0.58rem 0.56rem;
  }

  .memory-card__link-hint {
    font-size: 0.56rem;
    letter-spacing: 0.05em;
    bottom: 0.72rem;
  }
}
</style>
