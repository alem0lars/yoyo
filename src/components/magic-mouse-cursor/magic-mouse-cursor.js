import $ from "jquery";

const defaultOuterCursorSize = 30;
const validOuterCursorHovers = ["disable", "square"];
const validInnerCursorHovers = ["disable", "highlight"];

class MagicMouseCursor {
  constructor(options = {}) {
    this.defaultOuterCursorWidth =
      options.defaultOuterWidth || defaultOuterCursorSize;
    this.defaultOuterCursorHeight =
      options.defaultOuterCursorHeight || defaultOuterCursorSize;

    this._initHover(options.hover || {});

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
  }

  _initHover(hover) {
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

  enable() {
    this._createOuterCursor();
    this._createInnerCursor();
    this._startToUpdateCursorsPosition();
    this._startCursorsMovement();
    this._enableHoverEffect();
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
    $(Object.keys(this.hover)).each((_, selector) => {
      $(selector).bind("mouseenter", () => {
        this._handleMouseEnterHover(selector);
      });

      $(selector).bind("mouseleave", () => {
        $(selector).css("transform", "translate3d(0, 0, 0)");
        this._handleMouseLeaveHover();
      });
    });
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

      const elementPos = event.currentTarget.getBoundingClientRect();
      this.outerCursorX = elementPos.left;
      this.outerCursorY = elementPos.top;
      this.outerCursorWidth = elementPos.width;
      this.outerCursorHeight = elementPos.height;
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

  _handleMouseLeaveHover() {
    this.stopFlag = false;

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
    }

    if (this.innerCursor) {
      this.innerCursor.removeClass("is-hover");
      this.innerCursor.removeClass("cursor-disabled");
      this.innerCursor.removeClass("cursor-highlighted");
    }
  }
}

export { MagicMouseCursor };
