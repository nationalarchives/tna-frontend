import Cookies from "./lib/cookies.mjs";
import { getXPathTo, valueGetters } from "./lib/analytics-helpers.mjs";
import BreadcrumbAnalytics from "./components/breadcrumbs/analytics.js";
import HeaderAnalytics from "./components/header/analytics.js";
import HeroAnalytics from "./components/hero/analytics.js";
import PictureAnalytics from "./components/picture/analytics.js";

const componentAnalytics = [
  ...BreadcrumbAnalytics,
  ...HeaderAnalytics,
  ...HeroAnalytics,
  ...PictureAnalytics,
];

class EventTracker {
  /** @protected */
  cookies = new (window.TNAFrontend?.Cookies || Cookies)();

  /** @protected */
  events = [];

  /** @protected */
  start = new Date();

  constructor() {
    componentAnalytics.forEach((componentConfig) => {
      this.addListener(
        componentConfig.scope,
        componentConfig.areaName,
        componentConfig.events,
      );
    });
  }

  /**
   * Add an event listener.
   * @param {String|HTMLElement} scope - The element to which the listener is scoped.
   * @param {String} areaName - The name of the component to pass on to the tracker.
   * @param {{eventName: String, targetElement: String|undefined, on: String, data: {value: Function|String|undefined, state: Function|String|undefined, [String]: any}}[]} events - The configuration of events to track along with their optional value and state which can be computed.
   */
  addListener(scope, areaName, events) {
    let scopeArray;
    if (typeof scope === "string") {
      scopeArray = Array.from(document.querySelectorAll(scope));
    } else if (typeof scope === "object") {
      scopeArray = [scope];
    }
    if (!scopeArray) {
      return;
    }
    scopeArray.forEach(($scope) => {
      events.forEach((componentTracking) => {
        if (!componentTracking.on) {
          return;
        }
        if (componentTracking.targetElement) {
          Array.from(
            $scope.querySelectorAll(componentTracking.targetElement),
          ).forEach(($el) =>
            this.attachListener(
              $el,
              componentTracking.on,
              $scope,
              this.generateEventName(areaName, componentTracking),
              componentTracking.data,
              componentTracking.targetElement,
            ),
          );
        } else {
          this.attachListener(
            $scope,
            componentTracking.on,
            $scope,
            this.generateEventName(areaName, componentTracking),
            componentTracking.data,
            componentTracking.targetElement,
          );
        }
      });
    });
  }

  generateEventName(areaName, componentTracking) {
    return `${areaName}.${componentTracking.eventName || componentTracking.on}`;
  }

  /** @protected */
  attachListener(
    $el,
    eventTrigger,
    $scope,
    eventName,
    eventDataInit,
    targetElement,
  ) {
    if (!$el) {
      return;
    }
    $el.addEventListener(eventTrigger, (event) =>
      this.recordEvent(eventName, {
        ...eventDataInit,
        value:
          typeof eventDataInit.value === "function"
            ? eventDataInit.value.call(this, $el, $scope, event)
            : eventDataInit.value || null,
        state:
          typeof eventDataInit.state === "function"
            ? eventDataInit.state.call(this, $el, $scope, event)
            : eventDataInit.state || null,
        scope: getXPathTo($scope),
        targetElement: targetElement,
        timestamp: new Date().toISOString(),
        uri: window.location.pathname,
        timeSincePageLoad: new Date() - this.start,
      }),
    );
  }

  /** @protected */
  recordEvent(eventName, data) {
    this.events.push({ event: eventName, data });
  }
}

/**
 * Class to handle Google Analytics 4 reporting.
 * @class GA4
 * @extends EventTracker
 * @constructor
 * @public
 */
class GA4 extends EventTracker {
  trackingCodeAdded = false;
  trackingEnabled = false;
  gTagId;

  constructor(id) {
    super();
    this.gTagId = id;
    window.dataLayer = window.dataLayer || [];
    if (this.cookies.isPolicyAccepted("usage")) {
      this.enableTracking();
    }
    this.cookies.on("changePolicy", (policies) => {
      if (Object.hasOwn(policies, "usage")) {
        if (policies["usage"]) {
          this.enableTracking();
        } else {
          this.disableTracking();
        }
      }
    });
  }

  /** @protected */
  recordEvent(eventName, data) {
    const ga4Data = { event: eventName, data };
    window.dataLayer.push(ga4Data);
    // console.log(window.dataLayer);
  }

  /** @protected */
  gtag() {
    window.dataLayer.push(arguments);
    // console.log(window.dataLayer);
  }

  /** @protected */
  enableTracking() {
    if (!this.trackingEnabled) {
      window["ga-disable-GA_MEASUREMENT_ID"] = false;
      this.trackingEnabled = true;
      if (!this.trackingCodeAdded) {
        const script = document.createElement("script");
        script.setAttribute("async", true);
        script.setAttribute(
          "src",
          `https://www.googletagmanager.com/gtm.js?id=${this.gTagId}&l=dataLayer`,
        );
        // document.head.appendChild(script);
        this.gtag("js", new Date());
        this.trackingCodeAdded = true;
      }
      this.gtag("set", { allow_ad_personalization_signals: false });
    }
  }

  /** @protected */
  disableTracking() {
    if (this.trackingEnabled) {
      window["ga-disable-GA_MEASUREMENT_ID"] = true;
      this.gtag("set", { allow_ad_personalization_signals: true });
      this.trackingEnabled = false;
    }
  }
}

/*
 * ==========================================
 * TEMP TESTING
 * ==========================================
 */
const analytics = new GA4("test");

analytics.addListener(".etna-article__sidebar", "sidebar", [
  {
    eventName: "scection_jump",
    targetElement: ".etna-article__sidebar-item",
    on: "click",
    data: {
      value: valueGetters.text,
    },
  },
]);

analytics.addListener(".etna-article", "article", [
  {
    eventName: "toggle_section",
    targetElement: ".etna-article__section-button",
    on: "click",
    data: {
      // eslint-disable-next-line no-unused-vars
      state: ($el, $scope, event) => {
        const expanded = $el.getAttribute("aria-expanded");
        if (expanded === null) {
          return null;
        }
        return expanded.toString() === "true" ? "opened" : "closed";
      },
      value: valueGetters.text,
    },
  },
]);

analytics.addListener(document.documentElement, "doc", [
  {
    eventName: "double_click",
    on: "dblclick",
    data: {
      state: ($el, $scope, event) => getXPathTo(event.target),
      value: ($el, $scope, event) => event.target.innerHTML,
    },
  },
]);

analytics.addListener(document.getElementById("tna-form__search"), "search", [
  {
    eventName: "search_term_blur",
    on: "blur",
    data: {
      value: valueGetters.value,
    },
  },
]);

export { EventTracker, GA4 };
