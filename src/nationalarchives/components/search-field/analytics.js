import { valueGetters } from "../../lib/analytics-helpers.mjs";

export default [
  {
    scope: ".tna-search-field",
    areaName: "search-field",
    events: [
      {
        eventName: "blurred",
        targetElement: ".tna-search-field__input",
        on: "blur",
        data: {
          value: valueGetters.value,
          // eslint-disable-next-line no-unused-vars
          group: ($el, $scope, event) =>
            $scope.querySelector(".tna-form-item__heading")?.innerText?.trim(),
        },
      },
    ],
  },
];
