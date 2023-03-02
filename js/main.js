import Hammond from "./modules/hammond.js";
import Drawbar from "./modules/drawbar.js";

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

let midi = null; // global MIDIAccess object

function listInputsAndOutputs(midiAccess) {
  for (const entry of midiAccess.inputs) {
    const input = entry[1];
    console.log(
      `Input port [type:'${input.type}']` +
        ` id:'${input.id}'` +
        ` manufacturer:'${input.manufacturer}'` +
        ` name:'${input.name}'` +
        ` version:'${input.version}'`
    );
  }

  for (const entry of midiAccess.outputs) {
    const output = entry[1];
    console.log(
      `Output port [type:'${output.type}'] id:'${output.id}' manufacturer:'${output.manufacturer}' name:'${output.name}' version:'${output.version}'`
    );
  }
}

const MidiCommands = {
  NOTE_ON: 0x90,
  NOTE_OFF: 0x80,
};

function onMIDIMessage(event) {
  let str = `MIDI message received at timestamp ${event.timeStamp}[${event.data.length} bytes]: `;
  const command = event.data[0];
  const note = event.data[1];
  const velocity = event.data[2] || 0;

  switch (command) {
    case MidiCommands.NOTE_ON:
      if (velocity > 0) {
        playMidiNote(note);
      } else {
        stopMidiNote(note);
      }
      break;
    case MidiCommands.NOTE_OFF:
      stopMidiNote(note);
      break;
  }
  for (const character of event.data) {
    str += `0x${character.toString(16)} `;
  }
  console.log(str);
}

function startLoggingMIDIInput(midiAccess) {
  midiAccess.inputs.forEach((entry) => {
    entry.onmidimessage = onMIDIMessage;
  });
}

function onMIDISuccess(midiAccess) {
  console.log("MIDI ready!");
  midi = midiAccess; // store in the global (in real usage, would probably keep in an object instance)
  listInputsAndOutputs(midiAccess);
  startLoggingMIDIInput(midiAccess);
}

function onMIDIFailure(msg) {
  console.error(`Failed to get MIDI access - ${msg}`);
}

navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
