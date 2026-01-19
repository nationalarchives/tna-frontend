import { checkTableForScroll } from "../../lib/tables.mjs";

export class Accordion {
  constructor($module) {
    this.$module = $module;
    this.$items = $module && $module.querySelectorAll(".tna-accordion__item");
    if (!this.$module || !this.$items) {
      return;
    }

    this.allowMultipleItemsOpen =
      this.$module.dataset.singleOpenItem !== "true";

    this.$items.forEach(($item) => this.initItem($item));
    this.initState();

    this.$toggleAllButton = this.$module.querySelector(
      ".tna-accordion__toggle-all",
    );
    if (this.$toggleAllButton) {
      this.syncToggleAllButton();
      this.$toggleAllButton.removeAttribute("hidden");
      this.$toggleAllButton.addEventListener("click", () => {
        if (this.isAllOpen()) {
          this.$items.forEach(($item) => this.closeItem($item));
        } else {
          this.$items.forEach(($item) => this.openItem($item));
        }
        this.syncToggleAllButton();
      });
    }
  }

  initItem($item) {
    const $heading = $item.querySelector(".tna-accordion__heading");
    const $content = $item.querySelector(".tna-accordion__body");

    if (!$heading || !$content) {
      return;
    }

    $item.classList.add("tna-accordion__details");
    $item.classList.remove("tna-accordion__item");

    $heading.removeAttribute("class");

    $content.classList.add("tna-accordion__content");
    $content.classList.remove("tna-accordion__body");
    $content.setAttribute("hidden", "");

    const $headingButton = document.createElement("button");
    $headingButton.classList.add("tna-accordion__summary");
    $headingButton.setAttribute("type", "button");
    $headingButton.setAttribute("aria-controls", $content.id);
    $headingButton.innerText = $heading.innerText;
    $heading.innerText = "";
    $heading.appendChild($headingButton);

    $headingButton.addEventListener("click", () => {
      const isOpen = $headingButton.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        this.closeItem($item);
      } else {
        this.openItem($item);
      }
    });
  }

  initState() {
    this.$items.forEach(($item) => {
      if ($item.dataset["isopen"] === "true") {
        this.openItem($item);
      } else {
        this.closeItem($item);
      }
      $item.removeAttribute("data-isopen");
    });
  }

  openItem($item) {
    if (!this.allowMultipleItemsOpen) {
      this.closeAllItemsExcept($item);
    }
    const $headingButton = $item.querySelector(".tna-accordion__summary");
    const $content = $item.querySelector(".tna-accordion__content");
    $headingButton.setAttribute("aria-expanded", "true");
    $headingButton.setAttribute(
      "aria-label",
      `${$headingButton.innerText.trim()}, Hide this section`,
    );
    $content.removeAttribute("hidden");
    // $content.setAttribute("tabindex", "0");
    this.syncToggleAllButton();

    const $tableWrapper = $content.querySelectorAll(".tna-table-wrapper");
    if ($tableWrapper) {
      $tableWrapper.forEach(($wrapper) => {
        checkTableForScroll($wrapper);
      });
    }
  }

  closeItem($item) {
    const $headingButton = $item.querySelector(".tna-accordion__summary");
    const $content = $item.querySelector(".tna-accordion__content");
    $headingButton.setAttribute("aria-expanded", "false");
    $headingButton.setAttribute(
      "aria-label",
      `${$headingButton.innerText.trim()}, Show this section`,
    );
    $content.setAttribute("hidden", "");
    // $content.setAttribute("tabindex", "-1");
    this.syncToggleAllButton();
  }

  closeAllItemsExcept($excludeItem) {
    Array.from(this.$items)
      .filter(
        ($item) =>
          $item.querySelector(".tna-accordion__summary") !== $excludeItem &&
          $item
            .querySelector(".tna-accordion__summary")
            .getAttribute("aria-expanded") === "true",
      )
      .forEach(($item) => this.closeItem($item));
  }

  isAllOpen() {
    return Array.from(this.$items).every(
      ($item) =>
        $item
          .querySelector(".tna-accordion__summary")
          .getAttribute("aria-expanded") === "true",
    );
  }

  syncToggleAllButton() {
    if (this.$toggleAllButton) {
      if (this.isAllOpen()) {
        this.$toggleAllButton.innerText =
          this.$toggleAllButton.dataset.closeAllLabel || "Hide all sections";
      } else {
        this.$toggleAllButton.innerText =
          this.$toggleAllButton.dataset.openAllLabel || "Show all sections";
      }
    }
  }
}
