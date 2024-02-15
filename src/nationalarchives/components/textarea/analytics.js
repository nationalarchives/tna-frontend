import { valueGetters } from "../../lib/analytics-helpers.mjs";

export default [
  {
    scope: ".tna-textarea",
    areaName: "textarea",
    events: [
      {
        eventName: "blurred",
        on: "blur",
        data: {
          // eslint-disable-next-line no-unused-vars
          value: valueGetters.value,
          // eslint-disable-next-line no-unused-vars
          group: ($el, $scope, event) =>
            $scope
              .closest(".tna-form__group")
              ?.querySelector(".tna-form__heading")?.innerText,
        },
      },
    ],
  },
];
