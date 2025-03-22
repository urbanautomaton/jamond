const LATCH_DELAY_MS = 50;

class PercussionLatch {
  constructor() {
    this.latchTimeoutId = null;
    this.latched = false;
  }

  try(cb) {
    if (!this.latched) {
      this.latchTimeoutId = window.setTimeout(() => (this.latched = true), LATCH_DELAY_MS);

      cb();
    }
  }

  release() {
    if (this.latchTimeoutId) {
      clearTimeout(this.latchTimeoutId);
      this.latchTimeoutId = null;
    }

    this.latched = false;
  }
}

export default PercussionLatch;
