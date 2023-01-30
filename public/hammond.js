class Hammond {
  constructor() {
    this.audioContext = null;
    this.mainGainNode = null;
    this.note = null;
  }

  setup() {
    if (this.audioContext === null) {
      this.audioContext = new AudioContext();
      this.mainGainNode = this.audioContext.createGain();
      this.mainGainNode.connect(this.audioContext.destination);
      this.mainGainNode.gain.value = 1.0;
    }
  }

  playTone(freq) {
    this.setup();

    if (this.note !== null) {
      this.note.osc.stop();
    }

    const gainNode = this.audioContext.createGain();
    gainNode.connect(this.mainGainNode);
    gainNode.gain.value = 0;

    const osc = this.audioContext.createOscillator();
    osc.connect(gainNode);
    osc.type = "sine";
    osc.frequency.value = freq;

    osc.start();
    gainNode.gain.setTargetAtTime(1.0, this.audioContext.currentTime, 0.01);

    this.note = { osc, gainNode };
  }

  stopTone() {
    this.setup();

    if (this.note !== null) {
      this.note.gainNode.gain.setTargetAtTime(
        0,
        this.audioContext.currentTime,
        0.01
      );
      let osc = this.note.osc;
      setTimeout(() => {
        osc.stop();
      }, 100);
      this.note = null;
    }
  }
}
