import "bootstrap";
import $ from "jquery";
import barba from "@barba/core";
import prefetch from "@barba/prefetch";
import anime from "animejs";

import { MagicMouseCursor } from "../components/magic-mouse-cursor/magic-mouse-cursor";
import { SmoothScroll } from "../components/smooth-scroll/smooth-scroll";
import { colorscheme } from "../data/colorscheme";

console.log(
  "%c🔧 with ❤️ by Cyberloop",
  `font-size: 10px; font-weight: bold; color:${colorscheme.defaultForeground}; background-color:${colorscheme.primary}; padding:5px; border-radius:4px;`
);

$(document).ready(() => {
  // Enable Magic Mouse Cursor
  const mouse = new MagicMouseCursor({
    hover: {
      "a,button,input": {
        outerCursor: ["disable", "square"],
        innerCursor: ["highlight"],
      },
    },
  });
  mouse.enable();
});

const scroll = new SmoothScroll();

barba.use(prefetch);
barba.init({
  transitions: [
    {
      name: "default-transition",
      once({ next }) {
        scroll.create(next.container);
      },
      beforeEnter() {
        scroll.recreate(next.container);
      },
      after() {
        scroll.initialize();
      },
      leave(data) {
        return anime({
          targets: data.current.container,
          duration: 100,
          opacity: 0,
        }).finished;
      },
      enter(data) {
        return anime({
          targets: data.current.container,
          duration: 100,
          opacity: 1,
        }).finished;
      },
    },
  ],
});
