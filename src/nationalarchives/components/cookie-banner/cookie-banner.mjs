import Cookies from "../../lib/cookies.mjs";

export { Cookies };

export class CookieBanner {
  constructor($module) {
    this.$module = $module;
    this.$acceptButton = $module && $module.querySelector('[value="accept"]');
    this.$rejectButton = $module && $module.querySelector('[value="reject"]');
    this.$prompt =
      $module && $module.querySelector(".tna-cookie-banner__message--prompt");
    this.$acceptedMessage =
      $module && $module.querySelector(".tna-cookie-banner__message--accepted");
    this.$rejectedMessage =
      $module && $module.querySelector(".tna-cookie-banner__message--rejected");
    this.$closeButtons = $module && $module.querySelectorAll('[value="close"]');

    if (
      !this.$module ||
      !this.$acceptButton ||
      !this.$rejectButton ||
      !this.$prompt ||
      !this.$acceptedMessage ||
      !this.$rejectedMessage ||
      !this.$closeButtons
    ) {
      return;
    }

    this.cookies = new Cookies({ newInstance: true });

    this.cookiePreferencesSetKey =
      this.$module.dataset.preferencesKey || "cookie_preferences_set";

    if (!this.cookies.policiesCorrectOnInit) {
      this.cookies.delete(this.cookiePreferencesSetKey);
    }

    if (
      !this.cookies.exists(this.cookiePreferencesSetKey) ||
      !this.cookies.hasValue(this.cookiePreferencesSetKey, "true")
    ) {
      this.$module.removeAttribute("hidden");

      this.$acceptButton.addEventListener("click", () => this.accept());
      this.$rejectButton.addEventListener("click", () => this.reject());
    }
  }

  accept() {
    this.$prompt.setAttribute("hidden", "");
    this.complete();
    this.$acceptedMessage.removeAttribute("hidden");
    this.$acceptedMessage.focus();
    this.$acceptedMessage.setAttribute("tabindex", "-1");
    this.cookies.acceptAllPolicies();
  }

  reject() {
    this.$prompt.setAttribute("hidden", "");
    this.complete();
    this.$rejectedMessage.removeAttribute("hidden");
    this.$rejectedMessage.focus();
    this.$rejectedMessage.setAttribute("tabindex", "-1");
    this.cookies.rejectAllPolicies();
  }

  complete() {
    this.cookies.set(this.cookiePreferencesSetKey, true);
    this.$closeButtons.forEach(($closeButton) => {
      $closeButton.addEventListener("click", () => this.close());
    });
  }

  close() {
    this.$module.setAttribute("hidden", "");
  }
}
