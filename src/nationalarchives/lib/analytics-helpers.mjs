const getXPathTo = ($element) => {
  if ($element.id !== "") {
    return 'id("' + $element.id + '")';
  }
  if ($element === document.body) {
    return $element.tagName;
  }
  let ix = 0;
  if ($element.parentNode) {
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
  } else {
    return $element.tagName;
  }
};

const getClosestElement = ($startingElement, matchingElementSelectors) => {
  let heading = "";
  let $search = $startingElement;
  do {
    while ($search.previousElementSibling) {
      $search = $search.previousElementSibling;
      if (
        matchingElementSelectors.some((matchingElementSelector) =>
          $search.matches(matchingElementSelector),
        )
      ) {
        heading = $search.innerText;
        break;
      }
    }
    $search = $search.parentElement;
  } while ($search.parentElement && !heading);
  return heading;
};

const getClosestHeading = ($element) =>
  getClosestElement($element, ["h1", "h2", "h3", "h4", "h5", "h6"]);

const valueGetters = {
  text: ($el) => $el.innerText.replace(/\n/g, " "),
  html: ($el) => $el.innerHTML,
  value: ($el) => $el.value,
  index: ($el, $scope, event, index) => index,
  instance: ($el, $scope, event, index, instance) => instance,
  checked: ($el) => ($el.checked ? "checked" : "unchecked"),
  expanded: ($el) => {
    const expanded = $el.getAttribute("aria-expanded");
    if (expanded === null) {
      return null;
    }
    return expanded.toString() === "true" ? "opened" : "closed";
  },
  closestHeading: ($el) => getClosestHeading($el),
  xpath: ($el) => getXPathTo($el.target),
};

export { getXPathTo, getClosestElement, getClosestHeading, valueGetters };
