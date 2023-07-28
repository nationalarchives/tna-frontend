export class Card {
  constructor($module) {
    this.$module = $module;
    this.$cardTitleLink =
      $module && $module.querySelector(".tna-card__title-link");
    this.$cardAction = $module && $module.querySelector(".tna-card__action");
  }

  init() {
    if (
      !this.$module ||
      (!this.$cardTitleLink && !this.$cardAction) ||
      this.$module.classList.contains("tna-card--no-global-click")
    ) {
      return;
    }

    this.$module.addEventListener("click", () => this.handleCardClick());
  }

  handleCardClick() {
    console.log("CLICK");
    // if (this.$cardTitleLink) {
    //   this.$cardTitleLink.click();
    // } else if (this.$cardAction) {
    //   this.$cardAction.click();
    // }
  }
}
