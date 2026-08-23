<template>
  <section id="family" class="family-section">
    <div class="container">
      <!-- Section Title -->
      <div class="section-title-wrap">
        <span class="section-tag">Family Travel Toolkit</span>
        <h2 class="section-title">🧳 家族旅行錦囊 & 行李清單</h2>
        <p class="section-desc">
          李領隊貼心準備 • 6 人行李準備清單、即時日幣匯率換算與長輩同遊貼心叮嚀
        </p>
      </div>

      <!-- Grid for Packing List & Currency Converter -->
      <div class="toolkit-grid">
        <!-- Left: Interactive Packing List -->
        <div class="toolkit-card glass-card">
          <div class="card-header-row">
            <div>
              <div class="header-badge">
                <span class="badge badge-maple">行前整備</span>
              </div>
              <h3 class="toolkit-card-title font-serif">🧳 行李與隨身物品清單</h3>
            </div>
            <div class="progress-info">
              <span class="progress-percent font-display">{{ completedPercentage }}%</span>
              <span class="progress-text">({{ completedCount }}/{{ totalCount }})</span>
            </div>
          </div>

          <!-- Progress Bar -->
          <div class="progress-bar-wrap">
            <div class="progress-bar-fill" :style="{ width: completedPercentage + '%' }"></div>
          </div>

          <!-- Category Filter Tabs -->
          <div class="pack-filter-tabs">
            <button
              v-for="cat in packingCategories"
              :key="cat.key"
              class="pack-filter-btn"
              :class="{ active: activePackCategory === cat.key }"
              @click="activePackCategory = cat.key"
            >
              {{ cat.label }}
            </button>
          </div>

          <!-- Items List -->
          <div class="packing-list-items">
            <div
              v-for="item in filteredPackingItems"
              :key="item.id"
              class="pack-item"
              :class="{ 'item-checked': item.completed }"
              @click="toggleItem(item.id)"
            >
              <div class="item-checkbox">
                <span v-if="item.completed">✓</span>
              </div>
              <div class="item-details">
                <div class="item-name">{{ item.name }}</div>
                <div class="item-for-tag">{{ item.requiredFor }}</div>
              </div>
            </div>
          </div>

          <!-- Add Item Form -->
          <form @submit.prevent="addCustomItem" class="add-item-row">
            <input
              v-model="newItemName"
              type="text"
              placeholder="新增自訂行李或待辦項目..."
              class="add-item-input"
            />
            <button type="submit" class="btn btn-primary btn-sm">
              新增項目
            </button>
          </form>
        </div>

        <!-- Right: Currency Converter & Budget Helper -->
        <div class="toolkit-card glass-card">
          <div class="card-header-row">
            <div>
              <div class="header-badge">
                <span class="badge badge-gold">即時換算</span>
              </div>
              <h3 class="toolkit-card-title font-serif">💴 日幣 ⇄ 台幣 匯率計算機</h3>
            </div>
            <div class="rate-config">
              <span class="rate-label">匯率: 1 JPY =</span>
              <input
                v-model.number="exchangeRate"
                type="number"
                step="0.001"
                class="rate-input"
              />
              <span class="rate-label">TWD</span>
            </div>
          </div>

          <!-- Converter Inputs -->
          <div class="converter-box">
            <!-- JPY Input -->
            <div class="converter-field">
              <label class="conv-label">日圓 (JPY ¥)</label>
              <div class="input-with-symbol">
                <span class="symbol">¥</span>
                <input
                  v-model.number="jpyAmount"
                  @input="calcTwd"
                  type="number"
                  placeholder="輸入日圓金額"
                  class="conv-input font-display"
                />
              </div>
            </div>

            <!-- Swap Arrow -->
            <div class="converter-arrow">
              <span>⇄</span>
            </div>

            <!-- TWD Input -->
            <div class="converter-field">
              <label class="conv-label">新台幣 (TWD NT$)</label>
              <div class="input-with-symbol">
                <span class="symbol">NT$</span>
                <input
                  v-model.number="twdAmount"
                  @input="calcJpy"
                  type="number"
                  placeholder="輸入台幣金額"
                  class="conv-input font-display"
                />
              </div>
            </div>
          </div>

          <!-- Quick JPY Presets -->
          <div class="quick-presets">
            <span class="preset-label">常用金額快速填入：</span>
            <div class="preset-buttons">
              <button
                v-for="amt in [1000, 3000, 5000, 10000, 30000, 50000]"
                :key="amt"
                class="preset-btn font-display"
                @click="setJpyPreset(amt)"
              >
                ¥{{ amt.toLocaleString() }}
              </button>
            </div>
          </div>

          <!-- Budget Tips Note -->
          <div class="budget-tips-note">
            <div class="tip-line">
              <span>💡 <strong>退稅小秘訣</strong>：日本各大百貨及藥妝店消費滿 ¥5,000（未稅）即可出示護照辦理 10% 免稅。</span>
            </div>
            <div class="tip-line">
              <span>💳 <strong>支付建議</strong>：ICOCA / SUICA 交通卡可綁定 Apple Pay 隨搭隨刷，一般餐廳超商支援信用卡感應與 Paypay。</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Family Care Tips Section -->
      <div class="family-care-wrap">
        <h3 class="care-section-title font-serif">🏮 家族同行 • 暖心服務指引</h3>
        <div class="care-grid">
          <div
            v-for="(tip, index) in travelCareTips"
            :key="index"
            class="care-card glass-card"
          >
            <div class="care-header">
              <div class="care-icon-box">
                <span class="care-icon">{{ getTipIcon(tip.icon) }}</span>
              </div>
              <div>
                <h4 class="care-title font-serif">{{ tip.title }}</h4>
                <div class="care-sub">{{ tip.subtitle }}</div>
              </div>
            </div>
            <p class="care-desc">{{ tip.description }}</p>
            <div class="care-bullets">
              <div v-for="(p, pIdx) in tip.practicalTips" :key="pIdx" class="bullet-item">
                <span class="bullet-dot">•</span>
                <span>{{ p }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { defaultPackingList } from '../data/packingList'
import { travelCareTips } from '../data/gallery'
import { PackingItem } from '../types'

const packingCategories = [
  { key: 'all', label: '全部' },
  { key: 'documents', label: '證件憑證' },
  { key: 'elderCare', label: '長輩與健康' },
  { key: 'clothing', label: '衣物配件' },
  { key: 'electronics', label: '3C 配件' },
  { key: 'shopping', label: '採購備品' }
]

const activePackCategory = ref('all')
const packingItems = ref<PackingItem[]>([...defaultPackingList])
const newItemName = ref('')

// Currency Converter States
const exchangeRate = ref(0.22) // 1 JPY = 0.22 TWD
const jpyAmount = ref<number>(10000)
const twdAmount = ref<number>(2200)

onMounted(() => {
  const savedList = localStorage.getItem('iris_kansai_packing_list')
  if (savedList) {
    try {
      const parsed = JSON.parse(savedList)
      if (Array.isArray(parsed)) {
        packingItems.value = parsed
      }
    } catch {
      // Ignore
    }
  }
})

function savePackingList() {
  localStorage.setItem('iris_kansai_packing_list', JSON.stringify(packingItems.value))
}

function toggleItem(id: string) {
  const item = packingItems.value.find(i => i.id === id)
  if (item) {
    item.completed = !item.completed
    savePackingList()
  }
}

function addCustomItem() {
  if (!newItemName.value.trim()) return
  const item: PackingItem = {
    id: 'pack-' + Date.now(),
    category: activePackCategory.value === 'all' ? 'documents' : activePackCategory.value as any,
    name: newItemName.value.trim(),
    requiredFor: '全體成員',
    completed: false
  }
  packingItems.value.push(item)
  savePackingList()
  newItemName.value = ''
}

const filteredPackingItems = computed(() => {
  if (activePackCategory.value === 'all') return packingItems.value
  return packingItems.value.filter(i => i.category === activePackCategory.value)
})

const totalCount = computed(() => packingItems.value.length)
const completedCount = computed(() => packingItems.value.filter(i => i.completed).length)
const completedPercentage = computed(() => {
  if (totalCount.value === 0) return 0
  return Math.round((completedCount.value / totalCount.value) * 100)
})

// Currency Methods
function calcTwd() {
  if (jpyAmount.value === null || jpyAmount.value === undefined) {
    twdAmount.value = 0
    return
  }
  twdAmount.value = Math.round(jpyAmount.value * exchangeRate.value)
}

function calcJpy() {
  if (twdAmount.value === null || twdAmount.value === undefined || exchangeRate.value === 0) {
    jpyAmount.value = 0
    return
  }
  jpyAmount.value = Math.round(twdAmount.value / exchangeRate.value)
}

function setJpyPreset(amt: number) {
  jpyAmount.value = amt
  calcTwd()
}

function getTipIcon(icon: string): string {
  switch (icon) {
    case 'Coffee': return '☕'
    case 'Utensils': return '🍲'
    case 'Bus': return '🚌'
    case 'HeartHandshake': return '💖'
    default: return '✨'
  }
}
</script>

<style scoped>
.family-section {
  padding: 5rem 0;
  position: relative;
}

.toolkit-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  margin-bottom: 3.5rem;
}

@media (min-width: 900px) {
  .toolkit-grid {
    grid-template-columns: 1.15fr 1fr;
  }
}

.toolkit-card {
  background: #ffffff;
  border-radius: var(--radius-xl);
  padding: 2rem;
  border: 1px solid rgba(184, 59, 50, 0.12);
  box-shadow: var(--shadow-md);
  display: flex;
  flex-direction: column;
}

.card-header-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.25rem;
}

.toolkit-card-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: var(--kyoto-indigo);
  margin-top: 0.35rem;
}

.progress-info {
  display: flex;
  align-items: baseline;
  gap: 0.35rem;
}

.progress-percent {
  font-size: 1.6rem;
  font-weight: 900;
  color: var(--primary-maple);
}

.progress-text {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.progress-bar-wrap {
  width: 100%;
  height: 8px;
  background: var(--bg-washi-warm);
  border-radius: var(--radius-full);
  overflow: hidden;
  margin-bottom: 1.25rem;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--primary-maple), var(--accent-ginkgo));
  transition: width 0.3s ease;
  border-radius: var(--radius-full);
}

/* Pack Filters */
.pack-filter-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-bottom: 1rem;
}

.pack-filter-btn {
  padding: 0.25rem 0.65rem;
  border-radius: var(--radius-full);
  border: 1px solid rgba(0, 0, 0, 0.1);
  background: #fdfaf6;
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.pack-filter-btn.active {
  background: var(--primary-maple);
  color: white;
  border-color: var(--primary-maple);
}

/* Packing List */
.packing-list-items {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 380px;
  overflow-y: auto;
  padding-right: 0.4rem;
  margin-bottom: 1.25rem;
}

.pack-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.65rem 0.85rem;
  background: #faf8f5;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(0, 0, 0, 0.05);
  cursor: pointer;
  transition: all 0.2s ease;
}

.pack-item:hover {
  background: #f4ede2;
}

.item-checked {
  background: #f0fdf4;
  opacity: 0.65;
}
.item-checked .item-name {
  text-decoration: line-through;
  color: var(--text-muted);
}

.item-checkbox {
  width: 22px;
  height: 22px;
  border-radius: 6px;
  border: 2px solid var(--primary-maple);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 0.85rem;
  color: white;
  background: white;
  flex-shrink: 0;
}

.item-checked .item-checkbox {
  background: var(--primary-maple);
}

.item-details {
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  gap: 0.5rem;
}

.item-name {
  font-size: 0.88rem;
  font-weight: 600;
  color: var(--text-main);
}

.item-for-tag {
  font-size: 0.72rem;
  color: var(--accent-ginkgo-dark);
  background: var(--accent-ginkgo-light);
  padding: 0.15rem 0.45rem;
  border-radius: 4px;
  white-space: nowrap;
}

.add-item-row {
  display: flex;
  gap: 0.5rem;
  margin-top: auto;
}

.add-item-input {
  flex: 1;
  padding: 0.55rem 0.85rem;
  border-radius: var(--radius-full);
  border: 1.5px solid rgba(0, 0, 0, 0.12);
  font-size: 0.85rem;
  outline: none;
}
.add-item-input:focus {
  border-color: var(--primary-maple);
}

/* Currency Converter */
.rate-config {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.85rem;
  color: var(--text-secondary);
}

.rate-input {
  width: 60px;
  padding: 0.2rem 0.4rem;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  font-weight: bold;
  text-align: center;
  outline: none;
}

.converter-box {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
  background: #fbf9f6;
  padding: 1.25rem;
  border-radius: var(--radius-md);
  border: 1px solid rgba(0, 0, 0, 0.06);
}

@media (min-width: 600px) {
  .converter-box {
    flex-direction: row;
    align-items: center;
  }
}

.converter-field {
  flex: 1;
}

.conv-label {
  display: block;
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--text-secondary);
  margin-bottom: 0.35rem;
}

.input-with-symbol {
  display: flex;
  align-items: center;
  background: white;
  border: 1.5px solid rgba(0, 0, 0, 0.15);
  border-radius: var(--radius-md);
  padding: 0.5rem 0.85rem;
}

.symbol {
  font-size: 1rem;
  font-weight: bold;
  color: var(--primary-maple);
  margin-right: 0.5rem;
}

.conv-input {
  width: 100%;
  border: none;
  font-size: 1.4rem;
  font-weight: 800;
  color: var(--kyoto-indigo);
  outline: none;
}

.converter-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: bold;
  color: var(--accent-ginkgo-dark);
}

/* Quick Presets */
.quick-presets {
  margin-bottom: 1.5rem;
}

.preset-label {
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
}

.preset-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.preset-btn {
  padding: 0.35rem 0.75rem;
  border-radius: var(--radius-full);
  border: 1px solid rgba(229, 169, 60, 0.3);
  background: white;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--accent-ginkgo-dark);
  cursor: pointer;
  transition: all 0.2s ease;
}

.preset-btn:hover {
  background: var(--accent-ginkgo-light);
  border-color: var(--accent-ginkgo-dark);
}

/* Budget Tips Note */
.budget-tips-note {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  background: #fdf8ed;
  padding: 1rem;
  border-radius: var(--radius-md);
  border-left: 3px solid var(--accent-ginkgo);
  font-size: 0.82rem;
  line-height: 1.6;
  color: #714b0f;
  margin-top: auto;
}

/* Care Section */
.family-care-wrap {
  margin-top: 1rem;
}

.care-section-title {
  font-size: 1.7rem;
  font-weight: 800;
  color: var(--kyoto-indigo);
  margin-bottom: 1.5rem;
  text-align: center;
}

.care-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
}

@media (min-width: 768px) {
  .care-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.care-card {
  background: white;
  border-radius: var(--radius-lg);
  padding: 1.75rem;
  border: 1px solid rgba(0, 0, 0, 0.07);
  box-shadow: var(--shadow-sm);
  display: flex;
  flex-direction: column;
}

.care-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.85rem;
}

.care-icon-box {
  width: 48px;
  height: 48px;
  border-radius: 14px;
  background: var(--primary-maple-soft);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.care-icon {
  font-size: 1.4rem;
}

.care-title {
  font-size: 1.15rem;
  font-weight: 800;
  color: var(--kyoto-indigo);
}

.care-sub {
  font-size: 0.8rem;
  color: var(--primary-maple);
  font-weight: 600;
}

.care-desc {
  font-size: 0.9rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.care-bullets {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  margin-top: auto;
  background: #faf8f5;
  padding: 0.85rem 1rem;
  border-radius: var(--radius-sm);
}

.bullet-item {
  display: flex;
  align-items: flex-start;
  gap: 0.4rem;
  font-size: 0.82rem;
  color: var(--text-main);
  line-height: 1.5;
}

.bullet-dot {
  color: var(--primary-maple);
  font-weight: bold;
}
</style>
