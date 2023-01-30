const octaveNotes = [
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

const eachNote = (from, to, cb) => {
  let { octave: fromOctave, key: fromKey } = from;
  let fromIndex = octaveNotes.indexOf(fromKey);

  let { octave: toOctave, key: toKey } = to;
  let toIndex = octaveNotes.indexOf(toKey);

  for (let o = fromOctave; o <= toOctave; o++) {
    let startIndex = o === fromOctave ? fromIndex : 0;
    let endIndex = o === toOctave ? toIndex : octaveNotes.length - 1;

    for (let i = startIndex; i <= endIndex; i++) {
      let key = octaveNotes[i];

      cb({ octave: o, key });
    }
  }
};
