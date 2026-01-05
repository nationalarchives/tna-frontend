export const checkTableForScroll = ($tableWrapper, setUpListener = false) => {
  const scrollable = $tableWrapper.scrollWidth > $tableWrapper.clientWidth;
  if (scrollable) {
    $tableWrapper.setAttribute("tabindex", "0");
    $tableWrapper.classList.add("tna-table-wrapper--scroll");
    if (
      !window.CSS?.supports("scroll-timeline", "--scrollfade x") &&
      setUpListener
    ) {
      const updateScrollShadows = ($tableWrapper) => {
        $tableWrapper.style.setProperty(
          "--left-fade",
          $tableWrapper.scrollLeft > 1 ? "rgb(0 0 0 / 40%)" : "rgb(0 0 0 / 0%)",
        );
        $tableWrapper.style.setProperty(
          "--right-fade",
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
    $tableWrapper.classList.remove("tna-table-wrapper--scroll");
  }
};
