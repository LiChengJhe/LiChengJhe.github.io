<template>
  <section class="timeline" aria-labelledby="timeline-title">
    <div class="timeline__constellation" aria-hidden="true">
      <span
        v-for="sparkle in sparkles"
        :key="sparkle.id"
        class="timeline__sparkle"
        :style="getSparkleStyle(sparkle)"
      ></span>
    </div>

    <div class="timeline__header fade-up">
      <h2 id="timeline-title">我們的浪漫航線</h2>
      <p>從初遇的心動，到無數次緊握的手，這條光軌寫滿了鮭魚子與存摺子的約定。</p>
    </div>

    <div class="timeline__body">
      <div class="timeline__rail" aria-hidden="true"></div>
      <ol class="timeline__events">
        <li
          v-for="event in events"
          :key="event.id"
          class="timeline-card"
          :class="`timeline-card--${event.align}`"
          :style="{ '--accent': event.accent }"
          :ref="registerCard"
        >
          <div class="timeline-card__pulse" aria-hidden="true"></div>
          <span class="timeline-card__icon" aria-hidden="true">{{ event.icon }}</span>
          <header class="timeline-card__header">
            <span class="timeline-card__badge">{{ event.badge }}</span>
            <div class="timeline-card__time">
              <span class="timeline-card__year">{{ event.year }}</span>
              <span class="timeline-card__meta">{{ event.month }} · {{ event.location }}</span>
            </div>
          </header>
          <div class="timeline-card__main">
            <div class="timeline-card__text">
              <h3>{{ event.title }}</h3>
              <p>{{ event.description }}</p>
              <blockquote>{{ event.quote }}</blockquote>
              <ul class="timeline-card__chips">
                <li v-for="chip in event.keywords" :key="chip">{{ chip }}</li>
              </ul>
            </div>
            <figure v-if="event.image" class="timeline-card__photo">
              <img :src="event.image" :alt="`${event.title} 的回憶照片`" loading="lazy" />
              <figcaption>{{ event.photoCaption }}</figcaption>
            </figure>
          </div>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue';

const events = [
  {
    id: '2019-glance',
    year: '2019',
    month: '04 月',
    title: '那杯拿鐵寫下的命運',
    description: '在新竹的小巷咖啡，我們爭奪最後一杯拿鐵。從那天起，我開始習慣妳的笑聲和眼神。',
    quote: '「如果命運要安排意外相遇，那一定是你。」',
    location: '新竹 · 巷弄咖啡館',
    keywords: ['命定初遇', '偷喝的拿鐵', '怦然心跳'],
    badge: 'First Spark',
    icon: '☕️',
    image: new URL('../assets/memories/1.png', import.meta.url).href,
    photoCaption: '第一次約會就決定一起守護彼此的笑容。',
    accent: '#f45d90',
    align: 'left'
  },
  {
    id: '2020voyage',
    year: '2020',
    month: '09 月',
    title: '黃昏湖畔的旅程宣言',
    description: '在日月潭的泛舟夕陽裡，妳說想收藏更多天空的顏色，我答應把每一道晚霞都留給妳。',
    quote: '「只要妳在，平凡湖光也會長出浪漫。」',
    location: '南投 · 日月潭',
    keywords: ['旅行同盟', '夕陽誓言', '兩人小宇宙'],
    badge: 'Adventure Mode',
    icon: '🛶',
    image: new URL('../assets/memories/5.png', import.meta.url).href,
    photoCaption: '夕陽映著妳的側臉，我決定每天都陪妳看海。',
    accent: '#ff9cb6',
    align: 'right'
  },
  {
    id: '2022-harbor',
    year: '2022',
    month: '03 月',
    title: '櫻花雨下的避風港',
    description: '疫情讓世界按下暫停，我們在櫻花樹下約定，無論外面多吵，彼此的擁抱永遠有空位。',
    quote: '「妳的肩膀是我最柔軟的防線。」',
    location: '新竹 · 櫻花步道',
    keywords: ['守候', '肩並肩', '小宇宙'],
    badge: 'Safe Haven',
    icon: '🌸',
    image: new URL('../assets/memories/8.png', import.meta.url).href,
    photoCaption: '花雨落下時，我只想緊緊把妳擁在懷裡。',
    accent: '#ffbad4',
    align: 'left'
  },
  {
    id: '2023-lights',
    year: '2023',
    month: '02 月',
    title: '燈會裡的未來倒影',
    description: '在熱鬧的人群裡，我們牽手走過光廊，聊著未來的家與旅程，原來幸福離我們這麼近。',
    quote: '「燈火再亮，也比不上妳看我的眼睛。」',
    location: '竹北 · 燈會',
    keywords: ['彼此承諾', '光影紀念', '心動日常'],
    badge: 'Heartbeat Glow',
    icon: '🎆',
    image: new URL('../assets/memories/11.png', import.meta.url).href,
    photoCaption: '燈火萬千，我只覺得妳的手最溫暖。',
    accent: '#ffd4e7',
    align: 'right'
  },
  {
    id: '2024-everyday',
    year: '2024',
    month: '08 月',
    title: '把平凡綁成永遠',
    description: '我們學會在忙碌裡偷空，一起煮晚餐、聽音樂、分享小確幸，把日常練成幸福的雛形。',
    quote: '「和妳在一起，日常也會閃亮。」',
    location: '我們的家 · 晚餐檯前',
    keywords: ['溫柔家務', '靜靜相伴', '幸福練習'],
    badge: 'Everyday Miracle',
    icon: '✨',
    image: new URL('../assets/memories/14.png', import.meta.url).href,
    photoCaption: '廚房的光最溫柔，因為有妳的笑聲。',
    accent: '#ffe2f1',
    align: 'left'
  }
];

const sparkles = Array.from({ length: 14 }, (_, index) => ({
  id: index,
  left: Math.random() * 100,
  top: Math.random() * 100,
  delay: Math.random() * 6,
  duration: 6 + Math.random() * 6,
  scale: 0.6 + Math.random() * 0.8
}));

const getSparkleStyle = (sparkle) => ({
  left: `${sparkle.left}%`,
  top: `${sparkle.top}%`,
  animationDelay: `${sparkle.delay}s`,
  animationDuration: `${sparkle.duration}s`,
  transform: `scale(${sparkle.scale})`
});

const cardRefs = ref([]);
const observer = ref(null);

const registerCard = (el) => {
  if (!el || cardRefs.value.includes(el)) return;
  cardRefs.value.push(el);
  if (observer.value) {
    observer.value.observe(el);
  }
};

onMounted(() => {
  observer.value = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle('timeline-card--visible', entry.isIntersecting);
      });
    },
    {
      threshold: 0.35,
      rootMargin: '-40px 0px'
    }
  );

  cardRefs.value.forEach((card) => observer.value.observe(card));
});

onBeforeUnmount(() => {
  observer.value?.disconnect();
  observer.value = null;
  cardRefs.value = [];
});
</script>

<style scoped>
.timeline {
  position: relative;
  padding: clamp(3.2rem, 6vw, 6.2rem);
  border-radius: 38px;
  background: radial-gradient(circle at 20% 20%, rgba(255, 223, 237, 0.9), rgba(255, 255, 255, 0.92));
  box-shadow: 0 30px 90px rgba(244, 93, 144, 0.22);
  overflow: hidden;
}

.timeline__constellation {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}

.timeline__sparkle {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.95), rgba(255, 194, 214, 0));
  opacity: 0;
  animation: sparkleFloat linear infinite;
}

.timeline__header {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 720px;
  margin: 0 auto clamp(2.5rem, 5vw, 3.6rem);
  display: grid;
  gap: 1rem;
}

.timeline__header p {
  color: var(--text-muted);
  line-height: 1.6;
}

.timeline__body {
  position: relative;
  z-index: 1;
}

.timeline__rail {
  position: absolute;
  inset: 0;
  margin-inline: auto;
  width: 4px;
  background: linear-gradient(180deg, rgba(244, 93, 144, 0.12), rgba(244, 93, 144, 0.6), rgba(244, 93, 144, 0.12));
  filter: blur(0.3px);
}

.timeline__rail::before {
  content: '';
  position: absolute;
  inset: 0;
  width: 100%;
  background: linear-gradient(180deg, rgba(255, 216, 232, 0.9), rgba(255, 255, 255, 0));
  filter: blur(16px);
  opacity: 0.8;
}

.timeline__events {
  list-style: none;
  display: grid;
  gap: clamp(2.6rem, 4vw, 3.8rem);
}

.timeline-card {
  position: relative;
  display: grid;
  gap: 1.4rem;
  padding: clamp(2rem, 4vw, 2.6rem);
  border-radius: 28px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 26px 70px rgba(51, 28, 46, 0.1);
  border: 1px solid rgba(244, 93, 144, 0.08);
  opacity: 0;
  transform: translateY(60px) scale(0.96);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.timeline-card::before {
  content: '';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: 4px solid rgba(255, 255, 255, 0.85);
  box-shadow: 0 0 0 4px rgba(244, 93, 144, 0.18);
  background: var(--accent, var(--primary));
  z-index: 2;
}

.timeline-card--left {
  margin-right: clamp(0rem, 8vw, 18%);
}

.timeline-card--left::before {
  right: calc(-17% - 17px);
}

.timeline-card--right {
  margin-left: clamp(0rem, 8vw, 18%);
}

.timeline-card--right::before {
  left: calc(-17% - 17px);
}

.timeline-card__pulse {
  position: absolute;
  inset: auto;
  width: 120%;
  height: 120%;
  left: -10%;
  top: -10%;
  border-radius: 32px;
  background: radial-gradient(circle, rgba(255, 194, 214, 0.34), transparent 70%);
  opacity: 0;
  transition: opacity 0.6s ease;
  pointer-events: none;
}

.timeline-card__icon {
  position: absolute;
  top: 1.4rem;
  right: 1.4rem;
  font-size: clamp(1.6rem, 3vw, 2.2rem);
  background: rgba(255, 194, 214, 0.4);
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: var(--primary-dark);
}

.timeline-card__header {
  display: grid;
  gap: 0.8rem;
}

.timeline-card__badge {
  justify-self: flex-start;
  padding: 0.35rem 1rem;
  border-radius: 999px;
  background: rgba(244, 93, 144, 0.12);
  color: var(--primary-dark);
  font-size: 0.8rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 600;
}

.timeline-card__time {
  display: grid;
  gap: 0.2rem;
}

.timeline-card__year {
  font-size: clamp(1.6rem, 3vw, 2.1rem);
  font-weight: 700;
  color: var(--primary-dark);
}

.timeline-card__meta {
  color: rgba(51, 28, 46, 0.6);
  font-size: 0.95rem;
}

.timeline-card__main {
  display: grid;
  gap: 1.8rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.timeline-card__text {
  display: grid;
  gap: 1rem;
}

.timeline-card__text p {
  color: var(--text-muted);
  line-height: 1.6;
}

.timeline-card__text blockquote {
  padding-left: 1.2rem;
  border-left: 4px solid var(--accent, var(--primary));
  color: var(--primary-dark);
  font-style: italic;
  line-height: 1.5;
}

.timeline-card__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.timeline-card__chips li {
  padding: 0.35rem 0.8rem;
  border-radius: 999px;
  background: rgba(244, 93, 144, 0.1);
  color: var(--primary-dark);
  font-size: 0.85rem;
  letter-spacing: 0.04em;
}

.timeline-card__photo {
  position: relative;
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 18px 40px rgba(51, 28, 46, 0.18);
  isolation: isolate;
}

.timeline-card__photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.timeline-card__photo::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(51, 28, 46, 0.35) 100%);
}

.timeline-card__photo figcaption {
  position: absolute;
  inset: auto 0 0 0;
  padding: 0.75rem 1.2rem;
  color: #fff;
  font-size: 0.9rem;
  letter-spacing: 0.04em;
}

.timeline-card--visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.timeline-card--visible .timeline-card__pulse {
  opacity: 1;
}

.timeline-card--visible .timeline-card__photo img {
  animation: photoGlow 6s ease-in-out infinite;
}

@media (max-width: 1080px) {
  .timeline-card::before {
    display: none;
  }

  .timeline-card--left,
  .timeline-card--right {
    margin: 0;
  }
}

@media (max-width: 720px) {
  .timeline__rail {
    left: 26px;
  }

  .timeline-card {
    padding: 1.8rem;
    margin-left: 2.6rem;
  }

  .timeline-card__main {
    grid-template-columns: 1fr;
  }

  .timeline-card__photo {
    order: -1;
  }
}

@keyframes sparkleFloat {
  0% {
    opacity: 0;
    transform: translate3d(-10px, 10px, 0) scale(0.6);
  }
  30% {
    opacity: 0.6;
  }
  70% {
    opacity: 0.8;
  }
  100% {
    opacity: 0;
    transform: translate3d(16px, -32px, 0) scale(1.1);
  }
}

@keyframes photoGlow {
  0% {
    filter: saturate(1) brightness(1);
  }
  50% {
    filter: saturate(1.12) brightness(1.05);
  }
  100% {
    filter: saturate(1) brightness(1);
  }
}
</style>
