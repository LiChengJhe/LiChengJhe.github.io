import confetti from 'canvas-confetti'

// Celebration fireworks / confetti burst
export function triggerBirthdayConfetti() {
  const duration = 3.5 * 1000
  const end = Date.now() + duration

  // Maple, Gold, Rose Pink, Warm Orange colors
  const colors = ['#b83b32', '#e5a93c', '#f76c5e', '#ff8fa3', '#fef5e7', '#ffd166']

  ;(function frame() {
    confetti({
      particleCount: 4,
      angle: 60,
      spread: 65,
      origin: { x: 0, y: 0.7 },
      colors: colors
    })
    confetti({
      particleCount: 4,
      angle: 120,
      spread: 65,
      origin: { x: 1, y: 0.7 },
      colors: colors
    })

    if (Date.now() < end) {
      requestAnimationFrame(frame)
    }
  })()

  // Center star explosion
  setTimeout(() => {
    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.6 },
      colors: colors,
      shapes: ['star', 'circle']
    })
  }, 400)
}

// Gentle hearts & sparkles explosion
export function triggerHeartBurst(originX = 0.5, originY = 0.5) {
  confetti({
    particleCount: 35,
    spread: 70,
    origin: { x: originX, y: originY },
    colors: ['#e86380', '#ff8fa3', '#b83b32', '#ffd166'],
    ticks: 200,
    gravity: 0.8,
    scalar: 1.2
  })
}
