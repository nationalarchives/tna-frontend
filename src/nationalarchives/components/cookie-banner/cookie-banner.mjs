import Cookies from "@nationalarchives/cookies/src/index.js";

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

    this.cookies = new Cookies();

    if (!this.cookies.preferencesSet) {
      this.$module.removeAttribute("hidden");

      this.$acceptButton.addEventListener("click", () => this.accept());
      this.$rejectButton.addEventListener("click", () => this.reject());

      this.$closeButtons.forEach(($closeButton) => {
        $closeButton.addEventListener("click", () => this.close());
      });
    }
  }

  accept() {
    this.cookies.enableAllPreferences();
    this.showPanel(this.$acceptedMessage);
  }

  reject() {
    this.cookies.disableAllPreferences();
    this.showPanel(this.$rejectedMessage);
  }

  showPanel($panel) {
    this.$prompt.setAttribute("hidden", "");
    $panel.removeAttribute("hidden");
    $panel.setAttribute("tabindex", "0");
    $panel.focus();
    $panel.addEventListener("blur", () => {
      $panel.removeAttribute("tabindex");
    });
  }

  close() {
    this.$module.setAttribute("hidden", "");
  }
}
