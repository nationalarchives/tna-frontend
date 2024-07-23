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
    this.$options = $module && $module.querySelector(".tna-gallery__options");
    this.$navigationButtons =
      $module && $module.querySelector(".tna-gallery__navigation-buttons");

    if (
      !this.$module ||
      !this.$itemsContainer ||
      !this.$items ||
      !this.$navigation ||
      !this.$navigationItems ||
      !this.$options ||
      !this.$navigationButtons
    ) {
      return;
    }

    this.$module.classList.add("tna-gallery--interactive");

    this.$showIndex = this.$options.querySelector('button[value="show-index"]');
    this.$enterFullscreen = this.$options.querySelector(
      'button[value="enter-fullscreen"]',
    );
    this.$exitFullscreen = this.$options.querySelector(
      'button[value="exit-fullscreen"]',
    );

    this.$navigationButtonPrev = this.$navigationButtons.querySelector(
      ".tna-gallery__navigation-prev",
    );
    this.$navigationButtonNext = this.$navigationButtons.querySelector(
      ".tna-gallery__navigation-next",
    );

    this.$module.addEventListener("fullscreenchange", () =>
      this.syncFullScreen(),
    );

    this.setup();
    this.allowGridIndex = this.$module.dataset["showgrid"] || false;
    if (this.allowGridIndex) {
      this.showIndex();
    } else {
      this.currentId = this.$items[0].id;
      this.showItem(this.currentId);
    }
  }

  setup() {
    this.$items.forEach(($item) => {
      $item.setAttribute("hidden", "until-found");
      $item.setAttribute("role", "tabpanel");
    });
    this.$navigation.removeAttribute("hidden");
    this.$navigationItems.forEach(($item) => {
      $item.addEventListener("click", () =>
        this.showItem($item.getAttribute("aria-controls"), true),
      );
    });
    this.$module.setAttribute("tabindex", "0");
    this.$module.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "ArrowLeft":
        case "ArrowUp":
          this.showPreviousItem();
          break;
        case "ArrowRight":
        case "ArrowDown":
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
    this.$showIndex?.addEventListener("click", () => this.showIndex());
    this.$navigationButtons?.removeAttribute("hidden");
    this.$navigationButtonPrev?.addEventListener("click", () =>
      this.showPreviousItem(),
    );
    this.$navigationButtonNext?.addEventListener("click", () =>
      this.showNextItem(),
    );
  }

  showIndex() {
    this.showItem("");
    this.$itemsContainer.setAttribute("tabindex", "-1");
    this.$showIndex?.setAttribute("hidden", true);
  }

  showItem(id, focusItem = false) {
    this.$items.forEach(($item) => {
      if (id && $item.id === id) {
        $item.removeAttribute("hidden");
        $item.removeAttribute("tabindex");
      } else {
        $item.setAttribute("hidden", "until-found");
        $item.setAttribute("tabindex", "-1");
      }
    });
    this.$navigationItems.forEach(($item, index) => {
      if (id) {
        if ($item.getAttribute("aria-controls") === id) {
          $item.setAttribute("aria-selected", "true");
          $item.setAttribute("tabindex", "0");
          // if (focusItem) {
          //   $item.focus();
          // }
        } else {
          $item.setAttribute("aria-selected", "false");
          $item.setAttribute("tabindex", "-1");
        }
      } else {
        $item.setAttribute("aria-selected", "false");
        $item.setAttribute("tabindex", index === 0 ? "0" : "-1");
      }
    });
    if (this.allowGridIndex) {
      this.$showIndex?.removeAttribute("hidden");
    }
    this.currentId = id;
    this.$itemsContainer.setAttribute("tabindex", "0");
    if (focusItem) {
      this.$itemsContainer.focus();
    }
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
    this.showItem(this.$items[nextIndexToShow].id, true);
  }

  showNextItem() {
    let nextIndexToShow = this.getCurrentItemIndex() + 1;
    if (nextIndexToShow >= this.$items.length) {
      nextIndexToShow = 0;
    }
    this.showItem(this.$items[nextIndexToShow].id, true);
  }

  showFirstItem() {
    this.showItem(this.$items[0].id, true);
  }

  showLastItem() {
    this.showItem(this.$items[this.$items.length - 1].id, true);
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
    this.syncFullScreen();
  }

  exitFullScreen() {
    document.exitFullscreen();
    this.syncFullScreen();
  }

  syncFullScreen() {
    if (document.fullscreenElement) {
      this.$enterFullscreen.setAttribute("hidden", true);
      this.$exitFullscreen.removeAttribute("hidden");
      this.$module.classList.add("tna-gallery--fullscreen");
    } else {
      this.$exitFullscreen.setAttribute("hidden", true);
      this.$enterFullscreen.removeAttribute("hidden");
      this.$module.classList.remove("tna-gallery--fullscreen");
    }
  }
}
