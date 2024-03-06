import { valueGetters } from "../../lib/analytics-helpers.mjs";

export default [
  {
    scope: ".tna-header",
    areaName: "header",
    events: [
      {
        eventName: "toggle",
        targetElement: ".tna-header__navigation-toggle-button",
        on: "click",
        data: {
          state: valueGetters.expanded,
        },
      },
    ],
  },
];
