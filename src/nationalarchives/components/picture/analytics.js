import { getClosestHeading } from "../../lib/analytics-helpers.mjs";

export default [
  {
    scope: ".tna-picture",
    areaName: "picture",
    events: [
      {
        eventName: "toggle_transcript",
        targetElement: ".tna-picture__toggle-transcript",
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
          // eslint-disable-next-line no-unused-vars
          value: ($el, $scope, event) => {
            const heading = getClosestHeading($scope);
            const image = $scope.querySelector(".tna-picture__image");
            const imageSrc = image.getAttribute("src");
            const imageAlt = image.getAttribute("alt");
            const value = `${imageAlt} (${imageSrc})`;
            return heading ? `${heading} > ${value}` : value;
          },
        },
      },
    ],
  },
];
