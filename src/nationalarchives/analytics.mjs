import Cookies from "./lib/cookies.mjs";

const valueGetters = {
  text: ($el, $scope, event) => $el.innerText,
  html: ($el, $scope, event) => $el.innerHTML,
};

const config = [
  {
    scope: ".tna-breadcrumbs",
    data: {
      name: "Breadcrumbs",
    },
    events: [
      {
        onEvent: "click",
        targetElement:
          ".tna-breadcrumbs__item:not(.tna-breadcrumbs__item--expandable) .tna-breadcrumbs__link",
        data: { event: "link", value: valueGetters.text },
      },
      {
        onEvent: "click",
        targetElement:
          ".tna-breadcrumbs__item--expandable button.tna-breadcrumbs__link",
        data: { event: "click", state: "expand", value: valueGetters.html },
      },
    ],
  },
  {
    scope: ".tna-picture",
    data: {
      name: "Picture",
    },
    events: [
      {
        onEvent: "click",
        targetElement: ".tna-picture__toggle-transcript",
        data: {
          event: "click",
          state: ($el, $scope, event) => {
            const expanded = $el.getAttribute("aria-expanded");
            if (expanded === null) {
              return null;
            }
            return expanded.toString() === "true" ? "expanded" : "closed";
          },
          value: ($el, $scope, event) =>
            $scope.querySelector(".tna-picture__image").getAttribute("alt"),
        },
      },
    ],
  },
];

class GoogleAnalytics4 {
  /** @protected */
  cookies = new Cookies();

  constructor(id) {
    console.log(`BOOM! ${id}`);

    config.forEach((configScope) => {
      this.addListener(configScope.scope, configScope.data, configScope.events);
    });
  }

  addListener(scope, data, events) {
    Array.from(document.querySelectorAll(scope)).forEach(($scope) => {
      events.forEach((componentTracking) => {
        Array.from(
          $scope.querySelectorAll(componentTracking.targetElement),
        ).forEach((element) => {
          const $el = element;
          const eventDataInit = {
            ...data,
            ...componentTracking.data,
          };
          $el.addEventListener(componentTracking.onEvent, (event) => {
            const eventData = {
              ...eventDataInit,
              value:
                typeof eventDataInit.value === "function"
                  ? eventDataInit.value.call(this, $el, $scope, event)
                  : eventDataInit.value,
              state:
                typeof eventDataInit.state === "function"
                  ? eventDataInit.state.call(this, $el, $scope, event)
                  : eventDataInit.state,
              timestamp: new Date().toISOString(),
            };
            console.log(eventData);
          });
        });
      });
    });
  }

  _addTrackingCode() {}
  _removeTrackingCode() {}
}

const analytics = new GoogleAnalytics4("test");
analytics.addListener(".etna-article__sidebar", { name: "Sidebar" }, [
  {
    onEvent: "click",
    targetElement: ".etna-article__sidebar-item",
    data: {
      event: "scection_jump",
      value: valueGetters.text,
    },
  },
]);

export { GoogleAnalytics4 };
