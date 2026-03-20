<template>
  <div v-if="choices?.length" class="choices" role="group" aria-label="劇情分支選擇">
    <button
      v-for="choice in choices"
      :key="choice.id"
      class="choice-btn"
      type="button"
      @click="$emit('choose', choice.id)"
    >
      {{ choice.label }}
    </button>
  </div>
</template>

<script setup>
defineProps({
  choices: {
    type: Array,
    default: () => []
  }
});

defineEmits(['choose']);
</script>

<style scoped>
.choices {
  margin-top: 1.2rem;
  display: grid;
  gap: 0.7rem;
}

.choice-btn {
  border: none;
  cursor: pointer;
  border-radius: 999px;
  padding: 0.85rem 1.1rem;
  background: linear-gradient(130deg, #f3648f, #e34773);
  color: #fff;
  font-weight: 600;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 8px 20px rgba(243, 100, 143, 0.3);
}

.choice-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 24px rgba(243, 100, 143, 0.35);
}

.choice-btn:focus-visible {
  outline: 3px solid rgba(51, 28, 46, 0.35);
  outline-offset: 2px;
}
</style>
