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

if (audioContext.state === "running") {
  init();
} else {
  const button = document.createElement("button");
  button.innerText = "Jamón feel the noize";
  const keyboard = document.querySelector("#keyboard");
  keyboard.append(button);

  button.onclick = () => {
    audioContext.resume().then(() => {
      button.remove();
      init();
    });
  };
}
