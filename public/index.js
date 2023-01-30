const hammond = new Hammond();

const onKeyPress = (e) => {
  if (!(e.buttons & 1)) {
    return true;
  }

  if (e.currentTarget.classList.contains("key")) {
    e.currentTarget.classList.add("pressed");
    hammond.playTone(e.currentTarget.dataset.frequency);
  }

  e.preventDefault();
};

const onKeyRelease = (e) => {
  if (e.currentTarget.classList.contains("key")) {
    e.currentTarget.classList.remove("pressed");
    hammond.stopTone();
  }
};

const keyboard = document.getElementById("keyboard");

eachNote(
  { octave: 2, letter: "C" },
  { octave: 7, letter: "C" },
  ({ octave, letter, frequency }) => {
    const keyElement = document.createElement("div");
    const labelElement = document.createElement("div");
    const keyClassname = letter.toLowerCase().replaceAll("#", "s");
    const keyColor = letter.length > 1 ? "black" : "white";

    keyElement.className = `key ${keyClassname} ${keyColor}`;
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
