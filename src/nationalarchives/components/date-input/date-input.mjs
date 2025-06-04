import Cookies from "../../lib/cookies.mjs";

export { Cookies };

export class DateInput {
  constructor($module) {
    this.$module = $module;
    this.$dayWrapper =
      $module && $module.querySelector(".tna-date-input__item--day");
    this.$dayInput =
      this.$dayWrapper && this.$dayWrapper.querySelector("input");
    this.$monthWrapper =
      $module && $module.querySelector(".tna-date-input__item--month");
    this.$monthInput =
      this.$monthWrapper && this.$monthWrapper.querySelector("input");
    this.$yearWrapper =
      $module && $module.querySelector(".tna-date-input__item--year");
    this.$yearInput =
      this.$yearWrapper && this.$yearWrapper.querySelector("input");

    if (
      !this.$module ||
      !this.$dayWrapper ||
      !this.$dayInput ||
      !this.$monthWrapper ||
      !this.$monthInput ||
      !this.$yearWrapper ||
      !this.$yearInput
    ) {
      return;
    }

    this.update();

    this.$yearInput.addEventListener("keyup", () => this.update());
    this.$yearInput.addEventListener("change", () => this.update());
    this.$monthInput.addEventListener("keyup", () => this.update());
    this.$monthInput.addEventListener("change", () => this.update());
    this.$dayInput.addEventListener("keyup", () => this.update());
    this.$dayInput.addEventListener("change", () => this.update());
  }

  update() {
    if (this.isValidYear()) {
      this.showMonth();

      if (this.isValidMonth()) {
        this.showDay();
      } else {
        this.hideDay();
      }
    } else {
      this.hideMonth();
      this.hideDay();
    }
  }

  isValidYear() {
    const yearValue = parseInt(this.$yearInput.value.trim());
    return !isNaN(this.$yearInput.value) && !isNaN(yearValue) && yearValue > 0;
  }

  isValidMonth() {
    const monthValue = parseInt(this.$monthInput.value.trim());
    return (
      !isNaN(this.$monthInput.value) &&
      !isNaN(monthValue) &&
      monthValue > 0 &&
      monthValue <= 12
    );
  }

  showMonth() {
    this.$monthWrapper.removeAttribute("hidden");
  }

  hideMonth() {
    this.$monthWrapper.setAttribute("hidden", "");
  }

  showDay() {
    this.$dayWrapper.removeAttribute("hidden");
  }

  hideDay() {
    this.$dayWrapper.setAttribute("hidden", "");
  }
}
