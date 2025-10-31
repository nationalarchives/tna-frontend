export class SkipLink {
  linkedElementListener = false;

  constructor($module) {
    this.$module = $module;
    this.linkedElementId = $module.getAttribute("href").split("#").pop();
    this.$linkedElement =
      $module &&
      this.linkedElementId &&
      document.getElementById(this.linkedElementId);

    if (this.$module && this.$linkedElement) {
      this.$module.addEventListener("click", () => this.focusLinkedElement());
    }
  }

  focusLinkedElement() {
    if (!this.$linkedElement.getAttribute("tabindex")) {
      this.$linkedElement.setAttribute("tabindex", "-1");
      this.$linkedElement.classList.add("tna-!--no-focus-style");

      if (!this.linkedElementListener) {
        this.$linkedElement.addEventListener("blur", () =>
          this.removeFocusProperties(),
        );
        this.linkedElementListener = true;
      }
    }

    this.$linkedElement.focus();
  }

  removeFocusProperties() {
    this.$linkedElement.removeAttribute("tabindex");
    this.$linkedElement.classList.remove("tna-!--no-focus-style");
  }
}
