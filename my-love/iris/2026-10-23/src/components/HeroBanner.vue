<template>
  <section class="hero-section">
    <div class="hero-bg-shapes">
      <div class="glow-sphere sphere-1"></div>
      <div class="glow-sphere sphere-2"></div>
      <div class="glow-sphere sphere-3"></div>
    </div>

    <div class="container hero-content">
      <!-- Top Romantic Tag -->
      <div class="hero-badge-wrap">
        <span class="hero-pill animate-pulse-glow">
          <span class="pill-sparkle">💖</span>
          <span>Happy Birthday to Yen-Yu (林彥伃) • 10/23 專屬紀念</span>
        </span>
      </div>

      <!-- Main Title -->
      <h1 class="hero-title font-serif">
        2026 關西秋日浪漫之旅
        <span class="hero-title-highlight font-display">Maple Kansai • 承哲 & 彥伃</span>
      </h1>

      <!-- Subtitle Description -->
      <p class="hero-desc">
        「把秋天最璀璨的紅葉、京都悠遠的古街、伊根蔚藍的海浪，以及全家人的歡笑聲，<br class="hidden-mobile"/>
        化作這張飛往日本的來回機票，送給最特別的妳。」
      </p>

      <!-- Family & Gift Tags -->
      <div class="hero-tags-row">
        <div class="hero-tag-item">
          <span class="tag-icon">✈️</span>
          <span class="tag-text"><strong>生日禮物</strong>：贊助彥伃來回機票 (承哲 贈)</span>
        </div>
        <div class="hero-tag-item">
          <span class="tag-icon">🍁</span>
          <span class="tag-text"><strong>旅行日期</strong>：2026/10/08 (四) ～ 10/13 (二)</span>
        </div>
        <div class="hero-tag-item">
          <span class="tag-icon">👨‍👩‍👧‍👧</span>
          <span class="tag-text"><strong>甜蜜同遊</strong>：彥伃 • 承哲 • 爸媽 • 大姐 • 二姐</span>
        </div>
      </div>

      <!-- Countdowns & Date Milestones -->
      <div class="hero-countdown-grid">
        <div class="countdown-card glass-card">
          <div class="cd-header">
            <span class="cd-icon">🛫</span>
            <span class="cd-label">關西啟程倒數</span>
          </div>
          <div class="cd-body">
            <div class="cd-number font-display">{{ tripDaysRemaining }}</div>
            <div class="cd-unit">天 (Days)</div>
          </div>
          <div class="cd-date">2026/10/08 (四) 出發</div>
        </div>

        <div class="countdown-card glass-card cd-birthday-card">
          <div class="cd-header">
            <span class="cd-icon">🎂</span>
            <span class="cd-label">彥伃生日倒數</span>
          </div>
          <div class="cd-body">
            <div class="cd-number font-display text-blush">{{ bdayDaysRemaining }}</div>
            <div class="cd-unit">天 (Days)</div>
          </div>
          <div class="cd-date">10/23 壽星大快樂 🎉</div>
        </div>

        <div class="countdown-card glass-card">
          <div class="cd-header">
            <span class="cd-icon">🗾</span>
            <span class="cd-label">精彩跨城巡禮</span>
          </div>
          <div class="cd-body">
            <div class="cd-number font-display">6<span class="cd-sub">天</span>5<span class="cd-sub">夜</span></div>
            <div class="cd-unit">大阪 • 京都 • 滋賀</div>
          </div>
          <div class="cd-date">天橋立 • 伊根 • 宇治 • 琵琶湖</div>
        </div>
      </div>

      <!-- CTA Buttons -->
      <div class="hero-actions">
        <button class="btn btn-primary btn-lg shadow-glow" @click="$emit('openSurprise')">
          <span class="btn-icon">🎂</span>
          <span>點我拆開 10/23 生日驚喜</span>
        </button>

        <a href="#flight" class="btn btn-gold btn-lg">
          <span class="btn-icon">✈️</span>
          <span>查看機票禮物</span>
        </a>

        <a href="#itinerary" class="btn btn-glass btn-lg">
          <span class="btn-icon">📅</span>
          <span>瀏覽 6 天行程</span>
        </a>

        <a href="#gallery" class="btn btn-glass btn-lg">
          <span class="btn-icon">📷</span>
          <span>旅途相簿回憶</span>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

defineEmits<{
  (e: 'openSurprise'): void
}>()

const tripStartDate = new Date('2026-10-08T06:40:00')
const birthdayDate = new Date('2026-10-23T00:00:00')

const tripDaysRemaining = computed(() => {
  const now = new Date()
  const diff = tripStartDate.getTime() - now.getTime()
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
  return days > 0 ? days : 0
})

const bdayDaysRemaining = computed(() => {
  const now = new Date()
  const diff = birthdayDate.getTime() - now.getTime()
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
  return days > 0 ? days : 0
})
</script>

<style scoped>
.hero-section {
  position: relative;
  min-height: 90vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 7rem 0 4rem;
  overflow: hidden;
}

.hero-bg-shapes {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
  z-index: 0;
}

.glow-sphere {
  position: absolute;
  border-radius: 50%;
  filter: blur(80px);
  opacity: 0.55;
}

.sphere-1 {
  width: 480px;
  height: 480px;
  background: radial-gradient(circle, rgba(232, 93, 78, 0.35), transparent 70%);
  top: -80px;
  left: -80px;
}

.sphere-2 {
  width: 520px;
  height: 520px;
  background: radial-gradient(circle, rgba(229, 169, 60, 0.3), transparent 70%);
  bottom: -60px;
  right: -60px;
}

.sphere-3 {
  width: 360px;
  height: 360px;
  background: radial-gradient(circle, rgba(232, 99, 128, 0.25), transparent 70%);
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
}

.hero-badge-wrap {
  margin-bottom: 1.5rem;
}

.hero-pill {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.45rem 1.35rem;
  background: rgba(255, 255, 255, 0.85);
  border: 1.5px solid rgba(232, 99, 128, 0.4);
  border-radius: var(--radius-full);
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--primary-maple-dark);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 16px rgba(232, 99, 128, 0.18);
}

.pill-sparkle {
  font-size: 1.1rem;
}

.hero-title {
  font-size: 2.35rem;
  font-weight: 900;
  color: var(--kyoto-indigo);
  line-height: 1.25;
  margin-bottom: 1.25rem;
  letter-spacing: -0.01em;
}

@media (min-width: 768px) {
  .hero-title {
    font-size: 3.6rem;
  }
}

.hero-title-highlight {
  display: block;
  font-size: 1.7rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--primary-maple), var(--accent-ginkgo-dark));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-top: 0.4rem;
}

@media (min-width: 768px) {
  .hero-title-highlight {
    font-size: 2.5rem;
  }
}

.hero-desc {
  font-size: 1.05rem;
  line-height: 1.8;
  color: var(--text-secondary);
  max-width: 780px;
  margin: 0 auto 2rem;
  font-family: var(--font-serif);
}

@media (min-width: 768px) {
  .hero-desc {
    font-size: 1.2rem;
  }
}

.hero-tags-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.85rem;
  margin-bottom: 2.5rem;
}

.hero-tag-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  background: rgba(255, 255, 255, 0.75);
  border: 1px solid rgba(184, 59, 50, 0.15);
  padding: 0.4rem 1rem;
  border-radius: var(--radius-full);
  font-size: 0.9rem;
  color: var(--text-main);
  backdrop-filter: blur(8px);
}

.tag-icon {
  font-size: 1.05rem;
}

/* Countdown Grid */
.hero-countdown-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 1.25rem;
  max-width: 960px;
  margin: 0 auto 2.5rem;
}

@media (min-width: 640px) {
  .hero-countdown-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.countdown-card {
  padding: 1.5rem 1.25rem;
  text-align: center;
  position: relative;
  overflow: hidden;
  border: 1.5px solid rgba(255, 255, 255, 0.7);
}

.cd-birthday-card {
  border-color: rgba(232, 99, 128, 0.35);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(253, 238, 242, 0.85));
}

.cd-header {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  margin-bottom: 0.5rem;
}

.cd-icon {
  font-size: 1.2rem;
}

.cd-label {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-secondary);
  letter-spacing: 0.05em;
}

.cd-body {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 0.4rem;
  margin-bottom: 0.4rem;
}

.cd-number {
  font-size: 2.6rem;
  font-weight: 900;
  color: var(--primary-maple);
  line-height: 1;
}

.cd-sub {
  font-size: 1.4rem;
  margin: 0 0.2rem;
  color: var(--text-secondary);
}

.text-blush {
  color: var(--accent-blush);
}

.cd-unit {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-muted);
}

.cd-date {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--kyoto-indigo);
  background: rgba(0, 0, 0, 0.04);
  padding: 0.25rem 0.65rem;
  border-radius: var(--radius-full);
  display: inline-block;
}

/* Actions */
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.btn-lg {
  padding: 0.9rem 1.75rem;
  font-size: 1.05rem;
}

.btn-icon {
  font-size: 1.25rem;
}

.hidden-mobile {
  display: none;
}

@media (min-width: 768px) {
  .hidden-mobile {
    display: inline;
  }
}
</style>
