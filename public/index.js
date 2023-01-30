const hammond = new Hammond();

const onKeyPress = (e) => {
  if (!(e.buttons & 1)) {
    return true;
  }

  if (e.currentTarget.dataset.frequency) {
    hammond.playTone(e.currentTarget.dataset.frequency);
  }

  e.preventDefault();
};

const onKeyRelease = (e) => {
  hammond.stopTone();
};

const keyboard = document.getElementById("keyboard");

eachNote(
  { octave: 2, letter: "C" },
  { octave: 7, letter: "C" },
  ({ octave, letter, frequency }) => {
    const keyElement = document.createElement("div");
    const labelElement = document.createElement("div");

    keyElement.className = `key ${letter.length > 1 && "black"}`;
    Object.assign(keyElement.dataset, { octave, letter, frequency });

    labelElement.className = "label";
    labelElement.innerHTML = `${letter}<sub>${octave}</sub>`;
    keyElement.appendChild(labelElement);

    keyElement.addEventListener("mousedown", onKeyPress, false);
    keyElement.addEventListener("mouseenter", onKeyPress, false);
    keyElement.addEventListener("mouseup", onKeyRelease, false);
    keyElement.addEventListener("mouseleave", onKeyRelease, false);

    keyboard.appendChild(keyElement);
  }
);
