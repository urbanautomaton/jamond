import { isManualKey } from './definitions.js';

export const ControllerEvents = {
  PLAY_MIDI_NOTE: 'playmidinote',
  STOP_MIDI_NOTE: 'stopmidinote',
  ENABLE_VIBRATO: 'enablevibrato',
  SET_VIBRATO_MODE: 'setvibratomode',
  SET_DRAWBAR: 'setdrawbar',
};

class Controller {
  constructor(synth) {
    this.synth = synth;
    this.handlers = {};
  }

  on(event, cb) {
    this.handlers[event] ||= [];
    this.handlers[event].push(cb);
  }

  trigger(event, ...args) {
    (this.handlers[event] || []).forEach((cb) => cb(...args));
  }

  playMidiNote(midiNote) {
    if (isManualKey(midiNote)) {
      this.synth.playMidiNote(midiNote);
      this.trigger('playmidinote', midiNote);
    }
  }

  stopMidiNote(midiNote) {
    if (isManualKey(midiNote)) {
      this.synth.stopMidiNote(midiNote);
      this.trigger('stopmidinote', midiNote);
    }
  }

  enableVibrato(value) {
    this.synth.enableVibrato(value);
    this.trigger('enablevibrato', value);
  }

  setVibratoMode(mode) {
    this.synth.setVibratoMode(mode);
    this.trigger('setvibratomode', mode);
  }

  setDrawbar(index, value) {
    this.synth.setDrawbar(index, value);
    this.trigger('setdrawbar', index, value);
  }
}

export default Controller;
