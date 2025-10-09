export class Gallery {
  constructor($module) {
    this.$module = $module;
    this.$itemsContainer =
      $module && $module.querySelector(".tna-gallery__items");
    this.$items =
      this.$itemsContainer &&
      this.$itemsContainer.querySelectorAll(".tna-gallery__item");
    this.$navigation =
      $module && $module.querySelector(".tna-gallery__navigation");
    this.$navigationItems =
      this.$navigation &&
      $module.querySelectorAll(".tna-gallery__navigation-item");
    this.$navigationButtons =
      $module && $module.querySelector(".tna-gallery__navigation-buttons");

    if (
      !this.$module ||
      !this.$itemsContainer ||
      !this.$items ||
      this.$items.length < 2 ||
      !this.$navigation ||
      !this.$navigationItems ||
      !this.$navigationButtons
    ) {
      return;
    }

    this.$module.classList.add("tna-gallery--interactive");

    this.$navigationButtonPrev = this.$navigationButtons.querySelector(
      ".tna-gallery__navigation-prev",
    );
    this.$navigationButtonNext = this.$navigationButtons.querySelector(
      ".tna-gallery__navigation-next",
    );

    this.setup();
    this.currentId = this.$items[0].id;
    this.showItem(this.currentId);
  }

  setup() {
    this.$items.forEach(($item) => {
      $item.setAttribute("hidden", "");
      $item.setAttribute("aria-hidden", "true");
      $item
        .querySelector(".tna-gallery__item-header")
        ?.setAttribute("aria-hidden", "true");
    });
    this.$navigation.removeAttribute("hidden");
    this.$navigationItems.forEach(($item) => {
      $item.addEventListener("click", () => {
        this.showItem($item.getAttribute("aria-controls"));
        this.$itemsContainer.setAttribute("tabindex", "0");
        this.$itemsContainer.focus();
      });
    });
    this.$module.addEventListener("keydown", (e) => {
      let preventDefaultKeyAction = false;
      switch (e.key) {
        case "ArrowLeft":
        case "ArrowUp":
          this.showPreviousItem();
          preventDefaultKeyAction = true;
          break;
        case "ArrowRight":
        case "ArrowDown":
          this.showNextItem();
          preventDefaultKeyAction = true;
          break;
        case "Home":
          this.showFirstItem();
          preventDefaultKeyAction = true;
          break;
        case "End":
          this.showLastItem();
          preventDefaultKeyAction = true;
          break;
      }
      if (preventDefaultKeyAction) {
        e.stopPropagation();
        e.preventDefault();
      }
    });

    this.$navigationButtons?.removeAttribute("hidden");
    this.$navigationButtonPrev?.addEventListener("click", () => {
      this.showPreviousItem();
    });
    this.$navigationButtonNext?.addEventListener("click", () => {
      this.showNextItem();
    });

    this.$liveRegion = document.createElement("div");
    this.$liveRegion.setAttribute("aria-live", "polite");
    this.$liveRegion.setAttribute("aria-atomic", "true");
    this.$liveRegion.setAttribute("class", "tna-gallery__item-header");
    this.$itemsContainer.prepend(this.$liveRegion);
    this.$itemsContainer.classList.add("tna-gallery__items--hide-item-titles");
    this.$itemsContainer.addEventListener("blur", () =>
      this.$itemsContainer.removeAttribute("tabindex"),
    );
  }

  showItem(id) {
    this.$items.forEach(($item) => {
      if (id && $item.id === id) {
        $item.removeAttribute("hidden");
        $item.removeAttribute("aria-hidden");
      } else {
        $item.setAttribute("hidden", "");
        $item.setAttribute("aria-hidden", "true");
      }
    });
    this.$navigationItems.forEach(($item) => {
      if (id) {
        if ($item.getAttribute("aria-controls") === id) {
          $item.setAttribute("aria-current", "true");
        } else {
          $item.setAttribute("aria-current", "false");
        }
      } else {
        $item.setAttribute("aria-current", "false");
      }
    });
    this.currentId = id;
    this.$liveRegion.textContent = `Image ${this.getCurrentItemIndex() + 1} of ${this.$items.length}`;
  }

  getCurrentItemIndex() {
    return Array.from(this.$items).findIndex(
      ($item) => $item.id === this.currentId,
    );
  }

  showPreviousItem() {
    let nextIndexToShow = this.getCurrentItemIndex() - 1;
    if (nextIndexToShow < 0) {
      nextIndexToShow = this.$items.length - 1;
    }
    this.showItem(this.$items[nextIndexToShow].id);
  }

  showNextItem() {
    let nextIndexToShow = this.getCurrentItemIndex() + 1;
    if (nextIndexToShow >= this.$items.length) {
      nextIndexToShow = 0;
    }
    this.showItem(this.$items[nextIndexToShow].id);
  }

  showFirstItem() {
    this.showItem(this.$items[0].id);
  }

  showLastItem() {
    this.showItem(this.$items[this.$items.length - 1].id);
  }
}
