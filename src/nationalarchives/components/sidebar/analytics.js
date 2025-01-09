import { valueGetters } from "../../lib/analytics-helpers.mjs";

export default [
  {
    scope: ".tna-sidebar",
    areaName: "sidebar",
    rootEventName: "select_navigation",
    rootData: {
      data_component_name: "sidebar",
      data_section: ($el, $scope) =>
        $scope.querySelector(".tna-sidebar__heading")?.innerText?.trim(),
    },
    events: [
      {
        eventName: "click",
        targetElement: "a.tna-sidebar__link",
        on: "click",
        rootData: {
          data_link_type: "sidebar_link",
          data_link: valueGetters.text,
          data_position: valueGetters.index,
        },
      },
    ],
  },
];
