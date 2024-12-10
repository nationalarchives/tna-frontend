import { valueGetters } from "../../lib/analytics-helpers.mjs";

export default [
  {
    scope: ".tna-gallery",
    areaName: "gallery",
    rootEventName: "select_feature",
    events: [
      {
        eventName: "click",
        targetElement: ".tna-gallery__navigation-item",
        on: "click",
        data: {
          value: valueGetters.text,
        },
        rootData: {
          data_component_name: "Gallery",
          data_link_type: "Pagination thumbnail",
          data_position: valueGetters.index,
        },
      },
      {
        eventName: "click",
        targetElement: ".tna-gallery__navigation-prev",
        on: "click",
        data: {
          value: ($el, $scope) =>
            $scope.querySelector(
              ".tna-gallery__item:not([hidden]) .tna-gallery__item-header",
            ).innerText,
        },
        rootData: {
          data_component_name: "Gallery",
          data_link_type: "Navigation button",
          data_link: valueGetters.text,
        },
      },
      {
        eventName: "click",
        targetElement: ".tna-gallery__navigation-next",
        on: "click",
        data: {
          value: ($el, $scope) =>
            $scope.querySelector(
              ".tna-gallery__item:not([hidden]) .tna-gallery__item-header",
            ).innerText,
        },
        rootData: {
          data_component_name: "Gallery",
          data_link_type: "Navigation button",
          data_link: valueGetters.text,
        },
      },
      {
        eventName: "keypress",
        on: "keydown",
        data: {
          value: ($el, $scope, event) => event.key,
        },
      },
      {
        eventName: "enter-fullscreen",
        targetElement: '.tna-gallery__options button[value="enter-fullscreen"]',
        on: "click",
        rootData: {
          data_component_name: "Gallery",
          data_link_type: "Full screen button",
          data_link: valueGetters.text,
        },
      },
      {
        eventName: "exit-fullscreen",
        targetElement: '.tna-gallery__options button[value="exit-fullscreen"]',
        on: "click",
        rootData: {
          data_component_name: "Gallery",
          data_link_type: "Full screen button",
          data_link: valueGetters.text,
        },
      },
      {
        eventName: "index",
        targetElement: '.tna-gallery__options button[value="show-index"]',
        on: "click",
      },
    ],
  },
];
