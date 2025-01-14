import Cookies from "./lib/cookies.mjs";
import {
  getXPathTo,
  getClosestHeading,
  valueGetters,
} from "./lib/analytics-helpers.mjs";
import AccordionAnalytics from "./components/accordion/analytics.js";
import BreadcrumbAnalytics from "./components/breadcrumbs/analytics.js";
import CheckboxesAnalytics from "./components/checkboxes/analytics.js";
import DetailsAnalytics from "./components/details/analytics.js";
import FooterAnalytics from "./components/footer/analytics.js";
import GalleryAnalytics from "./components/gallery/analytics.js";
import GlobalHeaderAnalytics from "./components/global-header/analytics.js";
import HeaderAnalytics from "./components/header/analytics.js";
import HeroAnalytics from "./components/hero/analytics.js";
import PictureAnalytics from "./components/picture/analytics.js";
import RadiosAnalytics from "./components/radios/analytics.js";
import SearchFieldAnalytics from "./components/search-field/analytics.js";
import SidebarAnalytics from "./components/sidebar/analytics.js";
import TextInputAnalytics from "./components/text-input/analytics.js";
import TextareaAnalytics from "./components/textarea/analytics.js";

const componentAnalytics = [
  ...AccordionAnalytics,
  ...BreadcrumbAnalytics,
  ...CheckboxesAnalytics,
  ...DetailsAnalytics,
  ...FooterAnalytics,
  ...GalleryAnalytics,
  ...GlobalHeaderAnalytics,
  ...HeaderAnalytics,
  ...HeroAnalytics,
  ...PictureAnalytics,
  ...RadiosAnalytics,
  ...SearchFieldAnalytics,
  ...SidebarAnalytics,
  ...TextInputAnalytics,
  ...TextareaAnalytics,
];

class EventTracker {
  /** @protected */
  cookies = new Cookies();

  /** @protected */
  events = [];

  /** @protected */
  startTime = new Date();

  /** @protected */
  prefix = "tna";

  /** @protected */
  document = document;

  constructor(options = {}) {
    const { prefix = null, documentScope = document } = options;
    if (prefix) {
      this.prefix = prefix;
    }
    if (documentScope) {
      this.document = documentScope;
    }
  }

  start(initAll) {
    if (!navigator.doNotTrack || navigator.doNotTrack !== 1) {
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
  }

  enableTracking() {}

  disableTracking() {}

  /**
   * Initialise all TNA Frontend component analytics.
   */
  initAll() {
    componentAnalytics.forEach((componentConfig) => {
      this.addListeners(
        componentConfig.scope,
        componentConfig.areaName,
        componentConfig.events,
        componentConfig.rootEventName || "",
        componentConfig.rootData || {},
      );
    });
  }

  /**
   * Add an event listener.
   * @param {String|HTMLElement} scope - The element to which the listener is scoped.
   * @param {String} areaName - The name of the component to pass on to the tracker.
   * @param {{eventName: String, targetElement: String|undefined, on: String, data: {value: Function|String|undefined, state: Function|String|undefined, group: Function|String|undefined, [String]: String|Integer}, rootData:{[String]: Function|String}}[]} events - The configuration of events to track along with their optional value and state which can be computed.
   * @param {String} rootEventName - The event name to use if specified (prefix).
   * @param {{[String]:String}} rootDefaultData - The default root data to use if specified.
   */
  addListeners(
    scope,
    areaName,
    events,
    rootEventName = "",
    rootDefaultData = {},
  ) {
    let scopeArray;
    if (typeof scope === "string") {
      scopeArray = Array.from(this.document.querySelectorAll(scope));
    } else if (typeof scope === "object") {
      scopeArray = [scope];
    }
    if (!scopeArray) {
      return;
    }
    scopeArray.forEach(($scope, scopeIndex) => {
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
              rootDefaultData,
              eventConfig,
              scope,
              areaName,
              index + 1,
              scopeIndex + 1,
            ),
          );
        } else {
          this.attachListener(
            $scope,
            $scope,
            rootEventName,
            rootDefaultData,
            eventConfig,
            scope,
            areaName,
            1,
            scopeIndex + 1,
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
    rootDefaultData,
    eventConfig,
    scope,
    areaName,
    index,
    instance,
  ) {
    const {
      on,
      data,
      targetElement,
      rootData = {},
      onCondition = null,
    } = eventConfig;
    $el.addEventListener(on, (event) => {
      const computedValueParameters = [$el, $scope, event, index, instance];
      if (
        onCondition === null ||
        this.computedValue(onCondition, ...computedValueParameters)
      ) {
        this.recordEvent(
          rootEventName
            ? `${this.prefix}.${rootEventName}`
            : this.generateEventName(areaName, eventConfig),
          {
            ...data,
            name: this.generateEventName(areaName, eventConfig),
            value: data?.value
              ? this.computedValue(data.value, ...computedValueParameters)
              : null,
            state: data?.state
              ? this.computedValue(data.state, ...computedValueParameters)
              : null,
            group: data?.group
              ? this.computedValue(data.group, ...computedValueParameters)
              : null,
            xPath: getXPathTo($el),
            targetElement: targetElement,
            timeSincePageLoad: new Date() - this.startTime,
            index,
            instance,
            scope,
            areaName,
          },
          Object.fromEntries(
            Object.entries({ ...rootDefaultData, ...rootData }).map(
              ([key, value]) => [
                key,
                this.computedValue(value, ...computedValueParameters),
              ],
            ),
          ),
        );
      }
    });
  }

  /** @protected */
  computedValue(valueOrFunction, $el, $scope, event, index, instance) {
    return typeof valueOrFunction === "function"
      ? valueOrFunction.call(this, $el, $scope, event, index, instance)
      : (valueOrFunction ?? null);
  }

  /** @protected */
  recordEvent(eventName, data, rootData = {}) {
    this.events.push({
      event: eventName,
      ...data,
      ...rootData,
    });
  }

  /** @protected */
  getTnaMetaTags() {
    return Object.fromEntries([
      ...Array.from(
        document.head.querySelectorAll(
          `meta[name^="${this.prefix}_root:"][content]`,
        ),
      ).map(($metaEl) => [
        $metaEl
          .getAttribute("name")
          .replace(new RegExp(`^${this.prefix}_root:`), ""),
        $metaEl.getAttribute("content"),
      ]),
      ...Array.from(
        document.head.querySelectorAll(
          `meta[name^="${this.prefix}."][content]`,
        ),
      ).map(($metaEl) => [
        $metaEl.getAttribute("name"),
        $metaEl.getAttribute("content"),
      ]),
    ]);
  }

  /** @protected */
  getUserPreferences() {
    const userPreferences = {};
    userPreferences[`${this.prefix}.pref.prefers-color-scheme`] =
      window.matchMedia?.("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    userPreferences[`${this.prefix}.pref.forced-colors`] = window.matchMedia?.(
      "(forced-colors: active)",
    ).matches;
    userPreferences[`${this.prefix}.pref.prefers-contrast`] =
      window.matchMedia?.("(prefers-contrast: more)").matches
        ? "more"
        : window.matchMedia?.("(prefers-contrast: less)").matches
          ? "less"
          : "";
    userPreferences[`${this.prefix}.pref.prefers-reduced-motion`] =
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    userPreferences[`${this.prefix}.pref.prefers-reduced-transparency`] =
      window.matchMedia?.("(prefers-reduced-transparency: reduce)").matches;
    return userPreferences;
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
  addTrackingCode = true;

  /** @protected */
  trackingCodeAdded = false;

  /** @protected */
  trackingEnabled = false;

  /** @protected */
  gTagId;

  constructor(options = {}) {
    if (window.TNAFrontendAnalyticsGA4) {
      return window.TNAFrontendAnalyticsGA4;
    }
    const {
      id = "",
      prefix = null,
      initAll = true,
      addTrackingCode = true,
    } = options;
    super({ prefix });
    window.TNAFrontendAnalyticsGA4 = this;
    this.addTrackingCode = addTrackingCode;
    window.dataLayer = window.dataLayer || [];
    if (id) {
      this.gTagId = id;
      this.ga4Disable = `ga-disable-${this.gTagId}`;
      if (!this.cookies.isPolicyAccepted("usage")) {
        window[this.ga4Disable] = true;
        this.cookies.set(this.ga4Disable, "true");
      }
    }
    this.start(initAll);
  }

  destroy() {
    window.TNAFrontendAnalyticsGA4 = null;
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
      if (!this.trackingCodeAdded && this.addTrackingCode) {
        if (!this.gTagId) {
          throw Error("ID was not specified");
        }
        this.pushToDataLayer({
          ...this.getTnaMetaTags(),
          ...this.getUserPreferences(),
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
      }
      this.trackingEnabled = true;
    }
  }

  /** @protected */
  disableTracking() {
    if (this.trackingEnabled) {
      window[this.ga4Disable] = true;
      this.cookies.set(this.ga4Disable, "true");
      Object.keys(this.cookies.all).forEach((key) => {
        if (key.startsWith("_ga")) {
          this.cookies.delete(key);
        }
      });
      this.trackingEnabled = false;
    }
  }
}

const ga4Id = document.documentElement.dataset.ga4;
if (ga4Id) {
  new GA4({ id: ga4Id });
}

const helpers = { getXPathTo, getClosestHeading, valueGetters };

export { EventTracker, GA4, helpers };
