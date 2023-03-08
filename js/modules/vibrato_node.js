const MAX_DELAY_SEC = 0.0005;
const VIBRATO_PACE_HZ = 412 / 60;

class VibratoNode extends DelayNode {
  constructor(audioContext) {
    super(audioContext, {
      delayTime: MAX_DELAY_SEC / 2,
      maxDelayTime: MAX_DELAY_SEC,
    });

    this.vibratoAmplitude = new GainNode(audioContext, {
      gain: MAX_DELAY_SEC / 2,
    });
    this.vibratoAmplitude.connect(this.delayTime);

    this.vibratoLFO = new OscillatorNode(audioContext, {
      frequency: VIBRATO_PACE_HZ,
    });
    this.vibratoLFO.connect(this.vibratoAmplitude);
    this.vibratoLFO.start();
  }
}

export default VibratoNode;
