const getXPathTo = (element) => {
  if (element.id !== "") {
    return 'id("' + element.id + '")';
  }
  if (element === document.body) {
    return element.tagName;
  }
  let ix = 0;
  const siblings = element.parentNode.childNodes;
  for (let i = 0; i < siblings.length; i++) {
    const sibling = siblings[i];
    if (sibling === element)
      return (
        getXPathTo(element.parentNode) +
        "/" +
        element.tagName +
        "[" +
        (ix + 1) +
        "]"
      );
    if (sibling.nodeType === 1 && sibling.tagName === element.tagName) ix++;
  }
};
const valueGetters = {
  text: ($el, $scope, event) => $el.innerText,
  html: ($el, $scope, event) => $el.innerHTML,
  value: ($el, $scope, event) => $el.value,
};

export { getXPathTo, valueGetters };
