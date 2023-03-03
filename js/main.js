import { ManualKeys, Drawbars, isManualKey } from "./modules/definitions.js";
import Synth from "./modules/synth.js";
import MidiHammondInput from "./modules/midi_hammond_input.js";
import KeyboardHammondInput from "./modules/keyboard_hammond_input.js";
import HammondUI from "./modules/hammond_ui.js";

const handlers = {};

const on = (event, cb) => {
  handlers[event] ||= [];
  handlers[event].push(cb);
};

const trigger = (event, ...args) => {
  (handlers[event] || []).forEach((cb) => cb(...args));
};

const playMidiNote = (midiNote) => {
  if (isManualKey(midiNote)) {
    trigger("playmidinote", midiNote);
  }
};

const stopMidiNote = (midiNote) => {
  if (isManualKey(midiNote)) {
    trigger("stopmidinote", midiNote);
  }
};

const synth = new Synth({ on });

const setDrawbar = (index, value) => {
  synth.setDrawbar(index, value);
};

new HammondUI(document.getElementById("keyboard"), {
  playMidiNote,
  stopMidiNote,
  setDrawbar,
  on,
});
new KeyboardHammondInput({ playMidiNote, stopMidiNote });
new MidiHammondInput({ playMidiNote, stopMidiNote });
