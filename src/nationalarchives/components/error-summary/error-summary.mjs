export class ErrorSummary {
  constructor($module) {
    this.$module = $module;
  }

  init() {
    if (!this.$module) {
      return;
    }

    const disableAutoFocus =
      this.$module.dataset.disableAutofocus === "true" || false;

    if (!disableAutoFocus) {
      this.setFocus(this.$module);
    }
  }

  setFocus($element, options = {}) {
    const isFocusable = $element.getAttribute("tabindex");

    if (!isFocusable) {
      $element.setAttribute("tabindex", "-1");
    }

    /**
     * Handle element focus
     */
    function onFocus() {
      $element.addEventListener("blur", onBlur, { once: true });
    }

    /**
     * Handle element blur
     */
    function onBlur() {
      options.onBlur?.call($element);

      if (!isFocusable) {
        $element.removeAttribute("tabindex");
      }
    }

    // Add listener to reset element on blur, after focus
    $element.addEventListener("focus", onFocus, { once: true });

    // Focus element
    options.onBeforeFocus?.call($element);
    $element.focus();
  }
}
