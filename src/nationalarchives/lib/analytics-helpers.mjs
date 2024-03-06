const getXPathTo = ($element) => {
  if ($element.id !== "") {
    return 'id("' + $element.id + '")';
  }
  if ($element === document.body) {
    return $element.tagName;
  }
  let ix = 0;
  const siblings = $element.parentNode.childNodes;
  for (let i = 0; i < siblings.length; i++) {
    const sibling = siblings[i];
    if (sibling === $element)
      return (
        getXPathTo($element.parentNode) +
        "/" +
        $element.tagName +
        "[" +
        (ix + 1) +
        "]"
      );
    if (sibling.nodeType === 1 && sibling.tagName === $element.tagName) ix++;
  }
};

const includesAny = (arr, values) => values.some((v) => arr.includes(v));

const getClosestHeading = ($element) => {
  let heading = "";
  let $search = $element;
  do {
    while ($search.previousElementSibling) {
      $search = $search.previousElementSibling;
      if (
        ["h1", "h2", "h3", "h4", "h5", "h6"].includes($search.tagName) ||
        ($search.classList.length &&
          includesAny(Array.from($search.classList), [
            "tna-heading-xl",
            "tna-heading-l",
            "tna-heading-m",
            "tna-heading-s",
          ]))
      ) {
        heading = $search.innerText;
        break;
      }
    }
    $search = $search.parentElement;
  } while ($search.parentElement && !heading);
  return heading;
};

const valueGetters = {
  text: ($el) => $el.innerText,
  html: ($el) => $el.innerHTML,
  value: ($el) => $el.value,
  index: ($el, $scope, event, index) => index,
  checked: ($el) => ($el.checked ? "checked" : "unchecked"),
  expanded: ($el) => {
    const expanded = $el.getAttribute("aria-expanded");
    if (expanded === null) {
      return null;
    }
    return expanded.toString() === "true" ? "opened" : "closed";
  },
  closestHeading: ($el) => getClosestHeading($el),
};

export { getXPathTo, getClosestHeading, valueGetters };
