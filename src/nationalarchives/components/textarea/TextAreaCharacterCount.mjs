export default class TextAreaCharacterCount {
  constructor($module, options = {}) {
    this.$module = $module;
    this.$formFieldInput =
      this.$module && this.$module.querySelector(".tna-textarea");
    this.$formFieldCharacterCount =
      this.$module && this.$module.querySelector(".tna-textarea-count");
    this.$formFieldCharacterCountScreenReader =
      this.$module &&
      this.$module.querySelector(".tna-textarea-count__screen-reader-status");
    this.max = this.$formFieldInput?.dataset?.maxLength;
    this.countType = this.$formFieldInput?.dataset?.countType || "characters";

    if (
      !this.$module ||
      !this.$formFieldInput ||
      !this.$formFieldCharacterCount ||
      !this.$formFieldCharacterCountScreenReader ||
      !this.max
    ) {
      return;
    }

    this.debounceDuration =
      options.debounceDuration ||
      this.$formFieldInput?.dataset?.debounceDuration ||
      /* eslint-disable-next-line no-magic-numbers */
      1000;
    /* eslint-disable-next-line no-magic-numbers */
    this.intervalChecker = options.intervalChecker || 1000;
    this.debounceTimeout = null;
    this.lastInputValue = "";

    this.init();
  }

  init() {
    this.$formFieldInput.addEventListener("input", () => {
      this.handleInput();
      this.lastInputTimestamp = Date.now();
    });
    this.$formFieldInput.addEventListener("focus", () => {
      this.handleFocus();
    });
    this.$formFieldInput.addEventListener("blur", () => {
      this.handleBlur();
    });
    this.updateVisualCharacterCount();
    this.updateScreenReaderCharacterCount();
  }

  handleFocus() {
    this.valueChecker = window.setInterval(() => {
      if (
        !this.lastInputTimestamp ||
        /* eslint-disable-next-line no-magic-numbers */
        Date.now() - this.intervalChecker / 2 >= this.lastInputTimestamp
      ) {
        this.updateIfValueChanged();
      }
    }, this.intervalChecker);
  }

  handleBlur() {
    if (this.valueChecker) {
      window.clearInterval(this.valueChecker);
    }
    this.updateScreenReaderCharacterCount();
  }

  updateIfValueChanged() {
    if (this.$formFieldInput.value !== this.lastInputValue) {
      this.lastInputValue = this.$formFieldInput.value;
      this.updateVisualCharacterCount();
      this.updateScreenReaderCharacterCount();
    }
  }

  handleInput() {
    this.updateVisualCharacterCount();
    clearTimeout(this.debounceTimeout);
    this.debounceTimeout = setTimeout(() => {
      this.updateScreenReaderCharacterCount();
    }, this.debounceDuration);
  }

  getCurrentLength() {
    if (this.countType === "words") {
      const trimmedValue = this.$formFieldInput.value.trim();
      if (trimmedValue === "") {
        /* eslint-disable-next-line no-magic-numbers */
        return 0;
      }
      return trimmedValue.split(/\s+/).length;
    }
    return this.$formFieldInput.value.length;
  }

  getCurrentLengthMessage() {
    const currentLength = this.getCurrentLength();
    let typeLabel = this.countType;
    /* eslint-disable-next-line no-magic-numbers */
    if (Math.abs(this.max - currentLength) === 1) {
      typeLabel = typeLabel.replace(/s$/, "");
    }
    if (currentLength > this.max) {
      return `You have ${currentLength - this.max} ${typeLabel} too many`;
    }
    return `You have ${this.max - currentLength} ${typeLabel} remaining`;
  }

  isOverThreshold() {
    return this.getCurrentLength() > this.max;
  }

  updateVisualCharacterCount() {
    this.$formFieldCharacterCount.innerText = this.getCurrentLengthMessage();
    if (this.isOverThreshold()) {
      this.$formFieldInput.classList.add("tna-textarea--error");
      this.$formFieldCharacterCount.classList.add("tna-textarea-count--error");
    } else {
      this.$formFieldInput.classList.remove("tna-textarea--error");
      this.$formFieldCharacterCount.classList.remove(
        "tna-textarea-count--error",
      );
    }
  }

  updateScreenReaderCharacterCount() {
    if (this.isOverThreshold()) {
      this.$formFieldCharacterCountScreenReader.removeAttribute("aria-hidden");
    } else {
      this.$formFieldCharacterCountScreenReader.setAttribute(
        "aria-hidden",
        "true",
      );
    }

    const currentLengthMessage = this.getCurrentLengthMessage();
    this.$formFieldCharacterCountScreenReader.innerText = currentLengthMessage;
  }
}
