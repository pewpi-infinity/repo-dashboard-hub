type EmojiSoundProfile = {
  baseFrequency: number
  harmonics: number[]
  attack: number
  decay: number
  sustain: number
  release: number
  filterFreq: number
  filterQ: number
  distortion?: number
  reverbAmount?: number
  pitchShift?: number
}

const emojiSoundProfiles: Record<string, EmojiSoundProfile> = {
  '👑': {
    baseFrequency: 880,
    harmonics: [1, 2, 3, 5],
    attack: 0.01,
    decay: 0.1,
    sustain: 0.3,
    release: 0.2,
    filterFreq: 5000,
    filterQ: 8,
    reverbAmount: 0.5,
  },
  '🧠': {
    baseFrequency: 440,
    harmonics: [1, 1.5, 2.5, 3.5],
    attack: 0.02,
    decay: 0.15,
    sustain: 0.4,
    release: 0.3,
    filterFreq: 3000,
    filterQ: 5,
    pitchShift: 0.1,
  },
  '🧱': {
    baseFrequency: 110,
    harmonics: [1, 2],
    attack: 0.005,
    decay: 0.05,
    sustain: 0.1,
    release: 0.1,
    filterFreq: 800,
    filterQ: 2,
    distortion: 0.3,
  },
  '🎵': {
    baseFrequency: 523.25,
    harmonics: [1, 2, 3, 4, 5],
    attack: 0.01,
    decay: 0.2,
    sustain: 0.5,
    release: 0.4,
    filterFreq: 4000,
    filterQ: 10,
  },
  '🪡': {
    baseFrequency: 1046.5,
    harmonics: [1, 3, 5],
    attack: 0.001,
    decay: 0.05,
    sustain: 0.05,
    release: 0.05,
    filterFreq: 8000,
    filterQ: 15,
  },
  '🌐': {
    baseFrequency: 261.63,
    harmonics: [1, 2, 4, 8],
    attack: 0.02,
    decay: 0.2,
    sustain: 0.3,
    release: 0.4,
    filterFreq: 2500,
    filterQ: 4,
    reverbAmount: 0.7,
  },
  '🟦': {
    baseFrequency: 329.63,
    harmonics: [1, 2, 3],
    attack: 0.01,
    decay: 0.1,
    sustain: 0.2,
    release: 0.2,
    filterFreq: 3500,
    filterQ: 6,
  },
  '🟡': {
    baseFrequency: 392.0,
    harmonics: [1, 2, 4],
    attack: 0.01,
    decay: 0.1,
    sustain: 0.25,
    release: 0.2,
    filterFreq: 4500,
    filterQ: 7,
  },
  '💵': {
    baseFrequency: 659.25,
    harmonics: [1, 2, 3, 4],
    attack: 0.005,
    decay: 0.08,
    sustain: 0.15,
    release: 0.15,
    filterFreq: 6000,
    filterQ: 10,
  },
  '💰': {
    baseFrequency: 783.99,
    harmonics: [1, 2, 3, 5],
    attack: 0.005,
    decay: 0.08,
    sustain: 0.15,
    release: 0.15,
    filterFreq: 6500,
    filterQ: 12,
  },
  '🔱': {
    baseFrequency: 207.65,
    harmonics: [1, 2, 4],
    attack: 0.01,
    decay: 0.15,
    sustain: 0.3,
    release: 0.3,
    filterFreq: 2000,
    filterQ: 5,
    distortion: 0.2,
  },
  '✨': {
    baseFrequency: 1318.51,
    harmonics: [1, 3, 5, 7, 9],
    attack: 0.001,
    decay: 0.1,
    sustain: 0.1,
    release: 0.3,
    filterFreq: 10000,
    filterQ: 20,
    reverbAmount: 0.8,
  },
  '🍄': {
    baseFrequency: 293.66,
    harmonics: [1, 1.5, 2, 3],
    attack: 0.02,
    decay: 0.15,
    sustain: 0.3,
    release: 0.25,
    filterFreq: 2800,
    filterQ: 6,
  },
  '🪐': {
    baseFrequency: 146.83,
    harmonics: [1, 2, 3, 4, 5, 6],
    attack: 0.03,
    decay: 0.2,
    sustain: 0.4,
    release: 0.5,
    filterFreq: 1500,
    filterQ: 3,
    reverbAmount: 0.9,
    pitchShift: -0.2,
  },
  '⭐': {
    baseFrequency: 987.77,
    harmonics: [1, 2, 4, 8],
    attack: 0.001,
    decay: 0.08,
    sustain: 0.1,
    release: 0.2,
    filterFreq: 7000,
    filterQ: 15,
    reverbAmount: 0.6,
  },
  '🦾': {
    baseFrequency: 220.0,
    harmonics: [1, 2, 3],
    attack: 0.005,
    decay: 0.08,
    sustain: 0.15,
    release: 0.1,
    filterFreq: 2200,
    filterQ: 4,
    distortion: 0.4,
  },
  '🕹️': {
    baseFrequency: 440.0,
    harmonics: [1, 2, 4],
    attack: 0.005,
    decay: 0.05,
    sustain: 0.1,
    release: 0.1,
    filterFreq: 4000,
    filterQ: 8,
  },
  '👁️': {
    baseFrequency: 554.37,
    harmonics: [1, 2, 3, 5],
    attack: 0.02,
    decay: 0.15,
    sustain: 0.25,
    release: 0.3,
    filterFreq: 5000,
    filterQ: 10,
  },
  '🔀': {
    baseFrequency: 349.23,
    harmonics: [1, 2, 3, 4],
    attack: 0.01,
    decay: 0.1,
    sustain: 0.2,
    release: 0.2,
    filterFreq: 3200,
    filterQ: 6,
  },
  '🔗': {
    baseFrequency: 415.3,
    harmonics: [1, 2, 3],
    attack: 0.01,
    decay: 0.12,
    sustain: 0.22,
    release: 0.25,
    filterFreq: 3800,
    filterQ: 7,
  },
  '🎛️': {
    baseFrequency: 493.88,
    harmonics: [1, 2, 3, 4, 5],
    attack: 0.01,
    decay: 0.1,
    sustain: 0.2,
    release: 0.2,
    filterFreq: 4500,
    filterQ: 8,
  },
  '💫': {
    baseFrequency: 1174.66,
    harmonics: [1, 3, 5, 7],
    attack: 0.001,
    decay: 0.12,
    sustain: 0.15,
    release: 0.3,
    filterFreq: 9000,
    filterQ: 18,
    reverbAmount: 0.7,
  },
  '⛓️': {
    baseFrequency: 196.0,
    harmonics: [1, 2],
    attack: 0.005,
    decay: 0.08,
    sustain: 0.12,
    release: 0.1,
    filterFreq: 1800,
    filterQ: 3,
    distortion: 0.3,
  },
  '⚡': {
    baseFrequency: 1567.98,
    harmonics: [1, 2, 5, 8],
    attack: 0.001,
    decay: 0.05,
    sustain: 0.05,
    release: 0.15,
    filterFreq: 12000,
    filterQ: 25,
    distortion: 0.2,
  },
}

const defaultProfile: EmojiSoundProfile = {
  baseFrequency: 440,
  harmonics: [1, 2, 3],
  attack: 0.01,
  decay: 0.1,
  sustain: 0.2,
  release: 0.2,
  filterFreq: 4000,
  filterQ: 5,
}

class CollisionSoundEngine {
  private audioContext: AudioContext | null = null
  private masterGain: GainNode | null = null
  private enabled: boolean = true
  private volume: number = 0.15

  initialize() {
    if (this.audioContext) return

    try {
      this.audioContext = new AudioContext()
      this.masterGain = this.audioContext.createGain()
      this.masterGain.gain.value = this.volume
      this.masterGain.connect(this.audioContext.destination)
    } catch (error) {
      console.warn('Web Audio API not supported:', error)
      this.enabled = false
    }
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume))
    if (this.masterGain) {
      this.masterGain.gain.value = this.volume
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled
  }

  playCollisionSound(emoji1: string, emoji2: string, velocity: number = 1) {
    if (!this.enabled || !this.audioContext || !this.masterGain) {
      return
    }

    if (this.audioContext.state === 'suspended') {
      this.audioContext.resume()
    }

    const profile1 = emojiSoundProfiles[emoji1] || defaultProfile
    const profile2 = emojiSoundProfiles[emoji2] || defaultProfile

    const blendedProfile: EmojiSoundProfile = {
      baseFrequency: (profile1.baseFrequency + profile2.baseFrequency) / 2,
      harmonics: [...new Set([...profile1.harmonics, ...profile2.harmonics])].slice(0, 5),
      attack: (profile1.attack + profile2.attack) / 2,
      decay: (profile1.decay + profile2.decay) / 2,
      sustain: (profile1.sustain + profile2.sustain) / 2,
      release: (profile1.release + profile2.release) / 2,
      filterFreq: (profile1.filterFreq + profile2.filterFreq) / 2,
      filterQ: (profile1.filterQ + profile2.filterQ) / 2,
      distortion: ((profile1.distortion || 0) + (profile2.distortion || 0)) / 2,
      reverbAmount: ((profile1.reverbAmount || 0) + (profile2.reverbAmount || 0)) / 2,
      pitchShift: ((profile1.pitchShift || 0) + (profile2.pitchShift || 0)) / 2,
    }

    this.synthesizeSound(blendedProfile, velocity)
  }

  private synthesizeSound(profile: EmojiSoundProfile, velocity: number) {
    if (!this.audioContext || !this.masterGain) return

    const now = this.audioContext.currentTime
    const velocityFactor = Math.max(0.3, Math.min(1, velocity))
    const duration = profile.attack + profile.decay + profile.sustain + profile.release

    const gainNode = this.audioContext.createGain()
    gainNode.connect(this.masterGain)

    const filter = this.audioContext.createBiquadFilter()
    filter.type = 'lowpass'
    filter.frequency.value = profile.filterFreq
    filter.Q.value = profile.filterQ
    filter.connect(gainNode)

    const oscillators: OscillatorNode[] = []

    profile.harmonics.forEach((harmonic, index) => {
      const osc = this.audioContext!.createOscillator()
      const oscGain = this.audioContext!.createGain()

      const freq = profile.baseFrequency * harmonic
      const pitchShifted = freq * (1 + (profile.pitchShift || 0) * velocity)
      osc.frequency.value = pitchShifted

      osc.type = index === 0 ? 'sine' : (index === 1 ? 'triangle' : 'square')

      const harmonicVolume = 1 / (index + 1)
      oscGain.gain.value = harmonicVolume * velocityFactor * 0.3

      osc.connect(oscGain)
      oscGain.connect(filter)

      oscillators.push(osc)
    })

    gainNode.gain.setValueAtTime(0, now)
    gainNode.gain.linearRampToValueAtTime(velocityFactor * 0.8, now + profile.attack)
    gainNode.gain.linearRampToValueAtTime(
      velocityFactor * profile.sustain,
      now + profile.attack + profile.decay
    )
    gainNode.gain.linearRampToValueAtTime(
      0,
      now + profile.attack + profile.decay + profile.sustain + profile.release
    )

    if (profile.distortion && profile.distortion > 0) {
      const distortion = this.audioContext.createWaveShaper()
      const curve = this.makeDistortionCurve(profile.distortion * 100 * velocity)
      distortion.curve = curve
      filter.disconnect()
      filter.connect(distortion)
      distortion.connect(gainNode)
    }

    if (profile.reverbAmount && profile.reverbAmount > 0) {
      const convolver = this.audioContext.createConvolver()
      convolver.buffer = this.createReverbBuffer(profile.reverbAmount)
      
      const reverbGain = this.audioContext.createGain()
      reverbGain.gain.value = profile.reverbAmount * 0.5
      
      filter.connect(reverbGain)
      reverbGain.connect(convolver)
      convolver.connect(gainNode)
    }

    oscillators.forEach(osc => {
      osc.start(now)
      osc.stop(now + duration)
    })

    setTimeout(() => {
      oscillators.forEach(osc => {
        try {
          osc.disconnect()
        } catch (e) {}
      })
      filter.disconnect()
      gainNode.disconnect()
    }, duration * 1000 + 100)
  }

  private makeDistortionCurve(amount: number) {
    const samples = 44100
    const curve = new Float32Array(samples)
    const deg = Math.PI / 180

    for (let i = 0; i < samples; i++) {
      const x = (i * 2) / samples - 1
      curve[i] = ((3 + amount) * x * 20 * deg) / (Math.PI + amount * Math.abs(x))
    }

    return curve
  }

  private createReverbBuffer(duration: number): AudioBuffer | null {
    if (!this.audioContext) return null

    const sampleRate = this.audioContext.sampleRate
    const length = sampleRate * duration * 2
    const buffer = this.audioContext.createBuffer(2, length, sampleRate)

    for (let channel = 0; channel < 2; channel++) {
      const channelData = buffer.getChannelData(channel)
      for (let i = 0; i < length; i++) {
        channelData[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / length, 2)
      }
    }

    return buffer
  }

  stop() {
    if (this.audioContext) {
      this.audioContext.close()
      this.audioContext = null
      this.masterGain = null
    }
  }
}

export const collisionSoundEngine = new CollisionSoundEngine()
