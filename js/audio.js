// Smart Travel Sentinel - Synthetic Web Audio & Speech Engine
// Synthesizes distress siren, BLE locator radar chirps, and multilingual monument narration

const STS_AUDIO = {
  audioCtx: null,
  sirenOsc: null,
  sirenGain: null,
  sirenInterval: null,
  isSirenPlaying: false,
  isAudioGuidePlaying: false,
  currentUtterance: null,

  initAudioContext() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
    }
    if (this.audioCtx && this.audioCtx.state === "suspended") {
      this.audioCtx.resume();
    }
  },

  // 1. SOS Emergency Siren (Loud alternating frequency dual oscillator)
  startSiren() {
    this.initAudioContext();
    if (!this.audioCtx) return;
    if (this.isSirenPlaying) return;

    this.isSirenPlaying = true;
    let high = true;

    this.sirenGain = this.audioCtx.createGain();
    this.sirenGain.gain.setValueAtTime(0.3, this.audioCtx.currentTime);
    this.sirenGain.connect(this.audioCtx.destination);

    this.sirenOsc = this.audioCtx.createOscillator();
    this.sirenOsc.type = "sawtooth";
    this.sirenOsc.frequency.setValueAtTime(800, this.audioCtx.currentTime);
    this.sirenOsc.connect(this.sirenGain);
    this.sirenOsc.start();

    this.sirenInterval = setInterval(() => {
      if (!this.isSirenPlaying || !this.sirenOsc) return;
      const targetFreq = high ? 1150 : 750;
      this.sirenOsc.frequency.exponentialRampToValueAtTime(targetFreq, this.audioCtx.currentTime + 0.18);
      high = !high;
    }, 250);
  },

  stopSiren() {
    if (this.sirenInterval) {
      clearInterval(this.sirenInterval);
      this.sirenInterval = null;
    }
    if (this.sirenOsc) {
      try {
        this.sirenOsc.stop();
        this.sirenOsc.disconnect();
      } catch (e) {
        // ignore if already stopped
      }
      this.sirenOsc = null;
    }
    if (this.sirenGain) {
      try {
        this.sirenGain.disconnect();
      } catch (e) {}
      this.sirenGain = null;
    }
    this.isSirenPlaying = false;
  },

  toggleSiren() {
    if (this.isSirenPlaying) {
      this.stopSiren();
      return false;
    } else {
      this.startSiren();
      return true;
    }
  },

  // 2. BLE Radar Locator Beep (High frequency chirp indicating tag proximity)
  playBleChirp(distanceMeters = 1.0) {
    this.initAudioContext();
    if (!this.audioCtx) return;

    const osc = this.audioCtx.createOscillator();
    const gain = this.audioCtx.createGain();

    osc.type = "sine";
    // Closer distance = higher frequency and faster chirp
    const baseFreq = Math.max(880, 2200 - distanceMeters * 80);
    osc.frequency.setValueAtTime(baseFreq, this.audioCtx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, this.audioCtx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.25, this.audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioCtx.currentTime + 0.12);

    osc.connect(gain);
    gain.connect(this.audioCtx.destination);

    osc.start();
    osc.stop(this.audioCtx.currentTime + 0.14);
  },

  // Play a sequence of 3 rapid locator pings
  ringBleDevice(deviceName, distanceMeters = 1.0, callback) {
    this.playBleChirp(distanceMeters);
    setTimeout(() => this.playBleChirp(distanceMeters), 220);
    setTimeout(() => this.playBleChirp(distanceMeters), 440);
    setTimeout(() => this.playBleChirp(distanceMeters), 660);
    if (callback) {
      setTimeout(callback, 800);
    }
  },

  // 3. Web Speech API for QR Audio Guide Narration
  playAudioGuide(text, langCode = "en", onEndCallback) {
    if (!("speechSynthesis" in window)) {
      alert("Text-to-speech audio is not supported in this browser environment.");
      return;
    }

    this.stopAudioGuide();

    const utterance = new SpeechSynthesisUtterance(text);
    this.currentUtterance = utterance;

    // Map app language code to speech synthesis BCP-47 tags
    const langMap = {
      en: "en-IN",
      ta: "ta-IN",
      te: "te-IN",
      kn: "kn-IN",
      hi: "hi-IN",
      ml: "ml-IN"
    };

    utterance.lang = langMap[langCode] || "en-IN";
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onend = () => {
      this.isAudioGuidePlaying = false;
      this.currentUtterance = null;
      if (onEndCallback) onEndCallback();
    };

    utterance.onerror = () => {
      this.isAudioGuidePlaying = false;
      this.currentUtterance = null;
      if (onEndCallback) onEndCallback();
    };

    this.isAudioGuidePlaying = true;
    window.speechSynthesis.speak(utterance);
  },

  stopAudioGuide() {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    this.isAudioGuidePlaying = false;
    this.currentUtterance = null;
  }
};

window.STS_AUDIO = STS_AUDIO;
