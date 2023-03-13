import { isManualKey } from "./definitions.js";

class Controller {
  constructor() {
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
      this.trigger("playmidinote", midiNote);
    }
  }

  stopMidiNote(midiNote) {
    if (isManualKey(midiNote)) {
      this.trigger("stopmidinote", midiNote);
    }
  }

  enableVibrato(value) {
    this.trigger("enablevibrato", value);
  }

  setVibratoMode(mode) {
    this.trigger("setvibratomode", mode);
  }

  setDrawbar(index, value) {
    this.trigger("setdrawbar", index, value);
  }
}

export default Controller;
