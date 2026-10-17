<template>
  <section id="itinerary" class="itinerary-section">
    <div class="container">
      <!-- Section Header -->
      <div class="section-title-wrap">
        <span class="section-tag">6 Days Itinerary</span>
        <h2 class="section-title">📅 每日精華行程表</h2>
        <p class="section-desc">
          2026/10/08 ～ 10/13 關西 6 天 5 夜實際旅遊足跡 • 心齋橋、宇治平等院、天橋立伊根舟屋、琵琶湖、環球影城 USJ 與梅田
        </p>
      </div>

      <!-- Day Navigation Tabs -->
      <div class="days-nav-wrapper">
        <div class="days-nav">
          <button
            v-for="day in itineraryData"
            :key="day.dayNumber"
            class="day-tab-btn"
            :class="{ active: activeDayNumber === day.dayNumber }"
            @click="activeDayNumber = day.dayNumber"
          >
            <div class="tab-day-label font-display">Day 0{{ day.dayNumber }}</div>
            <div class="tab-date">{{ day.dateStr.slice(5) }} {{ day.weekday.slice(0, 2) }}</div>
            <div class="tab-sub-title">{{ getDayShortTitle(day) }}</div>
          </button>
        </div>
      </div>

      <!-- Active Day Detail Container -->
      <div v-if="currentDay" class="day-content-card glass-card">
        <!-- Day Banner Info -->
        <div class="day-hero-header">
          <div class="day-hero-top">
            <div class="day-badge-wrap">
              <span class="badge badge-maple font-display">Day 0{{ currentDay.dayNumber }}</span>
              <span class="day-full-date font-display">{{ currentDay.dateStr }} {{ currentDay.weekday }}</span>
            </div>
            <div class="day-weather-badge">
              <span>{{ currentDay.weatherSummary }}</span>
            </div>
          </div>

          <h3 class="day-main-title font-serif">{{ currentDay.title }}</h3>
          <p class="day-subtitle">{{ currentDay.subtitle }}</p>

          <!-- Day Transport & Tags Bar -->
          <div class="day-meta-bar">
            <div class="meta-item">
              <span class="meta-icon">🎫</span>
              <span class="meta-label">建議交通票券：</span>
              <span class="meta-val">{{ currentDay.transportPass }}</span>
            </div>

            <div class="meta-tags-list">
              <span v-for="tag in currentDay.tags" :key="tag" class="itinerary-tag">
                #{{ tag }}
              </span>
            </div>
          </div>

          <!-- Deluxe Google Photos Album Showcase Banner -->
          <div v-if="currentDay.albumUrl" class="day-album-showcase">
            <div class="album-showcase-left">
              <div class="album-icon-badge">
                <svg viewBox="0 0 24 24" width="30" height="30" class="gp-logo-svg">
                  <path fill="#EA4335" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                </svg>
              </div>
              <div class="album-text-content">
                <div class="album-eyebrow font-display">
                  <span>GOOGLE PHOTOS</span>
                  <span class="album-live-dot"></span>
                  <span class="album-date-tag">{{ currentDay.dateStr.slice(5) }} {{ currentDay.weekday }} 雲端原檔相簿</span>
                </div>
                <div class="album-headline font-serif">{{ currentDay.title }} • 高畫質相簿</div>
                <div class="album-subline">點擊開啟專屬相簿，即時瀏覽這一天我和妳留下的珍貴足跡原圖！</div>
              </div>
            </div>
            <a
              :href="currentDay.albumUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="album-cta-btn"
            >
              <span class="cta-icon">✨</span>
              <span class="cta-text font-serif">立即開啟相簿 ({{ currentDay.dateStr.slice(5) }})</span>
              <span class="cta-arrow">↗</span>
            </a>
          </div>

          <!-- Day 5 Dual Plan Selector (If Day 5) -->
          <div v-if="currentDay.hasAlternative" class="plan-toggle-box">
            <div class="toggle-header">
              <span class="toggle-icon">🔀</span>
              <span class="toggle-title font-serif">Day 05 行程雙方案選擇（點擊自由切換）</span>
            </div>
            <div class="plan-toggle-buttons">
              <button
                class="plan-btn"
                :class="{ active: activePlanVariant === 'A' }"
                @click="activePlanVariant = 'A'"
              >
                <span class="plan-btn-icon">🎢</span>
                <div class="plan-btn-text">
                  <div class="plan-title">方案 A：環球影城 USJ 奇幻冒險</div>
                  <div class="plan-desc">瑪利歐世界、芙莉蓮光影展、萬聖節殭屍舞、哈利波特</div>
                </div>
              </button>

              <button
                class="plan-btn"
                :class="{ active: activePlanVariant === 'B' }"
                @click="activePlanVariant = 'B'"
              >
                <span class="plan-btn-icon">🔴</span>
                <div class="plan-btn-text">
                  <div class="plan-title">方案 B：勝運勝尾寺 & 萬博太陽之塔</div>
                  <div class="plan-desc">滿山勝運達摩、岡本太郎太陽之塔、EXPOCITY 主婦採購</div>
                </div>
              </button>
            </div>
          </div>
        </div>

        <!-- Timeline Items List -->
        <div class="timeline-container">
          <div
            v-for="(item, index) in currentTimelineItems"
            :key="item.id"
            class="timeline-item"
          >
            <!-- Timeline Time Column -->
            <div class="timeline-time-col">
              <div class="time-badge font-display">{{ item.time }}</div>
              <div class="timeline-node">
                <span class="node-icon">{{ getItemIcon(item) }}</span>
              </div>
              <div v-if="index < currentTimelineItems.length - 1" class="timeline-line"></div>
            </div>

            <!-- Timeline Content Card -->
            <div class="timeline-card glass-card">
              <div class="card-head">
                <h4 class="card-title">{{ item.title }}</h4>
              </div>

              <p v-if="item.description" class="card-desc">{{ item.description }}</p>
            </div>
          </div>
        </div>

        <!-- Day Summary Bar -->
        <div class="day-footer-summary">
          <div class="summary-actions">
            <button
              v-if="activeDayNumber > 1"
              class="btn btn-outline btn-sm"
              @click="activeDayNumber--"
            >
              ← 前一天 (Day 0{{ activeDayNumber - 1 }})
            </button>
            <button
              v-if="activeDayNumber < 6"
              class="btn btn-primary btn-sm"
              @click="activeDayNumber++"
            >
              下一天 (Day 0{{ activeDayNumber + 1 }}) →
            </button>
            <a
              href="#birthday-card"
              class="btn btn-outline-blush-sm summary-card-btn"
            >
              <span>💌 閱讀 10/23 生日卡片</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { itineraryData } from '../data/itinerary'

const activeDayNumber = ref(1)
const activePlanVariant = ref<'A' | 'B'>('A')

function handleSelectDayEvent(e: any) {
  if (e.detail && typeof e.detail === 'number') {
    activeDayNumber.value = e.detail
  }
}

onMounted(() => {
  window.addEventListener('select-day', handleSelectDayEvent)
})

onUnmounted(() => {
  window.removeEventListener('select-day', handleSelectDayEvent)
})

const currentDay = computed(() => {
  return itineraryData.find(d => d.dayNumber === activeDayNumber.value) || itineraryData[0]
})

const currentTimelineItems = computed(() => {
  if (!currentDay.value) return []
  if (currentDay.value.hasAlternative && activePlanVariant.value === 'B' && currentDay.value.itemsPlanB) {
    return currentDay.value.itemsPlanB
  }
  return currentDay.value.itemsPlanA
})

function getDayShortTitle(day: any): string {
  switch (day.dayNumber) {
    case 1: return '心齋橋商圈漫步'
    case 2: return '沉浸任天堂博物館'
    case 3: return '天橋立與伊根舟屋'
    case 4: return '琵琶湖與童話草屋'
    case 5: return '奇幻冒險全日遊'
    case 6: return '南海特急直達返台'
    default: {
      const parts = day.title.split(/[・•]/)
      return parts[1]?.trim() || day.title
    }
  }
}


function getItemIcon(item: any): string {
  if (!item) return '📍'

  // If item has title with an emoji at the beginning, extract it
  const title = item.title?.trim() || ''
  const emojiMatch = title.match(/^(\p{Extended_Pictographic}+|[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}])/u)
  if (emojiMatch) {
    return emojiMatch[0]
  }

  // Fallback to item.icon if provided as Lucide-like name
  switch (item.icon) {
    case 'PlaneLanding': return '🛬'
    case 'PlaneTakeoff': return '🛫'
    case 'Plane': return '✈️'
    case 'Train': return '🚆'
    case 'Bus': return '🚌'
    case 'Ship': return '🚢'
    case 'Hotel': return '🏨'
    case 'Utensils': return '🍱'
    case 'Coffee': return '☕'
    case 'ShoppingBag': return '🛍️'
    case 'Landmark': return '⛩️'
    case 'Gamepad2': return '🎮'
    case 'Castle': return '🏰'
    case 'Wand': return '🪄'
    case 'Ghost': return '👻'
    case 'Biohazard': return '🧟'
    case 'Home': return '🏡'
    default: {
      switch (item.category) {
        case 'flight': return '✈️'
        case 'transport': return '🚆'
        case 'food': return '🍲'
        case 'shopping': return '🛍️'
        case 'attraction': return '⛩️'
        case 'hotel': return '🏨'
        case 'activity': return '🎮'
        default: return '📍'
      }
    }
  }
}
</script>

<style scoped>
.itinerary-section {
  padding: 5rem 0;
  position: relative;
}

/* Day Tabs */
.days-nav-wrapper {
  overflow: visible;
  padding: 0.5rem 0 1.25rem;
  margin-bottom: 1.5rem;
}

.days-nav {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.65rem;
  width: 100%;
  margin: 0 auto;
  padding: 4px;
}

@media (min-width: 960px) {
  .days-nav {
    grid-template-columns: repeat(6, 1fr);
    gap: 0.85rem;
    max-width: 1020px;
  }
}

.day-tab-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.8rem 0.4rem;
  border-radius: var(--radius-lg);
  border: 1.5px solid rgba(184, 59, 50, 0.15);
  background: rgba(255, 255, 255, 0.9);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
  width: 100%;
  min-width: 0;
  backdrop-filter: blur(8px);
}

@media (min-width: 960px) {
  .day-tab-btn {
    padding: 1.1rem 0.9rem;
  }
}

.day-tab-btn:hover {
  background: rgba(255, 255, 255, 0.98);
  border-color: var(--primary-maple);
  transform: translateY(-2px);
}

.day-tab-btn.active {
  background: linear-gradient(135deg, var(--primary-maple), var(--primary-maple-dark));
  color: white;
  border-color: var(--primary-maple);
  box-shadow: 0 10px 24px rgba(184, 59, 50, 0.38);
  transform: translateY(-3px);
}

.tab-day-label {
  font-size: 1rem;
  font-weight: 900;
  line-height: 1.2;
}

@media (min-width: 960px) {
  .tab-day-label {
    font-size: 1.15rem;
  }
}

.tab-date {
  font-size: 0.72rem;
  font-weight: 600;
  opacity: 0.88;
  margin: 0.25rem 0;
}

@media (min-width: 960px) {
  .tab-date {
    font-size: 0.78rem;
    margin: 0.3rem 0;
  }
}

.tab-sub-title {
  font-size: 0.72rem;
  font-weight: 600;
  line-height: 1.25;
  text-align: center;
  padding-bottom: 2px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (min-width: 960px) {
  .tab-sub-title {
    font-size: 0.82rem;
    white-space: nowrap;
    display: block;
    line-height: 1.4;
  }
}

@media (max-width: 360px) {
  .days-nav {
    gap: 0.45rem;
  }
  .day-tab-btn {
    padding: 0.65rem 0.2rem;
  }
  .tab-day-label {
    font-size: 0.9rem;
  }
  .tab-date {
    font-size: 0.68rem;
  }
  .tab-sub-title {
    font-size: 0.68rem;
  }
}

/* Day Content Card */
.day-content-card {
  background: rgba(255, 255, 255, 0.94);
  border-radius: var(--radius-xl);
  padding: 2.25rem 1.5rem;
  border: 1px solid rgba(184, 59, 50, 0.15);
  box-shadow: var(--shadow-lg);
}

@media (min-width: 768px) {
  .day-content-card {
    padding: 3rem 2.5rem;
  }
}

.day-hero-header {
  border-bottom: 2px dashed rgba(184, 59, 50, 0.15);
  padding-bottom: 2rem;
  margin-bottom: 2.5rem;
}

.day-hero-top {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 1rem;
}

.day-badge-wrap {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.day-full-date {
  font-size: 1rem;
  font-weight: 800;
  color: var(--kyoto-indigo);
}

.day-weather-badge {
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--text-secondary);
  background: var(--bg-washi-warm);
  padding: 0.35rem 0.85rem;
  border-radius: var(--radius-full);
  border: 1px solid rgba(0, 0, 0, 0.05);
}

.day-main-title {
  font-size: 1.8rem;
  font-weight: 900;
  color: var(--primary-maple-dark);
  margin-bottom: 0.4rem;
}

@media (min-width: 768px) {
  .day-main-title {
    font-size: 2.2rem;
  }
}

.day-subtitle {
  font-size: 1rem;
  color: var(--text-secondary);
  margin-bottom: 1.25rem;
}

.day-meta-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  background: #faf7f2;
  padding: 0.85rem 1.25rem;
  border-radius: var(--radius-md);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.9rem;
}

.meta-icon {
  font-size: 1.1rem;
}

.meta-label {
  font-weight: 700;
  color: var(--kyoto-indigo);
}

.meta-val {
  font-weight: 600;
  color: var(--primary-maple);
}

.meta-album-link {
  text-decoration: none;
  background: rgba(184, 59, 50, 0.08);
  padding: 0.35rem 0.85rem;
  border-radius: var(--radius-full);
  border: 1px solid rgba(184, 59, 50, 0.2);
  transition: all 0.2s ease;
}

.meta-album-link:hover {
  background: var(--primary-maple);
  border-color: var(--primary-maple);
  transform: translateY(-1px);
}

.meta-album-link:hover .meta-label,
.meta-album-link:hover .highlight-link {
  color: #ffffff;
}

.highlight-link {
  color: var(--primary-maple);
  font-weight: 700;
  transition: color 0.2s ease;
}

.meta-tags-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.itinerary-tag {
  font-size: 0.78rem;
  font-weight: 600;
  background: rgba(229, 169, 60, 0.15);
  color: var(--accent-ginkgo-dark);
  padding: 0.2rem 0.55rem;
  border-radius: var(--radius-full);
}

/* Day 5 Plan Toggle */
.plan-toggle-box {
  margin-top: 1.75rem;
  background: linear-gradient(135deg, #fef5e7, #fff8f0);
  border: 1.5px solid rgba(229, 169, 60, 0.4);
  border-radius: var(--radius-lg);
  padding: 1.25rem;
}

.toggle-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.toggle-icon {
  font-size: 1.2rem;
}

.toggle-title {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--kyoto-indigo);
}

.plan-toggle-buttons {
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.85rem;
}

@media (min-width: 680px) {
  .plan-toggle-buttons {
    grid-template-columns: 1fr 1fr;
  }
}

.plan-btn {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  padding: 1rem;
  border-radius: var(--radius-md);
  border: 1.5px solid rgba(229, 169, 60, 0.3);
  background: white;
  text-align: left;
  cursor: pointer;
  transition: all 0.25s ease;
}

.plan-btn:hover {
  border-color: var(--primary-maple);
  transform: translateY(-2px);
}

.plan-btn.active {
  background: linear-gradient(135deg, #fff3e0, #ffecb3);
  border-color: var(--accent-ginkgo-dark);
  box-shadow: 0 4px 14px rgba(229, 169, 60, 0.3);
}

.plan-btn-icon {
  font-size: 2rem;
}

.plan-title {
  font-size: 0.95rem;
  font-weight: 800;
  color: var(--kyoto-indigo);
  margin-bottom: 0.2rem;
}

.plan-desc {
  font-size: 0.8rem;
  color: var(--text-secondary);
  line-height: 1.4;
}

/* Timeline */
.timeline-container {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.timeline-item {
  display: flex;
  gap: 1rem;
  position: relative;
}

@media (min-width: 640px) {
  .timeline-item {
    gap: 1.75rem;
  }
}

.timeline-time-col {
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 70px;
  position: relative;
}

@media (min-width: 640px) {
  .timeline-time-col {
    min-width: 85px;
  }
}

.time-badge {
  font-size: 1.05rem;
  font-weight: 800;
  color: var(--primary-maple);
  background: var(--primary-maple-soft);
  padding: 0.25rem 0.6rem;
  border-radius: var(--radius-full);
  margin-bottom: 0.5rem;
  border: 1px solid rgba(184, 59, 50, 0.15);
}

.timeline-node {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: white;
  border: 2px solid var(--primary-maple);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 10px rgba(184, 59, 50, 0.2);
  z-index: 2;
}

.node-icon {
  font-size: 1.2rem;
}

.timeline-line {
  position: absolute;
  top: 75px;
  bottom: -25px;
  width: 2px;
  background: repeating-linear-gradient(
    180deg,
    #d4a59a 0px,
    #d4a59a 4px,
    transparent 4px,
    transparent 8px
  );
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}

/* Timeline Card */
.timeline-card {
  flex: 1;
  padding: 1.35rem 1.5rem;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.07);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-sm);
  transition: all 0.25s ease;
}

.timeline-card:hover {
  box-shadow: var(--shadow-md);
  border-color: rgba(184, 59, 50, 0.2);
}

.card-head {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.card-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--kyoto-indigo);
  line-height: 1.35;
}

.cost-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--accent-ginkgo-dark);
  background: var(--accent-ginkgo-light);
  padding: 0.2rem 0.6rem;
  border-radius: var(--radius-full);
  border: 1px solid rgba(229, 169, 60, 0.3);
}

.card-desc {
  font-size: 0.92rem;
  line-height: 1.65;
  color: var(--text-secondary);
  margin-bottom: 0.75rem;
}

/* Detail Boxes */
.detail-box {
  display: flex;
  align-items: flex-start;
  gap: 0.6rem;
  font-size: 0.85rem;
  padding: 0.6rem 0.85rem;
  border-radius: var(--radius-sm);
  margin-top: 0.5rem;
  line-height: 1.5;
}

.box-icon {
  font-size: 1rem;
  flex-shrink: 0;
  margin-top: 1px;
}

.transit-box {
  background: #f0f4f8;
  color: #2c4a6f;
  border-left: 3px solid #3b82f6;
}

.must-try-box {
  background: #fef7ee;
  color: #8c5310;
  border-left: 3px solid #f59e0b;
}

.elder-tips-box {
  background: #f1f8f3;
  color: #235937;
  border-left: 3px solid #10b981;
}

/* Summary Bar */
.day-footer-summary {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px dashed rgba(0, 0, 0, 0.1);
}

.summary-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
}

.btn-outline-blush-sm {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.5rem 0.95rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: #c92a2a;
  background: rgba(232, 99, 128, 0.1);
  border: 1.5px solid rgba(232, 99, 128, 0.4);
  border-radius: var(--radius-full);
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-outline-blush-sm:hover {
  background: var(--accent-blush, #e86380);
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(232, 99, 128, 0.3);
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
}

/* Mobile Friendly Optimization */
@media (max-width: 640px) {
  .itinerary-section {
    padding: 3.5rem 0;
  }
  .day-content-card {
    padding: 1.25rem 0.75rem;
    border-radius: 18px;
  }
  .day-hero-header {
    margin-bottom: 1.5rem;
  }
  .day-main-title {
    font-size: 1.45rem;
  }
  .day-subtitle {
    font-size: 0.88rem;
  }
  .day-meta-bar {
    flex-direction: column;
    align-items: flex-start;
    padding: 0.75rem 1rem;
    gap: 0.65rem;
  }
  .timeline-container {
    gap: 1rem;
  }
  .timeline-item {
    gap: 0.5rem;
  }
  .timeline-time-col {
    min-width: 58px;
  }
  .time-badge {
    font-size: 0.74rem;
    padding: 0.2rem 0.35rem;
    letter-spacing: -0.02em;
    white-space: normal;
    text-align: center;
    line-height: 1.2;
  }
  .timeline-node {
    width: 32px;
    height: 32px;
  }
  .node-icon {
    font-size: 0.95rem;
  }
  .timeline-line {
    top: 65px;
  }
  .timeline-card {
    padding: 0.95rem 0.85rem;
    border-radius: 14px;
  }
  .card-title {
    font-size: 0.98rem;
  }
  .card-desc {
    font-size: 0.85rem;
  }
  .detail-box {
    padding: 0.6rem 0.75rem;
    font-size: 0.82rem;
  }
  .day-footer-summary {
    flex-direction: column;
    align-items: stretch;
    margin-top: 2rem;
  }
  .summary-actions {
    display: flex;
    width: 100%;
    justify-content: space-between;
  }
  .summary-actions .btn {
    flex: 1;
    text-align: center;
    justify-content: center;
  }
}

/* Deluxe Google Photos Showcase Banner */
.day-album-showcase {
  margin-top: 1.25rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(254, 248, 245, 0.98));
  border: 1.5px solid rgba(229, 169, 60, 0.35);
  border-radius: var(--radius-lg);
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.25rem;
  box-shadow: 0 8px 24px rgba(184, 59, 50, 0.08), 0 2px 6px rgba(0, 0, 0, 0.03);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease;
}

.day-album-showcase::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 4px;
  height: 100%;
  background: linear-gradient(180deg, var(--primary-maple), var(--accent-ginkgo));
}

.day-album-showcase:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 30px rgba(184, 59, 50, 0.15);
  border-color: rgba(184, 59, 50, 0.4);
}

.album-showcase-left {
  display: flex;
  align-items: center;
  gap: 1.15rem;
}

.album-icon-badge {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: linear-gradient(135deg, #ffffff, #fff5f2);
  border: 1.5px solid rgba(234, 67, 53, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 14px rgba(234, 67, 53, 0.15);
  flex-shrink: 0;
}

.gp-logo-svg {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
}

.album-text-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.album-eyebrow {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.76rem;
  font-weight: 800;
  color: var(--primary-maple);
  letter-spacing: 0.5px;
}

.album-live-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #27ae60;
  display: inline-block;
  box-shadow: 0 0 6px #27ae60;
}

.album-date-tag {
  color: var(--text-secondary);
  font-weight: 600;
}

.album-headline {
  font-size: 1.12rem;
  font-weight: 800;
  color: var(--kyoto-indigo);
  line-height: 1.35;
}

.album-subline {
  font-size: 0.84rem;
  color: var(--text-secondary);
}

.album-cta-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  background: linear-gradient(135deg, #b83b32, #d9534f);
  color: #ffffff !important;
  padding: 0.75rem 1.4rem;
  border-radius: var(--radius-full);
  text-decoration: none;
  font-weight: 700;
  font-size: 0.92rem;
  box-shadow: 0 6px 18px rgba(184, 59, 50, 0.3);
  transition: all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
  white-space: nowrap;
  flex-shrink: 0;
  border: 1px solid rgba(255, 255, 255, 0.25);
}

.album-cta-btn:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 24px rgba(184, 59, 50, 0.45);
  background: linear-gradient(135deg, #a02820, #c43d34);
}

.cta-arrow {
  font-size: 1.05rem;
  transition: transform 0.2s ease;
}

.album-cta-btn:hover .cta-arrow {
  transform: translate(2px, -2px);
}

@media (max-width: 768px) {
  .day-album-showcase {
    flex-direction: column;
    align-items: stretch;
    padding: 1.15rem 1rem;
    gap: 1rem;
  }

  .album-showcase-left {
    align-items: flex-start;
  }

  .album-headline {
    font-size: 1rem;
  }

  .album-subline {
    font-size: 0.8rem;
  }

  .album-cta-btn {
    width: 100%;
    justify-content: center;
    padding: 0.7rem 1.2rem;
  }
}
</style>
