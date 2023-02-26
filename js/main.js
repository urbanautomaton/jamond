import Hammond from "./modules/hammond.js";

const hammond = new Hammond();

const onKeyDown = (e) => {
  if (!(e.buttons & 1)) {
    return true;
  }

  const { octave, key } = e.currentTarget.dataset;
  e.currentTarget.classList.add("pressed");
  hammond.keyDown({ octave, key });

  e.preventDefault();
};

const onKeyUp = (e) => {
  const { octave, key } = e.currentTarget.dataset;
  e.currentTarget.classList.remove("pressed");
  hammond.keyUp({ octave, key });

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

hammond.eachManualKey(({ octave, key }) => {
  const keyElement = document.createElement("div");
  const labelElement = document.createElement("div");
  const keyClassname = key.toLowerCase().replaceAll("#", "s");
  const keyColor = key.length > 1 ? "black" : "white";

  keyElement.className = `key ${keyClassname} ${keyColor}`;
  Object.assign(keyElement.dataset, { octave, key });

  labelElement.className = "label";
  labelElement.innerHTML = `${key}<sub>${octave}</sub>`;
  keyElement.appendChild(labelElement);

  keyElement.addEventListener("mousedown", onKeyDown, false);
  keyElement.addEventListener("mouseenter", onKeyDown, false);
  keyElement.addEventListener("mouseup", onKeyUp, false);
  keyElement.addEventListener("mouseleave", onKeyUp, false);

  keys.appendChild(keyElement);
});

const keyMap = {
  a: { octave: 4, key: "C" },
  w: { octave: 4, key: "C#" },
  s: { octave: 4, key: "D" },
  e: { octave: 4, key: "D#" },
  d: { octave: 4, key: "E" },
  f: { octave: 4, key: "F" },
  t: { octave: 4, key: "F#" },
  g: { octave: 4, key: "G" },
  y: { octave: 4, key: "G#" },
  h: { octave: 4, key: "A" },
  u: { octave: 4, key: "A#" },
  j: { octave: 4, key: "B" },
  k: { octave: 5, key: "C" },
};

document.addEventListener(
  "keydown",
  (e) => {
    const key = keyMap[e.key];

    if (key) {
      keys
        .querySelector(`[data-octave="${key.octave}"][data-key="${key.key}"]`)
        .classList.add("pressed");
      hammond.keyDown(key);
    }
  },
  false
);

document.addEventListener(
  "keyup",
  (e) => {
    const key = keyMap[e.key];

    if (key) {
      keys
        .querySelector(`[data-octave="${key.octave}"][data-key="${key.key}"]`)
        .classList.remove("pressed");
      hammond.keyUp(key);
    }
  },
  false
);
