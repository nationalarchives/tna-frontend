// import Header from "./components/header/header.mjs";

function initAll(options) {
  options = typeof options !== "undefined" ? options : {};
  var scope = typeof options.scope !== "undefined" ? options.scope : document;

  // Find first header module to enhance.
  // var $toggleButton = scope.querySelector('[data-module="tna-header"]');
  // new Header($toggleButton).init();
}

export { initAll /*Header*/ };
