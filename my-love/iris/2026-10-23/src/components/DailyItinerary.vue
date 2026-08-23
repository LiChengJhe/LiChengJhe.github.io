<template>
  <section id="itinerary" class="itinerary-section">
    <div class="container">
      <!-- Section Header -->
      <div class="section-title-wrap">
        <span class="section-tag">6 Days Itinerary</span>
        <h2 class="section-title">🍁 每日精華行程表</h2>
        <p class="section-desc">
          2026/10/08 ～ 10/13 關西秋日漫遊 • 大阪、京都、丹後伊根、琵琶湖、宇治與箕面全攻略
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
            <div class="tab-sub-title">{{ getDayShortTitle(day.title) }}</div>
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
                <span class="node-icon">{{ getCategoryIcon(item.category) }}</span>
              </div>
              <div v-if="index < currentTimelineItems.length - 1" class="timeline-line"></div>
            </div>

            <!-- Timeline Content Card -->
            <div class="timeline-card glass-card">
              <div class="card-head">
                <h4 class="card-title">{{ item.title }}</h4>
                <div v-if="item.cost" class="cost-badge">
                  <span class="cost-icon">💴</span>
                  <span>{{ item.cost }}</span>
                </div>
              </div>

              <p v-if="item.description" class="card-desc">{{ item.description }}</p>

              <!-- Transit Info -->
              <div v-if="item.transitInfo" class="detail-box transit-box">
                <span class="box-icon">🚆</span>
                <div>
                  <strong>交通動線：</strong>{{ item.transitInfo }}
                </div>
              </div>

              <!-- Must Try / Highlights -->
              <div v-if="item.mustTry" class="detail-box must-try-box">
                <span class="box-icon">🌟</span>
                <div>
                  <strong>亮點特色：</strong>{{ item.mustTry }}
                </div>
              </div>

              <!-- Elder & Family Friendly Tips -->
              <div v-if="item.elderTips" class="detail-box elder-tips-box">
                <span class="box-icon">🍵</span>
                <div>
                  <strong>長輩同行叮嚀：</strong>{{ item.elderTips }}
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Day Summary Bar -->
        <div class="day-footer-summary">
          <div class="summary-left">
            <span class="summary-icon">💡</span>
            <span>溫馨提醒：當天行程可依全家人體力與購物節奏彈性調整，輕鬆開心最重要！</span>
          </div>
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
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { itineraryData } from '../data/itinerary'

const activeDayNumber = ref(1)
const activePlanVariant = ref<'A' | 'B'>('A')

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

function getDayShortTitle(title: string): string {
  const parts = title.split('•')
  return parts[1] ? parts[1].trim().slice(0, 8) : title.slice(0, 8)
}

function getCategoryIcon(cat: string): string {
  switch (cat) {
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
</script>

<style scoped>
.itinerary-section {
  padding: 5rem 0;
  position: relative;
}

/* Day Tabs */
.days-nav-wrapper {
  overflow-x: auto;
  padding-bottom: 1rem;
  margin-bottom: 2rem;
  -webkit-overflow-scrolling: touch;
}

.days-nav {
  display: flex;
  gap: 0.85rem;
  min-width: max-content;
  justify-content: flex-start;
  margin: 0 auto;
}

@media (min-width: 900px) {
  .days-nav {
    justify-content: center;
  }
}

.day-tab-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.85rem 1.25rem;
  border-radius: var(--radius-md);
  border: 1.5px solid rgba(184, 59, 50, 0.15);
  background: rgba(255, 255, 255, 0.85);
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.25s cubic-bezier(0.2, 0.8, 0.2, 1);
  min-width: 135px;
  backdrop-filter: blur(8px);
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
  box-shadow: 0 8px 20px rgba(184, 59, 50, 0.35);
  transform: translateY(-3px);
}

.tab-day-label {
  font-size: 1.15rem;
  font-weight: 900;
  line-height: 1.2;
}

.tab-date {
  font-size: 0.78rem;
  font-weight: 600;
  opacity: 0.85;
  margin: 0.2rem 0;
}

.tab-sub-title {
  font-size: 0.75rem;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 110px;
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
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-top: 3rem;
  padding-top: 1.5rem;
  border-top: 1px dashed rgba(0, 0, 0, 0.1);
}

.summary-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.88rem;
  color: var(--text-secondary);
}

.summary-actions {
  display: flex;
  gap: 0.75rem;
}

.btn-sm {
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
}
</style>
