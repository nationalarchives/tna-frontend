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
    $tableWrapper.dataset.tableScrollInitialised = "true";
  }
  if ($tableWrapper.scrollWidth > $tableWrapper.clientWidth) {
    $tableWrapper.setAttribute("tabindex", "0");
    $tableWrapper.setAttribute("role", "region");
    $tableWrapper.setAttribute("aria-labelledby", $caption?.id || "");
    $tableWrapper.classList.add("tna-table-wrapper--scroll");
  } else {
    $tableWrapper.removeAttribute("tabindex");
    $tableWrapper.removeAttribute("role");
    $tableWrapper.removeAttribute("aria-labelledby");
    $tableWrapper.classList.remove("tna-table-wrapper--scroll");
  }
};
