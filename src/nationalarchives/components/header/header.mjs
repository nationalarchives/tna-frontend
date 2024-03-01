import uuidv4 from "../../lib/uuid.mjs";

export class Header {
  constructor($module) {
    this.$module = $module;
    this.$toggleButton =
      $module && $module.querySelector(".tna-header__navigation-toggle-button");
    this.$navigation =
      $module && $module.querySelector(".tna-header__navigation");
    this.$links =
      $module &&
      this.$navigation &&
      this.$navigation.querySelectorAll("[tabindex='0']");
    this.menuOpened = false;
    this.mql = window.matchMedia("(max-width: 768px)");

    if (!this.$module || !this.$toggleButton || !this.$navigation) {
      return;
    }

    const uniqueId = `tna-menu-content-${uuidv4()}`;
    this.$navigation.setAttribute("id", uniqueId);

    this.$toggleButton.removeAttribute("hidden");
    this.$toggleButton.setAttribute("aria-controls", uniqueId);

    this.syncState();

    this.$toggleButton.addEventListener("click", () =>
      this.handleToggleNavigation(),
    );

    if ("addEventListener" in this.mql) {
      this.mql.addEventListener("change", () => this.syncState());
    } else {
      this.mql.addListener(() => this.syncState());
    }
  }

  handleToggleNavigation() {
    this.menuOpened = !this.menuOpened;
    this.syncState();
  }

  syncState() {
    if (this.mql.matches) {
      if (this.menuOpened) {
        this.$navigation.classList.add("tna-header__navigation--open");
        this.$navigation.hidden = false;
        this.$navigation.setAttribute("aria-hidden", "false");
        this.$toggleButton.setAttribute("aria-expanded", "true");
        this.$toggleButton.setAttribute("title", "Close menu");
        this.$toggleButton.classList.add(
          "tna-header__navigation-toggle-button--opened",
        );

        for (let i = 0; i < this.$links.length; i++) {
          this.$links[i].setAttribute("tabindex", "0");
        }
      } else {
        this.$navigation.classList.remove("tna-header__navigation--open");
        this.$navigation.hidden = true;
        this.$navigation.setAttribute("aria-hidden", "true");
        this.$toggleButton.setAttribute("aria-expanded", "false");
        this.$toggleButton.setAttribute("title", "Open menu");
        this.$toggleButton.classList.remove(
          "tna-header__navigation-toggle-button--opened",
        );

        for (let i = 0; i < this.$links.length; i++) {
          this.$links[i].setAttribute("tabindex", "-1");
        }
      }
    } else {
      this.$navigation.classList.add("tna-header__navigation--open");
      this.$navigation.hidden = false;
      this.$navigation.setAttribute("aria-hidden", "false");
      this.$toggleButton.setAttribute("aria-expanded", "true");
      this.$toggleButton.setAttribute("title", "Close menu");

      for (let i = 0; i < this.$links.length; i++) {
        this.$links[i].setAttribute("tabindex", "0");
      }
    }
  }
}
