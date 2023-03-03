import Hammond from "./modules/hammond.js";
import Drawbar from "./modules/drawbar.js";
import MidiHammondInput from "./modules/midi_hammond_input.js";

const keyboard = document.getElementById("keyboard");
const drawbars = keyboard.querySelector(".drawbars");
const keys = keyboard.querySelector(".keys");

const hammond = new Hammond();

const playMidiNote = (midiNote) => {
  keys.querySelector(`[data-midi-note="${midiNote}"]`).classList.add("pressed");
  hammond.playMidiNote(midiNote);
};

const stopMidiNote = (midiNote) => {
  keys
    .querySelector(`[data-midi-note="${midiNote}"]`)
    .classList.remove("pressed");
  hammond.stopMidiNote(midiNote);
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

hammond.eachDrawbar(({ label, value, color }, setValue) => {
  const drawbarContainer = document.createElement("div");
  drawbarContainer.className = `drawbar ${color}`;
  new Drawbar(drawbarContainer, label, setValue);
  drawbars.appendChild(drawbarContainer);
});

hammond.eachManualKey(({ midiNote, octave, name }) => {
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

const keyMap = {
  a: { midiNote: 60 },
  w: { midiNote: 61 },
  s: { midiNote: 62 },
  e: { midiNote: 63 },
  d: { midiNote: 64 },
  f: { midiNote: 65 },
  t: { midiNote: 66 },
  g: { midiNote: 67 },
  y: { midiNote: 68 },
  h: { midiNote: 69 },
  u: { midiNote: 70 },
  j: { midiNote: 71 },
  k: { midiNote: 72 },
};

document.addEventListener(
  "keydown",
  (e) => {
    if (keyMap.hasOwnProperty(e.key)) {
      playMidiNote(keyMap[e.key].midiNote);
    }
  },
  false
);

document.addEventListener(
  "keyup",
  (e) => {
    if (keyMap.hasOwnProperty(e.key)) {
      stopMidiNote(keyMap[e.key].midiNote);
    }
  },
  false
);

new MidiHammondInput({ playMidiNote, stopMidiNote });
