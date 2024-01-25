import { valueGetters } from "../../lib/analytics-helpers.mjs";

export default [
  {
    scope: ".tna-header",
    data: {
      name: "Header",
    },
    events: [
      {
        targetElement: ".tna-header__navigation-toggle-button",
        onEvent: "click",
        data: {
          eventName: "toggle",
          state: ($el, $scope, event) => {
            const expanded = $el.getAttribute("aria-expanded");
            if (expanded === null) {
              return null;
            }
            return expanded.toString() === "true" ? "expanded" : "closed";
          },
        },
      },
    ],
  },
];
