<template>
  <section class="wishes" aria-labelledby="wishes-title">
    <div class="wishes__header fade-up">
      <h2 id="wishes-title">給鮭魚子的祝福儀式</h2>
      <p>挑一張祝福卡，或是調整心情刻度，讓存摺子的愛意以妳喜歡的節奏慢慢展開。</p>
    </div>

    <div class="wishes__mood fade-up" aria-live="polite">
      <div class="wishes__mood-top">
        <span class="wishes__badge">Mood Meter</span>
        <span class="wishes__value">{{ moodLevel }}%</span>
      </div>
      <input
        v-model="moodLevel"
        type="range"
        min="0"
        max="100"
        step="1"
        :style="{ background: sliderBackground }"
        aria-label="調整今日心情溫度"
      />
      <p class="wishes__mood-message">{{ moodMessage }}</p>
    </div>

    <div class="wishes__grid">
      <article
        v-for="wish in wishes"
        :key="wish.id"
        class="wish fade-up"
        :class="{ 'wish--active': activeWish === wish.id }"
        :style="{ animationDelay: `${wish.delay}s` }"
      >
        <button type="button" class="wish-card" @click="toggleWish(wish.id)">
          <div class="wish-card__icon" aria-hidden="true">{{ wish.icon }}</div>
          <div class="wish-card__content">
            <h3>{{ wish.title }}</h3>
            <p class="wish-card__tagline">{{ wish.tagline }}</p>
          </div>
          <span class="wish-card__chevron" aria-hidden="true">↗</span>
        </button>
        <transition name="wish-reveal">
          <div v-if="activeWish === wish.id" class="wish-card__details">
            <p class="wish-card__message">{{ wish.message }}</p>
            <ul class="wish-card__promises">
              <li v-for="promise in wish.promises" :key="promise">{{ promise }}</li>
            </ul>
          </div>
        </transition>
      </article>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue';

const moodLevel = ref(68);
const activeWish = ref('sunshine');

const wishes = [
  {
    id: 'sunshine',
    icon: '☀️',
    title: '笑顏是我永遠的太陽',
    tagline: '為妳放晴的日常承諾',
    message: '每天睜開眼的第一件事，就是確認妳的笑容依舊明亮，因為它是我所有勇敢的來源。',
    promises: ['每日一則暖心留言', '遇到煩心事時我先抱緊妳', '累的時候就換我逗妳笑'],
    delay: 0
  },
  {
    id: 'adventure',
    icon: '🗺️',
    title: '旅途永遠不孤單',
    tagline: '我們的世界地圖還畫不完',
    message: '無論是巷弄小店還是跨國旅程，只要牽著妳的手，世界就會乖乖地對我們溫柔。',
    promises: ['每季安排一場驚喜小旅行', '迷路時我負責冷靜導航', '紀錄每站的專屬回憶'],
    delay: 0.12
  },
  {
    id: 'dream',
    icon: '🌙',
    title: '妳所有的夢都有人守護',
    tagline: '把不安交給我，把光芒留給妳',
    message: '當妳奔向理想的時候，我就是背後那盞不熄滅的夜燈，陪妳一起熬夜、一起期待。',
    promises: ['每月一次夢想檢查小聚', '重要時刻在場當專屬應援', '心累時包辦甜點和擁抱'],
    delay: 0.24
  },
  {
    id: 'home',
    icon: '🏡',
    title: '回到我們的溫柔宇宙',
    tagline: '把平凡練習成永遠的幸福',
    message: '不管外面多嘈雜，只要妳回頭，就會看見我備好熱茶、毛毯，還有無窮盡的耐心。',
    promises: ['共煮週末的儀式感晚餐', '聆聽妳的每一個情緒', '睡前小聊十分鐘只說甜話'],
    delay: 0.36
  }
];

const sliderBackground = computed(
  () => `linear-gradient(90deg, var(--secondary) 0%, var(--primary) ${moodLevel.value}%, rgba(255, 255, 255, 0.4) ${moodLevel.value}%)`
);

const moodMessage = computed(() => {
  if (moodLevel.value < 25) return '今天想偷懶也沒關係，我會是妳最柔軟的靠山。';
  if (moodLevel.value < 55) return '慢慢來，我們用剛好的速度感受每一份溫度。';
  if (moodLevel.value < 85) return '精神滿滿！不如挑張卡片，看我準備了什麼冒險。';
  return '亮度爆表！存摺子正在備妳最閃亮的大驚喜，敬請期待。';
});

const toggleWish = (id) => {
  activeWish.value = activeWish.value === id ? null : id;
};
</script>

<style scoped>
.wishes {
  padding-block: clamp(4rem, 8vw, 7rem);
  display: grid;
  gap: clamp(2.5rem, 5vw, 3.5rem);
}

.wishes__header {
  text-align: center;
  max-width: 680px;
  margin: 0 auto;
  display: grid;
  gap: 1rem;
}

.wishes__header p {
  color: var(--text-muted);
  line-height: 1.6;
}

.wishes__mood {
  background: rgba(255, 255, 255, 0.9);
  border-radius: 28px;
  padding: clamp(1.8rem, 4vw, 2.6rem);
  box-shadow: 0 18px 48px rgba(51, 28, 46, 0.08);
  display: grid;
  gap: 1.2rem;
}

.wishes__mood-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.wishes__badge {
  background: rgba(244, 93, 144, 0.12);
  color: var(--primary-dark);
  padding: 0.4rem 1rem;
  border-radius: 999px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-size: 0.75rem;
}

.wishes__value {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--primary-dark);
}

.wishes__mood input[type='range'] {
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  height: 12px;
  border-radius: 999px;
  outline: none;
  cursor: pointer;
  transition: filter 0.3s ease;
}

.wishes__mood input[type='range']::-webkit-slider-thumb {
  appearance: none;
  -webkit-appearance: none;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--primary);
  box-shadow: 0 0 0 6px rgba(244, 93, 144, 0.2);
}

.wishes__mood-message {
  font-size: 0.95rem;
  color: var(--text-muted);
}

.wishes__grid {
  display: grid;
  gap: 1.8rem;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
}

.wish {
  display: grid;
  gap: 0.75rem;
}

.wish-card {
  width: 100%;
  border: none;
  background: rgba(255, 255, 255, 0.94);
  border-radius: 26px;
  padding: clamp(1.6rem, 3vw, 2rem);
  box-shadow: 0 18px 40px rgba(51, 28, 46, 0.08);
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: 1rem;
  align-items: center;
  text-align: left;
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.wish-card:hover,
.wish-card:focus-visible {
  transform: translateY(-6px);
  box-shadow: 0 26px 70px rgba(244, 93, 144, 0.25);
  outline: none;
}

.wish-card__icon {
  width: 52px;
  height: 52px;
  border-radius: 16px;
  background: rgba(255, 194, 214, 0.4);
  display: grid;
  place-items: center;
  font-size: 1.6rem;
}

.wish-card__content {
  display: grid;
  gap: 0.5rem;
}

.wish-card__content h3 {
  font-size: 1.2rem;
}

.wish-card__tagline {
  color: var(--text-muted);
  font-size: 0.95rem;
  line-height: 1.5;
}

.wish-card__chevron {
  font-size: 1.2rem;
  color: rgba(51, 28, 46, 0.35);
  transition: transform 0.3s ease;
}

.wish--active .wish-card__chevron {
  transform: rotate(90deg);
}

.wish-card__details {
  background: rgba(255, 255, 255, 0.98);
  border-radius: 22px;
  padding: 1.4rem 1.8rem;
  box-shadow: inset 0 0 0 1px rgba(244, 93, 144, 0.12);
  display: grid;
  gap: 1rem;
}

.wish-card__message {
  color: var(--text-muted);
  line-height: 1.6;
}

.wish-card__promises {
  list-style: none;
  display: grid;
  gap: 0.6rem;
  margin: 0;
  padding: 0;
}

.wish-card__promises li {
  position: relative;
  padding-left: 1.4rem;
  color: var(--primary-dark);
  font-weight: 500;
}

.wish-card__promises li::before {
  content: '❤';
  position: absolute;
  left: 0;
  top: 0;
  color: var(--primary);
  font-size: 0.85rem;
}

.wish-reveal-enter-active,
.wish-reveal-leave-active {
  transition: all 0.35s ease;
}

.wish-reveal-enter-from,
.wish-reveal-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

@media (max-width: 720px) {
  .wish-card {
    grid-template-columns: auto 1fr;
  }

  .wish-card__chevron {
    display: none;
  }
}
</style>
