const audioContext = new AudioContext();
const mainGainNode = audioContext.createGain();
mainGainNode.connect(audioContext.destination);
mainGainNode.gain.value = 1.0;
let osc = null;

const aKey = document.getElementById("A");

const playTone = () => {
  console.log("Starting");
  if (osc !== null) {
    osc.stop();
  }

  osc = audioContext.createOscillator();
  osc.connect(mainGainNode);

  osc.type = "sine";

  osc.frequency.value = 220;
  osc.start();

  return osc;
};

const stopTone = () => {
  if (osc !== null) {
    osc.stop();
    osc = null;
  }
};

const handlePress = (e) => {
  switch (e.type) {
    case "mousedown":
      if (!event.buttons & 1) {
        return;
      }
      playTone();
      break;
    case "mouseup":
      stopTone();
      break;
  }
};

aKey.addEventListener("mousedown", handlePress);
aKey.addEventListener("mouseup", handlePress);
