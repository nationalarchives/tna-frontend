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
  startTime = new Date();

  /** @protected */
  prefix = "tna";

  constructor(options = {}) {
    const { prefix = null } = options;
    if (prefix) {
      this.prefix = prefix;
    }
  }

  start(initAll) {
    if (!navigator.doNotTrack || navigator.doNotTrack !== 1) {
      if (this.cookies.isPolicyAccepted("usage")) {
        this.enableTracking();
      } else {
        window[this.ga4Disable] = true;
        this.cookies.set(this.ga4Disable, "true");
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
  }

  enableTracking() {}

  disableTracking() {}

  /**
   * Initialise all TNA Frontend component analytics.
   */
  initAll() {
    componentAnalytics.forEach((componentConfig) => {
      this.addListener(
        componentConfig.scope,
        componentConfig.areaName,
        componentConfig.events,
        componentConfig.rootEventName || "",
      );
    });
  }

  /**
   * Add an event listener.
   * @param {String|HTMLElement} scope - The element to which the listener is scoped.
   * @param {String} areaName - The name of the component to pass on to the tracker.
   * @param {{eventName: String, targetElement: String|undefined, on: String, data: {value: Function|String|undefined, state: Function|String|undefined, group: Function|String|undefined, [String]: String|Integer}, rootData:{[String]: Function|String}}[]} events - The configuration of events to track along with their optional value and state which can be computed.
   * @param {String} rootEventName - The event name to use if specified (prefix).
   */
  addListener(scope, areaName, events, rootEventName = "") {
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
              rootEventName,
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
            rootEventName,
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
  attachListener(
    $el,
    $scope,
    rootEventName,
    eventConfig,
    scope,
    areaName,
    index,
  ) {
    const { on, data, targetElement, rootData = {} } = eventConfig;
    $el.addEventListener(on, (event) =>
      this.recordEvent(
        rootEventName
          ? `${this.prefix}.${rootEventName}`
          : this.generateEventName(areaName, eventConfig),
        {
          ...data,
          name: this.generateEventName(areaName, eventConfig),
          value: data?.value
            ? this.computedValue(data.value, $el, $scope, event, index)
            : null,
          state: data?.state
            ? this.computedValue(data.state, $el, $scope, event, index)
            : null,
          group: data?.group
            ? this.computedValue(data.group, $el, $scope, event, index)
            : null,
          xPath: getXPathTo($el),
          targetElement: targetElement,
          timeSincePageLoad: new Date() - this.startTime,
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
      : value ?? null;
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
  /** @protected */
  trackingCodeAdded = false;

  /** @protected */
  trackingEnabled = false;

  /** @protected */
  gTagId;

  constructor(options = {}) {
    if (GA4._instance) {
      return GA4._instance;
    }
    const { id = null, prefix = null, initAll = true } = options;
    if (!id) {
      throw Error("ID was not specified");
    }
    super({ prefix });
    GA4._instance = this;
    this.gTagId = id;
    this.ga4Disable = `ga-disable-${this.gTagId}`;
    window.dataLayer = window.dataLayer || [];
    this.start(initAll);
  }

  destroy() {
    GA4._instance = null;
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
      window[this.ga4Disable] = false;
      this.cookies.set(this.ga4Disable, "false");
      if (!this.trackingCodeAdded) {
        this.pushToDataLayer({
          "gtm.start": new Date().getTime(),
          event: "gtm.js",
        });
        const firstScript = document.getElementsByTagName("script")[0];
        const script = document.createElement("script");
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtm.js?id=${this.gTagId}&l=dataLayer`;
        if (firstScript) {
          firstScript.parentNode.insertBefore(script, firstScript);
        } else {
          document.head.appendChild(script);
        }
        this.trackingCodeAdded = true;
        const tnaMetaTags = this.getTnaMetaTags();
        if (Object.keys(tnaMetaTags).length) {
          this.pushToDataLayer(tnaMetaTags);
        }
      }
      this.trackingEnabled = true;
    }
  }

  /** @protected */
  disableTracking() {
    if (this.trackingEnabled) {
      window[this.ga4Disable] = true;
      this.cookies.set(this.ga4Disable, "true");
      this.cookies.delete("_ga");
      // this.cookies.delete("_gat_gtag_UA_43169816_3");
      // this.cookies.delete("_gid");
      this.trackingEnabled = false;
      window.location.reload();
    }
  }
}

const helpers = { getXPathTo, getClosestHeading, valueGetters };

export { EventTracker, GA4, helpers };
