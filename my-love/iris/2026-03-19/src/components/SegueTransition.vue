<template>
  <transition name="segue-fade">
    <div v-if="show" class="segue" aria-live="polite">
      <div class="segue__content">
        <p class="segue__title">{{ title }}</p>
        <p class="segue__subtitle">花瓣正在引路，請稍候...</p>
      </div>
    </div>
  </transition>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '櫻花飄落中...'
  }
});
</script>

<style scoped>
.segue {
  position: fixed;
  inset: 0;
  z-index: var(--layer-overlay);
  display: grid;
  place-items: center;
  background:
    radial-gradient(circle at 30% 20%, rgba(255, 196, 214, 0.32), transparent 48%),
    radial-gradient(circle at 70% 70%, rgba(255, 182, 205, 0.25), transparent 52%),
    rgba(255, 247, 248, 0.78);
  backdrop-filter: blur(4px);
}

.segue__content {
  border-radius: 22px;
  padding: 1.1rem 1.2rem;
  text-align: center;
  min-width: min(420px, 92vw);
  border: 1px solid rgba(220, 137, 161, 0.3);
  background: rgba(255, 252, 250, 0.9);
  box-shadow: 0 14px 30px rgba(157, 99, 116, 0.2);
}

.segue__title {
  font-size: clamp(1rem, 2.8vw, 1.25rem);
  color: #8f4560;
  font-weight: 700;
}

.segue__subtitle {
  margin-top: 0.35rem;
  color: #9a6a77;
}

.segue-fade-enter-active,
.segue-fade-leave-active {
  transition: opacity 0.25s ease;
}

.segue-fade-enter-from,
.segue-fade-leave-to {
  opacity: 0;
}
</style>
