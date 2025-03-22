import { Drawbars } from "./modules/definitions.js";
import Controller from "./modules/controller.js";
import Synth from "./modules/synth.js";
import MidiHammondInput from "./modules/midi_hammond_input.js";
import KeyboardHammondInput from "./modules/keyboard_hammond_input.js";
import HammondUI from "./modules/hammond_ui.js";

const controller = new Controller();
const audioContext = new AudioContext();

const init = () => {
  new Synth(controller, audioContext);
  new HammondUI(document.getElementById("keyboard"), controller);
  new KeyboardHammondInput(controller);
  new MidiHammondInput(controller);

  Drawbars.forEach((bar, index) => {
    controller.setDrawbar(index, index < 4 ? 8 : 0);
  });
};

const keyboard = document.querySelector("#keyboard");
const button = document.querySelector("button#init");

if (audioContext.state === "running") {
  button.remove();
  init();
} else {
  button.onclick = () => {
    audioContext.resume().then(() => {
      button.remove();
      init();
    });
  };
}
