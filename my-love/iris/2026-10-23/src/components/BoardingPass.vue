<template>
  <section id="flight" class="flight-section">
    <div class="container">
      <!-- Section Title -->
      <div class="section-title-wrap">
        <span class="section-tag">Birthday Special Gift</span>
        <h2 class="section-title">✈️ 專屬生日機票禮物 • 登機證</h2>
        <p class="section-desc">
          承哲送給彥伃的 10/23 生日特別獻禮 • 台灣虎航 桃園 (TPE) ⇄ 關西 (KIX) 浪漫起飛
        </p>
      </div>

      <!-- Gift Highlight Card -->
      <div class="gift-banner glass-card">
        <div class="gift-seal">
          <span class="seal-icon">🎁</span>
        </div>
        <div class="gift-content">
          <div class="gift-badge-row">
            <span class="badge badge-maple">承哲專屬心意</span>
            <span class="badge badge-gold">10/23 彥伃生日禮物</span>
            <span class="badge badge-blush">兩人浪漫同行</span>
          </div>
          <h3 class="gift-title font-serif">
            「親愛的彥伃，這趟旅行的來回機票是送給妳的生日禮物！」
          </h3>
          <p class="gift-text">
            承哲特別贊助彥伃的台灣虎航來回機票作為 10/23 專屬生日禮物（去程 28A/B、回程 28E/F 舒適座位含 20kg 托運），兩人一同展開 6 天 5 夜浪漫甜蜜的關西秋日之旅！
          </p>
          <div class="gift-footer-action">
            <div class="family-avatars">
              <span class="avatar-tag active-avatar">👸 彥伃 (壽星公主 💖)</span>
              <span class="avatar-tag active-avatar">🤴 承哲 (專屬領隊 / 贊助機票 ✈️)</span>
            </div>
            <a href="#birthday-card" class="btn-gift-to-card">
              <span>💌 閱讀承哲手寫生日卡片</span>
              <span class="btn-arrow">➔</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Direction Tabs -->
      <div class="flight-tabs">
        <button
          v-for="flight in flightDetails"
          :key="flight.direction"
          class="flight-tab-btn"
          :class="{ active: activeDirection === flight.direction }"
          @click="activeDirection = flight.direction"
        >
          <span class="tab-plane">{{ flight.direction === '去程' ? '🛫' : '🛬' }}</span>
          <span>{{ flight.direction }} • {{ flight.flightNo }}</span>
          <span class="tab-route">{{ flight.direction === '去程' ? 'TPE ➔ KIX' : 'KIX ➔ TPE' }}</span>
        </button>
      </div>

      <!-- Boarding Pass Card -->
      <div class="boarding-pass-wrapper">
        <div
          v-for="flight in currentFlights"
          :key="flight.direction"
          class="boarding-pass"
        >
          <!-- Left Main Body -->
          <div class="pass-main">
            <!-- Header -->
            <div class="pass-header">
              <div class="airline-brand">
                <span class="tiger-stripes">🐯</span>
                <div>
                  <h4 class="airline-name">{{ flight.airline }}</h4>
                  <span class="flight-type">BOARDING PASS • 登機證 ({{ flight.direction }})</span>
                </div>
              </div>
              <div class="pass-status">
                <span class="status-indicator"></span>
                <span>{{ flight.statusBadge }}</span>
              </div>
            </div>

            <!-- Route Route Display -->
            <div class="pass-route">
              <div class="route-city">
                <div class="city-code font-display">{{ flight.direction === '去程' ? 'TPE' : 'KIX' }}</div>
                <div class="city-name">{{ flight.direction === '去程' ? '台北 / 桃園' : '大阪 / 關西' }}</div>
                <div class="airport-name">{{ flight.fromAirport }}</div>
                <div class="time-large font-display">{{ flight.departureTime }}</div>
                <div class="date-tag">{{ flight.departureDate }}</div>
              </div>

              <div class="route-middle">
                <div class="flight-duration">{{ flight.duration }}</div>
                <div class="flight-track">
                  <span class="track-line"></span>
                  <span class="plane-icon-mid">✈️</span>
                  <span class="track-line"></span>
                </div>
                <div class="flight-number-tag font-display">{{ flight.flightNo }}</div>
              </div>

              <div class="route-city text-right">
                <div class="city-code font-display">{{ flight.direction === '去程' ? 'KIX' : 'TPE' }}</div>
                <div class="city-name">{{ flight.direction === '去程' ? '大阪 / 關西' : '台北 / 桃園' }}</div>
                <div class="airport-name">{{ flight.toAirport }}</div>
                <div class="time-large font-display">{{ flight.arrivalTime }}</div>
                <div class="date-tag">{{ flight.arrivalDate }}</div>
              </div>
            </div>

            <!-- Details Grid -->
            <div class="pass-info-grid">
              <div class="info-cell">
                <div class="info-label">PASSENGER / 乘客姓名</div>
                <div class="info-value font-display text-maple">YEN-YU / 彥伃 (壽星)</div>
                <div class="info-sub">同行乘客：CHENG-JHE / 承哲</div>
              </div>
              <div class="info-cell">
                <div class="info-label">SEAT / 指定座位</div>
                <div class="info-value font-display text-gold">{{ flight.seats }}</div>
                <div class="info-sub">舒適連座 / 靠窗風景</div>
              </div>
              <div class="info-cell">
                <div class="info-label">BAGGAGE / 行李重量</div>
                <div class="info-value">{{ flight.baggage }}</div>
                <div class="info-sub">20kg 托運已確認含入</div>
              </div>
              <div class="info-cell">
                <div class="info-label">TERMINAL / 航廈</div>
                <div class="info-value">{{ flight.terminal }} (第一航廈)</div>
                <div class="info-sub">起飛前 2.5 小時開櫃</div>
              </div>
            </div>
          </div>

          <!-- Perforated Tear Line -->
          <div class="pass-divider">
            <div class="cutout cutout-top"></div>
            <div class="dashed-line"></div>
            <div class="cutout cutout-bottom"></div>
          </div>

          <!-- Right Ticket Stub -->
          <div class="pass-stub">
            <div class="stub-header">
              <span class="stub-logo">✈️ 2026</span>
              <span class="stub-gift-tag">BIRTHDAY GIFT</span>
            </div>

            <div class="stub-content">
              <div class="stub-flight-no font-display">{{ flight.flightNo }}</div>
              <div class="stub-route-code">{{ flight.direction === '去程' ? 'TPE ➔ KIX' : 'KIX ➔ TPE' }}</div>

              <div class="stub-detail">
                <div class="stub-label">PASSENGER</div>
                <div class="stub-name">彥伃 & 承哲</div>
              </div>

              <div class="stub-detail">
                <div class="stub-label">DATE & TIME</div>
                <div class="stub-val">{{ flight.departureDate.split(' ')[0] }} {{ flight.departureTime }}</div>
              </div>

              <div class="stub-detail">
                <div class="stub-label">SEATS</div>
                <div class="stub-val font-display">{{ flight.seats.split(' ')[0] }}</div>
              </div>

              <!-- Barcode Mock -->
              <div class="barcode-wrap">
                <div class="barcode-lines"></div>
                <div class="barcode-number">TIGER-IRIS-1023-2026</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { flightDetails } from '../data/flights'

const activeDirection = ref<'去程' | '回程'>('去程')

const currentFlights = computed(() => {
  return flightDetails.filter(f => f.direction === activeDirection.value)
})
</script>

<style scoped>
.flight-section {
  padding: 5rem 0;
  position: relative;
}

/* Gift Banner */
.gift-banner {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem;
  margin-bottom: 2.5rem;
  border-left: 5px solid var(--primary-maple);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(254, 245, 231, 0.9));
}

@media (min-width: 768px) {
  .gift-banner {
    flex-direction: row;
    align-items: center;
    padding: 2rem 2.5rem;
  }
}

.gift-seal {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f9d423, #ff4e50);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 20px rgba(232, 93, 78, 0.35);
  flex-shrink: 0;
}

.seal-icon {
  font-size: 2.2rem;
}

.gift-badge-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 0.6rem;
}

.gift-title {
  font-size: 1.3rem;
  font-weight: 800;
  color: var(--primary-maple-dark);
  margin-bottom: 0.5rem;
}

.gift-text {
  font-size: 0.95rem;
  line-height: 1.7;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.family-avatars {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.gift-footer-action {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}

.btn-gift-to-card {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 1rem;
  background: rgba(232, 99, 128, 0.12);
  border: 1.5px solid rgba(232, 99, 128, 0.4);
  color: #c92a2a;
  border-radius: var(--radius-full);
  text-decoration: none;
  font-size: 0.85rem;
  font-weight: 700;
  transition: all 0.25s ease;
}

.btn-gift-to-card:hover {
  background: var(--accent-blush, #e86380);
  color: #ffffff;
  transform: translateY(-2px);
  box-shadow: 0 4px 14px rgba(232, 99, 128, 0.35);
}

.btn-gift-to-card .btn-arrow {
  transition: transform 0.2s ease;
}

.btn-gift-to-card:hover .btn-arrow {
  transform: translateX(3px);
}

.avatar-tag {
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.25rem 0.75rem;
  border-radius: var(--radius-full);
  background: rgba(0, 0, 0, 0.05);
  color: var(--text-secondary);
}

.active-avatar {
  background: var(--primary-maple-soft);
  color: var(--primary-maple);
  font-weight: 700;
  border: 1px solid rgba(184, 59, 50, 0.2);
}


/* Tabs */
.flight-tabs {
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.flight-tab-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-full);
  border: 1.5px solid rgba(184, 59, 50, 0.2);
  background: rgba(255, 255, 255, 0.8);
  color: var(--text-secondary);
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.25s ease;
  backdrop-filter: blur(8px);
}

.flight-tab-btn:hover {
  background: rgba(255, 255, 255, 0.95);
  color: var(--primary-maple);
}

.flight-tab-btn.active {
  background: var(--primary-maple);
  color: white;
  border-color: var(--primary-maple);
  box-shadow: 0 6px 18px rgba(184, 59, 50, 0.35);
}

.tab-route {
  font-size: 0.8rem;
  opacity: 0.85;
  background: rgba(0, 0, 0, 0.15);
  padding: 0.15rem 0.5rem;
  border-radius: var(--radius-full);
}

/* Boarding Pass Layout */
.boarding-pass-wrapper {
  max-width: 980px;
  margin: 0 auto;
}

.boarding-pass {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 16px 40px rgba(35, 20, 15, 0.12);
  overflow: hidden;
  border: 1px solid rgba(0, 0, 0, 0.06);
  position: relative;
}

@media (min-width: 860px) {
  .boarding-pass {
    flex-direction: row;
  }
}

.pass-main {
  flex: 1;
  padding: 2rem;
  background: #ffffff;
}

.pass-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 1.5rem;
  border-bottom: 1px dashed rgba(0, 0, 0, 0.12);
  margin-bottom: 1.75rem;
}

.airline-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.tiger-stripes {
  font-size: 2rem;
}

.airline-name {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--kyoto-indigo);
}

.flight-type {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--accent-ginkgo-dark);
}

.pass-status {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: #2e7d32;
  background: #e8f5e9;
  padding: 0.3rem 0.75rem;
  border-radius: var(--radius-full);
}

.status-indicator {
  width: 8px;
  height: 8px;
  background: #2e7d32;
  border-radius: 50%;
}

/* Route */
.pass-route {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.route-city {
  flex: 1;
  min-width: 0;
  word-break: break-word;
}

.text-right {
  text-align: right;
}

.city-code {
  font-size: 2.4rem;
  font-weight: 900;
  color: var(--primary-maple);
  line-height: 1;
}

.city-name {
  font-size: 1rem;
  font-weight: 700;
  color: var(--kyoto-indigo);
  margin-top: 0.2rem;
  word-break: break-word;
}

.airport-name {
  font-size: 0.75rem;
  color: var(--text-muted);
  word-break: break-word;
  line-height: 1.35;
}

.time-large {
  font-size: 1.6rem;
  font-weight: 800;
  color: var(--text-main);
  margin-top: 0.4rem;
}

.date-tag {
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--accent-ginkgo-dark);
  word-break: break-word;
}

.route-middle {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0 0.85rem;
  flex-shrink: 0;
}

.flight-duration {
  font-size: 0.8rem;
  color: var(--text-muted);
  margin-bottom: 0.35rem;
  white-space: nowrap;
}

.flight-track {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  width: 100%;
}

.track-line {
  width: 36px;
  height: 2px;
  background: #d4a59a;
  border-radius: 1px;
}

.plane-icon-mid {
  font-size: 1.15rem;
  line-height: 1;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.flight-number-tag {
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--primary-maple-dark);
  margin-top: 0.45rem;
  white-space: nowrap;
}

/* Info Grid */
.pass-info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.25rem;
  background: #faf8f5;
  padding: 1.25rem;
  border-radius: var(--radius-md);
}

@media (min-width: 640px) {
  .pass-info-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

.info-cell {
  min-width: 0;
  word-break: break-word;
}

.info-label {
  font-size: 0.7rem;
  font-weight: 700;
  color: var(--text-muted);
  letter-spacing: 0.05em;
  margin-bottom: 0.2rem;
}

.info-value {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-main);
  word-break: break-word;
}

.text-maple {
  color: var(--primary-maple);
}

.text-gold {
  color: var(--accent-ginkgo-dark);
}

.info-sub {
  font-size: 0.72rem;
  color: var(--text-secondary);
  margin-top: 0.15rem;
  word-break: break-word;
}

/* Perforation */
.pass-divider {
  position: relative;
  width: 28px;
  display: none;
  align-items: center;
  justify-content: center;
}

@media (min-width: 860px) {
  .pass-divider {
    display: flex;
  }
}

.cutout {
  position: absolute;
  width: 28px;
  height: 28px;
  background: var(--bg-washi);
  border-radius: 50%;
  z-index: 2;
}

.cutout-top {
  top: -14px;
}

.cutout-bottom {
  bottom: -14px;
}

.dashed-line {
  height: 100%;
  border-left: 2px dashed #d8cfc4;
}

/* Stub */
.pass-stub {
  width: 100%;
  background: linear-gradient(180deg, #fbf7f0, #f5ece0);
  padding: 2rem 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-top: 1px dashed rgba(0, 0, 0, 0.1);
}

@media (min-width: 860px) {
  .pass-stub {
    width: 260px;
    border-top: none;
  }
}

.stub-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.25rem;
}

.stub-logo {
  font-weight: 800;
  font-size: 0.95rem;
  color: var(--primary-maple);
}

.stub-gift-tag {
  font-size: 0.65rem;
  font-weight: 800;
  background: var(--accent-blush);
  color: white;
  padding: 0.15rem 0.5rem;
  border-radius: var(--radius-full);
}

.stub-flight-no {
  font-size: 1.4rem;
  font-weight: 900;
  color: var(--kyoto-indigo);
}

.stub-route-code {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--primary-maple);
  margin-bottom: 1rem;
}

.stub-detail {
  margin-bottom: 0.75rem;
}

.stub-label {
  font-size: 0.65rem;
  font-weight: 700;
  color: var(--text-muted);
}

.stub-name {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-main);
}

.stub-val {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--text-secondary);
}

/* Barcode */
.barcode-wrap {
  margin-top: 1.25rem;
  text-align: center;
}

.barcode-lines {
  height: 36px;
  background: repeating-linear-gradient(
    90deg,
    #222 0px,
    #222 2px,
    transparent 2px,
    transparent 4px,
    #222 4px,
    #222 7px,
    transparent 7px,
    transparent 8px,
    #222 8px,
    #222 11px,
    transparent 11px,
    transparent 13px
  );
  border-radius: 4px;
}

.barcode-number {
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  margin-top: 0.3rem;
  font-family: monospace;
}

/* Mobile Friendly Optimization */
@media (max-width: 640px) {
  .flight-section {
    padding: 3.5rem 0;
  }
  .gift-banner {
    padding: 1.25rem 1rem;
    gap: 1rem;
  }
  .gift-seal {
    width: 52px;
    height: 52px;
  }
  .gift-title {
    font-size: 1.15rem;
  }
  .gift-text {
    font-size: 0.88rem;
  }
  .family-avatars {
    flex-direction: column;
    align-items: flex-start;
  }
  .flight-tabs {
    flex-direction: column;
    gap: 0.5rem;
  }
  .flight-tab-btn {
    width: 100%;
    justify-content: center;
    padding: 0.65rem 1rem;
  }
  .pass-main {
    padding: 1.25rem 0.85rem;
  }
  .pass-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.75rem;
  }
  .pass-route {
    margin-bottom: 1.25rem;
  }
  .city-code {
    font-size: 1.65rem;
  }
  .city-name {
    font-size: 0.88rem;
  }
  .airport-name {
    font-size: 0.7rem;
    line-height: 1.3;
  }
  .time-large {
    font-size: 1.25rem;
  }
  .date-tag {
    font-size: 0.72rem;
  }
  .route-middle {
    padding: 0 0.25rem;
    flex-shrink: 0;
  }
  .track-line {
    width: 20px;
  }
  .plane-icon-mid {
    font-size: 0.95rem;
  }
  .flight-number-tag {
    font-size: 0.82rem;
    margin-top: 0.35rem;
  }
  .flight-duration {
    font-size: 0.7rem;
    margin-bottom: 0.25rem;
  }
  .pass-info-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.85rem;
    padding: 0.9rem;
  }
  .info-cell:first-child {
    grid-column: 1 / -1;
  }
  .info-value {
    font-size: 0.9rem;
  }
  .pass-stub {
    padding: 1.25rem 1rem;
  }
}

@media (max-width: 420px) {
  .track-line {
    width: 12px;
  }
  .city-code {
    font-size: 1.4rem;
  }
  .pass-info-grid {
    grid-template-columns: 1fr;
  }
  .info-cell:first-child {
    grid-column: auto;
  }
}
</style>
