export class Tabs {
  constructor($module) {
    this.$module = $module;
    this.$tabList = $module && $module.querySelector(".tna-tabs__list");
    this.$tabListItemLinks =
      $module &&
      this.$tabList &&
      $module.querySelectorAll(".tna-tabs__list-item-link");
    this.$tabItems = $module && $module.querySelectorAll(".tna-tabs__item");
  }

  init() {
    if (
      !this.$module ||
      !this.$tabList ||
      !this.$tabListItemLinks ||
      !this.$tabItems ||
      this.$tabListItemLinks.length !== this.$tabItems.length
    ) {
      return;
    }

    this.sticky = this.$module.classList.contains("tna-tabs--sticky");

    const startingTarget = window.location.hash.replace(/^#/, "");
    const doesStartingTargetExist = [...this.$tabItems].some(
      ($tabItem) => $tabItem.getAttribute("id") === startingTarget,
    );

    this.$newTabList = document.createElement("div");
    this.$newTabList.setAttribute("role", "tablist");
    this.$newTabList.setAttribute("class", this.$tabList.getAttribute("class"));

    this.$tabItems.forEach(($tabItem, index) => {
      $tabItem.setAttribute("role", "tabpanel");
      $tabItem.setAttribute(
        "aria-labelledby",
        `${$tabItem.getAttribute("id")}-tab`,
      );
      $tabItem.setAttribute("tabindex", "0");
      if (
        (doesStartingTargetExist &&
          $tabItem.getAttribute("id") !== startingTarget) ||
        (!doesStartingTargetExist && index > 0)
      ) {
        $tabItem.setAttribute("hidden", true);
      }
    });

    this.$tabListItemLinks.forEach(($tabListItemLink) => {
      const $replacementButton = document.createElement("button");
      $replacementButton.innerText = $tabListItemLink.innerText;
      $replacementButton.setAttribute(
        "class",
        $tabListItemLink.getAttribute("class"),
      );
      $replacementButton.setAttribute("role", "tab");
      $replacementButton.setAttribute(
        "id",
        $tabListItemLink.getAttribute("id"),
      );
      $replacementButton.setAttribute(
        "aria-controls",
        $tabListItemLink.getAttribute("href").replace(/^#/, ""),
      );
      $replacementButton.setAttribute("tabindex", "-1");
      this.$newTabList.appendChild($replacementButton);
    });

    this.$tabList.replaceWith(this.$newTabList);

    this.$tabListItemLinks = this.$module.querySelectorAll(
      ".tna-tabs__list-item-link",
    );

    this.$tabListItemLinks.forEach(($tabListItemLink, index) => {
      if (
        (startingTarget &&
          $tabListItemLink.getAttribute("aria-controls") ===
            `${startingTarget}`) ||
        (!startingTarget && index === 0)
      ) {
        $tabListItemLink.classList.add("tna-tabs__list-item-link--selected");
        $tabListItemLink.setAttribute("aria-selected", true);
        $tabListItemLink.setAttribute("tabindex", "0");
      } else {
        $tabListItemLink.setAttribute("aria-selected", false);
      }

      $tabListItemLink.addEventListener(
        "keydown",
        (e) => this.handleItemLinkKeyDown(e),
        true,
      );
      $tabListItemLink.addEventListener(
        "click",
        (e) => this.handleItemLinkClick(e),
        true,
      );
    });
  }

  handleItemLinkClick(itemLinkClickEvent) {
    itemLinkClickEvent.preventDefault();
    const targetItem =
      itemLinkClickEvent.currentTarget.getAttribute("aria-controls");

    this.switchTab(targetItem);
  }

  handleItemLinkKeyDown(itemLinkKeyDownEvent) {
    const targetItem = itemLinkKeyDownEvent.currentTarget;
    let overwriteKeyAction = false;

    switch (itemLinkKeyDownEvent.key) {
      case "ArrowLeft":
      case "ArrowUp":
        this.setSelectedToPreviousTab(targetItem);
        overwriteKeyAction = true;
        break;

      case "ArrowRight":
      case "ArrowDown":
        this.setSelectedToNextTab(targetItem);
        overwriteKeyAction = true;
        break;

      case "Home":
        this.switchTab(this.$tabListItemLinks[0].getAttribute("aria-controls"));
        overwriteKeyAction = true;
        break;

      case "End":
        this.switchTab(
          this.$tabListItemLinks[
            this.$tabListItemLinks.length - 1
          ].getAttribute("aria-controls"),
        );
        overwriteKeyAction = true;
        break;

      default:
        break;
    }

    if (overwriteKeyAction) {
      itemLinkKeyDownEvent.stopPropagation();
      itemLinkKeyDownEvent.preventDefault();
    }
  }

  setSelectedToNextTab(targetItem) {
    console.log("setSelectedToNextTab", targetItem);
    const currentIndex = [...this.$tabListItemLinks].findIndex(
      ($tabListItemLink) =>
        $tabListItemLink.getAttribute("id") === targetItem.getAttribute("id"),
    );
    let newIndex;
    if (currentIndex < this.$tabListItemLinks.length - 1) {
      newIndex = currentIndex + 1;
    } else {
      newIndex = 0;
    }
    console.log(currentIndex, newIndex);
    this.switchTab(
      this.$tabListItemLinks[newIndex].getAttribute("aria-controls"),
    );
  }

  setSelectedToPreviousTab(targetItem) {
    console.log("setSelectedToPreviousTab", targetItem);
    const currentIndex = [...this.$tabListItemLinks].findIndex(
      ($tabListItemLink) =>
        $tabListItemLink.getAttribute("id") === targetItem.getAttribute("id"),
    );
    let newIndex;
    if (currentIndex >= 1) {
      newIndex = currentIndex - 1;
    } else {
      newIndex = this.$tabListItemLinks.length - 1;
    }
    console.log(currentIndex, newIndex);
    this.switchTab(
      this.$tabListItemLinks[newIndex].getAttribute("aria-controls"),
    );
  }

  switchTab(targetId) {
    this.$tabListItemLinks.forEach(($tabListItemLink) => {
      if ($tabListItemLink.getAttribute("aria-controls") === targetId) {
        $tabListItemLink.classList.add("tna-tabs__list-item-link--selected");
        $tabListItemLink.setAttribute("aria-selected", true);
        $tabListItemLink.setAttribute("tabindex", "0");
        $tabListItemLink.focus();
      } else {
        $tabListItemLink.classList.remove("tna-tabs__list-item-link--selected");
        $tabListItemLink.setAttribute("aria-selected", false);
        $tabListItemLink.setAttribute("tabindex", "-1");
      }
    });

    this.$tabItems.forEach(($tabItem) => {
      if ($tabItem.getAttribute("id") === targetId) {
        $tabItem.removeAttribute("hidden");
        $tabItem.setAttribute("tabindex", "0");
      } else {
        $tabItem.setAttribute("hidden", true);
        $tabItem.setAttribute("tabindex", "-1");
      }
    });

    if (this.sticky) {
      if (history.replaceState) {
        history.replaceState(null, null, `#${targetId}`);
      } else {
        location.hash = `#${targetId}`;
      }
    }
  }
}
