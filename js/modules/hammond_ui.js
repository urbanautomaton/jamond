import { ManualKeys, Drawbars } from "./definitions.js";
import Drawbar from "./drawbar.js";

const div = ({ className, parent }, cb = () => {}) => {
  const element = document.createElement("div");
  element.className = className;
  parent.appendChild(element);
  cb(element);
  return element;
};

class HammondUI {
  constructor(container, controller) {
    this.container = container;
    this.controller = controller;

    div({ className: "drawbars", parent: container }, (drawbars) => {
      Drawbars.forEach(({ label, color }, index) => {
        div({ className: `drawbar ${color}`, parent: drawbars }, (drawbar) => {
          new Drawbar(drawbar, label, index, controller);
        });
      });
    });

    div({ className: "keys", parent: container }, (keys) => {
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

      ManualKeys.forEach(({ midiNote, octave, name }) => {
        const keyClassName = name.toLowerCase().replaceAll("#", "s");
        const keyColor = name.length > 1 ? "black" : "white";

        div(
          { className: `key ${keyClassName} ${keyColor}`, parent: keys },
          (keyElement) => {
            Object.assign(keyElement.dataset, { midiNote });

            keyElement.onmousedown = (e) => this.onKeyDown(e);
            keyElement.onmouseenter = (e) => this.onKeyDown(e);
            keyElement.onmouseup = (e) => this.onKeyUp(e);
            keyElement.onmouseleave = (e) => this.onKeyUp(e);

            div({ className: "label", parent: keyElement }, (labelElement) => {
              labelElement.innerHTML = `${name}<sub>${octave}</sub>`;
            });
          }
        );
      });
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
