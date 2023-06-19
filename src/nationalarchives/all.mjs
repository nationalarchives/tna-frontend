import SensitiveImage from "./components/sensitive-image/sensitive-image.mjs";

const initAll = (options) => {
  options = typeof options !== "undefined" ? options : {};
  const scope = typeof options.scope !== "undefined" ? options.scope : document;

  const $toggleButton = scope.querySelector(
    '[data-module="tna-sensitive-image"]'
  );
  new SensitiveImage($toggleButton).init();
};

export { initAll, SensitiveImage };
