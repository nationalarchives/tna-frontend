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

    this.$module.addEventListener("click", (event) => this.handleClick(event));
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

  handleClick(event) {
    const $target = event.target;
    if ($target && this.focusTarget($target)) {
      event.preventDefault();
    }
  }

  getFragmentFromUrl(url) {
    if (!url.includes("#")) {
      return undefined;
    }

    return url.split("#").pop();
  }

  focusTarget($target) {
    // If the element that was clicked was not a link, return early
    if (!($target instanceof HTMLAnchorElement)) {
      return false;
    }

    const inputId = this.getFragmentFromUrl($target.href);
    if (!inputId) {
      return false;
    }

    const $input = document.getElementById(inputId);
    if (!$input) {
      return false;
    }

    const $legendOrLabel = this.getAssociatedLegendOrLabel($input);
    if (!$legendOrLabel) {
      return false;
    }

    // Scroll the legend or label into view *before* calling focus on the input
    // to avoid extra scrolling in browsers that don't support `preventScroll`
    // (which at time of writing is most of them...)
    $legendOrLabel.scrollIntoView();
    $input.focus({ preventScroll: true });

    return true;
  }

  /**
   * Get associated legend or label
   *
   * Returns the first element that exists from this list:
   *
   * - The `<legend>` associated with the closest `<fieldset>` ancestor, as long
   *   as the top of it is no more than half a viewport height away from the
   *   bottom of the input
   * - The first `<label>` that is associated with the input using for="inputId"
   * - The closest parent `<label>`
   *
   * @private
   * @param {Element} $input - The input
   * @returns {Element | null} Associated legend or label, or null if no
   *   associated legend or label can be found
   */
  getAssociatedLegendOrLabel($input) {
    const $fieldset = $input.closest("fieldset");

    if ($fieldset) {
      const $legends = $fieldset.getElementsByTagName("legend");

      if ($legends.length) {
        const $candidateLegend = $legends[0];

        // If the input type is radio or checkbox, always use the legend if
        // there is one.
        if (
          $input instanceof HTMLInputElement &&
          ($input.type === "checkbox" || $input.type === "radio")
        ) {
          return $candidateLegend;
        }

        // For other input types, only scroll to the fieldset’s legend (instead
        // of the label associated with the input) if the input would end up in
        // the top half of the screen.
        //
        // This should avoid situations where the input either ends up off the
        // screen, or obscured by a software keyboard.
        const legendTop = $candidateLegend.getBoundingClientRect().top;
        const inputRect = $input.getBoundingClientRect();

        // If the browser doesn't support Element.getBoundingClientRect().height
        // or window.innerHeight (like IE8), bail and just link to the label.
        if (inputRect.height && window.innerHeight) {
          const inputBottom = inputRect.top + inputRect.height;

          if (inputBottom - legendTop < window.innerHeight / 2) {
            return $candidateLegend;
          }
        }
      }
    }

    return (
      document.querySelector(`label[for='${$input.getAttribute("id")}']`) ??
      $input.closest("label")
    );
  }
}
