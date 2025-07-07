import { valueGetters } from "../../lib/analytics-helpers.mjs";

export default [
  {
    scope: ".tna-error-summary",
    areaName: "error-summary",
    events: [
      {
        eventName: "jump",
        targetElement: "a.tna-error-summary__link",
        on: "click",
        data: { value: valueGetters.text },
      },
    ],
  },
];
