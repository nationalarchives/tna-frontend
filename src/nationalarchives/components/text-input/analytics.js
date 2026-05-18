import { valueGetters } from "../../lib/analytics-helpers.mjs";

export default [
  {
    scope: ".tna-text-input",
    areaName: "text-input",
    events: [
      {
        eventName: "blurred",
        on: "blur",
        data: {
          value: valueGetters.value,

          group: ($el, $scope) =>
            $scope
              .closest(".tna-form-item")
              ?.querySelector(".tna-form-item__heading")
              ?.innerText?.trim(),
        },
      },
    ],
  },
];
