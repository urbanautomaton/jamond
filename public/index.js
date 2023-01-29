const audioContext = new AudioContext();
const mainGainNode = audioContext.createGain();
mainGainNode.connect(audioContext.destination);
mainGainNode.gain.value = 1.0;
let note = null;

const playTone = (freq) => {
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

const handlePress = (e) => {
  switch (e.type) {
    case "mousedown":
      if (!event.buttons & 1) {
        return;
      }
      playTone(e.target.dataset.frequency);
      break;
    case "mouseup":
      stopTone();
      break;
  }
};

Array.from(document.querySelectorAll(".key")).map((key) => {
  key.addEventListener("mousedown", handlePress);
  key.addEventListener("mouseup", handlePress);
});
