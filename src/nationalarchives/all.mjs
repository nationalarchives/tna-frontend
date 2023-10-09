import { Breadcrumbs } from "./components/breadcrumbs/breadcrumbs.mjs";
import { CookieBanner } from "./components/cookie-banner/cookie-banner.mjs";
import { Gallery } from "./components/gallery/gallery.mjs";
import { Header } from "./components/header/header.mjs";
import { Picture } from "./components/picture/picture.mjs";
import { SensitiveImage } from "./components/sensitive-image/sensitive-image.mjs";
import { SkipLink } from "./components/skip-link/skip-link.mjs";
import { Tabs } from "./components/tabs/tabs.mjs";
import Cookies from "./lib/cookies.mjs";

const $body = document.documentElement;
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

// if (document.documentElement.classList.contains("tna-template--system-theme")) {
//   document.documentElement.classList.add(
//     window.matchMedia("(prefers-color-scheme: dark)").matches
//       ? "tna-template--dark-theme"
//       : "tna-template--light-theme",
//   );
//   if (window.matchMedia("(prefers-contrast: more)").matches) {
//     document.documentElement.classList.add("tna-template--high-contrast-theme");
//   }
// }

const initAll = (options) => {
  options = typeof options !== "undefined" ? options : {};
  const $scope =
    options.scope instanceof HTMLElement ? options.scope : document;

  const $breadcrumbs = $scope.querySelector('[data-module="tna-breadcrumbs"]');
  if ($breadcrumbs) {
    new Breadcrumbs($breadcrumbs).init();
  }

  const $cookieBanner = $scope.querySelector(
    '[data-module="tna-cookie-banner"]',
  );
  if ($cookieBanner) {
    new CookieBanner($cookieBanner).init();
  }

  const $galleries = $scope.querySelectorAll('[data-module="tna-gallery"]');
  $galleries.forEach(($gallery) => {
    new Gallery($gallery).init();
  });

  const $header = $scope.querySelector('[data-module="tna-header"]');
  if ($header) {
    new Header($header).init();
  }

  const $pictures = $scope.querySelectorAll('[data-module="tna-picture"]');
  $pictures.forEach(($picture) => {
    new Picture($picture).init();
  });

  const $sensitiveImages = $scope.querySelectorAll(
    '[data-module="tna-sensitive-image"]',
  );
  $sensitiveImages.forEach(($sensitiveImage) => {
    new SensitiveImage($sensitiveImage).init();
  });

  const $skipLinks = $scope.querySelectorAll('[data-module="tna-skip-link"]');
  $skipLinks.forEach(($skipLink) => {
    new SkipLink($skipLink).init();
  });

  const $tabs = $scope.querySelectorAll('[data-module="tna-tabs"]');
  $tabs.forEach(($tabModule) => {
    new Tabs($tabModule).init();
  });
};

export {
  initAll,
  Cookies,
  Breadcrumbs,
  CookieBanner,
  Gallery,
  Header,
  Picture,
  SensitiveImage,
  SkipLink,
  Tabs,
};
