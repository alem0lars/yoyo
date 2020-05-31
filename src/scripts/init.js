import "bootstrap";
import $ from "jquery";
import barba from "@barba/core";
import LocomotiveScroll from "locomotive-scroll";
import { mouseCursor } from "../components/magic-mouse-cursor/magic-mouse-cursor";

// barba.init({});
// const scroll = new LocomotiveScroll();

$(document).ready(() => {
  mouseCursor();
});
