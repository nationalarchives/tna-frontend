export class Accordion {
  polyfillRequired = null;

  constructor($module) {
    this.$module = $module;
    this.$firstDetailsElement =
      $module && $module.querySelector(".tna-accordion__details[name]");
    this.$detailsElements =
      $module &&
      this.$firstDetailsElement &&
      document.querySelectorAll(
        `.tna-accordion__details[name="${this.$firstDetailsElement.getAttribute("name")}"]`,
      );
    if (!this.$module || !this.$detailsElements) {
      return;
    }

    Array.from(this.$detailsElements).forEach(($detailsElement) => {
      $detailsElement.addEventListener("toggle", (e) => {
        const $thisDetailsElement = e.target;
        if ($thisDetailsElement.hasAttribute("open")) {
          Array.from(this.$detailsElements)
            .filter(
              ($eachDetailsElement) =>
                $eachDetailsElement !== $thisDetailsElement &&
                $eachDetailsElement.hasAttribute("open"),
            )
            .forEach(($eachDetailsElement) =>
              $eachDetailsElement.removeAttribute("open"),
            );
        }
      });
    });
  }
}
