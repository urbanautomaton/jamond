const scrollIncrement = document
  .querySelector(".drawbar-track-segment")
  .getBoundingClientRect().height;

let stop = 0;

const move = () => {
  stop = (stop + 1) % 9;
  document
    .querySelector(".drawbar-container")
    .scrollTo({ top: stop * scrollIncrement, behaviour: "instant" });
  window.setTimeout(() => {
    move();
  }, 1000);
};

move();
