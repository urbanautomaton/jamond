import {
  ToneWheels,
  ManualKeys,
  Drawbars,
  isManualKey,
} from "./definitions.js";

class Synth {
  constructor(controller) {
    this.initialized = false;
    this.audioContext = null;
    this.mainGainNode = null;
    this.notesPlaying = new Set();
    this.drawbarValues = new Array(Drawbars.length).fill(8);
    controller.on("playmidinote", (midiNote) => this.playMidiNote(midiNote));
    controller.on("stopmidinote", (midiNote) => this.stopMidiNote(midiNote));
    controller.on("setdrawbar", (index, value) => {
      this.setDrawbar(index, value);
    });
  }

  normalizeMainGain() {
    if (this.mainGainNode !== null) {
      const drawbarSum = this.drawbarValues.reduce((acc, bar) => acc + bar, 0);

      this.mainGainNode.gain.value = 0.5 / drawbarSum;
    }
  }

  init() {
    if (!this.initialized) {
      this.initialized = true;
      this.audioContext = new AudioContext();
      this.mainGainNode = this.audioContext.createGain();
      this.mainGainNode.connect(this.audioContext.destination);
      this.normalizeMainGain();
      this.toneWheels = ToneWheels.map(({ frequency }) => {
        const gainNode = this.audioContext.createGain();
        gainNode.connect(this.mainGainNode);
        gainNode.gain.value = 0;

        const osc = this.audioContext.createOscillator();
        osc.connect(gainNode);
        osc.type = "sine";
        osc.frequency.value = frequency;
        osc.start();

        return {
          osc,
          gainNode,
        };
      });
    }
  }

  updateGains() {
    const gains = {};

    this.notesPlaying.forEach((midiNote) => {
      const toneIndex = midiNote - ToneWheels[0].midiNote;

      this.drawbarValues.forEach((value, index) => {
        const offset = Drawbars[index].offset;
        gains[toneIndex + offset] ||= 0.0;
        gains[toneIndex + offset] += value / 8.0;
      });
    });

    this.toneWheels.forEach(({ gainNode }, index) => {
      const gain = gains[index] || 0.0;

      gainNode.gain.setTargetAtTime(gain, this.audioContext.currentTime, 0.01);
    });
  }

  playMidiNote(midiNote) {
    this.init();

    if (isManualKey(midiNote)) {
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
    this.drawbarValues[index] = value;
    this.normalizeMainGain();
  }
}

export default Synth;
