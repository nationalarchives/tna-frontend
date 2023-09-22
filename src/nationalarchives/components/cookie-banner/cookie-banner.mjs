import Cookies from "../../lib/cookies.mjs";

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
  }

  init() {
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

    const policies = this.$module.getAttribute("data-policies");
    if (!policies) {
      return;
    }
    this.cookies = new Cookies(
      policies.split(",").map((policy) => policy.trim()),
    );

    this.loadScriptsOnAccept = this.$module.getAttribute("data-acceptscripts");

    this.cookiePreferencesSet =
      this.$module.getAttribute("data-preferenceskey") ||
      "cookies_preferences_set";
    const cookiePreferencesSet = this.cookies.hasValue(
      this.cookiePreferencesSet,
      "true",
    );

    if (!cookiePreferencesSet) {
      this.$module.removeAttribute("hidden");

      this.$acceptButton.addEventListener("click", () => this.accept());
      this.$rejectButton.addEventListener("click", () => this.reject());
    }
  }

  accept() {
    this.$prompt.setAttribute("hidden", true);
    this.complete();
    this.$acceptedMessage.removeAttribute("hidden");
    this.$acceptedMessage.focus();
    this.$acceptedMessage.setAttribute("tabindex", "-1");
    this.cookies.acceptAllPolicies();
    if (this.loadScriptsOnAccept) {
      this.loadScriptsOnAccept.split(",").forEach((script) => {
        const $script = document.createElement("script");
        $script.src = script;
        document.head.appendChild($script);
      });
    }
  }

  reject() {
    this.$prompt.setAttribute("hidden", true);
    this.complete();
    this.$rejectedMessage.removeAttribute("hidden");
    this.$rejectedMessage.focus();
    this.$rejectedMessage.setAttribute("tabindex", "-1");
    this.cookies.rejectAllPolicies();
  }

  complete() {
    this.cookies.set(this.cookiePreferencesSet, true);
    this.$closeButtons.forEach(($closeButton) => {
      $closeButton.addEventListener("click", () => this.close());
    });
  }

  close() {
    this.$module.setAttribute("hidden", true);
  }
}
