const MidiCommands = {
  NOTE_ON: 0x90,
  NOTE_OFF: 0x80,
};

class MidiHammondInput {
  constructor(synth) {
    this.synth = synth;
    this.midiAccess = null;

    if (navigator.requestMidiAccess === null) {
      console.log('MIDI input not supported by this browser.');
      return;
    }

    navigator.requestMIDIAccess({ sysex: true }).then(
      (midiAccess) => {
        this.midiAccess = midiAccess;
        this.midiAccess.inputs.forEach((entry) => {
          console.log('MIDI ready!');
          entry.onmidimessage = (event) => this.onMIDIMessage(event);
        });
      },
      (msg) => {
        console.error(`Failed to get MIDI access - ${msg}`);
      },
    );
  }

  onMIDIMessage(event) {
    let str = `MIDI message received at timestamp ${event.timeStamp}[${event.data.length} bytes]: `;
    const command = event.data[0];
    const note = event.data[1];
    const velocity = event.data[2] || 0;
    for (const character of event.data) {
      str += `0x${character.toString(16)} `;
    }
    console.log(str);

    switch (command) {
      case MidiCommands.NOTE_ON:
        if (velocity > 0) {
          this.synth.playMidiNote(note);
        } else {
          this.synth.stopMidiNote(note);
        }
        break;
      case MidiCommands.NOTE_OFF:
        this.synth.stopMidiNote(note);
        break;
    }
  }
}

export default MidiHammondInput;
