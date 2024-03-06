import { valueGetters } from "../../lib/analytics-helpers.mjs";

export default [
  {
    scope: ".tna-global-header",
    areaName: "header",
    events: [
      {
        eventName: "toggle",
        targetElement: ".tna-global-header__navigation-button",
        on: "click",
        data: {
          state: valueGetters.expanded,
        },
      },
      {
        eventName: "logo.click",
        targetElement: ".tna-global-header__logo",
        on: "click",
        rootData: {
          data_component_name: "Header",
          data_link_type: "Logo",
          data_link: "The National Archives",
        },
      },
      {
        eventName: "primary_link.click",
        targetElement: ".tna-global-header__navigation-item-link",
        on: "click",
        data: {
          value: valueGetters.text,
        },
        rootData: {
          data_component_name: "Header",
          data_link_type: "Menu",
          data_section: valueGetters.text,
          data_position: valueGetters.index,
          data_link: valueGetters.text,
        },
      },
      {
        eventName: "secondary_link.click",
        targetElement: ".tna-global-header__top-navigation-link",
        on: "click",
        data: {
          value: valueGetters.text,
        },
        rootData: {
          data_component_name: "Header",
          data_link_type: "Icon",
          data_position: valueGetters.index,
          data_link: valueGetters.text,
        },
      },
    ],
  },
];
