const clampValue = (value) => Math.min(Math.max(value, 0), 8);

const buildDrawBar = (container) => {
  const scroller = document.createElement("div");
  scroller.classList.add("drawbar-scroller");
  container.appendChild(scroller);

  const track = document.createElement("div");
  track.classList.add("drawbar-track");
  scroller.appendChild(track);

  const thumb = document.createElement("div");
  thumb.classList.add("drawbar-thumb");
  scroller.appendChild(thumb);

  for (var i = 0; i < 8; i++) {
    const segment = document.createElement("div");
    segment.classList.add("drawbar-track-segment");
    segment.innerText = 8 - i;
    track.appendChild(segment);
  }
};

class Drawbar {
  constructor(container) {
    this.container = container;
    buildDrawBar(container);
    this.segmentHeight = container
      .querySelector(".drawbar-track-segment")
      .getBoundingClientRect().height;
    this.value = 8;
    this.dragging = false;
    this.container.addEventListener("mousedown", (e) => this.startDrag(e));
    this.container.addEventListener("mousemove", (e) => this.move(e));
    this.container.addEventListener("mouseleave", (e) => this.stopDrag(e));
    this.container.addEventListener("mouseup", (e) => this.stopDrag(e));
  }

  startDrag(e) {
    if (!(e.buttons & 1)) {
      return true;
    }

    this.dragging = true;
    this.startY = e.pageY;
    this.startValue = this.value;
    this.container.classList.add("dragging");
  }

  stopDrag(e) {
    this.dragging = false;
    this.startY = null;
    this.startValue = null;
    this.container.classList.remove("dragging");
  }

  move(e) {
    if (!this.dragging) {
      return;
    }

    const pixelsMoved = this.startY - e.pageY;
    const newValue = clampValue(
      this.startValue - Math.floor(pixelsMoved / this.segmentHeight)
    );

    if (newValue !== this.value) {
      this.setValue(newValue);
    }
  }

  setValue(value) {
    this.value = clampValue(value);

    this.container.scrollTo({
      top: Math.ceil((8 - this.value) * this.segmentHeight),
      behaviour: "instant",
    });
  }
}

document.querySelectorAll(".drawbar").forEach((el) => new Drawbar(el));
// new Drawbar(document.querySelector(".drawbar"));
