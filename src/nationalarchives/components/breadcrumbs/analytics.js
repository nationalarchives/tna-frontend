import { valueGetters } from "../../lib/analytics-helpers.mjs";

export default [
  {
    scope: ".tna-breadcrumbs",
    data: {
      name: "Breadcrumbs",
    },
    events: [
      {
        targetElement:
          ".tna-breadcrumbs__item:not(.tna-breadcrumbs__item--expandable) .tna-breadcrumbs__link",
        onEvent: "click",
        data: { eventName: "link", value: valueGetters.text },
      },
      {
        targetElement:
          ".tna-breadcrumbs__item--expandable button.tna-breadcrumbs__link",
        onEvent: "click",
        data: { eventName: "click", state: "expand", value: valueGetters.html },
      },
    ],
  },
];
