## Tonewheels

Refs on the range and frequencies, derived from gearing and tooth count
http://www.goodeveca.net/RotorOrgan/ToneWheelSpec.html/

## Theory

Just vs equal temperament https://pages.mtu.edu/~suits/scales.html

Full freq table for equal-tempered (C0 to B8)
https://pages.mtu.edu/~suits/notefreq444.html

Calculating equal temperament freqs
https://en.wikipedia.org/wiki/12_equal_temperament#Calculating_absolute_frequencies

## References

* MDN simple synth example
  https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Simple_synth

## Keyboard

### Manuals

2x manuals

5 octaves on the manuals, from 65.38Hz (the lowest C) to 2092.31Hz (the
highest C)

NB: hmm, that top note doesn't quite match the 12 equal tempered scale,
which produces 2093.0. I'll worry about that later; we might need a
lookup table if the hammond isn't 12 equal temper.

aka C2 to C7. (inclusive)

Reference is A4 = 440Hz

https://electricdruid.net/technical-aspects-of-the-hammond-organ

Apparently there was some adjustment of how loud the harmonics were in
different ranges of the keyboard, e.g. at very high octaves it
emphasised the lower harmonics and de-emphasised the higher ones. This
was called "manual tapering" and is documented a bit here:
http://www.dairiki.org/HammondWiki/ManualTapering

roto attempted to implement this (in latest branch it's not plugged in
though) https://github.com/pteichman/roto/blob/master/manual.cpp#L96-L98

### Pedalboard

Most console Hammond pedalboards have 25 notes, with the bottom note a
low C and the top note a middle C two octaves higher

https://en.wikipedia.org/wiki/Hammond_organ

### Drawbars

Top drawbar is disabled and repurposed(?) when the percussion option is
enabled https://youtu.be/FqPMb8QOQZ0?t=594

some more technical notes on the drawbars:
http://www.quadibloc.com/other/mus06.htm

## Display

pretty nice keyboard CSS https://codepen.io/zastrow/pen/kxdYdk
