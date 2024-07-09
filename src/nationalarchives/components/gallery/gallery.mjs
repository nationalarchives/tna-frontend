export class Gallery {
  constructor($module) {
    this.$module = $module;
    this.$items = $module && $module.querySelectorAll(".tna-gallery__item");
    this.$navigation =
      $module && $module.querySelector(".tna-gallery__navigation");
    this.$items = $module && $module.querySelectorAll(".tna-gallery__item");
    this.$navigationItems =
      this.$navigation &&
      $module.querySelectorAll(".tna-gallery__navigation-item");
    this.$options = $module && $module.querySelector(".tna-gallery__options");

    if (
      !this.$module ||
      !this.$items ||
      !this.$navigation ||
      !this.$navigationItems ||
      !this.$options
    ) {
      return;
    }

    this.setup();
    this.currentId = this.$items[0].id;
    this.showItem(this.currentId);
  }

  setup() {
    this.$items.forEach(($item) => {
      $item.setAttribute("hidden", "until-found");
    });
    this.$navigation.removeAttribute("hidden");
    this.$navigationItems.forEach(($item) => {
      $item.addEventListener("click", () =>
        this.showItem($item.getAttribute("aria-controls")),
      );
    });
    this.$module.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowLeft":
          this.showPreviousItem();
          break;
        case "ArrowRight":
          this.showNextItem();
          break;
      }
    });
    this.$options.removeAttribute("hidden");
    this.$options
      .querySelector('button[value="fullscreen"]')
      ?.addEventListener("click", () => this.toggleFullScreen());
  }

  showItem(id) {
    this.$items.forEach(($item) => {
      if ($item.id !== id) {
        $item.setAttribute("hidden", "until-found");
      } else {
        $item.removeAttribute("hidden");
      }
    });
    this.$navigationItems.forEach(($item) => {
      if ($item.getAttribute("aria-controls") !== id) {
        $item.setAttribute("aria-expanded", "false");
      } else {
        $item.setAttribute("aria-expanded", "true");
      }
    });
    this.currentId = id;
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

  toggleFullScreen() {
    if (!document.fullscreenElement) {
      this.$module.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  }
}
