const hammond = new Hammond();

const onKeyPress = (e) => {
  if (!(e.buttons & 1)) {
    return true;
  }

  if (e.currentTarget.classList.contains("key")) {
    const { octave, key } = e.currentTarget.dataset;
    e.currentTarget.classList.add("pressed");
    hammond.keyDown({ octave, key });
  }

  e.preventDefault();
};

const onKeyRelease = (e) => {
  if (e.currentTarget.classList.contains("key")) {
    e.currentTarget.classList.remove("pressed");
    hammond.keyUp();
  }
};

const keyboard = document.getElementById("keyboard");

eachNote(
  { octave: 2, key: "C" },
  { octave: 7, key: "C" },
  ({ octave, key }) => {
    const keyElement = document.createElement("div");
    const labelElement = document.createElement("div");
    const keyClassname = key.toLowerCase().replaceAll("#", "s");
    const keyColor = key.length > 1 ? "black" : "white";

    keyElement.className = `key ${keyClassname} ${keyColor}`;
    Object.assign(keyElement.dataset, { octave, key });

    labelElement.className = "label";
    labelElement.innerHTML = `${key}<sub>${octave}</sub>`;
    keyElement.appendChild(labelElement);

    keyElement.addEventListener("mousedown", onKeyPress, false);
    keyElement.addEventListener("mouseenter", onKeyPress, false);
    keyElement.addEventListener("mouseup", onKeyRelease, false);
    keyElement.addEventListener("mouseleave", onKeyRelease, false);

    keyboard.appendChild(keyElement);
  }
);
