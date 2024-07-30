import { valueGetters } from "../../lib/analytics-helpers.mjs";

export default [
  {
    scope: ".tna-gallery",
    areaName: "gallery",
    events: [
      {
        eventName: "click",
        targetElement: ".tna-gallery__navigation-item",
        on: "click",
        data: {
          value: valueGetters.text,
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
      },
      {
        eventName: "exit-fullscreen",
        targetElement: '.tna-gallery__options button[value="exit-fullscreen"]',
        on: "click",
      },
      {
        eventName: "index",
        targetElement: '.tna-gallery__options button[value="show-index"]',
        on: "click",
      },
    ],
  },
];
