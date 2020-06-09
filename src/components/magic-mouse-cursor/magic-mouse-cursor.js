import $ from "jquery";

const defaultOuterCursorSize = 30;
const validOuterCursorHovers = ["disable", "square", "adapt", "highlight"];
const validInnerCursorHovers = ["disable", "highlight"];

class MagicMouseCursor {
  constructor(options = {}) {
    this.defaultOuterCursorWidth =
      options.defaultOuterWidth || defaultOuterCursorSize;
    this.defaultOuterCursorHeight =
      options.defaultOuterCursorHeight || defaultOuterCursorSize;

    this._initHoverParams(options.hover || {});

    // Track the outer cursor width and height
    this.outerCursorWidth = this.defaultOuterCursorWidth;
    this.outerCursorHeight = this.defaultOuterCursorHeight;

    // State variables
    // - Position of outerCursor
    this.outerCursorX = 0;
    this.outerCursorY = 0;
    // - Position of innerCursor
    this.innerCursorX = 0;
    this.innerCursorY = 0;
    // - Whether cursor position tracking should be stopped (used for hover)
    this.stopFlag = false;

    this.hoverElementsHandlers = null;
  }

  enable() {
    this._createOuterCursor();
    this._createInnerCursor();
    this._startToUpdateCursorsPosition();
    this._startCursorsMovement();
    this._enableHoverEffect();
  }

  refresh() {
    this._disableHoverEffect();
    this._enableHoverEffect();
  }

  _initHoverParams(hover) {
    this.hover = hover;

    for (const entry of Object.entries(this.hover)) {
      const element = entry[1];

      element.outerCursor = element.outerCursor || [];
      if (element.outerCursor instanceof String) {
        element.outerCursor = [element.outerCursor];
      }
      for (const h of element.outerCursor) {
        if (!validOuterCursorHovers.includes(h)) {
          throw new Error(
            `Invalid hover ${h} for outer cursor: not in ${validOuterCursorHovers}`
          );
        }
      }

      element.innerCursor = element.innerCursor || [];
      if (element.innerCursor instanceof String) {
        element.innerCursor = [element.innerCursor];
      }
      for (const h of element.innerCursor) {
        if (!validInnerCursorHovers.includes(h)) {
          throw new Error(
            `Invalid hover ${h} for inner cursor: not in ${validInnerCursorHovers}`
          );
        }
      }
    }
  }

  _createOuterCursor() {
    this.outerCursor = $("<div>");
    this.outerCursor.attr("id", "magic-mouse-outer-cursor");
    this.outerCursor.width(`${this.defaultOuterCursorWidth}px`);
    this.outerCursor.height(`${this.defaultOuterCursorHeight}px`);
    this.outerCursor.appendTo($("body"));
  }

  _createInnerCursor() {
    this.innerCursor = $("<div>");
    this.innerCursor.attr("id", "magic-mouse-inner-cursor");
    this.innerCursor.appendTo($("body"));
  }

  _startToUpdateCursorsPosition() {
    $(document).bind("mousemove", (event) => {
      this.innerCursorX = event.clientX;
      this.innerCursorY = event.clientY;
      setTimeout(() => {
        if (!this.stopFlag) {
          this.outerCursorX = event.clientX - this.outerCursorWidth / 2;
          this.outerCursorY = event.clientY - this.outerCursorHeight / 2;
        }
      }, 50);
    });
  }

  _startCursorsMovement() {
    const moveCursors = () => {
      if (this.outerCursor) {
        this.outerCursor.css(
          "transform",
          `matrix(1, 0, 0, 1, ${this.outerCursorX}, ${this.outerCursorY})`
        );
        this.outerCursor.width(`${this.outerCursorWidth}px`);
        this.outerCursor.height(`${this.outerCursorHeight}px`);
      }
      if (this.innerCursor) {
        this.innerCursor.css(
          "transform",
          `matrix(1, 0, 0, 1, ${this.innerCursorX}, ${this.innerCursorY}) translate3d(-50%, -50%, 0)`
        );
      }
      requestAnimationFrame(moveCursors);
    };
    requestAnimationFrame(moveCursors);
  }

  _enableHoverEffect() {
    if (this.hoverElementsHandlers === null) {
      // 1: Initialize handlers for hover elements
      this.hoverElementsHandlers = [];
      for (const selector of Object.keys(this.hover)) {
        this.hoverElementsHandlers.push({
          selector,
          mouseenterHandler: () => this._handleMouseEnterHover(selector),
          mouseleaveHandler: () => this._handleMouseLeaveHover(selector),
        });
      }

      // 2: Bind handlers for hover elements
      for (const entry of this.hoverElementsHandlers) {
        $(entry.selector).bind("mouseenter", entry.mouseenterHandler);
        $(entry.selector).bind("mouseleave", entry.mouseleaveHandler);
      }
    }
  }

  _disableHoverEffect() {
    if (this.hoverElementsHandlers !== null) {
      // 1: Unbind handlers for hover elements
      for (const entry of this.hoverElementsHandlers) {
        $(entry.selector).unbind("mouseenter", entry.mouseenterHandler);
        $(entry.selector).unbind("mouseleave", entry.mouseleaveHandler);
      }

      // 2: Deinitialize handlers for hover elements
      this.hoverElementsHandlers = null;
    }
  }

  _handleMouseEnterHover(selector) {
    this.stopFlag = true;

    if (this.outerCursor) {
      this.outerCursor.css(
        "transition",
        "transform 0.2s, width 0.3s, height 0.3s, border-radius 0.2s"
      );

      this.outerCursor.addClass("is-hover");

      if (this.hover[selector].outerCursor.includes("disable")) {
        this.outerCursor.addClass("cursor-disabled");
      }
      if (this.hover[selector].outerCursor.includes("square")) {
        this.outerCursor.addClass("cursor-squared");
      }
      if (
        this.hover[selector].outerCursor.includes("square") || // square implies adapt
        this.hover[selector].outerCursor.includes("adapt")
      ) {
        const elementPos = event.currentTarget.getBoundingClientRect();
        this.outerCursorX = elementPos.left;
        this.outerCursorY = elementPos.top;
        this.outerCursorWidth = elementPos.width;
        this.outerCursorHeight = elementPos.height;
      }
      if (this.hover[selector].outerCursor.includes("highlight")) {
        this.outerCursor.addClass("cursor-highlighted");
      }
    }

    if (this.innerCursor) {
      this.innerCursor.addClass("is-hover");

      if (this.hover[selector].innerCursor.includes("disable")) {
        this.innerCursor.addClass("cursor-disabled");
      }
      if (this.hover[selector].innerCursor.includes("highlight")) {
        this.innerCursor.addClass("cursor-highlighted");
      }
    }
  }

  _handleMouseLeaveHover(selector) {
    this.stopFlag = false;

    $(selector).css("transform", "translate3d(0, 0, 0)");

    if (this.outerCursor) {
      this.outerCursorWidth = this.defaultOuterCursorWidth;
      this.outerCursorHeight = this.defaultOuterCursorHeight;
      this.outerCursor.css(
        "transition",
        "transform 0.07s, width 0.3s, height 0.3s, border-radius 0.2s"
      );
      this.outerCursor.removeClass("is-hover");
      this.outerCursor.removeClass("cursor-disabled");
      this.outerCursor.removeClass("cursor-squared");
      this.outerCursor.removeClass("cursor-highlighted");
    }

    if (this.innerCursor) {
      this.innerCursor.removeClass("is-hover");
      this.innerCursor.removeClass("cursor-disabled");
      this.innerCursor.removeClass("cursor-highlighted");
    }
  }
}

export { MagicMouseCursor };
