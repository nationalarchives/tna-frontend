import { Header } from "./components/header/header.mjs";
import { SensitiveImage } from "./components/sensitive-image/sensitive-image.mjs";

document.documentElement.classList.remove("js-disabled");
document.documentElement.classList.add("js-enabled");

const initAll = (options) => {
  options = typeof options !== "undefined" ? options : {};
  const $scope =
    options.scope instanceof HTMLElement ? options.scope : document;

  const $header = $scope.querySelector('[data-module="tna-header"]');
  if ($header) {
    new Header($header).init();
  }

  const $sensitiveImages = $scope.querySelectorAll(
    '[data-module="tna-sensitive-image"]',
  );
  $sensitiveImages.forEach(($sensitiveImage) => {
    new SensitiveImage($sensitiveImage).init();
  });
};

export { initAll, Header, SensitiveImage };
