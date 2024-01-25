import { valueGetters } from "../../lib/analytics-helpers.mjs";

export default [
  {
    scope: ".tna-hero",
    data: {
      name: "Hero",
    },
    events: [
      {
        targetElement: ".tna-hero__details-summary",
        onEvent: "click",
        data: {
          eventName: "click",
          state: ($el, $scope, event) => {
            const wasExpanded =
              $scope
                .querySelector(".tna-hero__details")
                ?.hasAttribute("open") ?? false;
            return wasExpanded ? "closed" : "expanded";
          },
          value: ($el, $scope, event) =>
            $scope.querySelector("img[alt]")?.getAttribute("alt"),
        },
      },
    ],
  },
];
