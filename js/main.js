import { Drawbars } from "./modules/definitions.js";
import Controller from "./modules/controller.js";
import Synth from "./modules/synth.js";
import MidiHammondInput from "./modules/midi_hammond_input.js";
import KeyboardHammondInput from "./modules/keyboard_hammond_input.js";
import HammondUI from "./modules/hammond_ui.js";

const controller = new Controller();

const components = [
  new Synth();
  new HammondUI(document.getElementById("keyboard"));
  new KeyboardHammondInput();
  new MidiHammondInput();
]

components.forEach((component) => component.connect(controller));

Drawbars.forEach((bar, index) => {
  controller.setDrawbar(index, 8);
});
