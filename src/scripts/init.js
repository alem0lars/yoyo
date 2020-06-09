import "bootstrap";
import $ from "jquery";
import barba from "@barba/core";
import prefetch from "@barba/prefetch";
import anime from "animejs";
import "particles.js";

import { cartesianProductForCSSSelectors as cprodcss } from "./common/utils";
import { normalButtons, outlineButtons } from "./common/twbs";
import { NotFoundView } from "./views/not-found/view";

import { MagicMouseCursor } from "../components/magic-mouse-cursor/magic-mouse-cursor";
import { SmoothScroll } from "../components/smooth-scroll/smooth-scroll";
import { colorscheme } from "../data/colorscheme";
import { initialConsoleLog } from "../data/website";

console.log(
  initialConsoleLog,
  `font-weight: bold; color:${colorscheme.defaultForeground}; background-color:${colorscheme.primary}; padding:5px; border-radius:4px;`
);

// const mouseCursor = new MagicMouseCursor({
//   hover: {
//     [cprodcss(["a", "button", "input"], [":not(.btn)"])]: {
//       outerCursor: ["disable"],
//       innerCursor: ["highlight"],
//     },
//     [cprodcss(["a", "button", "input"], [".btn"], normalButtons)]: {
//       outerCursor: ["square"],
//     },
//     [cprodcss(["a", "button", "input"], [".btn"], outlineButtons)]: {
//       outerCursor: ["square", "highlight"],
//     },
//   },
// });

const scroll = new SmoothScroll();

// Enable Magic Mouse Cursor
// $(document).ready(() => mouseCursor.enable());

// Enable BarbaJS
barba.use(prefetch);
barba.init({
  debug: true,
  views: [new NotFoundView()],
  transitions: [
    {
      name: "default-transition",
      once({ next }) {
        console.log("once");
        scroll.create(next.container);
      },
      beforeLeave() {
        console.log("beforeLeave");
        scroll.scroll.stop();
      },
      beforeEnter({ next }) {
        console.log("beforeEnter");
        scroll.recreate(next.container);
      },
      after() {
        console.log("after");
        scroll.initialize();
        scroll.scroll.update();
        scroll.scroll.start();
        // mouseCursor.refresh();
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
