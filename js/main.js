import { Drawbars } from './modules/definitions.js';
import Synth from './modules/synth.js';
import MidiHammondInput from './modules/midi_hammond_input.js';
import KeyboardHammondInput from './modules/keyboard_hammond_input.js';
import HammondUI from './modules/hammond_ui.js';

const audioContext = new AudioContext();
const keyboard = document.querySelector('#keyboard');
const initButton = document.querySelector('button#init');

const init = () => {
  initButton.remove();

  const synth = new Synth(audioContext);

  new HammondUI(document.getElementById('keyboard'), synth);
  new KeyboardHammondInput(synth);
  new MidiHammondInput(synth);

  Drawbars.forEach((bar, index) => {
    synth.setDrawbar(index, index < 4 ? 8 : 0);
  });
};

if (audioContext.state === 'running') {
  init();
} else {
  const initListener = () => {
    audioContext.resume().then(init);
  };

  document.addEventListener('keydown', initListener, { once: true });
  initButton.onclick = initListener;
}
