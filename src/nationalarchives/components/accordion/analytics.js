import { valueGetters } from "../../lib/analytics-helpers.mjs";

export default [
  {
    scope: ".tna-accordion",
    areaName: "accordion",
    rootEventName: "select_feature",
    rootData: {
      data_component_name: "accordion",
    },
    events: [
      {
        eventName: "click",
        targetElement: ".tna-accordion__summary",
        on: "click",
        data: { state: valueGetters.expanded, value: valueGetters.text },
        rootData: {
          data_link_type: valueGetters.expanded,
          data_link: valueGetters.text,
          data_position: valueGetters.index,
        },
      },
    ],
  },
];
