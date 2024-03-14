import { valueGetters } from "../../lib/analytics-helpers.mjs";

export default [
  {
    scope: ".tna-global-header",
    areaName: "header",
    rootEventName: "global_navigation",
    events: [
      {
        eventName: "toggle",
        targetElement: ".tna-global-header__navigation-button",
        on: "click",
        data: {
          state: valueGetters.expanded,
        },
        rootData: {
          data_component_name: "Header",
          data_link_type: "Mobile menu",
          data_link: ($el) => {
            const expanded = $el.getAttribute("aria-expanded");
            if (expanded === null) {
              return null;
            }
            return expanded.toString() === "true" ? "Open menu" : "Close menu";
          },
          data_section: "Burger menu",
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
          data_position: 1,
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
          data_link: valueGetters.text,
        },
      },
    ],
  },
];
