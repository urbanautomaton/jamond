import { ManualKeys, Drawbars, VibratoModes } from './definitions.js';
import Drawbar from './drawbar.js';

const createElement = (elementType, parent, attributes, cb = () => {}) => {
  const element = document.createElement(elementType);
  Object.assign(element, attributes);
  parent.appendChild(element);
  cb(element);
  return element;
};

['div', 'input', 'label', 'option', 'select'].forEach((elementType) => {
  HTMLElement.prototype[elementType] = function (attributes, cb = () => {}) {
    return createElement(elementType, this, attributes, cb);
  };
});

class HammondUI {
  constructor(container, synth) {
    this.container = container;
    this.synth = synth;

    this.container.div({ className: 'controls' }, (controls) => {
      controls.div({ className: 'vibratoControls' }, (vibratoControls) => {
        vibratoControls.input(
          { name: 'vibratoEnabled', type: 'checkbox', checked: true },
          (vibratoEnabled) => {
            vibratoEnabled.onchange = (event) => {
              this.synth.enableVibrato(event.target.checked);
            };
          },
        );

        vibratoControls.label({
          for: 'vibratoEnabled',
          innerText: 'Vibrato enabled?',
        });

        vibratoControls.select({ name: 'vibratoMode', required: true }, (vibratoMode) => {
          VibratoModes.forEach((mode) => {
            vibratoMode.option({ value: mode, innerText: mode });
          });
          vibratoMode.onchange = (event) => {
            this.synth.setVibratoMode(event.target.value);
          };
          vibratoMode.value = 'C-3';
        });

        vibratoControls.label({
          for: 'vibratoMode',
          innerText: 'Vibrato Mode',
        });
      });

      controls.div({ className: 'drawbars' }, (drawbars) => {
        Drawbars.forEach(({ label, color }, index) => {
          drawbars.div({ className: `drawbar ${color}` }, (drawbar) => {
            new Drawbar(drawbar, label, index, synth);
          });
        });
      });

      controls.div({ className: 'keys' }, (keys) => {
        this.synth.on('playmidinote', ({ midiNote }) => {
          keys.querySelector(`[data-midi-note="${midiNote}"]`).classList.add('pressed');
        });

        this.synth.on('stopmidinote', ({ midiNote }) => {
          keys.querySelector(`[data-midi-note="${midiNote}"]`).classList.remove('pressed');
        });

        ManualKeys.forEach(({ midiNote, octave, name }) => {
          const keyClassName = name.toLowerCase().replaceAll('#', 's');
          const keyColor = name.length > 1 ? 'black' : 'white';

          keys.div({ className: `key ${keyClassName} ${keyColor}` }, (keyElement) => {
            Object.assign(keyElement.dataset, { midiNote });

            keyElement.onmousedown = (e) => this.onMouseDown(e);
            keyElement.onmouseenter = (e) => this.onMouseEnter(e);
            keyElement.onmouseup = (e) => this.onMouseUp(e);
            keyElement.onmouseleave = (e) => this.onMouseLeave(e);

            keyElement.div({ className: 'label' }, (labelElement) => {
              labelElement.innerHTML = `${name}<sub>${octave}</sub>`;
            });
          });
        });
      });
    });
  }

  onMouseEnter(e) {
    if (this.dragging) {
      this.onKeyDown(e);
    }
  }

  onMouseLeave(e) {
    if (this.dragging) {
      this.onKeyUp(e);
    }
  }

  onMouseDown(e) {
    if (this.dragging || !(e.buttons & 1)) {
      return true;
    }

    this.dragging = true;
    this.onKeyDown(e);
  }

  onMouseUp(e) {
    if (!this.dragging || e.buttons & 1) {
      return true;
    }

    this.dragging = false;
    this.onKeyUp(e);
  }

  onKeyDown(e) {
    this.synth.playMidiNote(e.currentTarget.dataset.midiNote);

    e.preventDefault();
  }

  onKeyUp(e) {
    this.synth.stopMidiNote(e.currentTarget.dataset.midiNote);

    e.preventDefault();
  }
}

export default HammondUI;
