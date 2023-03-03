import { ManualKeys } from "./modules/definitions.js";
import Synth from "./modules/synth.js";
import Drawbar from "./modules/drawbar.js";
import MidiHammondInput from "./modules/midi_hammond_input.js";
import KeyboardHammondInput from "./modules/keyboard_hammond_input.js";

const keyboard = document.getElementById("keyboard");
const drawbars = keyboard.querySelector(".drawbars");
const keys = keyboard.querySelector(".keys");

const synth = new Synth();

const playMidiNote = (midiNote) => {
  keys.querySelector(`[data-midi-note="${midiNote}"]`).classList.add("pressed");
  synth.playMidiNote(midiNote);
};

const stopMidiNote = (midiNote) => {
  keys
    .querySelector(`[data-midi-note="${midiNote}"]`)
    .classList.remove("pressed");
  synth.stopMidiNote(midiNote);
};

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

synth.eachDrawbar(({ label, value, color }, setValue) => {
  const drawbarContainer = document.createElement("div");
  drawbarContainer.className = `drawbar ${color}`;
  new Drawbar(drawbarContainer, label, setValue);
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
