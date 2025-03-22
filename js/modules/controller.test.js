import Controller, { ControllerEvents } from './controller.js';

QUnit.module('Controller', () => {
  let controller;

  QUnit.testStart(() => {
    controller = new Controller();
  });

  QUnit.module('event handlers', () => {
    QUnit.test('registering a handler', (assert) => {
      let fired = false;
      controller.on(ControllerEvents.PLAY_MIDI_NOTE, () => {
        fired = true;
      });

      controller.trigger(ControllerEvents.PLAY_MIDI_NOTE);

      QUnit.assert.true(fired, 'event fired');
    });
  });
});
