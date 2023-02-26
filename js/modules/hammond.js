const octaveKeys = [
  "C",
  "C#",
  "D",
  "D#",
  "E",
  "F",
  "F#",
  "G",
  "G#",
  "A",
  "A#",
  "B",
];

const toneWheels = [
  { octave: 1, tone: "C", frequency: 32.692 },
  { octave: 1, tone: "C#", frequency: 34.634 },
  { octave: 1, tone: "D", frequency: 36.712 },
  { octave: 1, tone: "D#", frequency: 38.889 },
  { octave: 1, tone: "E", frequency: 41.2 },
  { octave: 1, tone: "F", frequency: 43.636 },
  { octave: 1, tone: "F#", frequency: 46.25 },
  { octave: 1, tone: "G", frequency: 49.0 },
  { octave: 1, tone: "G#", frequency: 51.892 },
  { octave: 1, tone: "A", frequency: 55.0 },
  { octave: 1, tone: "A#", frequency: 58.261 },
  { octave: 1, tone: "B", frequency: 61.714 },
  { octave: 2, tone: "C", frequency: 65.385 },
  { octave: 2, tone: "C#", frequency: 69.268 },
  { octave: 2, tone: "D", frequency: 73.425 },
  { octave: 2, tone: "D#", frequency: 77.778 },
  { octave: 2, tone: "E", frequency: 82.4 },
  { octave: 2, tone: "F", frequency: 87.273 },
  { octave: 2, tone: "F#", frequency: 92.5 },
  { octave: 2, tone: "G", frequency: 98.0 },
  { octave: 2, tone: "G#", frequency: 103.784 },
  { octave: 2, tone: "A", frequency: 110.0 },
  { octave: 2, tone: "A#", frequency: 116.522 },
  { octave: 2, tone: "B", frequency: 123.429 },
  { octave: 3, tone: "C", frequency: 130.769 },
  { octave: 3, tone: "C#", frequency: 138.537 },
  { octave: 3, tone: "D", frequency: 146.849 },
  { octave: 3, tone: "D#", frequency: 155.556 },
  { octave: 3, tone: "E", frequency: 164.8 },
  { octave: 3, tone: "F", frequency: 174.545 },
  { octave: 3, tone: "F#", frequency: 185.0 },
  { octave: 3, tone: "G", frequency: 196.0 },
  { octave: 3, tone: "G#", frequency: 207.568 },
  { octave: 3, tone: "A", frequency: 220.0 },
  { octave: 3, tone: "A#", frequency: 233.043 },
  { octave: 3, tone: "B", frequency: 246.857 },
  { octave: 4, tone: "C", frequency: 261.538 },
  { octave: 4, tone: "C#", frequency: 277.073 },
  { octave: 4, tone: "D", frequency: 293.699 },
  { octave: 4, tone: "D#", frequency: 311.111 },
  { octave: 4, tone: "E", frequency: 329.6 },
  { octave: 4, tone: "F", frequency: 349.091 },
  { octave: 4, tone: "F#", frequency: 370.0 },
  { octave: 4, tone: "G", frequency: 392.0 },
  { octave: 4, tone: "G#", frequency: 415.135 },
  { octave: 4, tone: "A", frequency: 440.0 },
  { octave: 4, tone: "A#", frequency: 466.087 },
  { octave: 4, tone: "B", frequency: 493.714 },
  { octave: 5, tone: "C", frequency: 523.077 },
  { octave: 5, tone: "C#", frequency: 554.146 },
  { octave: 5, tone: "D", frequency: 587.397 },
  { octave: 5, tone: "D#", frequency: 622.222 },
  { octave: 5, tone: "E", frequency: 659.2 },
  { octave: 5, tone: "F", frequency: 698.182 },
  { octave: 5, tone: "F#", frequency: 740.0 },
  { octave: 5, tone: "G", frequency: 784.0 },
  { octave: 5, tone: "G#", frequency: 830.27 },
  { octave: 5, tone: "A", frequency: 880.0 },
  { octave: 5, tone: "A#", frequency: 932.174 },
  { octave: 5, tone: "B", frequency: 987.429 },
  { octave: 6, tone: "C", frequency: 1046.154 },
  { octave: 6, tone: "C#", frequency: 1108.293 },
  { octave: 6, tone: "D", frequency: 1174.795 },
  { octave: 6, tone: "D#", frequency: 1244.444 },
  { octave: 6, tone: "E", frequency: 1318.4 },
  { octave: 6, tone: "F", frequency: 1396.364 },
  { octave: 6, tone: "F#", frequency: 1480.0 },
  { octave: 6, tone: "G", frequency: 1568.0 },
  { octave: 6, tone: "G#", frequency: 1660.541 },
  { octave: 6, tone: "A", frequency: 1760.0 },
  { octave: 6, tone: "A#", frequency: 1864.348 },
  { octave: 6, tone: "B", frequency: 1974.857 },
  { octave: 7, tone: "C", frequency: 2092.308 },
  { octave: 7, tone: "C#", frequency: 2216.585 },
  { octave: 7, tone: "D", frequency: 2349.589 },
  { octave: 7, tone: "D#", frequency: 2488.889 },
  { octave: 7, tone: "E", frequency: 2636.8 },
  { octave: 7, tone: "F", frequency: 2792.727 },
  { octave: 7, tone: "F#", frequency: 2960.0 },
  { octave: 7, tone: "G", frequency: 3136.0 },
  { octave: 7, tone: "G#", frequency: 3321.081 },
  { octave: 7, tone: "A", frequency: 3520.0 },
  { octave: 7, tone: "A#", frequency: 3728.696 },
  { octave: 7, tone: "B", frequency: 3949.714 },
  // The following tone wheels are not exact octaves of their lower
  // equivalents
  { octave: 8, tone: "C", frequency: 4189.091 },
  { octave: 8, tone: "C#", frequency: 4440.0 },
  { octave: 8, tone: "D", frequency: 4704.0 },
  { octave: 8, tone: "D#", frequency: 4981.622 },
  { octave: 8, tone: "E", frequency: 5280.0 },
  { octave: 8, tone: "F", frequency: 5593.043 },
  { octave: 8, tone: "F#", frequency: 5924.571 },
];

class Hammond {
  constructor() {
    this.audioContext = null;
    this.mainGainNode = null;
    this.keysPressed = new Set();
  }

  setup() {
    if (this.audioContext === null) {
      this.audioContext = new AudioContext();
      this.mainGainNode = this.audioContext.createGain();
      this.mainGainNode.connect(this.audioContext.destination);
      this.mainGainNode.gain.value = 0.5;

      toneWheels.forEach((toneWheel) => {
        const gainNode = this.audioContext.createGain();
        gainNode.connect(this.mainGainNode);
        gainNode.gain.value = 0;

        const osc = this.audioContext.createOscillator();
        osc.connect(gainNode);
        osc.type = "sine";
        osc.frequency.value = toneWheel.frequency;
        osc.start();

        toneWheel.osc = osc;
        toneWheel.gainNode = gainNode;
      });
    }
  }

  updateGains() {
    const gains = {};

    this.keysPressed.forEach((keyIndex) => {
      gains[keyIndex] = 1.0;
    });

    toneWheels.forEach(({ gainNode }, index) => {
      const gain = gains[index] || 0.0;

      gainNode.gain.setTargetAtTime(gain, this.audioContext.currentTime, 0.01);
    });
  }

  keyIndex({ octave, key }) {
    return (octave - 1) * 12 + octaveKeys.indexOf(key);
  }

  keyDown({ octave, key }) {
    this.setup();

    this.keysPressed.add(this.keyIndex({ octave, key }));

    this.updateGains();
  }

  keyUp({ octave, key }) {
    if (this.keysPressed.size === 0) {
      return;
    }

    this.setup();

    this.keysPressed.delete(this.keyIndex({ octave, key }));

    this.updateGains();
  }

  eachManualKey(cb) {
    for (let i = 12; i <= 72; i++) {
      const { octave, tone: key } = toneWheels[i];
      cb({ octave, key });
    }
  }
}

export default Hammond;
