import $ from "jquery";

class MagicMouseCursor {
  constructor(options = {}) {
    this.defaultOuterWidth = options.defaultOuterWidth || 30;
    this.defaultOuterHeight = options.defaultOuterHeight || 30;

    this.hoverSelector = options.hoverSelector || ".magic-mouse-cursor-hover";
    this.selectorForHoverOuterCursorSquared =
      options.selectorForHoverOuterCursorSquared;
    this.selectorForHoverOuterCursorDisabled =
      options.selectorForHoverOuterCursorDisabled;
    this.selectorForHoverInnerCursorDisabled =
      options.selectorForHoverInnerCursorDisabled;

    this.outerWidth = this.defaultOuterWidth;
    this.outerHeight = this.defaultOuterHeight;

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
    this.outerCursor.width(`${this.defaultOuterWidth}px`);
    this.outerCursor.height(`${this.defaultOuterHeight}px`);
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
          this.outerCursorX = event.clientX - this.outerWidth / 2;
          this.outerCursorY = event.clientY - this.outerHeight / 2;
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
        this.outerCursor.width(`${this.outerWidth}px`);
        this.outerCursor.height(`${this.outerHeight}px`);
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
    $(this.hoverSelector).each((_, item) => {
      $(item).bind("mouseenter", () => {
        this._circleMove_mouseEnterHover($(item));
      });

      $(item).bind("mouseleave", () => {
        $(item).css("transform", "translate3d(0, 0, 0)");
        this._circleMove_mouseLeaveHover();
      });
    });
  }

  _circleMove_mouseEnterHover(item) {
    this.stopFlag = true;

    if (this.outerCursor) {
      this.outerCursor.css(
        "transition",
        "transform 0.2s, width 0.3s, height 0.3s, border-radius 0.2s"
      );

      this.outerCursor.addClass("is-hover");

      if ($(item).is(this.selectorForHoverOuterCursorSquared)) {
        this.outerCursor.addClass("cursor-square");
      }
      if ($(item).is(this.selectorForHoverOuterCursorDisabled)) {
        this.outerCursor.addClass("cursor-disabled");
      }

      const elementPos = event.currentTarget.getBoundingClientRect();
      this.outerCursorX = elementPos.left;
      this.outerCursorY = elementPos.top;
      this.outerWidth = elementPos.width;
      this.outerHeight = elementPos.height;
    }

    if (this.innerCursor) {
      this.innerCursor.addClass("is-hover");

      if ($(item).is(this.selectorForHoverInnerCursorDisabled)) {
        this.innerCursor.addClass("cursor-disabled");
      }
    }
  }

  _circleMove_mouseLeaveHover() {
    this.stopFlag = false;

    if (this.outerCursor) {
      this.outerWidth = this.defaultOuterWidth;
      this.outerHeight = this.defaultOuterHeight;
      this.outerCursor.css(
        "transition",
        "transform 0.07s, width 0.3s, height 0.3s, border-radius 0.2s"
      );
      this.outerCursor.removeClass("is-hover");
      this.outerCursor.removeClass("cursor-square");
      this.outerCursor.removeClass("cursor-disabled");
    }

    if (this.innerCursor) {
      this.innerCursor.removeClass("is-hover");
      this.innerCursor.removeClass("cursor-square");
      this.innerCursor.removeClass("cursor-disabled");
    }
  }
}

export { MagicMouseCursor };
