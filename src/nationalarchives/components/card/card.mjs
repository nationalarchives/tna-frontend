export class Card {
  constructor($module, tapTimeMax = 300) {
    this.$module = $module;
    this.$cardTitleLink =
      $module && $module.querySelector(".tna-card__title-link");
    this.$cardAction = $module && $module.querySelector(".tna-card__action");
    this.tapTimeMax = tapTimeMax;
  }

  init() {
    if (
      !this.$module ||
      (!this.$cardTitleLink && !this.$cardAction) ||
      this.$module.classList.contains("tna-card--no-global-click")
    ) {
      return;
    }

    this.touchStartTime = null;

    // this.$module.addEventListener("touchstart", () =>
    //   this.handleCardTouchStart(),
    // );
    // this.$module.addEventListener("touchend", () => this.handleCardTouchEnd());
  }

  handleCardClick() {
    if (this.$cardTitleLink) {
      this.$cardTitleLink.click();
    } else if (this.$cardAction) {
      this.$cardAction.click();
    }
  }

  handleCardTouchStart() {
    this.touchStartTime = new Date();
  }

  handleCardTouchEnd() {
    const duration = new Date().getTime() - this.touchStartTime.getTime();
    if (duration < this.tapTimeMax) {
      this.handleCardClick();
    }
  }
}
