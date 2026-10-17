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
          <span>Happy Birthday to Yen-Yu (彥伃) • 10/23 專屬紀念</span>
        </span>
      </div>

      <!-- Main Title -->
      <h1 class="hero-title font-serif">
        2026 關西初秋浪漫之旅
        <span class="hero-title-highlight font-display">Kansai Journey • 承哲 & 彥伃</span>
      </h1>

      <!-- Subtitle Description -->
      <p class="hero-desc">
        「把京都悠遠的茶香古街、伊根蔚藍的海浪、琵琶湖的湖光山色，以及我們彼此的甜蜜笑聲，<br class="hidden-mobile"/>
        化作這張飛往日本的來回機票，送給最特別的妳。」
      </p>

      <!-- Family & Gift Tags -->
      <div class="hero-tags-row">
        <div class="hero-tag-item">
          <span class="tag-icon">✈️</span>
          <span class="tag-text"><strong>生日禮物</strong>：贊助彥伃來回機票 (承哲 贈)</span>
        </div>
        <div class="hero-tag-item">
          <span class="tag-icon">📅</span>
          <span class="tag-text"><strong>旅行日期</strong>：2026/10/08 (四) ～ 10/13 (二)</span>
        </div>
        <div class="hero-tag-item">
          <span class="tag-icon">💑</span>
          <span class="tag-text"><strong>甜蜜同遊</strong>：彥伃 • 承哲 兩人專屬旅程</span>
        </div>
      </div>

      <!-- Countdowns & Date Milestones -->
      <div class="hero-countdown-grid">
        <a href="#itinerary" class="countdown-card glass-card clickable-card">
          <div class="cd-header">
            <span class="cd-icon">🌟</span>
            <span class="cd-label">關西旅行足跡</span>
          </div>
          <div class="cd-body">
            <div class="cd-number font-display">6<span class="cd-sub">天</span>5<span class="cd-sub">夜</span></div>
            <div class="cd-unit">圓滿甜蜜回憶</div>
          </div>
          <div class="cd-date">2026/10/08 ～ 10/13 同行</div>
          <div class="card-jump-hint">
            <span>瀏覽每日行程</span>
            <span class="jump-arrow">➔</span>
          </div>
        </a>

        <a href="#birthday-card" class="countdown-card glass-card cd-birthday-card clickable-card">
          <div class="cd-header">
            <span class="cd-icon">🎂</span>
            <span class="cd-label">10/23 彥伃生日</span>
          </div>
          <div class="cd-body">
            <div class="cd-number font-display text-blush">10/23</div>
            <div class="cd-unit">Iris 壽星大快樂 🎉</div>
          </div>
          <div class="cd-date">手寫卡片與滿滿祝福</div>
          <div class="card-jump-hint hint-blush">
            <span>閱讀生日情書</span>
            <span class="jump-arrow">➔</span>
          </div>
        </a>

        <a href="#itinerary" class="countdown-card glass-card clickable-card">
          <div class="cd-header">
            <span class="cd-icon">🗾</span>
            <span class="cd-label">精彩跨城巡禮</span>
          </div>
          <div class="cd-body">
            <div class="cd-number font-display">大阪•京都•滋賀</div>
            <div class="cd-unit">雙人專屬回憶</div>
          </div>
          <div class="cd-date">心齋橋 • 宇治 • 伊根 • USJ</div>
          <div class="card-jump-hint">
            <span>查看景點足跡</span>
            <span class="jump-arrow">➔</span>
          </div>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
// HeroBanner static presentation
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
  color: inherit;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.clickable-card {
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.clickable-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 14px 32px rgba(184, 59, 50, 0.16);
  border-color: rgba(184, 59, 50, 0.35);
}

.cd-birthday-card {
  border-color: rgba(232, 99, 128, 0.35);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.95), rgba(253, 238, 242, 0.85));
}

.cd-birthday-card.clickable-card:hover {
  box-shadow: 0 14px 32px rgba(232, 99, 128, 0.25);
  border-color: rgba(232, 99, 128, 0.5);
}

.card-jump-hint {
  margin-top: 0.75rem;
  padding-top: 0.5rem;
  border-top: 1px dashed rgba(184, 59, 50, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: var(--primary-maple);
  transition: all 0.2s ease;
}

.card-jump-hint.hint-blush {
  color: var(--accent-blush);
  border-color: rgba(232, 99, 128, 0.2);
}

.jump-arrow {
  transition: transform 0.2s ease;
}

.clickable-card:hover .jump-arrow {
  transform: translateX(4px);
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


@media (min-width: 768px) {
  .hidden-mobile {
    display: inline;
  }
}

/* Mobile Friendly Optimization */
@media (max-width: 576px) {
  .hero-section {
    padding-top: 6.5rem;
    padding-bottom: 3rem;
  }
  .hero-title {
    font-size: 1.95rem;
  }
  .hero-title-highlight {
    font-size: 1.45rem;
  }
  .hero-desc {
    font-size: 0.95rem;
    line-height: 1.7;
  }
  .hero-countdown-grid {
    gap: 0.85rem;
  }
  .countdown-card {
    padding: 1.15rem 1rem;
  }
  .cd-number {
    font-size: 2.1rem;
  }
  .hero-actions {
    flex-direction: column;
    width: 100%;
    gap: 0.75rem;
  }
  .hero-actions .btn {
    width: 100%;
    padding: 0.85rem 1.25rem;
    font-size: 0.98rem;
    justify-content: center;
  }
}
</style>
