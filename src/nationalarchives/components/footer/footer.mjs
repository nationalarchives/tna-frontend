import Cookies from "../../lib/cookies.mjs";

export class Footer {
  constructor($module) {
    this.$module = $module;
    this.$themeSelector =
      $module && $module.querySelector(".tna-footer__theme-selector");
    this.$tnaTemplate = document.querySelector(".tna-template");

    if (!this.$module || !this.$themeSelector || !this.$tnaTemplate) {
      return;
    }

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

    this.cookies = new Cookies();
    if (this.cookies.isPolicyAccepted("settings")) {
      this.showThemeSelector();
    }
    this.cookies.on("changePolicy", (data) => {
      if (Object.hasOwn(data, "settings")) {
        if (data.settings === true) {
          this.showThemeSelector();
        } else {
          this.cookies.delete("theme");
          this.hideThemeSelector();
        }
      }
    });
  }

  showThemeSelector() {
    this.$themeSelector.removeAttribute("hidden");
    if (this.cookies.exists("theme")) {
      const $currentThemeButton = Array.from(this.$themeSelectorButtons).find(
        ($button) => $button.value === this.cookies.get("theme"),
      );
      if ($currentThemeButton) {
        this.selectThemeSelectorButton($currentThemeButton);
      }
    }
  }

  hideThemeSelector() {
    this.$themeSelector.setAttribute("hidden", "");
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
    this.cookies.set("theme", theme);
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
