let audioContext = null;
let mainGainNode = null;
let note = null;

const playTone = (freq) => {
  if (audioContext === null) {
    audioContext = new AudioContext();
    mainGainNode = audioContext.createGain();
    mainGainNode.connect(audioContext.destination);
    mainGainNode.gain.value = 1.0;
  }

  if (note !== null) {
    note.osc.stop();
  }

  gainNode = audioContext.createGain();
  gainNode.connect(mainGainNode);
  gainNode.gain.value = 0;

  osc = audioContext.createOscillator();
  osc.connect(gainNode);
  osc.type = "sine";
  osc.frequency.value = freq;

  osc.start();
  gainNode.gain.setTargetAtTime(1.0, audioContext.currentTime, 0.005);

  note = { osc, gainNode };
};

const stopTone = () => {
  if (note !== null) {
    note.gainNode.gain.setTargetAtTime(0, audioContext.currentTime, 0.005);
    let osc = note.osc;
    setTimeout(() => {
      osc.stop();
    }, 100);
    note = null;
  }
};

const onKeyPress = (e) => {
  if (!(e.buttons & 1)) {
    return true;
  }

  if (e.currentTarget.dataset.frequency) {
    playTone(e.currentTarget.dataset.frequency);
  }

  e.preventDefault();
};

const onKeyRelease = (e) => {
  stopTone();
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
