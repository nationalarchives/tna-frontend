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
          // eslint-disable-next-line no-unused-vars
          group: ($el, $scope) =>
            $scope
              .closest(".tna-form__group")
              ?.querySelector(".tna-form__heading")
              ?.innerText?.trim(),
        },
      },
    ],
  },
];
