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
              <div v-if="event.links?.length" class="timeline-card__links">
                <a
                  v-for="link in event.links"
                  :key="link.url"
                  class="timeline-card__link"
                  :href="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  :aria-label="`開啟 ${link.label}`"
                >
                  <span>{{ link.label }}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
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
    id: '2023-savings-birthday',
    year: '2023',
    month: '08 月',
    title: '存摺子的生日星河',
    description: '為妳鋪好了專屬生日網站，每一段文字和照片都在說：你的願望我會一個個收藏。',
    quote: '「妳的每一次吹蠟燭，我都會站在光裡守護。」',
    location: '線上 · 生日驚喜站',
    keywords: ['生日儀式感', '專屬故事', '甜蜜祝福'],
    badge: 'Birthday Bloom',
    icon: '🎂',
    links: [
      {
        label: '存摺子的生日頁',
        url: 'https://lichengjhe.github.io/my-love/iris/2023-08-22/index.html'
      }
    ],
    image: new URL('../assets/memories/12.png', import.meta.url).href,
    photoCaption: '在星河主題的生日驚喜裡，一起點亮妳的願望宇宙。',
    accent: '#ffc8e4',
    align: 'left'
  },
  {
    id: '2023-salmon-birthday',
    year: '2023',
    month: '10 月',
    title: '鮭魚子的生日海潮',
    description: '我們把好多彩蛋藏在網站裡，妳的笑聲和期待串成一場亮晶晶的生日浪潮。',
    quote: '「願妳的笑意像海浪，一圈圈拍進我的心。」',
    location: '線上 · 驚喜舞台',
    keywords: ['生日祝歌', '彩蛋影片', '浪漫打卡'],
    badge: 'Birthday Wave',
    icon: '🐟',
    links: [
      {
        label: '鮭魚子的生日頁',
        url: 'https://lichengjhe.github.io/my-love/iris/2023-10-23/index.html'
      }
    ],
    image: new URL('../assets/memories/13.png', import.meta.url).href,
    photoCaption: '妳拆禮物時的笑眼，就像海浪一層層溫柔拍進心裡。',
    accent: '#ffb4d6',
    align: 'right'
  },
  {
    id: '2023-christmas',
    year: '2023',
    month: '12 月',
    title: '聖誕夜的暖光',
    description: '我們在冬夜裡鋪滿燈火，把祝福寫進每一句話，等妳拆開愛的禮物。',
    quote: '「只要妳在身旁，冬天就會長出暖色。」',
    location: '線上 · 聖誕特製頁',
    keywords: ['聖誕祝福', '心願清單', '冬日甜蜜'],
    badge: 'Holiday Magic',
    icon: '🎄',
    links: [
      {
        label: '聖誕節驚喜頁',
        url: 'https://lichengjhe.github.io/my-love/iris/2023-12-25/index.html'
      }
    ],
    image: new URL('../assets/memories/15.png', import.meta.url).href,
    photoCaption: '聖誕樹下的我們，被祝福的光點包圍著。',
    accent: '#ffe1f2',
    align: 'left'
  },
  {
    id: '2024-salmon-birthday',
    year: '2024',
    month: '10 月',
    title: '2024 鮭魚子生日星圖',
    description: '這次換我把相片和心願放進雲端星空，陪妳再一次許下最重要的生日願望。',
    quote: '「你的願望，是我最真心的航線。」',
    location: 'Google Photos · 精選影集',
    keywords: ['生日影集', '年度回顧', '星圖心願'],
    badge: 'Celestial Wish',
    icon: '🌌',
    links: [
      {
        label: '2024 鮭魚子生日影集',
        url: 'https://photos.app.goo.gl/d8x6uiy9m7uXYpmm6'
      }
    ],
    image: new URL('../assets/memories/16.png', import.meta.url).href,
    photoCaption: '把我們的回憶剪成星圖，投映在妳生日的夜空。',
    accent: '#ffd0e8',
    align: 'right'
  },
  {
    id: '2025-anniversary',
    year: '2025',
    month: '04 月',
    title: '交往紀念日的心跳',
    description: '把我們的旅程剪成一首歌，寫在新的一年紀念日裡，提醒自己要繼續同頻心動。',
    quote: '「每一個交往的日子，都是我再選擇妳一次。」',
    location: '線上 · 紀念日特輯',
    keywords: ['紀念日', '心跳樂章', '未來藍圖'],
    badge: 'Anniversary Pulse',
    icon: '💞',
    links: [
      {
        label: '2025 交往紀念日頁',
        url: 'https://lichengjhe.github.io/my-love/iris/2025-04-23/index.html'
      }
    ],
    image: new URL('../assets/memories/17.png', import.meta.url).href,
    photoCaption: '紀念日的擁抱，把未來的冒險都打包進心跳裡。',
    accent: '#ffb9da',
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

.timeline-card__links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
}

.timeline-card__link {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  background: rgba(244, 93, 144, 0.16);
  color: var(--primary-dark);
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  transition: transform 0.2s ease, background 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 8px 16px rgba(244, 93, 144, 0.16);
}

.timeline-card__link:hover,
.timeline-card__link:focus-visible {
  transform: translateY(-2px);
  background: rgba(244, 93, 144, 0.26);
  box-shadow: 0 10px 20px rgba(244, 93, 144, 0.22);
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
