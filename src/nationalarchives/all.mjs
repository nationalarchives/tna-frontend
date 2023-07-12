import Header from "./components/header/header.mjs";
import SensitiveImage from "./components/sensitive-image/sensitive-image.mjs";

document.documentElement.classList.remove("js-disabled");
document.documentElement.classList.add("js-enabled");

const initAll = (options) => {
  options = typeof options !== "undefined" ? options : {};
  const scope = typeof options.scope !== "undefined" ? options.scope : document;

  const $header = scope.querySelector('[data-module="tna-header"]');
  new Header($header).init();

  const $sensitiveImage = scope.querySelector(
    '[data-module="tna-sensitive-image"]',
  );
  new SensitiveImage($sensitiveImage).init();
};

export { initAll, Header, SensitiveImage };
