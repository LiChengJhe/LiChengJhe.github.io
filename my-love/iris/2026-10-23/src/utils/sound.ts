// Web Audio API Peaceful Japanese Autumn Melody & Sound Effects
class AudioSynthesizer {
  private ctx: AudioContext | null = null
  private isPlaying: boolean = false
  private melodyTimer: number | null = null
  private currentNoteIndex: number = 0

  // Japanese Insen/Hirajoshi pentatonic scale frequencies (Peaceful, warm, autumn feeling)
  private readonly notes = [
    261.63, // C4
    277.18, // C#4
    349.23, // F4
    392.00, // G4
    466.16, // A#4
    523.25, // C5
    554.37, // C#5
    698.46, // F5
    783.99, // G5
    932.33  // A#5
  ]

  // Gentle pentatonic lullaby sequence
  private readonly sequence = [0, 2, 3, 5, 4, 3, 2, 0, 3, 5, 7, 6, 5, 3, 2, 0]

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      this.ctx = new AudioCtx()
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume()
    }
    return this.ctx
  }

  // Play a soft gentle bell/koto chime note
  private playKotoNote(freq: number, duration: number = 2.5, volume: number = 0.08) {
    try {
      const ctx = this.getContext()
      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      const filter = ctx.createBiquadFilter()

      // Warm low-pass filter
      filter.type = 'lowpass'
      filter.frequency.setValueAtTime(1800, ctx.currentTime)

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, ctx.currentTime)

      // Slight pitch decay like Japanese plucked string
      osc.frequency.exponentialRampToValueAtTime(freq * 0.998, ctx.currentTime + duration)

      // Pluck envelope
      gain.gain.setValueAtTime(0, ctx.currentTime)
      gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 0.04)
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration)

      osc.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)

      osc.start(ctx.currentTime)
      osc.stop(ctx.currentTime + duration)
    } catch {
      // Audio context might be restricted before user gesture
    }
  }

  // Play Birthday Fanfare Chime
  public playBirthdayChime() {
    try {
      const chords = [
        [523.25, 659.25, 783.99], // C Major
        [587.33, 739.99, 880.00], // D Major
        [659.25, 830.61, 987.77], // E Major
        [783.99, 987.77, 1174.66, 1318.51] // High flourish
      ]

      chords.forEach((chord, i) => {
        setTimeout(() => {
          chord.forEach(freq => {
            this.playKotoNote(freq, 2.0, 0.12)
          })
        }, i * 320)
      })
    } catch {
      // Ignore
    }
  }

  // Play candle blowing sound
  public playBlowCandleSound() {
    try {
      const ctx = this.getContext()
      // Gentle white noise puff
      const bufferSize = ctx.sampleRate * 0.6
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate)
      const data = buffer.getChannelData(0)
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1
      }

      const noise = ctx.createBufferSource()
      noise.buffer = buffer

      const filter = ctx.createBiquadFilter()
      filter.type = 'bandpass'
      filter.frequency.setValueAtTime(800, ctx.currentTime)
      filter.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.5)

      const gain = ctx.createGain()
      gain.gain.setValueAtTime(0.15, ctx.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5)

      noise.connect(filter)
      filter.connect(gain)
      gain.connect(ctx.destination)

      noise.start()
    } catch {
      // Ignore
    }
  }

  public toggleMusic(): boolean {
    if (this.isPlaying) {
      this.stopMusic()
      return false
    } else {
      this.startMusic()
      return true
    }
  }

  public startMusic() {
    if (this.isPlaying) return
    this.isPlaying = true

    const step = () => {
      if (!this.isPlaying) return
      const noteIdx = this.sequence[this.currentNoteIndex % this.sequence.length]
      const freq = this.notes[noteIdx]
      this.playKotoNote(freq, 3.0, 0.07)
      this.currentNoteIndex++
      this.melodyTimer = window.setTimeout(step, 1400)
    }

    step()
  }

  public stopMusic() {
    this.isPlaying = false
    if (this.melodyTimer) {
      clearTimeout(this.melodyTimer)
      this.melodyTimer = null
    }
  }

  public getStatus(): boolean {
    return this.isPlaying
  }
}

export const soundSynthesizer = new AudioSynthesizer()
