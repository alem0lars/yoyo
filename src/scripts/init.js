import "bootstrap";
import $ from "jquery";
import barba from "@barba/core";
import prefetch from "@barba/prefetch";
import anime from "animejs";
import "particles.js";

import { NotFoundView } from "./views/not-found/view";

import { MagicMouseCursor } from "../components/magic-mouse-cursor/magic-mouse-cursor";
import { SmoothScroll } from "../components/smooth-scroll/smooth-scroll";
import { colorscheme } from "../data/colorscheme";

console.log(
  `
This is the Cyberloop Official Website.

Following Secure-by-Design principle, the website has been made completely static.
This also means you can read the entire source of the website, of course we do NOT believe in Security-through-Obscurity.
The server-side attack surface should be only limited to the webserver exposing the assets, which is btw hosted by Github.
The client-side attack surface should be none, hence it doesn't accept any user input/parameter.

However, if you find any code vulnerability, contact us at info@cyberloop.it for a €-reward and a job offering :)

%c  🔧 with ❤️ by Cyberloop  `,
  `font-weight: bold; color:${colorscheme.defaultForeground}; background-color:${colorscheme.primary}; padding:5px; border-radius:4px;`
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
  views: [new NotFoundView()],
  transitions: [
    {
      name: "default-transition",
      once({ next }) {
        scroll.create(next.container);
      },
      beforeEnter({ next }) {
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
