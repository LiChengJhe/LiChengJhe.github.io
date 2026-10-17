<template>
  <section id="gallery" class="gallery-section">
    <div class="container">
      <!-- Section Header -->
      <div class="section-title-wrap">
        <span class="section-tag">Travel Albums</span>
        <h2 class="section-title">📷 關西足跡 • Google 雲端相簿</h2>
        <p class="section-desc">
          各日旅途精彩高畫質原檔已整理至 Google 相簿，點擊下方各日連結即可隨時回味與珍藏！
        </p>
      </div>

      <!-- Main Google Photos Header Banner -->
      <div class="google-photos-banner glass-card">
        <div class="gp-left">
          <div class="gp-icon-wrap">
            <svg class="gp-svg-icon" viewBox="0 0 24 24" width="42" height="42">
              <path fill="#EA4335" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
            </svg>
          </div>
          <div>
            <h3 class="gp-title font-serif">Google Photos 雲端相簿集合</h3>
            <p class="gp-desc">
              收錄 10/08 ～ 10/13 這趟關西之旅的所有高畫質原始照片與甜蜜點滴，點擊下方各天連結直接開啟！
            </p>
          </div>
        </div>

        <div class="gp-right">
          <a
            :href="dailyGooglePhotosAlbums[0].url"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-primary btn-gp"
          >
            <span>🔗</span>
            <span>開啟首日相簿 (10/09)</span>
          </a>
        </div>
      </div>

      <!-- Daily Google Photos Albums Grid (10/09, 10/10, 10/11, 10/12) -->
      <div class="daily-albums-wrap">
        <div class="daily-albums-header">
          <span class="header-icon">🌟</span>
          <span class="header-title font-serif">按日期開啟 Google 雲端相簿：</span>
        </div>
        <div class="daily-albums-grid">
          <a
            v-for="album in dailyGooglePhotosAlbums"
            :key="album.dateStr"
            :href="album.url"
            target="_blank"
            rel="noopener noreferrer"
            class="daily-album-card glass-card"
          >
            <div class="album-card-top">
              <span class="badge badge-maple font-display">{{ album.dayLabel }}</span>
              <span class="album-date-badge">{{ album.dateStr }}</span>
            </div>
            <div class="album-card-body">
              <div class="album-icon-circle">{{ album.icon }}</div>
              <div class="album-info">
                <h4 class="album-card-title">{{ album.title }}</h4>
                <p class="album-card-tag">{{ album.coverTag }}</p>
              </div>
            </div>
            <div class="album-card-footer">
              <span class="album-btn-text">前往 Google 相簿</span>
              <span class="album-arrow-icon">↗</span>
            </div>
          </a>
        </div>
      </div>

      <!-- Travel Care & Photography Tips -->
      <div class="travel-tips-section">
        <div class="tips-header">
          <span class="tips-icon">💡</span>
          <h3 class="tips-title font-serif">旅程回憶與攝影筆記</h3>
        </div>
        <div class="tips-grid">
          <div v-for="tip in travelCareTips" :key="tip.title" class="tip-card glass-card">
            <div class="tip-top">
              <span class="tip-badge-icon">{{ getTipIcon(tip.icon) }}</span>
              <div>
                <h4 class="tip-main-title font-serif">{{ tip.title }}</h4>
                <div class="tip-subtitle">{{ tip.subtitle }}</div>
              </div>
            </div>
            <p class="tip-desc">{{ tip.description }}</p>
            <ul class="tip-practical-list">
              <li v-for="(p, i) in tip.practicalTips" :key="i">
                <span class="p-bullet">✓</span>
                <span>{{ p }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { dailyGooglePhotosAlbums, travelCareTips } from '../data/gallery'

function getTipIcon(iconName: string): string {
  switch (iconName) {
    case 'Coffee': return '☕'
    case 'Utensils': return '🍱'
    case 'Bus': return '🚌'
    case 'HeartHandshake': return '💖'
    default: return '📍'
  }
}
</script>

<style scoped>
.gallery-section {
  padding: 5rem 0;
  position: relative;
}

/* Google Photos Header Banner */
.google-photos-banner {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1.75rem 2rem;
  margin-bottom: 2.25rem;
  border-radius: var(--radius-xl);
  border: 1px solid rgba(212, 163, 115, 0.4);
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(254, 250, 246, 0.9) 100%
  );
  box-shadow: 0 10px 30px rgba(74, 55, 40, 0.08);
}

@media (min-width: 860px) {
  .google-photos-banner {
    flex-direction: row;
    align-items: center;
    padding: 2.25rem 2.75rem;
  }
}

.gp-left {
  display: flex;
  align-items: center;
  gap: 1.25rem;
}

.gp-icon-wrap {
  width: 60px;
  height: 60px;
  border-radius: 16px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(66, 133, 244, 0.2);
  flex-shrink: 0;
}

.gp-title {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--kyoto-indigo);
  margin-bottom: 0.35rem;
}

.gp-desc {
  font-size: 0.92rem;
  color: var(--text-secondary);
  line-height: 1.6;
  max-width: 650px;
}

.gp-right {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  align-items: center;
}

.btn-gp {
  background: linear-gradient(135deg, #4285f4, #1a73e8);
  box-shadow: 0 4px 14px rgba(66, 133, 244, 0.35);
  padding: 0.75rem 1.5rem;
  font-size: 0.95rem;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
}

.btn-gp:hover {
  box-shadow: 0 6px 20px rgba(66, 133, 244, 0.5);
  transform: translateY(-2px);
}

/* Daily Google Photos Albums Grid Styles */
.daily-albums-wrap {
  margin-bottom: 4rem;
}

.daily-albums-header {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--kyoto-indigo);
  margin-bottom: 1.25rem;
}

.header-icon {
  font-size: 1.3rem;
}

.daily-albums-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.25rem;
}

@media (min-width: 640px) {
  .daily-albums-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .daily-albums-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.daily-album-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem 1.35rem;
  border-radius: var(--radius-lg);
  border: 1.5px solid rgba(212, 163, 115, 0.35);
  background: rgba(255, 255, 255, 0.9);
  box-shadow: var(--shadow-sm);
  text-decoration: none;
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  position: relative;
  overflow: hidden;
}

.daily-album-card:hover {
  transform: translateY(-5px);
  border-color: var(--primary-maple);
  box-shadow: 0 14px 30px rgba(184, 59, 50, 0.16);
  background: #ffffff;
}

.album-card-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.2rem;
}

.album-date-badge {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--primary-maple);
  background: rgba(184, 59, 50, 0.08);
  padding: 3px 10px;
  border-radius: var(--radius-full);
}

.album-card-body {
  display: flex;
  align-items: flex-start;
  gap: 0.9rem;
  margin-bottom: 1.5rem;
}

.album-icon-circle {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: rgba(247, 240, 233, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
  border: 1px solid rgba(212, 163, 115, 0.3);
}

.album-info {
  flex: 1;
}

.album-card-title {
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--kyoto-indigo);
  line-height: 1.4;
  margin-bottom: 0.35rem;
}

.album-card-tag {
  font-size: 0.8rem;
  color: var(--text-secondary);
  line-height: 1.5;
}

.album-card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.85rem;
  border-top: 1px dashed rgba(212, 163, 115, 0.3);
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--primary-maple);
}

.album-arrow-icon {
  font-size: 1.1rem;
  transition: transform 0.2s ease;
}

.daily-album-card:hover .album-arrow-icon {
  transform: translate(3px, -3px);
}

/* Travel Tips Section */
.travel-tips-section {
  margin-top: 3rem;
  border-top: 1px dashed rgba(212, 163, 115, 0.4);
  padding-top: 3rem;
}

.tips-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 1.75rem;
}

.tips-icon {
  font-size: 1.5rem;
}

.tips-title {
  font-size: 1.4rem;
  color: var(--kyoto-indigo);
}

.tips-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .tips-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.tip-card {
  padding: 1.75rem;
  border-radius: var(--radius-xl);
  border: 1px solid rgba(212, 163, 115, 0.3);
  background: rgba(255, 255, 255, 0.85);
}

.tip-top {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
}

.tip-badge-icon {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: rgba(184, 59, 50, 0.08);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  flex-shrink: 0;
}

.tip-main-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--kyoto-indigo);
  margin-bottom: 2px;
}

.tip-subtitle {
  font-size: 0.85rem;
  color: var(--primary-maple);
  font-weight: 600;
}

.tip-desc {
  font-size: 0.92rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 1rem;
}

.tip-practical-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.tip-practical-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--text-main);
  line-height: 1.5;
}

.p-bullet {
  color: var(--primary-maple);
  font-weight: bold;
}

@media (max-width: 640px) {
  .google-photos-banner {
    padding: 1.25rem;
    gap: 1.25rem;
  }

  .gp-left {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.85rem;
  }

  .gp-right {
    width: 100%;
  }

  .btn-gp {
    width: 100%;
    justify-content: center;
  }

  .daily-album-card {
    padding: 1.25rem 1rem;
  }

  .tip-card {
    padding: 1.25rem 1rem;
  }
}
</style>
