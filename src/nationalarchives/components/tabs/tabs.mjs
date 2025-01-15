export class Tabs {
  constructor($module) {
    this.$module = $module;
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

    this.currentTabIndex = 0;
    this.init();
  }

  init() {
    this.$module.classList.add("tna-tabs--interactive");
    this.$tabList.removeAttribute("hidden");
    this.$tabListItemLinks.forEach(($tabListItemLink) => {
      const tabPanelID = $tabListItemLink.getAttribute("aria-controls");
      $tabListItemLink.setAttribute("aria-selected", false);
      const $tabPanel = document.getElementById(tabPanelID);
      $tabPanel.setAttribute("aria-labelledby", $tabListItemLink.id);
      $tabPanel.setAttribute("role", "tabpanel");
      $tabListItemLink.addEventListener(
        "click",
        (e) => this.handleItemLinkClick(e),
        true,
      );
    });
    this.switchTabByIndex(this.currentTabIndex);
    this.$module.addEventListener("keydown", (e) =>
      this.handleItemLinkKeyDown(e),
    );
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
      case "ArrowUp":
        this.previousTab();
        preventDefaultKeyAction = true;
        break;
      case "ArrowRight":
      case "ArrowDown":
        this.nextTab();
        preventDefaultKeyAction = true;
        break;
      case "Home":
        this.switchTabByIndex(0, true);
        preventDefaultKeyAction = true;
        break;
      case "End":
        this.switchTabByIndex(this.$tabListItemLinks.length - 1, true);
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
    if (this.currentTabIndex < this.$tabListItemLinks.length - 1) {
      this.switchTabByIndex(this.currentTabIndex + 1, true);
    } else {
      this.switchTabByIndex(0, true);
    }
  }

  previousTab() {
    if (this.currentTabIndex >= 1) {
      this.switchTabByIndex(this.currentTabIndex - 1, true);
    } else {
      this.switchTabByIndex(this.$tabListItemLinks.length - 1, true);
    }
  }

  switchTabByIndex(newIndex, switchFocus = false) {
    this.currentTabIndex = newIndex;
    this.$tabListItemLinks.forEach(($tabListItemLink, index) => {
      if (index === this.currentTabIndex) {
        $tabListItemLink.setAttribute("aria-selected", true);
        $tabListItemLink.setAttribute("tabindex", "0");
        if (switchFocus) {
          $tabListItemLink.focus();
        }
      } else {
        $tabListItemLink.setAttribute("aria-selected", false);
        $tabListItemLink.setAttribute("tabindex", "-1");
      }
    });
    this.$tabItems.forEach(($tabItem, index) => {
      if (index === this.currentTabIndex) {
        $tabItem.removeAttribute("hidden");
        $tabItem.setAttribute("tabindex", "0");
      } else {
        $tabItem.setAttribute("hidden", "");
        $tabItem.setAttribute("tabindex", "-1");
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
