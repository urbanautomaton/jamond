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

  keyboard.appendChild(keyElement);
});
