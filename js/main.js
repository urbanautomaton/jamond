import { Drawbars } from "./modules/definitions.js";
import Controller from "./modules/controller.js";
import Synth from "./modules/synth.js";
import MidiHammondInput from "./modules/midi_hammond_input.js";
import KeyboardHammondInput from "./modules/keyboard_hammond_input.js";
import HammondUI from "./modules/hammond_ui.js";

const controller = new Controller();
const audioContext = new AudioContext();
const keyboard = document.querySelector("#keyboard");
const initButton = document.querySelector("button#init");

const init = () => {
  initButton.remove();

  new Synth(controller, audioContext);
  new HammondUI(document.getElementById("keyboard"), controller);
  new KeyboardHammondInput(controller);
  new MidiHammondInput(controller);

  Drawbars.forEach((bar, index) => {
    controller.setDrawbar(index, index < 4 ? 8 : 0);
  });
};

if (audioContext.state === "running") {
  init();
} else {
  initButton.onclick = () => {
    audioContext.resume().then(() => {
      init();
    });
  };
}
