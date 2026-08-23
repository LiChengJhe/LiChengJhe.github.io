<template>
  <canvas
    ref="canvasRef"
    class="maple-canvas"
    :class="{ 'opacity-low': isPaused }"
  ></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Leaf {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  rotation: number
  rotationSpeed: number
  oscillationSpeed: number
  oscillationDistance: number
  baseX: number
  opacity: number
  color: string
}

const canvasRef = ref<HTMLCanvasElement | null>(null)
const isPaused = ref(false)
let animationFrameId: number | null = null

const mapleColors = [
  '#b83b32', // Deep Maple Red
  '#d64539', // Crimson
  '#e5a93c', // Ginkgo Gold
  '#f76c5e', // Coral Orange
  '#be831e', // Bronze Ochre
  '#f4a261'  // Soft Amber
]

const leaves: Leaf[] = []
const LEAF_COUNT = 24

function createLeaf(width: number, _height: number, initialY = -20): Leaf {
  const x = Math.random() * width
  return {
    x,
    baseX: x,
    y: initialY === -20 ? Math.random() * -50 : initialY,
    size: Math.random() * 12 + 10,
    speedX: (Math.random() - 0.5) * 0.8,
    speedY: Math.random() * 0.8 + 0.6,
    rotation: Math.random() * Math.PI * 2,
    rotationSpeed: (Math.random() - 0.5) * 0.02,
    oscillationSpeed: Math.random() * 0.02 + 0.01,
    oscillationDistance: Math.random() * 40 + 20,
    opacity: Math.random() * 0.45 + 0.25,
    color: mapleColors[Math.floor(Math.random() * mapleColors.length)]
  }
}

// Draw a stylized Japanese Maple Leaf (Momiji)
function drawMapleLeaf(ctx: CanvasRenderingContext2D, leaf: Leaf) {
  ctx.save()
  ctx.translate(leaf.x, leaf.y)
  ctx.rotate(leaf.rotation)
  ctx.globalAlpha = leaf.opacity
  ctx.fillStyle = leaf.color

  const s = leaf.size / 10

  ctx.beginPath()
  // Draw multi-lobed momiji leaf shape
  ctx.moveTo(0, -10 * s)
  // Center tip
  ctx.quadraticCurveTo(2 * s, -6 * s, 4 * s, -8 * s)
  // Top right lobe
  ctx.quadraticCurveTo(5 * s, -4 * s, 9 * s, -3 * s)
  // Right middle lobe
  ctx.quadraticCurveTo(6 * s, 0, 8 * s, 4 * s)
  // Right bottom lobe
  ctx.quadraticCurveTo(4 * s, 4 * s, 2 * s, 8 * s)
  // Stem base
  ctx.lineTo(0.5 * s, 11 * s)
  ctx.lineTo(-0.5 * s, 11 * s)
  // Left bottom lobe
  ctx.lineTo(-2 * s, 8 * s)
  ctx.quadraticCurveTo(-4 * s, 4 * s, -8 * s, 4 * s)
  // Left middle lobe
  ctx.quadraticCurveTo(-6 * s, 0, -9 * s, -3 * s)
  // Left top lobe
  ctx.quadraticCurveTo(-5 * s, -4 * s, -4 * s, -8 * s)
  ctx.quadraticCurveTo(-2 * s, -6 * s, 0, -10 * s)
  ctx.closePath()
  ctx.fill()

  ctx.restore()
}

function initLeaves(width: number, height: number) {
  leaves.length = 0
  for (let i = 0; i < LEAF_COUNT; i++) {
    leaves.push(createLeaf(width, height, Math.random() * height))
  }
}

function updateAndRender() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const time = Date.now() * 0.002

  for (let i = 0; i < leaves.length; i++) {
    const leaf = leaves[i]
    leaf.y += leaf.speedY
    leaf.x = leaf.baseX + Math.sin(time + i) * leaf.oscillationDistance + leaf.speedX
    leaf.rotation += leaf.rotationSpeed

    drawMapleLeaf(ctx, leaf)

    // Reset if out of bounds
    if (leaf.y > canvas.height + 30) {
      leaves[i] = createLeaf(canvas.width, canvas.height, -20)
    }
  }

  animationFrameId = requestAnimationFrame(updateAndRender)
}

function resizeCanvas() {
  const canvas = canvasRef.value
  if (!canvas) return
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  initLeaves(canvas.width, canvas.height)
}

onMounted(() => {
  resizeCanvas()
  window.addEventListener('resize', resizeCanvas)
  updateAndRender()
})

onUnmounted(() => {
  window.removeEventListener('resize', resizeCanvas)
  if (animationFrameId !== null) {
    cancelAnimationFrame(animationFrameId)
  }
})
</script>

<style scoped>
.maple-canvas {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
  z-index: 1;
  transition: opacity 0.5s ease;
}

.opacity-low {
  opacity: 0.2;
}
</style>
