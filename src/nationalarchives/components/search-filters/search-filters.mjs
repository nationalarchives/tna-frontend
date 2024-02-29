export class SearchFilters {
  constructor($module) {
    this.$module = $module;

    if (!this.$module) {
      return;
    }

    this.$module.classList.add("tna-search-filters--js-enabled");

    Array.from(
      this.$module.querySelectorAll(".tna-search-filters__fieldset"),
    ).forEach(($fieldset) => {
      // const type = $fieldset.dataset.type;
      const $toggle = $fieldset.querySelector(
        ".tna-search-filters__item-toggle",
      );
      const $heading = $fieldset.querySelector(
        ".tna-search-filters__item-toggle ~ .tna-heading-s",
      );
      const $item = $fieldset.querySelector(".tna-search-filters__item");

      if (!$toggle || !$heading || !$item) {
        return;
      }

      $toggle.removeAttribute("hidden");
      $heading.remove();

      this.syncItem($toggle, $item);

      $toggle.addEventListener("click", () => {
        this.toggleItem($toggle, $item);
      });

      // if (type === "multiple") {
      //   const $count = $toggle.querySelector(
      //     ".tna-search-filters__item-toggle-count",
      //   );
      //   if ($count) {
      //     $item.addEventListener("change", () => {
      //       const selected = Array.from(
      //         $item.querySelectorAll('input[type="checkbox"]:checked'),
      //       ).length;
      //       $count.innerText = selected ? `(${selected} selected)` : "";
      //     });
      //   }
      // }
    });
  }

  toggleItem($toggle, $item) {
    $toggle.setAttribute(
      "aria-expanded",
      $toggle.getAttribute("aria-expanded") == "false",
    );
    this.syncItem($toggle, $item);
  }

  syncItem($toggle, $item) {
    if ($toggle.getAttribute("aria-expanded") == "true") {
      $item.removeAttribute("hidden");
    } else {
      $item.setAttribute("hidden", true);
    }
  }
}
