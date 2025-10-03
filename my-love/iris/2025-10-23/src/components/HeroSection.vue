<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero__content fade-up">
      <p class="hero__intro">親愛的 {{ nickname }}，</p>
      <h1 id="hero-title" class="hero__title text-shadow">生日快樂，My Forever Love</h1>
      <p class="hero__subtitle">
        今天是妳的日子，我準備了一份小小的驚喜，記錄我們的點滴，也在這一天，說出心底最真摯的話。
      </p>
      <div class="hero__cta">
        <button class="btn-primary" @click="$emit('start-journey')">展開生日旅程</button>
        <button class="btn-secondary" @click="$emit('play-melody')">播放我們的旋律</button>
      </div>
      <p class="hero__signature">愛妳的，{{ signature }}</p>
    </div>
    <div class="hero__decor fade-up" style="animation-delay: 0.2s">
      <div class="hero__ring" aria-hidden="true">
        <div class="hero__gem"></div>
        <div class="hero__sparkle hero__sparkle--one"></div>
        <div class="hero__sparkle hero__sparkle--two"></div>
      </div>
      <p class="hero__quote">“You are my once-in-a-lifetime miracle.”</p>
    </div>
  </section>
</template>

<script setup>
/**
 * Props keep the component reusable and easy to localize in the future.
 */
const props = defineProps({
  nickname: {
    type: String,
    default: '寶貝'
  },
  signature: {
    type: String,
    default: '存摺子'
  }
});
</script>

<style scoped>
.hero {
  display: grid;
  gap: 3rem;
  align-items: center;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  position: relative;
}

.hero__intro {
  font-size: 1rem;
  color: var(--text-muted);
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.hero__title {
  font-size: clamp(2.75rem, 6vw, 4.5rem);
  line-height: 1.1;
  margin-block: 0.5rem 1.5rem;
}

.hero__subtitle {
  max-width: 32rem;
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-muted);
}

.hero__cta {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.btn-primary,
.btn-secondary {
  border-radius: 999px;
  padding: 0.85rem 1.8rem;
  border: none;
  font-weight: 600;
  letter-spacing: 0.04em;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: #fff;
  box-shadow: 0 16px 40px rgba(244, 93, 144, 0.35);
}

.btn-primary:hover {
  transform: translateY(-4px);
}

.btn-secondary {
  background: var(--highlight);
  color: var(--primary-dark);
  box-shadow: 0 12px 24px rgba(255, 194, 214, 0.35);
}

.btn-secondary:hover {
  transform: translateY(-4px);
}

.hero__decor {
  justify-self: center;
  text-align: center;
}

.hero__ring {
  position: relative;
  width: 220px;
  height: 220px;
  margin-inline: auto;
  border-radius: 50%;
  border: 14px solid rgba(255, 255, 255, 0.6);
  box-shadow: 0 20px 80px rgba(244, 93, 144, 0.2);
  display: grid;
  place-items: center;
  animation: floatSlow 5s ease-in-out infinite;
}

.hero__gem {
  width: 82px;
  height: 82px;
  background: linear-gradient(135deg, #fff6ff, #ffd7ef);
  border-radius: 22% 78% 28% 72% / 45% 53% 47% 55%;
  box-shadow: 0 18px 40px rgba(244, 93, 144, 0.28);
}

.hero__sparkle {
  position: absolute;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, transparent 65%);
  width: 20px;
  height: 20px;
  border-radius: 50%;
  animation: twinkle 2.4s ease-in-out infinite;
}

.hero__sparkle--one {
  top: 12%;
  right: 18%;
}

.hero__sparkle--two {
  bottom: 16%;
  left: 20%;
  animation-delay: 0.8s;
}

.hero__quote {
  margin-top: 1.8rem;
  font-style: italic;
  color: var(--text-muted);
}

.hero__signature {
  margin-top: 1.8rem;
  font-size: 1.05rem;
  color: var(--primary-dark);
  letter-spacing: 0.08em;
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}
</style>
