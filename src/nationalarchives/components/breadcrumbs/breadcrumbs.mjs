import uuidv4 from "../../lib/uuid.mjs";

export class Breadcrumbs {
  constructor($module) {
    this.$module = $module;
    this.$breadcrumbsListWrapper =
      $module && $module.querySelector(".tna-breadcrumbs__wrapper");
    this.$breadcrumbsList =
      $module &&
      this.$breadcrumbsListWrapper &&
      $module.querySelector(".tna-breadcrumbs__list");
    this.$breadcrumbs =
      $module &&
      this.$breadcrumbsListWrapper &&
      this.$breadcrumbsList &&
      $module.querySelectorAll(".tna-breadcrumbs__item");
  }

  init() {
    if (
      !this.$module ||
      !this.$breadcrumbsListWrapper ||
      !this.$breadcrumbsList ||
      !this.$breadcrumbs
    ) {
      return;
    }

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
      $expandButton.setAttribute("aria-expanded", "false");
      $expandButton.setAttribute("aria-controls", uniqueId);
      $expandButton.addEventListener("click", () => {
        this.$module.classList.remove("tna-breadcrumbs--collapsed");
        $expandable.remove();
        this.$breadcrumbsListWrapper.setAttribute("tabindex", "0");
        this.$breadcrumbsListWrapper.focus();
        this.$breadcrumbsListWrapper.setAttribute("tabindex", "-1");
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
