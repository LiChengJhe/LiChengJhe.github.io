<template>
  <nav class="chapter-nav" aria-label="章節導航">
    <button
      class="chapter-nav__btn"
      type="button"
      :disabled="disablePrevious"
      @click="$emit('previous')"
    >
      上一步
    </button>
    <button
      class="chapter-nav__btn chapter-nav__btn--primary"
      type="button"
      :disabled="disableNext"
      @click="$emit('next')"
    >
      下一步
    </button>
    <button
      class="chapter-nav__btn"
      type="button"
      :disabled="disableHome"
      @click="$emit('home')"
    >
      回到旅程起點
    </button>
  </nav>
</template>

<script setup>
defineProps({
  disablePrevious: {
    type: Boolean,
    default: false
  },
  disableNext: {
    type: Boolean,
    default: false
  },
  disableHome: {
    type: Boolean,
    default: false
  }
});

defineEmits(['previous', 'next', 'home']);
</script>

<style scoped>
.chapter-nav {
  margin: 1rem auto 0;
  max-width: 860px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0.7rem;
}

.chapter-nav__btn {
  min-height: 48px;
  border: 1px solid rgba(195, 102, 131, 0.32);
  border-radius: 999px;
  background: rgba(255, 250, 252, 0.95);
  color: #8f4159;
  font-weight: 600;
  cursor: pointer;
  transition: transform 0.18s ease, box-shadow 0.18s ease;
}

.chapter-nav__btn:hover:enabled {
  transform: translateY(-1px);
  box-shadow: 0 10px 22px rgba(195, 102, 131, 0.18);
}

.chapter-nav__btn--primary {
  border: none;
  background: linear-gradient(120deg, #eb7397, #d84d78);
  color: #fff;
}

.chapter-nav__btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

@media (max-width: 700px) {
  .chapter-nav {
    grid-template-columns: 1fr;
  }
}
</style>
