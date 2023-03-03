import { ManualKeys, Drawbars } from "./definitions.js";
import Drawbar from "./drawbar.js";

class HammondUI {
  constructor(container, controller) {
    this.container = container;
    this.controller = controller;

    const drawbars = document.createElement("div");
    drawbars.className = "drawbars";
    const keys = document.createElement("div");
    keys.className = "keys";
    container.appendChild(drawbars);
    container.appendChild(keys);

    Drawbars.forEach(({ label, color }, index) => {
      const drawbarContainer = document.createElement("div");
      drawbarContainer.className = `drawbar ${color}`;
      new Drawbar(drawbarContainer, label, index, controller);
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

      keyElement.addEventListener("mousedown", (e) => this.onKeyDown(e), false);
      keyElement.addEventListener(
        "mouseenter",
        (e) => this.onKeyDown(e),
        false
      );
      keyElement.addEventListener("mouseup", (e) => this.onKeyUp(e), false);
      keyElement.addEventListener("mouseleave", (e) => this.onKeyUp(e), false);

      keys.appendChild(keyElement);
    });

    this.controller.on("playmidinote", (midiNote) => {
      keys
        .querySelector(`[data-midi-note="${midiNote}"]`)
        .classList.add("pressed");
    });

    this.controller.on("stopmidinote", (midiNote) => {
      keys
        .querySelector(`[data-midi-note="${midiNote}"]`)
        .classList.remove("pressed");
    });
  }

  onKeyDown(e) {
    if (!(e.buttons & 1)) {
      return true;
    }

    this.controller.playMidiNote(e.currentTarget.dataset.midiNote);

    e.preventDefault();
  }

  onKeyUp(e) {
    this.controller.stopMidiNote(e.currentTarget.dataset.midiNote);

    e.preventDefault();
  }
}

export default HammondUI;
