import Cookies from "../../lib/cookies.mjs";

export class Footer {
  constructor($module, themeCookieName = "theme") {
    this.$module = $module;
    this.$themeSelector =
      $module && $module.querySelector(".tna-footer__theme-selector");
    this.$themeSelectorNotice =
      $module && $module.querySelector(".tna-footer__theme-selector-notice");
    this.$themeSelectorEnableSettingsCookiesButton =
      this.$themeSelectorNotice &&
      this.$themeSelectorNotice.querySelector(
        ".tna-footer__theme-selector-enable-settings-cookies",
      );
    this.$tnaTemplate = document.querySelector(".tna-template");

    if (
      !this.$module ||
      !this.$themeSelector ||
      !this.$themeSelectorNotice ||
      !this.$themeSelectorEnableSettingsCookiesButton ||
      !this.$tnaTemplate
    ) {
      return;
    }

    this.currentTheme = this.$themeSelector.dataset.themeOnLoad;

    this.themeCookieName = themeCookieName;

    this.cookies = new Cookies();

    this.$themeSelectorButtons = this.$themeSelector.querySelectorAll(
      "button.tna-footer__theme-selector-button[value]",
    );

    Array.from(this.$themeSelectorButtons).forEach(($themeSelectorButton) => {
      $themeSelectorButton.addEventListener("click", (e) => {
        const $button = e.target;
        this.setTheme($button.value);
        this.selectThemeSelectorButton($button);
      });
    });

    this.$themeSelectorEnableSettingsCookiesButton.addEventListener(
      "click",
      () => {
        this.cookies.acceptPolicy("settings");
      },
    );

    this.showThemeSelector();
    this.cookies.on("changePolicy", (data) => {
      if (Object.hasOwn(data, "settings")) {
        if (data.settings === true) {
          this.cookies.set(this.themeCookieName, this.currentTheme);
          this.$themeSelectorNotice.setAttribute("hidden", "");
        } else {
          this.cookies.delete(this.themeCookieName);
          this.$themeSelectorNotice.removeAttribute("hidden");
        }
      }
    });
  }

  showThemeSelector() {
    this.$themeSelector.removeAttribute("hidden");
    if (this.cookies.exists(this.themeCookieName)) {
      const $currentThemeButton = Array.from(this.$themeSelectorButtons).find(
        ($button) => $button.value === this.cookies.get(this.themeCookieName),
      );
      if ($currentThemeButton) {
        this.selectThemeSelectorButton($currentThemeButton);
      }
    }
    if (!this.cookies.isPolicyAccepted("settings")) {
      this.$themeSelectorNotice.removeAttribute("hidden");
    }
  }

  setTheme(theme) {
    if (theme === "light") {
      this.$tnaTemplate.classList.remove(
        "tna-template--system-theme",
        "tna-template--dark-theme",
      );
    } else if (theme === "dark") {
      this.$tnaTemplate.classList.remove("tna-template--system-theme");
      this.$tnaTemplate.classList.add(`tna-template--dark-theme`);
    } else if (theme === "system") {
      this.$tnaTemplate.classList.remove("tna-template--dark-theme");
      this.$tnaTemplate.classList.add(`tna-template--system-theme`);
    } else {
      return;
    }
    this.currentTheme = theme;
    if (this.cookies.isPolicyAccepted("settings")) {
      this.cookies.set(this.themeCookieName, this.currentTheme);
    } else {
      this.$themeSelectorNotice.removeAttribute("hidden");
    }
  }

  selectThemeSelectorButton($selectedButton) {
    Array.from(this.$themeSelectorButtons).forEach(($button) => {
      if ($button.value === $selectedButton.value) {
        $button.classList.remove("tna-button--plain");
        $button.setAttribute("aria-current", true);
      } else {
        $button.classList.add("tna-button--plain");
        $button.removeAttribute("aria-current");
      }
    });
  }
}
