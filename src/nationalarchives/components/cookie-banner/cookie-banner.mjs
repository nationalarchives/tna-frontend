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

    const policies = this.$module.dataset.policies || "";
    const extraPolicies = policies
      .split(",")
      .filter((x) => x)
      .map((policy) => policy.trim());
    const domain = this.$module.dataset.domain || undefined;
    const path = this.$module.dataset.path || undefined;
    const secure = this.$module.dataset.secure || undefined;
    const policiesKey = this.$module.dataset.policiesKey || undefined;

    this.cookies = new Cookies({
      extraPolicies,
      domain,
      path,
      secure,
      policiesKey,
      newInstance: true,
    });

    this.cookiePreferencesSet =
      this.$module.dataset.preferencesKey || "cookie_preferences_set";
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
