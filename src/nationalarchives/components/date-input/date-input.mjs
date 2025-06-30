import Cookies from "../../lib/cookies.mjs";

export { Cookies };

export class DateInputProgressive {
  constructor($module) {
    this.$module = $module;
    this.$yearWrapper =
      $module && $module.querySelector(".tna-date-input__item--year");
    this.$yearInput =
      this.$yearWrapper && this.$yearWrapper.querySelector("input");
    this.$monthWrapper =
      $module && $module.querySelector(".tna-date-input__item--month");
    this.$monthInput =
      this.$monthWrapper && this.$monthWrapper.querySelector("input");
    this.$dayWrapper =
      $module && $module.querySelector(".tna-date-input__item--day");
    this.$dayInput =
      this.$dayWrapper && this.$dayWrapper.querySelector("input");

    if (!this.$module) {
      return;
    }

    this.update();
    window.addEventListener("pageshow", () => this.update());

    if (this.$yearInput) {
      this.$yearInput.addEventListener("keyup", () => this.update());
      this.$yearInput.addEventListener("change", () => this.update());
    }
    if (this.$monthInput) {
      this.$monthInput.addEventListener("keyup", () => this.update());
      this.$monthInput.addEventListener("change", () => this.update());
    }
    if (this.$dayInput) {
      this.$dayInput.addEventListener("keyup", () => this.update());
      this.$dayInput.addEventListener("change", () => this.update());
    }
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
    if (!this.$yearInput) {
      return true;
    }
    const yearValue = parseInt(this.$yearInput.value.trim());
    return !isNaN(this.$yearInput.value) && !isNaN(yearValue) && yearValue > 0;
  }

  isValidMonth() {
    if (!this.$monthInput) {
      return true;
    }
    const monthRawValue = this.$monthInput.value.trim();
    const monthIntValue = parseInt(monthRawValue);
    const validMonthStrings = [
      "january",
      "february",
      "march",
      "april",
      "may",
      "june",
      "july",
      "august",
      "september",
      "october",
      "november",
      "december",
      "jan",
      "feb",
      "mar",
      "apr",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ];
    return (
      (!isNaN(this.$monthInput.value) &&
        !isNaN(monthIntValue) &&
        monthIntValue > 0 &&
        monthIntValue <= 12) ||
      validMonthStrings.includes(monthRawValue.toLowerCase())
    );
  }

  showMonth() {
    if (this.$monthWrapper) {
      this.$monthWrapper.removeAttribute("hidden");
    }
  }

  hideMonth() {
    if (this.$monthWrapper) {
      this.$monthWrapper.setAttribute("hidden", "");
    }
  }

  showDay() {
    if (this.$dayWrapper) {
      this.$dayWrapper.removeAttribute("hidden");
    }
  }

  hideDay() {
    if (this.$dayWrapper) {
      this.$dayWrapper.setAttribute("hidden", "");
    }
  }
}
