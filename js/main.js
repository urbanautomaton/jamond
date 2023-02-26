import Hammond from "./modules/hammond.js";

const hammond = new Hammond();

const onKeyDown = (e) => {
  if (!(e.buttons & 1)) {
    return true;
  }

  const { midiNote } = e.currentTarget.dataset;
  e.currentTarget.classList.add("pressed");
  hammond.playMidiNote(midiNote);

  e.preventDefault();
};

const onKeyUp = (e) => {
  const { midiNote } = e.currentTarget.dataset;
  e.currentTarget.classList.remove("pressed");
  hammond.stopMidiNote(midiNote);

  e.preventDefault();
};

const keyboard = document.getElementById("keyboard");
const drawBars = keyboard.querySelector(".drawbars");
const keys = keyboard.querySelector(".keys");

hammond.eachDrawBar(({ label, value }, index) => {
  const drawBarContainer = document.createElement("div");
  drawBarContainer.className = "drawbar";
  const drawBarLabel = document.createElement("label");
  drawBarLabel.innerText = label;
  const drawBarRange = document.createElement("input");
  drawBarRange.setAttribute("type", "range");
  drawBarRange.setAttribute("min", 0);
  drawBarRange.setAttribute("max", 8);
  drawBarRange.setAttribute("value", value);
  drawBarRange.addEventListener(
    "change",
    (e) => {
      hammond.setDrawBar(index, e.currentTarget.value);
    },
    false
  );
  drawBarLabel.appendChild(drawBarRange);
  drawBarContainer.appendChild(drawBarLabel);
  drawBars.appendChild(drawBarContainer);
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
      const { midiNote } = keyMap[e.key];

      keys
        .querySelector(`[data-midi-note="${midiNote}"]`)
        .classList.add("pressed");
      hammond.playMidiNote(midiNote);
    }
  },
  false
);

document.addEventListener(
  "keyup",
  (e) => {
    if (keyMap.hasOwnProperty(e.key)) {
      const { midiNote } = keyMap[e.key];

      keys
        .querySelector(`[data-midi-note="${midiNote}"]`)
        .classList.remove("pressed");
      hammond.stopMidiNote(midiNote);
    }
  },
  false
);
