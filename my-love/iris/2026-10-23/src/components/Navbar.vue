<template>
  <header class="navbar" :class="{ 'navbar-scrolled': isScrolled }">
    <div class="container navbar-inner">
      <a href="#" class="brand-logo" @click="closeMobileMenu">
        <span class="logo-leaf">✨</span>
        <span class="logo-text font-serif">
          Kansai Journey <span class="logo-sub">2026</span>
        </span>
      </a>

      <!-- Desktop Nav Links -->
      <nav class="nav-links">
        <a href="#birthday-card" class="nav-link special-link">
          <span class="nav-icon">💌</span>
          <span>10/23 生日卡片</span>
        </a>
        <a href="#flight" class="nav-link">
          <span class="nav-icon">✈️</span>
          <span>機票禮物</span>
        </a>
        <a href="#itinerary" class="nav-link">
          <span class="nav-icon">📅</span>
          <span>行程導覽</span>
        </a>
      </nav>

      <!-- Desktop & Mobile Right Actions -->
      <div class="nav-actions">
        <a
          href="#birthday-card"
          class="btn-surprise-mini"
          title="閱讀 10/23 專屬生日手寫信"
        >
          <span class="btn-sparkle">💌</span>
          <span>慶生卡片</span>
        </a>

        <!-- Mobile Hamburger Button -->
        <button
          class="mobile-menu-btn"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
          :aria-expanded="isMobileMenuOpen"
          aria-label="切換選單"
        >
          <span v-if="!isMobileMenuOpen" class="menu-icon">☰</span>
          <span v-else class="menu-icon">✕</span>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation Drawer Teleported to Body -->
    <Teleport to="body">
      <transition name="drawer-fade">
        <div v-if="isMobileMenuOpen" class="mobile-drawer-backdrop" @click.self="closeMobileMenu">
          <nav class="mobile-drawer glass-card">
            <div class="mobile-drawer-header">
              <div class="drawer-title-group">
                <span class="drawer-title font-serif">🌸 關西旅程 • 導覽選單</span>
                <span class="drawer-sub">10/23 彥伃生日專屬紀念</span>
              </div>
              <button class="mobile-drawer-close" @click="closeMobileMenu" aria-label="關閉選單">✕</button>
            </div>

            <div class="mobile-links-list">
              <a href="#birthday-card" @click.prevent="handleMobileLink('#birthday-card')" class="mobile-nav-link special-mobile-link">
                <span class="m-icon">💌</span>
                <div class="m-text">
                  <div class="m-title">10/23 承哲手寫生日卡片</div>
                  <div class="m-desc">給最在乎的 Iris • 藏在心底的真情告白</div>
                </div>
                <span class="m-badge">精選</span>
              </a>

              <a href="#flight" @click.prevent="handleMobileLink('#flight')" class="mobile-nav-link">
                <span class="m-icon">✈️</span>
                <div class="m-text">
                  <div class="m-title">機票驚喜與航班資訊</div>
                  <div class="m-desc">星宇航空 JX822 / JX823 舒適飛行紀錄</div>
                </div>
              </a>

              <a href="#itinerary" @click.prevent="handleMobileLink('#itinerary')" class="mobile-nav-link">
                <span class="m-icon">📅</span>
                <div class="m-text">
                  <div class="m-title">每日精華行程導覽</div>
                  <div class="m-desc">關西 6 天 5 夜自由行完整足跡與攻略</div>
                </div>
              </a>

              <a
                href="https://photos.app.goo.gl/ndwb8ckgNhVuNw7j9"
                target="_blank"
                rel="noopener noreferrer"
                @click="closeMobileMenu"
                class="mobile-nav-link photos-link"
              >
                <span class="m-icon">📸</span>
                <div class="m-text">
                  <div class="m-title">Google 雲端原圖相簿</div>
                  <div class="m-desc">點擊開啟高畫質珍貴旅程照片回憶</div>
                </div>
                <span class="m-arrow">↗</span>
              </a>

              <a href="#birthday-card" @click.prevent="handleMobileLink('#birthday-card')" class="mobile-nav-link coupon-link">
                <span class="m-icon">💍</span>
                <div class="m-text">
                  <div class="m-title">專屬甜蜜約定券</div>
                  <div class="m-desc">承諾下一次兩人專屬海外浪漫之旅</div>
                </div>
              </a>
            </div>

            <!-- Quick Day Switcher in Mobile Menu -->
            <!-- Quick Day Switcher in Mobile Menu -->
            <div class="mobile-days-quickbar">
              <div class="quickbar-header">
                <span class="quickbar-title">✨ 行程天數快速直達（點擊立即切換）：</span>
              </div>
              <div class="quickbar-grid">
                <button
                  v-for="item in quickDays"
                  :key="item.day"
                  class="quick-day-card"
                  @click="handleDayJump(item.day)"
                >
                  <div class="card-top-row">
                    <span class="card-day-icon">{{ item.icon }}</span>
                    <span class="card-day-num font-display">{{ item.label }}</span>
                  </div>
                  <div class="card-day-spot">{{ item.spot }}</div>
                </button>
              </div>
            </div>

            <div class="mobile-drawer-footer">
              <span>💖 祝最親愛的彥伃 10/23 生日快樂！</span>
            </div>
          </nav>
        </div>
      </transition>
    </Teleport>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const quickDays = [
  { day: 1, label: 'Day 01', icon: '🛍️', spot: '心齋橋漫步' },
  { day: 2, label: 'Day 02', icon: '🎮', spot: '任天堂博物館' },
  { day: 3, label: 'Day 03', icon: '🌊', spot: '天橋立伊根' },
  { day: 4, label: 'Day 04', icon: '🏡', spot: '琵琶湖草屋' },
  { day: 5, label: 'Day 05', icon: '🏰', spot: '環球影城USJ' },
  { day: 6, label: 'Day 06', icon: '🛫', spot: '南海特急返台' }
]

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

function handleScroll() {
  isScrolled.value = window.scrollY > 30
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
}

function handleMobileLink(targetHash?: string) {
  closeMobileMenu()
  if (targetHash) {
    setTimeout(() => {
      const el = document.querySelector(targetHash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 150)
  }
}

function handleDayJump(day: number) {
  closeMobileMenu()
  window.dispatchEvent(new CustomEvent('select-day', { detail: day }))
  setTimeout(() => {
    const el = document.getElementById('itinerary')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, 150)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 0.85rem 0;
  transition: all 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
  background: rgba(251, 248, 243, 0.85);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-bottom: 1px solid rgba(184, 59, 50, 0.08);
}

.navbar-scrolled {
  padding: 0.55rem 0;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 4px 20px rgba(35, 20, 15, 0.08);
  border-bottom: 1px solid rgba(184, 59, 50, 0.12);
}

.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 0.45rem;
  text-decoration: none;
  color: var(--primary-maple);
  font-weight: 800;
  font-size: 1.15rem;
  flex-shrink: 0;
}

.logo-leaf {
  font-size: 1.35rem;
  filter: drop-shadow(0 2px 4px rgba(184, 59, 50, 0.3));
}

.logo-sub {
  color: var(--accent-ginkgo-dark);
  font-size: 0.9rem;
  font-weight: 600;
}

.nav-links {
  display: none;
  align-items: center;
  gap: 1.1rem;
}

@media (min-width: 992px) {
  .nav-links {
    display: flex;
  }
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  text-decoration: none;
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 600;
  padding: 0.35rem 0.65rem;
  border-radius: var(--radius-full);
  transition: all 0.2s ease;
}

.nav-link:hover {
  color: var(--primary-maple);
  background: var(--primary-maple-soft);
}

.special-link {
  color: var(--accent-blush);
  font-weight: 700;
}
.special-link:hover {
  background: var(--accent-blush-soft);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.btn-surprise-mini {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.45rem 0.9rem;
  background: linear-gradient(135deg, #e86380, #b83b32);
  color: white;
  border: none;
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(232, 99, 128, 0.35);
  transition: all 0.25s ease;
  white-space: nowrap;
}

.btn-surprise-mini:hover {
  transform: translateY(-2px) scale(1.03);
}

.btn-sparkle {
  animation: heartBeat 1.6s infinite ease-in-out;
}

/* Mobile Hamburger Button */
.mobile-menu-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  border: 1px solid rgba(184, 59, 50, 0.2);
  background: rgba(255, 255, 255, 0.9);
  color: var(--primary-maple);
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

@media (min-width: 992px) {
  .mobile-menu-btn {
    display: none;
  }
}

/* Mobile Drawer Overlay */
.mobile-drawer-backdrop {
  position: fixed;
  inset: 0;
  top: 0;
  background: rgba(18, 21, 36, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0.75rem 0.75rem 1.5rem;
}

.mobile-drawer {
  background: #fffdfa;
  border: 1.5px solid rgba(184, 59, 50, 0.2);
  border-radius: 20px;
  padding: 1.25rem 1.15rem 1.5rem;
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.25);
  max-height: 90vh;
  overflow-y: auto;
  margin-top: 3.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.mobile-drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0.75rem;
  border-bottom: 1px dashed rgba(212, 163, 115, 0.4);
}

.drawer-title-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.drawer-title {
  font-size: 1.1rem;
  font-weight: 800;
  color: var(--primary-maple);
}

.drawer-sub {
  font-size: 0.75rem;
  color: var(--text-muted);
}

.mobile-drawer-close {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.05);
  border: none;
  font-size: 1rem;
  color: var(--text-secondary);
  cursor: pointer;
  transition: all 0.2s ease;
}

.mobile-drawer-close:active {
  background: rgba(0, 0, 0, 0.1);
}

.mobile-links-list {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0.9rem;
  border-radius: 14px;
  text-decoration: none;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(212, 163, 115, 0.25);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.03);
  transition: all 0.2s ease;
}

.mobile-nav-link:active {
  transform: scale(0.98);
  background: var(--primary-maple-soft);
}

.m-icon {
  font-size: 1.35rem;
  flex-shrink: 0;
}

.m-text {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.m-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-main);
}

.m-desc {
  font-size: 0.75rem;
  color: var(--text-muted);
  line-height: 1.3;
}

.m-badge {
  font-size: 0.7rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: var(--radius-full);
  background: #ff4757;
  color: #fff;
  flex-shrink: 0;
}

.m-arrow {
  font-size: 0.9rem;
  color: var(--primary-maple);
  font-weight: 700;
}

.special-mobile-link {
  background: linear-gradient(135deg, rgba(255, 240, 245, 0.9), rgba(255, 245, 238, 0.9));
  border-color: rgba(232, 99, 128, 0.4);
}

.special-mobile-link .m-title {
  color: #c92a2a;
}

.photos-link {
  background: linear-gradient(135deg, rgba(235, 248, 255, 0.9), rgba(240, 245, 255, 0.9));
  border-color: rgba(66, 133, 244, 0.25);
}

.coupon-link {
  background: linear-gradient(135deg, rgba(255, 250, 235, 0.9), rgba(255, 245, 245, 0.9));
  border-color: rgba(229, 169, 60, 0.35);
}

/* Quickbar Chips */
.mobile-days-quickbar {
  padding: 0.85rem;
  background: linear-gradient(135deg, rgba(254, 248, 243, 0.95), rgba(255, 244, 240, 0.9));
  border-radius: 16px;
  border: 1.5px solid rgba(212, 163, 115, 0.35);
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}

.quickbar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.quickbar-title {
  font-size: 0.82rem;
  font-weight: 800;
  color: var(--primary-maple-dark);
}

.quickbar-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.55rem;
}

.quick-day-card {
  background: #ffffff;
  border: 1.5px solid rgba(184, 59, 50, 0.2);
  border-radius: 12px;
  padding: 0.65rem 0.35rem;
  min-height: 54px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
  cursor: pointer;
  box-shadow: 0 2px 8px rgba(184, 59, 50, 0.06);
  transition: all 0.2s cubic-bezier(0.2, 0.8, 0.2, 1);
  -webkit-tap-highlight-color: transparent;
}

.quick-day-card:active {
  transform: scale(0.94);
  background: linear-gradient(135deg, var(--primary-maple), var(--primary-maple-dark));
  border-color: var(--primary-maple);
  box-shadow: 0 6px 14px rgba(184, 59, 50, 0.3);
}

.card-top-row {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.card-day-icon {
  font-size: 0.95rem;
  line-height: 1;
}

.card-day-num {
  font-size: 0.85rem;
  font-weight: 900;
  color: var(--primary-maple);
  line-height: 1.2;
}

.quick-day-card:active .card-day-num {
  color: #ffffff;
}

.card-day-spot {
  font-size: 0.68rem;
  font-weight: 600;
  color: var(--text-secondary);
  line-height: 1.2;
  text-align: center;
  white-space: nowrap;
}

.quick-day-card:active .card-day-spot {
  color: rgba(255, 255, 255, 0.92);
}

.mobile-drawer-footer {
  text-align: center;
  font-size: 0.8rem;
  color: var(--accent-blush);
  font-weight: 600;
  padding-top: 0.4rem;
}

/* Drawer Transitions */
.drawer-fade-enter-active,
.drawer-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.drawer-fade-enter-from,
.drawer-fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
