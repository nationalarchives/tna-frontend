export class GlobalHeader {
  constructor($module) {
    this.$module = $module;
    this.$toggleButton =
      $module && $module.querySelector(".tna-global-header__navigation-button");
    this.$navigation =
      $module &&
      $module.querySelector(".tna-global-header__navigation-wrapper");
    this.$topNavigation =
      $module &&
      $module.querySelector(".tna-global-header__top-navigation-wrapper");
    this.$links =
      $module &&
      ((this.$navigation &&
        this.$navigation.querySelectorAll("[tabindex='0']")) ||
        (this.$topNavigation &&
          this.$topNavigation.querySelectorAll("[tabindex='0']")));
    this.menuOpened = false;
    this.mql = window.matchMedia("(max-width: 48em)");

    if (
      !this.$module ||
      !this.$toggleButton ||
      (!this.$navigation && !this.$topNavigation)
    ) {
      return;
    }

    this.$toggleButton.removeAttribute("hidden");
    this.syncState();
    this.$toggleButton.addEventListener("click", () =>
      this.handleToggleNavigation(),
    );
    if ("addEventListener" in this.mql) {
      this.mql.addEventListener("change", () => this.syncState());
    } else {
      this.mql.addListener(() => this.syncState());
    }

    this.$module.addEventListener("keyup", (e) => {
      if (e.code === "Escape" && this.mql.matches) {
        if (this.menuOpened) {
          this.menuOpened = false;
          this.syncState();
          this.$toggleButton.focus();
        }
      }
    });
  }

  handleToggleNavigation() {
    this.menuOpened = !this.menuOpened;
    this.syncState();
  }

  syncState() {
    if (this.mql.matches) {
      if (this.menuOpened) {
        this.show();
      } else {
        this.hide();
      }
    } else {
      this.show();
    }
  }

  hide() {
    if (this.$navigation) {
      this.$navigation.hidden = true;
      this.$navigation.setAttribute("aria-hidden", "true");
    }
    if (this.$topNavigation) {
      this.$topNavigation.hidden = true;
      this.$topNavigation.setAttribute("aria-hidden", "true");
    }
    this.$toggleButton.setAttribute("aria-expanded", "false");
    this.$toggleButton.setAttribute("title", "Open menu");
    this.$toggleButton.classList.remove(
      "tna-global-header__navigation-button--opened",
    );
    for (let i = 0; i < this.$links.length; i++) {
      this.$links[i].setAttribute("tabindex", "-1");
    }
  }

  show() {
    if (this.$navigation) {
      this.$navigation.hidden = false;
      this.$navigation.setAttribute("aria-hidden", "false");
    }
    if (this.$topNavigation) {
      this.$topNavigation.hidden = false;
      this.$topNavigation.setAttribute("aria-hidden", "false");
    }
    this.$toggleButton.setAttribute("aria-expanded", "true");
    this.$toggleButton.setAttribute("title", "Close menu");
    this.$toggleButton.classList.add(
      "tna-global-header__navigation-button--opened",
    );
    for (let i = 0; i < this.$links.length; i++) {
      this.$links[i].setAttribute("tabindex", "0");
    }
  }
}
