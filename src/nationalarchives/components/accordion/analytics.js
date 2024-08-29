import { valueGetters } from "../../lib/analytics-helpers.mjs";

export default [
  {
    scope: ".tna-accordion",
    areaName: "accordion",
    events: [
      {
        eventName: "click",
        targetElement: ".tna-accordion__summary",
        on: "click",
        data: { state: valueGetters.expanded, value: valueGetters.text },
      },
    ],
  },
];
