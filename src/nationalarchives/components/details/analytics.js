import { valueGetters } from "../../lib/analytics-helpers.mjs";

export default [
  {
    scope: ".tna-details",
    areaName: "details",
    events: [
      {
        eventName: "click",
        targetElement: ".tna-details__summary",
        on: "click",
        data: {
          // eslint-disable-next-line no-unused-vars
          state: ($el, $scope, event) => {
            const wasExpanded =
              $scope
                .querySelector(".tna-details__details")
                ?.hasAttribute("open") ?? false;
            return wasExpanded ? "closed" : "opened";
          },

          value: valueGetters.text,
        },
      },
    ],
  },
];
