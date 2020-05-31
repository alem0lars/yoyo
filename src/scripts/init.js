import "bootstrap";
import $ from "jquery";
import barba from "@barba/core";
import LocomotiveScroll from "locomotive-scroll";
import { MagicMouseCursor } from "../components/magic-mouse-cursor/magic-mouse-cursor";

$(document).ready(() => {
  // Enable Magic Mouse Cursor
  const magicMouseCursor = new MagicMouseCursor({
    selectorForHoverOuterCursorSquared: "a,button,input",
    selectorForHoverOuterCursorDisabled: "button,input",
  });
  magicMouseCursor.enable();

  // Enable BarbaJS
  // barba.init({});

  // Enable Locomotive Scroll
  // const scroll = new LocomotiveScroll();
});
