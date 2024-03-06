import Cookies from "./lib/cookies.mjs";
import {
  getXPathTo,
  getClosestHeading,
  valueGetters,
} from "./lib/analytics-helpers.mjs";
import BreadcrumbAnalytics from "./components/breadcrumbs/analytics.js";
import CheckboxesAnalytics from "./components/checkboxes/analytics.js";
import FooterAnalytics from "./components/footer/analytics.js";
import GlobalHeaderAnalytics from "./components/global-header/analytics.js";
import HeaderAnalytics from "./components/header/analytics.js";
import HeroAnalytics from "./components/hero/analytics.js";
import PictureAnalytics from "./components/picture/analytics.js";
import RadiosAnalytics from "./components/radios/analytics.js";
import SearchFieldAnalytics from "./components/search-field/analytics.js";
import TextInputAnalytics from "./components/text-input/analytics.js";
import TextareaAnalytics from "./components/textarea/analytics.js";

const componentAnalytics = [
  ...BreadcrumbAnalytics,
  ...CheckboxesAnalytics,
  ...FooterAnalytics,
  ...GlobalHeaderAnalytics,
  ...HeaderAnalytics,
  ...HeroAnalytics,
  ...PictureAnalytics,
  ...RadiosAnalytics,
  ...SearchFieldAnalytics,
  ...TextInputAnalytics,
  ...TextareaAnalytics,
];

class EventTracker {
  /** @protected */
  cookies = new (window.TNAFrontend?.Cookies || Cookies)();

  /** @protected */
  events = [];

  /** @protected */
  start = new Date();

  /** @protected */
  prefix = "tna";

  constructor(prefix) {
    if (prefix) {
      this.prefix = prefix;
    }
  }

  /**
   * Initialise all TNA Frontend component analytics.
   */
  initAll() {
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
      events.forEach((eventConfig) => {
        if (!eventConfig.on) {
          return;
        }
        if (eventConfig.targetElement) {
          Array.from(
            $scope.querySelectorAll(eventConfig.targetElement),
          ).forEach(($el, index) =>
            this.attachListener(
              $el,
              $scope,
              this.generateEventName(areaName, eventConfig),
              eventConfig,
              scope,
              areaName,
              index + 1,
            ),
          );
        } else {
          this.attachListener(
            $scope,
            $scope,
            this.generateEventName(areaName, eventConfig),
            eventConfig,
            scope,
            areaName,
            1,
          );
        }
      });
    });
  }

  /** @protected */
  generateEventName(areaName, eventConfig) {
    return `${this.prefix}.${areaName}.${eventConfig.eventName || eventConfig.on}`;
  }

  /** @protected */
  attachListener($el, $scope, eventName, eventConfig, scope, areaName, index) {
    const { on, data, targetElement, rootData = {} } = eventConfig;
    $el.addEventListener(on, (event) =>
      this.recordEvent(
        eventName,
        {
          ...data,
          value: this.computedValue(data.value, $el, $scope, event, index),
          state: this.computedValue(data.state, $el, $scope, event, index),
          group: this.computedValue(data.group, $el, $scope, event, index),
          xPath: getXPathTo($scope),
          targetElement: targetElement,
          // timestamp: new Date().toISOString(),
          // uri: window.location.pathname,
          timeSincePageLoad: new Date() - this.start,
          index,
          scope,
          areaName,
        },
        Object.fromEntries(
          Object.entries(rootData).map(([key, value]) => [
            key,
            this.computedValue(value, $el, $scope, event, index),
          ]),
        ),
      ),
    );
  }

  /** @protected */
  computedValue(value, $el, $scope, event, index) {
    return typeof value === "function"
      ? value.call(this, $el, $scope, event, index)
      : value || null;
  }

  /** @protected */
  recordEvent(eventName, data, rootData = {}) {
    this.events.push({
      event: eventName,
      [`${this.prefix}.event`]: data,
      ...rootData,
    });
  }

  /** @protected */
  getTnaMetaTags() {
    return Object.fromEntries(
      Array.from(
        document.head.querySelectorAll(
          `meta[name^='${this.prefix}.'][content]`,
        ),
      ).map(($metaEl) => [
        $metaEl.getAttribute("name"),
        $metaEl.getAttribute("content"),
      ]),
    );
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

  constructor(id = null, options = {}) {
    if (GA4._instance) {
      return GA4._instance;
    }
    if (!id) {
      throw Error("ID was not specified");
    }
    const { prefix = null, initAll = true } = options;
    super(prefix);
    GA4._instance = this;
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
    if (initAll) {
      this.initAll();
    }
  }

  /** @protected */
  recordEvent(eventName, data, rootData = {}) {
    const ga4Data = {
      event: eventName,
      ...Object.fromEntries(
        Object.entries(data).map(([key, value]) => [
          `${this.prefix}.event.${key}`,
          value,
        ]),
      ),
      ...rootData,
    };
    this.pushToDataLayer(ga4Data);
  }

  /** @protected */
  gtag() {
    this.pushToDataLayer(arguments);
  }

  /** @protected */
  pushToDataLayer(data) {
    window.dataLayer.push(data);
  }

  /** @protected */
  enableTracking() {
    if (!this.trackingEnabled) {
      window["ga-disable-GA_MEASUREMENT_ID"] = false;
      this.trackingEnabled = true;
      if (!this.trackingCodeAdded) {
        this.pushToDataLayer({
          "gtm.start": new Date().getTime(),
          event: "gtm.js",
        });
        const firstScript = document.getElementsByTagName("script")[0];
        const script = document.createElement("script");
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtm.js?id=${this.gTagId}&l=dataLayer`;
        firstScript.parentNode.insertBefore(script, firstScript);
        this.trackingCodeAdded = true;
        this.pushToDataLayer(this.getTnaMetaTags());
      }
      this.gtag("set", { allow_google_signals: true });
    }
  }

  /** @protected */
  disableTracking() {
    if (this.trackingEnabled) {
      window["ga-disable-GA_MEASUREMENT_ID"] = true;
      this.gtag("set", { allow_google_signals: false });
      this.trackingEnabled = false;
    }
  }
}

const helpers = { getXPathTo, getClosestHeading, valueGetters };

export { EventTracker, GA4, helpers };
