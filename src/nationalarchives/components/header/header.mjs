export class Header {
  constructor($module) {
    this.$module = $module;
    this.$toggleButton =
      $module && $module.querySelector(".tna-header__navigation-button");
    this.$navigation =
      $module && $module.querySelector(".tna-header__navigation");
    this.$links =
      $module &&
      this.$navigation &&
      this.$navigation.querySelectorAll("[tabindex='0']");
    this.menuOpened = false;
    this.mql = window.matchMedia("(max-width: 48em)");

    if (!this.$module || !this.$toggleButton || !this.$navigation) {
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
      if (e.code === "Escape") {
        if (this.menuOpened && this.mql.matches) {
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

  show() {
    this.$navigation.classList.add("tna-header__navigation--open");
    this.$navigation.removeAttribute("hidden");
    this.$navigation.setAttribute("aria-hidden", "false");
    this.$toggleButton.setAttribute("aria-expanded", "true");
    this.$toggleButton.setAttribute("title", "Close menu");
    this.$toggleButton.classList.add("tna-header__navigation-button--opened");

    for (let i = 0; i < this.$links.length; i++) {
      this.$links[i].setAttribute("tabindex", "0");
    }
  }

  hide() {
    this.$navigation.classList.remove("tna-header__navigation--open");
    this.$navigation.hidden = true;
    this.$navigation.setAttribute("aria-hidden", "true");
    this.$toggleButton.setAttribute("aria-expanded", "false");
    this.$toggleButton.setAttribute("title", "Open menu");
    this.$toggleButton.classList.remove(
      "tna-header__navigation-button--opened",
    );

    for (let i = 0; i < this.$links.length; i++) {
      this.$links[i].setAttribute("tabindex", "-1");
    }
  }
}
