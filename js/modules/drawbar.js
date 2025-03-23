const clampValue = (value) => Math.min(Math.max(value, 0), 8);

const buildDrawBar = (container, label) => {
  const scroller = document.createElement('div');
  scroller.classList.add('drawbar-scroller');
  container.appendChild(scroller);

  const track = document.createElement('div');
  track.classList.add('drawbar-track');
  scroller.appendChild(track);

  const thumb = document.createElement('div');
  thumb.classList.add('drawbar-thumb');
  thumb.innerText = label;
  scroller.appendChild(thumb);

  for (var i = 0; i < 8; i++) {
    const segment = document.createElement('div');
    segment.classList.add('drawbar-track-segment');
    segment.innerText = 8 - i;
    track.appendChild(segment);
  }
};

class Drawbar {
  constructor(container, label, index, synth) {
    buildDrawBar(container, label);

    container.addEventListener('mousedown', (e) => this.startDrag(e));
    container.addEventListener('mousemove', (e) => this.move(e));
    container.addEventListener('mouseleave', (e) => this.stopDrag(e));
    container.addEventListener('mouseup', (e) => this.stopDrag(e));

    this.container = container;
    this.dragging = false;
    this.index = index;
    this.synth = synth;

    window.setTimeout(() => {
      this.segmentHeight = container
        .querySelector('.drawbar-track-segment')
        .getBoundingClientRect().height;
      this.scrollToCurrentValue();
    }, 0);

    this.synth.on('setdrawbar', ({ index, value }) => {
      if (this.index === index) {
        this.value = value;
        this.scrollToCurrentValue();
      }
    });
  }

  scrollToCurrentValue() {
    if (this.segmentHeight) {
      this.container.scrollTo({
        top: Math.ceil((8 - this.value) * this.segmentHeight),
        behaviour: 'instant',
      });
    }
  }

  startDrag(e) {
    if (!(e.buttons & 1)) {
      return true;
    }

    this.dragging = true;
    this.startY = e.pageY;
    this.startValue = this.value;
    this.container.classList.add('dragging');
  }

  stopDrag(e) {
    this.dragging = false;
    this.startY = null;
    this.startValue = null;
    this.container.classList.remove('dragging');
  }

  move(e) {
    if (!this.dragging) {
      return;
    }

    const pixelsMoved = this.startY - e.pageY;
    const newValue = clampValue(this.startValue - Math.floor(pixelsMoved / this.segmentHeight));

    if (newValue !== this.value) {
      this.setValue(newValue);
    }
  }

  setValue(value) {
    this.value = clampValue(value);
    this.container.dataset.value = this.value;
    this.synth.setDrawbar(this.index, this.value);
  }
}

export default Drawbar;
