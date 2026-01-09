import uuidv4 from "./uuid.mjs";

export const checkTableForScroll = ($tableWrapper, init = false) => {
  const scrollable = $tableWrapper.scrollWidth > $tableWrapper.clientWidth;
  const $caption = $tableWrapper.querySelector("caption");
  if (init) {
    if (!$caption) {
      console.warn("Missing <caption> element on table", $tableWrapper);
    } else if (!$caption.id) {
      $caption.id = `table-caption-${uuidv4()}`;
    }
  }
  if (scrollable) {
    $tableWrapper.setAttribute("tabindex", "0");
    $tableWrapper.setAttribute("role", "region");
    $tableWrapper.setAttribute("aria-labelledby", $caption?.id || "");
    $tableWrapper.classList.add("tna-table-wrapper--scroll");
    if (!window.CSS?.supports("scroll-timeline", "--scrollfade x") && init) {
      const updateScrollShadows = ($tableWrapper) => {
        $tableWrapper.style.setProperty(
          "--left-shadow",
          $tableWrapper.scrollLeft > 1 ? "rgb(0 0 0 / 40%)" : "rgb(0 0 0 / 0%)",
        );
        $tableWrapper.style.setProperty(
          "--right-shadow",
          $tableWrapper.scrollWidth -
            ($tableWrapper.clientWidth + $tableWrapper.scrollLeft) >
            1
            ? "rgb(0 0 0 / 40%)"
            : "rgb(0 0 0 / 0%)",
        );
      };
      updateScrollShadows($tableWrapper);
      $tableWrapper.addEventListener("scroll", () =>
        updateScrollShadows($tableWrapper),
      );
      window.addEventListener("resize", () =>
        updateScrollShadows($tableWrapper),
      );
    }
  } else {
    $tableWrapper.removeAttribute("tabindex");
    $tableWrapper.removeAttribute("role");
    $tableWrapper.removeAttribute("aria-labelledby");
    $tableWrapper.classList.remove("tna-table-wrapper--scroll");
  }
};
