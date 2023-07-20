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
      console.error("test");
      return;
    }

    this.sticky = this.$module.classList.contains("tna-tabs--sticky");

    const startingTarget = window.location.hash.replace(/^#/, "");

    this.$newTabList = document.createElement("div");
    this.$newTabList.setAttribute("role", "tablist");
    this.$newTabList.setAttribute("class", this.$tabList.getAttribute("class"));

    this.$tabItems.forEach(($tabItem, index) => {
      $tabItem.setAttribute("role", "tabpanel");
      $tabItem.setAttribute(
        "aria-labelledby",
        `${$tabItem.getAttribute("id")}-tab`,
      );
      $tabItem.setAttribute("tabindex", "-1");
      if (
        (startingTarget && $tabItem.getAttribute("id") !== startingTarget) ||
        (!startingTarget && index > 0)
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
      } else {
        $tabListItemLink.setAttribute("aria-selected", false);
      }

      $tabListItemLink.addEventListener(
        "click",
        (e) => this.handleItemLinkClick(e),
        true,
      );
    });
  }

  handleItemLinkClick(itemLinkClickEvent) {
    itemLinkClickEvent.preventDefault();
    const targetItem = itemLinkClickEvent.target.getAttribute("aria-controls");

    this.$tabListItemLinks.forEach(($tabListItemLink) => {
      if ($tabListItemLink.getAttribute("aria-controls") === targetItem) {
        $tabListItemLink.classList.add("tna-tabs__list-item-link--selected");
        $tabListItemLink.setAttribute("aria-selected", true);
      } else {
        $tabListItemLink.classList.remove("tna-tabs__list-item-link--selected");
        $tabListItemLink.setAttribute("aria-selected", false);
      }
    });

    if (this.sticky) {
      if (history.replaceState) {
        history.replaceState(null, null, targetItem);
      } else {
        location.hash = targetItem;
      }
    }

    this.showItem(targetItem.replace(/^#/, ""));
  }

  showItem(targetId) {
    this.$tabItems.forEach(($tabItem) => {
      if ($tabItem.getAttribute("id") === targetId) {
        $tabItem.removeAttribute("hidden");
        $tabItem.focus();
      } else {
        $tabItem.setAttribute("hidden", true);
      }
    });
  }
}
