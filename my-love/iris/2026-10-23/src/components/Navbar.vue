<template>
  <header class="navbar" :class="{ 'navbar-scrolled': isScrolled }">
    <div class="container navbar-inner">
      <a href="#" class="brand-logo">
        <span class="logo-leaf">🍁</span>
        <span class="logo-text font-serif">
          Maple Kansai <span class="logo-sub">2026</span>
        </span>
      </a>

      <nav class="nav-links">
        <a href="#surprise" @click.prevent="$emit('openSurprise')" class="nav-link special-link">
          <span class="nav-icon">🎂</span>
          <span>10/23 生日驚喜</span>
        </a>
        <a href="#flight" class="nav-link">
          <span class="nav-icon">✈️</span>
          <span>機票禮物</span>
        </a>
        <a href="#itinerary" class="nav-link">
          <span class="nav-icon">📅</span>
          <span>行程導覽</span>
        </a>
        <a href="#gallery" class="nav-link">
          <span class="nav-icon">📷</span>
          <span>回憶相簿</span>
        </a>
        <a href="#hotel" class="nav-link">
          <span class="nav-icon">🏨</span>
          <span>住宿資訊</span>
        </a>
      </nav>

      <div class="nav-actions">
        <button
          class="btn-surprise-mini"
          @click="$emit('openSurprise')"
          title="打開 10/23 專屬生日祝福"
        >
          <span class="btn-sparkle">✨</span>
          <span>慶祝 10/23</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

defineEmits<{
  (e: 'openSurprise'): void
}>()

const isScrolled = ref(false)

function handleScroll() {
  isScrolled.value = window.scrollY > 30
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
  background: rgba(251, 248, 243, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
}

.navbar-scrolled {
  padding: 0.55rem 0;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 4px 20px rgba(35, 20, 15, 0.08);
  border-bottom: 1px solid rgba(184, 59, 50, 0.1);
}

.navbar-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.brand-logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  color: var(--primary-maple);
  font-weight: 800;
  font-size: 1.15rem;
}

.logo-leaf {
  font-size: 1.4rem;
  filter: drop-shadow(0 2px 4px rgba(184, 59, 50, 0.3));
}

.logo-sub {
  color: var(--accent-ginkgo-dark);
  font-size: 0.95rem;
  font-weight: 600;
}

.nav-links {
  display: none;
  align-items: center;
  gap: 1.25rem;
}

@media (min-width: 860px) {
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
  gap: 0.75rem;
}

.btn-surprise-mini {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 1rem;
  background: linear-gradient(135deg, #e86380, #b83b32);
  color: white;
  border: none;
  border-radius: var(--radius-full);
  font-size: 0.85rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(232, 99, 128, 0.35);
  transition: all 0.25s ease;
}

.btn-surprise-mini:hover {
  transform: translateY(-2px) scale(1.03);
  box-shadow: 0 6px 18px rgba(232, 99, 128, 0.5);
}

.btn-sparkle {
  animation: heartBeat 1.6s infinite ease-in-out;
}
</style>
