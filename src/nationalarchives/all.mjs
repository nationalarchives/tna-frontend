import { Header } from "./components/header/header.mjs";
import { SensitiveImage } from "./components/sensitive-image/sensitive-image.mjs";

const $body = document.documentElement;

$body.classList.remove("tna-template--js-disabled");
$body.classList.add("tna-template--js-enabled");

const onFirstTouch = () => {
  window.removeEventListener("touchstart", onFirstTouch);
  $body.classList.add("tna-template--touched");
};

const onKeyDown = (e) => {
  if (e.key === "Tab") {
    $body.classList.add("tna-template--tabbed");
    $body.classList.remove("tna-template--clicked");
  }
};

const onMouseDown = () => {
  $body.classList.add("tna-template--clicked");
  $body.classList.remove("tna-template--tabbed");
};

window.addEventListener("touchstart", onFirstTouch);
window.addEventListener("keydown", onKeyDown);
window.addEventListener("mousedown", onMouseDown);



if (document.documentElement.classList.contains('tna-template--system-theme')) {
  if (window.matchMedia('(prefers-contrast: more)').matches) {
    document.documentElement.classList.add('tna-template--high-contrast-theme')
  } else {
    document.documentElement.classList.add(
      window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'tna-template--dark-theme'
        : 'tna-template--light-theme'
    )
  }
}




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
