export class Accordion {
  polyfillRequired = null;

  constructor($module) {
    this.$module = $module;
    this.$items = $module && $module.querySelectorAll(".tna-accordion__item");
    if (!this.$module || !this.$items) {
      return;
    }

    this.allowMultipleItemsOpen =
      this.$module.getAttribute("aria-multiselectable") === "true";

    this.$items.forEach(($item) => this.initItem($item));
    this.initState();
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
    $content.setAttribute("hidden", "until-found");

    const $headingButton = document.createElement("button");
    $headingButton.classList.add("tna-accordion__summary");
    $headingButton.setAttribute("aria-controls", $content.id);
    $heading.parentNode.insertBefore($headingButton, $heading.nextSibling);
    $headingButton.appendChild($heading);

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
      `${$headingButton.innerText}, Hide this section`,
    );
    $content.removeAttribute("hidden");
    // $content.setAttribute("tabindex", "0");
  }

  closeItem($item) {
    const $headingButton = $item.querySelector(".tna-accordion__summary");
    const $content = $item.querySelector(".tna-accordion__content");
    $headingButton.setAttribute("aria-expanded", "false");
    $headingButton.setAttribute(
      "aria-label",
      `${$headingButton.innerText}, Show this section`,
    );
    $content.setAttribute("hidden", "until-found");
    // $content.setAttribute("tabindex", "-1");
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
}
