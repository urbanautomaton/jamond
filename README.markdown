# Jamónd

This is a hobby project attempting to implement a Hammond organ
synthesiser (and eventually Leslie speaker, too) in the browser using
WebAudio.

You can [play with the current version
here](https://urbanautomaton.github.io/jamond).

If you have a MIDI controller of some sort plugged in, it'll probably
work for playing notes. Otherwise you can click on the screen, or on a
qwerty keyboard a-k for C4-C5 with w-e and t-u as semitones will work
too.

I've not tried to make this work in anything other than latest Chrome.
It seems to somewhat work in Firefox, but I think its Web MIDI support
involves a plugin that I haven't tried.

## Approach

I'm trying to do this completely without dependencies or a build step of
any kind, because this is supposed to be fun and I find build
tools extraordinarily un-fun.

Thanks to browser-native module loading, so far the only real things I
miss are:

* TypeScript
* Tests

But then again it's only tiny still.

I plan (when I'm very bored) to have a go at frameworkless in-browser
testing [along these
lines](https://alexwlchan.net/2023/testing-javascript-without-a-framework/).

## Desiderata

Big ol list o' features:

### Synthesiser

- [x] Plays a tone
- [x] Plays fully-voiced tones (all stops pulled out)
- [x] Full polyphony
- [ ] Percussion
- [ ] Chorus
- [ ] Vibrato
- [ ] [Drawbar foldback](https://electricdruid.net/index.php?page=info.hammond#foldback)
- [ ] Accurate tonewheel waveforms (lower wheels are closer to square waves)
- [ ] [Harmonic leakage](https://electricdruid.net/index.php?page=info.hammond#leakage)

### UI

- [ ] Browser input
  - [x] Single manual
  - [x] Drawbars
  - [ ] Two manuals with drawbars
  - [ ] On/off switch (oooh)
- [x] Computer keyboard input
- [ ] MIDI input
  - [x] Keyboard support
  - [ ] Drawbar mapping
  - [ ] Octave switching (I don't know how to use [my controller](https://www.akaipro.com/mpk-mini-mkii) yet)

### Leslie

TODO
