const keyMap = {
  a: { midiNote: 60 },
  w: { midiNote: 61 },
  s: { midiNote: 62 },
  e: { midiNote: 63 },
  d: { midiNote: 64 },
  f: { midiNote: 65 },
  t: { midiNote: 66 },
  g: { midiNote: 67 },
  y: { midiNote: 68 },
  h: { midiNote: 69 },
  u: { midiNote: 70 },
  j: { midiNote: 71 },
  k: { midiNote: 72 },
};

class KeyboardHammondInput {
  constructor(controller) {
    this.controller = controller;

    document.addEventListener(
      "keydown",
      (e) => {
        if (keyMap.hasOwnProperty(e.key)) {
          this.controller.playMidiNote(keyMap[e.key].midiNote);
        }
      },
      false
    );

    document.addEventListener(
      "keyup",
      (e) => {
        if (keyMap.hasOwnProperty(e.key)) {
          this.controller.stopMidiNote(keyMap[e.key].midiNote);
        }
      },
      false
    );
  }
}

export default KeyboardHammondInput;
