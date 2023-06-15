// import { nodeListForEach } from './common.mjs'
import Header from "./components/header/header.mjs";
// import { initAll as initAllGovuk } from "../../node_modules/govuk-frontend/govuk-esm/all.mjs";

function initAll(options) {
  options = typeof options !== "undefined" ? options : {};
  var scope = typeof options.scope !== "undefined" ? options.scope : document;
  // initAllGovuk(options);

  // Find first header module to enhance.
  var $toggleButton = scope.querySelector('[data-module="tna-header"]');
  new Header($toggleButton).init();
}

export { initAll, Header };
