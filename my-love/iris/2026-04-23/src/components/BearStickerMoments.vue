<template>
  <section v-if="stickers?.length" class="sticker-strip" aria-label="joke bear 可愛圖片">
    <article v-for="(sticker, index) in stickers" :key="`${sticker.image}-${index}`" class="sticker-card">
      <img
        class="sticker-card__image"
        :src="resolveStickerImage(sticker.image)"
        :alt="sticker.caption || 'joke bear 可愛圖片'"
        loading="lazy"
      />
      <p v-if="sticker.caption" class="sticker-card__caption">{{ sticker.caption }}</p>
    </article>
  </section>
</template>

<script setup>
const props = defineProps({
  stickers: {
    type: Array,
    default: () => []
  }
});

const bearImages = import.meta.glob('../assets/bear/*', {
  eager: true,
  import: 'default'
});

const resolveStickerImage = (name) => {
  return bearImages[`../assets/bear/${name}`] || '';
};
</script>

<style scoped>
.sticker-strip {
  margin-top: 1rem;
  display: grid;
  gap: 0.7rem;
  grid-template-columns: repeat(auto-fit, minmax(170px, 1fr));
}

.sticker-card {
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(204, 122, 144, 0.24);
  background: rgba(255, 251, 247, 0.85);
  box-shadow: 0 12px 24px rgba(153, 100, 113, 0.2);
}

.sticker-card__image {
  width: 100%;
  display: block;
  aspect-ratio: 4 / 3;
  object-fit: contain;
  padding: 0.6rem;
  background: #fff;
}

.sticker-card__caption {
  padding: 0.65rem 0.8rem 0.8rem;
  color: #7f4e5d;
  line-height: 1.5;
  font-size: 0.88rem;
}
</style>
