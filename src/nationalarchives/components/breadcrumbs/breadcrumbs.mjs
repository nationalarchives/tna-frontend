import uuidv4 from "../../lib/uuid.mjs";

export class Breadcrumbs {
  constructor($module) {
    this.$module = $module;
    this.$breadcrumbsList =
      $module && $module.querySelector(".tna-breadcrumbs__list");
    this.$breadcrumbs =
      $module &&
      this.$breadcrumbsList &&
      $module.querySelectorAll(".tna-breadcrumbs__item");

    if (this.$module && this.$breadcrumbsList && this.$breadcrumbs) {
      if (
        this.$breadcrumbs.length > 2 &&
        !this.$module.classList.contains("tna-breadcrumbs--no-collapse")
      ) {
        const uniqueId = `tna-breadcrumbs-${uuidv4()}`;

        const $expandable = document.createElement("li");
        $expandable.classList.add(
          "tna-breadcrumbs__item",
          "tna-breadcrumbs__item--expandable",
        );
        $expandable.style.display = "none";

        const $expandButton = document.createElement("button");
        $expandButton.classList.add("tna-breadcrumbs__link");
        $expandButton.innerHTML =
          "<span class='tna-!--visually-hidden'>Expand breadcrumbs</span>&hellip;";
        $expandButton.setAttribute("type", "button");
        $expandButton.setAttribute("aria-expanded", "false");
        $expandButton.setAttribute("aria-controls", uniqueId);
        $expandButton.addEventListener("click", () => {
          this.$module.classList.remove("tna-breadcrumbs--collapsed");
          $expandable.remove();
          this.$module.setAttribute("tabindex", "0");
          this.$module.focus();
          this.$module.addEventListener(
            "blur",
            () => {
              this.$module.removeAttribute("tabindex");
            },
            { once: true },
          );
        });
        $expandable.appendChild($expandButton);

        this.$breadcrumbsList.setAttribute("id", uniqueId);
        this.$breadcrumbsList.insertBefore(
          $expandable,
          this.$breadcrumbs[this.$breadcrumbs.length - 2].nextSibling,
        );

        this.$module.classList.add("tna-breadcrumbs--collapsed");
      }
    }
  }
}
