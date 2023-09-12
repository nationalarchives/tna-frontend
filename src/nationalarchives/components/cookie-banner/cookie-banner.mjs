export class CookieBanner {
  constructor($module) {
    this.$module = $module;
    this.$accept = $module && $module.querySelector('[value="accept"]');
    this.$reject = $module && $module.querySelector('[value="reject"]');
  }

  init() {
    if (!this.$module || !this.$accept || !this.$reject) {
      return;
    }

    this.$module.removeAttribute("hidden");

    this.$accept.addEventListener("click", () => this.accept());
    this.$reject.addEventListener("click", () => this.reject());
  }

  accept() {}

  reject() {}
}
