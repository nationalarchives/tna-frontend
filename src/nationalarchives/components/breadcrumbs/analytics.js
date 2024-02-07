import { valueGetters } from "../../lib/analytics-helpers.mjs";

export default [
  {
    scope: ".tna-breadcrumbs",
    areaName: "breadcrumbs",
    events: [
      {
        eventName: "click",
        targetElement:
          ".tna-breadcrumbs__item--expandable button.tna-breadcrumbs__link",
        on: "click",
        data: { state: "expand", value: valueGetters.html },
      },
    ],
  },
];
