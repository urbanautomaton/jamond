const ToneWheels = [
  { midiNote: 24, octave: 1, name: 'C', frequency: 32.692 },
  { midiNote: 25, octave: 1, name: 'C#', frequency: 34.634 },
  { midiNote: 26, octave: 1, name: 'D', frequency: 36.712 },
  { midiNote: 27, octave: 1, name: 'D#', frequency: 38.889 },
  { midiNote: 28, octave: 1, name: 'E', frequency: 41.2 },
  { midiNote: 29, octave: 1, name: 'F', frequency: 43.636 },
  { midiNote: 30, octave: 1, name: 'F#', frequency: 46.25 },
  { midiNote: 31, octave: 1, name: 'G', frequency: 49.0 },
  { midiNote: 32, octave: 1, name: 'G#', frequency: 51.892 },
  { midiNote: 33, octave: 1, name: 'A', frequency: 55.0 },
  { midiNote: 34, octave: 1, name: 'A#', frequency: 58.261 },
  { midiNote: 35, octave: 1, name: 'B', frequency: 61.714 },
  { midiNote: 36, octave: 2, name: 'C', frequency: 65.385 },
  { midiNote: 37, octave: 2, name: 'C#', frequency: 69.268 },
  { midiNote: 38, octave: 2, name: 'D', frequency: 73.425 },
  { midiNote: 39, octave: 2, name: 'D#', frequency: 77.778 },
  { midiNote: 40, octave: 2, name: 'E', frequency: 82.4 },
  { midiNote: 41, octave: 2, name: 'F', frequency: 87.273 },
  { midiNote: 42, octave: 2, name: 'F#', frequency: 92.5 },
  { midiNote: 43, octave: 2, name: 'G', frequency: 98.0 },
  { midiNote: 44, octave: 2, name: 'G#', frequency: 103.784 },
  { midiNote: 45, octave: 2, name: 'A', frequency: 110.0 },
  { midiNote: 46, octave: 2, name: 'A#', frequency: 116.522 },
  { midiNote: 47, octave: 2, name: 'B', frequency: 123.429 },
  { midiNote: 48, octave: 3, name: 'C', frequency: 130.769 },
  { midiNote: 49, octave: 3, name: 'C#', frequency: 138.537 },
  { midiNote: 50, octave: 3, name: 'D', frequency: 146.849 },
  { midiNote: 51, octave: 3, name: 'D#', frequency: 155.556 },
  { midiNote: 52, octave: 3, name: 'E', frequency: 164.8 },
  { midiNote: 53, octave: 3, name: 'F', frequency: 174.545 },
  { midiNote: 54, octave: 3, name: 'F#', frequency: 185.0 },
  { midiNote: 55, octave: 3, name: 'G', frequency: 196.0 },
  { midiNote: 56, octave: 3, name: 'G#', frequency: 207.568 },
  { midiNote: 57, octave: 3, name: 'A', frequency: 220.0 },
  { midiNote: 58, octave: 3, name: 'A#', frequency: 233.043 },
  { midiNote: 59, octave: 3, name: 'B', frequency: 246.857 },
  { midiNote: 60, octave: 4, name: 'C', frequency: 261.538 },
  { midiNote: 61, octave: 4, name: 'C#', frequency: 277.073 },
  { midiNote: 62, octave: 4, name: 'D', frequency: 293.699 },
  { midiNote: 63, octave: 4, name: 'D#', frequency: 311.111 },
  { midiNote: 64, octave: 4, name: 'E', frequency: 329.6 },
  { midiNote: 65, octave: 4, name: 'F', frequency: 349.091 },
  { midiNote: 66, octave: 4, name: 'F#', frequency: 370.0 },
  { midiNote: 67, octave: 4, name: 'G', frequency: 392.0 },
  { midiNote: 68, octave: 4, name: 'G#', frequency: 415.135 },
  { midiNote: 69, octave: 4, name: 'A', frequency: 440.0 },
  { midiNote: 70, octave: 4, name: 'A#', frequency: 466.087 },
  { midiNote: 71, octave: 4, name: 'B', frequency: 493.714 },
  { midiNote: 72, octave: 5, name: 'C', frequency: 523.077 },
  { midiNote: 73, octave: 5, name: 'C#', frequency: 554.146 },
  { midiNote: 74, octave: 5, name: 'D', frequency: 587.397 },
  { midiNote: 75, octave: 5, name: 'D#', frequency: 622.222 },
  { midiNote: 76, octave: 5, name: 'E', frequency: 659.2 },
  { midiNote: 77, octave: 5, name: 'F', frequency: 698.182 },
  { midiNote: 78, octave: 5, name: 'F#', frequency: 740.0 },
  { midiNote: 79, octave: 5, name: 'G', frequency: 784.0 },
  { midiNote: 80, octave: 5, name: 'G#', frequency: 830.27 },
  { midiNote: 81, octave: 5, name: 'A', frequency: 880.0 },
  { midiNote: 82, octave: 5, name: 'A#', frequency: 932.174 },
  { midiNote: 83, octave: 5, name: 'B', frequency: 987.429 },
  { midiNote: 84, octave: 6, name: 'C', frequency: 1046.154 },
  { midiNote: 85, octave: 6, name: 'C#', frequency: 1108.293 },
  { midiNote: 86, octave: 6, name: 'D', frequency: 1174.795 },
  { midiNote: 87, octave: 6, name: 'D#', frequency: 1244.444 },
  { midiNote: 88, octave: 6, name: 'E', frequency: 1318.4 },
  { midiNote: 89, octave: 6, name: 'F', frequency: 1396.364 },
  { midiNote: 90, octave: 6, name: 'F#', frequency: 1480.0 },
  { midiNote: 91, octave: 6, name: 'G', frequency: 1568.0 },
  { midiNote: 92, octave: 6, name: 'G#', frequency: 1660.541 },
  { midiNote: 93, octave: 6, name: 'A', frequency: 1760.0 },
  { midiNote: 94, octave: 6, name: 'A#', frequency: 1864.348 },
  { midiNote: 95, octave: 6, name: 'B', frequency: 1974.857 },
  { midiNote: 96, octave: 7, name: 'C', frequency: 2092.308 },
  { midiNote: 97, octave: 7, name: 'C#', frequency: 2216.585 },
  { midiNote: 98, octave: 7, name: 'D', frequency: 2349.589 },
  { midiNote: 99, octave: 7, name: 'D#', frequency: 2488.889 },
  { midiNote: 100, octave: 7, name: 'E', frequency: 2636.8 },
  { midiNote: 101, octave: 7, name: 'F', frequency: 2792.727 },
  { midiNote: 102, octave: 7, name: 'F#', frequency: 2960.0 },
  { midiNote: 103, octave: 7, name: 'G', frequency: 3136.0 },
  { midiNote: 104, octave: 7, name: 'G#', frequency: 3321.081 },
  { midiNote: 105, octave: 7, name: 'A', frequency: 3520.0 },
  { midiNote: 106, octave: 7, name: 'A#', frequency: 3728.696 },
  { midiNote: 107, octave: 7, name: 'B', frequency: 3949.714 },
  // The following tone wheels are not exact octaves of their lower
  // equivalents
  { midiNote: 108, octave: 8, name: 'C', frequency: 4189.091 },
  { midiNote: 109, octave: 8, name: 'C#', frequency: 4440.0 },
  { midiNote: 110, octave: 8, name: 'D', frequency: 4704.0 },
  { midiNote: 111, octave: 8, name: 'D#', frequency: 4981.622 },
  { midiNote: 112, octave: 8, name: 'E', frequency: 5280.0 },
  { midiNote: 113, octave: 8, name: 'F', frequency: 5593.043 },
  { midiNote: 114, octave: 8, name: 'F#', frequency: 5924.571 },
];

const ManualKeys = ToneWheels.slice(12, 73);

const Drawbars = [
  { label: "16'", offset: -12, color: 'brown' },
  { label: "5⅓'", offset: 7, color: 'brown' },
  { label: "8'", offset: 0, color: 'white' },
  { label: "4'", offset: 12, color: 'white' },
  { label: "2⅔'", offset: 19, color: 'black' },
  { label: "2'", offset: 24, color: 'white' },
  { label: "1⅗'", offset: 28, color: 'black' },
  { label: "1⅓'", offset: 31, color: 'black' },
  { label: "1'", offset: 36, color: 'white' },
];

const VibratoModes = ['V-1', 'V-2', 'V-3', 'C-1', 'C-2', 'C-3'];

const isManualKey = (midiNote) => midiNote >= 36 && midiNote <= 96;

export { ToneWheels, ManualKeys, Drawbars, VibratoModes, isManualKey };
