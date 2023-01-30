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

const referenceNote = {
  octave: 4,
  letter: "A",
  frequency: 440,
};

const noteFrequency = ({ octave, letter }) => {
  const letterIndex = octaveNotes.indexOf(letter);
  const referenceIndex = octaveNotes.indexOf(referenceNote.letter);
  const twelveRootTwo = 2 ** (1 / 12);

  const noteOffset =
    (octave - referenceNote.octave) * 12 + letterIndex - referenceIndex;

  return referenceNote.frequency * twelveRootTwo ** noteOffset;
};

const eachNote = (from, to, cb) => {
  let { octave: fromOctave, letter: fromLetter } = from;
  let fromIndex = octaveNotes.indexOf(fromLetter);

  let { octave: toOctave, letter: toLetter } = to;
  let toIndex = octaveNotes.indexOf(toLetter);

  for (let o = fromOctave; o <= toOctave; o++) {
    let startIndex = o === fromOctave ? fromIndex : 0;
    let endIndex = o === toOctave ? toIndex : octaveNotes.length - 1;

    for (let i = startIndex; i <= endIndex; i++) {
      let letter = octaveNotes[i];

      cb({
        octave: o,
        letter,
        frequency: noteFrequency({ octave: o, letter }),
      });
    }
  }
};
