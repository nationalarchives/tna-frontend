import uuidv4 from "../../lib/uuid.mjs";

function Header($module) {
  this.$module = $module;
  this.$toggleButtonWrapper =
    $module && $module.querySelector(".tna-header__navigation-toggle");
  this.$navigation =
    $module && $module.querySelector(".tna-header__navigation");
  this.$links =
    $module &&
    this.$navigation &&
    this.$navigation.querySelectorAll("[tabindex='0']");
  this.menuOpened = false;
}

Header.prototype.init = function () {
  if (!this.$module || !this.$toggleButtonWrapper || !this.$navigation) {
    return;
  }

  const uniqueId = `menu-content-${uuidv4()}`;
  this.$navigation.setAttribute("id", uniqueId);

  this.$toggleButton = document.createElement("button");
  this.$toggleButton.innerText = "Menu";
  this.$toggleButton.setAttribute("aria-controls", uniqueId);
  this.$toggleButton.setAttribute("aria-haspopup", "true");
  this.$toggleButton.classList.add("tna-header__navigation-toggle-button");

  this.$hamburger = document.createElement("div");
  this.$hamburger.classList.add("tna-header__hamburger");

  this.$toggleButton.appendChild(this.$hamburger);
  this.$toggleButtonWrapper.appendChild(this.$toggleButton);

  this.setNavigationState();

  this.$toggleButton.addEventListener(
    "click",
    this.handleToggleNavigation.bind(this),
  );
};

Header.prototype.handleToggleNavigation = function () {
  this.menuOpened = !this.menuOpened;
  this.setNavigationState();
};

Header.prototype.setNavigationState = function () {
  if (this.menuOpened) {
    this.$navigation.classList.add("tna-header__navigation--open");
    this.$navigation.hidden = false;
    this.$navigation.setAttribute("aria-hidden", "false");
    this.$toggleButton.setAttribute("aria-expanded", "true");
    this.$toggleButton.setAttribute("title", "Close menu");

    for (let i = 0; i < this.$links.length; i++) {
      this.$links[i].setAttribute("tabindex", "0");
    }
  } else {
    this.$navigation.classList.remove("tna-header__navigation--open");
    this.$navigation.hidden = true;
    this.$navigation.setAttribute("aria-hidden", "true");
    this.$toggleButton.setAttribute("aria-expanded", "false");
    this.$toggleButton.setAttribute("title", "Open menu");

    for (let i = 0; i < this.$links.length; i++) {
      this.$links[i].setAttribute("tabindex", "-1");
    }
  }
};

export default Header;
