<template>
  <div class="audio-controller">
    <button
      class="audio-btn"
      :class="{ 'audio-playing': isPlaying }"
      @click="toggleAudio"
      :title="isPlaying ? '暫停秋日背景音樂' : '播放日系秋日氛圍音 (和弦風鈴)'"
    >
      <span class="audio-icon">{{ isPlaying ? '🎵' : '🔇' }}</span>
      <div v-if="isPlaying" class="sound-waves">
        <span class="bar bar-1"></span>
        <span class="bar bar-2"></span>
        <span class="bar bar-3"></span>
      </div>
      <span class="audio-tooltip">{{ isPlaying ? '音樂播放中' : '播放背景音樂' }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { soundSynthesizer } from '../utils/sound'

const isPlaying = ref(false)

function toggleAudio() {
  isPlaying.value = soundSynthesizer.toggleMusic()
}
</script>

<style scoped>
.audio-controller {
  position: fixed;
  bottom: 1.5rem;
  right: 1.5rem;
  z-index: 90;
}

.audio-btn {
  position: relative;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  border: 1.5px solid rgba(184, 59, 50, 0.25);
  box-shadow: 0 6px 20px rgba(35, 20, 15, 0.15);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.audio-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 8px 24px rgba(184, 59, 50, 0.3);
  border-color: var(--primary-maple);
}

.audio-btn.audio-playing {
  background: linear-gradient(135deg, var(--primary-maple), var(--primary-maple-dark));
  border-color: transparent;
  box-shadow: 0 6px 20px rgba(184, 59, 50, 0.45);
}

.audio-icon {
  font-size: 1.35rem;
}

.sound-waves {
  position: absolute;
  top: 6px;
  right: 6px;
  display: flex;
  align-items: flex-end;
  gap: 2px;
  height: 12px;
}

.bar {
  width: 2px;
  background: #ffffff;
  border-radius: 2px;
  animation: waveAnim 0.8s infinite ease-in-out alternate;
}

.bar-1 { height: 6px; animation-delay: 0.1s; }
.bar-2 { height: 12px; animation-delay: 0.3s; }
.bar-3 { height: 8px; animation-delay: 0.2s; }

@keyframes waveAnim {
  0% { height: 3px; }
  100% { height: 12px; }
}

.audio-tooltip {
  position: absolute;
  right: 60px;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(27, 33, 56, 0.9);
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.35rem 0.75rem;
  border-radius: var(--radius-full);
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s ease, transform 0.2s ease;
}

.audio-btn:hover .audio-tooltip {
  opacity: 1;
  transform: translateY(-50%) translateX(-4px);
}
</style>
