import { valueGetters } from "../../lib/analytics-helpers.mjs";

export default [
  {
    scope: ".tna-picture",
    data: {
      name: "Picture",
    },
    events: [
      {
        targetElement: ".tna-picture__toggle-transcript",
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
          value: ($el, $scope, event) =>
            $scope.querySelector(".tna-picture__image").getAttribute("alt"),
        },
      },
    ],
  },
];
