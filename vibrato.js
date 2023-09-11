let ctx = new AudioContext();

let source = new OscillatorNode(ctx, { frequency: 440 });
let delay = new DelayNode(ctx, { delayTime: 1, maxDelayTime: 10 });
let LFOgain = new GainNode(ctx, { gain: 0 });
let LFO = new OscillatorNode(ctx, { frequency: 2 });

LFO.start();
source.connect(delay);
LFO.connect(LFOgain).connect(delay.delayTime);
delay.connect(ctx.destination);
source.start();

function Update() {
  LFO.frequency.value = LFO_F.value;
  LFOgain.gain.value = Depth.value / (2 * Math.PI * LFO_F.value);

  document.querySelector("input#Depth + span").innerText = LFOgain.gain.value;
  document.querySelector("input#LFO_F + span").innerText = LFO.frequency.value;
}
