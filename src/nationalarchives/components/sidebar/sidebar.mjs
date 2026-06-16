export class Sidebar {
  constructor($module, options = {}) {
    this.$module = $module;
    this.items =
      $module &&
      Array.from($module.querySelectorAll(".tna-sidebar__item"))
        .map(($item) => {
          const id = $item
            .querySelector(".tna-sidebar__link[href^='#']")
            .getAttribute("href")
            /* eslint-disable-next-line no-magic-numbers */
            .substring(1);
          const target = document.getElementById(id);
          return {
            $item,
            id,
            target,
          };
        })
        .filter((item) => item.target);

    if (!this.$module || !this.items) {
      return;
    }

    /* eslint-disable-next-line no-magic-numbers */
    const { scrollTopThreshold = 0, disableHighlightSize = "small" } = options;
    this.scrollTopThreshold = scrollTopThreshold;
    this.disableHighlightSize = disableHighlightSize;

    this.init();
  }

  init() {
    this.breakpoints = {
      tiny:
        getComputedStyle(document.documentElement).getPropertyValue(
          "--media-breakpoint-tiny",
        ) || "480px",
      small:
        getComputedStyle(document.documentElement).getPropertyValue(
          "--media-breakpoint-small",
        ) || "768px",
      medium:
        getComputedStyle(document.documentElement).getPropertyValue(
          "--media-breakpoint-medium",
        ) || "1024px",
    };

    if (this.disableHighlightSize) {
      if (!Object.keys(this.breakpoints).includes(this.disableHighlightSize)) {
        throw new Error(
          `Invalid value for disableHighlightSize: ${this.disableHighlightSize}. Expected one of: ${Object.keys(this.breakpoints).join(", ")}`,
        );
      }
      this.hideOnDevice = window.matchMedia(
        `(max-width: ${this.breakpoints[this.disableHighlightSize]})`,
      );
    } else {
      this.hideOnDevice = null;
    }

    this.currentItem = null;

    window.addEventListener("scroll", () => this.highlightCurrentSection());
    window.addEventListener("resize", () => this.highlightCurrentSection());
    this.highlightCurrentSection();
  }

  highlightCurrentSection() {
    if (this.hideOnDevice && this.hideOnDevice.matches) {
      this.items.forEach((item) => {
        item.$item.classList.remove("tna-sidebar__item--current");
      });
      this.currentItem = null;
      return;
    }

    const $topItem = this.items.findLast(
      (item) =>
        Math.floor(item.target.getBoundingClientRect().top) <=
        this.scrollTopThreshold,
    );

    if ($topItem !== this.currentItem) {
      this.items.forEach((item) => {
        if ($topItem && item === $topItem) {
          this.currentItem = item;
          this.currentItem.$item.classList.add("tna-sidebar__item--current");
        } else {
          item.$item.classList.remove("tna-sidebar__item--current");
        }
      });
    }
    this.currentItem = $topItem || null;
  }
}
