import toneWheels from "./tone_wheels.js";

const hasKeyForNote = (midiNote) => midiNote >= 36 && midiNote <= 96;

class Synth {
  constructor() {
    this.initialized = false;
    this.audioContext = null;
    this.mainGainNode = null;
    this.notesPlaying = new Set();
    this.drawbars = [
      { label: "16'", offset: -12, value: 8, color: "brown" },
      { label: "5⅓'", offset: 7, value: 8, color: "brown" },
      { label: "8'", offset: 0, value: 8, color: "white" },
      { label: "4'", offset: 12, value: 8, color: "white" },
      { label: "2⅔'", offset: 19, value: 8, color: "black" },
      { label: "2'", offset: 24, value: 8, color: "white" },
      { label: "1⅗'", offset: 28, value: 8, color: "black" },
      { label: "1⅓'", offset: 31, value: 8, color: "black" },
      { label: "1'", offset: 36, value: 8, color: "white" },
    ];
  }

  init() {
    if (!this.initialized) {
      this.initialized = true;
      this.audioContext = new AudioContext();
      this.mainGainNode = this.audioContext.createGain();
      this.mainGainNode.connect(this.audioContext.destination);
      this.mainGainNode.gain.value = 0.05;

      toneWheels.forEach((toneWheel) => {
        const gainNode = this.audioContext.createGain();
        gainNode.connect(this.mainGainNode);
        gainNode.gain.value = 0;

        const osc = this.audioContext.createOscillator();
        osc.connect(gainNode);
        osc.type = "sine";
        osc.frequency.value = toneWheel.frequency;
        osc.start();

        toneWheel.osc = osc;
        toneWheel.gainNode = gainNode;
      });
    }
  }

  updateGains() {
    const gains = {};

    this.notesPlaying.forEach((midiNote) => {
      const toneIndex = midiNote - toneWheels[0].midiNote;

      this.drawbars.forEach(({ offset, value }) => {
        gains[toneIndex + offset] = value / 8.0;
      });
    });

    toneWheels.forEach(({ gainNode }, index) => {
      const gain = gains[index] || 0.0;

      gainNode.gain.setTargetAtTime(gain, this.audioContext.currentTime, 0.01);
    });
  }

  playMidiNote(midiNote) {
    this.init();

    if (hasKeyForNote(midiNote)) {
      this.notesPlaying.add(midiNote);
      this.updateGains();
    }
  }

  stopMidiNote(midiNote) {
    if (this.initialized) {
      this.notesPlaying.delete(midiNote);
      this.updateGains();
    }
  }

  setDrawbar(index, value) {
    this.drawbars[index].value = value;
  }

  eachManualKey(cb) {
    for (let i = 12; i <= 72; i++) {
      cb(toneWheels[i]);
    }
  }

  eachDrawbar(cb) {
    this.drawbars.forEach((bar, index) => {
      cb(bar, (value) => this.setDrawbar(index, value));
    });
  }
}

export default Synth;
