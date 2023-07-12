export class SensitiveImage {
  constructor($module) {
    this.$module = $module;
    this.$imageDetails =
      $module && $module.querySelector(".tna-sensitive-image__details");
    this.$image =
      $module && $module.querySelector(".tna-sensitive-image__image");
    this.imageIsVisible = false;
  }

  init() {
    if (!this.$module || !this.$imageDetails || !this.$image) {
      return;
    }
    this.$imageDetails.addEventListener("toggle", () =>
      this.handleImageDetailsToggle(),
    );
  }

  handleImageDetailsToggle() {
    if (this.$imageDetails.hasAttribute("open")) {
      this.$image.focus({ preventScroll: true, focusVisible: true });
    }
  }
}
