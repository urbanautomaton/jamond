const MAX_DELAY_SEC = 0.0005;
const VIBRATO_PACE_HZ = 412 / 60;

class VibratoNode extends GainNode {
  constructor(audioContext) {
    super(audioContext, { gain: 1 });

    this.delayNode = new DelayNode(audioContext, {
      delayTime: MAX_DELAY_SEC / 2,
      maxDelayTime: MAX_DELAY_SEC,
    });

    const vibratoAmplitude = new GainNode(audioContext, {
      gain: MAX_DELAY_SEC / 2,
    });
    vibratoAmplitude.connect(this.delayNode.delayTime);

    const vibratoLFO = new OscillatorNode(audioContext, {
      frequency: VIBRATO_PACE_HZ,
    });
    vibratoLFO.connect(vibratoAmplitude);
    vibratoLFO.start();

    this.connect(this.delayNode);

    this.connect = (destination) => {
      return this.delayNode.connect(destination);
    };
  }
}

export default VibratoNode;
