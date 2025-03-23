import { ToneWheels, ManualKeys, Drawbars, isManualKey } from './definitions.js';
import PercussionLatch from './percussion_latch.js';
import VibratoNode from './vibrato_node.js';

class Synth extends EventTarget {
  constructor(audioContext) {
    super();
    this.audioContext = audioContext;

    this.mainGainNode = this.audioContext.createGain();
    this.mainGainNode.gain.value = 0.04;

    this.vibratoNode = new VibratoNode(this.audioContext);
    this.mainGainNode.connect(this.vibratoNode);
    this.vibratoNode.connect(this.audioContext.destination);

    this.toneWheels = ToneWheels.map(({ frequency }) => {
      const gainNode = this.audioContext.createGain();
      gainNode.connect(this.mainGainNode);
      gainNode.gain.value = 0;
      const percussionGainNode = this.audioContext.createGain();
      percussionGainNode.connect(this.mainGainNode);
      percussionGainNode.gain.value = 0;

      const osc = this.audioContext.createOscillator();
      osc.connect(gainNode);
      osc.connect(percussionGainNode);
      osc.type = 'sine';
      osc.frequency.value = frequency;
      osc.start();

      return {
        osc,
        gainNode,
        percussionGainNode,
      };
    });

    this.notesPlaying = new Set();
    this.drawbarValues = new Array(Drawbars.length).fill(8);
    this.percussionLatch = new PercussionLatch();
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

  percussionGainNode(midiNote) {
    const toneIndex = midiNote - ToneWheels[0].midiNote + 12;
    const { percussionGainNode } = this.toneWheels[toneIndex];

    return percussionGainNode;
  }

  startPercussion(midiNote) {
    this.percussionLatch.try(() => {
      const gainNode = this.percussionGainNode(midiNote);
      const now = this.audioContext.currentTime;

      gainNode.gain.cancelScheduledValues(now);

      // experimenting with setting directly both here and on stop, because it
      // seems like the setValueAtTime calls fight otherwise, to weird effect
      gainNode.gain.linearRampToValueAtTime(2.0, now + 0.01);
      gainNode.gain.linearRampToValueAtTime(0.0, now + 0.4);
    });
  }

  stopPercussion(midiNote) {
    const gainNode = this.percussionGainNode(midiNote);
    const now = this.audioContext.currentTime;

    gainNode.gain.cancelScheduledValues(now);
    gainNode.gain.linearRampToValueAtTime(0.0, now + 0.01);
  }

  isPlaying(midiNote) {
    return this.notesPlaying.has(midiNote);
  }

  playMidiNote(midiNote) {
    if (isManualKey(midiNote) && !this.isPlaying(midiNote)) {
      this.startPercussion(midiNote);
      this.notesPlaying.add(midiNote);
      this.updateGains();
      this.#emit('playmidinote', { midiNote });
    }
  }

  stopMidiNote(midiNote) {
    this.#emit('stopmidinote', { midiNote });
    this.notesPlaying.delete(midiNote);
    if (this.notesPlaying.size === 0) {
      this.percussionLatch.release();
    }
    this.stopPercussion(midiNote);
    this.updateGains();
  }

  setDrawbar(index, value) {
    this.#emit('setdrawbar', { index, value });
    this.drawbarValues[index] = value;
  }

  enableVibrato(value) {
    if (value) {
      this.mainGainNode.disconnect();
      this.mainGainNode.connect(this.vibratoNode);
    } else {
      this.mainGainNode.disconnect();
      this.mainGainNode.connect(this.audioContext.destination);
    }
  }

  setVibratoMode(mode) {
    this.vibratoNode.setMode(mode);
  }

  on(eventName, cb) {
    this.addEventListener(eventName, ({ detail }) => cb(detail));
  }

  #emit(eventName, detail) {
    this.dispatchEvent(new CustomEvent(eventName, { detail }));
  }
}

export default Synth;
