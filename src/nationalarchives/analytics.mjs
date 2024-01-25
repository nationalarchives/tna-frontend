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
  cookies = new Cookies();

  /** @protected */
  events = [];

  constructor() {
    componentAnalytics.forEach((component) => {
      this.addListener(component.scope, component.data, component.events);
    });
  }

  addListener(scope, data, events) {
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
        if (!componentTracking.onEvent) {
          return;
        }

        if (componentTracking.targetElement) {
          Array.from(
            $scope.querySelectorAll(componentTracking.targetElement),
          ).forEach(($el) =>
            this.attachListener($el, componentTracking.onEvent, $scope, {
              ...data,
              ...componentTracking.data,
            }),
          );
        } else {
          this.attachListener($scope, componentTracking.onEvent, $scope, {
            ...data,
            ...componentTracking.data,
          });
        }
      });
    });
  }

  attachListener($el, eventTrigger, $scope, eventDataInit) {
    $el.addEventListener(eventTrigger, (event) =>
      this.recordEvent({
        ...eventDataInit,
        value:
          typeof eventDataInit.value === "function"
            ? eventDataInit.value.call(this, $el, $scope, event)
            : eventDataInit.value || null,
        state:
          typeof eventDataInit.state === "function"
            ? eventDataInit.state.call(this, $el, $scope, event)
            : eventDataInit.state || null,
      }),
    );
  }

  recordEvent(data) {
    const expandedData = {
      ...data,
      timestamp: new Date().toISOString(),
      uri: window.location.pathname,
    };
    console.log(expandedData);
    this.events.push(expandedData);
  }
}

class GoogleAnalytics4 extends EventTracker {
  constructor(id) {
    super();
    console.log(`Tracking ID: ${id}`);
  }

  _addTrackingCode() {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = "";
    document.head.appendChild(script);
  }

  _removeTrackingCode() {}
}

/*
 * ==========================================
 * TEMP TESTING
 * ==========================================
 */
const analytics = new GoogleAnalytics4("test");
analytics.addListener(".etna-article__sidebar", { name: "Sidebar" }, [
  {
    targetElement: ".etna-article__sidebar-item",
    onEvent: "click",
    data: {
      eventName: "scection_jump",
      value: valueGetters.text,
    },
  },
]);
analytics.addListener(".etna-article", { name: "Article" }, [
  {
    targetElement: ".etna-article__section-button",
    onEvent: "click",
    data: {
      eventName: "scection_toggle",
      state: ($el, $scope, event) => {
        const expanded = $el.getAttribute("aria-expanded");
        if (expanded === null) {
          return null;
        }
        return expanded.toString() === "true" ? "expanded" : "closed";
      },
      value: valueGetters.text,
    },
  },
]);
analytics.addListener(document, { name: "Document" }, [
  // {
  //   onEvent: "scroll",
  //   data: {
  //     eventName: "page_scroll",
  //     value: ($el, $scope, event) => $scope.querySelector("html").scrollTop,
  //   },
  // },
]);
analytics.addListener(document.documentElement, { name: "HTML" }, [
  {
    onEvent: "dblclick",
    data: {
      eventName: "double_click",
      state: ($el, $scope, event) => getXPathTo(event.target),
      value: ($el, $scope, event) => event.target.innerHTML,
    },
  },
]);
analytics.addListener(
  document.getElementById("tna-form__search"),
  { name: "Search input" },
  [
    {
      onEvent: "blur",
      data: {
        eventName: "search_term_blur",
        value: valueGetters.value,
      },
    },
  ],
);

export { GoogleAnalytics4 };
