import { valueGetters } from "../../lib/analytics-helpers.mjs";

export default [
  {
    scope: ".tna-radios",
    areaName: "radios",
    events: [
      {
        eventName: "toggle",
        targetElement: ".tna-radios__item input",
        on: "change",
        data: {
          state: valueGetters.checked,
          // eslint-disable-next-line no-unused-vars
          value: ($el, $scope, event) => $el.parentNode.innerText,
          // eslint-disable-next-line no-unused-vars
          group: ($el, $scope, event) =>
            $scope
              .closest(".tna-form-item")
              ?.querySelector(".tna-form-item__heading")
              ?.innerText?.trim(),
        },
      },
    ],
  },
];
