<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="hero__background" aria-hidden="true">
      <div class="hero__gradient"></div>
      <div class="hero__glow hero__glow--rose"></div>
      <div class="hero__glow hero__glow--sunrise"></div>
      <div class="hero__halo hero__halo--outer"></div>
      <div class="hero__halo hero__halo--inner"></div>
    </div>

    <div class="hero__particles" aria-hidden="true">
      <span v-for="particle in particles" :key="particle.id" class="hero__particle" :style="getParticleStyle(particle)">
        {{ particle.symbol }}
      </span>
    </div>

    <div class="hero__grid">
      <div class="hero__content fade-up">
        <span class="hero__badge" aria-hidden="true">Happy Birthday · 2025.10.23</span>
        <p class="hero__intro">親愛的{{ nickname }}</p>
        <h1 id="hero-title" class="hero__title text-shadow">
          <span class="hero__title-line">Happy Birthday My Forever Love</span>
        </h1>
        <p class="hero__subtitle">
          今天是妳的日子，我把我們的星光都綁成緞帶，陪妳穿越這場浪漫旅程，把最真摯的心意送到妳掌心。
        </p>

        <p class="hero__signature">愛妳的{{ signature }}</p>
        <div class="hero__cta">
          <button class="btn-primary" @click="$emit('start-journey')">展開生日旅程</button>
          <button class="btn-secondary" @click="$emit('play-melody')">播放我們的旋律</button>
        </div>
      </div>

      <div class="hero__visual fade-up" style="animation-delay: 0.18s">
        <div class="hero__visual-frame">
          <div class="hero__visual-halo hero__visual-halo--outer"></div>
          <div class="hero__visual-halo hero__visual-halo--inner"></div>
          <img class="hero__visual-photo" :src="highlightPhoto" alt="屬於我們的生日回憶剪影" loading="lazy" />
          <span class="hero__visual-orb hero__visual-orb--one"></span>
          <span class="hero__visual-orb hero__visual-orb--two"></span>
          <span class="hero__visual-spark hero__visual-spark--one"></span>
          <span class="hero__visual-spark hero__visual-spark--two"></span>
        </div>
        <p class="hero__visual-caption">妳的笑容是今晚最璀璨的流星雨。</p>
      </div>
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

const highlightPhoto = new URL('../assets/memories/10.png', import.meta.url).href;

const symbols = ['♥', '✦', '❥'];
const particles = Array.from({ length: 12 }, (_, index) => {
  const [left, delay, duration] = [8 + Math.random() * 84, Math.random() * 8, 10 + Math.random() * 8];
  return {
    id: index,
    left,
    delay,
    duration,
    size: 16 + Math.random() * 18,
    opacity: 0.45 + Math.random() * 0.4,
    symbol: symbols[index % symbols.length],
    hue: 330 + Math.random() * 20,
    drift: -24 + Math.random() * 48
  };
});

const getParticleStyle = (particle) => ({
  left: `${particle.left}%`,
  animationDelay: `${particle.delay}s`,
  animationDuration: `${particle.duration}s`,
  fontSize: `${particle.size}px`,
  opacity: particle.opacity,
  color: `hsla(${particle.hue}, 95%, 88%, 1)`,
  '--drift': `${particle.drift}px`
});
</script>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  border-radius: 48px;
  padding: clamp(3.2rem, 7vw, 6.6rem);
  margin-block-start: clamp(2rem, 5vw, 4rem);
  background: linear-gradient(140deg, rgba(255, 238, 247, 0.94), rgba(255, 212, 231, 0.78));
  box-shadow: 0 40px 120px rgba(244, 93, 144, 0.22);
  color: var(--primary-dark);
  isolation: isolate;
}

.hero__background {
  position: absolute;
  inset: -18% -12% -20%;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}

.hero__gradient {
  position: absolute;
  inset: -40% -30% 0;
  background: radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.7), transparent 60%),
    radial-gradient(circle at 70% 80%, rgba(255, 194, 214, 0.45), transparent 65%);
  filter: blur(60px);
  animation: rotateGradient 30s linear infinite;
}

.hero__glow {
  position: absolute;
  width: clamp(280px, 36vw, 420px);
  height: clamp(280px, 36vw, 420px);
  border-radius: 50%;
  filter: blur(45px);
  opacity: 0.7;
  animation: pulseGlow 14s ease-in-out infinite;
}

.hero__glow--rose {
  top: -12%;
  left: -6%;
  background: radial-gradient(circle, rgba(255, 183, 216, 0.75), transparent 70%);
}

.hero__glow--sunrise {
  bottom: -18%;
  right: -10%;
  background: radial-gradient(circle, rgba(255, 236, 200, 0.65), transparent 70%);
  animation-delay: 4s;
}

.hero__halo {
  position: absolute;
  inset: 15% 22%;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.45);
  filter: blur(0.6px);
  opacity: 0.4;
  animation: pulseHalo 9s ease-in-out infinite;
}

.hero__halo--outer {
  inset: 18% 26%;
}

.hero__halo--inner {
  inset: 25% 34%;
  opacity: 0.25;
  animation-delay: 3s;
}

.hero__particles {
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 1;
}

.hero__particle {
  position: absolute;
  bottom: -12%;
  text-shadow: 0 0 18px rgba(255, 180, 210, 0.65);
  animation-name: floatParticle;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  will-change: transform, opacity;
}

.hero__grid {
  position: relative;
  display: grid;
  gap: clamp(2.6rem, 6vw, 4.2rem);
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  align-items: center;
  z-index: 2;
}

.hero__content {
  display: grid;
  gap: 0.5rem;
  max-width: 34rem;
}

.hero__badge {
  justify-self: flex-start;
  padding: 0.45rem 1.4rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.58);
  color: var(--primary-dark);
  font-size: 0.8rem;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  font-weight: 600;
  box-shadow: 0 14px 34px rgba(244, 93, 144, 0.25);
  backdrop-filter: blur(12px);
}

.hero__intro {
  font-size: 1rem;
  color: rgba(51, 28, 46, 0.72);
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.hero__title {
  position: relative;
  display: inline-grid;
  font-size: 1.1rem;

}

.hero__title-line {
  display: inline-block;
  background: linear-gradient(120deg, rgba(51, 28, 46, 0.88), rgba(244, 93, 144, 0.8));
  background-size: 220% 220%;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 12px 30px rgba(51, 28, 46, 0.16);
  letter-spacing: 0.02em;
  animation: titleShimmer 8s ease-in-out infinite;
}

.hero__subtitle {
  font-size: 1.1rem;
  line-height: 1.7;
  color: rgba(51, 28, 46, 0.75);
}

.hero__cta {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-top: 1.4rem;
}

.btn-primary,
.btn-secondary {
  border-radius: 999px;
  padding: 0.85rem 1.9rem;
  border: none;
  font-weight: 600;
  letter-spacing: 0.06em;
  cursor: pointer;
  transition: transform 0.35s ease, box-shadow 0.35s ease, background 0.35s ease;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: #fff;
  box-shadow: 0 18px 42px rgba(244, 93, 144, 0.36);
}

.btn-primary:hover,
.btn-primary:focus-visible {
  transform: translateY(-4px);
  box-shadow: 0 20px 50px rgba(244, 93, 144, 0.45);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.82);
  color: var(--primary-dark);
  box-shadow: 0 16px 36px rgba(255, 194, 214, 0.4);
  backdrop-filter: blur(8px);
}

.btn-secondary:hover,
.btn-secondary:focus-visible {
  transform: translateY(-4px);
  background: rgba(255, 255, 255, 0.94);
  box-shadow: 0 18px 44px rgba(255, 194, 214, 0.48);
}

.btn-primary:focus-visible,
.btn-secondary:focus-visible {
  outline: 2px solid rgba(255, 255, 255, 0.8);
  outline-offset: 3px;
}

.hero__signature {
  margin-top: 0.8rem;
  font-size: 1.05rem;
  color: var(--primary-dark);
  letter-spacing: 0.08em;
}

.hero__visual {
  position: relative;
  display: grid;
  gap: 1.2rem;
  justify-items: center;
}

.hero__visual-frame {
  position: relative;
  padding: clamp(1.4rem, 3vw, 2rem);
  border-radius: 36px;
  background: rgba(255, 255, 255, 0.55);
  box-shadow: 0 26px 70px rgba(244, 93, 144, 0.28);
  backdrop-filter: blur(18px);
  overflow: hidden;
  animation: floatSoft 6s ease-in-out infinite;
}

.hero__visual-photo {
  display: block;
  width: clamp(220px, 28vw, 320px);
  height: clamp(260px, 34vw, 380px);
  object-fit: cover;
  border-radius: 28px;
  box-shadow: 0 24px 50px rgba(51, 28, 46, 0.22);
  animation: photoGlow 12s ease-in-out infinite;
}

.hero__visual-halo {
  position: absolute;
  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 32px;
  inset: clamp(0.6rem, 1.4vw, 1.4rem);
  opacity: 0.45;
  animation: pulseHalo 8s ease-in-out infinite;
}

.hero__visual-halo--inner {
  inset: clamp(1.4rem, 2vw, 1.9rem);
  opacity: 0.25;
  animation-delay: 2.2s;
}

.hero__visual-orb {
  position: absolute;
  width: 68px;
  height: 68px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 209, 231, 0.6), transparent 70%);
  filter: blur(6px);
  animation: orbDrift 7s ease-in-out infinite;
}

.hero__visual-orb--one {
  top: 8%;
  right: 6%;
}

.hero__visual-orb--two {
  bottom: 10%;
  left: 8%;
  animation-delay: 3s;
}

.hero__visual-spark {
  position: absolute;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.9), transparent 70%);
  animation: sparkFlash 2.4s ease-in-out infinite;
}

.hero__visual-spark--one {
  top: 18%;
  left: 20%;
}

.hero__visual-spark--two {
  bottom: 16%;
  right: 24%;
  animation-delay: 1.1s;
}

.hero__visual-caption {
  margin: 0;
  font-size: 0.95rem;
  color: rgba(51, 28, 46, 0.65);
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

@media (max-width: 960px) {
  .hero {
    padding: clamp(2.8rem, 10vw, 4.6rem);
  }

  .hero__badge {
    justify-self: center;
  }

  .hero__content {
    justify-items: center;
    text-align: center;
  }

  .hero__subtitle {
    max-width: 36rem;
  }

  .hero__signature {
    justify-self: center;
  }
}

@media (max-width: 640px) {
  .hero__cta {
    justify-content: center;
  }

  .hero__visual-photo {
    width: clamp(200px, 70vw, 260px);
    height: clamp(240px, 82vw, 320px);
  }
}

@media (prefers-reduced-motion: reduce) {

  .hero__gradient,
  .hero__glow,
  .hero__halo,
  .hero__particle,
  .hero__title-line,
  .hero__title-orb,
  .hero__visual-frame,
  .hero__visual-photo,
  .hero__visual-orb,
  .hero__visual-spark,
  .btn-primary,
  .btn-secondary {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}

@keyframes rotateGradient {
  0% {
    transform: rotate(0deg) scale(1);
  }

  50% {
    transform: rotate(180deg) scale(1.04);
  }

  100% {
    transform: rotate(360deg) scale(1);
  }
}

@keyframes pulseGlow {

  0%,
  100% {
    transform: scale(0.96);
    opacity: 0.65;
  }

  50% {
    transform: scale(1.08);
    opacity: 0.82;
  }
}

@keyframes pulseHalo {

  0%,
  100% {
    opacity: 0.24;
    transform: scale(0.96);
  }

  50% {
    opacity: 0.45;
    transform: scale(1.05);
  }
}

@keyframes floatParticle {
  0% {
    transform: translate3d(0, 0, 0) rotate(0deg);
    opacity: 0;
  }

  10% {
    opacity: 0.45;
  }

  50% {
    transform: translate3d(var(--drift), -50vh, 0) rotate(8deg);
    opacity: 0.9;
  }

  100% {
    transform: translate3d(calc(var(--drift) * 1.4), -110vh, 0) rotate(18deg);
    opacity: 0;
  }
}

@keyframes floatSoft {

  0%,
  100% {
    transform: translateY(-8px);
  }

  50% {
    transform: translateY(6px);
  }
}

@keyframes orbDrift {

  0%,
  100% {
    transform: translate3d(0, 0, 0) scale(0.9);
  }

  50% {
    transform: translate3d(10px, -14px, 0) scale(1.05);
  }
}

@keyframes titleShimmer {
  0% {
    filter: drop-shadow(0 0 0 rgba(244, 93, 144, 0.2));
    background-position: 0% 50%;
  }

  50% {
    filter: drop-shadow(0 10px 24px rgba(244, 93, 144, 0.25));
    background-position: 100% 50%;
  }

  100% {
    filter: drop-shadow(0 0 0 rgba(244, 93, 144, 0.2));
    background-position: 0% 50%;
  }
}

@keyframes sparkFlash {

  0%,
  100% {
    opacity: 0.3;
    transform: scale(0.8);
  }

  50% {
    opacity: 1;
    transform: scale(1.1);
  }
}

@keyframes photoGlow {

  0%,
  100% {
    filter: saturate(1) brightness(1);
  }

  50% {
    filter: saturate(1.14) brightness(1.06);
  }
}
</style>
