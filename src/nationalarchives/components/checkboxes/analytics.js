import { valueGetters } from "../../lib/analytics-helpers.mjs";

export default [
  {
    scope: ".tna-checkboxes",
    areaName: "checkboxes",
    events: [
      {
        eventName: "toggle",
        targetElement: ".tna-checkboxes__item input",
        on: "change",
        data: {
          state: valueGetters.checked,
          // eslint-disable-next-line no-unused-vars
          value: ($el, $scope, event) => $el.parentNode.innerText.trim(),
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
