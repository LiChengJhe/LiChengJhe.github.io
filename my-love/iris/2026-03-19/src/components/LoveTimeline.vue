<template>

  <section class="timeline" aria-labelledby="timeline-title">
    <div class="timeline__constellation" aria-hidden="true">
      <span v-for="sparkle in sparkles" :key="sparkle.id" class="timeline__sparkle" :style="getSparkleStyle(sparkle)">{{
        sparkle.symbol }}</span>
    </div>

    <div class="timeline__header fade-up">
      <h2 id="timeline-title">我們的浪漫航線</h2>
      <p>從第一次心動，到每一次緊握，這條光軌串起了我們的回憶。</p>
    </div>

    <div class="timeline__body">
      <div class="timeline__rail" aria-hidden="true"></div>
      <ol class="timeline__events">
        <li v-for="event in events" :key="event.id" class="timeline-card" :class="`timeline-card--${event.align}`"
          :style="{ '--accent': event.accent }" :ref="registerCard">
          <div class="timeline-card__pulse" aria-hidden="true"></div>
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
              <div v-if="event.links?.length > 1" class="timeline-card__links">
                <a v-for="link in event.links.slice(1)" :key="link.url" class="timeline-card__link" :href="link.url"
                  target="_blank" rel="noopener noreferrer" :aria-label="`開啟 ${link.label}`">
                  <span>{{ link.label }}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
            <div v-if="event.links?.length" class="timeline-card__preview">
              <a class="link-preview" :href="event.links[0].url" target="_blank" rel="noopener noreferrer"
                :aria-label="`預覽 ${event.links[0].label}`">
                <div class="link-preview__visual" :class="{ 'link-preview__visual--empty': !event.image }"
                  :style="event.image ? { backgroundImage: `url(${event.image})` } : undefined">
                  <span v-if="!event.image" class="link-preview__icon" aria-hidden="true">🔗</span>
                </div>
                <div class="link-preview__content">
                  <span class="link-preview__tag">浪漫預覽</span>
                  <h4 class="link-preview__title">{{ event.links[0].label }}</h4>
                  <p v-if="event.photoCaption" class="link-preview__caption">{{ event.photoCaption }}</p>
                </div>
                <span class="link-preview__cta" aria-hidden="true">開啟連結 ↗</span>
              </a>
            </div>
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
    id: '2023-qixi',
    year: '2023',
    month: '08 月',
    title: '有妳的七夕，才叫浪漫',
    description: '屬於我們的七夕，訊息和照片都在偷偷記錄愛的溫度。再遠的距離，也擋不住想念的心。',
    quote: '「七夕有妳，平凡的日子也變得特別動人。」',
    location: '線上 · 七夕專屬頁',
    keywords: ['七夕浪漫', '戀人專屬', '心心相印'],
    badge: 'Qixi Promise',
    icon: '💕',
    links: [
      {
        label: '因為有妳，七夕才有溫度',
        url: 'https://lichengjhe.github.io/my-love/iris/2023-08-22/index.html'
      }
    ],
    image: new URL('../assets/timeline/2023_08_22.png', import.meta.url).href,
    photoCaption: '七夕的夜裡，有妳的陪伴，思念都變得溫柔又甜蜜。',
    accent: '#ffc8e4',
    align: 'left'
  },
  {
    id: '2023-salmon-birthday',
    year: '2023',
    month: '10 月',
    title: '妳的生日，我的心願',
    description: '這一天，妳的笑容是最美的禮物。每一個驚喜、每一份心意，都只為妳的生日而準備。願妳的願望都能被溫柔收藏，未來的日子都閃閃發亮。',
    quote: '「妳的生日，有我陪妳一起期待。」',
    location: '線上．生日驚喜頁',
    keywords: ['生日專屬', '溫柔祝福', '幸福陪伴'],
    badge: 'Birthday Blessing',
    icon: '🎁',
    links: [
      {
        label: '妳的生日，有我陪妳慶祝',
        url: 'https://lichengjhe.github.io/my-love/iris/2023-10-23/index.html'
      }
    ],
    image: new URL('../assets/timeline/2023_10_23.png', import.meta.url).href,
    photoCaption: '妳的生日，是我最想珍藏的禮物。',
    accent: '#ffb4d6',
    align: 'right'
  },
  {
    id: '2023-christmas',
    year: '2023',
    month: '12 月',
    title: '我們的聖誕約會',
    description: '今年的聖誕節，有妳陪我一起吃飯、說笑，幸福就在每個我們相視的瞬間。',
    quote: '「兩個人的聖誕，才是最溫暖的奇蹟。」',
    location: '線上．聖誕節專頁',
    keywords: ['聖誕一起', '幸福時光', '戀人限定'],
    badge: 'Holiday Magic',
    icon: '🎄',
    links: [
      {
        label: '和妳一起過聖誕，幸福加倍',
        url: 'https://lichengjhe.github.io/my-love/iris/2023-12-25/index.html'
      }
    ],
    image: new URL('../assets/timeline/2023_12_25.png', import.meta.url).href,
    photoCaption: '聖誕節，有妳一起慶祝，就是最溫暖的奇蹟。',
    accent: '#ffe1f2',
    align: 'left'
  },
  {
    id: '2024-salmon-birthday',
    year: '2024',
    month: '10 月',
    title: '妳的生日，是我心裡的花季',
    description: '每年這天，妳的笑容像花開一樣，讓我的世界都變得柔軟又明亮。願我的陪伴，成為妳最溫柔的陽光，讓每個心願都能悄悄綻放。',
    quote: '「妳的生日，是我最想守護的花期。」',
    location: '線上．生日賀卡',
    keywords: ['生日專屬', '心願陪伴', '快樂回憶'],
    badge: 'Birthday Wish',
    icon: '🎂',
    links: [
      {
        label: '妳的生日，讓我陪妳綻放',
        url: 'https://photos.app.goo.gl/d8x6uiy9m7uXYpmm6'
      }
    ],
    image: new URL('../assets/timeline/2024_10_23.jpg', import.meta.url).href,
    photoCaption: '這天，妳的笑容像花一樣溫柔盛開。',
    accent: '#ffd0e8',
    align: 'right'
  },
  {
    id: '2025-anniversary',
    year: '2025',
    month: '04 月',
    title: '交往紀念日的心跳',
    description: '把我們的旅程剪成相簿，提醒自己要繼續同頻心動。',
    quote: '「每一個交往的日子，都是我用心時刻。我把每一張照片、每一句話都藏進相簿裡，只為陪妳到永遠，願我們的故事永遠只屬於彼此。」',
    location: '線上．紀念日特輯',
    keywords: ['只屬於我們', '專屬紀念', '心動軌跡'],
    badge: 'Anniversary Pulse',
    icon: '💞',
    links: [
      {
        label: '我們的故事，專屬於妳',
        url: 'https://lichengjhe.github.io/my-love/iris/2025-04-23/index.html'
      }
    ],
    image: new URL('../assets/timeline/2025_04_23.png', import.meta.url).href,
    photoCaption: '紀念日的擁抱，把未來的冒險都打包進心跳裡。',
    accent: '#ffb9da',
    align: 'left'
  }
];

const sparkleSymbols = [
  '♥', '❥', '♡', '❤', '💖', '💗', '💘', '💝', '', '💟'
];
const sparkles = Array.from({ length: 14 }, (_, index) => ({
  id: index,
  left: Math.random() * 100,
  top: Math.random() * 100,
  delay: Math.random() * 6,
  duration: 6 + Math.random() * 6,
  scale: 0.6 + Math.random() * 0.8,
  symbol: sparkleSymbols[Math.floor(Math.random() * sparkleSymbols.length)]
}));

const getSparkleStyle = (sparkle) => ({
  left: `${sparkle.left}%`,
  top: `${sparkle.top}%`,
  animationDelay: `${sparkle.delay}s`,
  animationDuration: `${sparkle.duration}s`,
  transform: `scale(${sparkle.scale})`
});

const formatLinkHost = (url) => {
  try {
    const { hostname } = new URL(url);
    return hostname.replace(/^www\./, '');
  } catch (error) {
    return url;
  }
};

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
  background: var(--surface-gradient);
  box-shadow: 0 30px 90px rgba(244, 93, 144, 0.22);
  overflow: hidden;
}

.timeline__constellation {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: var(--layer-section-bg);
}

.timeline__sparkle {
  background: linear-gradient(120deg, #f45990 60%, #ffb7d5 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow: 0 2px 8px #f45990, 0 0 18px #ffb7d5;
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  width: 2.2em;
  height: 2.2em;
  border-radius: 50%;
  color: #f45990;
  background: none;
  opacity: 0;
  animation: floatPetalUp linear infinite;
  text-shadow:
    0 0 12px #ffd0e8,
    0 0 24px #fff,
    0 2px 8px #f45990;
  transition: font-size 0.3s, color 0.3s;
}

/* 粉紅色標題 */
.timeline__header h2#timeline-title {
  color: #f45990;
}

.timeline__header {
  position: relative;
  z-index: var(--layer-section-content);
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
  z-index: var(--layer-section-content);
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
  z-index: var(--layer-section-decor);
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
  grid-template-columns: minmax(260px, 1fr) minmax(280px, 1fr);
  align-items: stretch;
}

.timeline-card__text {
  display: grid;
  gap: 1rem;
  align-content: flex-start;
}

.timeline-card__text h3 {
  color: #f45990;
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
  justify-content: flex-start;
}

.timeline-card__chips li {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 120px;
  min-height: 38px;
  padding: 0.35rem 1rem;
  border-radius: 999px;
  background: rgba(244, 93, 144, 0.1);
  color: var(--primary-dark);
  font-size: 0.85rem;
  letter-spacing: 0.04em;
  white-space: nowrap;
}

.timeline-card__links {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  justify-content: flex-start;
}

.timeline-card__link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  min-width: 140px;
  min-height: 42px;
  padding: 0.45rem 0.9rem;
  border-radius: 999px;
  background: rgba(244, 93, 144, 0.16);
  color: var(--primary-dark);
  font-size: 0.85rem;
  font-weight: 600;
  white-space: nowrap;
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

.timeline-card__preview {
  display: flex;
}

.link-preview {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
  width: 100%;
  padding: 1.4rem;
  border-radius: 26px;
  background: linear-gradient(140deg, rgba(244, 93, 144, 0.14), rgba(255, 216, 232, 0.28));
  box-shadow: 0 22px 44px rgba(244, 93, 144, 0.18);
  color: var(--primary-dark);
  text-decoration: none;
  overflow: hidden;
  transition: transform 0.25s ease, box-shadow 0.25s ease, background 0.25s ease;
}

.link-preview:hover,
.link-preview:focus-visible {
  transform: translateY(-4px);
  box-shadow: 0 26px 58px rgba(244, 93, 144, 0.24);
  background: linear-gradient(140deg, rgba(244, 93, 144, 0.2), rgba(255, 216, 232, 0.34));
}

.link-preview__visual {
  position: relative;
  min-height: 180px;
  border-radius: 20px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: rgba(244, 93, 144, 0.18);
  overflow: hidden;
}

.link-preview__visual::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(51, 28, 46, 0.42) 100%);
  opacity: 0.72;
}

.link-preview__visual--empty {
  background: linear-gradient(145deg, rgba(255, 216, 232, 0.22), rgba(244, 93, 144, 0.18));
}

.link-preview__visual--empty::after {
  opacity: 0.18;
}

.link-preview__icon {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  font-size: clamp(2rem, 4vw, 2.6rem);
  color: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(2px);
}

.link-preview__content {
  display: grid;
  gap: 0.45rem;
}

.link-preview__tag {
  justify-self: flex-start;
  padding: 0.25rem 0.75rem;
  border-radius: 999px;
  background: rgba(244, 93, 144, 0.14);
  color: #f45990;
  font-size: 0.75rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 600;
}

.link-preview__title {
  font-size: clamp(1.1rem, 2.4vw, 1.3rem);
  font-weight: 700;
  color: var(--primary-dark);
  line-height: 1.3;
}

.link-preview__caption {
  color: rgba(51, 28, 46, 0.7);
  line-height: 1.55;
}

.link-preview__domain {
  font-size: 0.85rem;
  letter-spacing: 0.02em;
  color: rgba(51, 28, 46, 0.56);
}

.link-preview__cta {
  align-self: flex-end;
  font-weight: 600;
  font-size: 0.9rem;
  color: #f45990;
}

.timeline-card--visible {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.timeline-card--visible .timeline-card__pulse {
  opacity: 1;
}

.timeline-card--visible .link-preview__visual {
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
    left: 12px;
  }

  .timeline-card {
    padding: 1.6rem;
    margin: 0;
    width: 100%;
  }

  .timeline-card__main {
    grid-template-columns: 1fr;
  }

  .timeline-card__preview {
    order: -1;
  }

  .link-preview {
    padding: 1rem;
  }

  .link-preview__content {
    gap: 0.35rem;
  }

  .link-preview__visual {
    min-height: 140px;
  }
}

@keyframes floatPetalUp {
  0% {
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 0;
  }

  10% {
    opacity: 1;
  }

  100% {
    transform: translate3d(var(--drift, 10px), -110vh, 0) scale(1);
    opacity: 0;
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
