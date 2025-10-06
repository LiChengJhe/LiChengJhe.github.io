<template>
  <section class="wishes" aria-labelledby="wishes-title">
    <article
      class="wish-card fade-up"
      @mousemove="handleCardMouseMove"
      @mouseleave="resetTilt"
      :style="{ transform: cardTransform }"
    >
      <div class="wish-card__noise" aria-hidden="true"></div>

      <header class="wish-card__header">
        <span class="wish-card__badge">Birthday Blessing</span>
        <h2 id="wishes-title">給妳的一封序曲</h2>
        <p class="wish-card__tagline">把今晚所有星光，寫成只屬於妳的情書</p>
      </header>

      <p class="wish-card__intro">
        妳曾笑著問我，如果把心聲寫成卡片會是什麼模樣。於是我把所有想說的話都放在這裡，讓它隨著指尖的光暈慢慢住進妳心裡。
      </p>

      <div class="wish-card__content" aria-live="polite">
        <div class="wish-card__icon" aria-hidden="true">{{ messageIcon }}</div>
        <div class="wish-card__message-block">
          <p v-for="paragraph in messageParagraphs" :key="paragraph" class="wish-card__message">{{ paragraph }}</p>
        </div>
        <div class="wish-card__divider" aria-hidden="true"></div>
        <p class="wish-card__closing">{{ closingLine }}</p>
      </div>
    </article>
  </section>
</template>

<script setup>
import { computed, reactive } from 'vue';

const messageIcon = '💌';

const messageParagraphs = [
  '謝謝妳讓平凡的日子也帶著煙火，我總覺得和妳說晚安時，整個宇宙都會變得柔軟一些。',
  '我喜歡妳躲在被窩裡偷笑的樣子，也喜歡妳為理想努力時專注的眼神。妳的每一個模樣，我都想用心收藏。',
  '未來的路上，就由我把驚喜和安心輪流放進妳口袋，讓妳無論何時想起我，都會先想起被滿滿地愛著。'
];

const closingLine = '愛妳的，存摺子';

const tilt = reactive({ x: 0, y: 0 });

const handleCardMouseMove = (event) => {
  const card = event.currentTarget;
  if (!card) return;

  const rect = card.getBoundingClientRect();
  const offsetX = event.clientX - rect.left;
  const offsetY = event.clientY - rect.top;

  const percentX = (offsetX / rect.width) * 2 - 1;
  const percentY = (offsetY / rect.height) * 2 - 1;

  tilt.x = -(percentY * 6);
  tilt.y = percentX * 6;
};

const resetTilt = () => {
  tilt.x = 0;
  tilt.y = 0;
};

const cardTransform = computed(
  () => `rotateX(${tilt.x.toFixed(2)}deg) rotateY(${tilt.y.toFixed(2)}deg) scale3d(1.01, 1.01, 1.01)`
);
</script>

<style scoped>
.wishes {
  position: relative;
  display: flex;
  justify-content: center;
  padding: clamp(4rem, 9vw, 8rem) clamp(1.5rem, 6vw, 4rem);
}

.wish-card {
  position: relative;
  width: min(720px, 100%);
  padding: clamp(2.4rem, 5vw, 3.8rem);
  border-radius: 42px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  background: linear-gradient(155deg, rgba(255, 245, 250, 0.76), rgba(255, 213, 232, 0.55));
  box-shadow: 0 50px 140px rgba(244, 93, 144, 0.25), inset 0 0 0 1px rgba(255, 255, 255, 0.32);
  backdrop-filter: blur(26px);
  overflow: hidden;
  transform-style: preserve-3d;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.wish-card:hover {
  box-shadow: 0 60px 160px rgba(244, 93, 144, 0.32);
}

.wish-card__noise {
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.08) 0, rgba(255, 255, 255, 0.08) 2px, transparent 2px, transparent 4px);
  opacity: 0.22;
  mix-blend-mode: soft-light;
  pointer-events: none;
}

.wish-card__header {
  position: relative;
  display: grid;
  gap: 0.7rem;
  text-align: center;
  margin-bottom: 1.8rem;
}

.wish-card__badge {
  justify-self: center;
  padding: 0.5rem 1.6rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.32);
  color: var(--primary-dark);
  letter-spacing: 0.28em;
  text-transform: uppercase;
  font-size: 0.72rem;
  font-weight: 600;
}

.wish-card__header h2 {
  margin: 0;
  font-size: clamp(1.6rem, 4vw, 2.6rem);
  color: var(--primary-dark);
  text-shadow: 0 16px 30px rgba(51, 28, 46, 0.14);
}

.wish-card__tagline {
  margin: 0;
  font-size: 1.05rem;
  color: rgba(51, 28, 46, 0.68);
  letter-spacing: 0.06em;
}

.wish-card__intro {
  margin: 0 auto clamp(1.8rem, 4vw, 2.4rem);
  max-width: 46ch;
  text-align: center;
  color: rgba(51, 28, 46, 0.62);
  font-size: 0.98rem;
  line-height: 1.8;
}

.wish-card__content {
  position: relative;
  display: grid;
  gap: clamp(1rem, 3vw, 1.6rem);
  text-align: center;
}


.wish-card__icon {
  justify-self: center;
  width: 74px;
  height: 74px;
  border-radius: 24px;
  background: rgba(255, 255, 255, 0.45);
  display: grid;
  place-items: center;
  font-size: 2.2rem;
  box-shadow: 0 22px 48px rgba(244, 93, 144, 0.28);
}

.wish-card__message-block {
  display: grid;
  gap: 1.1rem;
}

.wish-card__message {
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.9;
  color: rgba(51, 28, 46, 0.78);
}

.wish-card__divider {
  height: 1px;
  width: 100%;
  background: linear-gradient(90deg, transparent, rgba(244, 93, 144, 0.5), transparent);
  opacity: 0.7;
}

.wish-card__closing {
  margin: 0;
  font-size: 1rem;
  color: rgba(51, 28, 46, 0.64);
  letter-spacing: 0.18em;
  text-transform: uppercase;
}

@media (max-width: 640px) {
  .wish-card {
    padding: clamp(2.1rem, 8vw, 2.6rem);
  }
}

@media (prefers-reduced-motion: reduce) {
  .wish-card {
    transition: none !important;
  }
}
</style>
