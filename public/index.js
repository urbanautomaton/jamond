class Hammond {
  constructor() {
    this.audioContext = null;
    this.mainGainNode = null;
    this.note = null;
  }

  setup() {
    if (this.audioContext === null) {
      this.audioContext = new AudioContext();
      this.mainGainNode = this.audioContext.createGain();
      this.mainGainNode.connect(this.audioContext.destination);
      this.mainGainNode.gain.value = 1.0;
    }
  }

  playTone(freq) {
    this.setup();

    if (this.note !== null) {
      this.note.osc.stop();
    }

    const gainNode = this.audioContext.createGain();
    gainNode.connect(this.mainGainNode);
    gainNode.gain.value = 0;

    const osc = this.audioContext.createOscillator();
    osc.connect(gainNode);
    osc.type = "sine";
    osc.frequency.value = freq;

    osc.start();
    gainNode.gain.setTargetAtTime(1.0, this.audioContext.currentTime, 0.005);

    this.note = { osc, gainNode };
  }

  stopTone() {
    this.setup();

    if (this.note !== null) {
      this.note.gainNode.gain.setTargetAtTime(
        0,
        this.audioContext.currentTime,
        0.005
      );
      let osc = this.note.osc;
      setTimeout(() => {
        osc.stop();
      }, 100);
      this.note = null;
    }
  }
}

const hammond = new Hammond();

const onKeyPress = (e) => {
  if (!(e.buttons & 1)) {
    return true;
  }

  if (e.currentTarget.dataset.frequency) {
    hammond.playTone(e.currentTarget.dataset.frequency);
  }

  e.preventDefault();
};

const onKeyRelease = (e) => {
  hammond.stopTone();
};

const keyboard = document.getElementById("keyboard");

eachNote(
  { octave: 2, letter: "C" },
  { octave: 7, letter: "C" },
  ({ octave, letter, frequency }) => {
    const keyElement = document.createElement("div");
    const labelElement = document.createElement("div");

    keyElement.className = `key ${letter.length > 1 && "black"}`;
    Object.assign(keyElement.dataset, { octave, letter, frequency });

    labelElement.innerHTML = `${letter}<sub>${octave}</sub>`;
    keyElement.appendChild(labelElement);

    keyElement.addEventListener("mousedown", onKeyPress, false);
    keyElement.addEventListener("mouseenter", onKeyPress, false);
    keyElement.addEventListener("mouseup", onKeyRelease, false);
    keyElement.addEventListener("mouseleave", onKeyRelease, false);

    keyboard.appendChild(keyElement);
  }
);
