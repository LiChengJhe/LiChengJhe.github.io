<template>
  <section id="hotel" class="hotel-section">
    <div class="container">
      <!-- Section Title -->
      <div class="section-title-wrap">
        <span class="section-tag">Accommodation</span>
        <h2 class="section-title">🏨 住宿資訊 • 喜來登福朋快捷</h2>
        <p class="section-desc">
          Four Points Express by Sheraton Osaka Shinsaibashi • 繁華核心、交通超便利
        </p>
      </div>

      <div class="hotel-card glass-card">
        <div class="hotel-grid">
          <!-- Left: Hotel Overview & Map Mock -->
          <div class="hotel-left">
            <div class="hotel-img-box">
              <img
                src="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1200&auto=format&fit=crop"
                alt="Hotel"
                class="hotel-photo"
              />
              <div class="hotel-badge">
                <span>⭐ Sheraton Brand</span>
              </div>
            </div>

            <div class="hotel-time-grid">
              <div class="time-item">
                <span class="time-label">入住時間 (Check-in)</span>
                <span class="time-val font-display">{{ hotelInfo.checkIn }}</span>
              </div>
              <div class="time-item">
                <span class="time-label">退房時間 (Check-out)</span>
                <span class="time-val font-display">{{ hotelInfo.checkOut }}</span>
              </div>
            </div>
          </div>

          <!-- Right: Details & Transportation -->
          <div class="hotel-right">
            <div class="hotel-title-row">
              <div>
                <span class="badge badge-maple">大阪心齋橋住宿</span>
                <h3 class="hotel-name font-serif">{{ hotelInfo.nameZh }}</h3>
                <h4 class="hotel-subname">{{ hotelInfo.name }}</h4>
              </div>
            </div>

            <!-- Address -->
            <div class="hotel-address-box">
              <span class="addr-icon">📍</span>
              <div>
                <div class="addr-zh">{{ hotelInfo.address }}</div>
                <div class="addr-en">{{ hotelInfo.addressEn }}</div>
              </div>
            </div>

            <!-- Metro & Exits -->
            <div class="hotel-section-block">
              <h4 class="block-title">🚇 地鐵站與步行路線</h4>
              <ul class="metro-list">
                <li v-for="(exit, index) in hotelInfo.metroExits" :key="index" class="metro-item">
                  <span class="metro-bullet">✓</span>
                  <span>{{ exit }}</span>
                </li>
              </ul>
            </div>

            <!-- Highlights -->
            <div class="hotel-section-block">
              <h4 class="block-title">✨ 飯店優勢與周邊便利性</h4>
              <div class="highlights-grid">
                <div v-for="(hl, index) in hotelInfo.highlights" :key="index" class="highlight-item">
                  <span class="hl-icon">🏮</span>
                  <span>{{ hl }}</span>
                </div>
              </div>
            </div>

            <!-- Quick Map Action -->
            <div class="hotel-actions">
              <a
                :href="'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(hotelInfo.name + ' ' + hotelInfo.address)"
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-primary"
              >
                <span>🗺️</span>
                <span>在 Google Maps 中開啟導航</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { hotelInfo } from '../data/flights'
</script>

<style scoped>
.hotel-section {
  padding: 5rem 0;
  position: relative;
}

.hotel-card {
  background: #ffffff;
  border-radius: var(--radius-xl);
  padding: 2rem;
  box-shadow: var(--shadow-lg);
  border: 1px solid rgba(184, 59, 50, 0.12);
}

@media (min-width: 860px) {
  .hotel-card {
    padding: 2.5rem;
  }
}

.hotel-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
}

@media (min-width: 860px) {
  .hotel-grid {
    grid-template-columns: 1fr 1.35fr;
  }
}

/* Left */
.hotel-left {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.hotel-img-box {
  position: relative;
  width: 100%;
  padding-top: 60%;
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.hotel-photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hotel-badge {
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(27, 33, 56, 0.85);
  color: white;
  font-size: 0.8rem;
  font-weight: 700;
  padding: 0.35rem 0.85rem;
  border-radius: var(--radius-full);
  backdrop-filter: blur(4px);
}

.hotel-time-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  background: #faf8f5;
  padding: 1.25rem;
  border-radius: var(--radius-md);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.time-item {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.time-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  font-weight: 600;
}

.time-val {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--primary-maple);
}

/* Right */
.hotel-right {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.hotel-name {
  font-size: 1.5rem;
  font-weight: 900;
  color: var(--kyoto-indigo);
  margin: 0.4rem 0 0.2rem;
}

.hotel-subname {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--accent-ginkgo-dark);
}

.hotel-address-box {
  display: flex;
  align-items: flex-start;
  gap: 0.65rem;
  background: #fdfaf6;
  padding: 0.85rem 1rem;
  border-radius: var(--radius-md);
  border-left: 3px solid var(--primary-maple);
}

.addr-icon {
  font-size: 1.1rem;
  margin-top: 1px;
}

.addr-zh {
  font-size: 0.92rem;
  font-weight: 700;
  color: var(--text-main);
}

.addr-en {
  font-size: 0.78rem;
  color: var(--text-muted);
}

.block-title {
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--kyoto-indigo);
  margin-bottom: 0.6rem;
}

.metro-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.metro-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.88rem;
  color: var(--text-secondary);
}

.metro-bullet {
  color: var(--primary-maple);
  font-weight: 800;
}

.highlights-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.5rem;
}

.highlight-item {
  display: flex;
  align-items: flex-start;
  gap: 0.5rem;
  font-size: 0.88rem;
  color: var(--text-secondary);
  background: #fbf9f6;
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius-sm);
}

.hl-icon {
  font-size: 0.95rem;
}

.hotel-actions {
  margin-top: 0.5rem;
}
</style>
