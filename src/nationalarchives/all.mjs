import { Accordion } from "./components/accordion/accordion.mjs";
import { Breadcrumbs } from "./components/breadcrumbs/breadcrumbs.mjs";
import { CookieBanner } from "./components/cookie-banner/cookie-banner.mjs";
import { ErrorSummary } from "./components/error-summary/error-summary.mjs";
import { Footer } from "./components/footer/footer.mjs";
import { Gallery } from "./components/gallery/gallery.mjs";
import { GlobalHeader } from "./components/global-header/global-header.mjs";
import { Header } from "./components/header/header.mjs";
import { Picture } from "./components/picture/picture.mjs";
import { SearchFilters } from "./components/search-filters/search-filters.mjs";
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

const initAll = (options) => {
  options = typeof options !== "undefined" ? options : {};
  const $scope =
    options.scope instanceof HTMLElement ? options.scope : document;

  const $accordions = $scope.querySelectorAll('[data-module="tna-accordion"]');
  $accordions.forEach(($accordion) => {
    new Accordion($accordion);
  });

  const $breadcrumbs = $scope.querySelector('[data-module="tna-breadcrumbs"]');
  if ($breadcrumbs) {
    new Breadcrumbs($breadcrumbs);
  }

  const $cookieBanner = $scope.querySelector(
    '[data-module="tna-cookie-banner"]',
  );
  if ($cookieBanner) {
    new CookieBanner($cookieBanner);
  }

  const $errorSummary = $scope.querySelector(
    '[data-module="tna-error-summary"]',
  );
  if ($errorSummary) {
    new ErrorSummary($errorSummary).init();
  }

  const $footer = $scope.querySelector('[data-module="tna-footer"]');
  if ($footer) {
    new Footer($footer);
  }

  const $galleries = $scope.querySelectorAll('[data-module="tna-gallery"]');
  $galleries.forEach(($gallery) => {
    new Gallery($gallery);
  });

  const $globalHeader = $scope.querySelector(
    '[data-module="tna-global-header"]',
  );
  if ($globalHeader) {
    new GlobalHeader($globalHeader);
  }

  const $header = $scope.querySelector('[data-module="tna-header"]');
  if ($header) {
    new Header($header);
  }

  const $pictures = $scope.querySelectorAll('[data-module="tna-picture"]');
  $pictures.forEach(($picture) => {
    new Picture($picture);
  });

  const $searchFilters = $scope.querySelectorAll(
    '[data-module="tna-search-filters"]',
  );
  $searchFilters.forEach(($searchFilter) => {
    new SearchFilters($searchFilter);
  });

  const $sensitiveImages = $scope.querySelectorAll(
    '[data-module="tna-sensitive-image"]',
  );
  $sensitiveImages.forEach(($sensitiveImage) => {
    new SensitiveImage($sensitiveImage);
  });

  const $skipLinks = $scope.querySelectorAll('[data-module="tna-skip-link"]');
  $skipLinks.forEach(($skipLink) => {
    new SkipLink($skipLink);
  });

  const $tabs = $scope.querySelectorAll('[data-module="tna-tabs"]');
  $tabs.forEach(($tabModule) => {
    new Tabs($tabModule);
  });
};

export {
  initAll,
  Cookies,
  Breadcrumbs,
  CookieBanner,
  ErrorSummary,
  Footer,
  Gallery,
  GlobalHeader,
  Header,
  Picture,
  SearchFilters,
  SensitiveImage,
  SkipLink,
  Tabs,
};
