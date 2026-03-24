import { Accordion } from "./components/accordion/accordion.mjs";
import { Breadcrumbs } from "./components/breadcrumbs/breadcrumbs.mjs";
import { CookieBanner } from "./components/cookie-banner/cookie-banner.mjs";
import { DateInputProgressive } from "./components/date-input/date-input.mjs";
import { ErrorSummary } from "./components/error-summary/error-summary.mjs";
import { FileInputDroppable } from "./components/file-input/file-input.mjs";
import { Footer } from "./components/footer/footer.mjs";
import { Gallery } from "./components/gallery/gallery.mjs";
import { GlobalHeader } from "./components/global-header/global-header.mjs";
import { Header } from "./components/header/header.mjs";
import { Picture } from "./components/picture/picture.mjs";
import { SkipLink } from "./components/skip-link/skip-link.mjs";
import { Tabs } from "./components/tabs/tabs.mjs";
import { TextInputPassword } from "./components/text-input/text-input.mjs";
import { TextAreaItemisedRows } from "./components/textarea/textarea.mjs";
import Cookies from "./lib/cookies.mjs";
import { checkTableForScroll } from "./lib/tables.mjs";
import { updateTimeElement } from "./lib/helpers.mjs";

const initAll = (options) => {
  options = typeof options !== "undefined" ? options : {};
  const $scope =
    options.scope instanceof HTMLElement ? options.scope : document;

  const $html = document.documentElement;
  $html.classList.add("tna-template--js-enabled");

  const onFirstTouch = () => {
    window.removeEventListener("touchstart", onFirstTouch);
    $html.classList.add("tna-template--touched");
  };
  window.addEventListener("touchstart", onFirstTouch);

  const onKeyDown = (e) => {
    if (e.key === "Tab") {
      $html.classList.add("tna-template--tabbed");
      $html.classList.remove("tna-template--clicked");
    }
  };
  window.addEventListener("keydown", onKeyDown);

  const onMouseDown = () => {
    $html.classList.add("tna-template--clicked");
    $html.classList.remove("tna-template--tabbed");
  };
  window.addEventListener("mousedown", onMouseDown);

  /*
   * ==========================================
   * Checks if widths of all tables on the page
   * are wider than their parent container, and
   * allowing horizontal scrolling if they are.
   * This is done both on load and on resize.
   * ==========================================
   */
  const $tableWrappers = $scope.querySelectorAll(".tna-table-wrapper");
  $tableWrappers.forEach(($tableWrapper) => checkTableForScroll($tableWrapper));
  window.addEventListener("resize", () => {
    $tableWrappers.forEach(($tableWrapper) =>
      checkTableForScroll($tableWrapper),
    );
  });

  // TODO: Remove this opt-in class in a later release
  if ($html.classList.contains("tna-template--enhance-time-elements")) {
    document.querySelectorAll("time[datetime]").forEach(updateTimeElement);
  }

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

  const $progressiveDateInputs = $scope.querySelectorAll(
    '[data-module="tna-date-input-progressive"]',
  );
  $progressiveDateInputs.forEach(($dateInput) => {
    new DateInputProgressive($dateInput);
  });

  const $errorSummary = $scope.querySelector(
    '[data-module="tna-error-summary"]',
  );
  if ($errorSummary) {
    new ErrorSummary($errorSummary).init();
  }

  const $fileInputs = $scope.querySelectorAll('[data-module="tna-file-input"]');
  $fileInputs.forEach(($fileInput) => {
    new FileInputDroppable($fileInput);
  });

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

  const $skipLinks = $scope.querySelectorAll('[data-module="tna-skip-link"]');
  $skipLinks.forEach(($skipLink) => {
    new SkipLink($skipLink);
  });

  const $tabs = $scope.querySelectorAll('[data-module="tna-tabs"]');
  $tabs.forEach(($tabModule) => {
    new Tabs($tabModule);
  });

  const $textInputPasswords = $scope.querySelectorAll(
    '[data-module="tna-text-input-password"]',
  );
  $textInputPasswords.forEach(($textInputPassword) => {
    new TextInputPassword($textInputPassword);
  });

  const $textAreaItemisedRows = $scope.querySelectorAll(
    '[data-module="tna-textarea-itemised-rows"]',
  );
  $textAreaItemisedRows.forEach(($textAreaItemisedRows) => {
    const enhancedHint = $textAreaItemisedRows.dataset.enhancedHint;
    new TextAreaItemisedRows($textAreaItemisedRows, { enhancedHint });
  });

  window.matchMedia("print").addEventListener("change", (evt) => {
    if (evt.matches) {
      $scope
        .querySelectorAll(".tna-details__details:not([open])")
        .forEach((e) => {
          e.setAttribute("open", "");
          e.dataset.wasClosed = "";
        });
      $scope
        .querySelectorAll(
          ".tna-accordion__content[hidden], .tna-picture__transcript[hidden]",
        )
        .forEach((e) => {
          e.removeAttribute("hidden");
          e.dataset.wasClosed = "";
        });
    } else {
      $scope
        .querySelectorAll(".tna-details__details[data-was-closed]")
        .forEach((e) => {
          e.removeAttribute("open");
          delete e.dataset.wasClosed;
        });
      $scope
        .querySelectorAll(
          ".tna-accordion__content[data-was-closed], .tna-picture__transcript[data-was-closed]",
        )
        .forEach((e) => {
          e.setAttribute("hidden", "");
          e.dataset.wasClosed = "";
        });
    }
  });
};

export {
  initAll,
  Cookies,
  Accordion,
  Breadcrumbs,
  CookieBanner,
  DateInputProgressive,
  ErrorSummary,
  FileInputDroppable,
  Footer,
  Gallery,
  GlobalHeader,
  Header,
  Picture,
  SkipLink,
  Tabs,
  TextInputPassword,
  TextAreaItemisedRows,
  checkTableForScroll,
  updateTimeElement,
};
