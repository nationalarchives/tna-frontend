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

    // return

    if (
      !this.$module ||
      !this.$items ||
      !this.$navigation ||
      !this.$navigationItems ||
      !this.$options
    ) {
      return;
    }

    this.$enterFullscreen = this.$options.querySelector(
      'button[value="enter-fullscreen"]',
    );
    this.$exitFullscreen = this.$options.querySelector(
      'button[value="exit-fullscreen"]',
    );

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
        case "Home":
          this.showFirstItem();
          break;
        case "End":
          this.showLastItem();
          break;
      }
    });
    this.$options.removeAttribute("hidden");
    if (
      document.fullscreenEnabled &&
      this.$enterFullscreen &&
      this.$exitFullscreen
    ) {
      this.$enterFullscreen?.addEventListener("click", () =>
        this.enterFullScreen(),
      );
      this.$exitFullscreen?.addEventListener("click", () =>
        this.exitFullScreen(),
      );
      this.$enterFullscreen?.removeAttribute("hidden");
    }
  }

  showItem(id) {
    this.$items.forEach(($item) => {
      if ($item.id !== id) {
        $item.setAttribute("hidden", "until-found");
        $item.setAttribute("tabindex", "-1");
      } else {
        $item.removeAttribute("hidden");
        $item.setAttribute("tabindex", "0");
      }
    });
    this.$navigationItems.forEach(($item) => {
      if ($item.getAttribute("aria-controls") !== id) {
        $item.setAttribute("aria-expanded", "false");
        $item.setAttribute("tabindex", "-1");
      } else {
        $item.setAttribute("aria-expanded", "true");
        $item.setAttribute("tabindex", "0");
        $item.focus();
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

  showFirstItem() {
    this.showItem(this.$items[0].id);
  }

  showLastItem() {
    this.showItem(this.$items[this.$items.length - 1].id);
  }

  toggleFullScreen() {
    if (!document.fullscreenElement) {
      this.enterFullScreen();
    } else if (document.exitFullscreen) {
      this.exitFullScreen();
    }
  }

  enterFullScreen() {
    this.$module.requestFullscreen();
    this.$enterFullscreen.setAttribute("hidden", true);
    this.$exitFullscreen.removeAttribute("hidden");
  }

  exitFullScreen() {
    document.exitFullscreen();
    this.$exitFullscreen.setAttribute("hidden", true);
    this.$enterFullscreen.removeAttribute("hidden");
  }
}
