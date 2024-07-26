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
        targetElement:
          ".tna-gallery__navigation-button tna-gallery__navigation-prev",
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
        targetElement:
          ".tna-gallery__navigation-button tna-gallery__navigation-next",
        on: "click",
        data: {
          value: ($el, $scope) =>
            $scope.querySelector(
              ".tna-gallery__item:not([hidden]) .tna-gallery__item-header",
            ).innerText,
        },
      },
      {
        eventName: "key press",
        on: "keydown",
        data: {
          value: ($el, $scope, event) => event.key,
        },
      },
      {
        eventName: "click",
        targetElement: '.tna-gallery__options button[value="enter-fullscreen"]',
        on: "click",
        data: { state: "enter" },
      },
      {
        eventName: "click",
        targetElement: '.tna-gallery__options button[value="exit-fullscreen"]',
        on: "click",
        data: { state: "exit" },
      },
      {
        eventName: "click",
        targetElement: '.tna-gallery__options button[value="show-index"]',
        on: "click",
      },
    ],
  },
];
