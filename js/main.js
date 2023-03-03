import { ManualKeys, Drawbars, isManualKey } from "./modules/definitions.js";
import Synth from "./modules/synth.js";
import Drawbar from "./modules/drawbar.js";
import MidiHammondInput from "./modules/midi_hammond_input.js";
import KeyboardHammondInput from "./modules/keyboard_hammond_input.js";

const handlers = {};
const keyboard = document.getElementById("keyboard");
const drawbars = keyboard.querySelector(".drawbars");
const keys = keyboard.querySelector(".keys");

const on = (event, cb) => {
  handlers[event] ||= [];
  handlers[event].push(cb);
};

const trigger = (event, ...args) => {
  (handlers[event] || []).forEach((cb) => cb(...args));
};

const playMidiNote = (midiNote) => {
  if (isManualKey(midiNote)) {
    keys
      .querySelector(`[data-midi-note="${midiNote}"]`)
      .classList.add("pressed");
    trigger("playmidinote", midiNote);
  }
};

const stopMidiNote = (midiNote) => {
  if (isManualKey(midiNote)) {
    keys
      .querySelector(`[data-midi-note="${midiNote}"]`)
      .classList.remove("pressed");
    trigger("stopmidinote", midiNote);
  }
};

const synth = new Synth({ on });

const onKeyDown = (e) => {
  if (!(e.buttons & 1)) {
    return true;
  }

  playMidiNote(e.currentTarget.dataset.midiNote);

  e.preventDefault();
};

const onKeyUp = (e) => {
  stopMidiNote(e.currentTarget.dataset.midiNote);

  e.preventDefault();
};

const setDrawbar = (index, value) => {
  synth.setDrawbar(index, value);
};

Drawbars.forEach(({ label, color }, index) => {
  const drawbarContainer = document.createElement("div");
  drawbarContainer.className = `drawbar ${color}`;
  new Drawbar(drawbarContainer, label, (value) => setDrawbar(index, value));
  drawbars.appendChild(drawbarContainer);
});

ManualKeys.forEach(({ midiNote, octave, name }) => {
  const keyElement = document.createElement("div");
  const labelElement = document.createElement("div");
  const keyClassname = name.toLowerCase().replaceAll("#", "s");
  const keyColor = name.length > 1 ? "black" : "white";

  keyElement.className = `key ${keyClassname} ${keyColor}`;
  Object.assign(keyElement.dataset, { midiNote });

  labelElement.className = "label";
  labelElement.innerHTML = `${name}<sub>${octave}</sub>`;
  keyElement.appendChild(labelElement);

  keyElement.addEventListener("mousedown", onKeyDown, false);
  keyElement.addEventListener("mouseenter", onKeyDown, false);
  keyElement.addEventListener("mouseup", onKeyUp, false);
  keyElement.addEventListener("mouseleave", onKeyUp, false);

  keys.appendChild(keyElement);
});

new KeyboardHammondInput({ playMidiNote, stopMidiNote });
new MidiHammondInput({ playMidiNote, stopMidiNote });
