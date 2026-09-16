export class Tabs {
  constructor($module) {
    this.$module = $module;
    this.$tabListHeading =
      $module && $module.querySelector(".tna-tabs__list-heading");
    this.$tabList = $module && $module.querySelector(".tna-tabs__list");
    this.$tabListItemLinks =
      $module &&
      this.$tabList &&
      this.$tabList.querySelectorAll(".tna-tabs__button");
    this.$tabItems = $module && $module.querySelectorAll(".tna-tabs__item");

    if (
      !this.$module ||
      !this.$tabList ||
      !this.$tabListItemLinks ||
      !this.$tabItems ||
      this.$tabListItemLinks.length !== this.$tabItems.length
    ) {
      return;
    }

    this.currentTabIndex = this.$module.dataset.activeTabOnLoad
      ? parseInt(this.$module.dataset.activeTabOnLoad, 10)
      : 0;
    this.previousTabIndex = this.currentTabIndex;
    this.allowClose = this.$module.dataset.allowClose === "true";
    this.init();
  }

  init() {
    this.$module.classList.add("tna-tabs--interactive");
    this.$tabListHeading.remove();
    const clickEventHandler = (event) => this.handleItemLinkClick(event);
    this.$tabListItemLinks.forEach(($tabListItemLink) => {
      const tabPanelID = $tabListItemLink.getAttribute("aria-controls");
      $tabListItemLink.setAttribute("aria-selected", false);
      const $tabPanel = document.getElementById(tabPanelID);
      $tabPanel.setAttribute("aria-labelledby", $tabListItemLink.id);
      $tabPanel.setAttribute("role", "tabpanel");
      $tabListItemLink.addEventListener("click", clickEventHandler, {
        capture: true,
      });
    });
    this.$tabList.addEventListener(
      "keydown",
      (event) => this.handleItemLinkKeyDown(event),
      { capture: true },
    );
    this.switchTabByIndex(this.currentTabIndex);
  }

  handleItemLinkClick(itemLinkClickEvent) {
    itemLinkClickEvent.preventDefault();
    const targetItem =
      itemLinkClickEvent.currentTarget.getAttribute("aria-controls");
    this.switchTabByID(targetItem);
  }

  handleItemLinkKeyDown(itemLinkKeyDownEvent) {
    let preventDefaultKeyAction = false;
    switch (itemLinkKeyDownEvent.key) {
      case "ArrowLeft":
        this.previousTab();
        preventDefaultKeyAction = true;
        break;
      case "ArrowRight":
        this.nextTab();
        preventDefaultKeyAction = true;
        break;
      case "Home":
        /* eslint-disable-next-line no-magic-numbers */
        this.switchTabByIndex(0, true, true);
        preventDefaultKeyAction = true;
        break;
      case "End":
        /* eslint-disable-next-line no-magic-numbers */
        this.switchTabByIndex(this.$tabListItemLinks.length - 1, true, true);
        preventDefaultKeyAction = true;
        break;
      default:
        break;
    }
    if (preventDefaultKeyAction) {
      itemLinkKeyDownEvent.stopPropagation();
      itemLinkKeyDownEvent.preventDefault();
    }
  }

  nextTab() {
    /* eslint-disable-next-line no-magic-numbers */
    if (this.previousTabIndex < this.$tabListItemLinks.length - 1) {
      /* eslint-disable-next-line no-magic-numbers */
      this.switchTabByIndex(this.previousTabIndex + 1, true);
    } else {
      /* eslint-disable-next-line no-magic-numbers */
      this.switchTabByIndex(0, true);
    }
  }

  previousTab() {
    /* eslint-disable-next-line no-magic-numbers */
    if (this.previousTabIndex >= 1) {
      /* eslint-disable-next-line no-magic-numbers */
      this.switchTabByIndex(this.previousTabIndex - 1, true);
    } else {
      /* eslint-disable-next-line no-magic-numbers */
      this.switchTabByIndex(this.$tabListItemLinks.length - 1, true);
    }
  }

  switchTabByIndex(newIndex, switchFocus = false, disallowClose = false) {
    this.currentTabIndex = newIndex;
    this.previousTabIndex = this.currentTabIndex;
    const isTabAlreadySelected =
      this.$tabListItemLinks[this.currentTabIndex]
        ?.getAttribute("aria-selected")
        .toString() === "true";
    if (isTabAlreadySelected && this.allowClose && !disallowClose) {
      this.currentTabIndex = -1;
    }
    this.$tabListItemLinks.forEach(($tabListItemLink, index) => {
      if (index === this.currentTabIndex) {
        $tabListItemLink.setAttribute("aria-selected", true);
        $tabListItemLink.setAttribute("tabindex", "0");
        if (switchFocus) {
          $tabListItemLink.focus();
        }
      } else {
        $tabListItemLink.setAttribute("aria-selected", false);
        $tabListItemLink.setAttribute(
          "tabindex",
          this.currentTabIndex === -1 ? "0" : "-1",
        );
      }
    });
    this.$tabItems.forEach(($tabItem, index) => {
      if (index === this.currentTabIndex) {
        $tabItem.removeAttribute("hidden");
        $tabItem.setAttribute("tabindex", "0");
      } else {
        $tabItem.setAttribute("hidden", "");
        $tabItem.setAttribute(
          "tabindex",
          this.currentTabIndex === -1 ? "0" : "-1",
        );
      }
    });
  }

  switchTabByID(targetId) {
    const index = Array.from(this.$tabItems).findIndex(
      ($tabItem) => $tabItem.getAttribute("id") === targetId,
    );
    this.switchTabByIndex(index);
  }
}
