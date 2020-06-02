import LocomotiveScroll from "locomotive-scroll";

class SmoothScroll {
  constructor() {
    this.scroll = null;
  }

  create(container) {
    this.scroll = new LocomotiveScroll({
      el: container.querySelector("[data-scroll-container]"),
      smooth: true,
    });
  }

  destroy() {
    if (this.scroll) {
      this.scroll.destroy();
    }
  }

  initialize() {
    if (this.scroll) {
      this.scroll.init();
    }
  }

  recreate(container) {
    this.destroy();
    this.create(container);
  }
}

export { SmoothScroll };
