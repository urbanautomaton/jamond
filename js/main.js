import { ManualKeys, Drawbars, isManualKey } from "./modules/definitions.js";
import Synth from "./modules/synth.js";
import MidiHammondInput from "./modules/midi_hammond_input.js";
import KeyboardHammondInput from "./modules/keyboard_hammond_input.js";
import HammondUI from "./modules/hammond_ui.js";

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

  setDrawbar(index, value) {
    this.trigger("setdrawbar", index, value);
  }
}

const controller = new Controller();

new Synth(controller);
new HammondUI(document.getElementById("keyboard"), controller);
new KeyboardHammondInput(controller);
new MidiHammondInput(controller);

Drawbars.forEach((bar, index) => {
  controller.setDrawbar(index, 8);
});
