import uuidv4 from "./uuid.mjs";

export const checkTableForScroll = ($tableWrapper) => {
  const isUninitialised = !(
    $tableWrapper.dataset.tableScrollInitialised === "true"
  );
  const $caption = $tableWrapper.querySelector("caption");
  if (isUninitialised) {
    if (!$caption) {
      console.warn("Missing <caption> element on table", $tableWrapper);
    } else if (!$caption.id) {
      $caption.id = `table-caption-${uuidv4()}`;
    }
  }
  if ($tableWrapper.scrollWidth > $tableWrapper.clientWidth) {
    $tableWrapper.setAttribute("tabindex", "0");
    $tableWrapper.setAttribute("role", "region");
    $tableWrapper.setAttribute("aria-labelledby", $caption?.id || "");
    $tableWrapper.classList.add("tna-table-wrapper--scroll");
    if (isUninitialised) {
      $tableWrapper.dataset.tableScrollInitialised = "true";
      if (!window.CSS?.supports("scroll-timeline", "--overflow-shadows x")) {
        const updateScrollShadows = ($tableWrapper) => {
          $tableWrapper.style.setProperty(
            "--overflow-shadow-start",
            $tableWrapper.scrollLeft > 1
              ? "rgb(0 0 0 / 40%)"
              : "rgb(0 0 0 / 0%)",
          );
          $tableWrapper.style.setProperty(
            "--overflow-shadow-end",
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
    }
  } else {
    $tableWrapper.removeAttribute("tabindex");
    $tableWrapper.removeAttribute("role");
    $tableWrapper.removeAttribute("aria-labelledby");
    $tableWrapper.classList.remove("tna-table-wrapper--scroll");
  }
};
