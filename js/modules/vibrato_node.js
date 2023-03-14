import { VibratoModes } from "./definitions.js";

const MAX_DELAY_SEC = 0.001;
const VIBRATO_PACE_HZ = 412 / 60;

class VibratoNode extends GainNode {
  constructor(audioContext) {
    super(audioContext, { gain: 1 });

    this.chorusGain = new GainNode(audioContext, { gain: 0.5 });
    this.connect(this.chorusGain);

    const delayNode = new DelayNode(audioContext, {
      delayTime: MAX_DELAY_SEC / 2,
      maxDelayTime: MAX_DELAY_SEC,
    });

    this.vibratoAmplitude = new GainNode(audioContext, {
      gain: MAX_DELAY_SEC / 2,
    });
    this.vibratoAmplitude.connect(delayNode.delayTime);

    const vibratoLFO = new OscillatorNode(audioContext, {
      frequency: VIBRATO_PACE_HZ,
    });
    vibratoLFO.connect(this.vibratoAmplitude);
    vibratoLFO.start();

    this.connect(delayNode);
    this.vibratoGain = new GainNode(audioContext, { gain: 0.5 });
    delayNode.connect(this.vibratoGain);

    this.connect = (destination) => {
      this.chorusGain.connect(destination);
      this.vibratoGain.connect(destination);

      return destination;
    };
  }

  setMode(mode) {
    if (!VibratoModes.includes(mode)) {
      throw new Error(`Invalid vibrato mode: ${mode}`);
    }

    let modeType, level;
    [modeType, level] = mode.split("-");

    if (modeType === "V") {
      // Vibrato only
      this.chorusGain.gain.value = 0;
      this.vibratoGain.gain.value = 1;
    } else {
      // Vibrato + chorus
      this.chorusGain.gain.value = 0.5;
      this.vibratoGain.gain.value = 0.5;
    }

    this.vibratoAmplitude.gain.value =
      (parseInt(level) / 3) * (MAX_DELAY_SEC / 2);
  }
}

export default VibratoNode;
