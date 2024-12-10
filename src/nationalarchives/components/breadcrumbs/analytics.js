import { valueGetters } from "../../lib/analytics-helpers.mjs";

export default [
  {
    scope: ".tna-breadcrumbs",
    areaName: "breadcrumbs",
    rootEventName: "select_navigation",
    events: [
      {
        eventName: "click",
        targetElement: "a.tna-breadcrumbs__link",
        on: "click",
        data: { state: "expand", value: valueGetters.html },
        rootData: {
          data_component_name: "Breadcrumb",
          data_link_type: "Breadcrumb link",
          data_link: valueGetters.text,
        },
      },
      {
        eventName: "click",
        targetElement:
          ".tna-breadcrumbs__item--expandable button.tna-breadcrumbs__link",
        on: "click",
        data: { state: "expand", value: valueGetters.html },
        rootData: {
          data_component_name: "Breadcrumb",
          data_link_type: "Breadcrumb expand",
          data_link: valueGetters.text,
        },
      },
    ],
  },
];
